// svelte.config.js
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// When using a custom domain, we don't need a base path
const dev = process.env.NODE_ENV === 'development';
const base = dev ? '' : '/governance-framework-site'; // Replace with your actual repository

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
      strict: false
    }),
    paths: {
      base: base
    },
    prerender: {
      entries: [],
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore missing assets during prerendering
        if (path.includes('.png') || 
            path.includes('.svg') || 
            path.includes('manifest.json') || 
            path.includes('/icons/')) {
          console.warn(`Warning: Missing asset during prerendering: ${path}`);
          return;
        }
        
        // For other errors, just warn instead of throwing
        if (message && message.includes('navigator is not defined')) {
          console.warn(`Warning: Navigator not defined error for path: ${path}`);
          return;
        }
        
        throw new Error(message);
      }
    }
  }
};

export default config;
