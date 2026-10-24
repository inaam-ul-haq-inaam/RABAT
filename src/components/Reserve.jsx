import { useState } from 'react';
import Section from './Section.jsx';
import { WhatsAppIcon } from './Icons.jsx';
import { Calendar, User, Users, Utensils } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';

const WA_NUMBER = '923017130942';

const MENU_OPTIONS = [
  'Traditional Menu',
  'Royal Buffet',
  'Hi-Tea',
  'Custom Menu',
];

export default function Reserve() {
  const { theme, selectTheme } = useTheme();
  const { openContactModal } = useContactModal();

  // 1. React State Management for Form Inputs
  const todayDate = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('');
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Toggle selection for Menu Preference checkboxes
  const handleMenuToggle = (menuOption) => {
    setSelectedMenus((prev) =>
      prev.includes(menuOption)
        ? prev.filter((item) => item !== menuOption)
        : [...prev, menuOption]
    );
  };

  // 2. WhatsApp Dynamic Integration Logic
  const handleWhatsAppSubmit = (e) => {
    if (e) e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Please enter your full name to proceed with the booking inquiry.');
      document.getElementById('resName')?.focus();
      return;
    }

    if (!date) {
      setErrorMessage('Please select your target event date.');
      document.getElementById('resDate')?.focus();
      return;
    }

    setErrorMessage('');

    const formattedMenus =
      selectedMenus.length > 0 ? selectedMenus.join(', ') : 'Not Specified';

    // Construct professional message using template literals
    let message = `Hello Rabat Banquet Hall, I would like to inquire about a booking.
Name: ${name.trim()}
Date: ${date}
Expected Guests: ${guests.trim() || 'N/A'}
Menu Preferences: ${formattedMenus}`;

    if (theme) {
      message += `\nSelected Decor Theme: ${theme}`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Section className="reserve-page reveal reveal-delay-1" id="reserve" aria-labelledby="reserve-title">
      <div className="container">
        {/* Header Section */}
        <header className="reserve-head">
          <span className="reserve-badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Hall 16 - Lahore Garrison Golf &amp; Country Club
          </span>
          <h2 className="reserve-title" id="reserve-title">
            Reserve Your Wedding Date
          </h2>
          <p className="reserve-lead">
            Schedule your private palace walkthrough with our event concierge to discuss your event requirements.
          </p>
        </header>

        {/* Luxury Form Container */}
        <div
          className="reserve-simple"
          style={{
            maxWidth: '620px',
            margin: '0 auto',
            background: 'var(--color-card, #FFFFFF)',
            padding: '2.5rem 2rem',
            borderRadius: '16px',
            border: '1px solid var(--color-divider, #E5DCCB)',
            boxShadow: '0 8px 30px rgba(35, 25, 15, 0.06)',
            marginTop: '2rem',
            marginBottom: '4rem',
          }}
        >
          <p
            className="form-title"
            style={{
              marginBottom: '1.75rem',
              fontSize: '1.25rem',
              fontFamily: "'Cinzel Decorative', 'Cormorant Garamond', serif",
              color: 'var(--color-gold, #D4AF37)',
              textAlign: 'center',
              letterSpacing: '0.04em',
              fontWeight: '700',
            }}
          >
            Select Date &amp; Schedule Walkthrough
          </p>

          {/* Selected Stage Theme Badge */}
          {theme && (
            <div
              style={{
                marginBottom: '1.5rem',
                padding: '0.65rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--color-gold, #D4AF37)', fontWeight: '700' }}>✨ Stage Theme:</span>
                <span style={{ color: 'var(--color-text, #111827)', fontWeight: '600' }}>{theme}</span>
              </div>
              <button
                type="button"
                onClick={() => selectTheme('')}
                aria-label="Remove selected theme"
                title="Remove selected theme"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted, #8C6D32)',
                  fontSize: '1.1rem',
                  lineHeight: '1',
                  padding: '2px 6px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                &times;
              </button>
            </div>
          )}

          <form className="res-form" id="reserveForm" onSubmit={handleWhatsAppSubmit}>
            {/* Field 1: Target Event Date */}
            <div className="rfield" style={{ marginBottom: '1.25rem' }}>
              <label
                className="rfield-label"
                htmlFor="resDate"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '0.45rem',
                  color: 'var(--color-text-muted, #8C6D32)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <Calendar size={14} />
                <span>Target Event Date</span>
              </label>
              <input
                className="rinput"
                type="date"
                id="resDate"
                min={todayDate}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'var(--color-bg, #FAF8F5)',
                  border: '1px solid var(--color-divider, #E5DCCB)',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                }}
              />
            </div>

            {/* Field 2: Host Full Name */}
            <div className="rfield" style={{ marginBottom: '1.25rem' }}>
              <label
                className="rfield-label"
                htmlFor="resName"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '0.45rem',
                  color: 'var(--color-text-muted, #8C6D32)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <User size={14} />
                <span>Host Full Name</span>
              </label>
              <input
                className="rinput"
                type="text"
                id="resName"
                placeholder="e.g. Inaam Ul Haq"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                autoComplete="name"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'var(--color-bg, #FAF8F5)',
                  border: '1px solid var(--color-divider, #E5DCCB)',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                }}
              />
            </div>

            {/* Field 3: Expected Number of Guests */}
            <div className="rfield" style={{ marginBottom: '1.5rem' }}>
              <label
                className="rfield-label"
                htmlFor="resGuests"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '0.45rem',
                  color: 'var(--color-text-muted, #8C6D32)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <Users size={14} />
                <span>Number of Guests</span>
              </label>
              <input
                className="rinput"
                type="number"
                id="resGuests"
                placeholder="Expected Guests - e.g. 300"
                min="50"
                max="2500"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'var(--color-bg, #FAF8F5)',
                  border: '1px solid var(--color-divider, #E5DCCB)',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                }}
              />
            </div>

            {/* Field 4: Menu Selection (Stylish Checkbox Group) */}
            <div className="rfield" style={{ marginBottom: '1.75rem' }}>
              <label
                className="rfield-label"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '0.65rem',
                  color: 'var(--color-text-muted, #8C6D32)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <Utensils size={14} />
                <span>Menu Selection (Select All That Apply)</span>
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.65rem',
                }}
              >
                {MENU_OPTIONS.map((menu) => {
                  const isChecked = selectedMenus.includes(menu);
                  return (
                    <label
                      key={menu}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '0.75rem 1rem',
                        background: isChecked ? 'rgba(212, 175, 55, 0.12)' : 'var(--color-bg, #FAF8F5)',
                        border: isChecked
                          ? '1.5px solid var(--color-gold, #D4AF37)'
                          : '1px solid var(--color-divider, #E5DCCB)',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: isChecked ? '#1A1816' : 'var(--color-text, #2A2724)',
                        fontWeight: isChecked ? '600' : '500',
                        fontSize: '0.88rem',
                        userSelect: 'none',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleMenuToggle(menu)}
                        style={{
                          accentColor: 'var(--color-gold, #D4AF37)',
                          width: '17px',
                          height: '17px',
                          cursor: 'pointer',
                        }}
                      />
                      <span>{menu}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Validation Notice */}
            {errorMessage && (
              <div
                style={{
                  marginBottom: '1.25rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1.5px solid #D4B26F',
                  color: '#9E7728',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Field 5: WhatsApp Action Button */}
            <button
              type="submit"
              className="btn-primary"
              id="reserveWhatsapp"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0.95rem 1.5rem',
                fontSize: '0.88rem',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '9999px',
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 4px 18px rgba(212, 175, 55, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <WhatsAppIcon size={18} />
              <span>Send Inquiry via WhatsApp</span>
            </button>
          </form>

          <p className="res-alt" style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
            Prefer to talk now?{' '}
            <button
              type="button"
              onClick={openContactModal}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
                fontWeight: '600',
                color: 'var(--color-gold, #D4AF37)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Call or WhatsApp Concierge (3 Direct Lines)
            </button>
          </p>
        </div>
      </div>
    </Section>
  );
}
