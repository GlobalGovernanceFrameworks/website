---
title: "Contributing to the Website"
---

## What this codebase is

The site is a [SvelteKit](https://kit.svelte.dev) application that publishes several dozen interlinked governance frameworks in three languages. Most of the complexity isn't in the UI — it's in how content, metadata, navigation, and translations stay in sync with each other.

**The stack:**

- **SvelteKit** — routing, SSR, the whole application
- **mdsvex** — markdown processing for long-form framework documents
- **Custom CSS** — no Tailwind, no utility framework. Component-scoped styles with CSS custom properties for the palette.
- **Custom i18n** — a small store-based system in `src/lib/i18n/`, with JSON translation files per locale
- **Custom schema** — `src/lib/schema/_index.ts` is the single source of truth for framework metadata

Two of those are worth flagging because they contradict what you might reasonably assume. There is no Tailwind here, and older documentation that mentions it is out of date. And the schema is authoritative: titles, tiers, related frameworks, and publication state all derive from it, so if you find yourself maintaining a parallel list of frameworks somewhere, that's a bug rather than a pattern.

## Getting set up

```bash
git clone https://github.com/GlobalGovernanceFrameworks/website.git
cd website
npm install
npm run dev -- --open
```

That should bring the site up on `http://localhost:5173`. Node 18 or higher.

If the dev server complains about schema validation, read the output before assuming you broke something — `validate-schema.js` distinguishes blocking errors from hygiene warnings, and the hygiene ones are pre-existing.

## Where things live

```
src/
├── lib/
│   ├── components/     Reusable Svelte components
│   ├── content/        Markdown content, organised by locale
│   ├── i18n/           Translation system + en/ sv/ ja/ JSON files
│   ├── schema/         _index.ts — authoritative framework metadata
│   └── utils/
└── routes/             SvelteKit pages
```

Framework pages are largely generated rather than hand-written. A dynamic `[slug]` route handles both outline mode and prose mode, so adding a framework usually means adding a schema entity and content files, not creating a route folder.

## Conventions worth knowing before your first PR

**Styling.** Write component-scoped CSS, using the existing custom properties (`--primary-blue`, `--warm-gold`, `--content-text` and so on) rather than hardcoded hex values. Don't introduce utility classes.

**Text.** User-visible strings go in the i18n JSON files, not inline in components. Every new string needs English, Swedish, and Japanese. If you can only do one, add English and say so in the PR — a missing translation is a known state the system handles, but a hardcoded English string in a component is invisible breakage for two thirds of the audience.

**Swedish capitalization.** Swedish doesn't use title case. Capitalize the first word of a heading and proper nouns only.

**Markdown gotcha.** In mdsvex, a bare `<` immediately before a digit is parsed as the start of a tag and will fail compilation. Wrap it in a backtick code span. HTML entities won't work, because remark decodes them before the Svelte compiler runs.

## Good places to start

The most useful contributions right now are unglamorous: accessibility fixes, responsive layout problems, dead code, and pages where the copy has drifted out of date relative to what the project actually is. There is a lot of the last category.

If you want something more substantial, open an issue describing what you have in mind before building it. The architecture has a few opinions baked into it, and it's easier to talk through the approach first than to unpick a large PR afterwards.

## Submitting work

Fork, branch, and open a pull request against `main`. Keep pull requests focused — one concern per PR reviews much faster than a mixed bag.

Reviews come from one person, so response times vary. If something has been sitting for a while, a nudge on Discord is welcome rather than annoying.

## Getting help

Discord is the fastest route for questions, and it's small enough that you'll usually get an answer from whoever wrote the code you're asking about. GitHub issues work too, and are better for anything worth recording.
