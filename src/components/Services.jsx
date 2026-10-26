import Section from './Section.jsx';
import { PhoneIcon, StarIcon, WhatsAppIcon } from './Icons.jsx';
import { SERVICES_LIST } from '../data/services.js';
import './Services.css';

const SERVICES_PHONE_DISPLAY = '0325-6572839';
const SERVICES_PHONE_TEL = '+923256572839';
const SERVICES_WA_NUMBER = '923256572839';

export default function Services() {
  return (
    <Section className="services-page reveal" id="services" aria-labelledby="services-title">
      <div className="container">
        {/* Page Header */}
        <header className="services-header">
          <span className="services-badge">
            <StarIcon size={14} strokeWidth={2} />
            EXTRA ORDINARY BANQUET SERVICES &bull; HALL 16
          </span>
          <h1 className="services-title" id="services-title">
            Other Event Services at Rabat Hall
          </h1>
          <p className="services-body">
            Enhance your celebration beyond luxury banquet halls and fine royal dining with our signature event additions.
            From 360 photo booths and cinematic photography to artisan celebration cakes, concert sound, and grand couple entries,
            we curate every detail into an extraordinary royal memory.
          </p>
        </header>

        {/* Visual Services Grid */}
        <div className="services-grid" role="list">
          {SERVICES_LIST.map((service) => {
            const waText = encodeURIComponent(
              `Hello Rabat Banquet Hall, I am inquiring about booking your *${service.title}* service for our upcoming event.`
            );
            return (
              <article key={service.id} className="service-card" role="listitem">
                <div className="service-card-top">
                  <div className="service-icon-wrap" aria-hidden="true">
                    <span className="service-emoji-icon">{service.icon}</span>
                  </div>
                  <div className="service-meta">
                    <div className="service-letter-row">
                      <span className="service-letter-pill">SERVICE {service.letter}</span>
                      <span className="service-sub-badge">{service.sub}</span>
                    </div>
                    <h2 className="service-card-title">{service.title}</h2>
                  </div>
                </div>

                <p className="service-card-desc">{service.desc}</p>

                <div className="service-highlights">
                  <span className="service-highlights-title">SERVICE HIGHLIGHTS</span>
                  <ul className="service-highlights-list" role="list">
                    {service.highlights.map((item) => (
                      <li key={item} className="service-highlight-item">
                        <span className="service-bullet">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-card-actions">
                  <a
                    href={`https://wa.me/${SERVICES_WA_NUMBER}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-service-wa"
                    aria-label={`Inquire about ${service.title} on WhatsApp (${SERVICES_PHONE_DISPLAY})`}
                  >
                    <WhatsAppIcon size={15} />
                    <span>WhatsApp: {SERVICES_PHONE_DISPLAY}</span>
                  </a>
                  <a
                    href={`tel:${SERVICES_PHONE_TEL}`}
                    className="btn-service-call"
                    aria-label={`Call ${SERVICES_PHONE_DISPLAY} for ${service.title}`}
                  >
                    <PhoneIcon size={14} />
                    <span>Call Direct</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="services-cta">
          <div className="services-cta-inner">
            <span className="services-cta-eyebrow">
              <StarIcon size={14} strokeWidth={2} />
              CUSTOM EVENT CURATION
            </span>
            <h3 className="services-cta-title">Looking for a Tailored Royal Experience?</h3>
            <p className="services-cta-body">
              Our master wedding concierges and executive production team work closely with you to curate custom packages,
              coordinate live artists, and ensure seamless royal hospitality for your big day.
            </p>
            <div className="services-cta-btns">
              <a
                href={`https://wa.me/${SERVICES_WA_NUMBER}?text=${encodeURIComponent(
                  'Hello Rabat Banquet Hall, I would like to consult with your Event Services & Production Team regarding custom arrangements for our event.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-scta-wa"
              >
                <WhatsAppIcon size={18} />
                <span>WhatsApp: {SERVICES_PHONE_DISPLAY}</span>
              </a>
              <a
                href={`tel:${SERVICES_PHONE_TEL}`}
                className="btn-scta-call"
              >
                <PhoneIcon size={17} />
                <span>Call: {SERVICES_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
