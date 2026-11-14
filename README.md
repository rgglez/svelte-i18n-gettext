# svelte-i18n-gettext

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[gettext](https://www.gnu.org/software/gettext/) translations for
[Svelte](https://svelte.dev/) with reactive stores and live language switching.
Version 3 uses [@rgglez/i18n-gettext](https://github.com/rgglez/i18n-gettext)
as its translation core, shared with
[react-i18n-gettext](https://github.com/rgglez/react-i18n-gettext) and
[astro-i18n-gettext](https://github.com/rgglez/astro-i18n-gettext). The same
gettext-parser JSON catalogs work in all three packages.

## Install

```bash
npm install @rgglez/svelte-i18n-gettext
```

Install the core explicitly if you use its `sprintf` helper:

```bash
npm install @rgglez/i18n-gettext
```

## Usage

Import the translation stores and register your catalogs. The store starts in
`es-MX`; call `setLang` to choose another language.

```svelte
<script>
  import { _, _n } from '@rgglez/svelte-i18n-gettext';
  import { addTranslationForLanguage, setLang } from '@rgglez/svelte-i18n-gettext/src/stores';
  import { sprintf } from '@rgglez/i18n-gettext';
  import de from './i18n/de-DE/messages.json';
  import es from './i18n/es-MX/messages.json';

  addTranslationForLanguage('de-DE', de);
  addTranslationForLanguage('es-MX', es);

  let name = 'Roger Rabbit';
  let count = 2;
</script>

<p>{$_('Welcome')}</p>
<p>{sprintf($_('Hello %s'), name)}</p>
<p>{sprintf($_n('One file deleted', '%d files deleted', count), count)}</p>
<button onclick={() => setLang('de-DE')}>Deutsch</button>
<button onclick={() => setLang('es-MX')}>Español</button>
```

`_` and `_n` are Svelte stores whose values are translation functions, so use
`$_(...)` and `$_n(...)` in components. Calling `setLang` updates their
subscribers. You can also use `setAllTranslations({ 'de-DE': de, 'es-MX': es })`
to register all catalogs at once.

## API

| Export | Description |
| :----- | :---------- |
| `_`, `_n` | Derived stores containing the translation functions |
| `translations` | Derived store with `_, _n, getCurrentLang, hasTranslations, getRaw, debug` |
| `translationStore` | Writable store containing `lang` and `parsedTranslations` |
| `lang`, `parsedTranslations` | Derived stores for the current language and catalogs |
| `setLang(lang)` | Change the current language |
| `addTranslationForLanguage(lang, catalog)` | Add or replace one catalog |
| `setAllTranslations(catalogs)`, `setParsedTranslations(catalogs)` | Replace all catalogs |
| `setTranslation(lang, catalogs)` | Set the language and catalogs together |

The translation stores are exported from the package root; the language and
catalog stores and helpers are exported from `@rgglez/svelte-i18n-gettext/src/stores`.
The translation functions have these signatures:

```js
_(msgid, msgctxt = 'app')
_n(msgid, msgidPlural = '', count = 0, msgctxt = 'app')
```

Catalog lookup tries the exact locale first, then a catalog with the same
primary language (`es` ↔ `es-MX`). Missing entries return the original msgid
or plural msgid. `sprintf` and `vsprintf` are exported by the core for
substituting values after translation.

## Catalogs

Write translations in gettext `.po` files and convert them to the
gettext-parser JSON format with
[gettext-po2json](https://github.com/rgglez/gettext-po2json). Use the `app`
context for strings without an explicit context:

```bash
perl po2json.pl --po es-MX.po --json es-MX/messages.json --context app
```

The [example](example/) includes `.po` and JSON catalogs and a SvelteKit app.

## Live demo

The component can be viewed live [here](https://rgglez.github.io/svelte-i18n-gettext/).

You can run it locally from the `example` directory.

## Migrating from 1.x or 2.x

Version 3 is published as `@rgglez/svelte-i18n-gettext`; versions 1.x and 2.x
were published as `svelte-i18n-gettext`. Replace the package name in
`package.json` and **every** import. The store helpers and translation
function signatures remain available, including deep imports under `src/`.
Do not mix the old and new package names: each copy has its own language store.

## License

Copyright (c) 2026 Rodolfo González González.

Licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
license. Read the [LICENSE](LICENSE) file.
