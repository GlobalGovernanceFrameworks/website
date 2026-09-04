---
title: "Framework Document Standard"
---

# GGF Framework Document Standard v0.1

**Status:** Working standard — applied at revision time, not retrofitted in a pass
**Date:** 2026-08-08
**Applies to:** Canonical framework outline documents in `/src/lib/content/framework-outlines/`
**Does not apply to:** `/src/lib/content/frameworks/`, which holds earlier per-section drafts that are largely superseded and are not maintained against this standard
**Audience:** Björn, Claude, ChatGPT, and any other drafting collaborator

---

## Purpose and posture

This document records what a GGF framework file must contain, what it should contain by default, and what is deliberately left free. It exists because the corpus currently runs two competing front-matter conventions and carries version history in only about half its files — inconsistencies that cost tooling accuracy without buying any expressive value.

It is **not** a template to be imposed on all 80 files. Conformance is achieved at the next revision each framework receives. Frameworks revised since mid-2026 — Meta-Governance, AUBI, Work in Liberation, Financial Systems, Hearthstone, Housing — already satisfy most of Tier A; this standard mostly writes down what that revision process was already producing.

**Governing principle:** standardize the machine-readable layer, leave the rhetorical layer organic. Uniformity earns its place where a script reads the file or where a missing element is a defect. It does not earn its place in voice, metaphor, section ordering, or argumentative shape.

---

## Tier A — Mandatory

These are validator errors. A file missing any of them is defective, not stylistically different.

### A1. Front matter

Plain bold lines immediately under the title and subtitle. Not headings — heading syntax for metadata breaks outline extraction.

**Required fields, in this order:**

```markdown
# <Framework Name> v<X.Y.Z>
## <One-line descriptive subtitle>

**Framework ID:** `framework_<snake_case_id>`
**Tier:** <0–4> — <tier name>
**Status:** <short phrase describing this edition's character>
**Version:** <X.Y.Z>
**Date:** <YYYY-MM-DD>
```

**Optional fields, same style, after the required block:**

`**Supersedes:**` · `**Conforms to:**` · `**Responsible:**` · `**Primary role:**` · `**Authority effect:**` · `**Implementation priority:**`

Rules:
- `Framework ID` must match the schema entity ID exactly. This is the join key.
- `Version` in front matter, in the title, and in the filename must agree. Filename uses underscores (`housing-and-secure-habitation-v0_2_2.md`).
- `Date` is ISO. No "August 2026".
- Where fail-closed rules depend on exact version identity, pinned digests are load-bearing and must not be edited without recomputing.

### A2. Related frameworks

A bulleted list, each entry naming the framework and stating in a clause what it supplies to this one. No version pins in the list — record editions consulted in the version history entry instead, so the list does not go stale silently.

```markdown
### Related frameworks

- **Financial Systems Framework** — Hearts, Leaves, Treasury, reserve, redemption, and financial observability
```

### A3. Version history

Reverse chronological, most recent first, under `### Version history`.

```markdown
### Version history

- **X.Y.Z (YYYY-MM-DD):** <what changed and why, in prose. State what was
  added, what was retired, and what authority was or was not created.>
- **Earlier editions:** not yet recorded in this document.
```

Rules:
- Every version bump gets an entry. No silent edits.
- Editorial editions that change no semantics say so explicitly and are labelled `Editorial edition`.
- Where a revision declines to create an authority, say so — the negative statements are load-bearing and are the part reviewers check.
- Where a prior version's source was truncated, corrupted, or reconstructed, that fact stays in the history permanently.

### A4. Scope conditions

Every framework states the environment it assumes and the conditions under which it does not apply. Currently **zero** frameworks in the corpus do this.

```markdown
## Scope conditions

**This framework assumes:** <the conditions under which its mechanisms work —
institutional, ecological, economic, technological, or legal.>

**It does not apply where:** <named conditions under which the mechanisms fail
or become inappropriate.>

**What this framework does not do:** <authorities not created; problems not
solved; adjacent domains left to competent institutions.>
```

Rationale: the GGF is positioned as a rigorous hypothesis open to expert co-development, not a finished solution. A framework that never names the conditions under which it fails is making a universal claim it cannot support, and reads as advocacy to exactly the institutional audience the project is trying to reach. This is also the single cheapest credibility gain available across the corpus.

### A5. Entity IDs

Where the TypeScript schema references an institution, council, protocol, mechanism, or metric defined by this framework, the markdown must carry the backticked ID inline at the point of definition:

```markdown
- **Just Transition Fund** (`mechanism_just_transition_fund`): Manages bonds...
```

Frameworks defining schema entities without IDs in the prose cannot be validated against the schema and generate false orphan reports.

---

## Tier B — Default, deviation recorded

Validator warnings. Deviating is legitimate; deviating silently is not. Record the reason in a `structuralDeviation` note in the schema entry.

| Element | Default | Reasonable deviation |
|---|---|---|
| **Table of contents** | Files over ~50KB | Short frameworks; interface specs read start to finish |
| **Core principles** | Principle-led frameworks | Mechanism-led or operational frameworks where principles live in the parent |
| **Glossary** | Where the framework introduces five or more coined terms | Where all terms are inherited from a parent framework's glossary |
| **Bootstrap / Phase 0** | Any framework proposing new institutions | Interface specifications; frameworks that only constrain existing bodies |
| **Appendices** | Detailed schedules, crosswalks, digests, case studies | Short frameworks with nothing to appendix |
| **Change/reconstruction note** | Any revision altering constitutional order | Bounded patches, where the version history entry suffices |

---

## Tier C — Free

No validator opinion. Vary these to fit the material.

Voice and register · section ordering below the front matter · metaphor and framing · "What Success Looks Like" vignettes · worked examples and case studies · diagrams, Mermaid or otherwise · tables versus prose · FAQ sections · length.

A framework about grief should not read like a framework about supply chains. The corpus is stronger for that difference, and the template must not erode it.

---

## Naming conventions

- **Creative names belong on framework pages.** Love Ledger, Proof of Care, Hearts, Hearthstone, Sundown. The intentional awkwardness creates productive cognitive friction and forces genuine engagement rather than skimming.
- **Descriptive labels belong in navigation, standfirsts, and schema fields.** A reader arriving at a nav menu should be able to tell what a thing governs without having read the framework.
- **Both should appear at first use in the document**: the creative name, then a descriptive gloss.

---

## Standfirst conventions

Standfirsts live in the site's TypeScript, not the markdown, but are written alongside revisions.

- Open with what the framework governs, in plain language, without the framework's own coined vocabulary.
- Name the current version's actual change, not a generic "improved and expanded".
- Prefer the honest limitation to the confident claim. A standfirst that says what a framework refuses to do is more credible than one that says what it achieves.
- Do not describe mechanisms the current version has retired. Check the version history before reusing a prior standfirst.
- Three to four sentences. English uses standard title case in headers; Swedish uses sentence case throughout.

---

## Design review checklist

Applied at revision time. Derived from the Governance as Engineering series, which the corpus should be conformant with even though it does not cite it. Each item is a question, not a required section.

**Metrics and proxies**
- Does any named index, score, or indicator carry a consequence — allocation, eligibility, certification, a trigger? If yes: which target-relevant dimension does the proxy discard, and can the actors being measured *move along that dimension*? Lossiness alone is harmless; loss plus reach is the trap.
- Does the framework score diversity, pluralism, resilience, or optionality *within a fixed category set*? If so, the score is insensitive to the disappearance of alternatives the category set never resolved. The corrective is guaranteed observation of the margin, introduced upstream of the point where the metric becomes consequential — not a better score.
- Is any composite scalar standing in for a multidimensional condition? Prefer a reported panel with separately falsifiable readings. AUBI §2.3 and Work in Liberation §17.1 are the reference implementations.

**Institutions**
- Is each body a **finite-task** institution or a **standing-condition** one? Finite bodies need a completion criterion and a guard against manufacturing demand to defer it. Standing bodies should not carry a sunset clause they will only be tempted to evade, and need protection against being defunded because nothing has gone wrong.
- On capacity loss, does a standing body **transfer** its obligation, or does the obligation simply lapse with it?
- Does the framework's review or audit mechanism evaluate only *performance*? Bodies whose value is connective — keeping two other institutions mutually legible — contribute nothing to any performance metric and are defunded on review, with the loss registering only after the translation they maintained is gone.

**Enforcement and suppression**
- Where a mechanism restricts, excludes, embargoes, or divests under partial jurisdictional coverage: what quantity does it conserve, by what mechanism does that quantity relocate, and where does the conservation fail? Plan against the most permissive reachable destination, not the average.
- Do not claim a restriction *creates* harm elsewhere without naming a conserved quantity and its boundary. The weaker claim — that strategic actors exploit whatever reachable heterogeneity exists — transfers freely and is usually enough.

**Records and verification**
- Is effort going into hardening the *record* while the *input* stays soft? An immutable ledger closes the execution link and leaves the world-fact entering the system exactly as editable as before. The input is the floor.
- How many editable links sit between the world-fact and the enforced rule? Shorten the chain; make the irreducible link a discrete accountable act rather than an ambient standing condition; raise the cost of suborning the certifier through rotation, multi-witness attestation, and audit trails.

**Observation**
- Does anything guarantee sampling *outside* the set the framework already serves — non-applicants, declined cases, practices with no recognised category? Self-selecting channels reach only those already oriented toward the framework.
- Are the framework's observations matched to the distinctions its interventions actually turn on? More indicators along more dimensions does not help if the distinctions resolved are not the ones the levers depend on.

---

## What this standard does not do

It does not score conformance, and Tier B deviations must not be reported as defects. A framework that does not fit the template may be doing something the template cannot resolve; the escape hatch is a recorded reason, not a penalty.

It does not require a retrofit pass. Frameworks conform when they are next revised for substantive reasons.

It does not govern the TypeScript schema, the site implementation, or the interface specifications (CIS, SCPA, CERGTA, GMEAIA), which have their own conventions.

---

## Change log

- **0.1 (2026-08-08):** Initial standard. Tier structure derived from a structural audit of 80 framework files; design review checklist derived from the Governance as Engineering limits cluster (Papers XVI–XXVII).
