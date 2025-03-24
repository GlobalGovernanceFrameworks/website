// svelte.config.js
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';
// For custom domain, no base path is needed
const base = dev ? '' : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
    })
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    paths: {
      base: base
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore missing assets during prerendering
        if (path.includes('.png') || 
            path.includes('.svg') || 
            path.includes('manifest.json') || 
            path.includes('/icons/')) {
          console.warn(`Warning: Missing asset during prerendering: ${path}`);
          return;
        }
        throw new Error(message);
      }
    }
  },
};

export default config;
