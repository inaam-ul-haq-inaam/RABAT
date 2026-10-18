/** #hero — the four feature bullets under the hero actions. */
export const HERO_FEATURES = [
  { icon: 'pavilion', strong: ' SQ. FT.', span: 'Grand Pavilion' },
  { icon: 'interior', strong: 'Royal Interiors', span: 'Timeless Elegance' },
  { icon: 'catering', strong: 'Royal Catering', span: 'World-Class Cuisine' },
  { icon: 'parking', strong: 'Ample Parking', span: 'Valet & Security' },
];

/** The five hero slides, in original order (first one is the eager slide). */
export const HERO_SLIDES = [
  { src: 'images/hero/ai_hero_stage.jpg', alt: 'Rabat grand stage', type: 'image/jpeg', width: 1376, height: 768, eager: true },
  { src: 'images/hero/ai_hero_table.jpg', alt: 'Rabat luxury table setting', type: 'image/jpeg', width: 1376, height: 768, eager: false },
  { src: 'images/hero/ai_hero_arch.jpg', alt: 'Rabat grand architecture', type: 'image/jpeg', width: 1376, height: 768, eager: false },
  { src: 'images/hero/ai_luxury_table.jpg', alt: 'Rabat luxury table', type: 'image/jpeg', width: 1376, height: 768, eager: false },
  {
    src: 'images/hero/rabat_bright_royal_feast_1790426763176.webp',
    alt: 'Rabat royal feast',
    type: 'image/webp',
    width: 1376,
    height: 768,
    eager: false,
  },
];

/** The full-bleed photo bands between the home-page sections. */
export const PHOTO_BANDS = [
  { id: 'band-1', image: 'images/pavilion/ai_luxury_banquet.jpg' },
  { id: 'band-2', image: 'images/pavilion/ai_luxury_table.jpg' },
  { id: 'band-3', image: 'images/pavilion/ai_luxury_lounge.jpg' },
];

/** #hallmarks — the three palace statistics. */
export const STATS = [
  { icon: 'calendar', number: '5,000+', label: 'Events Hosted' },
  { icon: 'laurel', number: '30+', label: 'Years of Excellence' },
  { icon: 'headset', number: '24/7', label: 'Dedicated Support' },
];

/** #gallery — the "Hall 16 highlights" side panel list. */
export const EXPERIENCE_ITEMS = [
  {
    icon: 'venue',
    name: 'Elegant Venues',
    desc: 'Hall 16 — 32 ft. clear span, 1,000+ guests seated, unobstructed sightlines.',
  },
  {
    icon: 'decor',
    name: 'Signature Décor',
    desc: 'Fifteen-plus bespoke stage decors, from Moroccan arches to bright florals.',
  },
  {
    icon: 'catering',
    name: 'Royal Catering',
    desc: 'Deg-cooked biryanis, Moroccan tagines and live flaming stations.',
  },
];
