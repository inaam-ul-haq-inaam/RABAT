import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Sparkles,
  UtensilsCrossed,
  Images,
  Menu,
  Crown,
  LayoutGrid,
  CalendarCheck,
  PhoneCall,
  X,
} from 'lucide-react';
import './MobileBottomNav.css';

// Navigation hierarchy using lucide-react icons:
// First 4 visible tabs: Pavilion (Home), Services (Sparkles), Catering (UtensilsCrossed), Gallery (Images)
// Remaining items in 'More' panel: Decors & Stages (Crown), Hall Plan (LayoutGrid), Reserve Hall (CalendarCheck), Contact Us (PhoneCall)
const DEFAULT_NAV_LINKS = [
  {
    label: 'Pavilion',
    path: '/',
    icon: <Home size={20} strokeWidth={1.8} />,
  },
  {
    label: 'Services',
    path: '/services',
    icon: <Sparkles size={20} strokeWidth={1.8} />,
  },
  {
    label: 'Catering',
    path: '/catering',
    icon: <UtensilsCrossed size={20} strokeWidth={1.8} />,
  },
  {
    label: 'Gallery',
    path: '/gallery',
    icon: <Images size={20} strokeWidth={1.8} />,
  },
  {
    label: 'Decors & Stages',
    path: '/decors',
    icon: <Crown size={20} strokeWidth={1.8} />,
  },
  {
    label: 'Hall Plan',
    path: '/hallplan',
    icon: <LayoutGrid size={20} strokeWidth={1.8} />,
  },
  {
    label: 'Reserve Hall',
    path: '/reserve',
    icon: <CalendarCheck size={20} strokeWidth={1.8} />,
  },
  {
    label: 'Contact Us',
    path: 'https://wa.me/923017130942',
    external: true,
    icon: <PhoneCall size={20} strokeWidth={1.8} />,
  },
];

export default function MobileBottomNav({ navLinks = DEFAULT_NAV_LINKS }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();

  // Dynamic mapping:
  // 1. navLinks.slice(0, 4) directly onto the fixed Bottom Tab Bar: Pavilion, Services, Catering, Gallery
  // 2. navLinks.slice(4) inside the hidden 'More' panel: Decors & Stages, Hall Plan, Reserve, Contact Us
  const primaryLinks = navLinks.slice(0, 4);
  const moreLinks = navLinks.slice(4);

  // Check if any link inside 'More' is currently active
  const isMoreLinkActive = moreLinks.some(
    (link) => !link.external && location.pathname === (link.path || link.to || link.id)
  );

  // Close sheet on route change
  useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  // Handle overlay background click (outside panel)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsMoreOpen(false);
    }
  };

  return (
    <>
      {/* 2. Fixed Bottom Tab Bar (Mobile only: max-width 768px) */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        {primaryLinks.map((link) => {
          const target = link.path || link.to || link.id || '/';
          return (
            <NavLink
              key={target}
              to={target}
              end={target === '/'}
              className={({ isActive }) =>
                `bottom-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsMoreOpen(false)}
            >
              {link.icon && <span className="bottom-nav-icon">{link.icon}</span>}
              <span className="bottom-nav-label">{link.label}</span>
            </NavLink>
          );
        })}

        {/* 5th static button: 'More ☰' with Lucide Menu Icon */}
        <button
          type="button"
          className={`bottom-nav-item bottom-nav-more-btn ${
            isMoreOpen || isMoreLinkActive ? 'active' : ''
          }`}
          onClick={() => setIsMoreOpen((prev) => !prev)}
          aria-expanded={isMoreOpen}
          aria-label="Toggle more navigation links"
        >
          <span className="bottom-nav-icon more-icon">
            <Menu size={20} strokeWidth={2} />
          </span>
          <span className="bottom-nav-label">More</span>
        </button>
      </nav>

      {/* 3. The 'More' Bottom Sheet Component */}
      <div
        className={`bottom-sheet-overlay ${isMoreOpen ? 'open' : ''}`}
        onClick={handleOverlayClick}
        aria-hidden={!isMoreOpen}
      >
        <div
          className="bottom-sheet-panel"
          style={{
            transform: isMoreOpen ? 'translateY(0%)' : 'translateY(100%)',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Additional Navigation"
        >
          {/* Header with Title and Lucide Close (X) button */}
          <div className="bottom-sheet-header">
            <div className="bottom-sheet-indicator" />
            <div className="bottom-sheet-title-row">
              <span className="bottom-sheet-title">More Navigation</span>
              <button
                type="button"
                className="bottom-sheet-close-btn"
                onClick={() => setIsMoreOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Vertical list of remaining links (navLinks.slice(4)) */}
          <ul className="bottom-sheet-list">
            {moreLinks.map((link) => {
              const target = link.path || link.to || link.id || '/';

              if (link.external) {
                return (
                  <li key={target} className="bottom-sheet-list-item">
                    <a
                      href={target}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bottom-sheet-link"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {link.icon && (
                        <span className="bottom-sheet-link-icon">{link.icon}</span>
                      )}
                      <span className="bottom-sheet-link-label">{link.label}</span>
                      <span className="bottom-sheet-link-arrow">↗</span>
                    </a>
                  </li>
                );
              }

              return (
                <li key={target} className="bottom-sheet-list-item">
                  <NavLink
                    to={target}
                    end={target === '/'}
                    className={({ isActive }) =>
                      `bottom-sheet-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => setIsMoreOpen(false)}
                  >
                    {link.icon && (
                      <span className="bottom-sheet-link-icon">{link.icon}</span>
                    )}
                    <span className="bottom-sheet-link-label">{link.label}</span>
                    <span className="bottom-sheet-link-arrow">→</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
