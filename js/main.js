/**
 * Rabat Banquet Hall — Home Page JS
 * Features: sticky nav scroll-class, mobile menu, count-up animation,
 *           testimonial carousel, scroll-reveal (vanilla, zero deps).
 */

(function () {
  'use strict';

  var document = window.document;
  var setTimeout = window.setTimeout;
  var clearTimeout = window.clearTimeout;
  var requestAnimationFrame = window.requestAnimationFrame;
  var matches = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     HELPERS
     ============================================================ */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function on(el, evt, fn, opts) { return el.addEventListener(evt, fn, opts || false); }
  function hasClass(el, c) { return el.classList ? el.classList.contains(c) : !!el.className && new RegExp('(^|\\s)' + c + '(\\s|$)').test(el.className); }
  function addClass(el, c) { if (el.classList) el.classList.add(c); else if (!hasClass(el, c)) el.className += ' ' + c; }
  function remClass(el, c) { if (el.classList) el.classList.remove(c); else el.className = el.className.replace(new RegExp('(^|\\s)' + c + '(\\s|$)'), ' '); }

  /* ============================================================
     1. STICKY NAV — scroll shadow + hide/show on scroll dir
     ============================================================ */
  var navbar = qs('#navbar');
  if (navbar) {
    var lastY = window.scrollY;
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      if (requestAnimationFrame) {
        requestAnimationFrame(function () { applyNavScroll(); });
      } else {
        setTimeout(applyNavScroll, 16);
      }
    }

    function applyNavScroll() {
      var y = window.scrollY;
      var diff = y - lastY;
      if (y > 20) addClass(navbar, 'scrolled');
      else remClass(navbar, 'scrolled');
      if (y > 200) {
        if (diff > 4 && !hasClass(navbar, 'nav-hidden')) {
          addClass(navbar, 'nav-hidden');
          navbar.style.transform = 'translateY(-100%)';
        } else if (diff < -4 && hasClass(navbar, 'nav-hidden')) {
          remClass(navbar, 'nav-hidden');
          navbar.style.transform = '';
        }
      } else {
        navbar.style.transform = '';
        remClass(navbar, 'nav-hidden');
      }
      lastY = y;
      ticking = false;
    }

    on(window, 'scroll', onScroll, { passive: true });
    on(window, 'resize', onScroll);
    applyNavScroll();
  }

  /* ============================================================
     2. MOBILE NAV TOGGLE
     ============================================================ */
  var toggle = qs('#navToggle');
  var menu   = qs('#navMenu');
  if (toggle && menu) {
    on(toggle, 'click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      if (!open) {
        addClass(menu, 'open');
        qsa('.nav-link', menu).forEach(function (l) { addClass(l, 'open'); });
        qsa('.nav-cta a', menu).forEach(function (a) { addClass(a, 'open'); });
        qsa('.btn-nav', menu).forEach(function (b) { addClass(b, 'open'); });
      } else {
        remClass(menu, 'open');
        qsa('.nav-link', menu).forEach(function (l) { remClass(l, 'open'); });
        qsa('.nav-cta a', menu).forEach(function (a) { remClass(a, 'open'); });
        qsa('.btn-nav', menu).forEach(function (b) { remClass(b, 'open'); });
      }
    });

    on(document, 'click', function (e) {
      if (!menu.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        remClass(menu, 'open');
        qsa('.nav-link', menu).forEach(function (l) { remClass(l, 'open'); });
        qsa('.nav-cta a', menu).forEach(function (a) { remClass(a, 'open'); });
        qsa('.btn-nav', menu).forEach(function (b) { remClass(b, 'open'); });
      }
    });

    on(document, 'keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        remClass(menu, 'open');
        qsa('.nav-link', menu).forEach(function (l) { remClass(l, 'open'); });
        qsa('.nav-cta a', menu).forEach(function (a) { remClass(a, 'open'); });
        qsa('.btn-nav', menu).forEach(function (b) { remClass(b, 'open'); });
        toggle.focus();
      }
    });

    qsa('.nav-link', menu).forEach(function (link) {
      on(link, 'click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        remClass(menu, 'open');
        qsa('.nav-link', menu).forEach(function (l) { remClass(l, 'open'); });
        qsa('.nav-cta a', menu).forEach(function (a) { remClass(a, 'open'); });
        qsa('.btn-nav', menu).forEach(function (b) { remClass(b, 'open'); });
      });
    });
  }

  /* ============================================================
     3. SERVICES DROPDOWN — open/close without disrupting page nav
     ============================================================ */
  qsa('.nav-dropdown').forEach(function (dropdown) {
    var trigger = qs('.nav-dropdown-trigger', dropdown);
    var menu = qs('.dropdown-menu', dropdown);
    if (!trigger || !menu) return;

    on(trigger, 'click', function (e) {
      e.preventDefault();
      var isOpen = hasClass(dropdown, 'open');
      qsa('.nav-dropdown').forEach(function (item) {
        remClass(item, 'open');
        var itemTrigger = qs('.nav-dropdown-trigger', item);
        if (itemTrigger) itemTrigger.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        addClass(dropdown, 'open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    on(document, 'click', function (event) {
      if (!dropdown.contains(event.target)) {
        remClass(dropdown, 'open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  on(document, 'keydown', function (e) {
    if (e.key === 'Escape') {
      qsa('.nav-dropdown').forEach(function (dropdown) {
        remClass(dropdown, 'open');
        var trigger = qs('.nav-dropdown-trigger', dropdown);
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* ============================================================
     4. ACTIVE NAV LINK — highlight based on scroll position
     ============================================================ */
  function updateActiveNav() {
    var links = qsa('[data-nav]');
    if (!links.length || !navbar) return;
    var scrollY = window.scrollY + 120;
    var current = null;
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      var target = qs(href);
      if (!target) return;
      var top = target.offsetTop;
      var bottom = top + target.offsetHeight;
      if (scrollY >= top && scrollY < bottom) current = link;
    });
    links.forEach(function (l) { remClass(l, 'active'); });
    if (current) addClass(current, 'active');
  }

  var navRAF = false;
  on(window, 'scroll', function () {
    if (navRAF) return;
    navRAF = true;
    if (requestAnimationFrame) {
      requestAnimationFrame(function () { updateActiveNav(); navRAF = false; });
    } else {
      setTimeout(function () { updateActiveNav(); navRAF = false; }, 16);
    }
  }, { passive: true });
  on(window, 'load', updateActiveNav);
  setTimeout(updateActiveNav, 400);

  /* ============================================================
     4. COUNT-UP ANIMATION
     ============================================================ */
  function animateCount(el, target, suffix, duration, onComplete) {
    var startTime = performance.now();
    var durationMs = duration || 1800;

    function step() {
      var elapsed = performance.now() - startTime;
      var progress = Math.min(elapsed / durationMs, 1);
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      var current = Math.round(eased * target);
      el.textContent = current + (suffix || '');
      if (progress < 1) {
        setTimeout(step, 16);
      } else if (onComplete) {
        onComplete();
      }
    }

    if (matches) {
      el.textContent = target + (suffix || '');
      if (onComplete) onComplete();
    } else {
      setTimeout(step, 16);
    }
  }

  function runCounts() {
    var counters = qsa('[data-count]');
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;
      animateCount(el, target, suffix);
    });
  }

  var countersDone = false;
  function tryRunCounts() {
    if (countersDone) return;
    var firstCounter = qsa('[data-count]')[0];
    if (!firstCounter || firstCounter.getBoundingClientRect().top < window.innerHeight - 60) {
      runCounts();
      countersDone = true;
    }
  }

  on(window, 'scroll', function () {
    if (countersDone) return;
    if (matches) { runCounts(); return; }
    tryRunCounts();
  }, { passive: true });
  on(window, 'load', tryRunCounts);
  setTimeout(tryRunCounts, 600);

  /* ============================================================
     5. TESTIMONIAL CAROUSEL
     ============================================================ */
  var track   = qs('#carouselTrack');
  var slides  = track ? qsa('.slide', track) : [];
  var prevBtn = qs('#carouselPrev');
  var nextBtn = qs('#carouselNext');
  var dotsBox = qs('#carouselDots');
  var currentIdx = 0;
  var autoTimer = null;
  var AUTOCHANGE_MS = 3000;

  function goTo(idx, userInitiated) {
    if (!slides.length) return;
    if (idx < 0) idx = slides.length - 1;
    if (idx >= slides.length) idx = 0;
    currentIdx = idx;
    slides.forEach(function (s, i) {
      if (i === idx) { addClass(s, 'active'); s.setAttribute('aria-hidden', 'false'); }
      else { remClass(s, 'active'); s.setAttribute('aria-hidden', 'true'); }
    });
    var dots = qsa('.carousel-dot', dotsBox);
    dots.forEach(function (d, i) {
      if (i === idx) addClass(d, 'active');
      else remClass(d, 'active');
      d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
    slides.forEach(function (s, i) {
      s.setAttribute('aria-label', 'Slide ' + (i + 1) + ' of ' + slides.length);
    });
    if (userInitiated) restartAuto();
  }

  function buildDots() {
    if (!dotsBox || slides.length < 2) return;
    dotsBox.innerHTML = '';
    for (var i = 0; i < slides.length; i++) {
      (function (idx) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
        btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        btn.setAttribute('aria-controls', 'carouselTrack');
        btn.setAttribute('tabindex', '0');
        on(btn, 'click', function () { goTo(idx, true); });
        dotsBox.appendChild(btn);
      })(i);
    }
  }

  function next()  { goTo(currentIdx + 1, true); }
  function prev()  { goTo(currentIdx - 1, true); }

  function startAuto() {
    stopAuto();
    if (matches) return;
    autoTimer = setTimeout(function () { next(); startAuto(); }, AUTOCHANGE_MS);
  }

  function stopAuto() {
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  if (slides.length > 1) {
    buildDots();
    on(nextBtn, 'click', next);
    on(prevBtn, 'click', prev);
    var carousel = qs('.carousel');
    on(carousel, 'keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    });
    on(carousel, 'mouseenter', stopAuto);
    on(carousel, 'mouseleave', restartAuto);
    on(carousel, 'focusin', stopAuto);
    on(carousel, 'focusout', restartAuto);
    startAuto();
  }

  /* ============================================================
     6. SCROLL REVEAL — IntersectionObserver
     ============================================================ */
  function initReveal() {
    if (matches) {
      qsa('.reveal').forEach(function (el) {
        remClass(el, 'is-hidden');
        remClass(el, 'reveal');
      });
      return;
    }
    var io = window.IntersectionObserver || null;
    if (!io) {
      qsa('.reveal').forEach(function (el) {
        remClass(el, 'is-hidden');
        remClass(el, 'reveal');
      });
      return;
    }
    var observer = new io(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          remClass(entry.target, 'is-hidden');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
    qsa('.reveal').forEach(function (el) {
      addClass(el, 'is-hidden');
      observer.observe(el);
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initReveal();
  } else {
    on(document, 'DOMContentLoaded', initReveal);
  }

  /* ============================================================
     7. DECOR LIGHTBOX — click a decor card to preview full-screen
     ============================================================ */
  var lightbox  = qs('#lightbox');
  var lbImg     = qs('#lightboxImg');
  var lbCaption = qs('#lightboxCaption');
  var lbCards   = qsa('.decor-card, .gcard');
  var lbIndex   = 0;
  var lbLastFocus = null;

  function lbRender() {
    var card = lbCards[lbIndex];
    if (!card || !lbImg) return;
    var img = qs('img', card);
    var title = qs('.decor-title', card) || qs('.gallery-cap', card) || qs('.gcard-title', card);
    var tag = qs('.decor-tag', card) || qs('.gcard-tag', card);
    lbImg.src = img ? img.getAttribute('src') : '';
    lbImg.alt = img ? img.alt : '';
    lbCaption.textContent = (tag ? tag.textContent + ' · ' : '') + (title ? title.textContent : '');
  }

  function lbOpen(idx) {
    if (!lightbox || !lbCards.length) return;
    lbIndex = idx;
    lbRender();
    lbLastFocus = document.activeElement;
    addClass(lightbox, 'open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var closeBtn = qs('#lightboxClose');
    if (closeBtn) closeBtn.focus();
  }

  function lbClose() {
    if (!lightbox) return;
    remClass(lightbox, 'open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbLastFocus) lbLastFocus.focus();
  }

  function lbStep(dir) {
    if (!lbCards.length) return;
    lbIndex = (lbIndex + dir + lbCards.length) % lbCards.length;
    lbRender();
  }

  if (lightbox && lbCards.length) {
    lbCards.forEach(function (card, i) {
      on(card, 'click', function () { lbOpen(i); });
      on(card, 'keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbOpen(i); }
      });
    });
    on(qs('#lightboxClose'), 'click', lbClose);
    on(qs('#lightboxPrev'), 'click', function () { lbStep(-1); });
    on(qs('#lightboxNext'), 'click', function () { lbStep(1); });
    on(lightbox, 'click', function (e) { if (e.target === lightbox) lbClose(); });
    on(document, 'keydown', function (e) {
      if (!hasClass(lightbox, 'open')) return;
      if (e.key === 'Escape') lbClose();
      else if (e.key === 'ArrowRight') lbStep(1);
      else if (e.key === 'ArrowLeft') lbStep(-1);
    });
  }

  /* ============================================================
     8. PAGE SWITCHER — Strict Tabbed Interface
     ============================================================ */
  var pageMap = {
    hero:     ['hero', 'band-1', 'hallmarks', 'band-2', 'features', 'band-3', 'testimonials'],
    hallplan: ['hallplan', 'hallplan-capacity', 'hallplan-stage'],
    decors:   ['decors'],
    catering: ['catering'],
    gallery:  ['gallery'],
    reserve:  ['reserve']
  };

  // section id -> owning page key
  var sectionPage = {};
  Object.keys(pageMap).forEach(function (k) {
    pageMap[k].forEach(function (id) { sectionPage[id] = k; });
  });

  function showPage(key) {
    var pages = pageMap[key];
    if (!pages) return;
    
    // Hide all sections, show only the ones for this tab
    qsa('main > section').forEach(function (s) {
      if (pages.indexOf(s.id) !== -1) {
        remClass(s, 'page-hidden');
        s.style.display = 'block';
        
        // restart fade-in animation
        remClass(s, 'page-enter');
        void s.offsetWidth;
        addClass(s, 'page-enter');
        if (s._peTimer) clearTimeout(s._peTimer);
        s._peTimer = setTimeout(function () {
          remClass(s, 'page-enter');
          s._peTimer = null;
        }, 520);
      } else {
        addClass(s, 'page-hidden');
        s.style.display = 'none';
        remClass(s, 'page-enter');
        if (s._peTimer) { clearTimeout(s._peTimer); s._peTimer = null; }
      }
    });
    
    // Update active state on nav links
    qsa('.nav-list a').forEach(function (l) {
      var linkKey = (l.getAttribute('href') || '').replace('#', '');
      if (linkKey === key) addClass(l, 'active');
      else remClass(l, 'active');
    });
    
    // Update URL hash without scrolling
    if (history.replaceState) {
      history.replaceState(null, '', '#' + key);
    }
    
    window.scrollTo(0, 0);
  }

  on(document, 'click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;
    
    var raw = (link.getAttribute('href') || '').slice(1);
    var key = pageMap[raw] ? raw : sectionPage[raw];
    if (!key) key = 'hero';
    
    e.preventDefault();
    showPage(key);
    
    // If they clicked a deep link like #testimonials, instantly jump to it
    if (pageMap[key].indexOf(raw) !== -1 && pageMap[key][0] !== raw) {
      var t = qs('#' + raw);
      if (t) {
        var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
        window.scrollTo(0, Math.max(0, t.offsetTop - navH - 24));
      }
    }
  });

  // Initialize on load
  var initialHash = (window.location.hash || '').replace('#', '');
  if (pageMap[initialHash]) {
    showPage(initialHash);
  } else if (sectionPage[initialHash]) {
    showPage(sectionPage[initialHash]);
    var t = qs('#' + initialHash);
    if (t) window.scrollTo(0, Math.max(0, t.offsetTop - 72 - 24));
  } else {
    showPage('hero');
  }

  /* ============================================================
     9. GALLERY FILTERS — chip click filters the grid
     ============================================================ */
  var chips = qsa('.gallery-chip');
  var galleryItems = qsa('#galleryGrid .gcard');

  if (chips.length && galleryItems.length) {
    on(document, 'click', function (e) {
      var chip = e.target.closest ? e.target.closest('.gallery-chip') : null;
      if (!chip) return;
      var filter = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        if (c === chip) addClass(c, 'active');
        else remClass(c, 'active');
      });
      galleryItems.forEach(function (item) {
        var cat = item.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) remClass(item, 'page-hidden');
        else addClass(item, 'page-hidden');
      });
    });
  }

  /* ============================================================
     10. SELECT & INQUIRE THEME — carries theme to Reserve page
     ============================================================ */
  var themeBanner = qs('#selectedTheme');
  var themeNameEl = qs('#selectedThemeName');
  var reserveWa   = qs('#reserveWhatsapp');

  on(document, 'click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-theme]') : null;
    if (!btn) return;
    var theme = btn.getAttribute('data-theme');
    if (themeNameEl) themeNameEl.textContent = theme;
    if (themeBanner) themeBanner.hidden = false;
    if (reserveWa) {
      reserveWa.href = 'https://wa.me/923017130942?text=' +
        encodeURIComponent('Hello, I would like to inquire about booking Rabat Hall 16 with the "' + theme + '" stage decor theme. Please share availability and per-plate rates.');
    }
  });

  /* ============================================================
     11. RESERVE PAGE — event chips, guest slider, tiers,
         currency toggle + live estimate → WhatsApp inquiry
     ============================================================ */
  var resSection = qs('#reserve');
  if (resSection) {
    var USD_RATE = 280; // PKR per USD (reference site rate)
    var VENUE_FEE = 300000;
    var DECOR_FEE = 550000;

    var state = {
      event: 'Barat Nuptials',
      tierName: 'Royal Imperial',
      tierPrice: 4950,
      currency: 'PKR',
      guests: 550
    };

    var guestSlider = qs('#guestSlider', resSection);
    var guestCount  = qs('#guestCount', resSection);
    var resDate     = qs('#resDate', resSection);
    var resForm     = qs('#reserveForm', resSection);
    var resName     = qs('#resName', resSection);
    var resPhone    = qs('#resPhone', resSection);
    var resEmail    = qs('#resEmail', resSection);
    var resNotes    = qs('#resNotes', resSection);
    var formMsg     = qs('#formMsg', resSection);
    var resSubmit   = qs('#reserveWhatsapp', resSection);
    var estKey      = qs('#estCateringKey', resSection);
    var estCat      = qs('#estCatering', resSection);
    var estVenue    = qs('#estVenue', resSection);
    var estDecor    = qs('#estDecor', resSection);
    var estTotal    = qs('#estTotal', resSection);
    var incTierName = qs('#incTierName', resSection);
    var incList     = qs('#incList', resSection);
    var themeNameEl = qs('#selectedThemeName', resSection);
    var themeBanner = qs('#selectedTheme', resSection);

    var TIER_INCLUSIONS = {
      'Heritage': [
        'Classic Draped Stage with Warm Uplighting',
        'Time & Taste 3-Course Buffet Feast',
        'Shared Bridal Dressing Room',
        'Standard Hall Lighting & Sound Package',
        'Self-Parking for up to 300 Vehicles'
      ],
      'Royal Imperial': [
        'The Signature Royal Curtain Stage Setup',
        'Time & Taste 4-Course Feast with Live Tandoor',
        'Private Luxury Bridal Suite with Dressing Salon',
        'Moving Head Stage Lights & Low Fog Entry Machine',
        'Full Valet Parking for up to 500 Vehicles'
      ],
      'Sovereign Palace': [
        'Bespoke Moroccan Arch Stage & Colonnade Decor',
        'Time & Taste 6-Course Royal Feast with Live Counters',
        'Presidential Bridal Suite with Private Attendant',
        'Full Intelligent Lighting Rig, Lasers & Fog Entry',
        'Dedicated Valet & Security for up to 1,000 Vehicles'
      ]
    };

    function fmtMoney(pkr) {
      if (state.currency === 'USD') {
        return '$' + Math.round(pkr / USD_RATE).toLocaleString('en-US');
      }
      return 'PKR ' + Math.round(pkr).toLocaleString('en-US');
    }

    function fmtUnit(pkr) {
      // per-guest label, rounded in USD like the reference site
      if (state.currency === 'USD') {
        return '$' + Math.round(pkr / USD_RATE);
      }
      return 'PKR ' + pkr.toLocaleString('en-US');
    }

    function updateSliderFill() {
      if (!guestSlider) return;
      var min = +guestSlider.min || 200;
      var max = +guestSlider.max || 1000;
      var pct = ((state.guests - min) / (max - min)) * 100;
      guestSlider.style.setProperty('--fill', pct + '%');
    }

    function recalc() {
      var catering = state.guests * state.tierPrice;
      var total = catering + VENUE_FEE + DECOR_FEE;
      if (estKey) estKey.textContent = 'Time & Taste Catering (' +
        state.guests + ' × ' + fmtUnit(state.tierPrice) + ')';
      if (estCat) estCat.textContent = fmtMoney(catering);
      if (estVenue) estVenue.textContent = fmtMoney(VENUE_FEE);
      if (estDecor) estDecor.textContent = fmtMoney(DECOR_FEE);
      if (estTotal) estTotal.textContent = fmtMoney(total);
      return total;
    }

    function renderInclusions() {
      if (incTierName) incTierName.textContent = state.tierName;
      if (!incList) return;
      var items = TIER_INCLUSIONS[state.tierName] || [];
      incList.innerHTML = '';
      items.forEach(function (text) {
        var li = document.createElement('li');
        li.textContent = text;
        incList.appendChild(li);
      });
    }

    // Step 1 — event chips
    on(resSection, 'click', function (e) {
      var chip = e.target.closest ? e.target.closest('.event-chip') : null;
      if (chip) {
        qsa('.event-chip', resSection).forEach(function (c) {
          remClass(c, 'active');
          c.setAttribute('aria-pressed', 'false');
        });
        addClass(chip, 'active');
        chip.setAttribute('aria-pressed', 'true');
        state.event = chip.textContent.trim();
        return;
      }

      // Step 3 — currency toggle
      var curr = e.target.closest ? e.target.closest('.curr-btn') : null;
      if (curr) {
        qsa('.curr-btn', resSection).forEach(function (b) {
          remClass(b, 'active');
          b.setAttribute('aria-pressed', 'false');
        });
        addClass(curr, 'active');
        curr.setAttribute('aria-pressed', 'true');
        state.currency = curr.getAttribute('data-curr') || 'PKR';
        qsa('.tier-card', resSection).forEach(function (card) {
          var amtEl = qs('.tier-amt', card);
          var pkr = parseInt(card.getAttribute('data-pkr'), 10);
          if (amtEl && !isNaN(pkr)) amtEl.textContent = fmtUnit(pkr);
        });
        recalc();
        return;
      }

      // Step 3 — tier card
      var tier = e.target.closest ? e.target.closest('.tier-card') : null;
      if (tier) {
        qsa('.tier-card', resSection).forEach(function (c) {
          remClass(c, 'active');
          c.setAttribute('aria-pressed', 'false');
        });
        addClass(tier, 'active');
        tier.setAttribute('aria-pressed', 'true');
        state.tierName = tier.getAttribute('data-tier') || 'Royal Imperial';
        state.tierPrice = parseInt(tier.getAttribute('data-pkr'), 10) || 4950;
        renderInclusions();
        recalc();
      }
    });

    // Step 2 — guest slider
    if (guestSlider) {
      on(guestSlider, 'input', function () {
        state.guests = parseInt(guestSlider.value, 10) || 550;
        if (guestCount) guestCount.textContent = state.guests.toLocaleString('en-US');
        updateSliderFill();
        recalc();
      });
    }

    // Inquiry submit → build prefilled WhatsApp message
        function buildInquiryUrl() {
      var lines = [
        'Hello Rabat Banquet Hall! I would like to inquire about reserving Hall 16.',
        '',
        'Date: ' + (resDate && resDate.value ? resDate.value : 'Not Set'),
        'Host name: ' + (resName && resName.value ? resName.value.trim() : 'N/A'),
        'Phone: ' + (resPhone && resPhone.value ? resPhone.value.trim() : 'N/A')
      ];
      if (resNotes && resNotes.value.trim()) lines.push('Notes: ' + resNotes.value.trim());
      return 'https://wa.me/923017130942?text=' + encodeURIComponent(lines.join('\n'));
    }

    function validateForm() {
      var problems = [];
      if (!resName || !resName.value.trim()) problems.push('host full name');
      if (!resPhone || !resPhone.value.trim()) problems.push('phone / WhatsApp number');
      if (problems.length) {
        if (formMsg) {
          formMsg.textContent = 'Please add your ' + problems.join(' and ') +
            ' so our concierge can reach you.';
          formMsg.hidden = false;
        }
        if (resName && !resName.value.trim()) resName.focus();
        else if (resPhone) resPhone.focus();
        return false;
      }
      if (formMsg) formMsg.hidden = true;
      return true;
    }

    if (resSubmit) {
      on(resSubmit, 'click', function (e) {
        if (!validateForm()) {
          e.preventDefault();
          return;
        }
        resSubmit.href = buildInquiryUrl();
      });
    }
    if (resForm) {
      on(resForm, 'submit', function (e) {
        e.preventDefault();
        if (!validateForm()) return;
        window.open(buildInquiryUrl(), '_blank', 'noopener');
      });
    }

    // initial paint
    updateSliderFill();
    recalc();
  }

  /* ============================================================
     12. CATERING ACCORDION — tap header to expand/collapse
     ============================================================ */
  var accHeaders = qsa('.acc-header');
  accHeaders.forEach(function (header) {
    on(header, 'click', function () {
      var item = header.parentElement;
      var isActive = hasClass(item, 'active');
      // close all
      qsa('.acc-item').forEach(function (i) { remClass(i, 'active'); });
      // if it wasn't active, open it
      if (!isActive) addClass(item, 'active');
    });
  });

  /* ============================================================
     13. HERO SLIDER
     ============================================================ */
  var heroSlides = qsa('.hero-slide');
  if (heroSlides.length > 1) {
    var heroIdx = 0;
    setInterval(function() {
      remClass(heroSlides[heroIdx], 'hero-slide--active');
      heroIdx = (heroIdx + 1) % heroSlides.length;
      addClass(heroSlides[heroIdx], 'hero-slide--active');
    }, 3000);
  }

  /* ============================================================
     14. GALLERY 3D SPHERE — Fibonacci-sphere photo wheel;
         drag to rotate, front-facing face drives the detail
         panel and the ↗ lightbox. Vanilla, zero deps.
     ============================================================ */
  var sphereStage = qs('#sphereStage');
  var sphereOrbit = qs('#sphereOrbit');
  if (sphereStage && sphereOrbit) {
    var faceTitle = qs('#faceTitle');
    var faceDesc  = qs('#faceDesc');
    var sphereBtn = qs('#sphereAction');
    var gallerySection = qs('#gallery');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var faces = [];
    var N = 0;

    var sCards = qsa('.gcard');
    sCards.forEach(function (card) {
      var img = qs('img', card);
      if (!img) return;
      var el = document.createElement('div');
      el.className = 'sphere-face';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '-1');
      var im = document.createElement('img');
      im.src = img.getAttribute('src');
      im.alt = img.alt || '';
      im.loading = 'lazy';
      el.appendChild(im);
      sphereOrbit.appendChild(el);
      faces.push({
        el: el,
        card: card,
        title: (qs('.gcard-title', card) || {}).textContent || '',
        desc: (qs('.gcard-desc', card) || {}).textContent || ''
      });
    });
    N = faces.length;

    if (N) {
      faces.forEach(function (f, i) {
        var lat = 90 - Math.acos(1 - (2 * (i + 0.5)) / N) * 180 / Math.PI;
        var lon = i * 137.508;
        f.lat = lat;
        f.lon = lon;
        f.el.style.transform =
          'rotateY(' + lon.toFixed(2) + 'deg) rotateX(' + lat.toFixed(2) + 'deg) translateZ(var(--sphere-r))';
      });

      var spin = -18;
      var tilt = -6;
      var vel = 0;
      var dragging = false;
      var lastX = 0;
      var lastY = 0;
      var moved = 0;
      var measureTimer = 0;
      var frontIdx = -1;

      function measureFront() {
        var best = -1;
        var bestW = -1;
        for (var i = 0; i < N; i++) {
          var r = faces[i].el.getBoundingClientRect();
          if (r.width > bestW) { bestW = r.width; best = i; }
        }
        if (best !== frontIdx) {
          frontIdx = best;
          faceTitle.textContent = faces[best].title || 'Hall 16 Grand Dome';
          faceDesc.textContent  = faces[best].desc || '16,000 sq. ft. pillarless ballroom bathed in warm candlelight and Moroccan chandeliers.';
          var btn = sphereBtn;
          if (btn) btn.setAttribute('aria-label', 'View details of ' + (faces[best].title || 'this photo'));
          for (var k = 0; k < N; k++) {
            if (k === best) addClass(faces[k].el, 'is-front');
            else remClass(faces[k].el, 'is-front');
          }
        }
      }

      function frame() {
        var vis = !gallerySection || !hasClass(gallerySection, 'page-hidden');
        if (vis) {
          if (!dragging) {
            if (Math.abs(vel) > 0.04) { spin += vel; vel *= 0.93; }
            else if (!reduceMotion) spin += 0.05;
          }
          sphereOrbit.style.transform = 'rotateX(' + tilt + 'deg) rotateY(' + spin + 'deg)';
          if (faces.length) measureFront();
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);

      sphereStage.addEventListener('pointerdown', function (e) {
        if (e.target.closest && e.target.closest('.sphere-action')) return;
        dragging = true;
        vel = 0;
        moved = 0;
        lastX = e.clientX;
        lastY = e.clientY;
        addClass(sphereStage, 'dragging');
        if (sphereStage.setPointerCapture) {
          try { sphereStage.setPointerCapture(e.pointerId); } catch (err) {}
        }
        e.preventDefault();
      });
      sphereStage.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        spin += dx * 0.28;
        vel = dx * 0.28;
        tilt = Math.max(-55, Math.min(55, tilt + dy * 0.12));
        measureFront();
      });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (name) {
        sphereStage.addEventListener(name, function () {
          dragging = false;
          remClass(sphereStage, 'dragging');
        });
      });
      sphereStage.addEventListener('click', function (e) {
        if (moved > 8) return;
        var faceEl = e.target.closest ? e.target.closest('.sphere-face') : null;
        if (!faceEl) return;
        var idx = faces.indexOf(faceEl.__f) ;
        if (idx === -1) {
          for (var i = 0; i < N; i++) { if (faces[i].el === faceEl) { idx = i; break; } }
        }
        if (idx !== -1 && lightbox && lbCards.indexOf(faces[idx].card) !== -1) {
          lbOpen(lbCards.indexOf(faces[idx].card));
        }
      });
      if (sphereBtn) {
        sphereBtn.addEventListener('click', function () {
          if (!lightbox || !faces.length) return;
          var f = faces[frontIdx];
          lbOpen(lbCards.indexOf(f.card));
        });
      }

      sphereStage.addEventListener('dragstart', function (e) { e.preventDefault(); });
    }
  }

})();
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-filter-trigger]').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();

      // Temporarily hide the dropdown so it closes immediately
      var dropdown = this.closest('.dropdown-menu');
      if (dropdown) {
        dropdown.style.display = 'none';
        setTimeout(function() {
          dropdown.style.display = '';
        }, 800);
      }
      
      // Show the Gallery section by simulating click on main nav link
      var galleryNavLink = document.querySelector('.nav-list a[href="#gallery"][data-nav]');
      if (galleryNavLink) {
        galleryNavLink.click();
      }

      var filterValue = this.getAttribute('data-filter-trigger');
      var targetChip = document.querySelector('.gallery-chip[data-filter="' + filterValue + '"]');
      
      if (targetChip) {
        setTimeout(function() {
          targetChip.click();
          var gallerySection = document.querySelector('.gallery-filters');
          if (gallerySection) {
            var offsetPosition = gallerySection.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      }
    });
  });
});