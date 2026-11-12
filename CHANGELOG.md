# Double Yellow Squash Club — Changelog

All notable changes, architectural decisions, and milestones for this project are recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] - 2026-11-12
### Security
- **Admin Moderation Hardening**: Created `lib/admin-auth.ts` to ensure fail-safe authentication for `/admin/learn`. Admin access is strictly denied if `ADMIN_SECRET` is unset or empty, preventing unauthenticated access bypass.
- **Hashed Session Tokens**: Replaced storing plaintext admin passwords in browser cookies with SHA-256 session token verification.
- **Production Deployment Protection**: Neutralized `tools/auto-deploy.mjs` to prevent automatic commits and pushes of untested code directly to the production Cloudflare Workers pipeline.

### Fixed
- **Local Build Stability**: Restricted `@opennextjs/cloudflare` dev initialization in `next.config.mjs` strictly to `NODE_ENV === "development"`, resolving Wrangler file permission crashes during `npm run build`.

### Added
- Comprehensive project documentation:
  - `AGENTS.md`: Operating principles, safety rules, coding conventions, and developer guidelines.
  - `PROJECT_OVERVIEW.md`: High-level non-technical architectural overview and system map.
  - `DEVELOPMENT_GUIDE.md`: Local setup, testing instructions, deployment workflow, and maintenance guides.
  - `CHANGELOG.md`: Project history and change log tracking.
- Formal technical audit identifying security, reliability, and architectural improvement opportunities.

---

## [2026-09-11] - Cloudflare CI & Conversion Tracking Refinements
### Changed
- Refactored Google Ads conversion tracking (`components/BookingSuccessTracker.tsx`) to fire exclusively on valid, confirmed booking IDs with client-side deduplication.
- Updated GitHub Actions CI pipeline (`.github/workflows/optimize-and-build.yml`) to Node.js 22 with project-local Wrangler runner.
- Localized introductory lesson lead capture components for Bulgarian and English routes.

---

## [2026-08-15] - SEO, NAP Consistency & Schema Injections
### Added
- Standardized Name, Address, and Phone (NAP) single source of truth in `lib/business.ts`.
- Structured schema.org JSON-LD injections for `SportsActivityLocation`, `LocalBusiness`, `WebSite`, and `Event`.
- Dynamic XML sitemap generator (`app/sitemap.ts`) with hreflang alternate language support.
- External citation guide in `CITATIONS.md`.

---

## [2026-08-11] - Cloudflare Workers Edge Migration
### Added
- Integrated `@opennextjs/cloudflare` to compile Next.js App Router for Cloudflare Workers.
- Configured edge caching headers for static assets in `public/_headers`.
- Replaced conventional Node.js server hosting with global edge serverless deployment.

---

## [2026-05-28] - Bilingual Architecture (Bulgarian Primary, English Secondary)
### Added
- Re-architected routing to make Bulgarian the primary root experience (`/`) and English accessible via `/en`.
- Extracted English page structures into `app_en/` and established route re-exports in `app/en/`.
- Integrated language-routing middleware with language cookies.

---

## [2026-05-05] - Interactive Coaching Blog & Admin Moderation
### Added
- Interactive reader engagement for squash articles (likes, comments, topic suggestions) backed by Supabase.
- Row Level Security (RLS) policies for anonymous interactions.
- Simple moderation control panel at `/admin/learn` for approving comments.

---

## [2025-12-23] - Automated Image Optimization & Performance Baseline
### Added
- Sharp image optimization script (`tools/optimize-images.mjs`) generating responsive WebP images.
- GitHub Actions workflow for automated Lighthouse performance audits.
