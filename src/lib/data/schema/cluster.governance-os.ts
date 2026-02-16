// /src/lib/data/schema/cluster.governance-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: GOVERNANCE OPERATING SYSTEM
 * Meta-Governance: The nervous system coordinating all other frameworks
 */

export const governanceOSEntities: GgfEntity[] = [
  {
    id: 'framework_meta_gov',
    type: 'Framework',
    name: 'Integrated Meta-Governance Framework',
    shortName: 'Meta-Governance',
    description: 'Coordination framework enabling interoperability across governance domains',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    enables: ['council_mgcc', 'process_crisis_command'],
    ui: {
      path: '/frameworks/meta-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.metaGovernance',
      emoji: 'ðŸ›ï¸',
      version: '1.1',
      slug: 'meta-governance'
    }
  },
  {
    id: 'council_mgcc',
    type: 'Council',
    name: 'Meta-Governance Coordination Council',
    shortName: 'MGCC',
    description: 'Primary venue for alignment across governance domains',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov']
  },
  {
    id: 'council_gifc',
    type: 'Council',
    name: 'Global Intelligence & Foresight Council',
    shortName: 'GIF-Council',
    description: 'A specialized meta-level council that synthesizes intelligence from the ERO, GCIC, and Peace Prediction units to create a unified global threat assessment for the MGCC.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_meta_gov',
      'institution_ero', // Assumed ID for Existential Risk Observatory
      'institution_gcic', // Assumed ID for Global Crime Intelligence Center
      'framework_peace'
    ]
  },
  {
    id: 'process_crisis_command',
    type: 'Process',
    name: 'Crisis Command Protocol',
    shortName: 'Crisis Command',
    description: 'Temporary configuration of Meta-Governance councils to manage existential crises',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov']
  },
  {
    id: 'protocol_polycentric',
    type: 'Protocol',
    name: 'Polycentric Coordination',
    shortName: 'Polycentric Coordination',
    description: 'Core principle of sharing power across many centers rather than a single hierarchy',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov']
  },
  {
    id: 'protocol_cross_temporal',
    type: 'Protocol',
    name: 'Cross-Temporal Coordination Protocol',
    shortName: 'Temporal Coordination',
    description: 'A core protocol of the Meta-Governance Framework for harmonizing linear, cyclical, and multi-horizon timeframes across diverse governance systems, enabling effective coordination between institutional and Indigenous frameworks.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov', 'framework_indigenous'],
    // No UI entry needed if it's considered an internal protocol of Meta-Gov, 
    // or it could have its own page.
  },
  {
    id: 'council_global_metrology',
    type: 'Council',
    name: 'Global Metrology Council',
    shortName: 'Metrology Council',
    description: 'A specialized council under the MGCC responsible for overseeing universal metrology governance. Its mandated composition (40% Indigenous/traditional, 30% scientific, 30% Global South) ensures metrics are just, pluralistic, and decolonial. It oversees the Metric Lifecycle Process.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_meta_gov']
  },
  {
    id: 'process_metric_lifecycle',
    type: 'Process',
    name: 'Metric Lifecycle Governance Process',
    shortName: 'Metric Lifecycle',
    description: 'The official GGF process for the proposal, co-development, piloting, standardization, periodic review, and sunsetting of all universal metrics (e.g., BHI, LMCI). This process ensures metrics are ethically designed, culturally relevant, and scientifically robust.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['council_global_metrology']
  },
  {
    id: 'framework_egp',
    type: 'Framework',
    name: "Emergent Governance Protocol (The GGF's Minimum Viable Grammar)",
    shortName: 'EGP / MVG',
    description: "The foundational Tier 1 operational protocol defining the 'Minimum Viable Grammar' (`sense`, `propose`, `adopt`) for all interactions within the GGF ecosystem, enabling decentralized, bottom-up, and adaptive governance.",
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty', 'framework_meta_gov'],
    enables: ['protocol_sense', 'protocol_propose', 'protocol_adopt'],
    ui: {
      path: '/frameworks/emergent-governance-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.emergentGovernanceProtocol', // Note: This titleKey would need to be created
      emoji: 'ðŸ—£ï¸',
      version: '1.0',
      slug: 'emergent-governance-protocol'
    }
  },
  {
    id: 'protocol_sense',
    type: 'Protocol',
    name: 'Sense Protocol',
    description: "The universal EGP system call for any agent (human, AI, sensor) to flag a system stressor and generate a standardized 'stress packet'.",
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_egp']
  },
  {
    id: 'protocol_propose',
    type: 'Protocol',
    name: 'Propose Protocol',
    description: "The universal EGP system call for any agent to suggest a response to a 'sense' signal, including context, test criteria, and a sunset clause.",
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_egp', 'protocol_sense']
  },
  {
    id: 'protocol_adopt',
    type: 'Protocol',
    name: 'Adopt Protocol',
    description: "The universal EGP system call for a community or institution to temporarily implement a proposal as a time-bound experiment.",
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_egp', 'protocol_propose']
  },
  {
    id: 'tool_egp_app',
    type: 'Tool',
    name: 'EGP Prototyping App',
    description: 'A minimum viable app or platform that serves as a reference implementation and experimental environment for the EGP system calls.',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Technology',
    dependencies: ['framework_egp']
  },

  // === POLYCENTRIC GOVERNANCE ARCHITECTURE ===
  {
    id: 'framework_polycentric_governance',
    type: 'Framework',
    name: 'Polycentric Governance Architecture',
    shortName: 'Polycentric Architecture',
    description: 'The constitutional spine providing four-layer overlapping jurisdictions (Territorial/Commons/Guilds/Wisdom Council) that make tyranny logistically impossible through structural redundancy',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty', 'framework_meta_gov'],
    enables: ['layer_territorial', 'layer_commons', 'layer_guilds', 'layer_wisdom_council'],
    ui: {
      path: '/frameworks/polycentric-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.polycentricGovernance',
      emoji: 'ðŸ•¸ï¸',
      version: '0.5',
      slug: 'polycentric-governance'
    }
  },
  {
    id: 'layer_territorial',
    type: 'Institution',
    name: 'Territorial Councils',
    shortName: 'Territorial Layer',
    description: 'BAZ Assemblies managing physical geography, infrastructure, zoning, and local services',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Bioregional',
    implementationPriority: 'Critical',
    dependencies: ['framework_polycentric_governance']
  },
  {
    id: 'layer_commons',
    type: 'Institution',
    name: 'Commons Trusts',
    shortName: 'Commons Layer',
    description: 'Cross-boundary resource governance with Guardian Seats for ecosystem representation',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Ecological',
    geographicScope: 'Bioregional',
    implementationPriority: 'Critical',
    dependencies: ['framework_polycentric_governance']
  },
  {
    id: 'layer_guilds',
    type: 'Institution',
    name: 'Guilds & Syndicates',
    shortName: 'Guilds Layer',
    description: 'Trans-BAZ economic practice governance (Fractal Labor Parliament, Hearts/Leaves rates, professional standards)',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Economic',
    geographicScope: 'Bioregional',
    implementationPriority: 'Critical',
    dependencies: ['framework_polycentric_governance', 'framework_work_liberation']
  },
  {
    id: 'layer_wisdom_council',
    type: 'Council',
    name: 'Indigenous Wisdom Council',
    shortName: 'Wisdom Council',
    description: 'Constitutional layer with veto power over existential risks and Natural Law violations',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Bioregional',
    implementationPriority: 'Critical',
    dependencies: ['framework_polycentric_governance', 'framework_indigenous']
  },
  {
    id: 'mechanism_guardian_seats',
    type: 'Mechanism',
    name: 'Guardian Seats Protocol',
    shortName: 'Guardian Seats',
    description: 'Legal personhood for ecosystems via Guardian representatives with fiduciary duty to regeneration',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Justice',
    implementationPriority: 'High',
    dependencies: ['layer_commons', 'framework_justice']
  },
  {
    id: 'process_circuit_breaker',
    type: 'Process',
    name: 'Circuit Breaker Protocol',
    shortName: 'Circuit Breaker',
    description: 'Sortition-based deadlock resolution with chamber dissolution and interim stewardship',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    implementationPriority: 'High',
    dependencies: ['framework_polycentric_governance']
  },
  {
    id: 'metric_phi',
    type: 'Metric',
    name: 'Polycentric Health Index',
    shortName: 'PHI',
    description: 'Composite metric combining Power Distribution Index, BHI, LMCI, and economic equity',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'High',
    dependencies: ['framework_polycentric_governance', 'metric_bhi', 'metric_lmci']
  },
  {
    id: 'pilot_uppsala_baz',
    type: 'Pilot',
    name: 'Uppsala BAZ Pilot',
    shortName: 'Uppsala Pilot',
    description: 'Swedish municipal pilot: Lake MÃ¤laren Trust, BAZ Assembly, Guild prototypes (2025-2027)',
    tier: 1,
    status: 'Active',
    primaryDomain: 'Governance',
    geographicScope: 'Local',
    implementationPriority: 'Critical',
    dependencies: ['framework_polycentric_governance', 'layer_territorial', 'layer_commons', 'layer_guilds']
  },

  // === INTELLIGENCE & FORESIGHT INFRASTRUCTURE ===
  {
    id: 'institution_ero',
    type: 'Institution',
    name: 'Existential Risk Observatory',
    shortName: 'ERO',
    description: 'Dedicated monitoring institution tracking existential and catastrophic risks across domains (climate tipping points, AI misalignment, pandemic preparedness, nuclear proliferation). Provides continuous risk intelligence to the GIF-Council.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov', 'framework_planetary_immune_system']
  }
];

export const governanceOSRelationships: GgfRelationship[] = [
  // === DEPENDENCIES ON CONSTITUTIONAL LAYER ===
  {
    from: 'framework_treaty',
    to: 'framework_meta_gov',
    type: 'ENABLES',
    description: 'Treaty provides legal foundation for Meta-Governance coordination',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  
  // === INTERNAL GOVERNANCE OS RELATIONSHIPS ===
  {
    from: 'framework_meta_gov',
    to: 'council_mgcc',
    type: 'ESTABLISHES',
    description: 'Meta-Governance framework establishes the MGCC as primary coordination body',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_meta_gov',
    to: 'process_crisis_command',
    type: 'ESTABLISHES',
    description: 'Meta-Governance establishes crisis command protocols for emergency coordination',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_polycentric',
    to: 'council_mgcc',
    type: 'GUIDES',
    description: 'Polycentric coordination principles guide how the MGCC operates',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_crisis_command',
    to: 'institution_gem',
    type: 'ACTIVATES',
    description: 'Crisis Command Protocol can deploy the Global Enforcement Mechanism',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  // === EXTERNAL RELATIONSHIPS ===
  {
    from: 'framework_meta_gov',
    to: 'institution_baz',
    type: 'COORDINATES_WITH',
    description: 'Provides the polycentric coordination protocols for how BAZs can interoperate and form "fractal governance networks" while maintaining sovereignty.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_cross_temporal',
    to: 'framework_deep_time',
    type: 'ENABLES',
    description: 'The foundational principles of cross-temporal coordination are the prerequisite for, and evolve into, the advanced applications of Deep Time & Relativistic Governance.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },

  {
    from: 'council_global_metrology',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The Global Metrology Council is a specialized sub-council that reports to and operates within the Meta-Governance Coordination Council.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_global_metrology',
    to: 'process_metric_lifecycle',
    type: 'OVERSEES',
    description: 'The Metrology Council is the governing body that manages and enforces the Metric Lifecycle Governance Process.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_metric_lifecycle',
    to: 'metric_bhi',
    type: 'GUIDES',
    description: 'The lifecycle process governs the development, validation, and evolution of the Biosphere Health Index.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_metric_lifecycle',
    to: 'metric_lmci',
    type: 'GUIDES',
    description: 'The lifecycle process governs the development, validation, and evolution of the Love, Meaning, and Connection Index.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_hearthstone',
    type: 'INTEGRATES_WITH',
    description: 'Meta-Governance provides the "Emergency Stewardship Protocol" trigger via its Crisis Command Protocol, allowing Hearthstone to secure endangered commons during crises.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  // === GIF-Council Integration Relationships ===
  {
    from: 'council_mgcc',
    to: 'council_gifc',
    type: 'OVERSEES',
    description: 'The Meta-Governance Coordination Council oversees the GIF-Council as a specialized sub-body.',
    strength: 'Strong'
  },
  {
    from: 'council_gifc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The GIF-Council provides synthesized intelligence and unified threat assessments to the MGCC.',
    strength: 'Strong'
  },
  {
    from: 'institution_ero', // From Planetary Immune System
    to: 'council_gifc',
    type: 'PARTICIPATES_IN',
    description: 'The ERO provides existential risk intelligence to the GIF-Council.',
    strength: 'Strong'
  },
  {
    from: 'institution_gcic', // From The Shield Protocol
    to: 'council_gifc',
    type: 'PARTICIPATES_IN',
    description: 'The GCIC provides transnational crime and cybercrime intelligence to the GIF-Council.',
    strength: 'Strong'
  },
  {
    from: 'framework_peace', // Representing its prediction units
    to: 'council_gifc',
    type: 'PARTICIPATES_IN',
    description: 'The Peace Framework provides conflict prediction intelligence to the GIF-Council.',
    strength: 'Strong'
  },

  // === EGP INTERNAL RELATIONSHIPS ===
  {
    from: 'framework_egp',
    to: 'protocol_sense',
    type: 'ESTABLISHES',
    description: 'The EGP framework establishes the `sense` system call as its primary input mechanism.'
  },
  {
    from: 'framework_egp',
    to: 'protocol_propose',
    type: 'ESTABLISHES',
    description: 'The EGP framework establishes the `propose` system call for generating solutions.'
  },
  {
    from: 'framework_egp',
    to: 'protocol_adopt',
    type: 'ESTABLISHES',
    description: 'The EGP framework establishes the `adopt` system call for experimental implementation.'
  },

  // === EGP INTEGRATION WITH GGF CORE ===
  {
    from: 'framework_treaty',
    to: 'framework_egp',
    type: 'ENABLES',
    description: 'The Treaty (Tier 0) provides the constitutional and legal container within which the EGP (Tier 1) can operate safely and effectively.'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_egp',
    type: 'INTEGRATES_WITH',
    description: 'Meta-Governance provides the coordination architecture (the "bazaar") where EGP interactions are processed, while the EGP provides the generative grammar for those interactions.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_egp',
    to: 'framework_meta_gov',
    type: 'GUIDES',
    description: 'The EGP provides the agile, bottom-up operational logic that the Meta-Governance framework is designed to coordinate.'
  },

  // === EGP AS THE UNIVERSAL GRAMMAR FOR OTHER FRAMEWORKS (EXAMPLES) ===
  {
    from: 'framework_egp',
    to: 'framework_cairn_protocol', // Example
    type: 'GUIDES',
    description: "The EGP provides the universal grammar for the Cairn Protocol's operations; for instance, its 'Grief Feedback Pathway' is a specific implementation of the `sense` protocol."
  },
  {
    from: 'framework_egp',
    to: 'framework_shield', // Example
    type: 'GUIDES',
    description: "The EGP guides the Shield Protocol's community interactions, where a BAZ reporting a threat is using the `sense` protocol."
  },
  {
      from: 'tool_egp_app',
      to: 'framework_egp',
      type: 'IMPLEMENTS',
      description: 'The prototyping app serves as the reference implementation and experimental testbed for the EGP.'
  },

  // === POLYCENTRIC GOVERNANCE ARCHITECTURE RELATIONSHIPS ===
  
  // Constitutional Foundation
  {
    from: 'framework_treaty',
    to: 'framework_polycentric_governance',
    type: 'ENABLES',
    description: 'Treaty provides constitutional foundation for polycentric structure',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  
  // Meta-Governance Integration
  {
    from: 'framework_meta_gov',
    to: 'framework_polycentric_governance',
    type: 'ENABLES',
    description: 'Meta-Governance provides coordination protocols; Polycentric Architecture is its structural implementation',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'protocol_polycentric',
    type: 'IMPLEMENTS',
    description: 'Polycentric Architecture is the concrete institutional model of the polycentric coordination principle',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  
  // Four Layers Internal Structure
  {
    from: 'framework_polycentric_governance',
    to: 'layer_territorial',
    type: 'ESTABLISHES',
    description: 'Framework defines Territorial Councils as geography/infrastructure layer',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'layer_commons',
    type: 'ESTABLISHES',
    description: 'Framework defines Commons Trusts as cross-boundary resource layer',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'layer_guilds',
    type: 'ESTABLISHES',
    description: 'Framework defines Guilds/Syndicates as economic practice layer',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'layer_wisdom_council',
    type: 'ESTABLISHES',
    description: 'Framework defines Wisdom Council as constitutional/existential boundary layer',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  
  // Indigenous Framework Integration
  {
    from: 'framework_indigenous',
    to: 'layer_wisdom_council',
    type: 'GUIDES',
    description: 'Indigenous sovereignty framework defines Wisdom Council composition, FPIC 2.0 authority',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'layer_wisdom_council',
    to: 'council_earth',
    type: 'COORDINATES_WITH',
    description: 'Wisdom Councils coordinate with Earth Council for global Indigenous governance',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  
  // Work in Liberation Integration
  {
    from: 'framework_work_liberation',
    to: 'layer_guilds',
    type: 'IMPLEMENTS',
    description: 'Work in Liberation defines operational mechanics for Guilds (FLP, Hearts/Leaves, Community Providers)',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'layer_guilds',
    to: 'layer_territorial',
    type: 'COORDINATES_WITH',
    description: 'Guilds propose Hearts rates, Territorial Assemblies ratify (price-setting handshake)',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  
  // Guardian Seats & Rights of Nature
  {
    from: 'layer_commons',
    to: 'mechanism_guardian_seats',
    type: 'USES',
    description: 'Commons Trusts use Guardian Seats for ecosystem representation',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_guardian_seats',
    to: 'framework_justice',
    type: 'IMPLEMENTS',
    description: 'Guardian Seats implement Rights of Nature/Living Systems Jurisprudence',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  
  // Circuit Breaker Deadlock Resolution
  {
    from: 'process_circuit_breaker',
    to: 'layer_territorial',
    type: 'RESOLVES_CONFLICTS_FOR',
    description: 'Circuit Breaker resolves deadlocks between Territorial, Commons, and Guild layers',
    strength: 'Strong',
    frequency: 'Occasional',
    sequenceType: 'Conditional'
  },
  {
    from: 'process_circuit_breaker',
    to: 'layer_commons',
    type: 'RESOLVES_CONFLICTS_FOR',
    description: 'Circuit Breaker resolves deadlocks between layers',
    strength: 'Strong',
    frequency: 'Occasional',
    sequenceType: 'Conditional'
  },
  {
    from: 'process_circuit_breaker',
    to: 'layer_guilds',
    type: 'RESOLVES_CONFLICTS_FOR',
    description: 'Circuit Breaker resolves deadlocks between layers',
    strength: 'Strong',
    frequency: 'Occasional',
    sequenceType: 'Conditional'
  },
  
  // Metrics Integration
  {
    from: 'metric_phi',
    to: 'metric_bhi',
    type: 'INTEGRATES',
    description: 'PHI incorporates BHI as ecological health component',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'metric_phi',
    to: 'metric_lmci',
    type: 'INTEGRATES',
    description: 'PHI incorporates LMCI as social wellbeing component',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_metric_lifecycle',
    to: 'metric_phi',
    type: 'GUIDES',
    description: 'Lifecycle process governs PHI development and validation',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  
  // Planetary Health Integration
  {
    from: 'council_phc',
    to: 'layer_commons',
    type: 'COORDINATES_WITH',
    description: 'Planetary Health Council coordinates with Commons Trusts on ecosystem boundaries',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_guardian_seats',
    to: 'metric_bhi',
    type: 'USES',
    description: 'Guardian Seats use BHI data for regeneration capacity decisions',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  
  // BAZ Integration
  {
    from: 'layer_territorial',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Territorial Councils are implemented as BAZ Assemblies',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  
  // Swedish Pilot
  {
    from: 'pilot_uppsala_baz',
    to: 'framework_polycentric_governance',
    type: 'TESTS',
    description: 'Uppsala pilot tests polycentric architecture in Swedish municipal context',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'pilot_uppsala_baz',
    to: 'layer_commons',
    type: 'IMPLEMENTS',
    description: 'Lake MÃ¤laren Trust as first Commons Trust pilot',
    strength: 'Strong',
    sequenceType: 'Sequential'
  }
];
