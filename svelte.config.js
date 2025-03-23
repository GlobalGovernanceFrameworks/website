import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  
  kit: {
    // No base path, static adapter will handle it
    adapter: adapter({
      // Use GitHub Pages
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false
    }),
    
    // Add this for proper routing with GitHub Pages
    paths: {
      base: '',
      relative: false
    }
  }
};

export default config;
