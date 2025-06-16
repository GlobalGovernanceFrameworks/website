// src/routes/frameworks/global-citizenship/components/compassData.js

export const frameworkStatus = {
  READY: 'ready',
  IN_REVIEW: 'in-review',
  PLANNED: 'planned'
};

export const tiers = {
  TIER_0: 'tier0',
  TIER_1: 'tier1', 
  TIER_2: 'tier2',
  TIER_3: 'tier3',
  TIER_4: 'tier4'
};

// Framework database with status and tier information
export const frameworks = {
  // Tier 0: Foundation
  treatyFoundation: {
    id: 'treatyFoundation',
    tier: tiers.TIER_0,
    status: frameworkStatus.READY,
    path: '/frameworks/docs/implementation/treaty-for-our-only-home',
    priority: 1
  },

  // Tier 1: Urgent Action
  climateEnergy: {
    id: 'climateEnergy',
    tier: tiers.TIER_1,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/energy',
    priority: 2
  },
  peaceConflict: {
    id: 'peaceConflict',
    tier: tiers.TIER_1,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/peace',
    priority: 2
  },
  indigenousGovernance: {
    id: 'indigenousGovernance',
    tier: tiers.TIER_1,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/indigenous',
    priority: 2
  },
  healthcareGovernance: {
    id: 'healthcareGovernance',
    tier: tiers.TIER_1,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/healthcare',
    priority: 2
  },
  foodSystems: {
    id: 'foodSystems',
    tier: tiers.TIER_1,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/food',
    priority: 2
  },
  economicIntegration: {
    id: 'economicIntegration',
    tier: tiers.TIER_1,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/economic',
    priority: 2
  },
  justiceSystem: {
    id: 'justiceSystem',
    tier: tiers.TIER_1,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/justice',
    priority: 2
  },
  migrationMobility: {
    id: 'migrationMobility',
    tier: tiers.TIER_1,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/migration',
    priority: 2
  },
  disasterResilience: {
    id: 'disasterResilience',
    tier: tiers.TIER_1,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/disaster',
    priority: 2
  },

  // Tier 2: Systems Development
  technologyGovernance: {
    id: 'technologyGovernance',
    tier: tiers.TIER_2,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/technology',
    priority: 3
  },
  financialSystems: {
    id: 'financialSystems',
    tier: tiers.TIER_2,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/financial-systems',
    priority: 3
  },
  educationalSystems: {
    id: 'educationalSystems',
    tier: tiers.TIER_2,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/education',
    priority: 3
  },
  mentalHealth: {
    id: 'mentalHealth',
    tier: tiers.TIER_2,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/mental-health',
    priority: 3
  },
  urbanDevelopment: {
    id: 'urbanDevelopment',
    tier: tiers.TIER_2,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/urban',
    priority: 3
  },
  waterSanitation: {
    id: 'waterSanitation',
    tier: tiers.TIER_2,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/water',
    priority: 3
  },
  environmentalStewardship: {
    id: 'environmentalStewardship',
    tier: tiers.TIER_2,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/environment',
    priority: 3
  },
  animalWelfare: {
    id: 'animalWelfare',
    tier: tiers.TIER_2,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/animal-welfare',
    priority: 3
  },
  biodiversityGovernance: {
    id: 'biodiversityGovernance',
    tier: tiers.TIER_2,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/biodiversity',
    priority: 3
  },
  oceansMarine: {
    id: 'oceansMarine',
    tier: tiers.TIER_2,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/oceans',
    priority: 3
  },
  laborEmployment: {
    id: 'laborEmployment',
    tier: tiers.TIER_2,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/labor',
    priority: 3
  },
  disabilityInclusion: {
    id: 'disabilityInclusion',
    tier: tiers.TIER_2,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/inclusion',
    priority: 3
  },

  // Tier 3: Equity & Culture
  digitalCommons: {
    id: 'digitalCommons',
    tier: tiers.TIER_3,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/digital',
    priority: 4
  },
  culturalHeritage: {
    id: 'culturalHeritage',
    tier: tiers.TIER_3,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/culture',
    priority: 4
  },
  ruralDevelopment: {
    id: 'ruralDevelopment',
    tier: tiers.TIER_3,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/rural',
    priority: 4
  },
  spiritualDialogue: {
    id: 'spiritualDialogue',
    tier: tiers.TIER_3,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/spiritual',
    priority: 4
  },
  youthGovernance: {
    id: 'youthGovernance',
    tier: tiers.TIER_3,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/youth',
    priority: 4
  },
  globalEthics: {
    id: 'globalEthics',
    tier: tiers.TIER_3,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/ethics',
    priority: 4
  },
  genderEquality: {
    id: 'genderEquality',
    tier: tiers.TIER_3,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/gender',
    priority: 4
  },
  agingSupport: {
    id: 'agingSupport',
    tier: tiers.TIER_3,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/aging',
    priority: 4
  },

  // Tier 4: Visionary & Meta
  spaceGovernance: {
    id: 'spaceGovernance',
    tier: tiers.TIER_4,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/space',
    priority: 5
  },
  existentialRisk: {
    id: 'existentialRisk',
    tier: tiers.TIER_4,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/existential-risk',
    priority: 5
  },
  consciousnessDevelopment: {
    id: 'consciousnessDevelopment',
    tier: tiers.TIER_4,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/consciousness',
    priority: 5
  },
  metaGovernance: {
    id: 'metaGovernance',
    tier: tiers.TIER_4,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/meta',
    priority: 5
  },
  implementationTools: {
    id: 'implementationTools',
    tier: tiers.TIER_4,
    status: frameworkStatus.IN_REVIEW,
    path: '/frameworks/docs/implementation/methods-tools',
    priority: 5
  },
  wisdomGovernance: {
    id: 'wisdomGovernance',
    tier: tiers.TIER_4,
    status: frameworkStatus.PLANNED,
    path: '/frameworks/docs/implementation/wisdom',
    priority: 5
  }
};

// Mapping from values to related frameworks
export const valueFrameworkConnections = {
  life: [
    'treatyFoundation', 'animalWelfare', 'biodiversityGovernance', 
    'environmentalStewardship', 'healthcareGovernance', 'existentialRisk'
  ],
  compassion: [
    'treatyFoundation', 'healthcareGovernance', 'mentalHealth', 
    'migrationMobility', 'agingSupport', 'disabilityInclusion'
  ],
  justice: [
    'treatyFoundation', 'justiceSystem', 'globalEthics', 
    'genderEquality', 'economicIntegration', 'indigenousGovernance'
  ],
  truth: [
    'treatyFoundation', 'educationalSystems', 'digitalCommons', 
    'culturalHeritage', 'spiritualDialogue', 'wisdomGovernance'
  ],
  freedom: [
    'treatyFoundation', 'globalEthics', 'digitalCommons', 
    'genderEquality', 'migrationMobility', 'youthGovernance'
  ],
  earth: [
    'treatyFoundation', 'climateEnergy', 'environmentalStewardship', 
    'biodiversityGovernance', 'foodSystems', 'waterSanitation'
  ],
  peace: [
    'treatyFoundation', 'peaceConflict', 'disasterResilience', 
    'spiritualDialogue', 'metaGovernance', 'indigenousGovernance'
  ],
  integrity: [
    'treatyFoundation', 'justiceSystem', 'globalEthics', 
    'financialSystems', 'technologyGovernance', 'implementationTools'
  ],
  gratitude: [
    'treatyFoundation', 'culturalHeritage', 'spiritualDialogue', 
    'indigenousGovernance', 'wisdomGovernance', 'consciousnessDevelopment'
  ],
  wisdom: [
    'treatyFoundation', 'wisdomGovernance', 'consciousnessDevelopment', 
    'educationalSystems', 'spiritualDialogue', 'metaGovernance'
  ]
};

// Mapping from development levels to frameworks
export const levelFrameworkConnections = {
  awareness: [
    'treatyFoundation', 'educationalSystems', 'digitalCommons', 'culturalHeritage'
  ],
  understanding: [
    'treatyFoundation', 'climateEnergy', 'peaceConflict', 'globalEthics', 'wisdomGovernance'
  ],
  empathy: [
    'treatyFoundation', 'migrationMobility', 'healthcareGovernance', 'mentalHealth', 
    'indigenousGovernance', 'spiritualDialogue'
  ],
  participation: [
    'treatyFoundation', 'youthGovernance', 'urbanDevelopment', 'ruralDevelopment', 
    'digitalCommons', 'implementationTools'
  ],
  leadership: [
    'treatyFoundation', 'metaGovernance', 'consciousnessDevelopment', 
    'existentialRisk', 'spaceGovernance', 'implementationTools'
  ]
};

// Quiz response to framework mapping
export const quizToFrameworkMapping = {
  values: {
    climate: ['climateEnergy', 'environmentalStewardship', 'biodiversityGovernance', 'foodSystems'],
    justice: ['justiceSystem', 'globalEthics', 'genderEquality', 'economicIntegration'],
    technology: ['technologyGovernance', 'digitalCommons', 'spaceGovernance', 'existentialRisk'],
    community: ['culturalHeritage', 'urbanDevelopment', 'ruralDevelopment', 'youthGovernance'],
    systems: ['treatyFoundation', 'metaGovernance', 'implementationTools', 'wisdomGovernance']
  },
  contribution: {
    learning: ['educationalSystems', 'digitalCommons', 'culturalHeritage', 'wisdomGovernance'],
    building: ['technologyGovernance', 'urbanDevelopment', 'financialSystems', 'implementationTools'],
    protecting: ['peaceConflict', 'healthcareGovernance', 'environmentalStewardship', 'disasterResilience'],
    advocating: ['justiceSystem', 'globalEthics', 'genderEquality', 'youthGovernance'],
    transforming: ['treatyFoundation', 'metaGovernance', 'consciousnessDevelopment', 'existentialRisk']
  },
  scale: {
    local: ['urbanDevelopment', 'ruralDevelopment', 'culturalHeritage', 'mentalHealth'],
    national: ['justiceSystem', 'educationalSystems', 'healthcareGovernance', 'economicIntegration'],
    global: ['treatyFoundation', 'climateEnergy', 'peaceConflict', 'migrationMobility'],
    intergenerational: ['existentialRisk', 'spaceGovernance', 'consciousnessDevelopment', 'wisdomGovernance'],
    connected: ['treatyFoundation', 'metaGovernance', 'implementationTools', 'climateEnergy']
  }
};

// Utility functions
export function getFrameworksByStatus(status) {
  return Object.values(frameworks).filter(fw => fw.status === status);
}

export function getFrameworksByTier(tier) {
  return Object.values(frameworks).filter(fw => fw.tier === tier);
}

export function getConnectedFrameworks(elementType, elementId) {
  if (elementType === 'value') {
    return valueFrameworkConnections[elementId] || [];
  } else if (elementType === 'practice') {
    return levelFrameworkConnections[elementId] || [];
  }
  return [];
}

export function generateRecommendations(quizResults) {
  if (!quizResults) return [];
  
  const recommendations = new Set();
  
  // Always include foundation
  recommendations.add('treatyFoundation');
  
  // Add frameworks based on quiz responses
  Object.entries(quizResults).forEach(([category, response]) => {
    const mappings = quizToFrameworkMapping[category];
    if (mappings && mappings[response]) {
      mappings[response].forEach(fw => recommendations.add(fw));
    }
  });
  
  return Array.from(recommendations)
    .map(id => frameworks[id])
    .filter(Boolean)
    .sort((a, b) => a.priority - b.priority);
}
