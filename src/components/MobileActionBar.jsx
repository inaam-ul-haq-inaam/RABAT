import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SectionLink from './SectionLink.jsx';
import { CalendarIcon, WhatsAppIcon } from './Icons.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';

const REVEAL_AFTER = 320;

export default function MobileActionBar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const { openContactModal } = useContactModal();

  const isExcludedPage =
    location.pathname.startsWith('/reserve') || location.pathname.startsWith('/menu');

  useEffect(() => {
    if (isExcludedPage) {
      setVisible(false);
      return;
    }

    const media = window.matchMedia('(max-width: 680px)');
    const footer = document.querySelector('.r-footer');

    function updateVisibility() {
      const footerRect = footer ? footer.getBoundingClientRect() : null;
      const footerVisible = footerRect && footerRect.top < window.innerHeight && footerRect.bottom > 0;
      const nextVisible =
        media.matches && window.scrollY > REVEAL_AFTER && !footerVisible;
      setVisible((current) => (current === nextVisible ? current : nextVisible));
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    media.addEventListener('change', updateVisibility);
    updateVisibility();

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      media.removeEventListener('change', updateVisibility);
    };
  }, [location.pathname, isExcludedPage]);

  if (isExcludedPage || !visible) return null;

  return (
    <aside className="mobile-action-bar" aria-label="Quick booking actions">
      <SectionLink to="reserve" className="mobile-action-link mobile-action-link--reserve">
        <CalendarIcon size={17} />
        <span>Check date</span>
      </SectionLink>
      <button
        type="button"
        className="mobile-action-link mobile-action-link--whatsapp"
        onClick={openContactModal}
        aria-label="Contact Concierge on WhatsApp"
      >
        <WhatsAppIcon size={18} />
        <span>WhatsApp</span>
      </button>
    </aside>
  );
}
