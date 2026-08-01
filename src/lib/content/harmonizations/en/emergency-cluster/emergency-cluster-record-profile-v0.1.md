# Emergency and Catastrophic-Risk Cluster Record Profile v0.1

## Canonical ECRC record identifiers, inheritance semantics, lifecycle rules, and domain crosswalks

**Document Type:** Normative interoperability profile  
**Status:** Draft for adoption and conformance patching  
**Profile ID:** `ECRC/0.1`  
**Date:** August 1, 2026  
**Controls:** Emergency, Catastrophic-Risk, and Continuity Interface Specification v0.1  
**Companion Clause:** Emergency Record Inheritance Clause v0.1 (`emergency-record-inheritance-clause-v0.1.md`)  
**Machine-Readable Registry:** `emergency-cluster-record-profile-v0.1.json`

> **A domain record list specializes but does not replace the canonical emergency record set. A record may transport evidence, responsibility, or authorization across a boundary only when its identity, authority, lifecycle, access conditions, and return obligations remain traceable.**

---

## 1. Purpose and constitutional status

This Profile turns the thirty-three records defined by the Emergency, Catastrophic-Risk, and Continuity Interface Specification v0.1 into a stable cluster namespace. It provides canonical identifiers, common header fields, applicability triggers, relationship semantics, lifecycle states, access classes, and provisional mappings for the five emergency-cluster successors.

The Profile is an interface contract. It does not create emergency authority, jurisdiction, standing, legal duties, offences, fiscal power, command, immunity, adjudicative competence, or enforcement capacity. A conforming record can document a valid authority or handoff; it cannot cure the absence of one.

### 1.1 Governing rules

1. **No record-to-power conversion.** Creating, validating, signing, publishing, or exchanging a record does not create the authority described in it.
2. **Specialization, not replacement.** Domain records remain readable and domain-specific, but canonical records remain applicable whenever their triggering conditions arise.
3. **Fail closed.** Missing, ambiguous, invalid, expired, or incompatible authority and lifecycle records block consequential action rather than causing authority to flow upward.
4. **One event, plural functions.** A common event identifier does not create a common command. Each function retains its own responsible authority.
5. **Protected plurality.** Competing estimates, dissent, protected knowledge, and non-engagement remain representable without forced disclosure or synthetic consensus.
6. **Lifecycle completeness.** Activation is incomplete unless renewal, termination, restoration, data disposition, remedy, and unresolved-risk pathways are also representable.
7. **No universal public ledger.** Canonical identity and hashes may be indexed; protected content remains under its lawful authority and access class.

## 2. Source freeze and compatibility

Profile v0.1 was derived from the following frozen artifacts. A later version does not enter this profile automatically.

| Artifact | SHA-256 | Lines |
|---|---|---:|
| `emergency-catastrophic-risk-continuity-interface-specification-v0.1.md` | `c673742b1317c7169d4b8226118478c990e9a3d05084b2dc5ac9ad2f1971163c` | 2135 |
| `emergency-cluster-harmonization-interface-test-v0.1.md` | `479c62643555da11f6235ea6626836b1f7d295a0b6a7ee08a75a9a77200bda65` | 663 |
| `planetary-immune-system-v2.2.md` | `4da5a9f55f161873fd6b7a64713ac86a6b0fe7ae62800edba8d01942a7e253b3` | 1529 |
| `global-health-preparedness-outbreak-response-biosecurity-v2.2.md` | `37bbc06f65d3a507405acf413847903a3d56b1a92ce72681798cf26fa6e6e14e` | 1621 |
| `aethelred-accord-v1.2.md` | `8819f4ac5fdd9090a7cd7807f71c221e50ddd2a6f907b7c44d951933907a3fe7` | 1388 |
| `living-shield-v4.4.md` | `0ccc5d59fd2f9b0ab28b6994a14cfded024877c79dc5b6e2401f2a9021f169ca` | 1529 |
| `aegis-protocol-v1.3.md` | `79f9e53ebfd37e5ac4dec6bb6bd4ca09d71a397b241182a3f74c617b74ef0cce` | 1498 |

A replacement or amendment is compatible only after a recorded conformance test confirms that canonical meanings, authority boundaries, access protections, and lifecycle obligations have not silently changed.

## 3. Canonical identity and common header

Every conforming record carries a stable canonical identity even when the user-facing domain name differs. Canonical IDs identify the function of a record, not the institution that stores it.

### 3.1 Required common header

Every record instance shall include the following fields or a deterministic mapping to them:

| Field | Requirement |
|---|---|
| `record_instance_id` | Globally unique record instance identifier; immutable after issuance. |
| `canonical_id` | One canonical `ECRC-##` identifier, or several only under a declared `contains` relationship. |
| `canonical_schema_version` | Profile/schema version used to validate the record. |
| `domain_record_name` | Human-readable domain label. |
| `inheritance_relationship` | One of `implements`, `extends`, `splits`, `contains`, `imports`, or `not_applicable`. |
| `cluster_event_id` | Shared compound-event identifier when the record participates in a cross-domain event. |
| `domain_event_id` | Optional local/domain event identifier. |
| `record_status` | Draft, issued, corrected, withdrawn, invalid, or other controlled publication status. |
| `lifecycle_state` | One controlled lifecycle state from Section 6. |
| `created_at` | Creation timestamp with time zone. |
| `updated_at` | Most recent material update timestamp. |
| `effective_at` | Time the record or decision takes effect, if any. |
| `expires_at` | Automatic expiry where applicable; absence requires a reason. |
| `issuing_function` | Function that created or issued the record, distinct from the institution name. |
| `responsible_authority` | Authority responsible for the decision or obligation, or explicit `none` for non-authoritative observation records. |
| `authority_provenance_refs` | Links to ECRC-06 or other valid constituting instruments where consequential effect exists. |
| `linked_record_ids` | Records required to interpret the current record. |
| `parent_record_ids` | Records from which this record is derived without implying automatic legal effect. |
| `supersedes` | Prior record instances replaced by this one. |
| `superseded_by` | Later record instance, populated when known. |
| `access_class` | One access class from Section 5. |
| `public_summary_ref` | Public summary or statement explaining why none can safely be published. |
| `protected_annex_ref` | Reference to protected content without exposing it. |
| `correction_history` | Immutable history of corrections, retractions, and disputed fields. |
| `dissent_refs` | Links to recorded dissent or ECRC-33 entries. |
| `attestations` | Signatures or attestations appropriate to the record and jurisdiction. |
| `integrity_hash` | Hash or equivalent integrity control; not a substitute for authenticity or authority. |

### 3.2 Event identifiers and record identifiers

- `cluster_event_id` identifies a shared event envelope; it never creates a shared sovereign, command, or legal classification.
- `record_instance_id` identifies one record instance and remains immutable even when the record is corrected.
- Corrections create a new version or correction entry while preserving the prior state and reason.
- Parent/child or merged event relationships must be explicit; records are not silently reassigned to a different event.

## 4. Inheritance relationships

| Relationship | Normative meaning |
|---|---|
| `implements` | One domain record satisfies the canonical purpose and all applicable canonical minimum fields. |
| `extends` | The domain record includes the complete canonical record plus additional domain-specific fields or controls. |
| `splits` | Two or more domain records jointly satisfy one canonical record; every component and the assembly rule are declared. |
| `contains` | One domain package contains two or more canonical records as separately identifiable subrecords with distinct authorities, legal effects, timestamps, and lifecycle states. |
| `imports` | The canonical record is used directly without domain renaming. |
| `not_applicable` | A competent function records that the canonical trigger cannot arise in the specific event or action package, with reasons and review conditions. |

### 4.1 Rules for `splits`

A split mapping must list every component record, the function responsible for assembly, the fields carried by each component, and the rule for determining that the canonical record is complete. No component may silently inherit the legal effect of another.

### 4.2 Rules for `contains`

Containment is permitted only when each canonical subrecord remains separately identifiable, reviewable, correctable, exportable, and closable. `ECRC-24` and `ECRC-25` may be displayed in one package but must remain separate subrecords because evidence transfer does not imply adjudication or enforcement.

### 4.3 Rules for `not_applicable`

`not_applicable` is an event- or action-specific determination, not a shortcut for omitting a record from a framework. It shall identify the trigger tested, deciding function, reasons, evidence, review condition, and records that would become required if circumstances change. A domain may declare a record structurally out of scope only where the domain cannot lawfully perform or encounter the triggering function.

### 4.4 Direct import

Where a domain has no useful specialization, it shall use `imports` and instantiate the canonical record directly. An unmapped record is not optional merely because it is absent from a domain appendix.

## 5. Access classes and protected transport

| Class | Meaning |
|---|---|
| **AC-1 Public** | Record is public by default, subject to narrowly defined redactions. |
| **AC-2 Public summary / protected annex** | Core authority and effect are public; sensitive evidence, operations, or personal data are protected. |
| **AC-3 Restricted operational** | Access is role-bound, logged, time-limited, and reviewable; a public mission/process summary remains required where safe. |
| **AC-4 Protected sovereignty or source** | Access and disclosure follow the authority of the affected Indigenous nation, protected source, privilege holder, or lawful custodian. |
| **AC-5 Sealed adjudicative or security material** | Access requires separately valid judicial, professional, or security authority and does not eliminate correction, review, retention, or disposition duties. |

Access class controls disclosure, not authority. Redaction, sealing, encryption, or protected custody must preserve enough public information to identify the acting authority, legal effect, time limit, review path, and existence of protected material unless a competent authority records a narrowly tailored exception.

## 6. Lifecycle states

Canonical lifecycle states are: `draft`, `proposed`, `active`, `contested`, `suspended`, `superseded`, `expired`, `terminated`, `restoration_pending`, `disposition_pending`, `closed`, `archived`.

### 6.1 Required transitions

- `active` records with temporal effect move to `expired`, `terminated`, or `superseded`; they do not remain indefinitely active by omission.
- `termination` of authority or mission normally creates `restoration_pending` and, where emergency data exist, `disposition_pending`.
- A package becomes `closed` only after required restoration, data disposition, financial reconciliation, claims transfer, and unresolved-risk registration are verified.
- `archived` is a retention state, not continuing authority.
- `contested` does not automatically suspend a record unless law or the responsible authority provides that effect; the contest and review route remain visible.

## 7. Canonical record catalogue


### ECRC-01 — Hazard Alert Record

**Applicability trigger:** A person, sensor, institution, or protected source reports a condition that may require assessment.  
**Cardinality:** 0..n per event; alerts remain distinct unless explicitly merged.  
**Default access:** Public summary with protected-source annex  
**Closure condition:** Closed by assessment, withdrawal, merger with traceable provenance, or archival disposition.

**Minimum canonical fields**

- alert identifier and timestamps
- reporter or protected-source status
- observed condition, location, and affected systems
- source and method
- initial uncertainty and competing explanations
- evidence-preservation needs
- conflicts or incentives
- requested next step
- statement that the alert has no coercive effect

**Required or common links**

- `ECRC-03 when assessed`
- `ECRC-19 when sensitive data are processed`

**Prohibited inference:** An alert does not declare an emergency, establish causation, assign blame, or activate power.

### ECRC-02 — Observation Contract

**Applicability trigger:** An observation programme, model, dashboard, monitoring network, laboratory, or assessment process is commissioned or relied upon.  
**Cardinality:** At least one per materially distinct observation function or provider.  
**Default access:** Public summary with technical or protected annex  
**Closure condition:** Closed by expiry, replacement, suspension, or documented termination and data disposition.

**Minimum canonical fields**

- decision question and observation purpose
- sponsor, operator, funder, and beneficiaries
- variables, methods, models, and sampling limits
- data authority and collection basis
- validation, calibration, and update cadence
- known blind spots and failure modes
- conflicts of interest and independence safeguards
- access, retention, correction, and deletion rules
- conditions for suspension or termination

**Required or common links**

- `ECRC-04`
- `ECRC-19`
- `ECRC-20 when protected knowledge is involved`

**Prohibited inference:** An observation contract does not make its outputs legally binding or self-executing.

### ECRC-03 — Catastrophic-Risk State Estimate

**Applicability trigger:** A decision-relevant hazard or system condition requires a structured estimate.  
**Cardinality:** 1..n per decision question; competing estimates may coexist.  
**Default access:** Layered transparency; public summary unless doing so creates material risk  
**Closure condition:** Superseded by a later estimate, closed by resolved question, or archived with unresolved status in ECRC-33.

**Minimum canonical fields**

- decision question and time horizon
- hazard mechanism and origin hypotheses
- evidence for and against each hypothesis
- probability, plausibility, confidence, and calibration
- consequence range and distributional effects
- affected-area, Indigenous, worker, and operator accounts
- action, inaction, and reversible-option analysis
- missing evidence and update triggers
- named dissent and unresolved uncertainty

**Required or common links**

- `ECRC-01`
- `ECRC-02`
- `ECRC-04`
- `ECRC-05 when jurisdiction is implicated`

**Prohibited inference:** A state estimate does not declare an emergency, prove legal causation, or authorize intervention.

### ECRC-04 — Observation Independence Map

**Applicability trigger:** A state estimate or monitoring system depends on multiple observers, models, laboratories, or data providers.  
**Cardinality:** At least one per major estimate or decision package.  
**Default access:** Public summary with protected security annex where necessary  
**Closure condition:** Updated whenever material observers, dependencies, or conflicts change.

**Minimum canonical fields**

- observer and model identities
- funding, ownership, institutional affiliation, and shared dependencies
- data-source overlap and correlated failure
- methodological diversity
- conflicts and incentives
- challenge and replication capacity
- protected or unavailable perspectives
- independence limitations and mitigations

**Required or common links**

- `ECRC-02`
- `ECRC-03`

**Prohibited inference:** A count of observers does not establish independence, validity, or consensus.

### ECRC-05 — Standing and Jurisdiction Map

**Applicability trigger:** A condition may affect multiple territories, peoples, sectors, professional regulators, or legal decision classes.  
**Cardinality:** At least one before any consequential cross-domain or cross-border action.  
**Default access:** Public summary with protected annex for security-sensitive details  
**Closure condition:** Closed only when all active functions have an identified authority or an explicit authority gap is recorded.

**Minimum canonical fields**

- underlying decision classes
- territorial and host authorities
- affected Indigenous authorities
- rights holders and representatives
- cross-border jurisdictions
- essential operators and professional regulators
- courts, review bodies, and mutual-aid instruments
- conflicts, gaps, and unresolved claims
- authority that will decide each disputed question

**Required or common links**

- `ECRC-03`
- `ECRC-06`
- `ECRC-10`
- `ECRC-11`

**Prohibited inference:** Mapping standing or jurisdiction does not create it, resolve contested sovereignty, or authorize action.

### ECRC-06 — Emergency Authority Provenance Record

**Applicability trigger:** Any consequential emergency act, declaration, deployment, restriction, compulsory measure, seizure, or extraordinary expenditure is proposed.  
**Cardinality:** One per authority/action bundle; separate records for materially different powers or legal bases.  
**Default access:** Public summary plus protected legal/operational annex  
**Closure condition:** Expires with the power, is superseded by a new valid record, or is invalidated and routed to restoration.

**Minimum canonical fields**

- proposed act and decision class
- issuing authority and constituting instrument
- territorial, personal, subject-matter, and temporal jurisdiction
- triggering facts and evidentiary threshold
- rights affected and non-derogable minima
- conditions, prohibitions, and dependencies
- review, appeal, expiry, renewal, termination, and restoration
- responsible officials and command relationship
- public summary and protected annex
- attestations and authenticity controls

**Required or common links**

- `ECRC-05`
- `ECRC-07 when declaration is required`
- `ECRC-08`
- `ECRC-13`

**Prohibited inference:** The record documents authority; it does not manufacture authority where the underlying instrument is absent or invalid.

### ECRC-07 — Emergency Declaration Record

**Applicability trigger:** Applicable law requires a formal declaration before specified emergency powers or resources may be used.  
**Cardinality:** One per declaring authority and territorial/legal scope; multiple declarations may coexist.  
**Default access:** Public except narrowly protected operational details  
**Closure condition:** Closed by expiry, withdrawal, judicial invalidation, replacement, or ECRC-27.

**Minimum canonical fields**

- declaring authority and legal basis
- declared condition, territory, population, and functions
- threshold and evidence relied upon
- start time and automatic expiry
- powers not activated by the declaration
- review and challenge route
- conditions for refusal, amendment, renewal, or termination
- relationship to other declarations

**Required or common links**

- `ECRC-03`
- `ECRC-05`
- `ECRC-06`
- `ECRC-08`

**Prohibited inference:** A declaration does not activate every emergency power, transfer command, establish liability, or override unrelated institutions.

### ECRC-08 — Power Activation and Prohibition Schedule

**Applicability trigger:** A valid authority proposes to activate one or more specific emergency powers.  
**Cardinality:** One schedule per authority and activation period; each power is separately enumerated.  
**Default access:** Public summary with protected operational annex  
**Closure condition:** Each power closes separately by expiry, termination, invalidation, or replacement.

**Minimum canonical fields**

- each activated power and legal basis
- responsible function and decision maker
- territorial, personal, functional, and temporal scope
- conditions precedent and dependencies
- prohibited uses and protected minima
- least-restrictive alternatives considered
- start, review, expiry, and renewal dates
- data, finance, work, and command dependencies
- termination and restoration obligations

**Required or common links**

- `ECRC-06`
- `ECRC-07 when applicable`
- `ECRC-09`
- `ECRC-13`
- `ECRC-22`

**Prohibited inference:** Activation of one power does not imply activation of another or create residual authority.

### ECRC-09 — Operational Command and Deployment Record

**Applicability trigger:** Personnel, assets, facilities, or operational modules are deployed or coordinated.  
**Cardinality:** One per mission, command chain, or materially distinct module.  
**Default access:** Restricted operational record with public mission summary  
**Closure condition:** Closed by mission termination, handoff acceptance, demobilisation, and verified asset/credential return.

**Minimum canonical fields**

- mission purpose and lawful authority
- commander or coordinating lead and professional autonomy boundaries
- personnel, assets, facilities, and capabilities
- host and territorial authorization
- rules, prohibitions, and escalation limits
- communications and interoperability
- worker safety, liability, claims, and insurance
- data and intelligence boundaries
- handoff, withdrawal, termination, and asset-return conditions

**Required or common links**

- `ECRC-06`
- `ECRC-08`
- `ECRC-10`
- `ECRC-16`
- `ECRC-23 when assistance crosses boundaries`

**Prohibited inference:** Operational command does not confer legal jurisdiction beyond the specifically authorized mission.

### ECRC-10 — Host and Territorial Authorization Record

**Applicability trigger:** Assistance, deployment, access, facility use, data collection, or operations occur in another territory or under another host authority.  
**Cardinality:** At least one per host jurisdiction or affected territory.  
**Default access:** Public summary with protected operational annex  
**Closure condition:** Closed by withdrawal, expiry, completion, revocation, or verified handback.

**Minimum canonical fields**

- requesting and accepting authorities
- territory, facilities, communities, and duration
- scope of consent or authorization
- command and professional-autonomy boundaries
- access, search, data, sample, and equipment permissions
- costs, liability, claims, and immunities if lawfully granted
- withdrawal, refusal, suspension, and termination
- handoff and return obligations

**Required or common links**

- `ECRC-05`
- `ECRC-09`
- `ECRC-11 where Indigenous territory is affected`
- `ECRC-23`

**Prohibited inference:** Host authorization does not waive rights, create blanket immunity, or authorize unrelated intelligence collection.

### ECRC-11 — Indigenous Emergency Interface Record

**Applicability trigger:** An emergency action, observation, assistance mission, or data/knowledge process may affect an Indigenous people, nation, territory, resource, relation, or protected knowledge.  
**Cardinality:** One per affected Indigenous nation or validly designated interface; no universal proxy.  
**Default access:** Protected sovereignty record; public information only by affected authority  
**Closure condition:** Closed by affected authority, completion of obligations, or documented non-engagement; survival of non-transfer terms is explicit.

**Minimum canonical fields**

- affected people or nation and chosen representatives
- decision class and inherent or recognized authority
- engagement, refusal, or non-engagement status
- territorial access and operational conditions
- knowledge, data, sample, genetic, cultural, and spiritual protections
- non-transfer, non-publication, non-training, return, deletion, or destruction conditions
- immediate-rescue exception if any and its narrow limits
- benefit, compensation, restoration, and grievance routes
- termination and non-precedent statement

**Required or common links**

- `ECRC-05`
- `ECRC-10`
- `ECRC-20`
- `ECRC-30`

**Prohibited inference:** The record does not create a universal Indigenous representative or convert consultation into consent.

### ECRC-12 — Affected-Community Liaison Record

**Applicability trigger:** Communities face material effects, displacement, restrictions, uncertainty, or operational presence.  
**Cardinality:** One per materially distinct affected community or liaison structure.  
**Default access:** Public summary with protected participant annex  
**Closure condition:** Closed after obligations, grievances, and unresolved issues are transferred or resolved.

**Minimum canonical fields**

- community definition and liaison selection method
- communication languages and accessibility
- needs, concerns, local observations, and dissent
- support, grievance, correction, and feedback channels
- meeting cadence and response deadlines
- conflict-of-interest and representation limits
- protected participants and retaliation safeguards
- unresolved issues and escalation path

**Required or common links**

- `ECRC-11 where applicable`
- `ECRC-13`
- `ECRC-21`

**Prohibited inference:** A liaison record does not establish consent, erase dissent, or authorize action.

### ECRC-13 — Rights and Non-Derogation Record

**Applicability trigger:** A proposed or active measure may affect rights, liberties, equality, accessibility, bodily integrity, livelihood, family life, due process, or protected continuity.  
**Cardinality:** At least one per activation package; supplemental records for distinct measures.  
**Default access:** Public summary with protected personal annex  
**Closure condition:** Updated throughout the measure and closed only after restoration and outstanding remedies are recorded.

**Minimum canonical fields**

- rights and populations affected
- non-derogable and protected minima
- legal basis and legitimate aim
- necessity, proportionality, and less-restrictive alternatives
- disability, age, gender, racial, migration, institutionalization, and socioeconomic effects
- procedural safeguards, notice, review, and appeal
- support required to make voluntary compliance possible
- monitoring for discriminatory or cumulative effects
- expiry, remedy, and restoration

**Required or common links**

- `ECRC-06`
- `ECRC-08`
- `ECRC-14 or ECRC-15 when applicable`
- `ECRC-30`

**Prohibited inference:** A rights review does not cure an invalid legal basis or make a disproportionate measure lawful.

### ECRC-14 — Health Measure and Bodily Integrity Record

**Applicability trigger:** A measure affects vaccination, prophylaxis, testing, treatment, triage, medical examination, sample collection, or other bodily integrity.  
**Cardinality:** One per materially distinct health measure and affected legal regime.  
**Default access:** Public clinical/legal summary with confidential personal data  
**Closure condition:** Closed after expiry, follow-up, data/sample disposition, and unresolved claims transfer.

**Minimum canonical fields**

- measure, target population, and clinical purpose
- evidence, uncertainty, benefits, and harms
- authorization and professional responsibility
- consent or compulsory basis
- contraindications, exemptions, accommodations, and alternatives
- privacy, samples, and data handling
- access, allocation, continuity, and non-discrimination
- adverse-event monitoring and compensation
- review, expiry, and withdrawal

**Required or common links**

- `ECRC-13`
- `ECRC-19`
- `ECRC-22`
- `ECRC-30`

**Prohibited inference:** The record does not authorize forced treatment or establish clinical appropriateness for an individual.

### ECRC-15 — Isolation, Evacuation, and Shelter Record

**Applicability trigger:** People may be isolated, quarantined, evacuated, excluded, relocated, or housed in emergency shelter.  
**Cardinality:** One per measure, area, authority, and affected population.  
**Default access:** Public rules with protected individual records  
**Closure condition:** Closed by release/return, property and service restoration, and disposition of personal data.

**Minimum canonical fields**

- measure and lawful authority
- persons, area, duration, and criteria
- evidence and less-restrictive alternatives
- notice, review, appeal, and representation
- food, water, shelter, income, caregiving, communication, health, disability, and family supports
- safety, privacy, policing, and non-discrimination safeguards
- return, release, compensation, and property protection
- expiry and re-evaluation

**Required or common links**

- `ECRC-13`
- `ECRC-17`
- `ECRC-18`
- `ECRC-22`
- `ECRC-30`

**Prohibited inference:** The record does not permit collective punishment, indefinite confinement, or unsupported evacuation.

### ECRC-16 — Emergency Work Mobilisation Record

**Applicability trigger:** Workers, volunteers, community responders, contractors, public servants, or security personnel are mobilized.  
**Cardinality:** One per workforce, employer/organizer, and mission.  
**Default access:** Public labour standards with protected personnel annex  
**Closure condition:** Closed after demobilisation, final pay, claims transfer, credential return, and follow-up arrangements.

**Minimum canonical fields**

- roles, employer or responsible entity, and command
- voluntary or compulsory basis
- wages, benefits, insurance, pensions, and hazard pay
- training, credentials, supervision, equipment, and staffing
- hours, rotation, rest, family, mental-health, and disability support
- safe refusal, withdrawal, whistleblowing, and anti-retaliation
- injury, exposure, claims, and long-term follow-up
- demobilisation, retraining, and record disposition

**Required or common links**

- `ECRC-09`
- `ECRC-13`
- `ECRC-18`
- `ECRC-30`

**Prohibited inference:** Recognition, solidarity, Hearts, civic duty, or emergency rhetoric does not replace wages and protections.

### ECRC-17 — Essential Services and AUBI Continuity Record

**Applicability trigger:** An emergency may interrupt essential care, utilities, food, shelter, communications, justice, income support, or AUBI Layer 1.  
**Cardinality:** At least one per affected essential-service network or territory.  
**Default access:** Public continuity summary with protected infrastructure annex  
**Closure condition:** Closed after ordinary capacity is restored or a lawful long-term transition is approved.

**Minimum canonical fields**

- essential functions and dependent populations
- minimum service levels and prioritization
- operators, substitutes, and mutual-aid dependencies
- accessibility and protected-population needs
- AUBI Layer 1 and social-protection continuity
- supply, staffing, power, communications, and cyber dependencies
- failure thresholds and restoration sequence
- public information and grievance routes

**Required or common links**

- `ECRC-03`
- `ECRC-08`
- `ECRC-18`
- `ECRC-23`

**Prohibited inference:** The record does not authorize discrimination, political conditionality, or diversion of protected personal balances.

### ECRC-18 — Emergency Finance and Compensation Record

**Applicability trigger:** Emergency funds, forecast finance, procurement, guarantees, reserves, compensation, or extraordinary expenditures are used.  
**Cardinality:** One per funding instrument, authority, and accounting unit.  
**Default access:** Public fiscal summary with protected anti-fraud annex  
**Closure condition:** Closed by audited reconciliation, compensation-reserve transfer, and lawful disposition of residual funds.

**Minimum canonical fields**

- legal and fiscal authority
- funding source, amount, currency, and custody
- eligible uses, recipients, and disbursement rules
- procurement, conflicts, fees, and beneficial ownership
- forecast or parametric trigger and basis-risk safeguards
- audit, correction, appeal, and fraud controls
- worker, community, and claimant compensation reserves
- expiry, clawback limits, residual funds, and closeout

**Required or common links**

- `ECRC-06`
- `ECRC-08`
- `ECRC-16`
- `ECRC-17`
- `ECRC-30`

**Prohibited inference:** A framework, metric, or emergency label does not create tax, debt, seizure, or appropriation authority.

### ECRC-19 — Data, Privacy, Security, and Secrecy Record

**Applicability trigger:** Emergency observation or action processes personal, health, genetic, operational, infrastructure, model, communications, or security-sensitive data.  
**Cardinality:** At least one per data system, controller/custodian, and purpose; linked records for shared processing.  
**Default access:** Layered access; never presumed public  
**Closure condition:** Remains active until ECRC-29 verifies disposition or a valid ordinary-law basis replaces the emergency basis.

**Minimum canonical fields**

- data categories, subjects, sources, and purposes
- controller, custodian, processor, and access roles
- legal basis and authority
- collection limits, minimization, accuracy, correction, and contestation
- security, logging, breach response, and model safeguards
- sharing, cross-border transfer, and protected non-transfer
- retention, deletion, archival, and emergency-expiry rules
- public summary, secrecy rationale, and review
- AI or automated-system role and human responsibility

**Required or common links**

- `ECRC-02`
- `ECRC-11 or ECRC-20 where applicable`
- `ECRC-21`
- `ECRC-29`

**Prohibited inference:** Data possession, dashboard visibility, or model output does not create decision authority or permit secondary use.

### ECRC-20 — Protected Knowledge and Non-Transfer Record

**Applicability trigger:** Knowledge, samples, genetic material, cultural information, sacred relations, source identities, security information, or dual-use material requires protected handling.  
**Cardinality:** One per protected knowledge domain, source authority, or non-transfer obligation.  
**Default access:** Protected; public existence/summary only where authorized  
**Closure condition:** Closed only when the originating authority confirms disposition or continuing obligations are transferred.

**Minimum canonical fields**

- protected subject and authority to set conditions
- classification and rationale
- permitted purpose, users, locations, and duration
- non-transfer, non-publication, non-training, non-commercialization, and derivative-use conditions
- bounded attestation or aggregate alternatives
- security, custody, access logging, and breach response
- return, repatriation, deletion, destruction, or continuing custody
- surviving obligations after termination

**Required or common links**

- `ECRC-11`
- `ECRC-19`
- `ECRC-24 when evidence is involved`

**Prohibited inference:** The record does not convert protected knowledge into a global commons or infer consent from emergency need.

### ECRC-21 — Public Information and Correction Record

**Applicability trigger:** Authorities or operational bodies issue warnings, advice, uncertainty statements, corrections, orders, or service information.  
**Cardinality:** One per communication stream, issuing function, and material correction cycle.  
**Default access:** Public by purpose, with protected drafting/source annex  
**Closure condition:** Closed when superseded, corrected, archived, and linked to final after-action account.

**Minimum canonical fields**

- issuer and communication authority
- audience, languages, formats, and accessibility
- content type: observation, advice, request, or legal order
- evidence, uncertainty, and update time
- distinction between public-health/disaster advice and compulsory measures
- source and protected-information limits
- correction, retraction, archive, and appeal process
- misinformation-risk controls without propaganda or covert persuasion

**Required or common links**

- `ECRC-03`
- `ECRC-07 or ECRC-08 for legal orders`
- `ECRC-12`
- `ECRC-19`

**Prohibited inference:** Communication does not create legal authority, and correction does not permit narrative manufacture.

### ECRC-22 — Interim Measure Review Record

**Applicability trigger:** A provisional, urgent, ex parte, restrictive, or protective measure is taken before full ordinary process.  
**Cardinality:** One per interim measure and each mandatory review.  
**Default access:** Public decision with protected evidence annex where justified  
**Closure condition:** Closed by timely review and implementation of continuation, termination, or restoration.

**Minimum canonical fields**

- measure, authority, and start time
- urgent necessity and evidence
- rights and interests affected
- notice given or reason for delay
- opportunity to contest and access evidence
- independent reviewer and deadline
- continuation, modification, termination, or remedy decision
- links to declaration, activation, and evidence records

**Required or common links**

- `ECRC-06`
- `ECRC-08`
- `ECRC-13`
- `ECRC-24`
- `ECRC-25`

**Prohibited inference:** An interim measure cannot renew itself, evade the 72-hour limit, or become permanent through repetition.

### ECRC-23 — Cross-Border Assistance Record

**Applicability trigger:** Assistance, personnel, assets, funds, data, samples, or services cross jurisdictional boundaries.  
**Cardinality:** One per sending/receiving authority pair and mission; multilateral packages may link several records.  
**Default access:** Public mission summary with protected operational annex  
**Closure condition:** Closed after handback, financial reconciliation, data disposition, claims transfer, and authority restoration.

**Minimum canonical fields**

- request, offer, acceptance, rejection, or concurrent status
- sending, receiving, host, and territorial authorities
- mission, assets, personnel, duration, and limits
- command, professional autonomy, and interoperability
- customs, licensing, credentials, liability, claims, and costs
- data, sample, intelligence, and protected-knowledge boundaries
- neutrality, withdrawal, termination, and handback
- unresolved disputes and review route

**Required or common links**

- `ECRC-05`
- `ECRC-09`
- `ECRC-10`
- `ECRC-18`
- `ECRC-19`

**Prohibited inference:** Cross-border assistance does not create extraterritorial jurisdiction, blanket immunity, or authority to use force.

### ECRC-24 — Investigation and Evidence Handoff Record

**Applicability trigger:** Potential wrongdoing, liability, causation, regulatory breach, or rights violation requires evidence transfer to a competent investigative or prosecutorial function.  
**Cardinality:** One per sender, recipient, evidentiary package, and handoff event.  
**Default access:** Restricted evidentiary record with public process summary where lawful  
**Closure condition:** Closed by acknowledged custody transfer, rejection/return, or lawful disposition.

**Minimum canonical fields**

- sender and recipient authority
- investigative question and jurisdiction
- items, data, samples, statements, and metadata transferred
- chain of custody, integrity, provenance, and access history
- protected sources, privileges, privacy, and non-transfer conditions
- scope and purpose limits
- acceptance, rejection, deficiency, and correction timestamps
- retained copies and continuing duties
- statement that no adjudication or enforcement result is implied

**Required or common links**

- `ECRC-19`
- `ECRC-20`
- `ECRC-25 only if separately initiated`

**Prohibited inference:** Evidence handoff does not establish liability, guilt, causation, remedy, or enforcement authority.

### ECRC-25 — Adjudication and Enforcement Handoff Record

**Applicability trigger:** A competent authority seeks adjudication, recognition, remedy, injunction, sanction, or execution by a separately authorized body.  
**Cardinality:** One per referral, case, order, recognition request, or enforcement assignment.  
**Default access:** Public procedural record with protected case annex  
**Closure condition:** Closed by final disposition, execution report, stay, withdrawal, or transfer to ordinary process.

**Minimum canonical fields**

- referring and receiving authorities
- legal basis, jurisdiction, standing, and requested relief
- case or order identifier
- procedural status and notice
- evidence references without collapsing ECRC-24
- rights, appeal, stay, and review routes
- enforcement actor and separately valid mandate
- scope, limits, expiry, completion, and return report
- statement preserving judicial and operational separation

**Required or common links**

- `ECRC-05`
- `ECRC-06`
- `ECRC-22 where interim relief exists`
- `ECRC-24 as evidence reference`

**Prohibited inference:** Referral does not predetermine adjudication; an order does not authorize an unassigned body to execute itself.

### ECRC-26 — Renewal State Estimate

**Applicability trigger:** A provisional or time-limited emergency action is proposed for continuation, especially beyond 72 hours, 30 days, or 90 cumulative days.  
**Cardinality:** One per renewal decision and active power bundle.  
**Default access:** Public decision summary with protected evidence annex  
**Closure condition:** Closed by renewal decision, expiry, termination, or transition to ordinary law.

**Minimum canonical fields**

- current decision question and active powers
- updated hazard evidence and confidence
- results and harms of measures taken
- rights, distributional, worker, and continuity effects
- less-restrictive alternatives and ordinary-law options
- remaining authority and jurisdiction
- dissent and evidence that would end the measure
- renewal period, conditions, and automatic expiry
- restoration and data-disposition readiness

**Required or common links**

- `ECRC-03`
- `ECRC-06`
- `ECRC-08`
- `ECRC-13`
- `ECRC-22`
- `ECRC-27`

**Prohibited inference:** Past authorization, sunk cost, institutional performance, or persistent hazard does not itself justify renewal.

### ECRC-27 — Emergency Termination Certificate

**Applicability trigger:** An emergency declaration, power, mission, facility control, restriction, or extraordinary coordination ends.  
**Cardinality:** One per terminated declaration, power bundle, mission, or authority.  
**Default access:** Public certificate with protected implementation annex  
**Closure condition:** Closed only when linked restoration and disposition obligations are verified, not merely announced.

**Minimum canonical fields**

- terminated authority, measure, mission, and scope
- legal and factual basis for termination
- effective time
- remaining hazards and unresolved issues
- orders to cease, withdraw, release, return, or restore
- service-continuity arrangements
- records, data, samples, assets, credentials, and funds requiring disposition
- responsible actors and completion deadlines
- rights, claims, and review routes

**Required or common links**

- `ECRC-08`
- `ECRC-09`
- `ECRC-26`
- `ECRC-28`
- `ECRC-29`
- `ECRC-30`

**Prohibited inference:** A termination certificate does not prove that authority, assets, data, services, or rights have actually been restored.

### ECRC-28 — Authority Restoration and Asset Return Record

**Applicability trigger:** Emergency authority, facilities, assets, access, credentials, command, custody, or territorial control must return.  
**Cardinality:** One per authority/asset/custody bundle and receiving owner or authority.  
**Default access:** Public completion summary with protected inventory/security annex  
**Closure condition:** Closed by verified acceptance or formally recorded unresolved dispute.

**Minimum canonical fields**

- authority and assets to be returned
- returning and receiving actors
- condition, inventory, access, credentials, keys, software, and custody
- outstanding restrictions, claims, contamination, or damage
- service continuity and professional handover
- revocation of emergency access and command
- verification, acceptance, deficiency, and completion
- unresolved items and escalation route

**Required or common links**

- `ECRC-27`
- `ECRC-29`
- `ECRC-30`

**Prohibited inference:** Publication of termination or intent to return does not complete restoration.

### ECRC-29 — Emergency Data Disposition Record

**Applicability trigger:** Emergency powers expire or emergency-purpose data, samples, models, logs, or access rights reach their disposition point.  
**Cardinality:** At least one per ECRC-19 processing environment and termination package.  
**Default access:** Layered access; public disposition summary where safe  
**Closure condition:** Closed by verified disposition or valid continuing ordinary-law authority with review date.

**Minimum canonical fields**

- data, samples, models, logs, credentials, and copies covered
- controller, custodian, recipients, and processors
- emergency basis that has expired
- delete, return, repatriate, anonymize, archive, retain, or migrate decision
- ordinary-law basis for any continuing retention
- protected non-transfer and source conditions
- verification method and completion date
- breach, unresolved copy, or litigation-hold status
- access revocation and public summary

**Required or common links**

- `ECRC-19`
- `ECRC-20`
- `ECRC-27`
- `ECRC-28`

**Prohibited inference:** Emergency usefulness, research value, or technical convenience does not justify indefinite retention or secondary use.

### ECRC-30 — Wrongful Action and Compensation Record

**Applicability trigger:** Action may have been unlawful, excessive, mistaken, discriminatory, harmful, or based on a good-faith false alarm that caused compensable loss.  
**Cardinality:** One per claim, class, affected community, or remedial programme.  
**Default access:** Public programme/ruling summary with protected claimant data  
**Closure condition:** Closed after remedy completion or transfer of unresolved claims to competent process.

**Minimum canonical fields**

- claimant or affected class and standing
- challenged action and responsible actors
- harm, loss, injury, rights effect, or property impact
- evidence, causation, uncertainty, and defences
- urgent support and interim restoration
- remedies, compensation, rehabilitation, correction, apology, or institutional change
- funding source and payment status
- appeal, review, and unresolved issues
- non-retaliation and preservation of future support

**Required or common links**

- `ECRC-13`
- `ECRC-18`
- `ECRC-24 or ECRC-25 where applicable`

**Prohibited inference:** Good-faith intent does not erase harm; compensation does not retroactively validate unlawful action.

### ECRC-31 — After-Action and Ordinary-Capacity Review

**Applicability trigger:** A significant alert, activation, compound event, failed escalation, or emergency response concludes or reaches a major review point.  
**Cardinality:** At least one per major event or mission; independent reviews may coexist.  
**Default access:** Public report with protected annexes  
**Closure condition:** Closed when recommendations are accepted, rejected with reasons, or transferred to tracked ordinary governance.

**Minimum canonical fields**

- event and decision chronology
- what was known, unknown, and contested
- authority and handoff performance
- rights, community, Indigenous, worker, data, finance, and continuity effects
- counterfactuals, false positives, false negatives, and intervention harm
- successes, failures, near misses, and dissent
- changes proposed to ordinary capacity, law, interfaces, or institutions
- owners, deadlines, and verification
- statement that learning does not transfer authority

**Required or common links**

- `ECRC-27`
- `ECRC-28`
- `ECRC-29`
- `ECRC-30`
- `ECRC-33`

**Prohibited inference:** Operational success, competence, trust, or learning does not transfer permanent jurisdiction.

### ECRC-32 — Institutional Sunset or Continuation Record

**Applicability trigger:** A temporary emergency body, programme, facility, mandate, dataset, fund, or coordination arrangement reaches review or sunset.  
**Cardinality:** One per temporary institution or programme.  
**Default access:** Public decision with protected operational annex  
**Closure condition:** Closed by verified continuation under valid authority, transfer, or dissolution.

**Minimum canonical fields**

- institution, mandate, authority, and original sunset
- performance and harm evidence
- remaining need and ordinary alternatives
- capture, dependency, and self-preservation risks
- continuation, transfer, narrowing, dissolution, or no-successor options
- assets, personnel, data, obligations, and claims disposition
- decision authority, reasons, dissent, and next review
- prohibition on competence-to-jurisdiction migration

**Required or common links**

- `ECRC-31`
- `ECRC-28`
- `ECRC-29`
- `ECRC-33`

**Prohibited inference:** Existence, performance, accumulated expertise, or unresolved risk does not entitle an institution to continue.

### ECRC-33 — Unresolved Risk and Dissent Register

**Applicability trigger:** Material uncertainty, jurisdiction gap, unresolved dissent, residual hazard, uncompleted restoration, or non-scaling decision remains open.  
**Cardinality:** 0..n per event; one cluster-level index may reference protected entries.  
**Default access:** Public index with protected entries where necessary  
**Closure condition:** Closed only when the specified closure condition is met and verified.

**Minimum canonical fields**

- issue identifier and linked event/records
- risk, uncertainty, dissent, or unresolved obligation
- affected systems, rights holders, and authorities
- current custodian and responsible follow-up actor
- evidence needed and update trigger
- deadline or review cadence
- public/protected status
- reason unresolved
- closure condition and history

**Required or common links**

- Any ECRC record; especially ECRC-03
- `ECRC-05`
- `ECRC-27`
- `ECRC-28`
- `ECRC-29`
- `ECRC-31`
- `ECRC-32`

**Prohibited inference:** An unresolved-risk register does not keep emergency powers alive or authorize precautionary coercion.

## 8. Activation and lifecycle bundles

The following bundles are completeness profiles, not grants of authority. A bundle may omit a record only through a valid `not_applicable` determination.

### 8.1 Minimum consequential emergency activation bundle

`ECRC-03`, `ECRC-05`, `ECRC-06`, `ECRC-07` where declaration is legally required, `ECRC-08`, `ECRC-09` where operations are deployed, `ECRC-10` where host authorization is needed, `ECRC-13`, `ECRC-16` where people work, `ECRC-18` where emergency finance is used, `ECRC-19` where data are processed, `ECRC-21`, `ECRC-22` for provisional measures, and the applicable domain records among `ECRC-11`, `ECRC-14`, `ECRC-15`, `ECRC-17`, `ECRC-20`, and `ECRC-23`.

### 8.2 Renewal bundle

`ECRC-26` plus updated `ECRC-03`, `ECRC-04`, `ECRC-05`, `ECRC-06`, `ECRC-08`, `ECRC-13`, `ECRC-16`, `ECRC-17`, `ECRC-18`, `ECRC-19`, `ECRC-22`, and any measure-specific record. Renewal must be denied or narrowed when authority, necessity, proportionality, evidence, or restoration readiness is insufficient.

### 8.3 Termination and restoration bundle

`ECRC-27`, `ECRC-28`, `ECRC-29` whenever emergency-purpose data or samples exist, `ECRC-30` where claims or wrongful-action risks exist, `ECRC-31`, `ECRC-32` for temporary institutions, and `ECRC-33` for all unresolved obligations or dissent.

### 8.4 Biotechnology Emergency Activation Package

At minimum: `ECRC-03`, `ECRC-04`, `ECRC-05`, `ECRC-06`, `ECRC-07` where required, `ECRC-08`, `ECRC-09`, `ECRC-10` where applicable, `ECRC-11`, `ECRC-13`, `ECRC-16`, `ECRC-19`, `ECRC-20`, `ECRC-21`, `ECRC-22`, `ECRC-24`, `ECRC-26`, `ECRC-27`, `ECRC-28`, `ECRC-29`, `ECRC-30`, and `ECRC-33`, plus `ECRC-14`, `ECRC-15`, `ECRC-17`, `ECRC-18`, `ECRC-23`, and `ECRC-25` when their triggers arise.

### 8.5 Emergency Asset Re-tasking Package

At minimum: `ECRC-03`, `ECRC-05`, `ECRC-06`, `ECRC-07` where required, `ECRC-08`, `ECRC-09`, `ECRC-10`, `ECRC-13`, `ECRC-16`, `ECRC-18`, `ECRC-19`, `ECRC-21`, `ECRC-22`, `ECRC-23`, `ECRC-26`, `ECRC-27`, `ECRC-28`, `ECRC-29`, `ECRC-30`, and `ECRC-33`, plus `ECRC-11`, `ECRC-12`, `ECRC-17`, `ECRC-20`, `ECRC-24`, and `ECRC-25` when triggered.

## 9. Domain crosswalk and conformance status

The following mappings reproduce the harmonization test’s frozen alias crosswalk. They do not amend the five frameworks by themselves. Each framework must adopt the Record Inheritance Clause and publish a conformance appendix declaring the exact relationship for every row. `UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE` therefore means direct canonical import remains required.


### 9.1 PIS v2.2

**Frozen artifact:** `planetary-immune-system-v2.2.md`  
**SHA-256:** `4da5a9f55f161873fd6b7a64713ac86a6b0fe7ae62800edba8d01942a7e253b3`

| Canonical ID | Domain record or current equivalent | Frozen status | Required profile treatment |
|---|---|---|---|
| `ECRC-01` | Hazard Alert Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-02` | Observation Contract | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-03` | Catastrophic-Risk State Estimate | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-04` | Observation Independence Map | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-05` | Standing and Jurisdiction Map | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-06` | Emergency Authority Provenance Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-07` | Emergency Declaration Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-08` | Power Activation and Prohibition Schedule | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-09` | Operational Command and Deployment Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-10` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-11` | Indigenous Emergency Interface Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-12` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-13` | Rights and Non-Derogation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-14` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-15` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-16` | Emergency Work Mobilisation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-17` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-18` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-19` | Emergency Data, Model, Security, and Secrecy Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-20` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-21` | Public Information and Correction Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-22` | Interim Measure and Urgent Review Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-23` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-24` | Investigation and Evidence Handoff Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-25` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-26` | Renewal State Estimate | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-27` | Emergency Termination Certificate | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-28` | Authority, Asset, and Credential Restoration Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-29` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-30` | Wrongful Action and Compensation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-31` | After-Action Review + Ordinary-Capacity Transition Plan | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-32` | Institutional Sunset or Continuation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-33` | Unresolved Risk Register | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |

### 9.2 Global Health v2.2

**Frozen artifact:** `global-health-preparedness-outbreak-response-biosecurity-v2.2.md`  
**SHA-256:** `37bbc06f65d3a507405acf413847903a3d56b1a92ce72681798cf26fa6e6e14e`

| Canonical ID | Domain record or current equivalent | Frozen status | Required profile treatment |
|---|---|---|---|
| `ECRC-01` | Health Threat Signal Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-02` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-03` | Health State Estimate and Dissent Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-04` | Observation Independence Map | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-05` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-06` | Emergency Authority Provenance Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-07` | Emergency Declaration Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-08` | Power Activation Schedule | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-09` | Mission Scope and Command Record / Health Emergency Assistance Corps Deployment Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-10` | Host Request and Assistance Acceptance Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-11` | Indigenous Health and Protected-Knowledge Interface Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-12` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-13` | Rights and Less-Restrictive-Means Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-14` | Vaccination or Prophylaxis Requirement + Countermeasure Evidence and Authorization | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-15` | Isolation or Quarantine Review Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-16` | Health Worker and Responder Safety Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-17` | Essential Care Continuity Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-18` | Finance, Procurement, and Stockpile Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-19` | Health-Data Authority and Access Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-20` | Indigenous Health and Protected-Knowledge Interface Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-21` | Public Information and Correction Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-22` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-23` | Host Request and Assistance Acceptance Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-24` | Justice and Evidence Handoff Record | MAPPED | Split into separately identifiable ECRC-24 and ECRC-25 subrecords; do not infer adjudication from evidence transfer. |
| `ECRC-25` | Justice and Evidence Handoff Record | MAPPED | Split into separately identifiable ECRC-24 and ECRC-25 subrecords; do not infer adjudication from evidence transfer. |
| `ECRC-26` | Renewal Health State Estimate | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-27` | Emergency Termination Certificate | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-28` | Authority, Facility, and Asset Return Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-29` | Health Data and Sample Disposition Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-30` | Wrongful Action and Compensation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-31` | After-Action and Ordinary-Capacity Review | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-32` | Institutional Continuation, Transfer, or Dissolution Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-33` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |

### 9.3 Aethelred v1.2

**Frozen artifact:** `aethelred-accord-v1.2.md`  
**SHA-256:** `8819f4ac5fdd9090a7cd7807f71c221e50ddd2a6f907b7c44d951933907a3fe7`

| Canonical ID | Domain record or current equivalent | Frozen status | Required profile treatment |
|---|---|---|---|
| `ECRC-01` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-02` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-03` | Biological Incident State Estimate | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-04` | Observation Independence Map | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-05` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-06` | Authority Provenance Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-07` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-08` | Emergency Power Activation Schedule | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-09` | Facility Stand-Down or Shutdown Record (partial) | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-10` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-11` | Indigenous Nation Biotechnology Interface | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-12` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-13` | Disability and Reproductive Justice Review / activity-specific rights fields | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-14` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-15` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-16` | Worker Safety, Exposure, and Refusal Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-17` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-18` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-19` | Biological Data and Sample Lifecycle Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-20` | Protected Non-Transfer Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-21` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-22` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-23` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-24` | Evidence and Chain-of-Custody Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-25` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-26` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-27` | Facility Stand-Down/Shutdown expiration through Interface | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-28` | Authority Restoration and Facility Handback Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-29` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-30` | Wrongful Action and Compensation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-31` | Institutional Learning and Dissent Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-32` | Transfer, Succession, and Dissolution Plan | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-33` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |

### 9.4 Living Shield v4.4

**Frozen artifact:** `living-shield-v4.4.md`  
**SHA-256:** `0ccc5d59fd2f9b0ab28b6994a14cfded024877c79dc5b6e2401f2a9021f169ca`

| Canonical ID | Domain record or current equivalent | Frozen status | Required profile treatment |
|---|---|---|---|
| `ECRC-01` | Hazard Alert Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-02` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-03` | Multi-Hazard State Estimate and Dissent Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-04` | Observation Independence Map | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-05` | Standing and Jurisdiction Map | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-06` | Disaster Authority Provenance Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-07` | Emergency Declaration Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-08` | Power Activation and Prohibition Schedule | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-09` | Operational Command and Deployment Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-10` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-11` | Indigenous Disaster and Knowledge Interface Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-12` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-13` | Accessibility and protected-minima fields across records | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-14` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-15` | Isolation, Evacuation, and Shelter Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-16` | Emergency Work Mobilisation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-17` | Critical-Service Continuity Profile + AUBI/Social-Protection Surge | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-18` | Emergency Finance and Compensation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-19` | Disaster Data, Privacy, and Secrecy Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-20` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-21` | Public Information and Correction Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-22` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-23` | Mutual-Aid Capability and Request Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-24` | Justice and Evidence Handoff Record | MAPPED | Split into separately identifiable ECRC-24 and ECRC-25 subrecords; do not infer adjudication from evidence transfer. |
| `ECRC-25` | Justice and Evidence Handoff Record | MAPPED | Split into separately identifiable ECRC-24 and ECRC-25 subrecords; do not infer adjudication from evidence transfer. |
| `ECRC-26` | Renewal State Estimate | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-27` | Emergency Termination Certificate | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-28` | Authority Restoration and Asset Return Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-29` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-30` | Wrongful Action and Compensation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-31` | After-Action and Ordinary-Capacity Review | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-32` | Institutional Continuation, Transfer, or Dissolution Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-33` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |

### 9.5 Aegis v1.3

**Frozen artifact:** `aegis-protocol-v1.3.md`  
**SHA-256:** `79f9e53ebfd37e5ac4dec6bb6bd4ca09d71a397b241182a3f74c617b74ef0cce`

| Canonical ID | Domain record or current equivalent | Frozen status | Required profile treatment |
|---|---|---|---|
| `ECRC-01` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-02` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-03` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-04` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-05` | Participation/Host/Territorial authority records (partial) | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-06` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-07` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-08` | Power Activation and Prohibition Schedule | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-09` | Emergency Asset Re-tasking Record / Civilian Mission Charter | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-10` | Host and Territorial Authority Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-11` | Indigenous Capability Transition Interface | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-12` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-13` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-14` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-15` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-16` | Worker Safety, Refusal, and Whistleblowing Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-17` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-18` | Project Finance and Public-Value Record (partial) | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-19` | Data, Cyber, and Intelligence Boundary Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-20` | Classified Information and protected interests (partial) | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-21` | Public Communication and Non-Manipulation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-22` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-23` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-24` | Justice and Evidence Handoff Record | MAPPED | Split into separately identifiable ECRC-24 and ECRC-25 subrecords; do not infer adjudication from evidence transfer. |
| `ECRC-25` | Justice and Evidence Handoff Record | MAPPED | Split into separately identifiable ECRC-24 and ECRC-25 subrecords; do not infer adjudication from evidence transfer. |
| `ECRC-26` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-27` | Mission Termination and Asset Handback Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-28` | Authority Restoration and Access Revocation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-29` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |
| `ECRC-30` | Wrongful Action, Injury, and Compensation Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-31` | After-Action and Counterfactual Review | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-32` | Institutional Continuation, Transfer, or Dissolution Record | MAPPED | Declare `implements`, `extends`, `splits`, or `contains` in the framework crosswalk. |
| `ECRC-33` | — | UNMAPPED / IMPORT DIRECTLY WHEN APPLICABLE | Use `imports` when triggered, or issue an event-specific `not_applicable` determination. |

## 10. Conformance requirements

A framework conforms to `ECRC/0.1` only when all of the following are true:

1. It incorporates the Record Inheritance Clause without weakening its effect.
2. It publishes a complete mapping for `ECRC-01` through `ECRC-33`.
3. Every mapped domain record declares its inheritance relationship and preserves the canonical common header.
4. Unmapped canonical records are directly imported when triggered.
5. `not_applicable` determinations are event-specific, reasoned, reviewable, and time-bounded.
6. Evidence handoff and adjudication/enforcement handoff remain separately authorized.
7. Renewal, termination, restoration, data disposition, remedy, and unresolved-risk records are included in every consequential lifecycle.
8. Access controls preserve Indigenous authority, protected sources, privacy, security, correction, and deletion.
9. Cross-domain records carry a common `cluster_event_id` without creating common command.
10. Source versions and hashes match an approved cluster compatibility manifest.
11. Invalid, expired, incomplete, or incompatible authority records fail closed.
12. Automated systems may validate structure and consistency but may not determine legal validity, credibility, liability, guilt, or whether a power should be exercised.

## 11. Validation and implementation order

1. Adopt this Profile and the companion Record Inheritance Clause.
2. Add a conformance appendix to each of the five frameworks.
3. Complete the Aethelred Biotechnology Emergency Activation Package and Aegis Emergency Asset Re-tasking Package.
4. Create the Cross-Domain Event Envelope, Biological Incident Coordination Addendum, and Civilian Converted-Capability Assistance Addendum.
5. Split combined justice/evidence records and import uniform renewal and data-disposition records.
6. Re-run the fifteen cluster scenarios and publish a compatibility manifest.

## 12. Amendment, versioning, and failure

- Canonical IDs are stable within major profile version `0.x`; a renamed record retains its ID unless its constitutional function changes.
- A semantic change to authority, trigger, minimum fields, legal effect, access protection, or closure condition requires compatibility review.
- Deprecated IDs remain resolvable and may not be silently reassigned.
- A later profile does not enter a binding stack until each importing framework passes conformance and scenario testing.
- Profile failure may result in narrowing, reversion, or non-adoption; no successor is required.

---

> **The purpose of a shared record is not to centralize the emergency. It is to ensure that when responsibility crosses a boundary, authority, evidence, rights, data, work, dissent, and restoration do not disappear at that boundary.**
