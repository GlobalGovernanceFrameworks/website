---
title: "Ramverksutvecklingsguide"
---

## Vad ett ramverk är här

Ett ramverk är ett strukturerat förslag på hur något styrningsområde skulle kunna fungera – beslutsrätt, ansvarsskyldighet, samordning med angränsande system. De är skrivna för att vara anpassningsbara över olika sammanhang snarare än föreskrivande, och var och en är avsedd att fungera både fristående och som en komponent i den större helheten.

Det finns redan flera dussin, organiserade i fem nivåer, och de korsrefererar varandra i stor utsträckning. Det är det viktigaste att förstå innan du lägger till ett: ekosystemet har en form, och ett nytt ramverk måste passa in i det eller uttryckligen argumentera för att förändra det.

## Innan du skriver något

Läs två eller tre befintliga ramverk ordentligt, helst inklusive Treaty for Our Only Home, som är den konstitutionella kärna de flesta andra hänger på. Detta är ingen formalitet – konventionerna är lättare att ta till sig genom att läsa än genom att bli tillsagd.

Kontrollera sedan om det du vill skriva redan existerar i någon form. Överlappning mellan ramverk är ett känt problem här, inte ett hypotetiskt sådant, och att lösa överlappning i efterhand är mycket svårare än att upptäcka den i förväg.

De mest värdefulla bidragen är oftast inte nya ramverk. De är kritik av befintliga från personer med domänerfarenhet, sektioner omskrivna av någon som faktiskt kan området, och identifiering av ställen där ett ramverk antar något falskt om hur en domän fungerar. Uppsättningen är bred; den är inte djup på de flesta ställen, och djup är vad som saknas.

## Arbetsflödet för författande

### Disposition först

Få dispositionen komplett och sammanhängande innan du skriver ett ord prosa. Strukturella problem blir exponentiellt dyrare när innehållet väl finns där – detta är den enskilt mest pålitliga läxan från att bygga den befintliga uppsättningen.

En disposition är klar när varje avsnitt har ett tydligt syfte, en tydlig relation till de omgivande avsnitten, och helheten läses som en logisk progression från problem via mekanism till implementering. Testa den genom att förklara den för någon och observera var de blir förvirrade.

Webbplatsen publicerar i två lägen, och dispositionsstadiet är delvis viktigt på grund av detta: **dispositionsläge** presenterar en kanonisk dokumentstruktur direkt, och **prosaläge** erbjuder sektionsbaserad navigering för mer utvecklade ramverk. Nytt arbete börjar i dispositionsläge.

### Att skriva utkast

Att använda AI som utkast- och kritikpartner är normal praxis här, och värt att vara tydlig med snarare än förtegen. Det mönster som fungerar: skriv utkast med en modell och få sedan fientlig kritik från andra – olika system misslyckas på olika sätt, och oenighet dem emellan är informativt. Vad som inte fungerar är att låta en modell generera ett ramverk och sedan lätt redigera det. Bedömningen om vad som ska behållas måste vara din, och domänkunskapen måste komma någonstans ifrån på riktigt.

Motståndartestning förväntas innan något betraktas som gediget. Fråga specifikt hur ramverket misslyckas: vem fångar det, vem hoppar av, vad händer under kris, vad händer när en mäktig aktör helt enkelt vägrar delta.

### Struktur och metadata

Innehållet finns i `src/lib/content/frameworks/[locale]/`, uppdelat i en fil per större avsnitt med frontmatter.

Varje ramverk behöver också en entitet i `src/lib/schema/_index.ts`. Schemat är auktoritativt: titlar, nivå, relaterade ramverk, publiceringsstatus och navigering härleds alla från det. Ett ramverk utan en schema-entitet kommer inte att synas i navigeringen, och metadata som underhålls någon annanstans kommer att glida isär.

Två praktiska noteringar: ett naket `<` omedelbart före en siffra bryter mdsvex-kompilering, så omge sådana med ett backtick-kodspann. Och skriv komponentomfattande anpassad CSS om du lägger till någon – det finns inget Tailwind här, oavsett vad äldre dokumentation säger.

## Skrivstandarder

Ramverken ska vara läsbara för en informerad icke-specialist. Definiera termer vid första användning, föredra aktiv röst och håll det konkreta implementeringsmaterialet genuint konkret – tidslinjer, beslutsregler, fellägen och vem som gör vad, snarare än strävan.

Var tydlig med säkerhet. Där en mekanism är spekulativ, säg det i texten istället för att låta enhetlig självsäker prosa antyda att allt är lika välgrundat. Detta är en levande svaghet i den befintliga uppsättningen och värd att inte upprepa.

Där ett ramverk berör urfolksstyrning eller något samhälles traditionella kunskap får det inte framställa den kunskapen som central utan att verklig konsultation har ägt rum. Att skriva å vägnar av samhällen du inte har talat med är det specifika misslyckande som ska undvikas.

## Granskning, ärligt talat

Det finns ingen expertgranskningspanel, inget användartestprogram och ingen redaktionskommitté. Granskning innebär att en person läser ditt arbete, plus den fientliga AI-kritik du själv kör.

Det har en praktisk konsekvens: din egen testning är kvalitetskontrollen. Om du kan hitta domänexperter som läser ett utkast är det värt mer här än i de flesta projekt, och att ta med sig en granskare är i sig ett betydande bidrag.

Det innebär också att återkopplingstiden varierar. En påminnelse på Discord efter ett tag är okej.

## Skicka in

Forra repositoriet, arbeta på en gren och öppna en pull request som beskriver vad ramverket gör, var det passar i nivåstrukturen, vilka befintliga ramverk det berör och vad du är minst säker på. Den sista punkten hjälper verkligen.

För något mer omfattande, öppna ett ärende eller ta upp det på Discord innan du skriver. Det är mycket bättre att upptäcka en scopekrock i samtal än vid granskning.

## Få hjälp

Discord är den snabbaste vägen, och tillräckligt liten för att frågor om varför något är strukturerat som det är i allmänhet når den som strukturerade det.

