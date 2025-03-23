import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  
  kit: {
    adapter: adapter({
      fallback: '200.html' // Use 200.html instead of index.html
    }),
    paths: {
      base: ''
    }
  }
};

export default config;
