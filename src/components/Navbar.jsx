import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SectionLink from './SectionLink.jsx';
import { ArrowUpRightIcon } from './Icons.jsx';
import { PhoneCall } from 'lucide-react';
import { useContactModal } from '../context/ContactModalContext.jsx';
import './Navbar.css';

const ANNOUNCEMENTS = [
  'RABAT HALL — TOP BANQUET HALL IN LAHORE',
  'TOP CATERING BY TIME & TASTE CATERING',
  'EXTRA ORDINARY BANQUET SERVICES • HALL 16',
  'TIMELESS ELEGANCE, UNFORGETTABLE MOMENTS',
  'A SETTING FOR EXTRAORDINARY CELEBRATIONS',
];

const NAV_LINKS = [
  { label: 'Home', to: '/', match: '/' },
  { label: 'Menu', to: '/menu', match: '/menu' },
  { label: 'Decors & Stages', to: '/decors', match: '/decors' },
  { label: 'Royal Catering', to: '/catering', match: '/catering' },
  { label: 'Other Services', to: '/services', match: '/services' },
  { label: 'Gallery', to: '/gallery', match: '/gallery' },
];

export default function Navbar() {
  const { openContactModal } = useContactModal();
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
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

  /* ---- Close mobile menu on outside click or Escape ---- */
  useEffect(() => {
    function onDocumentClick(event) {
      if (navRef.current && !navRef.current.contains(event.target)) setMobileMenuOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') {
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
            <span className="brand-sub">by Time &amp; Taste Catering</span>
          </div>
        </Link>

        <nav className={'nav-menu' + (mobileMenuOpen ? ' open' : '')} id="navMenu" aria-label="Primary">
          <ul className="nav-list" role="list">
            {NAV_LINKS.map((link) => (
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
            aria-label="Contact Us"
            title="Call or WhatsApp - Contact Us"
          >
            <PhoneCall size={14} strokeWidth={2.4} className="btn-nav-call-icon" style={{ color: '#25D366' }} />
            <span className="btn-nav-call-label">Contact Us</span>
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
