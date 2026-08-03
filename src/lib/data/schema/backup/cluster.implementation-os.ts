// /src/lib/data/schema/cluster.implementation-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

export const implementationOSEntities: GgfEntity[] = [
  {
    id: 'framework_implementation_adaptation',
    type: 'Framework',
    name: 'The GGF Implementation & Adaptation Framework',
    shortName: 'IAF',
    description: 'The GGF\'s primary "operating manual," providing a clear, adaptable, and ethically-grounded pathway for implementing all other GGF frameworks.',
    tier: 1,
    status: 'Planned',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty',
      'framework_meta_gov',
      'framework_indigenous'
    ],
    enables: [
      'institution_ggf_catalyst',
      'platform_community_of_practice',
      'institution_ggf_failure_library'
    ],
    ui: {
      path: '/frameworks/implementation-and-adaptation',
      titleKey: 'framework.docs.nav.frameworkTitles.implementationAndAdaptation',
      emoji: '🧰',
      slug: 'implementation-and-adaptation',
      outline: {
        version: 'v1.1.1',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst: ''  // two or three sentences — write this
      }
    }
  },
  {
    id: 'framework_implementation_methods_tools',
    type: 'Framework',
    name: 'Implementation Methods & Tools',
    shortName: 'Methods & Tools',
    description:
      'The practical tool library behind the Implementation & Adaptation Framework: assessment rubrics, tool stacks, journey pathways, and cultural adaptation protocols.',
    tier: 4,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_implementation_adaptation'],
    ui: {
      path: '/frameworks/implementation-methods-tools',
      titleKey: 'framework.docs.nav.frameworkTitles.implementationMethodsTools',
      emoji: '🧭',
      slug: 'implementation-methods-tools',
      outline: {
        version: 'v0.8.1',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst: ''
      }
    }
  },
  {
    id: 'institution_ggf_catalyst',
    type: 'Institution',
    name: 'GGF Catalyst Team',
    shortName: 'Catalyst Team',
    description: 'A central, GGF-chartered institution that trains facilitators, maintains the GGF toolkit, and provides direct support to implementing communities.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_implementation_adaptation',
      'framework_meta_gov',
      'mechanism_gcf'
    ]
  },
  {
    id: 'platform_community_of_practice',
    type: 'Platform',
    name: 'GGF Community of Practice',
    shortName: 'CoP',
    description: 'A peer-to-peer digital platform where implementers share adaptations, success stories, and lessons learned, forming the GGF\'s collective intelligence.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_implementation_adaptation',
      'institution_ggf_catalyst'
    ]
  },
  {
    id: 'institution_ggf_failure_library',
    type: 'Institution',
    name: 'GGF Failure Library',
    shortName: 'Failure Library',
    description: 'A crucial institution, managed by the Knowledge Commons Ombudsperson, that anonymizes and shares learnings from failed or challenging implementations to strengthen the entire ecosystem.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_implementation_adaptation',
      'institution_knowledge_commons_ombudsperson' // from cultural-knowledge cluster
    ]
  }
];

export const implementationOSRelationships: GgfRelationship[] = [
  {
    from: 'framework_implementation_adaptation',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description: 'The IAF operationalizes the legal mandates and institutional reforms of The Treaty for Our Only Home.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_adaptation',
    to: 'framework_meta_gov',
    type: 'INTEGRATES_WITH',
    description: 'The IAF uses the coordination architecture of the Meta-Governance Framework to facilitate its peer-to-peer learning networks and support structures.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_adaptation',
    to: 'framework_indigenous',
    type: 'GUIDES',
    description: 'The IAF is ethically guided by the anti-colonial, consent-based (FPIC 2.0), and relational principles of the Indigenous & Traditional Knowledge Framework.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_methods_tools',
    to: 'framework_implementation_adaptation',
    type: 'IMPLEMENTS',
    description: 'Supplies the concrete tools and assessment instruments the IAF calls for.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  }
];


