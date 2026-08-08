// /src/lib/data/schema/cluster.just-transition.ts

import type { GgfEntity, GgfRelationship } from './_types';


/**
 * TIER 1–2: JUST TRANSITION
 * Aegis converts military capability to civilian use; Sundown retires harmful
 * industries without abandoning the people employed by them.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * Aegis v1.3.4 was rewritten as interoperable, non-authorizing interfaces.
 * `institution_gset` is named only once and `council_toc` is absent from the
 * current outline, so both remain flagged for review. Section 8.2 explicitly
 * states that Aegis does not create an Earth Defense Force; EDF is therefore
 * retained only as a retired historical entity.
 */

export const justTransitionEntities: GgfEntity[] = [

  /**
   * TIER 1: JUST TRANSITION CLUSTER
   * === THE AEGIS PROTOCOL === */
  {
    id: 'framework_aegis_protocol',
    type: 'Framework',
    name: 'The Aegis Protocol',
    shortName: 'Aegis Protocol',
    description:
      'Interoperable governance interfaces for security capability transition, civilian planetary service and lawful dual-use conversion: expenditure redirection, facility and research conversion, personnel and regional transition, purpose-limited dual-use custody, and lawful declassification.',
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty',
      'framework_justice',
      'framework_aubi',
      'framework_financial_systems',
      'framework_aurora_accord',
      'framework_meta_gov',
      'framework_synoptic',
      'framework_shield',
      'framework_technology_governance',
      'framework_peace',
      'framework_inner_dev'
    ],
    enables: [
      'institution_gset',
      'institution_cto',
      'council_toc'
    ],
    ui: {
      path: '/frameworks/aegis-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.aegisProtocol',
      emoji: '🛰️',
      slug: 'aegis-protocol',
      group: 'socialFabricJustice',
      outline: {
        version: 'v1.3.5',
        updated: '2026-08-08',
        maturity: 'adversarial',
        standfirst:
          'Converting military capability to civilian use, and saying sixty-four separate times what it cannot do while doing so. Version 1.3.5 covers voluntary expenditure redirection, conversion of defence facilities and research programmes, transition of personnel and defence-dependent regions, purpose-limited dual-use custody, and lawful declassification. It provides interfaces, not commands: nothing here authorizes a deployment, a seizure, or a change to anyone’s security posture.'
      }
    }
  },
  {
    id: 'institution_gset',
    type: 'Institution',
    name: 'Global Security & Exploration Trust',
    shortName: 'GSET',
    description:
      'A multi-stakeholder international trust managing redirected military funds for regenerative and exploratory projects. NOTE: named only once in Aegis v1.3.4, which frames redirection as voluntary and jurisdiction-held rather than trust-managed. Needs confirmation.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aegis_protocol', 'mechanism_gcf']
  },
  {
    id: 'institution_cto',
    type: 'Institution',
    name: 'Capabilities Transition Office',
    shortName: 'CTO',
    description: 'The operational body that repurposes technology and manages AUBI-supported personnel retraining.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aegis_protocol']
  },
  {
    id: 'council_toc',
    type: 'Council',
    name: 'Transparency & Oversight Council',
    shortName: 'TOC',
    description:
      'Independent oversight auditing redirected spending and intelligence, with Indigenous, Youth and GCRSD advisory seats. NOTE: not named in Aegis v1.3.4. Retained pending confirmation that the oversight function survived the v1.3 rewrite.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aegis_protocol']
  },
  {
    id: 'institution_edf',
    type: 'Institution',
    name: 'Earth Defense Force',
    shortName: 'EDF',
    description:
      'Retired historical force concept. Aegis v1.3.4 Section 8.2 explicitly states that the Protocol does not create an Earth Defense Force and instead governs voluntary capability transition and purpose-limited civilian conversion.',
    tier: 1,
    status: 'Retired',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: ['framework_aegis_protocol'],
    retired: {
      by: 'aegis-v1.3.4',
      section: '§8.2',
      date: '2026-08-02'
    },
    establishmentExclusions: [
      { framework: 'framework_aegis_protocol', by: 'aegis-v1.3.4', section: '§8.2' }
    ]
  },

  /**
   * TIER 2: JUST TRANSITION CLUSTER
   * The Sundown Protocol: A Just Transition Framework for Retiring Harmful Industries
   */

  // === CORE FRAMEWORK ===
  {
    id: 'framework_sundown_protocol',
    type: 'Framework',
    name: 'The Sundown Protocol',
    shortName: 'Sundown Protocol',
    description: 'A just transition framework for retiring harmful industries and rebirthing regenerative futures.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Governance',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty', 'council_phc', 'framework_hearthstone', 'framework_aubi', 'framework_shield', 'framework_work_liberation'],
    enables: ['council_global_transition', 'institution_office_just_transition', 'mechanism_legacy_transition_fund'],
    ui: {
      path: '/frameworks/sundown-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.sundownProtocol',
      emoji: '🌇',
      slug: 'sundown-protocol',
      outline: {
        version: 'v2.2',
        updated: '2026-08-08',
        maturity: 'adversarial',
        standfirst:
          'Retiring an industry without abandoning the people inside it: binding sunset timelines paired with a Legacy Transition Fund, worker protections written as a covenant rather than a promise, and a Legacy Council that treats industrial heritage as something to preserve rather than erase. Indigenous Monitoring Teams can halt remediation on traditional lands where consent has been breached — the enforcement teeth sit with the communities affected rather than with the transition authority.'
      }
    }
  },

  // === GOVERNANCE & OPERATIONAL ENTITIES ===
  {
    id: 'council_global_transition',
    type: 'Council',
    name: 'Global Transition Council',
    description: 'Receives PHC directives, sets binding timelines for industry sunsets, and liaises with international bodies.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_sundown_protocol', 'council_phc']
  },
  {
    id: 'institution_office_just_transition',
    type: 'Institution',
    name: 'Office of Just Transition',
    description: 'Manages the end-to-end transition roadmap, from co-creation to decommissioning and remediation.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_sundown_protocol', 'council_global_transition']
  },
  {
    id: 'institution_legacy_council',
    type: 'Institution',
    name: 'Legacy Council',
    description: 'A cultural institution of workers, communities, and Indigenous partners to guide narratives and preserve heritage.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_sundown_protocol']
  },
  {
    id: 'institution_just_transition_swat',
    type: 'Institution',
    name: 'Just Transition SWAT Team',
    description: 'Rapid deployment unit for emergency triage in transition crisis zones.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_sundown_protocol']
  },
  {
    id: 'institution_transition_mediation_corps',
    type: 'Institution',
    name: 'Transition Mediation Corps',
    description: 'Facilitates restorative dialogue and conflict resolution during transition processes.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Justice',
    dependencies: ['framework_sundown_protocol', 'framework_peace']
  },
  {
    id: 'institution_indigenous_monitoring_teams',
    type: 'Institution',
    name: 'Indigenous Monitoring Teams',
    description: 'Indigenous-led teams that monitor remediation on traditional lands and can halt FPIC 2.0 violations.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_sundown_protocol', 'framework_indigenous']
  },
  {
    id: 'institution_transition_innovation_labs',
    type: 'Institution',
    name: 'Transition Innovation Labs',
    description: 'R&D facilities in transitioned regions developing restoration and circular economy technologies.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Economic',
    dependencies: ['framework_sundown_protocol']
  },
  {
    id: 'institution_legacy_assurance_unit',
    type: 'Institution',
    name: 'Legacy Assurance Unit',
    description: 'Conducts decadal audits of transitioned regions to ensure long-term ecological and social well-being.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_sundown_protocol']
  },
  {
    id: 'institution_community_transition_board',
    type: 'Institution',
    name: 'Community Transition Board',
    description: 'Local BAZ-level boards with delegated power over local investment priorities.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['institution_office_just_transition', 'institution_baz']
  },

  // === FINANCIAL MECHANISMS & FUNDS ===
  {
    id: 'mechanism_legacy_transition_fund',
    type: 'EconomicMechanism',
    name: 'Legacy Transition Fund',
    description: 'Governs the Reparations Levy, issues Transition Bonds, and distributes funds for the transition.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Economic',
    dependencies: ['framework_sundown_protocol']
  },
  {
    id: 'mechanism_childrens_future_fund',
    type: 'EconomicMechanism',
    name: 'Children\'s Future Fund',
    description: 'A fund allocated from the Legacy Transition Fund for education and ecological opportunities for children in affected communities.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Economic',
    dependencies: ['mechanism_legacy_transition_fund']
  },
  {
    id: 'mechanism_regional_emergency_reserve',
    type: 'EconomicMechanism',
    name: 'Regional Emergency Reserve',
    description: 'A crisis response fund allocated from the Legacy Transition Fund for Just Transition SWAT Team deployments.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Economic',
    dependencies: ['mechanism_legacy_transition_fund']
  },

  // === PROTOCOLS, PLATFORMS & INITIATIVES ===
  {
    id: 'protocol_worker_community_protection',
    type: 'LegalProtocol',
    name: 'Worker & Community Protection Covenant',
    description: 'Legally guarantees worker protections (income, housing, healthcare) and community investments.',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Justice',
    dependencies: ['framework_sundown_protocol']
  },
  {
    id: 'platform_transition_observatory',
    type: 'Platform',
    name: 'Transition Observatory',
    description: 'A public knowledge platform for sharing data, best practices, and tracking transition progress.',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Technology',
    dependencies: ['framework_sundown_protocol']
  },
  {
    id: 'initiative_transition_ambassadors',
    type: 'Initiative',
    name: 'Transition Ambassadors Program',
    description: 'Trains transitioned workers and community leaders to advocate for just transitions globally.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['institution_office_just_transition']
  },
  {
    id: 'initiative_industrial_knowledge_preservation',
    type: 'Initiative',
    name: 'Industrial Knowledge Preservation Initiative',
    description: 'An initiative to document and archive the technical and operational knowledge of industrial communities.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['institution_legacy_council']
  }
];

export const justTransitionRelationships: GgfRelationship[] = [
  // === RELATIONSHIPS FOR AEGIS PROTOCOL ===

  // === ESTABLISHMENT OF CORE COMPONENTS ===
  { from: 'framework_aegis_protocol', to: 'institution_gset', type: 'ESTABLISHES' },
  { from: 'framework_aegis_protocol', to: 'institution_cto', type: 'ESTABLISHES' },
  { from: 'framework_aegis_protocol', to: 'council_toc', type: 'ESTABLISHES' },

  // === CONNECTIONS TO OTHER GGF FRAMEWORKS ===
  {
    from: 'framework_treaty',
    to: 'framework_aegis_protocol',
    type: 'ENABLES',
    description: 'The Treaty provides the constitutional legitimacy and enforcement backstops (GEM, Reformed UNSC) for the Aegis Protocol.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_shield',
    to: 'framework_aegis_protocol',
    type: 'INTEGRATES_WITH',
    description: 'The Shield Protocol provides the enforcement mechanism for non-compliant actors and tracks illicit spending that undermines Aegis.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_peace',
    to: 'framework_aegis_protocol',
    type: 'INTEGRATES_WITH',
    description: 'The Peace & Conflict Resolution Framework provides GCRSD expertise and reconciliation processes for post-conflict zones engaged by Aegis.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_aegis_protocol',
    type: 'COORDINATES_WITH',
    description: 'Meta-Governance activates the Crisis Interruption Protocol for Aegis and facilitates its regional compacts.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_gset',
    to: 'framework_financial_systems',
    type: 'USES_DATA_FROM',
    description: 'GSET uses the Inter-Currency Translation Layer (ICTL) from the Financial Systems Framework to manage funds.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_toc',
    to: 'institution_dj_tribunal',
    type: 'ESCALATES_TO',
    description: 'The TOC escalates violations and compliance failures to the Digital Justice Tribunal for adjudication.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },

  // === RELATIONSHIPS FOR SUNDOWN PROTOCOL ===

  // === TRIGGER & GOVERNANCE FLOW ===
  { from: 'council_phc', to: 'framework_sundown_protocol', type: 'ACTIVATES', description: 'The PHC issues a binding trigger for an industry sunset based on BHI thresholds, activating the protocol.' },
  { from: 'framework_sundown_protocol', to: 'council_global_transition', type: 'ESTABLISHES', description: 'The framework establishes its primary governing council.' },
  { from: 'council_global_transition', to: 'institution_office_just_transition', type: 'OVERSEES', description: 'The council sets timelines and oversees the operational institution that manages the transition.' },
  { from: 'institution_office_just_transition', to: 'institution_community_transition_board', type: 'ESTABLISHES', description: 'The OJT establishes local boards to ensure community-led decision-making.' },

  // === FINANCIAL FLOWS ===
  { from: 'framework_sundown_protocol', to: 'mechanism_legacy_transition_fund', type: 'ESTABLISHES', description: 'The protocol establishes its primary financial mechanism, funded by a Reparations Levy on legacy industries.' },
  { from: 'mechanism_legacy_transition_fund', to: 'institution_decom_trust', type: 'FUNDS', description: 'The Legacy Transition Fund provides capital to Fossil Fuel Decommissioning Trusts.' },
  { from: 'mechanism_legacy_transition_fund', to: 'mechanism_childrens_future_fund', type: 'FUNDS', description: 'Allocates 5% of its capital to the Children\'s Future Fund.' },
  { from: 'mechanism_legacy_transition_fund', to: 'institution_just_transition_swat', type: 'FUNDS', description: 'Provides emergency funding via the Regional Emergency Reserve.' },
  { from: 'institution_office_just_transition', to: 'institution_transition_innovation_labs', type: 'FUNDS', description: 'Funds R&D labs via the Labor-Driven Innovation Fund.' },

  // === JUSTICE, LABOR & LEGAL INTEGRATION ===
  { from: 'framework_sundown_protocol', to: 'protocol_worker_community_protection', type: 'ESTABLISHES', description: 'The framework\'s core legal guarantee for workers and communities.' },
  { from: 'protocol_worker_community_protection', to: 'institution_dj_tribunal', type: 'ENFORCES', description: 'The Digital Justice Tribunal has jurisdiction to enforce the covenant\'s guarantees.' },
  { from: 'framework_aubi', to: 'protocol_worker_community_protection', type: 'IMPLEMENTS', description: 'AUBI provides the income bridge for workers as guaranteed by the covenant.' },
  { from: 'framework_work_liberation', to: 'protocol_worker_community_protection', type: 'IMPLEMENTS', description: 'Provides the retraining and certification pathways for transitioning workers.' },
  { from: 'institution_transition_mediation_corps', to: 'framework_peace', type: 'IMPLEMENTS', description: 'The corps is certified by and uses methodologies from the Peace & Conflict Resolution Framework.' },

  // === ASSET & LAND TRANSITION ===
  { from: 'framework_sundown_protocol', to: 'framework_hearthstone', type: 'INTEGRATES_WITH', description: 'Decommissioned and remediated assets and land are transferred into Stewardship Trusts under the Hearthstone Protocol.' },
  { from: 'institution_indigenous_monitoring_teams', to: 'framework_indigenous', type: 'IMPLEMENTS', description: 'These teams are the on-the-ground enforcers of the Indigenous Frameworkâ€™s FPIC 2.0 protocols.' },

  // === SECURITY & RESILIENCE ===
  { from: 'framework_shield', to: 'framework_sundown_protocol', type: 'INTEGRATES_WITH', description: 'The Shield Protocol can impose sanctions (e.g., export bans) on non-compliant entities and protect early adopters.' },
  { from: 'framework_sundown_protocol', to: 'framework_migration', type: 'INTEGRATES_WITH', description: 'Offers BAZ Sanctuary Pathways for workers and families displaced during chaotic, unmanaged transitions in non-GGF regions.' },
  { from: 'process_crisis_command', to: 'framework_sundown_protocol', type: 'ACTIVATES', description: 'Can be activated to manage systemic shocks or geopolitical instability arising from a transition.' },

  // === KNOWLEDGE & CULTURAL INTEGRATION ===
  { from: 'framework_sundown_protocol', to: 'platform_transition_observatory', type: 'ESTABLISHES', description: 'The protocol establishes its central knowledge sharing platform.' },
  { from: 'framework_sundown_protocol', to: 'institution_legacy_council', type: 'ESTABLISHES', description: 'The protocol establishes its cultural institution for preserving heritage and guiding narratives.' },
  { from: 'institution_legacy_council', to: 'institution_gimn', type: 'COLLABORATES_WITH', description: 'The Legacy Council partners with the Global Indigenous Media Network to manage and amplify stories from the Global Transition Story Archive.' },

  // --- edges added to resolve isolated entities --------------------------
  {
    from: 'mechanism_legacy_transition_fund',
    to: 'mechanism_regional_emergency_reserve',
    type: 'FUNDS',
    description:
      'Allocates the crisis reserve that pays for Just Transition SWAT deployments.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'mechanism_regional_emergency_reserve',
    to: 'institution_just_transition_swat',
    type: 'FUNDS',
    description: 'Resources emergency triage in transition crisis zones.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_sundown_protocol',
    to: 'institution_legacy_assurance_unit',
    type: 'ESTABLISHES',
    description:
      'Establishes decadal audits of transitioned regions. A transition that looks successful at five years is not the same as one that holds at thirty.',
    strength: 'Medium',
    frequency: 'Occasional',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_legacy_assurance_unit',
    to: 'council_global_transition',
    type: 'AUDITS',
    description: 'Reports long-term ecological and social outcomes back to the council that set the timelines.',
    strength: 'Medium',
    frequency: 'Occasional',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_legacy_council',
    to: 'initiative_industrial_knowledge_preservation',
    type: 'ESTABLISHES',
    description:
      'Documents and archives the technical and operational knowledge of industrial communities before the workforce disperses.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'initiative_industrial_knowledge_preservation',
    to: 'framework_cultural_heritage',
    type: 'COORDINATES_WITH',
    description: 'Industrial heritage is cultural heritage; the preservation methods are shared.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_office_just_transition',
    to: 'initiative_transition_ambassadors',
    type: 'ESTABLISHES',
    description:
      'Trains transitioned workers and community leaders to advocate elsewhere — the most credible advocate for a transition is someone who has already survived one.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'initiative_transition_ambassadors',
    to: 'platform_transition_observatory',
    type: 'INFORMS',
    description: 'Ambassador experience feeds the public knowledge platform.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
