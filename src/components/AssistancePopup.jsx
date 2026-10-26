import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Phone } from 'lucide-react';
import { WhatsAppIcon } from './Icons.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';
import './AssistancePopup.css';

const SESSION_KEY = 'rabat_assistance_popup_dismissed';
const POPUP_DELAY_MS = 30000; // 30 seconds

export default function AssistancePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { openContactModal } = useContactModal();

  useEffect(() => {
    // Check if dismissed in this session
    try {
      if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        return;
      }
    } catch {
      // ignore storage access restrictions
    }

    const timer = setTimeout(() => {
      try {
        if (sessionStorage.getItem(SESSION_KEY) !== 'true') {
          setIsVisible(true);
        }
      } catch {
        setIsVisible(true);
      }
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const handleWhatsAppClick = () => {
    handleDismiss();
  };

  if (!isVisible) return null;

  // Determine phone number & context based on current page
  const isDecorOrServices =
    location.pathname.startsWith('/decors') ||
    location.pathname.startsWith('/services') ||
    location.pathname.startsWith('/other-services');

  const waNumber = isDecorOrServices ? '923256572839' : '923017130942';

  const waMessage = encodeURIComponent(
    isDecorOrServices
      ? 'Hello Blissfull Event Planners, I am browsing your website and need some assistance with stage decor and event arrangements.'
      : 'Hello Rabat Banquet Hall, I am browsing your website and need some assistance regarding event bookings, dates, and packages.'
  );

  return (
    <aside className="asst-wrap" aria-label="Event assistance and concierge support">
      <div className="asst-card" role="dialog" aria-labelledby="asstTitle">
        {/* Top bar with online indicator & close button */}
        <div className="asst-head">
          <div className="asst-status-row">
            <span className="asst-live-dot" aria-hidden="true" />
            <span className="asst-status-text">Concierge Desk Online</span>
          </div>
          <button
            type="button"
            className="asst-close-btn"
            onClick={handleDismiss}
            aria-label="Close assistance card"
            title="Dismiss"
          >
            <X size={15} strokeWidth={2.2} />
          </button>
        </div>

        {/* Content body */}
        <div className="asst-body">
          <div className="asst-avatar-wrap" aria-hidden="true">
            <span className="asst-avatar-icon">🏛️</span>
          </div>
          <div className="asst-text-box">
            <h4 id="asstTitle" className="asst-title">Need Any Assistance?</h4>
            <p className="asst-desc">
              Have questions about available dates, hall capacity, or catering packages? Text us directly on WhatsApp.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="asst-actions">
          <a
            href={`https://wa.me/${waNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="asst-btn-wa"
            onClick={handleWhatsAppClick}
            aria-label="Text us on WhatsApp for assistance"
          >
            <WhatsAppIcon size={16} />
            <span>Text on WhatsApp</span>
          </a>

          <button
            type="button"
            className="asst-btn-call"
            onClick={() => {
              handleDismiss();
              openContactModal();
            }}
            aria-label="View direct call numbers"
            title="Call Concierge"
          >
            <Phone size={14} strokeWidth={2} />
            <span>Call</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
