// src/lib/utils/browserUtils.js
import { browser } from '$app/environment';

// Safe browser API access functions
export const getBrowserLanguage = () => {
  if (!browser) return 'en';
  return navigator?.language?.split('-')[0] || 'en';
};

export const getLocalStorage = (key, defaultValue) => {
  if (!browser) return defaultValue;
  return localStorage.getItem(key) || defaultValue;
};

export const setLocalStorage = (key, value) => {
  if (!browser) return;
  localStorage.setItem(key, value);
};
