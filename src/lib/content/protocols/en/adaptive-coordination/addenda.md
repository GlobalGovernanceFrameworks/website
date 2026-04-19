# Adaptive Coordination Protocol

## Supplementary Addenda

Addendum A — Interpretation Containment Layer (ICL)

Addendum B — Pre-Action Commitment Layer (PACL)

Addendum C — System Regeneration Protocol (SRP)

|                 |                                                              |
|-----------------|--------------------------------------------------------------|
| **Tier**        | 3 (Cross-Cutting Protocol)                                    |
| **Supplements** | ACP v0.5 — Refinement & Realism Upgrade                       |
| **Status**      | Draft v0.1 — For practitioner review                          |
| **Purpose**     | Address the pre-coordination gap: the failure modes that occur before and between formal ACP activation states |

|         |                                                                                                                                                                                                                 |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **WHY** | *ACP v0.5 governs coordination under uncertainty. These addenda address an adjacent problem: the dynamics that determine whether coordination is even possible — how meaning forms under pressure, how action thresholds hold under stress, and how systems recover after they fracture.* |

---

## Addendum A — Interpretation Containment Layer (ICL)

|                 |                                                                                                                       |
|-----------------|-----------------------------------------------------------------------------------------------------------------------|
| **Status**      | Draft v0.1 — Pre-Coordination Cognitive Stabilization                                                                 |
| **Supplements** | ACP v0.5                                                                                                              |
| **Purpose**     | Slow and structure the formation of political meaning under high-stakes ambiguity, preventing premature narrative closure from triggering irreversible escalation before ACP coordination can engage |

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

| Confidence Band   | Threshold | Operational Meaning                                                                 |
|-------------------|-----------|-------------------------------------------------------------------------------------|
| Low               | <40%      | Multiple actors plausible; no dominant hypothesis                                    |
| Medium            | 40–69%    | Convergent suspicion; insufficient for action authorization                          |
| High (Strong Evidence) | 70–84% | Substantial corroboration; eligible for limited diplomatic response                |
| Verified          | ≥85%      | Multi-source confirmation; full action legitimacy restored                           |

Classification requires corroboration from at least two independent source categories (e.g., signals intelligence, human intelligence, third-party verification, physical evidence). Single-source claims are capped at Medium regardless of internal confidence levels.

### A.4 Narrative Separation Layer

A key failure mode in acute crises is cascade certainty amplification: intelligence assessments are imported into political narratives, which are imported into media framing, which then feeds back into political demands for action — all within hours. Each transfer inflates confidence without adding evidence.

ICL interrupts this cascade by requiring that each information stream maintain its own confidence classification:

- Intelligence assessments must be labeled with ASE band and source count.
- Political statements in formal ACP channels must reference the ASE classification, not assert independent certainty.
- Media monitoring (via the ACP Narrative Commons) tracks narrative divergence from verified attribution levels.

Certainty cannot migrate between streams without an explicit translation step that preserves the original confidence classification. This does not prevent political actors from making public claims — it prevents those claims from being recognized as procedurally valid within the ACP system until the ASE threshold is met.

### A.5 External Attribution Mediation Node (EAMN)

ICL requires a neutral, technically credible third party to aggregate evidence streams and publish probabilistic attribution assessments. This function is not a court or arbitration body — it issues non-binding confidence syntheses that participants may use to calibrate their own assessments.

Suitable EAMN hosts include existing institutions with technical verification capacity: the IAEA (for nuclear-adjacent incidents), UN-affiliated monitoring bodies, or designated neutral-state verification units. The EAMN does not determine guilt; it publishes evidence-weighted confidence bands.

### A.6 Integration with ACP v0.5

ICL operates as a pre-condition layer before ACP enters Emergency Mode. The integration point is explicit:

1. A high-impact incident occurs.
2. ICL activates automatically; LDW begins.
3. ASE classifies all attribution claims entering ACP channels.
4. ACP remains in Containment-State Coordination Mode until one of the following: (a) LDW expires without escalation, or (b) ASE reaches Verified classification.
5. Only then does ACP transition to Emergency Mode with full escalation legitimacy.

This sequence prevents ACP's Emergency Mode from being triggered by politically manufactured certainty rather than verified facts.

### A.7 Failure Modes and Design Honesty

ICL does not guarantee de-escalation. It is designed to convert irreversible cascade risk into staged decision pressure. Four failure modes are acknowledged:

| Failure Mode                | Description                                                                                     |
|-----------------------------|-------------------------------------------------------------------------------------------------|
| Sovereignty override        | Actors declare de facto certainty and act outside the LDW; ICL degrades to advisory status       |
| Parallel reality formation  | Competing intelligence ecosystems bypass formal ASE classification                               |
| Political time compression  | Domestic pressure shortens the effective LDW below its formal duration                           |
| Narrative weaponization     | Actors selectively cite confidence bands to justify pre-existing intent                          |

In all failure modes, ICL still generates a documented record of the attribution trajectory — which feeds the Contribution Registry and CIL (Addendum B) for post-crisis accountability purposes.

---

## Addendum B — Pre-Action Commitment Layer (PACL)

|                 |                                                                                                                       |
|-----------------|-----------------------------------------------------------------------------------------------------------------------|
| **Status**      | Draft v0.1 — Action Threshold Governance                                                                              |
| **Supplements** | ACP v0.5                                                                                                              |
| **Purpose**     | Bind escalation behavior to pre-agreed probabilistic attribution thresholds, and provide a rigorous threat model for how those thresholds fail under adversarial conditions |

### B.1 The Problem

ACP v0.5 tracks what actors do after commitments are made (Contribution Registry) and ICL governs how certainty forms before action. Neither governs the action threshold itself: the moment at which an actor decides that enough certainty exists to justify escalation.

PACL addresses this by asking actors to pre-declare, before any crisis occurs, what level of attribution confidence they require before taking each class of action. These declarations are not legally binding — they are publicly registered expectations that create reputational and procedural friction when violated.

### B.2 Probabilistic Action Thresholding (PAT)

Each ACP participant registers a Pre-Action Commitment Contract (PCC) specifying the minimum ASE confidence band required to authorize each class of response:

| Action Class                        | Default Minimum Threshold | Notes                                                                 |
|-------------------------------------|--------------------------|-----------------------------------------------------------------------|
| Formal diplomatic protest           | Medium (≥40%)            | Lowest threshold; minimal irreversibility                              |
| Economic or sanctions measures      | High (≥70%)              | Significant but reversible impact                                      |
| Military positioning or readiness change | High (≥70%)          | Escalatory signal; requires strong evidence                            |
| Targeted kinetic response           | Verified (≥85%)          | Near-irreversible; highest threshold                                   |
| Large-scale escalation              | Verified (≥95%)          | Reserved for unambiguous, multi-source confirmed events                |

Participants may set thresholds above these defaults but not below them. Thresholds are registered publicly on the ACP Contribution Registry and reviewed annually. Divergence between declared thresholds and observed behavior is tracked (see B.4).

### B.3 Sovereign Override Clause

Each participant retains an unconditional right to invoke a National Emergency Override, authorizing action below declared thresholds. The override does not require ACP approval. It does require:

- Public declaration within 6 hours of the triggering action.
- A written justification submitted to the ACP Secretariat within 72 hours.
- An automatic review by the Peer Mediation Panel within 14 days.

Override frequency and justification quality are tracked in the Contribution Registry. The override is not a violation — it is a named exception with documented consequences for trust weighting in future coordination cycles.

### B.4 Adversarial Threat Model

PACL was stress-tested against six attack vectors. The threat model is published here as part of the protocol specification, not as an appendix, because practitioners need to understand the system's limits before deciding whether to rely on it.

| Attack Vector                    | Severity      | Description and Mitigation Limit                                                                                                                                                                             |
|----------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Threshold inflation at design time | Medium       | Actors declare conservative thresholds with no intent to honor them. Mitigation: behavioral consistency tracking (B.4); but violations are only visible after action, creating a first-incident lag.            |
| Crisis reinterpretation (semantic drift) | High   | Actors redefine 'verified' or 'strong evidence' during a crisis to fit available intelligence. Mitigation: ASE definitions are locked at registration; divergence is flagged but not preventable.              |
| Attribution laundering           | Very High     | Actors manufacture or amplify intelligence to push attribution into higher confidence bands. Mitigation: EAMN independence; but sufficiently sophisticated deception can bypass external verification.         |
| Selective threshold revelation   | High          | Actors disclose only favorable commitments in diplomatic contexts while maintaining aggressive internal doctrine. Mitigation: full PCC publication is required; but internal doctrine remains unverifiable.    |
| Override normalization           | Medium-High   | Repeated use of the sovereign override erodes its reputational cost over time. Mitigation: override frequency scoring with compounding trust discount; no hard limit.                                         |
| Proxy attribution chaos          | Critical      | Proxy actors conduct operations specifically to keep attribution below threshold, enabling principals to act on 'insufficient' evidence without PACL legitimacy cost. No mitigation currently exists for this vector. |

*Note on the proxy vector: this is the most significant unresolved vulnerability in PACL. Modern conflict environments are partly structured to exploit attribution ambiguity. PACL slows the legitimization of escalation but cannot close the gap between proxy behavior and principal accountability.*

### B.5 Integration with ICL and ACP v0.5

PACL and ICL operate in sequence:

1. ICL produces an ASE confidence classification for a given incident.
2. PACL maps that classification against the actor's registered PCC thresholds.
3. If the ASE band falls below the relevant threshold, escalation is classified as procedurally unauthorized within ACP channels.
4. If the actor acts anyway, the override clause activates and the divergence is logged.

This sequence means that both layers must be active and interoperable for either to function effectively. A participant who registers with PACL but opts out of ICL's ASE classification loses the shared reference point that PACL depends on.

---

## Addendum C — System Regeneration Protocol (SRP)

|                 |                                                                                                                       |
|-----------------|-----------------------------------------------------------------------------------------------------------------------|
| **Status**      | Draft v0.1 — Post-Fracture Re-Coherence Framework                                                                     |
| **Supplements** | ACP v0.5                                                                                                              |
| **Purpose**     | Restore minimum viable coordination capacity after systemic fragmentation — without requiring agreement on what caused the fracture or who was responsible |

### C.1 The Problem

ACP v0.5, ICL, and PACL are all designed to prevent or contain breakdown. SRP addresses the condition after prevention has failed: when coordination architecture has fragmented, actors have exited shared frameworks, and the system needs to rebuild without pretending nothing happened.

This is not a hypothetical scenario. Coordination systems fragment regularly — after major attribution disputes, after sovereignty override cycles, after conflicts where one or more parties declare that existing frameworks are illegitimate. SRP is the protocol for what comes next.

### C.2 Design Principle: Interoperability, Not Unity

SRP does not attempt to restore a unified coordination architecture. It does not require actors to agree on what happened, who was responsible, or whose interpretation of events was correct. These questions may never be resolved.

SRP instead targets a narrower and more achievable goal:

|         |                                                                                                                                                                                                                             |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **GOAL** | *Rebuild sufficient shared reference points to enable partial coordination across incompatible governance realities — without requiring either side to concede their account of the fracture.* |

This distinction matters operationally. Most post-conflict coordination attempts fail because they are structured as implicit reconciliation processes — requiring actors to behave as if shared frameworks are legitimate before those frameworks have been rebuilt. SRP separates coordination restoration from narrative resolution.

### C.3 Four-Phase Regeneration Sequence

#### Phase 1 — Fracture Acknowledgement

The system formally declares a Multi-Reality State (MRS): an explicit recognition that ACP coordination has partially or fully broken down, that attribution systems are inconsistent across actors, and that existing frameworks are not currently functioning as designed.

This declaration is published on the ACP dashboard. It is not an admission of failure — it is a diagnostic statement that enables honest assessment of what can and cannot be rebuilt.

#### Phase 2 — Minimum Shared Model (MSM)

The MSM is the only element of SRP that is genuinely novel relative to existing ACP infrastructure. It defines a thin layer of shared reality constructed exclusively from:

- Observable physical events (documented incidents with time, location, and impact data),
- Verified infrastructural constraints (supply routes, border crossings, communication channels that exist or do not exist),
- Non-contested logistical facts (populations in specific locations, humanitarian needs with independent verification).

The MSM deliberately excludes: attribution, intent, responsibility, and interpretive framing. It contains only what all parties can observe independently. This is not a compromise position — it is an intentionally impoverished shared reality designed to be acceptable even to parties with incompatible accounts of what happened.

The MSM is the foundation on which everything else in SRP is built. Without it, no subsequent coordination is possible. With it, even deeply adversarial actors can coordinate on specific, bounded, observable tasks.

#### Phase 3 — Interoperability Bridging

Once an MSM exists, SRP introduces translation interfaces between the governance logics of actors operating under different frameworks. These are not merger mechanisms — they allow systems that disagree to coordinate partially without either adopting the other's framework.

In practice this means: Minimal Coordination Contracts (MCCs) — ultra-light agreements scoped to specific observable tasks (humanitarian corridor operation, communication channel reactivation, incident deconfliction in a defined area). MCCs are designed to be acceptable to actors who reject all broader coordination frameworks, because they make no claims about legitimacy, responsibility, or precedent.

#### Phase 4 — Stability Gradient Reconstruction

Coordination capacity is rebuilt incrementally along a non-linear ladder. Regression is explicitly permitted — the ladder does not assume forward progress:

| Stability Level        | Description                                                                          |
|------------------------|--------------------------------------------------------------------------------------|
| Signal stability       | Shared data streams re-established; actors receive the same observable facts          |
| Operational stability  | Logistics coordination resumes in defined, bounded domains                            |
| Crisis stability       | Partial joint response capability for acute emergencies                               |
| Strategic stability    | Limited trust-based coordination emerges; formal ACP frameworks become viable again   |

### C.4 Residual Trust Ledger (RTL)

SRP introduces a Residual Trust Ledger — a record of reliability under crisis conditions that persists through fragmentation cycles. The RTL tracks:

- Past commitment fulfillment during crisis coordination (from the ACP Contribution Registry),
- Override behavior history (from PACL records),
- MCC compliance during SRP phases.

The RTL does not produce a trust score or ranking. It produces a probabilistic coordination weighting: an assessment of how reliably a given actor has honored bounded, specific commitments in the past. This weighting influences — but does not determine — how MCCs are structured in subsequent SRP cycles.

The RTL is designed to be compatible with the anticipated ITL (Informal Trust Ledger) infrastructure referenced in ACP v0.5, Section 5.2.2.

### C.5 What SRP Cannot Do

SRP is an honest protocol. It explicitly acknowledges three conditions under which it provides no recovery path:

| Condition                     | Why SRP Cannot Address It                                                                                                                                                                    |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Permanent fragmentation       | Some actors may permanently exit shared coordination frameworks. SRP cannot compel re-entry; it can only reduce the cost of voluntary re-engagement.                                          |
| Narrative divergence persistence | Actors may share observable facts while maintaining permanently incompatible interpretations. SRP does not require narrative convergence and cannot produce it.                                 |
| Asymmetric recovery           | Actors with greater institutional capacity may rebuild coordination capacity faster, creating imbalances that SRP's non-coercive structure cannot correct.                                    |

### C.6 Integration with ACP v0.5

SRP activates when ACP formally declares a Multi-Reality State. It does not replace ACP — it creates the conditions under which ACP frameworks can become viable again. The relationship is sequential: SRP precedes ACP re-engagement, not the reverse.

The MSM data infrastructure is designed to be compatible with the ACP Situational Awareness Layer (SAL), allowing MSM-verified facts to migrate directly into SAL once strategic stability is re-established.

---

## Full Stack Reference

These addenda complete the pre-coordination layer of the ACP governance stack. The full architecture, in operational sequence:

| Layer             | Component         | Function                                                                                   |
|-------------------|-------------------|--------------------------------------------------------------------------------------------|
| Pre-coordination  | ICL (Addendum A)  | Slows narrative certainty formation; prevents premature escalation trigger                   |
| Pre-coordination  | PACL (Addendum B) | Governs action thresholds before crisis; documents divergence                                 |
| Active coordination | ACP v0.5        | Allocates resources, manages participation tiers, tracks contributions                        |
| Post-fracture     | SRP (Addendum C)  | Rebuilds minimum coordination capacity after systemic breakdown                              |

*The system does not guarantee de-escalation. It converts unstructured escalation risk into staged, observable, partially reversible decision sequences — and provides a recovery path when those sequences fail.*
