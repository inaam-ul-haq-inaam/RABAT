import { useEffect } from 'react';

const QUEUE_DELAY = 150; // ms between reveals, same as the original stagger
const REVEAL_OFFSET = 0.94; // reveal when the element top reaches 94% viewport

/**
 * Port of js/scroll-fx.js — the 94%-waypoint fade for .scrollfade sections and
 * the full-bleed .photo bands. Re-runs per route so newly mounted sections are
 * queued again.
 *
 * Hybrid drive (both unobserve-style cheap):
 *  1. IntersectionObserver handles the normal downward scroll — zero work per
 *     scroll event, reveals fire as elements cross the bottom edge.
 *  2. An rAF-throttled "passed" sweep covers the edge case IO can't: elements
 *     scrolled PAST (faster than they intersect, deep-link jumps) would stay
 *     hidden forever with IO alone. The sweep enqueues them into the same FIFO
 *     queue, so they still fade in one-by-one instead of all at once.
 */
export default function useScrollFx(routeKey) {
  useEffect(() => {
    const els = Array.prototype.slice.call(document.querySelectorAll('.scrollfade, .photo-band'));
    if (!els.length) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      els.forEach((el) => el.classList.add('is-revealed'));
      return () => {
        els.forEach((el) => el.classList.remove('is-revealed'));
      };
    }

    const queue = [];
    let running = false;
    let timer = 0;

    function pump() {
      if (!queue.length) {
        running = false;
        return;
      }
      const el = queue.shift();
      el.classList.add('is-revealed');
      timer = window.setTimeout(pump, QUEUE_DELAY);
    }

    function enqueue(el) {
      if (el.classList.contains('is-revealed') || queue.indexOf(el) !== -1) return;
      queue.push(el);
      if (!running) {
        running = true;
        pump();
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            enqueue(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      // top pushes the root far above the viewport (elements taller than the
      // page fold plane are caught by the sweep below; this margin keeps
      // partially-off-screen tall sections eligible), bottom is the 94% line
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    );

    // sections hidden by the page switcher were marked revealed up front
    els.forEach((el) => {
      if (getComputedStyle(el).display === 'none') el.classList.add('is-revealed');
      else observer.observe(el);
    });

    /* --- "passed" sweep --- */
    let ticking = false;
    function sweep() {
      ticking = false;
      for (let i = 0; i < els.length; i += 1) {
        const el = els[i];
        if (el.classList.contains('is-revealed')) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * REVEAL_OFFSET) {
          enqueue(el);
        }
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(sweep);
    }

    const pending = els.filter((el) => !el.classList.contains('is-revealed'));
    if (!pending.length) {
      observer.disconnect();
      return () => {};
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    sweep();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(timer);
      els.forEach((el) => el.classList.remove('is-revealed'));
    };
  }, [routeKey]);
}
