// /src/lib/data/schema/cluster.technology-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: TECHNOLOGY OPERATING SYSTEM
 *
 * Technology Governance is the cross-domain interface; Aethelred and the
 * Fractal Intelligence Accord are the specialized applications sitting on it.
 * TGIF v3.6 §1.3 and §1.4 add a non-authority clause and an explicit ban on
 * framework-to-law conversion — the same pattern as Justice, Aurora and MOS.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * TIER DISAGREEMENT. The Fractal Intelligence Accord v6.0 declares "Tier 1
 * (Global Infrastructure)" in its own front matter; the schema had it at Tier 2.
 * Set to 1 here to match the source, but it changes the outline directory
 * default from `tier-2/` to `tier-1/`, so `ui.outline.dir` is now pinned
 * explicitly. Verify against the repo before merging.
 */

export const technologyOSEntities: GgfEntity[] = [
  // === TIER 1: CORE TECHNOLOGY GOVERNANCE ===
  {
    id: 'framework_technology_governance',
    type: 'Framework',
    // "Implementation" dropped at v3.6
    name: 'Technology Governance Framework',
    shortName: 'TGIF',
    description:
      'Cross-domain interface for technology risk, public-interest standards, community self-determination and lawful intervention. Carries a non-authority clause and an explicit prohibition on framework-to-law conversion: a standard published here does not become a legal obligation by being published here.',
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_aurora_accord', // cluster: data-os
      'protocol_constitutional_interface' // cluster: governance-os
    ],
    enables: ['council_gtc', 'framework_aethelred_accord', 'framework_fractal_intelligence'],
    ui: {
      path: '/frameworks/technology-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.technologyGovernance',
      emoji: '🤖',
      slug: 'technology-governance',
      group: 'humanSocialSystems',
      outline: {
        version: 'v3.6',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'How a community decides what technology it will accept, and on what terms — with an equally careful account of when intervention is lawful and when it is merely tempting. Version 3.6 separates public-interest standards from legal obligation: the framework can define what good practice looks like, but it cannot convert that definition into law, create a regulator, or override a community that declines.'
      }
    }
  },

  // === TIER 2: SPECIALIZED APPLICATIONS ===
  {
    id: 'framework_aethelred_accord',
    type: 'Framework',
    name: 'The Aethelred Accord',
    shortName: 'Aethelred Accord',
    description:
      'Biosafety, genetic rights, biotechnology access and incident preparedness. Treats access and rights as inseparable from containment: a biosafety regime that only restricts, without widening who may benefit, reproduces the inequity it claims to manage.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_technology_governance',
      'framework_aurora_accord', // cluster: data-os
      'framework_justice' // cluster: justice-os
    ],
    ui: {
      path: '/frameworks/aethelred-accord',
      titleKey: 'framework.docs.nav.frameworkTitles.aethelredAccord',
      emoji: '🧬',
      slug: 'aethelred-accord',
      group: 'humanSocialSystems',
      outline: {
        version: 'v1.2.3',
        updated: '2026-08-08',
        maturity: 'adversarial',
        standfirst:
          'Synthetic biology governed as four inseparable problems: keeping dangerous work contained, protecting genetic rights, widening who gets access to the benefits, and being ready when something escapes anyway. Version 1.2.3 clarifies that where biological-risk financial assurance is required, the instrument has to name its competent owner — the Accord can require that a bond or restoration trust exist, but it is not itself the insurer, guarantor, or backstop. The review status is unchanged and stated plainly: this remains a draft awaiting expert, community, Indigenous-nation, scientific, labour, disability-rights, reproductive-rights and legal review, none of which has happened yet.'
      }
    }
  },
  {
    id: 'framework_fractal_intelligence',
    type: 'Framework',
    name: 'Fractal Intelligence Accord',
    shortName: 'FIA',
    description:
      'AGI governance built on five pillars: a Global Compute Commons with hardware subsidiarity, a Contextual Substrate under the Supermodular Labor Protocol, fractal development architecture, alignment economics through risk bonding, and boundary conditions with handoff protocols. Organized around protecting local distinctiveness rather than optimizing global capability.',
    tier: 1,
    // was 'Outline', which is not a valid status value — this never surfaced
    // because tsx strips types without checking them
    status: 'Stable',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_technology_governance'],
    ui: {
      path: '/frameworks/fractal-intelligence-accord',
      titleKey: 'framework.docs.nav.frameworkTitles.fractalIntelligenceAccord',
      emoji: '🌀',
      slug: 'fractal-intelligence-accord',
      group: 'humanSocialSystems',
      outline: {
        // pinned because the entity moved to tier 1 while the outline still
        // lives under tier-2/ in the repo — verify and unpin once aligned
        dir: 'tier-2/fractal-intelligence-accord',
        version: 'v6.0',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'An AGI framework whose stated purpose is not to govern AGI but to protect the conditions for human meaning — which it argues requires texture: diversity in food, shelter, learning and livelihood that industrial monoculture erodes in the name of efficiency. Every mechanism, from Reality Rent to the Autonomy Rule, is meant to increase the variety of human experience rather than reduce it. Version 6.0 is marked final and locked, and includes its own red-team chapter of acknowledged failure modes.'
      }
    }
  },
  {
    id: 'institution_quantum_lab',
    type: 'Institution',
    name: 'Quantum Governance Lab',
    shortName: 'Quantum Lab',
    description:
      'Research and governance institution for emerging quantum technologies: quantum-resistant encryption, computation, and their implications for causality and long-horizon governance.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_technology_governance', 'council_gtc'],
    enables: [
      'framework_deep_time' // cluster: visionary-meta
    ]
  },

  // === TIER 4 ===
  {
    id: 'protocol_weaver',
    type: 'LegalProtocol',
    name: 'The Weaver Protocol',
    shortName: 'Weaver Protocol',
    description:
      'Governance for persistent immersive virtual worlds: avatar rights, ontological sovereignty, cultural consent, and economic justice in synthetic environments.',
    tier: 4,
    status: 'Draft',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: [
      'framework_technology_governance',
      'framework_aurora_accord', // cluster: data-os
      'framework_mos' // cluster: ethical-os
    ]
    // No ui block: outline exists at tier-4/weaver-protocol but is not published.
  },

  // === GOVERNANCE COUNCIL ===
  {
    id: 'council_gtc',
    type: 'Council',
    name: 'Global Technology Council',
    shortName: 'GTC',
    description:
      'Meta-Governance council coordinating across technology frameworks. Standard-setting and coordination; the non-authority clause applies to it as much as to the framework that convenes it.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_technology_governance',
      'framework_meta_gov' // cluster: governance-os
    ]
  }
];

export const technologyOSRelationships: GgfRelationship[] = [
  // --- framework_technology_governance -----------------------------------
  {
    from: 'framework_technology_governance',
    to: 'council_gtc',
    type: 'ESTABLISHES',
    description: 'Establishes the Global Technology Council as its coordination venue.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_technology_governance',
    to: 'protocol_constitutional_interface',
    type: 'DEPENDS_ON',
    description:
      'v3.6 conforms to the Constitutional Interface Specification for decision classes and framework authority boundaries.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_aurora_accord',
    type: 'INTEGRATES_WITH',
    description:
      'Aurora supplies data rights, identity and fiduciary duties; TGIF supplies risk and standards. Neither governs the other.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_justice',
    type: 'COORDINATES_WITH',
    description:
      'Due process, adjudication and remedy interfaces sit with Justice Systems; TGIF does not adjudicate.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_synoptic',
    type: 'COORDINATES_WITH',
    description:
      'Recommender scope, information-system accountability and epistemic rights are held jointly with Synoptic.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_aubi',
    type: 'COORDINATES_WITH',
    description:
      'Non-deprivation floors mean a technology transition cannot be allowed to remove someone\'s material security.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_work_liberation',
    type: 'COORDINATES_WITH',
    description:
      'Labour justice, maintenance work and technological transition are Work in Liberation competences.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_meta_gov',
    type: 'ESCALATES_TO',
    description: 'Cross-domain and institutional disputes route through Meta-Governance.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_aethelred_accord',
    type: 'GUIDES',
    description: 'Parent governance for biotechnology applications.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_fractal_intelligence',
    type: 'GUIDES',
    description: 'Parent governance for AGI and compute infrastructure.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_digital_commons',
    type: 'GUIDES',
    description: 'Sets technical standards for digital commons infrastructure.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_eco_intel',
    type: 'COLLABORATES_WITH',
    description: 'Shared standards for ecological sensing and interpretation systems.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_shield',
    type: 'COORDINATES_WITH',
    description: 'Supplies the cyber defence standards Shield cooperation relies on.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_hearthstone',
    type: 'GUIDES',
    description: 'Technical standards for commons registry infrastructure.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'institution_dj_tribunal',
    type: 'ESCALATES_TO',
    description: 'Technology harms with legal consequence escalate to the Tribunal.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_mos',
    type: 'IMPLEMENTS',
    description:
      'Applies MOS ethical reasoning to technology assessment. §1.4 forbids converting that reasoning into binding obligation.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_technology_governance',
    type: 'GUIDES',
    description:
      'Indigenous data and knowledge sovereignty bound what may be built, trained or deployed.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_technology_governance',
    type: 'FUNDS',
    description: 'The Global Commons Fund resources public-interest technology standards work.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- council_gtc --------------------------------------------------------
  {
    from: 'council_gtc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The GTC is a domain council within the Meta-Governance structure.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gtc',
    to: 'council_earth',
    type: 'COORDINATES_WITH',
    description:
      'Technology decisions touching Indigenous knowledge go through the Earth Council interface.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gtc',
    to: 'framework_fractal_intelligence',
    type: 'OVERSEES',
    description: 'The GTC holds coordination oversight of AGI governance.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gtc',
    to: 'institution_quantum_lab',
    type: 'OVERSEES',
    description: 'The GTC oversees the Quantum Governance Lab.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- framework_aethelred_accord -----------------------------------------
  {
    from: 'framework_aethelred_accord',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description: 'Treaty v1.3 is a named controlling interface for the Accord.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aethelred_accord',
    to: 'framework_global_health',
    type: 'COORDINATES_WITH',
    description:
      'Incident preparedness and biosecurity are shared with the Global Health framework, a named controlling interface.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aethelred_accord',
    to: 'framework_justice',
    type: 'DEPENDS_ON',
    description: 'Justice Systems v1.4 supplies due process and remedy for biosafety violations.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aethelred_accord',
    to: 'framework_aurora_accord',
    type: 'DEPENDS_ON',
    description: 'Genetic data governance runs on Aurora Accord rules.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_aethelred_accord',
    type: 'GUIDES',
    description:
      'Indigenous consent and protected knowledge bound genetic research and benefit-sharing.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aethelred_accord',
    to: 'framework_gaian_trade',
    type: 'INFORMS',
    description: 'Biosafety classification shapes what may move through regenerative trade zones.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aethelred_accord',
    to: 'framework_biodiversity',
    type: 'COORDINATES_WITH',
    description: 'Gene drives and engineered organisms are a biodiversity question first.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- framework_fractal_intelligence -------------------------------------
  {
    from: 'framework_fractal_intelligence',
    to: 'framework_nested_sovereignty',
    type: 'COORDINATES_WITH',
    description:
      'Hardware subsidiarity in the Global Compute Commons is the same subsidiarity argument applied to compute.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_fractal_intelligence',
    to: 'framework_work_liberation',
    type: 'COORDINATES_WITH',
    description:
      'The Supermodular Labor Protocol governs how human contextual work enters model development.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_fractal_intelligence',
    to: 'framework_financial_systems',
    type: 'INTEGRATES_WITH',
    description:
      'Alignment economics through risk bonding requires financial instruments and a reserve the Financial Systems framework defines.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_fractal_intelligence',
    to: 'framework_aurora_accord',
    type: 'COORDINATES_WITH',
    description: 'Training data governance runs on Aurora rules.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_fractal_intelligence',
    to: 'framework_digital_commons',
    type: 'INTEGRATES_WITH',
    description: 'The Compute Commons is a digital commons in the strict sense.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_fractal_intelligence',
    to: 'framework_indigenous',
    type: 'COORDINATES_WITH',
    description:
      'Contextual intelligence depends on local knowledge, which makes consent and non-extraction load-bearing rather than decorative.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_fractal_intelligence',
    to: 'institution_dj_tribunal',
    type: 'ESCALATES_TO',
    description: 'Boundary-condition breaches escalate to the Tribunal.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },

  // --- institution_quantum_lab and protocol_weaver ------------------------
  {
    from: 'institution_quantum_lab',
    to: 'framework_aurora_accord',
    type: 'INFORMS',
    description: 'Supplies quantum-resistant encryption standards to the Accord.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_quantum_lab',
    to: 'framework_deep_time',
    type: 'COLLABORATES_WITH',
    description: 'Quantum causality questions feed long-horizon governance design.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_quantum_lab',
    to: 'institution_dj_tribunal',
    type: 'INFORMS',
    description: 'Advises the Tribunal on quantum-related evidentiary and security questions.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_weaver',
    to: 'framework_technology_governance',
    type: 'DEPENDS_ON',
    description: 'Derives its technical standards and intervention limits from TGIF.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_weaver',
    to: 'framework_aurora_accord',
    type: 'DEPENDS_ON',
    description:
      'Avatar identity, behavioural data and world telemetry are governed as data relationships.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_weaver',
    to: 'framework_mos',
    type: 'DEPENDS_ON',
    description:
      'Ontological sovereignty for synthetic entities is a Dynamic Rights Spectrum question.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  }
];
