import { useEffect } from 'react';

/**
 * Port of js/main.js section 6 — SCROLL REVEAL (.reveal + .is-hidden).
 * Re-runs per route so freshly mounted sections get observed again.
 */
export default function useReveal(routeKey) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    if (reduced || !(window.IntersectionObserver || null)) {
      revealTargets.forEach((el) => {
        el.classList.remove('is-hidden');
        el.classList.remove('reveal');
      });
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 },
    );

    revealTargets.forEach((el) => {
      el.classList.add('is-hidden');
      observer.observe(el);
    });

    let ticking = false;
    function revealPassedTargets() {
      ticking = false;
      revealTargets.forEach((el) => {
        if (
          el.classList.contains('is-hidden') &&
          getComputedStyle(el).display !== 'none' &&
          el.getBoundingClientRect().top <= window.innerHeight
        ) {
          el.classList.remove('is-hidden');
          observer.unobserve(el);
        }
      });
    }
    function scheduleRevealCheck() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(revealPassedTargets);
    }

    window.addEventListener('scroll', scheduleRevealCheck, { passive: true });
    window.addEventListener('resize', scheduleRevealCheck);
    scheduleRevealCheck();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleRevealCheck);
      window.removeEventListener('resize', scheduleRevealCheck);
    };
  }, [routeKey]);
}
