# GEM settlement — schema migration

Brings the schema into line with Treaty v1.3 Article 16, Shield v2.0.1 §12.1 and
§21.3, Aegis v1.3.4 §8.2, and PIS v2.2.2. No editorial choice about the
enforcement model is made here; the frameworks already made it. This is
transcription.

**One question remains genuinely open** and is not resolved by this migration —
see *Unclosed: the non-acceptance case* at the end.

---

## The settled model

Treaty v1.3 Art. 16.1 defines a nine-step graduated compliance sequence ending in
adjudication, proportionate sanction, and restoration. Art. 16.4 provides that
Parties **may establish separately chartered corps**, each charter defining
command, jurisdiction, civilian control, consent, use-of-force rules, financing,
oversight, and sunset. Art. 16.5 sets authorization thresholds per deployment
class. Art. 16.6 forbids AI deployment authority.

There is no standing global enforcement institution. Enforcement is distributed:
competent jurisdictions and separately chartered corps execute, the Digital
Justice Tribunal adjudicates, and the Treaty supplies the compliance sequence and
the authorization thresholds.

---

## Disposition 1 — retired

Contradicted by the framework that establishes them in the schema.

| Entity | Retired by | Text |
|---|---|---|
| `institution_gem` | Treaty v1.3 Art. 16 | replaced by graduated compliance + separately chartered corps |
| `institution_getf` | Shield v2.0.1 §12.1, §21.3 | "retired; no standing Shield force" |
| `council_tsc` | Shield v2.0.1 §21.3 | "retired; no operational approval council" |
| `institution_gcic` | Shield v2.0.1 §21.3 | "replaced by federated, purpose-limited exchange nodes" |
| `institution_edf` | Aegis v1.3.4 §8.2 | "This Protocol does not create an Earth Defense Force" |

Do not delete these entities. Mark them retired and keep them resolvable, per the
lifecycle fields below — the edges around them encode why they were once there.

### Edges to remove

```
cluster_constitutional-foundation.ts
  framework_treaty            --ESTABLISHES--> institution_gem
  institution_gem             --REPORTS_TO--> institution_dj_tribunal

cluster_governance-os.ts
  process_crisis_command      --ESCALATES_TO--> institution_gem
  institution_gcic            --PARTICIPATES_IN--> council_gifc

cluster_human-flourishing.ts
  institution_hec             --IMPLEMENTS--> institution_gem

cluster_just-transition.ts
  framework_aegis_protocol    --ESTABLISHES--> institution_edf

cluster_justice-os.ts
  framework_shield            --ESTABLISHES--> council_tsc
  framework_shield            --ESTABLISHES--> institution_gcic
  framework_shield            --ESTABLISHES--> institution_getf
  council_tsc                 --OVERSEES--> institution_getf
  council_tsc                 --OVERSEES--> institution_gcic
  council_tsc                 --COORDINATES_WITH--> council_mgcc
  institution_gcic            --INFORMS--> institution_getf
  institution_getf            --IMPLEMENTS--> institution_gem

cluster_visionary-meta.ts
  framework_planetary_immune_system --ESCALATES_TO--> institution_gem
```

### Dependency and enables arrays to clear

```
cluster_constitutional-foundation.ts  institution_gem.enables        -= institution_getf
cluster_governance-os.ts              council_gifc.dependencies      -= institution_gcic
cluster_human-flourishing.ts          institution_hec.dependencies   -= institution_gem
cluster_just-transition.ts            framework_aegis_protocol.enables -= institution_edf
cluster_just-transition.ts            institution_edf.dependencies   -= institution_unsc_reformed
cluster_justice-os.ts                 framework_shield.enables       -= council_tsc,
                                                                        institution_gcic,
                                                                        institution_getf
cluster_justice-os.ts                 institution_getf.dependencies  -= institution_gem
```

### Two rewires rather than deletions

`process_crisis_command --ESCALATES_TO--> institution_gem` has no successor
institution. Crisis Command escalates into the Treaty's own emergency procedure,
not to a body. Replace with a `DEPENDS_ON` edge to the Treaty and record Art. 17.2
provisional action (72 hours) and Art. 17.3 continuation as the governing route.

`institution_gcic --PARTICIPATES_IN--> council_gifc` should survive in substance —
Shield replaced GCIC with federated exchange nodes rather than removing the
function. Create the successor entity (below) and re-point the edge to it.

### The `_index.ts` comment block

The `framework_meta_gov --ENABLES--> framework_planetary_immune_system` edge is
described as enabling "system-level crisis override capabilities". The comment
immediately below it already records that all override paths were removed. Change
the description to coordination, or the comment now contradicts the live edge it
annotates.

---

## Disposition 2 — reattributed

`institution_hec` (Health Emergency Corps) is **not** retired. Treaty Art. 16.4
names it explicitly as a permissible separately chartered corps. Its authority
comes from its own charter, not from GEM.

- remove `IMPLEMENTS institution_gem`
- add `framework_treaty --ESTABLISHES--> institution_hec` with a description
  citing Art. 16.4, or leave establishment with `framework_global_health` and add
  `institution_hec --DEPENDS_ON--> framework_treaty`
- the charter requirements in Art. 16.4 (command, civilian control, consent,
  use-of-force rules, financing, oversight, sunset) are the fields this entity
  should eventually carry

---

## Disposition 3 — externalised

`institution_unsc_reformed` and `institution_unga_reformed` are not Treaty
institutions. Art. 23.2 states the Treaty does not presume UNGA, UNSC, ICJ, ICC,
IMF, World Bank, WTO or WHO have accepted anything. Art. 23.3 lists UNSC and UNGA
reform as objectives the Parties **may jointly advocate**, which "remain external
reform objectives until adopted through the applicable institutions' legal
procedures."

They are therefore neither established nor retired — they are external bodies the
Treaty advocates reform of.

- keep `framework_treaty --COORDINATES_WITH-->` both, but change the descriptions
  to advocacy under Art. 23.3
- drop `tier: 0` — they are not part of the GGF tier structure
- add whatever field marks an entity as external to the ecosystem; if none
  exists, this is the case that motivates one

---

## Missing entities

Art. 16.4 names four corps. Only the Health Emergency Corps exists in the schema.

- Environmental Crimes Investigation Unit
- Cyber Defense and Recovery Service
- Humanitarian Stabilization and Reconstruction Service

Plus Shield's replacement for GCIC: the federated, purpose-limited exchange nodes
(§21.3). Currently the schema records the retirement with no successor, which
leaves Shield's intelligence function unrepresented.

Add these only if you want the schema to mirror Art. 16.4 fully. Each is
`Proposed`, and each is established by the Parties under the Treaty rather than by
a domain framework.

---

## Lifecycle fields

Retirement needs to be representable, or the next revision will reintroduce these
institutions. Minimal addition to `GgfEntity` in `_types.ts`:

```ts
  /** Set when a framework revision retired this entity. Retired entities remain
   *  in the graph so historic references resolve, but must not be treated as
   *  operative by any consumer, and must not receive new inbound edges. */
  retired?: {
    /** Version of the document that retired it, e.g. 'shield-v2.0.1'. */
    by: string;
    /** Section reference, e.g. '§21.3'. */
    section?: string;
    /** What now performs the function, if anything. */
    supersededBy?: string;
    /** ISO date of the retiring revision. */
    date: string;
  };
```

Then the validator gains three checks:

1. no relationship may point **to** a retired entity;
2. no `dependencies` or `enables` array may contain a retired entity;
3. no entity may carry an `ESTABLISHES` edge from a framework whose current
   outline states it does not create that entity.

Check 3 is the one that would have caught this drift when it happened.

---

## Unclosed: the non-acceptance case

The frameworks settle who may request enforcement, who authorizes it, and who
executes it. They do not settle what happens when **no competent authority
accepts**.

Art. 16.1 ends at restoration and outcome review and assumes an authority exists.
Shield §12.2 requires that competent authorities *may request* operational
assistance, and specifies everything a mission must identify — but not what
follows a request nobody takes. I searched Treaty v1.3, Shield v2.0.1, Justice
v1.4, and Peace v1.8.1 for a non-acceptance, authority-gap, or refusal provision
and found none. Peace v1.8.1 `T10` handles Indigenous refusal correctly and
deliberately ("no entry occurs; no global proxy overrides the refusal"), but that
is consent, not incapacity.

This is the actual residual constitutional question, and it is smaller and more
tractable than "what happened to GEM". The likely answers are:

- **record and publish the gap.** `ECRC-05` already closes only when every active
  function has an identified authority or an explicit authority gap is recorded,
  so the machinery exists; the Treaty would state that an unaccepted request
  becomes a published finding of non-availability.
- **escalate to adjudication without execution.** The Tribunal rules; the ruling
  stands unexecuted and is recorded as such.
- **nothing.** The request lapses. Honest, and consistent with the refusal to
  manufacture authority — but it should be stated rather than left implicit.

Whichever it is, it belongs in Treaty Art. 16 and then in `SCPA-31`, `SCPA-36`,
`ECRC-25`, `CERGTA-48` and `GMEAIA-57` — which is why it should be settled before
those specifications are refreshed.
