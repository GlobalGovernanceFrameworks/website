// /src/lib/data/schema/cluster.cultural-knowledge.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 3–4: CULTURAL & KNOWLEDGE FRAMEWORKS
 *
 * Where the ecosystem handles meaning rather than material: heritage, knowledge
 * commons, spiritual dialogue, the arts, and the two inner-development
 * frameworks. Aurora governs data; Digital Commons governs knowledge — the
 * social processes by which data becomes meaning and meaning becomes
 * inheritance. That boundary is v3.0's organizing idea.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * VERSION MISMATCH — framework_cultural_heritage. The document at
 * `versions/v3.0.md` is Project Tapestry **v2.2**, dated 2025-08-27, and says
 * in its own conclusion that "Version 3.0 of this framework will be developed
 * following the evaluation and integration of lessons learned from the initial
 * BAZ micro-pilots." The schema is publishing a version that has not been
 * written. `updated` is set to the document's real date so the staleness is
 * visible; either the file should be renamed to v2.2.md and the schema pointed
 * at it, or v3.0 needs writing.
 *
 * TWO TYPE ERRORS FIXED. `primaryDomain: 'Culture'` on the Resonance Protocol
 * and `type: 'REQUIRES'` on the WDIP→Synoptic edge were both outside their
 * unions and invisible to `tsx`.
 */

export const culturalKnowledgeEntities: GgfEntity[] = [
  // === TIER 3: CULTURAL & KNOWLEDGE FRAMEWORKS ===
  {
    id: 'framework_cultural_heritage',
    type: 'Framework',
    name: 'Cultural Heritage Preservation Framework (Project Tapestry)',
    shortName: 'Cultural Heritage',
    description:
      'A cultural memory operating system: language revitalization, traditional practice, and community sovereignty over what is preserved and what is allowed to rest. Embeds heritage work in the Treaty, AUBI, Work in Liberation and Meta-Governance rather than treating it as a museum function.',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_digital_commons', 'framework_meta_gov'],
    enables: ['council_cawc', 'institution_cst', 'tool_cv_index'],
    ui: {
      path: '/frameworks/cultural-heritage-preservation',
      titleKey: 'framework.docs.nav.frameworkTitles.culturalHeritagePreservation',
      emoji: '🏛️',
      slug: 'cultural-heritage-preservation',
      outline: {
        version: 'v2.2',
        // the file's own revision date — see the VERSION MISMATCH note above
        updated: '2025-08-27',
        maturity: 'adversarial',
        standfirst:
          'Cultural memory treated as infrastructure rather than heritage tourism: who decides what is recorded, who holds the recording, and who may say no. Project Tapestry pays cultural stewardship work through the Hearts economy on the argument that a language dies when nobody can afford to keep speaking it professionally. The published document is the v2.2 draft; v3.0 is waiting on lessons from the first BAZ micro-pilots.'
      }
    }
  },
  {
    id: 'framework_digital_commons',
    type: 'Framework',
    name: 'Digital Commons Framework',
    shortName: 'Digital Commons',
    description:
      'Governs the shared knowledge infrastructure of the ecosystem: the protocols and practices through which communities create, curate, contest, preserve, retire and transmit knowledge. Where Aurora governs data as a category, this governs knowledge — including knowledge versioning, epistemic governance, and governed forgetting.',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_aurora_accord', 'framework_education'],
    enables: ['council_dcc', 'institution_lcn'],
    ui: {
      path: '/frameworks/digital-commons',
      titleKey: 'framework.docs.nav.frameworkTitles.digitalCommons',
      emoji: '💻',
      slug: 'digital-commons',
      outline: {
        version: 'v3.0.1',
        updated: '2026-08-08',
        maturity: 'adversarial',
        standfirst:
          'The distinction this framework is built on: data is a category with rights attached, knowledge is what a community does with it. Version 3.0 gave away most of its old territory — mesh networks, cybersecurity hardening, AI strategy and resilience infrastructure all moved to the Conduit Protocol and Aurora, dropping it from Tier 1 to Tier 3. What remains is knowledge versioning, epistemic governance, and governed forgetting: the unfashionable proposition that a commons which cannot retire anything eventually cannot be read.'
      }
    }
  },
  {
    id: 'framework_religious_dialogue',
    type: 'Framework',
    name: 'Global Governance Implementation Framework: Religious & Spiritual Dialogue',
    shortName: 'Spiritual Dialogue',
    description:
      'A Wisdom Cartography System rather than a consensus body: it maps the full spectrum of religious, spiritual, Indigenous, secular and philosophical reasoning on a question instead of averaging it into a statement nobody holds. Advisory and voluntary, operating under the Genesis Conscience & Sovereignty Clause.',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: [
      'framework_meta_gov',
      'framework_mos',
      'framework_indigenous',
      'framework_peace',
      'framework_digital_commons'
    ],
    enables: [
      'council_gcrsd',
      'council_interfaith_governance_council',
      'protocol_sacred_data',
      'platform_wisdom_repository',
      'institution_interfaith_teams'
    ],
    ui: {
      path: '/frameworks/religious-and-spiritual-dialogue-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.religiousAndSpiritualDialogueGovernance',
      emoji: '🕯️',
      slug: 'religious-and-spiritual-dialogue-governance',
      outline: {
        version: 'v1.8.1',
        updated: '2026-08-08',
        maturity: 'adversarial',
        standfirst:
          'Version 1.8 abandons the assumption that an interfaith body should produce agreement. Consensus on questions of meaning fails two ways — dissent gets smoothed into unusable blandness, or any participant can veto and the institution seizes. So the council maps instead: high-fidelity surveys of the moral terrain, handed to whoever has to build on it. Its own analogy is a geological survey, which does not decide where the bridge goes.'
      }
    }
  },
  {
    id: 'framework_global_citizenship',
    type: 'Framework',
    name: 'Global Citizenship Practice Framework',
    shortName: 'Global Citizenship',
    description:
      'Global citizenship as a personal practice rather than an institutional programme: what one person can do about planetary problems without waiting to be organised.',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_education'],
    ui: {
      path: '/frameworks/global-citizenship-practice',
      titleKey: 'framework.docs.nav.frameworkTitles.globalCitizenshipPractice',
      emoji: '🌍',
      slug: 'global-citizenship-practice',
      prose: {
        dir: 'global-citizenship-practice',
        version: '2.0',
        updated: '2026-08-03',
        maturity: 'internal',
        subtitle:
          'A personal practice for people who want to act on global problems without waiting for an institution to organise them',
        standfirst:
          'The only thing here addressed to one person rather than to a governing body. It asks for an hour, not a mandate. Nothing in it has been tested, measured, or reviewed by anyone outside the project.',
        sections: [{ id: 'global-citizenship-overview', title: 'Global Citizenship Practice' }]
      }
    }
  },
  {
    id: 'framework_arts_flourishing',
    type: 'Framework',
    name: 'Creative & Arts Flourishing Framework',
    shortName: 'Arts Flourishing',
    description:
      'The Muse Protocol: art treated as a foundational metabolism of a regenerative civilization rather than a discretionary sector. Routes creative contribution through the Hearts economy so that cultural work is compensated as work.',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: [
      'framework_cultural_heritage',
      'framework_aubi',
      'framework_education',
      'framework_digital_commons',
      'framework_indigenous',
      'framework_hearthstone',
      'framework_wdmip'
    ],
    enables: ['institution_cosmic_artisan_guilds'],
    ui: {
      path: '/frameworks/arts-flourishing',
      titleKey: 'framework.docs.nav.frameworkTitles.artsFlourishing',
      emoji: '🎨',
      slug: 'arts-flourishing',
      group: 'humanSocialSystems',
      outline: {
        version: 'v0.7',
        updated: '2026-08-02',
        maturity: 'adversarial',
        standfirst:
          'Arts funding reframed as metabolism rather than patronage: if a civilization is regenerative, cultural creation is one of the processes doing the regenerating, not an ornament paid for out of the surplus. The mechanism is unglamorous — creative work earns Hearts through the same contribution channels as care and ecological work, which means an artist is paid for making things rather than for winning a grant competition.'
      }
    }
  },
  {
    id: 'framework_resonance_protocol',
    type: 'Framework',
    name: 'The Resonance Protocol',
    shortName: 'Resonance Protocol',
    description:
      'Governance of soundscapes as a commons: community authority over local acoustic environments, protection of musical heritage, and sonic accessibility for people harmed by noise.',
    tier: 3,
    // was primaryDomain: 'Culture', which is not in the union
    primaryDomain: 'Governance',
    status: 'Draft',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: ['framework_arts_flourishing', 'framework_indigenous']
    // No ui block. Pillar 2 proposes clinical certification for unvalidated
    // sound therapy and must be resolved before this is published.
  },

  // === TIER 4: WISDOM & CONSCIOUSNESS FRAMEWORKS ===
  {
    id: 'framework_inner_dev',
    type: 'Framework',
    // renamed at v2.5; shortName 'IDLP' retained because other outlines use it
    name: 'Consciousness & Inner Development Framework',
    shortName: 'IDLP',
    description:
      'Inner development and ethical leadership capacity across the ecosystem. Voluntary throughout — the MOS prohibition on assigning developmental stages applies here with particular force, since this is the framework most tempted to.',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_digital_commons', 'framework_mos'],
    enables: ['process_clp'],
    ui: {
      path: '/frameworks/consciousness-and-inner-development',
      titleKey: 'framework.docs.nav.frameworkTitles.consciousnessAndInnerDevelopment',
      emoji: '🧘',
      slug: 'consciousness-and-inner-development',
      outline: {
        version: 'v2.5',
        updated: '2026-04-02',
        maturity: 'adversarial',
        standfirst:
          'The proposition that institutions behave the way the people inside them are able to think, and that this is trainable. It is also the framework with the most obvious failure mode: any programme that develops consciousness can become a programme that ranks it. MOS §6.2 forbids any GGF body from recording a developmental stage for anyone.'
      }
    }
  },
  {
    id: 'framework_wdmip',
    type: 'Framework',
    name: 'Wise Decision-Making & Integration Protocol',
    shortName: 'WDIP',
    description:
      'Advisory methodology for decisions that are hard because values conflict, effects run across generations, knowledge is distributed and power is unequal — not because facts are missing. Conforms to the GMEAIA/0.2.1 controlling interface; every output must state the process mandate, the competent decision authority, and its authority effect.',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_meta_gov'],
    enables: ['process_ets'],
    ui: {
      path: '/frameworks/wise-decision-making-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.wiseDecisionMakingProtocol',
      emoji: '🪷',
      slug: 'wise-decision-making-protocol',
      outline: {
        version: 'v1.7',
        updated: '2026-08-06',
        maturity: 'adversarial',
        standfirst:
          'A method for the decisions where more information would not help: values genuinely conflict, the losses fall on people who are not in the room, and every option costs something irreversible. WDIP holds multiple knowledge systems side by side without collapsing them into one register, and treats uncertainty as productive rather than as a problem to be closed. Its advisory-output rule means no WDIP process can be mistaken for the decision itself.'
      }
    }
  },

  // === GOVERNANCE COUNCILS ===
  {
    id: 'council_cawc',
    type: 'Council',
    name: 'Cultural & Ancestral Wisdom Council',
    shortName: 'CAWC',
    description:
      'Meta-Governance council setting cultural preservation standards. Standards, not certification: it does not decide who is authentically anything.',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_cultural_heritage', 'framework_meta_gov']
  },
  {
    id: 'council_dcc',
    type: 'Council',
    name: 'Digital Commons Council',
    shortName: 'DCC',
    description:
      'Sub-council governing knowledge commons stewardship: versioning, contestation, retirement and the data/knowledge boundary with Aurora.',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_digital_commons', 'framework_aurora_accord']
  },
  {
    id: 'council_gcrsd',
    type: 'Council',
    name: 'Global Council for Religious & Spiritual Dialogue',
    shortName: 'GCRSD',
    description:
      'Advisory Meta-Governance council producing wisdom cartography: maps of the moral terrain relevant to a decision, including dissent, rather than a single agreed position.',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_religious_dialogue', 'council_earth']
  },
  {
    id: 'council_interfaith_governance_council',
    type: 'Council',
    name: 'Interfaith Governance Council',
    shortName: 'IGC (AUBI)',
    description:
      'Specialized sub-council advising AUBI on aligning Hearts and Leaves with diverse spiritual and ethical traditions, such as Zakat.',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Economic',
    implementationPriority: 'Medium',
    dependencies: ['council_gcrsd', 'framework_aubi']
  },

  // === SPECIALIZED INSTITUTIONS ===
  {
    id: 'institution_cst',
    type: 'Institution',
    name: 'Cultural Stewardship Teams',
    shortName: 'CSTs',
    description:
      'BAZ-level teams doing cultural preservation work, chartered and compensated through the same channels as other community provision. See the CWT/Community Provider naming question in cluster.economic-os.',
    tier: 3,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_cultural_heritage', 'framework_work_liberation', 'institution_baz']
  },
  {
    id: 'institution_lcn',
    type: 'Institution',
    name: 'Local Citizen Nodes',
    shortName: 'Local Nodes',
    description: 'Community-driven bodies for local governance of the knowledge commons.',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Local',
    implementationPriority: 'Medium',
    dependencies: ['framework_digital_commons', 'institution_baz']
  },
  {
    id: 'institution_interfaith_teams',
    type: 'Institution',
    name: 'Rapid Response Interfaith Teams',
    shortName: 'RRITs',
    description:
      'Teams offered jointly with the Peace framework where a conflict has a spiritual dimension. Voluntary deployment by invitation, on the same terms as peace teams.',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Justice',
    implementationPriority: 'Medium',
    dependencies: ['council_gcrsd', 'framework_peace']
  },

  // === PROCESSES & TOOLS ===
  {
    id: 'process_clp',
    type: 'Process',
    name: 'Conscious Leadership Program',
    shortName: 'CLP',
    description:
      'Training for Meta-Governance council members. NOTE: previously described as mandatory, which sits badly with the voluntary framing of Consciousness & Inner Development v2.5 and with the MOS prohibition on stage assessment. Treated as expected rather than compulsory pending a decision.',
    tier: 4,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_inner_dev']
  },
  {
    id: 'process_ets',
    type: 'Process',
    name: 'Ethical Stress-Testing',
    shortName: 'ETS',
    description:
      'WDIP method for examining a decision against MOS reasoning before it is taken. Advisory: a failed stress test is an argument, not a veto.',
    tier: 4,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_wdmip', 'framework_mos']
  },
  {
    id: 'tool_cv_index',
    type: 'DataMetric',
    name: 'Cultural Vitality Index',
    shortName: 'CV Index',
    description:
      'Measures language preservation, traditional practice and community engagement. An alert about conditions, not a judgment about a culture.',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_cultural_heritage']
  },

  // === PROTOCOLS & PLATFORMS ===
  {
    id: 'protocol_sacred_data',
    type: 'LegalProtocol',
    name: 'Sacred Data & Digital Heritage Protocol',
    shortName: 'Sacred Data Protocol',
    description:
      'Governs sacred text digitization, virtual pilgrimage, AI chaplaincy and digital afterlife, with consent recorded rather than assumed.',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Technology',
    implementationPriority: 'Medium',
    dependencies: ['framework_religious_dialogue', 'framework_digital_commons', 'council_gtc']
  },
  {
    id: 'platform_wisdom_repository',
    type: 'Platform',
    name: 'Wisdom Repository',
    shortName: 'Wisdom Repository',
    description:
      'Knowledge bank hosted on the Digital Commons, holding cartography outputs for peacebuilders and policymakers — including the dissent that a consensus process would have discarded.',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Technology',
    implementationPriority: 'Medium',
    dependencies: ['framework_religious_dialogue', 'framework_digital_commons', 'framework_peace']
  },

  // === MEMORIAL & GRIEF COMMONS ===
  {
    id: 'framework_memorial_commons',
    type: 'Framework',
    name: 'The Memorial Commons',
    shortName: 'Memorial Commons',
    description:
      'Collective grief processing, memorialization and intergenerational healing: spaces and protocols for communities to process loss, from addiction-related grief to ecological mourning and historical trauma.',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_cultural_heritage', 'framework_mental_health'],
    ui: {
      path: '/frameworks/memorial-commons',
      titleKey: 'framework.docs.nav.frameworkTitles.memorialCommons',
      emoji: '🕯️',
      slug: 'memorial-commons',
      outline: {
        version: 'v0.8',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'A proposal for how communities might hold grief collectively — trained responders, dignified death care, and physical space to mourn. It is a design document, not support. If you are grieving now, this is not the page you need.'
      }
    }
  }
];

export const culturalKnowledgeRelationships: GgfRelationship[] = [
  // --- framework_cultural_heritage ---------------------------------------
  {
    from: 'framework_cultural_heritage',
    to: 'council_cawc',
    type: 'ESTABLISHES',
    description: 'Establishes the Cultural & Ancestral Wisdom Council.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_cultural_heritage',
    to: 'institution_cst',
    type: 'ESTABLISHES',
    description: 'Establishes Cultural Stewardship Teams at BAZ level.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_cultural_heritage',
    to: 'tool_cv_index',
    type: 'ESTABLISHES',
    description: 'Establishes the Cultural Vitality Index as a condition indicator.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_cultural_heritage',
    to: 'framework_digital_commons',
    type: 'USES_DATA_FROM',
    description: 'Heritage records are held and versioned in the knowledge commons.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_cultural_heritage',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'Embeds cultural memory obligations in Treaty commitments rather than leaving them discretionary.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_fpic2',
    to: 'framework_cultural_heritage',
    type: 'GUIDES',
    description:
      'Consent and refusal govern what is recorded, by whom, and what remains unrecorded.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_cultural_heritage',
    to: 'framework_inner_dev',
    type: 'INFORMS',
    description: 'Ancestral practice informs inner development work.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_education',
    to: 'framework_cultural_heritage',
    type: 'COLLABORATES_WITH',
    description: 'Curriculum and language revitalization are the same work seen from two sides.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_cultural_heritage',
    to: 'layer_wisdom_council',
    type: 'COORDINATES_WITH',
    description:
      'Indigenous-determined authorities hold the standing to decide what may be preserved and shared.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- framework_digital_commons ------------------------------------------
  {
    from: 'framework_digital_commons',
    to: 'council_dcc',
    type: 'ESTABLISHES',
    description: 'Establishes the Digital Commons Council.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_digital_commons',
    to: 'institution_lcn',
    type: 'ESTABLISHES',
    description: 'Establishes Local Citizen Nodes for community-level stewardship.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_digital_commons',
    to: 'framework_aurora_accord',
    type: 'IMPLEMENTS',
    description:
      'Operates inside Aurora data rights. The v3.0 boundary: Aurora governs data as a category, Digital Commons governs the processes that turn it into shared meaning.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_digital_commons',
    to: 'framework_conduit_protocol',
    type: 'DEPENDS_ON',
    description:
      'v3.0 migrated mesh networks, resilience and infrastructure hardening to the Conduit Protocol; the commons now runs on infrastructure it does not govern.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_digital_commons',
    to: 'framework_synoptic',
    type: 'COLLABORATES_WITH',
    description: 'Contestation and epistemic governance overlap with information integrity work.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_digital_commons',
    to: 'framework_hearthstone',
    type: 'INTEGRATES_WITH',
    description: 'Knowledge held as commons uses the same stewardship logic as physical commons.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_digital_commons',
    to: 'institution_knowledge_commons_ombudsperson',
    type: 'COORDINATES_WITH',
    description:
      'The Ombudsperson holds consent, access and correction disputes across knowledge commons custody.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_digital_commons',
    type: 'GUIDES',
    description:
      'Indigenous data and knowledge sovereignty govern what may enter the commons at all.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_cawc',
    to: 'council_dcc',
    type: 'COORDINATES_WITH',
    description: 'Cultural standards and knowledge stewardship are set jointly.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- framework_religious_dialogue ---------------------------------------
  {
    from: 'framework_religious_dialogue',
    to: 'council_gcrsd',
    type: 'ESTABLISHES',
    description: 'The council is the framework; cartography is what it produces.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_religious_dialogue',
    to: 'platform_wisdom_repository',
    type: 'ESTABLISHES',
    description: 'Establishes the repository holding cartography outputs and recorded dissent.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_religious_dialogue',
    to: 'protocol_sacred_data',
    type: 'ESTABLISHES',
    description: 'Establishes consent rules for sacred material in digital form.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_religious_dialogue',
    to: 'council_cawc',
    type: 'INFORMS',
    description: 'Spiritual dimensions of cultural practice inform preservation standards.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gcrsd',
    to: 'council_interfaith_governance_council',
    type: 'ESTABLISHES',
    description: 'Establishes the AUBI-facing sub-council.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'council_gcrsd',
    to: 'institution_interfaith_teams',
    type: 'ESTABLISHES',
    description: 'Establishes interfaith teams for conflicts with a spiritual dimension.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'council_gcrsd',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The GCRSD is an advisory council within the Meta-Governance structure.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gcrsd',
    to: 'framework_mos',
    type: 'INFORMS',
    description:
      'Supplies plural moral reasoning to the MOS without either body binding the other.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gcrsd',
    to: 'framework_treaty',
    type: 'SUPPORTS',
    description: 'Advises on Treaty implementation where questions of meaning are at stake.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gcrsd',
    to: 'framework_peace',
    type: 'PARTICIPATES_IN',
    description: 'Contributes to mediation where conflicts have religious dimensions.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gcrsd',
    to: 'framework_shield',
    type: 'INFORMS',
    description: 'Advises on religiously-framed extremism without becoming an intelligence source.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gcrsd',
    to: 'framework_synoptic',
    type: 'COORDINATES_WITH',
    description: 'Cartography outputs are published under information-integrity standards.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_earth',
    to: 'council_gcrsd',
    type: 'PARTICIPATES_IN',
    description:
      'Indigenous participation is by invitation and standing, not by allocated seat.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_interfaith_governance_council',
    to: 'framework_aubi',
    type: 'INFORMS',
    description: 'Advises on aligning currency design with traditions such as Zakat.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_interfaith_teams',
    to: 'framework_peace',
    type: 'COLLABORATES_WITH',
    description: 'Deployed jointly with peace teams, on invitation.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'platform_wisdom_repository',
    to: 'framework_digital_commons',
    type: 'USES_DATA_FROM',
    description: 'Hosted on the knowledge commons and subject to its versioning and retirement rules.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_sacred_data',
    to: 'framework_digital_commons',
    type: 'INTEGRATES_WITH',
    description: 'Sacred material is a bounded class within the commons, not an exception to it.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_sacred_data',
    to: 'council_gtc',
    type: 'COORDINATES_WITH',
    description: 'AI chaplaincy and digital afterlife questions are co-governed with the GTC.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },

  // --- framework_arts_flourishing ------------------------------------------
  {
    from: 'framework_arts_flourishing',
    to: 'framework_cultural_heritage',
    type: 'COLLABORATES_WITH',
    description: 'New creation and preservation are two halves of cultural metabolism.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_arts_flourishing',
    to: 'institution_cosmic_artisan_guilds',
    type: 'ENABLES',
    description: 'Seeds the Tier 4 guild structure.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_arts_flourishing',
    to: 'framework_aubi',
    type: 'DEPENDS_ON',
    description:
      'Creative contribution is compensated through the same channels as care and ecological work.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_arts_flourishing',
    to: 'framework_digital_commons',
    type: 'USES_DATA_FROM',
    description: 'Works and their provenance are held in the knowledge commons.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_arts_flourishing',
    to: 'framework_hearthstone',
    type: 'INTEGRATES_WITH',
    description: 'Studios, venues and instruments are commons that need stewardship structures.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_arts_flourishing',
    to: 'framework_synoptic',
    type: 'COORDINATES_WITH',
    description:
      'Attribution and synthetic-media provenance are shared with information integrity.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_arts_flourishing',
    type: 'GUIDES',
    description:
      'Cultural consent governs what may be performed, recorded, adapted or sold.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_hearts',
    to: 'framework_arts_flourishing',
    type: 'REWARDS',
    description: 'Hearts compensate creative contribution.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_arts_flourishing',
    to: 'framework_resonance_protocol',
    type: 'ENABLES',
    description:
      'Soundscape governance extends arts stewardship into the acoustic commons.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },

  // --- inner development and wise decision-making ---------------------------
  {
    from: 'framework_inner_dev',
    to: 'process_clp',
    type: 'ESTABLISHES',
    description: 'Establishes the Conscious Leadership Program.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_inner_dev',
    to: 'framework_wdmip',
    type: 'INFORMS',
    description:
      'Inner capacity is what makes the WDIP method usable; the method does not assume it.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_inner_dev',
    to: 'framework_digital_commons',
    type: 'ENABLES',
    description: 'Practice materials are published as commons rather than licensed.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'framework_inner_dev',
    type: 'GUIDES',
    description:
      'MOS §6.2 forbids assigning or storing a developmental stage — the constraint this framework most needs.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_clp',
    to: 'council_mgcc',
    type: 'IMPLEMENTS',
    description: 'Delivered to Meta-Governance council members.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_wdmip',
    to: 'process_ets',
    type: 'ESTABLISHES',
    description: 'Establishes ethical stress-testing as a WDIP method.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_wdmip',
    to: 'council_mgcc',
    type: 'GUIDES',
    description: 'Supplies decision method to the coordination council without deciding for it.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_wdmip',
    to: 'framework_synoptic',
    type: 'DEPENDS_ON',
    // was type: 'REQUIRES', which is not in the union
    description:
      'Decision quality depends on the information conditions Synoptic governs; WDIP cannot activate it.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_wdmip',
    to: 'institution_dj_tribunal',
    type: 'GUIDES',
    description: 'Offers deliberation method for hard adjudicative questions.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_ets',
    to: 'framework_mos',
    type: 'IMPLEMENTS',
    description: 'Operationalizes MOS reasoning as a test applied before a decision.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },

  // --- global citizenship and cultural institutions -------------------------
  {
    from: 'framework_global_citizenship',
    to: 'framework_education',
    type: 'COLLABORATES_WITH',
    description: 'Practice and curriculum reinforce each other.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_global_citizenship',
    to: 'framework_meta_gov',
    type: 'INFORMS',
    description: 'Individual practice feeds signals upward without becoming a mandate.',
    strength: 'Weak',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_global_citizenship',
    to: 'framework_wdmip',
    type: 'BENEFITS_FROM',
    description: 'Borrows the deliberation method at personal scale.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_cawc',
    to: 'council_earth',
    type: 'REPORTS_TO',
    description: 'Cultural standards defer to Indigenous authority where the two meet.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_cawc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The CAWC is a domain council within Meta-Governance.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cst',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Cultural Stewardship Teams operate within BAZ governance.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cst',
    to: 'framework_work_liberation',
    type: 'IMPLEMENTS',
    description: 'Cultural stewardship is a recognised participation mode.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cst',
    to: 'framework_aubi',
    type: 'REWARDS',
    description: 'Cultural work earns Hearts through the standard contribution channels.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_lcn',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Local Citizen Nodes operate within BAZ governance.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'tool_cv_index',
    to: 'framework_aubi',
    type: 'INFORMS',
    description: 'Cultural vitality readings feed AUBI assessment, on the advisory side.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- memorial commons -----------------------------------------------------
  {
    from: 'framework_memorial_commons',
    to: 'framework_cultural_heritage',
    type: 'DEPENDS_ON',
    description: 'Memorial practice is cultural practice with a specific occasion.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_memorial_commons',
    to: 'framework_mental_health',
    type: 'COORDINATES_WITH',
    description:
      'Collective grief work runs alongside clinical support and must not be mistaken for it.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_memorial_commons',
    to: 'framework_cairn_protocol',
    type: 'COORDINATES_WITH',
    description: 'Addiction-related grief is a shared surface between the two frameworks.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_memorial_commons',
    to: 'institution_icc',
    type: 'ESCALATES_TO',
    description:
      'Disputes over memorial sites held as commons escalate to the International Commons Court.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'mechanism_hearts',
    to: 'framework_memorial_commons',
    type: 'REWARDS',
    description: 'Death care and memorial stewardship are compensated care work.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  }
];
