---
title: "Ramverkssidorna visar nu de senaste levande dispositionerna"
description: "Webbplatsen presenterar nu varje ramverk genom dess senaste disposition, med snabbare byggen, tydligare navigering och bättre mobillayout"
date: "2026-08-03"
author: "Björn K. Holmström"
category: "update"
tags: ["ramverk", "webbplats", "prestanda", "open-source", "design"]
hashtags: ["GlobalStyrning", "OpenSource", "Webbutveckling"]
---

**Ramverkssidorna visar nu de senaste levande dispositionerna**

Global Governance Frameworks-webbplatsen har förändrat hur ramverksdokumenten presenteras.

I stället för att visa ramverken som om de vore fullständigt färdigskrivna och avslutade dokument visar varje ramverkssida nu den senaste kanoniska dispositionen. Detta speglar projektets faktiska natur bättre: en föränderlig styrningsarkitektur med öppen källkod, vars delar förblir öppna för granskning, revidering och förbättring.

De nya ramverkssidorna innehåller:

* Den senaste dispositionen för varje ramverk
* Aktuell versionsinformation
* Information om granskning och utvecklingshistorik
* En innehållsförteckning för navigering i längre dokument
* Engelsk reservversion när en översatt disposition ännu inte finns

Historiska versioner, granskningar och arbetsmaterial finns fortfarande bevarade i repositoryt. De behandlas däremot inte längre som publika webbsidor och behöver inte kompileras vid varje bygge.

Förändringen gjorde det också möjligt att förbättra webbplatsens prestanda betydligt. Tidigare upptäckte och bearbetade byggsystemet stora mängder arkiverade Markdown-filer, inklusive gamla ramverksversioner och granskningsdokument som aldrig visades på webbplatsen. Nu kompileras endast den aktuella dispositionen för varje ramverk, medan ett lättviktigt genererat manifest tillhandahåller metadata om versioner och granskningshistorik.

Resultatet är en märkbart snabbare och mer lättunderhållen byggprocess.

Flera relaterade förbättringar av layout och navigering har genomförts samtidigt:

* Ramverkssidorna använder nu mer av den tillgängliga skärmbredden
* Mobillayouterna har korrigerats och förenklats
* Den gamla sidomenyn för ramverk har tagits bort
* Den duplicerade modalrutan för dispositioner har pensionerats
* Otydliga statusmarkörer som ”Redo”, ”Under granskning” och ”Planerad” har tagits bort
* Ramverksöversikten fungerar nu som den huvudsakliga kartan över ekosystemet, medan de enskilda sidorna fungerar som de kanoniska dokumenten

Förändringarna gör webbplatsen ärligare om arbetets mognadsgrad, enklare att navigera och lättare att underhålla.

Målet är inte att presentera styrningsramverken som färdiga produkter. Målet är att göra deras nuvarande struktur tillräckligt synlig för att människor ska kunna förstå dem, utmana dem, förbättra dem och så småningom hjälpa till att omsätta dem i praktiken.

