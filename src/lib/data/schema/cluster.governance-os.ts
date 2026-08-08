// /src/lib/data/schema/cluster.governance-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: GOVERNANCE OPERATING SYSTEM
 *
 * Meta-Governance coordinates; Polycentric Architecture separates. The EGP
 * supplies the grammar both run on. None of the three is a source of
 * substantive authority — that stays with the Treaty and with the institutions
 * that lawfully hold each competence.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * TWO OPEN EDITORIAL QUESTIONS.
 *
 * 1. `layer_wisdom_council`. Polycentric v0.6 §"Non-certification clause" states
 *    that the GGF shall not create a universal Indigenous Wisdom Council, impose
 *    a nomination formula, assign representation quotas, or certify who speaks
 *    for an Indigenous people. The layer is now recognition of Indigenous-
 *    determined institutions, not a GGF body. The entity is reframed here but
 *    keeps its shortName, because eight other outlines still say "Wisdom
 *    Council" — Cultural Heritage, Millennium, Oracle, Deep Time, Cairn,
 *    Disability, Kinship and Regenerative Journeys.
 *
 * 2. `process_circuit_breaker` now carries two unrelated meanings. In Polycentric
 *    it was sortition-based chamber dissolution, which v0.6 retired. In Financial
 *    Systems, GSCL, Gaian Trade and Synoptic it means an automatic containment
 *    halt. These should probably be separate entities.
 */

export const governanceOSEntities: GgfEntity[] = [
  // === META-GOVERNANCE ===
  {
    id: 'framework_meta_gov',
    type: 'Framework',
    name: 'Integrated Meta-Governance Framework',
    shortName: 'Meta-Governance',
    description:
      'A delegated coordination architecture for plural institutions, bounded learning, and lawful adaptation. A connector, not a residual sovereign: a matter does not become a Meta-Governance competence merely because several domains are involved or because a coordination body can imagine a better answer.',
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'protocol_constitutional_interface'
    ],
    enables: ['council_mgcc', 'process_crisis_command', 'council_global_metrology'],
    ui: {
      path: '/frameworks/meta-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.metaGovernance',
      emoji: '🏛️',
      slug: 'meta-governance',
      outline: {
        version: 'v1.6.1',
        updated: '2026-08-06',
        maturity: 'adversarial',
        standfirst:
          'Coordination between institutions that do not answer to one another. Version 1.6.1 preserves strict limits on what coordination may do—it may not legislate, tax, sanction, command forces, inherit another institution’s jurisdiction, or turn indicators into constitutional judgments—while strengthening what responsible coordination must accomplish: map causal responsibility, expose delay and omission, test common dependencies and self-perpetuating incentives, keep administrative burdens proportionate, and close or devolve arrangements that no longer add value. Success is measured not by coordination activity, but by problems resolved, responsibilities clarified, and coordination safely simplified, localized, or ended.'
      }
    }
  },
  {
    id: 'protocol_constitutional_interface',
    type: 'Protocol',
    name: 'Constitutional Interface Specification',
    shortName: 'CIS',
    description:
      'Shared rules for plural legitimacy, decision classes, observation, automation, lawful bypass, authority transfer, and dissolution. Cited as the controlling interface by Meta-Governance, Polycentric Architecture, the IAF, Implementation Methods & Tools, WDMIP and Institutional Regeneration.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty' // cluster: constitutional-foundation
    ],
    ui: {
      path: '/specifications/constitutional-interface',
      titleKey: 'framework.docs.nav.frameworkTitles.constitutionalInterface',
      emoji: '⚖️',
      slug: 'constitutional-interface',
      outline: {
        kind: 'specification',
        version: 'v0.2.4',
        updated: '2026-08-05',
        maturity: 'internal',
        standfirst:
          'Shared constitutional rules for legitimacy, jurisdiction, sovereignty, coordination, and cross-framework power. Legitimacy is plural, interdependence is real, observation is limited, and coordination is not sovereignty — v0.2.4 adds causal responsibility, duties attached to retained jurisdiction, constitutional-gap handling, proportionate process, purpose firewalls for recognition data, and a person-continuity interface for bounded attestation, non-transitive linkage, correction, and externally established status changes without creating a universal identity or civil registry.'
      }
    }
  },
  {
    id: 'protocol_gmeaia',
    type: 'Protocol',
    name: 'Governance Method, Experiment, Adoption, and Implementation Authority Interface Specification',
    shortName: 'GMEAIA',
    description:
      'The lifecycle grammar the constitutional rules run on: authority effects and formation, CP0–CP3 consequence profiles, causal-responsibility records, acknowledgment and action clocks, accepted/refused/deferred/referred/timed-out/capacity-limited/constitutional-gap states, cross-framework handoffs, correction, unresolved duties, and closure. Frameworks supply their domain profile only; they do not redefine the controlled states locally.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'protocol_constitutional_interface'
    ],
    ui: {
      path: '/specifications/gmeaia',
      titleKey: 'framework.docs.nav.frameworkTitles.gmeaia',
      emoji: '🔁',
      slug: 'gmeaia',
      outline: {
        kind: 'specification',
        version: 'v0.2.1',
        updated: '2026-08-05',
        maturity: 'internal',
        standfirst: 'A shared lifecycle grammar for governance work that must move across frameworks without allowing procedure to manufacture power. Version 0.2.1 standardizes consequence profiles, authority formation, causal responsibility, response clocks, handoff states, correction, unresolved duties, and closure, while preserving a strict boundary: frameworks may supply domain-specific requirements, but they may not redefine the shared states or treat conformance as authority, consent, legitimacy, or success.'
      }
    }
  },
  {
    id: 'council_mgcc',
    type: 'Council',
    name: 'Meta-Governance Coordination Council',
    shortName: 'MGCC',
    description:
      'Primary venue for alignment across governance domains. Holds no residual competence: better data or a clearer view of the problem does not transfer jurisdiction to it.',
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
    description:
      "Specialized meta-level council synthesizing intelligence from the ERO, Shield\'s federated purpose-limited exchange nodes, and peace-prediction units into a unified threat assessment for the MGCC. Assessment only; an alert is not an authorization.",
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_meta_gov',
      'institution_ero',
      'platform_federated_crime_exchange_nodes', // cluster: justice-os
      'framework_peace' // cluster: justice-os
    ]
  },
  {
    id: 'process_crisis_command',
    type: 'Process',
    name: 'Crisis Command Protocol',
    shortName: 'Crisis Command',
    description:
      'Temporary configuration of Meta-Governance councils for emergency coordination. v1.5 recasts this as rights-bounded: it coordinates a response, but cannot itself command police, military, emergency or work forces, or suspend rights.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov', 'framework_treaty']
  },
  {
    id: 'protocol_polycentric',
    type: 'Protocol',
    name: 'Polycentric Coordination',
    shortName: 'Polycentric Coordination',
    description: 'The principle of sharing power across many centres rather than a single hierarchy.',
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
    description:
      'Harmonizes linear, cyclical, and multi-horizon timeframes across governance systems, enabling coordination between institutional and Indigenous frameworks without imposing one calendar on the other.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_meta_gov',
      'framework_indigenous' // cluster: ethical-os
    ]
  },
  {
    id: 'council_global_metrology',
    type: 'Council',
    name: 'Global Metrology Council',
    shortName: 'Metrology Council',
    description:
      'Specialized council under the MGCC overseeing universal metrology governance. Mandated composition of 40% Indigenous and traditional, 30% scientific, 30% Global South is intended to keep metrics pluralistic and decolonial.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_meta_gov'],
    enables: ['process_metric_lifecycle']
  },
  {
    id: 'process_metric_lifecycle',
    type: 'Process',
    name: 'Metric Lifecycle Governance Process',
    shortName: 'Metric Lifecycle',
    description:
      'Proposal, co-development, piloting, standardization, periodic review and sunsetting of universal metrics. Sunsetting is a first-class stage, not an afterthought.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['council_global_metrology']
  },

  // === EMERGENT GOVERNANCE PROTOCOL ===
  {
    id: 'framework_egp',
    type: 'Framework',
    name: "Emergent Governance Protocol (The GGF's Minimum Viable Grammar)",
    shortName: 'EGP / MVG',
    description:
      "The Tier 1 operational protocol defining the minimum viable grammar — `sense`, `propose`, `adopt` — for interactions across the GGF ecosystem, enabling decentralized and adaptive governance.",
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty', 'framework_meta_gov'],
    enables: ['protocol_sense', 'protocol_propose', 'protocol_adopt'],
    ui: {
      path: '/frameworks/emergent-governance-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.emergentGovernanceProtocol',
      emoji: '🗣️',
      slug: 'emergent-governance-protocol',
      prose: {
        dir: 'emergent-governance-protocol',
        version: '1.2',
        updated: '2026-08-06',
        maturity: 'internal',
        // Written from the schema description rather than from the prose
        // document, which is not in the outline tree. Check before publishing.
        standfirst:
          'Three verbs instead of an institution. Anyone — a person, a council, a sensor — can `sense` a stressor, anyone can `propose` a time-bound response with test criteria and a sunset clause, and any community can `adopt` it as an experiment. The bet is that a shared grammar spreads further than a shared structure.',
        sections: [
          { id: 'egp-one-page-summary', title: 'One-Page Summary' },
          { id: 'emergent-governance-protocol', title: 'The Protocol' },
          { id: 'egp-appendix', title: 'Implementation Appendix' },
          { id: 'egp-glossary', title: 'Glossary' }
        ]
      }
    }
  },
  {
    id: 'protocol_sense',
    type: 'Protocol',
    name: 'Sense Protocol',
    shortName: 'Sense',
    description:
      "The EGP system call for any agent — human, AI or sensor — to flag a system stressor and generate a standardized stress packet.",
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'High',
    dependencies: ['framework_egp']
  },
  {
    id: 'protocol_propose',
    type: 'Protocol',
    name: 'Propose Protocol',
    shortName: 'Propose',
    description:
      "The EGP system call for any agent to suggest a response to a `sense` signal, carrying context, test criteria and a sunset clause.",
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'High',
    dependencies: ['framework_egp', 'protocol_sense']
  },
  {
    id: 'protocol_adopt',
    type: 'Protocol',
    name: 'Adopt Protocol',
    shortName: 'Adopt',
    description:
      'The EGP system call for a community or institution to implement a proposal as a time-bound experiment.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'High',
    dependencies: ['framework_egp', 'protocol_propose']
  },
  {
    id: 'tool_egp_app',
    type: 'Tool',
    name: 'EGP Prototyping App',
    shortName: 'EGP App',
    description:
      'A minimum viable platform serving as reference implementation and experimental environment for the EGP system calls.',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Technology',
    implementationPriority: 'Medium',
    dependencies: ['framework_egp']
  },

  // === POLYCENTRIC GOVERNANCE ARCHITECTURE ===
  {
    id: 'framework_polycentric_governance',
    type: 'Framework',
    name: 'Polycentric Governance Architecture',
    shortName: 'Polycentric Architecture',
    description:
      'Horizontal separation of powers across territory, commons, economic practice, and Indigenous sovereignty. Four overlapping jurisdictions with minimum necessary authority, decision-chain separation, protected non-transfer, and the position that stable disagreement can be a legitimate outcome.',
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty',
      'framework_meta_gov',
      'protocol_constitutional_interface'
    ],
    enables: ['layer_territorial', 'layer_commons', 'layer_guilds', 'layer_wisdom_council'],
    ui: {
      path: '/frameworks/polycentric-governance-architecture',
      titleKey: 'framework.docs.nav.frameworkTitles.polycentricGovernance',
      emoji: '🕸️',
      slug: 'polycentric-governance-architecture',
      outline: {
        version: 'v0.6.2',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'Polycentric governance as horizontal separation of powers: territorial institutions, shared-resource authorities, economic systems, Indigenous peoples, and other legitimate centers retain distinct authority that coordination cannot absorb. The framework constrains capture without creating a higher sovereign — indicators trigger scrutiny rather than judgment, coordination does not manufacture jurisdiction, and one institution cannot dissolve, penalize, or govern another merely through a dashboard threshold. Indigenous authority is recognized through peoples’ own processes rather than constituted through a universal GGF council or representation quota.'
      }
    }
  },
  {
    id: 'layer_territorial',
    type: 'Institution',
    name: 'Territorial Councils',
    shortName: 'Territorial Layer',
    description:
      'Democratic territorial public authority: physical geography, infrastructure, zoning, and local services. Implemented in BAZ contexts as BAZ Assemblies.',
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
    description:
      'Cross-boundary resource institutions holding what no single territory can own, with Guardian Seats for ecosystem representation.',
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
    description:
      'Trans-territorial economic practice and labour institutions: professional standards, work valuation, and the price-setting handshake with territorial authorities.',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Economic',
    geographicScope: 'Bioregional',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_polycentric_governance',
      'framework_work_liberation' // cluster: economic-os
    ]
  },
  {
    id: 'layer_wisdom_council',
    type: 'Council',
    // shortName retained as 'Wisdom Council' because eight other outlines still
    // use the term — see header note 1.
    name: 'Indigenous Sovereign Authorities',
    shortName: 'Wisdom Council',
    description:
      'The Indigenous sovereignty layer. v0.6 replaced the universal Indigenous Wisdom Council with recognition of Indigenous-determined institutions: the GGF does not nominate, allocate quotas, appoint knowledge proxies, or certify who speaks for a people. Vetoes target the relevant act or authorization rather than the institution.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Bioregional',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_polycentric_governance',
      'framework_indigenous' // cluster: ethical-os
    ]
  },
  {
    id: 'mechanism_guardian_seats',
    type: 'Mechanism',
    name: 'Guardian Seats Protocol',
    shortName: 'Guardian Seats',
    description:
      'Legal personhood for ecosystems via Guardian representatives holding a fiduciary duty to regeneration.',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Justice',
    implementationPriority: 'High',
    dependencies: [
      'layer_commons',
      'framework_justice' // cluster: justice-os
    ]
  },
  {
    id: 'process_circuit_breaker',
    type: 'Process',
    name: 'Circuit Breaker Protocol',
    shortName: 'Circuit Breaker',
    description:
      'Deadlock and containment protocol. v0.6 retired the sortition-based chamber dissolution of v0.4–0.5 in favour of bounded inquiry, adjudication and continuity. NOTE: Financial Systems, GSCL, Gaian Trade and Synoptic use "circuit breaker" for an automatic containment halt — a different mechanism sharing the name. See header note 2.',
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
    description:
      'Composite indicator combining power distribution, BHI, LMCI and economic equity. v0.6 removed its trigger function: PHI is an alert that opens an inquiry, never a self-executing judgment.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'Medium',
    dependencies: [
      'framework_polycentric_governance',
      'metric_bhi', // cluster: ecological
      'metric_lmci' // cluster: economic-os
    ]
  },
  {
    id: 'pilot_uppsala_baz',
    type: 'Pilot',
    // Status lowered from 'Active': v0.6 states that Swedish pilot provisions
    // are illustrative and require current legal verification, and does not
    // name Uppsala.
    name: 'Uppsala BAZ Pilot',
    shortName: 'Uppsala Pilot',
    description:
      'Illustrative Swedish municipal pilot design: Lake Mälaren Trust, BAZ Assembly, and guild prototypes. Provisions are a design basis pending current legal verification, not a running programme.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Local',
    implementationPriority: 'High',
    dependencies: [
      'framework_polycentric_governance',
      'layer_territorial',
      'layer_commons',
      'layer_guilds'
    ]
  },

  // === INTELLIGENCE & FORESIGHT INFRASTRUCTURE ===
  {
    id: 'institution_ero',
    type: 'Institution',
    name: 'Existential Risk Observatory',
    shortName: 'ERO',
    description:
      'Monitoring institution tracking existential and catastrophic risk across domains — climate tipping points, AI misalignment, pandemic preparedness, nuclear proliferation — and feeding continuous intelligence to the GIF-Council.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_meta_gov',
      'framework_planetary_immune_system' // cluster: visionary-meta
    ]
  }
];

export const governanceOSRelationships: GgfRelationship[] = [
  // --- framework_meta_gov -----------------------------------------------
  {
    from: 'framework_meta_gov',
    to: 'protocol_constitutional_interface',
    type: 'DEPENDS_ON',
    description:
      'v1.5 conforms explicitly to the Constitutional Interface Specification for decision classes, observation, bypass and transfer.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'council_mgcc',
    type: 'ESTABLISHES',
    description: 'Establishes the MGCC as the primary coordination venue.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_meta_gov',
    to: 'process_crisis_command',
    type: 'ESTABLISHES',
    description:
      'Establishes rights-bounded emergency coordination. Coordination is not command; the underlying powers stay with whoever lawfully holds them.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_meta_gov',
    to: 'council_global_metrology',
    type: 'ESTABLISHES',
    description: 'Establishes the Metrology Council as a specialized sub-council of the MGCC.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_polycentric_governance',
    type: 'COORDINATES_WITH',
    // was ENABLES — v0.6 is explicit that Meta-Governance coordinates but does
    // not override, and neither framework constitutes the other
    description:
      'Meta-Governance supplies the coordination protocols; Polycentric Architecture supplies the horizontal separation. Neither may override the other.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_egp',
    type: 'INTEGRATES_WITH',
    description:
      'Meta-Governance provides the venue where EGP interactions are processed; the EGP provides the grammar for them.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_nested_sovereignty',
    type: 'COORDINATES_WITH',
    description:
      'Economic subsidiarity and voluntary coordination layers are Nested Economies competences; Meta-Governance connects them without absorbing them.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_work_liberation',
    type: 'COORDINATES_WITH',
    description:
      'Hosts the Fractal Labor Parliament as a domain council without acquiring authority over worker rights or Community Provider standards.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_disability',
    type: 'COORDINATES_WITH',
    description:
      'Accessibility, cognitive liberty and universal design are treated as conditions on coordination itself, not as a downstream concern.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'institution_baz',
    type: 'COORDINATES_WITH',
    description:
      'Supplies interoperation protocols for BAZs forming fractal governance networks while retaining sovereignty.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_hearthstone',
    type: 'INTEGRATES_WITH',
    description:
      'Emergency coordination can trigger the Emergency Stewardship Protocol so Hearthstone can secure endangered commons during a crisis.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_treaty',
    to: 'framework_meta_gov',
    type: 'ENABLES',
    description:
      'The Treaty is the source of whatever authority Meta-Governance exercises; v1.5 calls this constitutional subordination.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  // --- council_mgcc and sub-councils -------------------------------------
  {
    from: 'protocol_polycentric',
    to: 'council_mgcc',
    type: 'GUIDES',
    description: 'Polycentric coordination principles govern how the MGCC operates.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_mgcc',
    to: 'council_gifc',
    type: 'OVERSEES',
    description: 'The MGCC oversees the GIF-Council as a specialized sub-body.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gifc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description:
      'Supplies synthesized threat assessments. An assessment opens a decision; it does not make one.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_ero',
    to: 'council_gifc',
    type: 'PARTICIPATES_IN',
    description: 'The ERO provides existential risk intelligence to the GIF-Council.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'platform_federated_crime_exchange_nodes',
    to: 'council_gifc',
    type: 'PARTICIPATES_IN',
    description:
      "Shield\'s federated, purpose-limited exchange nodes contribute lawfully shareable transnational-crime assessments without creating a central intelligence authority.",
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_peace',
    to: 'council_gifc',
    type: 'PARTICIPATES_IN',
    description: 'The Peace framework provides conflict prediction intelligence.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_global_metrology',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The Metrology Council operates within the MGCC structure.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_global_metrology',
    to: 'process_metric_lifecycle',
    type: 'OVERSEES',
    description: 'The Metrology Council manages and enforces the Metric Lifecycle process.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_metric_lifecycle',
    to: 'metric_bhi',
    type: 'GUIDES',
    description: 'Governs the development, validation and sunsetting of the Biosphere Health Index.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_metric_lifecycle',
    to: 'metric_lmci',
    type: 'GUIDES',
    description: 'Governs the development, validation and sunsetting of the LMCI.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_metric_lifecycle',
    to: 'metric_phi',
    type: 'GUIDES',
    description: 'Governs PHI development and validation.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- process_crisis_command -------------------------------------------
  {
    from: 'process_crisis_command',
    to: 'framework_treaty',
    type: 'DEPENDS_ON',
    description:
      "Crisis Command is governed by the Treaty\'s emergency procedure: Article 17.2 permits tightly bounded provisional action for up to 72 hours, and Article 17.3 governs continuation. Meta-Governance itself gains no police, military, emergency-work, or rights-suspension authority.",
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  {
    from: 'protocol_cross_temporal',
    to: 'framework_deep_time',
    type: 'ENABLES',
    description:
      'Cross-temporal coordination is the prerequisite for the Deep Time & Relativistic Governance applications.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },

  // --- framework_egp -----------------------------------------------------
  {
    from: 'framework_egp',
    to: 'protocol_sense',
    type: 'ESTABLISHES',
    description: 'Establishes `sense` as the primary input call.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_egp',
    to: 'protocol_propose',
    type: 'ESTABLISHES',
    description: 'Establishes `propose` for generating time-bound responses.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_egp',
    to: 'protocol_adopt',
    type: 'ESTABLISHES',
    description: 'Establishes `adopt` for experimental implementation.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'framework_egp',
    type: 'ENABLES',
    description:
      'The Treaty provides the constitutional container within which the EGP can operate safely.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_egp',
    to: 'framework_meta_gov',
    type: 'GUIDES',
    description:
      'Supplies the bottom-up operational logic that Meta-Governance is designed to coordinate.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_egp',
    to: 'framework_cairn_protocol',
    type: 'GUIDES',
    description:
      "Example: the Cairn Protocol's Grief Feedback Pathway is a specific implementation of `sense`.",
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_egp',
    to: 'framework_shield',
    type: 'GUIDES',
    description: 'Example: a BAZ reporting a threat to the Shield Protocol is using `sense`.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'tool_egp_app',
    to: 'framework_egp',
    type: 'IMPLEMENTS',
    description: 'Reference implementation and experimental testbed for the EGP.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },

  // --- framework_polycentric_governance ----------------------------------
  {
    from: 'framework_polycentric_governance',
    to: 'protocol_constitutional_interface',
    type: 'DEPENDS_ON',
    description:
      'v0.6 conforms to the Constitutional Interface Specification for legitimacy, jurisdiction, decision classes, transfer and continuity.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_treaty',
    to: 'framework_polycentric_governance',
    type: 'ENABLES',
    description:
      'Treaty accession, planetary competences and reserved powers set the outer bounds of the horizontal separation.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'protocol_polycentric',
    type: 'IMPLEMENTS',
    description: 'The concrete institutional model of the polycentric coordination principle.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'layer_territorial',
    type: 'ESTABLISHES',
    description: 'Defines territorial public authority as the "where" layer.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'layer_commons',
    type: 'ESTABLISHES',
    description: 'Defines commons institutions as the "what is shared" layer.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'layer_guilds',
    type: 'ESTABLISHES',
    description: 'Defines practice and labour institutions as the economic-practice layer.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'layer_wisdom_council',
    type: 'ESTABLISHES',
    // recognition, not constitution — see header note 1
    description:
      'Recognises Indigenous-determined institutions as a constitutional layer. The framework explicitly does not create, nominate to, or certify them.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'framework_nested_sovereignty',
    type: 'COORDINATES_WITH',
    description:
      'Economic subsidiarity, cross-scale interfaces and protected non-transfer are shared commitments across both frameworks.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_polycentric_governance',
    to: 'framework_financial_systems',
    type: 'COORDINATES_WITH',
    description:
      'Treasury authority and financial observability sit inside the practice layer\'s interface with territorial authority.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'layer_wisdom_council',
    type: 'GUIDES',
    description:
      'Indigenous sovereignty, consent and covenant authority determine the layer\'s composition; the non-certification clause forbids the GGF from doing so.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'layer_wisdom_council',
    to: 'council_earth',
    type: 'COORDINATES_WITH',
    description: 'Indigenous-determined authorities coordinate with the Earth Council globally.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_work_liberation',
    to: 'layer_guilds',
    type: 'IMPLEMENTS',
    description:
      'Work in Liberation supplies the operational mechanics of the practice layer: the FLP, Community Providers, and work valuation.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'layer_guilds',
    to: 'layer_territorial',
    type: 'COORDINATES_WITH',
    description:
      'The price-setting handshake: guilds propose Hearts rates, territorial assemblies ratify. Neither side can set them alone.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'layer_territorial',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Territorial councils are implemented as BAZ Assemblies where BAZs exist.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'layer_commons',
    to: 'mechanism_guardian_seats',
    type: 'USES',
    description: 'Commons Trusts seat Guardians to represent the ecosystems they hold.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_guardian_seats',
    to: 'framework_justice',
    type: 'IMPLEMENTS',
    description: 'Guardian Seats implement rights-of-nature jurisprudence in practice.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_guardian_seats',
    to: 'metric_bhi',
    type: 'USES',
    description: 'Guardians use BHI readings when judging regeneration capacity.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_phc',
    to: 'layer_commons',
    type: 'COORDINATES_WITH',
    description: 'The Planetary Health Council coordinates with Commons Trusts on ecosystem boundaries.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- deadlock, indicators and pilots -----------------------------------
  {
    from: 'process_circuit_breaker',
    to: 'layer_territorial',
    type: 'RESOLVES_CONFLICTS_FOR',
    description:
      'Opens bounded inquiry and adjudication where layers deadlock, preserving continuity. v0.6 removed the power to dissolve a chamber.',
    strength: 'Medium',
    frequency: 'Occasional',
    sequenceType: 'Conditional'
  },
  {
    from: 'process_circuit_breaker',
    to: 'layer_commons',
    type: 'RESOLVES_CONFLICTS_FOR',
    description: 'As above, for commons institutions.',
    strength: 'Medium',
    frequency: 'Occasional',
    sequenceType: 'Conditional'
  },
  {
    from: 'process_circuit_breaker',
    to: 'layer_guilds',
    type: 'RESOLVES_CONFLICTS_FOR',
    description: 'As above, for practice institutions.',
    strength: 'Medium',
    frequency: 'Occasional',
    sequenceType: 'Conditional'
  },
  {
    from: 'metric_phi',
    to: 'process_circuit_breaker',
    type: 'INFORMS',
    // v0.6: indicators are alerts, not judgments — PHI opens an inquiry, it
    // does not fire a trigger
    description:
      'A PHI reading may open a bounded inquiry. It cannot by itself constitute a finding of capture or failure.',
    strength: 'Medium',
    frequency: 'Occasional',
    sequenceType: 'Conditional'
  },
  {
    from: 'metric_phi',
    to: 'metric_bhi',
    type: 'INTEGRATES',
    description: 'PHI incorporates BHI as its ecological health component.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'metric_phi',
    to: 'metric_lmci',
    type: 'INTEGRATES',
    description: 'PHI incorporates LMCI as its social wellbeing component.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'pilot_uppsala_baz',
    to: 'framework_polycentric_governance',
    type: 'TESTS',
    description:
      'Illustrative pilot design for the Swedish municipal context; v0.6 notes these provisions require current legal verification.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'pilot_uppsala_baz',
    to: 'layer_commons',
    type: 'IMPLEMENTS',
    description: 'Lake Mälaren Trust as the first proposed Commons Trust.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  }
];
