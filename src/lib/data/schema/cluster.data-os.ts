// /src/lib/data/schema/cluster.data-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: DATA OPERATING SYSTEM
 * The Aurora Accord — data governance without creating a single authority over
 * the world's data. Carries the same non-authority clause pattern as Justice,
 * Technology Governance and the MOS.
 *
 * Conventions: see cluster.implementation-os.ts.
 */

export const dataOSEntities: GgfEntity[] = [
  {
    id: 'framework_aurora_accord',
    type: 'Framework',
    name: 'Aurora Accord',
    shortName: 'Aurora Accord',
    description:
      'Data rights, fiduciary duties, federated stewardship and digital sovereignty interfaces. Governs data relationships without creating one authority over the world\'s data: authority is operation-specific, and there is no implied public-interest override.',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'protocol_constitutional_interface' // cluster: governance-os
    ],
    enables: [
      'framework_digital_commons' // cluster: cultural-knowledge
    ],
    ui: {
      path: '/frameworks/aurora-accord',
      titleKey: 'framework.docs.nav.frameworkTitles.auroraAccord',
      emoji: '📜',
      slug: 'aurora-accord',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v1.3',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'Data governance built on the premise that nobody should end up in charge of all of it. Custodians carry enforceable duties, individuals and communities get real agency over collection, inference, transfer and model training, and interoperability is designed to widen exit rather than concentrate custody. Indigenous data sovereignty is treated as a distinct legal relationship, not as stakeholder consultation with extra steps. Not yet a binding agreement, and explicit that it awaits Indigenous-led, legal, technical, public and labour review.'
      }
    }
  }
];

export const dataOSRelationships: GgfRelationship[] = [
  // --- framework_aurora_accord -------------------------------------------
  {
    from: 'framework_aurora_accord',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'Draws jurisdiction, institutions, enforcement and emergency authority from the Treaty rather than asserting its own.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aurora_accord',
    to: 'protocol_constitutional_interface',
    type: 'DEPENDS_ON',
    description:
      'v1.3 conforms to the Constitutional Interface Specification for plural legitimacy, decision classes, observation and authority boundaries.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_aurora_accord',
    type: 'GUIDES',
    description:
      'Indigenous data sovereignty, consent, protected knowledge and the non-certification clause bound what the Accord may govern.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aurora_accord',
    to: 'framework_digital_commons',
    type: 'ENABLES',
    description:
      'Supplies the rights and custodial duties the knowledge commons operates under.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_aurora_accord',
    to: 'framework_justice',
    type: 'ESCALATES_TO',
    description:
      'Data harms requiring remedy escalate to the justice modalities; the Accord provides no adjudication of its own.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_aurora_accord',
    to: 'framework_synoptic',
    type: 'COORDINATES_WITH',
    description:
      'Where data governance meets information integrity: inference, recommendation and epistemic rights sit across both.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aurora_accord',
    to: 'platform_love_ledger',
    type: 'GUIDES',
    description:
      'Sets privacy and sovereignty rules for contribution records, reinforcing the firewall against their use as a work-history or credit signal.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aurora_accord',
    to: 'framework_hearthstone',
    type: 'GUIDES',
    description:
      'Supplies data sovereignty, privacy and cybersecurity rules for Hearthstone platforms, particularly the Commons Title Registry.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aurora_accord',
    to: 'framework_aubi',
    type: 'GUIDES',
    description:
      'Epistemic rights and protected unobservability in AUBI measurement are Aurora relationships expressed in an economic setting.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  }
];
