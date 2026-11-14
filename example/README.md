# SvelteKit example

This app demonstrates `@rgglez/svelte-i18n-gettext` 3.x with four gettext
catalogs. It installs the package from the parent directory and imports
`sprintf` from the shared `@rgglez/i18n-gettext` core.

```bash
cd example
npm install
npm run dev
```

## Open locally

The production build uses the `/svelte-i18n-gettext` base path, the same one
GitHub Pages uses; `svelte.config.js` drops it only for `vite dev`:

| Command | URL |
| :------ | :-- |
| `npm run dev` | <http://localhost:5173/> |
| `npm run build && npm run preview` | <http://localhost:4173/svelte-i18n-gettext/> |

In preview, `http://localhost:4173/` without the path returns 404.

## What it shows

Use the language buttons to switch translations without reloading the page.
The `.po` files and their gettext-parser JSON catalogs are in `src/lib/i18n/`.
