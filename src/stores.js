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

import { writable, derived } from 'svelte/store';
import { storageFactory } from "./storageFactory.mjs";

const localStore = storageFactory(() => localStorage);
const sessionStore = storageFactory(() => sessionStorage);

const createWritableStore = (key, startValue) => {
  const { subscribe, set, update } = writable(startValue);
  return {
    subscribe,
    set,
    update,
    useLocalStorage: () => {
      const json = localStore.getItem(key);
      if (json !== 'undefined') {
        set(JSON.parse(json));
      }
      subscribe(current => {
        localStore.setItem(key, JSON.stringify(current));
      });
    },
    useSessionStorage: () => {
      const json = sessionStore.getItem(key);
      if (json !== 'undefined') {
        set(JSON.parse(json));
      }
      subscribe(current => {
        sessionStore.setItem(key, JSON.stringify(current));
      });
    }
  };
}

// Combined store with both properties
export const translationStore = createWritableStore('translation', {
  lang: 'es-MX',
  parsedTranslations: []
});

// Derived stores for easy access to individual properties
export const lang = derived(
  translationStore,
  $translation => $translation.lang
);

export const parsedTranslations = derived(
  translationStore,
  $translation => $translation.parsedTranslations
);

// Helper functions to update individual properties
export const setLang = (newLang) => {
  translationStore.update(current => ({
    ...current,
    lang: newLang
  }));
};

export const setParsedTranslations = (newTranslations) => {
  translationStore.update(current => ({
    ...current,
    parsedTranslations: newTranslations
  }));
};

// Helper function to add translations for a specific language
export const addTranslationForLanguage = (lang, translations) => {
  translationStore.update(current => ({
    ...current,
    parsedTranslations: {
      ...current.parsedTranslations,
      [lang]: translations
    }
  }));
};

// Helper function to set multiple translations at once
export const setAllTranslations = (translationsObject) => {
  translationStore.update(current => ({
    ...current,
    parsedTranslations: translationsObject
  }));
};

// Helper function to update both language and translations at once
export const setTranslation = (lang, parsedTranslations) => {
  translationStore.set({ lang, parsedTranslations });
};