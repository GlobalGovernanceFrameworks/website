// /src/lib/data/schema/cluster.justice-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: JUSTICE OPERATING SYSTEM
 *
 * Peace, Justice and Shield now share a controlling interface — SCPA/0.1,
 * the Security, Coercion, and Protective Action Interface Specification — and
 * each carries an explicit non-authority clause. Justice v1.4 §1.2 states that
 * the framework does not create a court, prosecutor, police service,
 * enforcement body, tax, sanction, detention power, or compulsory process, and
 * does not convert the MOS or any other GGF framework into law.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * CROSS-FRAMEWORK CONFLICT. `process_vbt` is described as diagnosing conflicts
 * "based on developmental stages". MOS v2.8.2 §6.2 forbids any GGF body from
 * assessing or storing a developmental stage for a person, community, religion,
 * nation or political group, or letting a stage affect credibility, standing or
 * remedy. Peace v1.8.1 keeps the Spiral vocabulary but as translation, not
 * diagnosis. The entity is reframed here; the wider terminology sweep is yours.
 *
 * ALSO OPEN. Justice v1.4 no longer names the Digital Justice Tribunal or the
 * Ecological Justice Tribunals; Shield v2.0.1 references GEM twelve times while
 * Treaty v1.3 has dropped it. The enforcement layer is inconsistent across the
 * three documents.
 */

export const justiceOSEntities: GgfEntity[] = [
  // === CONTROLLING INTERFACE ===
  {
    id: 'protocol_scpa',
    type: 'Protocol',
    name: 'Security, Coercion, and Protective Action Interface Specification',
    shortName: 'SCPA',
    description:
      'The shared boundary specification governing when protective action, coercion and security cooperation are lawful, and what a framework may never authorize on its own. Named as the primary or constitutional controlling interface by Peace v1.8.1 and Shield v2.0.1.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'protocol_constitutional_interface' // cluster: governance-os
    ]
  },

  // === PEACE & CONFLICT RESOLUTION ===
  {
    id: 'framework_peace',
    type: 'Framework',
    name: 'Peace & Conflict Resolution Framework',
    shortName: 'Peace Framework',
    description:
      'Voluntary prevention, mediation, ceasefire support, reconciliation and just peacebuilding. Participation is voluntary throughout and the framework confers no power to deploy, compel or intervene.',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['protocol_scpa'],
    enables: ['council_gpc', 'process_vbt', 'institution_rrt_peace'],
    ui: {
      path: '/frameworks/peace-and-conflict-resolution',
      titleKey: 'framework.docs.nav.frameworkTitles.peaceAndConflictResolution',
      emoji: '🕊️',
      slug: 'peace-and-conflict-resolution',
      group: 'socialFabricJustice',
      outline: {
        version: 'v1.8.1',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'Peacebuilding offered rather than imposed: every mechanism here is voluntary, and the framework says eighteen separate times what it may not do. Version 1.8.1 pins its sources by SHA-256 and records that no absent annex, institution, legal power or empirical result was silently supplied — an unusual discipline for a document of this kind, and a useful one when the subject is who may use force.'
      }
    }
  },
  {
    id: 'council_gpc',
    type: 'Council',
    name: 'Global Peace Council',
    shortName: 'Global Peace Council',
    description:
      'Coordinates peacebuilding strategy and mediation offers. Convening and advisory; it does not direct parties or authorize deployment.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_peace']
  },
  {
    id: 'process_vbt',
    type: 'Process',
    // name updated from 'Values-Based Transformation', which v1.8.1 no longer uses
    name: 'Spiral Peacecraft',
    shortName: 'Spiral Peacecraft',
    description:
      'Methodology for expressing the same substantive peace proposal through different value vocabularies, so that parties can hear it. Translation, not diagnosis: MOS §6.2 forbids assigning a developmental stage to any person, community, nation or political group, or letting a stage affect standing or remedy.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_peace', 'tool_spiral_translation_guide']
  },
  {
    id: 'institution_rrt_peace',
    type: 'Institution',
    name: 'Peace Teams',
    shortName: 'Peace Teams',
    description:
      'Trained external mediators drawn from a roster and offered to parties in an active crisis. Deployment requires invitation; there is no rapid-response power to enter uninvited.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_peace', 'process_vbt']
  },
  {
    id: 'process_trc',
    type: 'Process',
    name: 'Truth and Reconciliation Process',
    shortName: 'Truth & Reconciliation',
    description:
      'Community-led processes for post-conflict healing and transitional justice. NOTE: not named in Peace v1.8.1, which handles reconciliation through the restorative modality in Justice v1.4 §2.3. Retained because Justice, Pathfinder, Mental Health and Memorial Commons all still reference it.',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Justice',
    geographicScope: 'Regional',
    implementationPriority: 'High',
    dependencies: ['framework_justice']
  },

  // === JUSTICE SYSTEMS ===
  {
    id: 'framework_justice',
    type: 'Framework',
    name: 'Justice Systems Framework',
    shortName: 'Justice Systems',
    description:
      'Plural jurisdiction, due process, restoration and remedy across seven modalities: adjudication, mediation, restorative process, protective action, investigation, prosecution and enforcement. §1.2 is a non-authority clause — the framework creates no court, no prosecutor, no enforcement body, and no jurisdiction over anyone.',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'protocol_constitutional_interface' // cluster: governance-os
    ],
    ui: {
      path: '/frameworks/justice-systems',
      titleKey: 'framework.docs.nav.frameworkTitles.justiceSystems',
      emoji: '⚖️',
      slug: 'justice-systems',
      group: 'socialFabricJustice',
      outline: {
        version: 'v1.4',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'A map of how justice can work when several legal orders — domestic, Indigenous, treaty-based — cover the same ground and none of them can be declared the real one. Version 1.4 organizes around seven modalities rather than institutions, and opens with a clause listing what it does not do: no offences, no jurisdiction, no court, no prosecutor, no detention power, and no conversion of an ethical framework into law.'
      }
    }
  },
  {
    id: 'institution_gjo',
    type: 'Institution',
    name: 'Global Justice Oversight Body',
    shortName: 'Global Justice Oversight',
    description:
      'Monitors implementation and compliance across participating justice systems. Oversight and reporting; not an appellate authority.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_justice']
  },
  {
    id: 'institution_cjet',
    type: 'Institution',
    name: 'Climate and Ecological Justice Tribunals',
    shortName: 'Ecological Justice Tribunals',
    description:
      'Specialized chamber of the Digital Justice Tribunal for ecocide cases. NOTE: constituted by the Tribunal under Treaty authority, not by the Justice framework — v1.4 §1.2 forbids the framework from creating a court, and does not name this body.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'institution_dj_tribunal' // cluster: constitutional-foundation
    ]
  },

  // === THE SHIELD PROTOCOL ===
  {
    id: 'framework_shield',
    type: 'Framework',
    name: 'The Shield Protocol',
    shortName: 'Shield Protocol',
    description:
      'Transnational crime cooperation, mutual legal assistance, cyber defence, asset recovery and victim protection. Scoped to conduct already criminalized by applicable law with a material cross-border dimension — it supports cooperation between existing authorities rather than creating a police power.',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'protocol_scpa',
      'framework_justice'
    ],
    enables: ['council_tsc', 'institution_gcic', 'institution_getf'],
    ui: {
      path: '/frameworks/shield-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.shieldProtocol',
      emoji: '🛡️',
      slug: 'shield-protocol',
      group: 'socialFabricJustice',
      outline: {
        version: 'v2.0.1',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'Cooperation machinery for crime that crosses borders — trafficking, kleptocracy, laundering, ransomware, arms — built on mutual legal assistance rather than a new enforcement power. Version 2.0.1 narrows the scope to conduct already criminalized under applicable law, and carries a non-authority clause: a framework that can name an offence but not create one is much harder to turn into a pretext.'
      }
    }
  },
  {
    id: 'council_tsc',
    type: 'Council',
    name: 'Transnational Security Council',
    shortName: 'Security Council',
    description:
      'Specialized Meta-Governance council coordinating on transnational threats, bounded by the SCPA interface.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_shield']
  },
  {
    id: 'institution_gcic',
    type: 'Institution',
    name: 'Global Crime Intelligence Center',
    shortName: 'GCIC',
    description:
      'Intelligence fusion and analysis hub for cross-border criminal threats. Analysis only; it holds no operational or arrest power.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_shield']
  },
  {
    id: 'institution_getf',
    type: 'Institution',
    name: 'Global Enforcement Task Force',
    shortName: 'GETF',
    description:
      'Poly-jurisdictional operational support, acting on the authority of participating jurisdictions and tribunal rulings. Shield itself cannot authorize armed deployment, asset seizure, or compulsory sanction.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_shield',
      'institution_gem' // cluster: constitutional-foundation
    ]
  }
];

export const justiceOSRelationships: GgfRelationship[] = [
  // --- controlling interface ---------------------------------------------
  {
    from: 'framework_peace',
    to: 'protocol_scpa',
    type: 'DEPENDS_ON',
    description: 'SCPA/0.1 is the primary controlling interface for Peace v1.8.1.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_shield',
    to: 'protocol_scpa',
    type: 'DEPENDS_ON',
    description: 'SCPA/0.1 is the constitutional controlling interface for Shield v2.0.1.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_justice',
    to: 'protocol_constitutional_interface',
    type: 'DEPENDS_ON',
    description:
      'v1.4 conforms to the Constitutional Interface Specification for plural legitimacy, decision classes and framework authority boundaries.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // --- escalation chain ---------------------------------------------------
  {
    from: 'framework_peace',
    to: 'framework_justice',
    type: 'ESCALATES_TO',
    description:
      'Where voluntary resolution fails, the matter moves to the justice modalities. Escalation is a referral, not a transfer of authority.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_justice',
    to: 'framework_shield',
    type: 'ESCALATES_TO',
    description:
      'Criminal matters with a cross-border dimension move to Shield cooperation channels.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'institution_gjo',
    to: 'framework_shield',
    type: 'DELEGATES_TO',
    description: 'Global Justice Oversight refers enforcement cooperation to Shield.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- framework_peace ----------------------------------------------------
  {
    from: 'framework_peace',
    to: 'council_gpc',
    type: 'ESTABLISHES',
    description: 'Establishes the Global Peace Council as a convening and advisory body.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_peace',
    to: 'process_vbt',
    type: 'ESTABLISHES',
    description: 'Establishes Spiral Peacecraft as the translation methodology.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_peace',
    to: 'institution_rrt_peace',
    type: 'ESTABLISHES',
    description: 'Establishes the roster from which external peace teams are offered.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'council_gpc',
    to: 'process_vbt',
    type: 'OVERSEES',
    description: 'The Council oversees methodology development and its misuse safeguards.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_vbt',
    to: 'institution_rrt_peace',
    type: 'GUIDES',
    description: 'Spiral Peacecraft guides how peace teams frame proposals to parties.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_peace',
    to: 'framework_migration',
    type: 'COORDINATES_WITH',
    description:
      'Displacement is treated as a conflict outcome; Migration is a pinned source of v1.8.1.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_peace',
    to: 'framework_indigenous',
    type: 'COLLABORATES_WITH',
    description:
      'Defers to Indigenous legal orders and consent rules rather than offering mediation over them.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_peace',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Mediation is delivered through BAZ-led processes where a BAZ invites it.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_peace',
    to: 'framework_synoptic',
    type: 'COORDINATES_WITH',
    description:
      'The Synoptic Protocol is a controlling interface for public information during a conflict.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- framework_justice --------------------------------------------------
  {
    from: 'framework_justice',
    to: 'institution_gjo',
    type: 'GUIDES',
    // was ESTABLISHES — §1.2 forbids the framework from creating an enforcement
    // or oversight body
    description:
      'Sets the standards the oversight body applies. The body itself is constituted under Treaty authority.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_justice',
    to: 'institution_cjet',
    type: 'GUIDES',
    // was ESTABLISHES — see above; the Tribunal constitutes this chamber
    description:
      'Supplies the ecological justice modality; the chamber is constituted by the Digital Justice Tribunal.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_justice',
    to: 'process_trc',
    type: 'ESTABLISHES',
    description: 'The restorative modality (§2.3) is the framework home for reconciliation work.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_gjo',
    to: 'institution_cjet',
    type: 'OVERSEES',
    description: 'Coordinates ecological justice proceedings across jurisdictions.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_dj_tribunal',
    to: 'framework_justice',
    type: 'IMPLEMENTS',
    description: 'The Tribunal is where the adjudication modality becomes an actual forum.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_dj_tribunal',
    to: 'institution_cjet',
    type: 'ESTABLISHES',
    description: 'The Tribunal constitutes its ecological justice chamber.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'process_trc',
    to: 'framework_justice',
    type: 'COLLABORATES_WITH',
    description: 'Restorative process runs alongside adjudication rather than replacing it.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_dynamic_rights_spectrum',
    to: 'framework_justice',
    type: 'GUIDES',
    description:
      'The MOS spectrum informs justice reasoning. §1.2 is explicit that this framework does not convert the MOS into law — advice does not become an offence by being persuasive.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_justice',
    type: 'GUIDES',
    description:
      'Indigenous legal orders are treated as jurisdictions, not as inputs. The framework may not constitute or recognize Indigenous authorities on their behalf.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_justice',
    to: 'framework_polycentric_governance',
    type: 'COORDINATES_WITH',
    description:
      'Plural jurisdiction across territorial, commons, practice and Indigenous authorities is the same problem seen from the legal side.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_justice',
    to: 'framework_hearthstone',
    type: 'INTEGRATES_WITH',
    description:
      'The restorative modality supplies the mechanisms Hearthstone rematriation work depends on.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },

  // --- framework_shield ---------------------------------------------------
  {
    from: 'framework_shield',
    to: 'council_tsc',
    type: 'ESTABLISHES',
    description: 'Establishes the Transnational Security Council as a coordination venue.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_shield',
    to: 'institution_gcic',
    type: 'ESTABLISHES',
    description: 'Establishes the intelligence fusion hub, with analysis-only limits.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_shield',
    to: 'institution_getf',
    type: 'ESTABLISHES',
    description:
      'Defines the task force. Operational authority comes from participating jurisdictions and tribunal rulings, not from Shield.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'council_tsc',
    to: 'institution_getf',
    type: 'OVERSEES',
    description: 'The Council directs task force priorities within the SCPA boundary.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_tsc',
    to: 'institution_gcic',
    type: 'OVERSEES',
    description: 'Strategic direction and access limits for the intelligence hub.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_gcic',
    to: 'institution_getf',
    type: 'INFORMS',
    description: 'Intelligence shapes operational priorities. An assessment is not a warrant.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_getf',
    to: 'institution_gem',
    type: 'IMPLEMENTS',
    description:
      'GETF operates as a specialized unit of the Global Enforcement Mechanism. Shield still relies on GEM although Treaty v1.3 no longer names it.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_shield',
    to: 'framework_aurora_accord',
    type: 'ENFORCES',
    description:
      'Investigates and supports prosecution of major violations of Aurora Accord cybersecurity mandates, particularly attacks on Indigenous data sovereignty.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_shield',
    to: 'framework_technology_governance',
    type: 'DEPENDS_ON',
    description: 'Technology Governance v3.6 is a named controlling interface for cyber defence.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_shield',
    to: 'framework_hearthstone',
    type: 'ENFORCES',
    description:
      'Supplies the hard-enforcement tier for rematriation legal protocols against non-compliant actors.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_shield',
    to: 'framework_kintsugi_protocol',
    type: 'COORDINATES_WITH',
    description:
      'Victim protection hands off to harm-repair processes rather than ending at prosecution.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- meta-governance and funding ----------------------------------------
  {
    from: 'council_gpc',
    to: 'council_mgcc',
    type: 'COORDINATES_WITH',
    description: 'The Peace Council operates within the Meta-Governance architecture.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_tsc',
    to: 'council_mgcc',
    type: 'COORDINATES_WITH',
    description: 'The Security Council operates within the Meta-Governance architecture.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_peace',
    type: 'FUNDS',
    description: 'The Global Commons Fund resources peacebuilding.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_justice',
    type: 'FUNDS',
    description: 'The Global Commons Fund finances justice system implementation.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_shield',
    type: 'FUNDS',
    description: 'The Global Commons Fund resources transnational crime cooperation.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
