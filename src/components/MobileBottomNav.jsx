import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Sparkles,
  UtensilsCrossed,
  Images,
  Crown,
  LayoutGrid,
  PhoneCall,
  Menu,
  X,
} from 'lucide-react';
import { useContactModal } from '../context/ContactModalContext.jsx';
import './MobileBottomNav.css';

// 5 Primary Navigation Tabs — Exactly matches Laptop Navbar tabs:
// Home, Decors & Stages, Royal Catering, Other Services, Gallery
const DEFAULT_NAV_LINKS = [
  {
    label: 'Home',
    path: '/',
    icon: <Home size={19} strokeWidth={1.8} />,
  },
  {
    label: 'Decors & Stages',
    path: '/decors',
    icon: <Crown size={19} strokeWidth={1.8} />,
  },
  {
    label: 'Royal Catering',
    path: '/catering',
    icon: <UtensilsCrossed size={19} strokeWidth={1.8} />,
  },
  {
    label: 'Other Services',
    path: '/services',
    icon: <Sparkles size={19} strokeWidth={1.8} />,
  },
  {
    label: 'Gallery',
    path: '/gallery',
    icon: <Images size={19} strokeWidth={1.8} />,
  },
];

export default function MobileBottomNav({ navLinks = DEFAULT_NAV_LINKS }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { openContactModal } = useContactModal();
  const location = useLocation();

  // Close sheet on route change
  useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      {navLinks.map((link) => {
        const target = link.path || link.to || link.id || '/';
        return (
          <NavLink
            key={target}
            to={target}
            end={target === '/'}
            className={({ isActive }) =>
              `bottom-nav-item ${isActive ? 'active' : ''}`
            }
          >
            {link.icon && <span className="bottom-nav-icon">{link.icon}</span>}
            <span className="bottom-nav-label">{link.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
