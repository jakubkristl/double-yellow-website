Image optimization script

This project includes a small Node script that generates responsive WebP and JPEG variants from selected images under `public/` and writes a manifest.

How it works

- Script: `tools/optimize-images.mjs`
- Output folder: `public/optimized/`
- Manifest: `public/optimized/manifest.json` maps original image paths (e.g. `/about/after1.jpg`) to an array of generated optimized URLs.
- Widths generated: `480`, `768`, `1200`, `2048` (skips widths larger than the source image).
- Quality: configurable in the script (default 78).

Usage

1. Install dependencies (already added `sharp` as a devDependency):

```bash
npm install
```

2. Run the optimizer:

```bash
node tools/optimize-images.mjs
```

3. The script will create `/public/optimized/...` and a `manifest.json` which you can use to populate `srcset` or a `<picture>` element in your components.

Notes

- The script limits which directories it scans via the `includeDirs` array inside the script. Update it to include more folders if needed.
- Generated files are committed if you want them in source control; otherwise run the script during your build pipeline.
