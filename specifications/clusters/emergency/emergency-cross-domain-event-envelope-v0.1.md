# Emergency Cross-Domain Event Envelope v0.1

## A non-authoritative transport wrapper for shared event identity, routing, responsibility acknowledgement, custody, review, and closure

**Specification ID:** `CDEE/0.1`  
**Status:** Draft for cluster adoption and implementation testing  
**Date:** 2026-08-01  
**Constitutional parent:** *Emergency, Catastrophic-Risk, and Continuity Interface Specification v0.1*  
**Record parent:** *Emergency and Catastrophic-Risk Cluster Record Profile v0.1 (`ECRC/0.1`)*  
**Inheritance parent:** *Emergency Record Inheritance Clause v0.1 (`ECRC-RIC/0.1`)*

---

## Executive rule

> **The Cross-Domain Event Envelope gives one compound event a stable shared identity without giving any institution shared command.**

The Envelope is a transport wrapper and coordination index. It links independently authorized records, functions, estimates, handoffs, custodians, reviews, and closure duties. It does not replace any `ECRC-01`–`ECRC-33` record, and it is not itself an authority, declaration, state estimate, liability finding, command order, or public account of reality.

> **This envelope coordinates identity, routing, acknowledgement, custody, review, and closure. It does not declare an emergency, establish causation, assign liability, create jurisdiction, activate power, transfer command, compel disclosure, or keep emergency authority alive.**

---

## 1. Purpose

Compound events frequently cross framework boundaries. An unknown-origin outbreak may involve clinical response, facility biosafety, worker protection, samples, public information, infrastructure continuity, and later legal investigation. A cyclone may require disaster authorities, health services, converted aircraft, communications assets, finance, data, and protected Indigenous knowledge. Separate institutions are constitutionally desirable, but separation fails operationally when they create different incident identifiers, assume that another body accepted responsibility, lose evidence custody, publish contradictory closure states, or leave temporary access active after the event.

This Specification supplies a common envelope for those seams. It enables participants to:

1. recognize that their records concern the same event;
2. retain multiple hazard and origin hypotheses without forced consensus;
3. identify which domain functions are engaged and under which framework version;
4. state who is responsible for each function and under what authority;
5. offer, accept, reject, qualify, or share responsibility through explicit handoff states;
6. identify evidence, data, sample, asset, knowledge, and credential custodians;
7. identify who coordinates public updates without creating an official truth authority;
8. synchronize review, expiry, termination, restoration, disposition, and unresolved status;
9. preserve corrections, dissent, contested jurisdiction, and incomplete closure; and
10. prevent shared identity from being misread as common command.

## 2. Scope

The Envelope applies when two or more materially distinct functions, jurisdictions, or frameworks need to coordinate around one event, or when a single-domain event is likely to require later cross-domain handoff. It may be used for:

- biological incidents and unknown-origin outbreaks;
- disasters with health, infrastructure, ecological, or converted-capability dimensions;
- cyber-physical and technological incidents;
- hazardous-material, laboratory, radiological, or environmental events;
- space-weather or asteroid events involving civilian infrastructure;
- cross-border humanitarian assistance;
- compound and cascading failures;
- false alarms, disputed events, and failed escalation;
- long-duration transitions from emergency action to ordinary law; and
- after-action, restoration, compensation, and unresolved-risk tracking.

It does not require that every domain framework participate. A participant may be notified, invited, assessing, active, supporting, suspended, declined, terminated, or event-specifically not applicable.

## 3. Controlling constitutional boundaries

The Envelope inherits the following rules:

1. **Severity does not create jurisdiction.** Hazard magnitude, model probability, geographic spread, or public fear may support assessment but cannot generate authority.
2. **No record-to-power conversion.** An envelope, completed field, signature, validation result, or shared identifier cannot activate emergency powers.
3. **No residual steward.** The envelope steward has routing duties only; unassigned powers remain unauthorized.
4. **No merged jurisdictions.** Shared identity does not merge health, biosafety, disaster, Indigenous, professional, judicial, financial, labour, data, or security jurisdiction.
5. **No forced factual consensus.** Hazard and origin hypotheses may remain plural, contested, differently scoped, or unresolved.
6. **No automatic transfer.** A handoff is effective only through recorded acknowledgement and only for the named responsibility.
7. **No erased sender duties.** Correction, source, evidence-preservation, prior-act, worker, rights, and protected-knowledge duties survive handoff unless validly and explicitly reassigned.
8. **No universal public ledger.** Public indexing is layered; protected locations, sources, knowledge, samples, personal data, security information, and adjudicative material remain protected.
9. **No emergency by open ticket.** An open envelope cannot renew a declaration, deployment, restriction, expenditure, access credential, or emergency-purpose data retention.
10. **No silent version substitution.** Every domain engagement pins the framework and interface version actually relied upon.

## 4. Relationship to ECRC records

The Envelope is not an `ECRC-34`. It is a wrapper around records governed by `ECRC/0.1`.

- `cluster_event_id` appears in the canonical ECRC header and binds related records to one event identity.
- Authority remains in `ECRC-05` through `ECRC-10`, especially `ECRC-06` Emergency Authority Provenance Record.
- Rights, Indigenous interfaces, work, finance, data, protected knowledge, review, evidence, adjudication, termination, restoration, disposition, compensation, after-action review, institutional sunset, and unresolved status remain in their corresponding canonical records.
- The Envelope may link to a record but cannot infer that the record is valid, complete, current, authentic, or legally effective.
- The Envelope may display records in one interface only if each remains separately identifiable, correctable, exportable, access-controlled, and closable.

## 5. Event identity

### 5.1 Immutable cluster event identifier

Every Envelope has one immutable `cluster_event_id`. The identifier shall be globally unique within the participating federation and stable across corrections, domain additions, handoffs, and closure. It must not encode protected personal identity, precise protected locations, origin conclusions, blame, legal classification, severity, or responsible institution.

The Specification does not mandate one identifier technology. A UUID, URI, content-independent random identifier, or jurisdiction-issued identifier is acceptable when it is collision-resistant and resolvable within the participating systems. Mandatory blockchain, one global registry, or public disclosure is prohibited.

### 5.2 Envelope instance identifier

`envelope_id` identifies a specific serialized or published state of the Envelope. Corrections and updates may create a new envelope instance while preserving the immutable `cluster_event_id`. Implementations may use append-only logs, versioned documents, signed messages, or ordinary records systems.

### 5.3 Domain event identifiers

Domain systems may retain their own incident, case, mission, outbreak, facility, or disaster identifiers. They shall be linked as references rather than replacing the cluster event identifier. A domain identifier does not become authoritative outside its issuing system merely because it is linked.

## 6. Event topology

Events may have parent, child, merged, split, duplicate, related, or cascading relationships. Topology records relationships; it does not decide causation.

### 6.1 Parent and child events

A parent event may coordinate several operationally separable child events—for example, a regional disaster with distinct infrastructure, health, and hazardous-material incidents. Child events retain their own records, authorities, access controls, and closure states.

### 6.2 Merge

Two apparent events may later be treated as one administrative envelope. Merge shall:

- preserve every prior identifier and correction history;
- record the merge authority or administrative basis;
- preserve conflicting hypotheses and domain records;
- redirect future routing without deleting prior records; and
- avoid implying common causation or liability.

### 6.3 Split

One envelope may split when events require different territories, authorities, protection levels, operational rhythms, or closure criteria. Split shall preserve the source identifier, state which responsibilities and records moved, and state what remains with the source event.

### 6.4 Possible duplicates and related events

Possible duplicates shall be linked, not silently collapsed. Related events may share evidence, assets, populations, territories, or dependencies without being the same event.

## 7. Registrar and envelope steward

### 7.1 Registrar

The registrar is the function that creates the first cluster event identifier. Registration may be performed by an authorized record office, mutual-aid network, host authority, Indigenous authority, professional function, or other adopted mechanism. Registration does not confer substantive responsibility.

### 7.2 Envelope steward

The steward may:

- preserve identity and topology;
- route references and notices;
- track acknowledgement deadlines;
- maintain the current responsibility index without deciding the underlying authority;
- maintain review and closure calendars;
- publish a lawful public index; and
- transfer stewardship through a recorded process.

The steward may not:

- declare an emergency;
- choose the legally controlling hazard or origin hypothesis;
- assign an authority that has not accepted or been validly constituted;
- accept or reject a handoff for another function;
- direct operations;
- compel records or disclosure;
- adjudicate disputes;
- decide public truth;
- keep emergency measures active; or
- close another authority's record.

Stewardship shall have a stated basis, bounded scope, next review time, correction duties, and a transfer history. If stewardship becomes unavailable, participants may continue using the cluster event identifier while a replacement steward is lawfully selected. No participant inherits command from stewardship failure.

## 8. Core field groups

| Field group | Minimum content |
|---|---|
| Envelope identity and lifecycle | `envelope_id`; `envelope_schema_version`; `cluster_event_id`; `event_status`; `created_at`; `updated_at` |
| Registration and stewardship | `registrar`; `stewardship.current_steward`; `stewardship_basis`; `stewardship_scope`; `next_review_at`; `transfer_history` |
| Event topology | parent, child, merged-from, merged-into, split-from, and related event identifiers; relationship type and note |
| Observed context | observed and reported time; locations and affected territories; affected systems; hazard hypotheses; origin hypotheses; state-estimate and dissent references; unresolved questions; public summary |
| Domain engagement | framework and version; engagement status; engaged function; responsible actor; authority references; review time; retained duties |
| Responsibility assignments | function and scope; responsible actor; status; authority references; effective, review, and expiry times; concurrent group; retained duties; dependencies and conflicts |
| Handoff ledger | sender and receiver; named responsibility; offer, receipt, response, effective, and closure times; accepted scope; retained duties; conditions and deficiencies; custody changes |
| Custody map | object class; custodian; authority; access class; purpose and transfer limits; protected non-transfer; disposition trigger and status |
| Public-information coordination | owner or owners; public notices; correction owner; next update; language and accessibility requirements; unresolved public conflicts; limits statement |
| Review and closure | review references; power-expiry references; termination status; termination, restoration, and data-disposition references; closure criteria; unresolved register references; reopening reason |
| Access and integrity | access class; public index; protected field groups; correction history; integrity hash; validation status and errors |

The normative JSON Schema accompanies this document. Implementations may use another serialization only if every required semantic field, status, link, access rule, and prohibited inference remains representable.

## 9. Hazard and origin hypotheses

The Envelope must permit multiple hypotheses. Each hypothesis records:

- a stable hypothesis identifier;
- a concise statement;
- status;
- probability when responsibly quantifiable;
- a confidence label;
- supporting and contrary references;
- responsible estimator where disclosed;
- update time; and
- supersession relationship.

`Probability` and `confidence` are different. A high-consequence low-probability hypothesis may matter while confidence in the estimate remains low. `Not quantified` is valid. Absence of a numeric probability must not be converted to zero.

The steward shall not average incompatible estimates, select an official origin, or erase a disfavoured hypothesis. A legal causation finding, if any, remains in competent justice or regulatory processes and is linked rather than generated by the Envelope.

## 10. Domain engagement registry

Each domain engagement records the framework and exact version, engaged function, actor, authority references, status, engagement and review times, retained duties, and termination time.

| State family | Values |
|---|---|
| Event lifecycle | `alerted`, `assessing`, `coordinating`, `active_response`, `stabilizing`, `transitioning`, `closed`, `reopened`, `archived` |
| Domain engagement | `notified`, `invited`, `assessing`, `active`, `supporting`, `suspended`, `declined`, `terminated`, `not_applicable` |
| Responsibility | `proposed`, `accepted`, `active`, `concurrent`, `contested`, `suspended`, `transferred`, `terminated`, `unassigned` |
| Handoff | `draft`, `offered`, `received`, `deficiency`, `accepted`, `rejected`, `withdrawn`, `concurrent`, `superseded`, `closed` |
| Custody | `active`, `transfer_pending`, `transferred`, `return_pending`, `disposition_pending`, `closed`, `contested` |
| Public information | `unassigned`, `single_owner`, `multiple_owners`, `contested`, `terminated` |
| Termination | `not_started`, `partial`, `pending`, `completed`, `contested`, `reopened` |

`Not applicable` is not a default. It requires an event-specific reason and review condition. `Declined` records that a domain received an invitation or notice and declined the proposed role; it does not erase any duty imposed by valid law. `Supporting` distinguishes advisory, modelling, logistical, or informational support from operational responsibility.

PIS participation shall normally be recorded as observation, foresight support, dependency mapping, exercise support, or separately authorized coordination. The Envelope cannot convert PIS engagement into declaration or command.

## 11. Responsibility assignment table

The responsibility table answers one question: **who currently owns which function, within what scope, under what authority, until when, and with which retained duties?**

Every assignment shall include:

- a stable responsibility identifier;
- a function stated as an action or duty, not an institution name;
- bounded scope;
- status;
- responsible actor or explicit `unassigned` status;
- authority references;
- effective, review, and expiry times;
- concurrent-responsibility group where applicable;
- retained duties;
- dependencies; and
- conflict note.

An institution's presence in the Envelope does not imply responsibility. An `unassigned` entry is preferable to silently assigning a function to the most global, capable, or well-funded participant.

### 11.1 Concurrent responsibility

Several functions may be concurrent without being jointly commanded. A health authority may own clinical and population-health functions while a biosafety regulator owns facility containment and construct provenance. They may share a `concurrent_group_id`, exchange records, and coordinate review times while retaining distinct authorities and liabilities.

### 11.2 Contested responsibility

When authority or scope is contested, the Envelope records each claim, linked jurisdiction map, responsible dispute-resolution route, interim protective arrangements, and next review. Contested status does not authorize the steward to select a winner.

## 12. Handoff protocol

A handoff transfers or shares only a named responsibility. Its lifecycle is explicit:

1. `draft` — prepared but not transmitted;
2. `offered` — transmitted by the sender;
3. `received` — receipt acknowledged without acceptance;
4. `deficiency` — receiver identifies missing authority, evidence, capacity, scope, or safeguards;
5. `accepted` — named responsibility accepted within stated scope and conditions;
6. `rejected` — responsibility not accepted, with reasons;
7. `withdrawn` — sender withdraws before effective transfer;
8. `concurrent` — parties accept parallel responsibilities rather than transfer;
9. `superseded` — replaced by a later handoff; and
10. `closed` — effective responsibilities and custody changes have been completed or terminated.

Every offer states a response deadline. Silence is not acceptance. An emergency may justify a short deadline, but it does not permit fictitious acceptance.

A handoff record shall identify:

- sender and receiver;
- responsibility identifier;
- scope offered and accepted;
- timestamps;
- sender's retained duties;
- receiver conditions;
- deficiencies;
- linked records;
- custody changes; and
- reason.

A handoff cannot transfer an authority the sender does not possess. It cannot transfer liability for prior acts by declaration. It cannot silently transfer data, samples, protected knowledge, assets, credentials, or command; those require their own authority and custody records.

## 13. Custody map

Custody is tracked separately from substantive responsibility. The map may cover:

- evidence;
- personal or operational data;
- biological or environmental samples;
- models and logs;
- credentials and access keys;
- physical assets;
- protected knowledge;
- source identity;
- classified or security information; and
- other bounded objects.

Every custody entry identifies the custodian, authority, access class, purpose limits, transfer conditions, protected non-transfer status, disposition trigger, linked disposition record, and current state.

The Envelope does not make sensitive material more shareable. An `AC-4` protected-knowledge entry remains subject to originating authority, non-engagement, non-transfer, non-publication, non-training, return, deletion, destruction, or repatriation requirements. Evidence transfer uses `ECRC-24`; judicial or enforcement referral uses `ECRC-25`. They remain separate even if both are linked from the Envelope.

## 14. Public-information coordination

The Envelope may identify one or more public-information owners for operational coordination. Their function is to synchronize notices, timing, accessibility, known facts, uncertainty, corrections, and contact channels. It is not to establish an official narrative.

Multiple owners may remain necessary where authorities have different lawful duties. Conflicts shall be stated, not concealed. Public-information ownership does not control journalism, independent research, dissent, conscience, political interpretation, or lawful criticism.

Every public-information section shall identify:

- coordination status;
- owner or owners;
- notice references;
- correction owner;
- next update time;
- languages and accessibility requirements;
- unresolved public conflicts; and
- the limits of the coordination role.

Protected operational detail shall not be published merely to make the Envelope complete. A public index may expose only the cluster identifier, broad event status, public summary, participating functions, next review time, and public notices where lawful and safe.

## 15. Review, expiry, termination, and closure

The Envelope synchronizes review clocks but does not renew powers. It shall link to relevant provisional, 30-day, 90-day, judicial, professional, mission, finance, data, and host-authority reviews.

### 15.1 Event status is not power status

`active_response` means that one or more independently authorized functions are responding. It does not mean every linked power is active. `closed` means the Envelope's closure criteria are met; it does not extinguish unresolved claims or ordinary-law duties. `reopened` does not revive expired emergency powers.

### 15.2 Closure criteria

An Envelope may close only when:

- every responsibility is terminated, transferred, or moved to an ordinary process;
- every handoff is closed, rejected, withdrawn, or superseded with traceable state;
- active custody has a continuing lawful basis or disposition path;
- emergency access and command are revoked or placed in a documented restoration process;
- required termination, restoration, and emergency-data disposition records exist;
- unresolved issues have named custodians and are entered in `ECRC-33`; and
- closure authority and time are recorded where an authority is required.

An Envelope may close while some risks remain unresolved. Those risks do not keep emergency powers alive.

### 15.3 Reopening

Reopening requires a reason and new review. It does not undo prior closure, erase correction history, or automatically reactivate any declaration, mission, access, data basis, or restriction.

## 16. Corrections, supersession, merge, and split

Identifiers remain immutable. Corrections shall preserve:

- field path;
- prior-value hash;
- reason;
- correcting actor;
- time; and
- replacement reference.

A later envelope state may supersede an earlier serialization but shall not rewrite the historical record invisibly. Merge and split operations preserve source identifiers, topology, prior notices, handoffs, custody, and unresolved obligations.

## 17. Access, privacy, security, and integrity

The Envelope follows ECRC access classes:

- `AC-1` public;
- `AC-2` public summary with protected annex;
- `AC-3` restricted operational;
- `AC-4` protected sovereignty or source; and
- `AC-5` sealed adjudicative or security material.

The envelope access class is not automatically the lowest protection among linked records. Protected records may be referenced by opaque identifiers and access-controlled resolvers. Implementations shall prevent correlation attacks, unauthorized graph traversal, role creep, indefinite access, and inference of protected locations or identities.

Hashes, signatures, timestamps, distributed logs, and automated schema validation may support integrity. They do not prove truth, legal validity, authority, consent, accuracy, or proper custody. No mandatory blockchain or universal identity system is required.

## 18. Transport and interoperability

Implementations may transmit an Envelope as JSON, signed message, API object, document package, offline form, radio-derived record, or other accessible medium. The normative JSON Schema defines semantic conformance for machine-readable exchange.

A transport shall preserve:

- immutable identifiers;
- schema and framework versions;
- field-level access handling;
- references and integrity metadata;
- correction and topology history;
- status enums;
- timestamps with timezone;
- protected non-transfer flags;
- handoff acknowledgement; and
- closure state.

Offline systems may synchronize later. Synchronization conflicts shall be recorded; last-write-wins is not acceptable for authority, responsibility, custody, handoff, or closure fields.

## 19. Validation rules

An Envelope is structurally conformant only when:

1. `cluster_event_id` is present and immutable;
2. schema version is `CDEE/0.1`;
3. a registrar and bounded steward are identified;
4. event topology arrays exist, even when empty;
5. at least one hazard hypothesis exists;
6. every active domain engagement pins an exact framework version;
7. every active or concurrent responsibility has an actor, authority references or an explicitly recorded authority gap, and a review time;
8. every handoff has a response deadline and a terminal or pending state;
9. silence has not been encoded as acceptance;
10. custody entries have purpose limits and disposition triggers;
11. public-information coordination includes correction ownership and limits;
12. closure criteria and unresolved-register references are representable;
13. access and integrity fields are present; and
14. the non-authority statement is exact.

Semantic validators should also warn when:

- an active responsibility lacks `ECRC-05` or `ECRC-06` references;
- a handoff claims to transfer command, liability, sovereignty, or unrelated data;
- `closed` appears while active handoffs, responsibilities, or custody remain without an ordinary-law basis;
- a framework version is unpinned or incompatible;
- an event is merged without preserving source identifiers;
- one hypothesis is treated as official merely because it is first or numerically highest;
- the steward is listed as operational commander without a separately valid role; or
- `ECRC-24` and `ECRC-25` are collapsed.

## 20. Failure handling

### 20.1 No steward available

Participants continue using the existing cluster event identifier, preserve local records, and nominate a replacement through an adopted process. No participant gains substantive authority.

### 20.2 Conflicting cluster event identifiers

Systems link the identifiers as possible duplicates, compare topology and records, and either merge administratively or preserve both. No record is deleted.

### 20.3 Receiver does not respond

The handoff remains offered or received. The sender records the missed deadline, escalates through the relevant authority or mutual-aid instrument, and retains its duties. The Envelope does not auto-assign the receiver.

### 20.4 Jurisdiction unresolved

Responsibility remains contested or unassigned. Immediate rescue may proceed only under the narrow constitutional rules applicable to that act. The jurisdiction gap is linked to `ECRC-05`, review, and `ECRC-33`.

### 20.5 Data or evidence cannot transfer

The handoff may proceed without custody transfer when lawful and operationally possible. The Envelope records purpose-limited access, aggregate attestation, protected analysis, or non-transfer. It does not convert urgency into compulsory disclosure.

### 20.6 Event persists beyond emergency time

Emergency records expire according to their own authority. The Envelope remains a coordination and historical index while durable governance moves to ordinary law. It cannot normalize serial emergency renewal.

## 21. Prohibited uses

The Envelope shall not be used to:

- rank territories, communities, institutions, or persons by riskworthiness;
- create a universal risk or social-cohesion score;
- infer consent or Indigenous representation;
- assign blame from an origin hypothesis;
- trigger sanctions, shutdowns, quarantine, evacuation, surveillance, force, or compulsory finance;
- create a common operational command;
- compel participation or disclosure;
- establish a public watchlist;
- replace judicial or regulatory process;
- hide conflicts in a false consensus field;
- convert a public-information owner into a truth authority;
- keep data, samples, assets, credentials, or powers indefinitely;
- erase failed alerts or rejected handoffs;
- make PIS a residual authority; or
- infer compatibility with a later framework version without testing.

## 22. Minimum adoption clause

A participating framework, compact, authority, or operational manual may adopt this Specification using the following clause:

> **Cross-Domain Event Envelope adoption.** For any compound or cross-domain event, records governed by this instrument shall use the Emergency Cross-Domain Event Envelope v0.1 (`CDEE/0.1`) or a tested compatible successor. The Envelope supplies shared event identity, topology, domain engagement, responsibility acknowledgement, handoff state, custody indexing, public-information coordination, review, and closure. It does not create authority, merge jurisdiction, establish causation or liability, transfer command, activate power, compel disclosure, or renew emergency measures. Every consequential act remains governed by its own Emergency Authority Provenance Record and applicable ECRC records. Silence is not handoff acceptance. Shared identity is not shared command.

## 23. Conformance levels

| Level | Requirement |
|---|---|
| **CDEE-L0 — Identity** | Stable cluster event identifier, topology, schema version, and basic event status. Suitable only for non-consequential information correlation. |
| **CDEE-L1 — Coordination** | L0 plus domain engagements, responsibility assignments, handoff acknowledgement, custody index, public-information owner, and review calendar. |
| **CDEE-L2 — Consequential response** | L1 plus complete links to applicable ECRC authority, rights, command, work, finance, data, review, termination, restoration, disposition, and remedy records. |
| **CDEE-L3 — Closure verified** | L2 plus closed or transferred responsibilities, completed handoffs, custody disposition, authority and asset restoration, unresolved register, after-action links, and verified closure. |

No implementation may present L0 or L1 as sufficient authorization for consequential action.

## 24. Required implementation tests

A conforming implementation shall test at least:

1. two domains create different local identifiers for one event;
2. an unknown-origin outbreak retains competing natural and laboratory hypotheses;
3. a handoff is offered but never accepted;
4. a receiver accepts only part of the offered scope;
5. two domains retain concurrent responsibilities;
6. an Indigenous authority prohibits knowledge or sample transfer;
7. evidence transfers without adjudication referral;
8. adjudication referral occurs without changing evidence custody;
9. a converted asset is requested, accepted, bounded, and returned;
10. the event splits across territories;
11. two events merge without erasing history;
12. the event closes with an unresolved risk in `ECRC-33`;
13. an Envelope reopens without reactivating expired powers;
14. the steward disappears;
15. a public update conflicts across authorities;
16. a protected location is not exposed through the public index;
17. a later framework version is rejected pending compatibility review;
18. a false alarm closes with compensation and no reduction in future support;
19. emergency-purpose data reaches disposition; and
20. PIS participates as observer without acquiring command.

## 25. Amendment and compatibility

A successor may change fields or states only through published compatibility analysis. Breaking changes include:

- changing the meaning of `cluster_event_id`;
- allowing shared identity to imply authority;
- removing acknowledgement states;
- treating silence as acceptance;
- collapsing responsibility and custody;
- collapsing `ECRC-24` and `ECRC-25`;
- weakening protected non-transfer;
- allowing open event status to renew powers;
- removing correction or topology history; or
- changing the non-authority statement.

Implementations shall fail closed when a later version is not tested. They may continue using the last compatible version while recording the unresolved compatibility issue in `ECRC-33`.

---

# Appendix A — Machine-readable files

- `emergency-cross-domain-event-envelope-v0.1.schema.json` — normative JSON Schema, Draft 2020-12.
- `emergency-cross-domain-event-envelope-v0.1-example.json` — illustrative, redacted compound biological-incident envelope.

The example demonstrates concurrent Global Health and Aethelred responsibilities. It is not an operational record and intentionally lacks real legal authority references.

# Appendix B — Source manifest

| Source | SHA-256 | Bytes | Lines |
|---|---|---:|---:|
| `emergency-catastrophic-risk-continuity-interface-specification-v0.1.md` | `c673742b1317c7169d4b8226118478c990e9a3d05084b2dc5ac9ad2f1971163c` | 81,100 | 2,136 |
| `emergency-cluster-harmonization-interface-test-v0.1.md` | `479c62643555da11f6235ea6626836b1f7d295a0b6a7ee08a75a9a77200bda65` | 46,970 | 664 |
| `emergency-cluster-record-profile-v0.1.md` | `19f35a53c151182ff6bf2760f7da67b9696fbf0048dfef27af9748de36b94dc9` | 82,601 | 1,334 |
| `emergency-record-inheritance-clause-v0.1.md` | `1e7ecacdcf8afb946c7bb5733b6e95f1d6c435851b529e2482840a0ae9640e39` | 8,889 | 93 |
| `emergency-cluster-ecrc-conformance-patch-v0.1.md` | `fcc6316b8e9c6aeab2841923afaa84aec60a2a9916f0e0127cc116403ecea0ed` | 2,362 | 34 |
| `planetary-immune-system-v2.2.1.md` | `951e84bee7fab14bd0b5bb228a09d3b40dc6b04101a02b3ad3307a421fe9bf3a` | 88,815 | 1,643 |
| `global-health-preparedness-outbreak-response-biosecurity-v2.2.1.md` | `429b08f3cdf5b1d5a2384986c6dde578f4e6146b92a9b5ea2470fc722a5ae7bd` | 83,770 | 1,735 |
| `aethelred-accord-v1.2.1.md` | `d470a9670123f83ae176e4e087de2b346713d413e079feca56e801c81a326959` | 92,564 | 1,503 |
| `living-shield-v4.4.1.md` | `0502c2f2ec557811dfb2000b41b121311aaf19697325d196aa847ff3ccf82bf4` | 92,567 | 1,645 |
| `aegis-protocol-v1.3.1.md` | `17cd550c892d1ca542938d0e1f332ddfc158f60002493339752a06e24fe81c24` | 96,527 | 1,618 |

# Appendix C — Compact field checklist

- [ ] immutable cluster event ID;
- [ ] registrar and bounded steward;
- [ ] parent, child, merge, split, and relation arrays;
- [ ] observed context;
- [ ] plural hazard and origin hypotheses;
- [ ] state estimates and dissent;
- [ ] exact framework versions;
- [ ] domain engagement states;
- [ ] function-level responsibility table;
- [ ] handoff acknowledgement and retained duties;
- [ ] evidence, data, sample, asset, knowledge, and credential custody;
- [ ] public-information owner and correction owner;
- [ ] review and power-expiry links;
- [ ] termination, restoration, and data-disposition links;
- [ ] unresolved register links;
- [ ] access class and protected fields;
- [ ] correction history and integrity metadata;
- [ ] exact non-authority statement.

# Appendix D — Interface sequence

```text
local or protected alert
        │
        ▼
register cluster_event_id ─────► preserve local domain IDs
        │
        ▼
link plural state estimates and dissent
        │
        ▼
record domain engagements and exact versions
        │
        ▼
assign functions through valid authority records
        │
        ├────► concurrent responsibilities
        │
        └────► explicit handoff offer / accept / reject / deficiency
        │
        ▼
track custody, public information, reviews, and expiries
        │
        ▼
terminate powers independently
        │
        ▼
restore authority and assets; dispose emergency data
        │
        ▼
close envelope or carry unresolved issues into ECRC-33
```

---

> **One event identity; many authorities; no residual command.**
