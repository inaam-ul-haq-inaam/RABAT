import { Fragment } from 'react';
import Section from './Section.jsx';
import { STATS } from '../data/home.js';

const STAT_ICONS = {
  calendar: (
    <>
      <rect x="9" y="11" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 17.5h22" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 8v5M25 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="m18.6 25.4 1.9 1.2-.7-2.2 1.9-1.5h-2.3l-.8-2.1-.8 2.1h-2.3l1.9 1.5-.7 2.2 1.9-1.2z"
        fill="currentColor"
      />
    </>
  ),
  laurel: (
    <>
      <path
        d="M13.5 10.5C9.5 12.8 7 17 7 21.5c0 4.4 2.4 8.6 6.5 11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m10 13.5 3.4.9M8.5 18.2l3.4.4M8.6 23.5l3.3-.4M10.4 28.6l3-1.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M26.5 10.5c4 2.3 6.5 6.5 6.5 11 0 4.4-2.4 8.6-6.5 11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m30 13.5-3.4.9M31.5 18.2l-3.4.4M31.4 23.5l-3.3-.4M29.6 28.6l-3-1.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m20 13.5 1.5 3.2 3.5.5-2.6 2.5.7 3.6-3.1-1.8-3.1 1.8.7-3.6-2.6-2.5 3.5-.5L20 13.5z"
        fill="currentColor"
      />
    </>
  ),
  headset: (
    <>
      <path
        d="M11 24v-5.5A9 9 0 0 1 20 9.5a9 9 0 0 1 9 9V24"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="7.5" y="21" width="6" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="26.5" y="21" width="6" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M29.5 29v2a3.5 3.5 0 0 1-3.5 3.5h-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="21.5" cy="34.5" r="1.4" fill="currentColor" />
    </>
  ),
};

export default function Hallmarks() {
  return (
    <Section className="metrics scrollfade" id="hallmarks">
      <div className="premium-card">
        <div className="premium-head">
          {/* the original keeps a whitespace text node between these two spans */}
          <span className="eyebrow">The Rabat Hall Experience</span>{' '}
          <span className="eyebrow-mark" aria-hidden="true" />
          <h2 className="premium-title">Top Banquet Hall Standards in Every Celebration</h2>
          <span className="premium-rule" aria-hidden="true">
            <svg
              viewBox="0 0 112 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="112"
              height="20"
            >
              <path
                d="M106.5 10C106.5 10 104 4 99 4C94 4 92.3 8 89 8C85.7 8 84 4 80 4C76 4 74.3 8 71 8C67.7 8 66 4 62 4C58 4 56.3 8 53 8C49.7 8 48 4 44 4C40 4 38.3 8 35 8C31.7 8 30 4 26 4C22 4 20.3 8 17 8C13.7 8 12 4 8 4C3 4 0.5 10 0.5 10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M55.5 14.5C56.5 13.5 57.5 12 57.5 10C57.5 8 56.5 6.5 55.5 5.5C54.5 6.5 53.5 8 53.5 10C53.5 12 54.5 13.5 55.5 14.5Z"
                fill="currentColor"
              />
              <path
                d="M89.5 14.5C90.5 13.5 91.5 12 91.5 10C91.5 8 90.5 6.5 89.5 5.5C88.5 6.5 87.5 8 87.5 10C87.5 12 88.5 13.5 89.5 14.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>

        <div className="premium-stats" role="list">
          {STATS.map((stat, index) => (
            <Fragment key={stat.label}>
              <div className="stat" role="listitem">
                <span className="stat-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                  >
                    {STAT_ICONS[stat.icon]}
                  </svg>
                </span>
                <span className="stat-flourish" aria-hidden="true" />
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-bullet" aria-hidden="true" />
              </div>
              {index < STATS.length - 1 && (
                <div className="stat-divider" aria-hidden="true">
                  <span className="divider-diamond" aria-hidden="true" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </Section>
  );
}
