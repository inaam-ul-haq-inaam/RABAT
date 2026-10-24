/** #decors — the three signature stage decor themes (cards 1 & 2 + the wide card 3). */
export const DECOR_CARDS = [
  {
    badge: { kind: 'crown', label: 'SIGNATURE COLLECTION' },
    img: 'images/decors/rabat_moroccan_decor_1790426103016.webp',
    alt: 'Moroccan dome and colonnade stage decor with brass lantern lighting',
    title: 'Moroccan Dome & Colonnades',
    subtitle: 'Imperial Arches, Brass Lanterns & Royal Glow',
    desc: "A deeply regal palette inspired by royal Moroccan palatial courtyards — hand-carved arch curtain, colonnade lantern walkways and a grand couple's entrance for the Barat.",
    specs: [
      'Hand-carved Moroccan arch curtain backdrop',
      'Brass lantern colonnade walkways',
      'Gold Chiavari & Louis XVI seating accents',
      'Theatrical entry spotlights with fog reveal',
    ],
    stageSize: '40 ft (W) × 20 ft (D) × 14 ft (H)',
    theme: 'Moroccan Dome & Colonnades',
    wide: false,
  },
  {
    badge: { kind: 'diamond', label: 'PREMIUM COLLECTION' },
    img: 'images/decors/rabat_curtain_stage_1790426115677.webp',
    alt: 'Curtain stage with flowing velvet drapes and dramatic lighting',
    title: 'Curtain Stage & Moroccan Themes',
    subtitle: 'Flowing Velvet Drapes & Moving Light',
    desc: 'Layered velvet drapes meet intelligent moving-head lighting — a cinematic frame for your nikkah, Walima or corporate keynote, with a programmable scene for every moment.',
    specs: [
      'Layered velvet drape columns with gold tiebacks',
      'Intelligent moving-head wash lighting',
      "Grand couple's entrance aisle",
      'Programmable color scenes per ceremony',
    ],
    stageSize: '40 ft (W) × 16 ft (D) × 12 ft (H)',
    theme: 'Curtain Stage & Moroccan Themes',
    wide: false,
  },
  {
    badge: { kind: 'crown', label: 'SIGNATURE COLLECTION' },
    img: 'images/decors/rabat_floral_stage_1790443124026.webp',
    alt: 'Bright floral stage decor with cascading fresh blooms',
    title: 'Bright Floral Stage',
    subtitle: 'Fresh Blooms in Blush, Ivory & Gold',
    desc: 'Cascading fresh flower walls and floating garlands turn the stage into a blooming garden — made for Mehndis, Walimas and daylight receptions full of color.',
    specs: [
      'Cascading fresh flower wall panels',
      'Floating floral ceiling garlands',
      'Mirror table tops with tea-lights',
      'Blush, ivory & gold palette options',
    ],
    stageSize: 'Custom, scaled across full stage width',
    theme: 'Bright Floral Stage',
    wide: true,
  },
];

/**
 * #decors intro paragraph — em dashes restored. The original index.html (and
 * this file's first version) shipped double-encoded mojibake ("ï¿½", i.e.
 * U+00EF U+00BF U+00BD) where em dashes were intended — a pre-existing
 * encoding artefact that rendered as broken "½" glyphs on the page.
 */
export const DECORS_BODY =
  'Fifteen-plus signature stage architectures — from the imperial Moroccan arch curtain to bright floral and royal feast setups — each fully rigged with intelligent lighting, acoustic reinforcement and our moving smart-stage.';
