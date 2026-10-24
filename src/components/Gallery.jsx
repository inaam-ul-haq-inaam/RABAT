import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Section from './Section.jsx';
import PhotoSphere from './PhotoSphere.jsx';
import { useLightbox } from '../context/LightboxContext.jsx';
import { ArrowRightIcon, StarIcon, ZoomIcon } from './Icons.jsx';
import { GALLERY_FILTERS, GALLERY_ITEMS } from '../data/gallery.js';

/**
 * Lightbox payload — mirrors the original lbRender() caption
 * (".gcard-tag · .gcard-title") and image.
 */
const LIGHTBOX_ITEMS = GALLERY_ITEMS.map((item) => ({
  src: item.img,
  alt: item.alt,
  title: item.title,
  tag: item.tag,
}));

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const location = useLocation();
  const { openLightbox } = useLightbox();

  /* 9. GALLERY FILTERS — chips, plus the nav mega-menu's data-filter-trigger */
  useEffect(() => {
    if (location.state && location.state.filter) setFilter(location.state.filter);
  }, [location.key, location.state]);

  const getFilterCount = (cat) => {
    if (cat === 'all') return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter((item) => item.cat === cat).length;
  };

  return (
    <Section className="gallery-page reveal reveal-delay-1" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <header className="gallery-header">
          <span className="gallery-badge">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            INTERACTIVE 3D SPHERE SHOWCASE &bull; REAL EVENT ARCHIVES
          </span>
          <h2 className="gallery-title" id="gallery-title">
            Rabat Event Gallery
          </h2>
          <p className="gallery-body">
            Drag and spin the interactive 3D sphere to explore live photographs from Lahore's most distinguished
            Barats, Walimas, Mehndis, and Royal banquets hosted in Hall 16.
          </p>
        </header>

        {/* ========== TOP HORIZONTALLY SCROLLABLE FILTER CHIPS (MOBILE & QUICK FILTERS) ========== */}
        <div className="gallery-top-filter-bar" role="region" aria-label="Event category filters">
          <div className="gallery-filters-scroll" role="tablist" aria-label="Event category filter pills">
            {GALLERY_FILTERS.map((chip) => (
              <button
                key={chip.value}
                className={'gallery-chip' + (filter === chip.value ? ' active' : '')}
                type="button"
                role="tab"
                aria-selected={filter === chip.value}
                data-filter={chip.value}
                onClick={() => setFilter(chip.value)}
              >
                <span>{chip.label}</span>
                <span className="gallery-chip-count">{getFilterCount(chip.value)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ========== INTERACTIVE 3D PHOTO SPHERE ========== */}
        <PhotoSphere items={GALLERY_ITEMS} onOpen={(index) => openLightbox(LIGHTBOX_ITEMS, index)} />

        {/* ========== ARCHIVAL PHOTO CARDS ========== */}
        <div className="archive-head">
          <div className="archive-head-text">
            <span className="archive-eyebrow">
              <StarIcon size={13} strokeWidth={2} />
              ARCHIVAL EVENT PHOTOGRAPHS
            </span>
            <h3 className="archive-title">Hall 16 Real Celebrations</h3>
          </div>
          <div className="gallery-filters" role="tablist" aria-label="Gallery filters">
            {GALLERY_FILTERS.map((chip) => (
              <button
                className={'gallery-chip' + (filter === chip.value ? ' active' : '')}
                type="button"
                data-filter={chip.value}
                key={chip.value}
                onClick={() => setFilter(chip.value)}
              >
                <span>{chip.label}</span>
                <span className="gallery-chip-count">{getFilterCount(chip.value)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="gcard-grid" id="galleryGrid">
          {GALLERY_ITEMS.map((card, index) => (
            <article
              className={'gcard' + (filter !== 'all' && card.cat !== filter ? ' page-hidden' : '')}
              data-cat={card.cat}
              role="button"
              tabIndex={0}
              aria-label={card.ariaLabel}
              key={card.title + '-' + index}
              onClick={() => openLightbox(LIGHTBOX_ITEMS, index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openLightbox(LIGHTBOX_ITEMS, index);
                }
              }}
            >
              <div className="gcard-img">
                <span className="gcard-cat-badge">{card.badge}</span>
                <span className="gcard-zoom-badge" aria-hidden="true">
                  <ZoomIcon size={13} strokeWidth={2.2} />
                </span>
                <img src={card.img} alt={card.alt} loading="lazy" width={card.width} height={card.height} />
              </div>
              <div className="gcard-body">
                <span className="gcard-eyebrow">{card.eyebrow}</span>
                <h4 className="gcard-title">{card.title}</h4>
                <p className="gcard-desc">{card.desc}</p>
                <div className="gcard-foot">
                  <span className="gcard-tag">{card.tag}</span>
                  <span className="gcard-arrow" aria-hidden="true">
                    <ArrowRightIcon size={15} strokeWidth={2} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </Section>
  );
}
