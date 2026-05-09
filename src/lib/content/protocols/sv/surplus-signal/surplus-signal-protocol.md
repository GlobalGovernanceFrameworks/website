# Överskottssignalprotokoll v0.2

**En minimalistisk, federerad, semi-läsbar samordningsgrammatik för ömsesidig försörjning.**

---

## Ingress – Konstitutionella principer

> Dessa är inte lagar. De är protokollets anda. Implementationer som bryter mot dem kan fortfarande fungera, men de avviker från vad SSP är tänkt att vara.

1. **Lokal suveränitet är primär.** Ingen signal tvingar till handling. En nod får ignorera eller avvisa vilken signal som helst utan motivering.
2. **Ingen obligatorisk global identitet.** Identifierare är pseudonyma som standard. Ingen universell mänsklig identitetsverifiering får krävas.
3. **Inget centralt register.** Det finns ingen enda global databas över signaler. Federation är frivillig och begränsad till tillitszoner.
4. **Förgänglighet som standard.** Alla rykten, synlighets- och uppskattningsmått måste avta över tid (standard ≤ 30 dagar).
5. **Opacitet bevaras i designen.** Exakt position och verifierad identitet avslöjas endast med uttryckligt, tidsbegränsat samtycke.
6. **Forkningsrätt är en rättighet.** Protokollet, dess implementationer och till och med denna ingress får forkas under tillåtande villkor (CC0).
7. **Hybridneutralitet.** Protokollet gynnar eller missgynnar ingen `transaction.type`; penga- och icke-pengaflöden samexisterar utan hierarki.
8. **AI är endast rådgivande.** All automatiserad matchning, prognos eller rekommendation måste kunna åsidosättas av en människa. Ingen helautomatisk tilldelning är tillåten.
9. **Inga obligatoriska globala mått.** Framgång mäts lokalt. Det finns inget påtvingat globalt nyckeltal.
10. **Utträde måste vara verkligt.** En nod kan lämna, radera sina historiska signaler och ta med sina data (se §8).

---

## 1. Introduktion

SSP är inte en ekonomi. Det är en **suveränitetsarkitektur** – ett sätt för autonoma system (bioregioner, kooperativ, bostadsområden, ömsesidiga hjälpgrupper) att samordna flöden av överskott och behov utan att kollapsa i dominans, fragmentering eller utsugning.

Det är ett **protokoll, inte en plattform**. Det föreskriver ingen central databas, ingen universell identitet och inget permanent rykte. Det är utformat för att vara **semi‑läsbart**: tillräcklig synlighet för att dirigera resurser, tillräcklig opacitet för att skydda mänskliga relationer.

SSP utgår från en iakttagelse: moderna ekonomier slösar enorma mängder, inte för att vi saknar resurser, utan för att behov och kapaciteter inte kan **se** varandra. Detta protokoll är en tunn grammatik för att göra dem synliga – på villkor som respekterar lokal autonomi.

---

## 2. Allmänt signalhölje

Varje SSP-signal bär ett gemensamt kuvert.

| Fält | Typ | Obligatoriskt | Beskrivning |
|------|-----|----------------|--------------|
| `schema_version` | sträng | ja | `"0.2"` |
| `signal_type` | sträng | ja | En av de registrerade signaltyperna |
| `id` | UUID | ja | Unik identifierare genererad av den utfärdande noden |
| `node_id` | sträng | ja | Pseudonymt, stabilt per nod; härlett från en publik nyckel (t.ex. Base58‑kodad hash) |
| `timestamp` | ISO 8601 | ja | Skapelsetid i UTC |
| `expires` | ISO 8601 | nej | När signalen upphör att vara giltig; standard 7 dagar |
| `location` | objekt | ja* | (för erbjudanden/förfrågningar) Se §2.1 |
| `resource` | objekt | ja* | (för erbjudanden/förfrågningar) Vad som erbjuds eller efterfrågas |
| `temporal` | objekt | nej | Tidsbegränsningar utöver enkel utgång |
| `transaction` | objekt | ja | Rättslig inramning för lokal regelefterlevnad |
| `reputation` | objekt | nej | Hur tillförlitlighet ska tolkas lokalt |
| `disclosure` | objekt | nej | Preferenser för graderat avslöjande |
| `trust_generation` | objekt | nej | Förtroendeskapande i miljöer med låg tillit |
| `culture` | objekt | nej | Deklarationer av bytesnormer |
| `metadata` | objekt | nej | Utökningsbara nyckel-värde-taggar, anteckningar |
| `signature` | sträng | ja | Digital signatur över signalens innehåll (exklusive `signature`) |

### 2.1 Platsblock

Bevarar opacitet samtidigt som logistik möjliggörs.

```json
"location": {
  "coarse": "Upplands Väsby",               // obligatorisk, läsbar för människor
  "precise": {"lat": 59.5, "long": 17.9},   // valfri, null om ej angiven
  "pickup": true,
  "delivery": false
}
```

### 2.2 Resursblock

```json
"resource": {
  "type": "food",                          // grundkategori (se §9)
  "subtype": "tomater",                   // fritext eller gemenskapssubtyp
  "quantity": 30,
  "unit": "kg",
  "quality": "ekologisk",                 // valfri: "konventionell", "överskott", "defekt"
  "tags": ["vegansk", "glutenfri"]        // valfri folksonomi
}
```

### 2.3 Tidsblock

```json
"temporal": {
  "availability_start": "2026-05-09T08:00:00Z",
  "availability_end": "2026-05-11T18:00:00Z",
  "needed_by": null,                      // för förfrågningar
  "recurrence": {                         // valfri
    "frequency": "weekly",
    "end_date": "2026-12-31",
    "occurrences": 10
  }
}
```

### 2.4 Transaktionsblock

Kodar den sociala och rättsliga ramen. Alla typer är självdeklarerade.

```json
"transaction": {
  "type": "gift",                         // "gift", "barter", "mutual_credit", "non_profit", "hybrid"
  "legal_entity": "org_num_123456-1234",  // valfri
  "currency_accepted": null,              // vid hybrid, t.ex. "SEK"
  "vat_applicable": false,
  "receipt_required": false,
  "jurisdiction": "SE"                    // självdeklarerad
}
```

### 2.5 Ryktesblock (valfritt)

Inkluderas endast när en nod vill påverka hur dess signaler behandlas lokalt. Inget globalt rykte upprätthålls.

```json
"reputation": {
  "decay_rate": "14d",                    // standard: halvering var 14:e dag
  "dimensions": ["food_handling", "reliability"]
}
```

### 2.6 Avslöjandeblock (valfritt)

Styr graderad frisläppning av precision.

```json
"disclosure": {
  "current_level": 0,                     // 0 = endast grov plats; 1 = exakt plats; 2 = verifierad identitet
  "thresholds": {
    "level_1": 5,                         // efter 5 genomförda uppfyllelser
    "level_2": 10
  },
  "consent_required": true,
  "consent_timeout": "24h"
}
```

### 2.7 Förtroendeskapandeblock (valfritt)

För miljöer med låg tillit.

```json
"trust_generation": {
  "vouches": [
    {
      "from_node": "Base58voucher",
      "domain": "food",
      "weight": 0.8,
      "expires": "2026-08-01T00:00:00Z"
    }
  ],
  "collateral": {
    "type": "labor_pledge",
    "amount": 10,
    "unit": "hours",
    "description": "Gemensam trädgårdsskötsel",
    "validated_by": null
  }
}
```

### 2.8 Kulturblock (valfritt)

Anger lokala bytesnormer för att undvika friktion.

```json
"culture": {
  "exchange_norm": "gift_with_reciprocity_expected",
  "notes": "I vår gemenskap är en motgåva av liknande värde sedvanlig men inte tvingande."
}
```

### 2.9 Metadatablock (valfritt)

```json
"metadata": {
  "notes": "Skördade i morse. Ta med egna behållare.",
  "urgency": "medium"
}
```

---

## 3. Grundläggande signaltyper

### 3.1 Erbjudande – Deklaration av överskott eller kapacitet

Ett `offer` använder hela kuvertet. Blocken `resource` och `location` är obligatoriska. Ett erbjudande kan innehålla tidsbegränsningar (temporal) och återkommande (recurrence).

#### Exempel

```json
{
  "schema_version": "0.2",
  "signal_type": "offer",
  "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "node_id": "12D3KooWQkG9RN4nQJ6...",
  "timestamp": "2026-05-09T08:00:00Z",
  "expires": "2026-05-11T14:00:00Z",
  "location": {
    "coarse": "Upplands Väsby",
    "precise": null,
    "pickup": true,
    "delivery": false
  },
  "resource": {
    "type": "food",
    "subtype": "tomater",
    "quantity": 30,
    "unit": "kg",
    "quality": "ekologisk",
    "tags": ["kultursort", "såstomater"]
  },
  "transaction": {
    "type": "gift",
    "legal_entity": "REKO_Väsby_1"
  },
  "reputation": {
    "decay_rate": "14d",
    "dimensions": ["food_handling"]
  },
  "metadata": {
    "notes": "Skördade i morse. Ta gärna med egna behållare."
  },
  "signature": "0x4a8b2c..."
}
```

### 3.2 Förfrågan – Behovsdeklaration

En `request` speglar erbjudandets struktur. Den kan innehålla ett `buffer`-fält för tolerans av partiell uppfyllelse.

```json
"buffer": {
  "min_quantity": 25,
  "max_quantity": 30
}
```

### 3.3 Uppfyllelse – Resultatpost

Återkopplingsslingan. En `fulfillment` refererar till ett erbjudande och en förfrågan och rapporterar resultatet. Den är valfri men rekommenderas starkt – den bidrar till lokalt lärande utan att skapa permanenta poäng.

```json
{
  "schema_version": "0.2",
  "signal_type": "fulfillment",
  "id": "uuid-fulfillment-1",
  "node_id": "Base58nodeA",
  "timestamp": "2026-05-09T14:30:00Z",
  "references": {
    "offer_id": "uuid-offer-123",
    "request_id": "uuid-request-456"
  },
  "outcome": {
    "status": "completed",
    "quantity_fulfilled": 30,
    "unit": "kg",
    "reason_failure": null
  },
  "feedback": {                              // valfri
    "rating": 5,
    "note": "Perfekt skick!",
    "tags": ["i_tid", "vänligt"]
  },
  "signature": "..."
}
```

### 3.4 Varningssignal för brist – Systemgenererad rådgivning

Genereras av en nods analysfunktion för att synliggöra ihållande luckor. Den är helt rådgivande och avsedd att väcka mänskligt samtal.

```json
{
  "schema_version": "0.2",
  "signal_type": "shortage_alert",
  "id": "uuid-alert-789",
  "node_id": "Base58analyticsNode",
  "timestamp": "2026-05-09T12:00:00Z",
  "resource": { "type": "food", "subtype": "vintergrönt" },
  "period": { "start": "2026-11-01", "end": "2026-03-31" },
  "deficit_rate": 0.4,
  "current_production_intents": 2,
  "suggested_target": 5,
  "convening_suggestion": "Överväg en bioregional matträff eller REKO-möte.",
  "scenario": {
    "if": { "new_intents": 3, "capacity_sq_m": 150 },
    "then": { "estimated_deficit_rate": 0.05 }
  },
  "signature": "..."
}
```

---

## 4. Produktionssamordningstillägg

Dessa signaler låter protokollet röra sig bortom surplusfördelning mot **adaptiv produktionsplanering** – inte centralplanering, utan en samtalsbaserad, åtagandestyrd loop.

### 4.1 Produktionsavsikt

En nod deklarerar vad den planerar att producera.

```json
{
  "signal_type": "production_intent",
  "resource": { "type": "food", "subtype": "grönkål" },
  "quantity": 100,
  "unit": "kg",
  "timeframe": "2026-Q3",
  "capacity_details": { "land_sq_m": 200, "method": "ekologisk_plöjningsfri" }
}
```

### 4.2 Kapacitetserbjudande

En nod erbjuder produktionsresurser (mark, verktyg, arbetskraft).

```json
{
  "signal_type": "capacity_offer",
  "resource": { "type": "space", "subtype": "trädgårdslott" },
  "quantity": 50,
  "unit": "sq_m",
  "availability": "2026-03 till 2026-10",
  "constraints": "föredrar kooperativ odlare"
}
```

### 4.3 Samarbetsförfrågan

För att hitta partners för ett produktionsmål.

```json
{
  "signal_type": "collaboration_request",
  "goal": "täcka_vintergrönsaksgapet",
  "needed": { "type": "skill", "subtype": "odling" },
  "description": "Söker 2 odlare till i Väsbyområdet."
}
```

Tillsammans omvandlar dessa tre signaler `shortage_alert` till konkreta lokala agendor. Protokollet synliggör ”vem som är villig” och ”vad som saknas”; människor avgör vad som ska göras.

---

## 5. Uppskattning – Tacksamhet som inte fräter sönder

Vi undviker medvetet ett poängbaserat ”Hjärtan”-system. Läsbar uppskattning, även med förgänglighet och lokalitet, skapar optimeringspress, socialt spel och måttjakt.

Uppskattning uttrycks i stället på två sätt:

### 5.1 Bidrag till en allmänning

Det främsta sättet att säga ”tack” är att **erbjuda något tillbaka till nätverket** – inte till individen, utan till den gemensamma infrastrukturen. En `offer`-signal kan inkludera ett valfritt fält `inspired_by` som refererar till den ursprungliga signal som inspirerade den.

```json
"inspired_by": "uuid-of-original-offer"
```

Exempel: *”Skolbespisningen fick så underbara tomater att vi erbjuder 4 timmars storstädning till bygdegården.”*

Detta håller tacksamheten relationell, skapande och omätbar.

### 5.2 Kortlivad uppskattningssignal (valfri, begränsad)

Om ett direkt ”tack” önskas kan en nod skicka en `appreciation`-signal med följande tvingande begränsningar:

- **Kortlivad:** Får inte lagras längre än 24 timmar.
- **Icke‑knapp:** Obegränsat antal.
- **Lokalt synlig:** Federeras inte utanför den egna tillitszonen.
- **Ignoreras av algoritmer:** Bots, matchningsmotorer och ryktesmoduler måste helt bortse från den.

```json
{
  "signal_type": "appreciation",
  "reference_signal": "uuid-of-fulfillment",
  "expression": "tacksamhet",
  "note": "Ert överskott gjorde vår skollunch underbar!",
  "ephemeral": true
}
```

Detta är ett digitalt leende. Det bär ingen vikt. Det kan inte ackumuleras.

---

## 6. Kulturell medling

När noder med olika bytesnormer interagerar är friktion oundviklig. Protokollet tillhandahåller en valfri medlingsstomme.

### 6.1 Kulturell standarddeklaration (nodmetadata)

Noder kan deklarera sin standardnorm i sin nodprofil (inte per signal):

```json
"cultural_default": {
  "exchange_norm": "gift_with_reciprocity_expected",
  "description": "I vår tradition är en motgåva av liknande värde sedvanlig men inte tvingande."
}
```

### 6.2 Medlingssignal

Om en konflikt uppstår kan en inblandad nod skicka:

```json
{
  "signal_type": "cultural_mediation",
  "parties": ["nodeA", "nodeB"],
  "issue": "reciprocity_expectation_mismatch",
  "request": "seek_clarification",
  "mediator_suggestion": "någon_bikulturell_gemenskapsmedlem"
}
```

### 6.3 Medlingsresultat

Medlingsresultat registreras som en icke‑bindande signal:

```json
{
  "signal_type": "mediation_outcome",
  "mediation_id": "...",
  "resolution": "agreed_to_clarify_expectations",
  "description": "NodB kommer uttryckligen ange när en gåva är en ren gåva."
}
```

Om medling misslyckas är den yttersta lösningen alltid **utträde** – tysta den andra noden, forka tillitszonen eller lämna.

---

## 7. Protokollstyrning

Konstitutionella principer är nödvändiga, men de måste kompletteras med uttrycklig, minimal styrningsmekanik. Ingen enskild entitet äger SSP. Dess utveckling styrs av följande normer.

### 7.1 Schemaauktoritet

- Ändringar föreslås offentligt (t.ex. GitHub-repo under CC0).
- Implementationer signalerar antagande genom att skicka den nya `schema_version`.
- Bakåtkompatibla tillägg uppmuntras; brytande ändringar kräver en ny huvudversion.
- Beslut fattas efter ungefärlig konsensus. Ingen formell röstande kår finns.

### 7.2 Tvistlösning

Tvister hanteras i nivåer:

1. **Lokal tillitszon** löser internt.
2. Vid gränsöverskridande zon prövas kulturell medling.
3. Om olöst kan varje nod tysta, avfederera eller forka.

### 7.3 Relädrift

- Ett gränsöverskridande relä är en dum vidarebefordrare.
- Det måste publicera en `relay_policy`-signal:

```json
{
  "signal_type": "relay_policy",
  "relay_type": "dumb_forwarder",
  "filter_policy": "pass_through",
  "logging_policy": "none"
}
```

- Alla noder får driva ett relä. Inget relä får göra anspråk på särstatus.
- Lokala noder övervakar reläkoncentration. Om >30 % av signalerna i en zon passerar genom ett enda relä, höjs en rådgivande varning.

### 7.4 Forktröskel

Forkning är en förstahandsrättighet. En nod kan signalera en variant via `protocol_variant` i sin metadata. Partiell interoperabilitet bibehålls om kuvertet och de grundläggande signaltyperna förblir kompatibla.

---

## 8. Rättsligt skydd och utträdesmekanik

### 8.1 Nodnivåns rättsliga metadata

Varje nod får inkludera ett `legal`-block i sin profil:

```json
"legal": {
  "warrant_canary": "senast_uppdaterad_2026-05-01",
  "data_retention_days": 7,
  "right_to_delete": true,
  "jurisdiction_acceptance": "denna nod verkar under svensk/EU-rätt"
}
```

Warrant‑canary är ett enkelt datum; dess frånvaro (eller föråldring) antyder möjligt tvångsutlämnande, men ger ingen teknisk garanti.

### 8.2 Utträdesprotokoll

- En nod träder ut genom att sända en `node_offline`-signal med orsak `"exit"`.
- Dess historiska signaler markeras för radering hos grannar (max 48 timmars respit, om inte lokal lag kräver längre).
- Noden kan begära en dataexport från grannar (implementationsspecifikt).
- Ingen global svartlistning sker.

---

## 9. Grundläggande vokabulär för resurstyper

För att möjliggöra analys över nodgränser samtidigt som lokal utvidgning tillåts, definierar protokollet ett minimalt kontrollerat vokabulär för `resource.type`. Undertyper förblir fria i form.

| Typ | Beskrivning | Exempel på undertyper |
|-----|-------------|------------------------|
| `food` | Ätliga varor | tomater, grönkål, bröd, honung |
| `tools` | Fysiska verktyg/utrustning | borrmaskin, symaskin |
| `space` | Fysisk plats | förråd, verkstad, trädgårdslott |
| `transport` | Förflyttning av gods/personer | cykel, skåpbil, leveranstid |
| `skill` | Mänsklig kunskap/arbete | reparation, undervisning, barnpassning |
| `energy` | Kraft/värme | sol, ved, batterilagring |
| `care` | Hälso-/äldre-/barnomsorg | matleverans, sällskap |
| `digital` | Digitala varor/tjänster | programvara, 3d‑utskrift, design |

Typergistret underhålls som en gemensam wiki. Ingen central auktoritet vaktar tillägg; lokala noder får utöka, men okända typer faller tillbaka på en generisk förälder.

---

## 10. Federationstopologi

- **Inom en tillitszon:** Fullt peer‑to‑peer-nät via ett skvallerprotokoll, Matrix-rum eller Nostr-relän. Varje nod upprätthåller ett lokalt, kortlivat lager av senaste signaler.
- **Gränsöverskridande dirigering:** Frivilligt via relän (dumma vidarebefordrare). Upptäckt är inte global.
- **Globalt lager:** Ett eventuellt, starkt aggregerat allmänningsregister (resurstypswiki, kontaktpunkter för tillitszoner). Det innehåller **inte** levande signaler.

---

## 11. Implementationsvägledning och pilotdesign

### 11.1 Människan först

Alla signaler måste kunna representeras som ren text (JSON eller kompakt YAML). En människa kan klistra in dem i WhatsApp, Telegram eller ett forum, och en parser kan läsa dem. En referensimplementation (Matrixbot + lokal SQLite-nod) tillhandahålls, men krävs inte.

### 11.2 AI‑assisterad matchning (valfritt, rådgivande)

En lokal nod får köra en lättviktsmodell (kvantiserad LLM eller begränsningslösare) som *föreslår* matchningar, prognostiserar överskott och simulerar produktionstäckning. Alla förslag måste kunna åsidosättas. Ingen modell får agera autonomt.

### 11.3 Pilot: Dubbelspårsimplementering

För att verifiera protokollets allmängiltighet rekommenderas två parallella piloter:

- **Spår A (Tillitsrikt, t.ex. svensk REKO-ring):**
  - Börja med grundfunktioner (erbjudande/förfrågan/uppfyllelse) över WhatsApp/Matrix.
  - Inför botassisterad matchning efter mänsklig validering.
  - Testa uppskattning, produktionsavsikt och kulturella standarder gradvis.
  - Mått: samordningseffektivitet, användaracceptans, juridisk efterlevnad.

- **Spår B (Låg tillit, t.ex. nav för migrantsamfund):**
  - Börja med tuffa tillägg: intygande, säkerhet, graderat avslöjande, kulturell medling.
  - Använd WhatsApp som transport; ingen dedikerad hårdvara behövs.
  - Mål: bevisa att protokollet kan starta samordning där ingen tidigare tillit finns.
  - Mått: antal genomförda uppfyllelser, kvalitativ tillitsuppkomst, konfliktlösningsmönster.

Jämförelse av båda spåren avgör om SSP är en REKO-uppgradering eller en äkta suveränitetsarkitektur.

---

## 12. Licens och bidrag

SSP v0.2 är tillägnat det offentliga under licensen [Creative Commons Zero (CC0)](https://creativecommons.org/publicdomain/zero/1.0/). Implementationer får använda vilken licens som helst. Bidrag till protokollet hanteras via ungefärlig konsensus på det kanoniska arkivet.

---

*Detta dokument är en levande grammatik, inte en slutgiltig lärobok. Det växer när gemenskaper testar det, bryter det och anpassar det. Skogsmycelet fungerar för att signaler är lokala, kemiska och kontextuella. SSP strävar efter motsvarande gleshet i det mänskliga lagret.*
