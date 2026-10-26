import { useEffect, useMemo, useState } from 'react';
import './SplashScreen.css';

// ── Master Cinema Timing (ms) ──
// 0.0s - 7.0s: 3D Royal Monogram & Hall Parallax in full view
// 7.0s - 7.6s: Stage 1 — Logo & "by Time & Taste Catering" softly elevate and dissolve
// 7.6s - 8.9s: Stage 2 — Fullscreen dark atmosphere melts away over 1.3s into website
// 9.2s: Stage 3 — Clean DOM unmount with zero flash or jolt
const STAGE_EXIT_CONTENT_MS = 7000;
const STAGE_EXIT_VEIL_MS = 7600;
const STAGE_UNMOUNT_MS = 9200;

// Optimized lightweight motes (14 particles: 60fps on mobile & desktop)
const DUST_MOTES = Array.from({ length: 14 }, (_, i) => {
  const rand = (seed) => {
    const x = Math.sin(i * 47.19 + seed * 83.7) * 10000;
    return x - Math.floor(x);
  };
  const size = 3 + Math.round(rand(1) * 4);
  return {
    left: `${(8 + rand(3) * 84).toFixed(1)}%`,
    bottom: `${(10 + rand(4) * 60).toFixed(1)}%`,
    delay: `${(0.3 + rand(5) * 1.5).toFixed(2)}s`,
    duration: `${(2.2 + rand(6) * 1.6).toFixed(2)}s`,
    size,
    driftX: Math.round(rand(7) * 50 - 25),
    driftY: Math.round(-80 - rand(8) * 90),
    opacity: (0.45 + rand(9) * 0.45).toFixed(2),
  };
});

export default function SplashScreen() {
  const [stage, setStage] = useState('playing');
  const motes = useMemo(() => DUST_MOTES, []);

  useEffect(() => {
    // 1. First dissolve the center typography & emblem softly at 7.0s
    const tContent = setTimeout(() => setStage('exit-content'), STAGE_EXIT_CONTENT_MS);

    // 2. Then gracefully dissolve the full-screen veil over 1.3s into the website
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
          decoding="async"
        />
        {/* GPU-composited Dimmer (Zero re-rasterization on mobile) */}
        <div className="r-cinema-dimmer" />
        <div className="r-cinema-vignette" />
        <div className="r-cinema-radial-glow" />
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
              decoding="async"
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
          <p className="r-cinema-sub">by Time &amp; Taste Catering</p>

          {/* Golden Royal Divider */}
          <div className="r-cinema-divider">
            <span className="r-divider-line" />
            <span className="r-divider-star">&#10022;</span>
            <span className="r-divider-line r-divider-line--reverse" />
          </div>
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
