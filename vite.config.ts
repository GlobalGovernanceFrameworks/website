// vite.config.js or vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    assetsInclude: ['service-worker.js'] // Ensure service-worker.js is copied to output
  }
  server: {
    fs: {
      // Allow serving files from one level up the project root
      allow: ['..'],
    },
  },
});
