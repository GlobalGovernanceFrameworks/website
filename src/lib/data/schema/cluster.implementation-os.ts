// /src/lib/data/schema/cluster.implementation-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * IMPLEMENTATION OPERATING SYSTEM
 *
 * The support layer that helps other frameworks reach practice: context
 * assessment, tool selection, cultural adaptation, bounded pilots, and
 * learning. Deliberately non-authoritative — nothing here grants
 * jurisdiction, consent, funding power, or emergency authority.
 *
 * Conventions used in this file (see cluster.implementation-os as the
 * reference implementation for the rest of the schema):
 *   - entity keys in fixed order: id, type, name, shortName, description,
 *     tier, status, primaryDomain, geographicScope, implementationPriority,
 *     dependencies, enables, ui
 *   - `dependencies` / `enables` mirror real relationships below; they do not
 *     assert edges that nothing backs
 *   - a relationship lives in the cluster file of its `from` entity
 *   - relationships grouped by subject under a `// --- <subject>` banner
 *   - every relationship carries description, strength and sequenceType
 *   - cross-cluster ids get an inline `// cluster: <name>` note
 */

export const implementationOSEntities: GgfEntity[] = [
  // === FRAMEWORKS ===
  {
    id: 'framework_implementation_adaptation',
    type: 'Framework',
    name: 'The GGF Implementation & Adaptation Framework',
    shortName: 'IAF',
    description:
      'The GGF\'s operating manual: a reusable pathway for implementing a framework, programme, tool, or local initiative while preserving local law, cultural form, rights, and affected-nation authority.',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'framework_meta_gov', // cluster: governance-os
      'framework_indigenous' // cluster: cultural-knowledge
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
        version: 'v1.2',
        updated: '2026-08-06',
        maturity: 'adversarial',
        standfirst:
          'An operating manual for turning GGF frameworks into locally owned practice: assessing context, selecting and adapting tools, designing causally adequate pilots, learning without overclaiming, and building durable institutions that can survive the withdrawal of exceptional support. Version 1.2 keeps implementation support separate from authority—a diagnosis is not jurisdiction, a tool is not a mandate, pilot success is not permission to scale, and conformance is not proof of legitimacy or success.'
      }
    }
  },
  {
    id: 'framework_implementation_methods_tools',
    type: 'Framework',
    name: 'Implementation Methods & Tools',
    shortName: 'Methods & Tools',
    description:
      'The practical tool library behind the Implementation & Adaptation Framework: assessment rubrics, tool stacks, journey pathways, facilitation methods, and cultural adaptation protocols — forkable and low-tech-first.',
    tier: 4,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_implementation_adaptation'],
    enables: ['institution_ggf_failure_library'],
    ui: {
      path: '/frameworks/implementation-methods-tools',
      titleKey: 'framework.docs.nav.frameworkTitles.implementationMethodsTools',
      emoji: '🧭',
      slug: 'implementation-methods-tools',
      outline: {
        version: 'v0.9',
        updated: '2026-08-06',
        maturity: 'adversarial',
        standfirst:
          'A governance tool commons: methods, rubrics, resource cards, and facilitation practices that communities can adopt, adapt, or fork without asking permission. It publishes methods; it does not make their use lawful. A rating confers no legitimacy, certification confers no monopoly, and a failure story stays the property of whoever lived it.'
      }
    }
  },

  // === SUPPORT INSTITUTIONS ===
  {
    id: 'institution_ggf_catalyst',
    type: 'Institution',
    name: 'GGF Catalyst Team',
    shortName: 'Catalyst Team',
    description:
      'A GGF-chartered institution that trains facilitators, maintains the tool library, and provides direct support to implementing communities. Explicitly barred from being the final reviewer of complaints against itself, or the arbiter of what counts as valid implementation.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_implementation_adaptation',
      'framework_meta_gov', // cluster: governance-os
      'mechanism_gcf' // cluster: economic-os
    ],
    enables: ['platform_community_of_practice']
  },
  {
    id: 'platform_community_of_practice',
    type: 'Platform',
    name: 'GGF Community of Practice',
    shortName: 'CoP',
    description:
      'A peer-to-peer platform where implementers compare methods and publish bounded patterns. It does not rank communities, and learning records may not be used as a sanction or eligibility system.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_implementation_adaptation', 'institution_ggf_catalyst']
  },
  {
    id: 'institution_ggf_failure_library',
    type: 'Institution',
    name: 'GGF Failure Library',
    shortName: 'Failure Library',
    description:
      'A custodial institution that anonymises and shares learnings from failed or difficult implementations. The custodian manages consent, protection, withdrawal, access, and correction — contribution is never compulsory.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_implementation_adaptation',
      'institution_knowledge_commons_ombudsperson' // cluster: cultural-knowledge
    ]
  }
];

export const implementationOSRelationships: GgfRelationship[] = [
  // --- framework_implementation_adaptation ------------------------------
  // Constitutional anchors
  {
    from: 'framework_implementation_adaptation',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'The IAF operationalizes the legal mandates and institutional reforms of the Treaty for Our Only Home, without deriving public authority from them.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_adaptation',
    to: 'framework_meta_gov',
    type: 'INTEGRATES_WITH',
    description:
      'The IAF routes coordination, escalation, and emergency signals through Meta-Governance interfaces (MGCC) rather than acting on them directly.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_adaptation',
    to: 'framework_indigenous',
    type: 'GUIDES',
    description:
      'The IAF is ethically bound by anti-colonial, consent-based (FPIC 2.0) principles; cultural advice within the framework is explicitly not a substitute for affected-nation consent.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },

  // Bodies the IAF establishes
  {
    from: 'framework_implementation_adaptation',
    to: 'institution_ggf_catalyst',
    type: 'ESTABLISHES',
    description:
      'The IAF charters the Catalyst Team and bounds its role to support, training, and toolkit maintenance (§4.2).',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_implementation_adaptation',
    to: 'platform_community_of_practice',
    type: 'ESTABLISHES',
    description:
      'The IAF constitutes the Community of Practice as a learning custodian with no ranking or gatekeeping function (§4.6).',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_implementation_adaptation',
    to: 'institution_ggf_failure_library',
    type: 'ESTABLISHES',
    description:
      'The IAF constitutes the Failure Library and its consent, withdrawal, and correction obligations (§4.6).',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },

  // Operational interfaces
  {
    from: 'framework_implementation_adaptation',
    to: 'process_community_weaver',
    type: 'USES',
    description:
      'Community Weavers and facilitators carry out trust-building and Stage 0 pre-assessment; facilitation is not representation.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_adaptation',
    to: 'protocol_red_lines_clause',
    type: 'INTEGRATES_WITH',
    description:
      'A Red Lines alert may trigger a pre-authorized technical safe state; legal suspension, rollback, or remedy follows the named competent route, not the IAF (§Red Lines and protective pause).',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },

  // Frameworks the IAF supports in deployment
  // (moved here from cluster.visionary-meta — relationships belong with their `from` entity)
  {
    from: 'framework_implementation_adaptation',
    to: 'institution_baz',
    type: 'SUPPORTS',
    description: 'Supplies BAZ-specific adaptation guides and local fork pathways.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_adaptation',
    to: 'framework_aubi',
    type: 'SUPPORTS',
    description: 'Supplies pilot design and bounded-scaling methodology for AUBI deployments.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_adaptation',
    to: 'framework_justice',
    type: 'SUPPORTS',
    description: 'Supplies deployment and adaptation methodology for justice system reforms.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- framework_implementation_methods_tools ---------------------------
  {
    from: 'framework_implementation_methods_tools',
    to: 'framework_implementation_adaptation',
    type: 'IMPLEMENTS',
    description:
      'Supplies the concrete tools, rubrics, and assessment instruments the IAF pathway calls for. IMT is the tool commons; IAF is the pathway.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_methods_tools',
    to: 'institution_ggf_failure_library',
    type: 'PRODUCES',
    description:
      'Defines the Failure Library and Story Bank practices — protected learning artifacts, consent handling, and withdrawal rights (§15).',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // --- institution_ggf_catalyst -----------------------------------------
  {
    from: 'institution_ggf_catalyst',
    to: 'platform_community_of_practice',
    type: 'SUPPORTS',
    description:
      'The Catalyst Team maintains the platform and facilitator training, but holds no editorial veto over what practitioners publish.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // --- institution_ggf_failure_library ----------------------------------
  {
    from: 'institution_ggf_failure_library',
    to: 'institution_knowledge_commons_ombudsperson',
    type: 'REPORTS_TO',
    description:
      'The Knowledge Commons Ombudsperson is the custodian of record, handling consent, protection, access, and correction disputes.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  }
];
