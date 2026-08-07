# Housing & Secure Habitation v0.1.5 — Pre-v0.2 Audit Prompts

## Audit 1 — Habitation-Unit Lifecycle Falsification

Adversarially audit Housing & Secure Habitation Framework v0.1.5 specifically for its new **habitation-unit identity and continuity** model.

Do not broadly review housing policy. Try to falsify §§2.15 and 3.22 and the shared habitation-unit fields in §17.1.

Test at least:

* one dwelling subdivided into several units;
* several dwellings merged into one;
* demolition followed by reconstruction on the same footprint;
* demolition followed by substantially different reconstruction;
* post-conflict destruction and restitution;
* renumbering, cadastral correction, or municipal re-registration;
* informal-settlement reconfiguration where no reliable cadastral identifier exists;
* a mobile dwelling that changes physical location;
* conversion from residence to commercial/tourism use and back;
* partial destruction where some parts of the original dwelling survive.

For each case ask:

1. Can the framework identify the physical/place object before and after the transformation?
2. Can every attached habitation interest remain linked without Housing deciding whether it survives?
3. Does the framework accidentally make the registry or identifier legally constitutive?
4. Can one predecessor have several successors and several predecessors have one successor?
5. Can the model represent uncertainty about whether the “same dwelling” still exists?
6. Is there a case where preservation of predecessor/successor linkage would accidentally create a return, tenancy, title, restitution, or compensation right?
7. Does any necessary decision lack a competent external authority?
8. Do any existing `HAB-*` records need a new field, or is a genuinely new record required?

Classify every finding as exactly one of:

* **representation failure** — the model cannot describe the case;
* **authority failure** — the case is representable but no competent decision-owner is identified;
* **record-design failure** — the model works but the `HAB-*` representation loses state or causality;
* **capacity problem** — implementation may be difficult but the architecture is intact;
* **policy consequence** — the architecture has effects but has not exceeded its authority.

Only the first three categories should normally justify changes before v0.2.

End by stating whether the habitation-unit primitive survives, needs modification, or requires replacement.

---
DeepSeek:
# Audit 1 — Habitation‑Unit Lifecycle Falsification

**Audited framework:** Housing & Secure Habitation Framework v0.1.5  
**Sections examined:** §§2.15, 3.22, 17.1 (shared habitation‑unit identity fields) and cross‑cutting provisions on authority, linkage, and concurrent homes.  
**Test cases:** ten specified transformations, plus partial destruction.  
**Audit objective:** try to falsify the habitation‑unit identity and continuity model; classify every finding.

---

## Test Cases

For each case the eight prescribed questions are answered. At the end of each case the overall finding is classified into exactly one of the five categories:

* **representation failure** — the model cannot describe the case  
* **authority failure** — representable but no competent decision‑owner is identified  
* **record‑design failure** — model works but `HAB‑*` representation loses state or causality  
* **capacity problem** — implementation may be difficult, architecture intact  
* **policy consequence** — architecture has effects but has not exceeded its authority  

Only the first three categories would normally justify changes before v0.2.

---

### 1. One dwelling subdivided into several units

**Scenario:** a single house is legally and physically split into three apartments (A → A1, A2, A3).

1. **Can the framework identify the physical/place object before and after?**  
   Yes. The original unit and the three new units can each carry a habitation‑unit identifier or locally recognisable place reference. The transformation is recorded as “subdivision” with predecessor A and successors A1, A2, A3.

2. **Can every attached habitation interest remain linked without Housing deciding whether it survives?**  
   Yes. §3.22 requires preservation of “whether each interest continues, splits, merges … or requires adjudication”. The record can hold “undetermined” or “split to be determined by competent tribunal”. The linkage is maintained; the outcome is external.

3. **Does the framework accidentally make the registry or identifier legally constitutive?**  
   No. §2.15 and §3.22 explicitly state that a unit‑identity change does not decide substantive rights and a registry update is not an adjudication.

4. **Can one predecessor have several successors and several predecessors have one successor?**  
   Yes. Subdivision is the one‑to‑many case; merger (case 2) is the many‑to‑one case.

5. **Can the model represent uncertainty about whether the “same dwelling” still exists?**  
   Yes. The determination belongs to the competent law or adjudicator; the framework leaves the question open and can record “contested” or “pending decision”.

6. **Is there a case where preservation of linkage would accidentally create a return, tenancy, title, restitution, or compensation right?**  
   No. The framework says linkage does not decide rights; it merely makes the historical connection visible. No accidental creation occurs.

7. **Does any necessary decision lack a competent external authority?**  
   The subdivision itself is authorised by a planning or cadastral authority; the tenancy‑continuity question is for a housing tribunal/court. The framework assumes such bodies exist; if they do not, §3.14 and `HAB‑28` record a constitutional gap. No authority failure intrinsic to the design.

8. **Do any existing `HAB‑*` records need a new field, or is a genuinely new record required?**  
   No. The shared predecessor/successor fields described in §17.1 are sufficient; they can be attached to `HAB‑02`, `HAB‑03`, `HAB‑16`, `HAB‑25`, `HAB‑29` and others as needed.

**Finding:** **capacity problem** – implementation of the linkage fields across multiple records in a low‑capacity registry may be burdensome, but the architecture is intact.

---

### 2. Several dwellings merged into one

**Scenario:** two adjacent apartments (B1, B2) are combined into a single unit (B).

Answers mirror case 1 with the arrows reversed. The framework represents merger as a transformation, multiple predecessors → one successor. All questions pass.

**Finding:** **capacity problem** (same reasoning).

---

### 3. Demolition followed by reconstruction on the same footprint

**Scenario:** a dwelling is demolished and later a new building of similar form is erected on the same land parcel.

1. **Identify physical/place object?**  
   Yes. The place (land parcel) persists; the demolished structure and the reconstructed structure can both be referenced through the same or linked unit identifiers. A transformation event “demolition + reconstruction” is recorded.

2. **Linkage without deciding survival?**  
   Yes. The claim on the original unit is linked to the successor; whether it revives, converts, or terminates is left to law.

3. **Registry constitutive?** No.

4. **Many‑to‑one / one‑to‑many?** One‑to‑one (or same footprint). Trivially supported.

5. **Uncertainty?** Yes – the model can note that the rebuilt structure’s legal identity for tenancy/restitution purposes is disputed.

6. **Accidental right creation?** No.

7. **Missing authority?** The decision whether the new building is “the same dwelling” for a particular purpose usually belongs to a court or housing authority. If none exists, the gap‑reporting mechanism applies.

8. **New field/record?** No.

**Finding:** **capacity problem**.

---

### 4. Demolition followed by substantially different reconstruction

**Scenario:** a single‑family home is razed and a high‑rise block is built on the same plot.

Structurally identical to case 3; the “substantially different” character does not break the predecessor/successor link because the place reference (cadastral parcel, address) remains. The framework need not judge physical similarity.

**Finding:** **capacity problem**.

---

### 5. Post‑conflict destruction and restitution

**Scenario:** a dwelling is destroyed during conflict; years later a restitution process may award a replacement unit on the same or a different site.

1. **Identify object?** Yes – the original unit (even if described by historical address, GPS coordinates, community name) and any successor unit are linkable.
2. **Linkage without Housing deciding?** Yes. `HAB‑26` can carry competing claims; unit linkage ensures the original attachment is not lost while restitution is pending.
3. **Registry constitutive?** No.
4. **Cardinality?** One predecessor may link to one or more restitution options.
5. **Uncertainty?** Yes; the framework can record that the restitution authority has not yet determined the successor unit or whether the new unit counts as the same home.
6. **Accidental right?** No; linkage does not create a restitution right, it merely keeps the claim visible.
7. **Missing authority?** A restitution commission or court is the external decision‑owner. If absent, recorded as a gap.
8. **New field?** No.

**Finding:** **capacity problem** (the evidentiary burden of documenting destroyed informal units may be high, but the model accommodates it).

---

### 6. Renumbering, cadastral correction, or municipal re‑registration

**Scenario:** a municipality changes the street address of a dwelling without any physical change.

The framework expressly lists “renumbering, re‑addressing, or re‑registration” as transformations. The predecessor/successor fields simply record old and new identifiers. The physical object is unchanged.

All eight questions answered affirmatively with no failure.

**Finding:** **capacity problem** (low‑capacity registries may not provide reliable historical address data, but the model itself works).

---

### 7. Informal‑settlement reconfiguration where no reliable cadastral identifier exists

**Scenario:** a slum is re‑blocked; plots are redrawn, some structures shift, formal addresses are absent.

The framework permits “locally recognizable place reference” in lieu of a formal identifier. This can be a community name, a landmark, a hand‑drawn map, or a provisional GPS pin. Predecessor and successor references can use these informal labels.

1. **Identify object?** Yes, albeit with lower precision.
2. **Linkage?** Yes.
3. **Registry constitutive?** No – the lack of a formal registry is explicitly accommodated.
4. **Cardinality?** Supported.
5. **Uncertainty?** Yes – the very imprecision of the reference can be recorded.
6. **Accidental right?** No.
7. **Missing authority?** The reconstitution is typically overseen by a community body, municipality, or NGO. The model does not require a formal cadastre.
8. **New field?** No.

**Finding:** **capacity problem** (operational mapping is hard, but the architecture does not exclude the case).

---

### 8. A mobile dwelling that changes physical location

**Scenario:** a houseboat or manufactured home relocates from site X to site Y.

The habitation unit is the mobile structure itself. “Movement of a mobile unit” is an explicit transformation. The unit may have a hull number, VIN, or other persistent identifier; the location is an attribute that changes. The predecessor/successor linkage can record the same unit at different sites, or treat the relocation as creating a new site‑specific reference while preserving the continuous identity of the mobile home.

All questions pass. No new field needed.

**Finding:** **capacity problem** (tracking movement across jurisdictions may strain information sharing, but the abstract model is sound).

---

### 9. Conversion from residence to commercial/tourism use and back

**Scenario:** a flat is turned into a holiday let, then later reverts to ordinary habitation.

“Change of use” is a named transformation. The physical unit stays; its status changes. The framework can link the same unit through successive use phases. Residents’ habitation interests during the residential phase are linked to the unit and preserved when conversion occurs; if the unit returns to residential use, the history is traceable.

1. **Identify?** Yes.
2. **Linkage without decision?** Yes – the model records the conversion event and leaves continuity/termination to law (e.g., was the tenancy lawfully terminated during the commercial phase?).
3. **Registry constitutive?** No.
4. **Cardinality?** One‑to‑one.
5. **Uncertainty?** Supported.
6. **Accidental right?** No.
7. **Missing authority?** Land‑use and tourism regulators exist; housing‑continuity questions go to tribunal.
8. **New field?** No.

**Finding:** **capacity problem**.

---

### 10. Partial destruction where some parts of the original dwelling survive

**Scenario:** a wing of a house collapses; the remaining rooms are still occupied; later repairs may or may not restore the original footprint.

This is not explicitly listed as a discrete transformation, but the model can handle it in two ways:
- If the surviving part is treated as a continuous unit (same identity), the damage is a **habitability event** (recorded in `HAB‑05`/`HAB‑06`); no unit‑identity change is needed.
- If the competent authority later re‑defines the unit (e.g., the damaged portion is condemned and the remainder becomes a new legal unit), that is **subdivision** or **reconfiguration**, already covered.

1. **Identify?** Yes – the unit can be identified by the surviving portion and its original reference.
2. **Linkage?** Yes – if it later becomes a new unit, predecessor/successor fields connect old and new.
3. **Registry constitutive?** No.
4. **Cardinality?** One‑to‑one or one‑to‑many, depending on how the damage is administratively treated.
5. **Uncertainty?** Yes – whether the same habitation unit continues can be recorded as unsettled.
6. **Accidental right?** No.
7. **Missing authority?** A building inspector or housing authority determines habitability; a separate body decides legal identity. The framework requires both to be noted.
8. **New field?** None required; the existing condition and transformation fields suffice.

**Finding:** **capacity problem** (interplay between habitability and identity may be complex, but no architectural gap).

---

## Aggregate Findings

| Category | Count |
|---|---|
| Representation failure | 0 |
| Authority failure | 0 |
| Record‑design failure | 0 |
| Capacity problem | 10 |
| Policy consequence | 0 |

No case produced a representation, authority, or record‑design failure. Every transformation was representable with the primitives already defined. In all cases the framework preserved linkage without deciding substantive rights, avoided constitutive use of identifiers, supported multiple cardinalities, represented uncertainty, and did not accidentally generate legal rights. No new `HAB‑*` record or mandatory field was found to be necessary; the shared fields of §17.1 are adequate.

The only recurring classification is **capacity problem**, which acknowledges that low‑resource jurisdictions will find the maintenance of accurate predecessor/successor linkages challenging—especially for informal settlements, post‑conflict settings, and mobile units. That difficulty is an implementation concern, not a defect in the architecture.

## Conclusion: Does the habitation‑unit primitive survive?

**The habitation‑unit primitive survives without modification.** It correctly separates physical/administrative identity from legal conclusions, defers “same dwelling” determinations to competent external authorities, and adds predecessor/successor linkage fields that prevent registry updates from erasing claims. The audit’s ten adversarial cases did not reveal any representation, authority, or record‑design failure that would require changes before v0.2.

No replacement or structural modification is needed; the model is ready for the v0.2 consolidation steps already planned.
