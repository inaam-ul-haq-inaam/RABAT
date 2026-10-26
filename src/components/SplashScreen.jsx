import { useEffect, useMemo, useState } from 'react';
import './SplashScreen.css';

// Total intro duration: ~4.5s logo rise + hall reveal + light burst + golden particles → fade out
const TOTAL_MS = 4800;

// Generate golden particles once (deterministic pseudo-random, no re-renders)
const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const rand = (seed) => {
    const x = Math.sin(i * 37.17 + seed * 91.3) * 10000;
    return x - Math.floor(x);
  };
  return {
    left: `${(8 + rand(1) * 84).toFixed(1)}%`,
    delay: `${(2.0 + rand(2) * 0.8).toFixed(2)}s`,
    duration: `${(1.2 + rand(3) * 1.4).toFixed(2)}s`,
    size: 3 + Math.round(rand(4) * 4),
    drift: Math.round(rand(5) * 60 - 30),
    hue: Math.round(42 + rand(6) * 12), // gold range 42-54
    lightness: Math.round(58 + rand(7) * 22), // 58-80%
  };
});

export default function SplashScreen() {
  const [gone, setGone] = useState(false);
  const particles = useMemo(() => PARTICLES, []);

  useEffect(() => {
    const timer = setTimeout(() => setGone(true), TOTAL_MS);
    return () => clearTimeout(timer);
  }, []);

  if (gone) return null;

  return (
    <div className="splash-intro" aria-hidden="true">
      {/* ── TOP HALF: Logo, Title, Sub-Text ── */}
      <div className="splash-top">
        <div className="splash-logo-wrap">
          <img
            src="emblem-gold.webp"
            alt="Rabat Emblem"
            className="splash-logo-img"
            width="200"
            height="200"
          />
        </div>
        <h1 className="splash-brand">RABAT</h1>
        <h2 className="splash-sub-brand">RABAT BANQUET HALL</h2>
        <p className="splash-tagline">OPEN FOR BOOKINGS</p>
        <p className="splash-contact">CALL 033 4422 6070 &bull; 030 1713 0942</p>
      </div>

      {/* ── BOTTOM HALF: Hall Reveal with Light Burst ── */}
      <div className="splash-hall">
        <img
          src="images/hero/rabat_intro_hall.jpg"
          alt="Rabat Banquet Hall"
          className="splash-hall-img"
        />

        {/* Light Burst from the Gate Center */}
        <div className="splash-light-burst" />

        {/* Golden Particles rising from the hall */}
        <div className="splash-particles">
          {particles.map((p, i) => (
            <span
              key={i}
              className="splash-particle"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                '--p-size': `${p.size}px`,
                '--p-drift': `${p.drift}px`,
                '--p-hue': p.hue,
                '--p-light': `${p.lightness}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Full-screen Fade-Out overlay at the end ── */}
      <div className="splash-fadeout" />
    </div>
  );
}
