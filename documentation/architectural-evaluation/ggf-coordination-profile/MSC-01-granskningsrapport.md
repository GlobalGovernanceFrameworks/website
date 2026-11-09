# MSC-01 — Granskningsrapport

**Granskning:** Minimal Consequential Coordination Profile Test, 9 november 2026.  
**Objekt:** Den fiktiva profilen i `MSC-01-minimal-profil.md`.  
**Underlag:** Aktuella engelska GGF-källor i GitHub (versionsfiler, inte PDF:er).  
**Metod:** Dokumentbaserad avgränsning, minimiprofilsutkast och negativ kontroll mot tillämpliga krav. Ingen faktisk implementering eller oberoende juridisk prövning.

## Resultat i korthet

- **Kan ett CP2-ärende beskrivas i ett kompakt mänskligt beslutsunderlag?** Ja, som utkast och hänvisningsvy; källorna tillåter återanvändning och sammanslagning av funktioner.
- **Kan vi nu påstå formell GMEAIA/CIS-efterlevnad?** Nej. Mandat, underskrifter, rättigheter, observationskällor, oberoende, baslinje, klagomålshantering och teknisk registermappning måste verifieras.
- **Krävs ett nytt GGF-organ?** Nej, inte för detta avgränsade samordningsfall.
- **Finns ett möjligt extra värde för GGF?** Ja: konsekventa överlämningstillstånd, kausala beroenden, förhandsregistrerade prövbara förväntningar och spårbart avslut. Fördel jämfört med B+ är ännu inte bevisad.
- **Största sannolika bördan:** att göra CIS §9:s epistemiska och juridiska minimikrav spårbara och förståeliga utan att förvandla dem till flera separata processer.

## 1. Kritiskt val av CP2-scenario

GMEAIA:s sammansatta test **T06** säger uttryckligen att ett tekniskt enkelt pilotprojekt som påverkar hushållens vattenåtkomst omfattas av **CP3**. Därför avgränsas detta test till befintlig provtagning, mellanorganisatorisk rapportering och kvittens. Inga nya fysiska reningsåtgärder, vattenåtkomstbeslut eller tvångsåtgärder får aktiveras genom profilen. Även den smala omfattningen måste kontrolleras för särskilda skyddade domäner innan aktivering.

## 2. Ablation och minimikrav

| Komponent | Prova att avlägsna | Förlust under antaganden | Minsta accepterade ersättning |
|---|---|---|---|
| Behovsprövning | Ta bort jämförelse med enklare alternativ | Risk för extra process utan påvisat värde | Dokumenterad jämförelse A/B/C |
| Mandat & rättigheter | Ta bort separat GGF-mandatlista | Fungerar *endast* om befintliga lagliga handlingar redan klarlägger allt | Hänvisning till giltiga beslut; inga nya befogenheter |
| Beroendekarta | Ta bort explicit kontroll av kausala samband | Risk för att kvarvarande fördröjning tillskrivs fel aktör | Enkel tabell med variabel/ägare/beroende |
| Överlämning | Ta bort mottagarkvittens och ansvar vid timeout | Risk att handlingar tolkas som accepterade trots tystnad | Kvittens, källa till frist, eskalering och kvarstående ansvar |
| Uppföljning | Ta bort fryst förväntning före beslut | Risk att misslyckanden omtolkas i efterhand | En prövbar förväntning med alternativ och oberoende observationsväg |
| Avslut | Ta bort kontinuitetsvillkor | Risk för övergivna ärenden eller permanent temporär struktur | Tidsgräns, återföring och kvarstående skyldigheter |

**Ablationsslutsats:** Funktionerna kan kombineras men inte alltid uteslutas. Ett ordinärt kommunalt dokument kan redan uppfylla flera av dem. GGF kan tillföra ett gemensamt språk för interorganisatoriska överlämningar, men nyttan återstår att testa mot en lika välkonstruerad enkel samverkansmall (B+).

## 3. Konformitetskontroll: GMEAIA v0.2.2

Statusnyckel: **Designstöd** = texten uttrycker relevant regel; **Öppet** = bevis eller färdig struktur saknas; **Villkorligt** = krav endast om faktisk funktion aktiveras; **Ej tillämpligt i grundfallet** = behöver omprövas vid ändrad omfattning.

| GMEAIA-gate | Status | Kommentar |
|---|---|---|
| G01 rättslig källa, effekt, status, ansvarig | **Öppet** | Den fiktiva profilen har inte faktiska mandat, beslutsprotokoll, registrerade identiteter eller signaturer |
| G02 ingen implicit befogenhet | **Designstöd** | Inga nya befogenheter härleds från en mall eller från GGF |
| G03 rätt konsekvensprofil | **Villkorligt** | CP2 rimlig *endast* för rapporteringssamordningen; T06 kräver CP3 om hushållens vattenåtkomst påverkas |
| G04 proportionell börda och tillgänglighet | **Öppet** | Kompakt människovy föreslås, men arbetsbörda och tillgänglighet har inte provats |
| G05 berörda och utomstående kartlagda | **Öppet** | Kategorier finns; faktisk täckning och eventuell urfolksställning måste undersökas |
| G06 separat samtycke, befogenhet, beslut, aktivering | **Öppet** | Hålls begreppsligt isär men inga giltiga handlingar finns ännu |
| G07 kausalt ansvar och externa beroenden | **Delvis** | Variabler och kontroller föreslås; juridiskt/praktiskt ansvar och belastningsfördelning måste prövas |
| G08 möjliga mandat- och jurisdiktionsglapp | **Designstöd** | `authority_pending` bevaras; status får inte omtolkas till kompetens |
| G09 mottagande, frister, vägran och ansvarskedja | **Öppet** | Föreslagna två dagar är en frivillig avtalsfrist, inte fastställd rättslig skyldighet |
| G10 ingen automatisk befogenhetsöverföring | **Designstöd** | Kvittens och tystnad ger ingen jurisdiktion |
| G11 observationsberoenden och reservväg | **Öppet** | Två dataspår och manuell reservväg föreslås; faktisk oberoendeställning ej verifierad |
| G12 objective-reproduction för långlivade system | **Ej tillämpligt i grundfallet** | Gäller om försöket förvandlas till varaktigt eller systemcentralt samordningssystem |
| G13 skyddad domän och fail-closed | **Öppet** | Screeningsresultatet måste verifieras; fysisk vattenåtgärd är utanför scope |
| G14 kvarvarande rättigheter och tjänster | **Delvis** | Avslutsregel finns, men skyldigheterna behöver bindas till faktiska rättsliga handlingar |
| G15 avgränsade AI-, leverantörs- och stödroller | **Villkorligt** | Ingen ny AI eller leverantör antas; existerande labbavtal och eventuella nya dataflöden måste granskas |
| G16 indikatorer avgör inte rättsliga konsekvenser | **Designstöd** | Avvikelse leder till bedömning, inte automatisk sanktion |
| G17 tillräcklig pilotomfattning | **Villkorligt** | 12 veckor kan pröva överlämning, **inte** vattenkvalitet eller institutionell effekt i stort |
| G18 skalning | **Ej tillämpligt** | Ingen skalning auktoriseras; nytt beslut krävs |
| G19 kompatibilitet utan ideologiskt tvång | **Designstöd** | B+ är acceptabelt jämförelsealternativ |
| G20 falsifiering för varaktiga mekanismer | **Ej tillämpligt i grundfallet** | Gäller ramverket och långlivade/systemcentrala mekanismer, inte automatiskt varje lokal åtgärd |
| G21 rättelse fortplantas | **Öppet** | Versionsspår anges, men faktiska mottagare och korrigeringskedjor måste specificeras |
| G22 materiellt avslut | **Öppet** | Avslut planeras; verkliga rättigheter, data, utrustning, kvarvarande ärenden och förvaltare måste verifieras |

**Resultat:** Det vore vilseledande att ange ett procenttal som om detta var en komplett maskinell konformitetsgranskning. En konformitetssiffra skulle blanda uttryckta designkrav, villkorade krav och saknade rättsliga bevis. **Operativt godkännande: NEJ.**

## 4. CIS v0.2.10 och Meta-Governance v1.6.3

**CIS §2.14:** Dokumentationsbörda ska stå i proportion till bland annat rättigheter, tjänster, irreversibilitet, datakänslighet, skala och varaktighet. Befintliga giltiga underlag kan återanvändas.

**CIS §9.2:** Observationskontraktet måste fånga mer än bara mätvärden: syfte och tillåten användning, källa och beroenden, täckning, saknade populationer, disclosure-beroende, skyddad information, osäkerhet, sensor-/metodförändring, korrigering och oberoende utfall. Den kompakta profilen pekar på detta men kan **inte** hävda att allt är färdigställt utan underlag.

**CIS §9.3–9.4:** Förhandsbedömningen måste redovisa alternativa förklaringar och gemensamma data-/organisationsberoenden. Flera rapporter från samma pipeline räknas inte automatiskt som oberoende.

**CIS §9.9:** Minst en prövbar förväntning ska frysas före auktorisation och ha failure condition, alternativ förklaring, källa, tid, bedömare och upplösning. I profilutkastet behöver baslinje, säkerhetsskäl och faktisk resolver kompletteras.

**CIS §9.10:** Om institutionen har relevant kalibreringshistorik med överkonfidens krävs justerad försiktighet eller publicerad förklaring. Okänd historik får inte skrivas som 'välkalibrerad'.

**Meta-Governance §5.1–5.9:** Behov, ansvar, alternativ, tidsfrister, befogenhet, utvärdering och materiellt avslut täcks i profilens sex sektioner. Detta är en mänskligt läsbar mappning, inte full styrkt efterlevnad av Meta-Governance §21.

## 5. Den verkliga komplexitetsfrågan

En enda mänsklig vy kan räcka som navigationsyta, men inte som ersättning för:
- verifierade juridiska beslutsunderlag;
- faktisk spårbarhet till CIS §9:s epistemiska metadata;
- relevant GMEAIA-registerdata och 48-fältsheadern;
- tillämpningsspecifik behörighet, tillgängligt prövningsförfarande och åtgärdsrätt;
- separata operativa handlingar för beslut, aktivering, åtgärd och avslut när dessa händelser inträffar.

Det talar för **en sammanfattande profil + befintliga källdokument + minimal maskinmappning**, inte en samling nya fullskaliga formulär.

## 6. Rekommendationer

1. **Ingen omedelbar arkitekturrevision.** Källorna innehåller redan återanvändning, proportionalitet och icke-självverkställande mandatgränser.
2. **Testa profilen mot en oberoende GGF-obekant granskare**, som ska hitta saknade uppgifter och onödiga fält utan muntlig förklaring från upphovspersonerna.
3. **Testa skarp gräns CP2/CP3** med ett fall där en liten rapporteringsändring får operativ effekt på vattenförsörjningen. Då ska det flaggas för ny rättslig klassificering, inte bara få en extra ruta.
4. **Jämför direkt med B+.** Om ett kort icke-GGF-avtal kan ge samma resultat till lägre kostnad, rekommendera det enklare avtalet.
5. **Överväg ett kortfattat, frivilligt 'entry profile' för GGF** bara om test med externa användare visar att sådan vägledning minskar fel och börda. Undvik ett nytt självständigt GGF-organ eller en ny normativ dataklass.

## 7. Källor

- GMEAIA v0.2.2 (i filens H1 står ännu 'v0.2.1'; front matter och versionshistorik anger v0.2.2): https://github.com/GlobalGovernanceFrameworks/website/blob/main/src/lib/content/specifications/en/gmeaia/versions/v0.2.2.md
- CIS v0.2.10 (huvudrubriken står ännu 'v0.2.9'; front matter anger revision 0.2.10): https://github.com/GlobalGovernanceFrameworks/website/blob/main/src/lib/content/specifications/en/constitutional-interface/versions/v0.2.10.md
- Meta-Governance v1.6.3: https://github.com/GlobalGovernanceFrameworks/website/blob/main/src/lib/content/framework-outlines/en/tier-1/meta-governance/versions/v1.6.3.md
- Polycentric Governance v0.6.2: https://github.com/GlobalGovernanceFrameworks/website/blob/main/src/lib/content/framework-outlines/en/tier-1/polycentric-governance-architecture/versions/v0.6.2.md
- GGF principles (Swedish): https://github.com/GlobalGovernanceFrameworks/website/blob/main/src/lib/content/frameworks/sv/principles.md

**Versionsnotering:** Dokumenten har partiellt revisionspinnade beroenden. Vårt test använder de citerade versionerna som jämförda arbetskällor, inte ett antagande att varje senare versionsändring är inkorporerad i alla ramverk.
