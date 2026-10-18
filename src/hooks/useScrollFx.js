import { useEffect } from 'react';

const QUEUE_DELAY = 150; // ms between reveals, same as the original
const REVEAL_OFFSET = 0.94; // reveal when the element top reaches 94% viewport

/**
 * Port of js/scroll-fx.js — the 94% waypoint fade for .scrollfade sections and
 * the full-bleed .photo bands. Re-runs per route so newly mounted sections are queued again.
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

    // sections hidden by the page switcher were marked revealed up front
    const pending = els.filter((el) => {
      if (getComputedStyle(el).display === 'none') {
        el.classList.add('is-revealed');
        return false;
      }
      return true;
    });

    function check() {
      const trigger = window.innerHeight * REVEAL_OFFSET;
      for (let i = 0; i < pending.length; i += 1) {
        if (pending[i].getBoundingClientRect().top <= trigger) {
          enqueue(pending[i]);
          pending.splice(i, 1);
          i -= 1;
        }
      }
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', check);
    check();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', check);
      window.clearTimeout(timer);
      els.forEach((el) => el.classList.remove('is-revealed'));
    };
  }, [routeKey]);
}
