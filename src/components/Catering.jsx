import Section from './Section.jsx';
import SectionLink from './SectionLink.jsx';
import { CalendarIcon, StarIcon, UsersIcon } from './Icons.jsx';
import { CULINARY_CARDS, HERITAGE_PILLARS } from '../data/catering.js';

const CREST_ICONS = {
  cloche: (
    <>
      <path d="M4 11h16a1 1 0 0 1 1 1v1a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7v-1a1 1 0 0 1 1-1z" />
      <path d="M12 4v3" />
      <path d="M8 7h8" />
    </>
  ),
  tagine: (
    <>
      <path d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      <path d="M12 7L6 16h12L12 7z" />
      <path d="M3 16h18a2 2 0 0 1 2 2v1H1v-1a2 2 0 0 1 2-2z" />
    </>
  ),
  flame: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  mezze: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="6.5" r="1.5" />
      <circle cx="12" cy="17.5" r="1.5" />
      <circle cx="6.5" cy="12" r="1.5" />
      <circle cx="17.5" cy="12" r="1.5" />
    </>
  ),
  goblet: (
    <>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10l-1 7a4 4 0 0 1-8 0L7 4z" />
      <path d="M12 11v6" />
      <path d="M10 4V2h4v2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  staff: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
};

export default function Catering() {
  return (
    <Section className="catering-redesign reveal reveal-delay-1" id="catering" aria-labelledby="catering-title">
      <div className="container">
        {/* Editorial Header */}
        <div className="catering-header-center">
          <span className="catering-pill-eyebrow">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="chef-icon"
            >
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
              <line x1="6" y1="17" x2="18" y2="17" />
            </svg>
            A PROJECT BY @TIMEANDTASTECATERING &bull; ROYAL BANQUET DINING
          </span>
          <h2 className="catering-main-title" id="catering-title">
            Royal Wedding Feasts
          </h2>
          <p className="catering-main-body">
            Time &amp; Taste Catering brings decades of culinary pedigree to Rabat Banquet Hall. Experience majestic
            deg-cooked biryanis, authentic Moroccan tagines, and live flaming stations served with five-star royal
            banquet protocol.
          </p>
        </div>

        {/* Heritage Feature Panel (Executive Split Layout) */}
        <div className="catering-heritage-panel">
          {/* Left: Framed Media Display */}
          <div className="heritage-media-wrap">
            <span className="heritage-badge">
              <StarIcon size={13} filled />
              MASTER EXECUTIVE CHEFS
            </span>
            <img
              src="images/catering/rabat_royal_feast_1790443145085.webp"
              alt="Antique Hammered Brass Chafing Displays"
              width="1200"
              height="750"
              loading="lazy"
            />
            <div className="heritage-media-caption">
              <span className="hmc-tag">ROYAL BUFFET CRAFTSMANSHIP</span>
              <h3 className="hmc-title">Antique Hammered Brass Chafing Displays</h3>
            </div>
          </div>

          {/* Right: Editorial Content & Service Pillars */}
          <div className="heritage-content">
            <span className="heritage-eyebrow">
              <StarIcon size={14} strokeWidth={2} />
              CULINARY CRAFTSMANSHIP
            </span>
            <h3 className="heritage-title">Served in Heavy Brass Cloches &amp; Royal Buffets</h3>
            <p className="heritage-lead">
              Every dish is kept sizzling hot in antique hammered brass chafing dishes. Our banquet service staff is
              impeccably trained in five-star protocol, ensuring seamless table replenishment.
            </p>

            <div className="heritage-pillars">
              {HERITAGE_PILLARS.map((pillar) => (
                <div className="heritage-pillar" key={pillar.title}>
                  <div className="pillar-icon">
                    {pillar.crest === 'staff' ? (
                      <UsersIcon size={18} strokeWidth={1.8} full />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        width="18"
                        height="18"
                      >
                        {CREST_ICONS[pillar.crest]}
                      </svg>
                    )}
                  </div>
                  <div className="pillar-text">
                    <strong className="pillar-title">{pillar.title}</strong>
                    <span className="pillar-sub">{pillar.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="heritage-actions">
              <SectionLink to="reserve" className="btn-pill-gold btn-inquire-catering">
                <CalendarIcon size={16} />
                <span>INQUIRE ROYAL FEAST PACKAGE</span>
                <span aria-hidden="true">&rarr;</span>
              </SectionLink>
            </div>
          </div>
        </div>

        {/* Curated Dining Architectures / Grid Header */}
        <div className="culinary-grid-intro">
          <span className="culinary-grid-eyebrow">
            <StarIcon size={13} strokeWidth={2} />
            EXPLORE CATERING ARCHITECTURES
          </span>
          <h3 className="culinary-grid-title">Six Royal Culinary Disciplines</h3>
          <p className="culinary-grid-subtitle">
            Authentic deg-cooked heritage, flaming live tandoors, and curated world banquet themes crafted for grand
            wedding feasts.
          </p>
        </div>

        {/* 6 Image-Led Elevated Culinary Cards Grid */}
        <div className="culinary-cards-grid">
          {CULINARY_CARDS.map((card) => (
            <article className="culinary-card" key={card.title}>
              <div className="culinary-card-inner">
                <div className="culinary-media">
                  <span className="culinary-badge">
                    <StarIcon size={12} strokeWidth={2} />
                    {card.badge}
                  </span>
                  <img src={card.img} alt={card.alt} loading="lazy" />
                </div>
                <div className="culinary-content">
                  <div className="culinary-head-row">
                    <h3 className="culinary-title">{card.title}</h3>
                    <div className="culinary-crest" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        width="18"
                        height="18"
                      >
                        {CREST_ICONS[card.crest]}
                      </svg>
                    </div>
                  </div>
                  <p className="culinary-desc">{card.desc}</p>

                  {card.cuisines ? (
                    <div className="culinary-sig-box culinary-cuisines-box">
                      <span className="culinary-sig-label">
                        <StarIcon size={11} strokeWidth={2.5} />
                        AVAILABLE WORLD CUISINES
                      </span>
                      <ul className="culinary-cuisines-list" role="list">
                        {card.cuisines.map((cuisine) => (
                          <li key={cuisine.name}>
                            <span className="cuisine-bullet">&diams;</span> <strong>{cuisine.name}</strong> &ndash;{' '}
                            {cuisine.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="culinary-sig-box">
                      <span className="culinary-sig-label">
                        <StarIcon size={11} strokeWidth={2.5} />
                        SIGNATURE OFFERING
                      </span>
                      <div className="culinary-sig-dish">
                        <span>{card.dish}</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <p className="culinary-note">
                    <span className="note-bullet">&diams;</span> {card.note}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
