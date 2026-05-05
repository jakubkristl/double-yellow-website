/**
 * Auto-deploy watcher: commits and pushes to GitHub on every file change.
 * Debounces 3 seconds so rapid saves are batched into one commit.
 * Run: node tools/auto-deploy.mjs
 */

import { watch } from "fs";
import { execSync } from "child_process";
import { resolve, relative } from "path";

const ROOT = resolve(decodeURIComponent(new URL(".", import.meta.url).pathname).replace(/^\/([A-Z]:)/, "$1"), "..");

const IGNORE = [
  ".git",
  ".next",
  "node_modules",
  ".vercel",
  "tsconfig.tsbuildinfo",
  "tools/auto-deploy.mjs",
];

function shouldIgnore(path) {
  return IGNORE.some((ig) => path.includes(ig));
}

let timer = null;

function deploy() {
  try {
    const status = execSync("git status --porcelain", { cwd: ROOT }).toString().trim();
    if (!status) {
      console.log("[auto-deploy] No changes to commit.");
      return;
    }
    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
    execSync("git add -A", { cwd: ROOT, stdio: "inherit" });
    execSync(`git commit -m "auto: ${timestamp}"`, { cwd: ROOT, stdio: "inherit" });
    execSync("git push origin main", { cwd: ROOT, stdio: "inherit" });
    console.log(`[auto-deploy] Pushed at ${timestamp}`);
  } catch (e) {
    console.error("[auto-deploy] Error:", e.message);
  }
}

function onChange(event, filename) {
  if (!filename || shouldIgnore(filename)) return;
  const rel = relative(ROOT, resolve(ROOT, filename));
  console.log(`[auto-deploy] Change detected: ${rel}`);
  clearTimeout(timer);
  timer = setTimeout(deploy, 3000);
}

watch(ROOT, { recursive: true }, onChange);
console.log("[auto-deploy] Watching for changes. Every save will be committed and pushed.");
console.log("[auto-deploy] Press Ctrl+C to stop.");
