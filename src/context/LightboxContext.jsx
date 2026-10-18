import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const LightboxContext = createContext(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used inside <LightboxProvider>');
  return ctx;
}

/**
 * Port of js/main.js section 7 — DECOR LIGHTBOX.
 *
 * The original collected every `.decor-card` and `.gcard` in document order and
 * rendered the card's image + "tag · title" caption. Here each page hands its own
 * cards to `openLightbox(items, index)` — same markup, same keyboard/backdrop
 * behaviour, same body scroll lock.
 */
export function LightboxProvider({ children }) {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    if (lastFocus.current && typeof lastFocus.current.focus === 'function') {
      lastFocus.current.focus();
    }
  }, []);

  const openLightbox = useCallback((nextItems, startIndex) => {
    if (!nextItems || !nextItems.length) return;
    const total = nextItems.length;
    lastFocus.current = document.activeElement;
    setItems(nextItems);
    setIndex(((startIndex % total) + total) % total);
    setOpen(true);
  }, []);

  const step = useCallback(
    (dir) => {
      setIndex((prev) => {
        if (!items.length) return prev;
        return (prev + dir + items.length) % items.length;
      });
    },
    [items.length],
  );

  // body scroll lock + initial focus (original lbOpen / lbClose)
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape / arrow keys (original document keydown handler)
  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(event) {
      if (event.key === 'Escape') closeLightbox();
      else if (event.key === 'ArrowRight') step(1);
      else if (event.key === 'ArrowLeft') step(-1);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeLightbox, step]);

  const current = items[index] || null;
  const caption = current ? (current.tag ? current.tag + ' · ' : '') + (current.title || '') : '';

  const value = useMemo(() => ({ openLightbox, closeLightbox }), [openLightbox, closeLightbox]);

  return (
    <LightboxContext.Provider value={value}>
      {children}

      {/* ========== DECOR LIGHTBOX ========== */}
      <div
        className={'lightbox' + (open ? ' open' : '')}
        id="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Decor full-screen preview"
        aria-hidden={open ? 'false' : 'true'}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}
      >
        <button
          className="lightbox-close"
          id="lightboxClose"
          type="button"
          aria-label="Close preview"
          ref={closeRef}
          onClick={closeLightbox}
        >
          &times;
        </button>
        <button
          className="lightbox-btn lightbox-prev"
          id="lightboxPrev"
          type="button"
          aria-label="Previous decor"
          onClick={() => step(-1)}
        >
          <span aria-hidden="true">&#8249;</span>
        </button>
        <figure className="lightbox-figure">
          <img id="lightboxImg" src={current ? current.src : ''} alt={current ? current.alt : ''} />
          <figcaption id="lightboxCaption">{caption}</figcaption>
        </figure>
        <button
          className="lightbox-btn lightbox-next"
          id="lightboxNext"
          type="button"
          aria-label="Next decor"
          onClick={() => step(1)}
        >
          <span aria-hidden="true">&#8250;</span>
        </button>
      </div>
    </LightboxContext.Provider>
  );
}
