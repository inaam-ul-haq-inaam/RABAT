import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

/**
 * Port of js/main.js section 10 — the "SELECT & INQUIRE THIS THEME" buttons wrote
 * the theme into #selectedTheme / #reserveWhatsapp before the tab switched.
 * The banner/name elements never existed in the markup, so the theme is modelled
 * as app state and applied to the reserve page's WhatsApp link exactly like the
 * original did.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('');
  const selectTheme = useCallback((next) => setTheme(next), []);
  const value = useMemo(() => ({ theme, selectTheme }), [theme, selectTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
