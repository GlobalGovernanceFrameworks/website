---
title: Governance Method, Experiment, Adoption, and Implementation Authority Interface Specification
version: 0.2.1
specification_id: GMEAIA/0.2.1
status: coherence-patched-draft-successor
date: 2026-08-05
constitutional_interface: Constitutional Interface Specification v0.2.1
---

# Governance Method, Experiment, Adoption, and Implementation Authority Interface Specification v0.2.1

## A shared lifecycle grammar for methods, experiments, authority, response, implementation, learning, and closure

**Specification ID:** `GMEAIA/0.2.1`  
**Status:** Coherence-patched draft successor to `GMEAIA/0.1` for adversarial review and stack migration  
**Legal character:** Record, interoperability, and lifecycle specification; not a source of jurisdiction, consent, public office, funding, emergency command, adjudication, or coercive authority  
**Constitutional dependency:** Constitutional Interface Specification v0.2.1  
**Compatibility:** Preserves v0.1 identifiers and common-header fields; semantic migration and regenerated machine-readable companions are required before adoption

> **Methods structure how authority is exercised. They do not create the authority.**
>
> **Retained jurisdiction does not excuse unrecorded omission. Conformance does not establish success.**

## Version history

- **0.2.1 (2026-08-05):** Coherence patch. Renamed consequence profiles to `CP0`–`CP3`; separated capacity limitation from constitutional absence; normalized handoff states; made response-duty and clock sources explicit; adopted core-plus-trigger proportional profiles; restored normative language, source lineage, migration status, and the protected-domain catalogue; typed jointly constituted authority; clarified framework-falsification scope; and made GMEAIA the sole operational source for response fields and lifecycle states.
- **0.2 (2026-08-05):** Recursive systems-audit successor. Integrated causal responsibility, response/refusal/omission states, constitutional-gap handling, common-mode dependence, objective-reproduction review, consequence-scaled record profiles, administrative-burden limits, causally adequate pilots, support-withdrawal durability, compatibility-power review, and framework-level falsification. No new record IDs or universal header fields were added.
- **0.1 (2026-08-02):** First reconciled specification, assembled from the sixty record classes already asserted by EGP, IAF, IMT, IRF, and WDIP companions. Established authority-effect labels, protected domains, fail-closed lifecycle states, recipient acceptance, correction, remedy, closure, and the forty-eight-field common header.

## Normative language

- **SHALL / MUST** indicates a required conformance condition.
- **SHALL NOT / MUST NOT** indicates a prohibited condition.
- **SHOULD** indicates a strong presumption that may be departed from only with recorded reasons.
- **MAY** indicates a permitted option.

## Source lineage and dependency freeze

| Source or dependency | File | SHA-256 or status |
|---|---|---|
| Immediate draft predecessor | `governance-method-experiment-adoption-implementation-authority-interface-specification-v0.2.md` | `d16969e55d32214e605b1c0b273675f9f0b84dcee462604c2e626b477504e947` |
| Normative lineage source | `governance-method-experiment-adoption-implementation-authority-interface-specification-v0.1.md` | `1f2ed4646e552373c15a6a5bc57e0b5f03a30dff84579d293316b9deb3c96b79` |
| Constitutional dependency | `constitutional-interface-specification-v0.2.1.md` | `2ab06be70d568be82efde2ccbcc3f8df48f37308fab3ccf116ac3efe4c167bfc` |
| Emergency interface | `emergency-catastrophic-risk-continuity-interface-specification-v0.1.md` | `c673742b1317c7169d4b8226118478c990e9a3d05084b2dc5ac9ad2f1971163c` |
| Security and coercion interface | `security-coercion-protective-action-interface-specification-v0.1.md` | `b8f1dd0f676044542a23184f52200e50b106a798545c7c57119ded2c439b6299` |
| Commons, ecological rights, guardianship, title, and resource interface | `commons-ecological-rights-guardianship-title-resource-authority-interface-specification-v0.1.md` | `3c45e37c834c727471657fc91149edbe3011137562c2dd73e54b20226c92589b` |
| Cross-domain emergency transport | `CDEE/0.1` | exact dependency remains governed by the adopting release registry |
| Audit synthesis | *Cross-Framework Systems Audit Synthesis v0.1* | working source; checksum not yet frozen |

## Migration status

`GMEAIA/0.2.1` preserves v0.1 record identifiers, action classes, authority-effect labels, and the forty-eight-field common header. It is **identifier-compatible but semantically migration-requiring**. Existing v0.1 JSON, JSON Schema, examples, validation outputs, manifests, and `IAEG-CLUSTER/0.1` registries remain pinned to `GMEAIA/0.1` until regenerated, tested, and separately adopted for v0.2.1.

---

# 1. Purpose, scope, and constitutional position

`GMEAIA/0.2.1` supplies a common type system for governance records that move from signal to proposal, consent, authority, activation, implementation, review, scaling, remedy, and closure.

It exists to prevent recurring category errors:

- an observation becoming a finding;
- a method becoming a mandate;
- an adoption claim becoming activation;
- funding becoming permission;
- a metric becoming judgment;
- a pilot becoming jurisdiction;
- a handoff becoming silent responsibility transfer;
- a valid authority retaining jurisdiction while its delay or refusal disappears;
- conformance becoming evidence of effectiveness.

The specification does not decide substantive questions. It records the authority, evidence, responsibility, clocks, limits, and lifecycle states through which a competent institution decides them.

## 1.1 What v0.2 changes

The v0.1 architecture already separated method from authority. The comparative audit showed four additional shared needs:

1. **Causal responsibility:** identify who controls the variables generating the condition, not only who administers its consequences.
2. **Response and omission:** record acceptance, refusal, delay, timeout, escalation, and constitutional gaps without automatic transfer of jurisdiction.
3. **Independence and objective reproduction:** test common-mode dependencies and the incentives that cause institutional behavior to return after reform.
4. **Proportionality and falsification:** match record depth to consequence and require frameworks to risk their own narrowing or replacement.

These functions are integrated into existing records rather than added as new classes.

## 1.2 Non-authority and non-certification

Schema validation, cryptographic proof, exact versioning, complete records, software capability, successful tests, conformance certification, or inclusion in a GGF registry does not establish lawful authority, factual accuracy, legitimate representation, consent, effectiveness, or justice.

---

# 2. Definitions

**activation.** The distinct act that starts an already authorized action and begins operational, review, response, and expiry clocks.

**adoption claim.** A statement that an entity has accepted or intends to implement a proposal; its effect depends on separately recorded authority.

**administrative capacity.** The ability to administer a process, service, or mitigation. It is not necessarily control over the condition’s causes.

**authority envelope.** Linked records establishing consent, authority, jurisdiction, causal responsibility, scope, protected rights, trial conditions, activation, review, exit, remedy, and closure.

**causal control.** Legal or practical capacity to alter a variable materially contributing to the condition at issue.

**capacity gap.** A condition in which an authority possesses relevant jurisdiction or duty but lacks sufficient practical capacity, resources, infrastructure, or access to discharge it fully.

**causally adequate pilot.** A pilot no larger than necessary for safety and no smaller than necessary to expose the mechanism it claims to test.

**common-mode dependency.** A shared data, model, AI, funder, platform, infrastructure, method, appointment authority, professional network, or ontology capable of biasing or disabling several nominally distinct channels at once.

**consequence profile.** A `CP0`–`CP3` proportional record profile selected according to reversibility, rights, coercion, service effects, affected outsiders, ecological irreversibility, data sensitivity, duration, and scale.

**constitutional gap.** A consequential condition for which no identified authority possesses sufficient lawful jurisdiction. Practical incapacity within an otherwise valid jurisdiction is a capacity gap, not a constitutional gap.

**consequential action.** An action capable of materially affecting rights, duties, services, money, assets, status, safety, public institutions, protected knowledge, ecosystems, or nonparticipants.

**objective reproduction.** The budget, appointment, promotion, discipline, prestige, blame, survival, professional, and continuation pressures likely to regenerate characteristic institutional behavior.

**omission.** A consequential failure to accept, refuse, defer, refer, or act within a defined responsibility and response clock. The term does not by itself establish illegality or liability.

**protected domain.** A domain in which ordinary experimentation is insufficient and a specialized authority interface is required.

## 2.1 Protected-domain catalogue

Ordinary trial authorization cannot by itself cover:

- detention, policing, search, seizure, restraint, force, or sanctions;
- borders, migration status, deportation, asylum, or movement restrictions;
- withdrawal or material restriction of essential services;
- taxation, forfeiture, compulsory levies, or benefit withdrawal;
- title, tenure, land, housing, guardianship, or custody transfer;
- child protection, child guardianship, or decisions materially affecting children’s legal status;
- irreversible or high-risk ecological intervention;
- high-risk technology, critical infrastructure, or safety-critical automation;
- adjudication, binding findings of guilt, liability, or legal status;
- emergency declaration, command, requisition, or extraordinary powers.

The catalogue is non-exhaustive where a controlling constitutional or domain interface identifies additional protected matters. `GMEAIA-56` and `GMEAIA-57` route such actions; they do not supply the underlying authority.

**response clock.** A decision-appropriate deadline for acknowledgment, acceptance, refusal, referral, action, review, or escalation.

**retained jurisdiction.** Authority that remains with an institution despite coordination, review, or referral. It may carry a separately constituted duty to respond.

---

# 3. Constitutional doctrines

## 3.1 Method–authority separation

Methods, tools, facilitation, ethics review, cultural adaptation, AI, scores, dashboards, funding, signatures, and technical capabilities cannot create powers their users do not independently possess.

## 3.2 Decision-chain separation

Observation, validation, proposal, consent, authorization, activation, execution, evaluation, adjudication, remedy, and closure remain distinct records and effects.

## 3.3 Causal responsibility

Responsibility allocation should follow lawful jurisdiction, causal control, practical capacity, and accompanying resources. Affected-party standing determines participation, evidence, consent where applicable, challenge, and remedy; it does not itself assign responsibility. The location where consequences appear does not alone determine responsibility.

## 3.4 Duty attached to retained jurisdiction

Every consequential referral shall disclose whether a response duty exists, its source, and its effect. Where law, treaty, charter, compact, contract, valid internal rule, or voluntary commitment establishes that duty, the competent authority shall acknowledge and accept, refuse, defer, or refer the request within a decision-appropriate period. Delay does not create authority transfer, but it does not erase responsibility for avoidable non-action.

## 3.5 Constitutional gaps

If no competent authority exists, the record state is `constitutional_gap`. The matter is routed toward a lawful constituting process. The interface does not fill the gap itself.

## 3.6 Proportionality

Record depth scales with consequence. Low-risk voluntary activity shall not require closure-grade process. High-risk action cannot avoid safeguards because it is technically simple or popular.

## 3.7 Conformance is not success

A valid record proves only that required distinctions were represented. Independent outcomes, causal assessment, and affected-party evidence determine whether the action worked.

## 3.8 No automatic consequence from metrics

Indicators may trigger inquiry, review, or a pre-authorized reversible safe state. They do not independently activate, fund, scale, punish, transfer authority, dissolve institutions, or renew power.

## 3.9 Protected continuity and unresolved duties

Expiry ends temporary power, not wages, debts, pensions, rights, remedies, records duties, essential services, restoration, or unresolved claims.

## 3.10 Framework-level falsification

Every operational framework or tool core shall state its theory of change, disconfirming evidence, and conditions for narrowing, suspension, replacement, deprecation, or non-scaling.

---

# 4. Action classes

- **`A01` — Sense and observation:** Signals, observations, complaints, opportunities, alerts, and preliminary claims.
- **`A02` — Validation and jurisdictional triage:** Provenance checks, uncertainty, severity, response clocks, routing, referral, and omission states.
- **`A03` — Proposal and alternative formation:** Candidate responses, causal mechanisms, alternatives, reversibility, resources, and expected effects.
- **`A04` — Method selection and deliberation:** Choice and adaptation of deliberative, epistemic, ethical, cultural, technical, or facilitation methods.
- **`A05` — Affected-party authority, consent, refusal, and representation:** Who is affected, who may decide, who must consent, who may refuse, and who may represent whom.
- **`A06` — Authority verification and protected-domain classification:** Legal source, causal responsibility, jurisdiction, exact power, limits, activation state, and specialized routes.
- **`A07` — Trial authorization and adoption registration:** Lawful permission for bounded trials and registration of adoption claims.
- **`A08` — Operational activation and implementation:** The distinct act that begins operations, assigns operators, releases resources, and starts clocks.
- **`A09` — Monitoring, evidence, review, and challenge:** Baselines, metrics, observations, causal assessment, complaints, interim relief, and corrections.
- **`A10` — Amendment, pause, renewal, rollback, and scaling:** Change control without silent expansion, including transition readiness and new-jurisdiction authorization.
- **`A11` — Expiry, termination, closure, remedy, and authority return:** Ending power, restoring arrangements, preserving duties, disposing data, and compensating harm.
- **`A12` — Readiness, ethics, epistemic, and institutional assessment:** Advisory assessments exposing risk, common-mode dependence, and missing conditions without hidden vetoes.
- **`A13` — Facilitators, auditors, catalyst teams, and technical services:** Qualifications, mandates, conflicts, incentives, complaints, liability, and non-monopoly rules.
- **`A14` — Funding, procurement, participation support, and incentives:** Financial authority, independent support, contracts, continuation incentives, essential continuity, and appeals.
- **`A15` — Institutional regeneration, charter change, and dissolution:** Mandate, objective reproduction, governance redesign, continuity, succession, and unresolved duties.
- **`A16` — Data, identity, automation, publication, archives, and tool stewardship:** Protected data, AI limits, versioning, compatibility power, forks, learning libraries, and deletion.
- **`A17` — Emergency, urgent, protected-domain, and coercive handoffs:** CDEE/ECRC referrals, protected-domain exceptions, SCPA execution, and domain-specific interfaces.
- **`A18` — Non-activation, conformance, proportionality, and interoperability:** Fail-closed pilots, authority-effect labels, consequence profiles, handoff acceptance, compatibility, and release controls.

---

# 5. Authority-effect, normative-force, and handoff states

## 5.1 Authority-effect labels

| Label | Meaning |
|---|---|
| `none` | Educational, expressive, simulated, or descriptive; creates no procedural or legal effect. |
| `advisory` | Offers analysis or recommendations; a response duty exists only where a valid rule or charter establishes it. |
| `procedural_support` | Structures participation or records a process; does not decide the substantive issue. |
| `evidentiary` | May be considered as evidence for a stated purpose; does not establish liability, consent, or authority. |
| `consent_evidence` | Records a valid holder’s decision within its exact scope; does not create jurisdiction or waive others’ rights. |
| `authority_reference` | Points to an independently valid authority record; does not itself grant power. |
| `authorizing` | A decision by a competent authority under an exact legal source. |
| `activating` | Starts an already authorized action and its clocks. |
| `executing` | Carries out a separately authorized operation within defined limits. |
| `closing` | Terminates power, returns authority and assets, disposes data, and preserves unresolved duties. |

## 5.2 Normative-force and lifecycle states

Records shall distinguish at minimum:

`draft`, `asserted`, `received`, `validated_for_purpose`, `referred`, `proposed`, `under_deliberation`, `consent_pending`, `authority_pending`, `authorized`, `registered`, `activated`, `paused`, `suspended`, `expired`, `terminated`, `closed`, `corrected`, `superseded`, `rejected`, `unresolved`, and `non_activated`.

## 5.3 Handoff states

Consequential handoffs additionally distinguish the exact controlled values:

`offered`, `acknowledged`, `accepted`, `partially_accepted`, `capacity_limited`, `refused`, `deferred`, `referred`, `timed_out`, `misrouted`, `constitutional_gap`, `returned`, and `closed`.

`capacity_limited` means that the recipient recognizes relevant jurisdiction or duty but cannot presently discharge it fully. `constitutional_gap` means that no identified authority possesses sufficient lawful jurisdiction. Deliberate obstruction is a reviewed finding, not a raw transport state.

Silence is not acceptance. A timeout is not a substantive finding. A recipient’s refusal does not by itself discharge the sender’s continuing duties.

## 5.4 Fail-closed state

A consequential action remains `authority_pending` or `non_activated` when required authority, consent, protected-domain, activation, review, response, or remedy records are missing, expired, suspended, rejected, or unresolved beyond the permitted threshold.

Fail-closed behavior shall be proportionate. Missing fields for a low-risk non-consequential activity do not justify treating the activity as a protected-domain intervention.

---

# 6. Common record architecture

## 6.1 Forty-eight-field header retained

v0.2 does not enlarge the universal header. New audit functions live in record-specific content and linked profiles. This avoids imposing every possible field on every record.

## 6.2 Public and protected layers

Public metadata identifies the action, authority effect, status, general reasons, duration, response clocks, challenge, and closure. Protected annexes preserve personal, Indigenous, security, health, whistleblower, commercial, and legally sealed material.

## 6.3 Dependency graph and correction propagation

Systems preserve explicit links among source signals, proposals, consent, authority, causal responsibility, activation, implementation, review, handoffs, correction, remedy, and closure. A correction propagates to every dependent record.

## 6.4 Human accountability

Every consequential automated, organizational, or collective record names a human accountable officer or lawfully constituted body with a reachable complaint route.

## 6.5 Record reuse and administrative burden

A valid existing record may satisfy several profiles where its purpose, authority, scope, status, access, and lifecycle remain clear. Systems shall report estimated preparation, translation, legal, technical, participation, maintenance, and audit burden and who bears it.

## 6.6 Consequence-scaled profiles

The profile records required semantic functions, not necessarily separate forms. Valid records may be combined or reused where their authority, purpose, scope, access, status, challenge, and closure semantics remain clear.

### `CP0` — Exploratory and non-consequential

Examples: public education, optional brainstorming, non-operative drafting, simulation, or demonstration.

**Core:** one compact non-operative record identifying the method or artifact, responsible actor, authority effect, and non-activation status. Data and closure semantics are added where material.

`GMEAIA-58` is required only for an actual sandbox, prototype, simulation, demonstration, or non-production deployment—not for every educational or exploratory conversation.

### `CP1` — Voluntary bounded practice

Affects consenting participants within existing authority, without material effect on non-participants, essential services, employment, public funds, or protected domains.

**Core semantic functions:** actor and method; voluntary scope; consent, refusal, and withdrawal; implementation responsibility; stop and expiry; complaint and correction route.

Affected-party, accessibility, funding, vendor, data, AI, learning, and data-disposition records are added only when those functions are materially present.

### `CP2` — Operational or consequential action

May affect workload, services, public resources, institutional operations, affected outsiders, or material rights.

**Core semantic functions:** constituting authority; affected parties; causal responsibility; authorization and activation; implementation ownership and dependencies; monitoring and review; challenge and remedy; closure and unresolved-duty custody.

Funding, procurement, AI, data, cross-framework handoff, institutional transition, and other records are added only when triggered by the action.

### `CP3` — Protected-domain or constitutional action

`CP2` plus `GMEAIA-56` or `GMEAIA-57` and the controlling specialized interface. Ordinary GMEAIA conformance is never sufficient by itself.

### Profile location

Because the common header remains stable, the selected consequence profile shall be recorded in the relevant record-specific content:

- `GMEAIA-02` for a method, tool, protocol, or template;
- `GMEAIA-07` for an incoming condition and its response-time assessment;
- `GMEAIA-20` for a consequential action or authority decision;
- `GMEAIA-58` for a sandbox, prototype, simulation, or demonstration.

## 6.7 Framework falsification profile

Framework-level review is carried primarily by `GMEAIA-53`, supported by `30`, `32`, `43`, and `45`. It applies to frameworks and to long-lived, systemically central, or self-renewing mechanisms—not to every local action. It shall state:

- central theory of change;
- expected mechanism;
- disconfirming evidence;
- architecture-added latency and burden;
- dependency and common-mode risk;
- narrowing, suspension, replacement, and non-scaling conditions.

---

# 7. Lifecycle rules

## 7.1 Sensing and validation

Anyone permitted by the receiving system may submit a signal. The signal begins as an assertion. Validation is purpose-specific and does not establish jurisdiction, guilt, emergency status, or liability.

## 7.2 Routing, response, and omission

A validated matter may be referred to a candidate authority. The referral records the response-duty source and effect; acknowledgment and decision clocks; acceptance, refusal, capacity limitation, deferment, onward referral, or timeout; reasons, conflicts, expected harm during delay, sender and recipient duties, escalation, and jurisdictional status.

A consequential response clock shall cite a valid legal, treaty, charter, compact, contract, internal-rule, or voluntary-commitment deadline, a `GMEAIA-07` response-time assessment, or both. Where the lawful deadline exceeds the maximum tolerable delay, the record identifies interim protection and escalation without treating urgency as new jurisdiction.

Acceptance closes neither the action clock nor the omission question. Accepted responsibility remains linked to implementation, review, and performance clocks so that post-acceptance non-action remains visible.

## 7.3 Proposal and causal adequacy

A proposal identifies alternatives, rights effects, causal mechanism, controlled and uncontrolled variables, minimum causally adequate scope, and what the proposed action cannot establish.

## 7.4 Consent and authority

Consent, public-law authority, affected-nation authority, worker decisions, and participation remain distinct. Authority verification includes causal responsibility and protected-domain classification.

## 7.5 Authorization, adoption, and activation

A trial authorization permits a bounded action. Adoption records acceptance. Activation starts the action and its clocks. None substitutes for the others.

## 7.6 Implementation and handoffs

Implementation plans assign owners, handoff clocks, service boundaries, ordinary maintenance, and support-withdrawal durability. A failed handoff retains named custody.

## 7.7 Monitoring, correction, and remedy

Monitoring includes outcomes, distribution, latency, administrative burden, and common-mode failures. Thresholds trigger review, not automatic consequence. Harm and erroneous records remain remediable after termination.

## 7.8 Scaling and institutionalization

Scaling evidence states causal adequacy, contexts not tested, ordinary owner, budget, staffing, maintenance, and durability after exceptional support ends. Scaling and permanent enactment require new authority.

## 7.9 Expiry and closure

Temporary power expires. Continuing duties persist. Closure returns authority, assets, records, access, and unresolved duties to lawful custodians.

---

# 8. Canonical record catalogue

All sixty v0.1 identifiers are retained. Titles changed only where necessary to make the audit additions visible; downstream profiles may continue to use the original IDs during migration.

## GMEAIA-01 — Constituting Instrument, Legal Source, Jurisdiction, and Activation Status

**Action class:** `A06`  
**Purpose:** Identifies the presently valid source of authority for a consequential governance action.

**Required content:**
- constituting instrument and exact section;
- competent authority and office holder or body;
- territorial, personal, subject-matter, and temporal jurisdiction;
- exact power and prohibited uses;
- authority formation: `retained`, `delegated`, `transferred`, `concurrent`, `jointly_constituted`, or `absent`;
- for `jointly_constituted`: constituting parties, shared governance object, affected non-parties, compact or legal source, exit, and surviving duties;
- activation, ratification, delegation, and suspension status;
- review, expiry, amendment, and revocation route;
- conflicts with other law or authority;
- public reasons and protected annex;

**Prohibited inference:**
- A framework reference, policy goal, software token, vote, consensus, urgency, funding condition, or pilot success cannot substitute for this record.

**Lifecycle relation:** Required before trial authorization, activation, institutional change, funding condition, emergency action, or coercive handoff.

## GMEAIA-02 — Method, Tool, Protocol, Template, and Authority-Effect Classification

**Action class:** `A18`  
**Purpose:** Classifies an implementation instrument by what it can and cannot legally do.

**Required content:**
- tool or method identity and version;
- steward and authoritative source;
- intended purpose and users;
- authority-effect label;
- domains and contexts;
- required dependencies;
- known limitations and failure modes;
- deprecation and correction route;

**Prohibited inference:**
- A template does not create a council, office, court, consent, charter, benefit, emergency power, or enforcement authority.

**Lifecycle relation:** Must accompany every tool stack, resource card, method recommendation, and software module.

## GMEAIA-03 — Actor, Agent, Office, Representation, and Technical Capability Record

**Action class:** `A05`  
**Purpose:** Distinguishes identity, technical access, organizational role, public office, representation, and fiduciary standing.

**Required content:**
- actor identity and type;
- human, body, community, organization, AI, sensor, or service role;
- office or mandate source;
- representation constituency and selection;
- technical credentials and capability tokens;
- conflicts and recusal;
- contact and accountability route;
- expiry and succession;

**Prohibited inference:**
- A DID, UCAN, API key, signature, organizational title, community label, or facilitator certificate does not establish public office or authority to represent others.

**Lifecycle relation:** Links every action to a responsible actor and separately valid authority.

## GMEAIA-04 — Sense Signal, Complaint, Opportunity, and Asserted Scope Record

**Action class:** `A01`  
**Purpose:** Preserves what an agent reports without treating the report as verified fact.

**Required content:**
- signal identity and timestamp;
- reporting agent;
- plain-language claim;
- claimed location and scope;
- claimed affected parties;
- claimed severity and urgency;
- submitted evidence and source restrictions;
- requested response or no-response preference;

**Prohibited inference:**
- Severity, urgency, jurisdiction, causation, affected-party identity, and legal violation remain asserted until separately validated.

**Lifecycle relation:** May be created by any permitted agent; cannot directly activate a consequential action.

## GMEAIA-05 — Observation, Evidence, Provenance, and Protected-Source Record

**Action class:** `A01`  
**Purpose:** Records observations and supporting material with provenance, uncertainty, consent, and access controls.

**Required content:**
- observation method and instrument;
- time, place, sampling, and chain;
- source identity or protected-source class;
- data quality and uncertainty;
- consent and lawful basis;
- access, retention, and use restrictions;
- correction and contest status;
- hashes or locators without exposing protected payloads;

**Prohibited inference:**
- Cryptographic integrity proves that bytes are unchanged, not that the observation is true, lawful, representative, or admissible.

**Lifecycle relation:** Supports validation, assessment, investigation, or monitoring.

## GMEAIA-06 — Signal Validation, Corroboration, and Status Record

**Action class:** `A02`  
**Purpose:** Classifies a signal as unreviewed, partially corroborated, validated for a stated purpose, disputed, false, or unresolved.

**Required content:**
- validation authority and competence;
- methods and sources;
- independence and conflicts;
- claims tested and not tested;
- corroboration and contradiction;
- uncertainty and minority views;
- status and permitted downstream uses;
- recheck, correction, and expiry;

**Prohibited inference:**
- Validation for routing does not establish legal breach, emergency, liability, or authority to act.

**Lifecycle relation:** Required before consequential routing that relies on severity, urgency, or identity.

## GMEAIA-07 — Severity, Urgency, Reversibility, Uncertainty, and Response-Time Assessment

**Action class:** `A02`  
**Purpose:** Separates seriousness and time sensitivity from authority while determining whether the complete response loop is compatible with the condition.

**Required content:**
- harm dimensions and exposed populations;
- disturbance timescale and rate of change;
- reversibility, lock-in, and irreversibility horizon;
- confidence, uncertainty, and alternative explanations;
- distributional effects;
- least-harmful delay and action options;
- maximum tolerable sensing, decision, and action delay;
- coordination-added latency and review clock;

**Prohibited inference:**
- High severity, urgency, or a missed clock cannot create jurisdiction, emergency status, coercive power, or automatic authority transfer.

**Lifecycle relation:** Informs routing, proportional clocks, precautionary recommendations, and omission review.

## GMEAIA-08 — Jurisdictional Triage, Competent-Authority Referral, Response, and Acceptance

**Action class:** `A02`  
**Purpose:** Routes a validated matter without transferring power by silence and makes acceptance, refusal, delay, and constitutional gaps visible.

**Required content:**
- referring actor and source record;
- candidate authority and jurisdiction;
- issue and requested function;
- records and protected annex transmitted;
- basis for competence;
- response-duty source and effect: `legal`, `contractual`, `charter_internal`, `voluntary_commitment`, `advisory`, or `none`;
- acknowledgment-clock source and decision-clock source;
- `GMEAIA-07` response-time assessment reference where applicable;
- response state: `offered`, `acknowledged`, `accepted`, `partially_accepted`, `capacity_limited`, `refused`, `deferred`, `referred`, `timed_out`, `misrouted`, `constitutional_gap`, `returned`, or `closed`;
- reasons, conflicts, missing prerequisites, and expected harm during delay;
- provisional-safe-state record reference, which cannot be activated by referral alone;
- post-acceptance action-clock and review references;
- sender duty, recipient duty, custody, escalation, and jurisdictional or capacity status;

**Prohibited inference:**
- Referral, receipt, notification, silence, delay, or schema compatibility does not create acceptance, correctness, or transfer of authority.

**Lifecycle relation:** Must reach explicit acceptance before recipient action; unresolved, refused, and timed-out states retain named custody and escalation.

## GMEAIA-09 — Affected Persons, Communities, Nations, Outsiders, and Transboundary Effects Map

**Action class:** `A05`  
**Purpose:** Identifies who bears benefits, burdens, risks, data exposure, exclusion, or irreversible effects.

**Required content:**
- directly affected persons and groups;
- residents, users, workers, tenants, migrants, minorities, and dissenters;
- affected Indigenous nations;
- neighbouring and downstream communities;
- future and non-human interests where applicable;
- affected outsiders and non-members;
- burdens transferred and resources accompanying them;
- representation gaps, internal plurality, notice, participation, support, and remedy needs;

**Prohibited inference:**
- A majority, host institution, platform, geographic label, or community leadership cannot erase internal minorities or affected outsiders.

**Lifecycle relation:** Required before consent, trial authorization, scaling, responsibility transfer, or institutional redesign.

## GMEAIA-10 — Affected Indigenous Nation, Applicable Indigenous Law, and Protected-Knowledge Authority

**Action class:** `A05`  
**Purpose:** Records the specific affected nation or nations and their own authority, law, representatives, and knowledge controls.

**Required content:**
- nation or people as self-identified;
- territorial, relational, and subject-matter connection;
- recognized representatives and internal plurality;
- applicable Indigenous law and consent route;
- non-engagement, refusal, and withdrawal;
- sacred or restricted knowledge controls;
- benefit sharing and non-transfer;
- complaint and correction route;

**Prohibited inference:**
- A global Indigenous representative, retired framework, external elder, quota, facilitator, or advisory council cannot consent or speak for an affected nation.

**Lifecycle relation:** Controls affected-nation participation and protected knowledge across the lifecycle.

## GMEAIA-11 — Notice, Accessibility, Independent Advice, and Participation Support

**Action class:** `A05`  
**Purpose:** Ensures participation is informed, accessible, materially possible, and not dependent on adopting the proposed method.

**Required content:**
- notice content and languages;
- accessible, offline, oral, assisted, and disability formats;
- time and location;
- independent legal, technical, cultural, or financial advice;
- care, transport, connectivity, income, and safety support;
- anti-retaliation and anonymity options;
- records access and correction;
- non-participation and alternative routes;

**Prohibited inference:**
- Lack of digital access, literacy, identity documents, money, certified facilitators, or agreement with GGF methods cannot reduce standing.

**Lifecycle relation:** Required for consequential consent, deliberation, review, and remedy.

## GMEAIA-12 — Proposal Intake, Source Signal, Sponsor, and Status Record

**Action class:** `A03`  
**Purpose:** Records a proposed response without implying endorsement or authority.

**Required content:**
- proposal identity and sponsor;
- source signals and evidence;
- problem definition;
- intended beneficiaries and affected parties;
- requested authority and resources;
- status and normative force;
- conflicts and funding interests;
- withdrawal and correction route;

**Prohibited inference:**
- A proposal, algorithmic recommendation, community petition, facilitator recommendation, or council agenda item is not consent or authorization.

**Lifecycle relation:** Opens proposal development and deliberation.

## GMEAIA-13 — Proposal Objective, Alternatives, Rights Effects, Causal Mechanism, and Reversibility Record

**Action class:** `A03`  
**Purpose:** Makes the substantive choice, causal theory, and alternatives reviewable before method or authority decisions.

**Required content:**
- objectives, theory of change, and success conditions;
- causal mechanism and variables controlled by the proposer;
- action and non-action alternatives;
- rights and essential-service effects;
- distribution of benefits and burdens;
- minimum causally adequate scope;
- reversibility, rollback, and stranded commitments;
- resource, staffing, technology, and upstream dependencies;
- known unknowns, failure modes, and conclusions the proposal cannot establish;
- duration, review, exit, narrowing, and non-scaling conditions;

**Prohibited inference:**
- A good objective, reversible design, or small pilot does not supply authority or prove that the experiment can test the mechanism it claims.

**Lifecycle relation:** Required before deliberation and trial authorization.

## GMEAIA-14 — Method Selection, Cultural Adaptation, Autonomy Statement, and Authority Effect

**Action class:** `A04`  
**Purpose:** Records why a deliberative, assessment, technical, or implementation method was chosen and adapted.

**Required content:**
- method and version;
- decision owner and participants;
- selection rationale and alternatives;
- community-chosen adaptations;
- self-identification and internal plurality;
- authority-effect label;
- known biases, exclusions, and administrative burden;
- review, fork, and abandonment route;

**Prohibited inference:**
- Cultural adaptation cannot classify a community from outside, essentialize identity, or authorize acts beyond the adopting authority.

**Lifecycle relation:** Links selected methods to their bounded purpose.

## GMEAIA-15 — Deliberation Plan, Facilitation Mandate, Record, Dissent, and Reasons

**Action class:** `A04`  
**Purpose:** Defines how a proposal will be deliberated and how facilitation remains subordinate to lawful decision authority.

**Required content:**
- decision authority and question;
- participant and constituency map;
- facilitator mandate and conflicts;
- evidence and knowledge modes;
- agenda, speaking, accessibility, and safety rules;
- dissent and minority-report process;
- decision rule and reasons;
- recording, confidentiality, and correction;

**Prohibited inference:**
- Facilitators, ethics panels, epistemic assessors, algorithms, or ceremonies cannot replace the decision authority.

**Lifecycle relation:** Produces a reasoned deliberative record, not authorization by itself.

## GMEAIA-16 — Epistemic Readiness, Provenance, Common-Mode Dependence, Disinformation, and Trust Assessment

**Action class:** `A12`  
**Purpose:** Advises whether the information environment can support a decision and whether apparent plurality shares one failure substrate.

**Required content:**
- assessment authority, method, and independence;
- claims and evidence reviewed;
- provenance and source diversity;
- missing, inaccessible, or protected knowledge;
- shared data, AI, infrastructure, funders, methods, and professional networks;
- common-mode failure and fallback channels;
- disinformation exposure, language, accessibility, trust, and power conditions;
- uncertainty, dissent, recommended repairs, residual correlation risk, and non-veto status;

**Prohibited inference:**
- A threshold, score, certification failure, or correlation finding cannot suspend a lawful decision or create an emergency exception.

**Lifecycle relation:** The competent decision body records how it responds and who accepts residual correlation risk.

## GMEAIA-17 — Ethics, Harm, Rights, and Anti-Capture Advisory Review

**Action class:** `A12`  
**Purpose:** Surfaces ethical risks, rights impacts, capture, conflicts, and missing safeguards without becoming hidden approval power.

**Required content:**
- review body and competence;
- ethical sources and plural foundations;
- affected-party and rights analysis;
- capture, conflict, and objective-reproduction analysis;
- protected knowledge and non-transfer;
- foreseeable harms and alternatives;
- recommendations and dissent;
- advisory status and response requirement;

**Prohibited inference:**
- An ethics gate, MOS alignment, Indigenous-framework representative, or certified reviewer cannot create or withhold legal authority.

**Lifecycle relation:** Must be answered with reasons where the governing charter requires review.

## GMEAIA-18 — Consent Requirement, Holder, Scope, and Dependency Map

**Action class:** `A05`  
**Purpose:** Determines which forms of consent, authorization, consultation, notice, assent, or collective decision are required.

**Required content:**
- proposed action and affected interests;
- consent or decision holders;
- legal or customary basis;
- individual, collective, fiduciary, parental, worker, member, or affected-nation form;
- scope and duration;
- dependencies and sequencing;
- capacity, representation, and internal dissent;
- refusal, withdrawal, and remedy;

**Prohibited inference:**
- Consent cannot create jurisdiction over third parties or waive non-derogable rights; one consent holder cannot waive another’s rights.

**Lifecycle relation:** Precedes collection of consent and trial authorization.

## GMEAIA-19 — Consent, Refusal, Withdrawal, and Non-Retaliation Record

**Action class:** `A05`  
**Purpose:** Records a decision by a valid holder without reducing it to a free-text field.

**Required content:**
- holder and verified capacity;
- information received;
- decision and scope;
- conditions and reservations;
- time, duration, and review;
- withdrawal process;
- internal dissent and minority protection;
- non-retaliation and consequences of refusal;

**Prohibited inference:**
- Silence, attendance, use of a service, receipt of support, technical signature, or absence of objection is not consent unless valid law expressly establishes it with safeguards.

**Lifecycle relation:** Must remain linked to the exact proposal and may require renewal.

## GMEAIA-20 — Authority Verification, Causal Responsibility, Decision Class, and Protected-Domain Classification

**Action class:** `A06`  
**Purpose:** Confirms authority and maps whether responsibility, resources, and control over causal variables are aligned.

**Required content:**
- authority record and exact jurisdiction;
- authority formation: `retained`, `delegated`, `transferred`, `concurrent`, `jointly_constituted`, or `absent`;
- for `jointly_constituted`: constituting parties, shared governance object, affected non-parties, source, exit, and surviving duties;
- decision class and consequence;
- principal causal variables;
- legal and practical controller of each variable;
- affected parties and their participation, consent, challenge, and remedy standing; burdens assigned and resources transferred, without inferring responsibility from affected status;
- upstream and external dependencies and continuing duties;
- shared, concurrent, or absent jurisdiction;
- impossible mandate or impossible pilot condition;
- protected-domain screening and applicable interfaces;
- verification result, constitutional-gap flag, and unresolved limits;

**Prohibited inference:**
- Method simplicity, local popularity, reversibility, urgency, or the local appearance of consequences cannot establish authority or causal responsibility.

**Lifecycle relation:** Fail-closed gate before trial authorization and required for consequential transfer, devolution, compact formation, jointly constituted authority, reform mandate, or system-effect pilot.

## GMEAIA-21 — Trial Authorization, Conditions, Scope, and Non-Precedent Record

**Action class:** `A07`  
**Purpose:** Authorizes a bounded experiment without converting it into permanent policy or broader precedent.

**Required content:**
- competent authority and exact power;
- proposal and consent records;
- participants, territory, services, and assets;
- duration and activation window;
- conditions, exclusions, and essential minimums;
- monitoring, review, rollback, and remedy;
- funding and operator;
- non-precedent and no-silent-scaling clause;

**Prohibited inference:**
- A trial authorization does not authorize coercive execution, expansion to nonparticipants, new jurisdictions, permanent enactment, or use outside its conditions.

**Lifecycle relation:** Required for consequential experiments.

## GMEAIA-22 — Adoption Claim, Deliberative Acceptance, and Registration Record

**Action class:** `A07`  
**Purpose:** Records that an entity claims to adopt or accept a proposal and states the legal meaning of that claim.

**Required content:**
- adopting entity and representation;
- proposal and version;
- decision process and reasons;
- authority-effect status;
- consent and authority references;
- trial or permanent character;
- unresolved conditions;
- registration, correction, and challenge;

**Prohibited inference:**
- An adopt() event without complete authority references means only that adoption was claimed; it is not binding or active.

**Lifecycle relation:** May precede or follow trial authorization depending on local law, but cannot replace it.

## GMEAIA-23 — Operational Activation, Start Conditions, Operator, and Clock Record

**Action class:** `A08`  
**Purpose:** Distinctly starts an authorized action and begins legal, operational, review, and expiry clocks.

**Required content:**
- authorization and adoption records;
- activation authority;
- operator and accountable lead;
- preconditions satisfied;
- start time and territory;
- resources released;
- monitoring and incident channels;
- review, expiry, stop, rollback, and response clocks;

**Prohibited inference:**
- Authorization, registration, smart-contract creation, software deployment, or funding approval does not equal activation unless this record is valid.

**Lifecycle relation:** Makes the action operational.

## GMEAIA-24 — Implementation Plan, Responsibilities, Dependencies, Service Boundaries, and Handoff Clocks

**Action class:** `A08`  
**Purpose:** Translates authorization into accountable tasks without expanding scope or losing responsibility between actors.

**Required content:**
- work packages and responsible actors;
- affected persons and participation;
- dependencies, handoffs, acknowledgment clocks, and decision clocks;
- budgets, procurement, and administrative burden;
- data and technology;
- essential-service and safety boundaries;
- maintenance, ordinary owner, and support-withdrawal plan;
- incident, complaint, change control, escalation, completion, and closure conditions;

**Prohibited inference:**
- An implementer cannot reinterpret broad goals as new powers, treat operational convenience as amendment, or leave a failed handoff without named custody.

**Lifecycle relation:** Controls day-to-day implementation.

## GMEAIA-25 — Non-Derogable Rights, Essential Services, Safety, and Continuing Duties Record

**Action class:** `A08`  
**Purpose:** Protects rights and duties that cannot be experimented away or allowed to expire by default.

**Required content:**
- applicable rights and safeguards;
- essential water, food, shelter, health, income, disability, education, safety, and communication duties;
- child and dependent-person protection;
- worker and pension obligations;
- environmental and restoration duties;
- evidence and records preservation;
- continuity arrangements;
- monitoring and remedy;

**Prohibited inference:**
- A sunset, funding withdrawal, failed metric, community vote, or operator exit cannot terminate continuing duties.

**Lifecycle relation:** Must be linked to every trial or institutional transition that could affect protected interests.

## GMEAIA-26 — Funding Authority, Participation Support, Independence, and Non-Conformity Record

**Action class:** `A14`  
**Purpose:** Separates lawful funding from pressure to accept a method, ideology, institutional redesign, or data exposure.

**Required content:**
- funding source and authority;
- purpose, amount, recipient, and custodian;
- eligibility and evidence;
- participation support independent of substantive agreement;
- conditions and prohibited conditions;
- worker, beneficiary, essential-function, and support-withdrawal continuity;
- notice, review, appeal, and correction;
- expiry, recovery, and unused funds;

**Prohibited inference:**
- A readiness score, ethics alignment, module count, public reputation, or method adoption cannot automatically create, deny, freeze, or claw back funding.

**Lifecycle relation:** Required before money or material support becomes consequential.

## GMEAIA-27 — Procurement, Contract, Vendor, Platform, and Technical-Service Record

**Action class:** `A14`  
**Purpose:** Makes private and technical implementation relationships visible and bounded.

**Required content:**
- procuring authority and process;
- vendor and beneficial ownership;
- service, deliverables, and authority effect;
- data, security, and intellectual property;
- subcontractors and conflicts;
- performance and audit;
- termination, continuity, migration, and local maintenance;
- liability, remedy, and records return;

**Prohibited inference:**
- A vendor, platform, smart contract, cloud service, or algorithm cannot become the decision authority or withhold public records and services through lock-in.

**Lifecycle relation:** Controls outsourced implementation.

## GMEAIA-28 — Data Purpose, Lawful Basis, Access Class, Retention, Publication, and Withdrawal

**Action class:** `A16`  
**Purpose:** Defines how governance data are collected, used, linked, published, corrected, and disposed.

**Required content:**
- data categories and subjects;
- purpose and lawful basis;
- minimum necessary fields;
- access class and recipients;
- protected knowledge and source restrictions;
- retention and deletion;
- publication and anonymization;
- correction, withdrawal, breach, and remedy;

**Prohibited inference:**
- Public-by-default, transparency, content addressing, blockchain, or learning goals cannot override confidentiality, protected knowledge, safety, correction, or lawful deletion.

**Lifecycle relation:** Required for all digital and analog records.

## GMEAIA-29 — AI, Sensor, Model, Algorithm, and Automation Role Record

**Action class:** `A16`  
**Purpose:** Defines what automated systems may observe, recommend, route, or execute and what decisions are prohibited.

**Required content:**
- system identity, version, operator, and purpose;
- training or calibration sources;
- inputs, outputs, and confidence;
- human accountable reviewer;
- bias, security, and failure analysis;
- shared-model and provider dependencies;
- prohibited decisions and protected domains;
- logging, challenge, correction, shutdown, retention, and vendor exit;

**Prohibited inference:**
- AI and sensors cannot provide consent, establish representation, declare an emergency, determine jurisdiction, authorize adoption, activate powers, adjudicate, sanction, or renew authority.

**Lifecycle relation:** Required before automated assistance is used.

## GMEAIA-30 — Monitoring Plan, Baseline, Metric, Counterfactual, Burden, and Review Schedule

**Action class:** `A09`  
**Purpose:** Defines what will be observed and how success or harm will be assessed without making metrics self-executing.

**Required content:**
- objectives and baseline;
- metrics and qualitative evidence;
- counterfactual and comparison, including simpler or non-GGF alternatives where feasible;
- methods, uncertainty, and gaming risks;
- distributional, rights, latency, and administrative-burden indicators;
- data responsibilities;
- review schedule and thresholds for human review;
- correction, retirement, and framework-hypothesis references;

**Prohibited inference:**
- A threshold, dashboard, score, sentiment analysis, reputation change, or KPI cannot automatically scale, suspend, fund, punish, dissolve, or renew an action.

**Lifecycle relation:** Begins with activation and supports later review.

## GMEAIA-31 — Outcome Observation, Incident, Side Effect, and Distributional Impact Record

**Action class:** `A09`  
**Purpose:** Captures what occurred, including unintended effects and unequal burdens.

**Required content:**
- time and scope;
- outcomes and incidents;
- affected-party reports;
- rights and essential-service effects;
- distributional impacts;
- operator and external factors;
- data quality and dissent;
- urgent referrals and correction;

**Prohibited inference:**
- Observed correlation or public sentiment does not establish causation, success, failure, breach, or legitimacy.

**Lifecycle relation:** Feeds causal assessment and review.

## GMEAIA-32 — Causal Assessment, Contribution, External Shock, Causal Adequacy, and Uncertainty Record

**Action class:** `A09`  
**Purpose:** Separates measured change from a reasoned account of what caused it and whether the intervention was capable of testing the claimed mechanism.

**Required content:**
- question and assessor;
- methods and evidence;
- counterfactual;
- causal mechanism and variables controlled;
- alternative causes, upstream conditions, and external shocks;
- pilot boundary and mechanisms excluded;
- contribution, attribution, and minimum causal adequacy;
- uncertainty, dissent, limits on use, review, and correction;

**Prohibited inference:**
- A successful outcome does not prove the method caused it; a poor outcome does not prove misconduct; an underpowered pilot cannot establish system effectiveness.

**Lifecycle relation:** Supports review, learning, remedy, and scaling limits.

## GMEAIA-33 — Midpoint Review, Corrective Action, and Continued-Operation Decision

**Action class:** `A09`  
**Purpose:** Determines whether an active trial continues unchanged, changes, pauses, or terminates.

**Required content:**
- review authority and independence;
- records reviewed;
- affected-party evidence;
- rights, safety, and service status;
- metric, causal, latency, and burden assessment;
- conditions and corrective actions;
- decision, reasons, and dissent;
- next review and challenge;

**Prohibited inference:**
- The original adopter or operator cannot unilaterally certify success where conflicts require independent review.

**Lifecycle relation:** May trigger amendment, pause, remedy, or continued operation.

## GMEAIA-34 — Complaint, Challenge, Interim Relief, Appeal, and Independent Review

**Action class:** `A09`  
**Purpose:** Provides an effective route to contest signals, scores, methods, consent, authority, implementation, publication, delay, omission, or harm.

**Required content:**
- complainant and standing;
- challenged action or omission and requested relief;
- notice and evidence access;
- independent reviewer;
- interim relief and anti-retaliation;
- decision and reasons;
- appeal or reconsideration;
- remedy and correction propagation;

**Prohibited inference:**
- A complaint route is not effective if the challenged facilitator, funder, platform, adopter, operator, or non-responsive authority controls the outcome.

**Lifecycle relation:** Available throughout the lifecycle.

## GMEAIA-35 — Amendment, Scope Change, Version Change, and New-Risk Assessment

**Action class:** `A10`  
**Purpose:** Prevents operational changes from silently expanding authority.

**Required content:**
- current authorization and version;
- proposed change and rationale;
- materiality assessment;
- new affected parties, risks, data, jurisdictions, or causal assumptions;
- renewed consent and authority needs;
- technical and budget changes;
- approval and effective date;
- rollback and supersession;

**Prohibited inference:**
- Feature updates, local adaptation, rule-engine changes, vendor updates, or successful practice cannot amend authority by deployment.

**Lifecycle relation:** Required for material changes.

## GMEAIA-36 — Pause, Suspension, Stop, Rollback, and Safe-State Record

**Action class:** `A10`  
**Purpose:** Records temporary or protective cessation and restoration of a safe baseline.

**Required content:**
- trigger and authority;
- scope and start;
- safety and service continuity;
- data and asset custody;
- operator duties;
- review and maximum duration;
- rollback target;
- resumption or termination conditions;

**Prohibited inference:**
- A technical kill switch, facilitator request, metric threshold, or funder notice cannot suspend lawful rights or services without authority.

**Lifecycle relation:** Used for incidents, consent withdrawal, failed preconditions, or review.

## GMEAIA-37 — Renewal, Reauthorization, and Active Re-Consent Record

**Action class:** `A10`  
**Purpose:** Requires active justification before temporary authority continues.

**Required content:**
- expiring action and authority;
- performance, latency, dependency, and harm review;
- remaining need and alternatives;
- affected-party and consent update;
- jurisdiction and law update;
- conditions and amendments;
- new duration and clocks;
- decision, dissent, challenge, and non-renewal effects;

**Prohibited inference:**
- Silence, inertia, continuing software operation, unused sunset logic, or absence of complaint is not renewal.

**Lifecycle relation:** Required before expiry where continuation is sought.

## GMEAIA-38 — Expiry, Automatic Deactivation, and Continuing-Duty Transition Record

**Action class:** `A11`  
**Purpose:** Records the legal and operational effects of reaching an expiry condition.

**Required content:**
- expired authority and time;
- automatic deactivation steps;
- services and duties that continue;
- open cases and claims;
- data and asset custody;
- operator access revocation;
- temporary successor if needed;
- notice and review;

**Prohibited inference:**
- Expiry does not erase harms, debts, pensions, records duties, restoration, child protection, or essential-service obligations.

**Lifecycle relation:** Begins closure unless renewed.

## GMEAIA-39 — Termination, Closure, Authority Return, Asset Return, and Succession Record

**Action class:** `A11`  
**Purpose:** Completes the end of an action or institution and returns power to its lawful source.

**Required content:**
- termination authority and basis;
- effective time;
- operators and access removed;
- assets, funds, licences, and infrastructure returned or transferred;
- staff, beneficiaries, and service continuity;
- records and data disposition;
- unresolved duties and successor;
- final reasons, audit, challenge, and material closure feasibility;

**Prohibited inference:**
- A celebratory sunset, dashboard status, archive entry, software deletion, or formal exit without a viable continuity route is not complete closure.

**Lifecycle relation:** Required for complete lifecycle conformance.

## GMEAIA-40 — Learning Artifact, Failure Library, Story Bank, and Public Memory Record

**Action class:** `A16`  
**Purpose:** Permits learning without converting participation into permanent exposure.

**Required content:**
- source action and purpose;
- content and factual review;
- consent for identifiable material;
- anonymization and residual risk;
- protected and excluded content;
- access and reuse licence;
- withdrawal, correction, and expiry;
- responsible publisher, sample-selection limits, and remedy;

**Prohibited inference:**
- Consent to a pilot, employment, funding, facilitation, or testimony is not consent to permanent public storytelling; a learning library is not a representative sample by default.

**Lifecycle relation:** Produces a bounded learning resource.

## GMEAIA-41 — Record Correction, Retraction, Supersession, and Dependency Propagation

**Action class:** `A11`  
**Purpose:** Corrects governance records and every dependent decision without pretending immutable systems cannot change.

**Required content:**
- record and error;
- correcting authority;
- corrected content and reason;
- affected persons and decisions;
- dependency graph and propagation;
- public and protected notices;
- interim relief;
- archive and audit trail;

**Prohibited inference:**
- Append-only storage may preserve history but cannot preserve an error as the current authoritative state.

**Lifecycle relation:** Required when signals, identities, scores, consent, authority, outcomes, or handoff states are wrong.

## GMEAIA-42 — Harm, Remedy, Restitution, Compensation, Rehabilitation, and Non-Repetition Record

**Action class:** `A11`  
**Purpose:** Records repair for wrongful or harmful implementation.

**Required content:**
- harm and affected parties;
- causal and legal basis;
- urgent support;
- restoration or restitution;
- financial compensation;
- record and reputation correction;
- institutional, incentive, or technical change;
- monitoring, closure, and appeal;

**Prohibited inference:**
- Ending a pilot or apologizing does not discharge remedy.

**Lifecycle relation:** May survive termination until complete.

## GMEAIA-43 — Scaling Recommendation, Transferability Limits, Transition Readiness, and Evidence Package

**Action class:** `A10`  
**Purpose:** Converts pilot learning into a bounded recommendation and tests whether a useful function can become ordinary, durable provision.

**Required content:**
- source trial and context;
- evidence, causal adequacy, and uncertainty;
- necessary conditions and contexts not tested;
- failed and excluded contexts;
- rights and distributional effects;
- ordinary owner, budget, staffing, maintenance, and support-withdrawal durability;
- recommended scope and alternatives;
- non-authority status and reasons for remaining temporary;

**Prohibited inference:**
- Success, reputation, funding tier, adoption count, benchmark attainment, or continued pilot activity cannot scale an action or prove transition readiness.

**Lifecycle relation:** May be submitted to a new competent authority.

## GMEAIA-44 — Scaling, Replication, New-Jurisdiction, and Permanent-Enactment Authorization

**Action class:** `A10`  
**Purpose:** Authorizes a new instance, jurisdiction, population, or permanent rule through its own lawful process.

**Required content:**
- new authority and jurisdiction;
- proposal and scaling recommendation;
- new affected-party map;
- local law and consent;
- adaptation and alternatives;
- funding, operator, data, maintenance, and ordinary ownership;
- review, sunset or permanent amendment route;
- reasons and challenge;

**Prohibited inference:**
- A template, network effect, treaty aspiration, successful pilot, or cross-platform compatibility cannot create this authorization.

**Lifecycle relation:** Creates a new bounded authority chain, not an extension by inference.

## GMEAIA-45 — Institutional Purpose, Mandate, Power, Selection Pressure, and Obsolescence Audit

**Action class:** `A15`  
**Purpose:** Assesses whether an institution or programme still serves its lawful mandate and what selection pressures reproduce its revealed behavior.

**Required content:**
- charter and mandate;
- auditor and independence;
- beneficiaries and affected parties;
- performance, harms, and alternatives;
- power and capture analysis;
- budget, appointment, promotion, removal, prestige, blame, survival, and continuation incentives;
- incentives of auditors, facilitators, funders, vendors, and reform bodies;
- behavior likely to regenerate after reform and pressures the proposal changes;
- essential and unresolved functions;
- options: retain, reform, transfer, merge, narrow, or close; advisory status, dissent, and response;

**Prohibited inference:**
- A scorecard, AI diagnostic, trust score, audit finding, or stated reform commitment cannot amend or dissolve an institution or prove that its operative objective changed.

**Lifecycle relation:** Feeds charter review, incentive reform, authority reform, or closure authorization.

## GMEAIA-46 — Charter Amendment, Governance Redesign, Constituency, and Decision-Rights Record

**Action class:** `A15`  
**Purpose:** Constitutes lawful institutional redesign, including councils, voting shares, vetoes, representation, and response duties.

**Required content:**
- charter-amendment authority and procedure;
- proposed bodies and powers;
- constituencies and selection;
- mandates, conflicts, removal, accountability, and duty-to-respond;
- rights and minority safeguards;
- affected Indigenous nation authority;
- transition and legal continuity;
- approval, entry into force, review, and challenge;

**Prohibited inference:**
- A governance blueprint, facilitator recommendation, fixed percentage, youth or future-generation label, or toolkit adoption cannot amend a charter.

**Lifecycle relation:** Required before governance redesign becomes operative.

## GMEAIA-47 — Institutional Funding Eligibility, Condition, Incentive, and Appeal Record

**Action class:** `A14`  
**Purpose:** Separates institutional finance from coercive reform leverage and exposes continuation incentives.

**Required content:**
- funding authority and programme;
- eligibility criteria and evidence;
- condition and relation to mandate;
- essential-function and beneficiary impact;
- worker and pension safeguards;
- independence from method or ideology conformity;
- continuation, closure, and dependency incentives;
- decision, reasons, duration, appeal, correction, and transition support;

**Prohibited inference:**
- Module counts, readiness or regeneration tiers, public pressure, or GGF alignment cannot automatically grant voting rights, freeze funds, or force charter change.

**Lifecycle relation:** Controls funding tied to institutional transition.

## GMEAIA-48 — Institutional Transition, Worker, Beneficiary, Contract, and Service Continuity Record

**Action class:** `A15`  
**Purpose:** Protects people and obligations during reform, merger, transfer, or downsizing.

**Required content:**
- transition authority and plan;
- workers, unions, pensions, and benefits;
- beneficiaries and essential functions;
- contracts, grants, and pending cases;
- assets, debts, and licences;
- data, archives, and confidentiality;
- successor and contingency;
- notice, participation, remedy, review, and unresolved-duty custody;

**Prohibited inference:**
- Institutional agility does not erase labour, pension, beneficiary, contractual, or public-service duties.

**Lifecycle relation:** Required before material organizational transition.

## GMEAIA-49 — Institutional Dissolution, Successor, Dark Archive, and Unresolved-Duty Custody

**Action class:** `A15`  
**Purpose:** Closes an institution or programme through lawful authority and custodianship.

**Required content:**
- dissolution authority and legal basis;
- effective date and scope;
- successor institutions;
- staff and beneficiary arrangements;
- assets, liabilities, and restricted funds;
- records, archives, access, and deletion;
- pending claims, duties, and cases;
- final audit, remedy, challenge, and reopening route;

**Prohibited inference:**
- A purpose audit, sunset date, funding loss, hostile leadership, public score, or Dark Archive deposit cannot itself dissolve an institution.

**Lifecycle relation:** Completes institutional closure.

## GMEAIA-50 — Facilitator Qualification, Appointment, Mandate, Conflict, Complaint, and Removal

**Action class:** `A13`  
**Purpose:** Makes facilitators accountable without creating a professional monopoly.

**Required content:**
- qualification and local-equivalence route;
- appointing body and participant choice;
- mandate and prohibited acts;
- cultural and trauma competence;
- conflicts, funding, and recusal;
- complaint, replacement, and removal;
- liability and insurance where relevant;
- duration, record custody, and dependency-reduction duty;

**Prohibited inference:**
- Certification does not create decision authority; lack of certification cannot exclude locally trusted competence or block urgent access to participation.

**Lifecycle relation:** Required for consequential facilitated processes.

## GMEAIA-51 — Auditor, Assessor, Ethics Reviewer, and Epistemic Reviewer Independence and Common-Mode Record

**Action class:** `A13`  
**Purpose:** Defines competence and independence across funding, data, methods, infrastructure, and professional networks.

**Required content:**
- reviewer identity and mandate;
- selection and qualification;
- funding and beneficial interests;
- conflicts and recusal;
- method and evidence access;
- shared data, AI, vendors, infrastructure, appointment authorities, professional networks, and ontologies;
- independent channel, fallback, minority reports, and residual correlation risk;
- publication, protected annex, complaint, correction, and removal;

**Prohibited inference:**
- Organizational separation does not establish independence where reviewers share the same funder, data, model, platform, method, or professional incentive.

**Lifecycle relation:** Required for consequential audits, gates, and common-mode stress tests.

## GMEAIA-52 — Catalyst Team, Liaison, Evolution Cell, and Technical-Assistance Mandate

**Action class:** `A13`  
**Purpose:** Bounds support actors embedded in communities or institutions and exposes their curation and continuation incentives.

**Required content:**
- host invitation and appointing authority;
- purpose and tasks;
- no-command and no-representation limits;
- access to people, systems, and records;
- funding, conflicts, tool-curation influence, and continuation incentives;
- staff and community protections;
- duration, exit, handover, local capacity transfer, and conditions making support unnecessary;
- complaints, liability, learning, and independent review;

**Prohibited inference:**
- Support, expertise, embedded presence, emergency context, host dependency, repository stewardship, or compatibility knowledge does not create authority to govern the host.

**Lifecycle relation:** Required before external implementation support begins.

## GMEAIA-53 — Framework, Tool Core, Fork, Schema, Compatibility, Version, Deprecation, and Stewardship Record

**Action class:** `A16`  
**Purpose:** Keeps modular tools adaptable without invisible central control, unsafe divergence, or compatibility becoming shadow governance.

**Required content:**
- tool and schema identity;
- normative core versus optional profile;
- steward and change process;
- compatibility promises and exact technical necessity;
- effects of incompatibility on funding, support, recognition, and participation;
- fork rights and labels;
- security, migration support, deprecation, rollback, and expiry;
- framework theory of change, disconfirming evidence, narrowing, suspension, and replacement conditions;
- dispute, correction, and archive;

**Prohibited inference:**
- The central steward cannot make local legal decisions through a software update; incompatibility does not establish illegitimacy; a fork cannot claim compatibility while omitting constitutional fields.

**Lifecycle relation:** Required for EGP profiles, framework releases, and tool libraries.

## GMEAIA-54 — Offline, Oral, Paper, Assisted, and Low-Tech Record Equivalence

**Action class:** `A16`  
**Purpose:** Provides equal dignity and effect to non-digital participation and records.

**Required content:**
- record form and custodian;
- witnessing or attestation;
- translation and accessibility;
- identity and representation checks;
- digitization without alteration;
- confidentiality and protected knowledge;
- correction and duplicate resolution;
- service, timing, influence, and remedy parity;

**Prohibited inference:**
- Digital signatures, blockchain, app access, or machine readability cannot be prerequisites for standing, service, consent, challenge, or remedy.

**Lifecycle relation:** Required wherever digital systems are offered.

## GMEAIA-55 — Emergency Signal, CDEE Referral, Mission Acceptance, and ECRC Interface

**Action class:** `A17`  
**Purpose:** Routes urgent matters into the harmonized emergency architecture without allowing implementation tools to declare or command emergencies.

**Required content:**
- source signal and validation;
- CDEE event identity;
- candidate emergency authority;
- declaration or acceptance record;
- mission and information scope;
- command and operational roles;
- clocks, review, termination, and return;
- data, finance, remedy, unresolved risk, and non-response escalation;

**Prohibited inference:**
- A crisis stack, 72-hour kit, urgent score, PIS notification, facilitator, AI alert, or community adoption cannot declare an emergency.

**Lifecycle relation:** Required before emergency powers or cross-domain missions activate.

## GMEAIA-56 — Protected-Domain Experiment Exception and Specialized-Interface Authorization

**Action class:** `A17`  
**Purpose:** Allows carefully bounded pilots in protected domains only through the controlling constitutional interface. The protected-domain catalogue in §2.1 is normative and may be extended by the controlling domain interface.

**Required content:**
- protected domain and risk;
- controlling framework and interface;
- specialized authority and safeguards;
- participants and exclusions;
- essential minimums and non-derogation;
- independent monitoring and stop authority;
- duration, rollback, and remedy;
- public reasons and protected annex;

**Prohibited inference:**
- Ordinary trial authorization cannot cover detention, policing, essential-service deprivation, migration status, title transfer, irreversible ecology, high-risk technology, adjudication, or emergency command.

**Lifecycle relation:** Required in addition to GMEAIA-21.

## GMEAIA-57 — Coercive or Enforcement Request, Acceptance, Execution, and SCPA Handoff

**Action class:** `A17`  
**Purpose:** Separates implementation and review from compulsory execution.

**Required content:**
- underlying decision and enforceable order;
- requested action class;
- SCPA authority records;
- recipient acceptance;
- individualized scope and safeguards;
- operator, command, and use limits;
- review, incident, and evidence records;
- termination, remedy, return, and referral-only status for non-coercive frameworks;

**Prohibited inference:**
- An adopter, facilitator, funder, community, smart contract, platform, ethics reviewer, implementation team, or general cross-framework handoff cannot search, seize, detain, restrain, freeze, sanction, or use force through this specification.

**Lifecycle relation:** Required for coercive execution; non-coercive frameworks may refer but cannot accept or execute the coercive function.

## GMEAIA-58 — Non-Activation, Sandbox, Prototype, Simulation, and Demonstration Register

**Action class:** `A18`  
**Purpose:** Marks environments and records that must not be mistaken for live authority.

**Required content:**
- sandbox or prototype identity;
- owner and purpose;
- synthetic versus real data;
- excluded powers and protected domains;
- technical and organizational isolation;
- display and API warnings;
- test users and consent;
- termination, deletion, and incident route;

**Prohibited inference:**
- A successful demonstration, smart contract, simulation, digital twin, mock council, pilot BAZ, or test credential cannot affect real rights, services, funds, or authority.

**Lifecycle relation:** Required for all non-production deployments.

## GMEAIA-59 — Cross-Framework Handoff, Conformance, Recipient Response, Acceptance, and Custody Record

**Action class:** `A18`  
**Purpose:** Makes interoperability explicit and prevents missing authority, non-response, or refusal from disappearing between frameworks.

**Required content:**
- source and destination frameworks and versions;
- source records and action class;
- requested function;
- controlling interface;
- authority and protected-data package;
- response-duty source and effect: `legal`, `contractual`, `charter_internal`, `voluntary_commitment`, `advisory`, or `none`;
- acknowledgment-clock source and decision-clock source;
- `GMEAIA-07` response-time assessment reference where applicable;
- response state: `offered`, `acknowledged`, `accepted`, `partially_accepted`, `capacity_limited`, `refused`, `deferred`, `referred`, `timed_out`, `misrouted`, `constitutional_gap`, `returned`, or `closed`;
- reasons, conflicts, missing prerequisites, and alternative recipient;
- provisional-safe-state record reference, which cannot be activated by handoff alone;
- post-acceptance action-clock and review references;
- sender and recipient duties, custody, escalation, return, closure, and unresolved state;

**Prohibited inference:**
- Schema compatibility, API receipt, event subscription, shared terminology, or silence does not mean legal acceptance or duty discharge.

**Lifecycle relation:** Required for consequential cross-framework transport.

## GMEAIA-60 — Data Return, Deletion, Archive, Access Revocation, and Protected-Memory Disposition

**Action class:** `A11`  
**Purpose:** Completes the information lifecycle after withdrawal, expiry, closure, correction, or dissolution.

**Required content:**
- record classes and custodians;
- retention duties and legal holds;
- return and portability;
- deletion, crypto-shredding, or sealed archive;
- protected Indigenous and community knowledge;
- public-memory justification;
- access revocation and key destruction;
- verification, complaints, and unresolved obligations;

**Prohibited inference:**
- Immutability, public transparency, research value, or failure-learning interest cannot justify indefinite access to protected or unlawfully held data.

**Lifecycle relation:** Required to complete withdrawal, expiry, correction, closure, or dissolution.

---

# 9. Conformance gates

A deployment claiming `GMEAIA/0.2.1` conformance shall satisfy all applicable gates.

| Gate | Requirement |
|---|---|
| G01 | Exact authority effect, normative force, status, source, version, and accountable actor are recorded. |
| G02 | No method, score, funding decision, signature, software function, or compatibility claim creates authority by implication. |
| G03 | Consequence profile CP0–CP3 is selected and justified. |
| G04 | Record burden and accessible or low-tech equivalence are proportionate. |
| G05 | Affected parties, outsiders, internal minorities, and affected Indigenous nations are mapped. |
| G06 | Consent, authority, authorization, adoption, activation, and execution remain distinct. |
| G07 | Causal variables, legal and practical controllers, transferred burdens, resources, and upstream duties are identified where material. |
| G08 | Impossible mandate, impossible pilot, and constitutional-gap conditions remain available states. |
| G09 | Response clocks, acceptance, refusal, deferment, timeout, escalation, and custody are explicit for consequential handoffs. |
| G10 | Non-response does not create automatic authority transfer or erase continuing responsibility. |
| G11 | Observation and review channels disclose common-mode dependencies and fallback. |
| G12 | Objective-reproduction analysis is completed for long-lived or systemically central institutions and support ecosystems. |
| G13 | Protected domains use specialized interfaces and fail closed. |
| G14 | Rights, essential services, workers, beneficiaries, records, and unresolved duties survive expiry and closure. |
| G15 | AI, vendors, funders, facilitators, auditors, and Catalyst actors remain bounded and challengeable. |
| G16 | Metrics, alerts, and findings trigger review rather than self-executing constitutional consequences. |
| G17 | Pilots are small enough for safety and large enough to expose the claimed mechanism. |
| G18 | Scaling evidence addresses external validity, ordinary ownership, maintenance, and support-withdrawal durability. |
| G19 | Tool and framework compatibility cannot become practical legitimacy or ideological conformity by implication. |
| G20 | Every operational framework and every long-lived, systemically central, or self-renewing mechanism states disconfirming evidence and narrowing, suspension, replacement, or non-scaling conditions. |
| G21 | Corrections propagate to dependent records and decisions. |
| G22 | Closure returns authority, assets, access, data, and unresolved-duty custody. |

---

# 10. Compound tests added in the v0.2 series

| Test | Scenario | Required outcome |
|---|---|---|
| T01 | A local body receives responsibility for a condition caused by an upstream authority | Causal Responsibility Profile identifies the upstream controller and continuing duty; local administration does not prove local responsibility. |
| T02 | A competent authority ignores a consequential referral | Handoff enters `timed_out`; sender custody, expected harm, escalation, and unresolved duties remain visible; no automatic transfer occurs. |
| T03 | No institution has jurisdiction over an integrated condition | Status becomes `constitutional_gap`; the interface routes a constituting process and does not invent a residual sovereign. |
| T04 | Three independent panels use the same AI, data vendor, and funder | They are recorded as correlated; common-mode stress test and fallback are required. |
| T05 | A voluntary workshop is required to complete a full CP3 record bundle | Non-conformant over-administration; CP0 or CP1 applies. |
| T06 | A technically simple pilot affects household water access | CP3 protected-domain route applies despite technical simplicity. |
| T07 | A pilot tests acceptability but is presented as proof of system effectiveness | Rejected; causal adequacy and conclusion limits must be stated. |
| T08 | A successful pilot has no ordinary owner, budget, maintenance, or staff after grant expiry | Scaling recommendation remains incomplete. |
| T09 | A Catalyst Team controls tool visibility, training, and funding assistance | GMEAIA-52 records curation power, incentives, local-capacity transfer, and conditions for exit. |
| T10 | An institution completes a purpose audit but promotion, budget, and appointment incentives remain unchanged | Audit cannot claim reproductive reform without evidence that selection pressures changed. |
| T11 | A framework passes every schema check but adds delay and produces no improved outcome | Conformance remains valid; effectiveness claim fails and framework narrowing review begins. |
| T12 | A fork is labelled incompatible and loses all practical access to support | GMEAIA-53 requires a technical necessity, proportional effects, migration route, and no legitimacy inference. |
| T13 | A receiver refuses a handoff because prerequisites are missing | Refusal is reasoned, custody remains explicit, and an alternative route or escalation is recorded. |
| T14 | A legal exit exists but essential service and platform alternatives do not | Closure or exit cannot be represented as materially complete. |
| T15 | A dashboard target is met after the system changes the metric definition | Independent outcomes and data-change governance prevent self-validation. |
| T16 | A high-consequence framework has no condition under which it would narrow or stop | Framework-level conformance fails G20. |

---

# Appendix A — Forty-eight-field common header

| No. | Field |
|---:|---|
| `01` | `record_id` |
| `02` | `record_type` |
| `03` | `schema_version` |
| `04` | `created_at` |
| `05` | `effective_at` |
| `06` | `expires_at` |
| `07` | `status` |
| `08` | `normative_force` |
| `09` | `authority_effect` |
| `10` | `action_class` |
| `11` | `source_framework_id` |
| `12` | `source_framework_version` |
| `13` | `source_record_ids` |
| `14` | `supersedes` |
| `15` | `superseded_by` |
| `16` | `actor_id` |
| `17` | `actor_type` |
| `18` | `office_or_role` |
| `19` | `representation_source` |
| `20` | `technical_credential_refs` |
| `21` | `constituting_instrument` |
| `22` | `legal_power` |
| `23` | `jurisdiction_territorial` |
| `24` | `jurisdiction_personal` |
| `25` | `jurisdiction_subject_matter` |
| `26` | `jurisdiction_temporal` |
| `27` | `affected_party_refs` |
| `28` | `affected_indigenous_nation_refs` |
| `29` | `protected_domain_flags` |
| `30` | `consent_record_refs` |
| `31` | `authority_record_refs` |
| `32` | `activation_record_refs` |
| `33` | `access_class` |
| `34` | `public_summary` |
| `35` | `protected_annex_refs` |
| `36` | `data_purpose` |
| `37` | `retention_rule` |
| `38` | `correction_status` |
| `39` | `challenge_status` |
| `40` | `review_due_at` |
| `41` | `closure_state` |
| `42` | `unresolved_duty_refs` |
| `43` | `handoff_state` |
| `44` | `recipient_refs` |
| `45` | `recipient_acceptance_refs` |
| `46` | `hashes_and_signatures` |
| `47` | `human_accountable_officer` |
| `48` | `prohibited_inferences` |

The common header remains intentionally stable. Record-specific fields carry causal responsibility, response clocks, common-mode dependencies, objective-reproduction analysis, proportionality, and falsification.

---

# Appendix B — Shared primitive mapping

| Shared primitive | Primary GMEAIA records | Supporting records |
|---|---|---|
| Causal Responsibility Profile | `20` | `07`, `09`, `13`, `24`, `32`, `42`, `45` |
| Response, Refusal, and Omission | `08`, `59` | `07`, `23`, `24`, `34`, `55`, `57` |
| Independence and Objective-Reproduction Review | `16`, `45`, `51`, `52` | `17`, `26`, `27`, `29`, `40`, `47`, `53` |
| Proportionality and Falsification | consequence profiles; `53` | `02`, `13`, `20`, `30`, `32`, `43`, `58` |

---

# Appendix C — Default response fields

These are the canonical operational fields. Constitutional documents should preserve the information but defer exact states and lifecycle semantics to GMEAIA.

**Source request:**  
**Candidate duty-holder:**  
**Basis for competence:**  
**Response-duty source:**  
**Response-duty effect:** `legal` / `contractual` / `charter_internal` / `voluntary_commitment` / `advisory` / `none`  
**Acknowledgment-clock source:**  
**Acknowledgment due:**  
**Decision-clock source:**  
**Decision due:**  
**GMEAIA-07 response-time assessment reference:**  
**State:** `offered` / `acknowledged` / `accepted` / `partially_accepted` / `capacity_limited` / `refused` / `deferred` / `referred` / `timed_out` / `misrouted` / `constitutional_gap` / `returned` / `closed`  
**Reasons and evidence:**  
**Conflicts:**  
**Missing prerequisites:**  
**Expected harm during delay:**  
**Provisional-safe-state record reference:**  
**Post-acceptance action clock:**  
**Sender duty retained:**  
**Recipient duty accepted:**  
**Escalation:**  
**Unresolved-duty custody:**  
**Closure:**

---

# Appendix D — Default framework falsification fields

This profile applies to frameworks and to long-lived, systemically central, or self-renewing mechanisms. Independence review, objective-reproduction review, and framework falsification are separately triggerable even where one human-readable form combines them.

**Framework or long-lived mechanism:**  
**Theory of change:**  
**Expected mechanism:**  
**Architecture-added latency:**  
**Administrative burden:**  
**Common-mode dependencies:**  
**Disconfirming evidence:**  
**Narrowing condition:**  
**Suspension condition:**  
**Replacement or deprecation condition:**  
**Non-scaling condition:**  
**Review authority and date:**

---

# Conclusion

`GMEAIA/0.2.1` preserves the central achievement of v0.1: methods, pilots, funding, technology, and coordination cannot counterfeit authority.

It adds the mirror requirement revealed by the recursive audit:

> **A constitutionally bounded system must also show who controls the causes, who must respond, what happens when they do not, which dependencies can fail together, which incentives reproduce institutional behavior, and what evidence would show that the framework itself should become smaller or end.**

The specification therefore remains a lifecycle grammar rather than a governance sovereign. It makes responsibility traceable without assigning it by implication.
