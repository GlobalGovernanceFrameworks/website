// /src/lib/data/schema/_validate.ts

/**
 * GGF schema validation.
 *
 * The original validator returned a flat `errors: string[]` and an all-or-
 * nothing `isValid`. With thirty-one pre-existing defects in the graph that
 * made the result unusable as a gate: it was already false, so a newly
 * introduced defect changed nothing anyone would notice.
 *
 * This version separates severity from truth. Errors are things that make the
 * graph wrong — a duplicate ID silently shadows an entity, a cycle makes
 * ordering undefined, a retired institution reappears as operative. Warnings
 * are things that are probably wrong but are editorial judgements. Info is
 * accumulated debt worth counting but not acting on today.
 *
 * A baseline of accepted issue keys lets the error set be driven to zero
 * without pretending the issues are fixed, so that the next drift stands out
 * instead of joining a permanent backlog.
 */

import type { GgfEntity, GgfRelationship, GgfCluster } from './_types';

export type Severity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  /** Stable machine-readable check name, e.g. 'duplicate-id'. */
  code: string;
  severity: Severity;
  message: string;
  /** Entity IDs the issue concerns, for tooling and baselines. */
  subjects: string[];
  /** Stable identity of this specific occurrence: `${code}:${subjects}`. */
  key: string;
}

export interface ValidationOptions {
  /**
   * Issue keys already accepted. Matching issues are demoted to 'info' and
   * marked baselined rather than hidden, so the backlog stays visible.
   */
  baseline?: Iterable<string>;
  /** Treat warnings as errors. Useful once the warning set is empty. */
  strict?: boolean;
}

export interface ValidationResult {
  /** No errors. Warnings and info do not affect this. */
  isValid: boolean;
  /** Every issue found, in severity order. */
  issues: ValidationIssue[];
  /** Error messages only. Preserves the previous return shape for callers. */
  errors: string[];
  counts: Record<Severity, number>;
  /** Baselined keys that no longer match anything, i.e. safe to delete. */
  staleBaseline: string[];
}

/** Relationship types that imply creation, activation, or embodiment. */
const CREATION_IMPLYING: ReadonlySet<GgfRelationship['type']> = new Set([
  'ESTABLISHES',
  'ENABLES',
  'ACTIVATES',
  'IMPLEMENTS',
  'DELEGATES_TO'
]);

/** Maturity levels that do not evidence review outside the project. */
const UNVALIDATED_MATURITY = new Set(['internal', 'adversarial']);

/** Statuses that assert the entity is finished enough to be adopted. */
const ADOPTION_CLAIMING_STATUS = new Set(['Ready', 'Implemented', 'Active']);

const normaliseName = (name: string | undefined): string =>
  (name ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '');

const nameTokens = (name: string | undefined): Set<string> =>
  new Set(
    (name ?? '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((w) => w.length > 2)
  );

const maturityOf = (e: GgfEntity): string | undefined =>
  e.ui?.outline?.maturity ?? e.ui?.prose?.maturity;

const isPublished = (e: GgfEntity): boolean =>
  Boolean(e.ui?.slug && (e.ui.outline || e.ui.prose));

export function validateSchema(
  entities: GgfEntity[],
  relationships: GgfRelationship[],
  options: ValidationOptions = {}
): ValidationResult {
  const baseline = new Set(options.baseline ?? []);
  const seenBaselineKeys = new Set<string>();
  const issues: ValidationIssue[] = [];

  const add = (
    code: string,
    severity: Severity,
    subjects: string[],
    message: string
  ) => {
    const key = `${code}:${subjects.join(',')}`;
    let effective = severity;
    if (baseline.has(key)) {
      seenBaselineKeys.add(key);
      effective = 'info';
    } else if (options.strict && severity === 'warning') {
      effective = 'error';
    }
    issues.push({ code, severity: effective, subjects, key, message });
  };

  // --- Identity -----------------------------------------------------------
  // A duplicate ID is the most dangerous defect in the schema: every lookup
  // built from a Map silently keeps one definition and discards the other, so
  // the loss is invisible at runtime and in the type checker.
  const byId = new Map<string, GgfEntity>();
  const idCounts = new Map<string, number>();
  for (const e of entities) {
    idCounts.set(e.id, (idCounts.get(e.id) ?? 0) + 1);
    if (!byId.has(e.id)) byId.set(e.id, e);
  }
  for (const [id, count] of idCounts) {
    if (count > 1) {
      add(
        'duplicate-id',
        'error',
        [id],
        `Entity ID "${id}" defined ${count} times; all but the first are silently discarded by ID lookups`
      );
    }
  }

  const entityIds = new Set(byId.keys());
  const retiredIds = new Set(
    entities.filter((e) => e.retired).map((e) => e.id)
  );

  // --- Relationships ------------------------------------------------------
  const seenRelKeys = new Set<string>();
  for (const rel of relationships) {
    if (!entityIds.has(rel.from)) {
      add('unknown-endpoint', 'error', [rel.from],
        `Relationship references unknown entity: ${rel.from}`);
    }
    if (!entityIds.has(rel.to)) {
      add('unknown-endpoint', 'error', [rel.to],
        `Relationship references unknown entity: ${rel.to}`);
    }

    if (retiredIds.has(rel.from)) {
      add('retired-source', 'error', [rel.from, rel.to],
        `Retired entity acts as a relationship source: ${rel.from} --${rel.type}--> ${rel.to}`);
    }
    if (retiredIds.has(rel.to)) {
      add('retired-target', 'error', [rel.from, rel.to],
        `Relationship points to retired entity: ${rel.from} --${rel.type}--> ${rel.to}`);
    }

    if (CREATION_IMPLYING.has(rel.type)) {
      const target = byId.get(rel.to);
      const exclusion = target?.establishmentExclusions?.find(
        (x) => x.framework === rel.from
      );
      if (exclusion) {
        const source = exclusion.section
          ? `${exclusion.by} ${exclusion.section}`
          : exclusion.by;
        add('prohibited-creation', 'error', [rel.from, rel.to],
          `${rel.from} may not create or activate ${rel.to} via ${rel.type}; excluded by ${source}`);
      }
    }

    const relKey = `${rel.from}|${rel.type}|${rel.to}`;
    if (seenRelKeys.has(relKey)) {
      add('duplicate-relationship', 'warning', [rel.from, rel.to],
        `Duplicate relationship: ${rel.from} --${rel.type}--> ${rel.to}`);
    }
    seenRelKeys.add(relKey);
  }

  // --- Retirement consistency --------------------------------------------
  // Provenance and presentation state must agree, or generic consumers that
  // filter on status will advertise retired institutions as live.
  for (const e of entities) {
    if (e.retired && e.status !== 'Retired') {
      add('retirement-status-mismatch', 'error', [e.id],
        `${e.id} has retirement provenance but status is ${e.status ?? 'unset'}`);
    }
    if (e.status === 'Retired' && !e.retired) {
      add('status-without-provenance', 'error', [e.id],
        `${e.id} has status Retired but no retirement provenance`);
    }
    if (e.retired?.supersededBy && !entityIds.has(e.retired.supersededBy)) {
      add('unknown-successor', 'error', [e.id],
        `${e.id} is superseded by unknown entity ${e.retired.supersededBy}`);
    }

    for (const depId of e.dependencies ?? []) {
      if (!entityIds.has(depId)) {
        add('unknown-dependency', 'error', [e.id, depId],
          `${e.id}.dependencies references unknown entity: ${depId}`);
      } else if (retiredIds.has(depId)) {
        add('retired-dependency', 'error', [e.id, depId],
          `${e.id}.dependencies contains retired entity: ${depId}`);
      }
    }
    for (const enabledId of e.enables ?? []) {
      if (!entityIds.has(enabledId)) {
        add('unknown-enables', 'error', [e.id, enabledId],
          `${e.id}.enables references unknown entity: ${enabledId}`);
      } else if (retiredIds.has(enabledId)) {
        add('retired-enables', 'error', [e.id, enabledId],
          `${e.id}.enables contains retired entity: ${enabledId}`);
      }
    }
  }

  // --- Tier ---------------------------------------------------------------
  // Two different defects share one symptom. A framework depending on a
  // higher-tier framework contradicts the implementation sequence and needs an
  // editorial decision. A council, tool, or metric carrying a lower tier than
  // the framework it belongs to is a data-entry slip: sub-entities should
  // inherit their framework's tier. Reporting them identically is why the
  // count stayed at thirty and nobody could tell which were real.
  for (const e of entities) {
    if (e.tier === undefined) continue;
    for (const depId of e.dependencies ?? []) {
      const dep = byId.get(depId);
      if (!dep || dep.tier === undefined || dep.tier <= e.tier) continue;

      if (e.type === 'Framework' && dep.type === 'Framework') {
        add('tier-inversion', 'error', [e.id, dep.id],
          `Tier inversion: ${e.name} (Tier ${e.tier}) depends on ${dep.name} (Tier ${dep.tier})`);
      } else {
        add('subentity-tier', 'warning', [e.id, dep.id],
          `${e.name} (${e.type}, Tier ${e.tier}) depends on higher-tier ${dep.name} (Tier ${dep.tier}); sub-entities should carry their framework's tier`);
      }
    }
  }

  // --- Cycles -------------------------------------------------------------
  // Dependency order has to be a partial order or getImplementationSequence
  // and any "what must exist first" question is undefined.
  {
    const WHITE = 0, GREY = 1, BLACK = 2;
    const colour = new Map<string, number>();
    const stack: string[] = [];
    const reported = new Set<string>();

    const visit = (id: string) => {
      colour.set(id, GREY);
      stack.push(id);
      for (const depId of byId.get(id)?.dependencies ?? []) {
        if (!entityIds.has(depId)) continue;
        const state = colour.get(depId) ?? WHITE;
        if (state === GREY) {
          const cycle = stack.slice(stack.indexOf(depId)).concat(depId);
          const canonical = [...cycle].sort().join(',');
          if (!reported.has(canonical)) {
            reported.add(canonical);
            add('dependency-cycle', 'error', cycle.slice(0, -1),
              `Dependency cycle: ${cycle.map((c) => byId.get(c)?.name ?? c).join(' -> ')}`);
          }
        } else if (state === WHITE) {
          visit(depId);
        }
      }
      stack.pop();
      colour.set(id, BLACK);
    };

    for (const e of entities) {
      if ((colour.get(e.id) ?? WHITE) === WHITE) visit(e.id);
    }
  }

  // --- Naming -------------------------------------------------------------
  // Two entities with the same or nearly the same name are how the
  // framework_education / framework_capacity_engine collision happened: a
  // rename created a second concept instead of moving the first.
  {
    const byName = new Map<string, GgfEntity[]>();
    for (const e of entities) {
      const k = normaliseName(e.name);
      if (!k) continue;
      byName.set(k, [...(byName.get(k) ?? []), e]);
    }
    for (const group of byName.values()) {
      const distinct = [...new Map(group.map((e) => [e.id, e])).values()];
      if (distinct.length > 1) {
        add('duplicate-name', 'warning', distinct.map((e) => e.id).sort(),
          `Entities share the name "${distinct[0].name}": ${distinct.map((e) => e.id).join(', ')}`);
      }
    }

    // One name being a strict subset of another, same type. Catches the
    // shadowing case where a live entity and an unpublished twin coexist.
    const tokenised = [...byId.values()].map((e) => ({ e, t: nameTokens(e.name) }));
    for (let i = 0; i < tokenised.length; i++) {
      for (let j = i + 1; j < tokenised.length; j++) {
        const a = tokenised[i], b = tokenised[j];
        if (a.e.type !== b.e.type || !a.t.size || !b.t.size) continue;
        if (normaliseName(a.e.name) === normaliseName(b.e.name)) continue;
        const aInB = [...a.t].every((x) => b.t.has(x));
        const bInA = [...b.t].every((x) => a.t.has(x));
        if (!aInB && !bInA) continue;
        const ids = [a.e.id, b.e.id].sort();
        const note = isPublished(a.e) !== isPublished(b.e)
          ? '; one is published and the other is not, which is how a rename becomes a second concept'
          : '';
        add('near-duplicate-name', 'warning', ids,
          `"${a.e.name}" and "${b.e.name}" are the same ${a.e.type} by name${note}`);
      }
    }
  }

  // --- Publication claims -------------------------------------------------
  // Maturity records external validation, not internal completeness. A status
  // asserting readiness for adoption alongside a maturity meaning "nobody
  // outside the project has read it" is a claim the schema cannot support.
  for (const e of entities) {
    if (!isPublished(e)) continue;
    const maturity = maturityOf(e);
    if (
      e.status &&
      ADOPTION_CLAIMING_STATUS.has(e.status) &&
      maturity &&
      UNVALIDATED_MATURITY.has(maturity)
    ) {
      add('maturity-overstated', 'warning', [e.id],
        `${e.id} is status ${e.status} with maturity '${maturity}'; no external party has reviewed it`);
    }
    if (!e.ui?.outline?.standfirst && !e.ui?.prose?.standfirst) {
      add('missing-standfirst', 'info', [e.id],
        `${e.id} is published without a standfirst`);
    }
  }

  // --- Connectivity -------------------------------------------------------
  {
    const degree = new Map<string, number>();
    for (const rel of relationships) {
      degree.set(rel.from, (degree.get(rel.from) ?? 0) + 1);
      degree.set(rel.to, (degree.get(rel.to) ?? 0) + 1);
    }
    for (const e of entities) {
      if (e.retired) continue;
      if ((degree.get(e.id) ?? 0) === 0) {
        add('orphan', 'info', [e.id],
          `${e.id} has no relationships; it is in the schema but not in the graph`);
      }
    }

    // A dependency is a claim about order; a relationship is a claim about
    // interaction. Where the first exists without the second the graph knows
    // less than the schema does.
    const undirected = new Set<string>();
    for (const rel of relationships) {
      undirected.add(`${rel.from}|${rel.to}`);
      undirected.add(`${rel.to}|${rel.from}`);
    }
    for (const e of entities) {
      for (const depId of e.dependencies ?? []) {
        if (!entityIds.has(depId)) continue;
        if (!undirected.has(`${e.id}|${depId}`)) {
          add('undeclared-relationship', 'info', [e.id, depId],
            `${e.id} depends on ${depId} with no relationship describing how`);
        }
      }
    }
  }

  const order: Record<Severity, number> = { error: 0, warning: 1, info: 2 };
  issues.sort(
    (a, b) => order[a.severity] - order[b.severity] || a.key.localeCompare(b.key)
  );

  const counts: Record<Severity, number> = { error: 0, warning: 0, info: 0 };
  for (const i of issues) counts[i.severity]++;

  return {
    isValid: counts.error === 0,
    issues,
    errors: issues.filter((i) => i.severity === 'error').map((i) => i.message),
    counts,
    staleBaseline: [...baseline].filter((k) => !seenBaselineKeys.has(k))
  };
}

/**
 * Cluster membership is derived, so it can drift from the entity arrays it is
 * derived from. Kept separate because it needs the cluster list, which the
 * relationship validator does not.
 */
export function validateClusters(
  clusters: GgfCluster[],
  entities: GgfEntity[]
): ValidationIssue[] {
  const byId = new Map(entities.map((e) => [e.id, e]));
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();

  for (const cluster of clusters) {
    for (const id of cluster.entities) {
      const entity = byId.get(id);
      if (!entity) {
        issues.push({
          code: 'cluster-unknown-entity',
          severity: 'error',
          subjects: [cluster.id, id],
          key: `cluster-unknown-entity:${cluster.id},${id}`,
          message: `Cluster ${cluster.id} lists unknown entity ${id}`
        });
        continue;
      }
      if (entity.retired) {
        issues.push({
          code: 'cluster-retired-entity',
          severity: 'error',
          subjects: [cluster.id, id],
          key: `cluster-retired-entity:${cluster.id},${id}`,
          message: `Cluster ${cluster.id} lists retired entity ${id}`
        });
      }
      if (seen.has(id)) {
        issues.push({
          code: 'cluster-double-membership',
          severity: 'info',
          subjects: [id],
          key: `cluster-double-membership:${id}`,
          message: `${id} appears in more than one cluster`
        });
      }
      seen.add(id);
    }
  }
  return issues;
}

/** Human-readable summary, grouped by check. */
export function formatIssues(result: ValidationResult): string {
  const lines: string[] = [
    `${result.counts.error} errors, ${result.counts.warning} warnings, ${result.counts.info} info`
  ];
  const byCode = new Map<string, ValidationIssue[]>();
  for (const i of result.issues) {
    byCode.set(i.code, [...(byCode.get(i.code) ?? []), i]);
  }
  for (const [code, group] of byCode) {
    lines.push(`\n${group[0].severity.toUpperCase()}  ${code} (${group.length})`);
    for (const i of group) lines.push(`  ${i.message}`);
  }
  if (result.staleBaseline.length) {
    lines.push(
      `\nBaseline entries that no longer match anything (safe to remove):`,
      ...result.staleBaseline.map((k) => `  ${k}`)
    );
  }
  return lines.join('\n');
}
