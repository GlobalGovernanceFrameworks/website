// src/lib/utils/url.js

/**
 * Safely get locale from various sources during SSR and prerendering
 */
export function getLocaleWithFallback(locals, url, defaultLocale = 'en') {
  // During prerendering, we can't access searchParams, so we need to be careful
  let locale = defaultLocale;
  
  try {
    // Try to get from URL search params only if not prerendering
    if (url && typeof url.searchParams !== 'undefined') {
      const langParam = url.searchParams.get('lang');
      if (langParam && ['en', 'sv'].includes(langParam)) {
        locale = langParam;
      }
    }
  } catch (e) {
    // During prerendering, searchParams access will fail - that's okay
    console.log('Cannot access searchParams (likely during prerendering), using defaults');
  }
  
  // Try to get from locals (set by hooks if available)
  if (locals && locals.locale && ['en', 'sv'].includes(locals.locale)) {
    locale = locals.locale;
  }
  
  // Try to get from pathname
  if (url && url.pathname) {
    const pathParts = url.pathname.split('/');
    const possibleLang = pathParts.find(part => ['en', 'sv'].includes(part));
    if (possibleLang) {
      locale = possibleLang;
    }
  }
  
  return locale;
}

/**
 * Safely construct current URL for meta tags and sharing
 */
export function safeGetCurrentUrl(url, params, locale, basePath = '') {
  try {
    if (url) {
      // For server-side rendering, construct URL manually
      const origin = url.origin || 'https://www.globalgovernanceframework.org';
      const pathname = url.pathname || basePath;
      const searchParams = new URLSearchParams();
      
      if (locale && locale !== 'en') {
        searchParams.set('lang', locale);
      }
      
      if (params && params.slug) {
        const fullPath = `${basePath}/${params.slug}`;
        const queryString = searchParams.toString();
        return `${origin}${fullPath}${queryString ? '?' + queryString : ''}`;
      }
      
      const queryString = searchParams.toString();
      return `${origin}${pathname}${queryString ? '?' + queryString : ''}`;
    }
  } catch (e) {
    console.warn('Error constructing current URL:', e);
  }
  
  // Fallback URL
  return 'https://www.globalgovernanceframework.org' + basePath;
}
