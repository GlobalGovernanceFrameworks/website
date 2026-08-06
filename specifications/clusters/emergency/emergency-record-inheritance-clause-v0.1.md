# Emergency Record Inheritance Clause v0.1

## Insertion-ready normative clause for emergency-capable domain frameworks

**Clause ID:** `ECRC-RIC/0.1`  
**Depends on:** Emergency and Catastrophic-Risk Cluster Record Profile v0.1 (`ECRC/0.1`)  
**Status:** Draft for common adoption  
**Date:** August 1, 2026

> This clause is intended to be inserted substantially unchanged into every framework that imports the Emergency, Catastrophic-Risk, and Continuity Interface Specification.

---

## Record inheritance and conformance

1. **Specialization does not replace the canonical set.**  
   This framework's domain record list specializes but does not replace the records defined by the Emergency, Catastrophic-Risk, and Continuity Interface Specification and the Emergency and Catastrophic-Risk Cluster Record Profile. Every canonical record remains required whenever its applicability trigger occurs.

2. **Canonical identity.**  
   Every domain record shall identify the canonical `ECRC-##` record or records it `implements`, `extends`, `splits`, `contains`, or `imports`. A domain label may differ from the canonical title, but the canonical identifier, schema version, minimum common header, legal effect, access protections, and lifecycle obligations remain traceable.

3. **Direct import.**  
   A canonical record not mapped to a domain specialization is imported directly when triggered. Absence from a domain appendix, implementation guide, software form, dashboard, or local registry does not make the canonical record optional.

4. **Non-applicability.**  
   A record may be marked `not_applicable` only through a reasoned, event- or action-specific determination identifying: the trigger tested; the deciding function; the evidence and legal basis; the reason the trigger cannot arise or has not arisen; the records that would become required if conditions change; and the review or expiry condition. `Not applicable` does not mean unknown, inconvenient, deferred, or unavailable.

5. **Split records.**  
   Where several domain records jointly implement one canonical record, the framework shall declare a `splits` relationship, identify every component, allocate each required canonical field, designate the function that verifies completeness, and preserve one traceable lifecycle. No component inherits the authority or legal effect of another by implication.

6. **Containing packages.**  
   A domain package may contain several canonical records only when each canonical subrecord remains separately identifiable, reviewable, correctable, exportable, and closable, with its own responsible authority, legal effect, timestamp, expiry, and access class. The Investigation and Evidence Handoff Record (`ECRC-24`) and the Adjudication and Enforcement Handoff Record (`ECRC-25`) shall remain distinct even when displayed in one user interface or transmitted in one package.

7. **No record-to-power conversion.**  
   A record name, canonical identifier, completed form, model output, dashboard state, validation result, digital signature, institutional endorsement, or reference to another framework does not create authority. Consequential action requires a valid Emergency Authority Provenance Record (`ECRC-06`) and every other record required by the applicable activation package.

8. **Shared event identity without shared command.**  
   Records participating in a compound or cross-domain event shall carry the same `cluster_event_id` and identify their responsible function, authority, handoff state, evidence or data custodian, review time, and closure state. Shared identity coordinates information; it does not merge jurisdictions, transfer command, or establish a common legal classification.

9. **Handoff acceptance and retained duties.**  
   A handoff is effective only when the receiving function records acceptance, rejection, deficiency, or concurrent responsibility. A handoff transfers only the responsibility expressly named. It does not erase the sender's retained duties, source obligations, correction duties, evidence-preservation duties, or responsibility for prior acts.

10. **Lifecycle completeness.**  
    Any activation package that can restrict rights, deploy personnel or assets, process emergency data, spend extraordinary funds, or continue beyond a provisional period shall also represent renewal, termination, authority and asset restoration, emergency-data disposition, wrongful-action remedy, after-action review, institutional sunset or continuation, and unresolved risk or dissent. A package is not closed merely because a declaration or mission has ended.

11. **Access and protected material.**  
    Canonical identity does not require universal publication. Public summaries, protected annexes, restricted operational records, protected sovereignty or source records, and sealed adjudicative or security material shall follow the access classes in `ECRC/0.1`. Indigenous authority, non-engagement, protected knowledge, source protection, privacy, security, correction, retention, deletion, return, repatriation, and non-transfer obligations survive transport between frameworks.

12. **Correction, supersession, and integrity.**  
    Record identifiers remain immutable. Corrections, withdrawals, supersession, invalidation, and disputes shall preserve the prior state, reason, responsible actor, time, and linked replacement. Hashes and automated validation may support integrity but do not prove authenticity, accuracy, legal validity, or authority.

13. **Precedence and conflict.**  
    Where a domain record conflicts with the canonical profile, the rule that better preserves valid authority provenance, functional separation, rights, protected knowledge, temporal limits, restoration, and review controls for cluster interoperability controls. A domain framework may impose stronger safeguards. It may not weaken the canonical safeguards through renaming, omission, aggregation, software implementation, or local practice.

14. **Version pinning.**  
    This framework conforms only to the exact profile and interface versions identified in its compatibility manifest. A later framework, profile, schema, or interface version is not substituted automatically. Material changes fail closed until a successful compatibility and scenario test is recorded.

15. **Conformance appendix.**  
    This framework shall publish a complete crosswalk for `ECRC-01` through `ECRC-33`, showing for each canonical record: domain record name; inheritance relationship; applicability rule; responsible function; default access class; required linked records; lifecycle closure; and any current gap. Conformance is not established by a general statement that another framework controls.

16. **Automated systems.**  
    Automated systems may check schema, completeness, links, expiry, consistency, signatures, and access rules. They may not determine whether an authority is legally valid, whether evidence is credible, whether a person is liable or guilty, whether an Indigenous authority has consented, or whether an emergency power should be exercised or renewed.

17. **Failure rule.**  
    Missing, invalid, expired, incompatible, or unresolved authority and lifecycle records block the affected consequential action. They do not transfer authority to a coordinating body, observatory, emergency council, court, fund, platform, model, or residual command.

---

## Required conformance statement

A framework adopting this clause should publish the following statement with its record appendix:

> **[Framework name and version] adopts Emergency Record Inheritance Clause v0.1 and conforms to Emergency and Catastrophic-Risk Cluster Record Profile v0.1 only to the extent shown in its complete ECRC-01–ECRC-33 crosswalk. Unmapped records are imported directly when triggered. Recorded gaps block the affected consequential action until resolved.**

## Minimal mapping row

| Field | Required entry |
|---|---|
| Canonical ID | `ECRC-##` |
| Canonical title | Exact profile title |
| Domain record | Domain title or `direct import` |
| Relationship | `implements`, `extends`, `splits`, `contains`, `imports`, or `not_applicable` |
| Applicability trigger | Event or action condition |
| Responsible function | Function, not merely institution |
| Access class | `AC-1` through `AC-5` |
| Required links | Canonical and domain record references |
| Closure condition | Verifiable lifecycle endpoint |
| Current gap | `none` or explicit blocking gap |

## Non-substitution note

This clause does not itself patch the five emergency-cluster frameworks. Each framework must adopt it and publish its crosswalk through a controlled amendment or successor version. Until then, the mappings in `ECRC/0.1` are diagnostic and the canonical records remain directly applicable under the Emergency Interface when their triggers arise.
