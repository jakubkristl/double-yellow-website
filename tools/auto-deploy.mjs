/**
 * Auto-deploy watcher: DISABLED FOR SAFETY.
 *
 * Automatic commits and pushes directly to GitHub trigger automated production
 * deployments to Cloudflare Workers via GitHub Actions.
 *
 * Pushing on every file save bypasses local testing and code verification,
 * creating an operational risk of deploying incomplete or broken code.
 *
 * Changes should always be reviewed and tested locally (using `npm run dev` and
 * `npm run type-check`) before committing and deploying.
 */

console.warn(
  "[auto-deploy] This script is disabled for production safety.\n" +
  "Pushing directly to 'main' triggers automated Cloudflare deployments.\n" +
  "Please commit and test your changes using standard git workflows."
);
process.exit(0);
