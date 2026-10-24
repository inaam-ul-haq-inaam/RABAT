import { useEffect, useMemo, useState } from 'react';
import './SplashScreen.css';

// Splash lifetime: 2.8s fully visible closed curtain, then 3.5s slow cinematic theatrical parting.
const SHOW_MS = 2800;
const OPEN_MS = 3600; // 3.6s parting animation (& fade) before DOM unmount

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
        <div className="splash-monogram">R</div>
        <h1 className="splash-title">Rabat Banquet Hall</h1>
        <p className="splash-sub">Moroccan Luxury Venue &mdash; Lahore</p>
        <div className="splash-divider">
          <span />
          <i>&#10022;</i>
          <span />
        </div>
      </div>
    </div>
  );
}
