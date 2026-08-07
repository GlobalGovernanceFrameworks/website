# Housing & Secure Habitation Framework v0.2 — Consolidation Regression Audit v0.1

**Status:** Controlled regression audit; does not amend the framework  
**Date:** 2026-08-08  
**Target:** Housing & Secure Habitation Framework v0.2  
**Target SHA-256:** `10c197c1f7faf2ce91219838fc420423fe354ebf607b88bd48d12357675dc62a`  
**Consolidation basis:** Pre-v0.2 Consolidation Synthesis v0.1  
**Synthesis SHA-256:** `3568aabb1e75244de53eaaf9bab2fdf20666ae9b3f63c8f8674cac8791415a63`  
**Audit posture:** adversarial regression test of the v0.1.5 → v0.2 reduction  
**Question:** Did the consolidation lose any representation, authority, causal continuity, challenge, continuity-duty, or closure function that the v0.1 series had earned?

> **Headline verdict:** **PASS WITH THREE PRE-SCHEMA CORRECTIONS.**  
> The four-object / nine-profile / six-block consolidation survives the earned-case regression set. No removed `HAB-*` record needs to be restored and no new canonical primitive or topic-specific record is justified. Two small record-design omissions should be repaired before schema wiring, and one schema-shape axis promised by the synthesis should be restored. Two further wording cleanups are recommended but are not blockers.

---

# 1. Audit basis and method

## 1.1 Frozen audit inputs

| Source | SHA-256 |
|---|---|
| Housing & Secure Habitation Framework v0.2 | `10c197c1f7faf2ce91219838fc420423fe354ebf607b88bd48d12357675dc62a` |
| Pre-v0.2 Consolidation Synthesis v0.1 | `3568aabb1e75244de53eaaf9bab2fdf20666ae9b3f63c8f8674cac8791415a63` |
| Audit 1 — Unit Lifecycle | `1eab18b93658bff98bfe73e01fc6031351114e18d02c3e02430f00d01d5709e0` |
| Audit 2 — Concurrent Homes | `9c59705f76d68c1b7e7e6586e1eef02ca5e36db88c8d4243107c75734748e6a0` |
| Audit 3 — Record Overlap/Lifecycle | `7e31130ebb4d68932c4da3528253b01a819603cd1ad9a6f17fb7ac44ffb1ec52` |
| Audit 4 — Type-System Minimization | `3804bc3209e8c9caeb696d2eb9e36aefbbd354fd4d6db6bd6bde6d73adde2612` |
| Audit 5 — Interface/Authority | `f4fbf1715f3f4aae1602d1934f8e7154c25d9d17d1d16c363482a12199ba8a0f` |

This audit evaluates the target as written. It does not silently repair a missing rule by assuming the schema will later do so.

## 1.2 Regression criteria

A v0.2 reduction fails if an earned case can no longer reconstruct, at minimum:

1. **authority** — who may act and from what source;
2. **reason/rule** — why the act is lawfully available;
3. **affected habitation object** — Party, Unit, Interest, Basis as relevant;
4. **causal continuity** — what changed and what survived;
5. **notice/challenge** — where required;
6. **continuity consequence** — repair, shelter, replacement, handoff, or explicitly no duty;
7. **closure/unresolved duty** — without treating referral as discharge;
8. **non-manufacture** — representation or handoff does not create substantive authority.

Findings are classified as:

- **PASS** — no regression;
- **PASS WITH NOTE** — reconstructable, but an explicit schema/prose rule should be tightened;
- **RECORD-DESIGN REGRESSION** — the conceptual model survives but the reduced record architecture cannot faithfully represent a required state;
- **AUTHORITY REGRESSION** — consolidation makes Housing perform or imply a decision belonging elsewhere;
- **REPRESENTATION REGRESSION** — a previously supported arrangement no longer fits the object model;
- **KNOWN RELEASE BLOCKER** — already acknowledged by v0.2; not caused by consolidation.

---

# 2. Executive findings

## F1 — K8 cannot yet explicitly represent “no adjudicator exists”

**Classification:** RECORD-DESIGN REGRESSION  
**Severity:** **Pre-schema blocker**  
**Does it require a new record or primitive?** No.

Audit 3 deliberately retained K8 as a distinct profile under the **absence test**: the failure “no adjudicator has been identified” must remain countable. If adjudication referral were merely a subtype of another record, an implementation with no adjudication route could look structurally complete.

v0.2 preserves K8 and correctly says that competing claims must name a competent adjudicator. It also states elsewhere that missing owners become gaps. But K8 itself does not say how to represent the state in which:

- competing claims exist;
- the need for adjudication is established;
- **no competent adjudicator exists or can be identified**.

This matters in weak-state, customary/state overlap, post-conflict, succession, and informal-tenure cases.

### Required correction

K8 should be openable even when the adjudicator is absent.

Add a field or equivalent semantics such as:

`adjudication_owner_status ∈ {identified, disputed, unallocated}`

with:

- `identified` → record the competent adjudicator;
- `disputed` → preserve candidate authorities and route authority allocation under the applicable CIS/GMEAIA process;
- `unallocated` → K8 remains open and creates/references K7 constitutional/interface-gap custody rather than disappearing.

The crucial invariant is:

> **The absence of an adjudicator is representable inside the adjudication profile; it is not a reason not to instantiate the profile.**

This restores the exact absence-test property that justified K8's survival in Audit 3.

---

## F2 — `scope = obligor_only` does not make the obligor relation mandatory enough

**Classification:** RECORD-DESIGN REGRESSION / UNDERSPECIFICATION  
**Severity:** **Pre-schema blocker**  
**Does it require a new record or primitive?** No.

Audit 4's reduction of place-specific versus non-place-specific claims depended on an asymmetry:

- a unit-scoped claim points to a place;
- a non-place-specific accommodation entitlement is fundamentally a **duty owed by an actor**.

The audit therefore required an obligor where the interest has no Unit.

v0.2 correctly introduces:

- `unit`;
- `area`;
- `obligor-only`;

scope, and K2 lists “Unit/area/obligor reference.” But it does not state a hard invariant equivalent to:

`scope = obligor_only ⇒ obligor relation required`.

Without that rule, an `obligor_only` interest can become a free-floating entitlement with no duty-holder — the exact loss of enforceability the reduction was intended to avoid.

A further nuance is needed for cases where the obligor itself is disputed or genuinely absent.

### Required correction

Define an **obligor relation**, not merely an optional identifier:

`obligor_status ∈ {identified, disputed, unallocated}`

and require it whenever `scope = obligor_only`.

- `identified` → name the Party/source of duty;
- `disputed` → preserve candidate duty-holders and route allocation;
- `unallocated` → preserve the asserted interest while opening/referencing K7/GMEAIA gap handling.

This is preferable to requiring a fake named obligor when the institutional failure is precisely that no owner exists.

The invariant should be:

> **A non-place-specific accommodation entitlement may lack a resolved obligor, but it may not lack an explicit obligor state.**

---

## F3 — The register / case / event axis disappeared during drafting

**Classification:** RECORD-DESIGN OMISSION  
**Severity:** **Schema-design blocker; not a conceptual blocker**  
**Does it require a new record or primitive?** No.

Audit 3 found that v0.1.5 mixed:

1. standing/register-like records;
2. case/relationship records;
3. event records.

Naming that axis was one reason the audit could safely demote `HAB-04`, `HAB-08`, and `HAB-29` to shared blocks rather than independent records.

The controlled synthesis explicitly carried this distinction into the proposed v0.2 record architecture.

The current v0.2 defines K1–K9 and B1–B6 but never explicitly names the record-shape axis.

Nothing in the earned case set becomes unreconstructable because of this omission. However, the omission matters at schema time because an implementer could treat:

- K1 Authority & Mandate;
- K2 Habitation Interest;
- K5 Consequential Decision;

as three interchangeable persisted “case records,” recreating the layer confusion the reduction was intended to remove.

### Required correction

Add a short section before or within §13:

**Record shape is orthogonal to function.**

At minimum distinguish:

- **standing/profile state** — durable description of a Party, Interest, Basis, or authority configuration;
- **case/lifecycle state** — an ongoing matter that may accumulate decisions, plans, handoffs, remedies;
- **event/decision** — a time-bounded consequential act or transition.

Suggested default classification:

| Profile | Dominant shape |
|---|---|
| K1 | standing/profile |
| K2 | standing relationship / case object |
| K3 | standing relation/edge with lifecycle |
| K4 | observation/snapshot, optionally longitudinal |
| K5 | event/decision |
| K6 | case/plan |
| K7 | case/handoff lifecycle |
| K8 | case/referral |
| K9 | case/remedy |

B1–B6 remain embedded semantic blocks, never independent case types merely because they have fields.

The exact storage implementation remains local.

---

## F4 — “primary instrument” leaves a small hierarchy residue

**Classification:** TERMINOLOGY / ONTOLOGY CLEANUP  
**Severity:** Non-blocking

Audit 4 eliminated “secondary household resident” because “secondary” imported a hierarchy based on who happened to be named on a formal instrument.

v0.2 correctly replaces that status with formal-instrument relation, but two passages still use **“primary instrument.”**

No operative rule depends on that adjective, so this does not break the model. It nevertheless reintroduces a hint of the hierarchy the consolidation deliberately removed.

### Recommended correction

Replace:

> primary instrument

with:

> relevant formal instrument

or:

> applicable habitation instrument

throughout the normative text.

---

## F5 — The `derived` predicate is still phrased around owner/provider as the reference case

**Classification:** ONTOLOGY WORDING CLEANUP  
**Severity:** Non-blocking

The synthesis explicitly cautioned that the derived predicate should not treat title or landlord/provider relations as the natural root.

v0.2 defines a derived interest as one that depends on bases rather than being “wholly represented as a direct owner/provider relationship.”

That is intelligible but subtly restores owner/provider as the comparison baseline.

No authority, record requirement, or remedy depends on the `derived` label in v0.2, so this is not a representation failure.

### Recommended correction

Either:

1. keep `derived` as human-facing diagnostic prose only; or
2. define it graph-theoretically, e.g.:

> **Derived:** an interest whose existence or continuation depends materially on an independently constituted upstream relationship or basis distinct from the direct constituting relation recorded for that interest.

Do not use “direct owner/provider” as the canonical zero point.

---

# 3. Structural reduction regression tests

## 3.1 Four canonical object classes

| Object | Survives? | Regression result |
|---|---|---|
| Party | Yes | PASS |
| Habitation Unit | Yes | PASS |
| Habitation Interest | Yes | PASS |
| Habitation Basis | Yes | PASS |

The reduction has not collapsed:

- Party into Interest;
- Unit into Interest;
- Basis into Interest.

That preserves the three separation properties Audit 4 identified as irreducible.

## 3.2 Former primitives now represented as roles/attributes/predicates

| v0.1 concept | v0.2 representation | Result |
|---|---|---|
| resident | presence threshold / derived predicate | PASS |
| occupant | factual presence | PASS |
| claimant | asserted/disputed Interest | PASS |
| secondary household resident | instrument relation + presence + bases | PASS |
| community-based interest | collective Party + Basis/authority | PASS |
| derived interest | predicate over basis structure | PASS WITH F5 |
| gatekeeper | Basis authority + decision force | PASS |
| competing claims | computed conflict + K8 trigger | PASS WITH F1 |
| place-specific claim | `scope=unit` or `scope=area` | PASS |
| non-place-specific entitlement | `scope=obligor_only` | PASS WITH F2 |
| concurrent homes | cardinality/no uniqueness constraint | PASS |
| home | prose only | PASS |
| shelter | emergency/transitional standard | PASS |
| habitation | factual/condition predicate | PASS |

## 3.3 Nine functional profiles

All nine functions remain distinct:

- K1 authority/mandate;
- K2 interest;
- K3 basis/dependency;
- K4 condition;
- K5 decision;
- K6 continuity/obligation;
- K7 duty custody/handoff;
- K8 adjudication referral;
- K9 challenge/remedy.

The high-risk separation tests survive:

- K1 ≠ K2;
- K2 ≠ K3;
- K5 termination notice ≠ K5 compulsory-loss authorization;
- K7 ≠ K8;
- K9 remains independently visible.

**Result:** PASS WITH F1/F3.

## 3.4 Six shared blocks

B1–B6 all survive:

- B1 data purpose;
- B2 notice/process;
- B3 transition;
- B4 Unit identity;
- B5 interim protection;
- B6 belongings/support continuity.

B3 successfully replaces the topic-specific status-transition record without losing causal continuity.

**Result:** PASS.

## 3.5 C1–C12

All twelve conformance constraints appear in v0.2.

Important regression protections are retained:

- GMEAIA-governed duty closure;
- decision-stage separation;
- validity-bearing notice;
- non-housing mandate declaration;
- degradation → planning;
- transition referential integrity;
- continuity without Unit;
- general-vs-individual distinction;
- non-null habitation standard;
- competing-claim trigger;
- published factual-residence threshold;
- declarative Party roles.

**Result:** PASS.

---

# 4. Earned-case reconstruction matrix

The following matrix tests the explicit v0.2 §15.5 regression set plus the core cases used in Audits 3–4.

| Case | v0.2 reconstruction | Authority | Challenge | Continuity / closure | Verdict |
|---|---|---|---|---|---|
| Applicant screening denial | Party + K2/asserted application context + K5 `access/screening` + B1/B2 + K9 | provider/screener under external/general rule | §7.3 + K9 | denial reason/correction visible | **PASS** |
| Factual resident without civil ID | Party provisional ID + K2 asserted/factual interest + published presence threshold | local Housing/process law | §4.1–4.3 + K9 | identity gap does not erase case | **PASS** |
| Non-named resident exclusion | K2 with instrument relation `not_named` + presence + K5 exclusion + B6 + K6/K9 as needed | competent housing/family/justice authority | §7.9 | no forced co-residence; alternative continuity visible | **PASS** |
| Multi-basis cooperative tenancy | K2 Interest + several K3 Bases; one basis may be membership/nominating force | tenancy authority + cooperative authority remain separate | source-domain route + K9 for Housing act | other bases survive unless competent law says otherwise | **PASS** |
| Tied housing after job loss | K3 employment basis + §10.7; K5 only if separate Housing act required | labour law/employer vs Housing termination owner | source-domain + Housing review | K6 if loss creates continuity duty | **PASS** |
| Care-linked room licence + accommodation duty | unit-scoped Interest can end while `obligor_only` entitlement persists; K1 mixed mandates + K3 care basis | care authority vs room/licence authority | care route + Housing route | K6 can exist without Unit | **PASS WITH F2** |
| Owner insolvency / creditor sale | §3.3 no disappearance + §9.6 + K6/K7; K5/K9 where lawful termination occurs | external insolvency/property law | local court/review | resident interests remain visible; successor/relocation/remedy exposed | **PASS** |
| Constructive eviction via deferred maintenance | K4 condition + §8.5 + K6; K5 closure where authorized; K9 causation/remedy | standards/safety authority; Housing tribunal for housing-loss purpose | K9 | closure does not erase repair/relocation/liability | **PASS** |
| Post-conflict competing claims | multiple K2 Interests + K8 + B5/B6 + K6 | competent restitution/justice/customary adjudicator | K8/K9 as applicable | losing physical-place claim can route separately | **PASS WITH F1 if no adjudicator exists** |
| Customary/community termination | K3 customary basis + K5 external termination consequence + K6/K7 | customary/Indigenous/community authority | source-domain review; Housing does not rank validity | downstream duty preserved separately | **PASS** |
| Tourism conversion | Unit B3/B4 transition + K5 conversion/termination + K6 + B1 | tourism/land-use authority + separate Housing authority | K9 | residents do not disappear when use changes | **PASS** |
| Slow-onset climate degradation | K4 trajectory + C5 → K6 | hazard/infrastructure authority; later relocation authority | planning/challenge routes remain separate | indicator does not execute relocation | **PASS** |
| Managed retreat | unit-scoped Interest may transition/coexist with area/obligor-only Interest; B3 + K6 | competent retreat/safety/ecological authority | K9 as applicable | anti-ratchet durable floor retained | **PASS WITH F2 for unresolved obligor** |
| Succession/status transition | one K2 lifecycle + B3, not close/reopen | succession/family/tenancy authority | external adjudication + K9 as applicable | causal continuity preserved | **PASS** |
| Unit subdivision | Unit predecessor → multiple successors via B3/B4; Interests remain linked | external registry/planning authority where available | unresolved claim can reach K8 | link ≠ right | **PASS** |
| Unit merger | multiple predecessor Units → one successor | same | same | many-to-one supported | **PASS** |
| Demolition/rebuild | Unit B3/B4; same-dwelling question remains adjudicatory | competent external law/adjudicator | K8 if contested | Interest existence not decided by rebuild alone | **PASS WITH F1 if adjudicator absent** |
| Informal-settlement reconfiguration | local Unit references + Housing-purpose-linkage mode | community/local authority where constituted | Housing/justice route | no cadastre required; Housing link disclaimed outside purpose | **PASS** |
| Shared-custody child with two homes | two K2 Interests for same Party; no uniqueness constraint | each source instrument/family law | local routes | absence from one ≠ abandonment | **PASS** |
| Seasonal/pastoralist multi-site residence | multiple Unit interests and/or area-scoped Interest + recurring presence | customary/local law | source-domain route | seasonal absence ≠ abandonment | **PASS** |
| Subtenant loses one of several bases | K3 basis transition; K2 remains; sufficiency reevaluated | applicable tenancy/contract law | Housing/source challenge | other bases not silently erased | **PASS** |
| Hotel guest / transient presence | Party may be occupant with transient presence but no Interest unless competent source creates one | hospitality/contract law | applicable external route | no accidental tenancy | **PASS** |
| Collective/Indigenous residence | collective Party + K2 + K3 Indigenous/customary basis + §3.12 + §6.7 | affected Indigenous authority | representation determined by constituting authority | notice/challenge addressee now explicit | **PASS — improved from v0.1.5** |

### Aggregate

- **Representation regressions:** 0
- **Authority regressions:** 0
- **Record-design regressions/underspecifications:** 3
- **Cases requiring restoration of a legacy `HAB-*` type:** 0
- **Cases requiring a new canonical primitive:** 0
- **Cases requiring a new Housing policy module:** 0

---

# 5. Regression of the Audit-5 corrections

## 5.1 Migration-status circularity

v0.1.5 risked making ordinary Housing conditions apply only “once legally applicable,” allowing status law to switch the condition floor off.

v0.2 requires every factual accommodation state relevant to Housing to carry an ordinary or emergency/transitional standard and explicitly rejects `applicable_standard = none`.

**Verdict:** **PASS — corrected.**

## 5.2 Building-code authority creep

v0.2 makes the Housing floor an **outcome floor** and leaves technical code, inspection powers, permits, engineering methods, and enforcement to competent technical authorities.

**Verdict:** **PASS — corrected.**

## 5.3 Mortgage / secured-credit / insolvency ownership

v0.2 explicitly treats general mortgage, banking, secured-credit, foreclosure, insolvency, and receivership as external-law dependencies and no longer pretends Financial Systems owns them.

**Verdict:** **PASS — corrected.**

## 5.4 Energy ownership

v0.2 identifies Climate & Energy / Conduit and other competent infrastructure owners rather than treating energy as ownerless.

**Verdict:** **PASS — corrected.**

## 5.5 Affordability

v0.2 explicitly declares affordability a **monitored distributed outcome**, with Housing owning diagnosis and resident consequences rather than all instruments.

**Verdict:** **PASS — ambiguity resolved without creating an affordability sovereign.**

## 5.6 Civil registration

v0.2 preserves purpose-limited claimant identity, explicitly states that the wider dependency remains unresolved, and does not let Housing become a civil registry.

**Verdict:** **PASS — dependency remains visible.**

## 5.7 Unratified handoffs

v0.2 distinguishes a Housing-side interface offer from reciprocal adoption and says a handoff is not live merely because Housing names it.

**Verdict:** **PASS — corrected.**

## 5.8 Capacity versus constitutional gap

v0.2 explicitly states that capacity/performance failure is distinct from absence of lawful authority/mandate and delegates the response vocabulary to GMEAIA.

**Verdict:** **PASS — corrected, subject to the already acknowledged GMEAIA source-verification blocker.**

---

# 6. Known blockers that are not regressions

These are real release tasks but should not be misclassified as consolidation failures.

## 6.1 Canonical GMEAIA verification

v0.2 explicitly blocks controlled schema release until `GMEAIA/0.2.1` is locally verified and its state/closure semantics confirmed.

**Classification:** KNOWN RELEASE BLOCKER.

## 6.2 Final schema field names

The prose deliberately leaves exact enum/property names provisional.

**Classification:** KNOWN SCHEMA TASK.

## 6.3 Reciprocal interface migration

Many counterparties exist but have not yet adopted/verified Housing receiving clauses.

**Classification:** KNOWN INTERFACE MIGRATION TASK.

## 6.4 Residential-care canopy completeness

Housing can represent mixed care/accommodation and avoid power creep, but the wider GGF may still lack a comprehensive residential-care owner.

**Classification:** KNOWN ORPHAN-AUDIT CANDIDATE, not a Housing regression.

## 6.5 Civil registration / legal identity

The dependency remains unresolved by design.

**Classification:** KNOWN CANOPY-AUDIT CANDIDATE, not a Housing regression.

---

# 7. Recommended bounded patch before schema wiring

The audit does **not** recommend reopening the architecture.

A bounded successor patch should contain only:

## Required

### P1 — K8 missing-adjudicator state
Make K8 instantiable when adjudication ownership is disputed or absent and route the unresolved owner state into K7/GMEAIA.

### P2 — Mandatory obligor state for `obligor_only`
Require an identified/disputed/unallocated obligor relation whenever an Interest is `obligor_only`.

### P3 — Restore the register/case/event shape axis
Name record shape as orthogonal to K-profile function and classify B1–B6 as embedded blocks, not standalone cases.

## Recommended cleanup

### P4 — Replace “primary instrument”
Use “relevant formal instrument” or equivalent.

### P5 — De-center owner/provider in the `derived` predicate
Either make `derived` prose-only or define it graph-theoretically.

No additional topic-specific `HAB-*` profile is warranted.

---

# 8. Suggested version decision

The current target is already labelled v0.2 and has a controlled digest.

Because P1 and P2 affect schema semantics rather than merely typography, the existing artifact should remain immutable.

Recommended successor:

> **Housing & Secure Habitation Framework v0.2.1 — consolidation regression patch**

v0.2.1 should be narrowly limited to P1–P5 plus any direct consistency edits those changes require.

After that:

1. verify GMEAIA canonical source;
2. run a **schema translation**, not another prose expansion;
3. reconstruct the 20-case set against the schema;
4. only then wire the framework into the GGF cluster.

---

# 9. Final verdict

The consolidation succeeded.

The strongest v0.1 discoveries remain representable after the reduction:

- factual residence without title;
- identity-light standing;
- non-named residence;
- multi-basis habitation;
- tied and care-linked housing;
- insolvency and creditor sale;
- constructive eviction;
- customary and Indigenous authority;
- competing claims;
- tourism conversion;
- slow climate degradation;
- managed retreat;
- succession;
- Unit transformation;
- multiple legitimate homes.

No removed topic-specific record turns out to have been secretly indispensable.

The principal regression is narrower and more encouraging:

> **v0.2 occasionally describes the positive case better than the negative case.**

It knows how to represent an identified adjudicator but not yet “no adjudicator exists.” It knows how to represent an accommodation entitlement but does not yet force the obligor relation to be explicit. And it preserves the functional kernel but omits the record-shape axis that tells implementers what kind of thing each profile is.

Those are exactly the sort of defects a successful consolidation should expose.

They can be repaired without restoring the v0.1 ontology or record proliferation.

> **Audit decision: PASS WITH THREE PRE-SCHEMA CORRECTIONS. No architectural rollback.**
