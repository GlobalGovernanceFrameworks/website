// /src/lib/data/schema/cluster.social-equity.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 3: SOCIAL EQUITY & INCLUSION CLUSTER
 * Frameworks ensuring deep equity, inclusion, and intersectional justice
 * Embeds principles of intersectional justice directly into the GGF architecture
 */

export const socialEquityEntities: GgfEntity[] = [
  // === CORE FRAMEWORKS ===
  {
    id: 'framework_social_fabric',
    type: 'Framework',
    name: 'The Social Fabric Framework: Weaving the Foundational Infrastructure for Regenerative Communities',
    shortName: 'Social Fabric Framework',
    description: 'A modular, context-aware social technology for building trust, healing collective trauma, and fostering the social cohesion necessary for regenerative governance.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Governance',
    dependencies: ['framework_indigenous', 'framework_mental_health', 'framework_justice'],
    enables: ['process_community_weaver', 'institution_cohesion_council', 'framework_aubi', 'framework_meta_gov'],
    ui: {
      path: '/frameworks/social-fabric-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.socialFabric', // This would need to be added to frameworkNav.js
      emoji: '🧶',
      slug: 'social-fabric-protocol',
      group: 'humanSocialSystems',
      outline: {
        version: 'v1.0',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Phase Zero: the social groundwork that has to exist before AUBI, Meta-Governance or anything else can land. Trust, repaired collective trauma, and enough cohesion that a community can hold a disagreement without fracturing. Version 1.0 is modular and context-aware by design, because the same weaving process has to work in a stable town and a crisis zone, and a framework that only works in the easy case is not infrastructure.'
      }
    }
  },
  {
    id: 'framework_cairn_protocol',
    type: 'Framework',
    name: 'The Cairn Protocol',
    shortName: 'Cairn Protocol',
    description: 'A framework for addiction, recovery, and substance sovereignty, grounded in reparative justice and community-led care.',
    tier: 2, // NOTE: While this is a Tier 2 framework, it is clustered here for thematic coherence with social equity.
    status: 'Review',
    primaryDomain: 'Health',
    implementationPriority: 'High',
    dependencies: ['framework_mental_health', 'framework_kintsugi_protocol', 'framework_justice', 'framework_aubi', 'framework_indigenous'],
    enables: ['council_cairn', 'institution_recovery_hub', 'protocol_substance_sovereignty_declaration'],
    ui: {
      path: '/frameworks/cairn-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.cairnProtocol',
      emoji: '🗿', // Cairn/Moai emoji
      slug: 'cairn-protocol',
      group: 'socialFabricJustice',
      outline: {
        version: 'v2.6',
        updated: '2026-08-02',
        maturity: 'adversarial',
        standfirst:
          'Addiction treated as a relationship between a person, a substance and the conditions around them — with substance sovereignty as the organizing right and Recovery Hubs run by people who have been through it. Version 2.6 funds the whole thing through a levy on the corporations that engineer addictive products, which is both the moral argument and the fiscal one. Its status line still reads Implementation-Ready Draft.'
      }
    }
  },
  {
    id: 'framework_disability',
    type: 'Framework',
    name: 'Foundation Protocol: Universal Access & Disability Justice',
    shortName: 'Disability Justice',
    description: 'Framework ensuring full inclusion and rights for persons with disabilities',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_justice', 'framework_aubi'],
    enables: ['institution_gda', 'tool_dia', 'institution_care_coops'],
    ui: {
      path: '/frameworks/foundation-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.disabilityRightsAndInclusion',
      emoji: '♿',
      slug: 'foundation-protocol',
      group: 'humanSocialSystems',
      outline: {
        version: 'v3.0',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Access designed in from the start rather than retrofitted after complaint, with disabled-led Care Coops as compensated institutions rather than voluntary support groups. Version 3.0 adds layered economics — the recognition that disability produces both reduced income and increased costs, and that a flat benefit addresses neither well. Disability Impact Assessments apply to every GGF policy, not to the ones someone remembers to check.'
      }
    }
  },
  {
    id: 'framework_gender',
    type: 'Framework',
    name: 'Kinship Protocol: Gender & Intersectional Justice',
    shortName: 'Kinship Protocol',
    description: 'Framework ensuring gender equality and LGBTQ+ rights with intersectional approach. Employs anti-reification design: identity-specific legal protections where persecution is identity-targeted, with progressive shift toward function-based framing for governance and economic mechanisms. Includes Relational Infrastructure for kinship formation.',
    tier: 3,
    status: 'Stable',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_justice'],
    enables: ['council_gkjc', 'process_transition_transcendence_wg', 'metric_category_dependency_ratio', 'metric_relational_wellbeing'],
    ui: {
      path: '/frameworks/kinship-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.kinshipProtocol',
      emoji: '🫂',
      slug: 'kinship-protocol',
      outline: {
        version: 'v2.3',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'A justice framework built to make itself unnecessary. Identity-specific protections are real and load-bearing now, but every quota and category carries a decadal sunset review, and the Category Dependency Ratio tracks how much support still flows through identity-targeted rather than function-targeted mechanisms. The intended direction is toward the second. Most equity frameworks entrench the categories they defend; this one schedules its own examination.'
      }
    }
  },
  {
    id: 'framework_youth',
    type: 'Framework',
    name: 'Horizon Protocol: An Intergenerational Bridge',
    shortName: 'Youth & Future Gens',
    description: 'Framework for youth engagement and intergenerational equity',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_meta_gov'],
    enables: ['institution_gya', 'process_iia', 'institution_gof'],
    ui: {
      path: '/frameworks/horizon-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.youthAndIntergenerationalGovernance',
      emoji: '👶',
      slug: 'horizon-protocol',
      outline: {
        version: 'v3.0',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Not protection or consultation but institutional power: youth holding binding seats and voting on decisions whose consequences they will actually live through. Version 3.0 adds Shadow Governance for the interval before any of that exists — audits, public scorecards and accountability forums that build a constituency and train a cohort while the formal structures are still hypothetical. Reciprocal Mentorship Pods run in both directions.'
      }
    }
  },
  {
    id: 'framework_elder',
    type: 'Framework',
    name: 'Legacy Protocol: An Intergenerational Justice Framework',
    shortName: 'Elder Justice',
    description: 'Framework for supporting aging populations and integrating elder wisdom',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_global_health', 'framework_meta_gov'],
    enables: ['council_coe'],
    ui: {
      path: '/frameworks/legacy-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.agingPopulationSupportGovernance',
      emoji: '🌳',
      slug: 'legacy-protocol',
      outline: {
        version: 'v2.1',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Ageing framed as accumulating standing rather than losing it: elder-led rather than elder-serving, with the Council of Elders holding advisory weight on long-horizon questions where having watched something fail before is the relevant qualification. Care Coops and the Love Ledger make the care work around ageing visible and compensated, which is where most elder-justice policy quietly fails.'
      }
    }
  },
  {
    id: 'framework_migration',
    type: 'Framework',
    name: 'Migration & Human Mobility Framework',
    shortName: 'Migration',
    description: 'Equitable migration governance and rights protection for people in motion, including specific Climate Migration and Sanctuary Protocols guided by Indigenous hospitality principles.',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_justice', 'framework_global_health'],
    enables: ['council_pmc', 'protocol_gmp', 'protocol_crv', 'process_es_migration'],
    ui: {
      path: '/frameworks/migration-and-human-mobility',
      titleKey: 'framework.docs.nav.frameworkTitles.migrationAndHumanMobility',
      emoji: '🗺️',
      slug: 'migration-and-human-mobility',
      group: 'socialFabricJustice',
      outline: {
        version: 'v1.1.1',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Mobility, displacement, asylum, reception, return and host-community coordination held in one frame, because separating them is how people fall through. Climate Resilience Visas trigger on IPCC thresholds rather than on a discretionary humanitarian judgment made after the fact. Version 1.1.1 is a controlled successor conformed to the cluster record profile — the mechanics of who owes what to whom, written before the crisis rather than during it.'
      }
    }
  },

  // === GOVERNANCE COUNCILS ===
  {
    id: 'council_cairn',
    type: 'Council',
    name: 'The Cairn Council',
    description: 'A sub-council of the Planetary Health Council, with 60% representation from people with lived experience, overseeing global addiction and recovery strategy.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Health',
    dependencies: ['framework_cairn_protocol', 'council_phc']
  },
  {
    id: 'council_gkjc',
    type: 'Council',
    name: 'Gender & Kinship Justice Council',
    shortName: 'GKJC',
    description: 'Specialized Meta-Governance council setting global standards for gender and LGBTQ+ equity. All composition quotas subject to decadal sunset review by the Transition & Transcendence Working Group.',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_gender', 'framework_meta_gov']
  },
  {
    id: 'council_coe',
    type: 'Council',
    name: 'Council of Elders',
    shortName: 'CoE',
    description: 'High-level advisory body within Meta-Governance providing long-term perspective and wisdom',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_elder', 'framework_meta_gov']
  },
  {
    id: 'council_pmc',
    type: 'Council',
    name: 'Planetary Migration Council',
    shortName: 'PMC',
    description: 'Meta-Governance council with 50% migrant representation, responsible for global migration policy',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_migration', 'framework_meta_gov']
  },

  // === SPECIALIZED INSTITUTIONS ===
  {
    id: 'institution_recovery_research_hub',
    type: 'Institution',
    name: 'Recovery Research Hub',
    description: 'An Indigenous-led research body, embedded in the Community Safety Observatory, that collects and analyzes outcomes data for recovery initiatives.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Health',
    dependencies: ['framework_cairn_protocol', 'institution_community_safety_observatory']
  },
  {
    id: 'institution_recovery_hub',
    type: 'Institution',
    name: 'BAZ-Level Recovery Hubs',
    shortName: 'Recovery Hubs',
    description: 'Decentralized, community-run centers providing harm reduction, peer support, and connections to GGF services.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Health',
    dependencies: ['framework_cairn_protocol', 'institution_baz']
  },
  {
    id: 'institution_design_justice_tribunal',
    type: 'Institution',
    name: 'Design Justice Tribunals',
    description: 'A specialized chamber of the Digital Justice Tribunal that adjudicates cases of predatory, addictive-by-design products.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Justice',
    dependencies: ['framework_cairn_protocol', 'institution_dj_tribunal']
  },
  {
    id: 'institution_gda',
    type: 'Institution',
    name: 'Global Disability Alliance',
    shortName: 'GDA',
    description: 'Cross-cutting caucus within Meta-Governance holding seats on all major councils to ensure disability justice',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_disability', 'framework_meta_gov']
  },
  {
    id: 'institution_gya',
    type: 'Institution',
    name: 'Global Youth Assembly (Youth Caucus)',
    shortName: 'GYA Youth Caucus',
    description: 'Formal caucus within Meta-Governance for selecting youth delegates to all councils',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_youth', 'framework_meta_gov']
  },
  {
    id: 'institution_care_coops',
    type: 'Institution',
    name: 'Care Cooperatives',
    shortName: 'Care Coops',
    description: 'Disabled-led Community Work Teams focused on collective care, funded via AUBI',
    tier: 3,
    status: 'Pilot',
    primaryDomain: 'Economic',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_disability', 'framework_aubi', 'framework_work_liberation']
  },
  {
    id: 'institution_gof',
    type: 'Institution',
    name: 'Guardians of the Future',
    shortName: 'GoF',
    description: 'BAZ-led ombudsman offices with legal standing to challenge policies on behalf of future generations',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_youth', 'institution_baz']
  },
  {
    id: 'institution_ge_ombudsperson',
    type: 'Institution',
    name: 'Global Equity Ombudsperson',
    shortName: 'GE Ombudsperson',
    description: 'Treaty institution investigating and addressing grievances related to systemic inequity',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_treaty', 'framework_justice']
  },
  {
    id: 'institution_cohesion_council',
    type: 'Institution',
    name: 'Community Cohesion Council',
    shortName: 'Cohesion Council',
    description: 'An entry-level, community-led governance body focused on monitoring and nurturing relational health, serving as a precursor to a full BAZ Council.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_social_fabric']
  },
  {
    id: 'institution_weaver_ombud',
    type: 'Institution',
    name: 'Weaver Ombud',
    shortName: 'Weaver Ombud',
    description: 'An independent reviewer for grievances related to the Weaver process, ensuring accountability and ethical practice.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    dependencies: ['framework_social_fabric']
  },

  // === PROCESSES, PROTOCOLS & TOOLS ===
  {
    id: 'process_recovery_weaver',
    type: 'Process',
    name: 'Recovery Weavers',
    description: 'The role of trained community members with lived experience who provide outreach, crisis support, and peer guidance.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Health',
    dependencies: ['framework_cairn_protocol']
  },
  {
    id: 'protocol_substance_sovereignty_declaration',
    type: 'LegalProtocol',
    name: 'The Declaration of Substance Sovereignty',
    description: 'A foundational charter asserting the rights to bodily autonomy, sacred plant access, and protection from predatory design.',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Justice',
    dependencies: ['framework_cairn_protocol']
  },
  {
    id: 'mechanism_corporate_harm_levy',
    type: 'EconomicMechanism',
    name: 'Corporate Harm Levy',
    description: 'A tax on the profits of corporations that create and market addictive products, used to fund the GCF for recovery initiatives.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Economic',
    dependencies: ['framework_cairn_protocol', 'framework_pathfinder_protocol']
  },
  {
    id: 'tool_dia',
    type: 'Tool',
    name: 'Disability Impact Assessments',
    shortName: 'DIAs',
    description: 'Mandatory assessments for all new GGF policies to ensure accessibility and justice',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_disability']
  },
  {
    id: 'process_iia',
    type: 'Process',
    name: 'Intergenerational Impact Assessments',
    shortName: 'IIAs',
    description: 'Mandatory assessments evaluating the 50+ year impacts of new policies',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_youth']
  },
  {
    id: 'protocol_gmp',
    type: 'LegalProtocol',
    name: 'Global Mobility Passport',
    shortName: 'GMP',
    description: 'Blockchain-based digital identity for migrants, integrated with the Love Ledger',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_migration', 'platform_love_ledger']
  },
  {
    id: 'protocol_crv',
    type: 'LegalProtocol',
    name: 'Climate Resilience Visas',
    shortName: 'CRV',
    description: 'Legal, temporary relocation rights automatically triggered by IPCC climate thresholds',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_migration', 'process_crisis_command']
  },
  {
    id: 'process_es_migration',
    type: 'Process',
    name: 'Ecological Stewardship Migration',
    shortName: 'ES Migration',
    description: 'Regenerative resettlement programs where migrants contribute to ecosystem restoration in BAZs',
    tier: 3,
    status: 'Pilot',
    primaryDomain: 'Justice',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_migration', 'institution_baz']
  },
  {
    id: 'tool_cohesion_metrics_pack',
    type: 'DataMetric',
    name: 'Cohesion Metrics Pack',
    shortName: 'Cohesion Metrics',
    description: 'Dashboard and measurement toolkit for tracking social cohesion via LMCI, network metrics, equity indicators, and Triangulation Protocol (narrative, observational, and behavioral validation).',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Governance',
    dependencies: ['framework_social_fabric']
  },
  {
    id: 'mechanism_cohesion_seed_grant',
    type: 'EconomicMechanism',
    name: 'Social Cohesion Seed Grant',
    shortName: 'Cohesion Seed Grant',
    description: 'A GCF-funded grant with performance-based tranches to provide initial resources for community weaving activities.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Economic',
    dependencies: ['framework_social_fabric', 'mechanism_gcf']
  },

  // === KINSHIP PROTOCOL 2.3: ANTI-REIFICATION MECHANISMS ===
  {
    id: 'process_transition_transcendence_wg',
    type: 'Process',
    name: 'Transition & Transcendence Working Group',
    shortName: 'TTWG',
    description: 'Standing committee within the GKJC conducting decadal reviews of identity-based quotas and categories, developing functional and relational alternatives, and monitoring for reification dynamics where protective categories create perverse incentives. Reports publicly every 5 years.',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_gender', 'council_gkjc']
  },
  {
    id: 'metric_category_dependency_ratio',
    type: 'DataMetric',
    name: 'Category Dependency Ratio',
    shortName: 'CDR',
    description: 'Tracks the proportion of economic support flowing through identity-targeted vs. function-targeted mechanisms. Goal: progressive shift toward functional framing as conditions allow.',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    dependencies: ['framework_gender', 'process_transition_transcendence_wg']
  },
  {
    id: 'metric_relational_wellbeing',
    type: 'DataMetric',
    name: 'Relational Wellbeing Index',
    shortName: 'RWI',
    description: 'Composite metric measuring loneliness, community belonging, partnership satisfaction, and multi-generational connection across all demographics. Tracks effectiveness of Relational Infrastructure programs.',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Health',
    geographicScope: 'Global',
    dependencies: ['framework_gender', 'framework_social_fabric']
  }

];

export const socialEquityRelationships: GgfRelationship[] = [
  // === INTRA-CLUSTER INTERSECTIONAL INTEGRATION ===
  {
    from: 'framework_youth',
    to: 'framework_elder',
    type: 'COLLABORATES_WITH',
    description: 'Youth and Elder frameworks linked through Reciprocal Mentorship and Intergenerational Councils',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_disability',
    to: 'framework_gender',
    type: 'INTEGRATES_WITH',
    description: 'Disability Justice ensures gender-affirming care is accessible to disabled individuals',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gender',
    to: 'framework_disability',
    type: 'INFORMS',
    description: 'Gender & Kinship layer provides intersectional analysis, centering disabled BIPOC and queer people',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_gda',
    to: 'council_gkjc',
    type: 'COORDINATES_WITH',
    description: 'Global Disability Alliance caucus coordinates with Gender & Kinship Justice Council on intersectional issues',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO META-GOVERNANCE ===
  {
    from: 'council_gkjc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'Gender & Kinship Justice Council operates within Meta-Governance architecture',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_gda',
    to: 'council_mgcc',
    type: 'INFORMS',
    description: 'Global Disability Alliance acts as cross-cutting caucus, holding seats and providing input to all Meta-Governance councils',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_gya',
    to: 'council_mgcc',
    type: 'IMPLEMENTS',
    description: 'GYA Youth Caucus is mechanism for selecting youth delegates to all Meta-Governance councils',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_coe',
    to: 'council_mgcc',
    type: 'INFORMS',
    description: 'Council of Elders provides wisdom and long-term perspective to all Meta-Governance councils',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_pmc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'Planetary Migration Council operates within Meta-Governance architecture',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === FRAMEWORK ESTABLISHMENT OF INSTITUTIONS & TOOLS ===
  {
    from: 'framework_disability',
    to: 'institution_gda',
    type: 'ESTABLISHES',
    description: 'Disability Justice framework establishes Global Disability Alliance as cross-cutting caucus',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_disability',
    to: 'tool_dia',
    type: 'ESTABLISHES',
    description: 'Disability Justice framework mandates Disability Impact Assessments for all policies',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_disability',
    to: 'institution_care_coops',
    type: 'ESTABLISHES',
    description: 'Disability Justice framework establishes Care Cooperatives as disabled-led institutions',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_youth',
    to: 'process_iia',
    type: 'ESTABLISHES',
    description: 'Youth framework mandates Intergenerational Impact Assessments for all major policies',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_youth',
    to: 'institution_gof',
    type: 'ESTABLISHES',
    description: 'Youth framework establishes Guardians of the Future as legal advocates for future generations',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_migration',
    to: 'council_pmc',
    type: 'ESTABLISHES',
    description: 'Migration framework establishes Planetary Migration Council as governance body',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_migration',
    to: 'protocol_gmp',
    type: 'ESTABLISHES',
    description: 'Migration framework establishes Global Mobility Passport for migrant identity and rights',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_migration',
    to: 'protocol_crv',
    type: 'ESTABLISHES',
    description: 'Migration framework establishes Climate Resilience Visas for climate displacement',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_migration',
    to: 'process_es_migration',
    type: 'ESTABLISHES',
    description: 'Migration framework establishes Ecological Stewardship Migration programs',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  // --- Social Fabric Framework: Internal Relationships ---
  {
    from: 'framework_social_fabric',
    to: 'process_community_weaver',
    type: 'ESTABLISHES',
    description: 'The framework formally defines the curriculum, role, and safeguards for the Community Weaver.'
  },
  {
    from: 'framework_social_fabric',
    to: 'institution_cohesion_council',
    type: 'ESTABLISHES',
    description: 'The framework establishes the Cohesion Council as the primary local governance body for its activities.'
  },
  {
    from: 'framework_social_fabric',
    to: 'tool_cohesion_metrics_pack',
    type: 'ESTABLISHES',
    description: 'The framework establishes the Cohesion Metrics Pack as its primary measurement tool.'
  },
  
  // === CONNECTIONS TO ECONOMIC OS ===
  {
    from: 'framework_aubi',
    to: 'institution_care_coops',
    type: 'FUNDS',
    description: 'AUBI provides economic engine for Care Cooperatives, rewarding care work with Hearts',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_care_coops',
    to: 'framework_work_liberation',
    type: 'IMPLEMENTS',
    description: 'Care Cooperatives are flagship type of Community Work Team in Work Liberation',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO JUSTICE OS ===
  {
    from: 'institution_gof',
    to: 'institution_dj_tribunal',
    type: 'ESCALATES_TO',
    description: 'Guardians of the Future have legal standing to challenge policies in Digital Justice Tribunal',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'institution_ge_ombudsperson',
    to: 'framework_justice',
    type: 'INTEGRATES_WITH',
    description: 'Global Equity Ombudsperson investigates systemic inequities and reports to Justice System',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === POLICY VALIDATION & OVERSIGHT ===
  {
    from: 'tool_dia',
    to: 'framework_meta_gov',
    type: 'VALIDATES',
    description: 'Disability Impact Assessments required for all GGF policies, ensuring universal design is core Meta-Governance principle',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_iia',
    to: 'framework_meta_gov',
    type: 'VALIDATES',
    description: 'Intergenerational Impact Assessments required for all major GGF policies',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ETHICAL OS ===
  {
    from: 'framework_disability',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Disability Justice principles implemented through BAZ-led local governance',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_youth',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Youth engagement and future generations advocacy implemented through BAZ governance',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO INDIGENOUS FRAMEWORK ===
  {
    from: 'framework_indigenous',
    to: 'framework_migration',
    type: 'GUIDES',
    description: 'Provides guiding principles of traditional hospitality, sanctuary, and "right relationship" for the development of climate migration protocols.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO EDUCATION FRAMEWORK ===
  {
    from: 'framework_youth',
    to: 'framework_education',
    type: 'COORDINATES_WITH',
    description: 'Emerging Youth readiness pathway integrates Educational Systems Framework civic education modules as prerequisites for full Youth Caucus voting rights.'
  },

  // === CONNECTIONS TO CONSTITUTIONAL LAYER ===
  {
    from: 'framework_treaty',
    to: 'institution_ge_ombudsperson',
    type: 'ESTABLISHES',
    description: 'Treaty establishes Global Equity Ombudsperson as institutional safeguard for equity',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  // === MIGRATION-SPECIFIC INTEGRATIONS ===
  {
    from: 'protocol_gmp',
    to: 'platform_love_ledger',
    type: 'INTEGRATES_WITH',
    description: 'Global Mobility Passport records migrant contributions (care work, teaching) into Love Ledger to earn Hearts',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_crv',
    to: 'process_crisis_command',
    type: 'IMPLEMENTS',
    description: 'Climate Resilience Visas are application of Meta-Governance Crisis Command Protocol, triggered by climate emergencies',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  {
    from: 'process_es_migration',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Ecological Stewardship Migration programs implemented within and governed by BAZs',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_es_migration',
    to: 'mechanism_leaves',
    type: 'REWARDS',
    description: 'Migrants participating in ecosystem restoration are rewarded with Leaves',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_migration',
    to: 'framework_justice',
    type: 'ESCALATES_TO',
    description: 'Migration framework establishes Migration Justice Tribunals as specialized chambers within Digital Justice Tribunal',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_migration',
    to: 'framework_drr',
    type: 'COLLABORATES_WITH',
    description: 'Coordinates with DRR&R on managing and supporting climate-displaced populations',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === THE CAIRN PROTOCOL (ADDICTION & RECOVERY) INTEGRATION ===
  { from: 'framework_cairn_protocol', to: 'council_cairn', type: 'ESTABLISHES' },
  { from: 'council_cairn', to: 'institution_recovery_hub', type: 'OVERSEES' },
  { from: 'institution_recovery_hub', to: 'process_recovery_weaver', type: 'IMPLEMENTS' },
  // --- CONNECTIONS TO OTHER GGF FRAMEWORKS ---
  { from: 'framework_kintsugi_protocol', to: 'framework_cairn_protocol', type: 'INTEGRATES_WITH', description: 'The Kintsugi Protocol (CCSF) is the primary referral source for community-level substance issues, handing off to Recovery Weavers.' },
  { from: 'framework_mental_health', to: 'framework_cairn_protocol', type: 'INFORMS', description: 'Provides the clinical and therapeutic models that Recovery Hubs and Weavers are trained in.' },
  { from: 'framework_aubi', to: 'framework_cairn_protocol', type: 'ENABLES', description: 'AUBI provides the economic stability to prevent root causes and the Hearts currency to reward recovery care work.' },
  { from: 'framework_pathfinder_protocol', to: 'mechanism_corporate_harm_levy', type: 'IMPLEMENTS', description: 'The REF provides the corporate accountability structure through which the Corporate Harm Levy is assessed.' },
  { from: 'framework_indigenous', to: 'framework_cairn_protocol', type: 'GUIDES', description: 'The Indigenous Framework provides the non-negotiable protocols for the sovereign governance of sacred plant medicines.' },
  { from: 'framework_sanctuary', to: 'framework_cairn_protocol', type: 'COORDINATES_WITH', description: 'The Sanctuary Accord provides ethical oversight for advanced psychedelic therapies that individuals in Cairn-supported recovery may be referred to.' },
  { from: 'institution_dj_tribunal', to: 'institution_design_justice_tribunal', type: 'ESTABLISHES', description: 'The main DJ Tribunal houses the specialized Design Justice chamber.' },
  { from: 'framework_cairn_protocol', to: 'framework_memorial_commons', type: 'INTEGRATES_WITH', description: 'The protocol refers individuals and communities to The Memorial Commons to process addiction-related grief.' },

  // --- Social Fabric Framework: Integration with GGF Ecosystem ---
  {
    from: 'framework_social_fabric',
    to: 'framework_meta_gov',
    type: 'ENABLES',
    description: 'Serves as "Phase Zero," building the relational skills and social trust necessary for communities to effectively use advanced Meta-Governance tools like the EGP and SCI Cycle.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_social_fabric',
    to: 'framework_aubi',
    type: 'ENABLES',
    description: 'Provides the high-trust social foundation required for a local Hearts currency and Community Provider network to function without being undermined by fraud or factionalism.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'mechanism_gcf',
    to: 'mechanism_cohesion_seed_grant',
    type: 'FUNDS',
    description: 'The Global Commons Fund is the source for the Social Cohesion Seed Grants.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_social_fabric',
    to: 'framework_kintsugi_protocol',
    type: 'ESCALATES_TO',
    description: 'Low-level conflicts are handled by Generative Conflict circles; patterns of harm or severe incidents are handed off to the Kintsugi Protocol for formal restorative safety processes.',
    strength: 'Medium',
    sequenceType: 'Conditional'
  },
  {
    from: 'process_community_weaver',
    to: 'process_community_safety_weaver', // Assuming ID from Kintsugi
    type: 'COORDINATES_WITH',
    description: 'The Inter-Weaver Interface Protocol defines handoffs between Community Weavers and Safety Weavers.'
  },
  {
    from: 'framework_digital_commons',
    to: 'framework_social_fabric',
    type: 'SUPPORTS',
    description: 'The Digital Commons provides the infrastructure for the Community Weaving App, LMCI dashboards, and communication toolkits, all governed by the Anti-Surveillance Covenant.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },

  // === KINSHIP PROTOCOL 2.3: ANTI-REIFICATION RELATIONSHIPS ===
  {
    from: 'framework_gender',
    to: 'process_transition_transcendence_wg',
    type: 'ESTABLISHES',
    description: 'Kinship Protocol establishes the Transition & Transcendence Working Group as standing anti-reification mechanism within the GKJC.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'process_transition_transcendence_wg',
    to: 'council_gkjc',
    type: 'REPORTS_TO',
    description: 'TTWG reports to the GKJC with decadal sunset reviews of identity-based quotas and recommendations for functional alternatives.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_transition_transcendence_wg',
    to: 'metric_category_dependency_ratio',
    type: 'USES_DATA_FROM',
    description: 'TTWG uses the Category Dependency Ratio to assess progress toward function-based economic mechanisms.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gender',
    to: 'framework_social_fabric',
    type: 'INTEGRATES_WITH',
    description: 'Kinship Protocol Relational Infrastructure (Third Spaces, Rites of Passage, Relationship Education) implemented through Social Fabric community weaving infrastructure.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_social_fabric',
    to: 'framework_gender',
    type: 'SUPPORTS',
    description: 'Social Fabric provides the community trust and relational capacity that Kinship Protocol mechanisms depend on for effective implementation.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gender',
    to: 'framework_elder',
    type: 'COLLABORATES_WITH',
    description: 'Multi-Generational Connection programs within Relational Infrastructure co-designed with Elder Justice Layer and Council of Elders.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'metric_relational_wellbeing',
    to: 'tool_cohesion_metrics_pack',
    type: 'INTEGRATES_WITH',
    description: 'Relational Wellbeing Index feeds into the broader Cohesion Metrics Pack for holistic community health measurement.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
,
  // --- edges added to resolve isolated entities -------------------------
  {
    from: 'framework_cairn_protocol',
    to: 'protocol_substance_sovereignty_declaration',
    type: 'ESTABLISHES',
    description:
      'The Declaration is the framework\'s founding charter: bodily autonomy, sacred plant access, and protection from predatory design.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_cairn_protocol',
    to: 'institution_recovery_research_hub',
    type: 'ESTABLISHES',
    description:
      'Establishes the Indigenous-led research body that collects recovery outcomes data, embedded in the Community Safety Observatory.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_recovery_research_hub',
    to: 'council_cairn',
    type: 'INFORMS',
    description: 'Outcomes evidence feeds the council that oversees recovery provision.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_social_fabric',
    to: 'institution_weaver_ombud',
    type: 'ESTABLISHES',
    description:
      'Establishes an independent reviewer for grievances about the weaving process itself — facilitation needs its own accountability route.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_weaver_ombud',
    to: 'process_community_weaver',
    type: 'AUDITS',
    description: 'Reviews Weaver conduct independently of the councils Weavers serve.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_substance_sovereignty_declaration',
    to: 'institution_design_justice_tribunal',
    type: 'ESCALATES_TO',
    description:
      'Predatory addictive-by-design products are adjudicated in the Design Justice chamber.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'mechanism_corporate_harm_levy',
    to: 'mechanism_gcf',
    type: 'FUNDS',
    description:
      'The levy on addictive-product profits capitalizes recovery provision through the Global Commons Fund.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
