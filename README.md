# svelte-i18n-gettext

[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
![GitHub all releases](https://img.shields.io/github/downloads/rgglez/svelte-i18n-gettext/total) 
![GitHub issues](https://img.shields.io/github/issues/rgglez/svelte-i18n-gettext) 
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/rgglez/svelte-i18n-gettext)

This is a [Svelte](https://svelte.dev/) component based on [derived stores](https://learn.svelte.dev/tutorial/derived-stores) which implements [gettext](https://www.gnu.org/software/gettext/) based translation (i18n) of strings.

## Usage

* Install package (published [here](https://www.npmjs.com/package/svelte-i18n-gettext)).

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
<div>
    {@html $_(`Welcome, <b>${$user.profile.name}</b>`)}
    <br />
    {$_("Good bye.")}
</div>
```

* In your Svelte code, for plural forms you can use the `$_n` derived store:

```javascript
<div>
    <!-- n contains the number of deleted files -->
    {@html $_n(`One file deleted`, `${n} files deleted`, n)}
</div>
```

This stores have the following signatures:

```javascript
_(msgid, msgctx)
_n(msgid, msgidPlurals, count, msgctx)
```

For both derived stores there is a parameter `msgctx` which can be used to specify the [context](https://www.gnu.org/software/gettext/manual/html_node/Contexts.html) of the translation.

## Translation files

svelte-i18n-gettext uses standard gettext .po files, which must be manually translated into JSON using the `po2json.cjs` Node.js script, which is included in the *bin/* directory. This script is has the following parameters:

* Use `-i, --input <input>` to specify the input PO file.
* Use `-o, --output <output>` to specify the output JSON file.
* Use `-v, --verbose` to show verbose execution messages.

Example usage:

```bash
node po2json.cjs -i example.po -o example.json -v
```

## Dependencies

svelte-i18n-gettext depends on the follownig node packages:

* **[node-gettext](https://www.npmjs.com/package/node-gettext)**
* **[gettext-parser](https://www.npmjs.com/package/gettext-parser)**
* **[detect-browser-language](https://www.npmjs.com/package/detect-browser-language)** (optional)

## Live example

You can try this software live [here](https://svelte.dev/repl/af093a25e8db40f5b77f9483ccf3919a?version=3.57.0) 

## Notes

* Of course, you can modify the way of getting the "current language", for instance, you could get it from the user's profile store, or from a cookie, and so on. Be careful, because sometimes the language specification comes with just 2 letters (i.e. "fr") or with other local variation (i.e. "es-AR" instead of "es-MX"). You must make the necesary adjusments in these cases.
* To edit gettext .po files you can use [poEdit](https://poedit.net/) or [some other editor](https://alternativeto.net/software/poedit/).
* I've included directories with sample .po and .json files, so, in case you're not familiar with gettext, you can have an idea of the format.
* Why gettext? 
  * First and most relevant reason: it uses the full strings in the original language as key, so I don't have to be searching for weird keys such as "page.title.hello" or "item.specification". If one translation doesn't exist, the original key string is used.
  * It's a GNU standard, tried and trusted.
* Remember that gettext assumes that the language of the program is English by convention.
* Any improvement or fix is welcomed.

 ## License
 
 Copyright (c) 2023 Rodolfo González González.
 
 BSD-3-Clause. Read the LICENSE file.
