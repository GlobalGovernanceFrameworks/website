## Appendix D: Parameter Recommendation Table

This appendix lists the configurable parameters used throughout ITP, their default values, the section where they are defined, and the rationale for each choice. Nodes may deviate from these defaults based on local policy, risk tolerance, or application requirements.

### D.1 Core Trust Parameters

| Parameter | Symbol | Default | Section | Rationale |
|-----------|--------|---------|---------|-----------|
| Distance attenuation (hop 1) | λ(1) | 1.0 | 3.4.2 | Direct interactions carry full weight. |
| Distance attenuation (hop 2) | λ(2) | 0.5 | 3.4.2 | Friends‑of‑friends are half as credible. |
| Distance attenuation (hop 3) | λ(3) | 0.1 | 3.4.2 | Very distant signals are heavily discounted. |
| Distance attenuation (hop ≥4) | λ(≥4) | 0.0 | 3.4.2 | Ignored – beyond useful variety. |
| Max neighborhood size | d_max | 100 | 4.2.1 | Limits storage and computation; sampling ensures statistical representativeness. |
| TIM topology weight | α | 0.7 | 4.2.3 | Emphasizes structural overlap over signal correlation (70/30). |
| TIM sampling threshold | k' | 50 | 4.5.1 | Sufficient for ε=0.05, δ=0.01; keeps computation ~2 ms. |
| TIM cache TTL | — | 1 hour | 4.5.2 | Balances freshness vs. computational cost. |

### D.2 Trust Signal Parameters

| Parameter | Symbol | Default | Section | Rationale |
|-----------|--------|---------|---------|-----------|
| Signal expiry (typical) | `expiry` | 90 days | 3.2.1 | Long enough to be useful, short enough to enforce impermanence. |
| Max signal age (storage) | — | 1 year | 9.2.3 | Prevents unbounded storage growth; older signals are obsolete. |
| Grace period after expiry | — | 1 day | 9.2.3 | Allows propagation of signals that expire while in transit. |
| Minimum confidence for shock propagation | — | 0.5 | 5.1.2 | Only high‑confidence endorsements trigger liability. |
| Liability window (lookback) | — | 90 days | 5.2.5 | Endorsements older than this do not incur shock penalties. |

### D.3 Bootstrapping Parameters

| Parameter | Symbol | Default | Section | Rationale |
|-----------|--------|---------|---------|-----------|
| Velocity limit (low‑stakes trust per day) | Δ_max | 0.05 | 6.3.1 | Reaches τ=0.8 in 16 days; deters Sybil farming. |
| Max confidence for low‑stakes signals | c_max(low) | 0.3 | 6.3.2 | Low‑stakes interactions are inherently low‑information. |
| High‑stakes trust threshold | τ_high | 0.8 | 6.3.1 | Requires substantial accumulated trust for sensitive actions. |
| Max low‑stakes interactions per day | r_max | 100 | 6.3.4 | Rate limit to prevent flooding. |
| Proof‑of‑work difficulty (low‑stakes) | — | 20 bits (~1 ms CPU) | 6.4.1 | Raises cost of spam without burdening honest nodes. |
| Micro‑payment (optional) | c_low | $0.001 | 6.4.1 | Economic deterrent for large‑scale Sybil attacks. |

### D.4 Shock Propagation and Calibration

| Parameter | Symbol | Default | Section | Rationale |
|-----------|--------|---------|---------|-----------|
| Min constraints to trigger propagation | M | 5 | 5.4.2 | Prevents single false accusation. |
| TIM threshold for constraint acceptance | τ_constraint | 0.5 | 5.4.3 | Constraints from a collusion ring are ignored. |
| Propagation depth | L | 1 | 5.2.2 | Only direct endorsers are penalized; deeper cascades are optional. |
| Propagation decay factor | γ | 0.5 | 5.2.2 | Each hop halves the penalty. |
| Appeal window | — | 7 days | 5.4.8 | Time for target to respond with counter‑proof. |
| Rollback window | — | 30 days | 5.4.8 | Penalties can be reversed within this period. |

### D.5 Scale‑Adaptive Fields (SAF)

| Parameter | Symbol | Default | Section | Rationale |
|-----------|--------|---------|---------|-----------|
| Minimum members to form SAF | K_min | 5 | 7.2.4 | Avoids small, easily colluded groups. |
| SAF TTL (initial) | — | 24 hours | 7.4.1 | Long enough for most crises, short enough to prevent ossification. |
| Coordinator epoch length | — | 5 minutes | 7.3.3 | Balances responsiveness and overhead. |
| VRF seed source | — | Hash of previous manifest | 7.3.2 | Deterministic, unpredictable, and verifiable. |

### D.6 Network and Storage

| Parameter | Symbol | Default | Section | Rationale |
|-----------|--------|---------|---------|-----------|
| Number of relays per node | N_relay | 8 | 9.5.2 | Eclipse probability `<` 10⁻⁸ with 10% adversarial relays. |
| Max database size | — | 1 GB | 9.2.3 | Prevents storage exhaustion on resource‑constrained nodes. |
| Gossip TTL (hops) | — | 3 | 3.3.5 | Matches distance attenuation; signals beyond 3 hops are irrelevant. |
| Rate limit (signals per issuer per hour) | — | 100 | 3.3.6 | Prevents flooding. |
| Dandelion stem length (mean) | — | 5 hops | 8.4.2 | Provides source anonymity at low latency cost. |

### D.7 Cryptographic Parameters

| Parameter | Default | Section | Rationale |
|-----------|---------|---------|-----------|
| Signature algorithm | Ed25519 | 9.3.1 | Fast, secure, deterministic. |
| Hash function | BLAKE3 | 9.3.2 | High performance, parallelizable. |
| ZK proof system | Groth16 (BN254) | 9.3.3 | Small proofs, fast verification; trusted setup required. |
| Post‑quantum fallback | ML‑DSA‑65 (future) | 9.3.8 | Planned migration path. |
| Multicodec prefix | Required | 9.3.5 | Enables cryptographic agility. |

---

These defaults are recommendations. Implementations may adjust parameters based on local risk assessment, performance constraints, or specific application requirements. The reference implementation uses these defaults unless overridden by configuration.

---

**End of Appendix D**
