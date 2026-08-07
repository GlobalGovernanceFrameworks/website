This comparative audit tests the v0.1.3 object model against five legally and operationally difficult domains. For each I ask: *can the framework represent the reality without breaking, and where does it strain?*

---

## 1. Subletting, lodging and chains of derived interests

**The model in v0.1.3**  
`Derived habitation interest` (§2.10) captures any residence that depends on a superior habitation relationship rather than on title. `HAB-25` records the dependency, what happens on termination of the superior interest, and any continuation route — without creating an automatic direct tenancy with the owner. The framework allows chains implicitly (a derived interest could itself have a further derived interest) but does not model a chain explicitly.

**Comparative stress test**

| Legal tradition | Typical treatment of sub-occupation | Does the model fit? |
|----------------|--------------------------------------|----------------------|
| English common law | Subtenancy (legal estate) vs. lodger (licence, no estate). A subtenant may have security of tenure; a lodger typically only has contractual protections. Chains of subletting are possible but often restricted by head lease. | `HAB-25` can represent both subtenancy and licence as derived interests. The framework does not need to distinguish property estates because it cares about *habitation consequences*, not property form. A lodger’s interest would be “derived” and the record can note the limited nature. Chains can be modelled by linking multiple `HAB-25` records. |
| German civil law | Subletting (*Untermiete*) requires landlord permission. The subtenant has a contractual right against the tenant, not the owner. If the main tenancy ends, the subtenancy typically falls unless the owner tacitly continues it. | Works well. `HAB-25` can record the dependency. Notice and a short continuation/relocation window could be required by local law; the framework only asks for visibility and belongings protection. |
| French civil law | Similar permission requirement. Statutory protection for certain subtenants is minimal; the relationship is personal. | Same as above. |
| Informal settlements (Global South) | “Landlord” may be a structure owner without title; subletting, room renting, and licence arrangements are common and largely extra-legal. Multiple layers of “rental” exist without any written contract. | The derived-interest concept is essential here. `HAB-25` can record a chain even if no formal superior interest exists, using the “factual residence” path. The “superior interest” may itself be an informal secure-habitation interest recorded under `HAB-03`. The model *must* be able to trace dependency upward without requiring property law formality — and it can. |
| Islamic *ijārah* / customary tenancy hybrids | Often a mix of contract and community norm; sub-tenancy may be permitted or prohibited by local custom. | The model is indifferent to the source of the superior interest; it only needs to record the dependency and the fact that a person lives there. |

**Fault lines and recommendations**

- **Owner knowledge:** A derived interest may exist without the owner’s knowledge. The model should not make protection conditional on owner awareness, but should record whether the superior relationship was authorised, tolerated, or hidden, because that affects practical remedies.
- **Chain tracking:** A single `HAB-25` records one dependency. For a chain A→B→C, you need two linked records. This is workable but creates a risk that mid-chain termination leaves C invisible if the system only tracks immediate dependency. A future version could add an optional “ultimate property interest” reference to help maintain continuity.
- **Lodgers and excluded licensees:** Some jurisdictions deliberately exclude lodgers sharing facilities from almost all protection. The model can still record the derived interest; the question is what minimum protection applies. Section 3.11 (factual residence minimum process) would still require notice and safe handling of belongings before physical removal, which is defensible even where the underlying law gives no tenancy right.

**Verdict:** The object model survives the subletting/lodging test well. The main risk is losing track of multi-link chains; it can be mitigated with implementation guidance.

---

## 2. Succession and separation

**The model**  
The framework does not contain a “succession” record. It treats household members who are not on the primary instrument as secondary residents (`HAB-21`). When the primary holder dies or a couple separates, the habitation question is handed to the relevant family, succession, or property law, while Housing ensures that nobody becomes administratively invisible and that continuity consequences are flagged.

**Comparative stress test**

| Scenario | Real-world treatment | Model fit |
|----------|---------------------|-----------|
| Death of sole tenant (social housing, England) | Statutory succession: a qualifying family member may succeed to the tenancy. If no one qualifies, the tenancy ends. | The framework would record the original interest (`HAB-03`) and any secondary residents (`HAB-21`). The succession event is a change in the legal holder; the new tenancy is a fresh `HAB-03`. Housing doesn’t decide who succeeds, but `HAB-21` ensures the would-be successor is visible and not evicted without process. Works. |
| Death of owner-occupier (civil law forced heirship) | The property passes to heirs; a surviving spouse may have a statutory right of occupancy (*usufruit*, *droit d’habitation*). | Housing records the title and habitation interests separately. The heir’s title is a title matter; the spouse’s habitation right can be a new secure-habitation interest. The framework doesn’t interfere. |
| Divorce / separation — court awards occupancy to one spouse | The court order becomes the constituting instrument for the occupant’s interest; the other spouse is excluded. | `HAB-21` can record the factual residence of both before the order. The court order is a legally cognizable event that modifies habitation rights; `HAB-17` or `HAB-08` can record the change. No housing adjudication is needed. The model supports this without turning it into a tenancy dispute. |
| Unmarried partner not on lease leaves after separation | Often no legal right to stay; the departing partner may be at risk of homelessness. | This is a secondary resident exclusion scenario. `HAB-21` triggers minimum process, belongings protection, and an alternative-accommodation handoff without forcing co-residence. This is exactly the design. |
| Customary law succession (many African systems) | The family or clan head allocates the dwelling to a successor; the widow or children may have use rights but not ownership. | The framework recognises customary tenure relationships. The new occupant’s interest can be recorded under `HAB-03` with a customary basis. Disputes are competing claims (`HAB-26`). The model accommodates this without imposing a Western inheritance logic. |

**Fault lines**

- **The gap between secondary resident and successor:** The model currently creates no automatic bridge from `HAB-21` to `HAB-03`. That is intentional (no automatic co-tenancy), but it also means that when law *does* grant succession, the system must actively create a new primary record. A jurisdiction must have a procedure for converting a `HAB-21` secondary resident into a `HAB-03` holder upon a succession event. The framework could later add a “status-change event” record or simply note in guidance that a qualifying succession is a new `HAB-02/HAB-03` cycle.
- **Simultaneous competing succession claims:** Already covered by `HAB-26`. Works.

**Verdict:** The model holds. The deliberate absence of an automatic succession engine is correct; conversion must be driven by the applicable law, not by Housing. Implementation will need a clear administrative bridge.

---

## 3. Customary and community termination

**The model**  
Section 3.17 and `HAB-27` separate the community/customary decision to exclude someone from a collective residence from the downstream personal continuity consequences. The framework does not overturn the community decision; it keeps the evicted person’s needs visible and routes them to emergency shelter, relocation, or gap recording.

**Comparative stress test**

| Context | Customary termination practice | Model fit |
|---------|-------------------------------|-----------|
| Banishment from a customary village (e.g., parts of West Africa, Melanesia) | The traditional council orders a person or family to leave the community land. Often no formal appeal to state courts, though constitutional challenges are possible. | The framework would treat the council as a competent authority if the legal system recognises it. `HAB-27` records the termination order and separates it from the personal continuity duty. If no state body accepts the duty to rehouse, `HAB-28` records a gap. This is honest. The framework does not force the community to provide alternative housing. |
| Expulsion from a religious community that provides housing (kibbutz, monastic community, ashram) | Membership is conditional; leaving or being expelled ends the right to reside. | This is a community-based habitation interest. The expulsion is a membership matter; Housing would record it and ensure a safe departure, notice, belongings. No power to reinstate. |
| Cooperative housing termination (member voted out) | Cooperative rules are contractual; termination follows a process. | Works within the general termination record (`HAB-09/HAB-10`), but could also use `HAB-27` if it’s a collective decision. The model is flexible. |
| Indigenous law eviction (e.g., First Nation in Canada, Māori land trust) | Indigenous authority is non-substitutable under §3.7. The Nation may evict a non-member or a member for a customary law breach. | The framework explicitly defers to Indigenous authority. Downstream continuity for a non-Indigenous evictee would be the state’s responsibility (a gap if none). This respects sovereignty. |

**Fault lines**

- **Who decides that the customary authority is “competent”?** In plural systems, a state court might later overturn a banishment as unconstitutional. The framework currently records the authority as it appears; if a court later voids the termination, the habitation record would need to be corrected. This is a fact-sensitive post-hoc adjustment, not a design flaw.
- **Downstream continuity duties that fall on the community itself:** Some customary systems have internal obligations to provide for a banished person’s basic needs. The framework doesn’t prohibit that; it simply doesn’t impose it. That’s appropriate.
- **Risk of “continuity” rhetoric undermining collective autonomy:** The framework’s strong statement that Housing shall not use continuity language to override the community decision (3.17) is essential and correctly calibrated. It might benefit from a note that “continuity” in this context means *the personal habitation record is not erased*, not *the person must stay in the community*.

**Verdict:** The object model handles customary termination with appropriate deference and realism. The hardest cases — where no external safety net exists — are truthfully recorded as gaps rather than papered over.

---

## 4. Competing claims to the same dwelling

**The model**  
`HAB-26` records multiple habitation claims, keeps them visible, preserves interim safety and belongings, and hands off to a named competent adjudicator. Housing does not decide priority.

**Comparative stress test**

| Scenario | Competing claim shape | Model fit |
|----------|-----------------------|-----------|
| Post-conflict restitution (Bosnia, Rwanda, Colombia) | A returning refugee family and a current occupant family both claim the house. A restitution commission or court exists. | `HAB-26` records both claims and the commission as adjudicator. Interim occupation is a matter for the commission or court; Housing records the situation without taking sides. Works. |
| Inheritance dispute (siblings all claim the right to live in the parental home) | Title may be disputed; one sibling resides there. | Property law decides title; habitation claims are derived from actual residence. `HAB-26` preserves the resident’s interest while the probate court sorts out ownership. The resident sibling’s habitation interest is not automatically extinguished by a title ruling — the framework makes that visible. |
| Informal settlement eviction vs. long-term occupancy (South Africa, India) | The state or private owner claims title; residents assert a constitutional right to housing or a legitimate expectation. | The framework’s distinction between title and habitation is critical. The state’s eviction suit is a legal ground that opens a process; the residents’ habitation interests are `HAB-03` based on factual residence or legal recognition. The court is the adjudicator. `HAB-26` can be used before the eviction order to map claims. |
| Multiple family members claiming the same social housing unit after the primary tenant leaves | Housing authority has an allocation policy; disputes may arise. | This is an allocation or succession dispute. The allocation authority or tribunal is the adjudicator. `HAB-26` works. |
| Competing customary claims (two clans assert the right to allocate a dwelling) | The land is communal; the chief’s decision may be contested. | If the customary system has an internal resolution mechanism, that is the adjudicator. If not, the dispute may spill into state courts. The model doesn’t require resolution, only recording. |

**Fault lines**

- **What if no adjudicator exists?** The framework says `HAB-28` records a gap. In practice, many countries lack functioning housing tribunals. The framework does not create one; it only records that the duty to decide is unallocated. That’s a genuine limitation, but one that reflects reality. A jurisdiction might later constitute an ad hoc panel; the model allows that without waiting.
- **Interim protection:** The model says interim measures may be ordered “if separately authorized”. That could leave a vacuum where one party self-evicts the other before a hearing. The framework could strengthen the anti-self-help principle here explicitly for competing claims scenarios, though §8.2 already says grounds do not execute themselves.

**Verdict:** `HAB-26` is a well-designed holding pen for competing claims. Its honesty about missing adjudicators is a strength, not a failure.

---

## 5. Identity-light standing

**The model**  
Section 3.11 and 15.4 allow a person to open a housing-protection process using a provisional/local claimant identifier and alternative evidence of residence, without formal civil ID. The housing record does not generate citizenship, migration status, or general identity.

**Comparative stress test**

| Population | Real-world ID barrier | Model fit |
|------------|-----------------------|-----------|
| Undocumented migrants | Fear of deportation prevents contact with authorities; no passport or residence permit. | The model explicitly detaches housing protection from migration status. A shelter or eviction-challenge can be opened with testimony, a witness statement, or a photo. This is operationally radical in many jurisdictions but constitutionally coherent. |
| Internally displaced persons (IDPs) | May have lost documents; live in informal camps or host communities. | Identity-light access is essential. The model supports it. |
| People fleeing domestic violence | May have left home without documents; need emergency shelter and belongings retrieval without alerting the abuser. | The provisional identifier can be a first name + case number. Notice and safety constraints are built into `HAB-21`. The model is strong here. |
| Residents of informal settlements without birth registration (many sub-Saharan African countries) | No state ID at all. | The model allows community attestation as evidence of residence. That’s practical. |
| Nomadic, pastoralist, or Roma communities | May have no fixed address or standard documentation; residence is seasonal. | The framework recognises mobile habitation (§4 item 17) and can use alternative evidence. Works if the jurisdiction accepts the principle. |

**Fault lines**

- **The provisional identifier can’t solve all downstream problems:** Even if Housing accepts the claimant, the person may still be unable to pay rent, open a bank account, or enrol children in school without official ID. That’s outside the framework’s scope, but a note that “identity-light housing access does not by itself unlock other systems” may help manage expectations.
- **Risk of duplicate or fraudulent claims:** The framework acknowledges this open question (Q35). Without a reliable unique identifier, a person might claim assistance in multiple locations. The model doesn’t solve this; it relies on purpose-limited records and anti-fraud review (human, not automated score). In low-capacity environments, this will be messy but not fatal.
- **Provider resistance:** Private landlords and even some social housing providers may refuse to contract without official ID. The framework cannot force them, but it can require that *publicly funded or regulated* providers have a reasonable alternative-evidence route. This could be made clearer in the institutional architecture section.

**Verdict:** The model makes a vital design choice that travels surprisingly well across legal systems, but it must be paired with operational guidance on alternative evidence and on managing provider reluctance.

---

## Overall audit summary

| Object-model component | Cross-system portability | Main vulnerability | Recommendation |
|------------------------|--------------------------|--------------------|----------------|
| Derived habitation interest (`HAB-25`) | High | Multi-link chain visibility | Add guidance on chain tracking; consider optional “root property” reference in record |
| Secondary household residence (`HAB-21`) | High | Bridge to succession primary record | Define a “status-change event” procedure for lawful succession |
| Community/customary termination (`HAB-27`) | High, but politically sensitive | Unresolvable gap if no downstream duty owner | None — the gap is truthfully recorded |
| Competing claims (`HAB-26`) | High | Missing adjudicator in weak states | Keep gap recording; strengthen anti-self-help language for competing-claim scenarios |
| Identity-light standing | Moderately high (operationally challenging) | Duplicate claims, provider resistance | Develop minimum alternative-evidence standards for regulated providers; accept provisional identifiers as legitimate for housing purposes |

**Bottom line:** The v0.1.3 object model survives this comparative test without needing structural change. The framework’s strength is its refusal to pretend that missing adjudicators, missing ID, or missing downstream duty-owners don’t exist. The main work remaining is implementation guidance for chains, succession bridges, and identity-light operation — none of which requires altering the constitutional architecture.
