# WDIP v1.7 migration from v1.6.1

`WDIP/1.7` preserves all sixty canonical WDIP record identifiers, sixteen action classes, six phases, forty readiness gates, and the advisory-output doctrine.

It changes the controlling stack from `GMEAIA/0.1`, `EGP/1.1.1`, `IAF/1.1.1`, `IMT/0.8.1`, and `IRF/0.9.1` to `CIS/0.2.1`, `GMEAIA/0.2.1`, `EGP/1.2`, `IAF/1.2`, `IMT/0.9`, `IRF/1.0`, and `META-GOVERNANCE/1.6`.

## Required semantic migration

- assign `CP0`–`CP3` consequence profiles where relevant;
- use the thirteen exact GMEAIA handoff states;
- distinguish `capacity_limited` from `constitutional_gap`;
- record authority formation, causal responsibility, response-duty source and effect, clocks, custody, and omission semantics when triggered;
- add common-mode and objective-reproduction review;
- separate affected standing from causal responsibility;
- treat implementation as a new GMEAIA/IAF proposal requiring minimum causal adequacy;
- distinguish conformance, consensus, recommendation acceptance, and process throughput from success or legitimacy;
- add framework-level disconfirming evidence and narrowing, replacement, and non-scaling conditions;
- remove active conformance claims to the frozen `IAEG-CLUSTER/0.1` set.

Existing v1.6.1 records remain historical and valid under their original release context. They do not become v1.7-conforming merely by changing a version string.
