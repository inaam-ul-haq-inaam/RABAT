// Splits public/image_11.png into the two curtain halves used by SplashScreen.
//
//   node scripts/split-curtain.mjs
//
// Output: public/curtain-left.webp  (left half  — left fringe/tassel, meet-line on its right edge)
//         public/curtain-right.webp (right half — right fringe/tassel, meet-line on its left edge)
//
// If public/image_11.png is missing, the script exits with a note; SplashScreen
// then keeps rendering its CSS-gradient fallback (the <img> URL layer just
// stays blank), so the site works either way.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'public', 'image_11.png');
const OUT = (side) => path.join(ROOT, 'public', `curtain-${side}.webp`);

// Cap the halves so the WebPs stay small; SplashScreen paints them with
// background-size: cover, so a little upscaling on 4K screens is imperceptible.
const MAX_HALF_WIDTH = 960;

if (!existsSync(SRC)) {
  console.warn('[split-curtain] public/image_11.png not found — nothing to crop.');
  console.warn('[split-curtain] Drop the base curtain image into public/ and re-run this script.');
  console.warn('[split-curtain] SplashScreen continues to show its CSS-gradient fallback meanwhile.');
  process.exit(0);
}

const sharp = (await import('sharp')).default;
const metadata = await sharp(SRC).metadata();
const halfWidth = Math.floor(metadata.width / 2);

// safety cap: only downscale when the source is huge
const targetWidth = Math.min(halfWidth, MAX_HALF_WIDTH);
const targetHeight = Math.max(1, Math.round((metadata.height * targetWidth) / halfWidth));

const webpOptions = {
  // good crispness per byte for fold textures; smartSubsample keeps fringes sharp
  quality: 72,
  effort: 4,
  smartSubsample: true,
};

const resizeOptions = {
  width: targetWidth,
  height: targetHeight,
  fit: 'fill',
};

await sharp(SRC)
  .extract({ left: 0, top: 0, width: halfWidth, height: metadata.height })
  .resize(resizeOptions)
  .webp(webpOptions)
  .toFile(OUT('left'));

await sharp(SRC)
  .extract({ left: metadata.width - halfWidth, top: 0, width: halfWidth, height: metadata.height })
  .resize(resizeOptions)
  .webp(webpOptions)
  .toFile(OUT('right'));

console.log(`[split-curtain] wrote public/curtain-left.webp and public/curtain-right.webp (${halfWidth}px -> ${targetWidth}x${targetHeight} each)`);
