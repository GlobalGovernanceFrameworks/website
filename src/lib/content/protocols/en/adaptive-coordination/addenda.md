# Adaptive Coordination Protocol
## Supplementary Addenda

Addendum A — Interpretation Containment Layer (ICL)
Addendum B — Pre-Action Commitment Layer (PACL)
Addendum C — System Regeneration Protocol (SRP)

| | |
|---|---|
| **Tier** | 3 (Cross-Cutting Protocol) |
| **Supplements** | ACP v0.5 — Refinement & Realism Upgrade |
| **Status** | Draft v0.2 — EAMN Specification & Phase Governance |
| **Purpose** | Address the pre-coordination gap: the failure modes that occur before and between formal ACP activation states |

> **WHY:** *ACP v0.5 governs coordination under uncertainty. These addenda address an adjacent problem: the dynamics that determine whether coordination is even possible — how meaning forms under pressure, how action thresholds hold under stress, and how systems recover after they fracture.*

---

## Phase 1 Reduced-Function Mode

During the initial ACP pilot phase (0–24 months), EAMN will not be operational. ICL and PACL will operate in a **reduced-function mode** with the following adjustments:

| Component | Full-Function Mode (Phase 2+) | Reduced-Function Mode (Phase 1) |
|---|---|---|
| **ASE Classification** | EAMN provides independent probabilistic assessment. | ASE bands are self-assessed by participating states, with mandatory disclosure of evidence sources. Claims are labeled *"Self-Assessed — Not Independently Verified."* |
| **Legitimacy Delay Window** | LDW duration tied to EAMN assessment timeline. | LDW is a fixed 48-hour window during which escalation legitimacy is procedurally paused. The window is not extendable and does not depend on external verification. |
| **PACL Threshold Mapping** | Thresholds mapped to EAMN ASE bands. | Thresholds mapped to self-assessed confidence levels, with a **mandatory 2-band penalty** applied to all self-assessed claims. (Example: if a state self-assesses at High/≥70%, the PACL threshold calculation treats it as Medium/40–69%.) This penalty creates conservative bias and partially compensates for the absence of independent verification. |
| **Disruption Documentation** | Full logging of divergences. | Same as full-function mode. |

**Rationale:** Reduced-function mode acknowledges that Phase 1 lacks the institutional infrastructure for full ICL/PACL operation. It preserves the structural logic of the addenda — slowing narrative certainty, pre-declaring thresholds — while being honest about the verification gap. The 2-band penalty is a deliberately coarse mechanism designed to be replaced by EAMN in Phase 2, not a permanent feature.

**Transition Trigger:** EAMN becomes operational when (a) the convened standing panel roster is fully vetted and trained, (b) the host institution has confirmed activation readiness, and (c) at least one successful simulation exercise has demonstrated the ability to meet the t+24 timeline. The Participant Assembly votes to transition from reduced-function to full-function mode.

---

## Full Stack Reference

The full architecture, in operational sequence:

| Layer | Component | Function |
|---|---|---|
| Pre-coordination | ICL (Addendum A) | Slows narrative certainty formation; prevents premature escalation trigger |
| Pre-coordination | PACL (Addendum B) | Governs action thresholds before crisis; documents divergence |
| Active coordination | ACP v0.5 | Allocates resources, manages participation tiers, tracks contributions |
| Post-fracture | SRP (Addendum C) | Rebuilds minimum coordination capacity after systemic breakdown |

*The system does not guarantee de-escalation. It converts unstructured escalation risk into staged, observable, partially reversible decision sequences — and provides a recovery path when those sequences fail.*

---

## Addendum A — Interpretation Containment Layer (ICL)

| | |
|---|---|
| **Status** | Draft v0.2 — EAMN Specification & Phase Governance |
| **Supplements** | ACP v0.5 |
| **Purpose** | Slow and structure the formation of political meaning under high-stakes ambiguity, preventing premature narrative closure from triggering irreversible escalation before ACP coordination can engage |

### A.1 The Problem ACP v0.5 Does Not Yet Address

ACP v0.5 governs coordination once actors are operating within shared frameworks. It assumes that when a crisis event occurs, there is time for verification, deliberation, and allocation decisions to take place.

This assumption fails in a specific and important class of events: high-impact, attribution-ambiguous incidents — assassinations, precision strikes, covert operations — where the escalation timeline compresses to hours and narrative certainty forms faster than facts can settle.

In these conditions, escalation is not driven by events themselves but by the speed at which actors converge on a shared interpretation of who is responsible. Once that convergence occurs, retaliation becomes politically mandatory regardless of what the underlying facts are. ACP coordination becomes irrelevant before it can activate.

ICL addresses this gap directly.

### A.2 Core Concept: The Legitimacy Delay Window

ICL is built around a single foundational mechanism: the Legitimacy Delay Window (LDW). The LDW is a predefined period following a high-impact incident during which:

- attribution claims remain formally probabilistic (not binary),
- retaliatory justification is classified as procedurally premature in ACP-linked channels,
- and escalation actions above a defined threshold cannot be legitimized by the system.

The LDW does not prevent speech, intelligence activity, or military readiness. It constrains only the formal closure of causal claims — the moment at which an actor officially declares certainty. This distinction is critical: ICL intervenes in the timing of meaning consolidation, not in the content of meaning itself.

### A.3 Attribution Spectrum Engine (ASE)

All attribution claims processed through ACP-linked channels must be classified using a four-band spectrum:

| Confidence Band | Threshold | Operational Meaning |
|---|---|---|
| Low | <40% | Multiple actors plausible; no dominant hypothesis |
| Medium | 40–69% | Convergent suspicion; insufficient for action authorization |
| High (Strong Evidence) | 70–84% | Substantial corroboration; eligible for limited diplomatic response |
| Verified | ≥85% | Multi-source confirmation; full action legitimacy restored |

Classification requires corroboration from at least two independent source categories (e.g., signals intelligence, human intelligence, third-party verification, physical evidence). Single-source claims are capped at Medium regardless of internal confidence levels.

### A.4 Narrative Separation Layer

A key failure mode in acute crises is cascade certainty amplification: intelligence assessments are imported into political narratives, which are imported into media framing, which then feeds back into political demands for action — all within hours. Each transfer inflates confidence without adding evidence.

ICL interrupts this cascade by requiring that each information stream maintain its own confidence classification:

- Intelligence assessments must be labeled with ASE band and source count.
- Political statements in formal ACP channels must reference the ASE classification, not assert independent certainty.
- Media monitoring (via the ACP Narrative Commons) tracks narrative divergence from verified attribution levels.

Certainty cannot migrate between streams without an explicit translation step that preserves the original confidence classification. This does not prevent political actors from making public claims — it prevents those claims from being recognized as procedurally valid within the ACP system until the ASE threshold is met.

### A.5 External Attribution Mediation Node (EAMN)

ICL requires a neutral, technically credible third party to aggregate evidence streams and publish probabilistic attribution assessments. This function is not a court or arbitration body — it issues non-binding confidence syntheses that participants may use to calibrate their own assessments. The EAMN does not determine guilt; it publishes evidence-weighted confidence bands.

#### A.5.1 Hosting Model

For the pilot phase, EAMN adopts a **Convened Standing Panel** model: a pre-identified roster of technical experts hosted by an existing neutral institution, activated only during LDW windows. This balances credibility with deployability — a permanent treaty body (IAEA-style) would take decades to establish; a purely ad-hoc model would be too slow for the 48–72 hour LDW.

The recommended host institutions are **UNIDIR** (United Nations Institute for Disarmament Research) or **SIPRI** (Stockholm International Peace Research Institute). Both have technical credibility in arms control and conflict monitoring, existing relationships with states, and a mandate aligned with attribution assessment without being a political body. The host provides administrative and legal infrastructure, secure communications, and a pre-vetted expert roster.

A **permanent skeleton secretariat** (2–3 staff) embedded in the host institution maintains the roster, updates protocols, and manages activation logistics between incidents. This minimizes the fixed target for political pressure while preserving activation speed.

#### A.5.2 Activation Timeline

| Time | Action |
|---|---|
| t=0 | LDW declared |
| t+2h | Secretariat notifies relevant roster experts |
| t+6h | Panel convenes virtually; begins evidence aggregation |
| t+24h | Preliminary ASE classification published |
| Ongoing | Classification updated as new evidence arrives |

The panel does not need to produce a final attribution within the LDW. Its primary function is to produce a probabilistic confidence assessment that constrains premature certainty formation.

#### A.5.3 Roster Governance and Vetting

The 15–25 technical experts on the EAMN standing roster are selected through a transparent, multi-stakeholder process designed to prevent capture by any single state or bloc.

**Nominations Committee:** A 5-member independent Nominations Committee is appointed by the Participant Assembly, comprising:

- 2 members from states not currently participating in ACP (neutral third parties),
- 1 from a relevant international scientific body (e.g., International Science Council),
- 1 from a civil society organization with verified expertise in conflict monitoring,
- 1 rotating member from the ACP Secretariat (non-voting).

Committee members serve staggered 3-year terms and may not be reappointed consecutively.

**Selection Criteria:** Experts are vetted against the following, with no single criterion being dispositive:

- Demonstrated technical expertise in at least one relevant domain (signals intelligence, forensic analysis, open-source intelligence, satellite imagery, international humanitarian law).
- Absence of current employment by any state's intelligence or defense apparatus (former employment permitted after a 5-year cooling-off period).
- Geographic and linguistic diversity, with a preference for experts from regions not typically represented in international verification bodies.
- Willingness to serve on standby retainer and to participate in annual simulation exercises.

**Capture Mitigation:**

- No single state may have more than two nationals on the roster at any time.
- No single region (as defined by UN regional groupings) may have more than 40% of roster seats.
- The Nominations Committee's decisions are subject to review by the ACP Ombudsperson upon formal complaint.

**Transparency:** The full roster is published on the ACP dashboard, including each expert's institutional affiliation and area of expertise. Annual reports summarize roster composition and any changes. Selection criteria and process are publicly documented.

**Roster Maintenance:** The roster is reviewed annually by the Nominations Committee. Experts may be removed for cause (e.g., breach of confidentiality, demonstrated bias) by a supermajority vote of the Committee. The Committee maintains a pre-vetted waiting list to fill vacancies within 30 days.

#### A.5.4 Proxy Attribution Handling

EAMN cannot resolve proxy attribution ambiguity. In cases where non-state actors execute an incident with plausible state direction, EAMN's function is to document the ambiguity and prevent premature certainty formation — a defensive, not investigative, capability.

| Scenario | EAMN Response |
|---|---|
| Clear state attribution (≥85% confidence) | ASE classification: Verified. Full LDW functions normally. |
| Strong circumstantial state attribution; deniable proxy execution (70–84%) | ASE classification: High, with an explicit **Proxy Attribution Caveat** noting that execution was by non-state actors and principal attribution is probabilistic. |
| Ambiguous proxy execution; no clear principal (40–69%) | ASE classification: Medium, with documentation of the ambiguity. LDW remains active; escalation legitimacy is not granted. |
| Attribution deliberately obscured (<40%) | ASE classification: Low. EAMN publishes: *"Available evidence does not support attribution above the Low confidence band. Multiple actors remain plausible."* |

The value of EAMN's proxy handling is not resolving the attribution problem — it is providing a structured, credible assessment that actors can cite as justification for not escalating. This is the same defensive function the LDW performs at the process level; EAMN performs it at the evidentiary level.

#### A.5.5 Phasing

EAMN is a Phase 2 component. See the Phase 1 Reduced-Function Mode section above for how ICL and PACL operate in its absence.

### A.6 Degraded-Mode Operation

The LDW's procedural legitimacy depends on timely EAMN assessment. If EAMN has not published a preliminary ASE classification within 24 hours of LDW activation, the system does not fail silent — it enters **Degraded Attribution Mode**.

**Degraded Attribution Mode Protocol:**

- The ACP dashboard displays: *"EAMN assessment pending. Attribution confidence remains unclassified pending external verification."*
- All attribution claims in ACP channels are capped at **Medium** confidence regardless of internal intelligence assessments.
- The LDW remains in effect, but the justification for its extension beyond the initial 24 hours must be publicly logged by the ACP Secretariat, including the reason for EAMN delay (e.g., evidence complexity, access restrictions, technical failure).
- After 72 hours without EAMN assessment, the LDW expires and actors revert to standard ACP Emergency Mode protocols. The incident is flagged in the Contribution Registry as *"attribution unresolved at time of escalation."*

This degraded mode preserves the LDW's core function — buying time for verification — while acknowledging that the verification infrastructure may itself be imperfect. It also creates a documented record of attribution uncertainty that can inform post-crisis analysis.

### A.7 Integration with ACP v0.5

ICL operates as a pre-condition layer before ACP enters Emergency Mode. The integration point is explicit:

1. A high-impact incident occurs.
2. ICL activates automatically; LDW begins.
3. ASE classifies all attribution claims entering ACP channels.
4. ACP remains in Containment-State Coordination Mode until one of the following: (a) LDW expires without escalation, or (b) ASE reaches Verified classification.
5. Only then does ACP transition to Emergency Mode with full escalation legitimacy.

This sequence prevents ACP's Emergency Mode from being triggered by politically manufactured certainty rather than verified facts.

### A.8 Failure Modes and Design Honesty

ICL does not guarantee de-escalation. It is designed to convert irreversible cascade risk into staged decision pressure. Four failure modes are acknowledged:

| Failure Mode | Description |
|---|---|
| Sovereignty override | Actors declare de facto certainty and act outside the LDW; ICL degrades to advisory status |
| Parallel reality formation | Competing intelligence ecosystems bypass formal ASE classification |
| Political time compression | Domestic pressure shortens the effective LDW below its formal duration |
| Narrative weaponization | Actors selectively cite confidence bands to justify pre-existing intent |

In all failure modes, ICL still generates a documented record of the attribution trajectory — which feeds the Contribution Registry and PACL for post-crisis accountability purposes.

---

## Addendum B — Pre-Action Commitment Layer (PACL)

| | |
|---|---|
| **Status** | Draft v0.2 — EAMN Specification & Phase Governance |
| **Supplements** | ACP v0.5 |
| **Purpose** | Bind escalation behavior to pre-agreed probabilistic attribution thresholds, and provide a rigorous threat model for how those thresholds fail under adversarial conditions |

### B.1 The Problem

ACP v0.5 tracks what actors do after commitments are made (Contribution Registry) and ICL governs how certainty forms before action. Neither governs the action threshold itself: the moment at which an actor decides that enough certainty exists to justify escalation.

PACL addresses this by asking actors to pre-declare, before any crisis occurs, what level of attribution confidence they require before taking each class of action. These declarations are not legally binding — they are publicly registered expectations that create reputational and procedural friction when violated.

### B.2 Probabilistic Action Thresholding (PAT)

Each ACP participant registers a Pre-Action Commitment Contract (PCC) specifying the minimum ASE confidence band required to authorize each class of response:

| Action Class | Default Minimum Threshold | Notes |
|---|---|---|
| Formal diplomatic protest | Medium (≥40%) | Lowest threshold; minimal irreversibility |
| Economic or sanctions measures | High (≥70%) | Significant but reversible impact |
| Military positioning or readiness change | High (≥70%) | Escalatory signal; requires strong evidence |
| Targeted kinetic response | Verified (≥85%) | Near-irreversible; highest threshold |
| Large-scale escalation | Verified (≥95%) | Reserved for unambiguous, multi-source confirmed events |

Participants may set thresholds above these defaults but not below them. Thresholds are registered publicly on the ACP Contribution Registry and reviewed annually. Divergence between declared thresholds and observed behavior is tracked (see B.4).

**Threshold Review Trigger:** In addition to annual review, a mandatory PCC review is initiated within 30 days of any sovereign override invocation. The review assesses whether the registered threshold remains calibrated to the actor's actual operational context, and whether the override reflects a systemic misalignment rather than a one-time exception. Review outcomes are published on the ACP dashboard.

### B.3 Sovereign Override Clause

Each participant retains an unconditional right to invoke a National Emergency Override, authorizing action below declared thresholds. The override does not require ACP approval. It does require:

- Public declaration within 6 hours of the triggering action.
- A written justification submitted to the ACP Secretariat within 72 hours.
- An automatic review by the Peer Mediation Panel within 14 days.
- A mandatory PCC threshold review within 30 days (see B.2).

Override frequency and justification quality are tracked in the Contribution Registry with a compounding trust discount applied to actors with repeated override invocations. The override is not a violation — it is a named exception with documented consequences for trust weighting in future coordination cycles.

### B.4 Adversarial Threat Model

PACL was stress-tested against six attack vectors. The threat model is published here as part of the protocol specification, not as an appendix, because practitioners need to understand the system's limits before deciding whether to rely on it.

| Attack Vector | Severity | Description and Mitigation Limit |
|---|---|---|
| Threshold inflation at design time | Medium | Actors declare conservative thresholds with no intent to honor them. Mitigation: behavioral consistency tracking; but violations are only visible after action, creating a first-incident lag. |
| Crisis reinterpretation (semantic drift) | High | Actors redefine 'verified' or 'strong evidence' during a crisis to fit available intelligence. Mitigation: ASE definitions are locked at registration; divergence is flagged but not preventable. |
| Attribution laundering | Very High | Actors manufacture or amplify intelligence to push attribution into higher confidence bands. Mitigation: EAMN independence; but sufficiently sophisticated deception can bypass external verification. |
| Selective threshold revelation | High | Actors disclose only favorable commitments in diplomatic contexts while maintaining aggressive internal doctrine. Mitigation: full PCC publication is required; but internal doctrine remains unverifiable. |
| Override normalization | Medium-High | Repeated use of the sovereign override erodes its reputational cost over time. Mitigation: override frequency scoring with compounding trust discount; mandatory PCC review after each invocation. |
| Proxy attribution chaos | Critical | Proxy actors conduct operations specifically to keep attribution below threshold, enabling principals to act on 'insufficient' evidence without PACL legitimacy cost. No mitigation currently exists for this vector. |

*Note on the proxy vector: this is the most significant unresolved vulnerability in PACL. Modern conflict environments are partly structured to exploit attribution ambiguity. PACL slows the legitimization of escalation but cannot close the gap between proxy behavior and principal accountability. This gap is acknowledged here and flagged for the next revision cycle.*

### B.5 Integration with ICL and ACP v0.5

PACL and ICL operate in sequence:

1. ICL produces an ASE confidence classification for a given incident.
2. PACL maps that classification against the actor's registered PCC thresholds.
3. If the ASE band falls below the relevant threshold, escalation is classified as procedurally unauthorized within ACP channels.
4. If the actor acts anyway, the override clause activates and the divergence is logged.

This sequence means that both layers must be active and interoperable for either to function effectively. A participant who registers with PACL but opts out of ICL's ASE classification loses the shared reference point that PACL depends on.

---

## Addendum C — System Regeneration Protocol (SRP)

| | |
|---|---|
| **Status** | Draft v0.2 — EAMN Specification & Phase Governance |
| **Supplements** | ACP v0.5 |
| **Purpose** | Restore minimum viable coordination capacity after systemic fragmentation — without requiring agreement on what caused the fracture or who was responsible |

### C.1 The Problem

ACP v0.5, ICL, and PACL are all designed to prevent or contain breakdown. SRP addresses the condition after prevention has failed: when coordination architecture has fragmented, actors have exited shared frameworks, and the system needs to rebuild without pretending nothing happened.

This is not a hypothetical scenario. Coordination systems fragment regularly — after major attribution disputes, after sovereignty override cycles, after conflicts where one or more parties declare that existing frameworks are illegitimate. SRP is the protocol for what comes next.

**Scope Clarification:** SRP is designed for willing actors seeking to rebuild coordination among themselves. It does not restore universal participation — if a major actor permanently exits the framework, SRP provides a pathway for the remaining coalition to rebuild. Re-engaging permanently absent actors requires separate diplomatic processes outside the SRP scope.

### C.2 Design Principle: Interoperability, Not Unity

SRP does not attempt to restore a unified coordination architecture. It does not require actors to agree on what happened, who was responsible, or whose interpretation of events was correct. These questions may never be resolved.

SRP instead targets a narrower and more achievable goal:

> *Rebuild sufficient shared reference points to enable partial coordination across incompatible governance realities — without requiring either side to concede their account of the fracture.*

This distinction matters operationally. Most post-conflict coordination attempts fail because they are structured as implicit reconciliation processes — requiring actors to behave as if shared frameworks are legitimate before those frameworks have been rebuilt. SRP separates coordination restoration from narrative resolution.

### C.3 Four-Phase Regeneration Sequence

#### Phase 1 — Fracture Acknowledgement

The system formally declares a Multi-Reality State (MRS): an explicit recognition that ACP coordination has partially or fully broken down, that attribution systems are inconsistent across actors, and that existing frameworks are not currently functioning as designed.

This declaration is published on the ACP dashboard. It is not an admission of failure — it is a diagnostic statement that enables honest assessment of what can and cannot be rebuilt.

#### Phase 2 — Minimum Shared Model (MSM)

The MSM defines a thin layer of shared reality constructed exclusively from:

- Observable physical events (documented incidents with time, location, and impact data),
- Verified infrastructural constraints (supply routes, border crossings, communication channels that exist or do not exist),
- Non-contested logistical facts (populations in specific locations, humanitarian needs with independent verification).

The MSM deliberately excludes attribution, intent, responsibility, and interpretive framing. It contains only what all parties can observe independently. This is not a compromise position — it is an intentionally impoverished shared reality designed to be acceptable even to parties with incompatible accounts of what happened.

The MSM is the foundation on which everything else in SRP is built. Without it, no subsequent coordination is possible. With it, even deeply adversarial actors can coordinate on specific, bounded, observable tasks.

The MSM data infrastructure is designed to be compatible with the ACP Situational Awareness Layer (SAL), allowing MSM-verified facts to migrate directly into SAL once strategic stability is re-established.

#### Phase 3 — Interoperability Bridging

Once an MSM exists, SRP introduces Minimal Coordination Contracts (MCCs) — ultra-light agreements scoped to specific observable tasks (humanitarian corridor operation, communication channel reactivation, incident deconfliction in a defined area). MCCs are designed to be acceptable to actors who reject all broader coordination frameworks, because they make no claims about legitimacy, responsibility, or precedent.

#### Phase 4 — Stability Gradient Reconstruction

Coordination capacity is rebuilt incrementally along a non-linear ladder. Regression is explicitly permitted — the ladder does not assume forward progress:

| Stability Level | Description |
|---|---|
| Signal stability | Shared data streams re-established; actors receive the same observable facts |
| Operational stability | Logistics coordination resumes in defined, bounded domains |
| Crisis stability | Partial joint response capability for acute emergencies |
| Strategic stability | Limited trust-based coordination emerges; formal ACP frameworks become viable again |

### C.4 Residual Trust Ledger (RTL)

SRP introduces a Residual Trust Ledger — a record of reliability under crisis conditions that persists through fragmentation cycles. The RTL tracks:

- Past commitment fulfillment during crisis coordination (from the ACP Contribution Registry),
- Override behavior history (from PACL records),
- MCC compliance during SRP phases.

The RTL does not produce a trust score or ranking. It produces a probabilistic coordination weighting: an assessment of how reliably a given actor has honored bounded, specific commitments in the past. This weighting influences — but does not determine — how MCCs are structured in subsequent SRP cycles.

The RTL is designed to be compatible with the anticipated ITL (Informal Trust Ledger) infrastructure referenced in ACP v0.5, Section 5.2.2.

### C.5 What SRP Cannot Do

SRP is an honest protocol. It explicitly acknowledges three conditions under which it provides no recovery path:

| Condition | Why SRP Cannot Address It |
|---|---|
| Permanent fragmentation | Some actors may permanently exit shared coordination frameworks. SRP cannot compel re-entry; it can only reduce the cost of voluntary re-engagement among willing actors. |
| Narrative divergence persistence | Actors may share observable facts while maintaining permanently incompatible interpretations. SRP does not require narrative convergence and cannot produce it. |
| Asymmetric recovery | Actors with greater institutional capacity may rebuild coordination capacity faster, creating imbalances that SRP's non-coercive structure cannot correct. |

### C.6 Integration with ACP v0.5

SRP activates when ACP formally declares a Multi-Reality State. It does not replace ACP — it creates the conditions under which ACP frameworks can become viable again. The relationship is sequential: SRP precedes ACP re-engagement, not the reverse.
