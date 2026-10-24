import { Link, useLocation } from 'react-router-dom';
import SectionLink from './SectionLink.jsx';
import { CalendarIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './Icons.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';
import { CONTACT_NUMBERS } from '../data/contact.js';

const EXPERIENCE_LINKS = [
  { to: 'hero', label: 'The Grand Hall' },
  { to: 'hallmarks', label: 'Palace Hallmarks' },
  { to: 'features', label: 'Location & Highlights' },
  { to: 'hallplan', label: 'Hall Blueprint & Layout' },
  { to: 'gallery', label: 'Visual Gallery' },
];

const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=RABAT%20banquet%20hall%20by%20Time%20%26%20Taste%2C%20Moulana%20Shoukat%2C%20Ali%20Road%2C%20Plot%209%20Saadat%20Farooq%20Rd%2C%20Saddar%20Town%2C%20Lahore%2C%20Pakistan';

export default function Footer() {
  const { openContactModal } = useContactModal();
  const location = useLocation();

  // Hide entire footer on the dedicated Reserve page
  if (location.pathname === '/reserve') {
    return null;
  }

  return (
    <footer className="r-footer" id="footer" role="contentinfo">
      {/* 1. TOP BANNER: Blurred Ambient Photo & Curved Invitation Card */}
      <div className="r-footer-banner">
        <div className="r-banner-bg" style={{ backgroundImage: "url('images/hero/ai_hero_table.jpg')" }} />
        <div className="r-banner-overlay" />

        <div className="container r-banner-inner">
          {/* Left Curved Card */}
          <div className="r-banner-card">
            <div className="r-card-tag">
              <span>PLAN YOUR IMPERIAL CELEBRATION</span>
              <span className="r-tag-line" />
            </div>
            <h2 className="r-card-title">Begin Your Journey at Rabat</h2>
            <p className="r-card-desc">
              Experience the grandeur of bespoke culinary curation and opulent Moroccan architecture in Lahore Cantt.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="r-banner-actions">
            <SectionLink
              to="reserve"
              className="r-btn-gold-pill"
            >
              <CalendarIcon size={18} />
              <span>SCHEDULE A PRIVATE TOUR</span>
              <span className="r-arrow">&rarr;</span>
            </SectionLink>

            <button
              type="button"
              onClick={openContactModal}
              className="r-btn-dark-pill"
              style={{ cursor: 'pointer', border: 'none' }}
            >
              <WhatsAppIcon size={18} />
              <span>CHAT ON WHATSAPP</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. METALLIC WAVE SEPARATOR */}
      <div className="r-wave-separator" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C380,45 820,55 1440,5 L1440,60 L0,60 Z" fill="url(#goldGradientWave)" />
          <path d="M0,0 C380,45 820,55 1440,5" stroke="url(#goldStrokeWave)" strokeWidth="3" />
          <defs>
            <linearGradient id="goldGradientWave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0A0A0C" />
              <stop offset="35%" stopColor="#12100E" />
              <stop offset="50%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="goldStrokeWave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#554425" />
              <stop offset="45%" stopColor="#DFB86C" />
              <stop offset="70%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#C5A059" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 3. SPLIT BODY: Left Dark Onyx | Right Brushed Champagne Gold */}
      <div className="r-footer-body">
        {/* LEFT HALF: Midnight Onyx */}
        <div className="r-footer-half r-half-dark">
          {/* Decorative Corner Mandalas */}
          <div className="r-mandala r-mandala-tl" aria-hidden="true" />
          <div className="r-mandala r-mandala-bl" aria-hidden="true" />

          <div className="r-dark-inner">
            {/* Brand Column */}
            <div className="r-col r-col-brand">
              <div className="r-brand-header">
                <div className="r-brand-logo-hex">
                  <svg viewBox="0 0 155 270" fill="#C5A059" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 52,153 L 53,174 L 56,193 L 79,212 L 82,212 L 82,201 L 80,189 L 79,172 L 55,152 Z" fillRule="evenodd" />
                    <path d="M 79,84 L 79,93 L 80,98 L 81,100 L 85,104 L 89,107 L 92,107 L 92,101 L 91,92 L 90,90 L 87,87 L 83,84 L 81,83 Z" fillRule="evenodd" />
                    <path d="M 79,48 L 77,49 L 76,52 L 77,63 L 78,65 L 84,71 L 89,73 L 89,62 L 88,56 L 82,50 Z" fillRule="evenodd" />
                    <path d="M 31,45 L 9,69 L 21,204 L 84,260 L 91,262 L 112,241 L 109,210 L 87,228 L 46,195 Z" fillRule="evenodd" />
                    <path d="M 116,44 L 113,49 L 120,141 L 90,173 L 91,200 L 94,209 L 144,157 L 139,68 Z" fillRule="evenodd" />
                    <path d="M 71,7 L 47,37 L 55,133 L 66,146 L 85,162 L 94,151 L 93,138 L 91,136 L 83,144 L 65,126 L 59,43 L 75,26 L 85,33 L 83,17 Z" fillRule="evenodd" />
                  </svg>
                </div>
                <div className="r-brand-titles">
                  <h3 className="r-brand-name">R A B A T</h3>
                  <span className="r-brand-sub">by Time &amp; Taste</span>
                </div>
              </div>

              <p className="r-brand-text">
                Lahore's premier Moroccan-accented palace for royal Barats, Walimas, and distinguished corporate
                banquets, Crafted for unforgettable evenings.
              </p>

              <div className="r-socials">
                <a
                  href="https://instagram.com/rabatbanquethall"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="r-social-link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/923017130942"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="r-social-link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
                <Link to="/" aria-label="Facebook" className="r-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.8l.2-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
                <Link to="/" aria-label="YouTube" className="r-social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Divider with Diamond */}
            <div className="r-vdivider r-vdivider-dark" aria-hidden="true">
              <span className="r-diamond">♦</span>
            </div>

            {/* Experiences Column */}
            <div className="r-col r-col-exp">
              <div className="r-col-header">
                <span className="r-header-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
                    <path d="M5.8 11.3 2 22l10.7-3.79M4 3h.01M22 8h.01M15 2h.01M22 20h.01M22 2l-2.24.75a10 10 0 0 0-6.4 6.4L12.6 11.4" />
                  </svg>
                </span>
                <h4 className="r-col-title">Experiences</h4>
              </div>
              <div className="r-title-underline">
                <span />
              </div>

              <ul className="r-links-list" role="list">
                {EXPERIENCE_LINKS.map((link) => (
                  <li key={link.to}>
                    <SectionLink to={link.to}>
                      <span className="r-chev">&rsaquo;</span> <span>{link.label}</span>{' '}
                      <span className="r-chev-r">&rsaquo;</span>
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT HALF: Brushed Champagne Gold */}
        <div className="r-footer-half r-half-gold">
          {/* Decorative Corner Mandala in Gold Area */}
          <div className="r-mandala r-mandala-br-gold" aria-hidden="true" />

          <div className="r-gold-inner">
            {/* Venue Column */}
            <div className="r-col r-col-venue">
              <div className="r-col-header">
                <span className="r-header-icon r-header-icon-dark">
                  <PinIcon size={20} strokeWidth={2} color="#1A1A1A" />
                </span>
                <h4 className="r-col-title r-col-title-dark">The Venue</h4>
              </div>
              <div className="r-title-underline r-title-underline-dark">
                <span />
              </div>

              <div className="r-venue-details">
                <strong className="r-venue-hall">Hall #: 16, RABAT</strong>
                <p className="r-venue-text">
                  RABAT Banquet Hall by Time &amp; Taste
                  <br />
                    <br />
                  Plot 9 Saadat Farooq Rd,
                  <br />
                  Saddar Town, Lahore, Pakistan
                </p>
              </div>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="r-btn-map-pill"
              >
                <PinIcon size={15} strokeWidth={2} />
                <span>VIEW ON MAP</span>
                <span className="r-arrow">&rarr;</span>
              </a>
            </div>

            {/* Divider with Diamond */}
            <div className="r-vdivider r-vdivider-gold" aria-hidden="true">
              <span className="r-diamond">♦</span>
            </div>

            {/* Inquiries Column */}
            <div className="r-col r-col-inq">
              <div className="r-col-header">
                <span className="r-header-icon r-header-icon-dark">
                  <PhoneIcon size={20} strokeWidth={2} color="#1A1A1A" />
                </span>
                <h4 className="r-col-title r-col-title-dark">Inquiries</h4>
              </div>
              <div className="r-title-underline r-title-underline-dark">
                <span />
              </div>

              {/* 3 Contact Numbers (matching More > Contact Us) */}
              <div className="r-footer-contacts-list">
                {CONTACT_NUMBERS.map((item) => (
                  <div key={item.display} className="r-footer-contact-row">
                    <a
                      href={`tel:${item.tel}`}
                      className="r-footer-phone-val"
                      title={`Call ${item.display}`}
                    >
                      {item.display}
                    </a>
                    <div className="r-footer-contact-actions">
                      <a
                        href={`https://wa.me/${item.wa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="r-footer-action-btn r-footer-wa-btn"
                        aria-label={`WhatsApp ${item.display}`}
                        title={`Chat on WhatsApp (${item.display})`}
                      >
                        <WhatsAppIcon size={16} />
                      </a>
                      <a
                        href={`tel:${item.tel}`}
                        className="r-footer-action-btn r-footer-call-btn"
                        aria-label={`Call ${item.display}`}
                        title={`Call ${item.display}`}
                      >
                        <PhoneIcon size={14} color="#C5A059" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM BAR */}
      <div className="r-footer-bottom">
        <div className="r-bottom-left">
          <p className="r-copy">&copy; {new Date().getFullYear()} Rabat by Time &amp; Taste. All Rights Reserved.</p>
        </div>
        <div className="r-bottom-right">
          <div className="r-legal-links">
            <Link to="/">Privacy Policy</Link>
            <span className="r-pipe">|</span>
            <Link to="/">Terms of Service</Link>
            <span className="r-pipe">|</span>
            <Link to="/">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
