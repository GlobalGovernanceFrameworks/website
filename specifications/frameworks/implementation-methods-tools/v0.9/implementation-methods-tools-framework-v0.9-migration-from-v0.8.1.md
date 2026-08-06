# IMT v0.9 migration from v0.8.1

`IMT/0.9` preserves all forty-eight canonical record IDs and sixteen IMT action classes. It changes the controlling stack from `GMEAIA/0.1`, `IAF/1.1.1`, and `EGP/1.1.1` to `CIS/0.2.1`, `GMEAIA/0.2.1`, `IAF/1.2`, and `EGP/1.2`.

## Required migration

- replace old GMEAIA record titles with v0.2.1 titles;
- add `CP0`–`CP3` consequence profiles;
- use the thirteen exact GMEAIA handoff states;
- distinguish `capacity_limited` from `constitutional_gap`;
- add authority formation, response-duty sources, clocks, causal responsibility, and omission semantics where triggered;
- update pilot records for pilot type and minimum causal adequacy;
- update tool-core and fork records for compatibility power, portability, and material exit;
- add ordinary-ownership and support-withdrawal fields;
- remove claims of conformance with the frozen `IAEG-CLUSTER/0.1` set.

Existing v0.8.1 records remain historical. They do not become v0.9-conforming merely by changing the version string.
