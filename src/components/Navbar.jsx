import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SectionLink from './SectionLink.jsx';
import { ArrowUpRightIcon } from './Icons.jsx';
import { PhoneCall } from 'lucide-react';
import { useContactModal } from '../context/ContactModalContext.jsx';

const ANNOUNCEMENTS = [
  'A SETTING FOR EXTRAORDINARY CELEBRATIONS',
  'TIMELESS ELEGANCE, UNFORGETTABLE MOMENTS',
  'DISCOVER THE RABAT EXPERIENCE',
  'YOUR CELEBRATION, BEAUTIFULLY HOSTED',
];

const NAV_LINKS = [
  { label: 'Home', to: '/', match: '/' },
  { label: 'Decors & Stages', to: '/decors', match: '/decors' },
  { label: 'Royal Catering', to: '/catering', match: '/catering' },
  { label: 'Hall Plan', to: '/hallplan', match: '/hallplan' },
  { label: 'Gallery', to: '/gallery', match: '/gallery' },
];

const SERVICES = [
  { filter: 'walima', icon: 'images/walima-icon.png', alt: 'Walima', title: 'Walima', sub: 'Grand Reception' },
  { filter: 'mayon', icon: 'images/mayon-icon.png', alt: 'Mayon', title: 'Mayon', sub: 'Intimate Gathering' },
  { filter: 'barat', icon: 'images/barat-icon.png', alt: 'Barat', title: 'Barat', sub: 'Traditional Procession' },
  { filter: 'nikkah', icon: 'images/nikah-icon.png', alt: 'Nikkah', title: 'Nikkah', sub: 'Sacred Ceremony' },
  { filter: 'mehndi', icon: 'images/mehndi-icon.png', alt: 'Mehndi', title: 'Mehndi', sub: 'Color & Celebration' },
  { filter: 'corporate', icon: 'images/corporate-icon.png', alt: 'Corporate', title: 'Corporate Event', sub: 'Business & Banquet' },
];

const DD_ICON_STYLE = {
  width: '28px',
  height: '28px',
  objectFit: 'contain',
  filter: 'drop-shadow(0 2px 4px rgba(200,162,122,0.2))',
};

export default function Navbar() {
  const { openContactModal } = useContactModal();
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  /* ---- 1. STICKY NAV — scroll shadow + hide/show on scroll direction ---- */
  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return undefined;

    let lastY = window.scrollY;
    let ticking = false;

    function applyNavScroll() {
      const y = window.scrollY;
      if (y > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');

      navbar.style.transform = '';
      navbar.classList.remove('nav-hidden');
      lastY = y;
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(applyNavScroll);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    applyNavScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* ---- 3. SERVICES DROPDOWN — outside click + Escape ---- */
  useEffect(() => {
    function onDocumentClick(event) {
      const dropdown = dropdownRef.current;
      if (dropdown && !dropdown.contains(event.target)) setDropdownOpen(false);
      if (navRef.current && !navRef.current.contains(event.target)) setMobileMenuOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  /* ---- data-filter-trigger: open the gallery tab pre-filtered ---- */
  function onServiceClick(event, filter) {
    event.preventDefault();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/gallery', {
      state: { filter, scrollTo: '.gallery-filters', scrollOffset: 80 },
    });
  }

  return (
    <header className="navbar" id="navbar" role="banner" ref={navRef}>
      <div className="announcement-bar">
        <div className="announcement-inner container">
          <div className="announcement-ticker" role="region" aria-label="Rabat announcements">
            <div className="announcement-track">
              <div className="announcement-group">
                {ANNOUNCEMENTS.map((text, i) => (
                  <span className="announcement-item" key={'a' + i}>
                    {text}
                  </span>
                ))}
              </div>
              <div className="announcement-group" aria-hidden="true">
                {ANNOUNCEMENTS.map((text, i) => (
                  <span className="announcement-item" key={'b' + i}>
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-inner container">
        <Link to="/" className="nav-brand" aria-label="Rabat Banquet Hall Home">
          <svg className="brand-logo" viewBox="0 0 533 999" fill="var(--color-gold)" xmlns="http://www.w3.org/2000/svg">
            <path d="M 159,558 L 156,563 L 156,634 L 154,671 L 155,706 L 236,789 L 242,791 L 245,787 L 246,777 L 245,740 L 248,644 L 242,636 L 167,562 Z" fillRule="evenodd" />
            <path d="M 281,314 L 280,317 L 279,344 L 280,350 L 279,369 L 281,374 L 286,378 L 294,388 L 310,403 L 313,405 L 316,406 L 318,403 L 319,377 L 318,366 L 319,346 L 317,342 L 287,313 Z" fillRule="evenodd" />
            <path d="M 286,182 L 284,183 L 283,185 L 281,240 L 287,247 L 287,248 L 303,263 L 311,272 L 316,276 L 319,276 L 321,274 L 322,267 L 322,240 L 321,231 L 322,215 L 321,213 L 303,196 L 300,192 L 291,184 L 288,182 Z" fillRule="evenodd" />
            <path d="M 424,178 L 420,194 L 411,542 L 291,648 L 286,781 L 290,782 L 454,645 L 496,605 L 508,278 Z" fillRule="evenodd" />
            <path d="M 117,154 L 34,222 L 25,240 L 26,744 L 235,964 L 258,980 L 345,910 L 349,799 L 342,797 L 262,856 L 118,719 Z" fillRule="evenodd" />
            <path d="M 281,25 L 178,129 L 174,486 L 269,607 L 285,596 L 310,568 L 311,516 L 305,514 L 273,542 L 213,473 L 218,154 L 283,94 L 318,129 L 318,73 Z" fillRule="evenodd" />
          </svg>
          <div className="brand-text">
            <span className="brand-title">RABAT</span>
            <span className="brand-sub">by Time &amp; Taste</span>
          </div>
        </Link>

        <nav className={'nav-menu' + (mobileMenuOpen ? ' open' : '')} id="navMenu" aria-label="Primary">
          <ul className="nav-list" role="list">
            <li>
              <Link
                to="/"
                className={'nav-link' + (location.pathname === '/' ? ' active' : '')}
                data-nav
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            <li className={'nav-dropdown services-dropdown' + (dropdownOpen ? ' open' : '')} ref={dropdownRef}>
              <button
                type="button"
                className="nav-link nav-dropdown-trigger"
                aria-expanded={dropdownOpen}
                aria-controls="servicesMenu"
                aria-haspopup="true"
                onClick={(event) => {
                  event.preventDefault();
                  setDropdownOpen((open) => !open);
                }}
              >
                Services{' '}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="dropdown-menu mega-menu">
                <div className="mega-grid" id="servicesMenu">
                  {SERVICES.map((service) => (
                    <a
                      key={service.filter}
                      href="#gallery"
                      className="dropdown-link"
                      data-filter-trigger={service.filter}
                      onClick={(event) => onServiceClick(event, service.filter)}
                    >
                      <div className="dd-icon">
                        <img src={service.icon} alt={service.alt} style={DD_ICON_STYLE} />
                      </div>
                      <div className="dd-text">
                        <span className="dd-title">{service.title}</span>
                        <span className="dd-sub">{service.sub}</span>
                      </div>
                      <div className="dd-arrow">&rarr;</div>
                    </a>
                  ))}
                </div>
                <div style={{ padding: '0.65rem 1rem 0.35rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                  <Link
                    to="/services"
                    style={{
                      color: 'var(--color-gold, #D4AF37)',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>View Dedicated Services Visual Grid</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            </li>

            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={'nav-link' + (location.pathname === link.match ? ' active' : '')}
                  data-nav
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={'nav-toggle' + (mobileMenuOpen ? ' open' : '')}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="navMenu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="nav-actions">
          <button
            type="button"
            className="btn-nav-call"
            onClick={openContactModal}
            aria-label="Contact Concierge"
            title="Call or WhatsApp Concierge (Direct Lines)"
          >
            <PhoneCall size={14} strokeWidth={2.4} className="btn-nav-call-icon" style={{ color: '#25D366' }} />
            <span className="btn-nav-call-label">Concierge</span>
          </button>
          <SectionLink to="reserve" className="btn-contact">
            <span className="btn-contact-text-full">RESERVE HALL</span>
            <span className="btn-contact-text-short">RESERVE</span>
            <ArrowUpRightIcon size={14} strokeWidth={2.5} />
          </SectionLink>
        </div>
      </div>
    </header>
  );
}
