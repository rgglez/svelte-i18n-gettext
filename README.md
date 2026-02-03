# svelte-i18n-gettext

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
![GitHub all releases](https://img.shields.io/github/downloads/rgglez/svelte-i18n-gettext/total)
![GitHub issues](https://img.shields.io/github/issues/rgglez/svelte-i18n-gettext)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/rgglez/svelte-i18n-gettext)
![GitHub stars](https://img.shields.io/github/stars/rgglez/svelte-i18n-gettext?style=social)
![GitHub forks](https://img.shields.io/github/forks/rgglez/svelte-i18n-gettext?style=social)

This is a [Svelte](https://svelte.dev/) component based on [derived stores](https://learn.svelte.dev/tutorial/derived-stores) which implements [gettext](https://www.gnu.org/software/gettext/) based translation (i18n) of strings.

Version 2 is an improvement to make the code more encapsulated and modular.

## Usage

* Install the package (published [here](https://www.npmjs.com/package/svelte-i18n-gettext)).

```bash
npm install svelte-i18n-gettext
```

### Version 2.x

* Include the stores:

  ```javascript
  import { _ } from 'svelte-i18n-gettext';
  import { setLang, addTranslationForLanguage } from 'svelte-i18n-gettext/src/stores';
  ```

* Use `setLang` to set the language:

  ```javascript
  setLang('es-MX')
  ```

* Include the translation files (see the examples directory for samples) and assign them to the store:

  ```javascript
  import msg_de_DE from '$lib/i18n/de-DE/messages.json';
  import msg_en_US from '$lib/i18n/en-US/messages.json';
  import msg_es_MX from '$lib/i18n/es-MX/messages.json';
  import msg_fr_FR from '$lib/i18n/fr-FR/messages.json';

  addTranslationForLanguage('fr-FR', msg_fr_FR);
  addTranslationForLanguage('de-DE', msg_de_DE);
  addTranslationForLanguage('es-MX', msg_es_MX);
  addTranslationForLanguage('en-US', msg_en_US);
  ```

### Version 1.x

* You still can use the **version 1.x** way, even if it is deprecated:

  ```javascript
  import { _, _n } from 'svelte-i18n-gettext/src/index.svelte';
  import { parsedTranslations, lang } from 'svelte-i18n-gettext/src/store.js';
  ```

* Use the `lang` (or a local alias) store to specify the language to use:

  ```javascript
  $lang = 'es-MX';
  ```

* Optionally, get the browser's language:

  ```javascript
  $lang = detectBrowserLanguage();
  ```

  Or any other method, such as loading user's preferences.

* Include the translation files (see the examples directory for samples) and assign them to the store:

  ```javascript
  import msg_de_DE from '$lib/i18n/messages-de.json';
  $parsedTranslations['de-DE'] = msg_de_DE;

  import msg_en_US from '$lib/i18n/messages-en.json';
  $parsedTranslations['en-US'] = msg_en_US;

  import msg_es_MX from '$lib/i18n/messages-es.json';
  $parsedTranslations['es-MX'] = msg_es_MX;
  ```

  (Adjust your paths according to your project's structure)

### General usage (v2 or v1)

* In your Svelte code, for singular form you can use the `$_` derived store:

  ```javascript
  <script>
    // in order to use strings with parameters, you need to include this library:
    import { sprintf } from 'sprintf-js';
  </script>
  <div>
      {@html sprintf($_('Welcome, <b>%s</b>'), $user.profile.name)}
      <br />
      {$_("Good bye.")}
  </div>
  ```

* In your Svelte code, for plural forms you can use the `$_n` derived store:

  ```javascript
  <div>
      <!-- n contains the number of deleted files -->
      {@html sprintf($_n('One file deleted', '%s files deleted', n))}
  </div>
  ```

These stores have the following signatures:

```javascript
_(msgid, msgctx)
_n(msgid, msgidPlurals, count, msgctx)
```

For both derived stores there is a parameter `msgctx` which can be used to specify the [context](https://www.gnu.org/software/gettext/manual/html_node/Contexts.html) of the translation.

## Extraction

```

### xgettext

You can use [```xgettext```](https://www.gnu.org/software/gettext/manual/html_node/xgettext-Invocation.html) directly:

```bash
xgettext -f files.txt -o messages.pot -L JavaScript --from-code="utf-8" --no-wrap --keyword=$_
```

## Merging

If you already have previous `po` files, you can use a command like this to merge the strings:

```bash
msgmerge -U your_old_translation.po latest_strings.pot
```

## Translation files

**svelte-i18n-gettext** uses standard gettext .po files, which must be manually converted into the JSON as produced by [gettext-parser](https://github.com/smhg/gettext-parser) using the `po2json.pl` Perl script, which can be found [here](https://www.github.com/rgglez/gettext-po2json). Any other tool which produces the same format should be useful.


## Dependencies

**svelte-i18n-gettext** depends on the follownig node packages:

* **[@postalsys/gettext](https://www.npmjs.com/package/@postalsys/gettext)**
* **[sprintf-js](https://www.npmjs.com/package/sprintf-js)** (if you need to include variables in some `msgid`)
* **[gettext-parser](https://www.npmjs.com/package/gettext-parser)**
* **[detect-browser-language](https://www.npmjs.com/package/detect-browser-language)** (optional)

## Live example

You can try this software live [here](https://codesandbox.io/p/sandbox/nifty-chihiro-vn854x).

There is also a local example project in the [example](example/) directory.

## Notes

* Of course, you can modify the way of getting the "current language", for instance, you could get it from the user's profile store, or from a cookie, and so on. Be careful, because sometimes the language specification comes with just 2 letters (i.e. "fr") or with other local variation (i.e. "es-AR" instead of "es-MX"). You must make the necesary adjusments in these cases.
* To edit gettext .po files you can use [poEdit](https://poedit.net/) or [some other editor](https://alternativeto.net/software/poedit/).
* I've included directories with sample .po and .json files, so, in case you're not familiar with gettext, you can have an idea of the format. Anyway, in that case I would suggest you to read the docs.
* Why gettext?
  * First and most relevant reason: it uses the full strings in the original language as key, so I don't have to be searching for weird keys such as "page.title.hello" or "item.specification". If one translation doesn't exist, the original key string is used.
  * It's a GNU standard, tried and trusted.
* Remember that gettext assumes that the language of the program is English by convention. But you can use any languaje.
* Improvements and fixes are welcome.

 ## License

Copyright (c) 2026-2026 Rodolfo González González.

Licensed under [BSD-3-Clause](https://opensource.org/license/bsd-3-clause) license. Read the [LICENSE](https://raw.githubusercontent.com/rgglez/svelte-i18n-gettext/main/LICENSE) file.
