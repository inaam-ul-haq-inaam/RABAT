import { useMemo } from 'react';
import './DecorPetals.css';

const PETAL_COUNT = 30;
const PETAL_COLORS = ['red', 'pink', 'white'];

function generatePetals(count) {
  const petals = [];
  for (let i = 0; i < count; i++) {
    // Deterministic pseudo-random generation based on index
    const r1 = Math.abs(Math.sin((i + 1) * 12.9898)) % 1;
    const r2 = Math.abs(Math.sin((i + 1) * 78.233)) % 1;
    const r3 = Math.abs(Math.sin((i + 1) * 45.164)) % 1;
    const r4 = Math.abs(Math.sin((i + 1) * 93.385)) % 1;
    const r5 = Math.abs(Math.sin((i + 1) * 27.819)) % 1;

    const type = PETAL_COLORS[i % PETAL_COLORS.length];
    const left = `${(r1 * 96 + 2).toFixed(1)}%`;
    const fallDuration = 7.2 + r2 * 4.6; // 7.2s to 11.8s
    // Negative delay so petals are staggered across the entire screen immediately
    const fallDelay = -(r3 * fallDuration).toFixed(2);
    const swayDuration = (2.6 + r4 * 1.6).toFixed(2);
    const swayDelay = -(r5 * 3.2).toFixed(2);
    const size = Math.round(14 + r3 * 11); // 14px to 25px
    const swayAmount = Math.round(24 + r4 * 32); // 24px to 56px

    petals.push({
      id: i,
      type,
      left,
      fallDuration: `${fallDuration.toFixed(2)}s`,
      fallDelay: `${fallDelay}s`,
      swayDuration: `${swayDuration}s`,
      swayDelay: `${swayDelay}s`,
      size,
      swayAmount,
    });
  }
  return petals;
}

export default function DecorPetals() {
  const petals = useMemo(() => generatePetals(PETAL_COUNT), []);

  return (
    <div className="decor-petals-viewport" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="decor-petal-track"
          style={{
            left: p.left,
            animationDuration: p.fallDuration,
            animationDelay: p.fallDelay,
          }}
        >
          <div
            className={`decor-petal-leaf decor-petal--${p.type}`}
            style={{
              width: `${p.size}px`,
              height: `${Math.round(p.size * 0.8)}px`,
              animationDuration: p.swayDuration,
              animationDelay: p.swayDelay,
              '--sway-amount': `${p.swayAmount}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
