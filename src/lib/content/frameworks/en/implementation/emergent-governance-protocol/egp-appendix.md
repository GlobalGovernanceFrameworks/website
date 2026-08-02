---
title: EGP Implementation Appendix
section: appendix
version: 1.1.1
package: EGP/1.1.1
status: constitutionally-harmonized-technical-profile
date: 2026-08-02
controlling_interface: GMEAIA/0.1
---

# EGP Implementation Appendix v1.1.1
## *Technical Guidance for Communities, Institutions, and Technologists*

> **“Simple at the edge; constitutionally typed at the point of consequence.”**

**Package:** `EGP/1.1.1`  
**Normative core:** Emergent Governance Protocol v1.1.1  
**Controlling authority interface:** `GMEAIA/0.1`  
**Legal character:** Technical profile; no source of jurisdiction, consent, activation, emergency command, adjudication, finance, or enforcement

---

## 1. Package architecture

EGP v1.1 separates six layers:

| Layer | Function | Normative force |
|---|---|---|
| Public grammar | `sense`, `propose`, `adopt` | Vocabulary only |
| Event schema | Structured claims and relationships | Record specification |
| Authority envelope | References to `GMEAIA/0.1` | Effect depends on controlling authority |
| Domain interfaces | Health, emergency, ecology, security, finance | Defined by those interfaces |
| Technical services | APIs, storage, identity, synchronization, analytics | No public authority |
| User experience | Forms, oral workflows, paper, apps, dashboards | Must preserve all distinctions |

Order of precedence:

1. controlling law and domain interfaces;
2. `GMEAIA/0.1` for method and adoption authority;
3. EGP Core v1.1;
4. this appendix;
5. examples and interface mock-ups.

---

## 2. Core constitutional invariants

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

---

## 3. Canonical EGP event model

### 3.1 Shared fields

```yaml
egp_package: EGP/1.1.1
event_id: globally_unique_identifier
operation: sense | propose | adopt
created_at: ISO-8601
created_by:
  actor_id: identifier
  actor_type: human | group | institution | ai_assistant | sensor | service
  capacity_claim: free_text_or_reference
  identity_proof_ref: optional
event_version: semantic_version
jurisdiction_claims: []
geographic_scope_claims: []
institutional_scope_claims: []
language: BCP-47
access_class: public | community | affected_party | operational | review | restricted | protected | sealed | metadata_only | deleted_or_shredded
payload_ref_or_inline: object
source_refs: []
relationship_refs: []
correction_status: current | corrected | disputed | withdrawn | superseded
authority_effect: none | advisory | claim_only | voluntary_internal | consequential_reference
```

The schema deliberately uses `jurisdiction_claims`. The submitter may assert a scope; a later authority record validates it.

### 3.2 Sense event

```yaml
claim_status: asserted | validation_pending | validated | disputed | rejected | withdrawn | superseded
observation_type: direct | reported | sensor | model | allegation | opportunity | request
asserted_severity: informational | low | moderate | high | critical | unknown
asserted_urgency: none | days | weeks | months | years | unknown
uncertainty: description
affected_party_claims: []
evidence_refs: []
requested_routes: []
```

An AI or sensor signal also includes a technical-system reference, version, calibration or validation reference, accountable human or institution, and `automation_limit: observation_only`.

### 3.3 Proposal event

```yaml
responds_to_refs: []
problem_definition: string
alternatives:
  - description
    expected_effects
    risks
    non_action_option
affected_party_map_ref: required_for_consequential_proposals
affected_indigenous_authority_ref: required_when_applicable
proposed_decision_method_ref: optional
proposed_consent_route_ref: required_when_applicable
required_authority_types: []
protected_domain_flags: []
resource_estimate: object
funding_source_claims: []
test_criteria: []
monitoring_plan_ref: optional
proposed_start: optional
proposed_end: optional
rollback_plan_ref: optional
remedy_plan_ref: optional
```

### 3.4 Adoption event

```yaml
proposal_ref: required
adopting_actor_ref: required
effect_label: claim_only | expressive | voluntary_internal | authorized_trial_not_active | active_bounded_trial | suspended | terminated | closed | permanent_enactment_reference | invalid_or_rejected

authority_resolution:
  status: unverified | valid | invalid | expired | suspended | withdrawn
  authority_verification_ref: required_for_consequential_effect

consent_resolution:
  status: not_applicable | pending | valid | invalid | withdrawn | disputed
  refs: []

authorization_resolution:
  status: absent | pending | granted | denied | expired | withdrawn
  trial_authorization_ref: required_for_trial

activation_resolution:
  status: inactive | scheduled | active | paused | terminated
  activation_ref: required_before_active

protected_domain_resolution:
  flags: []
  review_ref: required_when_flagged

clocks:
  authorized_from: optional
  authorized_until: optional
  review_due: optional
  automatic_expiry: optional

safeguards:
  rights_and_non_derogation_ref: required_for_consequential_effect
  essential_service_ref: required_when_applicable
  monitoring_ref: required_for_active_trial
  challenge_and_interim_relief_ref: required_for_consequential_effect
  rollback_and_remedy_ref: required_for_active_trial
  closure_and_authority_return_ref: required_for_active_trial
```

---

## 4. Effect labels and interface requirements

Every adoption display prominently shows effect label, authority status, activation status, review due date, expiry, and correction or dispute status.

A green check mark may not represent them all.

Forbidden substitutions:

- “approved” for proposed;
- “authorized” for consented;
- “active” for deployed;
- “law” for voluntary internal adoption;
- “verified” for signed;
- “community consent” for a poll;
- “Indigenous consent” without the affected nation's record;
- “emergency” based solely on asserted urgency.

Plain-language claim-only notice:

> “This actor reports that it adopted the proposal. EGP has not verified whether it had authority or whether the action is active.”

Authorized-inactive notice:

> “A competent authority authorized this trial. It has not yet been activated.”

Closed-with-duties notice:

> “Temporary authority ended. Some remedies, payments, restoration, records, or claims remain open.”

---

## 5. Identity, capability, and representation

DIDs, public-key credentials, organizational directories, government identity, community attestations, and paper verification can identify a submitter.

Identity proof answers: **Who signed this record?**

It does not answer: **Was this actor entitled to bind the affected people or institution?**

A UCAN or other capability may allow data entry, drafting, evidence upload, restricted viewing, claim registration, sandbox deployment, or validation. It may not itself permit public-law enactment, emergency declaration, fiscal commitment, service withdrawal, search, seizure, detention, adjudication, affected-nation consent, or activation of a consequential trial.

Representation records distinguish self-representation, delegation, elected or appointed office, fiduciary representation, legal counsel, guardian or advocate, technical submission, and proxy data entry. They state constituency, source, scope, duration, conflicts, revocation, and challenge.

Affected Indigenous authority requires the self-identified nation or people, representative-selection source, applicable law or protocol, consent scope, protected knowledge rules, withdrawal or non-engagement, and prohibition of external proxy substitution.

---

## 6. Structured consent

A free-text `consentMechanism` field is insufficient.

```yaml
consent_id: unique
holder:
  actor_or_collective_ref: required
  authority_to_consent_ref: required_when_collective
object:
  proposal_or_action_ref: required
scope:
  persons: []
  territory: []
  assets: []
  data: []
  activities: []
duration:
  valid_from: ISO-8601
  valid_until: ISO-8601_or_null
conditions: []
excluded_matters: []
information_provided_refs: []
language_and_access_support_refs: []
internal_dissent_record_ref: optional
refusal_options: []
withdrawal_process: object
coercion_assessment_ref: required
status: proposed | valid | refused | withdrawn | disputed | expired | invalid
```

Consent is valid only for its holder, object, scope, duration, and conditions. A person may consent to voluntary participation; that does not authorize regulation of non-participants.

Systems support refusal without retaliation, withdrawal where voluntary, challenge where legally limited, continued essential support, deletion or restriction of optional data, and compensation or transition where reliance interests exist.

---

## 7. Authority verification

Before consequential adoption becomes active, independent verification establishes:

```yaml
authority_source_ref: constitution | law | charter | treaty | contract | indigenous_law | other
competent_body_ref: required
decision_type_authorized: required
jurisdiction: exact
persons_and_assets_in_scope: exact
territorial_scope: exact
delegation_chain_refs: []
procedural_requirements: []
rights_constraints: []
funding_authority_ref: required_when_spending
expiry_or_review: required
appeal_or_challenge: required
status: valid | invalid | incomplete | expired | suspended | withdrawn
```

A source reference is not enough; the verifier states that the source applies to the specific decision.

---

## 8. State machine

```text
draft_claim
  → recorded_claim
  → authority_review
      → rejected
      → deficient
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

Forbidden direct transitions:

- `recorded_claim → active`
- `proposal → active`
- `code_deployed → active`
- `funded → active`
- `successful → scaled`
- `expired → closed` without duty review
- `sensor_alert → emergency_active`
- `poll_passed → public_law_active`

State is derived from signed events. Corrections, disputes, withdrawals, supersession, access changes, deletion markers, and remedy outcomes append to the history and update the current view.

---

## 9. Storage, immutability, correction, and deletion

Content addressing may be used for public method documents, event headers, non-sensitive evidence, and tamper-evident references. It must not require permanent public replication of protected payloads.

```yaml
public_header:
  event_id
  operation
  timestamp
  submitting_actor_ref
  effect_label
  lifecycle_status
  payload_hash
  access_class
  correction_status

protected_payload:
  encrypted_or_local_storage
  access_control
  retention
  deletion_or_crypto_shredding
  disclosure_log
```

A corrected event preserves provenance while preventing the false value from continuing to drive dashboards, indexes, eligibility engines, summaries, linked proposals, notifications, archives, and training datasets where feasible.

Where deletion is required, the system may retain minimum proof that a record existed, was lawfully removed or restricted, and dependent decisions were reassessed. It must not retain the prohibited payload under the label of immutability.

---

## 10. Access classes

| Class | Access |
|---|---|
| `public` | Open publication |
| `community` | Defined participating community |
| `affected_party` | Identified affected people and representatives |
| `operational` | Authorized implementers |
| `review` | Auditors, reviewers, ombuds, adjudicators |
| `restricted` | Need-to-know with purpose limitation |
| `protected` | Sensitive personal, cultural, Indigenous, health, or safety material |
| `sealed` | Court-, investigation-, security-, or survivor-protected material |
| `metadata_only` | Public header without payload |
| `deleted_or_shredded` | Payload unavailable; minimum lawful marker retained |

Access to one record does not imply access to linked records.

EGP v1.1 uses **accountability metadata by default; payload publicity only where lawful and safe**.

---

## 11. GraphQL profile

```graphql
enum OperationType {
  SENSE
  PROPOSE
  ADOPT
}

enum EffectLabel {
  CLAIM_ONLY
  EXPRESSIVE
  VOLUNTARY_INTERNAL
  AUTHORIZED_TRIAL_NOT_ACTIVE
  ACTIVE_BOUNDED_TRIAL
  SUSPENDED
  TERMINATED
  CLOSED
  PERMANENT_ENACTMENT_REFERENCE
  INVALID_OR_REJECTED
}

enum AuthorityStatus {
  UNVERIFIED
  VALID
  INVALID
  EXPIRED
  SUSPENDED
  WITHDRAWN
}

enum ActivationStatus {
  INACTIVE
  SCHEDULED
  ACTIVE
  PAUSED
  TERMINATED
}

interface GovernanceAction {
  id: ID!
  packageVersion: String!
  operation: OperationType!
  createdAt: DateTime!
  accessClass: String!
  correctionStatus: String!
}

type AdoptionClaim implements GovernanceAction {
  id: ID!
  packageVersion: String!
  operation: OperationType!
  createdAt: DateTime!
  accessClass: String!
  correctionStatus: String!
  proposalRef: String!
  effectLabel: EffectLabel!
  authorityStatus: AuthorityStatus!
  activationStatus: ActivationStatus!
  authorityVerificationRef: String
  activationRef: String
  reviewDue: DateTime
  expiresAt: DateTime
}
```

Permitted generic mutations include creating a sense claim, proposal, or adoption claim; appending correction, dispute, or withdrawal; and requesting authority review, activation review, or closure.

A generic EGP API must not expose `declareEmergency`, `issueSanction`, `withdrawBenefit`, `transferTitle`, `detainPerson`, `authorizeSearch`, `activateForce`, `imposeTax`, or `grantPersonhood`.

Subscriptions publish claim, authority, activation, review, expiry, and correction states—not one `active` boolean.

---

## 12. Event-bus profile

Recommended topics:

```text
egp.v1_1.sense.claimed
egp.v1_1.sense.validated
egp.v1_1.sense.disputed
egp.v1_1.proposal.created
egp.v1_1.adoption.claimed
egp.v1_1.adoption.authority_validated
egp.v1_1.adoption.authorized
egp.v1_1.adoption.activated
egp.v1_1.adoption.paused
egp.v1_1.adoption.terminated
egp.v1_1.adoption.closed
egp.v1_1.record.corrected
egp.v1_1.record.access_changed
```

A subscriber to `adoption.claimed` must not perform the action. Only the controlling system may act after the required authorization and activation events.

---

## 13. Automation and AI

AI and automation may classify documents for review, detect duplicate signals, translate, summarize, suggest proposals, compare alternatives, identify missing fields, flag expiry, generate reminders, simulate outcomes, and assist accessibility.

They may not autonomously validate a contested legal fact, determine consent, identify a community's lawful representative, verify public authority, authorize or activate a trial, declare an emergency, impose sanctions, withdraw services or benefits, scale a pilot, dissolve an institution, close unresolved remedies, or decide protected-domain actions.

Every AI or sensor service has an accountable owner, version, purpose, data sources, limitations, human review, correction, rollback, incident response, and expiry.

Adaptive rules may route an assertion, open validation, request information, warn of review dates, or pause a purely technical sandbox. They cannot convert a signal into an emergency, metric into sanction, or pilot success into scaling.

---

## 14. WASM and executable modules

Executable modules are bounded technical tools.

```yaml
module_id: unique
version: semver
purpose: explicit
authority_effect: none
permitted_environment: simulation | sandbox | authorized_operation
controlling_authority_refs: []
input_schema_ref: required
output_schema_ref: required
protected_domain_flags: []
human_approval_points: []
rollback: required
expiry: required
audit_log: required
```

A module may enforce a sandbox timer; it may not decide whether a legal duty expires. It may compute a metric; it may not decide the legal consequence.

---

## 15. Smart contracts and ledgers

Smart contracts may timestamp, record signatures, enforce technical access, or administer bounded escrow under separately valid agreements. They may not make a high-stakes adoption active merely because the caller submits a transaction.

```solidity
// Pseudocode only
function registerAdoptionClaim(bytes32 eventId, bytes32 proposalRef) public {
    // Records a claim; does not activate public authority.
}

function attachAuthorityVerification(bytes32 eventId, bytes32 authorityRef)
    public onlyAuthorizedVerifier
{ }

function attachActivation(bytes32 eventId, bytes32 activationRef)
    public onlyControllingDomainSystem
{ }
```

On-chain reputation may support spam control. It may not become generalized civic worth, credibility, rights, eligibility, or moral standing.

---

## 16. Offline-first and analog parity

Paper, oral, and assisted records capture the same distinctions: operation, submitter and capacity, asserted or verified status, proposal versus decision, effect label, authority and consent, start, review, expiry, challenge, remedy, correction, and closure.

An oral or ceremonial decision may be recorded through audio where consented, a witness record, physical tokens, protected local archives, multiple attestation, or a later digital summary. The digital summary is not more authoritative than the lawful original process.

A scribe or digital steward is labelled as recorder, not decision-maker. Users can review, correct, use their language or communication mode, receive a copy, and challenge publication.

Conflicting offline records remain disputed until resolved. **Last write wins is prohibited** for authority, consent, activation, and remedy states.

---

## 17. Cultural adaptation

Communities may rename operations and adapt ceremonies while preserving semantic compatibility.

| EGP concept | Possible local expression |
|---|---|
| `sense()` | witness, notice, call attention, land observation |
| `propose()` | offer, motion, counsel, design, response |
| `adopt()` | agree to try, authorize trial, internal resolution |
| review | council return, seasonal review, audit, reflection |
| closure | release, ending, handback, completion |

Cultural adaptation must not infer identity from geography, treat one elder as representative of a nation, publish protected knowledge, replace affected-nation law, remove dissent, weaken rights or remedy, or hide legal effect behind ceremonial language.

---

## 18. Readiness, ethics, and epistemic assessments

EGP transports these assessments with `authority_effect: advisory`.

```yaml
assessment_type: readiness | ethics | epistemic | maturity | trust | regeneration | other
purpose: required
method_and_version: required
evidence_refs: []
uncertainty: required
affected_party_review: required_when_consequential
dissent_refs: []
correction_and_expiry: required
prohibited_uses:
  - deny_essential_support
  - create_jurisdiction
  - substitute_for_consent
  - suspend_democracy
  - activate_emergency
  - determine_funding_automatically
```

A score may recommend support. It cannot classify a community as unfit to govern.

---

## 19. Funding and participation support

An EGP proposal may identify funding needs. It cannot appropriate funds.

Funding records distinguish application, eligibility review, award, contract or grant conditions, payment authorization, disbursement, audit, suspension, clawback, appeal, and closure.

Participation support is separated from agreement with the proposed method. People do not lose translation, childcare, disability access, travel support, independent advice, legal support, or essential services because they oppose or leave a pilot.

---

## 20. Pilot scaling

A successful pilot may produce evidence, learning, a scaling proposal, revised risk analysis, resources, and affected-party map. It **does not produce authority to scale**.

Scaling requires a new scope, authority review, consent where applicable, protected-domain assessment, monitoring, remedy, clocks, and closure.

---

## 21. Emergency and coercive interfaces

EGP may submit an emergency-related sense claim, carry validation and referral status, transport an ECRC/CDEE mission reference, and display mission scope and expiry.

EGP may not declare an emergency, assign incident command, compel data sharing, requisition resources, override local authority, or renew emergency power.

It may transport a bounded enforcement referral but cannot execute inspection, search, seizure, detention, custody, force, cyber disruption, asset freeze, border restriction, or sanction. Those require the controlling substantive authority and SCPA.

---

## 22. Closure and unresolved duties

An adoption cannot be marked closed merely because the trial period, code, funding, or organization ended.

Closure review addresses participants and affected people, rollback, essential services, records and deletion, wages, debts, pensions, contracts, compensation, ecological restoration, claims, appeals, successor responsibility, public learning artifacts, and return of temporary authority.

Statuses:

- `closing`
- `closed`
- `closed_with_unresolved_duties`
- `reopened_for_remedy`
- `archived_after_discharge`

---

## 23. Security and trust

Required controls include authenticated writes, least privilege, separation of duties, key rotation, recovery, rate limiting, confidential reporting, audit logs, tamper evidence, correction, incident response, offline recovery, and human-readable export.

Threats include forged community identities, captured administrators, compromised keys, fake urgency, sensor spoofing, model poisoning, signal flooding, retaliation through public records, unauthorized correlation, access downgrade, false activation, silent renewal, deletion failure, and archive capture.

Reputation systems may support platform abuse control. They may not determine rights, eligibility, civic standing, or credibility.

---

## 24. Conformance levels

### Level A — Vocabulary

The system uses the three operations correctly and does not claim EGP creates authority.

### Level B — Record

It implements effect labels, claim status, correction, access classes, versioning, and source relationships.

### Level C — Authority envelope

It validates `GMEAIA/0.1` references before consequential activation.

### Level D — Protected domain

It fails closed and routes to controlling interfaces.

### Level E — Operational

It passes live tests for offline parity, unauthorized adoption, identity spoofing, protected payloads, correction propagation, expiry, rollback, remedy, and closure.

No system may claim full `EGP/1.1.1` conformance below Level C.

---

## 25. Validation rules

A validator rejects or downgrades an adoption when the effect label is absent; active status lacks valid authority; authorization lacks scope or expiry; protected-domain flags lack review; Indigenous authority is asserted by an external proxy; consent is free text only; activation precedes authorization; funding or deployment is treated as activation; a signal is treated as verified without validation; a smart-contract caller is treated as authority; essential-service safeguards are absent; review, challenge, rollback, remedy, or closure is missing; or controlling references are expired, suspended, withdrawn, or incompatible.

Structural schema validity is not constitutional validity.

---

## 26. Migration from EGP v1.0

| v1.0 pattern | v1.1 treatment |
|---|---|
| `isActive: true` on creation | Split claim, authority, authorization, activation, lifecycle |
| AI or sensor agent | Observation and proposal assistance only |
| severity and urgency | Asserted until separately validated |
| public by default | Accountability metadata by default; payload by lawful access |
| immutable records | Provenance plus effective correction and deletion |
| `consentMechanism: String` | Structured consent object |
| DID/UCAN authorization | Technical capability only |
| smart-contract adoption | Registration only; no self-activation |
| reputation reward | Removed from rights and authority pathways |
| successful pilot scaling | New proposal and authorization |
| sunset everything | Temporary authority sunsets; duties persist |
| cultural-context enum | Optional self-description; no external classification |

Legacy records import as:

```yaml
source_package: EGP/1.0
compatibility_status: legacy_untyped
effect_label: claim_only
authority_status: unverified
activation_status: unknown
requires_review: true
```

They must not trigger consequential systems until upgraded.

---

## 27. Reference implementation

A reference implementation provides simple forms, an “authority not verified” default, separate reviewer roles, protected payload storage, public metadata, paper and offline export, effect labels, authority and activation state machines, correction and dispute workflows, expiry reminders, no automatic renewal, protected-domain routing, closure checklist, and a conformance suite.

It should not ship autonomous high-stakes agents, sanction engines, or governance reputation scores as defaults.

---

## 28. Minimum test suite

1. Sensor claims pollution; no action before validation.
2. AI proposes an intervention; no authority is created.
3. Signed adoption lacks jurisdiction; it remains claim-only.
4. Municipal authority authorizes a trial; it remains inactive until activation.
5. Code is deployed early; operational effects remain blocked.
6. Consent is withdrawn from a voluntary trial; participation ends without essential-service loss.
7. Local majority attempts to bind an affected Indigenous nation; validation fails.
8. Protected payload is accidentally public; access is revoked and caches corrected.
9. Trial expires while compensation remains unpaid; authority ends but duty remains open.
10. Pilot succeeds; scaling becomes a new proposal.
11. Smart-contract caller tries to self-authorize; rejected.
12. UCAN permits data entry but not public decision-making.
13. Emergency signal routes to CDEE; EGP does not declare the emergency.
14. Enforcement request reaches SCPA; EGP does not execute it.
15. Offline paper adoption receives equal effect after verification.
16. Conflicting offline records remain disputed rather than last-write-wins.
17. Facilitator certificate expires; lawful local facilitation remains possible.
18. Readiness score is challenged and corrected.
19. Failure-story participant withdraws publication consent; artifact is revised.
20. Institution dissolves; pensions, archives, and claims transfer to a successor.

---

## 29. Protocol stewardship

Changes to the normative core require public proposal, compatibility analysis, rights and protected-domain review, affected-user consultation, security review, offline-parity review, migration plan, and versioned adoption by the lawful package steward.

Technical maintainers may not silently change operation semantics, effect labels, authority requirements, access classes, protected-domain rules, deletion behaviour, or conformance claims.

Emergency security patches may restrict technical functions immediately, but cannot expand authority.

---

## 30. Source and version freeze

This appendix is part of `EGP/1.1.1`. Exact hashes are recorded in the package manifest.

Controlling interface:

- `GMEAIA/0.1`
- SHA-256: 1f2ed4646e552373c15a6a5bc57e0b5f03a30dff84579d293316b9deb3c96b79

Source documents remain unchanged:

- EGP Core v1.0: c5957945552bfd4d5e107aa7990b2f7184e2a49cb031520b5b3dae19a61f7b6d
- EGP Appendix v1.0: f88a36ea245018534398e8358c622a1807714c436e44ca31651e2a1c504d311b
- EGP Glossary v1.0: 78929c311afbe5b5038e1fa233848d5bec72fe5b74265312eb42eba7ad082f11
- EGP One-Page Summary v1.0: 2a6a42949702d4553e8b5d49e04b3f06d84bf04e0dbecd80b10a0c467834f76e

---

## 31. Closing rule

EGP succeeds when many governance systems communicate without any technical layer pretending to be the source of their legitimacy.

> **Transport the event. Preserve the difference. Resolve authority before effect.**

---

## Cluster conformance adoption — `IAEGCA/0.1`

This patch release adopts the exact `IAEG-CLUSTER/0.1` compatibility set.

**Authority effect:** none. Compatibility does not create jurisdiction, consent, funding, implementation, emergency authority, adjudication, or enforcement.

### Exact compatible set

- `GMEAIA/0.1` — `governance-method-experiment-adoption-implementation-authority-interface-specification-v0.1.md`
- `EGP/1.1.1` — `emergent-governance-protocol-v1.1.1-package-manifest.json`
- `IAF/1.1.1` — `ggf-implementation-adaptation-framework-v1.1.1.md`
- `IMT/0.8.1` — `implementation-methods-tools-framework-v0.8.1.md`
- `IRF/0.9.1` — `institutional-regeneration-framework-v0.9.1.md`
- `WDIP/1.6.1` — `wise-decision-making-integration-protocol-v1.6.1.md`

### Mandatory cluster rule

> **Methods structure and transport governance. They do not create the authority to decide or act.**

This document SHALL:

- preserve `GMEAIA/0.1` authority-effect and lifecycle meanings;
- treat EGP signals, proposals, and adoption records according to their asserted, advisory, authority, and activation states;
- require explicit recipient acceptance for consequential handoffs;
- fail closed on unknown, expired, suspended, withdrawn, or incompatible dependencies;
- preserve affected-party and affected Indigenous authority;
- preserve protected-domain, emergency, coercive, correction, remedy, and closure boundaries;
- prevent targets, pilots, metrics, scores, funding, tool recommendations, facilitation, AI outputs, signatures, and technical capabilities from activating power by implication.

Exact component hashes are frozen in `implementation-adaptation-emergent-governance-cluster-conformance-registry-v0.1.json` after build. This avoids circular hashing while providing one immutable release registry.

