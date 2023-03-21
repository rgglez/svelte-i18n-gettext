# svelte-i18n-gettext

[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
![GitHub all releases](https://img.shields.io/github/downloads/rgglez/svelte-i18n-gettext/total) 
![GitHub issues](https://img.shields.io/github/issues/rgglez/svelte-i18n-gettext) 
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/rgglez/svelte-i18n-gettext)

This is a [Svelte](https://svelte.dev/) [derived store](https://learn.svelte.dev/tutorial/derived-stores) which implements translation (i18n) of text messages.

## Usage

* Install the dependencies (see below).
* Include the store (adjusting your paths):

```javascript
<script>
import { _ } from '$lib/i18n/index.svelte';
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

svelte-i18n-gettext uses standard [gettext](https://www.gnu.org/software/gettext/) .po files, which are translated into json using the *po2json.cjs* Node.js script. This script is has these parameters:

* *-i, --input <input>* the input PO file.
* *-o, --output <output>* the output JSON file.
* *-v, --verbose* verbose execution messages.

For example:

```
node -i example.po -i example.json -v
```

## Dependencies

It depends on the follownig node packages:

* **[node-gettext](https://www.npmjs.com/package/node-gettext)**
* **[gettext-parser](https://www.npmjs.com/package/gettext-parser)**
* **[detect-browser-language](https://www.npmjs.com/package/detect-browser-language)**

## Notes

* My PO editor of choice is [poEdit](https://poedit.net/).
* I've included directories with sample .po and .json files, so, in case you're not familiar with gettext, you can have an idea.
* Why gettext? 
  ** Well, first and the most relevant for me: it uses the full strings in the original language as key, so I don't have to be searching for weird keys such as "title_page_hello" or "item.specification".
  ** It's a GNU standard, tried and trusted.
  
 ## TODO
 
 * Plurals!! 
 
 # License
 
 Copyright (c) 2023, Rodolfo González González.
 
 See the LICENSE file.
