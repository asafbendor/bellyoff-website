# Prepares a generated photo for the blog: 3:2 crop to 1200x800, JPEG, and a small "bellyoff.app"
# mark in the bottom corner so the source is known wherever the picture travels (Asaf, 17 October
# 2026). Realistic photos come from the image lane (Outsourcerer `image`, the ChatGPT subscription);
# this script only crops, compresses and marks. Same recipe as maazan.info.
#
#   python scripts/post-photo.py <source.png> <file-name-with-keyword>
#   -> public/blog/<file-name-with-keyword>.jpg
import sys, os
from PIL import Image, ImageDraw, ImageFont

SITE = 'bellyoff.app'
CORNER = 'right'   # 'left' for an RTL (Hebrew) site, 'right' for an LTR site
OUT_DIR = 'public/blog'  # relative to the repo folder that holds scripts/

src, name = sys.argv[1], sys.argv[2]
if not name.replace('-', '').isalnum() or name != name.lower():
    raise SystemExit('name must be lowercase latin letters, digits and dashes')
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = os.path.join(root, *OUT_DIR.split('/'), name + '.jpg')
W, H = 1200, 800

im = Image.open(src).convert('RGB')
w, h = im.size
if w / h > W / H:
    nw = int(h * W / H); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
else:
    nh = int(w * H / W); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
im = im.resize((W, H), Image.LANCZOS)

font = None
for f in [r'C:\Windows\Fonts\Rubik-Bold.ttf', os.path.expanduser(r'~\AppData\Local\Microsoft\Windows\Fonts\Rubik-Bold.ttf'), r'C:\Windows\Fonts\arialbd.ttf']:
    if os.path.exists(f):
        font = ImageFont.truetype(f, 26); break
font = font or ImageFont.load_default()
draw = ImageDraw.Draw(im, 'RGBA')
bbox = draw.textbbox((0, 0), SITE, font=font)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
x = 28 if CORNER == 'left' else W - tw - 28
y = H - th - 30
draw.rounded_rectangle((x - 12, y - 8, x + tw + 12, y + th + 10), radius=10, fill=(11, 13, 12, 110))
draw.text((x, y - bbox[1]), SITE, font=font, fill=(255, 255, 255, 235))

os.makedirs(os.path.dirname(out), exist_ok=True)
im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
print(out, os.path.getsize(out), 'bytes')
