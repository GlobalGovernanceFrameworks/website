# Hardened validator — integration

Two new files in `src/lib/data/schema/`: `_validate.ts` and `_baseline.ts`.

## Wiring

In `_index.ts`, delete the existing `validateSchema` and re-export instead:

```ts
export { validateSchema, validateClusters, formatIssues } from './_validate';
export type { ValidationIssue, ValidationResult, Severity } from './_validate';
export { acceptedIssues } from './_baseline';
```

`ValidationResult` still carries `isValid` and `errors: string[]`, so existing
callers keep working. `isValid` now means "no errors" rather than "no issues".

Move `ValidationResult` out of `_types.ts` or have it re-export from
`_validate.ts`, so there is one definition.

## Running it

```ts
import { allEntities, allRelationships, clusters } from './_index';
import { validateSchema, validateClusters, formatIssues, acceptedIssues } from './_index';

const result = validateSchema(allEntities, allRelationships, {
  baseline: acceptedIssues
});
console.log(formatIssues(result));
if (!result.isValid) process.exit(1);
```

`npx tsx scripts/validate-schema.ts` as a pre-commit or CI step.

## Current state

With the baseline applied: **2 errors, 47 warnings, 265 info.**

Both errors are real and fixable:

- `protocol_ethical_ip` is defined in both `cluster.human-flourishing.ts` and
  `cluster.property-stewardship.ts`. One definition is silently discarded by
  every ID lookup, and which one wins depends on array order in `_index.ts`.
- Millennium Protocol and Deep Time depend on each other, so
  `getImplementationSequence()` has no defined answer for either.

Fix those two and the build gates. Everything else is warnings and info, which
do not block.

## Severity

**Error** — the graph is wrong. Duplicate IDs, cycles, unknown endpoints,
retired entities acting or being acted on, prohibited creation edges,
retirement provenance disagreeing with status, framework-to-framework tier
inversion.

**Warning** — probably wrong, but an editorial judgement. Sub-entity tier
mismatch, duplicate and near-duplicate names, adoption-claiming status with
unvalidated maturity, duplicate relationships.

**Info** — counted debt. Orphans, dependencies with no relationship, missing
standfirsts, baselined issues.

## The baseline

`acceptedIssues` demotes listed issues to info rather than hiding them. This
exists so the error count can reach zero and the *next* regression is visible.
Every entry needs a reason. `result.staleBaseline` lists entries that no longer
match anything — delete those.

## New checks worth acting on

- **`tier-inversion` split.** Of the thirty tier violations the old validator
  reported, twenty-three are councils, tools, and metrics carrying a lower tier
  than the framework they belong to — a data-entry slip, not an architectural
  claim. Only seven are framework-to-framework. Reporting them identically is
  why the count sat at thirty and nobody could tell which mattered. Errors are
  now the seven; the twenty-three are warnings and clear if sub-entities
  inherit their framework's tier.

- **`near-duplicate-name`.** Flags `framework_consciousness_development`
  ("Consciousness Development Framework", Planned, unpublished) shadowing
  `framework_inner_dev` ("Consciousness & Inner Development Framework", Review,
  published). Same shape as the earlier `framework_education` /
  `framework_capacity_engine` collision: a rename that created a second concept
  instead of moving the first. Also flags the two Regeneration Audit Councils.

- **`maturity-overstated`.** Twenty-one published frameworks claim a status
  asserting readiness for adoption while their maturity records that nobody
  outside the project has read them. This is the input to task 4 and will clear
  when `Ready` is renamed.

- **`validateClusters`.** Cluster membership is derived and can drift from what
  it is derived from. Currently one issue: `protocol_ethical_ip` appears in two
  clusters, downstream of the duplicate ID.

## Not included

Checks that need the outline files rather than the schema — publication version
against the version stated in the outline, interface hash-pin agreement,
declared conformance without a crosswalk — belong with `extract-registries.py`,
which already reads that corpus. Keeping the TypeScript validator pure over
`(entities, relationships)` means it stays runnable in the browser bundle and in
CI without filesystem access.
