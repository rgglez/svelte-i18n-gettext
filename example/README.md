# SvelteKit example

This app demonstrates `@rgglez/svelte-i18n-gettext` 3.x with four gettext
catalogs. It installs the package from the parent directory and imports
`sprintf` from the shared `@rgglez/i18n-gettext` core.

```bash
cd example
npm install
npm run dev
```

Use the language buttons to switch translations without reloading the page.
The `.po` files and their gettext-parser JSON catalogs are in `src/lib/i18n/`.

To check a production build, run `npm run build` from this directory.
