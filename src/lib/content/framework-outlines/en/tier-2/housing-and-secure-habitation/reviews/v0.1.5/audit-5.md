## Audit 5 — Interface and Authority Ownership Audit

Audit v0.1.5 for **unowned functions and accidental Housing jurisdiction**, especially §§9, 12, 13, 14 and 19.

For every material external dependency or handoff, ask:

1. What exact function is Housing performing?
2. What exact function belongs elsewhere?
3. Is the external owner actually identified?
4. Does that owner exist in the current GGF architecture, or is it merely assumed?
5. Does Housing state a resident-facing constraint while leaving instrument choice elsewhere, or does it quietly prescribe another domain's policy?
6. Does a `HAB-16`, `HAB-25`, `HAB-28`, or `HAB-29` handoff manufacture authority merely because no owner exists?
7. Are there circular handoffs?
8. Does the interface distinguish an authority gap from a capacity gap?

Audit at least the interfaces with:

* CIS;
* GMEAIA;
* Hearthstone;
* Bioregional Polis;
* DRR;
* Migration;
* Adaptive Tax;
* Shared Capital;
* Financial Systems;
* Work in Liberation;
* Sundown;
* Aegis;
* Disability/health/family/justice;
* Water/Sanitation/Infrastructure;
* Kintsugi;
* Peace;
* Hearthlight;
* Regenerative Journeys;
* civil registration/legal identity, which currently has no dedicated GGF owner.

Treat the following as a serious finding:

* Housing performs a decision another domain should own;
* another framework promises a housing consequence with no receiving owner;
* a handoff points to a framework that cannot lawfully perform the named function;
* no framework owns a function on which Housing materially depends.

Do not treat external price effects, political resistance, lack of money, or lack of implementation capacity as jurisdictional defects.

End with a table of:
**function → current owner → Housing role → authority source → gap/overlap → recommended v0.2 treatment.**

---
Gemini:
# Audit 5 — Interface and Authority Ownership Audit

**Target Document:** Housing & Secure Habitation Framework v0.1.5

**Audit Scope:** Unowned functions, accidental Housing jurisdiction, interface handoffs, and authority boundaries (specifically §§9, 12, 13, 14, 15.4, 17, 18, and 19).

---

## 1. Executive Audit Summary

The **Housing & Secure Habitation Framework v0.1.5** demonstrates high constitutional awareness regarding authority separation. It repeatedly asserts that "Dependency is representational. Priority is adjudicatory" and maintains explicit seams separating secure-habitation claims from land title, zoning, taxation, banking, and emergency command.

However, Audit 5 identifies **four serious architectural findings**:

1. **Unowned Canopy Dependency (Civil Registration & Legal Identity):** Housing relies on provisional/local claimant identifiers (`HAB-02`, `HAB-03`, `HAB-28`) because the Global Governance Frameworks (GGF) canopy lacks a dedicated Civil Registration / Legal Identity owner.
2. **Dependence on Non-Existent GGF Architecture (Monetary & Credit Architecture):** Sections 9, 13, and 19.10 lean on a hypothetical "Monetary & Credit Architecture" that does not currently exist in the frozen GGF corpus.
3. **Adjudication Void for Competing Claims & Secondary Residence:** While `HAB-26` and `HAB-21` correctly prevent Housing from self-adjudicating priority, they rely on external family, justice, and property adjudicators that are poorly defined or unowned in the wider GGF architecture.
4. **Authority Creep via Fallback Custody (`HAB-28`):** `HAB-28` attempts to handle unowned continuity duties without creating residual Housing sovereignty. However, where an adopting jurisdiction lacks pre-existing state capacity, `HAB-28` runs the risk of becoming an informal, unconstitutional default provider.

---

## 2. Answers to Core Audit Questions

### 1. What exact function is Housing performing?

Housing exclusively defines and tracks the **resident-facing secure-habitation interest**, minimum habitability conditions (§6), procedural protection against arbitrary eviction (§8), housing-continuity handoffs (`HAB-16`), and status-transition linkage (`HAB-29`).

### 2. What exact function belongs elsewhere?

* **Title, Conveyance & Rematriation:** Belongs to **Hearthstone Protocol**.
* **Zoning, Municipal Supply & Land Use:** Belongs to **Bioregional Polis**.
* **Fiscal Liability & Tax Collection:** Belongs to **Adaptive Tax**.
* **Credit, Mortgage Underwriting & Lender Solvency:** Belongs to **Financial Systems** / Monetary Architecture.
* **Emergency Command & Evacuation:** Belongs to **Disaster Risk Reduction (DRR)**.
* **Civil Identity & Registration:** Unowned in GGF canopy.
* **Substantive Claim Adjudication & Family Law:** Belongs to competent courts/family/customary authorities (partially unowned in GGF).

### 3. Is the external owner actually identified?

In most cases, yes (e.g., Hearthstone, Bioregional Polis, Adaptive Tax, DRR, Regenerative Journeys). However, external owners for civil registration, family law/custody, and credit/monetary architecture are either unassigned or assumed.

### 4. Does that owner exist in the current GGF architecture, or is it merely assumed?

* **Exists in frozen/consulted corpus:** CIS, GMEAIA, Hearthstone, Bioregional Polis, Adaptive Tax, Shared Capital, Water & Sanitation, Regenerative Journeys, Kintsugi, Peace, Hearthlight, DRR, Migration, Soil/Living Land, Sundown, Aegis, Work in Liberation.
* **Assumed / Non-Existent in GGF Canopy:** Civil Registration / Legal Identity, Monetary & Credit Architecture, Family Law / Domestic Adjudication, and General Justice / Judicial Procedure.

### 5. Does Housing state a resident-facing constraint while leaving instrument choice elsewhere, or does it quietly prescribe another domain's policy?

Housing mostly respects this boundary (e.g., stating affordability/burden metrics without dictating tax rates or credit pricing). However, in **§8.6 (Replacement-Habitation Floor)** and **§3.11 (Factual Residence Protections)**, Housing treads close to prescribing substantive property and administrative law for local jurisdictions that lack model statutes.

### 6. Does a `HAB-16`, `HAB-25`, `HAB-28`, or `HAB-29` handoff manufacture authority merely because no owner exists?

* `HAB-16`, `HAB-25`, and `HAB-29` act strictly as representational dependency graphs and state-transition bridges; they do not manufacture substantive authority.
* `HAB-28` explicitly guards against manufacturing authority by recording unresolved duties as a **constitutional gap**. However, if an implementation uses `HAB-28` to justify emergency accommodation actions beyond pre-existing powers, it risks unauthorized jurisdiction expansion.

### 7. Are there circular handoffs?

* **DRR ↔ Housing:** DRR hands off post-disaster shelter to Housing for durable settlement; Housing hands off managed retreat back to DRR/Polis when environmental degradation crosses emergency limits. This is legally coherent but requires careful temporal staging to avoid infinite referral loops under `HAB-11` and `HAB-24`.
* **Bioregional Polis ↔ Housing:** Polis sets municipal supply/zoning, which creates housing shortages, which Housing identifies in needs assessments and routes back to Polis. Section 19.16 correctly structures this as an iterative feedback loop rather than a circular jurisdictional handoff.

### 8. Does the interface distinguish an authority gap from a capacity gap?

Yes. Sections 1.5, 3.18, and 16.3 explicitly differentiate between an **authority defect** (lack of lawful power) and a **capacity failure** (lack of money, units, or administrative throughput).

---

## 3. Detailed Interface Audit

### 1. Constitutional Interface Specification (CIS)

* **Housing Function:** Inherits Class C/D/E data boundaries, purpose limitation (`HAB-04`), and conflict resolution (§18.1).
* **Owner:** CIS v0.2.3.
* **Finding:** Clean interface. Housing correctly refuses to create a parallel data constitution.

### 2. GMEAIA

* **Housing Function:** Uses common lifecycle grammar (pilots, adoptions, gap registration).
* **Owner:** GMEAIA.
* **Finding:** Clean interface.

### 3. Hearthstone Protocol

* **Housing Function:** Tracks resident continuity during title conversion, stewardship transfer, or rematriation.
* **Owner:** Hearthstone v2.0.1.
* **Finding:** Clean boundary. Title is explicitly separated from habitation.

### 4. Bioregional Polis

* **Housing Function:** Communicates resident-facing housing needs, habitability floors, and displacement risks (`HAB-11`).
* **Owner:** Bioregional Polis v3.0.
* **Finding:** Clean interface. Housing does not acquire municipal zoning or land-use planning powers.

### 5. Disaster Risk Reduction (DRR)

* **Housing Function:** Governs transition from emergency shelter to durable habitation; tracks replacement-habitation claims (`HAB-11`, `HAB-24`).
* **Owner:** DRR Framework.
* **Finding:** Well-defined temporal boundary (emergency shelter vs. ordinary secure habitation).

### 6. Migration and Human Mobility

* **Housing Function:** Supplies minimum habitability and resident protections for migrants/refugees once housed.
* **Owner:** Migration Framework.
* **Finding:** Clean interface. Housing status does not dictate migration or asylum status.

### 7. Adaptive Tax Framework

* **Housing Function:** Receives notice of tax enforcement affecting primary residences to ensure continuity routing.
* **Owner:** Adaptive Tax v0.1.2.
* **Finding:** Clean boundary. Housing vulnerability does not alter tax liability; Adaptive Tax cannot execute housing displacement without a `HAB-16` handoff.

### 8. Shared Capital & Social Inheritance

* **Housing Function:** Protects resident rights when housing assets are owned or financed by pooled/social capital funds.
* **Owner:** Shared Capital v0.1.2.
* **Finding:** Clean boundary. Investment/beneficiary objectives cannot override resident protections.

### 9. Financial Systems & Future Monetary/Credit Architecture

* **Housing Function:** Exposes home-loss visibility, foreclosure hardship routes, and resident claims (`HAB-15`).
* **Owner:** Financial Systems (and assumed "Monetary & Credit Architecture").
* **Finding:** **SERIOUS FINDING.** Housing depends on credit and mortgage regulation, but GGF lacks a dedicated Monetary & Credit framework.

### 10. Work in Liberation

* **Housing Function:** Routes tied-housing and employment-transition accommodation risks.
* **Owner:** Work in Liberation.
* **Finding:** Clean handoff via `HAB-16` and `HAB-25`.

### 11. Sundown

* **Housing Function:** Manages regional housing continuity during industrial closures and site transitions.
* **Owner:** Sundown Framework.
* **Finding:** Clean interface.

### 12. Aegis

* **Housing Function:** Handles housing continuity during security-sector conversion and site repurposing.
* **Owner:** Aegis Framework.
* **Finding:** Clean interface.

### 13. Disability / Health / Family / Justice

* **Housing Function:** Separates housing management from clinical, care, custody, or guardianship powers (`HAB-22`).
* **Owner:** Partially Global Health v2.2.2; Family, Justice, and Disability frameworks are **unowned/missing** in the GGF canopy.
* **Finding:** **SERIOUS FINDING.** Housing relies heavily on external family courts and care authorities to adjudicate domestic exclusions (`HAB-21`) and care-linked residence without these external frameworks existing in GGF.

### 14. Water / Sanitation / Infrastructure

* **Housing Function:** Defines resident habitability conditions dependent on essential utility services (§6).
* **Owner:** Water & Sanitation v5.2.2 / Infrastructure frameworks.
* **Finding:** Clean boundary. Housing states habitability outcomes; utility frameworks manage technical delivery.

### 15. Kintsugi

* **Housing Function:** Receives ordinary secure-habitation handoffs for survivors/reintegrating individuals.
* **Owner:** Kintsugi v2.2.1.
* **Finding:** Clean handoff. Reintegration or restorative participation cannot be made a mandatory precondition for housing access.

### 16. Peace and Conflict Resolution

* **Housing Function:** Maintains housing continuity during post-conflict return and reconstruction.
* **Owner:** Peace v1.8.1.
* **Finding:** Clean boundary. Reconciliation efforts cannot substitute for housing allocation or claim adjudication (`HAB-26`).

### 17. Hearthlight

* **Housing Function:** Provides homelessness prevention and housing stability where housing distress risks forcing family separation.
* **Owner:** Hearthlight v2.1.
* **Finding:** Clean interface. Housing owns the habitation route; Hearthlight retains child-rights and family-support functions.

### 18. Regenerative Journeys

* **Housing Function:** Governs resident-facing consequences of short-term/tourism rental conversions (`HAB-23`).
* **Owner:** Regenerative Journeys v1.1.
* **Finding:** Clean boundary. Housing does not regulate tourism or platforms; Regenerative Journeys does not execute tenancy evictions.

### 19. Civil Registration / Legal Identity

* **Housing Function:** Uses local/provisional claimant identifiers (`HAB-02`, `HAB-03`, `HAB-28`) for identity-light access.
* **Owner:** **UNOWNED IN GGF CANOPY.**
* **Finding:** **SERIOUS FINDING.** Housing is forced to maintain a local identity workaround because GGF has no civil registration framework.

---

## 4. Serious Findings & Recommendations for v0.2

1. **Unowned Civil Identity Canopy Gap:**
* *Finding:* §15.4 acknowledges that Housing's provisional identity system is a local workaround because GGF lacks a civil registration owner.
* *Recommendation for v0.2:* Explicitly flag Civil Registration as an external canopy requirement and restrict `HAB-02` provisional identifiers strictly to in-domain housing claim management.


2. **Assumed Monetary & Credit Framework:**
* *Finding:* §§13 and 19.10 rely on a non-existent "Monetary & Credit Architecture" for banking and foreclosure governance.
* *Recommendation for v0.2:* Reframe §13 to interface strictly with general contract and insolvency law until a dedicated Monetary framework is introduced.


3. **Risk of Authority Creep in Fallback Continuity Custody (`HAB-28`):**
* *Finding:* When an external domain causes displacement and no receiving actor exists, `HAB-28` records the gap. However, pressure on local authorities could lead to `HAB-28` being used as a justification for unauthorized administrative actions.
* *Recommendation for v0.2:* Tighten `HAB-28` language to explicitly forbid the allocation of permanent housing or exercise of expropriation powers under fallback custody.



---

## 5. Summary Audit Table

| Function | Current Owner | Housing Role | Authority Source | Gap / Overlap | Recommended v0.2 Treatment |
| --- | --- | --- | --- | --- | --- |
| **Civil Identity & Registration** | **Unowned in GGF** | Provides provisional claimant identifiers (`HAB-02`) | Local workaround (§15.4) | **Major Canopy Gap** | Maintain local firewall; mandate creation of a GGF Civil Identity Framework. |
| **Title Conversion & Rematriation** | Hearthstone Protocol | Tracks resident continuity & relocation | Hearthstone v2.0.1 | None (Clean Boundary) | Retain current `HAB-16` handoff structure. |
| **Zoning & Municipal Supply** | Bioregional Polis | Assesses housing need & habitability floors | Bioregional Polis v3.0 | None (Clean Interface) | Preserve seam table in §19.16. |
| **Fiscal Liability & Collection** | Adaptive Tax | Receives notice of enforcement on primary homes | Adaptive Tax v0.1.2 | None (Clean Interface) | Retain strict separation between tax liability and housing continuity. |
| **Mortgage & Credit Governance** | **Assumed Monetary Arch.** | Exposes home-loss visibility & hardship options | Unowned / Assumed | **Architecture Gap** | Ground §13 interface in general contract/insolvency law pending Monetary framework. |
| **Emergency Shelter & Evacuation** | DRR | Manages transition to durable housing (`HAB-11`) | DRR Framework | Potential loop risk | Formalize temporal handoff rules between emergency shelter and durable housing. |
| **Short-Term / Tourism Rental** | Regenerative Journeys | Governs resident conversion impact (`HAB-23`) | Regenerative Journeys v1.1 | None (Clean Boundary) | Retain `HAB-23` interface without acquiring platform licensing powers. |
| **Family Law & Domestic Adjudication** | **Unowned in GGF** | Tracks secondary residence & safety (`HAB-21`) | External Court / Customary | **Adjudication Void** | Prohibit Housing from self-adjudicating domestic priority; route strictly to local courts. |
| **Care & Custody Power Separation** | Global Health / Unowned | Maps housing vs care/custody powers (`HAB-22`) | Global Health v2.2.2 / Local Law | Partial Gap (Care) | Require explicit power-separation maps in all mixed residential settings. |
| **Fallback Continuity Custody** | Local Custodian / Unowned | Records unaccepted duties & gaps (`HAB-28`) | Local pre-existing law / CIS §18.1 | Boundary Leak Risk | Hard-code restrictions against `HAB-28` acquiring default land or allocation powers. |
| **Status Transition & Succession** | Local Adjudicator / Housing | Links old/new status causally (`HAB-29`) | Local Law / `HAB-29` | None (Clean Grammar) | Retain `HAB-29` as an event-driven status bridge. |

---
Claude:

# Audit 5 — Interface and Authority Ownership Audit

**Subject:** Housing & Secure Habitation Framework v0.1.5, §§9, 12, 13, 14, 19, plus the handoff machinery at §§3.14, 3.18, 15.4, 16.5, 20
**Audit posture:** locate unowned functions and accidental Housing jurisdiction.
**Excluded from findings by instruction:** external price effects, political resistance, funding shortfalls, and implementation capacity are not treated as jurisdictional defects.
**Companion audits:** Audit 3 (record overlap) and Audit 4 (ontology). Cross-references to `K1`–`K9`, `B1`–`B6`, `C1`–`C12` are to those.

**Headline result:** the framework's *non-manufacture* discipline is close to airtight — no handoff creates authority where none exists. The defect is upstream of that: **Housing routes load-bearing functions to five owners it never verified, and the terminal sink for every unresolved duty in the framework is a specification that appears in neither the frozen nor the consulted source list.** The framework diagnoses "that promise needs an owner" (§25) and then, at §§9, 13, and 19.12, hands off to owners it did not check.

---

## 1. Method

Every material external dependency is tested against the brief's eight questions. Findings are then sorted into the four classes the brief designates as serious, plus three cross-cutting findings that do not sit in any single interface.

Two evidentiary sources are used throughout:

- **§0.2**, the local source freeze — nine instruments with versions and digests: CIS 0.2.3, Treaty for Our Only Home 1.3, Hearthstone 2.0.1, Bioregional Polis 3.0, Adaptive Tax 0.1.2, Shared Capital 0.1.2, Polycentric Governance Architecture 0.6.2, Water & Sanitation 5.2.2, Regenerative Journeys 1.1.
- **§0.3**, consulted but not frozen — Kintsugi 2.2.1, Peace 1.8.1, Hearthlight 2.1, Global Health 2.2.2, and, with no version at all, Disaster Risk Reduction, Migration and Human Mobility, Soil/Living Land, Sundown, Aegis.

A third category emerges from the audit and is not acknowledged anywhere in v0.1.5: **owners named in the body that appear in neither list.**

---

## 2. Cross-cutting finding 1: the verification asymmetry

| Owner | Times named as an owner in the body | Freeze status |
|---|---:|---|
| **GMEAIA** | 3, including the document header | **Neither list** |
| **Financial Systems** | 5 | **Neither list** |
| **Work in Liberation** | 3 | **Neither list** |
| **AUBI** | 2 | **Neither list** |
| Future Monetary/Credit architecture | 5 | Declared not to exist |
| Disability, family, justice frameworks | §19.12, as a category | Unnamed; no instrument |
| Kintsugi, Hearthlight, Migration, Soil, Sundown, Aegis, Global Health, DRR | 4–8 each | §0.3, unfrozen; five with no version |

§0.3 carries a caveat: findings drawn from those texts "should be verified against the exact canonical file and digest." **No equivalent caveat covers the owners that appear in neither list.** They are asserted with less evidentiary support than the ones the framework explicitly flags as provisional, and the reader has no signal that this is so.

This matters most for one of them.

### GMEAIA is the terminal sink and is unverified

The document header declares GMEAIA the framework's lifecycle interface, alongside CIS as the constitutional interface. CIS is frozen at 0.2.3 with a digest. GMEAIA is not frozen, not listed in §0.3, and receives three lines of treatment at §19.2.

Its load is disproportionate to that treatment. Every unresolved-duty path in the framework terminates in it:

- §3.14 — no competent authority → recorded as constitutional/interface gap
- §3.18 — no fallback custodian constituted → `HAB-28` records a genuine gap
- §16.5 — record the gap "through `HAB-18`/`HAB-28` and the common lifecycle interface"
- §19.1 — no competent authority or custodian → "an interface/constitutional gap, not a licence to self-authorize"
- §22 Q54 — when a disputed duty should escalate into "a formally recorded constitutional gap under GMEAIA"

The entire no-residual-jurisdiction architecture rests on GMEAIA being able to receive and hold a recorded constitutional gap. If that function is absent, differently scoped, or version-incompatible, every gap route in the framework terminates in nothing — and "record the gap" becomes indistinguishable from "drop the duty." Audit 3's constraint `C1` (a duty record may close only in `discharged`, `lawfully_extinguished`, or `constitutional_gap`) inherits the same dependency.

**This is the single highest-priority verification item before v0.2.** Freeze GMEAIA with a version and digest, and confirm that its gap-recording function accepts a duty originating in an adopting jurisdiction rather than only in a GGF framework.

---

## 3. Cross-cutting finding 2: the §14 handoff architecture is unilateral

§14 lists eighteen triggering domains and states that any GGF process foreseeably causing housing loss "should create a Housing Continuity Handoff." §20 then sets the migration task of finding every place another document says "protect housing" and classifying it.

Nothing in v0.1.5 demonstrates that **any** of the eighteen counterparties contains a reciprocal receiving clause. The handoff obligation currently runs one way, declared by Housing about frameworks that have not adopted it.

This is not a defect in Housing's design — §20 is exactly the right response, and §14 is the correct architecture. But it should be stated plainly in v0.2 that **the interface layer is unratified**, because the framework's self-description at §25 ("gives the rest of the GGF somewhere real to hand off the promises it already makes") reads as though the connection is live. It is at present an offer, not a connection.

Related: §21 gate 12 ("leaves the same cross-framework housing promises unowned after adoption") is currently untestable, since no counterparty has adopted. The gate needs a precondition.

---

## 4. Cross-cutting finding 3: authority gap and capacity gap share one terminal state

The brief's question 8. The framework knows the distinction — §3.18 says "The framework does not cure absence of state capacity by inventing power," and the v0.1.3 changelog separates "capacity failures and policy price effects" from "Housing authority defects." But the *record architecture* does not implement it.

`HAB-28`'s terminal state, "constitutional gap," currently covers three materially different conditions:

1. **Authority gap** — no body in the legal system has the power. A constitutional defect; escalate to GMEAIA.
2. **Jurisdictional gap** — a body exists but its mandate does not extend to this duty. A constitutional defect of different shape; the fix is an amendment to that body's constituting instrument, not a corpus-level escalation.
3. **Capacity gap** — a body exists with mandate and refuses or cannot perform for reasons of staffing, funding, or backlog. **Not a constitutional defect at all**, and excluded from this audit's findings by the brief's own instruction.

Recording all three identically has a specific bad consequence: the corpus accumulates false constitutional defects. A jurisdiction with a fully adequate legal architecture and an under-resourced municipality will generate the same record as one with a genuine hole in its law, and §21 gate 24 will read as a framework failure when it is a budget line.

**Recommendation:** split the terminal state into `authority_gap`, `mandate_gap`, and `unperformed_duty`, with only the first two escalating under `C1`. This is a small change with large diagnostic value, and it makes the brief's exclusion rule operational rather than rhetorical.

---

## 5. Findings by severity class

### Class A — Housing performs a decision another domain should own

**A1. Unit-identity linkage where no registry exists.** §19.16 assigns unit subdivision, merger, and change of use to Bioregional Polis, Hearthstone, and "competent cadastral/building/municipal registry." But §17.1 requires thirteen `HAB-*` records to carry predecessor/successor references, and §3.22 requires "the responsible record system" to preserve the linkage without naming it. For informal settlements, mobile units, seasonal sites, and pastoralist ranges — all explicitly in scope at §4.17, §4.25, and §2.15 — no cadastre exists. Housing's linkage graph then becomes the *only* record of place identity and succession, which is a property-register function the executive summary explicitly disclaims. Open Q71 asks exactly this and is unresolved.

*Treatment:* answer Q71 in v0.2 by rule, not by case. Proposed: where an external registry exists, Housing carries a **reference** and never a linkage assertion; where none exists, Housing carries a purpose-limited linkage flagged `no_external_registry` and disclaimed as evidence of identity for any non-housing purpose.

**A2. Provisional claimant identifiers.** §15.4 is honest — Housing issues purpose-limited local identifiers because the corpus has no civil-registration owner, and disclaims conversion into citizenship, tax residence, migration status, or voter registration. The design is right. The *escalation* is wrong: the gap is recorded in explanatory prose at §15.4 and as open Q68, not through the framework's own gap machinery. Consequence: no one but Housing will ever see it. See D1.

**A3. Habitability floor overlapping building regulation.** §1.4 excludes "general building and construction regulation beyond habitation-related minimum outcomes," but §6's floor includes structural safety, fire safety, ventilation, and essential-service connection — squarely building-code and utility-regulation subjects — and §5.3 empowers a habitability standards authority to *set or enforce* them. Open Q26 ("Who owns building codes?") is unresolved. The boundary phrase "beyond habitation-related minimum outcomes" is circular: whether an outcome is habitation-related is the question at issue.

*Treatment:* restate §6 as **outcome specifications** with no enforcement verb, and move enforcement to whichever building/safety authority the jurisdiction identifies at §16.2. Housing states what must be true of a dwelling; it does not set the technical standard by which that is achieved.

**A4 (minor). Functional separation may duplicate CIS.** §3.4 imposes a separation-of-powers mandate on adopting jurisdictions. §19.1 states that CIS supplies "legitimacy, jurisdiction, sovereignty" and that "Housing does not locally redefine those states." If CIS 0.2.3 already supplies functional separation, §3.4 restates rather than applies it, and the two will drift. Verify against the frozen digest; cite rather than restate if so.

### Class B — a housing consequence is promised with no receiving owner

The direction the brief anticipates is largely *solved* by Housing's existence: Housing is the receiver the rest of the corpus lacked. The finding is the mirror image.

**B1. Housing commits residents to owners it did not verify.** At §9, resident affordability and continuity outcomes are routed to Adaptive Tax (frozen), **AUBI** (unverified), **Work in Liberation** (unverified), Bioregional Polis (frozen), **Financial Systems** (unverified), and "the competent social-protection authority" (generic). At §13 and §19.10, the credit and mortgage side routes to Financial Systems (unverified) and a **Monetary/Credit architecture declared not to exist**. At §19.12, disability, family, and justice consequences route to a *category* with no named instrument.

This reproduces, inside Housing, the precise failure §20 exists to correct elsewhere: naming a receiver without confirming it can receive. §25's framing — "That promise needs an owner" — applies to Housing's own §§9, 13, and 19.12.

**B2. Energy has no named owner and sits inside two binding rules.** Water & Sanitation is frozen at 5.2.2. Energy is not — no framework is named anywhere for it. Yet §6 places "essential energy where needed for survival and ordinary habitation" in the habitability floor, and §8.5 prohibits withdrawal of energy as constructive eviction. Housing therefore has two operative rules about energy and no counterparty. §19.13 addresses "water, sanitation, energy, and infrastructure" as one heading with only one framework behind it.

### Class C — the handoff points to an owner that cannot lawfully perform the function

**C1. Migration can switch off Housing's habitability floor.** §19.7: "Housing supplies ordinary habitability, allocation, resident rights, privacy, and continuity standards for accommodation **once those standards are legally applicable**." That conditional is load-bearing. Migration owns status; status frequently determines whether ordinary housing law applies to reception accommodation; therefore a Migration status decision can lawfully render Housing's standards inapplicable — and neither framework then owns habitability for that population.

§3.11's identity-light floor does not close this, because it governs *process* (notice, contest, belongings, self-help protection), not *conditions*. This is a genuine circular dependency, and it activates the framework's own §21 gate 4 ("protects formal tenants while excluding informal, customary, family, migrant... residence relationships").

*Treatment:* add a non-derogable conditions floor that attaches to factual habitation regardless of status, parallel to §3.11's process floor. This is a floor on *Housing's own standards*, not a claim on migration status, so it does not breach §1.4.

**C2. Mortgage and credit machinery routes to a framework that does not exist.** §19.10 is candid: "A future monetary/credit framework *would* own bank and mortgage-system architecture." But §13's foreclosure interface and §19.16's seam row both read as if an owner is present. In fact the only current counterparty for §13 is **external national insolvency and property law** — not a GGF framework at all.

*Treatment:* mark the §19.16 row and §13's counterparty list as external-legal-system dependencies rather than corpus interfaces, and state that §13 is conformant only where the adopting jurisdiction's own insolvency law supplies the protections. §13.1's last paragraph nearly says this already; make it explicit at the interface layer.

**C3. Residential-care receiving frameworks are largely absent, making §3.13's exception the normal case.** §3.13 provides that where no competent receiving framework exists for a claimed non-housing power, "that absence is an interface gap, not permission for the housing provider to exercise the power by default." Correct rule. But §22 Q47 concedes "the wider GGF currently has little dedicated residential-care architecture," and §19.12 names no instrument for disability, family, or justice.

The realistic outcome is therefore a large volume of recorded interface gaps in supported living, residential treatment, and custody-adjacent settings — the settings where residents are most dependent and least able to challenge. The rule is right; the framework should acknowledge that under present corpus conditions it produces gaps rather than handoffs, and prioritise accordingly. This is the strongest argument in the corpus for a dedicated residential-care framework.

**C4. Cadastral registry cannot perform for in-scope settlement types.** See A1.

### Class D — no framework owns a function Housing materially depends on

| # | Unowned function | Housing's dependency | Status in v0.1.5 |
|---|---|---|---|
| D1 | Civil registration / legal identity | §3.11, §15.4, all identity-light routes | Acknowledged in prose; **not escalated through the gap machinery** |
| D2 | Lifecycle and gap custody (GMEAIA) | Every unresolved-duty terminus | Assumed; unverified |
| D3 | Energy governance | §6 floor, §8.5 | Silent |
| D4 | Housing affordability as an aggregate | §9 | Distributed across five owners with no integrator, and **not declared unowned** |
| D5 | Building and construction standards | §6, §5.3 | Open Q26, unresolved |
| D6 | Insolvency and secured-credit law | §13, §13.1, §19.10 | External national law; not a corpus interface |
| D7 | Residential-care architecture | §3.13, §5.8, §7.7, `K1` mandates | Open Q47, acknowledged absent |

**On D4.** §9 states that "housing affordability is a systems outcome, not a single universal ratio," monitors thirteen metrics, and distributes response to five owners. Under the brief's exclusion rule, price effects are not jurisdictional defects — correct, and §9 handles them properly. But *absence of an integrator for a cross-cutting outcome* is an authority question rather than a capacity one: if no actor owns the aggregate, no actor can be found to have failed it, and §21 gate 6 (rent or allocation rules worsening scarcity) has no addressee.

Distributed-with-no-integrator may be the right design. It is not currently a *declared* design — §9 reads as delegation. v0.2 should either name an integrator or state explicitly that affordability is monitored-but-unowned by deliberate choice, so the reader is not misled into expecting an accountable party.

**On D1.** The recommendation is procedural and cheap: record the civil-registration gap as a **corpus-level constitutional gap through GMEAIA**, not as a Housing-local note at §15.4. As drafted, the only framework that knows about the missing identity owner is the one that worked around it. Q68 already proposes offering the provisional-identifier pattern as reusable precedent; escalation is the mechanism that would make that offer visible.

---

## 6. Circularity analysis (question 7)

Four traced dependencies, of which one is genuinely circular.

| Path | Verdict |
|---|---|
| §3.14 → CIS §18.1 → §19.1 → `HAB-26`/`27` → competent authority → else gap | **Terminates.** Clean. |
| §16.5 → CIS §18.1 → `HAB-28` fallback → else `HAB-18`/`28` gap → lifecycle interface | **Terminates**, conditional on D2. |
| §19.7 Housing standards ⇄ Migration status → legal applicability → Housing standards | **Circular.** See C1. |
| §19.6 DRR emergency authority → transition → Housing ordinary regime | **Underspecified.** No named trigger for when emergency authority ends. Protracted displacement is covered by §10.1's "temporary or transitional accommodation" and "repeated cycling," but §19.6 does not say so, leaving the longest-duration displacement state apparently unowned at the interface. *Treatment:* add a cross-reference from §19.6 to §10.1 and require the handoff trigger to be named in the adopting jurisdiction's §16.2 authority map. |

**One unallocated joint ownership.** §19.4 states that Housing and Bioregional Polis "jointly meet at housing-needs assessment, affordable-housing production, accessibility, redevelopment, displacement, and CLT resident governance" — six functions with no local allocation rule. CIS §18.1 supplies the general tiebreak via §19.1, so this is not a gap, but §19.4 should cite it, since joint ownership without a named tiebreak is the shape that produces the disputed-responsibility failures §16.5 exists to handle.

**One evidentiary question with no owner.** §8.5 makes deliberate withdrawal of water, sanitation, or energy a constructive eviction; Water & Sanitation 5.2.2 governs lawful disconnection. Nothing says who determines whether a lawful disconnection was *purposed* to force departure. *Treatment:* state that a disconnection conducted under the service framework's own rules is not per se constructive eviction, and name the housing tribunal or equivalent under §5.6 as the body that decides purpose where contested.

---

## 7. Question 6: do the handoffs manufacture authority?

**No.** This is the framework's strongest area, and it should be recorded as such rather than passed over.

| Record | Non-manufacture clause | Location |
|---|---|---|
| `HAB-16` | "does not itself decide priority among competing claimants and does not manufacture a receiving authority" | §14 |
| `HAB-25` | "No dependency record creates privity of contract, tenancy, membership, care eligibility, employment, immigration status, customary authority, or another substantive right" | §7.8 |
| `HAB-28` | custodian "gains no title, allocation, eviction, tax, funding, expropriation, permanent-housing, family-law, care, or enforcement jurisdiction" | §3.18 |
| `HAB-29` | "does not decide whether succession, regularization, transfer, or conversion is legally available" | §3.21 |

§3.18's design is the model: the fallback custodian may use **only powers it already lawfully possesses**, and its function is to keep a duty visible rather than to discharge it. That is the correct answer to the hardest version of the question.

**One residual.** §3.18(5) requires the custodian to "keep the duty visible until accepted, discharged, lawfully extinguished, or recorded as a constitutional gap." Holding a duty visible is itself a duty, and it is new — imposed on a body constituted for other purposes. The framework's authority-effect line ("None until lawfully adopted by a competent jurisdiction...") covers this, but v0.2 should say so at §3.18 rather than relying on the header, since §3.18 is precisely where a reader is checking for manufactured authority.

Note also that §19.14's constraint on Kintsugi and Peace — that refusal of mediation, reconciliation, or testimony cannot become a housing exclusion rule — is correctly scoped. It constrains *housing exclusion*, which is Housing's domain, rather than those frameworks' programme design. Together with §19.15's Regenerative Journeys treatment, it is the cleanest interface prose in the document and the model §§9, 12, 13, and 19.12 should follow.

---

## 8. Function ownership table

| Function | Current owner | Housing role | Authority source | Gap / overlap | v0.2 treatment |
|---|---|---|---|---|---|
| Constitutional interface, data classes, §18.1 allocation | CIS 0.2.3 | Inherits; does not redefine | Frozen, digest | None | Verify Class E "protected non-recording" claim at §15.1 |
| Lifecycle, gap custody, closure | GMEAIA | Terminal sink for all gaps | **Header assertion only** | **D2 — unverified** | **Freeze with version + digest; confirm gap-receipt function. Priority 1** |
| Title, conveyance, rematriation, succession | Hearthstone 2.0.1 | Resident-facing consequences | Frozen | None; Q32 open but correctly scoped | Retain as model interface |
| Land use, density, CLTs, municipal supply | Bioregional Polis 3.0 | Need, adequacy, displacement | Frozen | Six jointly-owned functions, no local tiebreak | Cite CIS §18.1 at §19.4 |
| Unit identity and succession | Cadastral/municipal registry (non-GGF) | Carries identifiers + linkage | §17.1, §3.22 | **A1/C4 — no owner for informal, mobile, pastoralist units** | Reference where registry exists; flagged purpose-limited linkage where not. Resolves Q71 |
| Ecological restoration, rural and customary land | Soil/Living Land (unversioned) | Habitation interface | §0.3 | Unfrozen | Pin version before schema wiring |
| Emergency shelter, evacuation, recovery | DRR (unversioned) | Transition to ordinary habitation | §0.3 | **No named handover trigger; protracted displacement unstated** | Cross-reference §10.1; require trigger in §16.2 map |
| Migration status, reception | Migration (unversioned) | Habitability "once legally applicable" | §0.3 | **C1 — circular; status can disable Housing's floor** | Non-derogable conditions floor on factual habitation |
| Fiscal liability, collection, incentives | Adaptive Tax 0.1.2 | Receives continuity consequence | Frozen | Reciprocal clause unconfirmed | §20 migration pass |
| Pooled capital, funds, beneficiary claims | Shared Capital 0.1.2 | Resident relationships | Frozen | None | Retain |
| Settlement and financial infrastructure | **Financial Systems** | Home-loss continuity interface | **Neither list** | **B1 — unverified owner** | Freeze or reclassify as assumed |
| Mortgage, credit, underwriting | **Future Monetary/Credit** | Home-loss visibility | **Declared non-existent** | **C2** | Reclassify §13 counterparty as external national law |
| Insolvency, receivership, creditor sale | External national law | Habitation-interest visibility | §13.1 | **D6 — not a corpus interface** | State §13 conformance is conditional on local insolvency law |
| Income, employment continuity, AUBI | **Work in Liberation / AUBI** | States affordability outcomes | **Neither list** | **B1** | Freeze or mark assumed |
| Industry closure, worker transition | Sundown (unversioned) | Tied-housing continuity | §0.3 | One-sentence interface vs. major displacement cause | Expand §19.11; pin version |
| Security-asset conversion | Aegis (unversioned) | Community housing continuity | §0.3 | As above | As above |
| Care, treatment, custody mandates | **Largely absent** | Power separation via `K1` mandates | §3.13, §5.8 | **C3/D7 — rule produces gaps, not handoffs** | Acknowledge; prioritise residential-care framework |
| Disability, family, justice adjudication | **Category, no instrument** | Imports rights; adjudicates none | §19.12 | **B1** | Name instruments or mark unowned |
| Health, discharge, isolation, home care | Global Health 2.2.2 | Continuity once housing action required | §0.3 | Unfrozen | Pin version |
| Water and sanitation | Water & Sanitation 5.2.2 | Habitability, continuity | Frozen | Purpose test for disconnection unowned | Name §5.6 tribunal as decider of purpose |
| **Energy** | **None named** | §6 floor; §8.5 prohibition | — | **B2 — two binding rules, no counterparty** | Name owner or record as gap |
| Building and construction standards | Contested | §6 floor; §5.3 enforcement | §1.4 boundary is circular | **A3/D5 — Q26 unresolved** | §6 as outcomes only; enforcement to external authority |
| Tourism, platforms, short-term letting | Regenerative Journeys 1.1 | Resident consequences via `HAB-23` | Frozen | None | Retain as model interface |
| Survivor support, restorative process | Kintsugi 2.2.1, Peace 1.8.1 | Receives handoff; bars conditionality | §0.3 | Unfrozen | Pin versions; retain scoping as model |
| Child and family stabilization | Hearthlight 2.1 | Habitation and prevention route | §0.3; clause unpinned by the draft's own admission | Unfrozen | Pin exact clause |
| **Civil registration / legal identity** | **None** | **Performs a substitute function** | §3.11, §15.4 | **A2/D1 — acknowledged, not escalated** | Record as corpus-level gap via GMEAIA; retain Q68 precedent offer |
| Housing affordability (aggregate) | **Distributed, no integrator** | States outcomes | §9 | **D4 — unownedness not declared** | Name an integrator or declare monitored-but-unowned |

---

## 9. Recommendations for v0.2, in priority order

1. **Freeze GMEAIA** with version and digest, and confirm it can receive a constitutional gap originating in an adopting jurisdiction. Everything else in the closure architecture is downstream of this.
2. **Add a third source category to §0.2/§0.3**: owners named in the body but verified in neither pass — currently GMEAIA, Financial Systems, Work in Liberation, AUBI, and the §19.12 cluster. Extend §0.3's verification caveat to cover it. This is a one-table change that converts an invisible risk into a tracked one.
3. **Split `HAB-28`/`K7`'s terminal gap state** into `authority_gap`, `mandate_gap`, and `unperformed_duty`, with only the first two escalating under `C1`. Prevents the corpus accumulating capacity problems as constitutional defects.
4. **Close the Migration circularity** with a non-derogable habitability floor attaching to factual habitation regardless of status, parallel to §3.11's process floor.
5. **Resolve Q71 by rule** — reference where a registry exists, flagged purpose-limited linkage where none does — to prevent Housing becoming the de facto place register for informal and mobile habitation.
6. **Resolve Q26** by restating §6 as outcome specifications with no enforcement verb.
7. **Escalate the civil-registration gap** out of §15.4 prose and into the gap machinery.
8. **Name an energy counterparty** or record its absence as a gap; §6 and §8.5 currently bind against nobody.
9. **Declare §9's affordability integrator** — either name one or state that the aggregate is deliberately monitored-but-unowned.
10. **State that the §14 interface layer is unratified** until §20's migration pass completes, and add a precondition to §21 gate 12.
11. **Expand §19.11 and §19.12** to the standard set by §19.14 and §19.15, which are the two interfaces that get scoping right.
12. **Verify §3.4 against CIS 0.2.3** and cite rather than restate if functional separation is already supplied.

**Composition with audits 3 and 4.** This audit adds no new records or primitives. Its structural changes land inside existing objects: the terminal-state split is on `K7`, the non-derogable floor is an `applicable_standard` value on the interest (audit 4's `C9`), and the registry rule is a qualifier on `B4`. The three audits are consistent: audit 3 reduced 29 records to 9, audit 4 reduced 17 concepts to 4 primitives, and audit 5 finds that the resulting architecture is sound but rests at several points on counterparties nobody has checked.

---

Let me work through the interface layer — the §0.2/§0.3 freeze lists turn out to matter a lot here.The non-manufacture discipline holds — all four handoff records carry explicit clauses and §3.18 is genuinely well-designed. The problem is one layer up.

**The verification asymmetry is the core finding.** Cross-checking every named owner against §0.2 and §0.3 produces a third category the document doesn't acknowledge: owners named in the body that appear in *neither* list. GMEAIA (3 mentions, including the header), Financial Systems (5), Work in Liberation (3), AUBI (2), and the whole §19.12 disability/family/justice cluster. §0.3 carries a verification caveat; nothing covers these, so they're asserted with *less* evidentiary support than the ones flagged as provisional.

**GMEAIA is the priority.** CIS is frozen with a digest; GMEAIA is declared the lifecycle interface in the header and gets three lines at §19.2 — while being the terminal sink for §3.14, §3.18, §16.5, §19.1, and Q54. If its gap-recording function isn't as assumed, "record the gap" becomes indistinguishable from "drop the duty," and audit 3's `C1` inherits the same dependency.

**§25's own diagnosis applies to §§9, 13, and 19.12.** "That promise needs an owner" — and Housing then routes resident affordability to AUBI and Work in Liberation, credit to a framework it says doesn't exist yet, and disability/family/justice to a category with no instrument. Same failure §20 exists to correct elsewhere.

**One genuine circularity:** §19.7's "once those standards are legally applicable." Migration owns status, status determines applicability, so a status decision can lawfully switch off Housing's habitability floor — and §3.11 doesn't close it, because that's a process floor, not a conditions floor. This activates your own gate 4.

**One structural fix worth doing regardless:** `HAB-28`'s single "constitutional gap" state covers an authority gap, a mandate gap, and a capacity gap. Since the brief excludes capacity from jurisdictional defects, keeping them in one state means the corpus will accumulate false constitutional defects — an under-resourced municipality generates the same record as a genuine hole in the law.

Two interfaces are worth holding up as the standard: §19.14 (Kintsugi/Peace) and §19.15 (Regenerative Journeys). Both constrain *housing exclusion* rather than the other framework's programme design, which is exactly the right scoping. §19.11 and §19.12 should be rebuilt to match.
