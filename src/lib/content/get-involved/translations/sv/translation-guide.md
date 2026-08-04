---
title: "Översättarguide"
---

## Hur det ligger till

Webbplatsen finns för närvarande på engelska, svenska och japanska. Engelska är källspråket och ligger långt före de andra två; svenska och japanska täcker gränssnittet och en del ramverksinnehåll, med stora luckor.

Det finns inget översättningsteam, ingen granskningsnämnd och ingen samordnare. Om du översätter något till ett språk som ingen annan här kan läsa kommer ingen att kunna kontrollera det – vilket gör din egen omsorg till kvalitetskontrollen. Det är värt att veta från början istället för att upptäcka det senare.

Att lägga till ett nytt språk är fullt möjligt. Det innebär bara att du blir den första personen som arbetar med det.

## Vad som är värt att översätta först

**Gränssnittstexter** finns i `src/lib/i18n/[locale]/*.json`, uppdelade efter sida eller funktion. Dessa filer är korta, fristående och omedelbart synliga – en bra första insats och det snabbaste sättet att överhuvudtaget göra ett språk användbart.

**Ramverksinnehåll** finns i `src/lib/content/frameworks/[locale]/`. Det rör sig om långa markdown-dokument. Ett enskilt ramverk kan omfatta tiotusentals ord, så det är normalt och välkommet att översätta ett avsnitt i taget; partiell översättning är bättre än ingen, och webbplatsen faller tillbaka på engelska för allt som saknas.

**Ramverksöversikter** ligger mitt emellan – sammanfattningar på hög nivå, några hundra ord vardera, och förmodligen det högsta värdet per arbetstimme.

Använd standard ISO 639-1-koder för språkmappar: `es`, `fr`, `de`, `pt`, `ar`, `zh`, `hi`, `ru` och så vidare.

## Översättningsprinciper

**Noggrannhet före elegans.** Det här är policydokument. När ett tekniskt begrepp är precist, bevara precisionen även om resultatet blir en aning stelt.

**Konsekvens inom ett dokument.** Välj en återgivning för varje återkommande term och håll dig till den. Om du är den första som översätter till ditt språk sätter du också konventionen – att skriva ner dina val allt eftersom hjälper den som kommer efter, inklusive dig själv om tre månader.

**Kulturell anpassning där det hjälper.** Exempel och referenser kan anpassas till ditt sammanhang. Sakpåståenden kan inte det.

**Aktiv röst, könsneutralt där ditt språk tillåter det.** Formellt men läsbart.

### Lämna oöversatt

Egennamn (FN, IPCC), etablerade akronymer (AI, BNP, CO₂) och ramverksnamn – "Global Governance Frameworks", "Treaty for Our Only Home", "Hearts", "Leaves" och liknande myntade uttryck fungerar som namn snarare än beskrivningar.

### Översätt, men konsekvent

Policybegrepp (governance, hållbarhet, resiliens), implementeringstermer (bedömning, övervakning, utvärdering) och sociala begrepp (samhällsengagemang, intressentdeltagande).

## Termer som ställer till problem för översättare

| Term | Vad det betyder | Notering |
|---|---|---|
| **Polykris** | Flera sammankopplade kriser som inträffar samtidigt | Relativt nytt begrepp; kan behöva en förklaring vid första användning |
| **Ekocidlagstiftning** | Rättslig ram som kriminaliserar allvarlig miljöförstöring | Undersök motsvarigheten i din jurisdiktion innan du uppfinner en |
| **Bioregion** | Ett område definierat av ekologiska snarare än politiska gränser | Vissa språk har en etablerad term; många har det inte |
| **Rätt relation** | Att leva i sund ömsesidighet med människor och plats | Medvetet icke-tekniskt; motstå impulsen att formalisera det |
| **Subsidiaritetsprincipen** | Beslut fattas på den mest lokala nivå som är kapabel | Etablerat EU-politiskt begrepp på många europeiska språk |
| **Regenerativ** | Återställande snarare än enbart bevarande | "Hållbar" är ingen synonym och bör inte ersätta det |
| **Förvaltarskap** | Omsorg och ansvar för något som förvaltas i förtroende | Har ofta ingen ren motsvarighet i ett enda ord |

## Svensk-specifik notering

Svenska använder inte titelversalering. Använd endast stor begynnelsebokstav på första ordet i rubriker samt på egennamn – inte på varje betydelsebärande ord som i engelskan.

## Arbetsflöde

Forra (forka) repositoriet på `github.com/GlobalGovernanceFrameworks/website`, skapa en gren namngiven efter vad du översätter (till exempel `translate-treaty-overview-es`) och arbeta i språkmappen för ditt språk, skapa den om den inte finns.

```bash
git clone https://github.com/dittanvändarnamn/website.git
cd website
git remote add upstream https://github.com/GlobalGovernanceFrameworks/website.git
git checkout -b translate-treaty-overview-es
```

Bevara markdown-strukturen – rubriker, listor, länkar och kodspann ska överleva intakta. En egenhet värd att känna till: i mdsvex bryter ett naket `<` omedelbart före en siffra kompileringen, så omge sådana med ett backtick-kodspann.

När du är redo, pusha till din fork och öppna en pull request som beskriver vad du har översatt och vad du var osäker på. Att flagga dina osäkerheter är genuint användbart; det talar om för en framtida översättare var de ska titta.

## En realistisk notering om granskning och tid

Granskning kommer från en person, som läser engelska och svenska. För andra språk innebär granskning att kontrollera att inget strukturellt har gått sönder, inte att översättningen är bra. Om du vill ha ett par extra ögon och känner någon som kan bidra med dem, är det mer värt här än i ett större projekt.

Svarstiderna varierar. En påminnelse på Discord efter ett tag är välkommen snarare än oartig.

## Få hjälp

Discord är den snabbaste vägen för frågor om terminologi, struktur eller huruvida något överhuvudtaget är värt att översätta. Den är liten, så du kommer i allmänhet att prata med den som skrev texten du arbetar med.

