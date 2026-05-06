'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll<Element>('.animate-fade-up, .animate-fade-in');

    // Pre-mark elements already visible so they don't flash hidden then fade back in
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('in-view');
      }
    });

    // Activate CSS — elements not in-view will now start hidden
    document.body.classList.add('js-ready');

    // Watch remaining elements for scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.body.classList.remove('js-ready');
    };
  }, []);

  return null;
}
