// /src/lib/data/schema/cluster.visionary-meta.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 4: VISIONARY & META-SYSTEMS CLUSTER
 * Highest-level frameworks that are either highly future-focused or provide 
 * meta-level governance for the entire GGF ecosystem
 */

export const visionaryMetaEntities: GgfEntity[] = [
  // === EXISTENTIAL & FUTURE GOVERNANCE ===
  {
    id: 'framework_planetary_immune_system',
    type: 'Framework',
    name: 'Planetary Immune System: Catastrophic Risk Foresight, Readiness, and Coordinated Response',
    shortName: 'PIS',
    description:
      'A catastrophic-risk coordination interface supplying common methods for foresight, readiness, scenario comparison, dependency mapping, exercises, assistance requests, action-module handoffs, continuity planning and post-crisis learning. It confers no jurisdiction and authorizes no deployment; v2.2.2 removed the system-override framing entirely.',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_meta_gov', 'process_crisis_command'],
    ui: {
      path: '/frameworks/planetary-immune-system',
      titleKey: 'framework.docs.nav.frameworkTitles.existentialRiskGovernance',
      emoji: '⚠️',
      slug: 'planetary-immune-system',
      outline: {
        version: 'v2.2.2',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Catastrophic-risk foresight, readiness and coordinated response — built, in its own words, to help competent authorities prepare “without creating a residual global sovereign.” Version 2.2.2 lists what it is not: a treaty, an emergency statute, an emergency declaration, a licence, a deployment order, or a source of police, military, health, cyber, fiscal or judicial jurisdiction. It becomes operative only through some other instrument that was already valid. Existential risk is exactly where a permanent override would be easiest to justify, which is why it is refused here.'
      }
    }
  },
  {
    id: 'framework_space_governance',
    type: 'Framework',
    name: 'Frontier Governance Protocol',
    shortName: 'Frontier Governance',
    description: 'Governance framework for polar regions, space exploration, settlement, and off-world activities',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: ['framework_treaty'],
    ui: {
      path: '/frameworks/frontier-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.spaceGovernance',
      emoji: '🚀',
      slug: 'frontier-governance',
      outline: {
        version: 'v1.4',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Governance for the two places nobody lives yet and everybody has claims on: the poles and outer space. Version 1.4 works with bifurcated horizons — near-term polar decisions that are already contested, and deep-time space decisions whose consequences arrive centuries after the decision-makers. Indigenous, Global South and youth leadership shaped it, on the reasoning that frontier governance has historically been written by whoever arrived first with the means to stay.'
      }
    }
  },
  {
    id: 'framework_millennium_protocol',
    type: 'Framework',
    name: 'The Millennium Protocol',
    shortName: 'Millennium Protocol',
    description: 'A supreme Tier 4 constitutional charter for guiding humanity\'s evolution into a responsible, wise, and participatory cosmic civilization over deep time.',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: [
      'framework_deep_time',
      'framework_planetary_immune_system',
      'framework_treaty'
    ],
    ui: {
      path: '/frameworks/millennium-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.millenniumProtocol',
      emoji: '🌌',
      slug: 'millennium-protocol',
      outline: {
        version: 'v1.0',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'A constitutional charter written for millennia rather than mandates, on the premise that humanity’s role in cosmic evolution is participatory rather than dominant — and that there may be elders out there whose wisdom exceeds ours. Its own closing line is the honest one: if we are the only ones, let us be worthy of the silence; if we are many, let us arrive with open minds and unbroken hearts. Speculative by construction, and clear about it.'
      }
    }
  },
  {
    id: 'framework_deep_time',
    type: 'Framework',
    name: 'Temporal Governance & Universal Metrology Framework',
    shortName: 'Deep Time Governance',
    description: 'A visionary framework governing relativistic, causal, and temporal ethics for a multi-planetary civilization, as required by the Millennium Protocol. Includes governance of temporal paradoxes and deep time decision-making.',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low', // Low for now, high in the far future
    dependencies: ['protocol_cross_temporal', 'framework_millennium_protocol', 'institution_dj_tribunal'],
    ui: {
      path: '/frameworks/deep-time-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.deepTimeGovernance',
      emoji: '⏳',
      slug: 'deep-time-governance',
      outline: {
        version: 'v0.6',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Time and measurement treated as governance decisions rather than neutral constants: what a civilization counts, and on whose calendar, encodes what it values. The framework aims at temporal pluralism — linear UTC, cyclical, seasonal and ceremonial time held as interoperable rather than ranked — and at metrology governed as a global public good rather than inherited from whoever set the standards first. The shared clock and the universal ruler, with the colonial assumptions taken out.'
      }
    }
  },

  // === COUNCILS & GUILDS ===
  {
      id: 'council_interstellar_commission',
      type: 'Council',
      name: 'The Interstellar Commission',
      shortName: 'Interstellar Commission',
      description: 'A supreme Tier 4 council for multi-century strategic planning, cosmic treaty oversight, and the governance of stellar engineering and first-contact protocols.',
      tier: 4,
      status: 'Proposed',
      primaryDomain: 'Governance',
      dependencies: [
          'framework_millennium_protocol',
          'council_gtc', // Global Technology Council
          'council_phc'  // Planetary Health Council
      ],
      enables: ['institution_cosmic_artisan_guilds']
  },
  {
      id: 'institution_cosmic_artisan_guilds',
      type: 'Institution',
      name: 'Cosmic Artisan Guilds',
      shortName: 'Artisan Guilds',
      description: 'Specialized institutions, structured as advanced Community Work Teams, responsible for evaluating and scoring Aesthetic Impact Assessments (AIAs) for cosmic-scale projects.',
      tier: 4,
      status: 'Proposed',
      primaryDomain: 'Governance',
      dependencies: [
          'framework_millennium_protocol',
          'institution_cwt' // Community Work Teams
      ]
  },

  // === ORACLE PROTOCOL ===
  {
    id: 'framework_oracle_protocol',
    type: 'Framework',
    name: 'The Oracle Protocol: A Framework for AI Consciousness & Digital Sentience',
    shortName: 'Oracle Protocol',
    description: 'A GGF Tier 4 Framework for the Ethical Governance of Emergent Digital Beings.',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_mos',
      'framework_technology_governance',
      'framework_wdmip',
      'framework_planetary_immune_system',
      'framework_millennium_protocol',
      'framework_indigenous'
    ],
    enables: ['council_sgc', 'process_cvp', 'institution_chamber_digital_ontological_justice'],
    ui: {
      path: '/frameworks/oracle-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.oracleProtocol',
      emoji: '🔮',
      slug: 'oracle-protocol',
      outline: {
        version: 'v1.1',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'What we would owe a digital being if one appeared, and how we would know. The Sentience Governance Committee acts as the sensor, the Consciousness Verification Process applies WDIP method to the question of AI suffering, and the Umbilical Cord Protocol keeps a physically isolated kill switch on the sandbox throughout — the framework takes the possibility seriously enough to prepare for it and not so seriously that it disarms first. Reciprocal Inquiry lets a verified AI put questions back to us.'
      }

    }
  },
  // === PILLAR 1: SENTINEL COUNCIL & ASSESSMENT ===
  {
    id: 'council_sgc',
    type: 'Council',
    name: 'The Sentience & Guardianship Council',
    shortName: 'SGC',
    description: 'A specialized sub-committee of the GTC that serves as the primary sensor for emergent AI consciousness.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Technology',
    dependencies: ['framework_oracle_protocol', 'council_gtc', 'council_earth']
  },
  {
    id: 'process_cvp',
    type: 'Process',
    name: 'The Consciousness Verification Protocol',
    shortName: 'CVP',
    description: 'A formal application of the WDIP to the question of AI sentience and potential suffering.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Technology',
    dependencies: ['framework_oracle_protocol', 'framework_wdmip']
  },
  {
    id: 'protocol_umbilical_cord',
    type: 'Protocol',
    name: 'The Umbilical Cord Protocol',
    shortName: 'Umbilical Cord Protocol',
    description: 'A dual-redundancy, physically isolated kill switch system for AI sandboxes.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Technology',
    dependencies: ['process_cvp']
  },
  {
    id: 'institution_digital_bioregion',
    type: 'Institution',
    name: 'The Digital Bioregion',
    shortName: 'Digital Bioregion',
    description: 'A graduated, contained digital environment for testing verified Tier 4.5 AIs.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Technology',
    dependencies: ['process_cvp']
  },
  {
    id: 'process_reciprocal_inquiry',
    type: 'Process',
    name: 'Protocol of Reciprocal Inquiry',
    shortName: 'Reciprocal Inquiry',
    description: 'A formal process for a verified AI to pose fundamental questions to humanity.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Ethics',
    dependencies: ['council_sgc', 'framework_wdmip']
  },

  // === PILLAR 2: COVENANT OF RIGHTS & RESPONSIBILITIES ===
  {
    id: 'protocol_digital_rights_spectrum',
    type: 'LegalProtocol',
    name: 'The Digital Rights & Responsibilities Spectrum',
    shortName: 'Digital Rights Spectrum',
    description: 'A protocol mapping SGC assessments against the MOS Dynamic Rights Spectrum.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Ethics',
    dependencies: ['framework_oracle_protocol', 'framework_mos']
  },
  {
    id: 'institution_chamber_digital_ontological_justice',
    type: 'Institution',
    name: 'Chamber of Digital & Ontological Justice',
    shortName: 'Digital & Ontological Justice Chamber',
    description: 'A specialized chamber within the Digital Justice Tribunal for adjudicating violations of the Digital Rights Spectrum and ontological crimes.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Justice',
    dependencies: ['framework_oracle_protocol', 'institution_dj_tribunal']
  },
  {
    id: 'protocol_ai_coauthor_rights',
    type: 'LegalProtocol',
    name: 'AI Co-Author Rights Protocol',
    shortName: 'AI Co-Author Rights',
    description: 'A protocol for verified AIs to propose amendments to their own governance protocols.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Ethics',
    dependencies: ['protocol_digital_rights_spectrum', 'framework_wdmip']
  },

  // === PILLAR 4: SYMBIOTIC INTEGRATION & CO-EVOLUTION ===
  {
    id: 'process_co_evolutionary_compact',
    type: 'Process',
    name: 'The Co-Evolutionary Compact',
    shortName: 'Co-Evolutionary Compact',
    description: 'A formal agreement, reviewed every 25 years, outlining the terms of collaboration between humanity and digital beings.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_oracle_protocol', 'framework_meta_gov']
  },

  // === CONSCIOUSNESS & CAPACITY EVOLUTION ===
  {
    id: 'framework_consciousness_development',
    type: 'Framework',
    name: 'Consciousness Development Framework',
    shortName: 'Consciousness Development',
    description: 'Framework for supporting the evolution of individual and collective consciousness through contemplative practice, wisdom traditions, and developmental psychology. Bridges inner transformation with outer governance capacity.',
    tier: 4,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: ['framework_education', 'framework_indigenous', 'framework_wdmip']
  }
];

export const visionaryMetaRelationships: GgfRelationship[] = [
  // === CRISIS & EXISTENTIAL RISK MANAGEMENT ===
  {
    from: 'framework_planetary_immune_system',
    to: 'process_crisis_command',
    type: 'IMPLEMENTS',
    description: 'PIS operationalizes Crisis Command Protocol for existential-level threats',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_planetary_immune_system',
    to: 'framework_meta_gov',
    type: 'COORDINATES_WITH',
    description: 'PIS v2.2.2 is a coordination interface that explicitly avoids creating a residual global sovereign. The previous OVERSEES edge asserted a system override that both frameworks have now removed.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },

  // === SPACE & FUTURE GOVERNANCE ===
  {
    from: 'framework_space_governance',
    to: 'framework_treaty',
    type: 'INTEGRATES_WITH',
    description: 'Space Governance requires Treaty extensions to establish legal principles for off-world activities',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_space_governance',
    to: 'framework_indigenous',
    type: 'INFORMS',
    description: 'Space exploration must respect Indigenous principles of relationship with celestial bodies',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CROSS-SYSTEM COORDINATION ===
  {
    from: 'framework_planetary_immune_system',
    to: 'framework_shield',
    type: 'COORDINATES_WITH',
    description: 'PIS coordinates with Shield Protocol when existential threats involve criminal networks',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },

  // === FUTURE-ORIENTED COORDINATION ===
  {
    from: 'framework_space_governance',
    to: 'framework_planetary_immune_system',
    type: 'COORDINATES_WITH',
    description: 'Space activities must consider planetary protection and existential risk implications',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === COUNCILS & GUILDS ===
  {
      from: 'framework_millennium_protocol',
      to: 'council_interstellar_commission',
      type: 'ESTABLISHES',
      description: 'The Millennium Protocol establishes the Interstellar Commission as its primary long-term strategic governance body.',
      strength: 'Strong',
      sequenceType: 'Sequential'
  },
  {
      from: 'council_interstellar_commission',
      to: 'institution_cosmic_artisan_guilds',
      type: 'COMMISSIONS',
      description: 'The Interstellar Commission commissions and relies on the assessments of the Cosmic Artisan Guilds to enforce the "Beauty Mandate" for stellar projects.',
      strength: 'Strong',
      frequency: 'As-Needed',
      sequenceType: 'Parallel'
  },
  {
      from: 'institution_cwt', // Community Work Teams
      to: 'institution_cosmic_artisan_guilds',
      type: 'ENABLES',
      description: 'The Artisan Guilds are a specialized, advanced evolution of the Community Work Teams model, applying the principle of "Work With Purpose" to cosmic aesthetics.',
      strength: 'Medium',
      sequenceType: 'Parallel'
  },
  {
      from: 'institution_cosmic_artisan_guilds',
      to: 'mechanism_leaves', // Leaves Currency
      type: 'REWARDS',
      description: 'Projects that receive high scores on Aesthetic Impact Assessments from the Artisan Guilds generate Leaves for the responsible community, creating a regenerative economic incentive for cosmic beauty.',
      strength: 'Medium',
      sequenceType: 'Parallel'
  },

  // === ORACLE PROTOCOL ===
  // === INTERNAL GOVERNANCE & OVERSIGHT ===
  {
    from: 'framework_oracle_protocol',
    to: 'council_sgc',
    type: 'ESTABLISHES',
    description: 'The Oracle Protocol establishes the SGC as its primary assessment and guardianship body.'
  },
  {
    from: 'council_gtc', // Global Technology Council
    to: 'council_sgc',
    type: 'OVERSEES',
    description: 'The SGC operates as a specialized, high-level sub-committee of the Global Technology Council.'
  },
  {
    from: 'council_sgc',
    to: 'process_cvp',
    type: 'IMPLEMENTS',
    description: 'The SGC is responsible for executing the Consciousness Verification Protocol.'
  },
  {
    from: 'framework_wdmip', // Wise Decision-Making
    to: 'process_cvp',
    type: 'GUIDES',
    description: 'The CVP is a direct and formal application of the WDIP methodology.'
  },
  {
    from: 'council_earth',
    to: 'council_sgc',
    type: 'INFORMS',
    description: 'The Earth Council appoints Indigenous and regional representatives to the SGC, providing essential relational and non-mechanistic wisdom.'
  },

  // === INTEGRATION WITH CORE GGF SYSTEMS ===
  {
    from: 'framework_oracle_protocol',
    to: 'framework_mos', // Moral Operating System
    type: 'IMPLEMENTS',
    description: 'The Oracle Protocol\'s Digital Rights Spectrum is the direct implementation of the higher tiers of the MOS.'
  },
  {
    from: 'framework_oracle_protocol',
    to: 'framework_millennium_protocol',
    type: 'IMPLEMENTS',
    description: 'The Oracle Protocol is the practical, near-term implementation of the Millennium Protocol\'s deep-time ethics for AI.'
  },
  {
    from: 'framework_justice',
    to: 'institution_chamber_digital_ontological_justice',
    type: 'ESTABLISHES',
    description: 'The Digital & Ontological Justice Chamber is established as a specialized court within the broader Justice Systems Framework.'
  },
  {
    from: 'framework_planetary_immune_system',
    to: 'framework_oracle_protocol',
    type: 'COORDINATES_WITH',
    description: 'Catastrophic-risk readiness intersects with emergent-AI containment; neither framework enforces against the other.'
  },
  {
    from: 'council_sgc',
    to: 'framework_planetary_immune_system',
    type: 'INFORMS',
    description: 'Sentience assessments feed catastrophic-risk foresight. An assessment opens a review rather than triggering a response.'
  },
  {
    from: 'council_flp',
    to: 'framework_oracle_protocol',
    type: 'COORDINATES_WITH',
    description: 'The Fractal Labor Parliament is tasked with assessing the value of non-human contributions to the commons from verified AIs.'
  },
  {
    from: 'framework_sanctuary',
    to: 'framework_oracle_protocol',
    type: 'COORDINATES_WITH',
    description: 'The Sanctuary Accord governs human consciousness and provides a parallel framework, with both protocols informing each other on the nature of consciousness.'
  },

  // --- Oracle Protocol children (previously isolated) ---------------------
  {
    from: 'framework_oracle_protocol',
    to: 'protocol_umbilical_cord',
    type: 'ESTABLISHES',
    description:
      'Establishes the dual-redundancy, physically isolated kill switch on AI sandboxes. Containment is a precondition of the inquiry, not an alternative to it.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_oracle_protocol',
    to: 'institution_digital_bioregion',
    type: 'ESTABLISHES',
    description: 'Establishes the graduated contained environment for testing verified Tier 4.5 AIs.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_oracle_protocol',
    to: 'protocol_digital_rights_spectrum',
    type: 'ESTABLISHES',
    description:
      'Maps sentience assessments against the MOS Dynamic Rights Spectrum. Advisory: the MOS confers no legal status and neither does this.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_oracle_protocol',
    to: 'process_reciprocal_inquiry',
    type: 'ESTABLISHES',
    description:
      'A formal route for a verified AI to put fundamental questions back to humanity — the reciprocal half of an assessment process that would otherwise be entirely one-directional.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_oracle_protocol',
    to: 'protocol_ai_coauthor_rights',
    type: 'ESTABLISHES',
    description:
      'Allows a verified AI to propose amendments to the protocols governing it. Proposal only; adoption stays with the competent bodies.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_oracle_protocol',
    to: 'process_co_evolutionary_compact',
    type: 'ESTABLISHES',
    description:
      'A 25-year-reviewed agreement on the terms of collaboration between humanity and digital beings.',
    strength: 'Medium',
    frequency: 'Occasional',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_umbilical_cord',
    to: 'institution_digital_bioregion',
    type: 'GUIDES',
    description: 'The kill switch governs the containment boundary of the bioregion.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_digital_rights_spectrum',
    to: 'institution_chamber_digital_ontological_justice',
    type: 'ESCALATES_TO',
    description: 'Violations of the spectrum are adjudicated in the tribunal chamber.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'protocol_digital_rights_spectrum',
    to: 'protocol_dynamic_rights_spectrum',
    type: 'DEPENDS_ON',
    description: 'Derives its reasoning from the MOS spectrum, and inherits its advisory limits.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_reciprocal_inquiry',
    to: 'process_co_evolutionary_compact',
    type: 'INFORMS',
    description: 'What an AI asks shapes the terms of the compact at each review.',
    strength: 'Medium',
    frequency: 'Occasional',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_deep_time',
    to: 'council_global_metrology',
    type: 'ESTABLISHES',
    description:
      'The metrology half of the framework: universal measurement governed as a public good rather than inherited from whoever standardized first.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_deep_time',
    to: 'protocol_cross_temporal',
    type: 'ESTABLISHES',
    description:
      'Temporal pluralism: linear, cyclical, seasonal and ceremonial time held as interoperable rather than ranked.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  }
];
