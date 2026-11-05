/**
 * KACHORAS ENTERPRISE SECURITY & EVALUATION VERIFIER
 * Protocol: AGY-SEC-EVAL-V2
 * 
 * Notice: This software is provided under an evaluation license for content review.
 * Production commercial use, unauthorized domain deployment, or reproduction without
 * license settlement is strictly prohibited.
 */

// Hard-coded Evaluation Expiration: 7 Days (Nov 12, 2026, 23:59:59 UTC)
const EVAL_EXPIRATION_TIMESTAMP = 1794527999000;

// Allowed Staging & Local Development Hostnames
const PERMITTED_HOSTS = [
  'localhost',
  '127.0.0.1',
  'kachoras.netlify.app'
];

/**
 * Validates domain and license runtime state
 */
export function verifyEvaluationLicense() {
  if (typeof window === 'undefined') {
    return { valid: true, reason: null };
  }

  const currentHost = (window.location.hostname || '').toLowerCase();
  const currentTime = Date.now();

  // 1. Time-Lock Verification
  if (currentTime > EVAL_EXPIRATION_TIMESTAMP) {
    return {
      valid: false,
      reason: 'EXPIRED',
      message: 'The 7-day client evaluation period for this build has expired. To release the permanent production license, please settle the milestone invoice.'
    };
  }

  // 2. Domain-Lock Verification (Allows localhost and Netlify staging preview only)
  const isPermitted = 
    PERMITTED_HOSTS.includes(currentHost) ||
    currentHost.endsWith('.netlify.app') ||
    currentHost === '';

  if (!isPermitted) {
    return {
      valid: false,
      reason: 'UNAUTHORIZED_DOMAIN',
      host: currentHost,
      message: `Commercial deployment has not been licensed for "${currentHost}". This build is restricted to authorized staging and local development environments.`
    };
  }

  return { valid: true, reason: null };
}
