# website

Source of the Engineering Mathematics site. SvelteKit, static output.

```bash
npm install
npm run dev        # http://localhost:5173
npm run check && npm run build
```

Package data lives in `src/lib/data/packages.ts` and mirrors each repo's README. Update it when a package's API or guarantees change.

Deploy: Cloudflare Workers Builds, build command `npm run build`, deploy command `npx wrangler deploy`.
`wrangler.jsonc` uploads `build/` as static assets.

## Repositories

Production is the private `engg-math-website` repository; Cloudflare deploys from it. `.github/workflows/mirror.yml`
pushes its `main` to the public `website` repository (fast-forward only). Contributions are merged in the public
repository, then brought into production:

```bash
git fetch origin && git merge --ff-only origin/main && git push production main
```

Apache-2.0.
