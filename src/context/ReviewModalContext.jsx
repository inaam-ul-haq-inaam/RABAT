import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import ReviewModal from '../components/ReviewModal.jsx';

const ReviewModalContext = createContext(null);

export function useReviewModal() {
  const context = useContext(ReviewModalContext);
  if (!context) {
    throw new Error('useReviewModal must be used within a ReviewModalProvider');
  }
  return context;
}

export function ReviewModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rabat_user_reviews');
      if (saved) {
        setUserReviews(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load saved reviews from localStorage', e);
    }
  }, []);

  const openReviewModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeReviewModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const addUserReview = useCallback((review) => {
    setUserReviews((prev) => {
      const updated = [review, ...prev];
      try {
        localStorage.setItem('rabat_user_reviews', JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save review to localStorage', e);
      }
      return updated;
    });
  }, []);

  return (
    <ReviewModalContext.Provider
      value={{
        isOpen,
        openReviewModal,
        closeReviewModal,
        userReviews,
        addUserReview,
      }}
    >
      {children}
      <ReviewModal isOpen={isOpen} onClose={closeReviewModal} onSubmitReview={addUserReview} />
    </ReviewModalContext.Provider>
  );
}
