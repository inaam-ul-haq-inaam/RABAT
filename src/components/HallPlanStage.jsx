import Section from './Section.jsx';
import { STAGE_POINTS } from '../data/hallplan.js';

const POINT_ICONS = {
  stage: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  light: (
    <>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  sound: (
    <>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </>
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
};

export default function HallPlanStage() {
  return (
    <Section className="hallplan-stage reveal reveal-delay-2" id="hallplan-stage" aria-labelledby="stage-title">
      <div className="container">
        <div className="hallplan-header">
          <span className="hallplan-eyebrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Smart Stage System
          </span>
          <h2 className="hallplan-title" id="stage-title">
            A Stage That Moves With You
          </h2>
          <p className="hallplan-body">
            The motorized smart-stage glides silently across the full length of the hall — revealing or concealing the
            Moroccan arch curtain exactly on cue.
          </p>
        </div>
        <div className="stage-grid" role="list">
          {STAGE_POINTS.map((point) => (
            <article className="point-card" role="listitem" key={point.title}>
              <div className="point-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                  {POINT_ICONS[point.icon]}
                </svg>
              </div>
              <h3 className="point-title">{point.title}</h3>
              <p className="point-body">{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
