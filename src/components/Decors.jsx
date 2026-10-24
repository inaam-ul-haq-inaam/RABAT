import Section from './Section.jsx';
import SectionLink from './SectionLink.jsx';
import { CalendarIcon, CrownIcon, DiamondIcon, PhoneIcon } from './Icons.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';
import { DECOR_CARDS, DECORS_BODY } from '../data/decors.js';

const FLOURISH_SMALL = (
  <>
    <path d="M44 4C34 6 22 14 18 26C16 32 17 38 20 44C24 40 28 32 30 26C34 18 42 8 44 4Z" fill="#D4B26F" opacity="0.35" />
    <path d="M44 4C36 10 32 20 32 30" stroke="#D4B26F" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <path d="M38 12C32 16 28 24 28 32" stroke="#D4B26F" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
  </>
);

const FLOURISH_WIDE = (
  <>
    <path d="M50 4C38 7 24 16 20 30C18 36 19 44 23 50C27 45 32 36 34 30C39 20 48 9 50 4Z" fill="#D4B26F" opacity="0.35" />
    <path d="M50 4C40 12 36 23 36 34" stroke="#D4B26F" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <path d="M44 14C37 18 32 27 32 36" stroke="#D4B26F" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
  </>
);

const SIZE_ICON = (
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14" />
  </>
);

function ThemeBadge({ badge }) {
  return (
    <div className="theme-badge">
      {badge.kind === 'crown' ? <CrownIcon size={14} /> : <DiamondIcon size={14} />}
      <span>{badge.label}</span>
    </div>
  );
}

function ThemeSpecs({ card, wide = false }) {
  return (
    <div className={'theme-specs-box' + (wide ? ' theme-specs-box--wide' : '')}>
      <p className="theme-specs-title">INCLUDED SPECIFICATIONS:</p>
      <ul role="list" className={'theme-specs-list' + (wide ? ' theme-specs-list--columns' : '')}>
        {card.specs.map((spec) => (
          <li key={spec}>
            <span>{spec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThemeFooter({ card, onSelect }) {
  return (
    <div className="theme-card-footer">
      <div className="theme-span-wrap">
        <svg
          className="theme-size-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="16"
          height="16"
        >
          {SIZE_ICON}
        </svg>
        <span className="theme-span-label">Stage Size:</span>
        <strong className="theme-span-val">{card.stageSize}</strong>
      </div>
      <SectionLink
        to="reserve"
        className="btn-theme"
        data-theme={card.theme}
        onClick={() => onSelect(card.theme)}
      >
        <span>SELECT &amp; INQUIRE THIS THEME</span>
        <span aria-hidden="true">&rarr;</span>
      </SectionLink>
    </div>
  );
}

export default function Decors() {
  const { selectTheme } = useTheme();
  const { openContactModal } = useContactModal();
  const [cardOne, cardTwo, cardThree] = DECOR_CARDS;

  return (
    <Section className="decors reveal reveal-delay-1" id="decors" aria-labelledby="decors-title">
      <div className="decors-header container">
        <span className="decors-eyebrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          SIGNATURE THEMES &amp; AMBIANCE
        </span>
        <h2 className="decors-title" id="decors-title">
          Decor by Blissfull Event Planner
        </h2>
        <p className="decors-body">{DECORS_BODY}</p>
      </div>

      <div className="decors-grid container">
        {/* CARD 1: Moroccan Dome & Colonnades */}
        <article className="theme-card">
          <div className="theme-card-inner">
            <div className="theme-corner-flourish" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                {FLOURISH_SMALL}
              </svg>
            </div>

            <div className="theme-card-media">
              <ThemeBadge badge={cardOne.badge} />
              <img src={cardOne.img} alt={cardOne.alt} width="1200" height="896" loading="lazy" />
            </div>

            <div className="theme-card-body">
              <div className="theme-main-info">
                <h3 className="theme-title">{cardOne.title}</h3>
                <p className="theme-subtitle">{cardOne.subtitle}</p>
                <p className="theme-desc">{cardOne.desc}</p>
              </div>
              <ThemeSpecs card={cardOne} />
            </div>

            <ThemeFooter card={cardOne} onSelect={selectTheme} />
          </div>
        </article>

        {/* CARD 2: Curtain Stage & Moroccan Themes */}
        <article className="theme-card">
          <div className="theme-card-inner">
            <div className="theme-corner-flourish" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                {FLOURISH_SMALL}
              </svg>
            </div>

            <div className="theme-card-media">
              <ThemeBadge badge={cardTwo.badge} />
              <img src={cardTwo.img} alt={cardTwo.alt} width="1200" height="896" loading="lazy" />
            </div>

            <div className="theme-card-body">
              <div className="theme-main-info">
                <h3 className="theme-title">{cardTwo.title}</h3>
                <p className="theme-subtitle">{cardTwo.subtitle}</p>
                <p className="theme-desc">{cardTwo.desc}</p>
              </div>
              <ThemeSpecs card={cardTwo} />
            </div>

            <ThemeFooter card={cardTwo} onSelect={selectTheme} />
          </div>
        </article>

        {/* CARD 3: Bright Floral Stage (Wide Full-Span Card) */}
        <article className="theme-card theme-card--wide">
          <div className="theme-card-inner">
            <div className="theme-corner-flourish" aria-hidden="true">
              <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
                {FLOURISH_WIDE}
              </svg>
            </div>

            <div className="theme-wide-grid">
              <div className="theme-card-media">
                <ThemeBadge badge={cardThree.badge} />
                <img src={cardThree.img} alt={cardThree.alt} width="1200" height="896" loading="lazy" />
              </div>

              <div className="theme-wide-content">
                <div className="theme-main-info">
                  <h3 className="theme-title">{cardThree.title}</h3>
                  <p className="theme-subtitle">{cardThree.subtitle}</p>
                  <p className="theme-desc">{cardThree.desc}</p>
                </div>

                <ThemeSpecs card={cardThree} wide />

                {/* Card Footer for Wide Card */}
                <ThemeFooter card={cardThree} onSelect={selectTheme} />
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="custom-stage-cta container">
        <div className="csc-inner">
          <span className="csc-eyebrow">BESPOKE CUSTOMIZATION</span>
          <h3 className="csc-title">Envisioning a Unique Stage Concept?</h3>
          <p className="csc-body">
            Our resident visual production designers and master carpenters create custom archways, personalized acrylic
            monogram dance floors, and bespoke floral installations tailored to your family's vision.
          </p>
          <div className="csc-actions">
            <SectionLink to="reserve" className="btn-csc-primary">
              <CalendarIcon size={18} />
              BOOK DESIGN CONSULTATION
            </SectionLink>
            <a
              href="https://wa.me/923256572839"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-csc-secondary"
              style={{ cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <PhoneIcon size={18} style={{ color: '#25D366' }} />
              0325-6572839
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
