<script>
    import { _ } from 'svelte-i18n-gettext';
    import { sprintf } from 'sprintf-js';
    import { parsedTranslations, lang } from 'svelte-i18n-gettext/src/stores';
    import * as Icon from 'svelte-flag-icons';
    import Gettext from 'node-gettext';
    import { onMount } from 'svelte';
    
    import msg_de_DE from '$lib/i18n/de-DE/messages.json';
    import msg_en_US from '$lib/i18n/en-US/messages.json';
    import msg_es_MX from '$lib/i18n/es-MX/messages.json';
    import msg_fr_FR from '$lib/i18n/fr-FR/messages.json';
    
    $parsedTranslations['de-DE'] = msg_de_DE;
    $parsedTranslations['en-US'] = msg_en_US;
    $parsedTranslations['es-MX'] = msg_es_MX;
    $parsedTranslations['fr-FR'] = msg_fr_FR;
    
    const name = "Roger Rabbit";
    const prize = 1000;
</script>

<h1>svelte-i18n-gettext</h1>

<p>
    {$_('This is an example of a static string')}
</p>
<p>
    {sprintf($_('Hello %s, you won $%s'), name, prize)}
</p>

<button on:click="{() => $lang = 'de-DE'}">
    <Icon.De size="16" /> Deutsch
</button>
<button on:click="{() => $lang = 'en-US'}">
    <Icon.Us size="16" /> English
</button>
<button on:click="{() => $lang = 'es-MX'}">
    <Icon.Mx size="16" /> Español
</button>
<button on:click="{() => $lang = 'fr-FR'}">
    <Icon.Fr size="16" /> Français
</button>
<hr />
<div>
    <a href="https://github.com/rgglez/svelte-i18n-gettext">https://github.com/rgglez/svelte-i18n-gettext</a>
</div>

