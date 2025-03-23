import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';
// Make sure this matches your GitHub repo name exactly
const base = dev ? '' : '/governance-framework-site';

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
  preprocess: vitePreprocess()
};

export default config;
