import Section from './Section.jsx';
import SectionLink from './SectionLink.jsx';
import { useLightbox } from '../context/LightboxContext.jsx';
import { HALLPLAN_METRICS } from '../data/hallplan.js';

const METRIC_ICONS = {
  layout: (
    <>
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  height: <path d="M12 2v20M5 7l7-5 7 5M5 17l7 5 7-5" />,
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  stage: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
};

const BLUEPRINT_IMG = 'images/hall-plan/rabat_bright_courtyard_stage_1790426748468.webp';

export default function HallPlanBlueprint() {
  const { openLightbox } = useLightbox();

  const blueprintCard = {
    src: BLUEPRINT_IMG,
    alt: 'Rabat Hall 16 courtyard and stage layout — grand banquet hall blueprint',
    title: 'Hall 16 — Full Layout',
    tag: 'Blueprint',
  };

  return (
    <Section className="hallplan scrollfade" id="hallplan" aria-labelledby="hallplan-title">
      <div className="glass-card hallplan-card">
        <div className="hallplan-header container">
          <span className="hallplan-eyebrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            HALL 16 BLUEPRINT &amp; CAPACITY
          </span>
          <h2 className="hallplan-title" id="hallplan-title">
            A Magnificent Canvas
          </h2>
          <p className="hallplan-body">
            Hall 16 is engineered as a single uninterrupted volume — no supporting columns to interrupt your Barat
            procession, Mehndi entrance, or stage choreography. Walk the blueprint, then walk the hall.
          </p>
        </div>

        <div className="container">
          <figure
            className="decor-card hallplan-blueprint"
            role="button"
            tabIndex={0}
            aria-label="Preview Hall 16 blueprint full-screen"
            onClick={() => openLightbox([blueprintCard], 0)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLightbox([blueprintCard], 0);
              }
            }}
          >
            <div className="blueprint-frame">
              <picture>
                <source srcSet={BLUEPRINT_IMG} type="image/webp" />
                <img
                  src={BLUEPRINT_IMG}
                  alt="Rabat Hall 16 courtyard and stage layout — grand banquet hall blueprint"
                  width="1376"
                  height="768"
                  loading="lazy"
                />
              </picture>
              <figcaption className="decor-caption">
                <span className="decor-tag">Blueprint</span>
                <h3 className="decor-title">Hall 16 — Full Layout</h3>
                <span className="decor-view" aria-hidden="true">
                  View Full-Screen &#8599;
                </span>
              </figcaption>
            </div>
          </figure>
        </div>

        {/* 4 Luxury Metric Cards */}
        <div className="hallplan-metrics-grid container">
          {HALLPLAN_METRICS.map((metric) => (
            <div className="hp-metric-card" key={metric.label}>
              <div className="hp-metric-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                  {METRIC_ICONS[metric.icon]}
                </svg>
              </div>
              <div className="hp-metric-data">
                <span className="hp-metric-label">{metric.label}</span>
                <strong className="hp-metric-value">{metric.value}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="hallplan-cta">
          <SectionLink to="reserve" className="btn-pill-gold">
            <span>Reserve Your Date</span>
            <span aria-hidden="true">&rarr;</span>
          </SectionLink>
        </div>
      </div>
    </Section>
  );
}
