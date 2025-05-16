// src/lib/stores/frameworkNav.js
import { writable } from 'svelte/store';

// Define the navigation structure
const initialNav = [
  { titleKey: 'framework.docs.nav.overview', path: '/framework/docs' },
  { titleKey: 'framework.docs.nav.principles', path: '/framework/docs/principles' },
  { 
    titleKey: 'framework.docs.nav.globalCitizenship', 
    path: '/framework/global-citizenship',
    status: 'ready'
  },
  {
    titleKey: 'framework.docs.nav.implementation',
    path: '/framework/docs/implementation',
    status: 'ready',
    subItems: [
      {
        titleKey: 'framework.docs.nav.implementationTier1',
        path: '/framework/docs/implementation/tier-1',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationClimateEnergy', path: '/framework/docs/implementation/energy', status: 'ready' },
          { titleKey: 'framework.docs.nav.implementationPeace', path: '/framework/docs/implementation/peace', status: 'ready' },
          { titleKey: 'framework.docs.nav.implementationHealthcare', path: '/framework/docs/implementation/healthcare', planned: true },
          { titleKey: 'framework.docs.nav.implementationFood', path: '/framework/docs/implementation/food-systems', status: 'ready' },
          { titleKey: 'framework.docs.nav.implementationEconomic', path: '/framework/docs/implementation/economic', status: 'ready' },
          { titleKey: 'framework.docs.nav.implementationJustice', path: '/framework/docs/implementation/justice', comingSoon: true },
          { titleKey: 'framework.docs.nav.implementationMigration', path: '/framework/docs/implementation/migration', planned: true },
          { titleKey: 'framework.docs.nav.implementationDisaster', path: '/framework/docs/implementation/disaster', status: 'ready' }
        ]
      },
      {
        titleKey: 'framework.docs.nav.implementationTier2',
        path: '/framework/docs/implementation/tier-2',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationTechnology', path: '/framework/docs/implementation/technology', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationFinancial', path: '/framework/docs/implementation/finance', planned: true },
          { titleKey: 'framework.docs.nav.implementationEducation', path: '/framework/docs/implementation/education', status: 'ready' },
          { titleKey: 'framework.docs.nav.implementationUrban', path: '/framework/docs/implementation/urban', planned: true },
          { titleKey: 'framework.docs.nav.implementationEnvironment', path: '/framework/docs/implementation/environment', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationOceansMarine', path: '/framework/docs/implementation/oceans', planned: true },
          { titleKey: 'framework.docs.nav.implementationLaborEmployment', path: '/framework/docs/implementation/labor', planned: true }
        ]
      },
      {
        titleKey: 'framework.docs.nav.implementationTier3',
        path: '/framework/docs/implementation/tier-3',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationDigital', path: '/framework/docs/implementation/digital', status: 'ready'},
          { titleKey: 'framework.docs.nav.implementationBiodiversity', path: '/framework/docs/implementation/biodiversity', planned: true },
          { titleKey: 'framework.docs.nav.implementationCulture', path: '/framework/docs/implementation/culture', planned: true },
          { titleKey: 'framework.docs.nav.implementationRural', path: '/framework/docs/implementation/rural', planned: true },
          { titleKey: 'framework.docs.nav.implementationSpiritual', path: '/framework/docs/implementation/spiritual', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationYouthGovernance', path: '/framework/docs/implementation/youth', planned: true },
          { titleKey: 'framework.docs.nav.implementationEthicsRights', path: '/framework/docs/implementation/ethics', status: 'ready' }
        ]
      },
      {
        titleKey: 'framework.docs.nav.implementationTier4',
        path: '/framework/docs/implementation/tier-4',
        subItems: [
          { titleKey: 'framework.docs.nav.implementationSpaceGovernance', path: '/framework/docs/implementation/space', planned: true },
          { titleKey: 'framework.docs.nav.implementationConsciousness', path: '/framework/docs/implementation/consciousness', planned: true },
          { titleKey: 'framework.docs.nav.implementationMetaGovernance', path: '/framework/docs/implementation/meta', status: 'review' },
          { titleKey: 'framework.docs.nav.implementationMethodsTools', path: '/framework/docs/implementation/methods-tools', status: 'ready' }
        ]
      }
    ]
  },
  { titleKey: 'framework.docs.nav.regionalHubs', path: '/framework/hubs' },
  { titleKey: 'framework.docs.nav.implementationTools', path: '/framework/tools' },
  { titleKey: 'framework.docs.nav.visualizations', path: '/framework/visuals' },
  { titleKey: 'framework.docs.nav.case-studies', path: '/framework/docs/case-studies' },
  { titleKey: 'framework.docs.nav.ai-futures', path: '/framework/ai-futures' },
  { titleKey: 'framework.docs.nav.resources', path: '/framework/docs/resources' },
  { titleKey: 'framework.docs.nav.glossary', path: '/framework/docs/glossary' },
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
