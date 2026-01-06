import sharp from 'sharp';
import { readFileSync } from 'fs';

const svgBuffer = readFileSync('./public/hero/bulgarian-squash-tour-2026.svg');

await sharp(svgBuffer)
  .png()
  .toFile('./public/hero/bulgarian-squash-tour-2026.png');

console.log('✅ Converted SVG to PNG');
