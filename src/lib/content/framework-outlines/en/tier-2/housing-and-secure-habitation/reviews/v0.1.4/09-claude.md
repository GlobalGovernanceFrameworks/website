The v0.1.3 pin verifies (`c86f311f…`). And yes — I think there's one genuinely missing primitive, plus a half.

**§2.12–2.14 are a real generalisation, not just an addition**

The two-parent derivation problem I raised is solved more thoroughly than I framed it. §2.12's habitation basis with seven relation types turns derivation from a one-parent chain into a dependency graph; §2.13's gatekeeper captures the actor whose decision conditions habitation without touching the dwelling — which is the employer, the care authority, the co-op nominating body, all at once. And "**Dependency is representational. Priority is adjudicatory**" is the maxim that keeps the graph from becoming a priority ranking, which is exactly where a model like this usually goes wrong.

§2.14 is the quiet one and possibly the most useful. Separating a place-specific interest from a non-place-specific accommodation entitlement resolves managed retreat, care placement and homelessness assistance in one move, and it stops the framework from having to pretend that continuity of home always means continuity of *this* home.

**The missing primitive: the dwelling has no identity**

The object model now has fourteen definitions in §2 and twenty-one principles in §3, and every one of them is on the person-and-relationship side. Nothing models the place.

Searched v0.1.4: zero occurrences of subdivision, merger, amalgamation, demolition, reconstruction, rebuild, or unit identity. §2.14's "place-specific" is a property of the *interest*, not of the place.

That matters because the physical unit has its own lifecycle that runs independently of every relationship attached to it, and the framework's records presumably key on a person-and-place pair:

- **Subdivision and merger.** One three-bedroom unit becomes three studios; two flats are knocked together. This is the most common dwelling-level change worldwide and it's near-universal in informal settlements. §2.10 can represent who holds what interest, and nothing represents that the place underneath them changed identity. Every `HAB-03` and `HAB-25` pointing at the old unit is now pointing at something that doesn't exist, or at three things.
- **Demolition and reconstruction.** Gemini's post-conflict case turns entirely on this. Household A's home was destroyed and rebuilt on the same footprint. Is that the same dwelling for continuity purposes? §8.6 handles the case where physical continuity becomes *impossible*, and says nothing about the case where the structure is replaced but the place persists. Those are different, and restitution regimes turn on the difference.
- **Renumbering and re-registration.** Mundane, and it silently breaks record linkage in exactly the low-capacity environments §16's Phase 0 Light is written for.
- **Change of use.** §12.1 governs conversion to short-term accommodation resident-side. The dwelling-side fact — that this unit is or isn't currently a dwelling — has no representation.

What's needed isn't large: a **habitation unit identity and continuity** primitive stating when a physical place remains the same dwelling across subdivision, merger, demolition, reconstruction, renumbering and change of use, and what happens to attached interests when it doesn't. It fits alongside §2.14 and probably needs one principle in §3 and one field in the existing records rather than a new HAB.

**The half: concurrent place-specific interests**

§2.12's "additive" relation covers multiple *bases* supporting one habitation position. It doesn't cover one person holding two *positions* at once.

A child in a 50/50 custody arrangement genuinely has two homes. So does a pastoralist with summer and winter sites, a Roma family, a term-time student, a fly-in-fly-out worker. §4 item 16 lists mobile and seasonal habitation in scope and §8.3 cites seasonal mobility as an explanation for absence — but both treat it as one interest with interruptions rather than two concurrent interests. Every occupancy standard, allocation rule and notice provision that assumes one primary residence will mishandle the shared-custody child, and that isn't a rare case.

Given §2.12 already exists, this is cheap: a sentence saying a person may hold more than one concurrent place-specific interest, and that loss of one does not by itself affect the other.

**And one thing I'd leave alone**

"Household" is load-bearing — §2.8, §3.12, §7.6, and implicitly §6's occupancy standards and §5.4 allocation — and never defined. I'd keep it undefined, because defining household is precisely where housing systems import assumptions about family form, and the framework is right to refuse. But the silence should be deliberate rather than accidental: one line in §1.4 routing household composition to applicable family, succession and allocation law, alongside the existing custody and guardianship disclaimer.

**On stopping**

Agreed, with the unit-identity primitive folded in first. The expansion cycle has been productive — derivation, gatekeepers, fallback custody, place-specificity are all real improvements traceable to specific reviews. But §2 is now fourteen definitions and §3 twenty-one principles, and consolidation is overdue: the document currently contains provisional scaffolding from four revisions, a seam declared testable in three separate places, and twenty-nine HAB records that nobody has checked for overlap. That's the v0.2 work, and it'll be easier with one more primitive in than with a fifteenth arriving after the tightening pass.
