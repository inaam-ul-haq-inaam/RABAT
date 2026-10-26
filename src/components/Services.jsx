import Section from './Section.jsx';
import SectionLink from './SectionLink.jsx';
import { CalendarIcon, PhoneIcon, StarIcon, WhatsAppIcon } from './Icons.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';
import { SERVICES_LIST } from '../data/services.js';
import './Services.css';

const WA_NUMBER = '923256572839';

export default function Services() {
  const { openContactModal } = useContactModal();

  const handleInquireService = (serviceTitle) => {
    const text = encodeURIComponent(
      `Hello Rabat Banquet Hall, I am inquiring about booking your *${serviceTitle}* service for our upcoming event.`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  };

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
            we curate every detail into an extraordinary royal experience.
          </p>
        </header>

        {/* Visual Services Grid */}
        <div className="services-grid" role="list">
          {SERVICES_LIST.map((service) => (
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
                <button
                  type="button"
                  className="btn-service-wa"
                  onClick={() => handleInquireService(service.title)}
                  aria-label={`Inquire about ${service.title} on WhatsApp`}
                >
                  <WhatsAppIcon size={15} />
                  <span>Inquire on WhatsApp</span>
                </button>
                <button
                  type="button"
                  className="btn-service-concierge"
                  onClick={openContactModal}
                  aria-label={`Contact Concierge for ${service.title}`}
                >
                  <PhoneIcon size={14} />
                  <span>Contact Team</span>
                </button>
              </div>
            </article>
          ))}
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
              <SectionLink to="reserve" className="btn-scta-primary">
                <CalendarIcon size={16} />
                <span>INQUIRE ABOUT EVENT DATES</span>
                <span aria-hidden="true">&rarr;</span>
              </SectionLink>
              <button
                type="button"
                onClick={openContactModal}
                className="btn-scta-secondary"
              >
                <WhatsAppIcon size={16} />
                <span>DIRECT CONCIERGE CALL / WHATSAPP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
