import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    // Don't use a base path at all - we'll handle it with hash-based routing
    paths: {
      base: ''
    }
  },
  preprocess: vitePreprocess()
};

export default config;
