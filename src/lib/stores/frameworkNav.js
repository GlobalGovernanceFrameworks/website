// src/lib/stores/frameworkNav.js
import { writable } from 'svelte/store';

// Define the navigation structure
const initialNav = [
  { titleKey: 'framework.docs.nav.overview', path: '/frameworks/docs' },
  { titleKey: 'framework.docs.nav.principles', path: '/frameworks/docs/principles' },
  { 
    titleKey: 'framework.docs.nav.globalCitizenship', 
    path: '/frameworks/global-citizenship',
    status: 'ready'
  },
  {
    titleKey: 'framework.docs.nav.implementation',
    path: '/frameworks/docs/implementation',
    status: 'ready',
    subItems: [
      {
        titleKey: 'framework.docs.nav.implementationTier0',
        path: '/frameworks/docs/implementation/tier-0',
        subItems: [
          { 
            titleKey: 'framework.docs.nav.implementationInstitutionalReform', 
            path: '/frameworks/docs/implementation/treaty-for-our-only-home', 
            status: 'ready',
            version: 'v1.0'
          }
        ]
      },

      {
        titleKey: 'framework.docs.nav.implementationTier1',
        path: '/frameworks/docs/implementation/tier-1',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationClimateEnergy', path: '/frameworks/docs/implementation/energy', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationPeace', path: '/frameworks/docs/implementation/peace', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationIndigenous', path: '/frameworks/docs/implementation/indigenous', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationHealthcare', path: '/frameworks/docs/implementation/planetary-health', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationFood', path: '/frameworks/docs/implementation/food-systems', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationEconomic', path: '/frameworks/docs/implementation/economic', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationJustice', path: '/frameworks/docs/implementation/justice', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationMigration', path: '/frameworks/docs/implementation/migration', comingSoon: true },
          { titleKey: 'framework.docs.nav.implementationDisaster', path: '/frameworks/docs/implementation/disaster', status: 'review' }
        ]
      },
      {
        titleKey: 'framework.docs.nav.implementationTier2',
        path: '/frameworks/docs/implementation/tier-2',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationTechnology', path: '/frameworks/docs/implementation/technology', status: 'review' },
          { 
            titleKey: 'framework.docs.nav.implementationFinancial', 
            path: '/frameworks/docs/implementation/financial-systems', 
            status: 'review',
          },
          { titleKey: 'framework.docs.nav.implementationEducation', path: '/frameworks/docs/implementation/education', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationMentalHealth', path: '/frameworks/docs/implementation/mental-health', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationUrban', path: '/frameworks/docs/implementation/urban', comingSoon: true },
          { titleKey: 'framework.docs.nav.implementationWash', path: '/frameworks/docs/implementation/water', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationEnvironment', path: '/frameworks/docs/implementation/environmental-stewardship', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationAnimalWelfare', path: '/frameworks/docs/implementation/animal-welfare', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationBiodiversity', path: '/frameworks/docs/implementation/biodiversity', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationOceansMarine', path: '/frameworks/docs/implementation/oceans', planned: true },
          { titleKey: 'framework.docs.nav.implementationLaborEmployment', path: '/frameworks/docs/implementation/labor', planned: true },
          { titleKey: 'framework.docs.nav.implementationInclusion', path: '/frameworks/docs/implementation/inclusion', comingSoon: true }
        ]
      },
      {
        titleKey: 'framework.docs.nav.implementationTier3',
        path: '/frameworks/docs/implementation/tier-3',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationDigital', path: '/frameworks/docs/implementation/digital', status: 'review'},
          { titleKey: 'framework.docs.nav.implementationCulture', path: '/frameworks/docs/implementation/culture', planned: true },
          { titleKey: 'framework.docs.nav.implementationRural', path: '/frameworks/docs/implementation/rural', planned: true },
          { titleKey: 'framework.docs.nav.implementationSpiritual', path: '/frameworks/docs/implementation/spiritual', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationYouthGovernance', path: '/frameworks/docs/implementation/youth', planned: true },
          { titleKey: 'framework.docs.nav.implementationGlobalCitizenship', path: '/frameworks/global-citizenship/full-framework', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationEthicsRights', path: '/frameworks/docs/implementation/ethics', status: 'review' },
          { 
            titleKey: 'framework.docs.nav.implementationAging', 
            path: '/frameworks/docs/implementation/aging', 
            status: 'review',
          }
        ]
      },
      {
        titleKey: 'framework.docs.nav.implementationTier4',
        path: '/frameworks/docs/implementation/tier-4',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationSpaceGovernance', path: '/frameworks/docs/implementation/space', planned: true },
          { 
            titleKey: 'framework.docs.nav.implementationConsciousness', 
            path: '/frameworks/docs/implementation/consciousness', 
            status: 'review',
          },
          { titleKey: 'framework.docs.nav.implementationMetaGovernance', path: '/frameworks/docs/implementation/meta', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationMethodsTools', path: '/frameworks/docs/implementation/methods-tools', status: 'review' }
        ]
      }
    ]
  },
  { titleKey: 'framework.docs.nav.regionalHubs', path: '/frameworks/hubs' },
  { titleKey: 'framework.docs.nav.implementationTools', path: '/frameworks/tools' },
  { titleKey: 'framework.docs.nav.visualizations', path: '/frameworks/visuals' },
  { titleKey: 'framework.docs.nav.case-studies', path: '/frameworks/docs/case-studies' },
  { titleKey: 'framework.docs.nav.ai-futures', path: '/frameworks/ai-futures' },
  { titleKey: 'framework.docs.nav.resources', path: '/frameworks/docs/resources' },
  { titleKey: 'framework.docs.nav.glossary', path: '/frameworks/docs/glossary' },
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

// Helper function to update version for a specific framework
export function updateFrameworkVersion(path, version) {
  frameworkNav.update(nav => {
    return updateItemVersion(nav, path, version);
  });
}

// Recursive function to find and update version in nested structure
function updateItemVersion(items, targetPath, version) {
  return items.map(item => {
    if (item.path === targetPath) {
      return { ...item, version };
    }
    if (item.subItems) {
      return {
        ...item,
        subItems: updateItemVersion(item.subItems, targetPath, version)
      };
    }
    return item;
  });
}
