import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { LightboxProvider } from './context/LightboxContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { normalizeLegacyHash } from './lib/navigation.js';

// Pre-migration shared links (#hallplan, #gallery, #hallmarks …) are translated
// into route hashes before the router reads the URL.
normalizeLegacyHash();

// No StrictMode: the ported DOM effects (page-enter fade, 94% reveal queue,
// sphere rAF loop) are intentionally single-initialised, exactly as in main.js.
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ThemeProvider>
      <LightboxProvider>
        <App />
      </LightboxProvider>
    </ThemeProvider>
  </HashRouter>,
);
