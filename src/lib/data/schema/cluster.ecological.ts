// /src/lib/data/schema/cluster.ecological.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1–2: ECOLOGICAL FRAMEWORKS
 *
 * THE ROLE SEPARATION. Planetary Health v0.9.1 and the Ecological Intelligence
 * Layer v2.7.1 are declared role-separation counterparts of each other, and the
 * split is the organizing fact of this cluster. Eco Intel observes, models and
 * recommends; Planetary Health synthesizes, audits and recommends; neither
 * recognizes rights, appoints guardians, declares emergencies, directs funds or
 * commands anyone. Their own summary lines:
 *
 *   "Observe carefully. Interpret humbly. Recommend explicitly.
 *    Never convert measurement into authority."
 *   "Synthesis is not supremacy. Audit is not investigation.
 *    Recommendation is not command."
 *
 * The "Rights Layer" name was retired deliberately, because it blurred a
 * technical rights-review contribution with lawful rights recognition. The
 * schema still carried the old name.
 *
 * CERGTA/0.1 AGAIN. Planetary Health, Eco Intel and the MOS all declare
 * conformance to it, and Eco Intel names its record classes — CERGTA-11
 * petition, CERGTA-12 recommendation, CERGTA-13 legal recognition, which only a
 * separately competent body may create. It is load-bearing across at least three
 * frameworks and still has no schema entity, because no document expands the
 * acronym. Worth resolving.
 *
 * Conventions: see cluster.implementation-os.ts.
 */

export const ecologicalEntities: GgfEntity[] = [
  // === THE ROLE-SEPARATION PAIR ===
  {
    id: 'framework_planetary_health',
    type: 'Framework',
    name: 'Planetary Health Governance Framework',
    shortName: 'Planetary Health',
    description:
      'Cross-domain synthesis, participatory audit, public-health coherence and strategic recommendation across human health, animal health, ecosystems, culture, infrastructure and future generations. Does not own ecological observation, recognize ecosystem rights, appoint guardians, bind other frameworks, condition funding, declare emergencies, or command responders.',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov', 'mechanism_gcf'],
    enables: ['council_phc'],
    ui: {
      path: '/frameworks/planetary-health-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.planetaryHealthGovernance',
      emoji: '🌱',
      slug: 'planetary-health-governance',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v0.9.1',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'A forum for seeing how human health, animal health, ecosystems, infrastructure and culture act on each other — and for letting affected communities contest the conclusions drawn from that view. Version 0.9.1 exists to separate synthesis from power: the framework may audit cross-domain effects and recommend, but it cannot bind another framework, condition funding, declare an emergency or command a responder. Its own formulation is that synthesis is not supremacy, and a planetary view must not erase local authority.'
      }
    }
  },
  {
    id: 'framework_eco_intel',
    type: 'Framework',
    // "Rights" retired at v2.7 — it blurred technical rights-review with lawful
    // rights recognition. The outline also declares the id
    // `framework_ecological_intelligence`; the schema id is canonical.
    name: 'Ecological Intelligence, Observation, and Interpretation Layer',
    shortName: 'Eco Intel',
    description:
      'The distributed scientific, community and Indigenous-knowledge infrastructure through which the ecosystem observes ecological conditions, specifies indicators, assesses causation, communicates uncertainty and recommends review. It does not recognize legal rights, appoint guardians, define binding boundaries, transfer title, issue permits or tariffs, direct funds, or command enforcement.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_mos', 'framework_planetary_health'],
    ui: {
      path: '/frameworks/environmental-stewardship',
      titleKey: 'framework.docs.nav.frameworkTitles.environmentalStewardship',
      emoji: '🌍',
      slug: 'environmental-stewardship',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v2.7.1',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'Ecological governance needs excellent sensing without letting the sensor become sovereign. This is the sensing half: indicators, causal assessment, honest uncertainty, and recommendations that stay recommendations. Version 2.7 retired the framework\'s own "Rights Layer" name, because holding both the measurement and the rights determination in one place is precisely the failure it is trying to avoid. Observe carefully, interpret humbly, and never convert measurement into authority.'
      }
    }
  },

  // === PLANETARY BOUNDARY FRAMEWORKS ===
  {
    id: 'framework_climate_energy',
    type: 'Framework',
    name: 'Climate & Energy Governance Framework',
    shortName: 'Climate & Energy',
    description:
      'Climate action and energy transition through attraction rather than enforcement: Regenerative Trade Zones whose members gain economic advantage, managed fossil-fuel phase-out under the Sundown Protocol, and transition sequencing that puts extractive-era workers first in line for the regenerative one.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_planetary_health', 'mechanism_gcf'],
    ui: {
      path: '/frameworks/climate-and-energy-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.climateAndEnergyGovernance',
      emoji: '⚡',
      slug: 'climate-and-energy-governance',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v2.1',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Decarbonization organized around incentive gradients rather than compliance: a Regenerative Trade Zone that makes membership economically advantageous, so that joining is attractive before it is obligatory. Version 2.1 opens with a plain-language glossary — an unusual admission for a document of this type that precision and readability are both required, and that a framework nobody outside the project can parse is not yet a framework.'
      }
    }
  },
  {
    id: 'framework_biodiversity',
    type: 'Framework',
    name: 'Global Governance Biodiversity Implementation Framework',
    shortName: 'Biodiversity',
    description:
      'Indigenous-led stewardship, ecosystem-rights implementation and regenerative biosphere work under constitutionally bounded biodiversity authority. Outline declares the id `framework_biodiversity_implementation`; the schema id is canonical.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_planetary_health'],
    ui: {
      path: '/frameworks/biodiversity-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.biodiversityGovernance',
      emoji: '🦋',
      slug: 'biodiversity-governance',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v1.1.1',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'Biodiversity work led by the peoples whose territories hold most of what remains, rather than designed for them elsewhere. Version 1.1.1 is a controlled constitutional successor: it implements ecosystem rights where a competent authority has recognised them, and is careful not to claim it can recognise them itself. Conservation authority is bounded, because conservation has its own long record of displacement.'
      }
    }
  },
  {
    id: 'framework_oceans_marine',
    type: 'Framework',
    name: 'Oceans & Marine Governance Framework',
    shortName: 'Oceans & Marine',
    description:
      'Ocean rights, Indigenous and coastal stewardship, regenerative blue economy, and precaution under constitutionally bounded marine authority. Outline declares `framework_oceans_marine_governance`; the schema id is canonical.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_biodiversity'],
    ui: {
      path: '/frameworks/oceans-and-marine-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.oceansAndMarineGovernance',
      emoji: '🌊',
      slug: 'oceans-and-marine-governance',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v2.3.1',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'Most of the ocean belongs to nobody, which has historically meant it belongs to whoever gets there with the largest vessel. Version 2.3.1 builds coastal and Indigenous stewardship into the governance of that space and makes precaution the default where evidence is thin — a real constraint in an environment where almost all evidence is thin.'
      }
    }
  },
  {
    id: 'framework_soil_health',
    type: 'Framework',
    name: 'Soil Health & Land Use Governance Framework',
    shortName: 'Soil Health',
    description:
      'Living soil, regenerative land use, the microbial commons, and constitutionally bounded land authority. Outline declares `framework_soil_land`; the schema id is canonical.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_food', 'framework_biodiversity'],
    ui: {
      path: '/frameworks/soil-health-and-land-use-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.soilHealthAndLandUseGovernance',
      emoji: '🌾',
      slug: 'soil-health-and-land-use-governance',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v3.2.2',
        updated: '2026-08-02',
        maturity: 'adversarial',
        standfirst:
          'Soil treated as a living commons rather than as a substrate — the microbial layer that makes terrestrial life possible, and which industrial agriculture has been spending down for a century. Version 3.2.2 is careful about land authority, because a framework that can govern soil can very easily become a framework that governs who may farm.'
      }
    }
  },
  {
    id: 'framework_water_sanitation',
    type: 'Framework',
    name: 'Water & Sanitation Governance Framework',
    shortName: 'Water & Sanitation',
    description:
      'Water as commons, watershed democracy, universal WASH, and constitutionally bounded hydrological authority.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_planetary_health'],
    ui: {
      path: '/frameworks/water-and-sanitation-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.waterAndSanitationGovernance',
      emoji: '💧',
      slug: 'water-and-sanitation-governance',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v5.2.2',
        updated: '2026-08-02',
        maturity: 'adversarial',
        standfirst:
          'Watersheds do not respect borders, which makes water the clearest case for governing by ecological boundary rather than administrative one. Version 5.2.2 treats water as commons and sanitation as a universal entitlement, while bounding hydrological authority carefully — upstream power over water is among the oldest forms of leverage there is.'
      }
    }
  },
  {
    id: 'framework_food',
    type: 'Framework',
    name: 'The Kinship Garden Framework',
    shortName: 'Kinship Garden',
    description:
      'Regenerative food systems and agriculture based on Right Relationship with the land, routing farmworker justice and regenerative practice through Hearts and Leaves. NOTE: the outline still cites the "Ecological Intelligence & Rights Layer" under its retired name.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_aubi', 'council_phc'],
    ui: {
      path: '/frameworks/kinship-garden',
      titleKey: 'framework.docs.nav.frameworkTitles.kinshipGarden',
      emoji: '🌻',
      slug: 'kinship-garden',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v4.1.1',
        updated: '2026-09-04',
        maturity: 'adversarial',
        standfirst:
          'Food systems built on relationship rather than yield: farmworker justice, local food hubs and regenerative practice compensated through Hearts and Leaves, so that growing food well is paid work rather than a sacrifice made by the grower. Indigenous-guided throughout, and explicit that Right Relationship with land is a governing constraint rather than a framing device.'
      }
    }
  },
  {
    id: 'framework_animal_welfare',
    type: 'Framework',
    name: 'Global Guardian Framework',
    shortName: 'Animal Welfare',
    description:
      'Animal welfare for a shared future: sentience-based consideration, operational verification standards, and a Bootstrap Phase 0 that works without any of the surrounding institutions existing yet.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_mos'],
    ui: {
      path: '/frameworks/animal-welfare-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.animalWelfareGovernance',
      emoji: '🐾',
      slug: 'animal-welfare-governance',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v7.1',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Animal welfare worked out at the level of verification rather than principle — the framework spends its detail on questions like what operationally counts as surplus milk from a willing cow, because that is where welfare standards actually succeed or fail. Version 7.1 adds a Bootstrap Phase 0 that a single farm can adopt without waiting for any council to exist.'
      }
    }
  },
  {
    id: 'framework_phoenix_protocol',
    type: 'Framework',
    name: 'Phoenix Protocol — Material Stewardship & Circular Economies',
    shortName: 'Phoenix Protocol',
    description:
      'Material stewardship and circular economy: BAZ Circular Authorities with composting infrastructure mandates, a capture-resistant Global Circular Standards Board, worker transition provisions, and cross-border escrow enforcement.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_eco_intel'],
    ui: {
      path: '/frameworks/phoenix-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.phoenixProtocol',
      emoji: '♻️',
      slug: 'phoenix-protocol',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v3.1.1',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Waste reframed as material held in the wrong place, with the governance question being who is responsible for moving it. Version 3.1 rebalanced the standards board specifically to reduce capture risk — circular-economy standards are unusually valuable to the industries they regulate — and added worker transition provisions, since the people currently handling waste are the ones a circular transition displaces first. Its status line still reads Implementation-Ready Draft.'
      }
    }
  },

  // === RESILIENCE ===
  {
    id: 'framework_drr',
    type: 'Framework',
    name: 'The Living Shield',
    shortName: 'Living Shield',
    description:
      'Disaster risk reduction, preparedness, forecast finance and just recovery. v4.4 separated eight functions that earlier editions combined: hazard observation and plural state estimation; ordinary planning and infrastructure regulation; accessible warning; pre-authorized forecast finance; requested mutual aid; lawful emergency declaration; adjudication and remedy; and recovery with authority return.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_planetary_health',
      'framework_conduit_protocol', // cluster: infrastructure
      'framework_gscl' // cluster: economic-os
    ],
    ui: {
      path: '/frameworks/disaster-risk-reduction',
      titleKey: 'framework.docs.nav.frameworkTitles.disasterRiskReduction',
      emoji: '🛡️',
      slug: 'disaster-risk-reduction',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v4.4.2',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'The insight kept from earlier versions is that disaster governance should invest before loss rather than only compensate after it — forecast finance released on a prediction rather than a body count. What version 4.4 removed is more telling: the planetary disaster authority, the mandatory BAZ council and its land-use veto, the universal duty of care, the reinsurance levy, and any power to order evacuation or command responders. Emergencies are where authority gets taken and not given back, so the framework separates eight functions earlier drafts had bundled.'
      }
    }
  },

  // === COUNCILS, METRICS, INSTRUMENTS ===
  {
    id: 'council_phc',
    type: 'Council',
    name: 'Planetary Health Council',
    shortName: 'PHC',
    description:
      'Meta-Governance council convening on planetary boundaries and ecological coordination. A forum for synthesis and recommendation; it cannot command public institutions.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_meta_gov', 'framework_planetary_health']
  },
  {
    id: 'metric_bhi',
    type: 'DataMetric',
    name: 'Biosphere Health Index',
    shortName: 'BHI',
    description:
      'A composite measure of planetary well-being intended to displace GDP as the headline indicator of civilizational success, integrating scientific data with Indigenous-led assessment. An indicator, not a trigger — its readings open review rather than executing decisions.',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_eco_intel',
      'framework_indigenous', // cluster: ethical-os
      'framework_aurora_accord', // cluster: data-os
      'metric_lmci' // cluster: economic-os
    ]
  },
  {
    id: 'mechanism_resilience_bonds',
    type: 'EconomicMechanism',
    name: 'Resilience Bonds',
    shortName: 'Resilience Bonds',
    description:
      'A financial instrument for capitalizing the Global Resilience Pool, with returns tied to improvements in a BAZ Community Resilience Score. NOTE: v4.4 states the framework does not impose a bond or insurance obligation — this is an available instrument, not a mandate, and the reinsurance levy was removed.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_drr', 'framework_financial_systems']
  },
  {
    id: 'protocol_duty_of_care',
    type: 'LegalProtocol',
    name: 'Duty of Care',
    shortName: 'Duty of Care',
    description:
      'A legal principle making a lack of disaster preparedness prosecutable. REMOVED FROM THE FRAMEWORK: v4.4 explicitly removed "the universal duty of care", along with the planetary disaster authority and the mandatory BAZ council. The framework may not establish offences or civil liability. Retained pending a decision on whether the principle belongs in Justice Systems instead.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: [
      'framework_justice' // cluster: justice-os
    ]
  }
];

export const ecologicalRelationships: GgfRelationship[] = [
  // --- the role separation ------------------------------------------------
  {
    from: 'framework_planetary_health',
    to: 'framework_eco_intel',
    type: 'COORDINATES_WITH',
    description:
      'Declared role-separation counterparts. Eco Intel observes, models and communicates uncertainty; Planetary Health synthesizes across domains and recommends. Neither may absorb the other\'s function, and neither converts either output into authority.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'council_phc',
    type: 'INFORMS',
    description:
      'Supplies indicators, causal assessment and stated uncertainty. A `CERGTA-12` recommendation is not a `CERGTA-13` legal recognition.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'framework_eco_intel',
    type: 'GUIDES',
    description:
      'Both conform to the CERGTA/0.1 advisory boundary; the MOS handles rights reasoning that Eco Intel deliberately does not.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_eco_intel',
    type: 'GUIDES',
    description:
      'Indigenous knowledge is part of the sensing infrastructure on its own terms, subject to consent and knowledge-boundary rules rather than absorbed as data.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'metric_bhi',
    type: 'ESTABLISHES',
    description: 'Eco Intel specifies the indicators the BHI is built from.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_eco_intel',
    to: 'framework_animal_welfare',
    type: 'GUIDES',
    description: 'Supplies sentience and welfare evidence standards.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'framework_phoenix_protocol',
    type: 'GUIDES',
    description: 'Supplies material-flow and impact assessment methodology.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'framework_drr',
    type: 'INFORMS',
    description:
      'Hazard observation and plural state estimation — one of the eight functions v4.4 separated out.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'framework_biodiversity',
    type: 'INFORMS',
    description: 'Supplies ecosystem condition assessment and its uncertainty.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'framework_soil_health',
    type: 'INFORMS',
    description: 'Supplies soil and microbial indicators.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'framework_technology_governance',
    type: 'COORDINATES_WITH',
    description: 'Shared standards for ecological sensing systems and their governance.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },

  // --- framework_planetary_health -----------------------------------------
  {
    from: 'framework_planetary_health',
    to: 'council_phc',
    type: 'ESTABLISHES',
    description: 'Establishes the Planetary Health Council as a synthesis and audit forum.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_food',
    type: 'INTEGRATES_WITH',
    description: 'Food systems are a planetary health domain.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_water_sanitation',
    type: 'INTEGRATES_WITH',
    description: 'Water and sanitation are a planetary health domain.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_biodiversity',
    type: 'INTEGRATES_WITH',
    description: 'Biodiversity is a planetary health domain.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_climate_energy',
    type: 'INTEGRATES_WITH',
    description: 'Climate and energy are a planetary health domain.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_drr',
    type: 'INTEGRATES_WITH',
    description: 'Disaster risk is a planetary health domain.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_global_health',
    type: 'COORDINATES_WITH',
    description:
      'Public-health coherence is one of the four stated functions; the human-health institutions remain competent for their own decisions.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_animal_welfare',
    type: 'COORDINATES_WITH',
    description: 'Animal health is one of the domains the synthesis spans.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_hearthstone',
    type: 'COORDINATES_WITH',
    description: 'Stewardship of ecological commons requires the Hearthstone legal instruments.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_phc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The PHC is a domain council within the Meta-Governance structure.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_phc',
    to: 'framework_planetary_health',
    type: 'OVERSEES',
    description: 'The council carries the framework\'s audit and recommendation functions.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_phc',
    to: 'framework_drr',
    type: 'OVERSEES',
    description:
      'Coordination oversight only — v4.4 removed any power for the PHC to command public institutions.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_phc',
    to: 'framework_phoenix_protocol',
    type: 'OVERSEES',
    description: 'Coordination oversight of material stewardship.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_phc',
    to: 'metric_bhi',
    type: 'OVERSEES',
    description: 'The council stewards the BHI, under Metrology Council lifecycle rules.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cjet',
    to: 'framework_planetary_health',
    type: 'ENFORCES',
    description:
      'Where ecological harm requires adjudication, it goes to the tribunal chamber. The framework itself adjudicates nothing.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_planetary_health',
    type: 'FUNDS',
    description: 'The Global Commons Fund resources planetary health coordination.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_hearthstone',
    to: 'framework_planetary_health',
    type: 'ENABLES',
    description: 'Commons stewardship instruments make ecological protection legally operable.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },

  // --- between the domain frameworks --------------------------------------
  {
    from: 'framework_food',
    to: 'framework_soil_health',
    type: 'DEPENDS_ON',
    description: 'Regenerative food systems depend on living soil.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_food',
    to: 'framework_water_sanitation',
    type: 'DEPENDS_ON',
    description: 'Agriculture is the largest water use in most watersheds.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_food',
    to: 'framework_biodiversity',
    type: 'COORDINATES_WITH',
    description: 'Agricultural land use is the dominant pressure on terrestrial biodiversity.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_food',
    to: 'framework_oceans_marine',
    type: 'COORDINATES_WITH',
    description: 'Fisheries and aquaculture sit across both frameworks.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_food',
    to: 'framework_animal_welfare',
    type: 'COORDINATES_WITH',
    description: 'Livestock standards are the shared surface between the two.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_food',
    to: 'platform_love_ledger',
    type: 'USES_DATA_FROM',
    description:
      'Regenerative farming, food hubs and farmworker justice are recognised through the Love Ledger and rewarded in Hearts and Leaves.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_soil_health',
    to: 'framework_biodiversity',
    type: 'COORDINATES_WITH',
    description:
      'The microbial commons is biodiversity at the scale that gets left out of biodiversity policy.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_biodiversity',
    to: 'framework_oceans_marine',
    type: 'INTEGRATES_WITH',
    description: 'Marine biodiversity is governed jointly.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_biodiversity',
    to: 'framework_animal_welfare',
    type: 'COORDINATES_WITH',
    description:
      'Species-level conservation and individual welfare pull against each other often enough to need an explicit interface.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_biodiversity',
    to: 'framework_aethelred_accord',
    type: 'COORDINATES_WITH',
    description: 'Gene drives and engineered organisms are a biodiversity decision.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_biodiversity',
    type: 'GUIDES',
    description:
      'Indigenous-led stewardship is the framework\'s organizing premise, not a consultation stage.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_oceans_marine',
    to: 'framework_gscl',
    type: 'COORDINATES_WITH',
    description:
      'Shipping corridors, acoustic governance and zero-emission ports are shared with logistics.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_climate_energy',
    to: 'framework_gaian_trade',
    type: 'INTEGRATES_WITH',
    description:
      'Regenerative Trade Zones are the mechanism through which climate incentives are made attractive.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_climate_energy',
    to: 'framework_sundown_protocol',
    type: 'DEPENDS_ON',
    description: 'The Sundown Protocol carries the fossil-fuel phase-out and worker transition.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_climate_energy',
    to: 'framework_hearthstone',
    type: 'COORDINATES_WITH',
    description: 'Stranded and transitioning energy assets need stewardship instruments.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_phoenix_protocol',
    to: 'framework_gscl',
    type: 'INTEGRATES_WITH',
    description: 'Material flows and reverse logistics run through supply chain infrastructure.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_phoenix_protocol',
    to: 'mechanism_leaves',
    type: 'REWARDS',
    description: 'Circular practice earns Leaves.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_phoenix_protocol',
    to: 'framework_work_liberation',
    type: 'COORDINATES_WITH',
    description:
      'Worker transition provisions: a circular transition displaces waste workers first.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_animal_welfare',
    to: 'institution_dj_tribunal',
    type: 'ESCALATES_TO',
    description: 'Welfare violations requiring adjudication go to the tribunal.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'protocol_fpic2',
    to: 'framework_animal_welfare',
    type: 'GUIDES',
    description:
      'Consent governs how welfare standards apply to Indigenous hunting, fishing and husbandry practice.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_water_sanitation',
    to: 'framework_conduit_protocol',
    type: 'DEPENDS_ON',
    description: 'WASH delivery runs on shared infrastructure the Conduit Protocol governs.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // --- the Living Shield ---------------------------------------------------
  {
    from: 'framework_drr',
    to: 'protocol_duty_of_care',
    type: 'INFORMS',
    // was ESTABLISHES — v4.4 removed the universal duty of care, and §1.3
    // forbids the framework from establishing offences or civil liability
    description:
      'The framework can describe what preparedness ought to involve; only a competent legal authority can make its absence actionable.',
    strength: 'Weak',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_drr',
    to: 'mechanism_resilience_bonds',
    type: 'INFORMS',
    // was ESTABLISHES — §1.3 forbids imposing a bond or insurance obligation
    description:
      'Describes resilience bonds as an available instrument for capitalizing the Global Resilience Pool. It cannot impose one.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_drr',
    to: 'framework_migration',
    type: 'COLLABORATES_WITH',
    description: 'Displacement is a predictable disaster outcome rather than a separate problem.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_drr',
    to: 'framework_urban_community',
    type: 'INFORMS',
    description: 'Risk assessment informs bioregional settlement and infrastructure planning.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_drr',
    to: 'institution_bga',
    type: 'COORDINATES_WITH',
    description: 'Grid resilience and restoration are coordinated with grid authorities.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_drr',
    to: 'framework_gscl',
    type: 'INTEGRATES_WITH',
    description: 'Relief logistics run on the same supply chain infrastructure.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_drr',
    to: 'framework_aegis_protocol',
    type: 'COORDINATES_WITH',
    description:
      'The Civilian Converted-Capability Assistance Addendum governs where the two frameworks meet.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_work_liberation',
    to: 'framework_drr',
    type: 'IMPLEMENTS',
    description: 'Recovery and preparedness work are recognised participation modes.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'framework_drr',
    type: 'FUNDS',
    description:
      'Pre-authorized social protection releases on forecast rather than after assessed loss.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_drr',
    type: 'FUNDS',
    description: 'The Global Commons Fund capitalizes forecast finance.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_resilience_bonds',
    to: 'mechanism_gcf',
    type: 'FUNDS',
    description: 'Bond proceeds flow into the Global Resilience Pool held by the GCF.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_duty_of_care',
    to: 'institution_dj_tribunal',
    type: 'ENFORCES',
    description:
      'If the principle is adopted by a competent authority, the tribunal is where it would be tested.',
    strength: 'Weak',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },

  // --- metrics --------------------------------------------------------------
  {
    from: 'framework_indigenous',
    to: 'metric_bhi',
    type: 'INFORMS',
    description: 'Indigenous-led assessment is a constitutive input, not a validation step.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aurora_accord',
    to: 'metric_bhi',
    type: 'GUIDES',
    description: 'Data governance rules apply to the observation feeding the index.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'metric_lmci',
    to: 'metric_bhi',
    type: 'INTEGRATES_WITH',
    description: 'Social and biospheric wellbeing are read together rather than traded off.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_leaves',
    to: 'framework_planetary_health',
    type: 'FUNDS',
    description: 'Leaves circulate value toward ecological restoration work.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  }
  // Also removed here: council_earth → council_phc (duplicates _index.ts) and
  // framework_drr → framework_mental_health (duplicates cluster.human-flourishing).
  // mechanism_leaves → framework_biodiversity and mechanism_hearts →
  // framework_animal_welfare removed here: both duplicate edges in
  // cluster.economic-os, where their `from` entities live.
];
