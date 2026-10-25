import { useEffect, useState } from 'react';
import { Star, X, CheckCircle2, MessageSquareHeart, ExternalLink, Sparkles } from 'lucide-react';
import './ReviewModal.css';

const EVENT_OPTIONS = [
  'Barat Reception',
  'Walima Gala',
  'Mehndi Night',
  'Nikkah Ceremony',
  'Qawwali Night & Musical Evening',
  'Corporate Gala & Annual Dinner',
  'Birthday & Private Celebration',
  'Other Special Occasion',
];

const RATING_LABELS = {
  5: '⭐⭐⭐⭐⭐ Exceptional (5 / 5)',
  4: '⭐⭐⭐⭐ Great Experience (4 / 5)',
  3: '⭐⭐⭐ Good (3 / 5)',
  2: '⭐⭐ Fair (2 / 5)',
  1: '⭐ Needs Improvement (1 / 5)',
};

export default function ReviewModal({ isOpen, onClose, onSubmitReview }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState(EVENT_OPTIONS[0]);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Lock body scroll while open and handle ESC key
  useEffect(() => {
    if (!isOpen) {
      // Reset state on close
      setTimeout(() => {
        setIsSubmitted(false);
        setError('');
        setName('');
        setMessage('');
        setDate('');
        setRating(5);
      }, 300);
      return;
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name or family title.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setError('Please write at least a few words (10+ characters) about your experience.');
      return;
    }

    setError('');
    const newReview = {
      name: name.trim(),
      event: `${eventType.toUpperCase()} · ${date.trim() ? date.trim().toUpperCase() : 'VERIFIED HOST'}`,
      quote: message.trim(),
      rating,
      date: date.trim() || 'Recent',
      avatar: 'users',
      isCustomUserReview: true,
      img: 'images/pavilion/rabat_grand_hall_hero_1790426090821.webp',
      alt: `${eventType} at Rabat Hall`,
    };

    onSubmitReview(newReview);
    setIsSubmitted(true);
  }

  const activeStars = hoverRating || rating;

  return (
    <div
      className="review-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reviewModalTitle"
      onClick={onClose}
    >
      <div className="review-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="review-modal-close"
          onClick={onClose}
          aria-label="Close review modal"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="review-modal-header">
              <div className="review-modal-crest" aria-hidden="true">
                <MessageSquareHeart size={24} strokeWidth={1.8} />
              </div>
              <span className="review-modal-eyebrow">RABAT BANQUET HALL REVIEWS</span>
              <h2 id="reviewModalTitle" className="review-modal-title">
                Share Your Experience
              </h2>
              <p className="review-modal-sub">
                Help other couples and families plan their dream celebrations with your valuable feedback
              </p>
            </div>

            <form className="review-modal-form" onSubmit={handleSubmit}>
              {/* Star Rating Selector */}
              <div className="review-rating-box">
                <label className="review-form-label">
                  YOUR OVERALL RATING <span className="review-required">*</span>
                </label>
                <div
                  className="review-stars-interactive"
                  role="radiogroup"
                  aria-label="Select star rating"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-pick-btn ${star <= activeStars ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      aria-label={`${star} star`}
                    >
                      <Star
                        size={28}
                        fill={star <= activeStars ? '#F59E0B' : 'transparent'}
                        color={star <= activeStars ? '#F59E0B' : 'rgba(212, 178, 111, 0.4)'}
                        strokeWidth={1.8}
                      />
                    </button>
                  ))}
                </div>
                <span className="review-rating-hint">{RATING_LABELS[activeStars]}</span>
              </div>

              {/* Host Name */}
              <div className="review-field-group">
                <label htmlFor="reviewName" className="review-form-label">
                  YOUR NAME / FAMILY TITLE <span className="review-required">*</span>
                </label>
                <input
                  id="reviewName"
                  type="text"
                  className="review-input"
                  placeholder="e.g., Usman Khalid & Family, Dr. Ayesha"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              {/* Event Details Row */}
              <div className="review-fields-row">
                <div className="review-field-group">
                  <label htmlFor="reviewEvent" className="review-form-label">
                    EVENT TYPE
                  </label>
                  <select
                    id="reviewEvent"
                    className="review-select"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    {EVENT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="review-field-group">
                  <label htmlFor="reviewDate" className="review-form-label">
                    DATE / MONTH (OPTIONAL)
                  </label>
                  <input
                    id="reviewDate"
                    type="text"
                    className="review-input"
                    placeholder="e.g., Oct 2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Review Text */}
              <div className="review-field-group">
                <label htmlFor="reviewMessage" className="review-form-label">
                  YOUR REVIEW &amp; EXPERIENCE <span className="review-required">*</span>
                </label>
                <textarea
                  id="reviewMessage"
                  rows={4}
                  className="review-textarea"
                  placeholder="How was the ambiance, stage decor, food catering by Time &amp; Taste, and overall management?..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              {error && <div className="review-error-banner">{error}</div>}

              {/* Submit Button */}
              <button type="submit" className="review-submit-btn">
                <span>SUBMIT YOUR REVIEW</span>
                <span aria-hidden="true">&rarr;</span>
              </button>

              <div className="review-form-footer">
                <p>
                  Your review will be instantly displayed on Rabat Banquet Hall's verified client stories.
                </p>
              </div>
            </form>
          </>
        ) : (
          /* SUCCESS STATE */
          <div className="review-success-state">
            <div className="review-success-crest" aria-hidden="true">
              <CheckCircle2 size={42} strokeWidth={2.2} />
            </div>
            <span className="review-success-eyebrow">REVIEW PUBLISHED</span>
            <h3 className="review-success-title">Thank You, {name}!</h3>
            <p className="review-success-sub">
              Your 5-star review has been successfully added to Rabat Hall's live guest reviews.
            </p>

            <div className="review-success-actions">
              <a
                href="https://www.google.com/search?q=Rabat+Banquet+Hall+Lahore#lrd=0x39190562e6e3cefb:0x93309a9dbd44c212,3"
                target="_blank"
                rel="noopener noreferrer"
                className="review-google-post-btn"
              >
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <span>Also Post on Google Reviews</span>
                <ExternalLink size={14} />
              </a>

              <button type="button" className="review-close-done-btn" onClick={onClose}>
                Done &amp; Return to Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
