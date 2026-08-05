# SCPA/0.1 — canonical record class registry

Extracted from the conformance crosswalks published in the framework outlines. This is a reconciliation of existing commitments, not a new specification: every row below is asserted by at least one outline.

- Classes observed: **44** (1–44)
- Frameworks publishing a crosswalk: **5**
- Frameworks naming `SCPA/0.1` as controlling interface: **11**
- Naming it but publishing no crosswalk: biodiversity-governance-v1_1_1.md, hearthstone-protocol-v2_0_1.md, moral-operating-system-v2_8_2.md, oceans-and-marine-governance-v2_3_1.md, soil-health-and-land-use-governance-v3_2_2.md, water-and-sanitation-governance-v5_2_2.md

## Classes

| Class | Canonical name | Asserted by | Status |
|---|---|---|---|
| `SCPA-01` | Protective or Coercive Action Authority Provenance Record | 5 | agreed |
| `SCPA-02` | Standing, Jurisdiction, and Territorial Basis Map | 5 | agreed |
| `SCPA-03` | Action Classification and Procedural Route Record | 5 | agreed |
| `SCPA-04` | Individualized Factual Basis and Attribution Record | 5 | agreed |
| `SCPA-05` | Prohibited Inference and Automated-Use Record | 5 | agreed |
| `SCPA-06` | Necessity, Proportionality, and Alternatives Record | 5 | agreed |
| `SCPA-07` | Rights, Accessibility, and Protected-Status Safeguards Record | 5 | agreed |
| `SCPA-08` | Notice, Reasons, Counsel, Interpretation, and Challenge Record | 5 | agreed |
| `SCPA-09` | Protected Information or Source Intake Record | 5 | agreed |
| `SCPA-10` | Intelligence Purpose, Minimization, and Dissemination Record | 5 | agreed |
| `SCPA-11` | Investigation Opening and Mandate Record | 5 | agreed |
| `SCPA-12` | Investigation Method, Scope, and Minimization Record | 5 | agreed |
| `SCPA-13` | Compulsory Process Application Record | 5 | agreed |
| `SCPA-14` | Search, Entry, Inspection, or Access Authorization Record | 5 | agreed |
| `SCPA-15` | Disclosure, Production, Preservation, or Interception Order Record | 5 | agreed |
| `SCPA-16` | Evidence Seizure, Copying, and Chain-of-Custody Record | 5 | agreed |
| `SCPA-17` | Asset Preservation, Freeze, Restraint, or Seizure Record | 5 | agreed |
| `SCPA-18` | Urgent Protective Action Record | 5 | agreed |
| `SCPA-19` | Arrest or Physical Restraint Record | 5 | agreed |
| `SCPA-20` | Custody or Detention Authority and Welfare Record | 5 | agreed |
| `SCPA-21` | Release, Bail, Supervision, or Less-Restrictive Alternative Record | 5 | agreed |
| `SCPA-22` | Transfer, Extradition, Removal, or Return Authority Record | 5 | agreed |
| `SCPA-23` | Use-of-Force Incident and Necessity Record | 5 | agreed |
| `SCPA-24` | Weapons, Restraint Device, and Special Equipment Authorization Record | 5 | agreed |
| `SCPA-25` | Mission Command, Technical Command, Custody, and Stop-Work Record | 5 | agreed |
| `SCPA-26` | Defensive Cyber Action Record | 5 | agreed |
| `SCPA-27` | Third-Party Cyber Access, Disruption, or Counter-Operation Record | 5 | agreed |
| `SCPA-28` | Financial Coercion, Sanction, Freeze, Forfeiture, or Exclusion Record | 5 | agreed |
| `SCPA-29` | Cross-Border Cooperation and Mutual Legal Assistance Record | 5 | agreed |
| `SCPA-30` | Asylum, Protection, Non-Refoulement, and Security-Allegation Record | 5 | agreed |
| `SCPA-31` | Independent Authorization, Adjudication, or Review Record | 5 | agreed |
| `SCPA-32` | Appeal, Complaint, Urgent Challenge, and Interim Relief Record | 5 | agreed |
| `SCPA-33` | Remedy, Restitution, Property Return, and Compensation Record | 5 | agreed |
| `SCPA-34` | Restorative, Rehabilitation, Correctional, or Reintegration Consent and Suitability Record | 5 | agreed |
| `SCPA-35` | Security Data Disposition, Correction, Expungement, and Use-Limitation Record | 5 | agreed |
| `SCPA-36` | Action Termination, Authority Return, and Unresolved-Risk Custody Record | 5 | agreed |
| `SCPA-37` | Identity, Credential, and Service-Access Function Separation Record | 5 | agreed |
| `SCPA-38` | Child, Dependent Person, Guardianship, and Best-Interests Record | 5 | agreed |
| `SCPA-39` | Indigenous Territory, Authority, Knowledge, and Affected-Nation Interface Record | 5 | agreed |
| `SCPA-40` | Survivor Safety, Confidentiality, and Process Choice Record | 5 | agreed |
| `SCPA-41` | Worker, Operator, Responder, and Whistleblower Protection Record | 5 | agreed |
| `SCPA-42` | Public Communication, Classification, Correction, and Non-Propaganda Record | 5 | agreed |
| `SCPA-43` | Security Institution Transfer, Succession, or Dissolution Continuity Plan | 5 | agreed |
| `SCPA-44` | Coercive-Power Non-Activation and Security-Use Reversion Register | 5 | agreed |

## Framework crosswalk

| Class | Framework | Domain record | Conformance note |
|---|---|---|---|
| `SCPA-01` | aegis-protocol-v1_3_4.md | Participation and Authority Charter | none |
| `SCPA-01` | kintsugi-protocol-v2_2_1.md | KIN-01`; required for any external consequential action | — |
| `SCPA-01` | migration-and-human-mobility-v1_1_1.md | — | MOB-01 implements |
| `SCPA-01` | peace-and-conflict-resolution-v1_8_1.md | — | imports for any consequential referral or action |
| `SCPA-01` | shield-protocol-v2_0_1.md | SHIELD-01 extends | — |
| `SCPA-02` | aegis-protocol-v1_3_4.md | Participation and Authority Charter; Host and Territorial Authority Record | none |
| `SCPA-02` | kintsugi-protocol-v2_2_1.md | KIN-02` and `KIN-20 | — |
| `SCPA-02` | migration-and-human-mobility-v1_1_1.md | — | MOB-01/MOB-27/MOB-29 split |
| `SCPA-02` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-02 and PCR-04; imports for consequential action |
| `SCPA-02` | shield-protocol-v2_0_1.md | SHIELD-04 extends | — |
| `SCPA-03` | aegis-protocol-v1_3_4.md | Security-Facing Request Classification Record | none |
| `SCPA-03` | kintsugi-protocol-v2_2_1.md | KIN-03`, `KIN-06`, and `KIN-14 | — |
| `SCPA-03` | migration-and-human-mobility-v1_1_1.md | — | MOB-34 extends |
| `SCPA-03` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-03 and PCR-22 |
| `SCPA-03` | shield-protocol-v2_0_1.md | SHIELD-01 and SHIELD-10 contain | — |
| `SCPA-04` | aegis-protocol-v1_3_4.md | direct canonical import | none — Aegis does not make individualized security findings |
| `SCPA-04` | kintsugi-protocol-v2_2_1.md | external authority record; Kintsugi may supply limited observations with source limits | — |
| `SCPA-04` | migration-and-human-mobility-v1_1_1.md | — | MOB-04/MOB-06/MOB-10 extend |
| `SCPA-04` | peace-and-conflict-resolution-v1_8_1.md | — | not normally applicable; mandatory before individual consequence |
| `SCPA-04` | shield-protocol-v2_0_1.md | direct import; linked through SHIELD-09 | — |
| `SCPA-05` | aegis-protocol-v1_3_4.md | Mission Separation and Excluded-Use Record; Coercive-Power Non-Activation and Security-Use Reversion Register | none |
| `SCPA-05` | kintsugi-protocol-v2_2_1.md | prohibited inference rules in §§4.5, 7.2, and 17.2 | — |
| `SCPA-05` | migration-and-human-mobility-v1_1_1.md | — | MOB-05/MOB-10/MOB-33 extend |
| `SCPA-05` | peace-and-conflict-resolution-v1_8_1.md | — | implements through §§6, 14, and 15 |
| `SCPA-05` | shield-protocol-v2_0_1.md | SHIELD-05 extends | — |
| `SCPA-06` | aegis-protocol-v1_3_4.md | Capability Transition Profile; Residual Capability and Re-militarization Risk Record | none |
| `SCPA-06` | kintsugi-protocol-v2_2_1.md | external action; Kintsugi records voluntary alternatives offered | — |
| `SCPA-06` | migration-and-human-mobility-v1_1_1.md | — | MOB-19/MOB-21/MOB-25 extend |
| `SCPA-06` | peace-and-conflict-resolution-v1_8_1.md | — | imports for urgent or coercive action |
| `SCPA-06` | shield-protocol-v2_0_1.md | SHIELD-05 extends | — |
| `SCPA-07` | aegis-protocol-v1_3_4.md | Worker Safety, Refusal, and Whistleblowing Record; Indigenous Capability Transition Interface; Data, Cyber, and Intelligence Boundary Record | none |
| `SCPA-07` | kintsugi-protocol-v2_2_1.md | KIN-04`, `KIN-11`, and `KIN-12 | — |
| `SCPA-07` | migration-and-human-mobility-v1_1_1.md | — | MOB-11/MOB-13/MOB-17/MOB-18 extend |
| `SCPA-07` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-06 |
| `SCPA-07` | shield-protocol-v2_0_1.md | SHIELD-05, 26, 28, 29, 30, and 31 contain | — |
| `SCPA-08` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies after reversion when triggered |
| `SCPA-08` | kintsugi-protocol-v2_2_1.md | external action; `KIN-23` assists notice and challenge | — |
| `SCPA-08` | migration-and-human-mobility-v1_1_1.md | — | MOB-11/MOB-32 split |
| `SCPA-08` | peace-and-conflict-resolution-v1_8_1.md | — | imports when legal consequence is proposed |
| `SCPA-08` | shield-protocol-v2_0_1.md | SHIELD-02 and 35 contain | — |
| `SCPA-09` | aegis-protocol-v1_3_4.md | Protected Disclosure and Retaliation Response Record; Data, Cyber, and Intelligence Boundary Record | none |
| `SCPA-09` | kintsugi-protocol-v2_2_1.md | not a routine Kintsugi function; `KIN-17` if legally applicable | — |
| `SCPA-09` | migration-and-human-mobility-v1_1_1.md | — | MOB-09/MOB-18 extend |
| `SCPA-09` | peace-and-conflict-resolution-v1_8_1.md | — | interfaces through PCR-09, PCR-21, PCR-22, and PCR-24 |
| `SCPA-09` | shield-protocol-v2_0_1.md | SHIELD-06 extends | — |
| `SCPA-10` | aegis-protocol-v1_3_4.md | Data, Cyber, and Intelligence Boundary Record | none |
| `SCPA-10` | kintsugi-protocol-v2_2_1.md | not a routine Kintsugi function; care-to-intelligence firewall controls | — |
| `SCPA-10` | migration-and-human-mobility-v1_1_1.md | — | MOB-10/MOB-33 extend |
| `SCPA-10` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before any intelligence use |
| `SCPA-10` | shield-protocol-v2_0_1.md | SHIELD-07 and 08 split | — |
| `SCPA-11` | aegis-protocol-v1_3_4.md | direct canonical import | none — Aegis cannot open a security investigation |
| `SCPA-11` | kintsugi-protocol-v2_2_1.md | external investigation only | — |
| `SCPA-11` | migration-and-human-mobility-v1_1_1.md | — | imports when investigation opens |
| `SCPA-11` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before investigation |
| `SCPA-11` | shield-protocol-v2_0_1.md | direct import; SHIELD-09 is referral only | — |
| `SCPA-12` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies after reversion when triggered |
| `SCPA-12` | kintsugi-protocol-v2_2_1.md | external investigation only | — |
| `SCPA-12` | migration-and-human-mobility-v1_1_1.md | — | imports when investigative methods used |
| `SCPA-12` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before investigative method |
| `SCPA-12` | shield-protocol-v2_0_1.md | direct import | — |
| `SCPA-13` | aegis-protocol-v1_3_4.md | direct canonical import | none — Aegis supplies no compulsory-process authority |
| `SCPA-13` | kintsugi-protocol-v2_2_1.md | external compulsory process only | — |
| `SCPA-13` | migration-and-human-mobility-v1_1_1.md | — | imports for compulsory process |
| `SCPA-13` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before compulsion |
| `SCPA-13` | shield-protocol-v2_0_1.md | SHIELD-10 and 11 contain | — |
| `SCPA-14` | aegis-protocol-v1_3_4.md | direct canonical import | none — Aegis inspection mandates do not substitute |
| `SCPA-14` | kintsugi-protocol-v2_2_1.md | external search or entry authorization only | — |
| `SCPA-14` | migration-and-human-mobility-v1_1_1.md | — | imports for search/entry/access |
| `SCPA-14` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before search or entry |
| `SCPA-14` | shield-protocol-v2_0_1.md | direct import through competent authority | — |
| `SCPA-15` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies |
| `SCPA-15` | kintsugi-protocol-v2_2_1.md | external disclosure or interception order only | — |
| `SCPA-15` | migration-and-human-mobility-v1_1_1.md | — | imports for disclosure/preservation/interception |
| `SCPA-15` | peace-and-conflict-resolution-v1_8_1.md | — | imports before compulsory disclosure or interception |
| `SCPA-15` | shield-protocol-v2_0_1.md | SHIELD-11 extends | — |
| `SCPA-16` | aegis-protocol-v1_3_4.md | Investigation and Evidence Handoff Record | none |
| `SCPA-16` | kintsugi-protocol-v2_2_1.md | KIN-16` plus external evidence chain-of-custody | — |
| `SCPA-16` | migration-and-human-mobility-v1_1_1.md | — | imports for evidence seizure |
| `SCPA-16` | peace-and-conflict-resolution-v1_8_1.md | — | interfaces only through separately authorized evidence transfer |
| `SCPA-16` | shield-protocol-v2_0_1.md | SHIELD-12 extends | — |
| `SCPA-17` | aegis-protocol-v1_3_4.md | direct canonical import | none — Aegis funding and custody do not create restraint authority |
| `SCPA-17` | kintsugi-protocol-v2_2_1.md | external asset action only | — |
| `SCPA-17` | migration-and-human-mobility-v1_1_1.md | — | imports for asset restraint |
| `SCPA-17` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before asset action |
| `SCPA-17` | shield-protocol-v2_0_1.md | SHIELD-21 and 22 contain | — |
| `SCPA-18` | aegis-protocol-v1_3_4.md | Emergency Asset Re-tasking Record | none |
| `SCPA-18` | kintsugi-protocol-v2_2_1.md | KIN-06` and `KIN-14`; external authority controls action | — |
| `SCPA-18` | migration-and-human-mobility-v1_1_1.md | — | MOB-07/MOB-18 extend for urgent protection |
| `SCPA-18` | peace-and-conflict-resolution-v1_8_1.md | — | interfaces through PCR-21; receiving authority completes |
| `SCPA-18` | shield-protocol-v2_0_1.md | direct import; victim support does not replace it | — |
| `SCPA-19` | aegis-protocol-v1_3_4.md | direct canonical import | none — any such request triggers reversion |
| `SCPA-19` | kintsugi-protocol-v2_2_1.md | external restraint record only | — |
| `SCPA-19` | migration-and-human-mobility-v1_1_1.md | — | imports for arrest/restraint |
| `SCPA-19` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before restraint |
| `SCPA-19` | shield-protocol-v2_0_1.md | direct import | — |
| `SCPA-20` | aegis-protocol-v1_3_4.md | direct canonical import | none — Aegis has no detention authority |
| `SCPA-20` | kintsugi-protocol-v2_2_1.md | external custody record; Sanctuary exit record confirms no custody | — |
| `SCPA-20` | migration-and-human-mobility-v1_1_1.md | — | MOB-19/MOB-20 extend |
| `SCPA-20` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before custody |
| `SCPA-20` | shield-protocol-v2_0_1.md | direct import | — |
| `SCPA-21` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies |
| `SCPA-21` | kintsugi-protocol-v2_2_1.md | external release record; Kintsugi may support less-restrictive alternatives | — |
| `SCPA-21` | migration-and-human-mobility-v1_1_1.md | — | MOB-19/MOB-20 extend |
| `SCPA-21` | peace-and-conflict-resolution-v1_8_1.md | — | imports where custody exists |
| `SCPA-21` | shield-protocol-v2_0_1.md | direct import | — |
| `SCPA-22` | aegis-protocol-v1_3_4.md | direct canonical import | none — any such use triggers reversion |
| `SCPA-22` | kintsugi-protocol-v2_2_1.md | external transfer or removal authority only | — |
| `SCPA-22` | migration-and-human-mobility-v1_1_1.md | — | MOB-21/MOB-22/MOB-23 split |
| `SCPA-22` | peace-and-conflict-resolution-v1_8_1.md | — | interfaces through PCR-28; Migration/Justice controls |
| `SCPA-22` | shield-protocol-v2_0_1.md | SHIELD-33 extends | — |
| `SCPA-23` | aegis-protocol-v1_3_4.md | Wrongful Action, Injury, and Compensation Record | none |
| `SCPA-23` | kintsugi-protocol-v2_2_1.md | external use-of-force record only | — |
| `SCPA-23` | migration-and-human-mobility-v1_1_1.md | — | imports for force |
| `SCPA-23` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports for any force |
| `SCPA-23` | shield-protocol-v2_0_1.md | direct import | — |
| `SCPA-24` | aegis-protocol-v1_3_4.md | Mission Separation and Excluded-Use Record; Residual Capability and Re-militarization Risk Record | none — Aegis cannot authorize equipment use |
| `SCPA-24` | kintsugi-protocol-v2_2_1.md | external weapons or equipment record only | — |
| `SCPA-24` | migration-and-human-mobility-v1_1_1.md | — | imports for weapons/equipment |
| `SCPA-24` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before equipment use |
| `SCPA-24` | shield-protocol-v2_0_1.md | direct import | — |
| `SCPA-25` | aegis-protocol-v1_3_4.md | Custody and Command Separation Record; Security-Use Reversion Decision and Asset Status Record | none |
| `SCPA-25` | kintsugi-protocol-v2_2_1.md | KIN-15` plus external command record | — |
| `SCPA-25` | migration-and-human-mobility-v1_1_1.md | — | MOB-27/MOB-34 extend for mission/route command |
| `SCPA-25` | peace-and-conflict-resolution-v1_8_1.md | — | imports for protected missions or converted assets |
| `SCPA-25` | shield-protocol-v2_0_1.md | SHIELD-13 extends | — |
| `SCPA-26` | aegis-protocol-v1_3_4.md | Data, Cyber, and Intelligence Boundary Record; Emergency Asset Re-tasking Record | none |
| `SCPA-26` | kintsugi-protocol-v2_2_1.md | limited to defensive action on Kintsugi-controlled systems | — |
| `SCPA-26` | migration-and-human-mobility-v1_1_1.md | — | imports for defensive cyber action |
| `SCPA-26` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports for defensive cyber action |
| `SCPA-26` | shield-protocol-v2_0_1.md | SHIELD-15 extends | — |
| `SCPA-27` | aegis-protocol-v1_3_4.md | Security-Facing Request Classification Record; Coercive-Power Non-Activation and Security-Use Reversion Register | none — Aegis supplies no third-party cyber authority |
| `SCPA-27` | kintsugi-protocol-v2_2_1.md | external third-party cyber authority only | — |
| `SCPA-27` | migration-and-human-mobility-v1_1_1.md | — | imports for third-party cyber action |
| `SCPA-27` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before third-party disruption |
| `SCPA-27` | shield-protocol-v2_0_1.md | SHIELD-16 extends | — |
| `SCPA-28` | aegis-protocol-v1_3_4.md | Security-Facing Request Classification Record; Coercive-Power Non-Activation and Security-Use Reversion Register | none — Aegis finance cannot impose coercion |
| `SCPA-28` | kintsugi-protocol-v2_2_1.md | external financial coercion only | — |
| `SCPA-28` | migration-and-human-mobility-v1_1_1.md | — | imports for sanctions or financial coercion |
| `SCPA-28` | peace-and-conflict-resolution-v1_8_1.md | — | not a Peace power; imports before financial coercion |
| `SCPA-28` | shield-protocol-v2_0_1.md | SHIELD-20 through 25 split and extend | — |
| `SCPA-29` | aegis-protocol-v1_3_4.md | Participation and Authority Charter; Host and Territorial Authority Record; CDEE/LS-AE-CCAA records | none |
| `SCPA-29` | kintsugi-protocol-v2_2_1.md | KIN-27` plus competent cross-border authority | — |
| `SCPA-29` | migration-and-human-mobility-v1_1_1.md | — | MOB-22/MOB-27/MOB-34 extend |
| `SCPA-29` | peace-and-conflict-resolution-v1_8_1.md | — | imports for legal/security cooperation; diplomatic peace support uses PCR-04 |
| `SCPA-29` | shield-protocol-v2_0_1.md | SHIELD-01, 02, 04, and 10 contain | — |
| `SCPA-30` | aegis-protocol-v1_3_4.md | direct canonical import | none — request triggers reversion; Migration v1.1.1 controls |
| `SCPA-30` | kintsugi-protocol-v2_2_1.md | migration-security firewall; external protection and non-refoulement record | — |
| `SCPA-30` | migration-and-human-mobility-v1_1_1.md | — | MOB-06/MOB-07/MOB-08/MOB-10 implement |
| `SCPA-30` | peace-and-conflict-resolution-v1_8_1.md | — | interfaces through PCR-28; Migration controls |
| `SCPA-30` | shield-protocol-v2_0_1.md | SHIELD-33 extends | — |
| `SCPA-31` | aegis-protocol-v1_3_4.md | Adjudication and Enforcement Handoff Record | none |
| `SCPA-31` | kintsugi-protocol-v2_2_1.md | external authorization, adjudication, or review | — |
| `SCPA-31` | migration-and-human-mobility-v1_1_1.md | — | MOB-08/MOB-13/MOB-19/MOB-21/MOB-22 extend |
| `SCPA-31` | peace-and-conflict-resolution-v1_8_1.md | — | imports for any legal determination |
| `SCPA-31` | shield-protocol-v2_0_1.md | SHIELD-35 links; Justice controls | — |
| `SCPA-32` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies |
| `SCPA-32` | kintsugi-protocol-v2_2_1.md | KIN-23` supports access to challenge and interim relief | — |
| `SCPA-32` | migration-and-human-mobility-v1_1_1.md | — | MOB-32 implements |
| `SCPA-32` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-33; imports for legal challenge |
| `SCPA-32` | shield-protocol-v2_0_1.md | SHIELD-35 extends | — |
| `SCPA-33` | aegis-protocol-v1_3_4.md | Wrongful Action, Injury, and Compensation Record | none |
| `SCPA-33` | kintsugi-protocol-v2_2_1.md | KIN-22` and `KIN-24 | — |
| `SCPA-33` | migration-and-human-mobility-v1_1_1.md | — | MOB-24/MOB-32/MOB-38 extend |
| `SCPA-33` | peace-and-conflict-resolution-v1_8_1.md | — | interfaces with Justice; reconstruction is not substitute |
| `SCPA-33` | shield-protocol-v2_0_1.md | SHIELD-24, 25, and 36 contain | — |
| `SCPA-34` | aegis-protocol-v1_3_4.md | Personnel Transition Agreement; Veteran, Family, and Community Transition Record | none — Aegis programmes cannot impose correctional rehabilitation |
| `SCPA-34` | kintsugi-protocol-v2_2_1.md | KIN-05`, `KIN-08`, `KIN-09`, and `KIN-10 | — |
| `SCPA-34` | migration-and-human-mobility-v1_1_1.md | — | MOB-23 extends; otherwise imports |
| `SCPA-34` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-25 and PCR-28 |
| `SCPA-34` | shield-protocol-v2_0_1.md | direct import; Shield provides no developmental pathway | — |
| `SCPA-35` | aegis-protocol-v1_3_4.md | Technology Use and Decommissioning Record; Emergency Data Disposition Record; Re-qualification Record | none |
| `SCPA-35` | kintsugi-protocol-v2_2_1.md | KIN-18` and `KIN-24 | — |
| `SCPA-35` | migration-and-human-mobility-v1_1_1.md | — | MOB-33/MOB-38 implement |
| `SCPA-35` | peace-and-conflict-resolution-v1_8_1.md | — | imports after any security referral; PCR-08 governs Peace data |
| `SCPA-35` | shield-protocol-v2_0_1.md | SHIELD-37 extends | — |
| `SCPA-36` | aegis-protocol-v1_3_4.md | Mission Termination and Asset Handback Record; Authority Restoration and Access Revocation Record; Unresolved Risk and Dissent Register | none |
| `SCPA-36` | kintsugi-protocol-v2_2_1.md | KIN-25` and `KIN-28 | — |
| `SCPA-36` | migration-and-human-mobility-v1_1_1.md | — | MOB-38 implements |
| `SCPA-36` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-34 |
| `SCPA-36` | shield-protocol-v2_0_1.md | SHIELD-38 extends | — |
| `SCPA-37` | aegis-protocol-v1_3_4.md | Data, Cyber, and Intelligence Boundary Record; Technology Use and Decommissioning Record | none |
| `SCPA-37` | kintsugi-protocol-v2_2_1.md | service access independent of security identity; platform rules in §17 | — |
| `SCPA-37` | migration-and-human-mobility-v1_1_1.md | — | MOB-02/MOB-03/MOB-04/MOB-05 implement |
| `SCPA-37` | peace-and-conflict-resolution-v1_8_1.md | — | implements non-conditioning and data separation |
| `SCPA-37` | shield-protocol-v2_0_1.md | SHIELD-32 extends | — |
| `SCPA-38` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies |
| `SCPA-38` | kintsugi-protocol-v2_2_1.md | KIN-11 | — |
| `SCPA-38` | migration-and-human-mobility-v1_1_1.md | — | MOB-12/MOB-13/MOB-14 implement |
| `SCPA-38` | peace-and-conflict-resolution-v1_8_1.md | — | imports when children or dependent persons are affected |
| `SCPA-38` | shield-protocol-v2_0_1.md | SHIELD-29 extends | — |
| `SCPA-39` | aegis-protocol-v1_3_4.md | Indigenous Capability Transition Interface | none |
| `SCPA-39` | kintsugi-protocol-v2_2_1.md | KIN-02` and `KIN-20 | — |
| `SCPA-39` | migration-and-human-mobility-v1_1_1.md | — | MOB-24/MOB-29 implement |
| `SCPA-39` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-29 |
| `SCPA-39` | shield-protocol-v2_0_1.md | SHIELD-30 extends | — |
| `SCPA-40` | aegis-protocol-v1_3_4.md | direct canonical import | none — direct import applies |
| `SCPA-40` | kintsugi-protocol-v2_2_1.md | KIN-07` and Survivor Sovereignty Protocol | — |
| `SCPA-40` | migration-and-human-mobility-v1_1_1.md | — | MOB-18 implements |
| `SCPA-40` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-05, PCR-09, PCR-21, PCR-24, PCR-25 |
| `SCPA-40` | shield-protocol-v2_0_1.md | SHIELD-26 and 28 contain | — |
| `SCPA-41` | aegis-protocol-v1_3_4.md | Worker Safety, Refusal, and Whistleblowing Record | none |
| `SCPA-41` | kintsugi-protocol-v2_2_1.md | KIN-19 | — |
| `SCPA-41` | migration-and-human-mobility-v1_1_1.md | — | MOB-31 extends |
| `SCPA-41` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-32 and PCR-33 |
| `SCPA-41` | shield-protocol-v2_0_1.md | SHIELD-27 and 31 contain | — |
| `SCPA-42` | aegis-protocol-v1_3_4.md | Public Communication and Non-Manipulation Record | none |
| `SCPA-42` | kintsugi-protocol-v2_2_1.md | independent review and Ombudsperson architecture | — |
| `SCPA-42` | migration-and-human-mobility-v1_1_1.md | — | MOB-35 implements |
| `SCPA-42` | peace-and-conflict-resolution-v1_8_1.md | — | extends through PCR-31 |
| `SCPA-42` | shield-protocol-v2_0_1.md | SHIELD-34 extends | — |
| `SCPA-43` | aegis-protocol-v1_3_4.md | Institutional Continuation, Transfer, or Dissolution Record | none |
| `SCPA-43` | kintsugi-protocol-v2_2_1.md | KIN-28` and retained-duty handoff rules | — |
| `SCPA-43` | migration-and-human-mobility-v1_1_1.md | — | MOB-38 extends |
| `SCPA-43` | peace-and-conflict-resolution-v1_8_1.md | — | imports for security bodies; PCR-34 covers Peace programmes |
| `SCPA-43` | shield-protocol-v2_0_1.md | SHIELD-39 extends | — |
| `SCPA-44` | aegis-protocol-v1_3_4.md | Coercive-Power Non-Activation and Security-Use Reversion Register | none |
| `SCPA-44` | kintsugi-protocol-v2_2_1.md | excluded-powers register and non-activation of retired SHRU authority | — |
| `SCPA-44` | migration-and-human-mobility-v1_1_1.md | — | MOB-37 implements and imports Aegis reversion |
| `SCPA-44` | peace-and-conflict-resolution-v1_8_1.md | — | implements as a standing Peace non-activation rule |
| `SCPA-44` | shield-protocol-v2_0_1.md | SHIELD-40 extends | — |
