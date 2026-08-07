This is a useful stress test. I’ll construct four cases where a single person’s right to inhabit one dwelling depends on at least two independently governed relationships, each belonging to a different legal or constitutional domain. In each case I’ll show what the v0.1.3 object model *can* represent, where it strains or breaks, and what kind of claim gets lost, created, or misassigned.

---

## Case 1: The cooperative member with a separate tenancy from a housing association

**Arrangement**  
A person is both (a) a member of a housing cooperative that owns no property itself but allocates tenancies in a block owned by a municipal housing association, and (b) a tenant of the housing association under a periodic assured tenancy. The tenancy is granted only because the cooperative nominated them; the cooperative’s rules say that loss of membership automatically terminates the right to occupy. The housing association’s tenancy agreement says the tenancy can be ended by the landlord giving notice under statute, but it is silent on membership.

**What happens**  
The cooperative expels the member for a disciplinary breach. The housing association, notified by the cooperative, serves notice to quit relying on a contractual term that occupancy is conditional on cooperative membership. The resident claims that the tenancy is a statutory tenancy with independent protections and that the membership condition is an unenforceable collateral contract.

**v0.1.3 representation**  
- `HAB-03` records a tenancy with the housing association.  
- The cooperative is not the owner or landlord; it might be represented as an “allocation authority” or a community-based habitation arrangement, but the framework does not have a clear box for a private-law nominating body that holds a veto over the tenancy without being the landlord.  
- The resident could be considered to have a derived interest via the cooperative? No, the tenancy is direct from the association. The cooperative’s role is an external constraint on that tenancy, not a superior interest.  
- The framework would treat the termination of the tenancy as an eviction process; the cooperative’s expulsion is a community membership termination (could use `HAB-27`). But `HAB-27` separates “community termination” from downstream continuity. Here, the termination is not about community housing; the community doesn’t provide housing, it only controls access to a third party’s housing.  

**Breakage**  
The dependency model requires a superior *habitation* interest for derived interests. Here, the cooperative membership is not a habitation interest—it’s a membership right that functions as a key to a tenancy. The model cannot capture this “external gatekeeper” relationship without either:
- Treating the cooperative as a housing provider (which it isn’t), or
- Creating a new category of non-possessory habitation-control interest that sits outside the framework.

If the framework simply ignores the membership condition and treats the tenancy as a normal secure-habitation interest, it would grant the resident a procedural protection that may not exist in law (the tenancy is genuinely conditional). If it defers to the membership expulsion, it loses the resident’s independent tenancy claim. The framework doesn’t have a way to record that the tenancy is contingent on a relationship governed by another domain (cooperative/association law) without absorbing that domain.

---

## Case 2: The care home resident with a contractual licence and a statutory care package

**Arrangement**  
An elderly person lives in a private care home. They have (a) a written licence to occupy a specific room, signed with the care home operator, and (b) a care package funded and regulated by the local authority under adult social care legislation. The care package entitles them to “accommodation and personal care” but the home is a private entity; the local authority contracts with the home. The licence says the home may terminate on 28 days’ notice for any reason. The care package cannot be withdrawn without a statutory reassessment and appeal rights. If the home terminates the licence, the local authority must find alternative accommodation, but there is a shortage.

**What happens**  
The care home serves notice to quit under the licence. The resident argues that the care package includes a right to accommodation that overrides the private licence, or at least that the local authority must provide alternative accommodation before the licence expires. The home says it is a private housing matter.

**v0.1.3 representation**  
- The framework would recognise the resident as having a mixed housing-and-care arrangement (§3.13, §7.7, `HAB-22`).  
- `HAB-22` maps the housing powers (licence, termination) and the care powers (care plan, assessments). The licence termination is a housing decision; the care package withdrawal would be a care decision.  
- The framework says a housing-management decision cannot silently become a care sanction. That’s fine. But here, the housing decision is not a care sanction; it’s a separate contractual termination. The resident’s right to stay comes from *both* the care package (which imposes a duty on the local authority to provide accommodation) and the licence (which permits occupancy of this specific room). The care package doesn’t give the resident a direct right against the private home; it gives a right against the local authority.  

**Breakage**  
The framework can only protect the habitation relationship with the care home. It can record the care package as an external dependency, but the right to accommodation under the care package is not a “habitation interest” in this specific dwelling—it’s a personal right to be housed *somewhere* by the local authority. If the licence is lawfully terminated, the resident must leave that room; the local authority’s duty continues, but the resident may be homeless in the interim.  

The framework’s continuity-handoff mechanism (`HAB-16` to the care system) could work, but it can’t prevent the lawful termination of the licence if the licence is genuinely independent. The risk is that a resident invokes housing protection to stay in a room when the care home wants them out for non-care reasons (e.g., a business decision to convert the wing). The framework might grant an unintended right by treating the care package as creating a “community-based” or “derived” interest that overrides the licence, which would encroach on care law and private contract. Alternatively, if it defers entirely to the licence, the care-package right to accommodation becomes invisible until relocation fails, which is a loss of claimant visibility.

The model can record the split, but it cannot resolve the substantive conflict between a contractual housing termination and a public-law duty to accommodate without giving Housing the power to stay the termination, which it claims not to have.

---

## Case 3: The diplomatic household worker with tied accommodation and multiple employers

**Arrangement**  
A domestic worker is employed by a foreign embassy. The worker lives in a flat owned by the sending state, allocated by the embassy, but the lease (to the extent one exists) is between the state’s property office and the worker. The worker also has a separate employment contract with the ambassador personally (as head of mission) and a second employment contract with the embassy’s administration for consular duties. The accommodation is tied to the employment with the administration, but the ambassador has personal authority to expel the worker from the flat for “breach of household rules” under diplomatic law. The worker’s immigration status is tied to the employment and accommodation via a diplomatic visa.

**What happens**  
The ambassador expels the worker from the flat without notice, citing misconduct. The administration terminates the employment contract. The worker loses accommodation, employment, and lawful immigration status simultaneously. The worker seeks housing protection, arguing that the flat was their home and that the expulsion was unlawful under local tenancy law. The embassy claims diplomatic immunity.

**v0.1.3 representation**  
- The worker would be an occupant with an employer-linked habitation interest and possibly a tenancy depending on local law.  
- The ambassador is both employer and a representative of the sending state; the accommodation is tied to two distinct employment relationships and one diplomatic status.  
- The framework doesn’t handle diplomatic immunity; it would record the termination as an eviction-like event but has no power to enforce against a foreign state.  
- The model might try to separate the employment termination from the housing loss (tied housing), but the employer and the housing provider are the same entity with multiple legal hats. The worker’s right to the flat depends on (i) the employment contract with the administration, (ii) the ambassador’s discretionary permission under diplomatic protocol, and (iii) the visa conditions. These are three separate domains (labour, diplomacy, immigration).  

**Breakage**  
The framework’s rule against collapsing owner/landlord/employer roles assumes they can be distinguished. In this case, the roles are deliberately fused under a diplomatic umbrella that local housing law may not pierce. The worker would be recorded as having a secure-habitation interest, but the framework has no mechanism to enforce it against a protected actor. This is not a failure of the object model per se, but it reveals that the framework assumes a functional state legal order; it breaks when the housing provider is also a sovereign immune entity. The model might inadvertently imply that a diplomatic expulsion can be regulated by a housing tribunal, which would be a jurisdictional overreach.

Moreover, the dependency model (derived interest) can’t capture the simultaneous dependence on multiple equal-status relationships. The worker’s habitation is not derived from a single superior interest; it’s the product of a legal triangle. Any attempt to model it as a derived interest from the employer would miss the diplomatic dimension, and vice versa.

---

## Case 4: The family member with a customary land right and a statutory tenancy

**Arrangement**  
In a jurisdiction that recognises both customary land tenure and statutory tenancy law, a woman lives on a plot of land. Her husband holds the statutory tenancy granted by the local council for the dwelling built on the land. Under customary law, she has a right to reside on the family land (which includes the plot) by virtue of marriage and clan membership, a right that survives divorce in some interpretations. The customary right is administered by the clan elders; the tenancy is administered by the council.

**What happens**  
The husband divorces her and surrenders the tenancy to the council, which plans to reallocate the dwelling. She claims a right to stay based on her customary land right, arguing that the council’s tenancy is subject to customary ownership. The council says it owns the land and the dwelling, and the tenancy has ended. The clan elders say she has a right to remain, but they have no authority over the council’s housing stock.

**v0.1.3 representation**  
- The husband has an `HAB-03` tenancy with the council.  
- The wife is a secondary household resident (`HAB-21`). When the husband’s tenancy ends, her derived residence ends under ordinary rules unless she has an independent interest.  
- Her customary land right would be a separate `HAB-03` based on customary tenure, but it’s a right to the land, not the dwelling, and it competes with the council’s title. The framework can record the competing claims (`HAB-26`), but it can’t resolve the priority between a statutory housing allocation system and customary land law.  

**Breakage**  
The wife’s habitation depends on two unrelated regimes: the statutory tenancy (through her husband) and the customary land right (directly). Neither is derived from the other; they are parallel and potentially conflicting. The framework’s dependency model can’t easily represent “dual independent sources of right to the same space” unless it treats them as competing claims. But competing claims (HAB-26) are for when two different claimants want the same dwelling, not when a single claimant has two distinct legal bases. The model might force a choice: she is either a secondary resident (lost when the husband leaves) or a customary occupant (which might not be recognised by the council). The framework doesn’t have a clear way to say “she holds both simultaneously, and the loss of one does not extinguish the other” without creating a new kind of “composite interest” that doesn’t exist in law. This could lead to the framework either undervaluing her customary right (treating it as merely a secondary interest) or overvaluing it (implying that customary law trumps state tenancy law).

---

## What these cases expose

1. **The dependency model is unidirectional.** It expects a habitation interest to trace back to a single root (title, provider, or community). When multiple independent roots exist (cooperative membership + tenancy, licence + care duty, employment + diplomatic status, statutory tenancy + customary right), the framework can’t easily represent the conjunction without implicitly merging the domains or making an arbitrary choice about which one is “superior”.

2. **External gatekeepers are invisible.** The framework knows about landlords, providers, and employers, but not about entities that control access to housing without owning or managing it (cooperative nominating bodies, embassy protocol offices, clan councils that don’t grant the tenancy but can veto it). This gap is partly filled by the “allocation authority” concept, but that is for public/social housing; private-law gatekeepers don’t fit.

3. **Composite rights that blend habitation and other domains break the separation principle.** The framework insists on separating housing from care, employment, and migration. But in some legal arrangements, the right to dwell is indivisibly tied to another status, and separating them for procedural protection might create a right that the legal system doesn’t recognise (e.g., staying in a care home after the care package is withdrawn) or extinguish a right that exists (e.g., a customary right that survives divorce but is ignored because the framework only sees the tenancy).

4. **No representation for contingent interests from non-housing domains.** The model can record that a habitation interest is “contingent” in a note, but it can’t enforce that contingency without absorbing the external domain’s decision-making. If the contingency is governed by a non-housing authority (a cooperative’s disciplinary panel, an embassy’s protocol, a clan council’s ruling), the framework must either treat that external decision as a housing event (overreach) or ignore it and treat the habitation interest as unconditional (loss of claimant’s actual legal position).

## Recommendations for v0.2

To survive these adversarial cases, the framework should consider two additions:

- **A “composite habitation interest” record** that can list multiple legal sources of the right to dwell, with explicit priority or independence rules. This would allow a single claimant to hold, for example, “customary occupation right AND secondary household residence” without merging them, and specify that loss of one does not automatically extinguish the other unless a named adjudicator decides.

- **A “gatekeeper” role** distinct from provider/landlord, for entities that control access to housing without owning or managing it. This would cover cooperative nominating bodies, embassy accommodation offices, or customary authorities that allocate state-built houses. The gatekeeper’s power to withdraw access would be a separate decision subject to its own domain’s procedural rules, but the housing consequences would be routed through the framework.

Without such extensions, v0.1.3 handles most ordinary cases but would silently simplify these complex dependencies, either collapsing distinct rights or forcing Housing to adjudicate between domains it claims not to touch.
