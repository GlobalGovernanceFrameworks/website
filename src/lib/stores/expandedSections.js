// src/lib/stores/expandedSections.js
import { writable } from 'svelte/store';

// Initialize from localStorage if available, otherwise default to an empty object
const initialExpandedSections = typeof localStorage !== 'undefined'
  ? JSON.parse(localStorage.getItem('expandedSections') || '{}')
  : {};

export const expandedSections = writable(initialExpandedSections);

// Subscribe to changes and save to localStorage
expandedSections.subscribe(value => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('expandedSections', JSON.stringify(value));
  }
});
