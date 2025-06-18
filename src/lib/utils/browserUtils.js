// src/lib/utils/browserUtils.js
import { browser } from '$app/environment';

// Safe localStorage access
export function getLocalStorage(key, defaultValue) {
  if (!browser) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? item : defaultValue;
  } catch (e) {
    console.warn('localStorage access failed:', e);
    return defaultValue;
  }
}

export function setLocalStorage(key, value) {
  if (!browser) return;
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
}

// Safe browser language detection
export function getBrowserLanguage() {
  if (!browser) return 'en';
  try {
    const lang = navigator.language || navigator.languages?.[0] || 'en';
    return lang.substring(0, 2); // Get just the language code (e.g., 'en' from 'en-US')
  } catch (e) {
    console.warn('Browser language detection failed:', e);
    return 'en';
  }
}
