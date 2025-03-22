// src/lib/i18n/index.js
import { browser } from '$app/environment';
import { derived, writable, readable } from 'svelte/store';

// Define supported languages
const supportedLocales = ['en', 'sv'];

// Create stores for the current locale and translations
const locale = writable(browser ? localStorage.getItem('locale') || 'en' : 'en');
const translations = writable({});

// Create a readable store for locales
const locales = readable(supportedLocales);

// Load translations for a specific language and route
async function loadTranslations(newLocale, route = '/') {
  // Default translations (common phrases used across the site)
  let translationData = {};
  
  try {
    // Load common translations
    try {
      if (newLocale === 'en') {
        translationData.common = (await import('./en/common.json')).default;
      } else if (newLocale === 'sv') {
        translationData.common = (await import('./sv/common.json')).default;
      }
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
    }
    
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
const t = derived(
  [locale, translations],
  ([$locale, $translations]) => {
    // Return a function that takes a key and returns the translation
    return (key) => {
      // Split the key by dots to navigate nested objects
      const parts = key.split('.');
      let result = $translations;
      
      // Navigate through the translation object
      for (const part of parts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part];
        } else {
          // If the key doesn't exist, return the key itself as a fallback
          return key;
        }
      }
      
      return result;
    };
  }
);

// Utility function to detect the user's preferred locale
const detectLocale = () => {
  if (!browser) return 'en';
  
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale;
  }
  
  const userLocale = navigator.language.split('-')[0];
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
  detectLocale,
  languageData,
  getLanguageName
};
