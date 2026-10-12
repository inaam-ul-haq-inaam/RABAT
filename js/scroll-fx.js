/**
 * Rabat Banquet Hall — Bresca-style scroll reveal
 * Sections with .scrollfade and the full-bleed .photo bands fade in
 * one-by-one when they reach 94% of the viewport — the same waypoint
 * (offset "94%"), 0.75s linear opacity and 150ms FIFO queue the
 * reference site (E:\front\bresca_local) uses for .revealable.
 * Photos live in-flow as alternating bands, so a card ending always
 * exposes the next photo, exactly like the reference site.
 * Zero dependencies.
 */
(function () {
  'use strict';

  var QUEUE_DELAY = 150;    // ms between reveals, same as reference
  var REVEAL_OFFSET = 0.94; // reveal when element top reaches 94% viewport

  var reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------
     REVEAL — waypoint at 94% viewport, FIFO queue, 150ms stagger
     ------------------------------------------------------------ */
  var queue = [];
  var running = false;

  function pump() {
    if (!queue.length) { running = false; return; }
    var el = queue.shift();
    el.classList.add('is-revealed');
    window.setTimeout(pump, QUEUE_DELAY);
  }

  function enqueue(el) {
    if (el.classList.contains('is-revealed') || queue.indexOf(el) !== -1) return;
    queue.push(el);
    if (!running) { running = true; pump(); }
  }

  function initReveal() {
    var els = Array.prototype.slice.call(
      document.querySelectorAll('.scrollfade, .photo-band')
    );
    if (!els.length) return;
    var photoBands = Array.prototype.slice.call(
      document.querySelectorAll('.photo-band')
    );

    if (reducedMotion) {
      els.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    // sections hidden by the tabbed page switcher: mark revealed so
    // they never stall the queue when their tab opens
    var pending = els.filter(function (el) {
      if (getComputedStyle(el).display === 'none') {
        el.classList.add('is-revealed');
        return false;
      }
      return true;
    });

    function updatePhotoBandPositions() {
      if (window.innerWidth > 991) return;
      photoBands.forEach(function (el) {
        var offset = -el.getBoundingClientRect().top;
        var value = offset + 'px';
        if (el.style.getPropertyValue('--photo-band-offset') !== value) {
          el.style.setProperty('--photo-band-offset', value);
        }
      });
    }

    function check() {
      var trigger = window.innerHeight * REVEAL_OFFSET;
      for (var i = 0; i < pending.length; i++) {
        var rect = pending[i].getBoundingClientRect();
        if (rect.top <= trigger) {
          enqueue(pending[i]);
          pending.splice(i, 1);
          i--;
        }
      }
      updatePhotoBandPositions();
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        check();
      });
    }, { passive: true });
    window.addEventListener('resize', check);
    check();
  }

  function boot() { initReveal(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
