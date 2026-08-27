// /src/lib/data/schema/cluster.economic-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: ECONOMIC OPERATING SYSTEM
 *
 * The regenerative economic engine. Four frameworks divide the work:
 *   AUBI              — the social compact: unconditional security, payout layers, LMCI
 *   Financial Systems — the technical architecture: Hearts, Leaves, Treasury, ICTL, NARP
 *   Nested Economies  — constitutional rules for coordination between autonomous economies
 *   Work in Liberation — voluntary contribution and Community Provider governance
 * Gaian Trade and GSCL sit on top as the material-exchange and logistics layers.
 *
 * Conventions: see cluster.implementation-os.ts.
 *
 * OPEN EDITORIAL QUESTION — Community Work Teams vs Community Providers.
 * Work in Liberation reframed CWTs as Community Providers at v1.5 and no longer
 * uses the older term. Other frameworks still do: the Capacity Engine, Bioregional
 * Polis, Memorial Commons, Legacy Protocol and Mental Health outlines all reference
 * CWTs, and the Cosmic Artisan Guilds are defined as an evolution of the CWT model.
 * Both entities are therefore retained here pending a decision. Merging them would
 * touch six other clusters.
 */

export const economicOSEntities: GgfEntity[] = [
  // === CORE FRAMEWORKS ===
  {
    id: 'framework_aubi',
    type: 'Framework',
    name: 'Adaptive Universal Basic Income Framework',
    shortName: 'AUBI',
    description:
      'The social compact for unconditional material security: payout architecture, contribution recognition, and the epistemic rights governing how any of it is measured. Distributes Hearts and Leaves; does not itself define the currency machinery, which lives in Financial Systems.',
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'mechanism_gcf', // cluster: constitutional-foundation
      'framework_financial_systems'
    ],
    enables: [
      'platform_love_ledger',
      'process_proof_of_care',
      'process_community_weaver',
      'institution_community_provider',
      'metric_lmci'
    ],
    ui: {
      path: '/frameworks/adaptive-universal-basic-income',
      titleKey: 'framework.docs.nav.frameworkTitles.adaptiveUniversalBasicIncome',
      emoji: '💚',
      slug: 'adaptive-universal-basic-income',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v2.6',
        updated: '2026-08-21',
        maturity: 'adversarial',
        standfirst:
          'A dual-wallet basic income: fiat for survival, plus Hearts and Leaves that recognise care work and ecological stewardship without turning either into a wage. Version 2.5.2 hardened both observability and authority — separating LMCI registers from operational telemetry, adding Observation Contracts and State Estimate Records, protecting epistemic rights over measurement, replacing universal identity with purpose-limited access attestations, and treating Social Resilience Council composition as a constitutional design question rather than a self-executing quota. Version 2.5.3 names a loop the framework had left implicit: a baseline indexed to housing cost at 40% can partly chase a rent increase the payments themselves helped produce. Version 2.6 names an asymmetry: adding a baseline and removing one are not mirror operations, because a household that has arranged housing, care and dependants around a payment is exposed by its withdrawal in a way that a household which never received it is not. Reductions now require notice, phasing and a stated reason; suspension for dormancy, a lapsed attestation, an open investigation or a criminal record is barred; and a pilot that cannot say in advance what happens to participants when it ends is not ready to enrol them. The design assumption throughout is that a system which can see, classify, or represent you can also mismeasure, misidentify, or overclaim authority over you.'
      }
    }
  },
  {
    id: 'framework_financial_systems',
    type: 'Framework',
    name: 'Regenerative Financial Systems Framework',
    shortName: 'Financial Systems',
    description:
      'The technical and operational architecture beneath AUBI: Hearts and Leaves issuance, the Hearts Treasury, reserve and redemption rules, fraud protection, crisis liquidity, the Inter-Currency Translation Layer, and financial observability.',
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    // `protocol_debt_transformation` removed: §15.8 withdraws the mechanism
    // rather than establishing it. Financial Systems supplies settlement
    // infrastructure only after a dedicated protocol is adopted.
    enables: [
      'mechanism_hearts',
      'mechanism_leaves',
      'mechanism_hearts_treasury',
      'mechanism_ictl'
    ],
    ui: {
      path: '/frameworks/financial-systems',
      titleKey: 'framework.docs.nav.frameworkTitles.financialSystems',
      emoji: '❤️',
      slug: 'financial-systems',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v3.5',
        updated: '2026-08-27',
        maturity: 'adversarial',
        standfirst:
          'The plumbing under the regenerative economy: how Hearts are issued and redeemed, what the Treasury holds in reserve, what happens when liquidity fails, and who may challenge the models that decide any of it. Reconstructed after a substantial truncation was found in v3.3, with the reserve architecture settled at a 50% normal target and a 30% hard issuance floor. The framework routes financial consequences but constitutes no underwriting, claims, or guarantee authority of its own. Version 3.5 adds first-receiver incidence: every issuance class must record which participants receive newly issued value before prices and provider rates adjust — the injection-side counterpart to tax incidence, which the corpus previously tracked only on the withdrawal side. Automatic controls are framed as temporary containment, not diagnosis.'
      }
    }
  },
  {
    id: 'framework_work_liberation',
    type: 'Framework',
    name: 'Work in Liberation Framework',
    shortName: 'Work in Liberation',
    description:
      'Rules for organizing voluntary, dignified, worker-governed contribution once material survival has been decoupled from employment. Establishes the Community Provider Charter Standard, the Worker Bill of Rights, a 15-hour protective ceiling, and the unconditional right not to contribute.',
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aubi', 'framework_financial_systems'],
    enables: ['institution_community_provider', 'institution_cwt'],
    ui: {
      path: '/frameworks/work-in-liberation',
      titleKey: 'framework.docs.nav.frameworkTitles.workInLiberation',
      emoji: '👥',
      slug: 'work-in-liberation',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v2.0.1',
        updated: '2026-08-08',
        maturity: 'adversarial',
      standfirst:
          'How work gets organized once material survival no longer depends on it: voluntary contribution, worker-governed Community Providers, a 15-hour protective ceiling, and an unconditional right not to contribute at all. Version 2.0 retired the composite LMCI score and removed the Love Ledger as a default work-history signal, on the principle that no single number should stand as proof of a liberated life. Version 2.0.1 draws the boundary with ordinary employment law, which stays where it is.'
      }
    }
  },
  {
    id: 'framework_nested_sovereignty',
    type: 'Framework',
    name: 'Nested Economies Framework',
    shortName: 'Nested Economies',
    description:
      'Constitutional and operational rules for how relatively autonomous economies coordinate across boundaries without surrendering local authority, protected difference, or meaningful exit. Supplies the Economic Subsidiarity Test, Cross-Scale Interface Contracts, and protected non-convertibility.',
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty', 'framework_financial_systems'],
    ui: {
      path: '/frameworks/nested-economies',
      titleKey: 'framework.docs.nav.frameworkTitles.nestedEconomies',
      emoji: '💱',
      slug: 'nested-economies',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v3.3.1',
        updated: '2026-08-10',
        maturity: 'adversarial',
        standfirst:
          'How economies at different scales coordinate without one swallowing the others. Version 3.3 preserves the two-tier, voluntary, delegated, and revocable architecture while replacing scale-only subsidiarity with causal, economic, and constitutional subsidiarity. It adds jointly constituted authority, internal subsidiarity within BAZs, safeguards against holdout and bargaining domination, and legal, technical, financial, service, political, and material exit. Coordination that cannot be refused, forked, or left without losing essential services is dependency, not polycentric governance.'
      }
    }
  },
  {
    id: 'framework_gaian_trade',
    type: 'Framework',
    name: 'The Gaian Trade Framework',
    shortName: 'Gaian Trade',
    description:
      'Planetary resource stewardship and regenerative exchange: the material counterpart to the value flows of the economic OS. Governs Regenerative Trade Zones, Digital Product Passports, planetary-boundary tariffs, and the Right to Opacity.',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_treaty'],
    enables: ['tool_dpp'],
    ui: {
      path: '/frameworks/gaian-trade',
      titleKey: 'framework.docs.nav.frameworkTitles.gaianTrade',
      emoji: '🌍',
      slug: 'gaian-trade',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v0.9.2',
        updated: '2026-08-10',
        maturity: 'adversarial',
        standfirst:
          'Trade treated as relationship rather than transaction, governed across three time horizons — a fast loop for tariffs and routing, a medium loop for industrial transition, and a deep-time loop with binding veto over decisions with geological consequences. Radical material transparency is the default, but communities may invoke a Right to Opacity: traceability should not become a tool for making Indigenous knowledge legible to whoever wants it.'
      }
    }
  },
  {
    id: 'framework_gscl',
    type: 'Framework',
    name: 'Global Supply Chains & Logistics Framework',
    shortName: 'Supply Chains',
    description:
      'The operational logistics layer beneath Gaian Trade: bioregional hubs, transport networks, and workforce systems, integrating physical, financial, digital, social and cultural layers rather than optimizing any one of them.',
    tier: 1,
    status: 'Stable',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_gaian_trade', 'framework_treaty'],
    ui: {
      path: '/frameworks/global-supply-chains-and-logistics',
      titleKey: 'framework.docs.nav.frameworkTitles.globalSupplyChainsAndLogistics',
      emoji: '🚢',
      slug: 'global-supply-chains-and-logistics',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v1.4.2',
        updated: '2026-08-03',
        maturity: 'adversarial',
        standfirst:
          'Where Gaian Trade sets the terms of exchange, GSCL moves the freight: regional hubs operating as Bioregional Trade and Resource Hubs, zero-emission ports, and acoustic governance for the maritime corridors that carry most of world trade by volume. Localized production is the organizing preference, with long-distance logistics reserved for what a bioregion genuinely cannot supply itself.'
      }
    }
  },
  {
    id: 'framework_adaptive_tax',
    type: 'Framework',
    name: 'Adaptive Tax Framework',
    shortName: 'Adaptive Tax',
    description:
      'Common architecture for revenue and fiscal instruments: authority, legal base, observability, incidence, administration, cross-border coordination, and the conditions under which an instrument should be narrowed or abandoned. Supplies fiscal grammar rather than tax policy, and levies nothing by publication.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_treaty', // cluster: constitutional-foundation
      'protocol_constitutional_interface' // cluster: governance-os
    ],
    ui: {
      path: '/frameworks/adaptive-tax',
      titleKey: 'framework.docs.nav.frameworkTitles.adaptiveTax',
      emoji: '🧾',
      slug: 'adaptive-tax',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v0.1.4',
        updated: '2026-08-27',
        maturity: 'internal',
        standfirst:
          'The framework two Tier 1 economic documents had been citing for two revision cycles without it existing. It answers, for any proposed instrument: who may enact it, what legal fact is the base, who actually bears the burden after behaviour adjusts, and what evidence would justify abandoning it. Phase 0 is the spine — what a jurisdiction can lawfully do on Monday — and it declines to inherit the legacy 5–25% automation tax rather than repackaging a number nobody can observe.'
      }
    }
  },
  {
    id: 'protocol_shared_capital',
    type: 'Protocol',
    name: 'Shared Capital and Social Inheritance Protocol',
    shortName: 'Shared Capital',
    description:
      'Governance architecture for plural shared-capital institutions and broadly distributed capital endowments: charters, custody, investment mandates, beneficiary rights, dividends, and closure. Holds capital for beneficiaries without becoming a single public owner, and creates no claim on any asset by itself.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: [
      'framework_adaptive_tax',
      'protocol_constitutional_interface' // cluster: governance-os
    ],
    ui: {
      path: '/frameworks/shared-capital-and-social-inheritance',
      titleKey: 'framework.docs.nav.frameworkTitles.sharedCapitalAndSocialInheritance',
      emoji: '🏦',
      slug: 'shared-capital-and-social-inheritance',
      group: 'globalEconomicSystems',
      outline: {
        version: 'v0.1.4',
        updated: '2026-08-27',
        maturity: 'internal',
        standfirst:
          'A society can put a floor under everyone and still leave productive capital in very few hands. This governs who holds capital on behalf of people who have none — social wealth funds, community and worker funds, citizen-capital accounts — and how those claims spread without one institution becoming the universal owner. Its sharpest rule is that shared upside requires shared accounting of downside: a celebrated public investment does not erase the portfolio that paid for it.'
      }
    }
  },

  // === GOVERNANCE COUNCILS ===
  {
    id: 'council_social_resilience',
    type: 'Council',
    name: 'Social Resilience Council',
    shortName: 'SRC',
    description:
      'Meta-Governance council with fiscal oversight of AUBI, Hearts and Leaves supply, and the Debt Transformation Protocol. Distinct from the FLP, which sets valuation standards rather than managing distribution.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_meta_gov', // cluster: governance-os
      'framework_aubi'
    ]
  },
  {
    id: 'council_flp',
    type: 'Council',
    name: 'Fractal Labor Parliament',
    shortName: 'FLP',
    description:
      'Meta-Governance council setting ethical standards and valuation for contribution. Determines what counts as valid work; does not control the money supply.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_meta_gov', // cluster: governance-os
      'framework_work_liberation'
    ]
  },

  // === ECONOMIC MECHANISMS ===
  {
    id: 'mechanism_hearts',
    type: 'EconomicMechanism',
    name: 'Hearts Currency',
    shortName: 'Hearts',
    description:
      'A non-tradable social credit, distributed via AUBI and spendable only at chartered Community Providers, supporting the local care economy. Issuance, reserve backing and redemption are governed by Financial Systems.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_financial_systems', 'framework_aubi']
  },
  {
    id: 'mechanism_leaves',
    type: 'EconomicMechanism',
    name: 'Leaves Currency',
    shortName: 'Leaves',
    description: 'Ecological currency rewarding verified ecosystem restoration and stewardship.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_financial_systems', 'framework_aubi']
  },
  {
    id: 'mechanism_hearts_treasury',
    type: 'EconomicMechanism',
    name: 'Hearts Treasury',
    shortName: 'Hearts Treasury',
    description:
      'The financial infrastructure, managed by partner credit unions, that provides fiat backing for Hearts so providers can redeem at a stable rate. Holds a 50% normal reserve target with a 30% hard issuance floor. Initially capitalized by the GCF.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Regional',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_financial_systems',
      'mechanism_gcf' // cluster: constitutional-foundation
    ]
  },
  {
    id: 'mechanism_ictl',
    type: 'EconomicMechanism',
    name: 'Inter-Currency Translation Layer',
    shortName: 'ICTL',
    description:
      'The exchange layer between Hearts, Leaves, fiat, and external instruments. Defined in Financial Systems; already relied upon by the Global Sustainable Enterprise Transition in the just-transition cluster.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_financial_systems']
  },

  // === PLATFORMS & INFRASTRUCTURE ===
  {
    id: 'platform_love_ledger',
    type: 'Platform',
    name: 'Love Ledger',
    shortName: 'Love Ledger',
    description:
      'A community-led platform making informal care contributions visible through non-monetized recognition. Runs parallel to the Hearts economy to prevent commodification of relationships, and feeds the LMCI. Explicitly not a work-history or matching signal.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aubi']
  },

  // === INSTITUTIONS ===
  {
    id: 'institution_cwt',
    type: 'Institution',
    name: 'Community Work Teams',
    shortName: 'CWTs',
    description:
      'BAZ-level teams organizing care, ecological, and cultural work. Note: Work in Liberation reframed this role as Community Provider at v1.5 and no longer uses the term; the entity is retained because six other frameworks still do. See the header note.',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Economic',
    geographicScope: 'Regional',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_work_liberation',
      'institution_baz' // cluster: ethical-os
    ]
  },
  {
    id: 'institution_community_provider',
    type: 'Institution',
    name: 'Community Provider',
    shortName: 'Community Provider',
    description:
      'A local organization or individual chartered by a BAZ Council under the Community Provider Charter Standard to accept Hearts in exchange for care, cultural, educational, or ecological services.',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Economic',
    geographicScope: 'Local',
    implementationPriority: 'Critical',
    dependencies: ['framework_work_liberation', 'framework_aubi', 'institution_baz_council']
  },
  {
    id: 'institution_baz_council',
    type: 'Institution',
    name: 'BAZ Council',
    shortName: 'BAZ Council',
    description:
      'A democratically elected council governing a local Hearts economy: chartering Community Providers and managing the relationship with the Hearts Treasury.',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Local',
    implementationPriority: 'Critical',
    dependencies: [
      'institution_baz' // cluster: ethical-os
    ]
  },

  // === PROCESSES & TOOLS ===
  {
    id: 'process_proof_of_care',
    type: 'Process',
    name: 'Proof of Care',
    shortName: 'Proof of Care',
    description:
      'The validation process chartered Community Providers use to log services and justify Hearts redemption. Separate from the informal recognition recorded on the Love Ledger.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aubi', 'platform_love_ledger', 'institution_community_provider']
  },
  {
    id: 'process_community_weaver',
    type: 'Process',
    name: 'Community Weaver',
    shortName: 'Community Weaver',
    description:
      'A trained facilitator supporting the bootstrapping and operation of a local Hearts economy. Role separation rules in Nested Economies and Work in Liberation keep facilitation distinct from representation and assessment.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Local',
    implementationPriority: 'High',
    dependencies: ['framework_aubi']
  },
  {
    id: 'tool_dpp',
    type: 'Tool',
    name: 'Digital Product Passports',
    shortName: 'DPPs',
    description:
      'Lifecycle traceability record for goods and materials, disclosing ecological, social and labour impacts, subject to the Right to Opacity. DUPLICATE: `tool_digital_product_passport` in cluster.pathfinder-protocol describes the same instrument and should be folded into this one.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_gaian_trade']
  },

  // === DATA METRICS ===
  {
    id: 'metric_lmci',
    type: 'DataMetric',
    name: 'Love, Meaning, and Connection Index',
    shortName: 'LMCI',
    description:
      'A metric of societal flourishing guiding the AUBI system, split into measurement and assessment registers separated by a firewall. Nested Economies and Work in Liberation both retired their own composite LMCI formulas at v3.2 and v2.0; AUBI is now the sole owner.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_aubi']
  },

  // === PROTOCOLS ===
  {
    id: 'protocol_debt_transformation',
    type: 'Protocol',
    name: 'Sovereign Debt Transformation Protocol',
    shortName: 'Debt-to-Regen',
    description:
      'A deferred capability, not an operative mechanism. Financial Systems §15.8 withdrew the debt-for-care/ecology proposal as too consequential and under-specified, and Treaty Article 19.3 defers it pending a dedicated protocol addressing legal authority, debtor consent and democratic authorization, affected-community and Indigenous consent, creditor treatment, baseline and additionality, ecological permanence and leakage, labour and distributional effects, currency and settlement risk, verification and challenge, and restructuring, default and insolvency law. No sovereign debt is converted into Hearts, Leaves, or restoration obligations under any current GGF instrument.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    // Dependencies record where the deferral is written, not an operating
    // chain. Hearts, Leaves, Love Ledger and SRC links removed: a deferred
    // capability neither consumes nor is overseen by anything.
    dependencies: [
      'framework_financial_systems',
      'framework_treaty' // cluster: constitutional-foundation
    ]
    // No `enables`: nothing downstream may depend on a withdrawn mechanism.
    // No ui block: sub-protocol, not a published framework page.
  },
  {
    id: 'protocol_itp',
    type: 'Mechanism',
    name: 'Immanent Trust Protocol',
    shortName: 'ITP',
    description:
      'Observer-relative trust architecture closing the collusion, Sybil, and Proof-of-Care verification gaps in the GGF economic layer. Each node computes trust locally; no global ledger, no oracle.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: [
      'framework_meta_gov', // cluster: governance-os
      'framework_financial_systems',
      'framework_aubi',
      'framework_nested_sovereignty'
    ],
    enables: ['mechanism_hearts', 'process_proof_of_care', 'platform_love_ledger'],
    ui: {
      path: '/resources/whitepapers/immanent-trust-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.immanentTrustProtocol',
      emoji: '🔗',
      slug: 'immanent-trust-protocol'
      // No `outline` block: published at the path above, not by the
      // /frameworks/[slug] route. Adding one would make the validator demand
      // ui.path === '/frameworks/immanent-trust-protocol'.
    }
  }
];

export const economicOSRelationships: GgfRelationship[] = [
  // --- framework_aubi ---------------------------------------------------
  // Constitutional and architectural anchors
  {
    from: 'framework_aubi',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'AUBI is the expression of the Treaty\'s social contract; the Treaty supplies its fiscal, justice and emergency authority.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'framework_financial_systems',
    type: 'INTEGRATES_WITH',
    description:
      'AUBI is the social compact; Financial Systems is the machinery underneath it. AUBI decides who receives what and why; Financial Systems decides how the currency holds its value.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'framework_meta_gov',
    type: 'INTEGRATES_WITH',
    description:
      'AUBI routes cross-domain coordination and institutional disputes through Meta-Governance rather than resolving them internally.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'protocol_genesis',
    type: 'DEPENDS_ON',
    description:
      'AUBI cites Genesis for the Conscience & Sovereignty Clause, the Failure Library, and the Founding Intent Record.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_aubi',
    type: 'FUNDS',
    description: 'The Global Commons Fund is the primary funding source for AUBI Layer 1.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  // Bodies and instruments AUBI establishes
  {
    from: 'framework_aubi',
    to: 'platform_love_ledger',
    type: 'ESTABLISHES',
    description:
      'AUBI constitutes the Love Ledger as non-monetized recognition, deliberately firewalled from Hearts verification.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_aubi',
    to: 'process_proof_of_care',
    type: 'ESTABLISHES',
    description: 'AUBI defines Proof of Care as the validation path for Hearts redemption.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_aubi',
    to: 'process_community_weaver',
    type: 'ESTABLISHES',
    description: 'AUBI establishes the Community Weaver role to facilitate implementation.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_aubi',
    to: 'institution_community_provider',
    type: 'ESTABLISHES',
    description: 'AUBI establishes the chartering process for Community Providers.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_aubi',
    to: 'metric_lmci',
    type: 'ESTABLISHES',
    description:
      'AUBI owns the LMCI, maintaining the firewall between its measurement and assessment registers and separating both from operational telemetry.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },

  // Currency distribution
  {
    from: 'framework_aubi',
    to: 'mechanism_hearts',
    type: 'REWARDS',
    description: 'AUBI Layer 2 rewards care and community contribution with Hearts.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'mechanism_leaves',
    type: 'REWARDS',
    description: 'AUBI Layer 2 rewards ecological work with Leaves.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'mechanism_hearts_treasury',
    type: 'USES',
    // was ESTABLISHES — v2.5 assigns Treasury, reserves and redemption to Financial Systems
    description:
      'AUBI depends on the Treasury for redemption stability but does not govern its reserve rules.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // Oversight and guidance
  {
    from: 'council_social_resilience',
    to: 'framework_aubi',
    type: 'OVERSEES',
    description: 'The SRC holds fiscal oversight of AUBI and of Hearts and Leaves supply.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_earth',
    to: 'framework_aubi',
    type: 'GUIDES',
    description:
      'The Earth Council holds Indigenous-guided authority over AUBI design, including protected unobservability.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_fpic2',
    to: 'framework_aubi',
    type: 'GUIDES',
    description:
      'FPIC 2.0 governs consent for any AUBI measurement or pilot touching Indigenous communities.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'institution_ggf_failure_library',
    type: 'INFORMS',
    description: 'AUBI pilot failures are documented in the Failure Library rather than buried.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'framework_migration',
    type: 'COORDINATES_WITH',
    description:
      'Portability of entitlements across borders and BAZ boundaries is resolved jointly with the Migration framework.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- framework_financial_systems --------------------------------------
  {
    from: 'framework_financial_systems',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description: 'Financial Systems operationalizes the Treaty\'s fiscal authority.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_financial_systems',
    to: 'mechanism_hearts',
    type: 'ESTABLISHES',
    description:
      'Defines Hearts issuance, reserve backing, redemption, fraud protection and crisis liquidity.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_financial_systems',
    to: 'mechanism_leaves',
    type: 'ESTABLISHES',
    description: 'Defines Leaves issuance and the ecological verification path behind it.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_financial_systems',
    to: 'mechanism_hearts_treasury',
    type: 'ESTABLISHES',
    description:
      'Sets Treasury liquidity and resolution rules: 50% normal reserve target, 30% hard issuance floor, time-limited 20% emergency floor.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_financial_systems',
    to: 'mechanism_ictl',
    type: 'ESTABLISHES',
    description: 'Defines the Inter-Currency Translation Layer and its objectives.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_financial_systems',
    to: 'protocol_debt_transformation',
    // Not ESTABLISHES: §15.8 defers the mechanism and specifies what a
    // dedicated protocol must cover. No DEFERS_TO type exists in the union;
    // INFORMS is the least-wrong available type.
    type: 'INFORMS',
    description:
      'Financial Systems §15.8 defers sovereign-debt conversion to a dedicated protocol and enumerates what that protocol must address. Financial Systems may supply settlement infrastructure only after such a protocol is adopted.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_financial_systems',
    to: 'platform_love_ledger',
    type: 'INTEGRATES_WITH',
    description:
      'Financial observability draws on Love Ledger data while preserving the firewall against using it as a credit or work-history signal.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_financial_systems',
    to: 'process_circuit_breaker',
    type: 'INTEGRATES_WITH',
    description:
      'Automatic controls act as temporary containment pending human diagnosis, not as a causal finding.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_financial_systems',
    to: 'framework_meta_gov',
    type: 'INTEGRATES_WITH',
    description: 'Cross-domain financial authority conflicts escalate through Meta-Governance.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_social_resilience',
    to: 'framework_financial_systems',
    type: 'OVERSEES',
    description:
      'The SRC oversees reserve policy, issuance floors, and NARP model-challenge outcomes.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_financial_systems',
    to: 'framework_justice',
    type: 'ESCALATES_TO',
    // v3.4 routes these through Value Courts; retained pending confirmation that
    // Value Courts are a Justice Systems body rather than a separate entity.
    description: 'Financial fraud and Love Ledger disputes escalate to the justice system.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_financial_systems',
    to: 'framework_hearthstone',
    type: 'INTEGRATES_WITH',
    description:
      'Supplies currency exchange and transaction-tax mechanisms that hold economic stability during asset transitions and prevent capital flight.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_gcf',
    to: 'mechanism_hearts_treasury',
    type: 'FUNDS',
    description:
      'The Global Commons Fund provides initial capitalization for regional Hearts Treasuries to ensure fiat liquidity.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Sequential'
  },

  // --- framework_nested_sovereignty -------------------------------------
  {
    from: 'framework_nested_sovereignty',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'Derives its commons duties and Earth Council authority from the Treaty while keeping economic authority local.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_nested_sovereignty',
    to: 'framework_financial_systems',
    type: 'INTEGRATES_WITH',
    description:
      'Sets the interface rules under which Hearts, Leaves and Treasury machinery may cross an economic boundary.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_nested_sovereignty',
    to: 'mechanism_hearts',
    type: 'GUIDES',
    // was IMPLEMENTS — v3.2 replaced conversion formulas with authority and
    // interface rules, including protected non-convertibility
    description:
      'Governs Hearts interoperability across scales and protects the right of an economy to remain non-convertible.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_nested_sovereignty',
    to: 'mechanism_leaves',
    type: 'GUIDES',
    description: 'Governs Leaves recognition across bioregional boundaries.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_nested_sovereignty',
    to: 'institution_baz_council',
    type: 'GUIDES',
    description:
      'Supplies the Economic Subsidiarity Test and decision-rights matrix that determine what a BAZ Council may decide alone.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_nested_sovereignty',
    to: 'process_community_weaver',
    type: 'GUIDES',
    description:
      'Defines Community Weaver role separation and observer-independence safeguards.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_nested_sovereignty',
    to: 'council_social_resilience',
    type: 'COORDINATES_WITH',
    description:
      'The Solidarity Protocol and cross-scale compacts are administered jointly with the SRC.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_earth',
    to: 'framework_nested_sovereignty',
    type: 'GUIDES',
    description:
      'Earth Council authority bounds what may be traded, converted or coordinated across economies.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- framework_work_liberation ----------------------------------------
  {
    from: 'framework_work_liberation',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'Grounds labour rights, ecocide protections and enforcement-adjacent work safeguards in Treaty authority.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_work_liberation',
    to: 'institution_community_provider',
    type: 'ESTABLISHES',
    description:
      'Defines the Community Provider Charter Standard and the Worker Bill of Rights that bind it.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_work_liberation',
    to: 'institution_cwt',
    type: 'ESTABLISHES',
    description:
      'Historical: Community Work Teams were the v1.0 form of what v1.5 renamed Community Providers. Retained while other frameworks still use the term.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_work_liberation',
    to: 'framework_financial_systems',
    type: 'USES',
    description:
      'Compensation flows, and their separation from contribution records, run on Financial Systems machinery.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_work_liberation',
    to: 'process_proof_of_care',
    type: 'USES',
    description:
      'Contribution is validated through Proof of Care, not through Love Ledger history.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_work_liberation',
    to: 'process_community_weaver',
    type: 'GUIDES',
    description:
      'Sets Community Weaver role separation so that facilitation cannot become assessment or representation.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_work_liberation',
    to: 'framework_nested_sovereignty',
    type: 'COORDINATES_WITH',
    description:
      'Cross-BAZ provider recognition and solidarity architecture are shared between the two frameworks.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_work_liberation',
    to: 'framework_gaian_trade',
    type: 'COORDINATES_WITH',
    description:
      'Industrial Sunsetting and external economic transition are coordinated with regenerative trade policy.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_work_liberation',
    to: 'framework_hearthstone',
    type: 'SUPPORTS',
    description:
      'Organizes roles such as Commons Scribes to ensure hybrid digital and physical access to the Commons Title Registry.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_flp',
    to: 'framework_work_liberation',
    type: 'OVERSEES',
    description: 'The FLP sets the standards for what constitutes valid contribution.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // --- framework_gaian_trade --------------------------------------------
  {
    from: 'framework_gaian_trade',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'Shared resources — oceans, atmosphere, rivers, space — are governed as commons under the Treaty.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gaian_trade',
    to: 'tool_dpp',
    type: 'ESTABLISHES',
    description:
      'Establishes Digital Product Passports for material traceability, bounded by the Right to Opacity.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_gaian_trade',
    to: 'mechanism_gcf',
    type: 'FUNDS',
    description:
      'The Symmetrical Imbalance Penalty directs surplus taxes to the Global Commons Fund, taxing hoarding as well as deficit.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gaian_trade',
    to: 'institution_dj_tribunal',
    type: 'ESCALATES_TO',
    description: 'Trade disputes and traceability violations escalate to the tribunal.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_gaian_trade',
    to: 'mechanism_leaves',
    type: 'INTEGRATES_WITH',
    description: 'Regenerative trade performance is recognised through Leaves.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_fpic2',
    to: 'framework_gaian_trade',
    type: 'GUIDES',
    description:
      'Indigenous councils hold veto over extraction affecting their territories; the Right to Opacity exists so traceability cannot be turned against them.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gaian_trade',
    to: 'framework_hearthstone',
    type: 'INTEGRATES_WITH',
    description:
      'Supplies Transitional Trade Agreements that incentivize participation in the commons transition.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },

  // --- framework_gscl ---------------------------------------------------
  {
    from: 'framework_gscl',
    to: 'framework_gaian_trade',
    type: 'IMPLEMENTS',
    description:
      'GSCL operationalizes Gaian Trade at the logistics level: regional hubs act as Bioregional Trade and Resource Hubs, and compliance data feeds the GTRC.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gscl',
    to: 'framework_treaty',
    type: 'IMPLEMENTS',
    description:
      'Enforcement against non-compliant corporations and Global South SME support both derive from Treaty pillars.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gscl',
    to: 'framework_aurora_accord',
    type: 'USES_DATA_FROM',
    description: 'Supply chain data governance operates under the Aurora Accord.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gscl',
    to: 'framework_meta_gov',
    type: 'REPORTS_TO',
    description:
      'The Global GSCL Council operates as a specialized Meta-Governance Coordination Council.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gscl',
    to: 'framework_oceans_marine',
    type: 'INTEGRATES_WITH',
    description:
      'Maritime corridors carry most of world trade by volume; GSCL adopts the Silent Seas Protocol, Zero-Emission Ports certification and the Digital Ocean Twin.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gscl',
    to: 'platform_love_ledger',
    type: 'USES_DATA_FROM',
    description:
      'Validated ESG actions in the supply chain are recorded as contributions, closing the regenerative economic loop.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gscl',
    to: 'council_earth',
    type: 'COORDINATES_WITH',
    description:
      'Logistics corridors affecting sensitive ecosystems require Earth Council consultation.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_gscl',
    type: 'GUIDES',
    description:
      'BAZs are the primary governance units for bioregional logistics hubs.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // --- internal engine mechanics ----------------------------------------
  {
    from: 'institution_baz_council',
    to: 'institution_community_provider',
    type: 'OVERSEES',
    description: 'The local BAZ Council charters and oversees Community Providers.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_community_weaver',
    to: 'institution_community_provider',
    type: 'SUPPORTS',
    description: 'Community Weavers provide technical and administrative support to providers.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_hearts_treasury',
    to: 'institution_community_provider',
    type: 'REWARDS',
    description: 'The Treasury redeems Hearts from providers for fiat currency.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_social_resilience',
    to: 'council_flp',
    type: 'COORDINATES_WITH',
    description:
      'The SRC and FLP coordinate on work valuation and currency supply while keeping the two mandates separate.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_social_resilience',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The SRC is a council within the Meta-Governance structure.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_flp',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The FLP is a council within the Meta-Governance structure.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- Love Ledger and metrics ------------------------------------------
  {
    from: 'platform_love_ledger',
    to: 'metric_lmci',
    type: 'INFORMS',
    description:
      'Non-monetized recognition data feeds the LMCI, on the assessment side of the firewall.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'platform_love_ledger',
    to: 'process_proof_of_care',
    type: 'IMPLEMENTS',
    description: 'The Love Ledger is the platform on which Proof of Care is recorded.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'metric_lmci',
    to: 'council_social_resilience',
    type: 'INFORMS',
    description: 'LMCI readings feed back into AUBI policy through the SRC.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  // REMOVED: institution_cwt → platform_love_ledger (USES_DATA_FROM).
  // Work in Liberation v2.0 explicitly removed Love Ledger use as a default
  // work-history or matching signal. The edge now contradicts the outline.

  // --- debt transformation ----------------------------------------------
  {
    from: 'framework_treaty',
    to: 'protocol_debt_transformation',
    // Not ENABLES: Article 19.3 defers the mechanism rather than conferring
    // authority for it. The Treaty scopes what a future protocol must settle.
    type: 'INFORMS',
    description:
      'Treaty Article 19.3 defers the sovereign-debt mechanism proposed in v1.2 and enumerates the conditions a dedicated protocol must address before any conversion occurs.',
    strength: 'Medium',
    sequenceType: 'Sequential'
  },

  // --- supply chain and trade instruments -------------------------------
  {
    from: 'tool_dpp',
    to: 'platform_love_ledger',
    type: 'USES_DATA_FROM',
    description: 'Digital Product Passports draw on Love Ledger data to verify ethical claims.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- cross-cluster currency effects -----------------------------------
  {
    from: 'mechanism_leaves',
    to: 'framework_biodiversity',
    type: 'FUNDS',
    description: 'Leaves are the primary economic mechanism funding restoration work.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_leaves',
    to: 'framework_food',
    type: 'REWARDS',
    description: 'Leaves reward regenerative agriculture practices.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_hearts',
    to: 'framework_animal_welfare',
    type: 'REWARDS',
    description: 'Hearts reward animal care and welfare work.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cwt',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Community Work Teams operate within BAZ governance structures.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_hearthstone',
    to: 'framework_aubi',
    type: 'ENABLES',
    description:
      'Stewarded assets and regenerative value captured by Hearthstone provide backing for the currencies AUBI distributes.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },

  // --- Immanent Trust Protocol ------------------------------------------
  {
    from: 'protocol_itp',
    to: 'mechanism_hearts',
    type: 'INTEGRATES_WITH',
    description:
      'Provides the fraud and collusion resistance Hearts issuance depends on: trust independence analysis collapses endorsement rings, so a thousand colluding nodes carry the weight of one honest node.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_itp',
    to: 'process_proof_of_care',
    type: 'VALIDATES',
    description:
      'Closes the Sybil and collusion gap in Proof of Care verification without requiring a global ledger or oracle.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_itp',
    to: 'framework_meta_gov',
    type: 'INTEGRATES_WITH',
    description:
      'Turns qualitative capture detection into a measurable property by applying trust independence analysis to council composition.',
    strength: 'Medium', // was 'Moderate' — not a valid strength value
    sequenceType: 'Parallel'
  },

  // --- framework_adaptive_tax -------------------------------------------
  {
    from: 'framework_adaptive_tax',
    to: 'protocol_constitutional_interface', // cluster: governance-os
    type: 'DEPENDS_ON',
    description:
      'v0.1.2 declares CIS/0.2.3 as its controlling constitutional interface, and inherits the recognition-record purpose firewall as its rule against using care and contribution records as fiscal sensors.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'framework_treaty', // cluster: constitutional-foundation
    type: 'DEPENDS_ON',
    description:
      'Article 18 bounds rather than authorizes: §1.5 records that personal wealth taxation is not among the enumerated common-revenue classes, so Treaty-level instruments reach only Phase 3 and only within conferred competence.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'framework_aubi',
    type: 'FUNDS',
    description:
      'May supply revenue financing AUBI. §14.2 forbids the reverse direction: no fiscal rule may condition Layer 1 on tax participation, Love Ledger activity, or compliance scoring.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'mechanism_gcf', // cluster: constitutional-foundation
    type: 'FUNDS',
    description:
      'Named as one lawful revenue destination under §14.1, subject to the ATX-08 handoff record rather than automatic appropriation.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'framework_financial_systems',
    type: 'COORDINATES_WITH',
    description:
      'Financial Systems executes issuance and settlement; Adaptive Tax defines fiscal treatment where a jurisdiction adopts one. §10.7 requires the purpose-appropriate financial record at creation so the tax system never reconstructs an event from care records.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'framework_nested_sovereignty',
    type: 'COORDINATES_WITH',
    description:
      'Nested Economies sets the constitutional conditions for cross-scale coordination; Adaptive Tax supplies the fiscal content of compacts, credits, apportionment and revenue-sharing.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'framework_gaian_trade',
    type: 'GUIDES',
    description:
      'Supplies the fiscal grammar for tariffs, fee reductions and exemptions. §18.12 treats the Symmetrical Imbalance Penalty as a constitutional gap: an inter-state charge on trade position falls outside both Article 18.2 and the 18.3 contribution formula.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'framework_gscl',
    type: 'GUIDES',
    description:
      'Logistics observations may be admissible evidence but create no rate. §18.13 marks the automatic maximum Dark Chain Tariff non-conforming, along with the fixed Leaves and Hearts tax-credit pegs.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'framework_urban_community', // cluster: development
    type: 'GUIDES',
    description:
      'Bioregional Polis keeps its land and anti-speculation objectives; Adaptive Tax supplies fiscal design, incidence, administration and appeal standards for the LVT and vacancy instruments where lawfully adopted.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'framework_hearthstone', // cluster: property-stewardship
    type: 'COORDINATES_WITH',
    description:
      'A tax liability does not trigger stewardship conversion. Where law permits settlement through asset transfer, Hearthstone acts only within its own consent rules.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'framework_work_liberation',
    type: 'FUNDS',
    description:
      'Bridging edge under §20.2: Work in Liberation v2.0 still names Automation Tax and Resource Tax revenues, which v0.1.2 reads as legacy examples of lawfully adopted fiscal revenue rather than a dependency on one rejected design.',
    strength: 'Weak',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },

  // --- protocol_shared_capital ------------------------------------------
  {
    from: 'protocol_shared_capital',
    to: 'protocol_constitutional_interface', // cluster: governance-os
    type: 'DEPENDS_ON',
    description:
      'Declares CIS/0.2.3 as its constitutional interface, and inherits the recognition-record firewall as its rule against using care and contribution records as capital-allocation signals.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_adaptive_tax',
    to: 'protocol_shared_capital',
    type: 'FUNDS',
    description:
      'Adaptive Tax §14.3 governs the fiscal transfer into a shared-capital institution and stops there: it does not reach the fund\'s investment mandate, voting rights, beneficiary governance, or distribution policy.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_aubi',
    type: 'COORDINATES_WITH',
    description:
      'Boundary rather than flow: §3.7 and §11.10 forbid capital claims substituting for or conditioning Layer 1. A capital endowment widens ownership; it does not discharge the material floor.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_shared_capital',
    to: 'mechanism_gcf', // cluster: constitutional-foundation
    type: 'COORDINATES_WITH',
    description:
      'The GCF is one lawful capitalization source and one possible commons-dividend route under Treaty Art. 18.6. §7.4 records that GCF capitalization is never automatic and requires the Fund\'s own funding authority.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_financial_systems',
    type: 'COORDINATES_WITH',
    description:
      'Financial Systems supplies settlement, custody machinery and liquidity; this Protocol supplies the fiduciary purpose that machinery serves and the beneficiary claims it must not impair.',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_nested_sovereignty',
    type: 'DEPENDS_ON',
    description:
      'Cross-scale compacts, protected non-convertibility and material exit bound how a fund at one scale may hold assets or beneficiaries at another.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_work_liberation',
    type: 'COORDINATES_WITH',
    description:
      'Worker and member capital funds sit inside Work in Liberation\'s labour governance. §4.4 separates the pooled pension institution from the accrued individual claim, which stays under pension and labour law.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_hearthstone', // cluster: property-stewardship
    type: 'COORDINATES_WITH',
    description:
      'Runs both directions. This Protocol may capitalize a Hearthstone transition but cannot compel one; where a fund or endowment is itself the object of transition, Hearthstone owns the conveyance and this Protocol owns beneficiary, custody and continuity consequences.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_pathfinder_protocol', // cluster: pathfinder-protocol
    type: 'COORDINATES_WITH',
    description:
      'Pathfinder holds the enterprise-level instruments — ESOPs, profit sharing, Community Investment Trusts, steward ownership; this Protocol holds the custody and beneficiary architecture once those claims are pooled.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_urban_community', // cluster: development
    type: 'COORDINATES_WITH',
    description:
      'Bioregional Polis keeps Community Land Trusts and local purchase funds; this Protocol supplies charter, fiduciary and closure architecture where those become pooled investment institutions.',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_sundown_protocol', // cluster: just-transition
    type: 'GUIDES',
    description:
      '§8.8 and §26.8: a Sundown compliance indicator or escalation level does not amend a fund mandate. Divestment is valid only through the fund\'s own constituting instrument, a lawful amendment, binding law, or a voluntary compact.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_aegis_protocol', // cluster: just-transition
    type: 'COORDINATES_WITH',
    description:
      'Aegis §15 rejects a single global trust and requires separately constituted transition-finance facilities — a conformance precedent. Its pension-backed vehicles are an investment interface, not authority over accrued beneficiary claims.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'protocol_shared_capital',
    to: 'framework_water_sanitation', // cluster: ecological
    type: 'COORDINATES_WITH',
    description:
      'The Community Water Trust Fund stays under Water\'s domain ownership. Its WAT-16 charter — custodian, segregation, procurement, beneficial ownership, insolvency, dissolution — is the conformance precedent §6 measures against.',
    strength: 'Weak',
    frequency: 'Occasional',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous', // cluster: ethical-os
    to: 'protocol_shared_capital',
    type: 'GUIDES',
    description:
      '§14.1 refuses a universal Indigenous fund and §3.8 blocks treating Indigenous or community property as presumptively public capital. An Indigenous nation\'s own capital institution is governed by its law, not this Protocol.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  }
];
