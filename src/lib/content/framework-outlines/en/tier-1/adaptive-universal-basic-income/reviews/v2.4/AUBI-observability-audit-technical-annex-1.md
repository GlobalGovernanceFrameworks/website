# AUBI Observability Audit — Technical Annex 1

# Low Hearts Velocity Indistinguishable-State Test v0.1

## Can AUBI distinguish the causes of low circulation before acting?

**Status:** Internal technical audit
**Parent artifact:** AUBI Observability Audit v0.1
**Primary frameworks:** AUBI v2.4; Financial Systems v3.3; Nested Economies v3.1b; Work in Liberation v1.9
**Test type:** Indistinguishable-state and intervention-admissibility test
**Result:** **Current architecture fails causal identification but passes early-warning detection**

---

## Executive result

The AUBI framework treats Hearts velocity as a key indicator of whether a local Hearts economy is functioning. During Stage 3, circulation is considered adequate when the average Heart changes hands at least once every 30 days over a 90-day period. A Heart remaining in a wallet for more than 90 days is interpreted as evidence that demurrage is inactive or provider diversity is insufficient.

This test finds that the interpretation is underdetermined.

At least twelve materially different system states can produce the same low-velocity dashboard pattern, including:

* insufficient provider variety;
* insufficient provider capacity;
* geographic exclusion;
* low provider quality;
* lack of merchant acceptance;
* distrust of Hearts;
* unequal distribution of Hearts;
* seasonal patterns;
* informal gift-economy substitution;
* technology or ledger failure;
* an inappropriate fiat/Hearts composition;
* successful material sufficiency with low demand for additional formal exchange.

These states require different—and sometimes opposite—responses.

For example:

* provider scarcity may justify recruiting providers;
* geographic exclusion may justify mobile or distributed provision;
* distrust may require institutional repair rather than monetary stimulus;
* ledger failure requires data correction;
* benign seasonal decline may require no intervention;
* thriving informal exchange may make efforts to raise monetized velocity actively harmful.

The current framework can therefore detect a symptom but cannot reliably identify its cause.

### Core verdict

> **Low Hearts velocity is a valid alert signal but not a valid diagnosis.**

### Falsified inference

The test falsifies the implicit inference:

> Low velocity or long wallet dormancy
> → demurrage failure or insufficient provider diversity.

Those are possible causes, but they are not uniquely identified by the available signal.

### What survives

A stronger formulation survives:

> Low velocity should trigger a structured diagnostic process examining supply, capacity, accessibility, acceptance, trust, distribution, seasonality, informal substitution, and data integrity before any intervention is selected.

---

# 1. Test object

## 1.1 The existing velocity rule

The AUBI bootstrapping pathway requires:

* at least five provider categories;
* average Hearts velocity of at least one exchange per 30 days over a 90-day window;
* a fraud rate below 2%;
* an assigned and trained Community Weaver.

The framework also treats a Heart remaining in a wallet for 90 days or more as evidence that demurrage is inactive or provider diversity is insufficient.

At BAZ formalization, the framework additionally observes:

* participant count;
* reserve-ratio history;
* fraud;
* LMCI-A reporting;
* outreach to marginalized populations.

If a BAZ fails to progress, Community Weavers are instructed to assess whether the failure concerns provider diversity, velocity, fraud, or reserve ratio.

These are useful operational dimensions. They are not yet a complete causal diagnosis.

---

## 1.2 Test question

> **Given the observation channels currently specified, can AUBI distinguish among the materially different states that produce low Hearts velocity and require different interventions?**

The test is passed only if the observation architecture can separate states whose appropriate interventions conflict.

Detection alone is insufficient.

---

## 1.3 Why the test matters

Velocity is likely to influence decisions about:

* recruiting Community Providers;
* changing demurrage;
* altering Hearts issuance;
* modifying the fiat/Hearts ratio;
* expanding merchant acceptance;
* delaying BAZ formalization;
* changing Treasury rules;
* launching trust-building interventions;
* providing technical support;
* devolving or escalating governance.

A mistaken diagnosis may move the velocity indicator while worsening the actual underlying condition.

---

# 2. Operational definition of velocity

## 2.1 Current definitional gap

The framework defines healthy circulation in intuitive terms—the average Heart changing hands at least once every 30 days—but does not fully specify:

* which transactions count;
* whether issuance counts;
* whether Treasury redemption counts;
* whether ICTL conversion counts;
* how self-transfers are treated;
* whether reversed transactions count;
* whether transfers among related provider wallets count;
* how offline transactions are reconciled;
* whether dormant balances held by institutions and individuals are treated equally.

Without a precise denominator and transaction boundary, two systems can report different velocities despite identical economic activity.

---

## 2.2 Proposed primary measure

For observation window (W):

[
V_W =
\frac{\text{eligible Hearts transaction value during }W}
{\text{average eligible Hearts stock during }W}
]

For the existing rule, (W = 30) days, estimated over a rolling 90-day period.

### Eligible transaction value should include

* purchases from Community Providers;
* payments from providers to workers or other providers;
* legitimate peer-to-peer exchange for goods or services;
* locally recognized economic transfers.

### It should exclude

* initial AUBI issuance;
* Treasury minting;
* Treasury redemption into fiat;
* ICTL conversion that does not correspond to a local good or service exchange;
* self-transfers;
* transfers among commonly controlled wallets;
* reversals;
* administrative migrations;
* known fraudulent or wash transactions.

Otherwise, the indicator can rise without a corresponding increase in useful circulation.

---

## 2.3 Required decomposition

One aggregate velocity measure is insufficient. At minimum, distinguish:

### Use velocity

How rapidly Hearts are spent on actual goods and services.

[
V_{\text{use}}
]

### Recirculation velocity

How often Hearts continue circulating inside the Hearts economy after their first use.

[
V_{\text{recirc}}
]

### Redemption rate

How rapidly Hearts leave local circulation through fiat redemption.

[
R_{\text{redeem}}
]

### Participation rate

The proportion of enrolled participants who completed at least one eligible transaction.

[
P_{\text{active}}
]

### Dormancy share

The proportion of circulating balances not used for at least 90 days.

[
D_{90}
]

These quantities distinguish several otherwise conflated patterns.

For example:

* high use velocity plus high redemption may indicate useful services but weak local supply chains;
* low use velocity plus high dormancy may indicate access, trust, or demand problems;
* low average velocity with high activity among a minority may indicate severe balance concentration.

---

# 3. Formal indistinguishability criterion

Let:

* (z_i) denote an underlying causal state;
* (O) denote the currently observed dashboard vector;
* (a_i) denote the appropriate intervention under state (z_i).

Two states (z_i) and (z_j) are **operationally indistinguishable** under the current architecture when:

1. both can generate the same or practically equivalent observation vector (O); and
2. the appropriate interventions (a_i) and (a_j) materially differ.

The test fails when:

[
O(z_i) \approx O(z_j)
]

but:

[
a_i \neq a_j
]

A particularly serious failure occurs when the interventions conflict—for example, when one state requires stronger demurrage and another requires no intervention or reduced monetary pressure.

---

# 4. Current dashboard vector

A generous reconstruction of the currently available Stage 3–4 observation vector is:

[
O_0 =
{
V_{30},
D_{90},
N_{\text{categories}},
R_{\text{reserve}},
F_{\text{fraud}},
N_{\text{participants}},
\text{LMCI-A cycle status},
\text{outreach status}
}
]

Financial Systems can add:

* redemption;
* exchange differentials;
* issuance;
* inflation;
* transaction-volume anomalies;
* infrastructure load.

Nested Economies adds dashboards, feedback applications, Hearts circulation, care logs, and interoperability indicators.

Work in Liberation adds service-delivery tracking, Community Weaver validation, scheduling, need broadcasting, and external outcome measures.

The test asks whether these channels, as presently structured, distinguish cause rather than merely correlate with failure.

---

# 5. Synthetic common dashboard

The following values are illustrative and are not taken from the frameworks.

Assume twelve BAZs each display:

| Current indicator               |               Shared value |
| ------------------------------- | -------------------------: |
| Use velocity                    | 0.70 turnovers per 30 days |
| Required threshold              |                       1.00 |
| Dormant balance share, 90+ days |                        42% |
| Provider categories             |                          5 |
| Reserve ratio                   |                        34% |
| Fraud rate                      |                       0.6% |
| Enrolled participants           |                     Stable |
| Technical uptime                |      Reported above target |
| LMCI-A cycle                    |                  Completed |
| Marginalized outreach           |          Reported complete |

Under the current high-level dashboard, all twelve BAZs appear substantially similar.

The test now assigns a different underlying state to each one.

---

# 6. Latent-state test suite

## State S1: Provider-category shortage hidden by nominal classification

### Underlying condition

The BAZ reports five provider categories, but several categories contain only one small or intermittent provider. The formal category threshold is met while practical diversity is not.

### Diagnostic signature

* high unmet demand;
* high provider utilization;
* long waiting times;
* low redundancy;
* high sensitivity to provider exit;
* users report that desired services are unavailable.

### Appropriate response

* recruit providers in missing or fragile categories;
* build provider redundancy;
* support conversion of existing businesses;
* fund startup capacity.

### Harmful misresponse

Increasing demurrage would pressure participants to spend without increasing useful options.

---

## State S2: Provider-capacity shortage

### Underlying condition

Relevant providers exist, but they cannot meet demand because of staff, equipment, scheduling, or material constraints.

### Diagnostic signature

* high request volume;
* high rejection or deferral rate;
* long queues;
* high provider capacity utilization;
* strong participant trust;
* adequate category diversity.

### Appropriate response

* expand provider capacity;
* improve staffing and materials;
* create additional teams;
* address bottlenecked inputs.

### Why current signals fail

Provider category counts do not measure capacity.

---

## State S3: Geographic or temporal access mismatch

### Underlying condition

Services exist but are concentrated in central locations, inaccessible to remote, disabled, working, caregiving, or mobile participants.

### Diagnostic signature

* aggregate provider capacity appears adequate;
* low velocity concentrated in specific neighbourhoods or populations;
* high travel time;
* limited opening hours;
* high failed or abandoned service requests;
* low use among mobility-constrained groups.

### Appropriate response

* mobile provision;
* distributed service locations;
* transport support;
* accessible scheduling;
* offline access.

### Harmful misresponse

Recruiting more central providers may raise nominal capacity while preserving exclusion.

---

## State S4: Provider quality or relevance failure

### Underlying condition

Providers exist and have spare capacity, but their services are low quality, culturally misaligned, unreliable, or irrelevant to participant needs.

### Diagnostic signature

* low repeat-use rate;
* low satisfaction;
* cancelled transactions;
* low recommendation rates;
* complaints;
* high provider availability but low demand.

### Appropriate response

* quality review;
* provider redesign;
* cultural adaptation;
* charter reconsideration;
* improved need broadcasting.

### Harmful misresponse

Increasing issuance or demurrage would subsidize poorly matched provision.

---

## State S5: Hearts acceptance gap

### Underlying condition

Recipients need goods and services that remain fiat-only. Hearts accumulate because they cannot be used for essential expenditures.

### Diagnostic signature

* high reported unmet material need;
* high fiat stress;
* low acceptance among essential merchants;
* frequent attempted but unavailable Hearts purchases;
* high unspent Hearts balances;
* participants request fiat conversion.

### Appropriate response

* expand acceptance among essential providers;
* temporarily increase fiat share;
* build supply-chain integration;
* offer safe conversion pathways.

### Harmful misresponse

Increasing the Hearts share of Layer 1 would reduce practical material security.

---

## State S6: Currency distrust

### Underlying condition

Participants doubt that Hearts will retain usefulness, remain redeemable, or avoid surveillance and arbitrary governance.

### Diagnostic signature

* low voluntary acceptance;
* high preference for immediate fiat conversion where available;
* negative trust surveys;
* fear of rule changes;
* avoidance despite adequate provider access;
* elevated response after scandals or governance disputes.

### Appropriate response

* institutional accountability;
* transparent reserve and rule reporting;
* protected exit;
* credible governance repair;
* participatory review.

### Harmful misresponse

Stronger demurrage may confirm fears that Hearts are coercive.

---

## State S7: Balance concentration

### Underlying condition

A small number of actors hold most Hearts while the median participant has little or none.

Aggregate velocity is low because large institutional or affluent balances remain dormant.

### Diagnostic signature

* high wallet-balance concentration;
* low median balance;
* active spending among most low-balance participants;
* dormancy concentrated in a few wallets;
* provider or institutional accumulation.

### Appropriate response

* examine distribution;
* alter redemption or provider payment flows;
* prevent excessive institutional accumulation;
* use targeted recirculation mechanisms.

### Harmful misresponse

Increasing general issuance may leave concentration unchanged while expanding total liabilities.

---

## State S8: Seasonal or cultural rhythm

### Underlying condition

The observation window coincides with a predictable seasonal lull, festival period, agricultural cycle, migration season, climate event, or cultural practice.

### Diagnostic signature

* comparable decline in previous periods;
* stable year-on-year seasonal pattern;
* no increase in unmet need;
* no deterioration in trust or access;
* subsequent rebound is expected.

### Appropriate response

* no structural intervention;
* use seasonally adjusted thresholds;
* monitor until the expected transition.

### Harmful misresponse

Changing long-term monetary rules in response to normal seasonality introduces instability.

---

## State S9: Informal or gift-economy substitution

### Underlying condition

Needs are being met through voluntary, non-monetized relationships, mutual aid, household sharing, or culturally embedded reciprocal systems.

### Diagnostic signature

* low formal transaction demand;
* stable or improving material sufficiency;
* strong relational networks;
* no elevated unmet-need reports;
* qualitative evidence of reciprocal provision;
* community preference against monetization.

### Appropriate response

* no attempt to force monetization;
* preserve Layer 0 boundaries;
* offer support only where burdens emerge;
* monitor informal carer wellbeing without scoring relational acts.

### Harmful misresponse

Raising formal velocity could “economize the soul,” absorbing relationships that the framework intentionally protects from conversion. AUBI explicitly acknowledges this risk and keeps Layer 0 non-monetized.

---

## State S10: Ledger or recording failure

### Underlying condition

Transactions occur but are not captured because of application outages, offline exchange, delayed reconciliation, incompatible local systems, or user-interface failure.

### Diagnostic signature

* provider-reported activity exceeds ledger records;
* offline vouchers remain unreconciled;
* elevated application errors;
* regional discrepancies;
* high complaint rate about transaction capture;
* abrupt velocity drop coinciding with a technical change.

### Appropriate response

* repair observation infrastructure;
* reconcile offline records;
* correct historical data;
* suspend policy responses based on corrupted signals.

### Harmful misresponse

Monetary intervention would respond to a sensor failure as though it were an economic failure.

---

## State S11: Fiat/Hearts composition mismatch

### Underlying condition

The local economy can use Hearts for some services, but the Layer 1 Hearts share exceeds the proportion of practical expenditure that recipients can meet in Hearts.

### Diagnostic signature

* persistent Hearts accumulation among low-income recipients;
* simultaneous fiat hardship;
* strong demand for fiat-essential goods;
* limited provider acceptance in housing, utilities, transport, healthcare, or food;
* low Hearts use despite willingness.

### Appropriate response

* reduce Hearts share temporarily;
* expand essential acceptance before increasing the ratio;
* use BAZ-specific rather than uniform composition.

### Harmful misresponse

Interpreting low velocity as insufficient demand for community services obscures a currency-composition failure.

---

## State S12: Benign sufficiency or demand saturation

### Underlying condition

Material needs are being met, provider capacity is adequate, and participants simply have little desire for additional formal consumption.

### Diagnostic signature

* low unmet need;
* stable material-security measures;
* stable or improving LMCI-M;
* adequate access and trust;
* no concentration problem;
* no technical failure;
* participants report satisfaction with current consumption.

### Appropriate response

* no intervention;
* reconsider whether velocity should be treated as an objective rather than a constraint;
* permit balances or reduce issuance if desired by the community;
* evaluate whether low consumption reflects regenerative success.

### Harmful misresponse

Attempting to maximize velocity could create artificial consumption pressure contrary to post-growth and regenerative aims.

---

# 7. Test results

## 7.1 Current-state equivalence

All twelve states can generate:

* low aggregate velocity;
* high dormancy;
* nominally adequate provider-category count;
* acceptable reserve ratio;
* low reported fraud;
* stable participation.

Therefore:

[
O_0(S1) \approx O_0(S2) \approx \cdots \approx O_0(S12)
]

within the practical resolution of the current dashboard.

---

## 7.2 Intervention divergence

The states require materially different responses:

| State                    | Appropriate intervention                       |
| ------------------------ | ---------------------------------------------- |
| S1 Category shortage     | Recruit provider types                         |
| S2 Capacity shortage     | Expand existing provider capacity              |
| S3 Access mismatch       | Distribute access spatially and temporally     |
| S4 Quality failure       | Improve or replace providers                   |
| S5 Acceptance gap        | Expand essential acceptance or increase fiat   |
| S6 Distrust              | Repair governance and credibility              |
| S7 Concentration         | Redistribute or alter institutional flows      |
| S8 Seasonality           | No structural intervention                     |
| S9 Informal substitution | Protect non-monetized exchange                 |
| S10 Recording failure    | Repair sensor and reconcile data               |
| S11 Composition mismatch | Recalibrate fiat/Hearts ratio                  |
| S12 Benign sufficiency   | No intervention; reconsider velocity objective |

The test therefore meets the failure condition:

[
O(S_i) \approx O(S_j)
\quad\text{while}\quad
a_i \neq a_j
]

for multiple state pairs.

---

## 7.3 Strongest conflicting pairs

### S1 versus S9

Both may show low formal velocity.

* S1 requires more formal providers.
* S9 may require protection from formalization.

### S5 versus S12

Both may show unused Hearts.

* S5 indicates material hardship and poor Hearts usability.
* S12 indicates sufficiency and low desired consumption.

### S6 versus S8

Both may show a temporary fall.

* S6 requires institutional repair.
* S8 requires patience and seasonal adjustment.

### S7 versus S11

Both may show high aggregate dormancy.

* S7 requires examining distribution.
* S11 requires changing currency composition or acceptance.

### S2 versus S10

Both may show low recorded service exchange.

* S2 requires increased capacity.
* S10 requires repairing the measurement system.

These pairs establish that the existing signal cannot safely authorize a unique intervention.

---

# 8. Diagnostic discriminator matrix

| Discriminator                 |         S1 |                     S2 |                     S3 |             S4 |                       S5 |                  S6 |                   S7 |               S8 |                         S9 |                  S10 |                          S11 |                       S12 |
| ----------------------------- | ---------: | ---------------------: | ---------------------: | -------------: | -----------------------: | ------------------: | -------------------: | ---------------: | -------------------------: | -------------------: | ---------------------------: | ------------------------: |
| Unmet service demand          |       High |                   High |           High locally |          Mixed |            High material |               Mixed |                Mixed |           Normal |                        Low |        Apparent only |                         High |                       Low |
| Provider capacity utilization |       High |              Very high |                  Mixed |            Low |                    Mixed |                 Low |                Mixed |           Normal |                        Low |        Reported high |                        Mixed |                       Low |
| Waiting time                  |       High |                   High | High in excluded areas |            Low | High for fiat-only needs |                 Low |                Mixed |         Seasonal |                        Low |      Ledger mismatch |                        Mixed |                       Low |
| Essential merchant acceptance |      Mixed |                  Mixed |                  Mixed |          Mixed |                      Low |            Adequate |                Mixed |           Stable |              Less relevant |              Unknown | Low relative to Hearts share |                  Adequate |
| Trust in Hearts               |       High |                   High |                   High |          Mixed |                    Mixed |                 Low |                Mixed |           Stable |        Culturally variable |                Mixed |                         High |                      High |
| Balance concentration         |      Mixed |                  Mixed |                  Mixed |          Mixed |                    Mixed |               Mixed |                 High |           Stable |                      Mixed |             Apparent |                        Mixed |                       Low |
| Offline reconciliation gap    |        Low |                    Low |               Possible |            Low |                      Low |                 Low |                  Low |              Low |                   Possible |                 High |                          Low |                       Low |
| Seasonal residual             |   Abnormal |               Abnormal |               Abnormal |       Abnormal |                 Abnormal |            Abnormal |             Abnormal |           Normal |            Possibly normal |             Abnormal |                     Abnormal |                    Normal |
| Material sufficiency          |  Low/mixed |              Low/mixed |            Low locally |          Mixed |                      Low |               Mixed |              Unequal |           Stable |                     Stable |            Uncertain |         Low fiat sufficiency |                      High |
| Informal substitution         |        Low |                    Low |               Possible |       Possible |                      Low |                 Low |                  Low |              Low |                       High |            Uncertain |                          Low |                  Possible |
| Repeat provider use           |      Mixed |      High if available | Low in excluded groups |            Low |                    Mixed |                 Low |                Mixed |           Stable |                 Low formal |      Ledger mismatch |                        Mixed |                  Adequate |
| Reason-for-non-use evidence   | No options | Cannot access capacity |         Too far/closed | Poor relevance |    Cannot buy essentials | Do not trust system | No spendable balance | Temporary rhythm | Prefer relational exchange | Transactions missing |               Need more fiat | Do not need more services |

No single discriminator is sufficient. Identification requires a small portfolio.

---

# 9. Minimum diagnostic sensor set

The objective is not maximal data collection. It is the smallest additional observation portfolio that separates the intervention classes.

## Sensor M1: Unmet-demand and failed-request channel

Observe:

* requested service;
* whether it was available;
* waiting time;
* reason request failed;
* whether need was later met elsewhere.

### Distinguishes

* provider scarcity;
* capacity shortage;
* geographic exclusion;
* low actual demand.

---

## Sensor M2: Provider-capacity and coverage map

Observe:

* capacity by service category;
* actual utilisation;
* hours and location;
* waiting lists;
* provider redundancy;
* accessibility;
* recent provider entry and exit.

### Distinguishes

* nominal category diversity from practical diversity;
* provider shortage from quality or demand problems;
* central availability from distributed access.

---

## Sensor M3: Hearts acceptance and fiat-essential burden

Observe:

* which necessary goods and services accept Hearts;
* proportion of household essential spending that remains fiat-only;
* failed attempts to pay in Hearts;
* demand for conversion;
* differences across income and location.

### Distinguishes

* low service demand from low currency usability;
* acceptance gaps from distrust;
* ratio mismatch from provider shortage.

---

## Sensor M4: Wallet-distribution decomposition

Observe with privacy protection:

* median balance;
* balance deciles;
* institutional versus household balances;
* dormancy by wallet class;
* top-share concentration;
* flow into and out of large wallets.

### Distinguishes

* general dormancy from concentrated dormancy;
* low circulation caused by inequality from low circulation caused by low demand.

---

## Sensor M5: Anonymous reasons-for-non-use sample

Use a short, voluntary, stratified survey.

Possible responses:

* nothing relevant to buy;
* desired service unavailable;
* cannot reach provider;
* prefer fiat;
* do not trust Hearts;
* technical difficulty;
* saving for later;
* needs met informally;
* do not currently need additional services;
* other.

### Distinguishes

Several states that transaction logs alone cannot separate.

This should remain independent of benefit administration.

---

## Sensor M6: Technical and offline reconciliation audit

Observe:

* application failures;
* failed transactions;
* SMS and offline use;
* unreconciled vouchers;
* provider-reported versus ledger-recorded volume;
* system changes preceding velocity shifts.

### Distinguishes

Economic failure from observation failure.

---

## Sensor M7: Seasonal baseline

Estimate expected velocity by:

* month;
* climate season;
* agricultural cycle;
* migration pattern;
* major cultural period;
* previous local history.

### Distinguishes

structural decline from normal temporal variation.

---

## Sensor M8: Material sufficiency and informal substitution pulse

Use a low-burden, independent sample asking:

* Were important needs unmet?
* How were needs met?
* Was unpaid or informal care freely given?
* Is anyone carrying an excessive burden?
* Would formal provision be preferred?
* Is lower formal exchange considered desirable locally?

### Distinguishes

benign sufficiency and voluntary informal provision from hidden deprivation.

This channel must not convert informal acts into LMCI-A rewards or require comprehensive Love Ledger logging.

---

# 10. Sequential diagnostic protocol

## Step 0: Validate the velocity signal

Before causal interpretation:

1. verify transaction eligibility rules;
2. reconcile offline records;
3. remove self-transfers and wash activity;
4. separate use, recirculation, and redemption;
5. verify average circulating-stock denominator;
6. compare provider reports with ledger records;
7. check for recent technical changes;
8. apply seasonal adjustment.

### Possible result

> **Signal invalid or insufficiently reliable.**

No economic intervention should occur until repaired.

---

## Step 1: Decompose the aggregate

Stratify velocity and dormancy by:

* geography;
* wallet type;
* balance decile;
* provider category;
* demographic group, where lawful and community-approved;
* online versus offline channel;
* first-use versus recirculation;
* household versus institutional wallet.

### Purpose

Determine whether low velocity is:

* system-wide;
* geographically localized;
* concentrated among large holders;
* specific to one service category;
* specific to an access channel.

---

## Step 2: Test unmet demand

Ask:

* Are people trying and failing to obtain services?
* Are waiting times high?
* Are providers at capacity?
* Are desired categories missing?

### Interpretation

* **High unmet demand + high utilisation:** supply or capacity problem.
* **Low unmet demand + low utilisation:** quality, relevance, sufficiency, distrust, or informal substitution.

---

## Step 3: Test Hearts usability

Ask:

* Can Hearts purchase essential goods?
* Is the Hearts share proportionate to local acceptance?
* Are participants experiencing simultaneous Hearts accumulation and fiat hardship?

### Interpretation

* **High Hearts balances + high fiat hardship:** acceptance or composition problem.
* **High balances + low hardship:** possible sufficiency, saving, distrust, seasonality, or concentration.

---

## Step 4: Test trust and provider quality

Ask:

* Do participants trust redemption, governance, privacy, and rule stability?
* Do they consider providers useful and culturally appropriate?
* Are repeat-use and satisfaction rates low?

### Interpretation

Distinguishes institutional distrust from poor provider quality and low need.

---

## Step 5: Test informal substitution and sufficiency

Ask:

* Are needs being met outside formal Hearts exchange?
* Is this voluntary and culturally desired?
* Are informal carers carrying excessive burdens?
* Is low formal demand accompanied by stable material security?

### Interpretation

* **Needs met, burdens low:** benign substitution or sufficiency.
* **Needs met through exhausted carers:** Layer 3 or support need.
* **Needs unmet:** formal provision or material-security failure.

---

## Step 6: Form a state estimate

The diagnostic output should not be a single label unless evidence is strong.

### Required output

**Observed condition:**
**Leading explanation:**
**Alternative explanations:**
**Confidence:**
**Distributional pattern:**
**Data limitations:**
**Affected groups:**
**Admissible interventions:**
**Interventions not justified by current evidence:**
**Reassessment date:**

---

# 11. Intervention-admissibility matrix

| Proposed intervention                       | Evidence required before use                                                                          |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Recruit provider categories                 | Documented unmet demand and category absence                                                          |
| Expand provider capacity                    | High utilisation, waiting time, or rejected demand                                                    |
| Increase demurrage                          | Evidence of strategic hoarding rather than access, trust, sufficiency, or concentration problems      |
| Increase Hearts issuance                    | Evidence that low circulation is caused by insufficient spendable liquidity rather than low usability |
| Increase fiat share                         | Evidence of fiat-essential hardship or insufficient Hearts acceptance                                 |
| Increase Hearts share                       | Evidence of broad essential acceptance and no material-access loss                                    |
| Trust intervention                          | Independent evidence of governance, privacy, redemption, or stability concerns                        |
| Redistribution or institutional-flow reform | Concentration and dormant-balance evidence                                                            |
| Technical remediation                       | Ledger/provider mismatch or infrastructure failure                                                    |
| No intervention                             | Seasonal pattern, benign sufficiency, or voluntary informal substitution                              |
| Delay BAZ progression                       | Evidence that unresolved low velocity threatens practical viability                                   |
| Protect informal exchange                   | Evidence that formalization would displace valued relational systems                                  |

No intervention should be justified solely by aggregate velocity.

---

# 12. Constitutional constraints

## 12.1 Velocity is a constraint, not an objective

The framework should distinguish:

> minimum circulation needed for the Hearts system to remain usable

from:

> maximizing circulation as a measure of success.

A regenerative economy may intentionally reduce unnecessary consumption. High velocity can reflect:

* urgent scarcity;
* unstable balances;
* forced spending under demurrage;
* rapid redemption;
* repetitive low-value transactions;
* artificial transaction creation.

Low velocity can reflect:

* exclusion;
* distrust;
* technical failure;
* or genuine sufficiency.

Velocity therefore has no monotonic relationship with flourishing.

---

## 12.2 No punitive demurrage inference

Dormancy alone should not justify stronger demurrage.

Before increasing demurrage, the system must exclude:

* essential acceptance gaps;
* access barriers;
* technical failure;
* concentration;
* seasonal patterns;
* cultural or religious concerns;
* voluntary informal provision;
* material sufficiency.

---

## 12.3 Protected unobservability

The diagnostic process must not require comprehensive monitoring of informal relationships.

The purpose of the informal-substitution pulse is to determine whether needs and burdens exist—not to inventory, monetize, or optimize every act of care.

---

## 12.4 Right to non-participation

Low use resulting from informed and voluntary non-participation should not automatically be classified as system failure or deviance.

The diagnostic must distinguish:

* inability to participate;
* fear of participation;
* exclusion;
* and legitimate refusal.

---

# 13. Dashboard redesign

The current dashboard should replace a single “velocity health” indicator with the following panel.

## Hearts Circulation State

### Core telemetry

* use velocity;
* recirculation velocity;
* redemption rate;
* active-user share;
* 90-day dormancy;
* seasonal deviation.

### Distribution

* median household balance;
* institutional balance share;
* top-decile share;
* dormancy concentration.

### Supply and access

* provider capacity utilisation;
* median waiting time;
* unmet-demand rate;
* service-coverage gaps;
* essential acceptance rate.

### Trust and usability

* Hearts trust indicator;
* provider satisfaction;
* failed transaction rate;
* fiat-essential burden.

### Data integrity

* offline reconciliation gap;
* transaction-system error rate;
* latest audit date;
* confidence grade.

### Diagnostic status

One of:

* **Signal invalid**
* **Cause unresolved**
* **Supply shortage likely**
* **Capacity shortage likely**
* **Access mismatch likely**
* **Acceptance or composition mismatch likely**
* **Trust failure likely**
* **Concentration likely**
* **Seasonal variation likely**
* **Informal substitution likely**
* **Benign sufficiency possible**
* **Mixed state**

The dashboard should display alternative hypotheses rather than forcing one diagnosis.

---

# 14. Pilot test protocol

## 14.1 Objective

Determine whether the proposed minimum diagnostic sensor set improves causal identification and intervention choice relative to the current dashboard.

---

## 14.2 Test conditions

### Condition A: Current dashboard

Decision-makers receive only:

* aggregate velocity;
* dormancy;
* provider categories;
* reserve ratio;
* fraud;
* participation;
* existing high-level reports.

### Condition B: Decomposed telemetry

Add:

* use versus recirculation;
* redemption;
* wallet distribution;
* geographic and provider-category stratification.

### Condition C: Full minimum diagnostic set

Add M1–M8:

* unmet demand;
* provider capacity;
* acceptance and fiat burden;
* wallet distribution;
* reasons for non-use;
* technical reconciliation;
* seasonality;
* sufficiency and informal substitution.

---

## 14.3 Scenario corpus

Use the twelve states in this annex.

Each scenario should be generated so that Condition A presents approximately the same dashboard vector.

Conditions B and C should progressively reveal the distinguishing information.

---

## 14.4 Decision task

For each scenario, evaluators must select:

1. most likely causal state;
2. confidence;
3. admissible intervention;
4. interventions ruled out;
5. whether more information is needed;
6. reassessment horizon.

---

## 14.5 Primary outcome measures

* causal-state identification accuracy;
* correct intervention rate;
* harmful-intervention rate;
* appropriate “cause unresolved” rate;
* confidence calibration;
* time to decision;
* data-collection burden;
* participant privacy burden;
* subgroup error rate.

---

## 14.6 Pass criteria

The proposed diagnostic architecture passes if it:

1. materially reduces harmful intervention selection;
2. distinguishes states with conflicting interventions;
3. improves confidence calibration;
4. does not achieve improvement solely through excessive surveillance;
5. preserves the option to conclude that the cause remains unresolved.

A suitable preregistered standard for a later pilot might require:

* at least 80% correct intervention-class selection;
* fewer than 5% actively harmful interventions;
* no major protected-group disparity in diagnostic error;
* calibrated uncertainty;
* demonstrable incremental value over decomposed telemetry alone.

These numeric thresholds are proposed for future preregistration and are not source-derived.

---

# 15. Compact test cases

## Case A: Same low velocity, opposite policy

### BAZ Alpha

* high unmet need;
* provider queues;
* high trust;
* insufficient capacity.

**Correct action:** Expand providers.

### BAZ Beta

* low unmet need;
* high material sufficiency;
* strong informal reciprocity;
* community preference against further monetization.

**Correct action:** No velocity intervention; protect relational economy.

### Current dashboard result

Indistinguishable.

### Test result

Failure.

---

## Case B: Same dormancy, different monetary response

### BAZ Gamma

* dormant Hearts concentrated in two institutional wallets;
* median household balance low.

**Correct action:** Alter institutional flow and distribution.

### BAZ Delta

* dormant Hearts broadly distributed;
* recipients face high fiat-only housing and utility costs.

**Correct action:** Increase fiat share or essential Hearts acceptance.

### Current dashboard result

Indistinguishable.

### Test result

Failure.

---

## Case C: Same transaction decline, economy versus sensor

### BAZ Epsilon

* providers report low actual demand;
* system operates normally.

**Correct action:** Diagnose relevance, trust, seasonality, or sufficiency.

### BAZ Zeta

* providers report normal activity;
* offline voucher reconciliation failed after an update.

**Correct action:** Repair the ledger and revise data.

### Current dashboard result

Indistinguishable.

### Test result

Failure.

---

# 16. Required framework patch

The following text could be incorporated into AUBI §7.4.

## Proposed insertion: Low Hearts Velocity Diagnostic

**Low Hearts velocity is an alert signal, not a diagnosis.** A velocity below one eligible exchange per 30 days over a rolling 90-day window triggers a diagnostic review but does not by itself authorize changes to issuance, demurrage, the fiat/Hearts ratio, or provider recruitment.

Before intervention, the responsible BAZ body must assess:

1. transaction-data integrity and offline reconciliation;
2. seasonal and cultural variation;
3. provider-category diversity and practical capacity;
4. geographic, temporal, linguistic, and disability access;
5. unmet service demand and waiting times;
6. essential-goods Hearts acceptance and fiat burden;
7. wallet-balance concentration;
8. participant trust and provider quality;
9. informal or non-monetized substitution;
10. material sufficiency and whether low formal exchange is locally considered desirable.

The review must produce a public, privacy-preserving State Estimate Record containing:

* leading causal explanation;
* viable alternatives;
* confidence;
* distributional effects;
* selected intervention;
* interventions not justified by current evidence;
* reassessment date.

Where evidence does not discriminate among states requiring different interventions, the official finding must be:

> **Cause unresolved. Additional diagnosis required.**

Low velocity must not be treated as inherently undesirable. The objective is sufficient, equitable, trusted, and useful circulation—not maximum transaction volume.

---

# 17. Final verdict

## Detection claim

> Can the framework detect that Hearts circulation is below its intended operational threshold?

**Yes.**

The framework has:

* an explicit threshold;
* a rolling observation window;
* transaction records;
* Community Weaver reporting;
* provider-category requirements;
* reserve and fraud metrics.

## Diagnosis claim

> Can the framework currently determine why velocity is low?

**No.**

The current signals do not distinguish among multiple states with conflicting interventions.

## Control claim

> Can aggregate low velocity safely authorize a specific corrective action?

**No.**

It can authorize diagnostic review, but not a unique policy response.

## Revised architectural principle

> **Observe circulation, diagnose the cause, intervene on the latent state, and evaluate welfare—not velocity alone.**

The Low Hearts Velocity Test therefore produces a clean result:

> **The current AUBI architecture is observant enough to notice circulation failure, but not yet identifiable enough to know what kind of failure it is.**

