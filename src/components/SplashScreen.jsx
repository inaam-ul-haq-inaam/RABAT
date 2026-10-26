import { useEffect, useMemo, useState } from 'react';
import './SplashScreen.css';

// ── Master Cinema Timing (ms) ──
// 0.0s - 3.2s: 3D Royal Monogram & Hall Parallax in full glory
// 3.2s - 3.8s: Stage 1 — Logo & Typography softly elevate and dissolve
// 3.8s - 5.0s: Stage 2 — Dark atmosphere & hall veil melt away over 1.2s buttery ease
// 5.2s: Stage 3 — Clean DOM unmount with zero flash or jolt
const STAGE_EXIT_CONTENT_MS = 3200;
const STAGE_EXIT_VEIL_MS = 3800;
const STAGE_UNMOUNT_MS = 5200;

// Deterministic golden dust / ember motes (varying depths and blurs)
const DUST_MOTES = Array.from({ length: 28 }, (_, i) => {
  const rand = (seed) => {
    const x = Math.sin(i * 47.19 + seed * 83.7) * 10000;
    return x - Math.floor(x);
  };
  const size = 3 + Math.round(rand(1) * 5);
  const isBokeh = rand(2) > 0.65;
  return {
    left: `${(6 + rand(3) * 88).toFixed(1)}%`,
    bottom: `${(10 + rand(4) * 60).toFixed(1)}%`,
    delay: `${(0.4 + rand(5) * 1.8).toFixed(2)}s`,
    duration: `${(2.2 + rand(6) * 1.8).toFixed(2)}s`,
    size: isBokeh ? size * 1.8 : size,
    driftX: Math.round(rand(7) * 70 - 35),
    driftY: Math.round(-90 - rand(8) * 110),
    blur: isBokeh ? '2.5px' : '0.5px',
    opacity: (0.45 + rand(9) * 0.45).toFixed(2),
  };
});

export default function SplashScreen() {
  // stages: 'playing' -> 'exit-content' (3.2s) -> 'exit-veil' (3.8s) -> 'unmounted' (5.2s)
  const [stage, setStage] = useState('playing');
  const motes = useMemo(() => DUST_MOTES, []);

  useEffect(() => {
    // 1. First dissolve the center typography & emblem softly
    const tContent = setTimeout(() => setStage('exit-content'), STAGE_EXIT_CONTENT_MS);

    // 2. Then gracefully dissolve the full-screen veil over 1.2s into the website
    const tVeil = setTimeout(() => setStage('exit-veil'), STAGE_EXIT_VEIL_MS);

    // 3. Completely unmount from DOM when opacity has safely hit 0
    const tUnmount = setTimeout(() => setStage('unmounted'), STAGE_UNMOUNT_MS);

    return () => {
      clearTimeout(tContent);
      clearTimeout(tVeil);
      clearTimeout(tUnmount);
    };
  }, []);

  if (stage === 'unmounted') return null;

  const isContentExiting = stage === 'exit-content' || stage === 'exit-veil';
  const isVeilDissolving = stage === 'exit-veil';

  return (
    <div
      className={`r-cinema-splash ${isVeilDissolving ? 'r-cinema-splash--dissolving' : ''}`}
      aria-hidden={isVeilDissolving}
    >
      {/* ── 1. FULL-SCREEN HALL BACKDROP (Ken Burns Parallax) ── */}
      <div className="r-cinema-bg-wrap">
        <img
          src="images/hero/rabat_intro_hall.jpg"
          alt="Rabat Grand Hall"
          className="r-cinema-bg-img"
          loading="eager"
        />
        {/* Deep Imperial Vignette & Atmosphere Overlays */}
        <div className="r-cinema-vignette" />
        <div className="r-cinema-radial-glow" />
        <div className="r-cinema-light-beam" />
      </div>

      {/* ── 2. FLOATING GOLDEN DUST & BOKEH MOTES ── */}
      <div
        className={`r-cinema-motes ${isContentExiting ? 'r-cinema-motes--fade' : ''}`}
        aria-hidden="true"
      >
        {motes.map((m, i) => (
          <span
            key={i}
            className="r-cinema-mote"
            style={{
              left: m.left,
              bottom: m.bottom,
              width: `${m.size}px`,
              height: `${m.size}px`,
              filter: `blur(${m.blur})`,
              animationDelay: m.delay,
              animationDuration: m.duration,
              '--drift-x': `${m.driftX}px`,
              '--drift-y': `${m.driftY}px`,
              '--peak-opacity': m.opacity,
            }}
          />
        ))}
      </div>

      {/* ── 3. CENTERPIECE: 3D GOLD MONOGRAM & TYPOGRAPHY ── */}
      <div
        className={`r-cinema-content ${isContentExiting ? 'r-cinema-content--exit' : ''}`}
      >
        {/* 3D Gold Emblem Monogram with Sheen Sweep */}
        <div className="r-cinema-emblem-wrap">
          <div className="r-cinema-emblem-halo" />
          <div className="r-cinema-emblem-3d">
            <img
              src="emblem-gold.webp"
              alt="Rabat Imperial Emblem"
              className="r-cinema-emblem-img"
              width="140"
              height="140"
            />
            {/* Shimmer light sweep reflection across emblem */}
            <div className="r-cinema-emblem-shimmer" />
          </div>
        </div>

        {/* 3D Extruded Regal Typography */}
        <div className="r-cinema-titles">
          <h1 className="r-cinema-brand" data-text="RABAT">
            RABAT
          </h1>
          <p className="r-cinema-sub">RABAT BANQUET HALL</p>

          {/* Golden Royal Divider */}
          <div className="r-cinema-divider">
            <span className="r-divider-line" />
            <span className="r-divider-star">&#10022;</span>
            <span className="r-divider-line r-divider-line--reverse" />
          </div>

          {/* Booking & VIP Details Badge */}
          <div className="r-cinema-badge">
            <span className="r-badge-pulse" />
            <span className="r-badge-text">OPEN FOR BOOKINGS</span>
          </div>

          <p className="r-cinema-contact">
            CALL 033 4422 6070 <span className="r-dot">&bull;</span> 030 1713 0942
          </p>
        </div>
      </div>

      {/* ── 4. GOLDEN ANAMORPHIC FLARE ACROSS CENTER ── */}
      <div
        className={`r-cinema-flare ${isContentExiting ? 'r-cinema-flare--fade' : ''}`}
        aria-hidden="true"
      />
    </div>
  );
}
