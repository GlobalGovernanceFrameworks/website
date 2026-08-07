## Audit 3 — HAB Record-Overlap and Lifecycle Audit

Treat the 29 `HAB-*` records in v0.1.5 as a proposed administrative type system and attempt to **reduce it**.

Do not recommend additional records unless an existing consequential state genuinely cannot be represented.

For every `HAB-01` through `HAB-29`, identify:

* what event or state causes the record to exist;
* whether it records observation, constitution, decision, handoff, transition, remedy, or closure;
* which authority owns it;
* which other records contain overlapping facts;
* whether it has a unique legal function;
* whether it could instead be:

  * a field in another record,
  * a subtype,
  * an event on an existing lifecycle,
  * a cross-reference,
  * or an implementation-specific view.

Pay special attention to possible overlap among:

* `HAB-02` / `HAB-03`;
* `HAB-08` / `HAB-17`;
* `HAB-09` / `HAB-10`;
* `HAB-11` / `HAB-16`;
* `HAB-16` / `HAB-18` / `HAB-28`;
* `HAB-19` / `HAB-13`;
* `HAB-21` / `HAB-25`;
* `HAB-22` / `HAB-25`;
* `HAB-23` / `HAB-25` / `HAB-29`;
* `HAB-25` / `HAB-29`;
* `HAB-26` / `HAB-17`;
* `HAB-27` / `HAB-29`.

Also test whether the framework is mixing three different layers:

1. canonical constitutional record types;
2. domain-specific decision records;
3. implementation/database artefacts.

Produce:

* a proposed **minimal canonical HAB kernel**;
* records that should remain distinct;
* records that could be merged or demoted to optional implementation profiles;
* any lifecycle gaps created by your proposed simplification.

A simplification is valid only if every case already handled by v0.1.5 remains reconstructable with its authority, reasons, affected interest, challenge route, continuity consequence, and closure intact.

---
Claude:
# Audit 3 — HAB Record-Overlap and Lifecycle Audit

**Subject:** Housing & Secure Habitation Framework v0.1.5, §17 candidate canonical records (`HAB-01`–`HAB-29`)
**Audit posture:** reductive. Treat the 29 records as a proposed administrative type system and attempt to shrink it.
**Validity condition applied:** a simplification is accepted only where every case v0.1.5 already handles remains reconstructable with its authority, reasons, affected interest, challenge route, continuity consequence, and closure intact.

**Headline result:** the type system reduces from **29 records to 9 canonical records plus 6 shared field blocks**, without loss of reconstructability, provided eight named conformance constraints are added to compensate for the trip-wires that record multiplicity was silently providing.

---

## 1. Method: three merge tests and two keep tests

The audit does not merge on similarity of content. It merges on identity of *function*, and refuses to merge where record multiplicity is doing detection work that a field cannot do.

**Merge tests** (any one sufficient):

1. **Trigger test.** Do two records differ only in *what caused them* rather than in what legal work they do? → merge, with a trigger/domain field. This is the dominant pattern in v0.1.5.
2. **Subject test.** Do two records perform the same operation on different object classes (person's interest, dwelling unit, basis, authority)? → unify the operation, parameterise the subject.
3. **Stage test.** Are two records successive states of one object rather than two objects? → collapse to a lifecycle with states.

**Keep tests** (either one blocks a merge):

4. **Separation test.** Would merging allow one actor to perform two functions that §3.4 requires be separable, *without that being visible*? → keep distinct, or keep as constrained classes with a mandatory distinct-authority rule.
5. **Absence test.** Is the record's non-existence itself the failure mode being audited for? → keep distinct, so that absence remains countable. A subtype that is never instantiated looks like conformance; a missing required record looks like a defect.

Test 5 is the reason the reduction stops at nine rather than four. Several merges are structurally clean and still rejected, because the framework's legitimacy rests on being able to ask "was there a challenge route, and did anyone use it?"

---

## 2. Functional classification of all 29 records

v0.1.5 names 29 types but exhibits only **six latent functional classes**. The mismatch is the source of nearly all overlap.

| ID | Event or state that creates it | Function class | Authority that owns it | Disposition |
|---|---|---|---|---|
| HAB-01 | An actor claims or receives housing power | Constitution (actor) | Constituting instrument / adopting jurisdiction | **K1** |
| HAB-02 | A relationship enters administrative view | Observation (relationship) | First recording housing actor | Merge → **K2** |
| HAB-03 | An interest is asserted or recognised | Constitution (relationship) | Competent law; recorded by housing actor | **K2** |
| HAB-04 | Any processing of housing data | Constitution (data boundary) | CIS + housing controller | Demote → **Block B1** |
| HAB-05 | Inspection, complaint, hazard report | Observation (place) | Habitability standards authority | **K4** |
| HAB-06 | Defect found; repair or closure required | Decision + obligation plan | Standards authority + owner/provider | Split → **K5 + K6** |
| HAB-07 | Rent, fee, or deposit is set or supported | Decision | Landlord/provider/rent authority | Merge → **K5** |
| HAB-08 | Any consequential act requiring notice | Process attribute | Whoever owns the parent act | Demote → **Block B2** |
| HAB-09 | A party lawfully opens termination | Decision (stage 1) | Landlord/provider/allocator | Merge → **K5** (constrained class) |
| HAB-10 | Compulsory loss is authorised | Decision (stage 2) | Adjudicator / competent authority | Merge → **K5** (constrained class) |
| HAB-11 | Foreseeable displacement from lawful action | Obligation plan | Displacing process + housing actor | Merge → **K6** |
| HAB-12 | Homelessness or imminent loss | Obligation plan | Homelessness/continuity service | Merge → **K6** |
| HAB-13 | Administrative allocation of scarce housing | Decision (entry) | Allocation authority | Merge → **K5** |
| HAB-14 | A provider is constituted | Constitution (actor) | Constituting instrument | Merge → **K1** |
| HAB-15 | Financial distress threatens the home | Obligation plan + external decision | Court/creditor process; housing receives | Merge → **K6 + K7** |
| HAB-16 | Another framework causes a housing consequence | Handoff (duty out) | Initiating framework | Merge → **K7** |
| HAB-17 | A person contests an act or omission | Remedy | Independent review body | **K9** |
| HAB-18 | An authority or provider ends | Closure + duty spawn | Constituting authority | Merge → **K1 lifecycle + K7** |
| HAB-19 | Consequential denial of housing access | Decision (entry) | Provider/screener | Merge → **K5** |
| HAB-20 | Owner/provider insolvency, sale, receivership | Obligation plan + handoff | Insolvency/property process | Merge → **K6 + K7** |
| HAB-21 | A secondary resident needs standing | Constitution (relationship, subtype) | Competent law | Merge → **K2 subtype** |
| HAB-22 | One institution holds housing + other powers | Constitution (actor, multi-mandate) | Each constituting mandate | Merge → **K1 profile** |
| HAB-23 | Lawful conversion of dwelling use | Decision + obligation plan | Land-use/tourism/platform authority | Split → **K5 + K6** |
| HAB-24 | Progressive habitability degradation | Observation (temporal) + plan | Hazard/infrastructure/housing actors | Split → **K4 + K6** |
| HAB-25 | A basis conditions a habitation position | Constitution (edge) | Each basis's own domain | **K3** |
| HAB-26 | Two or more claims to one dwelling | Adjudication referral | Competent adjudicator | **K8** |
| HAB-27 | A collective/customary body terminates residence | Decision (external authority) | Community/customary authority | Merge → **K5 + K6 + K7** |
| HAB-28 | No actor accepts a continuity duty | Handoff failure state | Fallback custodian, or nobody | Merge → **K7 terminal states** |
| HAB-29 | Status changes causally from old to new | Transition edge | Authorising authority | Demote → **Block B3** |

**Latent classes:** constitution-of-actor (01, 14, 22), constitution-of-relationship (02, 03, 21, 25), observation (05, 24), decision (06, 07, 09, 10, 13, 19, 23, 27), obligation plan (06, 11, 12, 15, 20, 23, 24), handoff/closure (16, 18, 20, 27, 28), remedy (17), plus cross-cutting attributes (04, 08, 29) and one referral (26).

**Undeclared fourth axis.** v0.1.5 also mixes three record *shapes* without ever naming the distinction: **standing registers** about actors and places (01, 04, 14, 22), **case records** about one person–place relationship (02, 03, 21, 25, 26, 29), and **event records** (07, 09, 10, 23, 27). The framework already senses the problem — it repeatedly warns that `HAB-21` and `HAB-23` are "not standing registers" (§15.4) — but it patches that in prose rather than in the type system. Naming register/case/event as an explicit axis removes the need for those warnings.

---

## 3. The twelve flagged overlaps, resolved

### `HAB-02` / `HAB-03` — near-total overlap
These are the same object at two epistemic confidence levels. `HAB-02` records what appears to exist including disputed status; `HAB-03` records what is legally recognised. Nothing else separates them, and §22 Q38 admits the framework has not decided whether `HAB-03` is constitutive or merely declarative.

Worse: keeping them separate **reproduces the exact antipattern §3.21 forbids**. Promotion from intake to recognised interest is a close-and-reopen migration between record types — the same structural failure the framework calls out when succession is represented as an unrelated new case.

**Disposition:** merge into **K2** with `recognition_status ∈ {asserted, disputed, recognised, determined-not-to-exist, terminated}`. This also forces Q38 to be answered: K2 is **declarative**, referencing the constituting law; Housing does not constitute the interest.

### `HAB-08` / `HAB-17` — pre-decision process vs post-decision remedy
Not duplicative in content, but `HAB-08` has no independent legal effect. Notice is always notice *of* something. Keeping it as a record permits a decision record to exist with no notice record and still validate structurally.

**Disposition:** demote `HAB-08` to **Block B2**, a validity-required block on every K5 instance. Retain `HAB-17` as **K9** under the absence test. Note that `HAB-17`'s interim relief duplicates `HAB-26`'s interim measures and `HAB-06`'s temporary relocation — see Block B5.

### `HAB-09` / `HAB-10` — same type, different stage and authority
Structurally identical: both are consequential decisions with grounds, evidence, notice, and challenge. They differ in stage and in who may lawfully own them.

This is the audit's hardest case, because the separation between opening a termination and authorising compulsory loss is the single most consequential separation in the framework (§18 Q5).

**Disposition:** merge into **K5** as constrained classes `termination_notice` and `compulsory_loss_authorisation`, *with* Constraint C2 below. Rationale: a unified type with a mandatory distinct-authority rule is a **stronger** guarantee than two record types, because two types rely on an implementer choosing to instantiate both, whereas a constraint fails validation when one actor owns both. The merge is conditional on C2 being adopted; without C2, reject it.

### `HAB-11` / `HAB-16` — two ends of one continuity event
`HAB-16` is the sender side (an external framework binds itself to a consequence); `HAB-11` is the receiver side (the plan that discharges it). §14's thirteen-item handoff list substantially restates `HAB-11`'s contents.

They are genuinely distinct in ownership: `HAB-16` is owned by the *initiating* framework, `HAB-11` by the housing actor, and either can exist without the other (ordinary redevelopment needs no handoff; an unaccepted handoff has no plan).

**Disposition:** keep both functions, reassign classes — `HAB-11` → **K6** (plan), `HAB-16` → **K7** (duty transfer). Deduplicate by making the shared payload a single block referenced from both rather than two parallel field lists.

### `HAB-16` / `HAB-18` / `HAB-28` — one lifecycle presented as three records
This is the highest-value merge in the audit. The three are states of a single object — *an unresolved or transferring habitation duty*:

- `HAB-18` is the **trigger** (an authority or provider ends, duties must be re-homed);
- `HAB-16` is the **attempt** (duty identified, offered to a named receiver);
- `HAB-28` is the **failure state** (no receiver; fallback custody, or a recorded constitutional gap).

§16.5 already treats them as one flow, routing `HAB-16` → `HAB-28` → `HAB-18`/`HAB-28` gap in a single sentence.

**Disposition:** merge into **K7 — Duty Custody & Handoff**, with states `identified → offered → accepted → discharged | unaccepted-fallback | constitutional-gap`. `HAB-18`'s authority-expiry aspect returns to **K1** as the terminal event of the authority record, which spawns K7 instances for surviving duties.

### `HAB-19` / `HAB-13` — both entry-side eligibility decisions
`HAB-13` is the public/social allocation variant; `HAB-19` the general access/screening variant. Both record lawful criteria, evidence, data provenance, reasons, correction, and appeal. They differ in who decides and in whether a queue exists.

**Disposition:** merge into **K5** as classes `access_screening` and `allocation`, with queue/priority/wait-status as optional fields. The distinction remains visible because `allocation` carries a positive publication duty (§5.4) that `access_screening` does not — that is a per-class obligation, not a per-type one.

### `HAB-21` / `HAB-25` — person-standing vs basis-edge
Not duplicative. A secondary household resident may have *no* basis at all — pure factual residence under §3.11 — which is precisely why §2.10 draws the derived-interest / factual-residence line. `HAB-25` cannot represent an interest with zero bases.

Real overlap is narrower: `HAB-21`'s "exclusion authority" restates `HAB-25`'s terminating-basis relation plus a K5 decision.

**Disposition:** `HAB-21` → **K2 subtype** (`interest_type = secondary_household_resident`); exclusion authority moves to K5. This is a net improvement to §3.12: a secondary resident's interest now lives in the same record type as a tenant's, which makes the "no procedural void" rule enforceable by construction rather than by cross-reference.

### `HAB-22` / `HAB-25` — actor attributes vs relation attributes
The overlap is real and instructive. A care institution is simultaneously a provider (an actor with powers) and a gatekeeper (an edge conditioning one person's habitation). v0.1.5 records the first in `HAB-22` and the second in `HAB-25`, with no rule about which holds what.

**Disposition — type-system fix:** **powers belong to the actor record (K1); the effect of a specific decision on a specific habitation position belongs to the edge (K3).** `HAB-22` becomes a K1 profile: a mandatory declaration of non-housing mandates held over residents. This is stronger than the current design, because §3.13's failure mode is caught for *every* actor rather than only in settings someone has already labelled "mixed."

### `HAB-23` / `HAB-25` / `HAB-29` — three transition mechanisms for three subjects
The most important structural finding in this audit.

- `HAB-23` records a transition of the **unit's use or status**.
- `HAB-29` records a transition of the **person's habitation status**.
- §3.22 records a transition of the **unit's identity** — correctly, with *no record at all*, using shared fields.
- `HAB-18` records a transition of the **authority**.
- `HAB-25` records changes of **basis**.

Five transition mechanisms, four subjects, three implementations (record, record, field-set). The framework has independently reinvented "something changed and the linkage must survive" once per object class.

**Disposition:** adopt **one transition grammar** — Block B3 — parameterised by `subject ∈ {interest, unit, basis, authority}`, carrying predecessor, successor, authorising authority, effective time, what continues/ends/is created, and unresolved challenge. §17.1's unit-identity fields become the `subject = unit` instance of it. This is the single change that most reduces the type system while *increasing* consistency.

### `HAB-25` / `HAB-29` — edge on the graph the other describes
`HAB-29` is an event on the basis/interest graph `HAB-25` maintains. §17.1's own minimum rule gives the game away: `HAB-29` is required "when a protected status transition would otherwise be represented as an unrelated closure and reopening." That is a **referential-integrity constraint**, not a record.

**Disposition:** demote to **Block B3**, subject to Constraint C6.

### `HAB-26` / `HAB-17` — overlapping interim measures only
`HAB-26` routes a dispute out to an adjudicator; `HAB-17` brings a remedy in from a review body. Distinct in direction and owner. The only genuine duplication is interim protection.

**Disposition:** keep both. `HAB-26` → **K8** (absence test: "no adjudicator identified" must be countable, per §18 Q34). Extract interim measures to **Block B5**.

### `HAB-27` / `HAB-29` — external termination plus a continuity bridge
`HAB-27` decomposes without residue into: a compulsory-loss decision whose authority sits in a community/customary domain, a downstream continuity plan, and — where nothing accepts the downstream duty — an unowned-duty record. §3.17 says exactly this in prose.

The one thing `HAB-27` uniquely asserts is that Housing may not review the collective decision. That is an **authority-domain attribute** on K5 (`authority_domain = community_customary`, `housing_review = none`), not grounds for a record type.

**Disposition:** merge → **K5 + K6 + K7**.

---

## 4. The three-layer test

The framework *is* mixing three layers, and the mixing is systematic rather than incidental.

**Layer 1 — canonical constitutional record types.** `HAB-01`, `02`, `03`, `09`, `10`, `16`, `17`, `18`, `25`, `26`, `28`, `29`. These carry genuine constitutional functions: authority, interest, decision, handoff, remedy, closure.

**Layer 2 — domain-specific decision records.** `HAB-06`, `07`, `11`, `12`, `13`, `15`, `19`, `20`, `22`, `23`, `24`, `27`. Every one of these exists because a *topic* exists — finance, tourism, climate, care, insolvency, homelessness — not because a new legal function exists. Each delivers the same functional shape (observe an external event → assign an obligation → route a consequence) with different subject matter.

This is the mechanism behind the record count. The version history shows it plainly: each adversarial round surfaced a topic, and each topic acquired a record. v0.1.1 added insolvency and constructive eviction; v0.1.2 added household members, care/custody, tourism, slow-onset; v0.1.3 added derived interests, community termination, fallback custody; v0.1.4 added bases, gatekeepers, status change. **The type system is indexed by topic where it should be indexed by function.** v0.1.5 is the first release to resist this — it added two full concepts (unit lifecycle, concurrent homes) and correctly added zero records.

**Layer 3 — implementation and database artefacts.** `HAB-04` is a housing profile of a CIS object, explicitly inheriting rather than constituting (§15.1). `HAB-05` is an inspection record most jurisdictions already hold. `HAB-08` is a notice log. `HAB-14` is an organisational instrument, not a case record. These should be importable from existing systems under §17.1's proportional-record rule rather than instantiated natively — which the framework permits but does not signal in the type list.

---

## 5. Proposed minimal canonical HAB kernel

**Nine records.**

| Kernel | Name | Function | Absorbs |
|---|---|---|---|
| **K1** | Authority & Mandate Record | Who may lawfully act, under what instrument, over which residents, until when | 01, 14, 22 |
| **K2** | Habitation Interest Record | The person–place relationship, at any recognition status, of any type | 02, 03, 21 |
| **K3** | Basis, Dependency & Gatekeeper Record | The edges that constitute, condition, limit, or terminate an interest | 25 |
| **K4** | Habitation Condition Record | Observed state of a place, including trajectory over time | 05, 24 |
| **K5** | Consequential Housing Decision | Any act that changes access, cost, status, or continued occupation | 06 (decision part), 07, 09, 10, 13, 19, 23 (decision part), 27 (decision part) |
| **K6** | Continuity & Obligation Plan | What is owed to whom, by when, to preserve or replace habitation | 06 (plan part), 11, 12, 15, 20, 23 (plan part), 24 (plan part) |
| **K7** | Duty Custody & Handoff | Transfer, acceptance, fallback custody, and constitutional gap for a duty | 16, 18, 20 (handoff part), 27 (handoff part), 28 |
| **K8** | Adjudication Referral | Multiple claims to one dwelling routed to a named competent adjudicator | 26 |
| **K9** | Challenge, Remedy & Closure | Contest, interim relief, correction, restitution, compensation, closure | 17 |

**Six shared field blocks** (carried by records, never instantiated alone):

| Block | Content | Replaces / extracts from |
|---|---|---|
| **B1** | CIS data-purpose, access, retention, correction binding | 04 |
| **B2** | Notice, language/accessibility, representation, response period, dissent | 08 |
| **B3** | Transition edge: predecessor, successor, authority, effective time, what continues/ends/is created, unresolved challenge — parameterised by `subject ∈ {interest, unit, basis, authority}` | 29, §3.22, §17.1 unit fields, 18 (expiry aspect) |
| **B4** | Habitation-unit identity: current and prior identifiers, predecessor/successor relation, place-specific flag, concurrent-interest flag | §17.1 (already correct — promoted to a named block) |
| **B5** | Interim protective measures: interim relief, interim occupancy, non-dissipation, anti-self-help | extracted from 17, 26, 06, 03 |
| **B6** | Belongings and essential support: personal property, medicines, assistive devices, essential records, dependants, animals | extracted from 10, 18, 21, 26, 27 |

B5 and B6 are new *blocks*, not new records. Both are currently duplicated across four to five record types with drifting field lists — a straightforward source of implementation divergence.

**v0.1.5 already got this right once.** §17.1 refused to create a `HAB-30` for the dwelling and used shared fields instead. That decision is correct and is the model this audit applies retroactively to `HAB-04`, `HAB-08`, and `HAB-29`.

---

## 6. Records that must remain distinct

- **K1 vs K2** — actor vs relationship. Collapsing these would let a provider's powers and a resident's interest live in one object, which is the confusion §2.6 exists to prevent.
- **K2 vs K3** — node vs edge. Merging destroys the entire multi-basis achievement of v0.1.4 and re-imposes a single-superior-interest model. This is the framework's most valuable structural asset and must not be traded for record-count reduction.
- **K5 `termination_notice` vs `compulsory_loss_authorisation`** — retained as constrained classes, not free variants. See C2.
- **K7 vs K8** — duty routing versus substantive adjudication routing. §19.1 explicitly states that CIS §18.1 allocates framework responsibility but does *not* adjudicate competing resident claims. A `referral_type` field would technically preserve this, but the framework has already identified their conflation as a live error mode, so the type-level separation is retained deliberately.
- **K9** — retained under the absence test. If remedy were a subtype of K5, an implementation that never provides a challenge route would look structurally identical to one that does.

---

## 7. Records demoted to optional implementation profiles

The following need no native instantiation where an equivalent record already exists in the adopting jurisdiction, under §17.1's proportional-record rule:

- **K1 provider profile** (was `HAB-14`) — a cooperative charter, housing-association constitution, or public-body statute already performs this.
- **K1 multi-mandate profile** (was `HAB-22`) — importable from care-inspectorate or institutional-licensing records where those exist.
- **K4** (was `HAB-05`) — municipal building-inspection systems.
- **B1** (was `HAB-04`) — a CIS binding, not a housing artefact; should be declared satisfied by the jurisdiction's data-protection instrument.
- **K6 finance profile** (was `HAB-15`, `HAB-20`) — insolvency and foreclosure processes already generate records; Housing needs the *pointer* plus the resident-facing continuity fields, not a parallel case file.

---

## 8. Lifecycle gaps created by this simplification, and the constraints that close them

Record multiplicity was performing undeclared detection work. Removing it without compensation would lose real protection. Eight constraints are required for the reduction to be valid.

**C1 — Duty-custody terminal states.** A K7 instance may be closed only in states `discharged`, `lawfully_extinguished`, or `constitutional_gap`. Merging `HAB-16`/`18`/`28` otherwise permits an unaccepted duty to be closed as if resolved — deleting §3.18 and §16.5.

**C2 — Decision-stage separation.** No K5 instance may carry more than one `class`. A `compulsory_loss_authorisation` must reference a prior `termination_notice` or state the lawful ground for which none was required. Where §3.4 applies, the two instances must name different authorities. *Without C2 the `HAB-09`/`HAB-10` merge is rejected.*

**C3 — Notice block is validity-bearing.** Block B2 is required for every K5 instance; an empty or inapplicable B2 must be explicitly justified, and its absence or defect is independently recordable in K9. Otherwise demotion from `HAB-08` lets decisions validate with no notice.

**C4 — Mandatory non-housing mandate declaration.** Every K1 must declare `other_mandates_over_residents`, with `none` as an explicit permitted value. Silence must be impossible. `HAB-22` currently forces the mapping by existing; folded into K1, only a mandatory field preserves that.

**C5 — Degrading condition opens a plan.** A K4 with `trajectory = degrading` and a credible-pathway finding must open a K6. Without this, folding `HAB-24` into K4 makes slow-onset degradation observable but inert, defeating §8.7's entire purpose of acting before crisis displacement.

**C6 — Transition referential integrity.** Any K2 concerning the same claimant and unit as a recently closed K2 must carry a B3 transition edge or an explicit assertion that the cases are unrelated. An edge is easier to omit than a record; §3.21's protection survives only as a constraint.

**C7 — K6 may open without a K2.** A continuity or obligation plan must be openable against a *person* holding only a non-place-specific accommodation entitlement (§2.14), not solely against an interest in a unit. `HAB-12` currently covers people with no habitation interest at all; folding it into K6 without C7 would exclude exactly the population §10 exists to serve.

**C8 — General measure vs individual decision.** K5 requires `scope ∈ {general, individual}`, and every `individual` instance must reference the `general` instrument it applies.

C8 addresses a gap that **already exists in v0.1.5** and is surfaced rather than created by this audit. §3.2 requires that a consequential housing act rest on "an independently valid rule," but no record type holds the rule: `HAB-01` registers *powers*, not the rules made under them, while `HAB-07` and `HAB-13` smuggle rule-level content (rent formulas, allocation criteria, priority schemes) into records shaped for individual determinations. A rent cap, a screening criterion, and an allocation priority are consequential states affecting many residents at once, and they currently have no home. C8 handles this as a field plus a reference rather than as a thirtieth record.

---

## 9. Reconstructability check

Tested against the validity condition, using the cases v0.1.5 earned through five rounds of adversarial review. Each must retain authority, reasons, affected interest, challenge route, continuity consequence, and closure.

| Case | Reconstruction under the kernel |
|---|---|
| Subtenant loses one of three bases | K3 edge terminated; other K3 edges persist; K2 unchanged; K5 only if a separate housing act is required (§3.20) |
| Customary banishment with no downstream owner | K5 (`authority_domain = community_customary`, `housing_review = none`) → K6 → K7 `unaccepted-fallback` → `constitutional_gap` under C1 |
| Landlord insolvency, sale with vacant possession | K7 (external process handoff) + K6 (deposits, maintenance, successor duties) + K5 (`compulsory_loss`, court authority) + K9 |
| Deferred maintenance engineering a condemnation | K4 (`trajectory = degrading`) → C5 → K6; K5 (`condemnation`, safety authority); K6 retains owner repair/relocation duty; K9 for causation and compensation |
| Rebuilt structure after demolition | B3 (`subject = unit`) + B4 predecessor/successor; K2 unchanged in existence; K8 if same-dwelling status is contested |
| Shared-custody child across two homes | Two K2 instances, both `place_specific`, neither B3-linked; no abandonment inference available without a K5 |
| Secondary resident excluded after bereavement | K2 (`interest_type = secondary_household_resident`) + K5 (exclusion, with B2 and B6) + K6 (alternative accommodation) + K9 |
| Care provider using room change as sanction | K1 declares dual mandate under C4; K5 required for the housing consequence; the care power cannot execute it |
| Tourism conversion of an occupied dwelling | K5 (`use_conversion`, land-use authority) + K6 + B1 for the platform data exchange |
| Claimant with no civil identity documents | K2 opened on provisional identifier; K9 openable directly; no kernel record requires civil registration |
| Succession from secondary resident to statutory tenant | Single K2 with B3 (`subject = interest`) under C6; no close-and-reopen |
| Two families with post-conflict claims to one dwelling | Two K2 instances + K8 + B5 interim measures + K6 for whichever cannot retain the dwelling |

No case required a record outside the kernel. The two cases that come closest to failure — customary banishment and slow-onset degradation — fail only if C1 and C5 are omitted, which is why those constraints are non-optional rather than advisory.

---

## 10. Recommendations for v0.2

1. Reindex the type system **by function, not by topic**. Topic belongs in `class` and `domain` fields; it should not generate types.
2. Adopt the nine-record kernel with the six shared blocks, and adopt C1–C8 in the same pass — the constraints are load-bearing, not commentary.
3. Adopt **one transition grammar** (B3) across interest, unit, basis, and authority. This is the highest-leverage single change and resolves open questions 44, 45, 67, 69, 70, and 71 simultaneously.
4. Name the **register / case / event** axis explicitly. This retires the ad hoc "not a standing register" warnings at §15.4 by making the distinction structural.
5. Resolve open Q38 as part of the `HAB-02`/`HAB-03` merge: K2 is declarative, not constitutive.
6. Answer Q52 ("smallest viable kernel for a low-capacity municipality") directly: **K1, K2, K5, K6, K7, K9** — authority, interest, decision, plan, duty custody, remedy. K3, K4, and K8 become required when bases, condition assessment, or competing claims actually arise.
7. Note for §21: gates 23 and 24 now have a concrete test. Gate 23 (administrative overload) is measurable against the six-record municipal floor; gate 24 (duties disappearing) is measurable against C1's terminal-state rule.

---

I've read both documents. Let me work through all 29 records against the reduction tests before writing it up.Audit done. The headline: **29 records → 9 records + 6 shared field blocks**, valid only if eight named conformance constraints are added alongside.

The main findings worth flagging before you read it:

**The type system is indexed by topic where it should be indexed by function.** Twelve of the 29 records exist because a *subject matter* exists (finance, tourism, slow-onset climate, care, insolvency), not because a new legal function exists. Your version history shows the mechanism directly — each adversarial round surfaced a topic and each topic acquired a record. v0.1.5 is the first release to break that pattern.

**Three parallel transition mechanisms for four object classes.** `HAB-23` transitions the unit's use, `HAB-29` transitions the person's status, §3.22 transitions the unit's identity (correctly, with no record), `HAB-18` transitions the authority. One transition grammar parameterised by subject collapses all of these and resolves open questions 44, 45, 67, 69, 70, and 71 at once. This is the single highest-leverage change.

**`HAB-16`/`18`/`28` are one lifecycle, not three records** — trigger, attempt, failure state of a single unresolved-duty object. §16.5 already routes them as one flow in a single sentence.

**`HAB-02`/`HAB-03` separation reproduces the antipattern §3.21 forbids.** Promotion from intake to recognised interest is a close-and-reopen migration between record types — exactly the failure you call out when succession is represented as an unrelated case.

Two places where I declined to merge despite structural identity: `HAB-09`/`HAB-10` (merged only conditionally on a distinct-authority constraint — reject the merge if you don't adopt C2) and `HAB-17` (kept distinct because a remedy route's *absence* has to stay countable; a subtype that's never instantiated looks like conformance).

One gap the audit surfaced rather than created: §3.2 requires a consequential act to rest on "an independently valid rule," but no record type holds the rule. `HAB-07` and `HAB-13` currently smuggle rule-level content into records shaped for individual determinations. Handled as C8 (a `scope` field plus a reference) rather than a thirtieth record.
