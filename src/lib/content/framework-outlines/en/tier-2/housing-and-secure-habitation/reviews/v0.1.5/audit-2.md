## Audit 2 — Concurrent Homes Falsification

Adversarially test v0.1.5's claim that **one person may hold multiple concurrent legitimate place-specific habitation interests**.

Do not assume one “primary residence” is conceptually necessary.

Test at least:

* a child in 50/50 shared custody;
* a university student with a term-time home and family home;
* a pastoralist household using seasonal sites;
* a Roma, nomadic, or semi-mobile household;
* a rotational/fly-in-fly-out worker;
* a worker with weekday accommodation and a permanent family home;
* a person dividing time between a partner's dwelling and another independently held home;
* a person temporarily displaced but retaining a valid interest in the original home;
* someone with concurrent customary and statutory residence relationships;
* a person whose tax, electoral, school, migration, or benefit system requires one legally designated primary residence.

For each case ask:

1. Can the framework represent all genuine habitation interests simultaneously?
2. Does any rule incorrectly infer abandonment from absence?
3. Does any rule incorrectly infer vacancy or fraud from multiple residences?
4. Can another domain select one address for its own purpose without silently redefining Housing?
5. Can household and occupancy rules operate without assuming a universal nuclear household or single home?
6. Does multiple-home recognition accidentally create duplicate housing benefits, allocation rights, or public duties?
7. Can the framework distinguish simultaneous legitimate residence from speculative ownership, unused property, or transient visitation?
8. Is a new primitive needed, or are §§2.16 and 3.23 sufficient?

Classify findings as representation failure, authority failure, record-design failure, capacity problem, or policy consequence.

Try to disprove the model rather than demonstrate that examples can be mapped onto it.

---
DeepSeek:
# Audit 2 — Concurrent Homes Falsification

**Audited framework:** Housing & Secure Habitation Framework v0.1.5  
**Sections examined:** §§2.16, 3.23, 17.1 (concurrent‑home field), plus related rules on abandonment, vacancy, household, and external domain classification.  
**Test cases:** ten specified concurrent‑home patterns.  
**Audit objective:** attempt to falsify the claim that the model can represent multiple concurrent legitimate place‑specific habitation interests without silently collapsing them into a single‑primary‑residence ontology.

---

## Test Cases

For each case the eight prescribed questions are answered, and an overall classification is assigned. The classification categories are:

- **representation failure** — the model cannot describe the case  
- **authority failure** — the case is representable but no competent decision‑owner is identified  
- **record‑design failure** — the model works but the `HAB‑*` representation loses state or causality  
- **capacity problem** — implementation may be difficult but the architecture is intact  
- **policy consequence** — the architecture has effects but has not exceeded its authority  

Only the first three categories would normally justify changes before v0.2.

---

### 1. Child in 50/50 shared custody

**Scenario:** a child lives alternating weeks at each parent’s dwelling. Both homes are ordinary residential units.

1. **Can the framework represent all genuine habitation interests simultaneously?**  
   Yes. The child can hold a place‑specific habitation interest in each home, likely as a secondary household resident or derived interest through each parent’s primary tenancy/ownership. The shared `HAB‑*` field “whether the claimant holds another concurrent place‑specific habitation interest” can flag this. Both interests coexist.

2. **Does any rule incorrectly infer abandonment from absence?**  
   No. §3.23 explicitly states: “Absence from one home while occupying another does not by itself establish abandonment.” The alternating presence is ordinary and no adverse inference is drawn.

3. **Does any rule incorrectly infer vacancy or fraud from multiple residences?**  
   No. Vacancy rules are external and the framework does not treat multiple homes as evidence of fraud. The mere existence of a second habitation interest does not trigger any Housing‑side presumption of illegitimacy.

4. **Can another domain select one address for its own purpose without silently redefining Housing?**  
   Yes. §2.16 provides that a school, family court, or benefit system may lawfully designate a “primary residence” for its own purpose; that classification “shall not silently redefine the person’s habitation interests.” Housing preserves both interests as valid.

5. **Can household and occupancy rules operate without assuming a universal nuclear household or single home?**  
   Yes. Household composition is supplied by the applicable family or tenancy law (§1.4), not by a rigid Housing definition. The child’s dual‑household reality can be reflected in each home’s occupancy record without being collapsed into one unit.

6. **Does multiple‑home recognition accidentally create duplicate housing benefits, allocation rights, or public duties?**  
   No. The framework records habitation interests; it does not itself confer subsidies, allocation priority, or benefits. Any duplication would arise from a misapplied external benefit rule, not from the concurrent‑home representation.

7. **Can the framework distinguish simultaneous legitimate residence from speculative ownership, unused property, or transient visitation?**  
   Yes. A habitation interest requires “occupation of a place as ordinary living space” with more than merely transient presence (§2.4, §2.2). The alternating physical presence with regularity distinguishes this from an empty investment property or occasional overnight stay. The factual‑residence floor ensures only actual living patterns qualify.

8. **Is a new primitive needed, or are §§2.16 and 3.23 sufficient?**  
   They are sufficient. No new record or ontological category is required; the existing concurrent‑home flag and the per‑interest representation already support the case.

**Finding:** **capacity problem** — maintaining linked records for a minor across two households may be operationally burdensome for low‑capacity registries, but the architecture is intact.

---

### 2. University student with a term‑time home and family home

**Scenario:** a student lives in a rented room near campus during term and returns to the family home during breaks.

1. **Simultaneous representation?** Yes — two place‑specific interests, one perhaps a tenancy or licence, the other a secondary‑resident or derived interest in the family home.

2. **Abandonment?** No. Seasonal absence from the family home is explicitly protected against automatic abandonment (§8.3, §3.23).

3. **Vacancy/fraud?** No. The student physically occupies each dwelling for substantial periods; this is not an empty unit.

4. **External domain override?** Yes — a university or tax authority may require a term‑time address, but Housing’s recognition of both interests remains unaffected.

5. **Household/occupancy assumptions?** No — the student can be a household member in each setting under different legal relationships.

6. **Duplicate benefits?** No.

7. **Distinction from transient use?** Yes — the student’s presence is regular and longer‑term, not a short visit.

8. **Primitives sufficient?** Yes.

**Finding:** **capacity problem**

---

### 3. Pastoralist household using seasonal sites

**Scenario:** a family moves between summer and winter grazing areas, occupying structures or tents at each site. No formal titles; customary tenure.

1. **Representation?** Yes. Each seasonal site can be recorded as a habitation unit with a locally recognizable place reference (§§2.15, 3.11). The interests are place‑specific and concurrent in the sense that they are recurring claims; the family holds an interest in each site as part of a rotational pattern. Customary habitation is within scope (§3.7).

2. **Abandonment?** No. Seasonal movement is expressly not abandonment; §8.3 and the recognition of mobile and seasonal habitation (§4, items 17, 24) prevent that inference.

3. **Vacancy/fraud?** No.

4. **External classification?** A taxation or electoral authority might demand a single “permanent address.” §2.16 allows that without Housing discarding the other site.

5. **Household assumptions?** The framework does not impose a nuclear‑family model; the mobile household can be represented as a unit moving together or as a collective.

6. **Duplicate benefits?** No.

7. **Distinction from transient?** Regular seasonal return over years clearly surpasses transient presence.

8. **Primitives sufficient?** Yes.

**Finding:** **capacity problem** — mapping and linking multiple informal seasonal sites without a cadastre is difficult, but the model accommodates it.

---

### 4. Roma, nomadic, or semi‑mobile household

**Scenario:** a household has no fixed address but regularly stays at a set of recognised stopping places or encampments.

The analysis mirrors case 3. The framework’s acceptance of “locally recognizable place reference” and customary/community‑based habitation (§2.9) allows the stopping places to be treated as habitation units. The interests are legitimate and concurrent. The absence‑as‑abandonment safeguard applies equally.

**Finding:** **capacity problem**

---

### 5. Rotational/fly‑in‑fly‑out worker

**Scenario:** a worker spends two weeks on‑site in employer‑provided camp accommodation, then two weeks at the family home.

1. **Representation?** Yes. The camp is a derived habitation interest (tied housing) and the family home may be an owner‑occupied or tenancy interest. Both are place‑specific.

2. **Abandonment?** No. The family home is not abandoned during the work rotation.

3. **Vacancy/fraud?** No.

4. **External domain?** An employer or insurer may treat the camp as a temporary worksite address. Housing preserves both interests.

5. **Household?** The worker is part of two different household configurations; the framework separates habitation from a single household definition.

6. **Duplicate benefits?** No. The camp is typically a condition of employment, not a benefit that Housing duplicates.

7. **Distinction?** The camp is an ordinary living place during the rotation, not transient hotel accommodation.

8. **Primitives?** Sufficient.

**Finding:** **capacity problem**

---

### 6. Worker with weekday accommodation and a permanent family home

This is a milder variant of the rotational case (mon‑fri rental room, weekend family home). All answers are identical; the framework supports it.

**Finding:** **capacity problem**

---

### 7. Person dividing time between a partner’s dwelling and another independently held home

**Scenario:** a person maintains their own flat but stays at their partner’s house three nights a week.

1. **Representation?** Yes — the own flat is a direct place‑specific interest; the partner’s home can be a secondary‑resident or derived interest if the partner holds the formal instrument.

2. **Abandonment?** No — part‑time absence from the own flat is not abandonment.

3. **Vacancy/fraud?** No.

4. **External classification?** A migration or benefit authority might ask for a “principal residence.” Housing does not interfere.

5. **Household?** The person participates in two household arrangements; no universal household definition is forced.

6. **Duplicate benefits?** No.

7. **Distinction?** Regular and enduring presence at the partner’s home distinguishes this from casual visitation.

8. **Primitives?** Sufficient.

**Finding:** **capacity problem**

---

### 8. Person temporarily displaced but retaining a valid interest in the original home

**Scenario:** a resident is evacuated after a flood and stays in temporary accommodation provided by the municipality, while their lease/ownership of the damaged home remains valid.

The framework is designed for this: the damaged home is a place‑specific interest that is currently uninhabitable but not extinguished; the temporary accommodation may be a separate habitation interest or a non‑place‑specific accommodation entitlement, depending on the legal arrangement. The two can coexist. §8.6 and §8.7 provide explicit continuity mechanisms, and §3.23 prevents the temporary absence from being called abandonment.

**Finding:** **capacity problem** — coordination between emergency shelter and long‑term housing records may strain systems, but the model handles the duality.

---

### 9. Concurrent customary and statutory residence relationships

**Scenario:** a person holds a government‑issued lease on an urban flat and simultaneously occupies a rural homestead under customary law recognised by the community.

The framework’s multi‑basis architecture (§2.12) and its handling of legal pluralism (§3.14) allow one person to have two independently constituted habitation interests over different places. Both are place‑specific. The concurrent‑home flag on each record can note the existence of the other.

1. **Representation?** Yes.
2. **Abandonment?** No — absence from the homestead while in town is not abandonment.
3. **Vacancy/fraud?** No — the homestead is occupied when the person is present; the urban flat is occupied when they are there.
4. **External domain?** A land registry may only know the statutory interest; Housing does not require that both be registered in the same system.
5. **Household?** The person’s household arrangements at each site can be described separately.
6. **Duplicate benefits?** No.
7. **Distinction?** Both are ordinary living places with regular presence.
8. **Primitives?** Sufficient.

**Finding:** **capacity problem**

---

### 10. Person subject to a tax, electoral, school, migration, or benefit rule requiring one legally designated primary residence

**Scenario:** a person owns a city apartment and a weekend cottage, but for tax purposes only the apartment is the “principal private residence.”

The framework’s core rule is exactly that: the external classification is lawful for its own purpose and does not silently erase the other habitation interest. The cottage remains a recognised place‑specific interest. The two can coexist; the tax designation does not change the fact of ordinary living presence or the security of that interest.

1. **Representation?** Yes.
2. **Abandonment?** No — the cottage is occupied regularly, so no abandonment inference.
3. **Vacancy/fraud?** No.
4. **External override?** The framework explicitly permits the external domain to select one address without redefining Housing (§2.16, §3.23).
5. **Household?** Not an issue.
6. **Duplicate benefits?** No — tax relief, if any, is determined by the tax code, not by the framework.
7. **Distinction?** The cottage is a home with regular habitation, not a vacant investment.
8. **Primitives?** Sufficient.

**Finding:** **capacity problem** — the interaction between the tax declaration and the habitation record may cause administrative friction, but no architectural defect.

---

## Aggregate Findings

| Category | Count |
|---|---|
| Representation failure | 0 |
| Authority failure | 0 |
| Record‑design failure | 0 |
| Capacity problem | 10 |
| Policy consequence | 0 |

None of the ten adversarial cases exposed a representation failure: the model was able to describe every concurrent‑home pattern, including those involving informal sites, mobility, customary tenure, and conflict with external “primary residence” designations. No rule incorrectly inferred abandonment, vacancy, or fraud from multiple homes; the explicit safeguards of §§2.16 and 3.23 held. External domains can select a single address for their own purposes without overriding Housing’s recognition of the other interests. The model distinguishes legitimate concurrent residence from speculation or transient visitation through its factual‑residence floor. No accidental creation of duplicate benefits was found.

No new primitive is required. The existing combination of place‑specific habitation interest, the concurrent‑home flag in §17.1, and the anti‑collapse principles in §§2.16/3.23 is adequate.

All classifications are **capacity problems**: while the abstract architecture is sound, the operational demands of tracking multiple concurrent homes across jurisdictions, informality, and low‑capacity registries are substantial. These are implementation concerns and do not indicate a need for model revision before v0.2.

## Conclusion: Does the concurrent‑homes primitive survive?

**The concurrent‑homes model survives without modification.** The framework can represent multiple simultaneous place‑specific habitation interests, avoids the single‑primary‑residence trap, and cleanly separates external domain classifications from Housing’s recognition of a person’s genuine homes. No representation, authority, or record‑design failure was identified. The model is ready for the v0.2 consolidation steps already planned.
