import { useState } from 'react';
import Section from './Section.jsx';
import { WhatsAppIcon } from './Icons.jsx';
import { Calendar, User, Users, Utensils, HelpCircle, UserCheck, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';

const WA_NUMBER = '923017130942';

const EVENT_TYPE_OPTIONS = [
  'Mayoun',
  'Mehndi',
  'Nikkah',
  'Barat',
  'walima',
  'Shehndi',
  'Shalima',
  'Corporate',
  'Get To Gather',
];

const MENU_OPTIONS = [
  'Chicken One Dish',
  'Mutton One Dish',
];

const ATTEND_OPTIONS = [
  'Yes',
  'No',
];

export default function Reserve() {
  const { theme, selectTheme } = useTheme();
  const { openContactModal } = useContactModal();

  // 1. React State Management for Form Inputs
  const todayDate = new Date().toISOString().split('T')[0];
  const [expectedDate, setExpectedDate] = useState('');
  const [hostName, setHostName] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [eventType, setEventType] = useState('');
  const [menu, setMenu] = useState('');
  const [attendedBefore, setAttendedBefore] = useState('');
  const [reference, setReference] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 2. WhatsApp Dynamic Integration Logic
  const handleWhatsAppSubmit = (e) => {
    if (e) e.preventDefault();

    if (!hostName.trim()) {
      setErrorMessage('Please enter host full name.');
      document.getElementById('resHostName')?.focus();
      return;
    }

    if (!expectedDate) {
      setErrorMessage('Please select your expected event date.');
      document.getElementById('resExpectedDate')?.focus();
      return;
    }

    setErrorMessage('');

    // Format fields properly into WhatsApp message
    let message = `Hello Rabat Banquet Hall, I would like to inquire about a booking.
Host Name: ${hostName.trim()}
Event Type: ${eventType || 'Not Specified'}
Expected Date: ${expectedDate}
Numbers of Guests: ${numberOfGuests.trim() || 'N/A'}
Menu: ${menu || 'Not Specified'}
Have You Attended Us Before: ${attendedBefore || 'Not Specified'}`;

    if (reference.trim()) {
      message += `\nRef, If Attend: ${reference.trim()}`;
    }

    if (theme) {
      message += `\nSelected Decor Theme: ${theme}`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const selectStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'var(--color-bg, #FAF8F5)',
    border: '1px solid var(--color-divider, #E5DCCB)',
    borderRadius: '10px',
    fontSize: '0.92rem',
    color: 'var(--color-text, #111827)',
    outline: 'none',
    cursor: 'pointer',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'var(--color-bg, #FAF8F5)',
    border: '1px solid var(--color-divider, #E5DCCB)',
    borderRadius: '10px',
    fontSize: '0.92rem',
    color: 'var(--color-text, #111827)',
    outline: 'none',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '0.45rem',
    color: 'var(--color-text-muted, #8C6D32)',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
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
            Hall 16 - Rabat Garrison Marriage Hall
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
            {/* Field 1: Expected Date */}
            <div className="rfield" style={{ marginBottom: '1.25rem' }}>
              <label className="rfield-label" htmlFor="resExpectedDate" style={labelStyle}>
                <Calendar size={14} />
                <span>Expected Date</span>
              </label>
              <input
                className="rinput"
                type="date"
                id="resExpectedDate"
                min={todayDate}
                value={expectedDate}
                onChange={(e) => {
                  setExpectedDate(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                style={inputStyle}
              />
            </div>

            {/* Field 2: Host Name */}
            <div className="rfield" style={{ marginBottom: '1.25rem' }}>
              <label className="rfield-label" htmlFor="resHostName" style={labelStyle}>
                <User size={14} />
                <span>Host Name</span>
              </label>
              <input
                className="rinput"
                type="text"
                id="resHostName"
                placeholder="e.g. Inaam Ul Haq"
                value={hostName}
                onChange={(e) => {
                  setHostName(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                autoComplete="name"
                style={inputStyle}
              />
            </div>

            {/* Field 3: Numbers of Guests */}
            <div className="rfield" style={{ marginBottom: '1.25rem' }}>
              <label className="rfield-label" htmlFor="resGuests" style={labelStyle}>
                <Users size={14} />
                <span>Numbers of Guests</span>
              </label>
              <input
                className="rinput"
                type="number"
                id="resGuests"
                placeholder="Numbers of guests - e.g. 300"
                min="1"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Field 4: Event Type Dropdown */}
            <div className="rfield" style={{ marginBottom: '1.25rem' }}>
              <label className="rfield-label" htmlFor="resEventType" style={labelStyle}>
                <Sparkles size={14} />
                <span>Event Type</span>
              </label>
              <select
                id="resEventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                style={selectStyle}
              >
                <option value="" disabled>
                  Select Event Type
                </option>
                {EVENT_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 5: Menu Dropdown */}
            <div className="rfield" style={{ marginBottom: '1.25rem' }}>
              <label className="rfield-label" htmlFor="resMenu" style={labelStyle}>
                <Utensils size={14} />
                <span>Menu</span>
              </label>
              <select
                id="resMenu"
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
                style={selectStyle}
              >
                <option value="" disabled>
                  Select Menu
                </option>
                {MENU_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 6: Have you attend us before Dropdown */}
            <div className="rfield" style={{ marginBottom: '1.25rem' }}>
              <label className="rfield-label" htmlFor="resAttended" style={labelStyle}>
                <HelpCircle size={14} />
                <span>Have you attend us before</span>
              </label>
              <select
                id="resAttended"
                value={attendedBefore}
                onChange={(e) => setAttendedBefore(e.target.value)}
                style={selectStyle}
              >
                <option value="" disabled>
                  Select Option
                </option>
                {ATTEND_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 7: Ref, If Attend */}
            <div className="rfield" style={{ marginBottom: '1.5rem' }}>
              <label className="rfield-label" htmlFor="resReference" style={labelStyle}>
                <UserCheck size={14} />
                <span>Ref, If Attend</span>
              </label>
              <input
                className="rinput"
                type="text"
                id="resReference"
                placeholder="Ref, If Attend (Optional reference or event attended)"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                style={inputStyle}
              />
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

            {/* Submit Action Button */}
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
              Call or WhatsApp - Contact Us (Direct Lines)
            </button>
          </p>
        </div>
      </div>
    </Section>
  );
}
