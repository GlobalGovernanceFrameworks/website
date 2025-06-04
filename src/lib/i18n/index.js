// src/lib/i18n/index.js
import { browser } from '$app/environment';
import { derived, writable, readable, get } from 'svelte/store';
import { base } from '$app/paths';
import { getBrowserLanguage, getLocalStorage, setLocalStorage } from '$lib/utils/browserUtils';

// Define supported languages
const supportedLocales = ['en', 'sv'];

// Create stores for the current locale and translations
const locale = writable(getLocalStorage('locale', 'en'));
const translations = writable({});
const currentRoute = writable('/');

// Create a readable store for locales
const locales = readable(supportedLocales);

// Load translations for a specific language and route
async function loadTranslations(newLocale, route = '/') {
  // Remove the base path from the route if it's present
  if (route.startsWith(base)) {
    route = route.slice(base.length);
  }

  // If the route is empty after removing the base, set it to the root
  if (!route) {
    route = '/';
  }

  // Default translations (common phrases used across the site)
  let translationData = {};
  
  try {
    // Store the current route
    currentRoute.set(route);
    console.log(`Loading translations for locale: ${newLocale}, route: ${route}`);
    
    // Load common translations
    try {
      if (newLocale === 'en') {
        translationData.common = (await import('./en/common.json')).default;
      } else if (newLocale === 'sv') {
        translationData.common = (await import('./sv/common.json')).default;
      }
      console.log('Loaded common translations:', translationData.common);
    } catch (e) {
      console.error('Error loading common translations:', e);
    }
    
    // Load page-specific translations
    if (route === '/' || route.startsWith('/?')) {
      // Home page
      try {
        if (newLocale === 'en') {
          translationData.home = (await import('./en/home.json')).default;
        } else if (newLocale === 'sv') {
          translationData.home = (await import('./sv/home.json')).default;
        }
      } catch (e) {
        console.error('Error loading home translations:', e);
      }
    } else if (route.startsWith('/about')) {
      // About page
      try {
        if (newLocale === 'en') {
          translationData.about = (await import('./en/about.json')).default;
        } else if (newLocale === 'sv') {
          translationData.about = (await import('./sv/about.json')).default;
        }
      } catch (e) {
        console.error('Error loading about translations:', e);
      }
    } else if (route.startsWith('/contact')) {
      // Contact page
      try {
        if (newLocale === 'en') {
          translationData.contact = (await import('./en/contact.json')).default;
        } else if (newLocale === 'sv') {
          translationData.contact = (await import('./sv/contact.json')).default;
        }
      } catch (e) {
        console.error('Error loading contact translations:', e);
      }
    } else if (route.includes('/framework/ai-futures')) {
      // AI-futures page
      try {
        if (newLocale === 'en') {
          translationData.aiFutures = (await import('./en/aiFutures.json')).default;
        } else if (newLocale === 'sv') {
          translationData.aiFutures = (await import('./sv/aiFutures.json')).default;
        }
      } catch (e) {
        console.error('Error loading terms translations:', e);
      }
    } else if (route.startsWith('/framework')) {
      // Framework page
      try {
        if (newLocale === 'en') {
          translationData.framework = (await import('./en/framework.json')).default;
        } else if (newLocale === 'sv') {
          translationData.framework = (await import('./sv/framework.json')).default;
        }
      } catch (e) {
        console.error('Error loading framework translations:', e);
      }
    } else if (route.startsWith('/privacy')) {
      // Privacy page
      try {
        if (newLocale === 'en') {
          translationData.privacy = (await import('./en/privacy.json')).default;
        } else if (newLocale === 'sv') {
          translationData.privacy = (await import('./sv/privacy.json')).default;
        }
      } catch (e) {
        console.error('Error loading privacy translations:', e);
      }
    } else if (route.startsWith('/terms')) {
      // Terms page
      try {
        if (newLocale === 'en') {
          translationData.terms = (await import('./en/terms.json')).default;
        } else if (newLocale === 'sv') {
          translationData.terms = (await import('./sv/terms.json')).default;
        }
      } catch (e) {
        console.error('Error loading terms translations:', e);
      }
    } else if (route.startsWith('/downloads')) {
      // Downloads page
      try {
        if (newLocale === 'en') {
          translationData.downloads = (await import('./en/downloads.json')).default;
        } else if (newLocale === 'sv') {
          translationData.downloads = (await import('./sv/downloads.json')).default;
        }
      } catch (e) {
        console.error('Error loading terms translations:', e);
      }
    } else if (route.startsWith('/youth')) {
      // Downloads page
      try {
        if (newLocale === 'en') {
          translationData.youth = (await import('./en/youth.json')).default;
        } else if (newLocale === 'sv') {
          translationData.youth = (await import('./sv/youth.json')).default;
        }
      } catch (e) {
        console.error('Error loading terms translations:', e);
      }
    }

    
    // Log the loaded translations for debugging
    console.log('Loaded translations data:', translationData);
    
    // Update the locale and translations stores
    locale.set(newLocale);
    translations.set(translationData);
    
    // Store the locale in localStorage if we're in the browser
    if (browser) {
      localStorage.setItem('locale', newLocale);
    }
    
    return translationData;
  } catch (e) {
    console.error('Error loading translations:', e);
    return {};
  }
}

// Create a derived store that returns a translation function
// and update the t derived store to handle loading state
const t = derived(
  [locale, translations],
  ([$locale, $translations]) => {
    // Return a function that takes a key and returns the translation
    return (key) => {
      // If the key is empty or not a string, return an empty string
      if (!key || typeof key !== 'string') {
        return '';
      }
      
      // Split the key by dots to navigate nested objects
      const parts = key.split('.');
      let result = $translations;
      
      // Navigate through the translation object
      for (const part of parts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part];
        } else {
          // If in development, log warning
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Translation key not found: ${key}`);
          }
          // Return empty string instead of the key to avoid showing raw translation keys
          return '';
        }
      }
      
      // Handle different types of results
      if (result === null || result === undefined) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation value is null or undefined for key: ${key}`);
        }
        return '';
      }
      
      return result;
    };
  }
);

// Function to reload translations when locale changes
function setLocale(newLocale) {
  if (supportedLocales.includes(newLocale)) {
    // Load translations for the current route with the new locale
    const route = get(currentRoute);
    loadTranslations(newLocale, route);
    
    // Update localStorage
    setLocalStorage('locale', newLocale);
    
    // Update URL (if in browser)
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLocale);
      window.history.replaceState(null, '', url.toString());
    }
  }
}

// Utility function to detect the user's preferred locale
const detectLocale = () => {
  if (!browser) return 'en';
  
  // First check URL params
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && supportedLocales.includes(urlLang)) {
    return urlLang;
  }
  
  // Then check localStorage
  const savedLocale = getLocalStorage('locale', null);
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale;
  }
  
  // Finally fall back to browser language
  const userLocale = getBrowserLanguage();
  return supportedLocales.includes(userLocale) ? userLocale : 'en';
};

// Add information about available languages
const languageData = {
  en: { language: 'English' },
  sv: { language: 'Svenska' }
};

// Function to get language name
function getLanguageName(localeCode) {
  return languageData[localeCode]?.language || localeCode;
}

// Export everything needed by the app
export {
  loadTranslations,
  locale,
  locales,
  t,
  setLocale, // New export
  detectLocale,
  languageData,
  getLanguageName,
  currentRoute,
  translations
};
