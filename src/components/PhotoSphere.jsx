import { useEffect, useMemo, useRef, useState } from 'react';
import { ZoomIcon } from './Icons.jsx';
import { EXPERIENCE_ITEMS } from '../data/home.js';

const EXPERIENCE_ICONS = {
  venue: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V8.6L12 4l7 4.6V21" />
      <path d="M9.8 21v-6.2h4.4V21" />
    </>
  ),
  decor: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  ),
  catering: (
    <>
      <path d="M4 11h16a1 1 0 0 1 1 1v1a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7v-1a1 1 0 0 1 1-1z" />
      <path d="M12 4v3" />
      <path d="M8 7h8" />
    </>
  ),
};

const INITIAL_TITLE = 'Hall 16 Grand Dome';
const INITIAL_DESC = 'Grand ballroom bathed in warm candlelight and Moroccan chandeliers.';

/**
 * Port of js/main.js section 14 — GALLERY 3D SPHERE.
 *
 * Same Fibonacci distribution, same idle spin (-18° / -6° start, 0.05° drift),
 * same drag inertia (0.28 spin factor, 0.93 damping, ±55° tilt clamp) and the
 * same "widest face wins" front detection that drives the caption panel and the
 * ↗ action button.
 */
export default function PhotoSphere({ items, onOpen }) {
  const stageRef = useRef(null);
  const orbitRef = useRef(null);
  const faceEls = useRef([]);
  const frontIdxRef = useRef(-1);

  const [frontIndex, setFrontIndex] = useState(-1);
  const reduceMotion = useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  /* Fibonacci sphere layout — identical maths to the original */
  const faces = useMemo(() => {
    const total = items.length;
    return items.map((item, i) => {
      const lat = 90 - (Math.acos(1 - (2 * (i + 0.5)) / total) * 180) / Math.PI;
      const lon = i * 137.508;
      return {
        ...item,
        transform: 'rotateY(' + lon.toFixed(2) + 'deg) rotateX(' + lat.toFixed(2) + 'deg) translateZ(var(--sphere-r))',
      };
    });
  }, [items]);

  useEffect(() => {
    const stage = stageRef.current;
    const orbit = orbitRef.current;
    if (!stage || !orbit || !faces.length) return undefined;

    let spin = -18;
    let tilt = -6;
    let vel = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let frameId = 0;

    function measureFront() {
      const els = faceEls.current;
      let best = -1;
      let bestW = -1;
      for (let i = 0; i < faces.length; i += 1) {
        const el = els[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width > bestW) {
          bestW = rect.width;
          best = i;
        }
      }
      if (best !== frontIdxRef.current) {
        frontIdxRef.current = best;
        setFrontIndex(best);
      }
    }

    function frame() {
      if (!dragging) {
        if (Math.abs(vel) > 0.04) {
          spin += vel;
          vel *= 0.93;
        } else if (!reduceMotion) {
          spin += 0.05;
        }
      }
      orbit.style.transform = 'rotateX(' + tilt + 'deg) rotateY(' + spin + 'deg)';
      measureFront();
      frameId = window.requestAnimationFrame(frame);
    }
    frameId = window.requestAnimationFrame(frame);

    function onPointerMove(event) {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      spin += dx * 0.28;
      vel = dx * 0.28;
      tilt = Math.max(-55, Math.min(55, tilt + dy * 0.12));
      measureFront();
    }

    function onPointerDown(event) {
      if (event.target.closest && event.target.closest('.sphere-action')) return;
      dragging = true;
      vel = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      stage.classList.add('dragging');
      if (stage.setPointerCapture) {
        try {
          stage.setPointerCapture(event.pointerId);
        } catch (err) {
          /* pointer capture is best-effort, exactly like the original */
        }
      }
      event.preventDefault();
    }

    function stopDrag() {
      dragging = false;
      stage.classList.remove('dragging');
    }

    function preventDragStart(event) {
      event.preventDefault();
    }

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', stopDrag);
    stage.addEventListener('pointercancel', stopDrag);
    stage.addEventListener('pointerleave', stopDrag);
    stage.addEventListener('dragstart', preventDragStart);

    return () => {
      window.cancelAnimationFrame(frameId);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerup', stopDrag);
      stage.removeEventListener('pointercancel', stopDrag);
      stage.removeEventListener('pointerleave', stopDrag);
      stage.removeEventListener('dragstart', preventDragStart);
    };
  }, [faces.length, reduceMotion]);

  const activeFace = frontIndex >= 0 ? faces[frontIndex] : null;
  const faceTitle = (activeFace && activeFace.title) || INITIAL_TITLE;
  const faceDesc = (activeFace && activeFace.desc) || INITIAL_DESC;

  /* clicking a face opens it in the lightbox (original sphereStage click) */
  function onStageClick(event) {
    const faceEl = event.target.closest ? event.target.closest('.sphere-face') : null;
    if (!faceEl) return;
    const index = Number(faceEl.getAttribute('data-index'));
    if (!Number.isNaN(index)) onOpen(index);
  }

  return (
    <div className="sphere-panel">
      <span className="sphere-panel-glow" aria-hidden="true" />
      <span className="sphere-panel-art" aria-hidden="true">
        <svg viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <path d="M16 122c28 0 50-11 63-28 11-15 13-33 9-50-17 2-31 11-40 24-10 14-12 33-7 50" />
          <path d="M50 106c15-7 26-20 30-35 3-13 2-26-2-37" />
          <path d="M86 78c13-4 23-14 27-26" />
          <path d="M32 118c9-15 22-26 37-31 13-4 27-4 39 0" />
          <path d="M140 116c16-6 27-18 31-33" />
        </svg>
      </span>

      {/* ---------- left column ---------- */}
      <div className="sphere-copy">
        <div className="sphere-copy-top">
          <span className="explore-pill">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11.5 13.6V5.9a1.4 1.4 0 0 1 2.8 0v6.1" />
              <path d="M14.3 12V9.6a1.4 1.4 0 0 1 2.8 0V15a6 6 0 0 1-6 6h-.8a5 5 0 0 1-3.6-1.5l-2.2-2.2a1.5 1.5 0 0 1 2.1-2.1l1.5 1.4" />
            </svg>
            DRAG TO ROTATE 3D SPHERE
          </span>
          <p className="explore-sub">Drag to explore the Rabat experience</p>
        </div>

        <div className="sphere-copy-main">
          <h3 className="explore-title">A World of Unforgettable Celebrations</h3>
          <span className="gold-rule" aria-hidden="true" />
          <p className="explore-body">Discover our elegant halls, signature décor and exceptional catering.</p>
        </div>
      </div>

      {/* ---------- centre: interactive 3D photo sphere ---------- */}
      <div
        className="sphere-stage"
        id="sphereStage"
        aria-label="Interactive 3D photo sphere — drag to rotate"
        ref={stageRef}
        onClick={onStageClick}
      >
        <span className="sphere-halo" aria-hidden="true" />
        <div className="sphere-orbit" id="sphereOrbit" ref={orbitRef}>
          {faces.map((face, index) => (
            <div
              className={'sphere-face' + (index === frontIndex ? ' is-front' : '')}
              role="button"
              tabIndex={-1}
              data-index={index}
              style={{ transform: face.transform }}
              key={'face-' + index}
              ref={(el) => {
                faceEls.current[index] = el;
              }}
            >
              <img src={face.img} alt={face.alt || ''} loading="lazy" />
            </div>
          ))}
        </div>
        <button
          className="sphere-action"
          id="sphereAction"
          type="button"
          aria-label={activeFace ? 'View details of ' + (activeFace.title || 'this photo') : 'View details of the photo facing you'}
          onClick={() => {
            if (frontIdxRef.current >= 0) onOpen(frontIdxRef.current);
          }}
        >
          <ZoomIcon size={20} strokeWidth={2.2} />
        </button>
      </div>

      {/* ---------- right column ---------- */}
      <aside className="experience-panel" aria-labelledby="experience-title">
        <span className="experience-eyebrow">HALL 16 HIGHLIGHTS</span>
        <h3 className="experience-title" id="experience-title">
          The Rabat Experience
        </h3>
        <span className="experience-ornament" aria-hidden="true" />

        <ul className="experience-list" role="list">
          {EXPERIENCE_ITEMS.map((item) => (
            <li className="experience-item" key={item.name}>
              <span className="experience-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {EXPERIENCE_ICONS[item.icon]}
                </svg>
              </span>
              <div className="experience-text">
                <h4 className="experience-name">{item.name}</h4>
                <p className="experience-desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* ---------- photo facing the viewer ---------- */}
      <div className="sphere-caption" aria-live="polite">
        <span className="sphere-caption-eyebrow">ACTIVE PHOTO VIEW</span>
        <span className="sphere-caption-title" id="faceTitle">
          {faceTitle}
        </span>
        <span className="sphere-caption-desc" id="faceDesc">
          {faceDesc}
        </span>
      </div>
    </div>
  );
}
