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
        <div className="splash-monogram" aria-hidden="true">
          <svg className="splash-emblem-svg" viewBox="0 0 155 270" fill="currentColor">
            <path d="M 52,153 L 53,174 L 56,193 L 79,212 L 82,212 L 82,201 L 80,189 L 79,172 L 55,152 Z" fillRule="evenodd" />
            <path d="M 79,84 L 79,93 L 80,98 L 81,100 L 85,104 L 89,107 L 92,107 L 92,101 L 91,92 L 90,90 L 87,87 L 83,84 L 81,83 Z" fillRule="evenodd" />
            <path d="M 79,48 L 77,49 L 76,52 L 77,63 L 78,65 L 84,71 L 89,73 L 89,62 L 88,56 L 82,50 Z" fillRule="evenodd" />
            <path d="M 31,45 L 9,69 L 21,204 L 84,260 L 91,262 L 112,241 L 109,210 L 87,228 L 46,195 Z" fillRule="evenodd" />
            <path d="M 116,44 L 113,49 L 120,141 L 90,173 L 91,200 L 94,209 L 144,157 L 139,68 Z" fillRule="evenodd" />
            <path d="M 71,7 L 47,37 L 55,133 L 66,146 L 85,162 L 94,151 L 93,138 L 91,136 L 83,144 L 65,126 L 59,43 L 75,26 L 85,33 L 83,17 Z" fillRule="evenodd" />
          </svg>
        </div>
        <h1 className="splash-title">R A B A T</h1>
        <p className="splash-sub">by Time &amp; Taste</p>
        <div className="splash-divider">
          <span />
          <i>&#10022;</i>
          <span />
        </div>
      </div>
    </div>
  );
}
