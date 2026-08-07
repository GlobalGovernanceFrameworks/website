**Gemini's review needs sorting before it can be acted on**

It reports eighty findings in one register, which makes a capacity problem look identical to a design flaw. They're three different things:

**Representation failures** — the framework cannot describe the arrangement. These falsify the architecture.

**Execution failures** — it describes the arrangement correctly and no institution can deliver. Case 3's "the absence of the state is the defining policy," Case 5's "financially impossible without seizing the employer's capital," Case 10's "physical capacity to replicate that floor does not exist." All true, all real, none of them a defect in this document. Every framework in the corpus has them; the GGF's answer is Phase 0 plus **Authority effect: none**. A framework that only worked where the state was competent and solvent would be a worse framework, not a better one.

**Policy consequences reported as flaws** — Case 2's "lending risk models will re-price mortgage rates, proving that secure habitation directly overrides external financial systems." That isn't an override, it's a price. Protecting tenants through a foreclosure has costs that land on credit; saying so is the honest version. §1.4's disclaimer about mortgage underwriting exists to be truthful about what the framework *governs*, not to pretend it has no effects.

Roughly sixty of the eighty findings fall in the second and third buckets. Which makes the handful in the first bucket much more interesting than the volume suggests.

**The three that actually threaten the architecture**

*Derived interests have no model (Case 1).* This is the strongest finding in the review and it isn't Swedish exotica. §4's taxonomy is a flat list of eighteen relationship types, and "sublet" appears exactly once in the whole document, as a bullet inside a tenancy-terms list. But a subtenant, a lodger, a licensee-from-a-tenant holds an interest *derived from* another interest — and when the primary falls, the derived one falls with it, silently, with no process running against the derived holder because the owner has no relationship with them. Sublets, lodgers and licences are ubiquitous, not Swedish. v0.1.2 now models two positions: the interest-holder (§1.3) and the secondary household resident (§2.8). It needs a third: the derived interest-holder. That's a change to the object model, not a policy addition.

*Two valid interests, one dwelling (Case 8).* The secure-habitation interest is non-exclusive by construction — that's the whole point of separating it from title. Which means nothing in the framework resolves competing claims to the same physical place. §3.5 says residents' rights don't erase others', which is a principle rather than a tie-break. §3.14 routes conflicts to CIS §18.1, but §18.1 allocates decisions *between GGF frameworks*; it has nothing to say when Household A and Household B both hold durable interests in one house. Post-conflict return is the vivid case, but the ordinary version is a returning partner after a separation, or an heir against a long-term occupant. The framework needs a rule naming which authority adjudicates between habitation interests — probably not Housing itself.

*Customary banishment (Case 4).* §3.14 is good and doesn't reach this. The conflict isn't framework-versus-framework, it's community authority versus continuity duty, and CIS §18.1 doesn't arbitrate that either. The framework's own §3.7 protects Indigenous and customary habitation, which is correct and which is also what leaves the expelled person with nowhere to go.

**What didn't get fixed**

All three of those converge on the thing DeepSeek raised and v0.1.2 did not address: **there is no failure-of-last-resort rule.** The document now says three separate times — §3.14, §14, §15.1 — that absence of a competent authority is a constitutional gap and not permission to invent jurisdiction. That is constitutionally correct and it is also the sentence that leaves a person outside.

Every hard case in Gemini's review lands there. The discharged care resident with no HAB-11 placement. The informal settlement where the state denies jurisdiction. The banished community member. The losing household post-conflict. In each, the framework correctly declines to manufacture authority and then stops.

The rule doesn't have to create jurisdiction. It can be a duty of *referral and record* rather than provision: where no competent authority accepts a habitation continuity duty, the most local competent government body shall record the unresolved duty, provide or route to emergency accommodation within its existing lawful powers, and the duty survives until discharged. That's weaker than a right to housing and stronger than a filed gap, and it's the difference between a framework that names its limits and one that ends at them.

**Two things the corpus adds**

Gemini's Case 7 asks who executes process against a private family member without invoking police. The corpus answer is thin: **Kintsugi is the only framework in the GGF that mentions domestic violence at all** — one mention — and §19.14 already names it as the handoff partner. But Kintsugi is restorative-justice shaped, built around survivor sovereignty and voluntary process. It is not an enforcement body. So the named counterparty cannot do the thing the handoff assumes.

Gemini's Case 3 observes that HAB-03 fails where "the foundational legal identities required to open the records do not exist." That's a dependency on **civil registration and legal identity — which the orphan pass flagged and which nothing in the GGF owns.** Aurora governs identity data; Migration governs migrant documentation; nobody owns the register. This raises the priority of that finding: it isn't only a coverage gap, it's now a load-bearing dependency of a framework in active drafting.

**On the split**

Gemini's seam failures in Cases 1, 2 and 9 all report the same shape — the leverage sits on the housing-systems side (supply, finance, zoning, platforms) while the protections sit on the habitation side, leaving the framework "powerless to stop the financial incentives driving displacement."

That's a real observation and it's an argument *against* splitting, not for it. Separate the two and the habitation protocol loses even nominal standing to demand anything of the supply instruments. DeepSeek's formulation is the right resolution: Housing writes demand-side habitation quality and continuity standards; supply-side instruments must meet them without being dictated by Housing. What §9, §12 and §13 need isn't separation — it's named counterparties. Right now they read as provisional chapters. They should read as interfaces with Bioregional Polis, Adaptive Tax, Financial Systems and Regenerative Journeys on the other end.
