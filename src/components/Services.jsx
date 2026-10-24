import { useNavigate } from 'react-router-dom';
import Section from './Section.jsx';
import SectionLink from './SectionLink.jsx';
import { ArrowRightIcon, CalendarIcon, PhoneIcon, StarIcon } from './Icons.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';
import { SERVICES_LIST } from '../data/services.js';
import './Services.css';

export default function Services() {
  const navigate = useNavigate();
  const { openContactModal } = useContactModal();

  const handleFilterClick = (filter) => {
    navigate('/gallery', {
      state: { filter, scrollTo: '.gallery-top-filter-bar', scrollOffset: 80 },
    });
  };

  return (
    <Section className="services-page reveal" id="services" aria-labelledby="services-title">
      <div className="container">
        {/* Page Header */}
        <header className="services-header">
          <span className="services-badge">
            <StarIcon size={14} strokeWidth={2} />
            BESPOKE MILESTONE CELEBRATIONS &bull; HALL 16
          </span>
          <h2 className="services-title" id="services-title">
            Our Royal Event Services
          </h2>
          <p className="services-body">
            From imperial Walima receptions and regal Barats to joyous Mehndis and distinguished corporate banquets,
            explore how Rabat crafts every celebration into an unforgettable royal memory.
          </p>
        </header>

        {/* Visual Services Grid */}
        <div className="services-grid" role="list">
          {SERVICES_LIST.map((service) => (
            <article key={service.id} className="service-card" role="listitem">
              <div className="service-card-top">
                <div className="service-icon-wrap">
                  <img src={service.icon} alt={service.alt} className="service-icon-img" />
                </div>
                <div className="service-meta">
                  <span className="service-sub-badge">{service.sub}</span>
                  <h3 className="service-card-title">{service.title}</h3>
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
                  className="btn-service-gallery"
                  onClick={() => handleFilterClick(service.filter)}
                >
                  <span>View {service.title} Photos</span>
                  <ArrowRightIcon size={14} />
                </button>
                <SectionLink to="reserve" className="btn-service-reserve">
                  <CalendarIcon size={14} />
                  <span>Reserve</span>
                </SectionLink>
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
              Our master wedding concierges and executive culinary team work closely with you to design bespoke menus,
              custom stages, and personalized royal hospitality.
            </p>
            <div className="services-cta-btns">
              <SectionLink to="reserve" className="btn-scta-primary">
                <CalendarIcon size={16} />
                <span>INQUIRE ABOUT DATES</span>
                <span aria-hidden="true">&rarr;</span>
              </SectionLink>
              <button
                type="button"
                onClick={openContactModal}
                className="btn-scta-secondary"
                style={{ cursor: 'pointer', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <PhoneIcon size={16} />
                <span>CALL / WHATSAPP CONCIERGE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
