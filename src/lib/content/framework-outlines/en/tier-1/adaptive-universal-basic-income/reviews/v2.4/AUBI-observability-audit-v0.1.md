# AUBI Observability Audit v0.1

## Can the framework distinguish the conditions it promises to govern?

**Status:** Internal architectural audit
**Version:** 0.1
**Primary object:** Adaptive Universal Basic Income Framework v2.4
**Contextual interfaces:** Financial Systems Framework v3.3; Nested Economies Framework v3.1b; Work in Liberation Framework v1.9
**Audit type:** Information-admissibility, practical-observability, estimator, decision-rule, and contestability audit
**Scope limitation:** This is an architectural audit of the supplied frameworks. It is not an empirical validation of AUBI, LMCI, Hearts, Leaves, the Love Ledger, or any cited case study.

---

## Executive summary

### Overall verdict

**AUBI is observability-aware, sensor-rich, and estimator-thin.**

The framework already contains an unusually plural observation architecture:

* LMCI-Measurement and LMCI-Allocation are explicitly separated;
* financial telemetry includes reserves, redemption, inflation, velocity, and transaction volumes;
* Community Weavers provide local human observation;
* BAZ Councils have standing to object to structural changes;
* long-embedded knowledge holders protect slow ecological signals;
* independent audits, tribunals, whistleblowing channels, failure documentation, and an Office of the Adversary provide institutional challenge;
* Layer 0 creates a deliberate boundary around what should not be monetized or optimized.

These are substantial strengths. In particular, the separation of LMCI-M from LMCI-A recognizes that the signal used to evaluate system success must not be derived from the behavior directly rewarded by the system. The Slow-Variable Decision Protocol similarly recognizes that fast financial signals will otherwise dominate slower ecological knowledge.

The principal weakness is not absence of data. It is the absence of a formal layer specifying how observations become warranted beliefs about underlying conditions.

The frameworks frequently move directly from:

> indicator or threshold → diagnosis → intervention

without specifying:

* what alternative states could produce the same indicator;
* how those alternatives are discriminated;
* what uncertainty remains;
* whose interpretation governs;
* how source disagreement is represented;
* what evidence would reverse the diagnosis;
* whether the selected action remains appropriate when the state is only partially identified.

The audit therefore finds a recurring risk of **false identifiability**: treating a visible dashboard pattern as if it uniquely revealed the condition requiring intervention.

### Central audit claim

> **AUBI possesses deliberately plural observation channels but lacks a formal estimation architecture connecting those channels to its control decisions. Its main observability risk is therefore not simple blindness, but false identifiability: multiple materially different realities can produce the same dashboard signal while requiring different responses.**

### Highest-priority strengths

| Area                                              | Finding                          |
| ------------------------------------------------- | -------------------------------- |
| LMCI pipeline separation                          | Strong architecture              |
| Protection of slow ecological observations        | Strong architecture              |
| Protected unobservability and sacredness boundary | Strong architecture              |
| Staged implementation and graceful degradation    | Strong architecture              |
| Local objection and response-latency rights       | Promising architecture           |
| Financial telemetry                               | Broad, though causally ambiguous |

### Highest-priority gaps

| Area                                       | Finding                             |
| ------------------------------------------ | ----------------------------------- |
| Layer 3 needs and reparations assessment   | Critical specification gap          |
| Estimation and uncertainty                 | Critical specification gap          |
| Missing-population and exclusion detection | Critical specification gap          |
| Cross-framework LMCI interfaces            | Material ambiguity                  |
| Individual appeal and correction rights    | Under-specified                     |
| Multi-timescale LMCI interpretation        | Material inconsistency              |
| Administrative and validation capacity     | Partially observed                  |
| Diagnosis of low Hearts velocity           | Threshold present, estimator absent |
| Detection of informal carer exhaustion     | Structural blind spot               |
| Observation-channel independence           | Not explicitly audited              |

### Pilot-readiness verdict

**Conditional amber.**

AUBI is sufficiently observability-aware to justify pilot design, but not yet sufficiently specified to operate as a closed-loop adaptive governance system without risking confident misdiagnosis.

Before pilot implementation affects individual entitlements, bonuses, reparations, negative adjustments, or local monetary conditions, the framework should add:

1. a standard Observation Contract for every consequential decision;
2. a State Estimate Record that carries uncertainty and dissent into decision-making;
3. a dedicated Layer 3 Needs and Equity Observation Protocol;
4. a multi-timescale LMCI architecture;
5. an exclusion and missing-population sentinel;
6. explicit cross-framework data contracts;
7. individual correction, challenge, and appeal rights;
8. diagnostic protocols for ambiguous financial signals.

---

# 1. Audit purpose

A governance framework does not need perfect knowledge. It does need to know which decisions depend on which conditions, what evidence is available about those conditions, and how much uncertainty remains.

The relevant question is not:

> Does AUBI collect data?

It clearly does.

The relevant question is:

> **Can AUBI distinguish among the materially different states of the world that require different actions?**

For example, low Hearts velocity might arise because:

* too few useful providers exist;
* services exist but are inaccessible;
* people distrust the currency;
* the fiat/Hearts ratio is poorly calibrated;
* Hearts are concentrated among a small group;
* technological friction prevents spending;
* seasonal patterns temporarily suppress exchange;
* local gift economies satisfy needs without monetized transactions;
* the baseline is too low to generate discretionary Hearts demand;
* demurrage or redemption rules create avoidance;
* a dominant provider has exited;
* residents are materially secure and simply do not need more formal services.

The framework currently specifies a velocity threshold and suggests that dormant Hearts indicate either inactive demurrage or insufficient provider diversity. Those are plausible hypotheses, but they do not exhaust the possible causes.

If the diagnosis is wrong, the response can worsen the actual condition. Recruiting providers will not solve technological exclusion; increasing demurrage will not solve distrust; increasing Hearts issuance will not solve service mismatch.

The audit therefore evaluates the entire epistemic chain:

> **state → observation → estimation → decision → action → outcome observation**

---

# 2. Audit framework

## 2.1 The five-layer decision architecture

For each consequential AUBI decision, the audit distinguishes five layers.

### Layer 1: Causal state

The real condition that matters.

Examples:

* whether the universal baseline meets material needs;
* whether care capacity is insufficient;
* whether low velocity reflects supply, demand, trust, access, or concentration;
* whether ecological restoration is genuine and durable;
* whether a claimant has an unmet support need;
* whether an institution has been captured.

### Layer 2: Observation model

How the state becomes visible.

Examples:

* prices;
* surveys;
* transaction records;
* provider logs;
* ecological sensors;
* Community Weaver attestations;
* Indigenous knowledge-holder reports;
* complaints;
* participation rates;
* tribunal evidence.

### Layer 3: Estimator

How observations are combined into a belief about the causal state.

Examples:

* a statistical estimate;
* a structured human assessment;
* an evidentiary finding;
* a causal model;
* a multi-observer synthesis;
* a diagnosis with explicit alternatives and confidence.

This layer is frequently missing or implicit in the supplied frameworks.

### Layer 4: Decision rule

How the estimated state maps to an authorized action.

Examples:

* alter the fiat/Hearts ratio;
* suspend issuance;
* increase the baseline;
* award or deny a Layer 3 supplement;
* change a Green Job Score multiplier;
* initiate a structural review;
* devolve authority.

### Layer 5: Outcome observation

How the system determines whether its intervention improved the intended condition rather than merely changing the monitored indicator.

---

## 2.2 Audit dimensions

### A. Information admissibility

Does a decision rely only on information the authorized decision-maker could actually possess at the time of decision?

### B. Practical observability

Can materially different states be distinguished through the available observation channels, within relevant time and cost constraints?

### C. Estimator adequacy

Does the framework specify how conflicting, delayed, incomplete, strategic, or culturally incommensurable signals are interpreted?

### D. Implementable policy

Can the stated decision rule be implemented using the information actually available?

### E. Contestability

Can affected people inspect, correct, challenge, or supplement the evidence and interpretation used?

### F. Value of information

Would additional sensing materially improve decisions after accounting for its cost, delay, privacy burden, and risk of capture?

### G. Protected unobservability

Does the framework preserve domains that should remain outside centralized measurement, optimization, or monetization?

---

## 2.3 Qualitative ratings

The audit deliberately avoids a composite score.

| Rating           | Meaning                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **Green**        | Observation architecture is explicit, plural, and linked to a contestable decision process           |
| **Amber**        | Relevant channels exist, but interpretation, uncertainty, timing, or challenge rights are incomplete |
| **Red**          | A consequential decision lacks an adequate observation or estimation architecture                    |
| **Protected**    | Deliberate unobservability is an intended constitutional boundary rather than a defect               |
| **Out of scope** | Required architecture resides in a framework not supplied for this audit                             |

---

# 3. System boundary

## 3.1 AUBI

AUBI defines:

* material security;
* four payout layers;
* LMCI-M and LMCI-A;
* the Social Resilience Council;
* slow-variable governance;
* the fiat/Hearts ratio;
* implementation stages;
* crisis responses;
* cultural and data-sovereignty principles.

The framework describes itself as integrated with a larger ecosystem in which labor transition, reserve stability, geopolitical strategy, and institutional drift are distributed across other frameworks.

## 3.2 Financial Systems

Financial Systems supplies:

* reserve and redemption mechanics;
* issuance controls;
* Heartstarter funding;
* Inter-Currency Translation Layer governance;
* exchange-rate bands;
* financial anomaly detection;
* response-latency constraints;
* crisis and stress-testing scenarios.

It defines the ICTL as a point where local variety is compressed for cross-BAZ interoperability.

## 3.3 Nested Economies

Nested Economies allocates responsibilities between:

* local BAZ Councils;
* Community Providers;
* Community Weavers;
* the Social Resilience Council;
* the Earth Council.

It specifies local economic operation, global standards, interface protocols, objection rights, and dashboard expectations.

## 3.4 Work in Liberation

Work in Liberation supplies much of the organizational observation layer:

* Community Work Teams;
* need broadcasting;
* service-delivery tracking;
* work-condition feedback;
* Skills Resonance Matching;
* Community Weaver validation;
* external social and ecological outcomes;
* local dispute resolution.

Its need-broadcasting proposal explicitly identifies conventional job matching as a lossy information process and seeks to replace fixed roles with more direct problem and capacity signals.

---

# 4. Major control loops

## 4.1 Material-security loop

**Intended causal chain:**

AUBI baseline
→ reduced survival anxiety
→ increased freedom to refuse exploitative work
→ greater autonomy and meaningful activity
→ improved flourishing

**Primary observations:**

* regional price indices;
* survival-anxiety surveys;
* employment transitions;
* time spent in creative and relational activity;
* health and wellbeing indicators.

**Primary decisions:**

* baseline amount;
* regional adjustment;
* fiat/Hearts composition;
* crisis increases or baseline-only fallback.

**Audit status:** Amber.

The framework specifies the expenditure categories used to calculate the baseline, but prices alone do not reveal actual service availability, housing quality, unpaid household burdens, household composition, debt obligations, informal provision, or whether Hearts can purchase locally necessary goods.

---

## 4.2 Hearts monetary loop

**Intended causal chain:**

Hearts issuance and baseline allocation
→ local spending
→ Community Provider revenue
→ service capacity and local circulation
→ material and relational benefit
→ increased trust and adoption

**Primary observations:**

* velocity;
* transaction volumes;
* provider diversity;
* reserves;
* redemption;
* inflation;
* exchange differentials;
* fraud rates.

**Primary decisions:**

* issuance;
* demurrage;
* reserve response;
* exchange-rate adjustment;
* provider expansion;
* fiat/Hearts ratio.

**Audit status:** Amber-red.

Financial telemetry is extensive, but most indicators remain causally non-specific.

---

## 4.3 Formal-contribution loop

**Intended causal chain:**

Community Provider activity
→ Proof of Care validation
→ LMCI-A scoring
→ Hearts or Leaves rewards
→ increased care, cultural, and ecological contribution

**Primary observations:**

* provider logs;
* Community Weaver attestations;
* transaction records;
* ecological metadata;
* redemption records;
* anomaly detection.

**Primary decisions:**

* contribution validation;
* bonus amount;
* dynamic caps;
* fraud investigation;
* provider charter status.

**Audit status:** Amber.

Activity verification is relatively well specified. Causal benefit, counterfactual impact, observer dependence, and individual appeal rights are less clear.

---

## 4.4 Informal-recognition loop

**Intended causal chain:**

Informal care and contribution
→ Love Ledger recognition
→ gratitude and social visibility
→ stronger relational wealth and community cohesion

**Primary observations:**

* voluntary informal contribution logs;
* Gratitude Tokens;
* Community Weaver validation;
* community ceremonies.

**Primary decisions:**

* primarily recognition rather than monetary allocation.

**Audit status:** Protected/amber.

The non-convertibility of Gratitude Tokens and separation from the Hearts Treasury create an important sacredness boundary.

A residual blind spot remains: the system may recognize care without detecting that an informal carer is exhausted, materially deprived, coerced, or carrying an unsustainable burden.

---

## 4.5 Equity and reparations loop

**Intended causal chain:**

Observation of need or historical harm
→ Layer 3 determination
→ needs-based or reparative supplement
→ improved substantive equity

**Primary observations:** Not adequately specified.

**Primary decisions:**

* disability and health support;
* caregiving supplements;
* geographic equity;
* reparations;
* migrant and refugee portability;
* negative adjustments.

**Audit status:** Red.

Layer 3 names covered conditions but does not provide an equivalent observation, validation, estimator, privacy, challenge, or review architecture.

---

## 4.6 Ecological-regeneration loop

**Intended causal chain:**

Ecological work
→ sensor and knowledge-holder verification
→ Green Job Score or Leaves issuance
→ increased restoration activity
→ ecological recovery

**Primary observations:**

* ecological sensors;
* biodiversity indicators;
* geospatial metadata;
* traditional observer reports;
* sacred-site assessments;
* LEKH deliberation.

**Primary decisions:**

* ecological multipliers;
* eligible categories;
* Leaves issuance;
* ecological thresholds;
* industrial-sunsetting timelines.

**Audit status:** Green-amber.

The observation plurality is strong. The remaining weakness is the lack of a specified synthesis process when instrumental, scientific, local, and Indigenous observations disagree.

---

## 4.7 Institutional-integrity loop

**Intended causal chain:**

audits, petitions, adversarial reports, complaints, and observed drift
→ structural review or veto
→ correction, devolution, reformation, or institutional replacement

**Primary observations:**

* Accountable Coordination Audit;
* Legitimacy Drift Detector;
* BAZ petitions;
* conflict-of-interest disclosures;
* external evaluations;
* whistleblowing;
* Office of the Adversary reports;
* response-latency dashboard.

**Primary decisions:**

* recusal;
* review;
* veto;
* reformation;
* devolution;
* tribunal action.

**Audit status:** Green-amber.

The structural challenge architecture is comparatively strong. It is more developed for councils and cross-BAZ standards than for individual allocation or validation decisions.

---

# 5. Decision inventory

| ID  | Consequential decision                            | Authorized body or mechanism                         | Required underlying state                                         |
| --- | ------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| D1  | Enrol a person without conventional documentation | Community organization, witnesses, BAZ mechanisms    | Identity continuity and non-duplication                           |
| D2  | Set regional Layer 1 amount                       | SRC and regional implementation                      | Cost of achieving material security                               |
| D3  | Change fiat/Hearts ratio                          | SRC, subject to slow-variable rules where applicable | Local Hearts usability and long-term dependency implications      |
| D4  | Validate a Layer 2 contribution                   | Community Provider, Proof of Care, Community Weaver  | Whether contribution occurred and produced relevant value         |
| D5  | Set Layer 2 score or multiplier                   | FLP, BAZ adaptation, LMCI-A                          | Relative social, cultural, or ecological contribution             |
| D6  | Apply dynamic bonus cap                           | AUBI allocation mechanism                            | Income position and community impact                              |
| D7  | Award Layer 3 support                             | Under-specified                                      | Individual or collective need, disadvantage, or reparative claim  |
| D8  | Apply a negative adjustment                       | Digital Justice Tribunal                             | Ecocide or human-rights violation and attributable responsibility |
| D9  | Issue or suspend Hearts                           | Treasury rules and SRC                               | Monetary capacity, reserves, inflation, and real service capacity |
| D10 | Change demurrage or reserve rules                 | SRC/Financial Systems governance                     | Hoarding, circulation needs, stability, dependency trajectory     |
| D11 | Set ICTL rate                                     | SRC and FLP                                          | Cross-system value relationship                                   |
| D12 | Classify change as routine or structural          | SRC/FLP, Earth Council on dispute                    | Scope and consequence of proposed change                          |
| D13 | Change Green Job Score or ecological threshold    | FLP, SRC, LEKH quorum                                | Long-run ecological impact                                        |
| D14 | Progress BAZ implementation stage                 | BAZ and SRC                                          | Operational readiness and institutional capacity                  |
| D15 | Diagnose failed stage progression                 | Community Weavers and review process                 | Cause of failure                                                  |
| D16 | Charter or oversee Community Providers            | BAZ Council                                          | Provider competence, integrity, need, and community value         |
| D17 | Redirect work and funds during crisis             | SRC, Meta-Governance, PIS                            | Crisis severity, urgency, and allocation priority                 |
| D18 | Trigger institutional review or devolution        | BAZ petitions, latency rules, audits                 | Capture, drift, or persistent coordination failure                |

---

# 6. Observation-channel inventory

| Channel                               | Primary object observed               | Strength                               | Main limitation                                                               |
| ------------------------------------- | ------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| Regional price indices                | Market cost                           | Broad and repeatable                   | Do not reveal access, quality, informal provision, or household heterogeneity |
| Enrollment and identity attestations  | Personhood and eligibility            | Inclusive alternative to state ID      | Duplicate detection and coercion risks are not fully specified                |
| Hearts transaction logs               | Formal exchange                       | High temporal resolution               | Activity is not equivalent to welfare or need satisfaction                    |
| Treasury reserve records              | Fiat backing                          | Direct operational measure             | Does not reveal why redemption pressure changes                               |
| Redemption records                    | Provider liquidity demand             | Timely                                 | Multiple causal interpretations                                               |
| Provider-category counts              | Supply diversity                      | Simple structural measure              | Categories do not reveal capacity, quality, geography, or accessibility       |
| Provider activity logs                | Formal contribution                   | Auditable                              | Formalization bias                                                            |
| Community Weaver attestations         | Context and service delivery          | Local and interpretive                 | Dependence, workload, incentives, and correlated bias                         |
| Love Ledger                           | Informal contribution and recognition | Preserves non-market value             | Voluntary visibility; may miss burden, coercion, and unrecognized care        |
| LMCI-A                                | Allocative contribution signal        | Separated from system evaluation       | Impact model and appeals process under-specified                              |
| LMCI-M surveys                        | Population flourishing                | Independent of benefits administration | Slow cadence, sampling, interpretation, and aggregation                       |
| Ecological sensors                    | Environmental conditions              | Repeatable and scalable                | Sensor placement, proxy validity, failure, and tampering                      |
| LEKH reports                          | Slow, place-based ecological change   | Protects otherwise excluded evidence   | Synthesis with other evidence not specified                                   |
| Public Trust Dashboard                | Public visibility                     | Transparency and common reference      | Dashboard design can conceal uncertainty and disagreement                     |
| Anonymous feedback                    | Satisfaction and conformity risk      | Protects dissent                       | Representativeness and response process unclear                               |
| BAZ objections and petitions          | Institutional disagreement            | Formal standing and consequences       | Collective threshold may not protect isolated minorities                      |
| Accountable Coordination Audits       | Structural integrity                  | Explicit criteria                      | Annual cadence may be slow; audit capture remains possible                    |
| Tribunal evidence                     | Violations and disputes               | Formal adjudication                    | Individual access, burden of proof, and evidence correction unclear           |
| Failure Library                       | Implementation failure                | Counters publication bias              | Depends on honest classification and sufficient detail                        |
| External social/ecological indicators | Broader outcomes                      | Reduces internal circularity           | Attribution to AUBI remains difficult                                         |

---

# 7. Priority decision–observation matrix

## D2: Set the Layer 1 baseline

**Required state:** The amount and composition necessary for practical material security.

**Existing signals:**

* regional price indices;
* housing, food, utilities, transport, and healthcare weights;
* inflation monitoring;
* survival-anxiety surveys;
* regional and cultural adaptation.

**Rating:** Amber.

**Gap:** A price basket is not a material-security estimator. It does not necessarily reveal:

* whether goods and services are available;
* whether recipients can access them;
* household size and dependency;
* debt and arrears;
* disability-related costs;
* quality deterioration;
* housing insecurity despite nominal affordability;
* whether Hearts are accepted for locally necessary goods.

**Required amendment:** A Material Security Estimate combining prices, access, availability, household burden, service quality, and lived sufficiency.

---

## D3: Change the fiat/Hearts ratio

**Required state:** Whether additional Hearts can be used without reducing recipients’ practical freedom and whether the change supports long-run transition.

**Existing signals:**

* Hearts velocity;
* provider diversity;
* reserves;
* redemption;
* LMCI-M;
* regenerative progress;
* slow-variable review for long-term dependency effects.

**Rating:** Amber-red.

The SRC is authorized to adjust the ratio based on “regenerative progress,” but the framework does not define a decision rule connecting the underlying state to a ratio.

**Risks:**

* increasing Hearts where essential goods remain fiat-only;
* interpreting high velocity caused by necessity as healthy adoption;
* interpreting low velocity caused by security as system failure;
* shifting currency composition based on an aggregate that conceals marginalized access.

**Required amendment:** A Fiat/Hearts Usability and Freedom Test with BAZ-level distributional analysis.

---

## D4–D5: Validate and value Layer 2 contributions

**Required states:**

1. the contribution occurred;
2. it was not coerced or fabricated;
3. it created relevant benefit;
4. its valuation is culturally and contextually defensible.

**Existing signals:**

* provider activity logs;
* Community Weaver attestations;
* Proof of Care;
* Hearts Treasury records;
* ecological metadata;
* AI anomaly detection;
* community audits.

**Rating:** Amber.

The framework is strongest on occurrence verification. It is weaker on benefit attribution and contestation.

**Required amendment:** Proof of Care should distinguish:

* proof of activity;
* proof of recipient acceptance;
* proof of outcome;
* proof of additionality;
* uncertainty;
* negative or unintended effects.

Not every contribution category requires all five, but the record should identify which claims are and are not being made.

---

## D7: Award Layer 3 support

**Required state:** Unmet need, structural disadvantage, reparative entitlement, or care burden.

**Existing signals:** Not specified at the same level as Layers 1 and 2.

**Rating:** Red.

Layer 3 includes health, disability, caregiving, geographic equity, colonial reparations, and migrant/refugee portability. These are not one observable state and cannot responsibly share one unspecified assessment pathway.

The phrase “portable LMCI scores for migrants/refugees” is also architecturally unclear. LMCI-M is population-level and LMCI-A is contribution-level; neither is defined as an individual needs or entitlement score.

**Required amendment:** Replace the generic Layer 3 mechanism with distinct protocols for:

* disability and health-related need;
* informal caregiving burden;
* geographic cost and access disadvantage;
* displacement and mobility;
* collective reparations;
* ecological and historical harm;
* negative adjustments.

---

## D9–D10: Issue Hearts and manage reserves

**Required states:**

* actual monetary instability;
* real service capacity;
* liquidity demand;
* confidence;
* source of redemption pressure;
* concentration and hoarding;
* local dependence on external fiat.

**Existing signals:**

* reserve ratio;
* inflation;
* redemption;
* velocity;
* transaction volume;
* provider diversity;
* anomaly detection;
* exchange-rate differentials.

**Rating:** Amber.

The 30% reserve floor is explicit and automatically suspends issuance when breached. That is an implementable rule.

But the rule is a safety constraint, not a diagnosis. It does not determine why reserves fell or which longer-term intervention is appropriate.

---

## D11–D12: Change ICTL rates or structure

**Required state:** Cross-BAZ exchange conditions and the distributional consequences of changing translation rules.

**Existing signals and rights:**

* rate bands;
* projected impacts for five BAZ archetypes;
* 90-day notice;
* BAZ objections;
* automatic reclassification thresholds;
* LEKH determination;
* public reporting;
* response-latency dashboard.

**Rating:** Green-amber.

The governance process is comparatively strong. Structural changes are publicly modelled and contestable, and repeated latency failures can trigger devolution.

**Remaining gap:** Five archetypes do not necessarily represent the full distribution of affected BAZs. Model uncertainty and locally submitted counter-models should travel with the proposal.

---

## D13: Change ecological multipliers

**Required state:** Durable ecological benefit across relevant timescales.

**Existing signals:**

* ecological sensors;
* biodiversity data;
* sacred-site assessments;
* long-embedded observations;
* LEKH quorum;
* Earth Council veto.

**Rating:** Green-amber.

The framework strongly protects slow observation. The unresolved issue is epistemic synthesis:

* What happens when sensor data and knowledge-holder reports disagree?
* Is disagreement evidence of measurement failure, scale mismatch, or multiple legitimate variables?
* Can a decision proceed under unresolved disagreement?
* Is the dissent preserved in the formal record?

---

## D14–D15: Progress or remediate a BAZ

**Required state:** Operational readiness and cause of implementation failure.

**Existing signals:**

* participants;
* reserves;
* fraud;
* transaction counts;
* provider categories;
* velocity;
* operational duration;
* outreach.

**Rating:** Amber.

Stage criteria are concrete and sequencing is deliberately cautious.

The fallback protocol nevertheless narrows failed progression to provider diversity, velocity, fraud, or reserves. Those are measured dimensions, not necessarily the underlying causes. Missing possibilities include:

* technological exclusion;
* conflict;
* low trust;
* governance overload;
* inaccessible providers;
* local economic recession;
* poor communication;
* care burden;
* hostile regulation;
* currency composition;
* cultural rejection.

---

## D18: Trigger structural review

**Required state:** Persistent capture, drift, or unresponsiveness.

**Existing signals:**

* annual audit;
* BAZ petitions;
* external evaluation;
* conflict-of-interest disclosure;
* drift reports;
* response latency;
* Office of the Adversary;
* community feedback.

**Rating:** Green-amber.

The framework has strong formal mechanisms, including a 30% BAZ petition trigger.

The main concern is **silent capture**: successful capture may reduce complaints, weaken auditors, redefine active BAZ status, suppress evidence, or normalize behavior before thresholds are reached.

---

# 8. Indistinguishable-state tests

## Test 1: Low Hearts velocity

### Observed pattern

Average Hearts turnover falls below the desired rate, or Hearts remain in wallets for 90 days or more.

### Current interpretation

Demurrage may be inactive or provider diversity insufficient.

### Indistinguishable states

1. insufficient provider diversity;
2. adequate categories but insufficient provider capacity;
3. poor geographic access;
4. low service quality;
5. technological exclusion;
6. low trust in Hearts;
7. preference for saving despite demurrage;
8. recipient expectation of future scarcity;
9. excessive concentration of Hearts;
10. inadequate baseline amount;
11. excessive fiat-only essential spending;
12. seasonal variation;
13. demographic mismatch between services and needs;
14. gift-economy substitution;
15. community success reducing the need for formal transactions;
16. dominant-provider exit;
17. transaction-recording failure.

### Why it matters

These states require different responses. A generic “increase velocity” intervention risks optimizing the indicator rather than improving local welfare.

### Required discriminators

* unused Hearts by income and demographic group;
* provider waiting times and capacity;
* geographic service accessibility;
* declined or failed transactions;
* participant reasons for non-use;
* service-demand surveys;
* concentration measures;
* fiat-only expenditure burden;
* offline transaction reconciliation;
* seasonal baseline;
* informal-service substitution.

### Recommended output

The dashboard should report:

> **Low velocity: cause unresolved**

unless the diagnostic protocol discriminates among the major alternatives.

---

## Test 2: High redemption pressure

### Observed pattern

A high proportion of newly issued Hearts is redeemed for fiat.

### Possible states

1. Community Providers need fiat for external inputs;
2. households or providers distrust Hearts;
3. local supply chains remain underdeveloped;
4. exchange-rate arbitrage is occurring;
5. a temporary external shock increased fiat needs;
6. Hearts issuance exceeds service capacity;
7. the Hearts economy is functioning correctly as a bridge currency;
8. one large provider dominates redemption;
9. reserve expectations are causing a self-reinforcing run.

### Current response architecture

Financial Systems treats sustained high redemption relative to issuance as an inflation or stability warning and can activate issuance caps and forensic review.

### Audit finding

The signal is useful but insufficiently diagnostic. Redemption should be decomposed by:

* provider type;
* external-input dependence;
* concentration;
* transaction chain;
* regional shock;
* voluntary preference;
* exchange expectations.

---

## Test 3: Falling LMCI-M

### Observed pattern

Love, Meaning, Connection, or aggregate LMCI-M declines.

### Possible states

1. AUBI is producing unintended harm;
2. an unrelated economic or ecological shock occurred;
3. measurement methodology changed;
4. sample composition shifted;
5. cultural groups interpret questions differently;
6. the system increased reporting honesty;
7. improvement in one subpopulation conceals deterioration in another;
8. the annual measure is lagging an earlier intervention;
9. ecological decline is occurring despite social improvement;
10. meaning declined as survival pressure was removed;
11. survey administration lost independence;
12. adversarial manipulation affected the result.

### Audit finding

A falling score cannot itself specify a policy response.

### Required amendment

Every LMCI release should distinguish:

* observed change;
* measurement change;
* confidence interval;
* subgroup distribution;
* plausible causal contributors;
* unresolved alternatives;
* decision relevance;
* next observation date.

---

## Test 4: High LMCI-A activity with stagnant LMCI-M

### Observed pattern

Verified care, cultural, and ecological contributions increase, but population flourishing does not.

### Possible states

1. LMCI-A is rewarding activity without impact;
2. benefits are real but delayed;
3. contributions are too small relative to external harms;
4. benefits accrue to already advantaged groups;
5. LMCI-M fails to detect improvement;
6. provider claims are being gamed;
7. monetized care is displacing informal relational care;
8. administrative burden is reducing net benefit.

### Importance

This is the primary test of whether the LMCI firewall is functioning as intended.

The framework correctly prevents LMCI-A activity from automatically becoming evidence of system success. It should now specify what institutional inquiry is triggered when the two systems diverge.

---

## Test 5: Low enrolment or adoption

### Observed pattern

AUBI enrolment, Hearts use, or provider participation is below target.

### Possible states

1. lack of awareness;
2. administrative exclusion;
3. distrust;
4. cultural rejection;
5. digital exclusion;
6. fear of surveillance or immigration enforcement;
7. low perceived usefulness;
8. insufficient providers;
9. hostile political environment;
10. preference for existing institutions;
11. deliberate non-participation by a flourishing community;
12. mobility or documentation barriers;
13. inaccessible language or interface;
14. coercive local gatekeepers.

### Existing architecture

AUBI provides community attestation, mobile registration, offline access points, no fixed-address requirement, non-discrimination, and individual or community data control.

### Audit finding

These mechanisms improve access, but the framework lacks a credible denominator for those who remain unseen.

### Required amendment

Create a Missing-Population Sentinel combining:

* independent community mapping;
* anonymous non-enrolment surveys;
* service-access audits;
* outreach coverage;
* demographic discrepancy analysis;
* community organization reports;
* privacy-preserving estimates of eligible but unenrolled populations.

---

## Test 6: Low formal contribution but high informal care burden

### Observed pattern

A person or group receives few Layer 2 rewards but appears frequently in the Love Ledger or community narratives.

### Possible states

1. healthy voluntary informal contribution;
2. unpaid care coercion;
3. inability to formalize;
4. exclusion from Community Provider structures;
5. cultural preference against monetization;
6. administrative burden;
7. exhaustion or disability;
8. exploitation by family or community;
9. sacred activity correctly protected from monetization.

### Audit finding

The sacredness boundary must be preserved, but protection from monetization should not imply invisibility to support systems.

### Required amendment

Create an **Informal Care Burden Sentinel** that observes need without converting relational activity into a productivity score.

The sentinel should be:

* voluntary;
* claimant-controlled;
* non-transactional;
* non-convertible;
* separated from contribution scoring;
* usable solely to offer support or Layer 3 assessment.

---

## Test 7: Ecological restoration claim

### Observed pattern

Sensors and metadata indicate ecological improvement associated with a Community Provider.

### Possible states

1. genuine durable restoration;
2. short-term improvement with long-term damage;
3. displacement of harm elsewhere;
4. sensor-placement bias;
5. baseline manipulation;
6. attribution error;
7. natural recovery independent of intervention;
8. culturally significant degradation not captured by selected indicators;
9. strategic reporting;
10. ecological benefit with social or sovereignty harm.

### Existing strengths

AUBI combines sensor data with sacred-site assessments and long-embedded observations.

### Required amendment

Leaves and ecological multipliers should require an **Ecological Evidence Bundle** containing:

* baseline;
* intervention;
* temporal horizon;
* spatial boundary;
* counterfactual;
* leakage risks;
* instrumental observations;
* community observations;
* uncertainty;
* dissent;
* scheduled reassessment.

---

## Test 8: Labor withdrawal after AUBI

### Observed pattern

Participation in low-status or essential employment declines.

### Possible states

1. AUBI successfully enabled refusal of exploitative work;
2. essential work is genuinely undercompensated;
3. temporary adjustment friction;
4. skill mismatch;
5. care obligations increased;
6. illness or burnout became visible;
7. people moved to informal or Community Provider activity;
8. service collapse is imminent;
9. employers are withholding wage increases;
10. local measurement fails to see new forms of contribution.

### Existing response architecture

The frameworks propose wage subsidies, Critical Work Guarantees, gig-worker transition, industrial sunsetting, and Community Work Teams.

### Audit finding

A fall in labor supply is neither automatically a failure nor automatically liberation. The decision requires distinguishing exploitative work refusal from essential-capacity loss.

---

## Test 9: Fraud anomaly

### Observed pattern

An individual, provider, or BAZ exhibits contribution or issuance levels substantially above comparison groups.

### Possible states

1. fraud;
2. unusually effective provider;
3. crisis response;
4. population difference;
5. category-coding error;
6. coordinated valid activity;
7. data duplication;
8. privileged access;
9. algorithmic bias in expected values.

### Audit finding

Anomaly detection should generate investigation, not adverse determination.

The framework currently names AI anomaly detection and tribunal action, but it should explicitly prohibit automated fraud findings without human and community review.

---

## Test 10: Institutional quietness

### Observed pattern

Few objections, complaints, appeals, or petitions are registered.

### Possible states

1. legitimate satisfaction;
2. fear;
3. resignation;
4. inaccessible complaint channels;
5. capture of BAZ leadership;
6. low awareness;
7. retaliation;
8. successful filtering of dissent;
9. cultural reluctance to formalize disagreement;
10. exclusion of inactive BAZs from formal standing.

### Audit finding

Absence of challenge is not evidence of legitimacy.

The framework itself recognizes the analogous principle that absence of detected adversarial attack may indicate sophisticated concealment rather than security. The same logic should apply to institutional dissent.

---

# 9. Cross-framework interface audit

## 9.1 LMCI firewall ambiguity

AUBI states that LMCI-M:

* is population-level;
* is independent of individual contribution claims;
* must not be derived from LMCI-A;
* exists specifically to prevent incentivized activity from contaminating system evaluation.

Other passages state that:

* the Love Ledger provides qualitative data to inform LMCI;
* informal contributions feed LMCI data;
* Love Ledger metrics feed Meta-Governance dashboards;
* Nested Economies presents LMCI partly as a weighted combination of Hearts transactions, care hours, and interoperability.

Nested Economies, for example, describes an LMCI tool composed of 40% Hearts transactions, 30% logged care hours, and 30% interoperability. That is difficult to reconcile with AUBI’s definition of LMCI-M as an independent population-health signal.

### Audit verdict

**Material ambiguity.**

### Required interface rule

The frameworks should use distinct names for:

* **LMCI-M:** independent population-health estimate;
* **LMCI-A:** contribution-allocation score;
* **Operational Activity Dashboard:** transactions, care logs, provider activity, and interoperability;
* **Love Ledger Narrative Feed:** qualitative and voluntary relational evidence.

Operational activity may be displayed alongside LMCI-M but must not be silently incorporated into it.

---

## 9.2 “Real-time” LMCI ambiguity

AUBI refers to real-time LMCI-M feeding governance.

Its stated sources include:

* annual stratified surveys;
* longitudinal knowledge transmission;
* ecological monitoring;
* multigenerational observation.

### Audit verdict

The architecture conflates:

* real-time operational telemetry;
* nowcasting;
* annual population measurement;
* slow structural observation.

### Required amendment

Replace “real-time LMCI-M” with a multi-timescale signal architecture.

---

## 9.3 Local-to-global translation

Nested Economies gives BAZs local operational authority while the SRC sets global standards.

The ICTL then translates local value systems into common exchange rules.

### Audit finding

This interface is not merely financial. It is an epistemic compression layer.

The Observation Contract should therefore specify:

* what local information is transmitted;
* what is aggregated;
* what is discarded;
* what remains locally sovereign;
* whether dissent and uncertainty accompany the aggregate;
* whether BAZs can inspect the transformation;
* whether a local interpretation can coexist with a global translation.

---

## 9.4 Community Weaver dependence

Community Weavers are simultaneously expected to:

* train users;
* assist providers;
* validate contributions;
* observe cultural adaptation;
* report velocity;
* detect stress;
* facilitate engagement;
* mediate concerns;
* bridge local and global governance.

### Audit verdict

**Key-person and correlated-observer risk.**

If one role generates, validates, interprets, and escalates multiple signals, nominally plural channels may share a common source of bias.

The framework includes community evaluation of Weavers, but the observation-channel dependence itself is not audited.

---

## 9.5 Version and terminology traceability

The supplied AUBI document is titled v2.4, while several internal passages and companion frameworks refer to AUBI v5.0.

This does not by itself create an observability failure, but it creates a **decision provenance risk**:

* Which definition governed a past decision?
* Which LMCI architecture was active?
* Which threshold or appeal process applied?
* Can a decision be reconstructed from the version in force?

### Required amendment

Every decision record should include immutable framework and protocol version identifiers.

---

# 10. Main findings

## Finding 1: Sensor-rich, estimator-thin

AUBI has numerous observation channels but rarely specifies the estimator that combines them.

**Status:** Critical.

---

## Finding 2: False identifiability is the central risk

Velocity, redemption, LMCI movement, enrolment, participation, fraud anomalies, and complaint counts can each be generated by multiple underlying states.

**Status:** Critical.

---

## Finding 3: The LMCI-M/LMCI-A separation is a major architectural strength

This is the clearest observability-aware feature in the framework.

**Status:** Green.

---

## Finding 4: Cross-framework references threaten to blur the LMCI separation

Operational activity, Love Ledger records, and LMCI are not consistently distinguished across the supplied documents.

**Status:** Amber-red.

---

## Finding 5: Layer 3 is the largest direct observability gap

Layer 3 makes consequential distributive and potentially punitive decisions without a specified observation architecture.

**Status:** Red.

---

## Finding 6: Time is not adequately represented

The framework mixes:

* real-time transactions;
* monthly velocity;
* quarterly adjustments;
* annual surveys;
* multi-year social change;
* decadal ecological change.

It protects slow ecological variables institutionally but does not provide one coherent temporal state-estimation architecture.

**Status:** Amber-red.

---

## Finding 7: The framework sees participants better than non-participants

Enrollment, transactions, provider activity, and Love Ledger records observe people already coupled to the system.

Those who are:

* isolated;
* distrustful;
* undocumented;
* digitally excluded;
* politically afraid;
* culturally opposed;
* too burdened to enrol

remain harder to observe.

**Status:** Red.

---

## Finding 8: Formalization improves auditability but creates visibility bias

Layer 2’s exclusive reliance on chartered Community Providers protects against unverifiable claims, but privileges formalized contribution.

**Status:** Amber.

---

## Finding 9: Protected unobservability is a genuine strength

Layer 0 does not merely await improved measurement. It constitutionally limits monetization and optimization.

**Status:** Protected.

---

## Finding 10: Protected unobservability must not become protected neglect

The system still needs to observe whether people engaged in non-monetized care require support.

**Status:** Amber-red.

---

## Finding 11: Structural challenge rights are stronger than individual challenge rights

BAZs can object to ICTL changes, petition for structural review, and trigger reclassification. Individual claimants’ rights to inspect, correct, and appeal evidence used in allocation decisions are less explicit.

**Status:** Amber-red.

---

## Finding 12: Community Weavers are an epistemic bottleneck

They are essential translators but may become overburdened, locally captured, culturally homogeneous, or structurally indispensable.

**Status:** Amber.

---

## Finding 13: Thresholds are often treated as diagnoses

Examples include velocity, fraud, inflation, reserve, participation, and adoption thresholds.

Thresholds can authorize precautionary action, but they should not silently determine the causal explanation.

**Status:** Amber-red.

---

## Finding 14: Administrative capacity is insufficiently observed

The framework monitors transaction overload and some validation backlogs, but less clearly observes:

* Weaver workload;
* claimant waiting times;
* appeal backlog;
* provider-chartering delays;
* audit capacity;
* local tribunal capacity;
* staff turnover;
* translation failures;
* data-reconciliation failures.

**Status:** Amber-red.

---

## Finding 15: Outcome attribution remains weak

External metrics such as biodiversity, Gini reduction, healthspan, and LMCI improve outcome visibility but do not establish that AUBI caused the observed change.

**Status:** Amber.

---

# 11. Required architectural amendments

## Amendment A: Observation Contract

Every consequential decision class should have a published Observation Contract.

### Required fields

1. **Decision ID**
2. **Authorized decision-maker**
3. **Decision purpose**
4. **Latent state to be inferred**
5. **Raw observation channels**
6. **Observer and data owner**
7. **Information admissibility**
8. **Sampling or collection method**
9. **Update cadence**
10. **Expected latency**
11. **Known missingness**
12. **Known source dependence**
13. **Estimator or interpretive procedure**
14. **Alternative state hypotheses**
15. **Uncertainty representation**
16. **Disagreement representation**
17. **Decision threshold or rule**
18. **Authorized action range**
19. **Challenge and correction rights**
20. **Privacy and sovereignty restrictions**
21. **Outcome measure**
22. **Review or sunset date**
23. **Protocol version**

The contract should state when the system is permitted to conclude:

> **State unresolved—no diagnosis yet.**

---

## Amendment B: State Estimate Record

Every significant adaptive or individual allocation decision should generate a State Estimate Record.

### Template

**Decision:**
**As-of date:**
**Framework versions:**
**Estimated state:**
**Alternative hypotheses:**
**Evidence supporting the estimate:**
**Evidence against the estimate:**
**Data gaps:**
**Source dependencies:**
**Confidence:**
**Observer disagreement:**
**Affected parties’ account:**
**Selected action:**
**Why this action remains acceptable under uncertainty:**
**Expected outcome:**
**Reassessment date:**
**Reversal condition:**

This record should be available in both technical and plain-language form.

---

## Amendment C: Multi-timescale LMCI

LMCI-M should be split into four products.

### 1. Operational pulse

Frequent, provisional indicators such as:

* crisis distress;
* service interruption;
* rapid social isolation signals;
* ecological alerts.

This is not LMCI-M proper and should not be presented as a flourishing estimate.

### 2. Quarterly nowcast

A model-based provisional estimate using available high-frequency signals, clearly marked as uncertain and revisable.

### 3. Annual LMCI-M estimate

The primary population-level estimate using independent survey, cultural, relational, and ecological sources.

### 4. Slow-variable register

Long-horizon ecological and cultural observations that may not yet support a scalar trend but require governance attention.

No single aggregate should erase divergence among these timescales.

---

## Amendment D: Layer 3 Needs and Equity Observation Protocol

Layer 3 should be divided into separate claim classes.

### D1. Disability and health need

Possible evidence:

* self-report;
* trusted community attestation;
* functional-impact description;
* professional evidence where available;
* assistive-cost evidence;
* periodic claimant-controlled review.

Medical diagnosis should not be the sole admissible evidence.

### D2. Caregiving burden

Observe:

* time burden;
* opportunity cost;
* sleep and health effects;
* number and intensity of dependants;
* available respite;
* voluntariness;
* household resource access.

### D3. Geographic disadvantage

Observe:

* actual local costs;
* travel time;
* service availability;
* infrastructure;
* climate exposure;
* remoteness;
* supply volatility.

### D4. Displacement and mobility

Use portable entitlement and claimant-controlled identity, not a portable “LMCI score.”

### D5. Collective reparations

Require:

* recognized harmed community;
* documented historical and continuing harm;
* community-defined repair priorities;
* governance and consent;
* long-term evaluation;
* protection against individualizing collective harm.

### D6. Negative adjustments

Require:

* high evidentiary threshold;
* clear attribution;
* proportionality;
* notice;
* access to evidence;
* representation;
* appeal;
* time limit;
* restoration pathway.

---

## Amendment E: Exclusion and Missing-Population Sentinel

The sentinel should not depend solely on administrative enrolment data.

### Required channels

* independent community organizations;
* anonymous surveys;
* demographic discrepancy estimates;
* mobile and offline access audits;
* language-access testing;
* disability-access testing;
* reasons-for-non-participation research;
* privacy-preserving estimates;
* reports from nomadic, displaced, and stateless communities;
* independent mystery-user tests.

Its purpose is to observe the boundary of the system, not merely activity inside it.

---

## Amendment F: Low Hearts Velocity Diagnostic

Before changing issuance, demurrage, provider recruitment, or the fiat/Hearts ratio, the diagnostic should test at least:

* provider diversity;
* provider capacity;
* geographic access;
* service quality;
* concentration;
* failed transactions;
* user trust;
* technology access;
* fiat-only essential burden;
* seasonal variation;
* household liquidity;
* informal substitution;
* recording failure.

The output should classify the leading hypothesis and preserve unresolved alternatives.

---

## Amendment G: Informal Care Burden Sentinel

This mechanism should:

* remain separate from LMCI-A;
* remain non-monetized;
* never convert Gratitude Tokens into entitlement;
* allow carers to request support;
* detect exhaustion, coercion, and material burden;
* support Layer 3 assessment without rating the moral worth of care;
* permit anonymous or community-supported access;
* protect family and spiritual sovereignty.

---

## Amendment H: Observation Independence Map

The framework should publish which channels share:

* the same data;
* the same observer;
* the same funding;
* the same algorithm;
* the same governance body;
* the same incentives;
* the same technical infrastructure.

Nominally distinct channels should not be treated as independent evidence when they have a common source.

This is particularly important for Community Weaver observations, Love Ledger records, provider logs, and BAZ reports.

---

## Amendment I: Uncertainty and disagreement display

Dashboards should avoid single-value certainty where the evidence does not support it.

They should display:

* ranges;
* confidence;
* missingness;
* subgroup divergence;
* data age;
* source disagreement;
* unresolved alternative explanations;
* methodological changes;
* dissenting interpretation.

A decision-maker should not be able to remove uncertainty merely by compressing the display.

---

## Amendment J: Individual epistemic rights

Every person affected by allocation, validation, fraud, identity, or negative-adjustment decisions should have rights to:

1. know that a decision is being made;
2. inspect the evidence used;
3. know which protocol and version apply;
4. correct factual errors;
5. submit contextual evidence;
6. challenge algorithmic interpretation;
7. receive a plain-language rationale;
8. obtain human review;
9. appeal;
10. request deletion or correction where compatible with audit obligations;
11. know when the decision will be reassessed.

These rights should not require staking Hearts or advanced digital access.

---

## Amendment K: Administrative capacity dashboard

Track:

* Community Weaver caseload;
* claimant waiting time;
* validation backlog;
* appeal backlog;
* tribunal delay;
* provider-chartering delay;
* percentage of cases receiving human review;
* translation availability;
* offline-access success;
* audit completion;
* staff turnover;
* unresolved data conflicts;
* false-positive fraud investigations;
* participant time burden.

Administrative overload should be treated as a system state, not an inconvenience.

---

## Amendment L: Sensor-change governance

Changes to observation methods can be as consequential as changes to payout formulas.

The following should qualify as structural changes:

* changing LMCI survey instruments;
* removing an ecological indicator;
* changing sampling frames;
* replacing human validation with AI;
* redefining active participation;
* changing fraud-detection models;
* changing who counts as a valid knowledge holder;
* changing dashboard aggregation;
* altering missing-data treatment.

Sensor architecture determines what the system can see and therefore what it can govern.

---

# 12. Minimum viable observability stack

The observability architecture should scale with implementation rather than appear fully formed.

## Stage 1: Convening Circle

Required:

* simple exchange ledger;
* dispute log;
* unmet-need log;
* reasons exchanges fail;
* participant and non-participant reflections;
* no LMCI-A scoring;
* no claim of representative community outcomes.

## Stage 2: Proto-Treasury

Add:

* reserve and issuance records;
* failed and declined transactions;
* provider-capacity records;
* basic access audit;
* concentration measures;
* reasons for redemption;
* privacy and correction process.

## Stage 3: Provider Network Expansion

Add:

* Low Hearts Velocity Diagnostic;
* provider quality and waiting times;
* Community Weaver workload;
* informal care burden sentinel;
* exclusion sentinel;
* validation appeals;
* independent operational audit.

## Stage 4: BAZ formalization

Add:

* independent LMCI-M;
* State Estimate Records;
* full Observation Contracts;
* cross-framework data contracts;
* uncertainty-aware dashboard;
* observer-independence audit;
* administrative capacity dashboard;
* BAZ objection and sensor-change rights;
* public failure reporting.

The framework already advises against deploying LMCI dashboards or cryptographic infrastructure before sufficient operational maturity. The same sequencing principle should govern epistemic infrastructure.

---

# 13. Pilot validation programme

The audit does not recommend simply adding more sensors. Additional sensing may create:

* surveillance;
* administrative burden;
* strategic adaptation;
* cultural harm;
* correlated errors;
* longer decision delays;
* false confidence;
* new capture points.

Each proposed sensor should therefore pass a value-of-information test.

## 13.1 Required comparisons

For a bounded pilot decision, compare:

### Condition A: Enriched-state benchmark

Use the richest retrospectively available evidence to approximate the underlying state.

This is not assumed to be perfectly true. It is the best available audit benchmark.

### Condition B: Actual dashboard

Make the decision using only the signals currently specified by the framework.

### Condition C: Estimator-assisted dashboard

Use the same raw signals but add an explicit causal and uncertainty-aware estimator.

### Condition D: Added sensing, fixed policy

Add the proposed observation channel without changing the decision rule.

This tests whether the sensor itself improves state identification.

### Condition E: Jointly tuned sensor and policy

Allow both sensing and decision rule to adapt.

### Condition F: Retuned policy without added sensing

Improve the decision rule using the existing information.

This is necessary to determine whether a new sensor adds value beyond better use of current data.

## 13.2 Required costs and failure conditions

Measure:

* financial cost;
* administrative time;
* participant burden;
* privacy burden;
* decision latency;
* correlated error;
* strategic manipulation;
* model mismatch;
* subgroup harm;
* observer capture;
* false-positive and false-negative rates;
* reversal frequency;
* whether policy ranking changes.

## 13.3 Transfer questions

A sensor or estimator should earn architectural weight only if:

1. the current decision depends on materially unavailable information;
2. better state estimation changes the selected action or policy ranking;
3. the benefit remains after comparison with a retuned no-new-sensor policy.

---

# 14. Prioritized patch list

## P0 — Required before consequential piloting

1. Layer 3 Needs and Equity Observation Protocol
2. Individual evidence-correction and appeal rights
3. Explicit LMCI-M/LMCI-A/operational-dashboard interface separation
4. Multi-timescale LMCI terminology
5. Low Hearts Velocity Diagnostic
6. Missing-Population Sentinel
7. State Estimate Record for consequential adaptive decisions
8. Rule that anomaly detection cannot itself establish fraud
9. Administrative capacity monitoring
10. Protocol-version traceability

## P1 — Required before Stage 4 formalization

1. Full Observation Contracts
2. Observation Independence Map
3. Informal Care Burden Sentinel
4. Uncertainty-aware dashboards
5. Sensor-change governance
6. Cross-framework data provenance contracts
7. Ecological Evidence Bundle
8. Local counter-model and dissent submission rights
9. Silent-capture and institutional-quietness audits

## P2 — Research and later refinement

1. Value-of-information experiments
2. Causal attribution of LMCI change
3. Cross-BAZ estimator transfer
4. Sensor portfolio optimization
5. Privacy-preserving missing-population estimation
6. Longitudinal study of monetization and relational displacement
7. Comparative study of human, community, and algorithmic validation
8. Formal observability analysis of simplified AUBI stock-flow or agent-based models

---

# 15. Audit verdict by dimension

| Dimension                            | Verdict               | Rationale                                                                      |
| ------------------------------------ | --------------------- | ------------------------------------------------------------------------------ |
| Observation-channel diversity        | **Green**             | Financial, social, ecological, cultural, local, and adversarial channels exist |
| LMCI incentive/evaluation separation | **Green**             | Explicitly and correctly separated in AUBI                                     |
| Slow-variable protection             | **Green**             | LEKH quorum gives slow knowledge formal standing                               |
| Protected unobservability            | **Green/Protected**   | Layer 0 and sacredness firewalls are explicit                                  |
| Financial telemetry                  | **Green-amber**       | Broad signals, limited causal specificity                                      |
| Implementation staging               | **Green**             | Explicit entry, exit, fallback, and degradation rules                          |
| Estimation architecture              | **Red**               | Mostly implicit                                                                |
| Uncertainty representation           | **Red**               | Rarely carried into decisions                                                  |
| Layer 3 observability                | **Red**               | Consequential but largely unspecified                                          |
| Exclusion observability              | **Red**               | Participants are more visible than missing populations                         |
| Temporal coherence                   | **Amber-red**         | Real-time, annual, and slow signals are conflated                              |
| Cross-framework data contracts       | **Amber-red**         | LMCI and Love Ledger interfaces are ambiguous                                  |
| Structural contestability            | **Green-amber**       | Stronger for BAZs and institutions                                             |
| Individual contestability            | **Amber-red**         | Correction and appeal rights need explicit specification                       |
| Administrative capacity sensing      | **Amber-red**         | Some overload metrics, no comprehensive capacity state                         |
| Observation independence             | **Amber-red**         | Multiple channels may share Weaver, platform, or governance dependence         |
| Outcome attribution                  | **Amber**             | External outcomes exist, causal attribution remains weak                       |
| Overall pilot readiness              | **Conditional amber** | Promising architecture, P0 patches required                                    |

---

# 16. Final assessment

The audit does not find that AUBI assumes omniscience.

On the contrary, the framework repeatedly acknowledges:

* plural perspectives;
* local knowledge;
* slow variables;
* adversarial adaptation;
* sacredness boundaries;
* cultural sovereignty;
* failure;
* drift;
* the danger of circular measurement.

That makes AUBI a stronger starting point for observability-aware governance than a conventional dashboard-led social policy.

The remaining problem is subtler.

AUBI has built many of the institutions that can observe. It has not yet fully specified the institutional practice of **forming warranted, revisable beliefs from what they observe**.

Its next architectural layer should therefore not be a larger dashboard.

It should be an **epistemic operating protocol** that requires every consequential decision to state:

* what underlying condition it is trying to infer;
* which observations support that inference;
* what other conditions could explain the same evidence;
* how uncertain the inference remains;
* whose knowledge was excluded or preserved;
* who may challenge the interpretation;
* what evidence would reverse the decision;
* how the system will learn whether its action addressed the state rather than merely moving the indicator.

With that layer added, observability would cease to mean “the system has data.”

It would mean:

> **The system knows what it can infer, what it cannot yet distinguish, who has standing to contest its view, and when uncertainty requires restraint rather than optimization.**

