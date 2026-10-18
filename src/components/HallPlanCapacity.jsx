import Section from './Section.jsx';
import { StarIcon, UsersIcon } from './Icons.jsx';
import { CAPACITY_CARDS } from '../data/hallplan.js';

export default function HallPlanCapacity() {
  return (
    <Section
      className="hallplan-capacity reveal reveal-delay-1"
      id="hallplan-capacity"
      aria-labelledby="capacity-title"
    >
      <div className="container">
        <div className="hallplan-header">
          <span className="hallplan-eyebrow">
            <UsersIcon size={14} strokeWidth={2} full />
            Seating Capacities
          </span>
          <h2 className="hallplan-title" id="capacity-title">
            Choose Your Ceremony Layout
          </h2>
          <p className="hallplan-body">
            Round-table intimacy or grand theatre aisle — Hall 16 adapts seamlessly to every wedding ceremony and
            corporate gala.
          </p>
        </div>

        <div className="capacity-cards-grid">
          {CAPACITY_CARDS.map((card) => (
            <article className="capacity-card" key={card.title}>
              <div className="capacity-card-inner">
                <div className="capacity-media">
                  <span className="capacity-badge">
                    <StarIcon size={13} strokeWidth={2} />
                    {card.badge}
                  </span>
                  <img src={card.img} alt={card.alt} loading="lazy" />
                </div>
                <div className="capacity-content">
                  <div className="capacity-head-row">
                    <div>
                      <h3 className="capacity-title">{card.title}</h3>
                      <p className="capacity-tagline">{card.tagline}</p>
                    </div>
                    <div className="capacity-guest-pill">
                      <UsersIcon size={15} strokeWidth={2} />
                      <strong>{card.guests}</strong> <span>GUESTS</span>
                    </div>
                  </div>

                  <div className="capacity-style-box">
                    <span className="capacity-style-tag">{card.styleTag}</span>
                    <p className="capacity-desc">{card.desc}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="capacity-note">
          Figures include banquet round tables of 10. Custom layouts and floor plans available on request.
        </p>
      </div>
    </Section>
  );
}
