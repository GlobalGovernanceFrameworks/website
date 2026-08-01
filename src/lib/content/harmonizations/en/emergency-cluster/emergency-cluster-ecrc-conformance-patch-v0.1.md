# Emergency Cluster ECRC Conformance Patch v0.1

**Patch ID:** `ECRC-CONFORMANCE/0.1`  
**Date:** August 1, 2026  
**Controls:** `ECRC/0.1` and `ECRC-RIC/0.1`

This controlled patch adopts the common record inheritance clause and complete ECRC-01–ECRC-33 conformance appendix in all five emergency-cluster successors. It does not add substantive emergency powers.

## Patched successors

- `planetary-immune-system-v2.2.1.md` — SHA-256 `951e84bee7fab14bd0b5bb228a09d3b40dc6b04101a02b3ad3307a421fe9bf3a`
- `global-health-preparedness-outbreak-response-biosecurity-v2.2.1.md` — SHA-256 `429b08f3cdf5b1d5a2384986c6dde578f4e6146b92a9b5ea2470fc722a5ae7bd`
- `aethelred-accord-v1.2.1.md` — SHA-256 `d470a9670123f83ae176e4e087de2b346713d413e079feca56e801c81a326959`
- `living-shield-v4.4.1.md` — SHA-256 `0502c2f2ec557811dfb2000b41b121311aaf19697325d196aa847ff3ccf82bf4`
- `aegis-protocol-v1.3.1.md` — SHA-256 `17cd550c892d1ca542938d0e1f332ddfc158f60002493339752a06e24fe81c24`

## Interface corrections included

- evidence handoff (`ECRC-24`) is separated from adjudication and enforcement handoff (`ECRC-25`);
- renewal state estimates (`ECRC-26`) are explicit where previously only imported in prose;
- emergency-data disposition (`ECRC-29`) is explicit in all action-capable domain record sets;
- unresolved-risk and dissent custody (`ECRC-33`) is explicit where previously absent;
- Aegis emergency re-tasking now explicitly imports state estimate, authority provenance, declaration, renewal, and data-disposition records;
- PIS references are pinned to Global Health v2.2.1, Aethelred v1.2.1, Living Shield v4.4.1, and Aegis v1.3.1;
- every framework pins Interface v0.1, Profile v0.1, and Clause v0.1 and fails closed on incompatible substitutions.

## Profile-crosswalk status

The diagnostic crosswalk embedded in `ECRC/0.1` remains a record of the pre-patch source versions. For the five patch versions, the normative crosswalk is the appendix inside each patched framework together with this compatibility manifest. A future profile revision may consolidate those local mappings after another cluster test.

## Non-effect

This patch standardizes records, handoffs, lifecycle closure, and version compatibility. It does not validate a particular authority, declare an emergency, activate a power, create a command, or cure a missing legal basis.
