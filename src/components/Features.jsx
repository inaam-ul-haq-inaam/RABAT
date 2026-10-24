import Section from './Section.jsx';
import SectionLink from './SectionLink.jsx';
import { PinIcon } from './Icons.jsx';

export default function Features() {
  return (
    <Section className="features scrollfade" id="features" aria-labelledby="features-title">
      <div className="features-grid">
        <div className="features-media">
          <picture>
            <source srcSet="images/hall-plan/rabat_bright_palace_hall_1790426732749.webp" type="image/webp" />
            <img
              src="images/hall-plan/rabat_bright_palace_hall_1790426732749.webp"
              alt="Rabat hall - Top banquet hall in Lahore showcasing Moroccan dome, colonnades, and grand interior"
              className="features-img"
              width="1376"
              height="768"
              loading="lazy"
              fetchpriority="medium"
            />
          </picture>
        </div>
        <div className="features-content">
          <span className="features-eyebrow">
            <PinIcon size={14} strokeWidth={2} />{' '}
            ABOUT RABAT HALL &bull; GARRISON GOLF &amp; COUNTRY CLUB
          </span>
          <h2 className="features-title" id="features-title">
            Why Rabat Hall Is the Top Banquet Hall in Lahore
          </h2>
          <p className="features-lead">
            Nestled inside the prestigious Lahore Garrison Golf &amp; Country Club on New Airport Road, Rabat hall stands out as the top banquet hall in Lahore. Designed for couples and families who seek royal sophistication, our venue pairs Moroccan architectural grandeur with elite Cantt privacy, expansive parking, and extra ordinary banquet services that ensure every occasion is effortless and unforgettable.
          </p>
          <div className="features-cards" role="list">
            <article className="feature-card" role="listitem">
              <div className="feature-icon-inner">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  <path
                    d="m12 10.5 1.8 3.7 4.1.6-3 2.9.7 4.1-3.6-1.9-3.6 1.9.7-4.1-3-2.9 4.1-.6L12 10.5z"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>
              <div>
                <h3 className="feature-title">Prime Cantt Location &amp; Military-Grade Security</h3>
                <p className="feature-body">Rabat hall offers complete peace of mind, zero traffic bottlenecks, and secure protocols for your VIP dignitaries, families, and overseas guests.</p>
              </div>
            </article>
            <article className="feature-card" role="listitem">
              <div className="feature-icon-inner">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </div>
              <div>
                <h3 className="feature-title">Extra Ordinary Banquet Services &amp; Concierge</h3>
                <p className="feature-body">
                  From acoustic sound engineering and motorized smart-stage technology to custom bridal vanity suites and top catering coordination, Rabat hall delivers excellence.
                </p>
              </div>
            </article>
          </div>
          <SectionLink to="hallplan" className="btn-pill-gold">
            INSPECT HALL PLAN BLUEPRINT
          </SectionLink>
        </div>
      </div>
    </Section>
  );
}
