import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter(),
		// GitHub Pages serves the site under /<repo>; dev stays at /.
		paths: { base: process.argv.includes('dev') ? '' : '/svelte-i18n-gettext' }
	}
};

export default config;
