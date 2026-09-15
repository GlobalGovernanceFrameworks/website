// /src/lib/data/schema/_validate-register.ts

/**
 * Validation of the falsification register against itself and the schema.
 *
 * Kept apart from `_validate.ts` because it answers a different question.
 * `validateSchema` asks whether the graph is well formed. This asks whether
 * the corpus's claims about itself are backed by anything, and what else is
 * exposed when one of them fails.
 *
 * Severity follows tier. Tier 0–1 documents carry the constitutional and
 * operating-system claims everything else rests on, so gaps there are
 * warnings. Gaps below are info: counted, not yet acted on.
 */

import type { GgfEntity } from './_types';
import type { Hypothesis, Assumption, Evidence } from './_register';
import type { ValidationIssue, Severity } from './_validate';

export interface RegisterOptions {
  /** Accepted issue keys. Matching register issues are demoted to info. */
  baseline?: Iterable<string>;
  /** Reference date for overdue expectations. Defaults to today. */
  asOf?: string;
  /** Distinct frameworks sharing an untested assumption before it warns. */
  commonModeWarnAt?: number;
}

export interface RegisterStats {
  publishedDocuments: number;
  documentsWithHypotheses: number;
  hypotheses: number;
  byVerdict: Record<string, number>;
  evidenceByKind: Record<string, number>;
  independentEvidence: number;
  sharedAssumptions: number;
}

export interface RegisterResult {
  issues: ValidationIssue[];
  /** Register-code baseline keys that no longer match anything. */
  staleBaseline: string[];
  stats: RegisterStats;
}

/** Every code this validator can emit; used to scope stale-baseline detection. */
export const REGISTER_CODES = [
  'register-duplicate-id',
  'register-unknown-framework',
  'register-unknown-assumption',
  'register-bad-date',
  'register-unused-assumption',
  'register-verdict-without-evidence',
  'register-verdict-direction',
  'missing-falsification-profile',
  'maturity-without-evidence',
  'common-mode-assumption',
  'dependent-on-disconfirmed',
  'stale-source',
  'simulation-ceiling',
  'expectation-overdue'
] as const;

/** Evidence kinds that test a claim against something other than the argument itself. */
const TESTING_KINDS = new Set(['adversarial-review', 'external-review', 'pilot', 'empirical']);

/**
 * What each maturity label requires of at least one hypothesis's evidence.
 * 'adversarial' means a hypothesis survived adversarial review, not merely
 * that the document was reviewed.
 */
const MATURITY_REQUIRES: Record<string, ((e: Evidence) => boolean) | null> = {
  internal: null,
  adversarial: (e) => TESTING_KINDS.has(e.kind),
  external: (e) =>
    e.producedBy === 'independent' && ['external-review', 'pilot', 'empirical'].includes(e.kind),
  piloted: (e) => e.kind === 'pilot'
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const publication = (e: GgfEntity) => e.ui?.prose ?? e.ui?.outline;

const tierSeverity = (e: GgfEntity | undefined): Severity =>
  e?.tier !== undefined && e.tier <= 1 ? 'warning' : 'info';

export function validateRegister(
  hypotheses: Hypothesis[],
  assumptions: Assumption[],
  entities: GgfEntity[],
  options: RegisterOptions = {}
): RegisterResult {
  const baseline = new Set(options.baseline ?? []);
  const seenBaseline = new Set<string>();
  const asOf = options.asOf ?? new Date().toISOString().slice(0, 10);
  const warnAt = options.commonModeWarnAt ?? 3;
  const issues: ValidationIssue[] = [];

  const add = (code: string, severity: Severity, subjects: string[], message: string) => {
    const key = `${code}:${subjects.join(',')}`;
    let effective = severity;
    if (baseline.has(key)) {
      seenBaseline.add(key);
      effective = 'info';
    }
    issues.push({ code, severity: effective, subjects, key, message });
  };

  const byEntity = new Map(entities.map((e) => [e.id, e]));
  const assumptionIds = new Set(assumptions.map((a) => a.id));

  // --- Identity and references -------------------------------------------
  const seenIds = new Set<string>();
  for (const item of [...hypotheses, ...assumptions]) {
    if (seenIds.has(item.id)) {
      add('register-duplicate-id', 'error', [item.id], `Register id "${item.id}" is defined more than once`);
    }
    seenIds.add(item.id);
  }

  const used = new Set<string>();
  for (const h of hypotheses) {
    if (!byEntity.has(h.framework)) {
      add('register-unknown-framework', 'error', [h.id, h.framework],
        `${h.id} names unknown framework ${h.framework}`);
    }
    for (const a of h.assumes) {
      used.add(a);
      if (!assumptionIds.has(a)) {
        add('register-unknown-assumption', 'error', [h.id, a], `${h.id} assumes unknown assumption ${a}`);
      }
    }
    for (const ev of h.evidence) {
      if (!ISO_DATE.test(ev.date)) {
        add('register-bad-date', 'error', [h.id, ev.ref], `${h.id}: evidence "${ev.ref}" has non-ISO date "${ev.date}"`);
      }
    }
    for (const x of h.expectations ?? []) {
      if (!ISO_DATE.test(x.resolveBy)) {
        add('register-bad-date', 'error', [h.id, x.observation], `${h.id}: expectation has non-ISO resolveBy "${x.resolveBy}"`);
      }
    }
  }
  for (const a of assumptions) {
    if (!used.has(a.id)) {
      add('register-unused-assumption', 'info', [a.id], `Assumption ${a.id} is not referenced by any hypothesis`);
    }
  }

  // --- Verdicts --------------------------------------------------------------
  for (const h of hypotheses) {
    if (h.verdict === 'open' || h.verdict === 'retired') continue;
    if (h.evidence.length === 0) {
      add('register-verdict-without-evidence', 'error', [h.id],
        `${h.id} has verdict "${h.verdict}" but no evidence`);
      continue;
    }
    const dirs = new Set(h.evidence.map((e) => e.direction));
    const ok =
      h.verdict === 'supported' ? dirs.has('supports')
      : h.verdict === 'disconfirmed' ? dirs.has('undermines')
      : h.verdict === 'narrowed' ? dirs.has('undermines') || dirs.has('mixed')
      : /* mixed */ dirs.has('mixed') || (dirs.has('supports') && dirs.has('undermines'));
    if (!ok) {
      add('register-verdict-direction', 'warning', [h.id],
        `${h.id} has verdict "${h.verdict}" but no evidence pointing that way`);
    }
    if (h.verdict === 'supported' && h.evidence.every((e) => !TESTING_KINDS.has(e.kind))) {
      add('simulation-ceiling', 'info', [h.id],
        `${h.id} is "supported" by argument or simulation only; that tests the model, not the world`);
    }
  }

  // --- Coverage and maturity -------------------------------------------------
  const hypsByFramework = new Map<string, Hypothesis[]>();
  for (const h of hypotheses) {
    hypsByFramework.set(h.framework, [...(hypsByFramework.get(h.framework) ?? []), h]);
  }

  const published = entities.filter((e) => e.ui?.slug && publication(e) && !e.retired);
  for (const e of published) {
    const pub = publication(e)!;
    const own = hypsByFramework.get(e.id) ?? [];

    if (own.length === 0) {
      add('missing-falsification-profile', tierSeverity(e), [e.id],
        `${e.name} (tier ${e.tier ?? '?'}) is published with no registered hypotheses`);
    }

    const requires = MATURITY_REQUIRES[pub.maturity];
    if (requires && !own.some((h) => h.evidence.some(requires))) {
      add('maturity-without-evidence', tierSeverity(e), [e.id],
        `${e.name} is labelled "${pub.maturity}" but no registered hypothesis has evidence meeting that level`);
    }

    for (const h of own) {
      if (h.source.version !== pub.version) {
        add('stale-source', 'info', [h.id],
          `${h.id} cites ${h.source.version} but ${e.name} publishes ${pub.version}; reconfirm ${h.source.section}`);
      }
    }
  }

  // --- Common mode -----------------------------------------------------------
  let sharedAssumptions = 0;
  for (const a of assumptions) {
    const relying = hypotheses.filter((h) => h.assumes.includes(a.id) && h.verdict !== 'retired');
    const frameworks = new Set(relying.map((h) => h.framework));
    if (frameworks.size < 2) continue;
    sharedAssumptions++;

    const independentlyTested = relying.some((h) =>
      h.evidence.some((e) => e.producedBy === 'independent' && TESTING_KINDS.has(e.kind))
    );
    if (!independentlyTested) {
      add('common-mode-assumption', frameworks.size >= warnAt ? 'warning' : 'info', [a.id],
        `${frameworks.size} frameworks rest on "${a.label}" with no independent test: ${[...frameworks].join(', ')}`);
    }
  }

  // --- Propagation -----------------------------------------------------------
  for (const h of hypotheses) {
    if (h.verdict !== 'disconfirmed' && h.verdict !== 'narrowed') continue;

    for (const other of hypotheses) {
      if (other.id === h.id || other.verdict === 'retired') continue;
      const shared = other.assumes.filter((a) => h.assumes.includes(a));
      if (shared.length) {
        add('dependent-on-disconfirmed', 'warning', [h.id, other.id],
          `${h.id} is ${h.verdict}; ${other.id} (${other.framework}) shares ${shared.join(', ')}`);
      }
    }
    for (const e of entities) {
      if (e.retired || e.id === h.framework) continue;
      // Frameworks and specifications only; their councils and tools inherit exposure.
      if (e.type !== 'Framework' && e.type !== 'Protocol') continue;
      if (e.dependencies?.includes(h.framework)) {
        add('dependent-on-disconfirmed', 'info', [h.id, e.id],
          `${h.id} is ${h.verdict}; ${e.id} depends on ${h.framework}`);
      }
    }
  }

  // --- Expectations ----------------------------------------------------------
  for (const h of hypotheses) {
    for (const x of h.expectations ?? []) {
      if (!x.resolution && ISO_DATE.test(x.resolveBy) && x.resolveBy < asOf) {
        add('expectation-overdue', 'info', [h.id, x.resolveBy],
          `${h.id}: expectation "${x.observation}" was due ${x.resolveBy} and is unresolved`);
      }
    }
  }

  // --- Result ----------------------------------------------------------------
  const order: Record<Severity, number> = { error: 0, warning: 1, info: 2 };
  issues.sort((a, b) => order[a.severity] - order[b.severity] || a.key.localeCompare(b.key));

  const codes = new Set<string>(REGISTER_CODES);
  const staleBaseline = [...baseline].filter(
    (k) => codes.has(k.slice(0, k.indexOf(':'))) && !seenBaseline.has(k)
  );

  const count = <T extends string>(xs: T[]) =>
    xs.reduce<Record<string, number>>((acc, x) => ((acc[x] = (acc[x] ?? 0) + 1), acc), {});
  const allEvidence = hypotheses.flatMap((h) => h.evidence);

  return {
    issues,
    staleBaseline,
    stats: {
      publishedDocuments: published.length,
      documentsWithHypotheses: published.filter((e) => hypsByFramework.has(e.id)).length,
      hypotheses: hypotheses.length,
      byVerdict: count(hypotheses.map((h) => h.verdict)),
      evidenceByKind: count(allEvidence.map((e) => e.kind)),
      independentEvidence: allEvidence.filter((e) => e.producedBy === 'independent').length,
      sharedAssumptions
    }
  };
}
