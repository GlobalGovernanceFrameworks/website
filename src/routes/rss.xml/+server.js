// src/routes/rss.xml/+server.js
import { getLocaleWithFallback } from '$lib/utils/url.js';

const rawPosts = import.meta.glob('/src/lib/posts/**/*.md', { eager: true });

export async function GET({ url, locals }) {
  const currentLocale = getLocaleWithFallback(locals, url, 'en');
  
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
      };
    })
    .filter(post => post.lang === currentLocale)
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
    .slice(0, 10); // Latest 10 posts

  const siteUrl = 'https://www.globalgovernanceframework.org';
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Global Governance Framework Blog</title>
    <description>Latest insights on global governance and planetary citizenship</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>${currentLocale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.meta.title}]]></title>
      <description><![CDATA[${post.meta.description}]]></description>
      <link>${siteUrl}/blog/${post.slug}?lang=${currentLocale}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}?lang=${currentLocale}</guid>
      <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
      <author>${post.meta.author}</author>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'max-age=3600'
    }
  });
}
