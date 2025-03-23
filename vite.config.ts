import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  
  // Special configuration to help with GitHub Pages
  server: {
    fs: {
      allow: ['..']
    }
  }
});
