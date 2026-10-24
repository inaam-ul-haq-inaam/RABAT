import cv2
import numpy as np
from PIL import Image

# 1. Load the clean cropped logo images
dark_img = Image.open('logo_dark.png')
gold_img = Image.open('logo_gold.png')
white_img = Image.open('logo_white.png')
emblem_gold = Image.open('emblem_gold.png')
emblem_dark = Image.open('emblem_dark.png')

# Save them to public folder
dark_img.save('public/logo-dark.png', optimize=True)
gold_img.save('public/logo-gold.png', optimize=True)
white_img.save('public/logo-white.png', optimize=True)
emblem_gold.save('public/emblem-gold.png', optimize=True)
emblem_dark.save('public/emblem-dark.png', optimize=True)

# Also webp versions for ultra-fast loading
dark_img.save('public/logo-dark.webp', quality=95)
gold_img.save('public/logo-gold.webp', quality=95)
emblem_gold.save('public/emblem-gold.webp', quality=95)

print("Saved raster assets to public/")

# 2. Extract SVG contours of the emblem
emblem_mat = cv2.imread('emblem_gold.png', cv2.IMREAD_UNCHANGED)
alpha = emblem_mat[:, :, 3]
h, w = alpha.shape

_, bin_img = cv2.threshold(alpha, 120, 255, cv2.THRESH_BINARY)
contours, hierarchy = cv2.findContours(bin_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

svg_paths = []
for c in contours:
    if cv2.contourArea(c) > 40:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.005 * peri, True)
        pts = [f"{pt[0][0]},{pt[0][1]}" for pt in approx]
        d = "M " + " L ".join(pts) + " Z"
        svg_paths.append(d)

print(f"Emblem paths: {len(svg_paths)}")

# Standalone Emblem SVG
emblem_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="currentColor" class="rabat-emblem">
""" + "\n".join([f'  <path d="{p}" fill-rule="evenodd" />' for p in svg_paths]) + "\n</svg>"

with open('public/emblem.svg', 'w') as f:
    f.write(emblem_svg)

# Full logo SVG tracing
mask = cv2.imread('clean_mask.png', cv2.COLOR_BGR2GRAY)
ys, xs = np.where(mask > 0)
pad = 15
ymin, ymax = max(0, ys.min() - pad), min(mask.shape[0], ys.max() + pad)
xmin, xmax = max(0, xs.min() - pad), min(mask.shape[1], xs.max() + pad)

crop = mask[ymin:ymax, xmin:xmax]
lh, lw = crop.shape

_, bin_img = cv2.threshold(crop, 120, 255, cv2.THRESH_BINARY)
contours, hierarchy = cv2.findContours(bin_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

paths = []
for i, c in enumerate(contours):
    area = cv2.contourArea(c)
    if area > 18:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.0035 * peri, True)
        pts = [f"{pt[0][0]},{pt[0][1]}" for pt in approx]
        paths.append("M " + " L ".join(pts) + " Z")

print(f"Total paths in full logo: {len(paths)}")
logo_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lw} {lh}" fill="currentColor" class="rabat-logo-svg">
""" + "\n".join([f'  <path d="{p}" fill-rule="evenodd" />' for p in paths]) + "\n</svg>"

with open('public/logo.svg', 'w') as f:
    f.write(logo_svg)

with open('public/logo-gold.svg', 'w') as f:
    f.write(logo_svg.replace('fill="currentColor"', 'fill="#D4AF37"'))

with open('public/logo-dark.svg', 'w') as f:
    f.write(logo_svg.replace('fill="currentColor"', 'fill="#1A1816"'))

print("Saved public/logo.svg, logo-gold.svg, logo-dark.svg")
