import { useLocation, useNavigate } from 'react-router-dom';
import { isPageEntrySection, pathForSection, pendingScroll, scrollToId } from '../lib/navigation.js';

/**
 * Drop-in replacement for the original `<a href="#section">` links.
 *
 * js/main.js turned those clicks into a tab switch (showPage) plus an optional
 * deep-link scroll; here they become a route change with the same scroll rules.
 * The href is kept so the markup and right-click/open-in-new-tab still work —
 * normalizeLegacyHash() resolves such a hash on boot.
 */
export default function SectionLink({ to, children, onClick, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = pathForSection(to);

  function handleClick(event) {
    if (onClick) onClick(event);
    event.preventDefault();

    if (location.pathname === path) {
      if (isPageEntrySection(to)) window.scrollTo(0, 0);
      else scrollToId(to);
      return;
    }

    pendingScroll.target = isPageEntrySection(to) ? null : to;
    navigate(path);
  }

  return (
    <a href={'#' + to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
