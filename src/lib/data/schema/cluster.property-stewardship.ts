// /src/lib/data/schema/cluster.property-stewardship.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 2: PROPERTY & STEWARDSHIP
 * The Hearthstone Protocol — voluntary conversion of private, extractive
 * ownership into shared stewardship, plus the legal instruments that make it
 * operable.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * ID DRIFT. The outline declares `framework_property_stewardship`; the schema
 * id `framework_hearthstone` is canonical and referenced across eleven clusters.
 * Cheapest fix is to correct the outline.
 *
 * v2.0.1 NON-AUTHORITY. The protocol "may invite, advise, fund where separately
 * authorized, mediate, provide model instruments, support claims, facilitate
 * voluntary transactions, prepare lawful records, monitor agreed stewardship
 * duties, and route disputes. It may not compel transfer, extinguish claims,
 * appoint guardians, designate sacredness for another people, issue tariffs,
 * freeze funds, impose sanctions, arrest, seize, restrain, or use force."
 * Several ESTABLISHES edges here are the protocol defining an instrument, not
 * the protocol conferring a power.
 */

export const hearthstoneEntities: GgfEntity[] = [
  {
    id: 'framework_hearthstone',
    type: 'Framework',
    name: 'The Hearthstone Protocol',
    shortName: 'Hearthstone Protocol',
    description:
      'Voluntary commons conversion, rematriation, stewardship trusts and constitutionally bounded asset transition. Provides model instruments and mediation for moving assets from extractive private ownership into shared stewardship, without any power to compel a transfer or extinguish a claim.',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'framework_indigenous', // cluster: ethical-os
      'framework_justice' // cluster: justice-os
    ],
    enables: [
      'institution_stewardship_trust',
      'institution_commons_transition_office',
      'platform_commons_registry',
      'protocol_rematriation_legal'
    ],
    ui: {
      path: '/frameworks/hearthstone-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.hearthstoneProtocol',
      emoji: '🏡',
      slug: 'hearthstone-protocol',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v2.0.3',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'A route out of extractive ownership that depends entirely on the owner agreeing to take it — and a long list of the things it therefore cannot do. Version 2.0.1 states the distinctions as a litany: voluntary conversion is not rematriation, rematriation is not confiscation, rights recognition is not title, sacredness is not conveyance, stewardship is not ownership, urgency is not receivership, and a registry is not law. Affected Indigenous nations determine their own representation, consent and preferred remedy; the protocol does not designate sacredness on anyone\'s behalf.'
      }
    }
  },
  {
    id: 'institution_stewardship_trust',
    type: 'Institution',
    name: 'Stewardship Trust',
    shortName: 'Stewardship Trust',
    description:
      'A legal entity holding an asset for regenerative purpose in place of private title. Stewardship expresses relationship and duty; relationship alone does not create legal power, and the trust holds only what a competent jurisdiction recognises it as holding.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_hearthstone']
  },
  {
    id: 'institution_biocultural_stewardship_trust',
    type: 'Institution',
    name: 'Bio-Cultural Stewardship Trust',
    shortName: 'Bio-Cultural Stewardship Trust',
    description:
      'A subtype of Stewardship Trust for assets where ecology and culture cannot be separated — a watershed that is also a burial ground, a forest that is also a language.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Ecological',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['institution_stewardship_trust', 'framework_indigenous']
  },
  {
    id: 'institution_commons_transition_office',
    type: 'Institution',
    name: 'Office of Commons Transition',
    shortName: 'Office of Commons Transition',
    description:
      'Provides legal, mediation and technical support for asset transition. Support and facilitation only: it cannot compel a transfer or freeze an asset.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_hearthstone']
  },
  {
    id: 'institution_icc',
    type: 'Institution',
    name: 'International Commons Court',
    shortName: 'International Commons Court',
    description:
      'A specialized chamber within the Digital Justice Tribunal for commons disputes. Constituted by the Tribunal under Treaty authority, not by this protocol.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'institution_dj_tribunal' // cluster: constitutional-foundation
    ]
  },
  {
    id: 'platform_commons_registry',
    type: 'Platform',
    name: 'Commons Title Registry',
    shortName: 'Commons Title Registry',
    description:
      'A registry of stewarded assets, integrated with the Love Ledger. A record of what has been lawfully agreed — v2.0.1 is explicit that a registry is not law.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_hearthstone', 'framework_aurora_accord']
  },
  {
    id: 'protocol_sacred_trust',
    type: 'LegalProtocol',
    name: 'Sacred Trust Designation Process',
    shortName: 'Sacred Trust Designation Process',
    description:
      'A process by which an affected people may designate assets as sacred and inalienable. The GGF does not designate sacredness for another people, and the Earth Council interface exists to receive such a designation rather than to issue one.',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_hearthstone', 'framework_indigenous']
  },
  {
    id: 'protocol_rematriation_legal',
    type: 'LegalProtocol',
    name: 'Rematriation Legal Protocol',
    shortName: 'Rematriation Legal Protocol',
    description:
      'Model instruments for transferring land to BAZ stewardship, routed through the International Commons Court. Claims — title, occupancy, use, tenancy, labour, customary, public and reparative — must be mapped before any consequential transfer.',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_hearthstone', 'institution_icc']
  },
  {
    id: 'protocol_ethical_ip',
    type: 'LegalProtocol',
    name: 'Ethical IP Protocol',
    shortName: 'Ethical IP Protocol',
    description:
      'Terms on which intellectual property may be held in stewardship rather than as exclusive private right, supporting the IP Commons in the Prometheus Protocol.',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_hearthstone']
  },
  {
    id: 'initiative_land_rematriation',
    type: 'Initiative',
    name: 'Land Rematriation Initiative',
    shortName: 'Land Rematriation',
    description:
      'GCF-funded purchase of ecologically and culturally significant land for return to BAZ stewardship. Purchase rather than expropriation, because the protocol cannot compel a transfer.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_hearthstone', 'mechanism_gcf']
  }
];

export const hearthstoneRelationships: GgfRelationship[] = [
  // --- framework_hearthstone: instruments it defines ----------------------
  {
    from: 'framework_hearthstone',
    to: 'institution_stewardship_trust',
    type: 'ESTABLISHES',
    description:
      'Defines the Stewardship Trust as a model instrument. Whether one exists in a given jurisdiction is that jurisdiction\'s decision.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_hearthstone',
    to: 'institution_commons_transition_office',
    type: 'ESTABLISHES',
    description: 'Establishes the support office for legal, mediation and technical assistance.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_hearthstone',
    to: 'platform_commons_registry',
    type: 'ESTABLISHES',
    description: 'Establishes the registry of stewarded assets.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_hearthstone',
    to: 'protocol_rematriation_legal',
    type: 'ESTABLISHES',
    description: 'Establishes model instruments for land return to BAZ stewardship.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_hearthstone',
    to: 'protocol_sacred_trust',
    type: 'ESTABLISHES',
    description:
      'Establishes the process for receiving a sacredness designation from an affected people.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_hearthstone',
    to: 'protocol_ethical_ip',
    type: 'ESTABLISHES',
    description: 'Establishes stewardship terms for intellectual property.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_stewardship_trust',
    to: 'institution_biocultural_stewardship_trust',
    type: 'ENABLES',
    description: 'The bio-cultural trust is a subtype for inseparably ecological-cultural assets.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },

  // --- constitutional bounds and routing ----------------------------------
  {
    from: 'framework_hearthstone',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'Draws its legal standing from the Treaty; commons purpose does not by itself create commons jurisdiction.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_fpic2',
    to: 'protocol_rematriation_legal',
    type: 'GUIDES',
    description: 'Consent, refusal and withdrawal govern every rematriation transaction.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_dj_tribunal',
    to: 'institution_icc',
    type: 'ESTABLISHES',
    description: 'The Tribunal constitutes its commons chamber.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_hearthstone',
    to: 'institution_icc',
    type: 'ESCALATES_TO',
    description:
      'Contested conversions and rematriation disputes are routed to the court rather than resolved by the protocol.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'protocol_rematriation_legal',
    to: 'institution_baz',
    type: 'DELEGATES_TO',
    description: 'Rematriated land passes to BAZ stewardship on the receiving nation\'s terms.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_sacred_trust',
    to: 'council_earth',
    type: 'REPORTS_TO',
    description:
      'Designations are received through the Earth Council interface where a people chooses to route them there. The GGF cannot designate on their behalf.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_commons_transition_office',
    to: 'initiative_land_rematriation',
    type: 'OVERSEES',
    description: 'Coordinates the rematriation initiative as facilitation, not administration.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'platform_commons_registry',
    to: 'institution_stewardship_trust',
    type: 'IMPLEMENTS',
    description: 'The registry records what trusts hold, and only what has been lawfully agreed.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'platform_commons_registry',
    to: 'platform_love_ledger',
    type: 'INTEGRATES_WITH',
    description: 'Stewardship duties and their fulfilment are visible alongside contribution records.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_ethical_ip',
    to: 'institution_pip_commons',
    type: 'ENABLES',
    description:
      'Supplies the legal terms on which the Prometheus IP Commons holds patents and know-how.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_biocultural_stewardship_trust',
    to: 'framework_biodiversity',
    type: 'SUPPORTS',
    description:
      'Gives Indigenous-led biodiversity stewardship a legal container that survives a change of government.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  }
];
