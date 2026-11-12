# Double Yellow Squash Club — Development & Operations Guide

This guide explains how to safely run, develop, test, and maintain the website locally.

---

## 1. Prerequisites
- **Node.js**: Version 20 or 22 (LTS recommended; Node 22 is used in GitHub Actions).
- **Package Manager**: `npm` (version 10+).
- **Git**: Installed and configured with your GitHub credentials.

---

## 2. Environment Configuration
The project uses environment files to store configuration and database keys.

> [!IMPORTANT]
> Never commit actual `.env*` or `.dev.vars*` files to GitHub. They are already listed in `.gitignore`.

### A. Local Next.js Environment (`.env.local`)
Create a `.env.local` file in the root folder based on `.env.local.example`:

```bash
# Public keys (safe to expose to browser)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Secret keys (server-only, never sent to browser)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
ADMIN_SECRET=your-chosen-admin-moderation-password
```

### B. Cloudflare Worker Local Secrets (`.dev.vars`)
When previewing or simulating Cloudflare Workers locally, Wrangler reads variables from `.dev.vars`:

```bash
NEXTJS_ENV=development
```

### C. Cloudflare Production Secrets
For the live production deployment, secrets must be set in the Cloudflare Dashboard or via Wrangler:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SECRET`

---

## 3. Common Development Commands

| Command | What it does | When to use |
|---|---|---|
| `npm install` | Installs project dependencies from `package.json` | First-time setup or after adding packages |
| `npm run dev` | Starts local Next.js dev server at `http://localhost:3000` | Routine development and reviewing visual changes |
| `npm run type-check` | Verifies TypeScript code for typing errors | Before committing changes |
| `npm run optimize-images` | Converts and resizes images in `public/` into `public/optimized/` | After adding new club photos, product images, or banners |
| `npm run build` | Builds the production Next.js application | Testing production build readiness |
| `npm run preview` | Builds and previews the app with Cloudflare Wrangler locally | Testing Cloudflare Worker compatibility locally |

---

## 4. How to Test the Site Safely
To make changes without risking live site disruptions:

1. **Work in an Isolated Git Branch**:
   ```bash
   git checkout -b feature/my-new-update
   ```
2. **Run the Local Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser. Check:
   - Layout responsiveness on mobile view (DevTools).
   - Both Bulgarian (`/`) and English (`/en`) page variations.
   - External links (Booking, WhatsApp, Phone).
3. **Run Verification Checks**:
   ```bash
   npm run type-check
   ```
4. **Never Run `tools/auto-deploy.mjs`**:
   The script in `tools/auto-deploy.mjs` automatically commits and pushes file changes on every save. This can bypass testing and push broken code directly to production.

---

## 5. Deployment Process & Production Releases

### Automated Deployment (GitHub Actions)
Deployments to production are automated via GitHub Actions (`.github/workflows/optimize-and-build.yml`):

1. Any commit pushed to the `main` branch triggers the GitHub workflow.
2. The workflow performs:
   - Dependency installation (`npm ci`)
   - Image optimization (`npm run optimize-images`)
   - Production Next.js build (`npm run build`)
   - OpenNext Cloudflare transformation (`npx opennextjs-cloudflare build`)
   - Production deployment to Cloudflare Workers (`npx wrangler deploy`)
3. The Cloudflare Worker `double-yellow-website` receives the updated assets and begins serving traffic globally.

### Required GitHub Secrets
Under **GitHub Repository Settings → Secrets and variables → Actions**:
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Edit Cloudflare Workers permissions.
- `CLOUDFLARE_ACCOUNT_ID`: Set in workflow (`33546f27f46c46c4c34e343cb34e5404`).

---

## 6. Routine Business Maintenance Tasks

### A. Publishing a New Squash Article (Learn Section)
1. Open `lib/articles.ts` (Bulgarian) and `lib/articles-en.ts` (English).
2. Add a new article object to the array with:
   - `slug`: URL slug (e.g. `how-to-hold-a-squash-racket`)
   - `title`: Article title
   - `excerpt`: 1-2 sentence preview
   - `date`: Publication date (`YYYY-MM-DD`)
   - `readingMinutes`: Reading duration
   - `tags`: Topic tags (e.g. `["начинаещи", "техника"]`)
   - `content`: HTML body of the article
3. Ensure both Bulgarian and English files are updated with corresponding slugs.

### B. Updating Store Products & Prices
1. Open `data/storeItems.ts`.
2. Locate the relevant category (`Rackets`, `Shoes`, `Bags & Backpacks`, `Strings & Grips`, etc.).
3. Add or update items (name, price in EUR, image path).
4. Update `lastUpdated` date in `app/store/page.tsx` and `app_en/store/page.tsx`.

### C. Updating Club Information (NAP / Address / Phone)
1. Open `lib/business.ts`.
2. Edit the single source of truth (`BUSINESS` object).
3. All schema.org structured data, footers, citation lists, and contact sections inherit directly from this file.

### D. Moderating Comments & Article Suggestions
1. Navigate to `https://www.doubleyellowsquash.com/admin/learn`.
2. Enter the admin password configured in `ADMIN_SECRET`.
3. Review pending comments and click **Approve** or **Reject**.
4. Review submitted topic requests and mark them **Noted** or **Done**.
