# S1 authority-and-action test: gas price shock in Germany

Nov 23, 2026 · @Björn Kenneth Holmström

*v0.2, 23 November 2026: reconciled after an external review. Disconnection rules now cited to §§41f–41g EnWG; the Bundesnetzagentur's 2023 Prognos value-chain study added to Case B; timing split into four measures; payment-channel coverage added; GGF response times marked as specified, not demonstrated; host-readiness test widened to six questions. S1 closes at this version.*

## Summary

S1 runs a gas shock through German institutions as they stand in November 2026, first without GGF and then with the patched frameworks (Climate & Energy v2.2, AUBI v2.7.1, Gaian Trade v0.9.3) acting only through German authorities.

- **Case B (physical shortage): Germany is well prepared.** The Notfallplan Gas is a pre-authorized safe state, and a curtailment order can follow within days of an emergency declaration, though the declaration itself has no deadline. GGF should defer to it. Germany also already has a regulator-commissioned analysis of downstream value chains (Prognos for the Bundesnetzagentur, 2023). What stays open is whether that analysis is current, detailed enough and used in individual curtailment decisions, and the lack of a household volume floor.
- **Case A (price triples, supply holds): Germany has no pre-authorized answer.** Households already on benefits have rising heating costs covered. For others, the earliest protection is an individual heating-cost claim once a higher bill falls due, which depends on contract and billing date, and disconnection protection once arrears build. Collective relief needs a new statute. The patched GGF frameworks would classify and route the shock, but nothing shows German institutions could run those steps at the assumed speed. AUBI §5.1.5 finds no host instrument: the direct-payment channel has no payout law and holds bank details for only about 16 million of 86 million tax IDs.
- **The binding gap is pre-constitution, not authority.** What would shorten the delay is a host instrument in place before the shock that can actually reach people. v0.2 tests this with six questions: authority, activation, delivery, coverage and capacity, timing, and termination and correction.
- **Four dated changes fall within fourteen months**: the Wohngeld heating component, storage-fill rules, §29 GWB and the reserve's readiness. Case A is also close to the live situation this winter.

For the revision plan, S1 supports a host-readiness profile instead of a stabilization authority, the dependency template, and DER as a rubric that measures reach and outcomes. The DRR patch is narrowed: link existing dependency evidence to decisions rather than supply a map Germany lacks. S1 does not show that GGF improves outcomes. Brazil is the next test.

## Scope and method

- **Jurisdiction:** Germany, for both cases, so the cases differ only in the shock. Brazil follows as an external-validity case and Sweden as a transferability check.
- **Window:** the first six weeks from day 0.
- **Cases:** A, the wholesale price triples and supply holds; B, a physical shortage with a price spike.
- **Baseline:** existing German institutions only, at their state on 23 November 2026, including bills not yet enacted (graded as specified).
- **Counterfactual:** the patched GGF frameworks, which create no new authority and no new record type. Every GGF action has to pass through a German competent authority. The market-power step is tested as a GMEAIA-08 referral to the Bundeskartellamt.
- **Outputs per case:** first executable protective action, its timing, real-resource constraints, authority gaps and coordination burden. Timing is split into four measures: earliest legally possible intervention, earliest intervention for a stated household, expected processing time, and earliest protection actually received. Public sources support the first two; the last two need administrative data.
- **Grading:** each instrument is graded specified, enacted, funded or operational, and each GGF handoff gets a GMEAIA v0.2.2 handoff state.
- **Limits:** a desk test from public sources, not an interview with the authorities. Lags are legal minimums or 2022 precedent, not measured processing times. GGF response times (classification in one to two days, a seven-day referral clock) are specifications: no German body has adopted them, assigned operators or committed to them. Recorded handoff states are reported separately from legal and operational readiness. The counterfactual relies on Climate & Energy v2.2, AUBI v2.7.1 and Gaian Trade v0.9.3 as stored in the GGF project; reviewers need those texts to check it. Fiscal capacity and distribution are out of scope.

## German baseline (November 2026)

The baseline is what German institutions can do today, without GGF. Each instrument is graded on the same four-step scale used in the shock trace: **specified** (designed or drafted), **enacted** (in force as law), **funded** (money or an entitlement attached), **operational** (an office can act on it now). Sunset and pending-change dates are listed because several of them fall inside the next twelve months.

**Live context.** Case A is close to the current situation. European wholesale gas has roughly tripled since February 2026 and reached almost €100/MWh on 26 October. Storage stood at 58.1% on 10 November against a target of about 70%. The Bundesnetzagentur rated supply risk as low on 13 November. The findings below are therefore not hypothetical for this winter.

| Function | Institution and legal basis | State | Lag and limits |
| --- | --- | --- | --- |
| Detect price and supply stress | Bundesnetzagentur situation reports; Markttransparenzstelle für Strom und Gas (§47a GWB), run jointly by the Bundesnetzagentur and the Bundeskartellamt | Operational | Same-day visibility. Monitoring only: no rule links a price level to a protective action |
| Retail price pass-through | §41(5) EnWG: at least one month's notice to household customers on special contracts; §5 GasGVV: six weeks' public notice in Grundversorgung; special termination right | Operational | Sets a minimum lag of four to six weeks between a supplier's decision and a higher price. Not a universal delay before hardship: households on dynamic or new tariffs, with existing debts, or paying for heat through a landlord's settlement face different timing |
| Market-power response | Bundeskartellamt under §§19–20 GWB (general abuse) and §29 GWB (energy-specific price abuse, burden on the supplier) | Operational; §29 expires end of 2027 | Proceedings take months to years and act after the fact. The 12th GWB amendment (Drucksache 21/7865, cabinet 15 July 2026, Bundesrat opinion 25 September 2026) would extend §29 to 2032. BDEW and VKU oppose the extension. Not yet enacted |
| Disconnection protection | §§41f–41g EnWG (December 2025 reform; §19 GasGVV now only refers to them): arrears of at least twice the monthly instalment and at least €100 after a reminder, four weeks' notice, eight working days' announcement, proportionality bar where there is concrete danger to life or limb. In Grundversorgung an interest-free repayment agreement must be offered, and the supplier may alert the local social-welfare office, after which disconnection waits at least eight working days | Operational | Delays disconnection but does not stop debt building. Since December 2025 the arrears rules apply to competitive contracts and Grundversorgung alike; the repayment agreement and the social-office alert apply in Grundversorgung |
| Help with a heating bill | SGB II and SGB XII: a heating-cost back payment counts as need in the month it falls due (BSG B 7 AS 21/22 R). Households not on benefits, including Wohngeld and Kinderzuschlag recipients, can qualify for that month alone | Funded entitlement, operational | Reactive: triggers only when a bill or higher instalment is due. The application must reach the Jobcenter in the month the bill is due. Since Grundsicherungsgeld replaced Bürgergeld on 1 July 2026, the provision that eased one-off claims (former §12(6) SGB II) is gone, and the waiting-period protection covers rent but not heating. Jobcenters may not cut a back payment without reasons and a prior cost-reduction notice |
| Housing allowance heating support | Wohngeld Heizkostenkomponente | Operational | Annual entitlement, decided in weeks to months. A bill now before the Bundestag (Drucksache 21/8284, cabinet 6 July 2026, first reading 8 October 2026) would halve the heating component and suspend indexation from 1 January 2027. Not yet enacted |
| Direct payment to all residents | Direktauszahlungsmechanismus: the Bundeszentralamt für Steuern is empowered as payout authority (§139e AO, Jahressteuergesetz 2024), using tax ID and bank details | Specified (channel); no payout law | Every payment needs its own statute. As of May 2026 the Bundeszentralamt für Steuern held bank details for 16.1 million tax IDs and lacked them for 69.9 million, and the channel cannot pay anyone without both. Income-related payment is not yet possible, and the government's position on further design was not settled. It has said targeted help may follow if groups are hit hard, but has announced none for gas |
| Price caps | Gas price brake (EWPBG) | Expired end of 2023 | A new cap needs a statute and EU state-aid clearance. In 2022 the sequence ran from an expert commission's proposals in October to a one-off December payment, then caps from March 2023. A precedent, not a legal minimum |
| Standing relief | Gas storage levy abolished 1 January 2026 (about €3 billion a year) | Operational | Lowers the base price for everyone; does not respond to a shock |
| Supply emergency | Notfallplan Gas, three stages (EU Regulation 2017/1938, §53a EnWG, EnSiG). Early-warning stage in force since 1 July 2025. In the emergency stage, declared by ordinance, the Bundesnetzagentur becomes federal load distributor | Operational | The one pre-authorized safe state in the system. Protected customers (households, social institutions, district heating serving households) have priority but no absolute guarantee. Storage-fill rules expire 31 March 2027 |
| Strategic gas reserve | Cabinet bill of 11 November 2026: 24 TWh held by Trading Hub Europe, built from 2027, ready for winter 2027/28, released by the Bundesnetzagentur only after an emergency declaration. Levy of 0.03–0.05 ct/kWh, about €4–7 a year per household | Specified (bill); not enacted | Not available this winter. Explicitly not an instrument against high prices |
| Fertilizer and food | No German instrument links a gas shock to nitrogen fertilizer or food prices. Trade measures (tariffs on Russian fertilizer since July 2025, CBAM) sit at EU level | None at national level | EU nitrogen fertilizer prices rose 40% between December 2025 and April 2026. Urea at Baltic ports reached €680/t in October 2026. SKW Piesteritz, Germany's largest ammonia and urea producer and largest gas consumer, raised output in April but throttled in earlier price spikes |

**What the baseline shows.** Germany has a fast, pre-authorized answer to a physical shortage and no pre-authorized answer to a price shock. Every household-level price-shock protection is reactive to a bill, ex post, or needs a new statute, and the one universal payment channel currently reaches fewer than one in five tax IDs.

## Case A: price triples, supply holds

**Scenario.** On day 0 the wholesale price triples and stays there for the whole window. Flows and storage withdrawals continue normally. No emergency stage is declared.

| Week | Baseline (German institutions) | GGF counterfactual (patched frameworks, acting only through German authorities) |
| --- | --- | --- |
| 0 | Price is visible the same day to the Bundesnetzagentur and the Markttransparenzstelle. Nothing is triggered: supply is fine, so the Notfallplan does not apply, and no rule maps price to relief | As specified, C&E v2.2 §7 would classify the event as a price shock, not a shortage, and a BHI threshold breach would open a review, not an emergency (CIS §13.1 does not apply). The one-to-two-day classification time is a design target: no German body has adopted the procedure or assigned an operator. Meta-Governance §5.1 allows an ordinary coordination convening without any declaration |
| 1 | Bundeskartellamt can open an inquiry on its own initiative under §§19, 29 GWB. Suppliers begin issuing price-change notices | GMEAIA-08 referral to the Bundeskartellamt: an evidence package on wholesale–retail spreads, with a specified referral clock of seven days. Recorded handoff state: `offered`, meaning sent to an authority with jurisdiction, not accepted or acted on in time. Risk of `capacity_limited` if several sector inquiries run at once. The referral adds evidence and a record, not speed: the decision clock is the authority's own |
| 2–4 | Notices run their one-month or six-week course. Households on dynamic or newly signed tariffs, and businesses on spot-linked contracts, feel the rise at once. Fertilizer producers face sharply higher input costs | C&E §6 asks for an incidence check before price rises and a non-disconnection rule. The first is met only for public levies (the gas reserve levy is tiny); the second is partly met by §§41f–41g EnWG, which are conditional, not absolute. AUBI §5.1.5 looks for a pre-authorized temporary support channel. Recorded handoff state: `constitutional_gap`. Readiness: the instrument is unconstituted, though a competent legislature exists and could enact it |
| 5–6 | Higher prices reach most direct customers once notices run out, depending on contract and billing date. Households already on benefits have rising instalments covered as current need; others can apply for SGB II or SGB XII help for the month a bill falls due. Disconnection protection starts once arrears build. Any general relief needs a statute; in 2022 that took about two months from proposals to the first payment, a precedent rather than a minimum | Same executable actions as the baseline. GGF adds a Household Energy Continuity Record (C&E Appendix E) that logs which handoffs were accepted and which duties no one holds. Gaian Trade's reserve is not triggered: there is no shortage, and price stabilization needs a separate mandate. This matches the German reserve, which is explicitly not for high prices |

**First executable protective action.** The same in both columns, but its timing depends on the household. Earliest legally possible: for households already on benefits, as soon as their instalment rises, since actual heating costs count as current need. Earliest for a direct customer not on benefits, on a standard contract: the month a higher bill or instalment falls due, typically week five or later. Expected processing time and protection actually received cannot be read from public sources. The Bundeskartellamt can act from day one, but nothing it does reaches a household within six weeks.

**Delay.** No collective relief reaches households inside the window in either column. The 2022 precedent suggests about two months from proposals to a first payment; that is history, not a legal minimum, and a pre-enacted instrument could be faster.

**Real-resource constraints.** Gas volume is not the constraint. The constraints are administrative: Jobcenter and Sozialamt caseload as claims arrive in the same months, and a direct-payment channel that lacks bank details for most tax IDs and cannot yet pay by income. Nitrogen fertilizer is a slower real constraint: the cost shows up in spring application decisions and in food prices months later, outside the window.

**Authority gaps.**

1. No instrument links a price trigger to household support. The payout channel exists on paper, each payment needs its own statute, and it lacks bank details for about 70 million tax IDs.
2. The energy-specific abuse rule (§29 GWB) expires at the end of 2027 unless the pending amendment passes.
3. The Wohngeld heating component would be halved from January 2027 if the pending bill passes.
4. The one-off heating claim is now harder: the easing provision is gone and the waiting-period protection excludes heating.
5. Fertilizer and food pass-through has no national owner; trade measures sit with the EU.

**Coordination burden.** At least six federal bodies (energy ministry, labour ministry, housing ministry, finance ministry with the Bundeszentralamt für Steuern, Bundesnetzagentur, Bundeskartellamt), the Länder, around 400 Jobcenters, municipal Wohngeld offices and Sozialämter, and the gas suppliers who issue the notices. No body is charged with seeing all of them at once. Meta-Governance §5.1 can convene them but has no command authority, which is correct.

**Case A result.** As specified, GGF would classify and route correctly and make the gaps visible, but it adds no executable protection in the window, and its response times are not demonstrated in Germany. The binding gap is a pre-constituted instrument that can reach people: trigger, delivery channel, coverage and ending rule. The host jurisdiction has to build it before the shock; GGF can only specify it.

## Case B: physical shortage

**Scenario.** On day 0 a major import route fails during a cold spell, with storage near 58%. Prices spike as well, so Case A's effects run underneath. The question is who gets gas and who decides.

| Days and weeks | Baseline (German institutions) | GGF counterfactual |
| --- | --- | --- |
| Days 0–3 | The energy ministry raises the Notfallplan to the alarm stage; the market is asked to rebalance. If that fails, the emergency stage is declared by ordinance and the Bundesnetzagentur becomes federal load distributor | C&E §7 classifies the event as a shortage. GMEAIA §3.8: an indicator may activate only a pre-authorized, reversible safe state. In Germany that safe state already exists: the Notfallplan. GGF recognizes it rather than duplicating it. CIS §13.1 makes the emergency time-bounded; C&E §7 requires an after-action review |
| Week 1 | The Bundesnetzagentur orders industrial curtailment, weighing each case. Protected customers have priority but no volume guarantee. EU solidarity under Regulation 2017/1938 is a last resort, for solidarity-protected customers only. The planned reserve is not available until winter 2027/28 | C&E §6 asks for an essential minimum per household. Germany offers protected-customer status, not a volume floor. Handoff state: `offered` for priority, `constitutional_gap` for the floor. GMEAIA-29 keeps curtailment ranking out of automated decision |
| Weeks 1–3 | Large gas users are curtailed. SKW Piesteritz, the largest gas consumer, is an obvious candidate, but its ammonia and urea feed fertilizer, diesel exhaust fluid for trucks, and other critical products. A 2023 Prognos study for the Bundesnetzagentur analysed gas use, downstream value chains and protection status by production sector to inform curtailment decisions. It works at sector level, so it cannot settle plant-level decisions alone, and it predates the current price situation | GGF does not supply a missing map. DRR Appendix G and the GMEAIA-59 handoff from C&E to DRR and Gaian Trade can check that the existing analysis is current, independently challenged, shared with the authorities that need it, and linked to actual curtailment decisions. Gaian Trade's reserve can release fertilizer or energy only through a constituting instrument; none exists for Germany or the EU. Recorded handoff state: `constitutional_gap` (reserve) |
| Weeks 3–6 | Curtailment continues or eases with weather and imports. Price effects reach households as in Case A. Fertilizer shortfalls start to matter for spring | Same actions. As specified, GGF adds the record trail, the time limit and the review, including whether curtailment orders drew on the downstream analysis |

**First executable protective action.** A curtailment order from the Bundesnetzagentur, within days of the emergency declaration. The same in both columns: it is the German pre-authorized safe state, and GGF correctly defers to it.

**Delay.** Hours to days after declaration. The declaration itself is a political decision; the law gives no automatic threshold.

**Real-resource constraints.** Here volume binds: storage at 58% rather than about 70%, no reserve until 2027/28, and storage-fill rules that lapse in March 2027. Fertilizer and diesel exhaust fluid are second-round constraints.

**Authority gaps.**

1. No per-household volume floor; protected status is a priority, not a guarantee.
2. A sector-level downstream analysis exists (2023), but its currency, granularity and use in individual curtailment decisions are not publicly documented.
3. No reserve this winter, and storage rules lapse before the reserve exists.

**Coordination burden.** Case A's list, plus Trading Hub Europe, transmission and distribution operators, the agriculture ministry, the European Commission and its Gas Coordination Group, and neighbouring states for solidarity. The burden is higher, but the lines of command are clearer, because the Notfallplan names who decides.

**Case B result.** Germany is stronger here than in Case A. GGF should not touch the decision chain. Its possible value is narrower than v0.1 claimed: keeping existing dependency evidence current and tied to decisions, and a household volume floor, both agreed before the shock.

## Comparison

| Output | Case A baseline | Case A with GGF | Case B baseline | Case B with GGF |
| --- | --- | --- | --- | --- |
| Pre-authorized safe state | None | None (nothing to recognize) | Notfallplan Gas | Notfallplan Gas, recognized, not duplicated |
| First executable protective action | Individual heating-cost claim when the bill falls due | Same | Curtailment order by the Bundesnetzagentur | Same |
| Delay | Week 5 or later for most direct customers; earlier for benefit recipients as instalments rise. Collective relief needs a statute (about two months in 2022, a precedent) | Same | Hours to days after a political declaration | Same, plus a time limit and a review |
| Binding constraint | Administrative: no payout law, claim-by-claim processing | Same | Physical: storage, no reserve | Same |
| What GGF adds | — | Specified only: classification, GMEAIA-08 evidence package, a record of duties no one holds. No German operator assigned | — | Specified only: existing dependency evidence linked to decisions; household volume floor; time limit; after-action review |
| Coordination burden | Six federal bodies, Länder, about 400 Jobcenters, municipal offices, suppliers | Same bodies, one convening forum without command | Case A plus grid operators, Trading Hub Europe, EU bodies, neighbours | Same, with clearer lines |

**GGF provisions graded by their German host.** Every patched provision acts through a German counterpart. Readiness is the counterpart's, since GGF holds no authority in Germany. The recorded handoff state is kept separate: `offered` means sent to a body that can accept, not accepted or acted on in time.

| GGF provision | German host | Host readiness (legal and operational) | Recorded handoff state |
| --- | --- | --- | --- |
| C&E §7 classification | Energy ministry, Bundesnetzagentur | Operational | `offered` |
| GMEAIA-08 market-power referral | Bundeskartellamt | Operational; §29 GWB lapses end of 2027 unless extended | `offered`, risk of `capacity_limited` |
| C&E §6 non-disconnection | §§41f–41g EnWG | Operational, conditional | `offered` (partial) |
| C&E §6 essential minimum | Protected-customer status | Operational as priority, no volume floor | `constitutional_gap` (floor) |
| AUBI §5.1.5 pre-authorized support | Direktauszahlungsmechanismus | Channel specified; no payout law; bank details for 16.1 of about 86 million tax IDs | `constitutional_gap` |
| Gaian Trade reserve | Gas reserve bill | Specified; ready 2027/28 at the earliest | `constitutional_gap` this winter |
| DRR Appendix G cascade | Bundesnetzagentur curtailment | Operational; 2023 sector-level value-chain analysis exists | Not assessed: use of the analysis in decisions is undocumented |
| Meta-Governance §5.1 convening | No standing cross-ministry counterpart | Ad hoc | Depends on invitation |

**Falsification check (G20).** AUBI §5.1.5 claims that pre-authorization shortens the delay to support. S1 cannot confirm or refute this for Germany, because nothing is pre-authorized. The 2022 precedent points the same way, though: once the statute existed, the December payment reached households through supplier bills within weeks. The delay was in legislating, not in paying. A test of the claim would need a host instrument enacted before the shock.

## Implications for the revision plan

S1 answers the "decide after S1" items in the shock trace's revision plan. None of them needs a new GGF authority or record type.

1. **DRR clarification (item 4): revise before adoption.** Germany already has a regulator-commissioned value-chain analysis, so the patch should not add a parallel map. It should require that existing dependency evidence for the energy → ammonia and urea → fertilizer and diesel exhaust fluid → logistics and food chain is kept current, independently challenged, shared, and linked to the body that decides curtailment. First test what is actually missing.
2. **Stabilization interface (item 5): proceed as a host-readiness profile, not an interface with powers of its own.** In Case A a GGF stabilization interface would have found no host instrument to call. The profile asks six questions, using existing GMEAIA fields rather than a new record type: authority (who can lawfully authorize and execute), activation (what triggers it and who verifies), delivery (through which channel help reaches people), coverage and capacity (who can actually be reached, at what scale), timing (can protection arrive before material harm), and termination and correction (how it expires, reverses or gives remedy). Reference it from C&E §7 and AUBI §5.1.5. Completing a lawful procedure is not proof of the intended outcome. Candidate host instruments from the German case: a pre-legislated supplier-bill credit (the 2022 route), an income-linked payment once the tax-ID channel can reach people, and a simplified one-month heating claim.
3. **Dependency-review template (item 6): proceed.** S1 used and validated these fields: function, host institution, legal basis, state grade, activation trigger, minimum lag, coverage, capacity limit, sunset or pending change, recorded handoff state. The sunset field alone caught four dated changes within fourteen months: Wohngeld heating component (1 January 2027), storage-fill rules (31 March 2027), §29 GWB (end of 2027) and reserve readiness (winter 2027/28).
4. **DER (item 7): adopt as a rubric, not a framework.** It should measure reach and material outcomes, not only whether instruments exist. Dimensions: first executable protective action, the four timing measures, coverage, binding constraint, authority gaps, coordination burden and ownership grade. Apply the same rubric to Brazil (external validity) and Sweden (transferability).

**What S1 does not show.** It does not show that GGF improves the outcome: GGF response times are specifications, not German capabilities. It does not test fiscal capacity, distributional outcomes or the Hearts firewall question, which stays on the separate *Preventing 1933* track. It reads German law at its November 2026 state; three pending bills could change the grades within months. With these corrections S1 closes. The next test is Brazil, with no new GGF mechanisms added before then.

## Sources

**Legal texts**

- [§41 EnWG](https://www.gesetze-im-internet.de/enwg_2005/__41.html), [§41f EnWG](https://www.gesetze-im-internet.de/enwg_2005/__41f.html), [§41g EnWG](https://www.gesetze-im-internet.de/enwg_2005/__41g.html), [§19 GasGVV](https://www.gesetze-im-internet.de/gasgvv/__19.html), [§29 GWB](https://www.gesetze-im-internet.de/gwb/__29.html), [§47a GWB](https://www.gesetze-im-internet.de/gwb/__47a.html), [§139e AO](https://www.gesetze-im-internet.de/ao_1977/__139e.html)

**Pending legislation**

- [12th GWB amendment: Bundesrat opinion and government reply, Drucksache 21/8302](https://dserver.bundestag.de/btd/21/083/2108302.pdf)
- [BMWE: the 12th GWB amendment (cabinet 15 July 2026)](https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Schlaglichter-der-Wirtschaftspolitik/2026/09/01-die12-gwb-novelle.html)
- [BDEW opinion opposing the §29 GWB extension](https://www.bdew.de/media/documents/BDEW_Stellungnahme_GWB_12.Novelle_ohne_AP.pdf)
- [Wohngeld bill, Drucksache 21/8284](https://dserver.bundestag.de/btd/21/082/2108284.pdf)
- Gas reserve bill, cabinet decision of 11 November 2026 (S&P Global and dpa reports; federal government page dated 16 November 2026)

**Relief and payment channels**

- [Federal Government: abolition of the gas storage levy](https://www.bundesregierung.de/breg-de/aktuelles/abschaffung-gasspeicherumlage-2375074)
- [BMF: the direct payment mechanism](https://www.bundesfinanzministerium.de/Monatsberichte/Ausgabe/2025/04/Inhalte/Kapitel-2b-Fokus/direktauszahlungsmechanismus-fertiggestellt.html)
- [Government answer on the direct payment mechanism, Drucksache 21/6193](https://dserver.bundestag.de/btd/21/061/2106193.pdf)
- [Stuttgarter Zeitung: no gas or heating oil relief announced](https://www.stuttgarter-zeitung.de/wirtschaft/hohe-preise-bei-gas-und-heizoel-wird-es-staatliche-entlastungen-geben-79494574.html)
- [Verbraucherzentrale: social benefits for high heating bills](https://www.verbraucherzentrale.de/wissen/geld-versicherungen/kredit-schulden-insolvenz/unterstuetzung-bei-hohen-heizkosten-ihr-recht-auf-sozialleistungen-77998)
- [gegen-hartz: heating back payments under Grundsicherungsgeld](https://www.gegen-hartz.de/urteile/grundsicherungsgeld-jobcenter-muss-heizkostennachzahlung-uebernehmen-und-darf-nicht-pauschal-ablehnen)
- [2022 gas price commission proposals](https://www.cio.de/article/3697464/die-vorschlaege-der-gaspreise-kommission.html)
- [Bundestag hib 450/2026: direct payment mechanism still in progress (bank-detail coverage)](https://www.bundestag.de/presse/hib/kurzmeldungen-1183566)
- [Bundesnetzagentur: disconnection rules since December 2025](https://www.bundesnetzagentur.de/DE/Vportal/Energie/RechnungenSperrungen/Sperrungen-table.html)

**Supply, storage and fertilizer**

- Bundesnetzagentur gas situation report of 13 November 2026 and storage data; Notfallplan Gas (EU Regulation 2017/1938, §53a EnWG, EnSiG)
- [Prognos for the Bundesnetzagentur: gas consumption of production sectors, value-chain analysis (2023)](https://www.prognos.com/en/projekt/gas-consumption-production-sectors)
- [Bundesrat Drucksache 363/26 on fertilizer prices](https://dserver.bundestag.de/brd/2026/0363-26.pdf)
- [S&P Global: SKW raises fertilizer production despite gas price rise (April 2026)](https://www.spglobal.com/energy/en/news-research/latest-news/lng/042126-interview-germanys-skw-raises-fertilizer-production-despite-gas-price-rise)
- [Nordkurier: why SKW Piesteritz matters for supply](https://www.nordkurier.de/regional/brandenburg/warum-skw-piesteritz-fuer-europas-versorgung-so-wichtig-ist-4727630)
- [Ammonia explainer with October 2026 gas and urea prices](https://www.drweb.de/ammoniak/) (secondary source; figures should be checked against market data)

**GGF texts:** Climate & Energy Governance v2.2, AUBI v2.7.1, Gaian Trade v0.9.3, GMEAIA v0.2.2, CIS v0.2.10, Meta-Governance v1.6.3, Disaster Risk Reduction (Appendix G), and the shock trace this test follows.
