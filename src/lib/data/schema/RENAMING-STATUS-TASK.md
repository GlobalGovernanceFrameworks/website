# Renaming Ready — status field rationalisation

Removing status from the site changes what this task is. `status` no longer
speaks to readers; it has exactly two consumers left, both inside `_validate.ts`.
So it does not need to be a public vocabulary. It needs to be an honest internal
one, and the eight-rung ladder proposed earlier would add six rungs nothing
occupies.

## What the field is currently doing

**Published entities (73).** Status is `Review` 42, `Ready` 21, `Planned` 5,
`Draft` 5. Maturity is `adversarial` 71, `internal` 2.

Status is carrying all the discrimination and maturity is carrying none. And
what status discriminates here is *internal drafting completeness* — which is
precisely what the `OutlinePublication` comment says maturity is not:

> External validation reached, NOT internal completeness.

**Unpublished entities (255).** Status is `Proposed` 156, `Draft` 75, `Pilot` 17,
`Retired` 5. Here it answers a different question: does this thing exist yet.

So `status` is two fields under one name. That is the actual defect, and it is
why `Ready` read as an adoption claim: on a published framework the field was
already about document completeness, and `Ready` is the only value in the set
whose plain reading escapes the document and makes a claim about the world.

**Three declared values are never used at all:** `Active`, `Coming-Soon`,
`Implemented`. Two of those are the strongest adoption claims in the union.

## Proposal

```ts
  /**
   * Internal lifecycle only. Not displayed. For published frameworks this
   * describes the state of the *document*; for unpublished entities it
   * describes whether the thing exists yet. Nothing in this union asserts
   * that an outside party has reviewed, adopted, or deployed anything —
   * that claim belongs to `ui.outline.maturity` and nowhere else.
   */
  status?: 'Proposed' | 'Draft' | 'Review' | 'Stable' | 'Pilot' | 'Retired';
```

Six values, all in use, none making a claim the project cannot support.

| Change | From | To | Count | Why |
|---|---|---|---|---|
| rename | `Ready` | `Stable` | 21 | "Stable" says the text has stopped moving. "Ready" said someone could adopt it. |
| fold | `Planned` | `Proposed` | 6 | Same meaning; `Planned` also sits on five *published* frameworks, which is incoherent. |
| delete | `Implemented` | — | 0 | Unused, and asserts real-world deployment. |
| delete | `Active` | — | 0 | Unused, and asserts operation. |
| delete | `Coming-Soon` | — | 0 | Unused; a marketing tense, not a lifecycle state. |

Everything else stays. `Draft`, `Review`, `Proposed`, `Pilot` and `Retired` are
accurate and used.

### Why not extend the maturity ladder

Leave `maturity` alone. Seventy-one of seventy-three published frameworks are
`adversarial` and none is `external` or `piloted` — but that is the true state,
not a defect. The multi-model review the project actually runs is adversarial
review; nothing has been read by an outside institution. An eight-rung ladder
would replace two honest empty rungs with six.

The four existing rungs are well defined and the definition is the good one.
Nothing needs to happen to them until something is externally reviewed, at which
point the `external` rung is already waiting.

## Two things the migration surfaces

**Five published frameworks are `Planned`:** Memorial Commons, Prometheus,
Discovery Commons, Kintsugi, and Implementation & Adaptation. A published
document is not planned. They need reassigning to `Draft`, `Review`, or `Stable`
individually — this is the only part of the migration that is not mechanical.

Two mirror cases the other way: `process_pathfinder_program` is `Ready` and
`framework_consciousness_development` is `Planned`, both unpublished. The second
is the near-duplicate the validator already flags.

**Seventeen entities are `Pilot`** — BAZs, Community Work Teams, Care
Cooperatives, Territorial Councils, Guardian Seats, the EGP Prototyping App and
others — while no published framework has reached `piloted` maturity. Either
some pilots are real, in which case at least one framework's maturity is
understated, or `Pilot` is being used to mean "intended to be piloted", in which
case those seventeen are `Proposed`. Worth resolving, because it is the one place
where the schema currently claims more than the maturity field does.

## Validator change

`maturity-overstated` becomes vacuous once no status claims adoption, since
`ADOPTION_CLAIMING_STATUS` empties out. Replace it with a check on the mismatch
that actually exists — status drawn from the wrong one of the field's two
meanings:

```ts
/** Statuses meaningful only before a document exists. */
const PRE_PUBLICATION_STATUS = new Set(['Proposed']);
/** Statuses describing the state of an existing document. */
const DOCUMENT_STATUS = new Set(['Draft', 'Review', 'Stable']);

for (const e of entities) {
  if (!e.status || e.retired) continue;
  if (isPublished(e) && PRE_PUBLICATION_STATUS.has(e.status)) {
    add('publication-status-mismatch', 'warning', [e.id],
      `${e.id} is published but its status (${e.status}) describes something that does not exist yet`);
  }
  if (!isPublished(e) && DOCUMENT_STATUS.has(e.status)) {
    add('publication-status-mismatch', 'warning', [e.id],
      `${e.id} has a document status (${e.status}) but publishes no outline or prose`);
  }
}
```

Keep the `Retired` ↔ `retired` pair as is; it is unaffected.

Also worth adding, given the seventeen: flag `status: 'Pilot'` on an entity whose
owning framework has never reached `piloted` maturity. That one needs the
ownership relation, so it can wait until entities carry an owning framework.

## Applying it

Three mechanical edits across the cluster files:

```
'Ready'   -> 'Stable'     21 entities
'Planned' -> 'Proposed'    1 entity  (framework_consciousness_development)
```

plus the five published `Planned` frameworks reassigned by hand, and the union
narrowed in `_types.ts`. TypeScript will find every remaining occurrence of the
deleted values, of which there are none, so the compile is the migration test.
