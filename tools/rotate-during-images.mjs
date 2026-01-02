import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function rotateImages() {
  const images = [
    'public/about/during1.jpg',
    'public/about/during2.jpg'
  ];

  for (const img of images) {
    const path = join(rootDir, img);
    console.log(`Rotating ${img}...`);
    
    try {
      await sharp(path)
        .rotate(90)
        .toFile(path + '.rotated.jpg');
      
      // Replace original with rotated version
      const fs = await import('fs');
      await fs.promises.unlink(path);
      await fs.promises.rename(path + '.rotated.jpg', path);
      
      console.log(`✓ Rotated ${img}`);
    } catch (err) {
      console.error(`✗ Failed to rotate ${img}:`, err.message);
    }
  }
}

rotateImages().then(() => console.log('Done!')).catch(console.error);
