# svelte-i18n-gettext

[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
![GitHub all releases](https://img.shields.io/github/downloads/rgglez/svelte-i18n-gettext/total) 
![GitHub issues](https://img.shields.io/github/issues/rgglez/svelte-i18n-gettext) 
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/rgglez/svelte-i18n-gettext)

This is a [Svelte](https://svelte.dev/) [derived store](https://learn.svelte.dev/tutorial/derived-stores) which implements [gettext](https://www.gnu.org/software/gettext/) based translation (i18n) of strings.

## Usage

You can try this software live [here](https://svelte.dev/repl/af093a25e8db40f5b77f9483ccf3919a?version=3.57.0) (the code at REPL has some modifications in order to run there).

* Install the dependencies (see below).
* Include the stores (adjusting your paths):

```javascript
<script>

import { _ } from '$lib/i18n/index.svelte';
import { parsedTranslations, lang } from '$lib/i18n/store.js';

// ...
```

* Include the translation files:

```javascript
// ...

import msg_de_DE from '$lib/i18n/messages-de.json';
$parsedTranslations['de-DE'] = msg_de_DE;

import msg_en_US from '$lib/i18n/messages-en.json';
$parsedTranslations['en-US'] = msg_en_US;

import msg_es_MX from '$lib/i18n/messages-es.json';
$parsedTranslations['es-MX'] = msg_es_MX;	

// ...
```

* Optionally, get the browser's language:

```javascript
// ...

$lang = detectBrowserLanguage();	

// ...
</script>
```

* In your HTML code:

```javascript
<div>
    {@html $_(`Welcome, <b>${$user.profile.name}</b>`)}
    <br />
    {$_("Good bye.")}
</div>
```

## Translation files

svelte-i18n-gettext uses standard gettext .po files, which must be manually translated into JSON using the *po2json.cjs* Node.js script, which is included in the *bin/* directory. This script is has the following parameters:

* *-i, --input <input>* the input PO file.
* *-o, --output <output>* the output JSON file.
* *-v, --verbose* verbose execution messages.

For example:

```bash
node po2json.cjs -i example.po -o example.json -v
```

## Dependencies

svelte-i18n-gettext depends on the follownig node packages:

* **[node-gettext](https://www.npmjs.com/package/node-gettext)**
* **[gettext-parser](https://www.npmjs.com/package/gettext-parser)**
* **[detect-browser-language](https://www.npmjs.com/package/detect-browser-language)** (optional)

## Notes

* Of course, you can modify the way of getting the "current language", for instance, you could get it from the user's profile store, or from a cookie, and so on. Be careful, because sometimes the language specification comes with just 2 letters (i.e. "fr") or with other local variation (i.e. "es-AR" instead of "es-MX"). You must make the necesary adjusments in these cases.
* My PO editor of choice is [poEdit](https://poedit.net/).
* I've included directories with sample .po and .json files, so, in case you're not familiar with gettext, you can have an idea.
* Why gettext? 
  * Well, first and the most relevant for me: it uses the full strings in the original language as key, so I don't have to be searching for weird keys such as "title_page_hello" or "item.specification".
  * It's a GNU standard, tried and trusted.
  
 ## TODO
 
 * Plurals!! 
 * Try it with hundreds or thousands of strings ;)
 
 ## License
 
 Copyright (c) 2023 Rodolfo González González.
 
 Read the LICENSE file.
