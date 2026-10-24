import { useEffect } from 'react';
import { Phone, PhoneCall, X } from 'lucide-react';
import { WhatsAppIcon } from './Icons.jsx';
import { CONTACT_NUMBERS } from '../data/contact.js';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose }) {
  // ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    // Lock body scroll while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="contact-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contactModalTitle"
      onClick={onClose}
    >
      <div
        className="contact-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="contact-modal-close"
          onClick={onClose}
          aria-label="Close contact modal"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        <div className="contact-modal-header">
          <div className="contact-modal-crest" aria-hidden="true">
            <PhoneCall size={22} strokeWidth={1.8} />
          </div>
          <span className="contact-modal-eyebrow">RABAT BANQUET CONCIERGE</span>
          <h2 id="contactModalTitle" className="contact-modal-title">
            Direct Contact &amp; Booking
          </h2>
          <p className="contact-modal-sub">
            Connect directly with our event managers via WhatsApp or Phone Call
          </p>
        </div>

        <div className="contact-modal-list">
          {CONTACT_NUMBERS.map((item) => (
            <div key={item.id} className="contact-modal-card">
              <div className="contact-modal-details">
                <span className="contact-modal-badge">{item.label}</span>
                <span className="contact-modal-phone">{item.display}</span>
              </div>

              <div className="contact-modal-actions">
                <a
                  href={`https://wa.me/${item.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn contact-btn-wa"
                  title={`Chat with ${item.display} on WhatsApp`}
                >
                  <WhatsAppIcon size={16} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${item.tel}`}
                  className="contact-btn contact-btn-call"
                  title={`Call ${item.display}`}
                >
                  <Phone size={15} strokeWidth={2.2} />
                  <span>Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-modal-footer">
          <span>Available 7 Days a Week &middot; 11:00 AM &ndash; 11:00 PM PKT</span>
        </div>
      </div>
    </div>
  );
}
