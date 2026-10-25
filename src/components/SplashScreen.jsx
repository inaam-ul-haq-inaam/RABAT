import { useEffect, useMemo, useState } from 'react';
import './SplashScreen.css';

// Splash lifetime: 2.8s fully visible closed curtain, then 3.5s slow cinematic theatrical parting.
const SHOW_MS = 2000;
const OPEN_MS = 5500; // 3.6s parting animation (& fade) before DOM unmount

// Falling petal tracks are generated once (module constant) so every load
// feels consistent while individual petals remain naturally scattered.
const PETALS = Array.from({ length: 26 }, (_, i) => {
  const rand = (seed) => {
    const x = Math.sin(i * 37.17 + seed * 91.3) * 10000;
    return x - Math.floor(x);
  };
  return {
    left: `${(rand(1) * 100).toFixed(1)}%`,
    delay: `${(rand(2) * 2.8).toFixed(2)}s`,
    duration: `${(3.2 + rand(3) * 2.2).toFixed(2)}s`,
    size: 10 + Math.round(rand(4) * 14),
    sway: Math.round(rand(5) * 120 - 60),
    hue: Math.round(rand(7) * 18),
  };
});

export default function SplashScreen() {
  // stage: 'visible' -> 'active' (curtains parting at 3s) -> 'gone' (unmounted at 5s)
  const [stage, setStage] = useState('visible');
  const petals = useMemo(() => PETALS, []);

  useEffect(() => {
    const activeTimer = setTimeout(() => setStage('active'), SHOW_MS);
    const unmountTimer = setTimeout(() => setStage('gone'), SHOW_MS + OPEN_MS);
    return () => {
      clearTimeout(activeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  // Completely unmount (remove) from React DOM after 5000ms so user experience is not blocked
  if (stage === 'gone') return null;

  return (
    <div
      className={`splash${stage === 'active' ? ' splash-active' : ''}`}
      aria-hidden={stage === 'active'}
    >
      {/* Golden Stage Spotlight Bloom & Flare (Bursts outward as curtains part) */}
      <div className="splash-backlight" aria-hidden="true" />

      {/* Two distinct side-by-side curtain halves (50vw each, left:0 and right:0) */}
      <div className="curtain-left" aria-hidden="true" />
      <div className="curtain-right" aria-hidden="true" />

      {/* Falling rose petals overlay */}
      <div className="splash-petals" aria-hidden="true">
        {petals.map((p, i) => (
          <span
            key={i}
            className="splash-petal"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--petal-size': `${p.size}px`,
              '--petal-sway': `${p.sway}px`,
              '--petal-hue': p.hue,
            }}
          />
        ))}
      </div>

      {/* Center medallion / Rabat brand typography */}
      <div className="splash-content">
        <div className="splash-monogram" aria-hidden="true">
          <svg className="splash-emblem-svg" viewBox="0 0 533 999" fill="currentColor">
            <path d="M 159,558 L 156,563 L 156,634 L 154,671 L 155,706 L 236,789 L 242,791 L 245,787 L 246,777 L 245,740 L 248,644 L 242,636 L 167,562 Z" fillRule="evenodd" />
            <path d="M 281,314 L 280,317 L 279,344 L 280,350 L 279,369 L 281,374 L 286,378 L 294,388 L 310,403 L 313,405 L 316,406 L 318,403 L 319,377 L 318,366 L 319,346 L 317,342 L 287,313 Z" fillRule="evenodd" />
            <path d="M 286,182 L 284,183 L 283,185 L 281,240 L 287,247 L 287,248 L 303,263 L 311,272 L 316,276 L 319,276 L 321,274 L 322,267 L 322,240 L 321,231 L 322,215 L 321,213 L 303,196 L 300,192 L 291,184 L 288,182 Z" fillRule="evenodd" />
            <path d="M 424,178 L 420,194 L 411,542 L 291,648 L 286,781 L 290,782 L 454,645 L 496,605 L 508,278 Z" fillRule="evenodd" />
            <path d="M 117,154 L 34,222 L 25,240 L 26,744 L 235,964 L 258,980 L 345,910 L 349,799 L 342,797 L 262,856 L 118,719 Z" fillRule="evenodd" />
            <path d="M 281,25 L 178,129 L 174,486 L 269,607 L 285,596 L 310,568 L 311,516 L 305,514 L 273,542 L 213,473 L 218,154 L 283,94 L 318,129 L 318,73 Z" fillRule="evenodd" />
          </svg>
        </div>
        <h1 className="splash-title">RABAT</h1>
        <p className="splash-sub">by Time &amp; Taste Catering</p>
        <div className="splash-divider">
          <span />
          <i>&#10022;</i>
          <span />
        </div>
      </div>
    </div>
  );
}
