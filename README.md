# svelte-i18n-gettext

[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
![GitHub all releases](https://img.shields.io/github/downloads/rgglez/svelte-i18n-gettext/total) 
![GitHub issues](https://img.shields.io/github/issues/rgglez/svelte-i18n-gettext) 
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/rgglez/svelte-i18n-gettext)

This is a [Svelte](https://svelte.dev/) component based on [derived stores](https://learn.svelte.dev/tutorial/derived-stores) which implements [gettext](https://www.gnu.org/software/gettext/) based translation (i18n) of strings.

## Usage

* Install the package (published [here](https://www.npmjs.com/package/svelte-i18n-gettext)).

```bash
npm install svelte-i18n-gettext
```

* Include the stores:

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

Once your program is ready, you can extract the strings with one of many tools available.

For instance, you could use [gettext-extractor](https://github.com/rgglez/gettext-extractor) using the following configuration:

```javascript
const { GettextExtractor, JsExtractors, RegexExtractors } = require('@rgglez/gettext-extractor');

let extractor = new GettextExtractor();

extractor
    .createRegexParser([
        RegexExtractors.addCondition({
            //regex: /\$_\((["'`])([^'"`]+?)\1\)/,
            regex: /\$_\((["'`])((?:\\.|(?!\1).)*?)\1\)/,
            text: 2
        })
    ])
    .parseFilesGlob('./src/**/*.@(js|svelte)');

extractor.savePotFile('./messages.pot');

extractor.printStats();
```

Just running it, for example, in the root of your project:

```bash
node gettext-config.cjs
```

If you already have previous `po` files, you can use a command like this to merge the strings:

```bash
msgmerge -U your_old_translation.po latest_strings.pot
```

## Translation files

**svelte-i18n-gettext** uses standard gettext .po files, which must be manually converted into JSON using the `po2json.cjs` Node.js script, which is included in the ```bin/``` directory. This script is has the following parameters:

* Use `-i, --input <input>` to specify the input PO file.
* Use `-o, --output <output>` to specify the output JSON file.
* Use `-v, --verbose` to show verbose execution messages.

Example usage:

```bash
node po2json.cjs -i example.po -o example.json -v
```

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
 
 Copyright (c) 2023-2025 Rodolfo González González.
 
 BSD-3-Clause. Read the [LICENSE](https://raw.githubusercontent.com/rgglez/svelte-i18n-gettext/main/LICENSE) file.
