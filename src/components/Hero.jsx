import { Fragment, useEffect, useState } from 'react';
import Section from './Section.jsx';
import SectionLink from './SectionLink.jsx';
import { CalendarIcon } from './Icons.jsx';
import { HERO_FEATURES, HERO_SLIDES } from '../data/home.js';

const FEATURE_ICONS = {
  pavilion: <path d="M2 20h20M5 20V9l4 4 3-8 3 8 4-4v11" />,
  interior: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14M8 12h8M6 16h12" />
    </>
  ),
  catering: <path d="M12 2a9 9 0 0 0-9 9v2h18v-2a9 9 0 0 0-9-9zM2 13h20v2H2z" />,
  parking: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
};

export default function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);

  /* 13. HERO SLIDER — swaps slides after splash screen completes (7s initial delay, then every 4s) */
  useEffect(() => {
    if (HERO_SLIDES.length < 2) return undefined;
    let timer;
    const initialDelay = window.setTimeout(() => {
      setSlideIndex((index) => (index + 1) % HERO_SLIDES.length);
      timer = window.setInterval(() => {
        setSlideIndex((index) => (index + 1) % HERO_SLIDES.length);
      }, 4000);
    }, 7000);

    return () => {
      window.clearTimeout(initialDelay);
      if (timer) window.clearInterval(timer);
    };
  }, []);

  return (
    <Section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        {HERO_SLIDES.map((slide, index) => (
          <picture
            className={'hero-slide' + (index === slideIndex ? ' hero-slide--active' : '')}
            key={slide.src}
          >
            <source srcSet={slide.src} type={slide.type} />
            <img
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              loading={slide.eager ? 'eager' : 'lazy'}
              fetchpriority={slide.eager ? 'high' : undefined}
            />
          </picture>
        ))}
        <div className="hero-overlay" aria-hidden="true" />
      </div>

      <div className="container">
        <div className="hero-content">
          <p className="hero-eyebrow">LAHORE’S SIGNATURE EVENT DESTINATION</p>
          <h1 className="hero-title" id="hero-title">
            {/* the original markup keeps a whitespace text node between the two
                spans — visible below 680px where they become inline */}
            <span>Where Grand Celebrations</span>{' '}
            <span>Become Timeless Memories</span>
          </h1>
          <p className="hero-lead">
            From regal wedding ceremonies to unforgettable receptions, discover exceptional celebrations at Rabat,
            Lahore.
          </p>
          <div className="hero-actions">
            <SectionLink to="reserve" className="btn-primary">
              <CalendarIcon size={18} />
              CHECK AVAILABILITY &amp; RESERVE &rarr;
            </SectionLink>
            <SectionLink to="hallplan" className="btn-ghost">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              INSPECT HALL PLAN BLUEPRINT &rarr;
            </SectionLink>
          </div>

          <div className="hero-features">
            {HERO_FEATURES.map((feature, index) => (
              <Fragment key={feature.span}>
                <div className="hero-feature">
                  <div className="feature-icon-circle">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      {FEATURE_ICONS[feature.icon]}
                    </svg>
                  </div>
                  <div className="feature-text">
                    <strong>{feature.strong}</strong>
                    <span>{feature.span}</span>
                  </div>
                </div>
                {index < HERO_FEATURES.length - 1 && <div className="feature-divider" />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            fill="var(--color-bg)"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </Section>
  );
}
