---
title: The Emergent Governance Protocol
section: emergent-governance-protocol
version: 1.2
package: EGP/1.2
status: gmeaia-v0.2.1-harmonized-protocol
date: 2026-08-06
constitutional_interface: CIS/0.2.1
controlling_interface: GMEAIA/0.2.1
---

# The Emergent Governance Protocol (EGP) v1.2
## *The Minimum Viable Grammar for Coordinated, Bounded, and Learnable Governance*

**Status:** Ready for non-consequential use, voluntary bounded practice, and constitutionally authorized pilots  
**Package:** `EGP/1.2`  
**Constitutional interface:** `CIS/0.2.1`  
**Controlling authority interface:** `GMEAIA/0.2.1`  
**Legal character:** Interoperability and event-transport protocol; not a source of jurisdiction, consent, public office, legal effect, emergency authority, funding authority, adjudication, or enforcement  
**Source successor:** `EGP/1.1.1`

---

## EGP in 30 seconds

Governance can expose a simple public grammar:

> `sense(issue)` → `propose(response)` → `adopt(experiment)`

- **`sense()`** records an asserted observation, concern, opportunity, warning, or request.
- **`propose()`** records a candidate response, alternatives, causal claims, safeguards, and tests.
- **`adopt()`** records that an actor claims to have accepted a proposal for a defined purpose.

The verbs transport governance events. They do not create the authority represented by those events.

> **A signal is not a finding. A proposal is not consent. An adoption record is not enactment. A deployment is not activation. A timeout is not transferred authority.**

Consequential effect depends on valid `GMEAIA/0.2.1` records and the controlling substantive interface.

---

## 1. Purpose and boundary

EGP standardizes a minimal event grammar rather than a single institution, culture, deliberative method, or legal order. A village council, cooperative, municipality, Indigenous nation, public agency, court, network, or international body may retain its own law, ceremony, evidence rules, decision practices, appeals, and remedies.

EGP makes it possible to state that:

1. an issue was asserted;
2. evidence or validation was requested;
3. a response was proposed;
4. an adoption was claimed;
5. authority, consent, activation, implementation, monitoring, review, remedy, and closure records exist elsewhere;
6. a handoff was accepted, limited, refused, deferred, returned, or remained constitutionally unowned.

EGP is a transport layer. It does not adjudicate whether the transported claim is true, lawful, legitimate, effective, or just.

---

## 2. Public operations

### 2.1 `sense(issue)`

**Purpose:** Register an asserted observation, allegation, concern, opportunity, warning, complaint, or request for attention.

A sense event may identify:

- the asserted condition and scope;
- evidence and provenance;
- uncertainty and alternative explanations;
- claimed severity and urgency;
- affected-party claims;
- requested review or destination;
- the proposed consequence profile, if known;
- protected-data and protected-domain flags.

A sense record begins as an assertion. It cannot by itself establish guilt, liability, emergency status, jurisdiction, consent, a sanction, a service withdrawal, a funding freeze, a title decision, an ecological finding, or authority to act.

For consequential routing, EGP references `GMEAIA/0.2.1` records `GMEAIA-04` through `GMEAIA-08`. Referral receipt, automation, or silence does not equal acceptance.

### 2.2 `propose(response)`

**Purpose:** Register a candidate response to one or more signals or independently identified needs.

A consequential proposal should identify:

- source signals and problem definition;
- affected persons, communities, nations, outsiders, and future or non-human interests where relevant;
- alternatives, including non-action and less-authoritative options;
- principal causal variables and who controls them;
- expected benefits, harms, distributional effects, and uncertainty;
- proposed consequence profile `CP0`, `CP1`, `CP2`, or `CP3`;
- required authority and authority formation;
- consent or lawful-basis requirements;
- protected-domain and specialized-interface requirements;
- resources, implementation dependencies, response and action clocks;
- causal mechanism, minimum causal adequacy, monitoring, duration, rollback, remedy, and closure.

Affected-party standing establishes participation, consent, challenge, and remedy rights. It does not transfer causal responsibility to those who bear the harm.

A proposal does not create consent, public office, jurisdiction, a budget, permit, contract, legal duty, emergency mission, or binding rule.

### 2.3 `adopt(experiment)`

**Purpose:** Register that an actor claims to have accepted a proposal for a defined purpose.

Every adoption carries an effect label:

| Effect label | Meaning |
|---|---|
| `claim_only` | Adoption is reported; authority and effect are unverified |
| `expressive` | Non-binding endorsement, intention, or learning commitment |
| `voluntary_internal` | Authorized practice affecting consenting members within lawful scope |
| `authorized_trial_not_active` | A competent authority authorized a bounded trial; activation is absent |
| `active_bounded_trial` | A bounded trial is lawfully active within recorded scope and safeguards |
| `suspended` | Operation is paused pending review, correction, remedy, or safe-state action |
| `terminated` | Temporary action ended; continuing duties may remain |
| `closed` | Authority returned and closure requirements completed |
| `permanent_enactment_reference` | EGP points to an enactment made through another lawful process |
| `invalid_or_rejected` | The claim lacks required authority, validity, consent, or conformance |

An adoption event is not active merely because it is signed, funded, popular, coded, deployed, certified, entered on a ledger, or displayed as active.

---

## 3. Consequence profiles

EGP adopts the `GMEAIA/0.2.1` consequence profiles without redefining them:

- **`CP0` — exploratory and non-consequential:** education, brainstorming, non-operative drafting, simulation, or demonstration.
- **`CP1` — voluntary bounded practice:** consenting participants, meaningful refusal and withdrawal, defined scope, complaint route, expiry, and closure.
- **`CP2` — operational or consequential action:** authority, causal responsibility, affected parties, authorization, activation, implementation ownership, monitoring, challenge, remedy, and closure.
- **`CP3` — protected-domain or constitutional action:** `CP2` plus `GMEAIA-56` or `GMEAIA-57` and the controlling specialized interface.

The profile is a consequence classification, not a legitimacy score. An actor may claim a profile; the controlling process determines whether the classification is valid.

Documentation follows a core-plus-trigger model. Low-consequence use must not be burdened with records that are irrelevant to its actual effects. High-consequence use must not omit records merely for simplicity.

---

## 4. Authority envelope

A consequential EGP event references, as applicable:

```yaml
authority_envelope:
  gmeaia_version: GMEAIA/0.2.1
  consequence_profile: CP2 | CP3
  method_classification_ref: GMEAIA-02
  actor_and_representation_ref: GMEAIA-03
  source_signal_refs: [GMEAIA-04]
  evidence_and_validation_refs: [GMEAIA-05, GMEAIA-06]
  response_time_assessment_ref: GMEAIA-07
  jurisdictional_triage_ref: GMEAIA-08
  affected_party_map_ref: GMEAIA-09
  affected_indigenous_authority_ref: GMEAIA-10 | null
  notice_and_participation_ref: GMEAIA-11
  proposal_and_causal_mechanism_refs: [GMEAIA-12, GMEAIA-13]
  consent_refs: [GMEAIA-18, GMEAIA-19]
  authority_and_causal_responsibility_ref: GMEAIA-20
  authorization_ref: GMEAIA-21 | GMEAIA-44
  adoption_registration_ref: GMEAIA-22
  activation_ref: GMEAIA-23 | null
  implementation_plan_ref: GMEAIA-24
  rights_and_continuing_duties_ref: GMEAIA-25
  monitoring_and_challenge_refs: [GMEAIA-30, GMEAIA-34]
  pause_rollback_ref: GMEAIA-36
  expiry_and_closure_refs: [GMEAIA-38, GMEAIA-39]
  protected_domain_ref: GMEAIA-56 | GMEAIA-57 | null
  cross_framework_handoff_refs: [GMEAIA-59]
  data_disposition_ref: GMEAIA-60
```

The envelope may be compacted into linked bundles. The semantic functions may not be removed.

If a required dependency is unknown, invalid, incompatible, expired, suspended, withdrawn, or refused, the consequential effect fails closed.

---

## 5. Handoffs, clocks, and omission

EGP transports the exact `GMEAIA/0.2.1` handoff states:

`offered`, `acknowledged`, `accepted`, `partially_accepted`, `capacity_limited`, `refused`, `deferred`, `referred`, `timed_out`, `misrouted`, `constitutional_gap`, `returned`, `closed`.

EGP does not create competing state names.

A consequential handoff records or references:

- the requested function and candidate recipient;
- response-duty source and effect;
- acknowledgment and decision clocks;
- a `GMEAIA-07` latency assessment where applicable;
- protected payload and access rules;
- current custody and escalation;
- a provisional safe-state reference, if separately authorized;
- post-acceptance action and review clocks.

`capacity_limited` means that a recipient recognizes jurisdiction or duty but lacks sufficient practical capacity. `constitutional_gap` means no identified authority possesses sufficient lawful jurisdiction. Neither state creates authority in EGP, the sender, a platform, or a facilitator.

A timed-out handoff remains visible as unresolved responsibility. Silence is never consent or acceptance.

---

## 6. Causal subsidiarity and jointly constituted authority

EGP does not equate locality with causal control. A consequential proposal or adoption should reference a causal-responsibility profile identifying:

- the condition and principal causal variables;
- legal and practical controllers;
- affected parties and burden distribution;
- resources accompanying assigned duties;
- upstream and cross-boundary dependencies;
- shared, concurrent, or absent jurisdiction;
- impossible mandates or impossible pilots;
- continuing duties and escalation.

Authority formation may be `retained`, `delegated`, `transferred`, `concurrent`, `jointly_constituted`, or `absent`.

Jointly constituted authority must identify the constituting parties, shared governance object, affected non-parties, legal or compact source, exit conditions, and surviving duties. EGP records the relationship; it does not constitute the authority.

---

## 7. Protected domains

Ordinary EGP experimentation is insufficient for actions involving:

- policing, intelligence, surveillance, search, seizure, detention, custody, force, or sanctions;
- borders, migration status, asylum, deportation, or mobility restrictions;
- essential water, food, sanitation, shelter, healthcare, education, energy, or basic income;
- child protection, guardianship, capacity, or substitute decision-making;
- title, tenure, rematriation, eviction, asset transfer, or receivership;
- irreversible ecological intervention;
- high-risk AI, biotechnology, geoengineering, cyber, autonomous, or dual-use systems;
- criminal, civil, administrative, or ecological adjudication;
- emergency declaration, command, compulsory data sharing, or resource requisition;
- taxation, benefit withdrawal, funding freezes, forfeiture, or debt enforcement.

A `CP3` event must reference `GMEAIA-56` or `GMEAIA-57` and the controlling specialized interface. EGP may transport those records but cannot simplify them away.

---

## 8. Interoperability invariants

Every EGP-compatible system must:

1. accept a signal without treating it as verified;
2. distinguish proposal from authority;
3. distinguish adoption claim, authorization, deployment, and activation;
4. preserve effect labels, consequence profiles, lifecycle states, and handoff states;
5. carry source, version, jurisdiction, and compatibility references;
6. preserve correction, dispute, withdrawal, supersession, and deletion semantics;
7. enforce access classes and protected payloads;
8. stop automation at consequential decision boundaries;
9. preserve offline, oral, paper, assisted, and low-tech equivalence;
10. expose expiry, rollback, remedy, closure, authority return, and unresolved duties;
11. distinguish response omission from post-acceptance performance omission;
12. prevent conformance from being represented as success or legitimacy.

A conforming system must never reduce high-stakes adoption to one undifferentiated `active: true` field.

---

## 9. State representation

EGP displays separate views of:

```yaml
claim_status: asserted | validation_pending | validated | disputed | rejected | withdrawn | superseded
authority_status: unverified | valid | invalid | expired | suspended | withdrawn
authorization_status: absent | pending | granted | denied | expired | withdrawn
activation_status: inactive | scheduled | active | paused | terminated
review_status: not_due | due | under_review | decided
closure_status: open | closing | closed_with_unresolved_duties | closed
handoff_status: offered | acknowledged | accepted | partially_accepted | capacity_limited | refused | deferred | referred | timed_out | misrouted | constitutional_gap | returned | closed
```

An interface may summarize these states but must preserve their distinctions and source references.

---

## 10. Data, correction, and automation

Public accountability does not require universal payload publicity. EGP supports public, community, affected-party, operational, review, restricted, protected, sealed, metadata-only, and deleted-or-shredded access classes.

Correction must propagate to dashboards, indexes, linked records, summaries, automated systems, and downstream decisions where feasible. Immutable storage must support effective correction, access restriction, and lawful deletion or cryptographic shredding.

AI, sensors, and automated services may assist observation, translation, duplicate detection, drafting, comparison, reminders, simulation, and accessibility. They may not autonomously determine consent, legal facts, representation, public authority, activation, sanctions, emergency command, protected-domain action, scaling, dissolution, or closure of unresolved duties.

---

## 11. Learning, scaling, and closure

A successful result supports a new proposal. It does not prove causation, legitimacy, transferability, or authority to scale.

Scaling requires separate causal assessment and authorization through `GMEAIA-32`, `GMEAIA-43`, and `GMEAIA-44`.

Temporary authority expires. Continuing duties—including rights, remedies, compensation, wages, pensions, debts, evidence, child protection, ecological restoration, essential services, and unresolved claims—continue until discharged.

Closure requires authority return, operator and access removal, asset and data disposition, service continuity, unresolved-duty custody, remedy, and challenge. A celebratory sunset or dashboard status is not closure.

---

## 12. Conformance and release boundary

`EGP/1.2` consists of:

- this normative core;
- the Implementation Appendix v1.2;
- Glossary v1.2;
- One-Page Quick Start v1.2;
- governance-action JSON Schema;
- canonical examples;
- migration notes;
- validation report;
- package manifest and checksums.

A system may claim **structural EGP conformance** only when its records validate against the package schema.

A system may claim **consequential EGP compatibility** only when required `GMEAIA/0.2.1` references are resolvable and valid under the controlling interfaces.

Neither claim establishes jurisdiction, factual accuracy, consent, effectiveness, fairness, or legitimacy.

---

## 13. Invitation

Start small.

Sense one issue without pretending the signal is verified. Propose one response without pretending it is authorized. Adopt one low-risk practice within real authority and consent. Use proportionate records. Monitor honestly. Stop when harm appears. Close materially. Share learning without exposing protected people or knowledge.

> **EGP connects decisions. It does not authorize them.**
