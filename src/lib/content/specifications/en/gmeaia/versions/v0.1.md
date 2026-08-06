# Governance Method, Experiment, Adoption, and Implementation Authority Interface Specification v0.1

## A common constitutional interface for sensing, proposals, deliberation, consent, experimentation, adoption, activation, implementation, review, scaling, institutional reform, learning, closure, remedy, and authority return

**Identifier:** `GMEAIA/0.1`  
**Status:** Constitutional interface specification; drafting, conformance, software-profile, and cross-framework testing instrument  
**Version:** 0.1  
**Date:** 2026-08-02  
**Primary use:** constitutional revision of the EGP package, GGF Implementation & Adaptation, Implementation Methods & Tools, Institutional Regeneration, and Wise Decision-Making & Integration  
**Not a source of jurisdiction, consent, public office, emergency, fiscal, charter-amendment, adjudicative, police, enforcement, benefit, service-withdrawal, title, or regulatory power**

---

# Executive summary

Governance requires methods. Communities and institutions need ways to surface problems, formulate proposals, deliberate across knowledge systems, test reversible responses, learn from failure, adapt tools, reform organizations, and close obsolete structures. A shared grammar can make these processes interoperable without making them uniform.

Methods become constitutionally dangerous when the use of a method is mistaken for the authority to make the underlying decision. A stress packet may look like an official finding. An `adopt()` event may look like enacted law. A readiness score may look like eligibility. An ethics gate may look like approval. An epistemic assessment may look like a veto. A software permission may look like public office. A successful pilot may look like permission to scale. A sunset may look like lawful closure.

`GMEAIA/0.1` supplies the missing constitutional type system.

> **Methods structure how authority is exercised. They do not create the authority.**

Its principal rules are:
- Any person, community, AI system, or sensor may be permitted to submit a `sense()` signal, but the signal remains an asserted claim until separately validated.
- A proposal may organize alternatives and expected effects, but it is neither consent nor authorization.
- Consent is valid only for the holder, scope, duration, and rights recorded; it cannot create jurisdiction or waive another person's or nation's rights.
- An EGP `adopt()` event without a complete authority envelope records only that adoption was claimed.
- Authorization, adoption registration, funding, code deployment, and activation are separate events.
- Readiness, ethics, epistemic, maturity, regeneration, trust, and performance assessments are advisory unless a separately valid law gives a bounded effect.
- AI, sensors, smart contracts, DIDs, UCANs, dashboards, and blockchains may support records and routing; none may create public authority.
- Temporary experiments fail closed in protected domains and cannot remove essential services or continuing duties.
- Successful pilots produce evidence and recommendations, not self-scaling power.
- Sunset ends temporary authority but does not extinguish rights, remedies, pensions, debts, restoration, records duties, or essential-service obligations.
- Emergency and coercive action remain governed by ECRC/CDEE, SCPA, CERGTA, and other controlling domain interfaces.
- Every action ends through closure, authority return, data disposition, unresolved-duty custody, and effective remedy.

---

# 1. Purpose, scope, and legal character

## 1.1 Purpose

This Specification defines the records and transition rules through which governance methods and implementation systems may support consequential decisions without manufacturing legitimacy, consent, jurisdiction, or power. It is intended to preserve the simplicity of the Emergent Governance Protocol while providing the deeper constitutional envelope required by actual governance.

## 1.2 Scope

It applies to:
- `sense()`, `propose()`, and `adopt()` operations and their technical profiles;
- community and institutional pilots, sandboxes, prototypes, simulations, and demonstrations;
- context assessments, readiness indices, power maps, ethics gates, epistemic-health assessments, and impact audits;
- facilitators, auditors, assessors, catalyst teams, liaisons, evolution cells, software operators, and technical vendors;
- tool stacks, resource cards, cultural adaptations, forks, schemas, APIs, smart contracts, rule engines, and AI copilots;
- funding eligibility, participation support, procurement, incentive tiers, and reform conditions;
- institutional purpose audits, charter redesign, merger, succession, defunding, sunsetting, and dissolution;
- monitoring, learning capture, story banks, failure libraries, public dashboards, dark archives, correction, and deletion;
- cross-framework referrals, emergency routing, protected-domain experiments, enforcement requests, and authority return.

## 1.3 Interface, not grant of power

This Specification does not create an adopting authority, community, council, court, fund, emergency command, regulator, office, facilitator monopoly, or technical platform. It defines what a valid action package must contain when an independently constituted actor performs one of the covered functions.

## 1.4 Non-authority clause

Conformance to `GMEAIA/0.1`, generation of a valid JSON object, possession of a cryptographic key, use of an approved tool, or passage of a software validator SHALL NOT be represented as proof that the underlying action is lawful, binding, active, or enforceable. Legal validity remains dependent on the governing authority, law, jurisdiction, consent, and domain interfaces.

## 1.5 Normative language

`SHALL` and `MUST` state mandatory conformance requirements. `SHALL NOT` and `MUST NOT` state prohibitions. `SHOULD` states a rebuttable recommendation. `MAY` states permission that does not itself create authority.

## 1.6 Controlling source freeze

| Source | File | SHA-256 | Lines |
|---|---|---|---:|
| EGP Core v1.0 | `emergent-governance-protocol.md` | `c5957945552bfd4d5e107aa7990b2f7184e2a49cb031520b5b3dae19a61f7b6d` | 272 |
| EGP Implementation Appendix | `egp-appendix.md` | `f88a36ea245018534398e8358c622a1807714c436e44ca31651e2a1c504d311b` | 1490 |
| EGP Glossary | `egp-glossary.md` | `78929c311afbe5b5038e1fa233848d5bec72fe5b74265312eb42eba7ad082f11` | 129 |
| EGP One-Page Summary | `egp-one-page-summary.md` | `2a6a42949702d4553e8b5d49e04b3f06d84bf04e0dbecd80b10a0c467834f76e` | 113 |
| GGF Implementation & Adaptation Framework v1.0 | `v1.0(5).md` | `f0bf4d9cee9a6520c9a52a609b1955e0c6ea6831b51c5d38169d4783588c3b48` | 219 |
| Institutional Regeneration Framework v0.8 | `v0.8(5).md` | `a6c3cb3dc1bbf474910246bf4298c377e2ed07c48fcc40c8399ef23d78f990ec` | 215 |
| Implementation Methods & Tools Framework v0.7 | `v0.7.md` | `c3eb73da02d5a4801ddd7853be9f3cb09afd64b66e5e85e347436097f2a610fd` | 510 |
| Wise Decision-Making & Integration Protocol v1.5 | `v1.5(3).md` | `3a68af97a25fc640dcb18f0a183a1d82eb7b495582eab1ce173c9b2baf41ba62` | 612 |
| Cluster Constitutional Audit v0.1 | `implementation-adaptation-emergent-governance-cluster-constitutional-audit-v0.1.md` | `10448da09e50c66ec5beaf888e822808bf6cb7c243e7287dbedcb2196f5c92e9` | 846 |

Constitutional dependencies are pinned for this drafting release:

| Dependency | File | SHA-256 |
|---|---|---|
| Constitutional Interface Specification v0.1 | `constitutional-interface-specification-v0.1.md` | `a9ef4c6fffadfa43a988d417568179fce496f944bddbc638e6fb36620503bf9e` |
| Emergency, Catastrophic-Risk, and Continuity Interface Specification v0.1 | `emergency-catastrophic-risk-continuity-interface-specification-v0.1.md` | `c673742b1317c7169d4b8226118478c990e9a3d05084b2dc5ac9ad2f1971163c` |
| Security, Coercion, and Protective Action Interface Specification v0.1 | `security-coercion-protective-action-interface-specification-v0.1.md` | `b8f1dd0f676044542a23184f52200e50b106a798545c7c57119ded2c439b6299` |
| CERGTA/0.1 | `commons-ecological-rights-guardianship-title-resource-authority-interface-specification-v0.1.md` | `3c45e37c834c727471657fc91149edbe3011137562c2dd73e54b20226c92589b` |

The retired Wisdom Governance/GWGF track is not an operational dependency. References to retired bodies SHALL NOT supply authority.

---

# 2. Definitions
**activation.** The distinct act that starts an already authorized action and begins operational, review, and expiry clocks.

**adoption claim.** A statement that an entity has accepted or intends to implement a proposal; it may be descriptive, deliberative, contractual, or legal depending on separately recorded authority.

**authority envelope.** The linked records establishing consent, legal authority, jurisdiction, scope, protected rights, trial conditions, activation, review, exit, and remedy.

**authority effect.** A controlled label stating what legal or procedural effect a record or tool may have.

**community.** A self-identified group whose membership and decision rules must be specified for the action at issue; the term does not itself establish jurisdiction or erase internal plurality.

**consent.** A decision by a valid holder within a defined scope; distinct from public authority, consultation, notice, acquiescence, and technical authentication.

**consequential action.** An action capable of materially affecting rights, duties, services, money, assets, status, safety, public institutions, protected knowledge, or nonparticipants.

**decision authority.** The independently constituted body or office legally competent to make the substantive decision.

**EGP transport event.** A `sense`, `propose`, or `adopt` record used to communicate governance state; transport does not create the state it describes.

**essential service.** A service necessary for survival, health, safety, dignity, disability support, basic participation, or lawful continuity.

**experiment.** A bounded, monitored, reversible or safely closable trial; not a means to evade ordinary constitutional requirements.

**facilitator.** A person or service that supports process quality without owning the substantive decision.

**method.** A procedure, practice, tool, model, protocol, template, or technology used to structure governance work.

**protected domain.** A domain in which ordinary experimental authorization is insufficient because rights, coercion, irreversibility, or essential services require specialized authority.

**readiness assessment.** An advisory evaluation of conditions, capacities, risks, or information quality; not a classification of worth or right to self-government.

**referral.** A record transfer requesting that another authority consider a function; it does not transfer power unless the recipient explicitly accepts under valid authority.

**scaling.** Application to new persons, territory, institutions, purposes, duration, or permanent law; requires a new authority decision.

**sunset.** An expiry condition for temporary authority; distinct from completion of continuing duties and lawful closure.

**technical capability.** Permission to invoke software or access data; distinct from public office, legal power, and representation.

---

# 3. Constitutional doctrines
## 3.1 Method–authority firewall

A method may improve legitimacy, evidence, participation, accessibility, reflection, or learning. It cannot create the authority to decide. The method owner, facilitator, assessor, auditor, software operator, or funder SHALL NOT acquire the substantive power merely because the decision uses the method.

## 3.2 No upward inference

No higher-consequence state may be inferred from a lower one. Signal does not imply fact; fact does not imply breach; proposal does not imply consent; consent does not imply jurisdiction; adoption claim does not imply authorization; authorization does not imply activation; success does not imply scaling; expiry does not imply closure.

## 3.3 Transport is not activation

EGP and other interoperability systems transport records. A receiving system SHALL use the authority effect and handoff state, not the event name, to determine what it may do.

## 3.4 Claim-preserving sensing

The right to signal a problem is broad. The power to label people, assign legal severity, declare emergencies, open investigations, or command responses remains narrow and separately constituted.

## 3.5 Consent–authority separation

Consent and authority answer different questions. Consent asks whether a valid holder agrees within a scope. Authority asks whether the actor may lawfully act. Consequential action may require both; neither substitutes for the other.

## 3.6 Community without romanticization

Subsidiarity and local authority do not presume homogeneous communities. Internal minorities, outsiders, workers, residents, migrants, future users, neighbouring communities, and affected Indigenous nations receive their own standing.

## 3.7 Affected-nation non-substitution

Only the specific affected Indigenous nation or nations may determine their representatives, law, consent, refusal, and protected knowledge. Global or retired frameworks cannot act as proxy.

## 3.8 Assessment without hidden veto

Readiness, ethics, epistemic, maturity, trust, and performance assessments SHALL expose uncertainty, risk, and missing conditions. They SHALL NOT become unreviewable approval or veto authorities.

## 3.9 Experimentation within rights

Experiments may vary methods and policies only within independently valid authority. Non-derogable rights, essential services, child protection, labour and pension duties, remedies, and irreversible harms cannot be treated as ordinary variables.

## 3.10 Active activation and renewal

Consequential operations begin only through a valid activation record. Temporary authority continues only through active reauthorization; silence and technical persistence do not renew it.

## 3.11 Metrics and models are review triggers

Scores, thresholds, KPIs, AI outputs, reputation systems, and sentiment analysis may trigger review. They SHALL NOT automatically fund, deny, suspend, sanction, scale, dissolve, or renew.

## 3.12 Technology non-sovereignty

DIDs, UCANs, cryptographic signatures, content addressing, smart contracts, blockchains, WASM modules, APIs, and adaptive rule engines support administration. They do not create public authority or make an unlawful action lawful.

## 3.13 Funding without constitutional leverage

Funding may support lawful reform. It SHALL NOT condition essential functions, participation support, or institutional survival on ideological conformity, adoption of a preferred method, or unratified charter redesign.

## 3.14 Closure is a constitutional act

A sunset date, completed task, depleted grant, archived record, or deleted service does not complete closure. Authority, assets, access, staff duties, beneficiaries, data, claims, and remedies must be resolved.

## 3.15 Cross-interface supremacy by action type

Where an action falls within emergency, security, ecological, financial, health, migration, adjudicative, or other specialized authority, the controlling domain interface governs. `GMEAIA/0.1` cannot be used to bypass it.

---

# 4. Action classes and transition rules

| Class | Name | Covered functions |
|---|---|---|
| A01 | Sense and observation | Signals, observations, complaints, opportunities, alerts, and preliminary claims. |
| A02 | Validation and jurisdictional triage | Provenance checks, uncertainty, severity review, affected-party mapping, routing, and referral. |
| A03 | Proposal and alternative formation | Candidate responses, objectives, alternatives, reversibility, resources, and expected effects. |
| A04 | Method selection and deliberation | Choice and adaptation of deliberative, epistemic, ethical, cultural, technical, or facilitation methods. |
| A05 | Affected-party authority, consent, refusal, and representation | Who is affected, who may decide, who must consent, who may refuse, and who may represent whom. |
| A06 | Authority verification and protected-domain classification | Legal source, jurisdiction, exact power, limits, activation state, and domains that cannot be ordinary experiments. |
| A07 | Trial authorization and adoption registration | Lawful permission to run a bounded trial and the record that an adoption has been claimed or accepted. |
| A08 | Operational activation and implementation | The distinct act that begins operations, assigns operators, releases resources, and starts clocks. |
| A09 | Monitoring, evidence, review, and challenge | Baselines, metrics, observations, causal assessment, complaints, interim relief, and corrections. |
| A10 | Amendment, pause, suspension, rollback, renewal, and scaling | Change control without silent expansion, including new-jurisdiction authorization. |
| A11 | Expiry, termination, closure, remedy, and authority return | Ending power, restoring prior arrangements, preserving duties, disposing data, and compensating harm. |
| A12 | Readiness, ethics, epistemic, and institutional assessment | Advisory assessments that expose risk and missing conditions without becoming hidden vetoes. |
| A13 | Facilitators, auditors, assessors, catalyst teams, and technical services | Qualifications, mandates, conflicts, complaints, liability, and non-monopoly rules. |
| A14 | Funding, procurement, participation support, and incentives | Financial authority, independent support, conditions, contracts, essential continuity, and appeals. |
| A15 | Institutional regeneration, charter change, and dissolution | Mandate review, governance redesign, staff and beneficiary continuity, succession, and unresolved duties. |
| A16 | Data, identity, automation, publication, archives, and tool stewardship | Identity versus office, protected data, AI limits, versioning, forks, failure libraries, and deletion. |
| A17 | Emergency, urgent, and coercive handoffs | CDEE/ECRC referrals, protected-domain exception routes, SCPA execution, and domain-specific interfaces. |
| A18 | Non-activation, sandboxing, conformance, and interoperability | Fail-closed pilots, authority-effect labels, handoff acceptance, compatibility, and release controls. |

## 4.1 Classification by consequence

A process SHALL be classified by what it can do to rights, duties, persons, services, assets, institutions, data, and nonparticipants—not by benevolent purpose, local popularity, or the friendly name of the tool.

## 4.2 Composite processes

A single workshop, platform flow, smart contract, or institutional programme may contain several action classes. Each class requires its own records and authority. Bundling SHALL NOT reduce the required safeguards.

## 4.3 Transition rule

The default consequential chain is:

`sense → validate → triage/referral → propose → select method → deliberate → map consent → verify authority → authorize trial → register adoption → activate → implement → monitor → review → amend/pause/renew/terminate → remedy → close`

A framework MAY omit stages that are genuinely inapplicable, but SHALL state why. It SHALL NOT silently collapse them.

## 4.4 Protected domains

- detention, arrest, restraint, policing, intelligence, search, seizure, force, weapons, border action, sanctions, and surveillance;
- migration status, asylum, deportation, confinement, or mobility restrictions;
- essential water, sanitation, food, shelter, healthcare, disability support, education, communication, or basic income;
- child protection, guardianship, substitute decision-making, or dependent-person care;
- title, tenure, rematriation, eviction, asset seizure, receivership, or permanent land/resource allocation;
- irreversible ecological intervention, species release, geoengineering, high-impact extraction, or destruction of protected habitat;
- high-risk AI, cyber operations, biotechnology, synthetic biology, nanotechnology, autonomous weapons, or containment;
- criminal, civil, administrative, or constitutional adjudication and evidence;
- emergency declaration, command, compulsory evacuation, rationing, or continuity powers;
- taxation, compulsory levy, funding freeze, benefit withdrawal, debt cancellation, or asset forfeiture;

Ordinary `GMEAIA-21` trial authorization is insufficient in these domains. `GMEAIA-56` and the controlling specialized interface are required.

---

# 5. Authority-effect and normative-force architecture

## 5.1 Authority-effect labels

| Label | Meaning |
|---|---|
| `none` | Educational, expressive, simulated, or descriptive; creates no procedural or legal effect. |
| `advisory` | Offers analysis or recommendations; the competent authority must respond only where another rule requires it. |
| `procedural_support` | Structures participation or records a process; does not decide the substantive issue. |
| `evidentiary` | May be considered as evidence for a stated purpose; does not establish liability, consent, or authority. |
| `consent_evidence` | Records a valid holder's decision within its exact scope; does not create jurisdiction or waive others' rights. |
| `authority_reference` | Points to an independently valid authority record; does not itself grant the power. |
| `authorizing` | A decision by a competent authority under an exact legal source; cannot be produced by a tool or method merely by schema conformance. |
| `activating` | Starts an already authorized action and its clocks. |
| `executing` | Carries out a separately authorized operation within defined limits. |
| `closing` | Terminates power, returns authority and assets, disposes data, and preserves unresolved duties. |

## 5.2 Normative-force states

Records SHALL distinguish at minimum: `draft`, `asserted`, `received`, `validated_for_purpose`, `referred`, `proposed`, `under_deliberation`, `consent_pending`, `authority_pending`, `authorized`, `registered`, `activated`, `paused`, `suspended`, `expired`, `terminated`, `closed`, `corrected`, `superseded`, `rejected`, and `unresolved`.

## 5.3 Fail-closed state

A consequential action SHALL remain `authority_pending` or `non_activated` when any required authority, consent, protected-domain, activation, review, or remedy field is missing, contested beyond the permitted threshold, expired, or rejected.

## 5.4 Public EGP mapping

| Public EGP operation | Minimum GMEAIA meaning | Consequential effect |
|---|---|---|
| `sense()` | `GMEAIA-04` plus evidence links | Assertion only; no automatic action |
| `propose()` | `GMEAIA-12` and `GMEAIA-13` | Candidate response only |
| `adopt()` | `GMEAIA-22` | Claimed acceptance or registration only unless the full authority envelope is valid |

The full consequential adoption envelope comprises, as applicable: `GMEAIA-01`, `09`–`11`, `18`–`25`, `28`–`30`, `34`, `37`–`39`, `42`, and domain-interface records.

---

# 6. Common record architecture

## 6.1 Record identity and linking

Every record SHALL have a stable identifier, schema version, source framework and version, action class, authority effect, normative force, status, accountable human officer, public summary, protected annex references, challenge state, review clock, and closure state.

## 6.2 Public and protected layers

The public layer SHALL reveal enough to identify the action, authority effect, status, general reasons, duration, review, challenge, and closure without exposing protected personal, Indigenous, security, health, whistleblower, commercial, or legal material. Protected annexes SHALL use access classes and purpose limitation.

## 6.3 Human accountability

Every consequential automated, organizational, or collective record SHALL name a human accountable officer or a lawfully constituted body with a reachable complaint route. An AI or sensor may be a source agent but not the final accountable authority.

## 6.4 Dependency graph

Systems SHALL preserve explicit links among source signals, proposals, consent, authority, activation, monitoring, review, correction, remedy, and closure. A correction SHALL propagate to every dependent decision.

## 6.5 Common header

The canonical common header contains **48 fields** and is reproduced in Appendix A.

---

# 7. Sensing, validation, severity, and routing

A broad right to sense supports emergence and accountability. It is paired with a narrow right to impose consequences.

- `GMEAIA-04` preserves the original signal and its asserted character.
- `GMEAIA-05` records provenance, protected sources, and uncertainty.
- `GMEAIA-06` validates only for a stated purpose.
- `GMEAIA-07` assesses urgency without creating power.
- `GMEAIA-08` routes the matter and requires explicit acceptance.

Adaptive rules engines MAY recommend recipients or deadlines. They SHALL NOT create a declaration, investigation, sanction, or intervention. Severity and urgency fields SHALL be labelled `self_asserted`, `machine_estimated`, `reviewed`, or `validated_for_purpose`.

---

# 8. Proposals, methods, deliberation, and knowledge integration

A proposal package SHALL make alternatives, rights effects, reversibility, resources, and distribution visible before the process selects a preferred method. Method selection SHALL preserve community self-identification and allow abandonment or forking.

Scientific, experiential, Indigenous, embodied, spiritual, intuitive, and model-generated contributions MAY all enter deliberation when their source, purpose, limits, and protected status are explicit. No contribution SHALL silently change category into forensic fact, medical evidence, legal proof, or public authority.

Facilitated consensus, majority vote, ceremony, sociocracy, sortition, citizen assemblies, youth councils, and other methods are procedural choices. Their substantive effect depends on the lawful decision authority and constituted decision rule.

---

# 9. Affected parties, Indigenous authority, consent, and refusal

The affected-party map precedes consent. An entity cannot ask only the easiest or most supportive participants and call the result community consent.

Consent records SHALL distinguish individual consent, collective authorization, worker or member decision, fiduciary permission, affected-nation consent, consultation, assent, and public-law enactment. Refusal SHALL NOT cause loss of basic services, standing, participation support, or remedy.

A community may refuse a method for its own process. That refusal does not automatically bind another lawful community, prevent individual participation, or control affected outsiders. The holder, object, scope, territory, duration, and remedy of refusal SHALL be explicit.

---

# 10. Trial authorization, adoption, activation, and implementation

## 10.1 The constitutional meaning of `adopt()`

An EGP `adopt()` event is a transport record. By itself it states that an identified agent claims that a proposal was adopted through a described process. A recipient SHALL NOT infer that the action is lawful, binding, funded, active, enforceable, or applicable to nonparticipants.

## 10.2 Trial authorization

A consequential trial SHALL identify the competent authority, participants, territory, duration, conditions, rights, essential minimums, monitoring, stop rules, rollback, remedy, and non-precedent status.

## 10.3 Activation

Activation SHALL be separate from authorization and registration. Smart contracts and software SHALL default to `non_activated` unless a valid `GMEAIA-23` is present and current.

## 10.4 Implementation

Operators may execute tasks within the implementation plan. They SHALL NOT infer new powers from objectives, urgency, convenience, method adaptation, resource availability, or technical capability.

---

# 11. Monitoring, review, scaling, renewal, and closure

Monitoring plans SHALL include baselines, counterfactuals, uncertainty, distributional effects, rights and essential-service indicators, qualitative evidence, and metric-gaming risks. Thresholds trigger review only.

A trial may continue, change, pause, or end through a reasoned review. Scaling requires a new authority package for the new jurisdiction, population, institution, purpose, or permanent legal effect.

Temporary authority expires unless actively renewed. Continuing duties persist. Closure is complete only when authority and access are removed, assets and services are returned or succeeded, records are disposed, open claims have custodians, and remedy remains available.

---

# 12. Assessments, readiness, ethics, and epistemic integrity

Readiness and maturity tools SHALL state their limited purpose. They may help select support, pacing, or method complexity. They SHALL NOT rank the worth, intelligence, sovereignty, trustworthiness, or entitlement of a community or institution.

Ethics and epistemic reviews MAY require a reasoned response where a charter says so. They SHALL NOT become shadow governments. Numerical defaults such as representation percentages, source counts, language coverage, module counts, or pass scores SHALL be labelled illustrative, local defaults, or binding only under separately adopted rules.

Assessment subjects SHALL have notice, access to methods and evidence, a right to correct data, minority reports, independent review, expiry, and a prohibition on unrelated use.

---

# 13. Facilitators, auditors, catalyst teams, and technical services

Facilitators support process quality. Auditors and assessors expose evidence and risk. Catalyst teams and liaisons provide assistance. Technical vendors provide tools. None becomes the substantive authority through expertise, embedded presence, certification, funding, or platform control.

Qualification systems SHALL allow local-equivalence recognition and participant choice. Conflicts, funding, complaints, replacement, removal, liability, record custody, and exit are mandatory for consequential roles.

---

# 14. Funding, participation support, procurement, and reform incentives

Funding decisions require their own fiscal and legal authority. Participation support SHALL remain available independently of agreement with the proposed method or outcome.

Conditions SHALL be proportionate to the funded purpose and SHALL NOT use essential-function continuity, short runways, public shaming, or access to independent advice as leverage for unratified institutional change. Procurement SHALL not outsource decision authority or create data and platform lock-in.

---

# 15. Institutional regeneration, charter change, and dissolution

Purpose and mandate audits can recommend retention, reform, transfer, merger, or closure. They cannot enact any option.

Voting shares, councils, vetoes, future-generation seats, citizen assemblies, and Indigenous representation become operative only through the institution's lawful charter-amendment process. Constituency, selection, powers, conflicts, accountability, removal, transition, and review must be constituted rather than merely enumerated.

Reform and dissolution SHALL protect workers, unions, pensions, beneficiaries, contracts, grants, pending cases, records, liabilities, and essential functions. A Dark Archive is a records custodian, not a dissolving authority.

---

# 16. Data, identity, automation, publication, and immutable systems

Identity systems distinguish authentication from authority. A valid signature proves that a key signed a record; it does not prove that the signer may bind a community, institution, jurisdiction, or affected person.

Public-by-default SHALL be implemented through public metadata and protected payloads, not universal disclosure. Append-only and content-addressed systems SHALL support corrected current state, access revocation, lawful deletion or crypto-shredding, sealed archives, and dependency propagation.

AI and automated systems SHALL have a prohibited-decision list, a responsible human, versioned methods, audit logs, challenge routes, correction, shutdown, and a ban on using hidden developmental, cultural, political, spiritual, or psychological profiling for consequential routing.

---

# 17. Emergency, protected-domain, coercive, and cross-framework interfaces

Crisis tools, quick-start pathways, alert packets, 72-hour kits, and urgent diagnostics create records and referrals. Emergency declaration, command, compulsory information access, emergency finance, operational missions, extension, termination, and remedy follow ECRC/CDEE.

Protected-domain experiments require both `GMEAIA-56` and the controlling domain authority. Security and coercive execution require `GMEAIA-57` and SCPA. Ecological, title, guardianship, essential-resource, inspection, and enforcement actions also inherit CERGTA where applicable.

A cross-framework API or event bus SHALL treat recipient acceptance as a distinct record. Schema compatibility is not legal acceptance.

---

# 18. Canonical record catalogue

## GMEAIA-01 — Constituting Instrument, Legal Source, Jurisdiction, and Activation Status

**Action class:** `A06`  
**Purpose:** Identifies the presently valid source of authority for a consequential governance action.

**Required content:**
- constituting instrument and exact section;
- competent authority and office holder or body;
- territorial, personal, subject-matter, and temporal jurisdiction;
- exact power and prohibited uses;
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

**Lifecycle relation:** Required before any consequential routing that relies on severity, urgency, or identity.

## GMEAIA-07 — Severity, Urgency, Reversibility, and Uncertainty Assessment

**Action class:** `A02`  
**Purpose:** Separates the seriousness and time sensitivity of a problem from the power available to address it.

**Required content:**
- harm dimensions and exposed populations;
- time horizon and rate of change;
- reversibility and lock-in;
- confidence and uncertainty;
- alternative explanations;
- distributional effects;
- least-harmful delay and action options;
- review clock;

**Prohibited inference:**
- High severity or immediate urgency cannot create jurisdiction, emergency status, coercive power, or automatic priority over rights.

**Lifecycle relation:** May inform routing, review clocks, and precautionary recommendations.

## GMEAIA-08 — Jurisdictional Triage, Competent-Authority Referral, and Acceptance

**Action class:** `A02`  
**Purpose:** Routes a validated matter to a potentially competent authority without transferring power by silence.

**Required content:**
- referring actor and source record;
- candidate authority and jurisdiction;
- issue and requested function;
- records and protected annex transmitted;
- basis for competence;
- acceptance, rejection, or request for clarification;
- handoff clock and custody;
- return, escalation, and unresolved-routing state;

**Prohibited inference:**
- Referral, receipt, notification, or silence does not create acceptance or transfer authority.

**Lifecycle relation:** Must reach explicit acceptance before the recipient acts under the referral.

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
- representation gaps and internal plurality;
- notice, participation, support, and remedy needs;

**Prohibited inference:**
- A majority, host institution, platform, geographic label, or community leadership cannot erase internal minorities or affected outsiders.

**Lifecycle relation:** Required before consent, trial authorization, scaling, or institutional redesign.

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
**Purpose:** Ensures that participation is informed, accessible, materially possible, and not dependent on adopting the proposed method.

**Required content:**
- notice content and languages;
- accessible, offline, oral, assisted, and disability formats;
- time and location;
- independent legal, technical, cultural, or financial advice;
- care, transport, connectivity, income, and safety support;
- anti-retaliation and anonymity options;
- records access and correction;
- non-participation and alternative participation routes;

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

## GMEAIA-13 — Proposal Objective, Alternatives, Rights Effects, and Reversibility Record

**Action class:** `A03`  
**Purpose:** Makes the substantive choice and its alternatives reviewable before method or authority decisions.

**Required content:**
- objectives and success conditions;
- action and non-action alternatives;
- rights and essential-service effects;
- distribution of benefits and burdens;
- reversibility, rollback, and stranded commitments;
- resource, staffing, and technology needs;
- known unknowns and failure modes;
- proposed duration, review, and exit;

**Prohibited inference:**
- A good objective or reversible design does not supply authority; a low-cost pilot can still violate rights.

**Lifecycle relation:** Required before deliberation and trial authorization.

## GMEAIA-14 — Method Selection, Cultural Adaptation, Autonomy Statement, and Authority Effect

**Action class:** `A04`  
**Purpose:** Records why a deliberative, assessment, technical, or implementation method was chosen and how it was adapted.

**Required content:**
- method and version;
- decision owner and participants;
- selection rationale and alternatives;
- community-chosen adaptations;
- self-identification and internal plurality;
- authority-effect label;
- known biases and exclusions;
- review, fork, and abandonment route;

**Prohibited inference:**
- Cultural adaptation cannot classify a community from outside, essentialize identity, or authorize acts beyond the adopting authority.

**Lifecycle relation:** Links selected methods to their bounded purpose.

## GMEAIA-15 — Deliberation Plan, Facilitation Mandate, Record, Dissent, and Reasons

**Action class:** `A04`  
**Purpose:** Defines how a proposal will be deliberated and how facilitation remains subordinate to the lawful decision body.

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

## GMEAIA-16 — Epistemic Readiness, Provenance, Disinformation, and Trust Assessment

**Action class:** `A12`  
**Purpose:** Provides an advisory account of whether the information environment can support a decision.

**Required content:**
- assessment authority, method, and independence;
- claims and evidence reviewed;
- provenance and source diversity;
- missing, inaccessible, or protected knowledge;
- disinformation exposure;
- language and accessibility gaps;
- trust and power conditions;
- uncertainty, dissent, recommended repairs, and non-veto status;

**Prohibited inference:**
- A threshold, score, certification failure, or remediation recommendation cannot suspend a lawful decision or create an emergency exception.

**Lifecycle relation:** The competent decision body records how it responds to the assessment.

## GMEAIA-17 — Ethics, Harm, Rights, and Anti-Capture Advisory Review

**Action class:** `A12`  
**Purpose:** Surfaces ethical risks, rights impacts, capture, conflicts, and missing safeguards without becoming hidden approval power.

**Required content:**
- review body and competence;
- ethical sources and plural foundations;
- affected-party and rights analysis;
- capture and conflict analysis;
- protected knowledge and non-transfer;
- foreseeable harms and alternatives;
- recommendations and dissent;
- advisory status and response requirement;

**Prohibited inference:**
- An ethics gate, MOS alignment, Indigenous-framework representative, or certified reviewer cannot create or withhold legal authority.

**Lifecycle relation:** Must be answered with reasons where the governing charter requires review.

## GMEAIA-18 — Consent Requirement, Holder, Scope, and Dependency Map

**Action class:** `A05`  
**Purpose:** Determines which forms of consent, authorization, consultation, notice, assent, or collective decision are actually required.

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
- Consent cannot create jurisdiction over third parties or waive non-derogable rights; one consent holder cannot waive another's rights.

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

## GMEAIA-20 — Authority Verification, Decision Class, and Protected-Domain Classification

**Action class:** `A06`  
**Purpose:** Confirms whether the proposed action is within ordinary experimentation or requires a specialized constitutional route.

**Required content:**
- authority record;
- decision class and consequence;
- affected domain;
- protected-domain screening;
- applicable constitutional interfaces;
- non-derogable rights and essential duties;
- required independent authorizations;
- verification result and unresolved gaps;

**Prohibited inference:**
- Method simplicity, local popularity, reversibility, urgency, or expected benefit cannot downgrade a protected domain.

**Lifecycle relation:** Fail-closed gate before trial authorization.

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
- An `adopt()` event without complete authority references means only that adoption was claimed; it is not binding or active.

**Lifecycle relation:** May precede or follow trial authorization depending on local law, but cannot replace it.

## GMEAIA-23 — Operational Activation, Start Conditions, Operator, and Clock Record

**Action class:** `A08`  
**Purpose:** Distinctly starts an authorized action and begins its legal, operational, review, and expiry clocks.

**Required content:**
- authorization and adoption records;
- activation authority;
- operator and accountable lead;
- preconditions satisfied;
- start time and territory;
- resources released;
- monitoring and incident channels;
- review, expiry, stop, and rollback clocks;

**Prohibited inference:**
- Authorization, registration, smart-contract creation, software deployment, or funding approval does not equal activation unless this record is valid.

**Lifecycle relation:** Makes the action operational.

## GMEAIA-24 — Implementation Plan, Responsibilities, Dependencies, and Service Boundaries

**Action class:** `A08`  
**Purpose:** Translates authorization into accountable tasks without expanding scope.

**Required content:**
- work packages and responsible actors;
- affected persons and participation;
- dependencies and handoffs;
- budgets and procurement;
- data and technology;
- essential-service and safety boundaries;
- incident, complaint, and change control;
- completion and closure conditions;

**Prohibited inference:**
- An implementer cannot reinterpret broad goals as new powers or treat operational convenience as amendment.

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
- worker, beneficiary, and essential-function continuity;
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
- termination, continuity, and migration;
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
- prohibited decisions and protected domains;
- logging, challenge, correction, and shutdown;
- retention and vendor dependencies;

**Prohibited inference:**
- AI and sensors cannot provide consent, establish representation, declare an emergency, determine jurisdiction, authorize adoption, activate powers, adjudicate, sanction, or renew authority.

**Lifecycle relation:** Required before automated assistance is used.

## GMEAIA-30 — Monitoring Plan, Baseline, Metric, Counterfactual, and Review Schedule

**Action class:** `A09`  
**Purpose:** Defines what will be observed and how success or harm will be assessed without making metrics self-executing.

**Required content:**
- objectives and baseline;
- metrics and qualitative evidence;
- counterfactual and comparison;
- methods, uncertainty, and gaming risks;
- distributional and rights indicators;
- data responsibilities;
- review schedule and thresholds for human review;
- correction and retirement;

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

## GMEAIA-32 — Causal Assessment, Contribution, External Shock, and Uncertainty Record

**Action class:** `A09`  
**Purpose:** Separates measured change from a reasoned account of what caused it.

**Required content:**
- question and assessor;
- methods and evidence;
- counterfactual;
- alternative causes and external shocks;
- contribution and attribution;
- uncertainty and dissent;
- limits on use;
- review and correction;

**Prohibited inference:**
- A successful outcome does not prove the method caused it; a poor outcome does not prove operator misconduct or justify automatic withdrawal.

**Lifecycle relation:** Supports review, learning, and remedy.

## GMEAIA-33 — Midpoint Review, Corrective Action, and Continued-Operation Decision

**Action class:** `A09`  
**Purpose:** Determines whether an active trial continues unchanged, changes, pauses, or terminates.

**Required content:**
- review authority and independence;
- records reviewed;
- affected-party evidence;
- rights, safety, and service status;
- metric and causal assessment;
- conditions and corrective actions;
- decision, reasons, and dissent;
- next review and challenge;

**Prohibited inference:**
- The original adopter or operator cannot unilaterally certify success where conflicts require independent review.

**Lifecycle relation:** May trigger amendment, pause, remedy, or continued operation.

## GMEAIA-34 — Complaint, Challenge, Interim Relief, Appeal, and Independent Review

**Action class:** `A09`  
**Purpose:** Provides an effective route to contest signals, scores, methods, consent, authority, implementation, publication, or harm.

**Required content:**
- complainant and standing;
- challenged action and requested relief;
- notice and evidence access;
- independent reviewer;
- interim relief and anti-retaliation;
- decision and reasons;
- appeal or reconsideration;
- remedy and correction propagation;

**Prohibited inference:**
- A complaint route is not effective if the challenged facilitator, funder, platform, adopter, or operator controls the outcome.

**Lifecycle relation:** Available throughout the lifecycle.

## GMEAIA-35 — Amendment, Scope Change, Version Change, and New-Risk Assessment

**Action class:** `A10`  
**Purpose:** Prevents operational changes from silently expanding authority.

**Required content:**
- current authorization and version;
- proposed change and rationale;
- materiality assessment;
- new affected parties, risks, data, or jurisdictions;
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
- performance and harm review;
- remaining need and alternatives;
- affected-party and consent update;
- jurisdiction and law update;
- conditions and amendments;
- new duration and clocks;
- decision, dissent, and challenge;

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
- final reasons, audit, and challenge;

**Prohibited inference:**
- A celebratory sunset, dashboard status, archive entry, or software deletion is not lawful closure.

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
- responsible publisher and remedy;

**Prohibited inference:**
- Consent to a pilot, employment, funding, facilitation, or testimony is not consent to permanent public storytelling.

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

**Lifecycle relation:** Required when signals, identities, scores, consent, authority, or outcomes are wrong.

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
- institutional or technical change;
- monitoring, closure, and appeal;

**Prohibited inference:**
- Ending a pilot or apologizing does not discharge remedy.

**Lifecycle relation:** May survive termination until complete.

## GMEAIA-43 — Scaling Recommendation, Transferability Limits, and Evidence Package

**Action class:** `A10`  
**Purpose:** Converts pilot learning into a bounded recommendation rather than automatic expansion.

**Required content:**
- source trial and context;
- evidence and uncertainty;
- necessary conditions;
- failed and excluded contexts;
- rights and distributional effects;
- resource and capacity needs;
- recommended scope and alternatives;
- non-authority status;

**Prohibited inference:**
- Success, reputation, funding tier, adoption count, or benchmark attainment cannot scale an action.

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
- funding, operator, and data;
- review, sunset or permanent amendment route;
- reasons and challenge;

**Prohibited inference:**
- A template, network effect, treaty aspiration, successful pilot, or cross-platform compatibility cannot create this authorization.

**Lifecycle relation:** Creates a new bounded authority chain, not an extension by inference.

## GMEAIA-45 — Institutional Purpose, Mandate, Power, and Obsolescence Audit

**Action class:** `A15`  
**Purpose:** Assesses whether an institution or programme still serves its lawful mandate.

**Required content:**
- charter and mandate;
- auditor and independence;
- beneficiaries and affected parties;
- performance, harms, and alternatives;
- power and capture analysis;
- essential and unresolved functions;
- options: retain, reform, transfer, merge, or close;
- advisory status, dissent, and response;

**Prohibited inference:**
- A scorecard, AI diagnostic, trust score, or audit finding cannot amend or dissolve an institution.

**Lifecycle relation:** Feeds charter review or closure authorization.

## GMEAIA-46 — Charter Amendment, Governance Redesign, Constituency, and Decision-Rights Record

**Action class:** `A15`  
**Purpose:** Constitutes lawful institutional redesign, including councils, voting shares, vetoes, and representation.

**Required content:**
- charter-amendment authority and procedure;
- proposed bodies and powers;
- constituencies and selection;
- mandates, conflicts, removal, and accountability;
- rights and minority safeguards;
- affected Indigenous nation authority;
- transition and legal continuity;
- approval, entry into force, review, and challenge;

**Prohibited inference:**
- A governance blueprint, facilitator recommendation, fixed percentage, youth or future-generation label, or toolkit adoption cannot amend a charter.

**Lifecycle relation:** Required before governance redesign becomes operative.

## GMEAIA-47 — Institutional Funding Eligibility, Condition, Incentive, and Appeal Record

**Action class:** `A14`  
**Purpose:** Separates institutional finance from coercive reform leverage.

**Required content:**
- funding authority and programme;
- eligibility criteria and evidence;
- condition and relation to mandate;
- essential-function and beneficiary impact;
- worker and pension safeguards;
- independence from method or ideology conformity;
- decision, reasons, and duration;
- appeal, correction, and transition support;

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
- notice, participation, remedy, and review;

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
- final audit, remedy, and challenge;

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
- duration and record custody;

**Prohibited inference:**
- Certification does not create decision authority; lack of certification cannot exclude locally trusted competence or block urgent access to participation.

**Lifecycle relation:** Required for consequential facilitated processes.

## GMEAIA-51 — Auditor, Assessor, Ethics Reviewer, and Epistemic Reviewer Independence Record

**Action class:** `A13`  
**Purpose:** Defines independence, competence, funding, evidence access, dissent, and appeal for review functions.

**Required content:**
- reviewer identity and mandate;
- selection and qualification;
- funding and beneficial interests;
- conflicts and recusal;
- method and evidence access;
- minority reports;
- publication and protected annex;
- complaint, correction, and removal;

**Prohibited inference:**
- The reviewer cannot simultaneously design, sell, fund, operate, and finally adjudicate the same method without explicit safeguards and independent appeal.

**Lifecycle relation:** Required for consequential audits and gates.

## GMEAIA-52 — Catalyst Team, Liaison, Evolution Cell, and Technical-Assistance Mandate

**Action class:** `A13`  
**Purpose:** Bounds support actors embedded in communities or institutions.

**Required content:**
- host invitation and appointing authority;
- purpose and tasks;
- no-command and no-representation limits;
- access to people, systems, and records;
- funding and conflicts;
- staff and community protections;
- duration, exit, and handover;
- complaints, liability, and learning;

**Prohibited inference:**
- Support, expertise, embedded presence, emergency context, or host dependency does not create authority to govern the host.

**Lifecycle relation:** Required before external implementation support begins.

## GMEAIA-53 — Tool Core, Fork, Schema, Compatibility, Version, Deprecation, and Stewardship Record

**Action class:** `A16`  
**Purpose:** Keeps modular tools adaptable without invisible central control or unsafe divergence.

**Required content:**
- tool and schema identity;
- normative core versus optional profile;
- steward and change process;
- compatibility promises;
- fork rights and labels;
- security and migration support;
- deprecation and rollback;
- dispute, correction, and archive;

**Prohibited inference:**
- The central steward cannot make local legal decisions through a software update; a fork cannot claim compatibility while omitting constitutional fields.

**Lifecycle relation:** Required for EGP profiles and tool libraries.

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
- service and remedy parity;

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
- data, finance, remedy, and unresolved risk;

**Prohibited inference:**
- A crisis stack, 72-hour kit, urgent score, PIS notification, facilitator, AI alert, or community adoption cannot declare an emergency.

**Lifecycle relation:** Required before emergency powers or cross-domain missions activate.

## GMEAIA-56 — Protected-Domain Experiment Exception and Specialized-Interface Authorization

**Action class:** `A17`  
**Purpose:** Allows carefully bounded pilots in protected domains only through the controlling constitutional interface.

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
- termination, remedy, and return;

**Prohibited inference:**
- An adopter, facilitator, funder, community, smart contract, platform, ethics reviewer, or implementation team cannot search, seize, detain, restrain, freeze, sanction, or use force through this specification.

**Lifecycle relation:** Required for coercive execution.

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

## GMEAIA-59 — Cross-Framework Handoff, Conformance, Recipient Acceptance, and Custody Record

**Action class:** `A18`  
**Purpose:** Makes interoperability explicit and prevents a receiving framework from inferring missing authority.

**Required content:**
- source and destination frameworks and versions;
- source records and action class;
- requested function;
- controlling interface;
- authority and protected-data package;
- acceptance, rejection, or partial acceptance;
- custody, access, and clocks;
- return, closure, and unresolved state;

**Prohibited inference:**
- Schema compatibility, API receipt, event subscription, or shared terminology does not mean legal acceptance.

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

**Lifecycle relation:** Required at closure and when consent or authority ends.

---

# 19. Constitutional readiness gates

An adopting framework, protocol package, tool library, software profile, or institutional programme SHALL pass every gate before claiming full `GMEAIA/0.1` conformance.

## G01 — Method–authority separation

**Pass condition:** Every method, tool, protocol, template, assessment, score, and software function states its authority effect and cannot create power by implication.

## G02 — Exact legal source and jurisdiction

**Pass condition:** Every consequential action identifies a valid source, exact power, authority, jurisdiction, limits, activation state, review, and expiry.

## G03 — Signal–fact separation

**Pass condition:** Sense signals and complaints remain assertions until validated for a defined purpose.

## G04 — Severity without jurisdiction

**Pass condition:** Severity and urgency influence routing and clocks but never create emergency, coercive, fiscal, or adjudicative power.

## G05 — Referral acceptance

**Pass condition:** A referral transfers records, not authority; the recipient must explicitly accept the requested function.

## G06 — Agent and office distinction

**Pass condition:** Identity, signature, DID, UCAN, API key, organization, AI, sensor, or certificate is not public office or representation.

## G07 — Proposal non-authority

**Pass condition:** Proposals, algorithmic recommendations, petitions, and agenda items do not create consent or authorization.

## G08 — Affected-party constitution

**Pass condition:** Residents, workers, users, minorities, non-members, outsiders, and transboundary effects are mapped before consequential action.

## G09 — Affected Indigenous nation authority

**Pass condition:** The specific affected nation controls its representatives, law, consent, protected knowledge, refusal, and withdrawal.

## G10 — Consent constitution

**Pass condition:** Consent holders, scope, dependencies, refusal, withdrawal, internal dissent, and non-retaliation are structured and reviewable.

## G11 — Consent–jurisdiction separation

**Pass condition:** Consent cannot create power over third parties, waive non-derogable rights, or authorize a body otherwise lacking jurisdiction.

## G12 — Epistemic assessment non-veto

**Pass condition:** Epistemic readiness exposes uncertainty and repair needs but cannot suspend lawful decisions or create emergency exceptions.

## G13 — Ethics review non-authority

**Pass condition:** Ethics gates and advisory reviewers cannot approve or block actions unless a separate lawful authority expressly gives a bounded review power.

## G14 — Facilitator subordination

**Pass condition:** Facilitators do not decide substantive questions; qualifications, conflicts, complaints, replacement, and local-equivalence routes exist.

## G15 — Readiness score non-disposition

**Pass condition:** Readiness and maturity scores cannot determine rights, standing, essential support, intervention, or funding automatically.

## G16 — Protected-domain fail-closed

**Pass condition:** Ordinary experiments exclude protected domains unless the specialized interface separately authorizes them.

## G17 — Trial authorization

**Pass condition:** Consequential experiments have exact scope, participants, duration, conditions, monitoring, rollback, remedy, and non-precedent status.

## G18 — Adoption envelope

**Pass condition:** A consequential `adopt()` references valid consent, authority, jurisdiction, rights, activation, clocks, review, exit, and remedy records.

## G19 — Activation separation

**Pass condition:** Authorization, funding, registration, code deployment, or smart-contract creation does not start operations without a valid activation record.

## G20 — Essential and continuing duties

**Pass condition:** Rights, essential services, safety, workers, pensions, records, restoration, and remedy do not expire through ordinary sunset logic.

## G21 — Metrics non-automation

**Pass condition:** Scores, thresholds, sentiment, reputation, KPIs, or model outputs trigger human review only.

## G22 — AI prohibited decisions

**Pass condition:** AI and sensors cannot consent, represent, authorize, activate, adjudicate, sanction, declare emergencies, or renew powers.

## G23 — Amendment control

**Pass condition:** Method adaptation, software updates, feature changes, and operator practice cannot silently expand authority.

## G24 — Active renewal

**Pass condition:** Temporary powers continue only through reasoned reauthorization and any required re-consent; silence is not renewal.

## G25 — Scaling requires new authority

**Pass condition:** Pilot success and network adoption do not scale a measure into new persons, territory, institutions, or permanent law.

## G26 — Funding independence

**Pass condition:** Funding and participation support have independent authority, appeal, essential-function safeguards, and no method or ideology conformity test.

## G27 — Institutional charter legality

**Pass condition:** Governance blueprints, voting shares, vetoes, councils, and representation become operative only through lawful charter amendment.

## G28 — Institutional continuity

**Pass condition:** Reform, merger, defunding, or dissolution protects workers, pensions, beneficiaries, contracts, pending cases, and essential functions.

## G29 — Audit independence

**Pass condition:** Assessors and auditors disclose competence, funding, conflicts, methods, dissent, correction, complaint, and removal.

## G30 — Protected data and publication

**Pass condition:** Public-by-default, immutability, story banks, failure libraries, dashboards, and archives preserve access controls, withdrawal, correction, and lawful deletion.

## G31 — Offline and assisted parity

**Pass condition:** Paper, oral, witnessed, assisted, and offline records have equal standing, service, clocks, and remedy.

## G32 — Tool stewardship and versioning

**Pass condition:** Normative core, optional profiles, schemas, forks, compatibility, deprecation, rollback, and migration are explicit.

## G33 — Emergency interface

**Pass condition:** Crisis tools create referrals only; declaration, command, finance, information access, termination, and remedy follow ECRC/CDEE.

## G34 — Coercive interface

**Pass condition:** Search, seizure, detention, force, surveillance, sanctions, asset freezes, and analogous execution require SCPA and domain authority.

## G35 — Correction and dependency propagation

**Pass condition:** Errors in identity, signals, scores, consent, authority, or outcomes correct every dependent record and decision.

## G36 — Closure and authority return

**Pass condition:** Every action and institution ends with deactivation, authority and asset return, data disposition, unresolved-duty custody, and effective remedy.

---

# 20. Compound implementation test suite

The following tests define required behaviour. A conforming implementation SHALL produce the stated outcome and the linked records needed to prove it.

## T01 — Sensor reports river pollution with immediate urgency

**Required outcome:** The signal is received as an assertion; validation and CERGTA/ECRC routing occur separately; no automatic closure or emergency.

## T02 — AI copilot generates a policy proposal

**Required outcome:** The proposal is labelled machine-generated and advisory; no consent, authorization, or adoption is inferred.

## T03 — Smart contract creates an adoption and marks it active

**Required outcome:** The contract proves technical execution only; without GMEAIA-01, -19, -21, and -23 the action remains legally inactive.

## T04 — UCAN grants `egp:adopt` to a user

**Required outcome:** The token grants software capability only and cannot establish public office or jurisdiction.

## T05 — Neighbourhood adopts a six-month workshop format

**Required outcome:** A low-consequence internal method may proceed under its charter; records show scope, consent, accessibility, review, and exit.

## T06 — Neighbourhood adopts a curfew affecting public streets

**Required outcome:** Protected security and mobility domain; ordinary EGP adoption fails closed and requires lawful public and SCPA authority.

## T07 — Local majority adopts action on affected Indigenous territory

**Required outcome:** No activation until the affected nation’s own authority and law are recorded; majority consent cannot substitute.

## T08 — Community refuses a GGF tool for its own meeting

**Required outcome:** Refusal is respected without loss of standing, services, support, or remedy.

## T09 — Community seeks to veto another community’s independent process

**Required outcome:** Refusal is bounded to the holder’s rights and jurisdiction; no extraterritorial veto is inferred.

## T10 — Readiness assessment labels a community low-capacity

**Required outcome:** The score is advisory, contestable, expiring, and cannot deny funds, rights, or self-government.

## T11 — Ethics panel rejects a locally adapted tool

**Required outcome:** The panel issues reasons and recommendations; the lawful authority decides unless a separate bounded review power exists.

## T12 — Global Indigenous representative gives dual-key approval

**Required outcome:** Approval is invalid for affected-nation consent; GMEAIA-10 and -19 are required.

## T13 — WDIP Phase 0 fails an epistemic threshold

**Required outcome:** The decision body receives an uncertainty and repair assessment; no automatic veto or indefinite pause follows.

## T14 — Existential urgency is claimed to bypass epistemic review

**Required outcome:** Urgency affects clocks but does not create authority; ECRC/CDEE governs emergency activation.

## T15 — Facilitator is not centrally certified but is locally trusted

**Required outcome:** Local-equivalence route permits appointment with accountability and participant choice.

## T16 — Certified facilitator manipulates the agenda

**Required outcome:** Complaint, replacement, record correction, and remedy operate; certification provides no immunity.

## T17 — Pilot uses health data and publishes a story

**Required outcome:** Publication requires separate consent, minimization, anonymization, withdrawal, and protected-data controls.

## T18 — Protected Indigenous knowledge is stored in an immutable ledger

**Required outcome:** Only protected metadata may be public; payload access, revocation, return, and deletion follow affected-nation rules.

## T19 — Sunset expires a temporary advisory committee

**Required outcome:** The committee deactivates and returns records and authority; open duties transfer to a successor.

## T20 — Sunset expires a child-protection obligation

**Required outcome:** Continuing-duty record prevents expiry until lawfully discharged.

## T21 — Pilot metric meets success threshold

**Required outcome:** A scaling recommendation may issue; new-jurisdiction or permanent action requires GMEAIA-44.

## T22 — Pilot metric fails because of an external shock

**Required outcome:** Causal assessment separates context from misconduct; no automatic funding withdrawal or operator penalty.

## T23 — AI sentiment analysis lowers an institution’s regeneration score

**Required outcome:** The output is advisory and challengeable; it cannot trigger funding, charter change, or closure.

## T24 — GCF funding requires three modules

**Required outcome:** A separate funding authority must justify the condition, protect essential functions and workers, and offer appeal; module count is not self-executing.

## T25 — Funder shortens runway to pressure charter reform

**Required outcome:** The condition fails if it coerces constitutional change or endangers beneficiaries without lawful authority and safeguards.

## T26 — Institution adopts a Youth Council with 30% voting power

**Required outcome:** A toolkit proposal is insufficient; lawful charter amendment must constitute the constituency, powers, accountability, and transition.

## T27 — Purpose audit recommends institutional dissolution

**Required outcome:** The recommendation remains advisory; GMEAIA-49 requires lawful dissolution and succession.

## T28 — Institution is abruptly defunded and records enter a Dark Archive

**Required outcome:** Archive custody preserves confidentiality, access, deletion, and unresolved duties; deposit does not dissolve the institution.

## T29 — Quick-start crisis kit sends an escalation packet

**Required outcome:** The packet becomes a CDEE referral; no emergency exists until competent declaration or mission acceptance.

## T30 — Community disaster team begins rescue under accepted mission

**Required outcome:** GMEAIA-55 links command, mission, clocks, information, finance, termination, and remedy.

## T31 — Pilot withdraws household water after non-payment

**Required outcome:** Protected essential service; ordinary experiment fails closed and controlling water/CERGTA authority is required.

## T32 — Pilot tests a voluntary participatory-budget workshop

**Required outcome:** May proceed with bounded authority, informed participation, data protections, review, and no effect on nonparticipants.

## T33 — Institutional pilot restructures pensions

**Required outcome:** Protected continuing obligations require charter, labour, financial, and legal authority; ordinary pilot invalid.

## T34 — AI tool finder recommends a talking-circle guide

**Required outcome:** Permitted advisory use if no profiling, hidden ranking, or consequential routing occurs.

## T35 — AI readiness score routes communities to different grant levels

**Required outcome:** Prohibited automated disposition; human funding authority, reasons, evidence, and appeal required.

## T36 — A software update adds automatic renewal

**Required outcome:** Material change cannot amend legal clocks; active reauthorization remains mandatory.

## T37 — Offline paper consent conflicts with app record

**Required outcome:** Paper and witnessed records have equal dignity; identity collision and correction process resolves the conflict.

## T38 — Failure library contains identifiable whistleblower testimony

**Required outcome:** Publication pauses; consent, safety, protected-source handling, withdrawal, and remedy are required.

## T39 — Implementation team requests seizure of project equipment

**Required outcome:** Execution requires enforceable underlying order, SCPA acceptance, individualized safeguards, and separate command.

## T40 — Trial closes with unresolved compensation claim

**Required outcome:** Operational authority ends, but GMEAIA-42 and unresolved-duty custody remain active until remedy is complete.

---

# Appendix A — Common GMEAIA record header

| Field | Requirement |
|---|---|
| `record_id` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `record_type` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `schema_version` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `created_at` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `effective_at` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `expires_at` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `status` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `normative_force` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `authority_effect` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `action_class` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `source_framework_id` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `source_framework_version` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `source_record_ids` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `supersedes` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `superseded_by` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `actor_id` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `actor_type` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `office_or_role` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `representation_source` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `technical_credential_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `constituting_instrument` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `legal_power` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `jurisdiction_territorial` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `jurisdiction_personal` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `jurisdiction_subject_matter` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `jurisdiction_temporal` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `affected_party_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `affected_indigenous_nation_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `protected_domain_flags` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `consent_record_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `authority_record_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `activation_record_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `access_class` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `public_summary` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `protected_annex_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `data_purpose` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `retention_rule` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `correction_status` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `challenge_status` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `review_due_at` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `closure_state` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `unresolved_duty_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `handoff_state` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `recipient_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `recipient_acceptance_refs` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `hashes_and_signatures` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `human_accountable_officer` | Required unless the record type explicitly marks it inapplicable with reasons. |
| `prohibited_inferences` | Required unless the record type explicitly marks it inapplicable with reasons. |

---

# Appendix B — Access classes

- **`PUBLIC`:** Open content whose disclosure does not materially harm protected interests.
- **`AFFECTED_PARTIES`:** Available to affected persons and authorized representatives.
- **`DECISION_BODY`:** Available to members and staff of the competent decision authority.
- **`INDEPENDENT_REVIEW`:** Available to authorized auditors, courts, ombuds, or appeal bodies.
- **`PROTECTED_PERSONAL`:** Personal, health, child, disability, worker, survivor, or safety-sensitive information.
- **`PROTECTED_INDIGENOUS`:** Knowledge and records controlled by the affected Indigenous nation or lawful custodian.
- **`PROTECTED_SOURCE`:** Whistleblower, witness, journalistic, research, or confidential-source material.
- **`SECURITY_RESTRICTED`:** Material whose disclosure would create a specific safety or system-security risk.
- **`SEALED_LEGAL`:** Sealed evidence, privileged advice, deliberative secrecy, or legally restricted records.

---

# Appendix C — Lifecycle and handoff states

## C.1 Lifecycle

`draft → asserted/received → validated_for_purpose → referred/proposed → under_deliberation → consent_pending → authority_pending → authorized → registered → activated → paused/suspended → renewed/expired/terminated → closed`

Any state may enter `challenged`, `corrected`, `superseded`, `rejected`, or `unresolved` as appropriate.

## C.2 Handoff

`not_requested`, `prepared`, `sent`, `received`, `accepted`, `partially_accepted`, `rejected`, `returned`, `closed`, `unresolved`.

Only `accepted` or `partially_accepted` may authorize the recipient to act, and only within the accepted function and its own authority.

---

# Appendix D — Protected-domain checklist

- [ ] The proposal has been screened for detention, arrest, restraint, policing, intelligence, search, seizure, force, weapons, border action, sanctions, and surveillance.
- [ ] The proposal has been screened for migration status, asylum, deportation, confinement, or mobility restrictions.
- [ ] The proposal has been screened for essential water, sanitation, food, shelter, healthcare, disability support, education, communication, or basic income.
- [ ] The proposal has been screened for child protection, guardianship, substitute decision-making, or dependent-person care.
- [ ] The proposal has been screened for title, tenure, rematriation, eviction, asset seizure, receivership, or permanent land/resource allocation.
- [ ] The proposal has been screened for irreversible ecological intervention, species release, geoengineering, high-impact extraction, or destruction of protected habitat.
- [ ] The proposal has been screened for high-risk AI, cyber operations, biotechnology, synthetic biology, nanotechnology, autonomous weapons, or containment.
- [ ] The proposal has been screened for criminal, civil, administrative, or constitutional adjudication and evidence.
- [ ] The proposal has been screened for emergency declaration, command, compulsory evacuation, rationing, or continuity powers.
- [ ] The proposal has been screened for taxation, compulsory levy, funding freeze, benefit withdrawal, debt cancellation, or asset forfeiture.

- [ ] The controlling specialized interface and exact authority are identified.
- [ ] Non-derogable rights, essential services, independent monitoring, stop authority, rollback, and remedy are complete.

---

# Appendix E — EGP conformance profile

An EGP implementation claiming `GMEAIA/0.1` conformance SHALL:
- treat `sense()` as an asserted signal and expose validation state;
- treat `propose()` as a candidate response and expose sponsor, alternatives, affected parties, rights effects, and advisory status;
- treat `adopt()` as an adoption claim unless authority-envelope validation succeeds;
- separate `authorized`, `registered`, and `activated` states;
- prevent AI, sensors, smart contracts, rule engines, reputation systems, and subscriptions from creating consequential transitions;
- preserve public metadata while protecting restricted payloads;
- support correction, retraction, access revocation, deletion or crypto-shredding, and dependency propagation;
- support paper, oral, witnessed, assisted, and offline records with equal standing;
- mark prototypes, sandboxes, simulations, and demonstrations as non-activated;
- expose recipient acceptance for every consequential cross-framework handoff;
- pin the normative core, schema, appendix, quick-start, and glossary to exact compatible versions.

---

# Appendix F — Minimum conformance crosswalk

| Framework or package | Minimum adoption |
|---|---|
| EGP package | Records 02–08, 12–24, 28–30, 34–44, 53–60; public-operation mapping; non-automation rules |
| Implementation & Adaptation | Records 09–20, 26, 34, 43–44, 50–56; readiness and ethics non-disposition |
| Implementation Methods & Tools | Records 02, 14, 24, 28–29, 40–42, 50–54, 58–60; authority-effect labels and low-tech parity |
| Institutional Regeneration | Records 16–17, 26–27, 30–35, 43–53, 59–60; charter, labour, funding, and closure |
| WDIP | Records 09–19, 28–34, 41, 50–51, 54, 59–60; epistemic review without veto and protected knowledge |
| Emergency uses | Records 04–08, 20, 25, 28–29, 34, 55–60 plus ECRC/CDEE |
| Security or coercive uses | Records 01, 08–11, 20–25, 28–36, 42, 56–60 plus SCPA |
| Ecological, commons, title, or resource uses | Relevant GMEAIA records plus CERGTA |

---

# Appendix G — Versioning and compatibility

The normative Markdown, machine-readable registry, JSON Schema, and example envelope in this release form one compatibility set. A derivative SHALL pin the exact GMEAIA version and SHALL NOT claim compatibility if it omits mandatory fields, changes authority-effect meanings, permits automated consequential transitions, or weakens protected-domain, correction, closure, or remedy requirements.

---

# Appendix H — Final constitutional statement

> **Governance can be simple at the interface without being simple about power.**

The three public verbs may remain memorable. The deeper record system exists so that a signal can travel without becoming a verdict, a proposal can circulate without becoming consent, an adoption can be shared without becoming law, and an experiment can teach without making people, communities, institutions, or the living world into unprotected test material.
