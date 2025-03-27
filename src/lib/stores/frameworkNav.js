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
      {
        titleKey: 'framework.docs.nav.implementationTier1',
        path: '/framework/docs/implementation/tier-1',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationClimateEnergy', path: '/framework/docs/implementation/energy', comingSoon: true },
          { titleKey: 'framework.docs.nav.implementationPeace', path: '/framework/docs/implementation/peace' },
          { titleKey: 'framework.docs.nav.implementationHealthcare', path: '/framework/docs/implementation/healthcare', comingSoon: true },
          { titleKey: 'framework.docs.nav.implementationFoodAgriculture', path: '/framework/docs/implementation/food', comingSoon: true },
          { titleKey: 'framework.docs.nav.implementationEconomic', path: '/framework/docs/implementation/economic' },
          { titleKey: 'framework.docs.nav.implementationJustice', path: '/framework/docs/implementation/justice', planned: true },
          { titleKey: 'framework.docs.nav.implementationMigration', path: '/framework/docs/implementation/migration', planned: true },
          { titleKey: 'framework.docs.nav.implementationDisasterResilience', path: '/framework/docs/implementation/disaster', planned: true }
        ]
      },
      {
        titleKey: 'framework.docs.nav.implementationTier2',
        path: '/framework/docs/implementation/tier-2',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationTechnology', path: '/framework/docs/implementation/technology', planned: true },
          { titleKey: 'framework.docs.nav.implementationFinance', path: '/framework/docs/implementation/finance', planned: true },
          { titleKey: 'framework.docs.nav.implementationEducation', path: '/framework/docs/implementation/education', planned: true },
          { titleKey: 'framework.docs.nav.implementationUrbanCommunity', path: '/framework/docs/implementation/urban', planned: true },
          { titleKey: 'framework.docs.nav.implementationEnvironment', path: '/framework/docs/implementation/environment' },
          { titleKey: 'framework.docs.nav.implementationOceansMarine', path: '/framework/docs/implementation/oceans', planned: true },
          { titleKey: 'framework.docs.nav.implementationLaborEmployment', path: '/framework/docs/implementation/labor', planned: true }
        ]
      },
      {
        titleKey: 'framework.docs.nav.implementationTier3',
        path: '/framework/docs/implementation/tier-3',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationDigitalCommons', path: '/framework/docs/implementation/digital', planned: true },
          { titleKey: 'framework.docs.nav.implementationBiodiversity', path: '/framework/docs/implementation/biodiversity', planned: true },
          { titleKey: 'framework.docs.nav.implementationCulturalHeritage', path: '/framework/docs/implementation/cultural', planned: true },
          { titleKey: 'framework.docs.nav.implementationRuralDevelopment', path: '/framework/docs/implementation/rural', planned: true },
          { titleKey: 'framework.docs.nav.implementationSpiritualDialogue', path: '/framework/docs/implementation/spiritual', planned: true },
          { titleKey: 'framework.docs.nav.implementationYouthGovernance', path: '/framework/docs/implementation/youth', planned: true },
          { titleKey: 'framework.docs.nav.implementationEthicsRights', path: '/framework/docs/implementation/ethics', planned: true }
        ]
      },
      {
        titleKey: 'framework.docs.nav.implementationTier4',
        path: '/framework/docs/implementation/tier-4',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationSpaceGovernance', path: '/framework/docs/implementation/space', planned: true },
          { titleKey: 'framework.docs.nav.implementationConsciousness', path: '/framework/docs/implementation/consciousness', planned: true },
          { titleKey: 'framework.docs.nav.implementationMetaGovernance', path: '/framework/docs/implementation/meta', planned: true },
          { titleKey: 'framework.docs.nav.implementationMethodsTools', path: '/framework/docs/implementation/methods-tools', planned: true }
        ]
      }
    ]
  }
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
