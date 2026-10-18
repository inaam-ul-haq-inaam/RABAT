import { useEffect, useRef } from 'react';

/**
 * Mirrors the original tab swap in js/main.js showPage(): the freshly shown
 * section fades in through the .page-enter class (removed after 520ms).
 * The class is applied through the DOM (never React state) so the scroll-reveal
 * hooks stay free to add/remove .is-hidden on the same element.
 */
export default function Section({ id, className = '', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.classList.add('page-enter');
    const timer = window.setTimeout(() => el.classList.remove('page-enter'), 520);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section ref={ref} id={id} className={className} {...rest}>
      {children}
    </section>
  );
}
