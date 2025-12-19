import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const PUBLIC = path.resolve(process.cwd(), "public");
const OUT_DIR = path.join(PUBLIC, "optimized");
const widths = [480, 768, 1200, 2048];
const quality = 78;
const includeDirs = [
  "hero",
  "about",
  "activities",
  "cards",
  "events",
  "team",
  "store/products",
  "store/icons",
];

async function walk(dir) {
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of list) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      results = results.concat(await walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function isImage(file) {
  return /\.(jpe?g|png|avif|webp)$/i.test(file);
}

async function ensureDir(d) {
  await fs.mkdir(d, { recursive: true }).catch(() => {});
}

async function processFile(file) {
  const rel = path.relative(PUBLIC, file).replaceAll("\\\\", "/");
  // only process files inside includeDirs
  if (!includeDirs.some((d) => rel.startsWith(d))) return null;
  if (!isImage(file)) return null;

  const ext = path.extname(file);
  const name = path.basename(file, ext);
  const dir = path.dirname(rel);
  const outDir = path.join(OUT_DIR, dir);
  await ensureDir(outDir);

  const variants = [];
  const metadata = await sharp(file).metadata();
  for (const w of widths) {
    if (metadata.width && metadata.width < w) continue;
    const outName = `${name}-${w}.webp`;
    const outPath = path.join(outDir, outName);
    await sharp(file)
      .resize({ width: w })
      .webp({ quality })
      .toFile(outPath)
      .catch((err) => {
        console.error("Error processing", file, err.message);
      });
    variants.push(`/optimized/${dir}/${outName}`.replaceAll("\\\\", "/"));
  }

  // also create a reasonably sized fallback jpeg (1200) if original wasn't webp
  if (!rel.endsWith(".webp")) {
    const fallbackName = `${name}-1200.jpg`;
    const outPath = path.join(outDir, fallbackName);
    await sharp(file)
      .resize({ width: Math.min(metadata.width || 1200, 1200) })
      .jpeg({ quality })
      .toFile(outPath)
      .catch(() => {});
    variants.push(`/optimized/${dir}/${fallbackName}`);
  }

  return { original: `/${rel}`, variants };
}

async function main() {
  console.log("Scanning public/ for images...");
  const allFiles = await walk(PUBLIC);
  const results = {};
  for (const f of allFiles) {
    const p = await processFile(f);
    if (p) results[p.original] = p.variants;
  }

  await ensureDir(OUT_DIR);
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(results, null, 2), "utf8");
  console.log(`Wrote manifest to ${manifestPath}`);
  console.log("Done. Optimized images created under /public/optimized/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
