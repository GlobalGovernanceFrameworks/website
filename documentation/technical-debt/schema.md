I ran the numbers against the cluster files rather than reasoning about them. The 22 aren't one problem — they're three, and two of them are validator defects rather than corpus drift.

## What "Graph connectivity" is actually measuring

`findOrphanedEntities` adds `rel.from`, `rel.to`, and every `dependencies`/`enables` **target** to the referenced set — but never the source entity's own id. So an entity's outbound edges don't count as connectivity for itself. **21 of the 22 have outbound dependencies.** Only `campaign_rights_for_all_beings` is a true isolate. The check is measuring inbound reference, not connectivity, and the pass message ("Every entity is connected to the graph") overclaims.

## The decomposition

**5 are retired and correctly disconnected.** GEM, Earth Defense Force, Transnational Security Council, Global Crime Intelligence Center, Global Enforcement Task Force — all `status: 'Retired'` with retirement provenance. GEM even carries `establishmentExclusions` naming Treaty v1.3 Art. 16. The validator is flagging a deliberate act as drift. This also explains the GEM priority warning: `Low` is the *right* value for a retired entity.

Worth noting: `_validate.ts` has retirement enforcement, `validate-schema.js` doesn't. Two validators with different models of the same schema is its own structural problem.

**16 are unclaimed** — they declare an establishing parent upward, but no framework declares `ESTABLISHES` downward. That's the `ownerFramework` gap in a different costume, and it's concentrated: four hang off the Cognitive Sovereignty Accord, four off Kintsugi.

**1 is a phantom.** `#RightsForAllBeings Campaign` has no edges and no mention in any outline.

## What the corpus says about the 16

I grepped each name across the 80 outlines in the project folder. Three of them are mis-wired, and five don't exist outside the schema:

| Entity | Schema says parent | Actually appears in | Action |
|---|---|---|---|
| Moon Wish Test | Frontier Governance | justice-systems §6.6 — **as a prohibited basis for standing** | Retire, or add `establishmentExclusions` |
| Consciousness Alignment Index | contemplative assessment tools | oracle-protocol §, AUBI | Reparent to Oracle Protocol |
| Sacred Seed Kit | `institution_baz` | kinship-garden | Reparent to Kinship Garden |
| Community Safety Ombudsperson | community safety council | kintsugi | Reparent to Kintsugi |
| Youth Safety Council, Restorative Justice Circles, Community Healing Circles | Kintsugi | kintsugi | Add `ESTABLISHES` |
| GGF Practitioner Academy, FPIC 2.0 for Consciousness Tech, Cultural Immersion Certification | CSA | cognitive-sovereignty-accord | Add `ESTABLISHES` |
| Crisis Research Response Protocol | Discovery Commons | discovery-commons | Add `ESTABLISHES` |
| Accountability Pods | Kintsugi | **nowhere** | Verify or delete |
| Consciousness Technology Registry | CSA + Aurora | **nowhere** | Verify or delete |
| Pharmaceutical Colonialism Reparations Fund | Prometheus + Gaian Trade | **nowhere** | Verify or delete |
| Speculative Paradigm Pilot | Technology Governance | **nowhere** | Verify or delete |
| The Abundance Protocol | AUBI + Work in Liberation | no outline, by design | Legitimate leaf — exempt |

The Moon Wish Test one is the sharpest: the only place the corpus names it, it names it to forbid its use. Carrying it as a live tier-1 Protocol is the schema asserting something the documents deny.

Caveat on the five "nowhere" rows: 80 files against 78 Framework entities is near-complete coverage, not certain coverage. Re-run [entity-provenance.js](computer:///mnt/user-data/outputs/entity-provenance.js) against the full repo before deleting anything — it does this trace properly and sorts every unreferenced entity into retired / unclaimed / unsourced.

## Validator patches

Replace `findOrphanedEntities`:

```js
export function findOrphanedEntities(entities, relationships) {
  const inbound = new Set();
  const outbound = new Set();

  for (const rel of relationships) {
    outbound.add(rel.from);
    inbound.add(rel.to);
  }
  for (const e of entities) {
    const edges = [...(e.dependencies ?? []), ...(e.enables ?? [])];
    if (edges.length) outbound.add(e.id);
    for (const id of edges) inbound.add(id);
  }

  const label = (e) =>
    `${e.name || e.id} (${e.type}${e.tier != null ? `, tier ${e.tier}` : ''})`;
  const isRetired = (e) => e.status === 'Retired' || !!e.retired;
  const live = entities.filter((e) => !isRetired(e));

  return {
    isolated: live.filter((e) => !inbound.has(e.id) && !outbound.has(e.id)).map(label),
    unclaimed: live.filter((e) => !inbound.has(e.id) && outbound.has(e.id)).map(label),
    // The real retirement invariant: nothing live may still point at a retired entity.
    retiredButReferenced: entities.filter((e) => isRetired(e) && inbound.has(e.id)).map(label)
  };
}
```

Then swap the single `Graph connectivity` check for three:

```js
  {
    name: 'Isolated entities',
    severity: 'hygiene',
    items: orphans.isolated,
    pass: 'No entity sits outside the graph entirely'
  },
  {
    name: 'Unclaimed entities',
    severity: 'hygiene',
    items: orphans.unclaimed,
    pass: 'Every entity has something that establishes it'
  },
  {
    name: 'Retirement integrity',
    severity: 'hygiene',
    items: orphans.retiredButReferenced.map((l) => `${l} — retired but still referenced`),
    pass: 'No live entity points at a retired one'
  },
```

That reports 1 / 16 / 0 instead of a flat 22, and the 16 shrink as you write the `ESTABLISHES` edges.

## The tier-0 priority rule

Global Council for the Future and Office of the Adversary are both Treaty Art. 10 advisory/integrity organs. The rule assumes constitutional position implies implementation urgency — but tier is architectural placement and priority is sequencing, and a foresight body genuinely can follow the Assembly and the Tribunal. My read is the rule is wrong here, not the data. Narrow it so `Medium`/`Low` at tier 0 stays a signal:

```js
    if (
      entity.tier === 0 &&
      entity.status !== 'Retired' &&
      !entity.retired &&
      entity.implementationPriority &&
      !['Critical', 'High'].includes(entity.implementationPriority)
    ) {
```

If you think the stricter rule is right, the alternative is bumping both to `Critical` — but then priority stops carrying information at tier 0.

## More-Than-Human Governance

Deliberately unpublished pending the MOS Rights–Guardianship overlap, and the reason lives in a code comment where nothing can check it. Add a field to `GgfEntity`:

```ts
  /** Deliberately unpublished. Present = suppresses the "no UI metadata" warning. */
  publicationDeferred?: { reason: string; blockedBy?: string[] };
```

```ts
    publicationDeferred: {
      reason: 'Overlap with the MOS Rights–Guardianship Spectrum and the Oracle Protocol unresolved.',
      blockedBy: ['framework_mos', 'framework_oracle_protocol']
    }
```

and guard the warning with `&& !entity.publicationDeferred`. That turns a comment into a claim the validator can hold you to — if MOS resolves the overlap, `blockedBy` becomes checkable rather than stale prose.
