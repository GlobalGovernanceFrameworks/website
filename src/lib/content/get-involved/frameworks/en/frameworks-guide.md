---
title: "Framework Development Guide"
---

## What a framework is here

A framework is a structured proposal for how some domain of governance could work — decision rights, accountability, coordination with adjacent systems. They're written to be adaptable across contexts rather than prescriptive, and each one is meant to function both standalone and as a component of the wider set.

There are already several dozen, organized across five tiers, and they cross-reference each other heavily. That's the main thing to understand before adding one: the ecosystem has a shape, and a new framework has to fit into it or explicitly argue for changing it.

## Before you write anything

Read two or three existing frameworks properly, ideally including the Treaty for Our Only Home, which is the constitutional core most others hang off. This isn't a formality — the conventions are easier to absorb by reading than by being told.

Then check whether what you want to write already exists in some form. Overlap between frameworks is a known problem here, not a hypothetical one, and resolving overlap after the fact is much harder than noticing it beforehand.

The most valuable contributions are usually not new frameworks. They're critiques of existing ones from people with domain experience, sections rewritten by someone who actually knows the field, and identification of places where a framework assumes something false about how a domain works. The set is broad; it is not deep in most places, and depth is what's missing.

## The authoring workflow

### Outline first

Get the outline complete and coherent before drafting a word of prose. Structural problems get exponentially more expensive once content exists — this is the single most reliable lesson from building the existing set.

An outline is finished when every section has a clear purpose, a clear relationship to the sections around it, and the whole reads as a logical progression from problem through mechanism to implementation. Test it by explaining it to someone and watching where they get confused.

The site publishes in two modes, and the outline stage matters partly because of this: **outline mode** presents a canonical document structure directly, and **prose mode** provides section-based navigation for more developed frameworks. New work starts in outline mode.

### Drafting

Using AI as a drafting and critique partner is normal practice here, and worth being explicit about rather than coy. The pattern that works: draft with one model, then get adversarial critique from others — different systems fail differently, and disagreement between them is informative. What doesn't work is letting a model generate a framework and lightly editing it. The judgment about what to keep has to be yours, and the domain knowledge has to come from somewhere real.

Adversarial testing is expected before anything is considered solid. Ask specifically how the framework fails: who captures it, who defects, what happens under crisis, what happens when a powerful actor simply refuses to participate.

### Structure and metadata

Content lives in `src/lib/content/frameworks/[locale]/`, split into a file per major section with front-matter.

Every framework also needs an entity in `src/lib/schema/_index.ts`. The schema is authoritative: titles, tier, related frameworks, publication state, and navigation all derive from it. A framework without a schema entity won't appear in navigation, and metadata maintained anywhere else will drift.

Two practical notes: a bare `<` immediately before a digit breaks mdsvex compilation, so wrap those in a backtick code span. And write component-scoped custom CSS if you add any — there's no Tailwind here regardless of what older documentation says.

## Writing standards

Frameworks should be readable by an informed non-specialist. Define terms on first use, prefer active voice, and keep the concrete implementation material genuinely concrete — timelines, decision rules, failure modes, and who does what, rather than aspiration.

Be explicit about confidence. Where a mechanism is speculative, say so in the text rather than letting uniform assertive prose imply that everything is equally well-founded. This is a live weakness across the existing set and worth not reproducing.

Where a framework touches Indigenous governance or any community's traditional knowledge, it must not position that knowledge as central without actual consultation having happened. Writing on behalf of communities you haven't spoken to is the specific failure to avoid.

## Review, honestly

There is no expert review panel, no user testing programme, and no editorial board. Review means one person reading your work, plus whatever adversarial AI critique you run yourself.

That has a practical consequence: your own testing is the quality control. If you can find domain experts to read a draft, that's worth more here than in most projects, and bringing a reviewer with you is itself a significant contribution.

It also means turnaround varies. A nudge on Discord after a while is fine.

## Submitting

Fork the repository, work on a branch, and open a pull request describing what the framework does, where it sits in the tier structure, which existing frameworks it touches, and what you're least sure about. That last item genuinely helps.

For anything substantial, open an issue or raise it on Discord before writing. It's much better to discover a scope collision in conversation than in review.

## Getting help

Discord is the fastest route, and small enough that questions about why something is structured the way it is will generally reach whoever structured it.
