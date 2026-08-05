I ran the schema myself rather than take the numbers on trust. **327 entities, 848 relationships, 76 frameworks, 30 tier violations, 1 duplicate ID (`protocol_ethical_ip`), 1 cycle (Millennium ↔ Deep Time), 19 orphans, 21 Ready-but-internal/adversarial, zero external or piloted.** Every count matches exactly. The audit is honest and its arithmetic is sound, which is worth saying because it isn't always.

So: mostly yes on the diagnosis. But I disagree on two of the eight items and on the proposed next step.

## Where it's wrong or overstated

**Tier violations (#3).** The five-field refactor is a large migration for a problem that mostly isn't there. Of the 30 violations, 23 are *sub-entities* — councils, metrics, tools — assigned a lower tier than their own parent framework. Twelve are Pathfinder children pointing at the Tier 2 Regenerative Enterprise Framework; the rest are things like Moon Wish Test (1) → Frontier Governance (4), Sapling Councils (2) → Horizon (3). That's data entry, not six meanings of "tier." A rule that a sub-entity inherits its owning framework's tier clears 23 of them mechanically.

The genuine framework-to-framework inversions are seven: Arts Flourishing(3)→WDIP(4), Mobility Commons(2)→Foundation Protocol(3), Kintsugi(2)→Foundation Protocol(3), Discovery Commons(2)→Digital Commons(3), Hearthlight(2)→Horizon(3), Aegis(1)→Synoptic(2), Aegis(1)→Consciousness(4). Those are editorial calls, and three of them are the same call: Foundation Protocol and Horizon are being depended on as if they were infrastructure, which suggests they're mistiered rather than that tier is incoherent.

**"Capacity Engine has been used for two different frameworks."** `framework_capacity_engine` no longer exists in the schema. `framework_education` carries the name, tier 2, v3.1. You already fixed that. It's a small thing but it means part of the list came from reading documents rather than the current graph — worth discounting the other claims slightly.

## Where it badly understates the problem

It names CERGTA and GMEAIA as the two missing interface entities. I grepped the outlines for the `XXX/0.1` convention:

```
GMEAIA/0.1  75 mentions, 4 outlines      ECRC/0.1   29 mentions, 11 outlines
SCPA/0.1    44 mentions, 11 outlines     CFPAE/0.1  27 mentions,  5 outlines
CERGTA/0.1  35 mentions,  8 outlines     ESDIB/0.1  26 mentions,  5 outlines
```

…plus CDEE, EIPHR, CEACA, SCCA, PRUP, CCAA, BICA, SATN, IAEGCA, RIC. **Fifteen controlling interfaces are referenced; two have schema entities (CIS, SCPA). None of the fifteen exists as a written document.**

And the frameworks aren't merely citing them — they're *defining* them. Across the outlines I count 54 distinct CERGTA record classes and 60 GMEAIA classes, each with trigger, recipient, access class, dependencies and closure conditions, extended independently by each framework that touches them. Drift has already started: CERGTA-11 is "Ecological Rights Review Petition and Standing Record" in Biodiversity and "Rights-review petition" elsewhere; 10 of 54 CERGTA classes have divergent names.

## Which is why I'd not run the audit as proposed

The seven questions — who owns the decision, what confers competence, what record transmits, what activates, who funds, who hears appeal, what happens on absence — are **already answered, per framework**. Biodiversity's `CERGTA-13` row says recognition must come from a separately competent legal authority and specifies the exact rights, jurisdiction, conflicts, remedies and expiry that decision must carry. PIS's ECRC-11 row specifies trigger, recipient, access class, dependencies and closure. IAF maps its sections to GMEAIA-01 through -59.

An edge-by-edge audit of 848 relationships would mostly regenerate that in fresh prose. Given your own experience that AI revision cycles add narrative and quietly drop operational depth, this is precisely the task shape that produces it — and the output would be enormous, unverifiable, and would compete with the outlines for canonical status.

The unanswered question isn't "does each handoff complete." It's **"do the frameworks agree with each other about what the shared interface means"** — and that can't be answered because the interface doesn't exist.

## What I'd do instead, in order

**1. Extract the registries.** Pull every `SPEC-NN | name | ... ` row from all 71 outlines into one table per spec. Reconcile the name conflicts. That output *is* the missing interface specification — assembled from what the frameworks already committed to, not newly invented. Mechanical, verifiable, and it turns fifteen phantom dependencies into fifteen real documents. This is a script, not an AI task.

**2. Settle GEM.** I agree this is priority one substantively, and it's sharper than the audit says. `framework_treaty` ESTABLISHES `institution_gem`; `framework_shield` ESTABLISHES `institution_getf`; GETF IMPLEMENTS GEM; PIS ESCALATES_TO GEM. Meanwhile Shield v2.0.1 line 1214 reads: *Global Enforcement Task Force — retired; no standing Shield force.* That's not ambiguity, it's a schema edge contradicting its own source document. Same for the PIS escalation edge against PIS's "no PIS actor may direct armed enforcement through a framework reference."

**3. Harden the validator.** Cheapest item on the list and the only one that prevents recurrence. Duplicate IDs, cycles, dependencies on entities whose outline retired them, `ESTABLISHES` edges pointing at retired institutions.

**4. Rename `Ready`.** Not a new eight-rung ladder — one word. 18 of 21 Ready frameworks depend on something non-Ready; the Treaty alone is depended on by 12 of them. "Ready for external review" is accurate and costs nothing. The eight-rung ladder can wait until something actually reaches rung five.

The bootstrap finding (#5) is real and I'd keep it, but it's a per-dependency flag — `requiredFor: 'pilot' | 'full'` — not a new profile subsystem. Answer it in the schema you have.

Björn:
Ok! Can you help me with these four tasks? We can start with 1. Extract the registries

Claude:
Let me look at the actual shape of these tables first — I saw at least three different column layouts, and a parser that assumes one will silently mangle the others.Four specs actually have class definitions (CERGTA 54, GMEAIA 60, SCPA 44, ECRC 33); the other eleven are named as controlling interfaces but never enumerated. And the table layouts differ per framework — including ECRC embedding the canonical name inside the ID cell, and MOS using ranges like `CERGTA-02–10`. Let me build the extractor around that.Zero CERGTA conflicts contradicts the crude grep I ran earlier — which means one of the two is wrong. Let me check the MOS table, since its header labels looked offset from its content.The MOS header is off by one — `Band` labels the column that actually holds the class name. My earlier grep was reading that column across all files, which is where the phantom conflicts came from. I'll add content-based column detection and flag the header defects rather than silently working around them.Two fixes needed: the Kintsugi table at line 263 is an activity→route table, not a class definition (its ID column isn't first), and the CERGTA "conflicts" are MOS using short forms of the same names throughout — abbreviation, not disagreement. Both need distinguishing.SCPA, ECRC and GMEAIA are clean. CERGTA's remaining 46 are mostly MOS range labels (`CERGTA-22–30 | Claims, title, tenure, conveyance, and registry`) being expanded into nine per-class names — a range summary isn't a class title, so those shouldn't compete for canonical.The output is correct. Let me verify a full registry and add a top-level index covering the undefined specs too.Most acronyms are never expanded anywhere in the corpus — worth capturing in the index. Let me add index generation.Four registries extracted from 71 outlines. Run with `python3 extract-registries.py --src <outlines> --out ./registries`, or `--conflicts-only` for the summary alone.

```
spec        classes  crosswalks  divergent  abbreviated  declared, no xwalk
GMEAIA           60           4          0            0                   0
CERGTA           54           8          2            8                   0
SCPA             44           5          0            0                   6
ECRC             33           5          0            0                   6
```

**I need to correct something I told you.** I said 10 of 54 CERGTA classes had divergent names. That was wrong — an artifact of my crude grep reading column 2 across tables where column 2 means different things in different outlines. The real number is **2 divergent, 8 abbreviated**, and both divergences are also arguably just abbreviation (`CERGTA-01`: "Constituting Instrument, Legal Source, Jurisdiction, and Activation Status" vs MOS's "Constitution and activation"). Seven outlines agree on the long forms; MOS alone uses short forms throughout. The corpus is far more internally consistent than I implied.

## What the extraction actually found

**Two real table defects.** MOS's CERGTA table header is offset — the column labelled `Band` holds the class name, and the band values sit one column right. Kintsugi's line-263 table is keyed activity→route rather than class→implementation, so it isn't a crosswalk at all; the script now requires the class ID in column 1 and skips it. The MOS header should be fixed in the outline.

**Thirteen of seventeen interfaces are never written out in full.** `GMEAIA`, `CERGTA`, `CFPAE`, `ESDIB`, `EIPHR`, `CEACA`, `SCCA`, `PRUP`, `CCAA`, `BICA`, `SATN`, `IAEGCA`, `RIC` appear only as acronyms across the entire corpus. Only SCPA, ECRC, CDEE and ECRC-RIC have an expansion anywhere. This is worse than the missing-document problem — a reader can't even tell what `CEACA/0.1` is meant to be, and it's declared in 8 outlines.

**Eleven interfaces are declared but never enumerated at all** — no classes, so nothing to conform to. `CEACA/0.1` and `EIPHR/0.1` lead at 8 outlines each.

**Six outlines declare ECRC as controlling but publish no crosswalk** — and six do the same for SCPA. PIS's own text says conformance isn't established by a general statement that another framework controls, so by the corpus's own standard those declarations don't hold. The gap is listed by filename in each registry header.

## What this means for writing the specs

The four enumerated registries are close to publishable as-is. Every class has a name, no numbering gaps, and the crosswalk section shows each framework's domain record and boundary note per class — that's the substance of the spec, already agreed. Writing `ECRC/0.1` is mostly editing 33 rows into normative prose.

The eleven unenumerated interfaces are the harder problem, and they're not a drafting task. Each one needs a decision about whether it's a real interface that needs classes, or a phrase that crept in during revision and should be removed from the frameworks citing it. `CCAA/0.1` and `BICA/0.1` at 2 outlines each look like the latter; `CEACA/0.1` at 8 does not.

Ready for #2 (settle GEM) when you are — or if you'd rather turn one registry into an actual spec document first, CERGTA has the most conforming frameworks and would test the format.
