// src/lib/stores/frameworkNav.js
import { writable } from 'svelte/store';

// Define the navigation structure
const initialNav = [
  { titleKey: 'framework.docs.nav.overview', path: '/framework/docs' },
  { titleKey: 'framework.docs.nav.principles', path: '/framework/docs/principles' },
  { 
    titleKey: 'framework.docs.nav.implementation', 
    path: '/framework/docs/implementation',
    subItems: [
      { titleKey: 'framework.docs.nav.implementationEconomic', path: '/framework/docs/implementation/economic' },
      { titleKey: 'framework.docs.nav.implementationEnvironment', path: '/framework/docs/implementation/environment', comingSoon: true },
      { titleKey: 'framework.docs.nav.implementationPeace', path: '/framework/docs/implementation/peace', comingSoon: true },
      { titleKey: 'framework.docs.nav.implementationTechnology', path: '/framework/docs/implementation/technology', comingSoon: true }
    ]
  },
  { titleKey: 'framework.docs.nav.casestudies', path: '/framework/docs/case-studies' },
  { titleKey: 'framework.docs.nav.resources', path: '/framework/docs/resources' }
];

// Create a writable store with initial value
export const frameworkNav = writable(initialNav);

// You could add functions to update the nav if needed
export function updateNavItem(titleKey, newData) {
  frameworkNav.update(nav => {
    return nav.map(item => {
      if (item.titleKey === titleKey) {
        return { ...item, ...newData };
      }
      return item;
    });
  });
}
