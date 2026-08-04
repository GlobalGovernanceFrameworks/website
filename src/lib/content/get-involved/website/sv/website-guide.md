---
title: "Bidra till webbplatsen"
---

## Vad denna kodbas är

Webbplatsen är en [SvelteKit](https://kit.svelte.dev)-applikation som publicerar flera dussin sammanlänkade ramverk för styrning på tre språk. Det mesta av komplexiteten ligger inte i gränssnittet – utan i hur innehåll, metadata, navigering och översättningar hålls synkroniserade med varandra.

**Teknikstack:**

- **SvelteKit** — routing, SSR, hela applikationen
- **mdsvex** — markdown-bearbetning för längre ramverksdokument
- **Anpassad CSS** — inget Tailwind, inget verktygsramverk. Komponentomfattande stilar med CSS-anpassade egenskaper för paletten.
- **Anpassad i18n** — ett litet butiksbaserat system i `src/lib/i18n/`, med JSON-översättningsfiler per språkversion
- **Anpassat schema** — `src/lib/schema/_index.ts` är den enda källan till sanning för ramverkens metadata

Två av dessa är värda att påpeka eftersom de motsäger vad du kanske rimligen antar. Det finns inget Tailwind här, och äldre dokumentation som nämner det är föråldrad. Och schemat är auktoritativt: titlar, nivåer, relaterade ramverk och publiceringsstatus härleds alla från det, så om du kommer på dig själv med att underhålla en parallell lista över ramverk någonstans, är det en bugg snarare än ett mönster.

## Komma igång

```bash
git clone https://github.com/GlobalGovernanceFrameworks/website.git
cd website
npm install
npm run dev -- --open
```

Detta bör starta webbplatsen på `http://localhost:5173`. Node 18 eller högre.

Om utvecklingsservern klagar på schemavalidering, läs utmatningen innan du antar att du har förstört något – `validate-schema.js` skiljer blockerande fel från hygienvarningar, och hygienvarningarna är redan befintliga.

## Var saker finns

```
src/
├── lib/
│   ├── components/     Återanvändbara Svelte-komponenter
│   ├── content/        Markdown-innehåll, organiserat efter språkversion
│   ├── i18n/           Översättningssystem + en/ sv/ ja/ JSON-filer
│   ├── schema/         _index.ts — auktoritativ metadata för ramverk
│   └── utils/
└── routes/             SvelteKit-sidor
```

Ramverkssidorna genereras till stor del snarare än att skrivas för hand. En dynamisk `[slug]`-route hanterar både översiktsläge och prosa-läge, så att lägga till ett ramverk innebär oftast att lägga till en schemaentitet och innehållsfiler, inte att skapa en routemapp.

## Konventioner värda att känna till före din första PR

**Stil.** Skriv komponentomfattande CSS och använd de befintliga anpassade egenskaperna (`--primary-blue`, `--warm-gold`, `--content-text` och så vidare) istället för hårdkodade hex-värden. Inför inga verktygsklasser.

**Text.** Användarsynliga strängar ska ligga i i18n JSON-filerna, inte inbäddade i komponenter. Varje ny sträng behöver engelska, svenska och japanska. Om du bara kan göra en, lägg till engelska och nämn det i PR:en – en saknad översättning är ett känt tillstånd som systemet hanterar, men en hårdkodad engelsk sträng i en komponent är ett osynligt brott för två tredjedelar av publiken.

**Svensk versalisering.** Svenska använder inte titelversaler. Skriv endast första ordet i rubriker med stor bokstav samt egennamn.

**Markdown-fälla.** I mdsvex tolkas en naken `<` omedelbart före en siffra som början på en tagg och kommer att misslyckas vid kompilering. Omslut den i ett backtick-kodspann. HTML-entiteter fungerar inte eftersom remark avkodar dem innan Svelte-kompilatorn körs.

## Bra ställen att börja på

De mest användbara bidragen just nu är oglamorösa: tillgänglighetsfixar, responsiva layoutproblem, död kod och sidor där texten har halkat efter i förhållande till vad projektet faktiskt är. Det finns mycket av den sistnämnda kategorin.

Om du vill ha något mer omfattande, öppna en issue som beskriver vad du har i åtanke innan du bygger det. Arkitekturen har några inbakade åsikter, och det är enklare att prata igenom tillvägagångssättet först än att reda ut en stor PR i efterhand.

## Skicka in arbete

Forra, brancha och öppna en pull request mot `main`. Håll pull requests fokuserade – ett ämne per PR granskas mycket snabbare än en blandad påse.

Granskningar kommer från en person, så svarstiderna varierar. Om något har legat ett tag är en påminnelse på Discord välkommen snarare än irriterande.

## Få hjälp

Discord är den snabbaste vägen för frågor, och den är tillräckligt liten för att du oftast får svar från den som skrev koden du frågar om. GitHub-issues fungerar också och är bättre för allt som är värt att dokumentera.
