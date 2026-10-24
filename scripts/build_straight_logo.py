import cv2
import numpy as np
from PIL import Image

# 1. Load the new close-up high-res photo
raw_path = r'C:/Users/NaAmiii/.gemini/antigravity/brain/ad037ca7-6dcd-44f0-b105-7dc4a35dada0/.user_uploaded/media_1792842468387_38cbb074.png'
img = cv2.imread(raw_path)
h, w = img.shape[:2]
center = (w // 2, h // 2)

# Rotate by -7.88° to make it 100% straight and vertical (Full Sida)
M = cv2.getRotationMatrix2D(center, -7.88, 1.0)
rotated = cv2.warpAffine(img, M, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REPLICATE)

# Convert to grayscale
gray = cv2.cvtColor(rotated, cv2.COLOR_BGR2GRAY)

# Otsu thresholding
_, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

# Crop with padding
ys, xs = np.where(thresh > 0)
pad = 25
ymin, ymax = max(0, ys.min() - pad), min(h, ys.max() + pad)
xmin, xmax = max(0, xs.min() - pad), min(w, xs.max() + pad)

emblem_crop = thresh[ymin:ymax, xmin:xmax]
eh, ew = emblem_crop.shape

# Generate antialiased high-res PNG and WebP
hires = cv2.resize(emblem_crop, (ew * 2, eh * 2), interpolation=cv2.INTER_CUBIC)
hires = cv2.GaussianBlur(hires, (5, 5), 0.8)
aa = cv2.resize(hires, (ew, eh), interpolation=cv2.INTER_AREA)

# Golden emblem
gold_rgba = np.zeros((eh, ew, 4), dtype=np.uint8)
gold_rgba[:, :, 0] = 212 # R
gold_rgba[:, :, 1] = 175 # G
gold_rgba[:, :, 2] = 55  # B
gold_rgba[:, :, 3] = aa
Image.fromarray(gold_rgba).save('public/emblem-gold.png', optimize=True)
Image.fromarray(gold_rgba).save('public/emblem-gold.webp', quality=95)

# Dark emblem
dark_rgba = np.zeros((eh, ew, 4), dtype=np.uint8)
dark_rgba[:, :, 0] = 26
dark_rgba[:, :, 1] = 24
dark_rgba[:, :, 2] = 22
dark_rgba[:, :, 3] = aa
Image.fromarray(dark_rgba).save('public/emblem-dark.png', optimize=True)

# 2. Extract SVG contours of the straight emblem
contours, hierarchy = cv2.findContours(emblem_crop, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

svg_paths = []
for c in contours:
    if cv2.contourArea(c) > 800:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.002 * peri, True)
        pts = [f"{p[0][0]},{p[0][1]}" for p in approx]
        svg_paths.append("M " + " L ".join(pts) + " Z")

print(f"Extracted {len(svg_paths)} vector paths for straight emblem")

# Clean SVG
emblem_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {ew} {eh}" fill="currentColor" class="rabat-emblem">
""" + "\n".join([f'  <path d="{p}" fill-rule="evenodd" />' for p in svg_paths]) + "\n</svg>"

with open('public/emblem.svg', 'w') as f:
    f.write(emblem_svg)

print(f"Saved straight public/emblem.svg ({ew}x{eh})")

# 3. Create full horizontal vector logo with straight emblem and typography
full_logo = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 84" fill="currentColor">
  <g transform="translate(4, 2) scale(0.08, 0.08)">
""" + "\n".join([f'    <path d="{p}" fill-rule="evenodd" />' for p in svg_paths]) + f"""
  </g>
  <text x="62" y="46" font-family="'Cormorant Garamond', Georgia, serif" font-size="38" font-weight="600" letter-spacing="4" fill="currentColor">RABAT</text>
  <text x="64" y="68" font-family="'Cormorant Garamond', Georgia, serif" font-size="15" font-style="italic" letter-spacing="1" fill="currentColor" opacity="0.9">by Time &amp; Taste</text>
</svg>"""

with open('public/logo.svg', 'w') as f:
    f.write(full_logo)

with open('public/logo-gold.svg', 'w') as f:
    f.write(full_logo.replace('fill="currentColor"', 'fill="#D4AF37"'))

with open('public/logo-dark.svg', 'w') as f:
    f.write(full_logo.replace('fill="currentColor"', 'fill="#1A1816"'))

print("Saved public/logo.svg, logo-gold.svg, logo-dark.svg")
