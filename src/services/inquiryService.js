import { COMPANY_INFO } from '../data/mockData';

const STORAGE_KEY_INQUIRIES = 'kachoras_leads_v1';
const STORAGE_KEY_EMAIL_CONFIG = 'kachoras_email_config_v1';

// Seed sample/demonstration inquiries so the portal inbox isn't blank on first open
const SEED_INQUIRIES = [
  {
    id: "LEAD-101",
    referenceId: "KCH-7842-RFQ",
    name: "Sultan Al Suwaidi",
    company: "Private Villa Owner",
    email: "sultan.suwaidi@example.ae",
    phone: "+971 50 442 8192",
    location: "Nad Al Sheba 2, Dubai",
    plotNo: "6149821",
    serviceType: "Building Contracting (G+1 Villa / Majlis)",
    budgetRange: "AED 2,500,000 – AED 4,000,000",
    message: "We have consultant approved architectural drawings for a 6,500 sq.ft G+1 contemporary villa and detached majlis block. Seeking contractor tender pricing and municipal mobilization schedule.",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
    status: "new" // 'new' | 'contacted' | 'archived'
  },
  {
    id: "LEAD-102",
    referenceId: "KCH-6190-RFQ",
    name: "Eng. Tariq Mansoor",
    company: "Apex Properties Management",
    email: "t.mansoor@apexmgmt.ae",
    phone: "+971 55 918 2741",
    location: "Al Barsha South 2, Dubai",
    plotNo: "3760283",
    serviceType: "Aluminium & Glass Fabrication",
    budgetRange: "AED 350,000",
    message: "Requesting quotation for double glazed thermal-break curtain walls and frameless architectural sliding systems for commercial office retrofit.",
    timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(), // 1.5 days ago
    status: "contacted"
  }
];

/**
 * Retrieve all inquiries/leads from LocalStorage
 */
export function getStoredInquiries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    if (!raw) {
      // First time initialization with initial seed leads
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(SEED_INQUIRIES));
      return SEED_INQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return [];
  }
}

/**
 * Save inquiries array to LocalStorage
 */
export function saveStoredInquiries(inquiries) {
  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
  } catch (err) {
    console.error('Error saving inquiries:', err);
  }
}

const STORAGE_KEY_AUTH = 'kachoras_admin_auth_v1';
const DEFAULT_PASSKEY = 'kachoras2006';

/**
 * Submit a new inquiry from Contact Form or Quote Modal
 * 1. Posts to Live Dynamic Server (/api/inquiries)
 * 2. Saves to internal Owner Portal Inbox
 * 3. Attempts email dispatch to kachorasdubai@gmail.com
 */
export async function submitInquiry(payload) {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const ref = `KCH-${randomNum}-RFQ`;

  const newInquiry = {
    id: `LEAD-${Date.now()}`,
    referenceId: ref,
    name: payload.name || 'Anonymous Client',
    company: payload.company || '',
    email: payload.email || '',
    phone: payload.phone || '',
    location: payload.location || 'Dubai, UAE',
    plotNo: payload.plotNo || '',
    serviceType: payload.serviceType || payload.category || 'General Construction',
    budgetRange: payload.budgetRange || payload.budget || '',
    message: payload.message || payload.notes || '',
    attachedFile: payload.attachedFile || null,
    timestamp: new Date().toISOString(),
    status: "new"
  };

  // 1. Attempt Live Server API Post
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInquiry)
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.inquiry) {
        const existing = getStoredInquiries();
        saveStoredInquiries([data.inquiry, ...existing.filter(i => i.id !== data.inquiry.id)]);
        window.dispatchEvent(new CustomEvent('kachoras_inquiries_updated'));
        
        // Background email dispatch
        sendEmailNotification(data.inquiry).catch(err => console.warn('Email notice:', err));

        return {
          success: true,
          referenceId: data.referenceId || ref,
          inquiry: data.inquiry
        };
      }
    }
  } catch (err) {
    console.info('Live server unavailable, proceeding with local offline lead capture:', err);
  }

  // 2. Offline / Local fallback: Save to portal inbox
  const existing = getStoredInquiries();
  const updated = [newInquiry, ...existing];
  saveStoredInquiries(updated);
  window.dispatchEvent(new CustomEvent('kachoras_inquiries_updated'));

  // 3. Dispatch email to company inbox (kachorasdubai@gmail.com)
  try {
    await sendEmailNotification(newInquiry);
  } catch (err) {
    console.warn('Email dispatch warning (lead preserved in Owner Portal):', err);
  }

  return {
    success: true,
    referenceId: ref,
    inquiry: newInquiry
  };
}

/**
 * Update the status of an inquiry ('new', 'contacted', 'archived')
 */
export function updateInquiryStatus(id, newStatus) {
  const existing = getStoredInquiries();
  const updated = existing.map(item => {
    if (item.id === id) {
      return { ...item, status: newStatus };
    }
    return item;
  });
  saveStoredInquiries(updated);
  return updated;
}

/**
 * Delete an inquiry
 */
export function deleteInquiry(id) {
  const existing = getStoredInquiries();
  const updated = existing.filter(item => item.id !== id);
  saveStoredInquiries(updated);
  return updated;
}

/**
 * Export all inquiries to CSV format for download
 */
export function exportInquiriesToCSV() {
  const inquiries = getStoredInquiries();
  if (!inquiries.length) return;

  const headers = ['Reference ID', 'Date', 'Status', 'Name', 'Company', 'Phone', 'Email', 'Location', 'Plot #', 'Discipline', 'Budget', 'Notes'];
  const rows = inquiries.map(item => [
    `"${item.referenceId}"`,
    `"${new Date(item.timestamp).toLocaleString()}"`,
    `"${item.status}"`,
    `"${item.name.replace(/"/g, '""')}"`,
    `"${(item.company || '').replace(/"/g, '""')}"`,
    `"${item.phone}"`,
    `"${item.email}"`,
    `"${item.location}"`,
    `"${item.plotNo || ''}"`,
    `"${item.serviceType}"`,
    `"${item.budgetRange || ''}"`,
    `"${(item.message || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `kachoras_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Send email notification to kachorasdubai@gmail.com
 * Uses Web3Forms or Formspree API endpoint
 */
async function sendEmailNotification(inquiry) {
  const targetEmail = COMPANY_INFO.email || 'kachorasdubai@gmail.com';
  
  // Custom configured access key or public Web3Forms integration
  const customConfig = getEmailConfig();
  const accessKey = customConfig?.accessKey || 'e35c249a-761e-450a-9d62-97b5e135b3e2'; // Web3Forms standard public endpoint

  const emailBody = {
    access_key: accessKey,
    subject: `[New Tender RFP: ${inquiry.referenceId}] ${inquiry.name} - ${inquiry.serviceType}`,
    from_name: `Kachoras Website Lead System`,
    to_email: targetEmail,
    reference_id: inquiry.referenceId,
    client_name: inquiry.name,
    client_phone: inquiry.phone,
    client_email: inquiry.email,
    company: inquiry.company || 'Private Owner',
    location: inquiry.location,
    plot_number: inquiry.plotNo || 'Not Specified',
    contracting_discipline: inquiry.serviceType,
    budget_estimation: inquiry.budgetRange || 'Not Specified',
    client_message: inquiry.message || 'No additional notes provided',
    submitted_at: new Date(inquiry.timestamp).toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })
  };

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(emailBody)
  });

  return response.json();
}

/**
 * Optional custom email service settings
 */
export function getEmailConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMAIL_CONFIG);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

export function saveEmailConfig(config) {
  if (!config) {
    localStorage.removeItem(STORAGE_KEY_EMAIL_CONFIG);
  } else {
    localStorage.setItem(STORAGE_KEY_EMAIL_CONFIG, JSON.stringify(config));
  }
}

/**
 * Live Dynamic Server Endpoints for Lead Management
 */

export async function fetchServerInquiries() {
  const passkey = localStorage.getItem(STORAGE_KEY_AUTH) || DEFAULT_PASSKEY;

  try {
    const res = await fetch('/api/admin/inquiries', {
      headers: {
        'x-admin-passkey': passkey
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        saveStoredInquiries(data);
        return data;
      }
    }
  } catch (err) {
    console.info('Live inquiries endpoint unreachable, using offline store.');
  }

  return getStoredInquiries();
}

export async function updateInquiryStatusOnServer(id, newStatus) {
  const passkey = localStorage.getItem(STORAGE_KEY_AUTH) || DEFAULT_PASSKEY;

  try {
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-passkey': passkey
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.inquiry) {
        updateInquiryStatus(id, newStatus);
        window.dispatchEvent(new CustomEvent('kachoras_inquiries_updated'));
        return getStoredInquiries();
      }
    }
  } catch (err) {
    console.warn('Server inquiry status update failed, updating locally:', err);
  }

  const updated = updateInquiryStatus(id, newStatus);
  window.dispatchEvent(new CustomEvent('kachoras_inquiries_updated'));
  return updated;
}

export async function deleteInquiryOnServer(id) {
  const passkey = localStorage.getItem(STORAGE_KEY_AUTH) || DEFAULT_PASSKEY;

  try {
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-passkey': passkey
      }
    });

    if (res.ok) {
      const updated = deleteInquiry(id);
      window.dispatchEvent(new CustomEvent('kachoras_inquiries_updated'));
      return updated;
    }
  } catch (err) {
    console.warn('Server inquiry deletion failed, removing locally:', err);
  }

  const updated = deleteInquiry(id);
  window.dispatchEvent(new CustomEvent('kachoras_inquiries_updated'));
  return updated;
}
