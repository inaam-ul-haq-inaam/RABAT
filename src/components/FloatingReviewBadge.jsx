import { Star, PenLine } from 'lucide-react';
import { useReviewModal } from '../context/ReviewModalContext.jsx';
import './FloatingReviewBadge.css';

export default function FloatingReviewBadge() {
  const { openReviewModal } = useReviewModal();

  return (
    <aside className="floating-review-badge-wrap" aria-label="Guest reviews and feedback">
      <button
        type="button"
        className="floating-review-badge"
        onClick={openReviewModal}
        aria-label="Add or read reviews for Rabat Banquet Hall"
        title="Click to write or add your review of Rabat Banquet Hall"
      >
        <div className="frb-rating-chip">
          <Star size={15} fill="#F59E0B" color="#F59E0B" />
          <span className="frb-score">4.9</span>
        </div>

        <div className="frb-label-box">
          <PenLine size={13} className="frb-pen-icon" strokeWidth={2.4} />
          <span className="frb-action-text">✍️ Add Review</span>
        </div>

        <div className="frb-pulse-glow" aria-hidden="true" />
      </button>
    </aside>
  );
}
