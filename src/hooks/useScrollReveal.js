import { useEffect } from 'react';

/**
 * High-Performance Smooth Scroll Reveal Hook
 * Automatically reveals elements with `.reveal-on-scroll` when scrolled into view
 */
export function useScrollReveal() {
  useEffect(() => {
    // Check if IntersectionObserver is available
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('reveal-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-delay');
            if (delay) {
              setTimeout(() => {
                el.classList.add('reveal-visible');
              }, parseInt(delay, 10));
            } else {
              el.classList.add('reveal-visible');
            }
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.reveal-visible)');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    // Re-scan when DOM changes
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
