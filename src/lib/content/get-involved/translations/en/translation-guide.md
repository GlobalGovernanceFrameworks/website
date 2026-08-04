---
title: "Translator's Guide"
---

## Where things stand

The site currently exists in English, Swedish, and Japanese. English is the source language and is far ahead of the other two; Swedish and Japanese cover the interface and some framework content, with substantial gaps.

There is no translation team, no review board, and no coordinator. If you translate something into a language nobody else here reads, nobody will be able to check it — which makes your own care the quality control. That's worth knowing up front rather than discovering later.

Adding a new language is entirely possible. It just means you'd be the first person working in it.

## What's worth translating first

**Interface text** lives in `src/lib/i18n/[locale]/*.json`, split by page or feature. These files are short, self-contained, and immediately visible — a good first contribution, and the fastest way to make a language usable at all.

**Framework content** lives in `src/lib/content/frameworks/[locale]/`. These are long markdown documents. A single framework can run to tens of thousands of words, so translating a section at a time is normal and welcome; partial translation is better than none, and the site falls back to English for anything missing.

**Framework overviews** sit between the two — high-level summaries, a few hundred words each, and probably the highest value per hour of work.

Use standard ISO 639-1 codes for locale folders: `es`, `fr`, `de`, `pt`, `ar`, `zh`, `hi`, `ru`, and so on.

## Translation principles

**Accuracy before elegance.** These are policy documents. Where a technical concept is precise, preserve the precision even if the result reads slightly stiffly.

**Consistency within a document.** Pick one rendering for each recurring term and stay with it. If you're the first translator into your language, you're also setting the convention — writing your choices down as you go helps whoever comes next, including you in three months.

**Cultural adaptation where it helps.** Examples and references can be adapted to your context. Substantive claims cannot.

**Active voice, gender-neutral where your language allows it.** Formal but readable.

### Leave untranslated

Proper nouns (United Nations, IPCC), established acronyms (AI, GDP, CO₂), and framework names — "Global Governance Frameworks", "Treaty for Our Only Home", "Hearts", "Leaves", and similar coined terms function as names rather than descriptions.

### Translate, but consistently

Policy concepts (governance, sustainability, resilience), implementation terms (assessment, monitoring, evaluation), and social concepts (community engagement, stakeholder participation).

## Terms that give translators trouble

| Term | What it means | Note |
|---|---|---|
| **Polycrisis** | Multiple interconnected crises occurring at once | Recent coinage; may need a gloss on first use |
| **Ecocide law** | Legal framework criminalizing severe environmental destruction | Research the equivalent in your jurisdiction before inventing one |
| **Bioregion** | An area defined by ecological rather than political boundaries | Some languages have an established term; many don't |
| **Right relationship** | Living in healthy reciprocity with people and place | Deliberately non-technical; resist the urge to formalize it |
| **Subsidiarity** | Decisions made at the most local capable level | Established EU-policy term in many European languages |
| **Regenerative** | Restoring rather than merely sustaining | "Sustainable" is not a synonym and shouldn't be substituted |
| **Stewardship** | Care and responsibility for something held in trust | Often has no clean single-word equivalent |

## Swedish-specific note

Swedish doesn't use title case. Capitalize the first word of a heading and proper nouns only — not every significant word as in English.

## Workflow

Fork the repository at `github.com/GlobalGovernanceFrameworks/website`, create a branch named for what you're translating (for example `translate-treaty-overview-es`), and work in the locale folder for your language, creating it if it doesn't exist.

```bash
git clone https://github.com/yourusername/website.git
cd website
git remote add upstream https://github.com/GlobalGovernanceFrameworks/website.git
git checkout -b translate-treaty-overview-es
```

Preserve markdown structure — headings, lists, links, and code spans should survive intact. One quirk worth knowing: in mdsvex a bare `<` immediately before a digit breaks compilation, so wrap those in a backtick code span.

When you're ready, push to your fork and open a pull request describing what you translated and anything you were unsure about. Flagging your uncertainties is genuinely useful; it tells a future translator where to look.

## A realistic note on review and timing

Review comes from one person, who reads English and Swedish. For other languages, review means checking that nothing structural broke, not that the translation is good. If you'd like a second pair of eyes and know someone who could provide them, bringing them along is worth more here than it would be in a larger project.

Response times vary. A nudge on Discord after a while is welcome rather than rude.

## Getting help

Discord is the fastest route for questions about terminology, structure, or whether something is worth translating at all. It's small, so you'll generally be talking to whoever wrote the text you're working on.
