# ECRC/0.1 — canonical record class registry

Extracted from the conformance crosswalks published in the framework outlines. A specification artifact for this interface exists outside this corpus and is pinned by SHA-256 below; this registry records what the outlines currently assert, so it can be reconciled against that artifact rather than replacing it.

- **Pin disagreement: 2 different digests are pinned under the same version number.** The specification was revised without a version bump, or an outline pins the wrong file.
  - `c673742b1317c7169d4b8226118478c990e9a3d05084b2dc5ac9ad2f1971163c` — emergency-catastrophic-risk-continuity-interface-specification-v0.1.md — biodiversity-governance-v1_1_1.md, hearthstone-protocol-v2_0_1.md, oceans-and-marine-governance-v2_3_1.md, soil-health-and-land-use-governance-v3_2_2.md, water-and-sanitation-governance-v5_2_2.md
  - `19f35a53c151182ff6bf2760f7da67b9696fbf0048dfef27af9748de36b94dc9` — filename not stated — implementation-and-adaptation-v1_1_1.md
- Classes observed: **33** (1–33)
- Frameworks publishing a crosswalk: **5**
- Frameworks naming `ECRC/0.1` as controlling interface: **11**
- Naming it but publishing no crosswalk: biodiversity-governance-v1_1_1.md, hearthstone-protocol-v2_0_1.md, implementation-and-adaptation-v1_1_1.md, oceans-and-marine-governance-v2_3_1.md, soil-health-and-land-use-governance-v3_2_2.md, water-and-sanitation-governance-v5_2_2.md

## Classes

| Class | Canonical name | Asserted by | Status |
|---|---|---|---|
| `ECRC-01` | Hazard Alert Record | 5 | agreed |
| `ECRC-02` | Observation Contract | 5 | agreed |
| `ECRC-03` | Catastrophic-Risk State Estimate | 5 | agreed |
| `ECRC-04` | Observation Independence Map | 5 | agreed |
| `ECRC-05` | Standing and Jurisdiction Map | 5 | agreed |
| `ECRC-06` | Emergency Authority Provenance Record | 5 | agreed |
| `ECRC-07` | Emergency Declaration Record | 5 | agreed |
| `ECRC-08` | Power Activation and Prohibition Schedule | 5 | agreed |
| `ECRC-09` | Operational Command and Deployment Record | 5 | agreed |
| `ECRC-10` | Host and Territorial Authorization Record | 5 | agreed |
| `ECRC-11` | Indigenous Emergency Interface Record | 5 | agreed |
| `ECRC-12` | Affected-Community Liaison Record | 5 | agreed |
| `ECRC-13` | Rights and Non-Derogation Record | 5 | agreed |
| `ECRC-14` | Health Measure and Bodily Integrity Record | 5 | agreed |
| `ECRC-15` | Isolation, Evacuation, and Shelter Record | 5 | agreed |
| `ECRC-16` | Emergency Work Mobilisation Record | 5 | agreed |
| `ECRC-17` | Essential Services and AUBI Continuity Record | 5 | agreed |
| `ECRC-18` | Emergency Finance and Compensation Record | 5 | agreed |
| `ECRC-19` | Data, Privacy, Security, and Secrecy Record | 5 | agreed |
| `ECRC-20` | Protected Knowledge and Non-Transfer Record | 5 | agreed |
| `ECRC-21` | Public Information and Correction Record | 5 | agreed |
| `ECRC-22` | Interim Measure Review Record | 5 | agreed |
| `ECRC-23` | Cross-Border Assistance Record | 5 | agreed |
| `ECRC-24` | Investigation and Evidence Handoff Record | 5 | agreed |
| `ECRC-25` | Adjudication and Enforcement Handoff Record | 5 | agreed |
| `ECRC-26` | Renewal State Estimate | 5 | agreed |
| `ECRC-27` | Emergency Termination Certificate | 5 | agreed |
| `ECRC-28` | Authority Restoration and Asset Return Record | 5 | agreed |
| `ECRC-29` | Emergency Data Disposition Record | 5 | agreed |
| `ECRC-30` | Wrongful Action and Compensation Record | 5 | agreed |
| `ECRC-31` | After-Action and Ordinary-Capacity Review | 5 | agreed |
| `ECRC-32` | Institutional Sunset or Continuation Record | 5 | agreed |
| `ECRC-33` | Unresolved Risk and Dissent Register | 5 | agreed |

## Framework crosswalk

| Class | Framework | Domain record | Conformance note |
|---|---|---|---|
| `ECRC-01` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-01` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-01` | disaster-risk-reduction-v4_4_2.md | Hazard Alert Record | none |
| `ECRC-01` | global-health-and-pandemic-security-v2_2_2.md | Health Threat Signal Record | none |
| `ECRC-01` | planetary-immune-system-v2_2_2.md | Hazard Alert Record | none |
| `ECRC-02` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-02` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-02` | disaster-risk-reduction-v4_4_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-02` | global-health-and-pandemic-security-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-02` | planetary-immune-system-v2_2_2.md | Observation Contract | none |
| `ECRC-03` | aegis-protocol-v1_3_4.md | Emergency State Estimate | none |
| `ECRC-03` | aethelred-accord-v1_2_2.md | Biological Incident State Estimate | none |
| `ECRC-03` | disaster-risk-reduction-v4_4_2.md | Multi-Hazard State Estimate and Dissent Record | none |
| `ECRC-03` | global-health-and-pandemic-security-v2_2_2.md | Health State Estimate and Dissent Record | none |
| `ECRC-03` | planetary-immune-system-v2_2_2.md | Catastrophic-Risk State Estimate | none |
| `ECRC-04` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-04` | aethelred-accord-v1_2_2.md | Observation Independence Map | none |
| `ECRC-04` | disaster-risk-reduction-v4_4_2.md | Observation Independence Map | none |
| `ECRC-04` | global-health-and-pandemic-security-v2_2_2.md | Observation Independence Map | none |
| `ECRC-04` | planetary-immune-system-v2_2_2.md | Observation Independence Map | none |
| `ECRC-05` | aegis-protocol-v1_3_4.md | Participation/Host/Territorial authority records (partial) | none |
| `ECRC-05` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-05` | disaster-risk-reduction-v4_4_2.md | Standing and Jurisdiction Map | none |
| `ECRC-05` | global-health-and-pandemic-security-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-05` | planetary-immune-system-v2_2_2.md | Standing and Jurisdiction Map | none |
| `ECRC-06` | aegis-protocol-v1_3_4.md | Emergency Authority Provenance Record | none |
| `ECRC-06` | aethelred-accord-v1_2_2.md | Authority Provenance Record | none |
| `ECRC-06` | disaster-risk-reduction-v4_4_2.md | Disaster Authority Provenance Record | none |
| `ECRC-06` | global-health-and-pandemic-security-v2_2_2.md | Emergency Authority Provenance Record | none |
| `ECRC-06` | planetary-immune-system-v2_2_2.md | Emergency Authority Provenance Record | none |
| `ECRC-07` | aegis-protocol-v1_3_4.md | Emergency Declaration Record | none |
| `ECRC-07` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-07` | disaster-risk-reduction-v4_4_2.md | Emergency Declaration Record | none |
| `ECRC-07` | global-health-and-pandemic-security-v2_2_2.md | Emergency Declaration Record | none |
| `ECRC-07` | planetary-immune-system-v2_2_2.md | Emergency Declaration Record | none |
| `ECRC-08` | aegis-protocol-v1_3_4.md | Power Activation and Prohibition Schedule | none |
| `ECRC-08` | aethelred-accord-v1_2_2.md | Emergency Power Activation Schedule | none |
| `ECRC-08` | disaster-risk-reduction-v4_4_2.md | Power Activation and Prohibition Schedule | none |
| `ECRC-08` | global-health-and-pandemic-security-v2_2_2.md | Power Activation Schedule | none |
| `ECRC-08` | planetary-immune-system-v2_2_2.md | Power Activation and Prohibition Schedule | none |
| `ECRC-09` | aegis-protocol-v1_3_4.md | Emergency Asset Re-tasking Record / Civilian Mission Charter | none |
| `ECRC-09` | aethelred-accord-v1_2_2.md | Facility Stand-Down or Shutdown Record (partial) | none |
| `ECRC-09` | disaster-risk-reduction-v4_4_2.md | Operational Command and Deployment Record | none |
| `ECRC-09` | global-health-and-pandemic-security-v2_2_2.md | Mission Scope and Command Record / Health Emergency Assistance Corps Deployment Record | none |
| `ECRC-09` | planetary-immune-system-v2_2_2.md | Operational Command and Deployment Record | none |
| `ECRC-10` | aegis-protocol-v1_3_4.md | Host and Territorial Authority Record | none |
| `ECRC-10` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-10` | disaster-risk-reduction-v4_4_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-10` | global-health-and-pandemic-security-v2_2_2.md | Host Request and Assistance Acceptance Record | none |
| `ECRC-10` | planetary-immune-system-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-11` | aegis-protocol-v1_3_4.md | Indigenous Capability Transition Interface | none |
| `ECRC-11` | aethelred-accord-v1_2_2.md | Indigenous Nation Biotechnology Interface | none |
| `ECRC-11` | disaster-risk-reduction-v4_4_2.md | Indigenous Disaster and Knowledge Interface Record | none |
| `ECRC-11` | global-health-and-pandemic-security-v2_2_2.md | Indigenous Health and Protected-Knowledge Interface Record | none |
| `ECRC-11` | planetary-immune-system-v2_2_2.md | Indigenous Emergency Interface Record | none |
| `ECRC-12` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-12` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-12` | disaster-risk-reduction-v4_4_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-12` | global-health-and-pandemic-security-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-12` | planetary-immune-system-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-13` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-13` | aethelred-accord-v1_2_2.md | Disability and Reproductive Justice Review / activity-specific rights fields | none |
| `ECRC-13` | disaster-risk-reduction-v4_4_2.md | Accessibility and protected-minima fields across records | none |
| `ECRC-13` | global-health-and-pandemic-security-v2_2_2.md | Rights and Less-Restrictive-Means Record | none |
| `ECRC-13` | planetary-immune-system-v2_2_2.md | Rights and Non-Derogation Record | none |
| `ECRC-14` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-14` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-14` | disaster-risk-reduction-v4_4_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-14` | global-health-and-pandemic-security-v2_2_2.md | Vaccination or Prophylaxis Requirement + Countermeasure Evidence and Authorization | none |
| `ECRC-14` | planetary-immune-system-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-15` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-15` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-15` | disaster-risk-reduction-v4_4_2.md | Isolation, Evacuation, and Shelter Record | none |
| `ECRC-15` | global-health-and-pandemic-security-v2_2_2.md | Isolation or Quarantine Review Record | none |
| `ECRC-15` | planetary-immune-system-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-16` | aegis-protocol-v1_3_4.md | Worker Safety, Refusal, and Whistleblowing Record | none |
| `ECRC-16` | aethelred-accord-v1_2_2.md | Worker Safety, Exposure, and Refusal Record | none |
| `ECRC-16` | disaster-risk-reduction-v4_4_2.md | Emergency Work Mobilisation Record | none |
| `ECRC-16` | global-health-and-pandemic-security-v2_2_2.md | Health Worker and Responder Safety Record | none |
| `ECRC-16` | planetary-immune-system-v2_2_2.md | Emergency Work Mobilisation Record | none |
| `ECRC-17` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-17` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-17` | disaster-risk-reduction-v4_4_2.md | Critical-Service Continuity Profile + AUBI/Social-Protection Surge | none |
| `ECRC-17` | global-health-and-pandemic-security-v2_2_2.md | Essential Care Continuity Record | none |
| `ECRC-17` | planetary-immune-system-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-18` | aegis-protocol-v1_3_4.md | Project Finance and Public-Value Record (partial) | none |
| `ECRC-18` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-18` | disaster-risk-reduction-v4_4_2.md | Emergency Finance and Compensation Record | none |
| `ECRC-18` | global-health-and-pandemic-security-v2_2_2.md | Finance, Procurement, and Stockpile Record | none |
| `ECRC-18` | planetary-immune-system-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-19` | aegis-protocol-v1_3_4.md | Data, Cyber, and Intelligence Boundary Record | none |
| `ECRC-19` | aethelred-accord-v1_2_2.md | Biological Data and Sample Lifecycle Record | none |
| `ECRC-19` | disaster-risk-reduction-v4_4_2.md | Disaster Data, Privacy, and Secrecy Record | none |
| `ECRC-19` | global-health-and-pandemic-security-v2_2_2.md | Health-Data Authority and Access Record | none |
| `ECRC-19` | planetary-immune-system-v2_2_2.md | Emergency Data, Model, Security, and Secrecy Record | none |
| `ECRC-20` | aegis-protocol-v1_3_4.md | Classified Information and protected interests (partial) | none |
| `ECRC-20` | aethelred-accord-v1_2_2.md | Protected Non-Transfer Record | none |
| `ECRC-20` | disaster-risk-reduction-v4_4_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-20` | global-health-and-pandemic-security-v2_2_2.md | Indigenous Health and Protected-Knowledge Interface Record | none |
| `ECRC-20` | planetary-immune-system-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-21` | aegis-protocol-v1_3_4.md | Public Communication and Non-Manipulation Record | none |
| `ECRC-21` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-21` | disaster-risk-reduction-v4_4_2.md | Public Information and Correction Record | none |
| `ECRC-21` | global-health-and-pandemic-security-v2_2_2.md | Public Information and Correction Record | none |
| `ECRC-21` | planetary-immune-system-v2_2_2.md | Public Information and Correction Record | none |
| `ECRC-22` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-22` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-22` | disaster-risk-reduction-v4_4_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-22` | global-health-and-pandemic-security-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-22` | planetary-immune-system-v2_2_2.md | Interim Measure and Urgent Review Record | none |
| `ECRC-23` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-23` | aethelred-accord-v1_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-23` | disaster-risk-reduction-v4_4_2.md | Mutual-Aid Capability and Request Record | none |
| `ECRC-23` | global-health-and-pandemic-security-v2_2_2.md | Host Request and Assistance Acceptance Record | none |
| `ECRC-23` | planetary-immune-system-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-24` | aegis-protocol-v1_3_4.md | Investigation and Evidence Handoff Record | none |
| `ECRC-24` | aethelred-accord-v1_2_2.md | Evidence and Chain-of-Custody Record | none |
| `ECRC-24` | disaster-risk-reduction-v4_4_2.md | Investigation and Evidence Handoff Record | none |
| `ECRC-24` | global-health-and-pandemic-security-v2_2_2.md | Investigation and Evidence Handoff Record | none |
| `ECRC-24` | planetary-immune-system-v2_2_2.md | Investigation and Evidence Handoff Record | none |
| `ECRC-25` | aegis-protocol-v1_3_4.md | Adjudication and Enforcement Handoff Record | none |
| `ECRC-25` | aethelred-accord-v1_2_2.md | Adjudication and Enforcement Handoff Record | none |
| `ECRC-25` | disaster-risk-reduction-v4_4_2.md | Adjudication and Enforcement Handoff Record | none |
| `ECRC-25` | global-health-and-pandemic-security-v2_2_2.md | Adjudication and Enforcement Handoff Record | none |
| `ECRC-25` | planetary-immune-system-v2_2_2.md | Adjudication and Enforcement Handoff Record | none |
| `ECRC-26` | aegis-protocol-v1_3_4.md | Renewal State Estimate | none |
| `ECRC-26` | aethelred-accord-v1_2_2.md | Renewal State Estimate | none |
| `ECRC-26` | disaster-risk-reduction-v4_4_2.md | Renewal State Estimate | none |
| `ECRC-26` | global-health-and-pandemic-security-v2_2_2.md | Renewal Health State Estimate | none |
| `ECRC-26` | planetary-immune-system-v2_2_2.md | Renewal State Estimate | none |
| `ECRC-27` | aegis-protocol-v1_3_4.md | Mission Termination and Asset Handback Record | none |
| `ECRC-27` | aethelred-accord-v1_2_2.md | Facility Stand-Down/Shutdown expiration through Interface | none |
| `ECRC-27` | disaster-risk-reduction-v4_4_2.md | Emergency Termination Certificate | none |
| `ECRC-27` | global-health-and-pandemic-security-v2_2_2.md | Emergency Termination Certificate | none |
| `ECRC-27` | planetary-immune-system-v2_2_2.md | Emergency Termination Certificate | none |
| `ECRC-28` | aegis-protocol-v1_3_4.md | Authority Restoration and Access Revocation Record | none |
| `ECRC-28` | aethelred-accord-v1_2_2.md | Authority Restoration and Facility Handback Record | none |
| `ECRC-28` | disaster-risk-reduction-v4_4_2.md | Authority Restoration and Asset Return Record | none |
| `ECRC-28` | global-health-and-pandemic-security-v2_2_2.md | Authority, Facility, and Asset Return Record | none |
| `ECRC-28` | planetary-immune-system-v2_2_2.md | Authority, Asset, and Credential Restoration Record | none |
| `ECRC-29` | aegis-protocol-v1_3_4.md | Emergency Data Disposition Record | none |
| `ECRC-29` | aethelred-accord-v1_2_2.md | Emergency Data Disposition Record | none |
| `ECRC-29` | disaster-risk-reduction-v4_4_2.md | Emergency Data Disposition Record | none |
| `ECRC-29` | global-health-and-pandemic-security-v2_2_2.md | Health Data and Sample Disposition Record | none |
| `ECRC-29` | planetary-immune-system-v2_2_2.md | Emergency Data Disposition Record | none |
| `ECRC-30` | aegis-protocol-v1_3_4.md | Wrongful Action, Injury, and Compensation Record | none |
| `ECRC-30` | aethelred-accord-v1_2_2.md | Wrongful Action and Compensation Record | none |
| `ECRC-30` | disaster-risk-reduction-v4_4_2.md | Wrongful Action and Compensation Record | none |
| `ECRC-30` | global-health-and-pandemic-security-v2_2_2.md | Wrongful Action and Compensation Record | none |
| `ECRC-30` | planetary-immune-system-v2_2_2.md | Wrongful Action and Compensation Record | none |
| `ECRC-31` | aegis-protocol-v1_3_4.md | After-Action and Counterfactual Review | none |
| `ECRC-31` | aethelred-accord-v1_2_2.md | Institutional Learning and Dissent Record | none |
| `ECRC-31` | disaster-risk-reduction-v4_4_2.md | After-Action and Ordinary-Capacity Review | none |
| `ECRC-31` | global-health-and-pandemic-security-v2_2_2.md | After-Action and Ordinary-Capacity Review | none |
| `ECRC-31` | planetary-immune-system-v2_2_2.md | After-Action Review + Ordinary-Capacity Transition Plan | none |
| `ECRC-32` | aegis-protocol-v1_3_4.md | Institutional Continuation, Transfer, or Dissolution Record | none |
| `ECRC-32` | aethelred-accord-v1_2_2.md | Transfer, Succession, and Dissolution Plan | none |
| `ECRC-32` | disaster-risk-reduction-v4_4_2.md | Institutional Continuation, Transfer, or Dissolution Record | none |
| `ECRC-32` | global-health-and-pandemic-security-v2_2_2.md | Institutional Continuation, Transfer, or Dissolution Record | none |
| `ECRC-32` | planetary-immune-system-v2_2_2.md | Institutional Sunset or Continuation Record | none |
| `ECRC-33` | aegis-protocol-v1_3_4.md | Unresolved Risk and Dissent Register | none |
| `ECRC-33` | aethelred-accord-v1_2_2.md | Unresolved Risk and Dissent Register | none |
| `ECRC-33` | disaster-risk-reduction-v4_4_2.md | Unresolved Risk and Dissent Register | none |
| `ECRC-33` | global-health-and-pandemic-security-v2_2_2.md | direct canonical import | none — direct import applies when triggered |
| `ECRC-33` | planetary-immune-system-v2_2_2.md | Unresolved Risk Register | none |
