import './Testimonials.css';
import { useEffect, useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import Section from './Section.jsx';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx';
import { TESTIMONIALS } from '../data/testimonials.js';

const AUTOCHANGE_MS = 3000;

const AVATAR_ICONS = {
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  building: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
};

export default function Testimonials() {
  const total = TESTIMONIALS.length;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  /* 5. TESTIMONIAL CAROUSEL — 3s autoplay, paused on hover/focus */
  useEffect(() => {
    if (total < 2 || paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => {
      setCurrentIdx((index) => (index + 1) % total);
    }, AUTOCHANGE_MS);
    return () => window.clearTimeout(timer);
  }, [currentIdx, paused, total]);

  function next() {
    setCurrentIdx((index) => (index + 1) % total);
  }

  function prev() {
    setCurrentIdx((index) => (index - 1 + total) % total);
  }

  function onCarouselKeyDown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    }
  }

  return (
    <Section className="testimonials reveal reveal-delay-1" id="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials-inner container">
        <div className="testi-header">
          <div className="testi-rating-badge">
            <div className="testi-stars-row" aria-label="5 star rating">
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
            </div>
            <span className="testi-rating-text">
              <strong>4.9 / 5.0</strong> &bull; Google Verified Host Reviews
            </span>
          </div>

          <h2 className="testi-title" id="testimonials-title">
            Client Reviews &amp; Verified Wedding Stories
          </h2>
          <p className="testi-body">
            Explore authentic experiences and five-star reviews from Lahore's distinguished wedding &amp; corporate hosts at Rabat Hall
          </p>
        </div>

        <div
          className="carousel"
          aria-label="Guest testimonials"
          onKeyDown={onCarouselKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="carousel-track" id="carouselTrack" role="list">
            {TESTIMONIALS.map((slide, index) => (
              <figure
                className={'slide' + (index === currentIdx ? ' active' : '')}
                role="listitem"
                aria-roledescription="slide"
                aria-label={'Slide ' + (index + 1) + ' of ' + total}
                aria-hidden={index === currentIdx ? 'false' : 'true'}
                key={slide.name}
              >
                <div className="testi-card">
                  <div className="testi-left">
                    <div className="testi-img-wrap">
                      <img src={slide.img} alt={slide.alt} loading="lazy" />
                    </div>
                  </div>
                  <div className="testi-divider">
                    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 0L14 18L24 20L14 22L12 40L10 22L0 20L10 18Z" fill="var(--color-gold)" stroke="none" />
                      <circle cx="12" cy="20" r="3" fill="var(--color-on-light)" />
                    </svg>
                  </div>
                  <div className="testi-right">
                    <div className="testi-card-topbar">
                      <div className="testi-card-stars" aria-label="5 out of 5 stars">
                        <Star size={17} fill="#F59E0B" color="#F59E0B" />
                        <Star size={17} fill="#F59E0B" color="#F59E0B" />
                        <Star size={17} fill="#F59E0B" color="#F59E0B" />
                        <Star size={17} fill="#F59E0B" color="#F59E0B" />
                        <Star size={17} fill="#F59E0B" color="#F59E0B" />
                      </div>
                      <span className="testi-verified-badge">
                        <CheckCircle2 size={13} strokeWidth={2.4} />
                        Verified Host
                      </span>
                    </div>

                    <blockquote className="testi-quote">
                      <span className="testi-quote-icon" aria-hidden="true">
                        &ldquo;
                      </span>
                      <p>{slide.quote}</p>
                    </blockquote>
                    <hr className="testi-line" />
                    <figcaption className="testi-author">
                      <div className="testi-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {AVATAR_ICONS[slide.avatar]}
                        </svg>
                      </div>
                      <div className="testi-author-info">
                        <span className="testi-name">{slide.name}</span>
                        <span className="testi-event">{slide.event}</span>
                      </div>
                    </figcaption>
                  </div>
                </div>
              </figure>
            ))}
          </div>

          <div className="carousel-nav">
            <button className="nav-btn prev-btn" id="carouselPrev" aria-label="Previous testimonial" onClick={prev}>
              <ChevronLeftIcon size={24} strokeWidth={2} />
            </button>
            <div className="dots" id="carouselDots" role="tablist" aria-label="Slides">
              {total > 1 &&
                TESTIMONIALS.map((slide, index) => (
                  <button
                    key={'dot-' + index}
                    type="button"
                    className={'carousel-dot' + (index === currentIdx ? ' active' : '')}
                    role="tab"
                    aria-label={'Go to slide ' + (index + 1)}
                    aria-selected={index === currentIdx ? 'true' : 'false'}
                    aria-controls="carouselTrack"
                    tabIndex={0}
                    onClick={() => setCurrentIdx(index)}
                  />
                ))}
            </div>
            <button className="nav-btn next-btn" id="carouselNext" aria-label="Next testimonial" onClick={next}>
              <ChevronRightIcon size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
