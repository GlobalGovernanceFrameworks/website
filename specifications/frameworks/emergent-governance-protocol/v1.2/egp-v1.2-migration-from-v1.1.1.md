# EGP/1.2 migration from EGP/1.1.1

## Status

This is a substantive compatibility release. It preserves the public operations `sense`, `propose`, and `adopt`, and the established adoption effect labels. It changes the controlling interface from `GMEAIA/0.1` to `GMEAIA/0.2.1`.

## Required changes

1. Replace all active `GMEAIA/0.1` pins with `GMEAIA/0.2.1`.
2. Add `consequence_profile_claim` to the event envelope.
3. Add `consequence_profile` to adoption payloads.
4. Replace local or legacy referral states with the exact `GMEAIA/0.2.1` handoff vocabulary.
5. Distinguish `capacity_limited` from `constitutional_gap`.
6. Reference `GMEAIA-20` for authority and causal responsibility.
7. Reference `GMEAIA-07`, `GMEAIA-08`, or `GMEAIA-59` for consequential clocks and handoffs.
8. Use `GMEAIA-56` or `GMEAIA-57` and the controlling specialized interface for `CP3` actions.
9. Add minimum causal adequacy to consequential proposals.
10. Preserve response omission and post-acceptance performance omission as distinct conditions.
11. Do not represent structural schema validation as substantive authority or success.

## Compatibility

- EGP/1.1.1 events can be ingested as historical records.
- They are not consequentially compatible with `GMEAIA/0.2.1` until their authority envelope and controlled states are migrated.
- Existing effect labels remain valid.
- Existing event identifiers and relationship references may be preserved.
- Unknown legacy referral states must fail closed or be explicitly mapped through a reviewed migration record.

## Frozen source lineage

- `EGP/1.1.1` manifest SHA-256: `62765533ae6e78d1447768e5a720f0be04a108d73e05f2e5827065415e3512cb`.
- `GMEAIA/0.2.1` normative Markdown SHA-256: `8cdaf8c316b50b251721a824124e47b1ad30787e9f5281d7fade0f4360bfe5d1`.
- `GMEAIA/0.2.1` machine catalogue SHA-256: `0e9bc3c18e725e21a2464bb8b9fe3cd4f88ce1a0e9b47a48963bb849bba972d3`.
- `CIS/0.2.1` normative Markdown SHA-256: `2ab06be70d568be82efde2ccbcc3f8df48f37308fab3ccf116ac3efe4c167bfc`.
