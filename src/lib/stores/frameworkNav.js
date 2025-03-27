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
      { titleKey: 'framework.docs.nav.implementationEnvironment', path: '/framework/docs/implementation/environment' },
      { titleKey: 'framework.docs.nav.implementationPeace', path: '/framework/docs/implementation/peace' },
      { titleKey: 'framework.docs.nav.implementationTechnology', path: '/framework/docs/implementation/technology', comingSoon: true },
      { titleKey: 'framework.docs.nav.implementationEnergy', path: '/framework/docs/implementation/energy', comingSoon: true },
      // Planned items - give them unique path identifiers even though they don't exist yet
      { titleKey: 'framework.docs.nav.implementationFood', path: '/framework/docs/implementation/food', planned: true },
      { titleKey: 'framework.docs.nav.implementationDigital', path: '/framework/docs/implementation/digital', planned: true },
      { titleKey: 'framework.docs.nav.implementationMigration', path: '/framework/docs/implementation/migration', planned: true },
      { titleKey: 'framework.docs.nav.implementationFinancial', path: '/framework/docs/implementation/financial', planned: true },
      { titleKey: 'framework.docs.nav.implementationHealthcare', path: '/framework/docs/implementation/healthcare', planned: true },
      { titleKey: 'framework.docs.nav.implementationJustice', path: '/framework/docs/implementation/justice', planned: true },
      { titleKey: 'framework.docs.nav.implementationEducation', path: '/framework/docs/implementation/education', planned: true },
      { titleKey: 'framework.docs.nav.implementationCulture', path: '/framework/docs/implementation/culture', planned: true },
      { titleKey: 'framework.docs.nav.implementationUrban', path: '/framework/docs/implementation/urban', planned: true },
      // New suggested areas
      { titleKey: 'framework.docs.nav.implementationSpace', path: '/framework/docs/implementation/space', planned: true },
      { titleKey: 'framework.docs.nav.implementationSpiritual', path: '/framework/docs/implementation/spiritual', planned: true },
      { titleKey: 'framework.docs.nav.implementationRural', path: '/framework/docs/implementation/rural', planned: true }
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
