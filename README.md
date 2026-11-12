# website

Source of the Engineering Mathematics site. SvelteKit, static output.

```bash
npm install
npm run dev        # http://localhost:5173
npm run check && npm run build
```

Package data lives in `src/lib/data/packages.ts` and mirrors each repo's README. Update it when a package's API or guarantees change.

Deploy: `npm run build` writes `build/`. Cloudflare Pages: build command `npm run build`, output directory `build`.

Apache-2.0.
