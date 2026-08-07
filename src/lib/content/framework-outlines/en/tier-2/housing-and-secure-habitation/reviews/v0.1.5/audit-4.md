## Audit 4 — Habitation Type-System Minimization

Adversarially review the conceptual ontology of Housing & Secure Habitation Framework v0.1.5.

The goal is not to find missing housing topics. The goal is to determine whether the framework now has **more primitives than necessary**.

Test the necessity and distinctness of at least:

* shelter;
* habitation;
* home;
* resident;
* occupant;
* habitation claimant;
* secure-habitation interest;
* secondary household resident;
* community-based habitation interest;
* derived habitation interest;
* habitation basis;
* habitation gatekeeper;
* competing habitation claim;
* place-specific habitation interest;
* non-place-specific accommodation entitlement;
* habitation unit;
* concurrent place-specific interests.

For every concept ask:

1. Does it distinguish two situations that produce different authority, process, continuity, or remedy?
2. Could it be represented as an attribute or relation rather than a primitive?
3. Does another concept subsume it?
4. Would merging it cause any previously tested case to become ambiguous?
5. Does it smuggle in assumptions from property, family, state, contractual, or Western tenancy law?
6. Does it create substantive legal rights merely by being represented?
7. Is it needed constitutionally, or only for explanatory prose?

Especially test whether:

* derived habitation interest can be expressed entirely as habitation interest + basis graph;
* secondary household resident is a distinct status or merely factual residence plus household relation;
* community-based habitation interest is genuinely distinct from a habitation basis;
* gatekeeper is a primitive actor role or merely a relationship attribute;
* place-specific/non-place-specific is an interest type or merely a scope property;
* concurrent homes require a primitive or simply cardinality greater than one;
* habitation claimant and occupant both need canonical status.

Propose the **smallest ontology that still represents every adversarial case already encountered from v0.1 through v0.1.5**.

Do not optimize for elegance at the expense of reconstructability.

---
Claude:
# Audit 4 — Habitation Type-System Minimization

**Subject:** Housing & Secure Habitation Framework v0.1.5, §§1.3, 2.1–2.16 conceptual ontology
**Audit posture:** reductive. Determine whether the framework has more primitives than necessary.
**Validity condition applied:** the reduced ontology must represent every adversarial case encountered from v0.1 through v0.1.5. Elegance is not a defence.
**Companion:** Audit 3 (record-overlap). Cross-references to `K1`–`K9`, `B1`–`B6`, `C1`–`C8` are to that audit's kernel.

**Headline result:** of the seventeen concepts tested, **three survive as primitives**. A fourth primitive must be added that v0.1.5 uses everywhere but never names. The remaining fourteen resolve into **twelve attributes and six derived predicates**. All seventeen tested cases reconstruct; three reconstruct better than they currently do.

---

## 1. Method

Each concept is tested against the seven questions in the audit brief, but the decisive ones are 2 and 4: can it be an attribute or relation, and does merging make a previously tested case ambiguous. Questions 5 (smuggling) and 6 (rights by representation) are applied to every concept and collected separately in §5 and §6, because their findings cut across the ontology rather than attaching to single terms.

One additional test is applied throughout:

> **Absence test.** Where a concept exists to forbid an inference — "this does not imply that" — it is a *rule about a schema*, not an entity in one. Rules of this shape are frequently satisfied by the *absence* of a constraint, which cannot be represented as a primitive.

Three of the seventeen concepts turn out to be entirely of this shape.

---

## 2. The unnamed axis

v0.1.5 presents §2 as a flat list of seventeen coordinate concepts. It is not flat. Four distinct kinds of thing are being defined under one heading:

| Kind | Concepts currently listed as coordinate |
|---|---|
| **Object classes** | habitation unit; secure-habitation interest; habitation basis |
| **Condition predicates** | shelter; habitation; home; housing security |
| **Party roles** | resident; occupant; habitation claimant; secondary household resident; gatekeeper; owner/landlord/provider/operator/custodian |
| **Attributes of, or relations between, objects** | derived; community-based; place-specific; non-place-specific; competing; concurrent |

Naming this axis does most of the reduction on its own. Condition predicates are computed against a threshold; party roles are role assignments to one class; attributes and relations belong on the objects they qualify. Only the first row contains primitives.

**The framework has no named party primitive.** It defines eight terms for a person's relationship to housing — occupant, resident, habitation claimant, secondary household resident, owner, landlord, provider, operator, custodian — and never names the class those terms are roles of. This is the largest single source of ontological inflation in §2, and it is invisible because each term individually looks well-motivated.

---

## 3. Concept-by-concept verdicts

| Concept | Kind | Verdict | Replacement |
|---|---|---|---|
| Shelter | Condition predicate | Eliminate as primitive | `applicable_standard = emergency` |
| Habitation | Condition predicate | Eliminate as primitive | Unit condition ≥ jurisdictional §6 floor |
| Home | Condition predicate | **Eliminate entirely** | Nothing — prose only |
| Resident | Party role | Eliminate as primitive | `presence = durable` |
| Occupant | Party role | Eliminate as primitive | `presence ≠ none` |
| Habitation claimant | Party role | Eliminate as primitive | `recognition_status ∈ {asserted, disputed}` |
| **Secure-habitation interest** | Object class | **Retain** | — |
| Secondary household resident | Party role | **Eliminate** — see §3.2 | `instrument_relation = not_named` |
| Community-based habitation interest | Attribute | **Eliminate** — see §3.3 | `holder_type = collective` |
| Derived habitation interest | Derived predicate | **Eliminate** — see §3.4 | Computed from basis graph |
| **Habitation basis** | Object class | **Retain** (with relation-set repair) | — |
| Habitation gatekeeper | Relation attribute | **Eliminate** — see §3.5 | `basis.decision_force` |
| Competing habitation claim | Computed relation | Eliminate as primitive | Computed + trigger obligation |
| Place-specific interest | Scope attribute | **Eliminate** — see §3.6 | `scope = unit` |
| Non-place-specific entitlement | Scope attribute + obligor | **Eliminate** — see §3.6 | `scope = obligor_only` + `obligor` |
| **Habitation unit** | Object class | **Retain** | — |
| Concurrent place-specific interests | Absent constraint | **Eliminate** — see §3.7 | No uniqueness constraint on party |
| *(unnamed)* | Object class | **Add** — see §2 | **Party** |

The contested cases follow.

### 3.1 Shelter, habitation, home

These are three points on one scale, and only two of them do work.

**Shelter** is defined almost entirely negatively (§2.1): it "does not by itself establish an ordinary tenancy, permanent allocation, title, or secure-habitation interest." Its constitutional function is to mark where Housing's ordinary regime does *not* yet attach, and to hand off to DRR (§19.6). That is a scope boundary, and it belongs in §1.4 alongside the other exclusions, not in the core ontology. Structurally it is an `applicable_standard` value — §6 already contemplates emergency accommodation operating under separately defined standards.

**Habitation** (§2.2) is "occupation of a place as ordinary living space with the material conditions necessary for residence." Those material conditions are precisely the §6 minimum floor. So habitation is a **predicate computed over a unit's condition against a jurisdictional threshold** — audit 3's `K4` already records exactly this. Retain the word as a defined predicate; it is not an object.

**Home** (§2.3) does no constitutional work at all. The definition — habitation plus "a sufficiently durable... relationship to a place that loss of that place engages continuity and procedural interests" — is circular for governance purposes: continuity interests attach to the *interest*, and whether an interest exists is determined by the constituting law, not by assessing durability of attachment. Nothing in §§3, 6, 7, 8, 14 attaches a consequence to "home" that does not attach to "a place-specific habitation interest." §2.3 concedes as much ("a governance definition, not a metaphysical claim"), and open question 5 already asks whether home should be canonical.

There is a positive reason to eliminate it, not merely an absence of reason to keep it. **§2.3's durability requirement is in direct tension with §2.16.** "Sufficiently durable relationship to a place" encodes a settled-residence assumption that disadvantages exactly the nomadic, pastoralist, seasonal, and rotational patterns §2.16 was added to protect — and §2.16 then has to rescue them by a separate rule. Deleting "home" removes the tension at its source rather than patching it.

**Verdict:** eliminate `home` from the ontology. Retain `shelter` and `habitation` as defined predicates, not primitives. This resolves open Q5.

### 3.2 Secondary household resident

**Test 1 (different authority, process, continuity, remedy?)** Compare the protections:

- §3.11, factual residence without formal title: notice, opportunity to contest the asserted facts, safe handling of belongings and medicines, protection against self-help removal, handoff to emergency or replacement accommodation.
- §3.12, secondary household resident: minimum process on exclusion, loss of belongings, interruption of medication or assistive devices, emergency housing continuity.

These are the same list. The only operative difference is that in §3.12 the excluding party is a co-resident rather than an owner or provider. That is an attribute of the excluding actor, not a status of the excluded person.

**Test 5 (smuggling?)** Two problems, both serious.

First, "**secondary**" reintroduces at the person level exactly the hierarchy §2.12 abolished at the basis level. The framework's signature achievement in v0.1.4 was: *no basis is presumed superior merely because it arises from title, property law, a public authority, or because it is listed first.* Ranking one resident as primary and another as secondary on the basis of who signed a lease is the same presumption, relocated.

Second, the term is defined in terms of "**household**" — a concept §1.4 explicitly and deliberately refuses to define. The framework thereby makes a person's procedural standing depend on membership in a category it declines to specify. Open Q74 asks whether leaving household undefined created any ambiguity that routing to competent law cannot solve. This is the answer: yes, here, because the ambiguity is in Housing's own status definition rather than in an external classification.

**Replacement:** `instrument_relation ∈ {named_on_instrument, not_named, no_instrument_exists}` as an attribute of the interest. This is neutral as to hierarchy, requires no definition of household, and covers a case §2.8 currently misses — where *nobody* holds a formal instrument (informal settlement, multigenerational family occupation), so there is no primary holder for anyone to be secondary to.

**Verdict:** eliminate. This is the strongest single elimination in the audit, on smuggling grounds rather than redundancy grounds.

### 3.3 Community-based habitation interest

**Test 3 (subsumption?)** On its face, §2.12 already subsumes it: "community" is explicitly listed as a basis type. But that reading misses what §2.9 is actually claiming.

§2.9's distinctive content is *not* about the basis. It is the phrase "not adequately represented as a bundle of individual tenancies" — a claim about **who holds the interest**. The interest is constituted at collective level and distributes to persons derivatively, rather than being held by each person and aggregated.

That is a genuine and necessary distinction, and v0.1.5 can express it only through this one concept. But the right home for it is not a concept — it is an attribute of the interest's holder:

**`holder_type ∈ {person, collective}`**

Promoting this to a core attribute makes collective holding available to *every* interest rather than only to ones someone has already labelled community-based. It also retires a piece of awkward scaffolding: §2.9 currently has to carve Indigenous authority out by hand ("This category does not subsume Indigenous authority"). With `holder_type = collective` plus `constituting_authority = affected Indigenous nation`, the carve-out is structural and the prose is unnecessary.

**Test 5 (smuggling?)** §2.9 defines collective habitation *negatively against tenancy* — "not adequately represented as a bundle of individual tenancies." It anchors the non-Western case to the Western model it exists to escape. The attribute framing does not.

**Verdict:** eliminate as a primitive; promote `holder_type` to a core interest attribute. This answers open Q53 — neither a distinct record nor a relationship type within `HAB-03`, but an attribute available to all interests.

### 3.4 Derived habitation interest

The audit asks directly whether this can be expressed entirely as interest plus basis graph. **It can, completely, with no residue.**

§2.10 defines a derived interest as one "whose legal or practical basis is constituted through, or materially depends upon, one or more other relationships rather than arising solely and directly from the owner, title-holder, public allocator, or primary provider." §2.12's `conditional` relation states the same thing. The concept is therefore computable:

```
derived(I) := ∃ b ∈ bases(I) :
                b.relation ∩ {constitutive, conditional} ≠ ∅
                ∧ b.authority ∉ roles(owner, landlord, provider, allocator)
```

**Test 4 (ambiguity?)** The one thing §2.10 adds beyond the definition is its final paragraph — a routing rule: derived-interest architecture governs wherever an identifiable constituting relationship exists; §3.11's factual-residence floor applies only where none can be established. That rule is expressible as cardinality on the basis graph:

```
|bases(I)| ≥ 1  →  derived-interest architecture
|bases(I)| = 0  →  §3.11 minimum floor
```

Nothing is lost. Every v0.1.3 subtenancy, lodging, chain-lease, tied-housing, and supported-residence case reconstructs from the basis graph alone.

**Verdict:** eliminate. `derived` becomes a derived predicate, which is what it always was.

### 3.5 Habitation gatekeeper

**Test 2 (attribute or relation?)** §2.13's definition is purely negative: an actor whose decision determines habitation "without necessarily owning, leasing, allocating, funding, or physically managing the dwelling." Since §2.12 already admits bases constituted in *any* domain — employment, care, membership, migration, education, customary — a gatekeeper is simply **the constituting authority of a basis that is not the housing provider**. Computable in one line.

**Test 1 (different process?)** §3.20 requires gatekeeper decisions to route their habitation consequences. But that duty is not gatekeeper-specific: §3.15 already requires the dependency graph to be preserved when *any* basis changes, and §3.19 already prohibits loss of one basis from erasing another. §3.20 is the basis-change routing rule stated a second time for one class of basis-holder.

Audit 3 arrived at the same boundary from the record side: powers belong to the actor record (`K1`); the effect of a specific decision on a specific habitation position belongs to the edge (`K3`). Gatekeeper straddles that line, which is why `HAB-22` and `HAB-25` overlap.

**What must be preserved:** §7.9's taxonomy is genuinely useful and is genuinely about the edge — whether the external actor is recommending, determining eligibility, imposing a condition another actor must apply, exercising a binding veto, or triggering a review. Retain as `basis.decision_force ∈ {advisory, determinative, conditional, veto, review_trigger}`.

**Test 5 (smuggling?)** "Gatekeeper" presupposes a chokepoint *actor*. In customary and consensus systems the gate may be a process, a council decision, or a condition rather than an identifiable gatekeeping party. The edge-attribute framing does not require an actor to be nameable as the gatekeeper.

**Verdict:** eliminate as a primitive actor role; promote `decision_force` to a basis attribute.

### 3.6 Place-specific and non-place-specific

The audit asks whether these are interest types or a scope property. Neither, exactly — and the parallel naming conceals an asymmetry worth fixing.

**These are not two members of one category.** A place-specific habitation interest is a claim regarding a *place*. A non-place-specific accommodation entitlement is a duty owed by an *actor* — §2.14's own examples (care placement, homelessness assistance, refugee reception, disaster replacement, service accommodation, public allocation) are all programme obligations. The first has an implicit obligor supplied by the unit's owner or provider; the second has no unit and therefore needs its obligor named explicitly, or the entitlement is unenforceable.

The parallel naming implies symmetry and hides the missing field.

**Replacement:** `scope ∈ {unit, area, obligor_only}` plus a mandatory `obligor` where `scope = obligor_only`.

The middle value is not in v0.1.5 but is latent in it: §2.14's own place-specific definition already includes "locality," and managed retreat with a right of return to a region (§8.6) is an area claim, not a unit claim. Adding `area` as a scope value is not a new primitive; it is the third value of an attribute the framework already partially recognises.

**Test 4 (ambiguity?)** This reconstruction is strictly better than v0.1.5. §8.6 says a place-specific interest "gives rise to, converts into, or coexists with" a replacement-habitation entitlement — three possibilities spanning two different concept types, with no representation for the conversion itself. As a scope attribute, conversion is a single attribute transition carried by `B3`, and coexistence is two interests. The case becomes representable rather than merely described.

**Also:** §2.14's place-specific definition lists "household" as a possible referent ("a particular dwelling, room, site, household, or locality"). Second leak of the undefined concept — see §5.

**Verdict:** eliminate both as primitives; retain as `scope` + `obligor`.

### 3.7 Concurrent place-specific interests

The audit asks whether this needs a primitive or merely cardinality greater than one. It is **cardinality**, and more precisely it is the **absence of a constraint**.

§2.16 and §3.23 consist entirely of prohibited inferences: existence, use, or loss of one interest does not create, extinguish, downgrade, or prove abandonment of another; a single-primary-residence classification made for another domain does not silently redefine habitation status. These are rules about what a schema must *not* assert. The structural requirement is exactly one thing:

> The interest record carries no uniqueness constraint on `(party)`.

An absent constraint cannot be a primitive. It can only be a conformance rule, which §21 gates 32 and 33 already supply.

**Practical corollary.** §17.1's proposed field — "whether the claimant holds another concurrent place-specific habitation interest" — should be **deleted**. It is a denormalised flag that will go stale, it duplicates a query over the interest set, and it implies concurrency is exceptional and therefore worth flagging. Under the reduced ontology, concurrency is simply `count(interests where party = P and scope = unit) > 1`, computed on demand.

**Verdict:** eliminate. Retain §2.16's content as conformance rules, not as a concept.

### 3.8 Habitation basis — retained, with a type error to repair

Basis is the framework's most valuable primitive and the one that must not be traded away. But §2.12's seven relation labels contain a category error.

`additive` ("independently supports habitation alongside another basis") and `alternative` ("either of several bases can support habitation") are **not properties of a single basis**. They are properties of a *set* of bases — statements about how bases combine to be sufficient. They cannot be evaluated by inspecting one edge.

The framework had this right and lost it. §0.1's version history for v0.1.4 describes bases as "independent, conjunctive, alternative, conditional, limiting, or terminating" — the changelog carries a sufficiency structure that §2.12 flattened into per-edge labels.

**Repair:**

- `basis.relation ⊆ {constitutive, conditional, limiting, terminating, procedural}` — a **set**, not an enum, because one basis is routinely several of these at once (employment in tied housing is both constitutive and conditional).
- `interest.sufficiency` — a structure over the basis set expressing conjunctive and disjunctive support, replacing `additive` and `alternative`.

Seven per-edge labels reduce to five, plus one set-level operator. This answers open Q63 and, more importantly, makes "does habitation survive loss of this basis?" a computable question rather than a per-case judgment — which is what §3.19 needs.

---

## 4. The seven audit questions, answered in aggregate

**1. Does it distinguish two situations producing different authority, process, continuity, or remedy?** Only for interest, basis, unit, and party. Every other tested concept distinguishes situations that produce the *same* process with a different trigger — the same pattern audit 3 found at record level.

**2. Could it be an attribute or relation?** Twelve of seventeen, yes.

**3. Does another concept subsume it?** Derived ⊂ basis graph. Gatekeeper ⊂ basis authority. Occupant, resident, claimant ⊂ party + interest status. Community-based ⊂ interest holder. Competing, concurrent ⊂ interest cardinality.

**4. Would merging make a tested case ambiguous?** No — see §8. Three cases improve.

**5. Smuggling?** Eight findings — see §5. Two are serious enough to require change regardless of the reduction.

**6. Does representation create substantive rights?** Disclaimed for interest (§1.3), basis (§7.8), and unit (§15.4). **Not disclaimed for party roles** — see §6.

**7. Constitutionally needed, or explanatory prose?** Home, housing security, and the shelter/habitation gradient are explanatory. They can stay in the text; they should leave the type system.

---

## 5. Smuggled assumptions

Applying question 5 across the ontology produces eight findings, ordered by severity.

1. **"Secondary" household resident** reimposes the presumed hierarchy §2.12 abolished, and defines standing in terms of a concept §1.4 refuses to define. *Requires change regardless of the reduction.*
2. **"Primary residence" / "primary home"** appear at §13, §13.1, and §19.8 while §3.23 prohibits a single-primary-residence ontology. A direct internal contradiction. The distinction §13 actually needs — owner-occupied dwelling versus investment portfolio — is `presence = durable`, not primacy. *Requires change regardless of the reduction.*
3. **"Household" leaks** into §2.8, §2.14, §7.6, and the `HAB-02` description in §17, despite the §1.4 refusal. The refusal is right; the enforcement is incomplete.
4. **"Interest"** is Anglo-American property vocabulary implying an individually held bundle of rights. Its strain against collective holding is precisely why §2.9 exists. Translation risk in civil-law and customary systems; the definition at §1.3 is broad enough that this is a terminology flag, not a defect.
5. **§2.9 defines collective habitation negatively against tenancy** — anchoring the non-Western case to the Western model it exists to escape.
6. **"Home" (§2.3) requires durability of attachment**, a settled-residence assumption that disadvantages the mobility patterns §2.16 protects. Eliminating home removes the tension.
7. **"Unit"** is a cadastral, enumerative concept. §2.15's list stretches admirably to informal settlements, mobile units, and pastoralist sites, but the noun still implies discrete enumerable objects. Consider `habitation place`.
8. **"Gatekeeper"** presupposes a nameable chokepoint actor; customary and consensus systems may gate through a process rather than a party.

---

## 6. Rights created by representation

Question 6 applied systematically finds one gap.

| Object | Disclaimer | Location |
|---|---|---|
| Interest | Does not create title, perpetual possession, transferable asset, subsidy, compensation, or immunity | §1.3 |
| Basis | Creates no privity, tenancy, membership, care eligibility, employment, immigration status, or customary authority | §7.8 |
| Unit | Identifier is not proof of title, legality, exclusivity, priority, household membership, tax or electoral residence, or habitability | §15.4 |
| **Party / roles** | **None** | — |

v0.1.5 disclaims representational rights for all three of its object classes and none for its role vocabulary. A `roles` assignment naming an actor as landlord or provider could be read as conferring that status. The gap is currently masked because roles are scattered across §2.6 rather than gathered into one class; naming the party primitive makes it visible and makes the disclaimer necessary.

**Recommendation:** add a disclaimer parallel to the other three — recording a party's role or mandate evidences it for housing-administration purposes and does not constitute, confer, validate, or extend that role.

---

## 7. Proposed minimal ontology

**Four object classes.**

| Primitive | Why irreducible |
|---|---|
| **Party** | Person or collective. Currently unnamed; carries roles, mandates, and identity (including provisional identifiers under §3.11). |
| **Habitation unit** | Has a lifecycle independent of persons and interests (§2.15). Cannot be an attribute of interest without losing subdivision, merger, demolition, and reconstruction. |
| **Habitation interest** | The framework's primary object. Not reducible to an edge: it has recognition status, its own lifecycle, and can exist with no unit (`scope = obligor_only`). |
| **Habitation basis** | The edge. Independently constituted, has its own authority and lifecycle, may support several interests. Merging into interest reimposes the single-superior-basis model v0.1.4 abolished. |

Four is the floor. Each of the three candidate reductions to three — basis into interest, unit into interest, party into interest — destroys a case the framework earned through review.

**Twelve attributes.**

*On interest:* `recognition_status` · `holder_type` · `scope` · `obligor` · `instrument_relation` · `presence` · `exclusivity_required` · `applicable_standard` · `sufficiency` · unit reference with `B4`

*On basis:* `relation` (set) · `decision_force` · `authority` + `authority_domain`

*On unit:* identity and predecessor/successor (`B4`) · condition against the §6 floor

*On party:* `roles` · `mandates` (housing and non-housing, per `C4`)

**Six derived predicates.** Computed, never stored:

```
derived(I)      := ∃b ∈ bases(I) : b.relation ∩ {constitutive, conditional} ≠ ∅
                                   ∧ b.authority ∉ housing_roles
competing(U)    := |{I on U : I.exclusivity_required}| > 1
concurrent(P)   := |{I : I.party = P ∧ I.scope = unit}| > 1
claimant(P)     := ∃I : I.party = P ∧ I.recognition_status ∈ {asserted, disputed}
occupant(P,U)   := presence(P,U) ≠ none
resident(P,U)   := presence(P,U) = durable
```

**Result:** 17 tested concepts → 3 retained + 1 named + 12 attributes + 6 derived predicates.

---

## 8. Reconstructability check

Every adversarial case from v0.1 through v0.1.5, tested against the reduced ontology.

| Case (origin) | Reconstruction |
|---|---|
| Subtenant, superior tenancy ends (v0.1.3) | Basis terminated; remaining bases evaluated against `sufficiency`; `derived` recomputed |
| Landlord insolvency and creditor sale (v0.1.1) | Interest unchanged; party `roles` transfer; ownership basis transitions via `B3` |
| Constructive eviction by deferred maintenance (v0.1.1) | Unit condition below §6 floor; party `mandates` retain repair duty |
| Exclusion of non-named resident after bereavement (v0.1.2) | `instrument_relation = not_named`, `presence = durable`; excluding party is a co-resident |
| Community or customary termination (v0.1.3) | Basis with `authority_domain = customary`, `relation ⊇ {constitutive, terminating}`, `decision_force = determinative` |
| Tied housing, employment ends (v0.1.4) | Basis `{constitutive, conditional}`, authority = employer; `sufficiency` determines survival |
| Care-placement change used as sanction (v0.1.2) | Party with dual `mandates` per `C4`; housing consequence needs a separate decision |
| Shared-custody child (v0.1.5) | Two interests, same party, `scope = unit`; no uniqueness constraint |
| Pastoralist multi-site residence (v0.1.5) | *n* interests, `scope = area` where the claim is not unit-bounded |
| Rebuilt structure on same footprint (v0.1.5) | Unit transition via `B3`/`B4`; interest existence unaffected |
| Post-conflict competing claims (v0.1.1) | Two interests, `exclusivity_required`; `competing(U)` triggers `K8` |
| Identity-light claimant (v0.1.3) | Party with provisional identifier; interest at `asserted` |
| Managed retreat, return impossible (v0.1.1) | Interest `scope` transitions `unit → obligor_only` with obligor named |
| Informal settlement, no instrument (v0.1) | `instrument_relation = no_instrument_exists`, zero bases → §3.11 floor |
| Hotel guest, transient presence (§4) | `presence = transient`, no interest |
| Tourism conversion of occupied dwelling (v0.1.2) | Unit use transition; interests on unit trigger decisions |
| Indigenous residence relationship (§3.7) | `holder_type = collective`, authority = Indigenous nation, `housing_review = none` |

All seventeen reconstruct. Three reconstruct **better** than in v0.1.5:

- **Exclusion of a non-named resident** no longer requires first deciding that the person belongs to a "household" — a determination Housing has no definition for.
- **Managed retreat** gains a representation for the conversion §8.6 describes, which currently spans two concept types with no transition object.
- **Indigenous residence** needs no hand-written carve-out; the holder and authority attributes do the work §2.9's second paragraph does in prose.

---

## 9. Gaps created, and the constraints that close them

Concept multiplicity was performing undeclared work. Four constraints are required, extending audit 3's `C1`–`C8`.

**C9 — Emergency standard must be explicit.** Eliminating `shelter` removes the marker distinguishing emergency accommodation from ordinary habitation. `applicable_standard ∈ {ordinary_floor, emergency}` must be mandatory on any interest or continuity plan, and §6's ratchet rule — durable outcomes return to the ordinary floor after any justified emergency period — must reference it. Without C9 the §6 anti-ratchet protection has nothing to attach to.

**C10 — Competing-claim detection must be automatic.** `competing(U)` is computed, and a computed state that nobody computes is not a protection. Creating or recognising a second `exclusivity_required` interest on one unit must open a `K8` adjudication referral. Same failure shape as `C5` and `C6`.

**C11 — Presence threshold must be published.** `presence = durable` replaces the resident/occupant distinction, and §3.11's minimum process depends on it. The adopting jurisdiction must publish the threshold, as §2.4 already contemplates ("subject to jurisdiction-specific rules"). An unpublished threshold makes the §3.11 floor unreviewable.

**C12 — Party roles and mandates are declarative.** Add the missing disclaimer from §6 above.

**One pre-existing gap surfaced, not created.** `holder_type = collective` raises the question of who represents a collective for notice, challenge, and remedy purposes. v0.1.5 does not answer this either — §2.9 and §3.7 both leave collective representation to the collective's own authority, which is correct as to substance but leaves Housing without an addressee for `B2` notice. Flag for v0.2 alongside open Q57 and Q58; it is not a regression introduced by this reduction.

---

## 10. Recommendations for v0.2

1. **Name the party primitive.** Gather §2.4, §2.5, §2.6, and §2.8 into one class with `roles`, `presence`, and `mandates`. This alone removes eight terms.
2. **Delete `home` from the ontology** (resolves Q5) and retire "primary residence" and "primary home" from §13, §13.1, and §19.8 as contradicting §3.23.
3. **Replace "secondary household resident" with `instrument_relation`.** Highest-priority change in this audit: it removes the framework's one remaining presumed hierarchy and closes the largest `household` leak.
4. **Promote `holder_type` to a core interest attribute** (resolves Q53) and retire §2.9 and its Indigenous carve-out paragraph.
5. **Repair §2.12's relation labels:** five relations as a set, plus a set-level `sufficiency` operator (resolves Q63, and makes §3.19 computable).
6. **Collapse `derived`, `gatekeeper`, `competing`, `concurrent`, `place-specific`, and `non-place-specific` into attributes and derived predicates**, and add `area` as the third `scope` value.
7. **Delete §17.1's concurrent-interest flag.** Query the interest set instead.
8. **Complete the `household` audit:** §2.8, §2.14, §7.6, §17 `HAB-02`. The §1.4 refusal is correct and should be enforced everywhere.
9. **Adopt `C9`–`C12`** alongside audit 3's `C1`–`C8`.

**Consistency check with audit 3.** The two reductions compose without conflict, which is some evidence both are right. Audit 3's kernel records map onto audit 4's primitives cleanly: `K1` is the party record, `K2` the interest record, `K3` the basis record, `K4` the unit-condition record. `K5`–`K9` are process records operating over those four classes rather than new object types. Where the two audits touch the same seam — `HAB-22`/`HAB-25` in audit 3, gatekeeper in audit 4 — they resolve it the same way: **powers on the actor, effects on the edge.**

Together the two audits reduce v0.1.5 from 29 records and 17 concepts to **9 records, 6 shared blocks, 4 primitives, 12 attributes, and 6 derived predicates**, against twelve conformance constraints.

---

Audit 3 gave me the record architecture; this one tests the concepts underneath it. Let me work through all seventeen against the seven questions.Result: **three of seventeen concepts survive as primitives**, plus a fourth the framework uses constantly but never names.

The findings I'd flag before you read it:

**§2 is not a flat list.** It defines four different kinds of thing — object classes, condition predicates, party roles, and attributes — under one heading, presented as coordinate. Naming that axis does most of the reduction automatically.

**There is no party primitive.** The framework has eight terms for a person's relationship to housing (occupant, resident, claimant, secondary household resident, owner, landlord, provider, operator, custodian) and never names the class they are roles of. Largest single source of inflation, and invisible because each term looks well-motivated on its own.

**"Secondary household resident" should go on smuggling grounds, not redundancy grounds.** Two problems: "secondary" reimposes at the person level exactly the presumed hierarchy §2.12 abolished at the basis level, and the term defines procedural standing in terms of "household" — which §1.4 explicitly refuses to define. That answers open Q74: yes, ambiguity was created, and it's inside Housing's own status definition rather than in an external classification.

**Deleting "home" resolves a live tension rather than just removing dead weight.** §2.3's "sufficiently durable relationship to a place" encodes a settled-residence assumption that disadvantages precisely the pastoralist, seasonal, and rotational patterns §2.16 was added to protect — so §2.16 has to rescue them separately.

**§2.12 has a category error.** `additive` and `alternative` aren't properties of a single basis; they're properties of a *set* of bases and can't be evaluated by inspecting one edge. Your own v0.1.4 changelog had this right ("independent, conjunctive, alternative...") and §2.12 flattened it. Five relations as a set, plus a set-level sufficiency operator — which also makes §3.19 computable rather than a per-case judgment.

**One direct internal contradiction:** §13, §13.1, and §19.8 use "primary residence"/"primary home" while §3.23 prohibits a single-primary-residence ontology. The distinction §13 actually needs is durable presence, not primacy.

The two audits compose — audit 3's `K1`–`K4` map onto audit 4's four primitives, and where they touch the same seam (`HAB-22`/`HAB-25`; gatekeeper) they resolve it identically: powers on the actor, effects on the edge.
