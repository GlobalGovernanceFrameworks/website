import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html', // Change this from 'index.html' to '404.html'
      precompress: false
    }),
    // Add this paths configuration
    paths: {
      base: '', // Empty string for relative paths
      relative: true // Use relative paths
    }
  }
};

export default config;
