// src/routes/blog/[slug]/+page.server.js

import { error } from '@sveltejs/kit';
import { getLocaleWithFallback, safeGetCurrentUrl } from '$lib/utils/url.js';

export async function load({ params, url, locals }) {
  // Get locale using safe utility function
  const currentLocale = getLocaleWithFallback(locals, url, 'en');

  console.log('Loading blog post with locale:', currentLocale, 'slug:', params.slug);

  try {
    // Dynamically import the specific Markdown file based on the locale and slug
    const postModule = await import(`../../../lib/posts/${currentLocale}/${params.slug}.md`);

    // Safely get the current URL
    const currentUrl = safeGetCurrentUrl(url, params, currentLocale, '/blog');

    return {
      post: {
        meta: postModule.metadata,
        slug: params.slug,
        locale: currentLocale
      },
      currentUrl: currentUrl,
      currentLocale: currentLocale
    };
  } catch (e) {
    console.error('Error loading post:', e);
    console.error('Attempted path:', `../../../lib/posts/${currentLocale}/${params.slug}.md`);
    throw error(404, `Post not found or not available in ${currentLocale}`);
  }
}
