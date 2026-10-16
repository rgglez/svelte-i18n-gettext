<script context="module">
/*
BSD 3-Clause License

Copyright (c) 2023, Rodolfo González González

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
    contributors may be used to endorse or promote products derived from
    this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import { derived } from 'svelte/store';
import { translationStore } from './stores';
import { createTranslator } from '@rgglez/i18n-gettext';

// Single derived store for translation functions
export const translations = derived(
  translationStore,
  ($translation) => {
    const { lang, parsedTranslations } = $translation;

    // The core owns the gettext backend; this store only tracks the language
    const translator = createTranslator(lang, parsedTranslations);

    return {
      // Simple translation function
      _: (msgid, msgctxt = "app") => {
        return translator._(msgid, msgctxt);
      },

      // Plural translation function
      _n: (msgid, msgidPlural = "", count = 0, msgctxt = "app") => {
        return translator._n(msgid, msgidPlural, count, msgctxt);
      },

      // Additional utility functions
      getCurrentLang: () => lang,
      hasTranslations: () => !!(parsedTranslations[lang]),

      // Function to get raw translation without context
      getRaw: (msgid, msgctxt = "app") => {
        const translations = parsedTranslations[lang];
        return translations?.translations?.[msgctxt]?.[msgid]?.msgstr?.[0] || msgid;
      },

      // Debug function to inspect current translations
      debug: () => {
        console.log('Current language:', lang);
        console.log('Available translations:', parsedTranslations[lang]);
        console.log('Translator:', translator);
      }
    };
  }
);

// Export individual functions for backward compatibility
export const _ = derived(translations, ($translations) => $translations._);
export const _n = derived(translations, ($translations) => $translations._n);
</script>