// /src/lib/data/schema/cluster.ethical-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: ETHICAL OPERATING SYSTEM
 *
 * Two frameworks that both spent their most recent revision giving power away.
 * The Indigenous Sovereignty framework became invitational — binding on the GGF,
 * proposing nothing to anyone else. The MOS became explicitly advisory, with
 * "Authority effect: None" in its own front matter.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * RECOGNITION, NOT CREATION. Indigenous Sovereignty v1.1 §1.2 and §6.1 state
 * that the GGF shall not create a universal Earth Council or Indigenous Wisdom
 * Council, and removes any implication that it can create, name, compose or
 * certify such a body. Indigenous peoples may form one council, several, a
 * confederation, temporary delegations, a network, or no shared body at all.
 * `council_earth` is therefore no longer ESTABLISHED by the framework; what the
 * framework offers is a provisional interface for whatever body chooses to
 * engage. The entity is retained because roughly twenty other frameworks route
 * authority through it, but the edge type had to change.
 *
 * MOS PRUNING. Six child entities are no longer described in MOS v2.8.2:
 * `protocol_moon_wish_test`, `tool_sacred_seed_kit`, `campaign_rights_for_all_beings`,
 * `metric_consciousness_alignment_index`, `tool_contemplative_assessment_tools`
 * and `process_speculative_paradigm_pilot`. None is referenced from another
 * cluster, so they can be deleted cleanly — but Sacred Seed Kit still appears in
 * the Kinship Garden outline, so it may want re-parenting rather than deletion.
 * They are marked here, not removed.
 */

export const ethicalOSEntities: GgfEntity[] = [
  // === INDIGENOUS SOVEREIGNTY ===
  {
    id: 'framework_indigenous',
    type: 'Framework',
    // trailing space removed from the previous name
    name: 'Indigenous Sovereignty and Planetary Healing Framework',
    shortName: 'Indigenous Sovereignty Pathways',
    description:
      'An invitational framework that binds the GGF before it proposes anything to anyone else. Separates binding GGF obligations from provisional proposals and community-determined possibilities, and carries a non-certification clause: no universal Indigenous framework, no selection formulas, no proxy authority.',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'protocol_constitutional_interface' // cluster: governance-os
    ],
    enables: ['institution_baz', 'protocol_fpic2'],
    ui: {
      path: '/frameworks/indigenous-sovereignty-pathways',
      titleKey: 'framework.docs.nav.frameworkTitles.indigenousSovereigntyPathways',
      emoji: '🪶',
      slug: 'indigenous-sovereignty-pathways',
      group: 'socialFabricJustice',
      outline: {
        version: 'v1.1',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'Written by a non-Indigenous author with AI assistance, and explicit about it: this is a draft offered for Indigenous-led dialogue, not a framework Indigenous peoples have validated. Version 1.1 is mostly a removal — universal representation structures, selection formulas, proxy authorities, Love Ledger benefit tracking, and the assumption that the GGF could constitute an Earth Council all went. What remains is a set of obligations the GGF places on itself, and a Red Lines Clause that anyone invited may modify, disregard, or withdraw from.'
      }
    }
  },
  {
    id: 'council_earth',
    type: 'Council',
    name: 'Earth Council (Kawsay Pacha)',
    shortName: 'Earth Council',
    description:
      'A possible Indigenous-created body for translocal coordination, and the interface the GGF offers should one choose to engage: Treaty and planetary-commons dialogue, transboundary risk notification, submission of conditions, objections or vetoes within valid standing, and protection of knowledge boundaries. v1.1 §6.1 removes any implication that the GGF can create, name, compose or certify it.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical'
    // No `dependencies: ['framework_indigenous']` — the framework describes an
    // interface to this body, it does not bring it into being.
  },
  {
    id: 'institution_baz',
    type: 'Institution',
    name: 'Bioregional Autonomous Zones',
    shortName: 'BAZs',
    description:
      'Indigenous-led governance systems organized on ecosystem rather than administrative boundaries. v1.1 adds explicit territorial and BAZ limits, protected non-transfer, and internal-plurality safeguards — a BAZ does not speak for everyone inside it.',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Regional',
    implementationPriority: 'Critical',
    dependencies: ['framework_indigenous']
  },
  {
    id: 'protocol_fpic2',
    type: 'LegalProtocol',
    name: 'Free, Prior, and Informed Consent 2.0',
    shortName: 'FPIC 2.0',
    description:
      'Consent protocol with veto power for Indigenous communities, covering refusal and withdrawal as well as consent. Note: v1.1 states these rules directly and barely uses the FPIC label, while some twenty other frameworks depend on the term. The entity carries the ecosystem-wide meaning.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Regional',
    implementationPriority: 'Critical',
    dependencies: ['framework_indigenous']
  },
  {
    id: 'protocol_indigenous_ai',
    type: 'Protocol',
    name: 'Indigenous AI Sovereignty Protocol',
    shortName: 'Indigenous AI Protocol',
    description:
      'Governs AI systems trained on or interacting with Traditional Ecological Knowledge: data sovereignty, community consent, and benefit-sharing for anything derived from Indigenous knowledge systems.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_indigenous',
      'protocol_fpic2',
      'framework_technology_governance' // cluster: technology-os
    ]
  },

  // === MORE THAN HUMAN ===
  {
    id: 'framework_more_than_human',
    type: 'Framework',
    name: 'More-Than-Human Governance',
    shortName: 'MTH Governance',
    description:
      'Procedural architecture for representing non-human entities in decision-making: fiduciary guardianship, subsidiarity of voice, and evidentiary pluralism across scientific, traditional, and community knowledge.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_mos', 'framework_indigenous'],
    // No ui block. Unpublished pending resolution of the overlap with the MOS
    // Rights–Guardianship Spectrum and the Oracle Protocol.
    publicationDeferred: {
      reason: 'Overlap with the MOS Rights–Guardianship Spectrum and the Oracle Protocol unresolved.',
      blockedBy: ['framework_mos', 'framework_oracle_protocol']
    }
  },

  // === MORAL OPERATING SYSTEM ===
  {
    id: 'framework_mos',
    type: 'Framework',
    name: 'Moral Operating System',
    shortName: 'MOS',
    description:
      'An advisory ethical deliberation layer, not a source of legal rights, jurisdiction, guardianship, title, funding, emergency authority, sanctions, surveillance, or coercion. Its own front matter records "Authority effect: None". Conforms to the CERGTA/0.1 advisory boundary — a specification not yet represented in this schema.',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Ethics',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'framework_indigenous',
      'framework_meta_gov', // cluster: governance-os
      'protocol_genesis' // cluster: constitutional-foundation
    ],
    enables: [
      'protocol_dynamic_rights_spectrum',
      'protocol_rights_guardianship_spectrum',
      'platform_status_atlas',
      'platform_citizen_reporting_portal',
      'tool_spiral_translation_guide'
    ],
    ui: {
      path: '/frameworks/moral-operating-system',
      titleKey: 'framework.docs.nav.frameworkTitles.moralOperatingSystem',
      emoji: '🦋',
      slug: 'moral-operating-system',
      outline: {
        version: 'v2.8.2',
        updated: '2026-08-02',
        maturity: 'adversarial',
        standfirst:
          'A way of asking who counts, and how much, across humans, animals, ecosystems, future generations and digital entities — deliberately stripped of any power to answer. Version 2.8 kept the ethical project of earlier editions and changed its constitutional role: the MOS may recommend, translate and dissent, but it cannot confer rights, appoint a guardian, allocate funding, or name anyone as morally deficient. Its Spiral Translation Guide comes with an explicit prohibition on assigning a developmental stage to any person or group.'
      }
    }
  },

  // === MOS CHILD ENTITIES (retained) ===
  {
    id: 'protocol_dynamic_rights_spectrum',
    type: 'LegalProtocol',
    name: 'Dynamic Rights Spectrum',
    shortName: 'Dynamic Rights Spectrum',
    description:
      'The core MOS instrument for reasoning about moral consideration across humans, animals, ecosystems, digital and emergent entities. Advisory: it frames the question, it does not settle legal status.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Ethics',
    implementationPriority: 'High',
    dependencies: ['framework_mos']
  },
  {
    id: 'protocol_rights_guardianship_spectrum',
    type: 'Protocol',
    name: 'Rights–Guardianship Spectrum',
    shortName: 'Guardianship Spectrum',
    description:
      'A pedagogical matrix (MOS §4) for asking how voice, care, autonomy and accountability differ across situations — adult humans, dependent persons, sentient animals, ecosystems. Explicitly not an appointment system: legal guardianship, custody and intervention all require separate authority.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Ethics',
    implementationPriority: 'High',
    dependencies: ['framework_mos']
  },
  {
    id: 'platform_status_atlas',
    // renamed from platform_rights_status_dashboard; MOS §10 replaces the Rights
    // Status Atlas and Dashboard with this two-layer structure
    type: 'Platform',
    name: 'Ethical Deliberation and Legal Status Atlas',
    shortName: 'Status Atlas',
    description:
      'Two strictly separated layers: an advisory layer of open questions, deliberations and dissent, labelled non-binding and time-limited; and an authoritative import layer copying legal status from a competent record. The layers may not share colours, icons, scores or rankings — engagement counts cannot create personhood, guilt, or a funding claim.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Technology',
    implementationPriority: 'High',
    dependencies: [
      'framework_mos',
      'institution_dj_tribunal' // cluster: constitutional-foundation
    ]
  },
  {
    id: 'platform_citizen_reporting_portal',
    type: 'Platform',
    name: 'Citizen Reporting Portal',
    shortName: 'Citizen Reporting Portal',
    description:
      'Mobile-first, multi-language, anonymous portal for reporting rights violations, feeding the advisory layer of the Status Atlas. Public reporting must protect whistleblowers, minors, sacred sites, health information and unresolved allegations.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Technology',
    implementationPriority: 'Medium',
    dependencies: ['framework_mos', 'platform_status_atlas']
  },
  {
    id: 'tool_spiral_translation_guide',
    // renamed from tool_spiral_aware_microlearning; MOS §6. Eight other outlines
    // still say "Spiral Microlearning" or "Spiral Peacecraft" — worth a sweep.
    type: 'Tool',
    name: 'Spiral Translation Guide',
    shortName: 'Spiral Translation Guide',
    description:
      'An optional communication aid for expressing the same substantive proposal through different value vocabularies — duty, stability, effectiveness, care, tradition, freedom, planetary relationship. §6.2 forbids any GGF body from assessing or storing a developmental stage for a person or group, or letting a stage affect credibility, eligibility, rights, hiring, policing, or remedy.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    implementationPriority: 'Medium',
    dependencies: [
      'framework_mos',
      'framework_education' // cluster: human-flourishing
    ]
  },

  // === MOS CHILD ENTITIES (no longer described in v2.8.2) ===
  // Retained for the decision, not because the outline supports them. None is
  // referenced from another cluster; Sacred Seed Kit is the only one still
  // appearing in another framework's outline text (Kinship Garden).
  {
    id: 'tool_sacred_seed_kit',
    type: 'Tool',
    name: 'Sacred Seed Kit',
    shortName: 'Sacred Seed Kit',
    description:
      'Toolkit for BAZs and local communities to initiate dialogues about MOS principles. RETIRED FROM MOS: not described in v2.8.2. Still referenced by the Kinship Garden outline — consider re-parenting there rather than deleting.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'Low',
    dependencies: ['institution_baz']
  },
  {
    id: 'protocol_moon_wish_test',
    type: 'Protocol',
    name: 'Moon Wish Test',
    shortName: 'Moon Wish Test',
    description:
      'Contemplative protocol for assessing long-term ethical implications of planetary-scale intervention. RETIRED: not described in MOS v2.8.2.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Ethics',
    implementationPriority: 'Low',
    dependencies: ['framework_space_governance']
  },
  {
    id: 'tool_contemplative_assessment_tools',
    type: 'Tool',
    name: 'Contemplative Assessment Tools',
    shortName: 'Contemplative Tools',
    description:
      'Methodologies for evaluating systems on presence, clarity, compassion, integrity and creativity. RETIRED: not described in MOS v2.8.2.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Ethics',
    implementationPriority: 'Low'
  },
  {
    id: 'metric_consciousness_alignment_index',
    type: 'DataMetric',
    name: 'Consciousness Alignment Index (CAI)',
    shortName: 'CAI',
    description:
      'Metric of presence, clarity, compassion, integrity and creativity. RETIRED: not described in MOS v2.8.2.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Ethics',
    implementationPriority: 'Low',
    dependencies: ['tool_contemplative_assessment_tools']
  },
  {
    id: 'campaign_rights_for_all_beings',
    type: 'Initiative',
    name: '#RightsForAllBeings Campaign',
    shortName: '#RightsForAllBeings',
    description:
      'Public engagement campaign around MOS principles. RETIRED: not described in MOS v2.8.2, which warns against public naming and gamified moral signalling.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'Low'
  },
  {
    id: 'process_speculative_paradigm_pilot',
    type: 'Process',
    name: 'Speculative Paradigm Pilot',
    shortName: 'Speculative Pilot',
    description:
      'Process for testing the ethical implications of neural interfaces, mycelial networks and DAOs. RETIRED: not described in MOS v2.8.2, and its 2026 target date has passed.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Technology',
    implementationPriority: 'Low',
    dependencies: ['framework_technology_governance']
  }
];

export const ethicalOSRelationships: GgfRelationship[] = [
  // --- framework_indigenous ---------------------------------------------
  {
    from: 'framework_indigenous',
    to: 'framework_treaty',
    type: 'INFORMS',
    description:
      'Rights of Nature and sovereignty principles inform Treaty reforms; v1.1 treats Treaty authority as subject to constitutional revision rather than settled.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_meta_gov',
    type: 'GUIDES',
    description:
      'Coordination must respect Indigenous protocols, consent and knowledge boundaries, and holds no independent substantive sovereignty over them.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'protocol_constitutional_interface',
    type: 'DEPENDS_ON',
    description:
      'v1.1 conforms to the Constitutional Interface Specification for plural legitimacy, jurisdiction, protected continuity, knowledge boundaries and framework authority limits.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'institution_baz',
    type: 'ESTABLISHES',
    description:
      'Defines BAZs as the primary Indigenous-led governance institution, with explicit limits on what a BAZ may claim over those inside it.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_indigenous',
    to: 'protocol_fpic2',
    type: 'ESTABLISHES',
    description: 'Establishes consent, refusal and withdrawal rules for affected nations.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_indigenous',
    to: 'council_earth',
    type: 'COORDINATES_WITH',
    // was ESTABLISHES — v1.1 §6.1 is explicit that the GGF cannot create, name,
    // compose or certify such a body
    description:
      'Offers a provisional interface to any Indigenous-created coordinating body that chooses to engage. Recognition, not creation: peoples may form one council, several, a confederation, a network, or none.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_hearthstone',
    type: 'GUIDES',
    description:
      'Supplies the principles of rematriation, rightful relationship and stewardship that the Hearthstone Protocol is built on.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_aubi',
    type: 'GUIDES',
    description:
      'Sets the limits on AUBI observation: epistemic rights, protected unobservability, and — after v1.1 — no Love Ledger benefit tracking.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_nested_sovereignty',
    type: 'GUIDES',
    description:
      'Protected non-transfer and non-convertibility apply to Indigenous economies as a sovereignty question, not only an economic one.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'protocol_indigenous_ai',
    type: 'ESTABLISHES',
    description:
      'Establishes Indigenous data, knowledge and AI sovereignty over systems touching Traditional Ecological Knowledge.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },

  // --- council_earth, BAZs, consent --------------------------------------
  {
    from: 'council_earth',
    to: 'council_mgcc',
    type: 'OVERSEES',
    description:
      'Where an Earth Council exists and engages, it holds moral and ethical oversight over MGCC coordination.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_earth',
    to: 'institution_baz',
    type: 'COORDINATES_WITH',
    // was OVERSEES — v1.1 §3.5 removes proxy authority; a translocal body does
    // not supervise the peoples who chose to convene it
    description:
      'Coordinates across BAZs without acquiring authority over any of them. No proxy authority: engaging with a coordinating body does not transfer a people\'s standing to it.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_fpic2',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'BAZs are the primary institution through which consent and refusal operate.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_mgcc',
    to: 'institution_baz',
    type: 'DELEGATES_TO',
    description: 'Following subsidiarity, the MGCC delegates local governance to BAZs.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_indigenous_ai',
    to: 'framework_technology_governance',
    type: 'GUIDES',
    description:
      'Binds technology governance where a system is trained on or interacts with Traditional Ecological Knowledge.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // --- framework_more_than_human ------------------------------------------
  {
    from: 'framework_more_than_human',
    to: 'framework_mos',
    type: 'DEPENDS_ON',
    description:
      'Extends the MOS Rights–Guardianship Spectrum into procedural representation. The overlap between the two is unresolved, which is why this framework is unpublished.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_more_than_human',
    to: 'mechanism_guardian_seats',
    type: 'INFORMS',
    description:
      'Supplies the fiduciary guardianship and subsidiarity-of-voice reasoning behind Guardian Seats.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_more_than_human',
    type: 'GUIDES',
    description:
      'Evidentiary pluralism across scientific, traditional and community knowledge is bounded by Indigenous knowledge-protection rules.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },

  // --- framework_mos ------------------------------------------------------
  {
    from: 'protocol_genesis',
    to: 'framework_mos',
    type: 'GUIDES',
    description:
      'The Genesis Conscience & Sovereignty Clause supplies the MOS operating constraints.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'protocol_dynamic_rights_spectrum',
    type: 'ESTABLISHES',
    description: 'Establishes the Dynamic Rights Spectrum as its central advisory instrument.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_mos',
    to: 'protocol_rights_guardianship_spectrum',
    type: 'ESTABLISHES',
    description: 'Establishes the Rights–Guardianship Spectrum as a pedagogical matrix (§4).',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_mos',
    to: 'platform_status_atlas',
    type: 'ESTABLISHES',
    description:
      'Establishes the two-layer Atlas and the separation rules that keep moral support from reading as law (§10).',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_mos',
    to: 'platform_citizen_reporting_portal',
    type: 'ESTABLISHES',
    description: 'Establishes anonymous reporting into the Atlas advisory layer.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_mos',
    to: 'tool_spiral_translation_guide',
    type: 'ESTABLISHES',
    description: 'Establishes the Spiral Translation Guide and its no-stage-assignment rule (§6).',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'platform_citizen_reporting_portal',
    to: 'platform_status_atlas',
    type: 'INFORMS',
    description:
      'Reports enter the advisory layer only, and never the authoritative import layer.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // --- MOS advisory integrations ------------------------------------------
  {
    from: 'framework_mos',
    to: 'framework_treaty',
    type: 'INFORMS',
    description:
      'Offers advisory translation of the Dynamic Rights Spectrum toward ecocide law. The MOS never authors a binding record.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'framework_aubi',
    type: 'INFORMS',
    description:
      'Advises on stewardship recognition without creating a funding claim; engagement cannot generate entitlement.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'framework_work_liberation',
    type: 'INFORMS',
    description:
      'Grounds the protection against systems that tie a person\'s worth to their productivity.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'framework_education',
    type: 'INTEGRATES_WITH',
    description:
      'Supplies the Spiral Translation Guide for curricula, with the stage-assignment prohibition attached.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'framework_technology_governance',
    type: 'INFORMS',
    description:
      'Advises on AI consciousness assessment, and on the anti-surveillance limits in §12.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'council_earth',
    type: 'INFORMS',
    description:
      'Offers guidance for consideration while respecting sovereign precedence. Indigenous authority is recognised in §5, not represented.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'council_phc',
    type: 'INFORMS',
    description: 'Advises the Planetary Health Council on applying the Dynamic Rights Spectrum.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'framework_animal_welfare',
    type: 'INFORMS',
    description:
      'The Rights–Guardianship Spectrum frames suffering, agency, dependence and human-created control for sentient animals, while leaving seizure, treatment and legal standing to competent authority.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_mos',
    type: 'GUIDES',
    description:
      'MOS §5 subordinates its own reasoning to Indigenous authority, cultural plurality and sacred relations.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  }
];
