// /src/lib/data/schema/cluster.constitutional-foundation.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 0: CONSTITUTIONAL LAYER
 * The Treaty for Our Only Home — the constitutional draft that everything else
 * derives authority from, plus the Genesis Protocol that would bring it into force.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * ARCHITECTURAL CHANGE AT v1.3. The Treaty was restructured from a Pillar model
 * built around UN reform into 25 Articles built around conferred competence and
 * reserved powers. It no longer names a Reformed Security Council, a Reformed
 * General Assembly, or a standing Global Enforcement Mechanism. Their functions
 * are now carried by the Assembly of Parties (Art 8), the Peoples' Chamber
 * (Art 9), and a graduated compliance sequence (Art 16), with UN reform itself
 * demoted to a transition question (Art 23). The three superseded entities are
 * retained and reframed rather than deleted — `institution_gem` in particular is
 * still referenced by four other clusters — but they need a decision.
 */

export const constitutionalFoundationEntities: GgfEntity[] = [
  // === THE TREATY ===
  {
    id: 'framework_treaty',
    type: 'Framework',
    name: 'Treaty for Our Only Home',
    shortName: 'The Treaty',
    description:
      'Constitutional draft for legitimate planetary coordination, shared-commons stewardship, and accountable transition. Twenty-five Articles covering conferred competence, reserved powers, decision classes, Indigenous interfaces, emergency constitutionalism, and dissolution.',
    tier: 0,
    // 'Ready' overclaimed. Nothing here has been read by an outside institution.
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    enables: [
      'protocol_genesis',
      'institution_assembly_of_parties',
      'institution_peoples_chamber',
      'institution_global_council_future',
      'institution_office_adversary',
      'institution_gsa',
      'institution_dj_tribunal',
      'mechanism_gcf',
      'framework_meta_gov', // cluster: governance-os
      'framework_justice', // cluster: justice-os
      'framework_hearthstone' // cluster: property-stewardship
    ],
    ui: {
      path: '/frameworks/treaty-for-our-only-home',
      titleKey: 'framework.docs.nav.frameworkTitles.treatyForOurOnlyHome',
      emoji: '🌐',
      slug: 'treaty-for-our-only-home',
      outline: {
        // dir defaults to `tier-0/treaty-for-our-only-home` — matches, so omitted
        version: 'v1.3',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'A draft treaty text, not a ratified instrument and not a proposal any government has seen. It sets out what powers would be conferred, what stays reserved, and what cannot be activated without separate ratification.'
      }
    }
  },

  // === TREATY BODIES (Articles 8–10) ===
  {
    id: 'institution_assembly_of_parties',
    type: 'Institution',
    name: 'Assembly of Parties',
    shortName: 'Assembly of Parties',
    description:
      'The Treaty\'s plenary body (Art 8). One vote per Party, delegations appointed under domestic constitutional law and required to disclose conflicts, funding interests and instructions. Adopts measures within conferred competence; ordinary measures need two-thirds, with heightened thresholds and Peoples\' Chamber concurrence for the rest.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty']
  },
  {
    id: 'institution_peoples_chamber',
    type: 'Institution',
    name: "Peoples' Chamber",
    shortName: "Peoples' Chamber",
    description:
      'A democratic check not reducible to interstate voting (Art 9). Transitional composition mixes parliamentary delegates with directly elected members where jurisdictions authorize it. Explicitly the pathway toward a UN Parliamentary Assembly without presuming the UN has adopted one.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty']
  },
  {
    id: 'institution_global_council_future',
    type: 'Institution',
    name: 'Global Council for the Future',
    shortName: 'Council for the Future',
    description:
      'Advisory foresight body (Art 10.1) drawing on scientific, civic, city, labour, youth and ecological perspectives. May publish threat and opportunity assessments, propose long-term measures, request reconsideration, and initiate a future-generations review. Advisory only.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_treaty']
  },
  {
    id: 'institution_office_adversary',
    type: 'Institution',
    name: 'Office of the Adversary',
    shortName: 'Office of the Adversary',
    description:
      'Integrity body (Art 10.3) whose function is to argue against the institution that convened it. Referenced by AUBI as a standing check on self-serving interpretation.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_treaty']
  },
  {
    id: 'institution_cg',
    type: 'Institution',
    name: 'Council of Guardians',
    shortName: 'Guardians',
    description:
      'Wisdom and oversight body (Treaty Art 10.2), convened by multi-source nomination from the foundational bodies established under the Genesis Protocol.',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty',
      'protocol_genesis',
      'council_earth', // cluster: ethical-os
      'institution_gci',
      'institution_ysc'
    ]
  },

  // === JUDICIAL, ENFORCEMENT AND FINANCE ===
  {
    id: 'institution_dj_tribunal',
    type: 'Institution',
    name: 'Digital Justice Tribunal',
    shortName: 'Digital Justice Tribunal',
    description: 'Adjudicates major global harms, including ecocide and digital rights violations.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    enables: [
      'framework_justice', // cluster: justice-os
      'institution_cjet' // cluster: justice-os
    ]
  },
  {
    id: 'institution_gem',
    type: 'Institution',
    name: 'Global Enforcement Mechanism',
    shortName: 'GEM',
    description:
      'Enforcement arm acting on tribunal rulings. NOTE: Treaty v1.3 does not name a standing enforcement mechanism; Article 16 sets out a graduated compliance sequence beginning with notice, disclosure and affected-authority response. Retained because four other clusters reference GEM. Needs a decision.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    enables: [
      'institution_getf' // cluster: justice-os
    ]
  },
  {
    id: 'mechanism_gcf',
    type: 'EconomicMechanism',
    name: 'Global Commons Fund',
    shortName: 'Global Commons Fund',
    description:
      'Fund for planetary public goods under Article 18, financed by assessed contributions and Treaty revenue instruments.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    enables: [
      'framework_aubi', // cluster: economic-os
      'mechanism_hearts_treasury', // cluster: economic-os
      'framework_food', // cluster: ecological
      'framework_drr' // cluster: ecological
    ]
  },

  // === TRANSITIONAL ARRANGEMENTS (Article 23) ===
  {
    id: 'institution_gsa',
    type: 'Initiative',
    name: 'Global Stewardship Alliance',
    shortName: 'GSA',
    description:
      'The voluntary pre-ratification coalition (Art 23.1) of willing states, cities, Indigenous partners and civil-society organizations that develop the Treaty, run lawful pilots, and build capacity. Article 1.3 is explicit that participation confers no authority.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty']
  },
  {
    id: 'institution_unsc_reformed',
    type: 'Institution',
    name: 'Reformed UN Security Council',
    shortName: 'Reformed UNSC',
    description:
      'UNSC with tiered veto override and expanded membership. SUPERSEDED: Treaty v1.3 no longer names this body. Article 23 treats UN reform as a transition question rather than a constitutional component.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: ['framework_treaty']
  },
  {
    id: 'institution_unga_reformed',
    type: 'Institution',
    name: 'Reformed UN General Assembly',
    shortName: 'Reformed UNGA',
    description:
      'UNGA with binding resolution powers on crises. SUPERSEDED: its function is now carried by the Assembly of Parties (Art 8) and the Peoples\' Chamber (Art 9). Retained pending a decision on whether to delete or keep as a transition target.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: ['framework_treaty']
  },

  // === GENESIS PROTOCOL ===
  {
    id: 'protocol_genesis',
    type: 'LegalProtocol',
    name: 'Genesis Protocol',
    shortName: 'Genesis Protocol',
    description:
      'Constitutional preparation, ratification, first-seating and founder-dissolution process for Treaty institutions, designed so that no public authority is derived from the GGF initiative itself.',
    tier: 0,
    status: 'Draft',
    primaryDomain: 'Governance',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    enables: [
      'institution_interim_secretariat',
      'mechanism_genesis_fund',
      'institution_gci',
      'institution_ysc',
      'institution_cg'
    ],
    ui: {
      path: '/frameworks/genesis-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.genesisProtocol',
      emoji: '🌱',
      slug: 'genesis-protocol',
      outline: {
        version: 'v0.9',
        updated: '2026-08-01',
        maturity: 'adversarial',
        standfirst:
          'How the Treaty’s institutions would be constituted without a prior authority to constitute them — and which powers stay inactive until separately ratified. This is the bootstrapping problem, written as procedure.'
      }
    }
  },
  {
    id: 'institution_interim_secretariat',
    type: 'Institution',
    name: 'Interim Secretariat (Genesis)',
    shortName: 'Interim Secretariat',
    description:
      'The temporary neutral body responsible for executing the Genesis Protocol\'s convening processes, with a fixed 18-month mandate and no successor claim.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'Critical',
    dependencies: ['protocol_genesis']
  },
  {
    id: 'mechanism_genesis_fund',
    type: 'EconomicMechanism',
    name: 'Genesis Fund',
    shortName: 'Genesis Fund',
    description:
      'Temporary Tier 0 financing for the convening processes, capitalized by the Founding Peace Tithe of 0.1% of military budgets.',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Economic',
    implementationPriority: 'Critical',
    dependencies: ['protocol_genesis']
  },
  {
    id: 'institution_gci',
    type: 'Institution',
    name: "Global Citizens' Assembly",
    shortName: 'GCA',
    description:
      'The foundational pillar of democratic legitimacy, convened by sortition under the Genesis Protocol.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'Critical',
    dependencies: ['protocol_genesis']
  },
  {
    id: 'institution_ysc',
    type: 'Institution',
    name: 'Youth Stewardship Council',
    shortName: 'YSC',
    description:
      'The foundational pillar of intergenerational legitimacy, convened by nomination and lottery, holding veto power over long-term decisions.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    implementationPriority: 'Critical',
    dependencies: ['protocol_genesis']
  }
];

export const constitutionalFoundationRelationships: GgfRelationship[] = [
  // --- framework_treaty: bodies it constitutes ---------------------------
  {
    from: 'framework_treaty',
    to: 'institution_assembly_of_parties',
    type: 'ESTABLISHES',
    description: 'Article 8 constitutes the Assembly of Parties as the Treaty\'s plenary body.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_peoples_chamber',
    type: 'ESTABLISHES',
    description:
      'Article 9 constitutes the Peoples\' Chamber as a democratic check not reducible to interstate voting.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_global_council_future',
    type: 'ESTABLISHES',
    description: 'Article 10.1 constitutes the Global Council for the Future as an advisory body.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_office_adversary',
    type: 'ESTABLISHES',
    description:
      'Article 10.3 constitutes the Office of the Adversary as a standing internal challenge to the Treaty\'s own institutions.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_cg',
    type: 'ESTABLISHES',
    description:
      'Article 10.2 recognises the Council of Guardians; the Genesis Protocol defines how its first members are nominated.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_dj_tribunal',
    type: 'ESTABLISHES',
    description: 'The Treaty establishes the Digital Justice Tribunal as its primary judicial body.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'mechanism_gcf',
    type: 'ESTABLISHES',
    description: 'Article 18 creates the Global Commons Fund and its financing mechanisms.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_gem',
    type: 'ESTABLISHES',
    // v1.3 replaces a standing enforcement arm with the Article 16 graduated
    // compliance sequence. Retained pending a decision on GEM's future.
    description:
      'Enforcement follows from Article 16 compliance procedures rather than from a standing corps.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },

  // --- decision-making between the chambers ------------------------------
  {
    from: 'institution_assembly_of_parties',
    to: 'institution_peoples_chamber',
    type: 'COORDINATES_WITH',
    description:
      'Binding measures require Assembly supermajority and the corresponding Peoples\' Chamber threshold; neither chamber can act alone on the heightened classes.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_global_council_future',
    to: 'institution_assembly_of_parties',
    type: 'INFORMS',
    description:
      'Publishes threat and opportunity assessments and may request reconsideration or a future-generations review. It cannot compel.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_office_adversary',
    to: 'institution_assembly_of_parties',
    type: 'AUDITS',
    description:
      'Argues the case against measures the Assembly is minded to adopt, as a structural counterweight to institutional self-interest.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cg',
    to: 'institution_dj_tribunal',
    type: 'OVERSEES',
    description: 'The Guardians nominate and confirm the first judges of the Tribunal.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_dj_tribunal',
    to: 'framework_treaty',
    type: 'ENFORCES',
    description: 'The Tribunal adjudicates against the Treaty\'s own terms.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_gem',
    to: 'institution_dj_tribunal',
    type: 'REPORTS_TO',
    description: 'The enforcement arm acts on the rulings of the judicial arm, never ahead of them.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- what the Treaty enables downstream --------------------------------
  {
    from: 'framework_treaty',
    to: 'framework_hearthstone',
    type: 'ENABLES',
    description:
      'Supplies the constitutional authority for Hearthstone\'s legal tools, including Stewardship Trusts.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'layer_commons',
    type: 'ENABLES',
    description:
      'Article 14 on planetary commons and future generations supplies the authority under which Commons Trusts hold cross-boundary resources.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },

  // --- transitional arrangements (Article 23) ----------------------------
  {
    from: 'framework_treaty',
    to: 'institution_gsa',
    type: 'ENABLES',
    description:
      'Article 23.1 provides for a voluntary pre-ratification coalition. Article 1.3 is explicit that membership of it confers no authority.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_gsa',
    to: 'protocol_genesis',
    type: 'SUPPORTS',
    description:
      'The Alliance develops the Treaty text and builds deliberative capacity ahead of the Genesis convening, without becoming a party to it.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_unga_reformed',
    type: 'COORDINATES_WITH',
    // was ESTABLISHES — v1.3 demotes UN reform to Article 23 transition
    description:
      'Article 23 treats reform of existing UN bodies as a transition pathway proposed to them, not as something the Treaty constitutes.',
    strength: 'Weak',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_treaty',
    to: 'institution_unsc_reformed',
    type: 'COORDINATES_WITH',
    description:
      'As above: a reform proposal directed at an existing institution rather than a Treaty organ.',
    strength: 'Weak',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },

  // --- Genesis Protocol --------------------------------------------------
  {
    from: 'framework_treaty',
    to: 'protocol_genesis',
    type: 'IMPLEMENTS',
    description: 'Genesis is the constitutional convening process that would activate the Treaty.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_genesis',
    to: 'institution_interim_secretariat',
    type: 'ESTABLISHES',
    description: 'Establishes the temporary neutral body to run the convening, and its expiry.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_genesis',
    to: 'mechanism_genesis_fund',
    type: 'ESTABLISHES',
    description: 'Establishes the Tier 0 fund that pays for the convening process.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_genesis',
    to: 'institution_gci',
    type: 'ESTABLISHES',
    description: 'Establishes the Global Citizens\' Assembly via sortition.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_genesis',
    to: 'institution_ysc',
    type: 'ESTABLISHES',
    description: 'Establishes the Youth Stewardship Council as a pillar of legitimacy.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_genesis',
    to: 'institution_cg',
    type: 'ESTABLISHES',
    description: 'Defines the multi-source nomination process for the Council of Guardians.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'council_earth',
    to: 'protocol_genesis',
    type: 'VALIDATES',
    description:
      'Genesis requires Letters of Intent to Engage from Indigenous nations as part of its Pluriversal Sovereign activation trigger.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_genesis',
    to: 'institution_ggf_failure_library',
    type: 'ENABLES',
    description:
      'Genesis §4.6 is the constitutional basis for the Failure Library; the IAF operationalizes it and AUBI cites it as the record of what did not work.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  }
];
