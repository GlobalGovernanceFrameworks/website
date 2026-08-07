## Final Synthesis — v0.2 Consolidation Decision

After the five audits above are complete, review their findings together.

Do not reopen the housing-policy design space.

For every proposed change, identify which audit finding requires it and classify the change as:

* retain;
* clarify;
* merge;
* demote to implementation guidance;
* convert to interface;
* remove;
* unresolved dependency;
* genuinely new primitive required.

Then propose a v0.2 spine optimized for:

1. minimum ontology;
2. explicit authority;
3. reconstructable lifecycle;
4. low-capacity implementability;
5. cross-framework interoperability;
6. no silent policy or jurisdiction creation.

Prefer deletion and consolidation over addition.

A concept, section, or `HAB-*` record earns structural weight only if removing it causes a demonstrated representation, authority, lifecycle, or remedy failure.

The final output should include:

* proposed v0.2 section structure;
* canonical concepts retained;
* canonical HAB record kernel;
* optional/domain-profile records;
* interfaces retained;
* provisions to remove or merge;
* unresolved dependencies that must remain visible;
* any finding serious enough to block schema wiring.

---

# Housing & Secure Habitation Framework — Pre-v0.2 Consolidation Synthesis v0.1

## Controlled bridge from the v0.1 discovery series to the v0.2 consolidation release

**Status:** Controlled synthesis for drafting; not itself a normative Housing framework  
**Revision:** SYNTHESIS/0.1  
**Date:** 2026-08-08  
**Responsible:** Global Governance Frameworks initiative  
**Canonical Housing predecessor:** Housing & Secure Habitation Framework v0.1.5  
**Predecessor SHA-256:** `a3c43cb5a36863a451699a600ab8621a1666d7b01c23c20ccb0263f5712a2dd5`  
**Constitutional interface target:** Constitutional Interface Specification `CIS/0.2.3`  
**Lifecycle interface target:** Governance Method, Experiment, Adoption, and Implementation Authority Interface Specification `GMEAIA/0.2.1`, subject to canonical-file verification before the controlled v0.2 release  
**Authority effect:** None. This document records drafting decisions, reductions, unresolved dependencies, and schema-readiness conditions. It creates no housing, property, fiscal, care, justice, planning, registry, or enforcement authority.

> **Purpose of this synthesis:** The v0.1 series was an object-discovery and falsification cycle. v0.2 is not another expansion round. This synthesis freezes which discoveries survive, which concepts and `HAB-*` records are demoted or merged, which interface findings were genuine, which audit premises were corrected by the current GGF corpus, and what must be true before v0.2 is wired into the schema.

---

# 0. Source preservation, scope, and decision rules

## 0.1 Frozen decision basis

This synthesis is based directly on the following files:

| Source | Role | SHA-256 |
|---|---|---|
| Housing & Secure Habitation Framework v0.1.5 | Canonical predecessor | `a3c43cb5a36863a451699a600ab8621a1666d7b01c23c20ccb0263f5712a2dd5` |
| Audit 1 — Habitation-Unit Lifecycle Falsification | Unit/place lifecycle stress test | `1eab18b93658bff98bfe73e01fc6031351114e18d02c3e02430f00d01d5709e0` |
| Audit 2 — Concurrent Homes Falsification | Multiple-home stress test | `9c59705f76d68c1b7e7e6586e1eef02ca5e36db88c8d4243107c75734748e6a0` |
| Audit 3 — HAB Record-Overlap and Lifecycle Audit | Record/function reduction | `7e31130ebb4d68932c4da3528253b01a819603cd1ad9a6f17fb7ac44ffb1ec52` |
| Audit 4 — Habitation Type-System Minimization | Ontology reduction | `3804bc3209e8c9caeb696d2eb9e36aefbbd354fd4d6db6bd6bde6d73adde2612` |
| Audit 5 — Interface and Authority Ownership Audit | Gemini + Claude interface/authority audit | `f4fbf1715f3f4aae1602d1934f8e7154c25d9d17d1d16c363482a12199ba8a0f` |

The five audits are **recommendations, not authorities**. Where an audit premise conflicts with the current repository or a controlled shared specification, this synthesis records the correction rather than reproducing the premise.

## 0.2 Supplemental corpus verification used to reconcile Audit 5

The following local materials were consulted only to verify current GGF ownership and shared-interface claims:

| Source | Verification use | SHA-256 |
|---|---|---|
| Constitutional Interface Specification v0.2.3 | GMEAIA ownership boundary; response/lifecycle delegation; constitutional interface | `e6ec294bbce0994a0d2c609a95bd6a392e87abe34e8812fe0c5a958851810dc4` |
| Meta-Governance v1.6 | Adoption of GMEAIA v0.2.1; controlled response states and lifecycle role | `cf1cd81a681b6b94ef4107cee35dfdabb3a991f6472c75d87fa7218a229466ba` |
| Nested Economies v3.3 | GMEAIA v0.2.1 pin; `capacity_limited` vs `constitutional_gap`; response-state vocabulary | `aae656d32f8b45ebf228e6f387d8e461d8767f238219911b8911c2ef95f00b59` |
| Financial Systems v3.4 | Current Financial Systems scope; confirms it is not general banking/secured-credit law | `0c088d4c9cfc501ccc1b3fb5efab579d295460e68b0ddddd37ef2d036c175ba5` |
| AUBI v2.5 | Current AUBI artifact | `c099938d9310fc0e286fa710ad59532178873fe79d7cdaf9acc130c7360d4db4` |
| `cluster.economic-os.ts` | Current schema versions for Financial Systems v3.4, AUBI v2.5, Work in Liberation v2.0 | `76e1128f2e2d5b7ebb530ab522dec31b8308e6fea07442cc34b47668d426e6d5` |
| `cluster.justice-os.ts` | Current Justice Systems v1.4 and Peace v1.8.1 | `66e26308c30d5f5904b60ab51547db78d322a591842a430003b8ac74467d7bdd` |
| `cluster.ecological.ts` | Current DRR/Living Shield v4.4.2 and Climate & Energy v2.1 | `479e390b53e42941314908207acbcfc8da65f08fc87d896ed69f458147be3494` |
| `cluster.infrastructure.ts` | Conduit Protocol v1.0; energy/data/water infrastructure ownership | `9a1a7e914a0f339dcab16540789b0d9c706a24c7e4d280f242f48bebf9628d8c` |
| `cluster.social-equity.ts` | Disability Justice v3.0 and Migration v1.1.1 | `68dc2a65b4e2d7cb1c61ac73ea7ce9154abf8f3a985092dcd1c8e00879ec3b04` |
| `cluster.human-flourishing.ts` | Global Health v2.2.2, Kintsugi v2.2.1, Hearthlight v2.1 | `35420096adee952a997f95786b2ef8abfd5f619da4cefd1b7c02caa82732c774` |

**GMEAIA provenance note.** The canonical `GMEAIA/0.2.1` source file was not present in this local synthesis source set. Nested Economies v3.3 reports its SHA-256 as `8cdaf8c316b50b251721a824124e47b1ad30787e9f5281d7fade0f4360bfe5d1`, and Meta-Governance v1.6 states that it adopted GMEAIA v0.2.1. This synthesis therefore treats GMEAIA v0.2.1 as an established shared interface **but does not claim to have independently re-hashed its canonical file**. Acquiring and verifying that file is a release-control task for v0.2.

## 0.3 What this synthesis may and may not do

This synthesis may:

- decide which v0.1.5 concepts remain canonical in v0.2;
- decide which `HAB-*` records are merged, demoted, or retained as functional profiles;
- decide which audit recommendations are accepted, modified, deferred, or rejected;
- state interface ownership supported by the current corpus;
- identify unresolved external and canopy dependencies;
- specify v0.2 drafting and schema-readiness gates.

It may not:

- create a new housing policy merely because an audit mentioned one;
- convert an implementation difficulty into a constitutional defect;
- create a GGF framework to fill an owner gap without a separate orphan/coverage audit;
- override CIS or GMEAIA controlled states locally;
- treat a schema entry as proof that a framework has reciprocally adopted Housing's proposed handoff;
- treat source verification as evidence that a receiving institution has implementation capacity.

## 0.4 Decision labels

Every major audit recommendation in this synthesis is classified as:

- **ADOPT** — carry into v0.2 as stated in substance;
- **ADOPT WITH MODIFICATION** — the structural finding is accepted but the implementation is changed;
- **DEFER** — valid issue, not necessary to settle in the v0.2 constitutional/type-system pass;
- **REJECT** — would duplicate shared machinery, misclassify the problem, or add unjustified structural weight.

---

# 1. Executive consolidation decision

## 1.1 The v0.1 discovery series is complete

The v0.1 series has now passed through repeated adversarial expansion:

- entry and screening;
- owner/provider insolvency;
- constructive eviction;
- non-formal household residence;
- housing/care/custody separation;
- tourism conversion;
- slow-onset climate degradation;
- derived interests;
- competing claims;
- community/customary termination;
- fallback continuity custody;
- identity-light standing;
- multi-basis habitation;
- gatekeepers;
- place-specific versus non-place-specific claims;
- status transitions;
- habitation-unit lifecycle;
- concurrent legitimate homes.

Audits 1 and 2 did **not** find a representation, authority, or record-design failure in the final two additions. Their findings were operational/capacity concerns rather than missing primitives.

**Decision: ADOPT.** v0.1.5 is the final object-discovery baseline. No further broad "find more housing cases" review is required before v0.2.

## 1.2 v0.2 is a consolidation release

v0.2 shall be drafted under a different burden of proof:

> **A concept, record, section, or interface earns structural weight only if removing it causes a demonstrated representation, authority, lifecycle, challenge, continuity, or remedy failure.**

The default action is now **merge, derive, reference, or delete**, not add.

## 1.3 Target architecture

Subject to the detailed qualifications below, v0.2 should converge on:

- **4 canonical object classes**;
- **9 Housing domain record/profile functions**;
- **6 shared field blocks**;
- **one shared transition grammar**;
- **12 core conformance constraints**, reconciled with CIS/GMEAIA;
- topic-specific housing policy expressed as classes/profiles and interfaces rather than new canonical record types;
- no Housing-local duplication of shared lifecycle states;
- no universal single-home, primary-leaseholder, nuclear-household, title-root, or state-law-first assumption.

---

# 2. Audit dispositions

## 2.1 Audit 1 — habitation-unit lifecycle

**Audit result:** no representation, authority, or record-design failure across subdivision, merger, demolition/reconstruction, post-conflict destruction, renumbering, informal reconfiguration, mobile units, change of use, and partial destruction.

**Decision: ADOPT.**

The **habitation unit/place object survives** into v0.2.

Preserve these invariants:

1. physical/place identity and legal claim identity are distinct;
2. predecessor/successor linkage may be one-to-one, one-to-many, or many-to-one;
3. a linkage is not title, priority, restitution, return, tenancy, compensation, or habitability adjudication;
4. uncertainty about "same dwelling" must remain representable;
5. where an external place/cadastral registry exists, Housing references it rather than becoming a competing registry;
6. where no external registry exists, Housing may hold a **purpose-limited local linkage** necessary to preserve housing claims, explicitly marked as non-authoritative for non-housing purposes.

No new `HAB-*` type is earned.

## 2.2 Audit 2 — concurrent homes

**Audit result:** the model represents shared-custody, student, pastoralist, nomadic/semi-mobile, rotational-work, partner, displacement, customary/statutory, and external-primary-residence cases without requiring a new authority or record.

**Decision: ADOPT THE SEMANTIC RULE; DEMOTE THE PRIMITIVE.**

v0.2 shall preserve the rule:

> A party may hold more than one legitimate habitation interest at the same time. No canonical uniqueness constraint shall require one habitation interest per party.

But "concurrent place-specific interest" does **not** remain a separate object class or stored canonical flag. Concurrency is derived from the set of interests. Implementations may cache it for performance, but conformance cannot depend on a denormalized flag.

## 2.3 Audit 3 — 29 records to a functional kernel

**Decision: ADOPT WITH MODIFICATION.**

The central finding is accepted:

> **v0.1.5 indexed too many records by topic where v0.2 should index them by legal/administrative function.**

The nine-function kernel is retained, but it is described as **Housing domain record/profile functions**, not a new independent lifecycle system. Exact controlled response states, clocks, and closure semantics remain GMEAIA-owned.

The six shared blocks are adopted.

The eight Audit-3 constraints are adopted in substance, with C1 and K9 modified to avoid duplicating GMEAIA.

## 2.4 Audit 4 — ontology minimization

**Decision: ADOPT WITH MODIFICATION.**

The flat §2 ontology is replaced by a typed model:

- object classes;
- roles;
- attributes/relations;
- derived predicates;
- explanatory predicates/terms.

The four irreducible object classes are accepted:

1. **Party**
2. **Habitation Unit**
3. **Habitation Interest**
4. **Habitation Basis**

The following Audit-4 reductions are accepted:

- `home` leaves the machine ontology;
- shelter/habitation become conditions/standards or predicates;
- resident/occupant/claimant become derived roles/predicates;
- secondary household resident ceases to be a canonical status;
- community-based habitation interest ceases to be a separate primitive;
- derived habitation interest becomes a predicate over the basis graph;
- gatekeeper ceases to be a primitive actor type;
- place-specific/non-place-specific becomes a scope property;
- competing claims become a computed relation plus an adjudication trigger;
- concurrent homes become cardinality, not a primitive.

Two modifications are made:

- **presence is relational**, not a global property of a Party. It belongs on an interest or party-place relation.
- the Audit-4 `holder_type` suggestion should not duplicate information already carried by the referenced Party. Collective holding should be represented through Party/holder references and, only where necessary, an explicit holder-mode attribute.

## 2.5 Audit 5 — interfaces and authority ownership

**Decision: ADOPT SELECTIVELY; CORRECT THE CORPUS PREMISES.**

Audit 5 correctly identified a need to verify receiving owners, distinguish authority from capacity, and stop Housing from treating unratified interfaces as live.

Several specific "missing owner" findings, however, are **source-freeze or verification gaps in v0.1.5 rather than GGF canopy gaps**:

- Financial Systems exists at v3.4;
- AUBI exists at v2.5;
- Work in Liberation exists at v2.0;
- Justice Systems exists at v1.4;
- Disability Justice exists at v3.0;
- Migration exists at v1.1.1;
- Global Health exists at v2.2.2;
- DRR/Living Shield exists at v4.4.2;
- Climate & Energy exists at v2.1;
- Conduit Protocol exists at v1.0 and explicitly covers energy/data/water infrastructure.

The synthesis therefore separates:

### A. Verified GGF counterparties
Existing and suitable for interface verification, though reciprocal Housing clauses may still be absent.

### B. External legal-system owners
Functions Housing should not expect a GGF framework to replace, such as ordinary local/national family law, building code, cadastral registration, general secured-credit law, mortgage law, and insolvency law.

### C. Genuine or probable canopy gaps
Functions for which the GGF still appears to lack a coherent owner and on which Housing materially depends.

### D. Unratified interfaces
Named counterparties that exist, but have not yet been migrated to reciprocally recognize the Housing handoff.

This four-way distinction shall replace the looser "owner exists/does not exist" treatment in v0.1.5.

---

# 3. Canonical v0.2 object model

## 3.1 Primitive 1 — Party

A **Party** is a person, collective, organization, authority, provider, owner, adjudicator, or other actor that holds, administers, affects, challenges, or bears duties concerning habitation.

A Party may carry:

- purpose-appropriate identifier, including provisional/local identifiers where lawful;
- roles;
- mandates;
- represented collective, if applicable;
- authority source where the Party acts institutionally.

Canonical roles may include, as context requires:

- interest holder;
- occupant;
- owner;
- landlord;
- provider;
- operator;
- custodian/trustee;
- allocator;
- standards authority;
- adjudicator/reviewer;
- continuity service;
- external basis authority.

**Non-constitution rule:** recording a role is declarative. It does not constitute, validate, expand, or confer the role or its powers.

### Household boundary

`Household` is **not** a canonical Housing object class.

Where a family, tenancy, allocation, customary, Indigenous, tax, benefits, school, care, or other system requires a household classification, Housing may reference the classification and its source. Housing does not define one universal household ontology.

This removes the need for a canonical "secondary household resident" type.

## 3.2 Primitive 2 — Habitation Unit

A **Habitation Unit** is the purpose-appropriate physical or locally recognized place reference to which a unit-scoped habitation interest attaches.

It may represent:

- dwelling;
- apartment;
- room;
- mobile home;
- seasonal or pastoralist site;
- informal structure;
- collective residence unit;
- another residence place recognized for the purpose at issue.

It carries no title semantics by itself.

Its lifecycle is represented through shared transition and identity blocks, not a separate topic-specific record.

## 3.3 Primitive 3 — Habitation Interest

The public constitutional term **secure-habitation interest** is retained. The schema object may be named `HabitationInterest`.

A Habitation Interest represents a legally or socially cognizable habitation claim, permission, protected relation, or accommodation entitlement.

Its scope is not limited to one current dwelling.

Minimum canonical dimensions should support:

- holder Party reference(s);
- recognition status;
- scope;
- presence/factual residence where relevant;
- formal-instrument relation where relevant;
- applicable habitation standard;
- exclusivity where relevant to competing claims;
- basis references;
- basis-sufficiency rule or external rule reference;
- challenge/continuity status through the shared lifecycle;
- unit/place reference where scope requires one.

### Scope

Replace the two separate v0.1.5 concepts with one attribute:

- `unit` — attached to a particular habitation unit;
- `area` — attached to a locality/territory rather than one unit, where applicable;
- `obligor_only` — a duty to provide suitable accommodation without guaranteeing a specific place.

The exact field name may change during schema design. The three-way distinction is structural.

## 3.4 Primitive 4 — Habitation Basis

A **Habitation Basis** is an independently constituted legal, contractual, administrative, customary, Indigenous, family, membership, employment, care, education, migration, allocation, judicial, community, or other relationship relevant to the existence, scope, conditions, or transition of a Habitation Interest.

A basis carries its own:

- source/constituting instrument;
- authority or domain;
- effective period;
- effect on the interest;
- decision force where an external decision affects habitation;
- challenge/correction pointer in its source domain;
- transition history where relevant.

### Per-basis relation versus set-level sufficiency

Audit 4 correctly identified a category error in v0.1.5.

`additive` and `alternative` are not reliably properties of a single basis edge. They describe how a **set of bases** combines.

v0.2 shall therefore separate:

**Per-basis effects** — a set such as:
- constitutive;
- conditional;
- limiting;
- potentially terminating;
- procedural.

**Interest-level sufficiency logic** — how the basis set supports continuation:
- conjunctive;
- disjunctive;
- mixed;
- or an external legal-rule reference where a machine-readable expression would falsely imply adjudicatory certainty.

Exact enum names are not frozen by this synthesis. The structural separation is.

> **Dependency remains representational. Priority remains adjudicatory.**

## 3.5 Derived predicates and non-primitives

The following are computed or explanatory rather than canonical object classes.

### `occupant`
Party has actual presence in relation to a unit.

### `resident`
Party's presence satisfies the adopting jurisdiction's published threshold for ordinary/factual residence.

### `claimant`
Party holds an asserted or disputed Habitation Interest.

### `derived`
An interest depends materially on one or more bases not reducible to a direct owner/provider constituting relationship.

The exact predicate should not presume that title or a landlord is the natural root.

### `competing`
Two or more interests concerning an indivisible unit require mutually incompatible exclusive outcomes.

Creation or recognition of such a state triggers the adjudication profile.

### `concurrent`
One Party holds more than one legitimate habitation interest simultaneously.

### `gatekeeping effect`
An external basis authority has a decision force capable of affecting housing access or continuation. "Gatekeeper" may remain useful prose, but it is not a separate canonical actor species.

## 3.6 Terms retained for human-facing prose but removed from the machine ontology

### Shelter
Retain as a plain-language and operational term for emergency physical protection. Represent the canonical distinction through the applicable-standard field and the continuity plan.

### Habitation
Retain as the factual/conditions predicate: a place functions as ordinary living space under the applicable standard.

### Home
Retain in prose where human meaning matters. Do not make "home" a canonical schema object or require a durability test that disadvantages mobile, seasonal, shared-custody, pastoralist, or rotational habitation.

### Housing security
Retain as an evaluative outcome/condition, not a separate object class.

---

# 4. Canonical v0.2 Housing record/profile kernel

## 4.1 Interpretation

The v0.2 kernel consists of **nine Housing-specific functional profiles**.

They may be:

- native Housing records;
- fields/subtypes in an existing jurisdictional record;
- references to a conforming external record;
- compact low-capacity forms.

They do not replace CIS or GMEAIA.

A profile exists because a distinct Housing legal/administrative function must remain reconstructable, not because a topic has a name.

## 4.2 K1 — Authority & Mandate Profile

**Function:** who may lawfully act, under which instrument, over which functions, until when.

Absorbs the Housing functions of:

- `HAB-01`;
- `HAB-14`;
- `HAB-22`;
- the authority-expiry portion of `HAB-18`.

Required structural rule:

- every institutional Party declares its relevant housing mandates and other mandates over residents;
- `none` must be an explicit permitted value;
- silence is not acceptable where mixed powers could exist.

Powers remain constituted elsewhere.

## 4.3 K2 — Habitation Interest Profile

**Function:** the Party–habitation claim/relationship and its recognition state.

Absorbs:

- `HAB-02`;
- `HAB-03`;
- the standing portion of `HAB-21`.

v0.2 resolves the old constitutive/declarative ambiguity:

> **K2 is declarative.** It records an interest asserted, recognized, disputed, determined not to exist, transitioned, or terminated under a competent source. The Housing record does not create the underlying interest merely by representing it.

Do not close and reopen K2 merely because recognition status changes.

## 4.4 K3 — Basis, Dependency & External-Decision Profile

**Function:** the independently constituted bases and edges that support, condition, limit, procedurally affect, or can terminate an interest.

Absorbs:

- `HAB-25`;
- the person-specific effect part of `HAB-22`;
- the gatekeeper/dependency semantics scattered through §§3.15, 3.19, 3.20, 7.8, and 7.9.

Powers belong to K1/Party mandate records. Effects on a particular interest belong to K3.

## 4.5 K4 — Habitation Condition Profile

**Function:** observed condition of a habitation unit, including trajectory and uncertainty.

Absorbs:

- `HAB-05`;
- the observation/trajectory part of `HAB-24`.

K4 may import an existing building, health, infrastructure, or hazard record rather than duplicate it.

A degrading K4 that reaches the adopted credible-pathway trigger must open or reference a K6 continuity/obligation plan.

## 4.6 K5 — Consequential Housing Decision Profile

**Function:** any lawfully consequential decision affecting housing access, price/charge, use/status, termination, or compulsory loss.

Absorbs decision functions from:

- `HAB-06`;
- `HAB-07`;
- `HAB-09`;
- `HAB-10`;
- `HAB-13`;
- `HAB-19`;
- `HAB-23`;
- `HAB-27`.

Topic becomes `class`/profile metadata, not a record type.

Examples of classes include:

- access/screening;
- allocation;
- rent/fee/deposit;
- repair/condemnation decision;
- termination notice;
- compulsory loss authorization;
- use/status conversion;
- community/customary termination consequence.

### Decision-stage separation

`termination_notice` and `compulsory_loss_authorisation` remain distinct **instances/classes**, even though they share K5.

A compulsory-loss authorization must reference the prior termination/opening act or state the lawful exception. Where separation of functions is required, the authorizing authority must remain independently visible.

## 4.7 K6 — Continuity & Obligation Plan

**Function:** what is owed, by whom, by when, to repair, preserve, stabilize, replace, or transition habitation.

Absorbs plan/obligation functions from:

- `HAB-06`;
- `HAB-11`;
- `HAB-12`;
- `HAB-15`;
- `HAB-20`;
- `HAB-23`;
- `HAB-24`;
- downstream continuity from `HAB-27`.

K6 must be openable for a Party who does **not** yet hold a unit-scoped interest, including homelessness, reception, discharge, or an `obligor_only` accommodation entitlement.

## 4.8 K7 — Housing Duty Custody & Handoff Profile

**Function:** preserve causal responsibility and custody when a housing-related duty crosses a domain, actor, provider, or authority boundary.

Absorbs the Housing-specific content of:

- `HAB-16`;
- surviving-duty portions of `HAB-18`;
- handoff portions of `HAB-20`;
- handoff portions of `HAB-27`;
- `HAB-28`.

### Critical modification to Audit 3

K7 does **not** define a Housing-local state machine such as:

`identified → offered → accepted → ...`

The applicable response, refusal, capacity, timeout, misrouting, constitutional-gap, action-clock, unresolved-duty, correction, and closure states are controlled by GMEAIA.

K7 supplies the Housing domain payload:

- causal action;
- affected Party/interest;
- candidate duty-holder;
- source of claimed duty;
- receiving function;
- expected housing harm during delay;
- interim housing protection where separately authorized;
- sender/recipient Housing obligations;
- unresolved Housing duty;
- Housing-specific closure evidence.

`capacity_limited` is not `constitutional_gap`.

A constitutional gap is reserved for absence of sufficient lawful jurisdiction under the compatible GMEAIA/CIS stack.

## 4.9 K8 — Adjudication Referral Profile

**Function:** preserve and route mutually incompatible habitation claims to a competent adjudicator.

Absorbs:

- `HAB-26`.

K8 remains distinct because **absence of an adjudication owner is itself a countable failure** and must not disappear inside a generic decision record.

K8 does not decide substantive priority.

## 4.10 K9 — Challenge & Remedy Profile

**Function:** make challenge, correction, interim relief, restitution, compensation, or other remedy visible and independently owned.

Absorbs:

- `HAB-17`.

### Critical modification to Audit 3

K9 does not define a parallel Housing closure grammar. It records Housing-specific remedy and correction while referencing the compatible GMEAIA lifecycle/closure state.

K9 remains distinct because an implementation with no challenge/remedy route must be distinguishable from one where the route exists but is unused.

---

# 5. Shared field blocks

The following are canonical semantic blocks, not independent records.

## B1 — Data-purpose and correction binding

Derived from `HAB-04`.

Carries or references:

- CIS information class;
- constituting purpose;
- lawful recipients;
- retention/expiry;
- provenance;
- access/correction;
- secondary-use authority;
- protected non-recording where applicable.

Housing should import CIS semantics rather than restate them.

## B2 — Notice, accessibility, representation, and participation

Derived from `HAB-08`.

Required where a consequential decision demands notice/process.

Carries:

- notice;
- language and accessibility;
- response period;
- representation/legal support;
- reasons;
- participation/dissent where applicable.

An absent or defective B2 must be challengeable through K9.

## B3 — Transition grammar

Replaces the separate transition implementations scattered across:

- `HAB-29`;
- `HAB-23` transition semantics;
- `HAB-18` expiry semantics;
- §3.22 unit transition;
- §17.1 predecessor/successor fields;
- basis changes under `HAB-25`.

Parameterize by subject:

- Party mandate/authority;
- Habitation Unit;
- Habitation Interest;
- Habitation Basis.

Minimum transition payload:

- predecessor;
- successor;
- authorizing source;
- effective time;
- what continues;
- what ends;
- what is created;
- unresolved challenge;
- cross-reference to GMEAIA state where consequential.

B3 is **causal continuity**, not substantive adjudication.

## B4 — Habitation unit/place identity

Carries:

- current purpose-appropriate identifier or local place reference;
- external-registry reference where available;
- prior identifiers;
- predecessor/successor references;
- transformation type;
- uncertainty;
- whether the Housing linkage is only purpose-limited because no external registry exists.

### Registry rule

Where a competent external cadastral/building/municipal/place registry exists, Housing should reference it.

Where none exists or the residence form is not representable by it, Housing may preserve local linkage necessary for Housing continuity, marked:

> `housing_purpose_linkage_only`

or an equivalent field.

That local linkage is not evidence of title, general place identity, tax status, land boundary, or registry priority outside the Housing purpose.

## B5 — Interim protection

Extracted from duplicated interim provisions across `HAB-06`, `HAB-17`, `HAB-26`, and related termination/continuity records.

May include:

- interim relief;
- anti-self-help protection;
- interim occupancy where separately authorized;
- non-dissipation;
- temporary accommodation;
- temporary service restoration;
- another bounded protective state.

B5 never creates the underlying power.

## B6 — Belongings and essential-support continuity

Extracted from repeated lists across eviction, household exclusion, authority expiry, community termination, and competing claims.

May include:

- personal belongings;
- medicines;
- assistive devices;
- essential documents;
- dependants;
- animals;
- care equipment;
- communications/access needs.

---

# 6. Conformance constraints carried into v0.2

Audit 3 and Audit 4 identified protections that record/concept multiplicity was providing implicitly. These must become explicit conformance rules when the type system is reduced.

## C1 — GMEAIA-governed duty closure

A K7 duty may not be treated as successfully closed merely because a recipient was named or a handoff was sent.

Closure must conform to the compatible GMEAIA state/closure grammar.

At minimum:

- `capacity_limited` remains distinct from `constitutional_gap`;
- refusal, deferral, referral, timeout, and misrouting do not create acceptance;
- acceptance followed by missed action remains an omission/performance issue;
- an unresolved duty remains visible until validly discharged, lawfully extinguished, or otherwise closed under the shared grammar.

**This replaces Audit 3's proposed Housing-local terminal-state list.**

## C2 — Decision-stage separation

A K5 instance has one consequential class.

A compulsory-loss authorization references the applicable prior opening/termination decision or a lawful exception.

Where functional separation is required, the proposing/initiating actor and the adjudicating/authorizing actor remain distinct and reconstructable.

## C3 — Notice block is validity-bearing where required

B2 is mandatory for K5 classes that require notice or participation.

"Inapplicable" or emergency exceptions must be positively justified.

A notice defect is independently challengeable.

## C4 — Other mandates over residents must be declared

Every institutional K1 profile declares relevant non-housing mandates over residents, including care, treatment, custody, education, employment, migration, or comparable powers where they exist.

`none` is an explicit valid value.

Silence is not.

## C5 — Degrading condition must be able to open continuity planning

A K4 state meeting the jurisdiction's adopted credible-pathway trigger for progressive loss of ordinary habitability must open or reference a K6 plan.

The trigger does not itself order relocation.

## C6 — Transition referential integrity

A material change of status, basis, unit identity, or authority must preserve predecessor/successor causality through B3 or explicitly state that apparently adjacent cases are unrelated.

Do not close-and-reopen merely to change status.

## C7 — Continuity planning may exist without a unit-scoped interest

K6 can be opened for:

- homelessness;
- discharge without habitation;
- reception accommodation;
- replacement entitlement;
- another person-level accommodation duty.

A current unit reference is not mandatory where the lawful duty is `obligor_only` or not yet allocated.

## C8 — General instrument and individual decision must be distinguishable

A consequential K5 decision states whether it is:

- general;
- individual.

An individual decision references the applicable general law/rule/instrument where one exists.

Housing does not smuggle general rule-making into an individual case record.

## C9 — Applicable habitation standard is explicit and cannot be nullified by status

Where a person factually inhabits accommodation, the relevant record/plan identifies an applicable condition standard, at least:

- ordinary habitation floor; or
- separately justified emergency/transitional floor.

Migration status, lack of formal title, identity-light standing, or another external classification may affect the legal relationship but shall not produce an unowned condition state equivalent to:

`applicable_standard = none`.

Durable outcomes remain subject to the anti-downward-ratchet rule.

## C10 — Competing-claim state must trigger adjudication routing

Where the record system identifies multiple mutually incompatible exclusive claims to one habitation unit, K8 must open or reference the competent adjudication route.

The trigger does not decide which claim prevails.

## C11 — Factual-residence threshold must be published

Where procedural protection depends on factual/durable residence, the adopting jurisdiction must publish or reference the threshold/evidence rule.

Housing cannot rely on an unreviewable internal intuition about who "really lives" somewhere.

## C12 — Party roles and mandates are declarative

Recording a Party as owner, landlord, provider, allocator, adjudicator, custodian, employer, care authority, or other role does not constitute or extend that role.

The record must reference its source where the role has consequential authority.

---

# 7. Full `HAB-01`–`HAB-29` migration map

| v0.1.5 record | v0.2 destination | Decision |
|---|---|---|
| HAB-01 Housing Constituting Instrument, Jurisdiction, and Power Register | K1 | Merge |
| HAB-02 Habitation Relationship Intake | K2 recognition state | Merge |
| HAB-03 Secure-Habitation Interest Record | K2 | Merge; declarative |
| HAB-04 Housing Data Purpose, Access, Retention, and Correction Record | B1 / CIS reference | Demote from record type |
| HAB-05 Habitability and Accessibility Assessment | K4 | Merge/importable |
| HAB-06 Repair, Maintenance, Condemnation, and Temporary-Habitation Plan | K5 decision + K6 plan + B5/B6 as needed | Split by function |
| HAB-07 Rent, Fee, Deposit, and Affordability Decision | K5 class | Merge |
| HAB-08 Resident Notice, Participation, Representation, and Support Record | B2 | Demote from record type |
| HAB-09 Tenancy or Occupancy Termination Notice | K5 `termination_notice` | Merge with separation constraint |
| HAB-10 Eviction or Compulsory Habitation-Loss Decision | K5 `compulsory_loss_authorisation` | Merge with separation constraint |
| HAB-11 Housing Continuity, Replacement-Habitation, and Relocation Plan | K6 | Merge |
| HAB-12 Homelessness Prevention and Rapid-Habitation Record | K6 class | Merge; K2 not required |
| HAB-13 Public/Social Housing Eligibility and Allocation Record | K5 `allocation` | Merge |
| HAB-14 Housing Provider Charter and Accountability Record | K1 profile/import | Merge |
| HAB-15 Housing Finance Distress and Home-Loss Interface | K6 + external-law/K7 references | Merge/interface |
| HAB-16 Cross-Framework Housing Continuity Handoff | K7 | Merge; GMEAIA-controlled state |
| HAB-17 Housing Complaint, Appeal, Interim Relief, Restitution, and Compensation Record | K9 + B5 | Retain function |
| HAB-18 Authority Expiry, Provider Failure, Resident Continuity, and Unresolved Duty Record | K1+B3 for expiry; K7 for surviving duties; B6 as needed | Split |
| HAB-19 Housing Access, Screening, Eligibility, and Exclusion Decision | K5 `access_screening` | Merge |
| HAB-20 Owner/Provider Insolvency, Receivership, Sale, and Resident Continuity Record | K6 + K7 + external insolvency/property record | Split/interface |
| HAB-21 Secondary Household Residence, Exclusion, Belongings, and Continuity Record | K2 + K5 exclusion + B6 + K6/K9 where needed | Remove "secondary household resident" record type |
| HAB-22 Mixed Housing, Care, Treatment, Education, and Custody Power-Separation Record | K1 mandate profile + K3 basis effects | Merge/demote |
| HAB-23 Habitation-Status Conversion and Short-Term/Tourism Continuity Record | K5 + K6 + B3/B4 + external tourism/land-use record | Split |
| HAB-24 Slow-Onset Habitability Degradation, Adaptation, and Proactive Relocation Record | K4 trajectory + K6 | Split |
| HAB-25 Habitation Basis, Dependency, Gatekeeper, and Basis-Change Record | K3 + B3 | Retain function; remove gatekeeper primitive |
| HAB-26 Competing Habitation Claims, Interim Protection, and Adjudication Handoff | K8 + B5/B6 | Retain function |
| HAB-27 Community or Customary Habitation Termination and Personal Continuity Record | K5 + K6 + K7 + B3 | Merge by function |
| HAB-28 Fallback Continuity Custody, Referral, Emergency Route, and Constitutional Gap Record | K7 + B5 | Merge; GMEAIA states |
| HAB-29 Habitation Status Change, Succession, Regularization, and Interest Reconstitution Record | B3 transition on K2/K3 | Demote from record type |

**Kernel result:** 29 topic-oriented candidate records → 9 functional Housing profiles + 6 shared blocks.

---

# 8. v0.1.5 concept migration map

| v0.1.5 concept | v0.2 treatment | Rationale |
|---|---|---|
| Shelter | Predicate/standard | Emergency condition, not object |
| Habitation | Predicate | Unit/presence condition under applicable standard |
| Home | Prose only | No distinct machine authority/process; durability assumption is risky |
| Resident | Derived predicate | Published presence threshold |
| Occupant | Derived predicate | Actual presence |
| Habitation claimant | Derived predicate | Asserted/disputed interest |
| Secure-habitation interest | **Retain as Habitation Interest object** | Primary constitutional object |
| Secondary household resident | Remove as primitive | Replace with presence + interest/basis/instrument relations; avoid presumed hierarchy and undefined household |
| Community-based habitation interest | Remove as primitive | Represent collective Party/holder + basis/authority |
| Derived habitation interest | Derived predicate | Computed from basis graph |
| Habitation basis | **Retain** | Irreducible independent source/edge |
| Habitation gatekeeper | Remove as primitive | Basis authority + decision force |
| Competing habitation claims | Derived relation + K8 trigger | No new object needed |
| Place-specific habitation interest | `scope=unit/area` | Attribute |
| Non-place-specific accommodation entitlement | `scope=obligor_only` + obligor | Attribute/duty, not separate object |
| Habitation unit | **Retain** | Independent place lifecycle |
| Concurrent place-specific interests | Derived cardinality | No uniqueness constraint; no stored canonical flag |
| Party | **Add/name explicitly** | Existing framework already needs a generic holder/actor class |

---

# 9. Interface and authority reconciliation

## 9.1 Shared constitutional/lifecycle interfaces

### CIS

**Decision: RETAIN AND PIN.**

v0.2 should target `CIS/0.2.3` unless an explicit compatibility reason is documented.

Housing imports:

- jurisdiction/authority rules;
- information classes and purpose limitation;
- conflict/allocation rules;
- constitutional minimums.

Housing shall not restate these where a reference is sufficient.

### GMEAIA

**Decision: RETAIN; RELEASE-CONTROL VERIFICATION REQUIRED.**

Current audited stack evidence supports `GMEAIA/0.2.1` as the controlling lifecycle interface for:

- authority effects;
- consequence profiles;
- response states;
- handoffs;
- clocks;
- capacity limitation;
- constitutional gaps;
- unresolved duties;
- correction;
- closure.

v0.2 shall not create local substitutes.

**Before controlled v0.2 release:** obtain the canonical GMEAIA v0.2.1 source file and verify the reported digest `8cdaf8c316b50b251721a824124e47b1ad30787e9f5281d7fade0f4360bfe5d1`.

## 9.2 Verified current GGF counterparties

The following Audit-5 "missing" or insufficiently verified owners are present in the current schema/corpus and should be treated as **verification/migration tasks**, not canopy-orphan findings:

| Function/interface | Current GGF owner |
|---|---|
| Hearts/Leaves/Treasury/settlement/financial observability | Financial Systems v3.4 |
| Material-security floor and AUBI entitlement architecture | AUBI v2.5 |
| Voluntary work/contribution governance | Work in Liberation v2.0 |
| Justice modalities, adjudication/mediation/remedy interfaces | Justice Systems v1.4 |
| Disability/access rights | Disability Justice v3.0 |
| Migration/reception/mobility | Migration & Human Mobility v1.1.1 |
| Health/outbreak/public-health architecture | Global Health v2.2.2 |
| Disaster preparedness/emergency/recovery | Living Shield / DRR v4.4.2 |
| Energy transition policy | Climate & Energy v2.1 |
| Energy/data/water infrastructure operation | Conduit Protocol v1.0 |
| Restorative survivor/community support | Kintsugi v2.2.1 |
| Peace/reconstruction/reintegration | Peace v1.8.1 |
| Child/family support | Hearthlight v2.1 |

Existence is not reciprocal adoption. §14/§19 interfaces remain **candidate or unilateral Housing-side interface declarations** until the counterparties are migrated or otherwise confirm the receiving route.

## 9.3 External legal-system dependencies, not GGF owner gaps

v0.2 shall explicitly mark the following as functions that may remain in adopting jurisdictions' ordinary law rather than requiring a new GGF framework:

- mortgage law;
- secured-credit priority;
- foreclosure procedure;
- general banking law;
- insolvency law;
- family law;
- succession law;
- ordinary landlord-tenant law;
- building codes and technical construction standards;
- cadastral/property registration;
- local court/tribunal jurisdiction;
- compulsory acquisition/expropriation law.

Housing interfaces with their **habitation consequences**.

It does not need to own them or pretend the GGF has replaced them.

### Financial Systems correction

Financial Systems v3.4 explicitly does **not** replace participating jurisdictions' banking, securities, tax, or payment-system law.

Therefore:

> v0.2 must not name Financial Systems or a hypothetical future Monetary/Credit framework as though either currently owns ordinary mortgage underwriting, secured-credit priority, foreclosure law, or insolvency law.

§13 should state that these are external legal-system dependencies unless and until a dedicated compatible GGF interface exists.

## 9.4 Genuine/probable canopy dependency: civil registration and legal identity

**Decision: RETAIN AS UNRESOLVED CANOPY DEPENDENCY; DO NOT BLOCK HOUSING OPERATION.**

Housing's purpose-limited provisional/local identifier design is accepted.

The design rule remains:

> A domain may need to distinguish a claimant for one lawful purpose without constituting that person's universal legal identity.

Housing must not create citizenship, migration status, tax residence, voter identity, or a general civil register.

However, the repeated appearance of identity linkage across Housing, AUBI, taxation, pensions, migration, voting, health, and related systems warrants a separate canopy/orphan audit.

For v0.2:

- keep the local workaround;
- expose the dependency in the corpus/interface-gap register;
- do not create a Civil Registration framework inside Housing.

## 9.5 Residential care and mixed accommodation

Audit 5 overstated this as a total missing-owner problem. Current GGF includes Disability Justice and Global Health, while Kintsugi/Justice cover related protection/remedy functions.

Still, there appears to be **no dedicated GGF residential-care architecture** owning the full accommodation-plus-care institution problem.

v0.2 should therefore say:

- non-housing care powers remain with the applicable care/disability/health/justice/local-law authority;
- Housing owns only habitation consequences;
- absence of an owner is an interface gap, not a Housing mandate;
- the prevalence of such gaps is evidence for a future orphan audit, not automatic justification for a new framework.

## 9.6 Migration circularity

**Decision: ADOPT AUDIT-5 CORRECTION.**

The v0.1.5 phrase "once those standards are legally applicable" can allow a status regime to leave factual accommodation with no Housing condition floor.

v0.2 shall separate:

- **status/entitlement law**, owned by Migration/local law;
- **minimum factual habitation conditions**, which attach under the adopted emergency or ordinary Housing floor.

Migration status may determine the type/duration of accommodation and other rights. It does not create an `applicable_standard = none` state for a place in which a person is factually housed.

This does not convert reception accommodation into an ordinary tenancy.

## 9.7 Building-code boundary

**Decision: ADOPT AUDIT-5 CORRECTION.**

§6 becomes an **outcome floor**, not a technical code.

Housing may state outcomes such as:

- structurally safe enough for habitation;
- fire-safe enough for habitation;
- potable water/sanitation;
- necessary energy;
- weather/climate protection;
- accessibility;
- indoor environmental conditions.

The competent building, fire, health, infrastructure, or technical authority owns:

- technical code;
- inspection powers;
- engineering methods;
- permits;
- enforcement tools.

Housing records the resident-facing consequence.

## 9.8 Energy counterparty

**Audit-5 premise corrected.**

The current corpus contains:

- Climate & Energy v2.1 for policy/transition;
- Conduit Protocol v1.0 for shared energy/data/water infrastructure and Bioregional Grid Authorities.

v0.2 should interface with the appropriate one depending on the function.

A service disconnection is not automatically constructive eviction merely because it caused hardship. Where purpose is contested, the competent Housing tribunal/review route determines whether the disconnection was used as a housing-loss mechanism, while the infrastructure authority determines whether the service action itself complied with its own mandate.

## 9.9 Affordability as a distributed outcome

**Decision: REJECT THE NEED FOR A SINGLE AFFORDABILITY SOVEREIGN.**

Housing affordability is intentionally cross-domain.

Housing may own:

- resident-facing affordability observation;
- distributional diagnosis;
- continuity impact;
- handoff initiation.

Instrument owners may include:

- AUBI/social protection;
- Work in Liberation/labour systems;
- Adaptive Tax;
- Bioregional Polis/land-use;
- Housing-specific rent/allocation authorities;
- infrastructure;
- external credit/finance law.

v0.2 should state explicitly that **aggregate affordability is a monitored distributed outcome, not a single delegated function with one presumed owner**.

This converts Audit 5's D4 from an undeclared ambiguity into an intentional architecture.

## 9.10 Unit identity where no registry exists

**Decision: ADOPT WITH MODIFICATION.**

Housing must not become a general place/property registry.

But refusing to preserve any local identity when no cadastre exists would erase the exact informal/mobile/pastoralist claims the framework was designed to retain.

Therefore use B4's two modes:

1. **external-reference mode** — reference the competent registry;
2. **housing-purpose-linkage mode** — preserve only the minimum local predecessor/successor evidence needed for Housing continuity, explicitly non-authoritative outside Housing.

## 9.11 Fallback continuity custody

**Decision: RETAIN v0.1.5'S NO-POWER RULE; DO NOT ADD A RESIDUAL HOUSING SOVEREIGN.**

Audit 5's warning is valid as an implementation risk, but v0.1.5 already contains the critical restrictions.

v0.2 should preserve:

- fallback custody must be lawfully constituted by the adopting jurisdiction;
- custody means record, referral, and use of existing powers only;
- it creates no title, allocation, eviction, tax, funding, expropriation, permanent-housing, family-law, care, or enforcement power;
- the response state is GMEAIA-controlled.

No stronger residual provision is needed unless later review finds an actual authority leak.

## 9.12 Unratified cross-framework handoffs

**Decision: ADOPT.**

v0.2 shall distinguish:

- **Housing-side candidate handoff** — Housing specifies what it would send/receive;
- **reciprocal interface** — the counterparty has a compatible receiving clause or a shared specification independently supplies it;
- **migration pending** — the counterparty exists but has not yet adopted the Housing interface.

The framework shall not claim that a handoff is operational solely because Housing names it.

---

# 10. Open-question triage

The 74-question v0.1.5 register was useful during discovery but should not survive intact into v0.2.

## 10.1 Questions resolved by this synthesis

The following issues are substantively resolved:

- whether `home` is canonical — **no, prose only**;
- whether `HAB-03` is constitutive — **no, K2 is declarative**;
- whether the record set needs 29 canonical types — **no**;
- smallest canonical/low-capacity functional kernel — **defined in §4 and §12 below**;
- whether community-based habitation needs its own primitive/record — **no**;
- whether derived interest remains a primitive — **no**;
- whether gatekeeper remains a primitive — **no**;
- whether concurrent homes require a stored canonical flag — **no**;
- whether transition needs a dedicated HAB record — **no; use B3**;
- whether unit lifecycle needs `HAB-30` — **no; use B3/B4**;
- whether "household" should be defined by Housing — **no**;
- whether "secondary household resident" remains a canonical status — **no**;
- whether additive/alternative are per-basis labels — **no; separate basis effect from set-level sufficiency**;
- whether a hypothetical future Monetary/Credit framework is a current owner — **no**;
- whether Housing needs a single affordability integrator — **no; monitored distributed outcome**;
- whether energy is ownerless in the current GGF — **no; Climate & Energy / Conduit exist**.

## 10.2 Questions retained as v0.2 architecture/interface tasks

Retain only questions necessary to complete the consolidated architecture, including:

1. final machine-readable representation of basis-set sufficiency without implying adjudicatory certainty;
2. exact scope and evidence threshold for factual/durable residence;
3. minimum emergency/transitional condition floor versus ordinary floor;
4. exact classes of K5 that require separate initiating and authorizing authorities;
5. final external-registry/B4 interface for informal/mobile places;
6. collective representation for notice, challenge, and remedy;
7. exact trigger for K4 degrading trajectory to require K6 planning;
8. exact counterparty/source pinning for every interface retained in v0.2;
9. reciprocal migration status of §14/§19 handoffs;
10. final schema cluster/location for Housing;
11. whether the joint Housing + Secure Habitation scope still survives after consolidation;
12. whether any record/profile remains duplicated after the v0.2 draft is written.

## 10.3 Questions deferred as substantive policy

Do **not** block v0.2 architecture on:

- universal rent-control design;
- Housing First presumption;
- social-housing quotas;
- precise allocation weighting;
- universal vacancy/speculation policy;
- universal mortgage protections;
- creditor-priority rules;
- exact compensation formulas;
- universal right-of-return formulas;
- detailed model tenancy law;
- construction targets;
- exact homestead protection;
- universal household composition rules.

These may become optional policy modules or jurisdiction profiles later.

---

# 11. Proposed v0.2 document spine

v0.2 should be **rewritten around the consolidated type system**, not produced by mechanically editing every v0.1.5 section in place.

A proposed structure:

## 0. Status, provenance, compatibility, and version history
- source freeze;
- CIS/GMEAIA compatibility;
- interface verification categories;
- authority effect.

## 1. Purpose, constitutional object, scope, and non-authority
- Housing + secure habitation joint-scope rationale;
- title ≠ habitation;
- no residual Housing jurisdiction;
- external-law dependencies;
- household non-definition.

## 2. Canonical model
- Party;
- Habitation Unit;
- Habitation Interest;
- Habitation Basis;
- scope;
- presence;
- basis sufficiency;
- explanatory predicates.

## 3. Constitutional rules
- no indicator as consequential authority;
- no administrative disappearance;
- one basis does not erase another;
- no single-primary-home assumption;
- unit transformation preserves linkage;
- no self-help compulsory loss;
- care/non-housing mandate separation;
- legal pluralism;
- no role created by representation.

## 4. Minimum factual process and minimum habitation conditions
- factual residence threshold;
- identity-light access;
- emergency vs ordinary applicable standard;
- non-derogable condition floor;
- accessibility;
- no forced digital dependence.

## 5. Authority and institutional roles
- K1;
- separation of functions;
- mixed mandates;
- provider/allocator/standards/review roles;
- external registry and adjudicator roles.

## 6. Habitation-interest and basis lifecycle
- K2;
- K3;
- basis sufficiency;
- transition B3;
- derived relations as predicates;
- succession/regularization;
- unit B4.

## 7. Consequential decisions, termination, and adjudication
- K5;
- termination notice vs compulsory loss;
- entry/screening;
- allocation;
- rent/fees;
- use conversion;
- K8 competing claims;
- B2/B5/B6.

## 8. Habitability, repair, and progressive degradation
- K4;
- Housing outcome floor;
- external technical-code owners;
- constructive eviction;
- slow-onset trigger to K6.

## 9. Continuity, homelessness, replacement, and unresolved duties
- K6;
- homelessness;
- place loss;
- `scope=obligor_only`;
- durable replacement floor;
- K7/GMEAIA handoff;
- fallback custody;
- capacity limitation vs constitutional gap.

## 10. Housing systems interfaces
- affordability as distributed outcome;
- supply/land-use;
- tourism;
- finance/home-loss;
- insolvency/external law;
- no hidden policy ownership.

## 11. Data, identity, and observation
- B1/CIS;
- provisional/local claimant identity;
- civil-registration dependency;
- automated systems;
- event-driven administration.

## 12. Phase 0 and low-capacity profile
- authority map;
- relation map;
- gap map;
- minimum viable record kernel;
- import/reference existing records;
- no digital-system prerequisite.

## 13. Canonical Housing record/profile architecture
- K1–K9;
- B1–B6;
- C1–C12;
- register/case/event distinction;
- mapping from v0.1.5.

## 14. Framework and external-law interfaces
- verified counterparties;
- candidate/unratified handoffs;
- external-law owners;
- true canopy gaps;
- migration plan.

## 15. Conformance, falsification, and schema-readiness
- reduced readiness gates;
- failure tests;
- release blockers;
- source pins;
- schema wiring.

## Appendix A — v0.1.5 migration map
Use §7 of this synthesis.

## Appendix B — deferred policy questions
Move non-architectural open questions here rather than retaining them in the core text.

---

# 12. Minimum viable low-capacity profile

Audit 3's answer to the low-capacity question is accepted with one clarification.

The minimum functional Housing profile for a jurisdiction that cannot maintain the full architecture is:

1. **K1 Authority & Mandate**
2. **K2 Habitation Interest**
3. **K5 Consequential Decision**
4. **K6 Continuity & Obligation Plan**
5. **K7 Duty Custody & Handoff**
6. **K9 Challenge & Remedy**

K3, K4, and K8 become mandatory **when their triggering condition exists**:

- K3 when multiple/conditional/external bases materially affect the interest;
- K4 when habitability/condition assessment is consequential;
- K8 when mutually incompatible claims require substantive adjudication.

B1–B6 are embedded as required by the consequence, not separately instantiated.

This minimum profile is a **semantic floor**, not a requirement to deploy a new database. Paper forms, existing municipal systems, oral/community evidence with lawful recording, or linked legacy records may satisfy it if authority, reasons, affected interest, challenge, continuity, and closure remain reconstructable.

---

# 13. Provenance and interface status categories for v0.2

Every material framework/interface named in v0.2 shall carry one of four statuses in the source/interface table.

## `frozen`
Exact canonical source file and digest present in the release source set.

## `verified-current`
Current repo/schema evidence identifies the framework/version, but the exact canonical source file was not frozen in this Housing release.

## `external-law`
The competent owner is an adopting jurisdiction's law/institution rather than a GGF framework.

## `unowned-or-audit-required`
No coherent owner has yet been established; Housing uses a bounded workaround or records the gap.

A fifth operational flag may be applied independently:

## `reciprocal-interface-pending`
The counterparty exists but has not yet adopted/confirmed the Housing handoff.

This prevents three recurrent errors:

1. treating a known framework as absent because Housing forgot to freeze it;
2. treating ordinary domestic law as a missing GGF framework;
3. treating a unilateral Housing interface declaration as a live reciprocal interface.

---

# 14. Schema-readiness blockers

The v0.2 prose may be drafted before every item below is complete, but **controlled schema wiring should not be declared complete** until these are resolved.

## B0 — Verify canonical GMEAIA source

Obtain `GMEAIA/0.2.1` canonical source and verify the reported digest:

`8cdaf8c316b50b251721a824124e47b1ad30787e9f5281d7fade0f4360bfe5d1`

Confirm specifically:

- accepted/refused/deferred/referred/timed-out/misrouted/capacity-limited/constitutional-gap states;
- post-acceptance action/omission treatment;
- unresolved-duty custody;
- correction and closure;
- whether an adopting-jurisdiction Housing duty can use the same grammar.

## B1 — Finalize object-schema field names

Freeze the actual schema representation for:

- Party;
- Habitation Unit;
- Habitation Interest;
- Habitation Basis;
- scope;
- recognition status;
- presence;
- basis effects;
- basis sufficiency;
- exclusivity;
- applicable standard.

## B2 — Finalize K1–K9 and B1–B6 identifiers

The K/B labels in this synthesis are drafting identifiers.

v0.2 should choose stable names only after the reduction has been applied to the prose and tested for ambiguity.

## B3 — Complete source/interface freeze

Pin the exact canonical files used by the final interface chapter, especially those currently only schema-verified or consulted.

## B4 — Classify every interface as reciprocal, pending, external-law, or gap

No unnamed receiver.

No assumed GGF owner.

No "future framework" written as though currently operative.

## B5 — Housing schema placement

Decide the repo cluster/entity placement for the Housing framework.

This is a schema/navigation decision, not a reason to alter the constitutional object model.

## B6 — Record-overlap regression test

After drafting v0.2, reconstruct at least the earned cases:

- applicant screening;
- factual residence;
- non-named resident exclusion;
- multi-basis/tied housing;
- care-linked residence;
- landlord insolvency;
- constructive eviction;
- competing post-conflict claims;
- customary termination;
- tourism conversion;
- slow-onset climate degradation;
- managed retreat;
- identity-light claimant;
- succession/status transition;
- unit subdivision/merger/rebuild;
- concurrent homes.

If any case becomes unreconstructable under the reduced model, repair the reduction before schema wiring. Do not automatically restore the old record/topic type.

---

# 15. Explicit drafting prohibitions for v0.2

The v0.2 drafting pass should reject the following regressions unless a new falsification result compels them.

1. **Do not add a new canonical `HAB-*` record because a new housing topic appears.**
2. **Do not create Housing-local response/closure states that GMEAIA owns.**
3. **Do not restore "secondary household resident" as a canonical hierarchy.**
4. **Do not define a universal household.**
5. **Do not require exactly one home or one primary residence as a Housing ontology.**
6. **Do not require title or a cadastral root to identify a habitation relation.**
7. **Do not make a local Housing unit identifier authoritative for property/title purposes.**
8. **Do not turn a basis graph into an automatic legal priority ranking.**
9. **Do not let recognition create the substantive role/right it records.**
10. **Do not name Financial Systems as the owner of general mortgage, secured-credit, banking, or insolvency law.**
11. **Do not name a future Monetary/Credit framework as a current counterparty.**
12. **Do not treat a capacity limitation as a constitutional gap.**
13. **Do not let migration/status law eliminate the factual habitation-condition floor.**
14. **Do not turn the §6 outcome floor into a global technical building code.**
15. **Do not describe a one-sided handoff as reciprocally implemented.**
16. **Do not create a Civil Registration architecture inside Housing to solve the identity gap.**
17. **Do not expand §§9/12/13 into a universal housing-economic programme during consolidation.**

---

# 16. Definition of done for v0.2

The v0.2 consolidation pass is ready for adversarial review when all of the following are true.

## Ontology

- only four canonical object classes remain;
- prose terms and derived predicates are clearly distinguished from objects;
- household is not a Housing object;
- no single-primary-home uniqueness assumption exists;
- basis-set sufficiency is structurally separate from per-basis effects.

## Records

- the 29-record catalogue has been replaced by the nine functional profiles;
- B1–B6 are shared blocks, not record types;
- transition uses one B3 grammar;
- no topic creates a type merely because it exists.

## Shared interfaces

- CIS and GMEAIA own their respective shared semantics;
- K7 uses GMEAIA states;
- no local capacity/constitutional-gap vocabulary competes with GMEAIA;
- K9 does not create a parallel closure grammar.

## Authority

- every consequential Housing act names a competent owner or explicit external-law dependency;
- fallback custody uses existing lawfully constituted powers only;
- no interface creates recipient authority;
- building-code, finance, family, care, migration, infrastructure, title, and registry boundaries are explicit.

## Data and identity

- Housing identifiers remain purpose-limited;
- the civil-registration dependency is visible but not solved inside Housing;
- external place registries are referenced where available;
- Housing-only place linkage is explicitly non-authoritative outside its purpose.

## Interfaces

- every named GGF counterparty is source-classified;
- every reciprocal handoff is distinguished from migration-pending;
- no hypothetical future framework is represented as a current owner.

## Usability

- the minimum six-profile low-capacity implementation remains possible;
- all earned adversarial cases reconstruct;
- the open-question register has been reduced to unresolved architecture/interface questions plus a separate deferred-policy appendix.

## Falsification

The reduction itself fails if simplification causes:

- an interest or basis to disappear;
- a unit transformation to erase claims;
- a status transition to lose causality;
- compulsory loss to lose decision-stage separation;
- notice/remedy absence to become invisible;
- an unaccepted duty to appear discharged;
- a capacity problem to appear constitutional;
- a general rule to be hidden inside an individual decision;
- a competing claim to lack an adjudication route;
- an emergency/transitional accommodation state to lose any applicable condition floor.

---

# 17. Final synthesis

The v0.1 series has earned a useful but over-expanded architecture.

Its achievement is not the 29 `HAB-*` records or the long list of named resident types. Its achievement is the discovery of a smaller constitutional structure underneath them:

> **Parties hold or affect habitation interests concerning places or accommodation duties. Those interests may rest on several independently governed bases. Places have their own lifecycle. Consequential housing decisions require lawful authority and process. Housing continuity duties must remain visible across handoffs without Housing acquiring the powers of the domains that caused them.**

The audit cycle now supports four reductions:

1. **objects over labels** — Party, Unit, Interest, Basis;
2. **functions over topics** — nine Housing profiles rather than one record per problem;
3. **shared grammar over local reinvention** — CIS for constitutional boundaries, GMEAIA for lifecycle/response/closure;
4. **interfaces over hidden jurisdiction** — Housing specifies resident-facing consequences while title, planning, finance, care, justice, migration, infrastructure, and other domains retain their own powers.

The strongest v0.1.5 discoveries survive the reduction:

- title is not habitation;
- a person need not hold title or a named lease to remain administratively visible;
- one basis ending does not erase another;
- dependency representation does not decide legal priority;
- a non-housing decision may have a housing consequence without becoming a Housing decision;
- loss of a particular place is distinct from a duty to accommodate somewhere;
- a place can transform without its attached claims disappearing;
- one person may legitimately have more than one home;
- absence of a competent owner is not authorization for Housing to become one.

The v0.2 task is therefore not to invent a more comprehensive housing worldview.

It is to make this smaller architecture **precise enough to wire, sparse enough to implement, and explicit enough that another framework cannot accidentally turn a housing dependency into hidden jurisdiction**.

> **v0.2 drafting rule:** consolidate first. Add only when a demonstrated representation, authority, lifecycle, challenge, continuity, or remedy failure survives the reduced model.
