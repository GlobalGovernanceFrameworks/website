---
title: EGP Implementation Appendix
section: appendix
version: 1.2
package_id: EGP/1.2
status: gmeaia-v0.2.1-harmonized-technical-profile
date: 2026-08-06
constitutional_interface: CIS/0.2.1
controlling_interface: GMEAIA/0.2.1
---

# EGP Implementation Appendix v1.2
## *Technical Guidance for Communities, Institutions, and Technologists*

> **Simple at the edge; constitutionally typed at the point of consequence.**

**Package:** `EGP/1.2`  
**Normative core:** Emergent Governance Protocol v1.2  
**Controlling interface:** `GMEAIA/0.2.1`  
**Legal character:** Technical profile; no source of jurisdiction, consent, activation, emergency command, adjudication, finance, or enforcement

---

## 1. Package architecture and precedence

| Layer | Function | Normative force |
|---|---|---|
| Public grammar | `sense`, `propose`, `adopt` | Vocabulary only |
| Event schema | Structured claims and relationships | Record specification |
| Consequence profile | `CP0`–`CP3` | Imported from `GMEAIA/0.2.1` |
| Authority envelope | References to GMEAIA records | Effect depends on controlling authority |
| Domain interfaces | Health, emergency, ecology, security, finance, Indigenous authority | Defined by those interfaces |
| Technical services | APIs, storage, identity, synchronization, analytics | No public authority |
| User experience | Forms, oral workflows, paper, apps, dashboards | Must preserve all distinctions |

Order of precedence:

1. applicable law, Indigenous law, constituting instruments, and controlling domain interfaces;
2. `CIS/0.2.1`;
3. `GMEAIA/0.2.1`;
4. EGP Core v1.2;
5. this appendix;
6. examples and interface mock-ups.

A lower layer cannot override a higher layer by technical convenience.

---

## 2. Constitutional invariants

Every implementation enforces:

1. A sense record begins as an assertion.
2. A proposal never creates consent or authority.
3. An adoption record is a claim until authority is resolved.
4. Authorization, deployment, and activation are distinct.
5. Cryptographic identity is not public office.
6. Software capability is not legal competence.
7. Machines cannot cross consequential decision boundaries.
8. Ordinary experimentation fails closed in protected domains.
9. Public accountability does not require public payloads.
10. Immutable logs must support effective correction and lawful deletion.
11. Temporary powers expire; continuing duties persist.
12. Pilot success does not authorize expansion.
13. Non-digital participation has equal standing.
14. Every active adoption has closure and authority-return paths.
15. Timeout does not transfer authority.
16. `capacity_limited` is not `constitutional_gap`.
17. Affected standing does not assign causal responsibility.
18. Conformance is not success or legitimacy.

---

## 3. Canonical event envelope

```yaml
egp_package: EGP/1.2
event_id: globally_unique_identifier
operation: sense | propose | adopt
created_at: ISO-8601
created_by:
  actor_id: identifier
  actor_type: human | group | institution | ai_assistant | sensor | service
  capacity_claim: free_text_or_reference
  identity_proof_ref: optional
event_version: semantic_version
consequence_profile_claim: CP0 | CP1 | CP2 | CP3 | unknown
jurisdiction_claims: []
geographic_scope_claims: []
institutional_scope_claims: []
language: BCP-47
access_class: public | community | affected_party | operational | review | restricted | protected | sealed | metadata_only | deleted_or_shredded
source_refs: []
relationship_refs: []
correction_status: current | corrected | disputed | withdrawn | superseded
authority_effect: none | advisory | claim_only | voluntary_internal | consequential_reference
payload: object
```

`jurisdiction_claims` and `consequence_profile_claim` are assertions until resolved by competent records.

---

## 4. Operation payloads

### 4.1 Sense

```yaml
claim_status: asserted | validation_pending | validated | disputed | rejected | withdrawn | superseded
observation_type: direct | reported | sensor | model | allegation | opportunity | request | complaint
asserted_severity: informational | low | moderate | high | critical | unknown
asserted_urgency: none | hours | days | weeks | months | years | unknown
uncertainty: description
affected_party_claims: []
evidence_refs: []
requested_routes: []
protected_domain_flags: []
gmeaia_refs:
  sense_signal_ref: optional_GMEAIA-04
  evidence_ref: optional_GMEAIA-05
  validation_ref: optional_GMEAIA-06
  response_time_ref: optional_GMEAIA-07
  triage_ref: optional_GMEAIA-08
```

Sensor and AI events also identify system owner, version, calibration or validation reference, data sources, limitations, and `automation_limit: observation_only`.

### 4.2 Proposal

```yaml
responds_to_refs: []
problem_definition: string
alternatives: []
affected_party_map_ref: required_for_CP2_CP3
affected_indigenous_authority_ref: required_when_applicable
causal_mechanism_ref: required_for_CP2_CP3
causal_responsibility_ref: required_for_CP2_CP3
proposed_authority_formation: retained | delegated | transferred | concurrent | jointly_constituted | absent | unknown
proposed_consequence_profile: CP0 | CP1 | CP2 | CP3
required_authority_types: []
protected_domain_flags: []
resource_estimate: object
response_and_action_clock_refs: []
test_criteria: []
minimum causal adequacy: description
monitoring_plan_ref: optional
proposed_start: optional
proposed_end: optional
rollback_plan_ref: optional
remedy_plan_ref: optional
```

### 4.3 Adoption

```yaml
proposal_ref: required
adopting_actor_ref: required
effect_label: claim_only | expressive | voluntary_internal | authorized_trial_not_active | active_bounded_trial | suspended | terminated | closed | permanent_enactment_reference | invalid_or_rejected
consequence_profile: CP0 | CP1 | CP2 | CP3
authority_resolution:
  status: unverified | valid | invalid | expired | suspended | withdrawn
  authority_and_causal_responsibility_ref: required_for_CP2_CP3
  authority_formation: retained | delegated | transferred | concurrent | jointly_constituted | absent
consent_resolution:
  status: not_applicable | pending | valid | invalid | withdrawn | disputed | expired
  refs: []
authorization_resolution:
  status: absent | pending | granted | denied | expired | withdrawn
  authorization_ref: required_for_CP2_CP3
  trial_authorization_ref: required_for_trial
  permanent_enactment_ref: required_for_permanent_enactment_reference
activation_resolution:
  status: inactive | scheduled | active | paused | terminated
  activation_ref: required_before_active
protected_domain_resolution:
  flags: []
  specialized_interface_ref: required_for_CP3
  authorization_ref: required_for_CP3
handoff_resolution:
  status: offered | acknowledged | accepted | partially_accepted | capacity_limited | refused | deferred | referred | timed_out | misrouted | constitutional_gap | returned | closed | not_applicable
  handoff_ref: required_unless_not_applicable
clocks:
  authorized_from: optional
  authorized_until: optional
  acknowledgment_due: optional
  decision_due: optional
  action_due: optional
  review_due: optional
  automatic_expiry: optional
safeguards:
  rights_and_continuing_duties_ref: required_for_CP2_CP3
  implementation_plan_ref: required_for_active_CP2_CP3
  monitoring_ref: required_for_active_trial
  challenge_and_interim_relief_ref: required_for_CP2_CP3
  pause_rollback_ref: required_for_active_trial
  closure_and_authority_return_ref: required_for_active_trial
  data_disposition_ref: required_where_data_is_material
```

---

## 5. Consequence-profile validation

### CP0

Require only the compact event envelope and explicit non-activation. `GMEAIA-58` is required for a real prototype, simulation, demonstration, mock council, test credential, or sandbox—not for every discussion.

### CP1

Require the compact event envelope plus:

- voluntary scope;
- consent, refusal, and withdrawal;
- implementation responsibility;
- complaint route;
- stop and expiry;
- closure and data disposition where material.

### CP2

Require the semantic functions of:

- authority and causal responsibility;
- affected-party standing;
- response time and handoff acceptance where another authority is involved;
- authorization and activation;
- implementation ownership and dependencies;
- rights and continuing duties;
- monitoring, challenge, remedy, expiry, and closure.

### CP3

Require CP2 plus the controlling specialized interface and `GMEAIA-56` or `GMEAIA-57`.

A validator may check the presence and syntax of references. It cannot determine their legal or substantive validity without resolving the referenced records.

---

## 6. Handoff profile

EGP uses the exact `GMEAIA/0.2.1` controlled states:

```text
offered
acknowledged
accepted
partially_accepted
capacity_limited
refused
deferred
referred
timed_out
misrouted
constitutional_gap
returned
closed
```

Each consequential handoff should expose:

```yaml
handoff_ref: GMEAIA-08_or_GMEAIA-59
requested_function: string
response_duty_source: reference_or_none
response_duty_effect: legal | contractual | charter_internal | voluntary_commitment | advisory | none
acknowledgment_clock_source: reference_or_none
decision_clock_source: reference_or_none
response_time_assessment_ref: optional_GMEAIA-07
provisional_safe_state_ref: optional_GMEAIA-36
post_acceptance_action_clock_ref: optional
custody_ref: required
```

A transport acknowledgement is not a governance acceptance.

---

## 7. Identity, representation, and capability

DIDs, public-key credentials, directories, government identity, community attestations, and paper verification can identify a submitter. Identity proof answers who signed; it does not establish who may bind affected people or institutions.

A technical capability may permit data entry, drafting, evidence upload, restricted viewing, claim registration, sandbox deployment, or validation. It may not itself permit public-law enactment, emergency declaration, fiscal commitment, service withdrawal, search, seizure, detention, adjudication, affected-nation consent, or activation of consequential action.

Representation records identify constituency, source, scope, duration, conflicts, revocation, and challenge. Affected Indigenous authority must be determined by the affected nation or people and its own law or protocol.

---

## 8. State machine

```text
draft_claim
  → recorded_claim
  → validation_or_authority_review
      → rejected
      → deficient
      → referred
      → authorized_inactive
  → activation_review
      → active
      → paused
      → terminated
  → outcome_review
      → renew_proposed
      → amendment_proposed
      → scaling_proposed
      → close
  → closing
  → closed
  → closed_with_unresolved_duties
```

Forbidden direct transitions include:

- `recorded_claim → active`;
- `proposal → active`;
- `code_deployed → active`;
- `funded → active`;
- `timed_out → authority_transferred`;
- `successful → scaled`;
- `expired → closed` without duty review;
- `sensor_alert → emergency_active`;
- `poll_passed → public_law_active`.

---

## 9. API and event-bus profile

Recommended topics:

```text
egp.v1_2.sense.claimed
egp.v1_2.sense.validated
egp.v1_2.sense.disputed
egp.v1_2.proposal.created
egp.v1_2.adoption.claimed
egp.v1_2.adoption.authority_validated
egp.v1_2.adoption.authorized
egp.v1_2.adoption.activated
egp.v1_2.adoption.paused
egp.v1_2.adoption.terminated
egp.v1_2.adoption.closed
egp.v1_2.handoff.state_changed
egp.v1_2.record.corrected
egp.v1_2.record.access_changed
```

A subscriber to `adoption.claimed`, `proposal.created`, or `handoff.timed_out` must not perform the proposed action. Only the controlling system may act after valid authorization and activation.

A generic API must not expose operations that claim to declare emergencies, impose sanctions, withdraw benefits, transfer title, detain persons, authorize searches, activate force, impose taxes, or grant legal status.

---

## 10. Storage and correction

Separate public accountability metadata from protected payloads. Content addressing may be used for non-sensitive records and tamper-evident references, but must not require permanent public replication of protected material.

Corrections, disputes, withdrawals, supersession, access changes, deletion markers, and remedy outcomes append to the history and update the current view. Systems should propagate corrections to linked dashboards, indexes, alerts, summaries, automated processes, archives, and training datasets where feasible.

---

## 11. Offline and assisted parity

Paper, oral, sign-language, assisted, SMS, and offline records have equal standing when they preserve the same substantive distinctions. No participant receives slower remedy or lesser standing because they cannot use digital identity, smartphones, or blockchain.

Interfaces should support accessible summaries, language assistance, independent advice, and correction without requiring users to understand GMEAIA record numbers.

---

## 12. Validation boundary

The package validator checks:

- package and operation identifiers;
- required event fields;
- controlled vocabularies;
- operation-specific payload shape;
- consequence-profile consistency;
- minimum reference presence for CP2 and CP3 adoption claims;
- exact handoff-state vocabulary;
- manifest hashes.

It does not check:

- whether a claim is true;
- whether authority or consent is legally valid;
- whether a referenced record is substantively adequate;
- whether an action is effective or just;
- whether a specialized domain interface was correctly applied.
