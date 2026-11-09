# MSC-01 — Minimal Consequential Coordination Profile (CP2)

**Status:** Adversariellt granskningsutkast; fiktivt exempel; **inte verifierat för operativ aktivering eller formell GGF-efterlevnad**.
**Datum:** 2026-11-09  
**Ärende:** ÅD-02 — samordning av befintlig provtagning och rapportering i två fiktiva kommuner.  
**Källor:** GMEAIA v0.2.2, CIS v0.2.10, Meta-Governance v1.6.3 och Polycentric Governance v0.6.2. Se källhänvisningar i MSC-01-granskningsrapporten.

> **Avgränsning:** Detta är **inte** ett beslut om att anlägga rening, ändra dricksvattendistribution, bedriva tillsynstvång eller ingripa i skyddat område. Om beslutet får sådana effekter måste behörighet, samtycke och konsekvensprofil omprövas; GMEAIA T06 nämner uttryckligen hushållens vattenåtkomst som ett CP3-fall.

## K1 — Behov, alternativ och tillräcklighet

**Problem:** Provresultat från ett gemensamt vattendrag överlämnas via delvis olika rutiner. Det finns en *hypotes* om att det kan ge fördröjd kvittens och otydlig ansvarsfördelning. Omfattning och förekomst av problemet är **ännu inte verifierade**.

**Alternativ före beslut:**
- A: nuvarande rutiner oförändrade;
- B: en enkel gemensam kontakt- och tidsfristsöverenskommelse;
- C: en sådan överenskommelse kompletterad med en riktad kontroll av berörda aktörer, kausala beroenden, oberoende observation och avslut.

**Beslutsregel:** Välj inte C om B kan visas ge samma tillräckliga resultat och rättighetsskydd med mindre börda. **Beslut återstår**, i väntan på baslinje och behörighetsverifikation.

## K2 — Behörighet, rättigheter, berörda

**Tänkta parter:** Övre Ådal och Nedre Ådal, vardera genom en behörig kommunal beslutsinstans; laboratoriet som befintlig utförare; en regional myndighet endast inom sitt redan giltiga mandat.

**Behörighetsunderlag:** Exakta rättsliga beslutsgrunder, beslutsprotokoll, budgetmandat och befintliga avtal **saknas i övningen och måste styrkas före aktivering**. Inget mandat skapas av GGF-profilen. **Authority formation:** i första hand `retained` hos respektive behörig aktör; ingen överföring föreslås. Klassificeringen får korrigeras när de rättsliga handlingarna granskats.

**Berörda:** kommunala handläggare, laboratoriepersonal, fastighetsägare och nedströms invånare som kan beröras av informationens kvalitet eller uteblivna åtgärd; eventuella ytterligare rättighetsbärare och berörd urfolksauktoritet behöver kontrolleras, inte antas bort.

**Besluts- och informationsgräns:** Inga nya sanktioner, inga ändringar i hushållens vattenåtkomst, ingen bindande hälsobedömning och ingen automatisk verkställighet från en mätindikator. Gällande skydd, samtycken och överklagandemöjligheter kvarstår.

**Aktiveringsspärr:** `authority_pending` / `non_activated` till dess att mandat, berördas ställning, relevanta godkännanden och skyddad-domän-prövning verifierats.

## K3 — Kausala beroenden och information

**Huvudhypotes:** Skillnader i överlämningsrutiner skapar en del av eftersläpningen *efter* att laboratoriet slutfört analysen.

**Alternativ hypotes:** Fördröjningen uppstår nästan uteslutande före analyssvaret, genom provtagning, transport eller laboratoriekapacitet.

**Kontroll över variabler:** Varje kommun kontrollerar sina interna mottagnings- och kvittensrutiner; laboratoriet kontrollerar analyser och publiceringsmoment enligt befintligt avtal; uppströms förorening kontrolleras inte genom detta samordningsprojekt.

**Datakällor:** Tidsstämplar för provtagning, färdigt labbsvar, tillgängliggörande och kvittens i redan lagligt använda system. Baslinje, täckning, datakvalitet, beroende mellan kanaler och rätten till sekundär användning **måste verifieras**. Frånvarande och ogiltiga uppgifter ska synliggöras. Persondata och skyddad kunskap behandlas inte i den tänkta grundprofilen; om sådana data behövs krävs separat laglig hantering.

**Observationskontrakt — komprimerad vy:** latent tillstånd = faktisk överlämningsfördröjning; observationer = separata tidsstämplar; otillgänglig information = ännu inte kartlagd; informationsklass/ändamål/åtkomst/retention = kontrollpunkter före aktivering; osäkerhet = felaktig eller ofullständig loggning; motkontroll = manuellt verifierade kvittenser från mottagande aktör; datakorrigering = spårbar ändring med bibehållen äldre version. En komplett mappning mot CIS §9.2 och bilaga C återstår.

## K4 — Beslut, överlämningar och frister

**Föreslaget förfarande (inte juridiskt fastställd skyldighet):**
1. Befintligt laboratorium lämnar analysresultatet enligt gällande behörigt uppdrag.
2. Respektive behörig kommun kvitterar mottagande **inom två arbetsdagar**, om en sådan frist uttryckligen antas genom giltigt avtal eller beslut.
3. Utebliven kvittens registreras som uteblivet svar och följs upp av den redan ansvariga avsändaren. Tystnad innebär inte acceptans eller överföring av befogenheter.
4. Resultat som kräver tillsyn, skyddsåtgärd eller ytterligare beslut skickas vidare till *separat* rättsligt behörig beslutsfattare. Denna profil godkänner inte åtgärden.

**Beslut före aktivering:** behörig signatur för respektive part; separata accepterade åtaganden; ansvarig operativ handläggare; datum för start, uppföljning och slut; rättslig grund för frister. Samtliga är **avvaktande**.

## K5 — Prövbar förväntning, alternativ och uppföljning

**Hypotes som ska kunna prövas:** Samordnade kvittensrutiner kortar väntetiden *efter* färdigt labbsvar.

**Förhandsregistrerad förväntan (utkast):** Om baslinjen visar ett mätbart överlämningsproblem ska medianen för tid från publicerat labbsvar till verifierad kvittens minska med minst 25 % över en 12-veckorsperiod jämfört med den på förhand frysta 8-veckorsbaslinjen. **Tillit:** preliminär ”medel”, utan numeriskt sken av empirisk kalibrering; måste motiveras före beslut. **Misslyckande:** förbättringen understiger 25 % med tillräckligt tillförlitliga uppgifter.

**Alternativ förklaring:** Om huvudfördröjningen ligger i laboratoriet kan kvittenslagget minska utan att tiden från provtagning till beslutsunderlag gör det. Därför redovisas även total ledtid. Förväntningen ska inte framställas som ett test av förbättrad vattenkvalitet.

**Observation:** Tidsstämplar från laboratoriet respektive mottagarens kvittensjournal, med test av korrelerade fel och en manuell reservväg. **Resolution:** vid vecka 12 som ”uppfylld”, ”inte uppfylld”, ”delvis uppfylld” eller ”ej möjlig att avgöra”. En oberoende utsedd granskare krävs om beslutet bedöms ha hög konsekvens. Granskarens faktiska identitet är ännu inte verifierad.

**Mellanavstämning:** vecka 6. Dokumentera administrativa timmar, tillgänglighet, saknade mätningar, avvikelser, klagomål och faktiska förändringar i respons.

**Korrigering:** felaktiga data rättas med versionsspår, och berörda beslut/rapporter notifieras. Mätvärden skapar inga automatiska sanktioner eller ytterligare befogenheter.

## K6 — Överklagande, korrigering, avslut

**Invändningar:** Berörda ska kunna ifrågasätta datakvalitet, befogenhet, uteblivna svar och beslut via befintlig och oberoende behörig klagomåls-/prövningsväg. Exakt mottagare och rättsligt stöd **måste namnges** före operativ aktivering.

**Avslut:** samordningsförsöket upphör normalt efter tolv veckor; fortsättning kräver ett nytt behörigt beslut. Öppet tillsyns- eller åtgärdsärende, eventuella rättsmedel, laglig arkivering och kontraktsenlig personal- och datahantering upphör inte därför att försöket gör det. Befintliga organ behåller sina mandat.

**Administrativ börda:** uppskatta och registrera faktisk berednings-, mötes-, gransknings-, översättnings- och uppföljningstid och vem som bär den; **inte mätt ännu**. Tillgänglig pappers-/telefonväg ska fungera där digital åtkomst är ett hinder.

---

## Föreslagen teknisk mappning (inte fullgjord registrering)

Den människoläsbara profilen kan hänvisa till befintliga handlingar och sammanföra funktioner som annars sprids mellan följande poster:

| Funktion | GMEAIA-referens | Läget i denna övning |
|---|---|---|
| Mandat och kausalt ansvar | `GMEAIA-01`, `-20` | **Brist:** rättsliga källor och beslut ej inhämtade |
| Problem, alternativ, rättigheter | `-09`, `-13` | Skissad, berörda och risker måste verifieras |
| Auktorisation och aktivering | `-22`, `-23` (efter faktisk beslutstyp) | **Ej uppfylld** |
| Genomförande, ägare, överlämningar | `-08`, `-24` | Föreslaget men ej accepterat |
| Observation och bedömning | `-05`, `-30`, `-31`, `-32` | Planerad; baslinje, källa och oberoende ej fastställda |
| Rättelse, klagomål och skydd | `-34`, `-41` | Rättslig väg, mottagare och åtkomst ej fastställda |
| Avslut och kvarstående skyldigheter | `-38`, `-39`, eventuellt `-60` | Föreslagen, kräver operativ förankring |

Den operativa registreringen måste dessutom bevara relevanta fält i GMEAIA:s **48-fältsheader**, utan att kräva 48 rubriker i det människoläsbara beslutsdokumentet. Ett enskilt dokument får representera flera funktioner endast om version, källa, status, mandat, åtkomst, överlämning och rättelse kan särskiljas vid behov.

**Resultat:** Detta är ett *kompakt profilutkast* och en plan för komplettering. Det är **inte** ett undertecknat, auktoriserat eller aktiverat GGF-ärende.
