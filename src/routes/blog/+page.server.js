// src/routes/blog/+page.server.js

import { getLocaleWithFallback } from '$lib/utils/url.js';

const rawPosts = import.meta.glob('/src/lib/posts/**/*.md', { eager: true });

export async function load({ locals, url }) {
  // Get locale using safe utility function that works during prerendering
  const currentLocale = getLocaleWithFallback(locals, url, 'en');

  console.log('Blog page loading with locale:', currentLocale);

  const posts = Object.entries(rawPosts)
    .map(([path, post]) => {
      const parts = path.split('/');
      const filename = parts.pop();
      const langDir = parts.pop();

      const slug = filename.replace('.md', '');

      return {
        meta: post.metadata,
        slug: slug,
        lang: langDir,
        path: path // Keep the full path for debugging
      };
    })
    .filter(post => {
      const matches = post.lang === currentLocale;
      console.log(`Post ${post.slug} (${post.lang}) matches locale ${currentLocale}:`, matches);
      return matches;
    })
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));

  console.log('Filtered posts:', posts);

  return {
    posts: posts,
    currentLocale: currentLocale
  };
}
