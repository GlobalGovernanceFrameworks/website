# S3 authority-and-action test: electricity shock in Sweden

Nov 23, 2026 · @Björn Kenneth Holmström

*v0.2, 23 November 2026: reconciled after an external review. The högkostnadsskydd is regraded: politically activated and funded, but its implementing support ordinance was not found in force on 23 November. Adds the contracted 330 MW strategic reserve for winter 2026/27; resolves the VAT, fixed-contract and rotation questions; states the full-month price assumption; distinguishes Styrel planning, emergency disconnection and restoration; records the phased legal transition. Frameworks stay frozen. S3 closes at this version.*

## Summary

S3 runs an electricity shock through Swedish institutions as they stand on 23 November 2026, without GGF and then with the frozen frameworks (Climate & Energy v2.2, AUBI v2.7.1, Gaian Trade v0.9.3, GMEAIA v0.2.2). Electricity is the primary system; district heating is treated as a separate pathway.

- **Case A (wholesale price triples, supply adequate): Sweden has a designed, funded, automatic price-shock scheme, not yet fully implemented.** The högkostnadsskydd pays households the part of the monthly spot price (excluding VAT) above 1.50 kr/kWh on 90% of their consumption, with no application. The government activated it for SE4 for October 2026, but said it still had to adopt a support ordinance; S3 found none in force on 23 November. The scheme then pays months after the bills (October to December support in spring 2027), ends on 31 December 2026 with nothing decided for 2027, covers only households with their own grid contract, and follows consumption rather than need, including fixed-price customers who are not exposed.
- **Case B (genuine scarcity): Sweden has an operational curtailment regime with a contracted reserve.** Before any disconnection, Svenska kraftnät can call on a 330 MW strategic reserve contracted for 16 November 2026 to 15 March 2027. If that is not enough, it can order manual load disconnection, executed within 15 minutes, on an operational rather than political trigger. Styrel priorities are followed as far as the deadline allows, with priority users restored afterwards if necessary. Ordinary households are the lowest priority, protection is by power line rather than household, and the procedure has never been used.
- **District heating** is a separate risk: a local monopoly without price regulation, with procedural protection but no shock relief, and only indirect exposure to the electricity cases.
- **A third configuration.** Germany protects households in shortage but has no price instrument; Brazil protects its target group against price in kind but has no household shortage rule; Sweden has both regimes designed in advance, but its price relief still awaits an implementing ordinance, pays late and ends before a winter shock would, and in shortage households come last.
- **For the synthesis:** pre-authorization is neither necessary (Brazil) nor sufficient (Sweden); political activation is not the same as implementing authority; GMEAIA-08 duplicates existing routes in all three countries; protection channels repeatedly miss households whose energy comes bundled in rent; and in all three studies independent review found existing capabilities the first draft missed.

## Scope, method and discovery log

- **Baselines for comparison:** S1 Germany v0.2 and S2 Brazil v0.2.
- **Frozen:** Climate & Energy v2.2, AUBI v2.7.1, Gaian Trade v0.9.3, GMEAIA v0.2.2. No new GGF authority, record type or revision.
- **Window:** six weeks from 23 November 2026. It crosses a phased legal transition: the new Elmarknadslag and Elsystemförordning take effect on 1 January 2027, except the supplier-of-last-resort provisions replacing default contracts, which start on 1 July 2027.
- **Cases:** A, wholesale prices triple in SE3 and SE4 with adequate supply, traced to household bills through contracts, network fees and taxes. Because the support trigger uses the whole calendar month, Case A assumes the tripled level holds for all of November and December. B, genuine scarcity requiring curtailment, distinguished from a local network failure. District heating is a distinct pathway, not assumed to share either shock.
- **Outputs:** legal readiness, demonstrated operational capacity, the four timing measures, protection actually received where data exists, coordination burden, the six-question readiness profile with the S2 distinctions (entitlement, redemption and physical access; intermediary incentives; orderly sunset and lapse).
- **GGF counterfactual:** the same Swedish institutions with the frozen GGF procedures; no GGF response time or adoption assumed.

**Discovery before absence.** Searched before classifying anything as missing:

| Searched for | Found |
| --- | --- |
| Price-shock payment mechanisms | Högkostnadsskydd 2026 (activated for October in SE4; implementing ordinance still to be adopted); elstöd January–February 2026 under Förordning 2026:502, paid from June |
| Disconnection rules and links to social services | Electricity Act ch. 11 with mandatory notice to social services; the same in the district heating law |
| Shortage contingency plans | MFK procedure, Styrel planning, Energimyndigheten's risk-preparedness plan, strategic reserve ordinance; the contracted 330 MW reserve for 2026/27 was missed in the first draft and added in v0.2 |
| Monitoring systems and datasets | Ei weekly market reports and REMIT surveillance; SCB contract-type statistics; Svenska kraftnät power-balance reports; Ei outage and complaint statistics |
| Competition routes | Konkurrensverket, Ei (REMIT), Finansinspektionen cooperation |
| Not found | An adopted support ordinance for the October–December högkostnadsskydd; a published national count of electricity disconnections or social-services notices; any district-heating shock relief |

## Swedish baseline (November 2026)

Same grading as S1 and S2: **specified**, **enacted**, **funded**, **operational**, with demonstrated operational capacity noted separately.

**Live context.** Case A is again close to reality. October 2026 monthly averages (spot, excluding VAT) were 82.0 öre/kWh in SE3 and 156.7 öre in SE4, which crossed the support threshold in SE4. With several reactors offline, a price aggregator reported first-half November averages of about 186 öre in SE3 and 299 öre in SE4 (VAT basis not stated). In November 2025 the averages were about 63 and 73 EUR/MWh, roughly 70 and 81 öre excluding VAT. Svenska kraftnät's winter outlook (16 October) rated the risk of physical shortage as low but warned of high prices.

| Function | Institution and legal basis | State | Lag and limits |
| --- | --- | --- | --- |
| Detect price stress | Nord Pool prices by price area; Ei's weekly market report; Ei market surveillance under REMIT, with Finansinspektionen for derivatives | Operational | Same-day visibility by price area. Monitoring only |
| Retail pass-through | Contract mix (SCB, March 2026): monthly variable 62.8%, hourly or quarter-hourly 12.5%, default (*anvisat*) 8.2%, fixed 1–3 years 7.3%, other 9.1% | Operational | Hourly customers pay at once; monthly-variable customers see the month's average on the next bill, about four to eight weeks later; fixed contracts are shielded until renewal. Network fees and energy tax do not move with the spot price |
| Automatic price-shock support | **Högkostnadsskydd för el** (announced in the 2026 budget bill): if a price area's monthly average spot price exceeds 1.50 kr/kWh excluding VAT, households there receive the part above 1.50 kr on 90% of consumed kWh. No application; Försäkringskassan pays using network companies' metering data. Each activation needs a government support ordinance | Policy decided and funded; trigger met for SE4 (October); implementing ordinance not found in force on 23 November; payment not yet made; payment channel demonstrated in earlier rounds | Activated on 30 October for SE4 (October average about 1.57 kr, support about 7 öre/kWh); the government said it still had to adopt the support ordinance. October–December support is planned as one payment in spring 2027. Covers November 2025 to December 2026; no decision for 2027. Eligibility: households with their own grid contract, not limited by contract type; not district heating or gas |
| One-off support | Elstöd for January–February 2026 consumption (26 öre/kWh in SE3, 29 öre in SE4), paid automatically from June 2026 | Delivered | Demonstrates the payment channel: metering data to Försäkringskassan, payment to registered accounts, about four months after the consumption |
| Disconnection protection | Electricity Act ch. 11 until 31 December 2026, then Elsystemförordning ch. 14 under the Elmarknadslag: reminder, three weeks to pay after notice, mandatory notice to the municipal social welfare board; no disconnection if the board takes over payment. Default contracts continue until the supplier-of-last-resort system starts on 1 July 2027 | Operational | Links every pending disconnection to social services by law. Delays harm but does not prevent debt |
| Help with bills | Ekonomiskt bistånd under the Social Services Act (2025:400): household electricity as a reasonable cost; elstöd counts as income | Funded entitlement, operational | Means-tested and applied for; municipal practice varies |
| Market-power response | Konkurrensverket (Competition Act); Ei (REMIT, wholesale manipulation); Finansinspektionen (derivatives) | Operational | Konkurrensverket opened a review of network-fee increases in March 2026. Wholesale cases are ex post |
| Shortage preparedness | Svenska kraftnät orders manual load disconnection (MFK); network companies must execute within 15 minutes, at the network level that allows the most regard to Styrel priorities, and restore higher-priority users as soon as possible if the deadline forced broader cuts. Svenska kraftnät's rules allow rotation between users, decided locally. Styrel planning ranks lines, coordinated by Energimyndigheten with county boards and municipalities (Förordning 2011:931, moving into the Elsystemförordning on 1 January 2027) | Operational; MFK never yet ordered | Decisions cannot be appealed. Styrel's eight priority classes put "other users", which includes ordinary households, last |
| Strategic reserve | Förordning (2025:835): Svenska kraftnät procures an EU-approved strategic reserve. For 2026/27: 330 MW from Karlshamnsverket block 2, financed by a fee on SE3 and SE4 consumption on weekday daytime hours | Contracted and available from 16 November 2026 to 15 March 2027 | Below Svenska kraftnät's estimated need of 750–1,100 MW for 2026/27. Not activated for Sweden's own needs since 2013 |
| District heating | Fjärrvärmelag (2008:263): no price regulation, right to negotiate, mediation by Fjärrvärmenämnden, Ei supervision; consumer disconnection requires a reminder and notice to social services | Operational | See the district heating section |

**What the baseline shows.** Sweden has what neither Germany nor Brazil had for the whole population: a designed, funded, threshold-triggered household payment for a price shock, already activated this autumn. But activation is political and each round needs an implementing ordinance, which S3 did not find in force, and the payment comes months after the bill, ends on 31 December 2026, reaches only households with their own grid contract and follows consumption rather than need. For shortage, it has a contracted reserve and an operational load-disconnection procedure with a priority plan in which ordinary households come last.

## Case A: wholesale electricity price triples, supply adequate

**Scenario.** The spot price in SE3 and SE4 runs at about three times its level a year earlier, roughly 210 and 245 öre/kWh excluding VAT, for the whole of November and December, so both months cross the 1.50 kr threshold in both areas. The six-week window starts on 23 November. Supply is adequate and no shortage measures are taken. SE1 and SE2 are not assumed to move.

| Week | Baseline (Swedish institutions) | GGF counterfactual (frozen frameworks, acting only through Swedish authorities) |
| --- | --- | --- |
| 0 | Prices visible the same day. The scheme's trigger is a monthly average, so nothing happens until the month closes. Even then, payment needs the government's support ordinance, which it said on 30 October it still had to adopt | As specified, C&E §7 classifies a price shock. AUBI §5.1.5 finds the closest host match in all three studies: a pre-published threshold, funding and a defined end. Its own condition, that support be constituted in advance, is only partly met: the legal instrument follows the trigger. Classification speed remains a design target |
| 1 | Hourly-contract households (12.5%) pay the new price at once. Ei watches wholesale behaviour under REMIT; Konkurrensverket can act under competition law | GMEAIA-08 referral to Konkurrensverket or Ei. Recorded handoff state: `offered`. Both authorities already have the duty and data; the referral adds a record, not a pathway |
| 2–4 | Monthly-variable households (62.8%) accrue the higher price; fixed-price households are shielded but are still eligible for support. On 1 December November's full-month average is known and the trigger is met, but entitlement depends on the support ordinance, and payment is planned for spring 2027 | The readiness profile separates five things: political activation (done), budget authority (done), implementing legal instrument (pending), administrative preparation (capacity demonstrated in earlier rounds) and payment (months away). It flags implementation authority and timing |
| 5–6 | November bills arrive in early December, due around the turn of the year. A household that cannot pay gets a reminder, three weeks' notice and a mandatory notice to social services before any disconnection, so cut-off is unlikely inside the window. Ekonomiskt bistånd requires an application. On 31 December the högkostnadsskydd ends; with no 2027 decision, a shock running into January has no automatic support | Termination and correction: an orderly sunset that becomes a cliff if it falls mid-shock. AUBI §5.1.5's ending rule assumes the end follows the shock, not the calendar |

**Illustration (S3's arithmetic, excluding VAT).** A house with direct electric heating using 2,000 kWh in December in SE4 at 245 öre/kWh pays about 4,900 kr for the electricity itself before VAT. Support of 0.95 kr on 90% of that consumption is about 1,700 kr, planned for payment in spring 2027.

**First executable protective action.** Legal readiness: the policy, threshold and funding exist, but the implementing ordinance for this round was not found in force on 23 November. Timing by measure: earliest legally possible is when the ordinance is adopted, applying back to the triggered months; earliest for a typical household is the planned spring 2027 payment, three to five months after the bills; processing capacity is demonstrated (the January–February support was paid from June 2026, most before midsummer). Inside the window, the protection actually received is procedural: disconnection safeguards and, on application, social assistance.

**Delay.** None in political activation; an implementing ordinance still to come; months in payment.

**Real-resource constraints.** None physical. Fiscal cost scales with price and consumption.

**Authority gaps and limits.**

1. Implementation and timing: each activation needs a support ordinance, not found in force on 23 November, and there is no bridge between the bill and the payment.
2. Term: the instrument ends on 31 December 2026 and nothing is decided for 2027.
3. Coverage: only households with their own grid contract; households whose electricity is included in the rent receive nothing directly.
4. Targeting: support follows consumption, not need, and eligibility is not limited by contract type, so fixed-price households that are not exposed also receive it.
5. Threshold: support starts at 1.50 kr/kWh, so moderate shocks are only partly covered.

**Coordination burden.** Government Offices, Försäkringskassan, all network companies (metering data), electricity suppliers, Ei, Konkurrensverket, and social services in 290 municipalities. The payment chain is largely automated, so the burden falls on design decisions, not on coordination during the shock.

**Case A result.** Sweden is a third configuration: the protection is designed in advance, funded, automatic in calculation and backed by demonstrated delivery capacity, but each round needs an implementing ordinance after the trigger, payment comes months after the bill, and the scheme ends before a winter shock would. The binding questions are implementation, timing and termination, not political authority.

## Case B: genuine electricity scarcity

**Scenario.** During a cold, windless spell with several reactors offline and limited imports, available capacity in SE3 and SE4 falls short of demand at peak hours on several days. Market measures and any available reserve are exhausted, and load must be cut. This is distinct from a **local network failure** (a storm felling lines), which network companies handle under their own outage duties and compensation rules, without Svenska kraftnät ordering anything.

| Days and weeks | Baseline (Swedish institutions) | GGF counterfactual |
| --- | --- | --- |
| Days 0–3 | Sequence: (1) balancing, imports and appeals to save power; (2) the contracted 330 MW strategic reserve at Karlshamnsverket, if its activation conditions are met; (3) if balance still cannot be held, manual load disconnection (MFK) ordered from designated network companies, which must execute within 15 minutes | C&E §7 classifies a shortage. GMEAIA §3.8: MFK with Styrel is a pre-authorized, reversible safe state, so GGF recognizes it. Unlike Germany, the trigger is an operational decision by the system operator, not a political declaration |
| Week 1 | Three steps, not one guarantee. Priority planning: Styrel's eight classes put "other users", including ordinary households, last, and rank power lines rather than homes. Emergency disconnection: within the 15-minute deadline, network companies cut at the level that allows the most regard to that ranking, but may have to cut more broadly. Restoration: priority users are reconnected as soon as possible. Svenska kraftnät's rules allow rotation between users, decided locally and not guaranteed. Households with home medical equipment depend on municipal and regional planning. MFK decisions cannot be appealed | C&E §6.1 and §6.3 name households dependent on powered medical devices. Styrel offers line-level priority, not a household floor. Recorded handoff state: `offered` for line-level priority, `constitutional_gap` for individual protection. GMEAIA-29 is met: Styrel rankings are made by people in advance |
| Weeks 1–6 | Scarcity pricing pushes the monthly average far above 1.50 kr/kWh, so Case A's automatic support triggers too, paid in spring 2027. The Styrel legal basis moves from Förordning 2011:931 into the Elsystemförordning on 1 January 2027 | As specified, GGF adds the record trail, time limit and after-action review, including who was disconnected and for how long |

**First executable protective action.** Before any cut, activation of the contracted 330 MW reserve. Then an MFK order, within minutes of Svenska kraftnät's decision and executed within 15 minutes, with Styrel priority applied as far as the deadline allows and restoration of priority users afterwards. MFK has never been ordered in practice, so the procedure is legally and organizationally ready but unexercised at scale.

**Delay.** Minutes, on an operational trigger. This is faster than Germany's politically declared emergency stage.

**Real-resource constraints.** Physical capacity and import availability. The contracted reserve is 330 MW, below Svenska kraftnät's estimated need of 750–1,100 MW, so it narrows but does not remove the risk in severe scarcity.

**Authority gaps and limits.**

1. Ordinary households are the lowest Styrel priority; there is no household floor.
2. Line-level ranking cannot protect individual homes with medical dependency.
3. The 330 MW reserve is available from 16 November but smaller than the estimated need.
4. The legal basis for Styrel and disconnection rules moves into the Elsystemförordning on 1 January 2027, inside the window; S3 did not check the detailed continuity of each provision.

**Coordination burden.** Svenska kraftnät, all network companies, Energimyndigheten, county administrative boards, municipalities and regions, and the civil-defence agency. Roles are pre-assigned through Styrel planning, so coordination happens before the shock.

**Case B result.** Sweden resembles Germany more than Brazil: a contracted reserve followed by an operational, pre-authorized curtailment regime. It differs in two ways: the trigger is operational rather than political, and households are not a protected group. Styrel is a planning method that network companies follow as far as emergency conditions allow, not an enforceable guarantee of supply.

## District heating: a distinct household pathway

District heating is Sweden's most common form of heating, but it is not automatically hit by either electricity case. It is a local monopoly with its own fuels (mostly biomass and waste, partly electricity in boilers and heat pumps), its own pricing and its own law.

- **Pricing.** The Fjärrvärmelag (2008:263) sets no price regulation. Customers have a right to negotiate and can seek mediation from Fjärrvärmenämnden; the industry's voluntary *Prisdialogen* adds a price-change process. Average price rises were about 9.4–9.9% in 2025 (Ei).
- **Supervision.** Ei supervises the law and has acted on information failures: in 2026 it ordered one company to stop applying its 2026 price increases where customer information did not meet the law's requirements. Ei proposed stronger customer protection in December 2025 (Ei R2025:16); consultation responses were split, with Konkurrensverket noting the companies' large pricing room once customers are connected.
- **Household exposure.** Many households receive district heating through a landlord or housing cooperative, so price changes reach them through rent or fees, usually at the next annual adjustment. Owners of houses with their own connection face the tariff directly.
- **Disconnection.** A consumer may be disconnected for non-payment only after a reminder and a notice to the municipal social welfare board, mirroring the electricity rules.
- **Shock relief.** The högkostnadsskydd covers electricity only; nothing comparable exists for district heating.
- **Interaction with the electricity cases.** In Case A, district-heating costs rise only to the extent a network relies on electric boilers or heat pumps, and that reaches households with a lag. In Case B, district-heating plants and pumps depend on electricity and on their own Styrel classification, while combined heat and power plants can add electricity.

**Result.** District heating has procedural protection (negotiation, mediation, supervision, disconnection safeguards) but no automatic shock relief and no price control. Its exposure to the electricity shocks is indirect and delayed, so treating it as part of the same shock would overstate the harm in Case A and miss its own risk: unregulated price rises by a monopoly supplier.

## Readiness profile across the three countries

**Price shock: the main household instrument**

| Question | Germany (gas) | Brazil (LPG) | Sweden (electricity) |
| --- | --- | --- | --- |
| **Authority** | None for collective relief; a statute is needed | Gás do Povo in statute; MP power | Högkostnadsskydd announced in the 2026 budget bill; each round needs a support ordinance (pending for October–December) |
| **Activation** | No trigger | Automatic for voucher holders; retailer price update discretionary | Monthly average above 1.50 kr/kWh excluding VAT in a price area, then political activation |
| **Delivery** | Claim by claim; payment channel has no payout law | Vouchers at about 25,000 active retailers; 79% redeemed (secondary-verified) | Försäkringskassan, from network companies' metering data; demonstrated in 2023 and 2026 |
| **Coverage and capacity** | Benefit recipients and claimants; bank details for 16.1 of 86 million tax IDs | About 15 million low-income families; intermediary incentives untested | All households with their own grid contract; by consumption, not need |
| **Timing** | Week 5 or later for claimants | Day 0 for voucher holders | In law day 0; paid three to five months after the bill |
| **Termination and correction** | Not applicable | Extension to 2031 rests on MP 1.400 | Ends 31 December 2026; no 2027 decision |

**Shortage: the allocation regime**

| Question | Germany (gas) | Brazil (LPG) | Sweden (electricity) |
| --- | --- | --- | --- |
| **Authority** | Notfallplan Gas; Bundesnetzagentur | MME and ANP supply duties; no household-allocation rule identified | Contracted 330 MW reserve, then Svenska kraftnät orders MFK; Styrel |
| **Activation** | Political declaration | None pre-built | Operational decision by the system operator |
| **Delivery** | Curtailment through grid operators | Retailers, if stock exists | Network companies within 15 minutes |
| **Coverage and capacity** | Households protected customers, no volume floor | First come, first served | Households lowest priority; line-level, not individual; Styrel applied as far as the 15-minute deadline allows, with restoration afterwards |
| **Timing** | Days after declaration | Political | Minutes after decision; never exercised |
| **Termination and correction** | Declaration lifted | Not applicable | Order lifted; legal basis moves on 1 January 2027 |

**What the profile shows.** Three configurations, not a spectrum:

- **Germany:** shortage regime protects households; price shock needs new law.
- **Brazil:** price protection reaches the target group immediately in kind; shortage handled through general supply duties and emergency law.
- **Sweden:** both regimes are designed in advance. Price relief awaits an implementing ordinance, is paid late, untargeted and ends with the calendar year; in shortage, a contracted reserve comes first and households are protected last.

No country scores well on every link. The break points differ: Germany, authorization and reach; Brazil, delivery-channel reliability and physical access; Sweden, implementation, payment timing, expiry and prioritization.

## Findings preserved for the synthesis

The frameworks stay frozen. Nothing below is applied now.

**Counterexamples**

1. **Pre-authorization is neither necessary nor sufficient.** Brazil shows rapid lawful authorization (MPs) can substitute for it; Sweden shows a scheme designed and funded in advance can still need an implementing instrument after the trigger and deliver months late. The empirical test is timely, effective protection, whatever the route.
2. **Household priority in shortage varies.** Germany protects households; Sweden ranks them last; Brazil has no rule. C&E §6.1's essential minimum is therefore a protection objective, not something any of the three hosts guarantees in volume.

**Redundancies (existing capability makes a GGF addition unnecessary)**

1. **GMEAIA-08** duplicates existing routes for the third time: Konkurrensverket, Ei under REMIT, and Finansinspektionen already hold the duty and the data.
2. **AUBI §5.1.5** describes an instrument Sweden already has. Its value there is as a conformance checklist, not as an addition.
3. **C&E §6.3**'s link from disconnection to social support is already law in Sweden, for both electricity and district heating.

**Candidate refinements to the readiness profile**

1. **Timing** should measure when protection is paid relative to when the bill falls due, not only when the right arises.
2. **Termination and correction** should test whether the end date follows the shock or the calendar.
3. **Coverage and capacity** should test targeting (by need or by consumption) and whether the channel reaches households whose energy is bundled in rent. This gap recurs: German heating costs passed through landlords, Swedish electricity included in rent, district heating via landlords.
4. **Authority** should separate political activation, budget authority, the implementing legal instrument, administrative preparation and actual payment. Sweden had the first two and the fourth, but not the third, on 23 November.

**Uncertainties to resolve**

- Open: whether and when the support ordinance for October–December is adopted, and whether it changes the announced design. (Resolved: the threshold applies to the spot price excluding VAT.)
- Resolved: eligibility is not limited by contract type, so fixed-price customers are included under the announced design.
- Partly resolved: Svenska kraftnät's rules allow rotation, decided locally and not guaranteed. Open: how households with home medical equipment are identified.
- Resolved: a 330 MW reserve is contracted from 16 November 2026 to 15 March 2027. Open: whether it suffices in severe scarcity.
- Partly resolved: the transition is phased (most of the new law on 1 January 2027, supplier-of-last-resort provisions on 1 July 2027). Open: the detailed continuity of disconnection and Styrel provisions.
- National data: S3 found no published count of electricity disconnections or social-services notices. Ei publishes outage and complaint statistics, and SCB publishes contract-type data.

**Carried forward from S2:** the Brazilian dashboard figures remain secondary-verified.

**Discovery record.** In all three studies independent review found existing capability the first draft missed: Germany's value-chain study, Brazil's redemption dashboard and service plans, Sweden's contracted reserve. For the synthesis, this bears on minimum sufficient coordination: a new governance interface should first establish what existing institutions already do, then show that its added coordination is worth the burden.

**What S3 does not show.** It does not show that GGF improves outcomes; GGF response times remain specifications. It does not measure how many households actually fell into arrears or were disconnected.

## Sources

**Price-shock support**

- [Government: Q&A on the högkostnadsskydd för el](https://www.regeringen.se/regeringens-politik/energi/fragor-och-svar-om-hogkostnadsskyddet-for-el/)
- [Government: press slides, 3 November 2026](https://www.regeringen.se/contentassets/e505fd0dfd63491d90b8ac210629a0d8/presentationsbilder-fran-presstraff-den-3-november-2026-om-hogkostnadsskyddets-utformning/)
- [Government: Q&A on the temporary electricity and gas support](https://regeringen.se/regeringens-politik/energi/fragor-och-svar-om-det-tillfalliga-el--och-gasstodet/)
- [Draft ordinance on elstöd for January–February 2026](https://www.regeringen.se/contentassets/b2dbc14e6d494812a61853791b30c546/utkast-till-forordning-om-elstod-till-konsumenter-for-januarifebruari-2026.pdf)
- [Government press release: högkostnadsskydd activated for SE4 (30 October 2026)](https://www.regeringen.se/pressmeddelanden/2026/10/hogkostnadsskyddet-aktiveras-for-elomrade-4/)
- [Förordning (2026:502) on elstöd for January–February 2026](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/forordning-2026502-om-elstod-till-konsumenter_sfs-2026-502/)
- [hurbra.se: October averages by price area and support details](https://hurbra.se/elstod-2026-hogkostnadsskydd/)

**Prices and contracts**

- [hurbra.se: spot prices 1–14 November 2026 by price area](https://hurbra.se/?p=49377)
- [boio.se: November 2026 forwards and November 2025 spot prices](https://boio.se/el/elpris-historik/2026/november)
- [SCB: contract types by month](https://www.statistikdatabasen.scb.se/sq/165609)

**Shortage and system adequacy**

- [Svenska kraftnät: power-balance report, 16 October 2026](https://via.tt.se/pressmeddelande/4597180/kraftbalansrapporten-lag-risk-for-effektbrist-i-vinter-men-elen-kan-bli-dyr?lang=sv)
- [Svenska kraftnät: planning for a secure electricity system, June 2026](https://www.svk.se/49c81e/siteassets/om-oss/rapporter/2026/uppdrag-3.1-planering-for-ett-leveranssakert-elsystem.pdf)
- [Svenska kraftnät: strategic reserve contract, January 2026](https://via.tt.se/pressmeddelande/4203956/svenska-kraftnat-tecknar-avtal-om-en-strategisk-reserv)
- [Förordning (2011:931) on Styrel](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/forordning-2011931-om-planering-for_sfs-2011-931/)
- [Energimyndigheten: risk-preparedness plan](https://www.energimyndigheten.se/48f82d/globalassets/trygg-energiforsorjning/el/riskberedskapsplan-ver-6-sv.pdf)
- [Introduction to Styrel and MFK](https://trk.idrelay.com/res/mail/2930/49516/c13f93be-1f7c-49f4-95ff-a63a3d0ad5cc.pdf)
- [hurbra.se: reserve fee and 330 MW from Karlshamnsverket block 2, 2026/27](https://hurbra.se/?p=46738)
- [SvKFS 2021:1 on load disconnection](https://www.svk.se/siteassets/1.om-kraftsystemet/legalt-ramverk/foreskrifter/svkfs-2021_1_forbrukningsfrankoppling.pdf)
- [SvKFS 2001:1, general advice on rotating disconnection](https://www.svk.se/siteassets/1.om-kraftsystemet/legalt-ramverk/foreskrifter/svkfs-2001-1-utrustning-for-forbrukningsfrankoppling.pdf)

**Legal basis and consumer protection**

- [Lag (2026:1282) introducing the Elmarknadslag](https://data.riksdagen.se/dokument/sfs-2026-1282.html)
- [Elsystemförordning (2026:1522)](https://data.riksdagen.se/dokument/sfs-2026-1522.html)
- [Disconnection notice to social services (SFS 2023:244)](https://svenskforfattningssamling.se/sites/default/files/sfs/2023-05/SFS2023-244.pdf)
- [Fjärrvärmeförordning (2008:526)](https://lagen.nu/2008:526)

**District heating and competition**

- [Ei: strengthened customer protection in district heating (R2025:16)](https://ei.se/download/18.3a31f9bb19afcb9984d1b60/1765343591203/F%C3%B6rst%C3%A4rkt-kundskydd-p%C3%A5-fj%C3%A4rrv%C3%A4rmemarknaden-slutrapport-Ei-R2025-16.pdf)
- [TV4: Ei orders a company to stop applying 2026 prices](https://www.tv4.se/artikel/tt-260331-fjarrvarme1-44924d02/fjarrvarmebolag-far-smisk-forbjuds-hoja-priset)
- [Konkurrensverket: consultation response on district heating](https://www.konkurrensverket.se/globalassets/dokument/om-oss/remissvar-och-yttranden/26-0123.pdf)
- [Konkurrensverket: price formation on the network market (2026:3)](https://www.konkurrensverket.se/globalassets/dokument/informationsmaterial/rapporter-och-broschyrer/analys-i-korthet/analys-i-korthet_2026-3.pdf)
- [Ei: market surveillance under REMIT](https://ei.se/ei-in-english/electricity/the-electricity-market)

**GGF texts and baselines:** Climate & Energy Governance v2.2, AUBI v2.7.1, Gaian Trade v0.9.3, GMEAIA v0.2.2 (frozen); S1 Germany v0.2; S2 Brazil v0.2.
