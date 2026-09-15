// /src/lib/data/schema/_register.ts

/**
 * Corpus-level falsification register.
 *
 * The documents are canonical. Each framework states its own hypotheses and
 * disconfirming evidence in its falsification section; this file indexes
 * them so the corpus can ask questions no single document can answer: which
 * frameworks rest on the same untested assumption, which maturity labels are
 * backed by anything, and what else is exposed when a hypothesis fails.
 *
 * Rules for this file:
 *  - `label` is a one-line pointer, never a copy of the document's wording;
 *  - no verdict other than 'open' without at least one evidence entry;
 *  - evidence records what was done, not what it proved: an adversarial
 *    review that did not address a hypothesis is not evidence for it;
 *  - `producedBy: 'independent'` means someone outside the project produced
 *    it. Author-directed AI review is 'author', however adversarial;
 *  - assumptions are editorial groupings across frameworks. They are the
 *    register's own claim and should be challenged like any other.
 */

export type EvidenceKind =
  | 'argument'
  | 'simulation'
  | 'adversarial-review'
  | 'external-review'
  | 'pilot'
  | 'empirical';

export type Verdict = 'open' | 'supported' | 'mixed' | 'disconfirmed' | 'narrowed' | 'retired';

export interface Evidence {
  kind: EvidenceKind;
  /** Paper, repo commit, review record, or pilot report. */
  ref: string;
  direction: 'supports' | 'undermines' | 'mixed';
  producedBy: 'author' | 'independent';
  /** ISO date. */
  date: string;
  summary?: string;
}

/**
 * Optional §9.9-shaped expectation (Constitutional Interface Specification):
 * the corpus held to the rule it imposes on institutions.
 */
export interface Expectation {
  observation: string;
  /** Probability, interval, or declared band, as stated. */
  confidence: string;
  /** ISO date by which the expectation should be resolvable. */
  resolveBy: string;
  resolution?: {
    date: string;
    outcome: 'met' | 'not-met' | 'partial' | 'unresolvable';
    ref: string;
  };
}

export interface Hypothesis {
  id: string;
  /** Entity id of the framework or specification stating it. */
  framework: string;
  source: { version: string; section: string };
  label: string;
  kind: 'mechanism' | 'operating-condition' | 'non-applicability';
  assumes: string[];
  evidence: Evidence[];
  verdict: Verdict;
  expectations?: Expectation[];
  note?: string;
}

export interface Assumption {
  id: string;
  label: string;
  note?: string;
}

/* ------------------------------------------------------------------ */
/* Assumptions                                                         */
/* ------------------------------------------------------------------ */

// Groupings drafted 2026-09-15 from Meta-Governance §18.5, Implementation &
// Adaptation §19.2, and Institutional Regeneration §20.2. Review them: a
// grouping that is too coarse hides real differences between frameworks, and
// one that is too fine hides the common mode this register exists to find.

export const assumptions: Assumption[] = [
  {
    id: 'asm_separation_without_paralysis',
    label: 'Separating authority, authorization, and action prevents overreach without routinely missing decision windows'
  },
  {
    id: 'asm_proportional_records',
    label: 'Consequence-scaled documentation adds more accountability than burden, including for low-capacity participants'
  },
  {
    id: 'asm_no_shadow_authority',
    label: 'Bounded coordination, support, or experimental bodies do not accrue de facto authority beyond their mandate'
  },
  {
    id: 'asm_support_without_dependency',
    label: 'Time-bounded support builds lasting local capacity rather than dependency on the supporter'
  },
  {
    id: 'asm_temporary_structures_end',
    label: 'Arrangements designed to be temporary actually close, devolve, or transfer rather than persisting'
  },
  {
    id: 'asm_structured_diagnosis_informs',
    label: 'Structured observation and diagnosis surface information that changes decisions ordinary governance would make'
  },
  {
    id: 'asm_recorded_learning_used',
    label: 'Recorded learning and response records change later decisions rather than accumulating unused'
  }
];

/* ------------------------------------------------------------------ */
/* Hypotheses                                                          */
/* ------------------------------------------------------------------ */

// First pass: the three frameworks from the 2026-08-05 recursive systems
// audit that state enumerated hypotheses. No evidence is recorded yet; every
// verdict is 'open' until evidence is added, not because none exists.

export const hypotheses: Hypothesis[] = [
  // --- Integrated Meta-Governance ---------------------------------------
  {
    id: 'hyp_mg_bounded_coordination',
    framework: 'framework_meta_gov',
    source: { version: 'v1.6.3', section: '§18.5 #1' },
    label: 'Bounded coordination reduces cross-domain conflict and responsibility gaps without residual sovereignty',
    kind: 'mechanism',
    assumes: ['asm_no_shadow_authority'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_mg_decision_chain_separation',
    framework: 'framework_meta_gov',
    source: { version: 'v1.6.3', section: '§18.5 #2' },
    label: 'Decision-chain separation reduces concentration without unacceptable delay or omission',
    kind: 'mechanism',
    assumes: ['asm_separation_without_paralysis'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_mg_plural_observation',
    framework: 'framework_meta_gov',
    source: { version: 'v1.6.3', section: '§18.5 #3' },
    label: 'Plural observation and common-mode review improve calibration and correction',
    kind: 'mechanism',
    assumes: ['asm_structured_diagnosis_informs', 'asm_recorded_learning_used'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_mg_bypass_transfer',
    framework: 'framework_meta_gov',
    source: { version: 'v1.6.3', section: '§18.5 #4' },
    label: 'Bypasses transfer valid learning without becoming privileged enclaves',
    kind: 'mechanism',
    assumes: ['asm_no_shadow_authority', 'asm_support_without_dependency'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_mg_material_closure',
    framework: 'framework_meta_gov',
    source: { version: 'v1.6.3', section: '§18.5 #5' },
    label: 'Sunset, devolution, and closure occur materially rather than only legally',
    kind: 'mechanism',
    assumes: ['asm_temporary_structures_end'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_mg_response_records',
    framework: 'framework_meta_gov',
    source: { version: 'v1.6.3', section: '§18.5 #6' },
    label: 'Causal-responsibility and response records reduce burden dumping and unowned non-action',
    kind: 'mechanism',
    assumes: ['asm_recorded_learning_used'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_mg_proportional_documentation',
    framework: 'framework_meta_gov',
    source: { version: 'v1.6.3', section: '§18.5 #7' },
    label: 'Proportional documentation improves accountability without excluding lower-capacity participants',
    kind: 'mechanism',
    assumes: ['asm_proportional_records'],
    evidence: [],
    verdict: 'open'
  },

  // --- Implementation & Adaptation ---------------------------------------
  {
    id: 'hyp_iaf_context_selection',
    framework: 'framework_implementation_adaptation',
    source: { version: 'v1.2', section: '§19.2 H1' },
    label: 'Context and causal profiles improve tool choice compared with generic implementation',
    kind: 'mechanism',
    assumes: ['asm_structured_diagnosis_informs'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_iaf_constitutional_separation',
    framework: 'framework_implementation_adaptation',
    source: { version: 'v1.2', section: '§19.2 H2' },
    label: 'Separating consent, authorization, activation, and scaling prevents overreach while preserving timely response',
    kind: 'mechanism',
    assumes: ['asm_separation_without_paralysis'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_iaf_local_adaptation',
    framework: 'framework_implementation_adaptation',
    source: { version: 'v1.2', section: '§19.2 H3' },
    label: 'Local forks increase relevance without compatibility becoming shadow governance',
    kind: 'mechanism',
    assumes: ['asm_no_shadow_authority'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_iaf_bounded_pilots',
    framework: 'framework_implementation_adaptation',
    source: { version: 'v1.2', section: '§19.2 H4' },
    label: 'Causally adequate bounded pilots expose enough of the mechanism for honest decisions',
    kind: 'mechanism',
    assumes: ['asm_structured_diagnosis_informs'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_iaf_proportional_process',
    framework: 'framework_implementation_adaptation',
    source: { version: 'v1.2', section: '§19.2 H5' },
    label: 'CP0–CP3 profiles reduce over-administration without under-governing consequential action',
    kind: 'mechanism',
    assumes: ['asm_proportional_records'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_iaf_support_autonomy',
    framework: 'framework_implementation_adaptation',
    source: { version: 'v1.2', section: '§19.2 H6' },
    label: 'Catalyst, facilitator, funder, vendor, and AI support build local capacity rather than dependency',
    kind: 'mechanism',
    assumes: ['asm_support_without_dependency'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_iaf_learning_used',
    framework: 'framework_implementation_adaptation',
    source: { version: 'v1.2', section: '§19.2 H7' },
    label: 'Bounded learning changes later tool selection and reduces repeated failure',
    kind: 'mechanism',
    assumes: ['asm_recorded_learning_used'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_iaf_transition_architecture',
    framework: 'framework_implementation_adaptation',
    source: { version: 'v1.2', section: '§19.2 H8' },
    label: 'Transition requirements move useful functions into durable provision and end unsupported pilots',
    kind: 'mechanism',
    assumes: ['asm_temporary_structures_end'],
    evidence: [],
    verdict: 'open'
  },

  // --- Institutional Regeneration ----------------------------------------
  {
    id: 'hyp_irf_purpose_audits',
    framework: 'framework_institutional_regeneration',
    source: { version: 'v1.0', section: '§20.2 #1' },
    label: 'Purpose and mandate audits identify objective drift missed by ordinary governance',
    kind: 'mechanism',
    assumes: ['asm_structured_diagnosis_informs'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_irf_reproductive_reform',
    framework: 'framework_institutional_regeneration',
    source: { version: 'v1.0', section: '§20.2 #2' },
    label: 'Reforms targeting selection pressures persist longer than symptom reforms',
    kind: 'mechanism',
    assumes: [],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_irf_evolution_cells',
    framework: 'framework_institutional_regeneration',
    source: { version: 'v1.0', section: '§20.2 #3' },
    label: 'Evolution Cells improve learning without becoming shadow authorities or permanent bureaucracies',
    kind: 'mechanism',
    assumes: ['asm_no_shadow_authority', 'asm_temporary_structures_end'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_irf_constitutional_separation',
    framework: 'framework_institutional_regeneration',
    source: { version: 'v1.0', section: '§20.2 #4' },
    label: 'Constitutional separation prevents overreach without making reform impractically slow',
    kind: 'mechanism',
    assumes: ['asm_separation_without_paralysis'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_irf_funding_capability',
    framework: 'framework_institutional_regeneration',
    source: { version: 'v1.0', section: '§20.2 #5' },
    label: 'Funding supports capability without purchasing conformity or dependency',
    kind: 'mechanism',
    assumes: ['asm_support_without_dependency'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_irf_responsible_continuity',
    framework: 'framework_institutional_regeneration',
    source: { version: 'v1.0', section: '§20.2 #6' },
    label: 'Continuity provisions allow obsolete institutions to close rather than persist indefinitely',
    kind: 'mechanism',
    assumes: ['asm_temporary_structures_end'],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_irf_worker_protection',
    framework: 'framework_institutional_regeneration',
    source: { version: 'v1.0', section: '§20.2 #7' },
    label: 'Worker and beneficiary protection improves reform legitimacy and durability',
    kind: 'mechanism',
    assumes: [],
    evidence: [],
    verdict: 'open'
  },
  {
    id: 'hyp_irf_record_architecture',
    framework: 'framework_institutional_regeneration',
    source: { version: 'v1.0', section: '§20.2 #8' },
    label: 'The record architecture adds more traceability than administrative burden',
    kind: 'mechanism',
    assumes: ['asm_proportional_records'],
    evidence: [],
    verdict: 'open'
  }
];
