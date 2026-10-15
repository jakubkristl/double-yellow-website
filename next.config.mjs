import { dirname } from "path";
import { fileURLToPath } from "url";

const workspaceRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  turbopack: {
    root: workspaceRoot,
  },
  // Bypass Worker IMAGES binding — transforms go through /cdn-cgi/image
  // (OpenNext binding burns CPU/memory on multi-MB carousel assets → CF 1102).
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
