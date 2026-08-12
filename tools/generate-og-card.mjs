import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const publicDir = path.join(ROOT, "public");
const logoPath = path.join(publicDir, "logo.png");
const outDir = path.join(publicDir, "og");
const outPath = path.join(outDir, "double-yellow-social-1200x630.png");

const width = 1200;
const height = 630;

await fs.mkdir(outDir, { recursive: true });

const logo = await sharp(logoPath)
  .resize({ width: 540, height: 260, fit: "contain" })
  .png()
  .toBuffer();

const overlaySvg = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111111"/>
      <stop offset="100%" stop-color="#1f1f1f"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${width}" height="16" fill="#f5c518"/>
  <rect x="0" y="${height - 16}" width="${width}" height="16" fill="#f5c518"/>

  <text x="600" y="430" fill="#f5f5f5" font-size="52" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700">
    DOUBLE YELLOW SQUASH CLUB
  </text>
  <text x="600" y="485" fill="#d4d4d4" font-size="36" text-anchor="middle" font-family="Arial, sans-serif" font-weight="500">
    Sofia, Bulgaria
  </text>
</svg>
`);

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: "#111111",
  },
})
  .composite([
    { input: overlaySvg, top: 0, left: 0 },
    { input: logo, top: 135, left: Math.round((width - 540) / 2) },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log(`Created ${path.relative(ROOT, outPath)}`);
