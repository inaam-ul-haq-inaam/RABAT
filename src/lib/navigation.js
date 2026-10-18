/**
 * Routing helpers.
 *
 * The original site was a single index.html whose tabs were swapped by the
 * "PAGE SWITCHER" block in js/main.js (pageMap / sectionPage). Every tab is now
 * a real route and every section id keeps its original owner, so old hash links
 * (#hallplan, #gallery, #hallmarks …) still land in the right place.
 */

/** hash "page key" -> react-router path (the keys match main.js pageMap). */
export const PAGE_PATHS = {
  hero: '/',
  hallplan: '/hallplan',
  decors: '/decors',
  catering: '/catering',
  gallery: '/gallery',
  reserve: '/reserve',
};

/** page key -> section ids, in document order (verbatim from js/main.js pageMap). */
export const PAGE_SECTIONS = {
  hero: ['hero', 'band-1', 'hallmarks', 'band-2', 'features', 'band-3', 'testimonials'],
  hallplan: ['hallplan', 'hallplan-capacity', 'hallplan-stage'],
  decors: ['decors'],
  catering: ['catering'],
  gallery: ['gallery'],
  reserve: ['reserve'],
};

/** section id -> owning page key. */
export const SECTION_OWNER = Object.keys(PAGE_SECTIONS).reduce((acc, key) => {
  PAGE_SECTIONS[key].forEach((id) => {
    acc[id] = key;
  });
  return acc;
}, {});

/** True for the first (entry) section of a page — those scroll to the top. */
export function isPageEntrySection(sectionId) {
  const key = SECTION_OWNER[sectionId];
  return Boolean(key) && PAGE_SECTIONS[key][0] === sectionId;
}

export function pathForSection(sectionId) {
  return PAGE_PATHS[SECTION_OWNER[sectionId] || 'hero'];
}

/** Scroll intent handed from a click to the page that is about to mount. */
export const pendingScroll = { target: null };

export function navHeight() {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
}

/** Verbatim port of the original deep-link scroll: top - navH - 24. */
export function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  window.scrollTo(0, Math.max(0, target.offsetTop - navHeight() - 24));
}

/** Verbatim port of the gallery-filter scroll (rect - 80, smooth). */
export function scrollToSelector(selector, offset = 80) {
  const target = document.querySelector(selector);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Rewrites a pre-migration hash link (#hallplan, #hallmarks, #gallery …) into
 * its route form before HashRouter boots, so bookmarked / shared links keep
 * working. Returns the raw target when the hash pointed at a sub-section.
 */
export function normalizeLegacyHash() {
  const raw = (window.location.hash || '').slice(1);
  if (!raw || raw.startsWith('/')) return null;

  const key = Object.prototype.hasOwnProperty.call(PAGE_PATHS, raw) ? raw : SECTION_OWNER[raw];
  if (!key) return null;

  if (!isPageEntrySection(raw) && PAGE_SECTIONS[key].includes(raw)) {
    pendingScroll.target = raw;
  }
  window.history.replaceState(null, '', '#' + PAGE_PATHS[key]);
  return key;
}
