// /src/lib/data/schema/cluster.infrastructure.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 2: SHARED INFRASTRUCTURE
 * The Conduit Protocol — energy, data and water treated as one commons rather
 * than three sectors, on the observation that they fail together and are
 * captured by the same means.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * Note: Digital Commons v3.0 migrated its mesh network, cybersecurity hardening
 * and community-resilience content here, so the Conduit Protocol now carries
 * infrastructure obligations that another framework used to hold.
 */

export const conduitProtocolEntities: GgfEntity[] = [
  {
    id: 'framework_conduit_protocol',
    type: 'Framework',
    name: 'The Conduit Protocol',
    shortName: 'Conduit Protocol',
    description:
      'Shared infrastructure as a commons: a unified, resilient global layer for clean energy, secure data and clean water, governed through bioregional grid authorities rather than sold as three separate utilities.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'framework_hearthstone', // cluster: property-stewardship
      'framework_aurora_accord' // cluster: data-os
    ],
    enables: ['council_gic', 'institution_bga', 'institution_decom_trust', 'institution_cic'],
    ui: {
      path: '/frameworks/conduit-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.conduitProtocol',
      emoji: '🔌',
      slug: 'conduit-protocol',
      group: 'planetaryHealthResilience',
      outline: {
        version: 'v1.0',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Energy, data and water governed as one commons rather than three sectors, because they fail together and are captured by the same means — whoever controls the grid controls the terms on which everything else runs. Bioregional Grid Authorities co-govern locally under global interoperability standards, and a Fossil Fuel Decommissioning Trust handles the infrastructure the transition strands, funded by a levy on the industry that built it.'
      }
    }
  },
  {
    id: 'council_gic',
    type: 'Council',
    name: 'Global Infrastructure Council',
    shortName: 'Global Infrastructure Council',
    description:
      'Sub-council of the MGCC setting interoperability and resilience standards. Standards-setting only — operation stays with the grid authorities and their jurisdictions.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_conduit_protocol', 'framework_meta_gov']
  },
  {
    id: 'institution_bga',
    type: 'Institution',
    name: 'Bioregional Grid Authorities',
    shortName: 'Bioregional Grid Authorities',
    description:
      'BAZ-level or regional bodies operating local energy, data and water infrastructure, co-governed by the communities that depend on them.',
    tier: 2,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Bioregional',
    implementationPriority: 'High',
    dependencies: ['framework_conduit_protocol', 'institution_baz']
  },
  {
    id: 'institution_decom_trust',
    type: 'Institution',
    name: 'Fossil Fuel Decommissioning Trust',
    shortName: 'Fossil Fuel Decommissioning Trust',
    description:
      'Funded by a Reparations Levy to decommission legacy infrastructure and manage reparations. Handles the liabilities an energy transition leaves behind, which are otherwise abandoned to whoever lives nearest.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_conduit_protocol', 'framework_sundown_protocol']
  },
  {
    id: 'institution_cic',
    type: 'Institution',
    name: 'Crisis Infrastructure Command',
    shortName: 'Crisis Infrastructure Command',
    description:
      'Chartered by the GIC and activated through Meta-Governance emergency coordination to manage infrastructure during a crisis. Coordination is not command: the underlying operational authority stays with the jurisdictions and operators that hold it.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['council_gic', 'process_crisis_command']
  }
];

export const conduitProtocolRelationships: GgfRelationship[] = [
  // --- framework_conduit_protocol -----------------------------------------
  {
    from: 'framework_conduit_protocol',
    to: 'council_gic',
    type: 'ESTABLISHES',
    description: 'Establishes the standards-setting council.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'institution_bga',
    type: 'ESTABLISHES',
    description: 'Establishes bioregional grid authorities as the operating layer.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'institution_decom_trust',
    type: 'ESTABLISHES',
    description: 'Establishes the decommissioning trust and its reparations mandate.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'institution_cic',
    type: 'ESTABLISHES',
    description: 'Establishes crisis infrastructure coordination.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'Derives its commons standing from the Treaty rather than from operating the assets.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'framework_digital_commons',
    type: 'SUPPORTS',
    description:
      'Carries the mesh network, cybersecurity hardening and community-resilience obligations that Digital Commons v3.0 migrated here.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'framework_water_sanitation',
    type: 'SUPPORTS',
    description: 'Water delivery infrastructure is part of the same commons.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'framework_aubi',
    type: 'ENABLES',
    description:
      'Universal service floors make basic infrastructure access a precondition rather than a purchase.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'framework_drr',
    type: 'GUIDES',
    description: 'Infrastructure standards set the ceiling on achievable resilience.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'framework_mobility_commons',
    type: 'COORDINATES_WITH',
    description: 'Transport and energy infrastructure share corridors, funding and grid load.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_conduit_protocol',
    to: 'mechanism_gcf',
    type: 'DEPENDS_ON',
    description: 'Capital for commons infrastructure comes through the Global Commons Fund.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- inbound guidance ----------------------------------------------------
  {
    from: 'framework_hearthstone',
    to: 'framework_conduit_protocol',
    type: 'ENABLES',
    description:
      'Stewardship Trusts are how infrastructure assets are held once converted out of private ownership.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_climate_energy',
    to: 'framework_conduit_protocol',
    type: 'GUIDES',
    description: 'Energy transition targets set what the grid has to become.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aurora_accord',
    to: 'framework_conduit_protocol',
    type: 'GUIDES',
    description: 'Data infrastructure operates under Aurora custodial duties.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_conduit_protocol',
    type: 'GUIDES',
    description:
      'Consent governs infrastructure siting, corridors and extraction affecting Indigenous territory.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // --- institutional wiring -------------------------------------------------
  {
    from: 'council_gic',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The GIC is a domain council within Meta-Governance.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gic',
    to: 'institution_bga',
    type: 'GUIDES',
    description: 'Sets interoperability standards the grid authorities implement locally.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_bga',
    to: 'institution_commons_transition_office',
    type: 'ESCALATES_TO',
    description: 'Asset transition questions route to the commons transition office.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'institution_bga',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Grid authorities operate within BAZ governance where a BAZ exists.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_decom_trust',
    to: 'framework_justice',
    type: 'INTEGRATES_WITH',
    description: 'Reparations claims run through the justice modalities.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_decom_trust',
    to: 'framework_work_liberation',
    type: 'COORDINATES_WITH',
    description:
      'Decommissioning is where energy workers land; the transition is a labour question before it is a technical one.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cic',
    to: 'process_crisis_command',
    type: 'REPORTS_TO',
    description:
      'Activated through Meta-Governance emergency coordination, which may coordinate but not command.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  {
    from: 'institution_cic',
    to: 'institution_bga',
    type: 'COORDINATES_WITH',
    description: 'Crisis coordination runs through the authorities that operate the assets.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  }
];
