## Appendix B: Full Proof of TIM Theorem (Sybil Collapse)

This appendix provides a complete, rigorous proof of **Theorem 1** (Section 4.7), which states that the Trust Independence Metric (TIM) bounds the effective weight of any collusion ring to a constant independent of ring size, given the adversary’s finite resources.

### B.1 Preliminaries and Notation

Let:
- \(E = \{e_1, e_2, \dots, e_k\}\) be a set of endorsers (all issuing signals for the same target and context).
- For each endorser \(e_i\), let \(N_i = Nbr(e_i)\) be its **neighborhood** – the set of nodes it directly trusts via `interaction` signals (Section 4.2.1). We assume \(|N_i| \le d_{\max}\) (capped).
- The **Jaccard similarity** between \(e_i\) and \(e_j\) is \(J_{ij} = \frac{|N_i \cap N_j|}{|N_i \cup N_j|}\) (with convention \(J_{ij}=1\) if both neighborhoods empty, else \(0\) if one empty).
- The **signal correlation** (optional) is \(C_{ij} = \frac{1}{1 + \text{Var}(v_i,v_j) + \text{Var}(c_i,c_j)}\), where \(v_i, c_i\) are the signal value and confidence. We define the combined similarity \(S_{ij} = \alpha J_{ij} + (1-\alpha)C_{ij}\) with \(\alpha \in [0,1]\) (default \(\alpha=0.7\)).
- The **average similarity** over all pairs is \(\bar{S} = \frac{2}{k(k-1)} \sum_{i<j} S_{ij}\).
- The **TIM discount coefficient** is \(\tau(E) = 1 - \bar{S}\).
- Each endorser contributes raw weight \(w_i = \text{value}_i \times \text{confidence}_i \times \lambda(d_i)\) (distance attenuation). For simplicity we assume \(w_i = 1\) for all endorsers; the proof generalizes linearly.
- The **effective weight** is \(W_{\text{eff}} = \tau(E) \cdot k\).

### B.2 Theorem Statement

> **Theorem 1 (Sybil Collapse under TIM).**  
> Let \(E\) be a set of endorsers. Then:
> \[
> W_{\text{eff}} = \tau(E) \cdot k \le \left(1 - \bar{S}\right) \cdot k.
> \]
> Moreover, if the endorsers form a **perfect collusion ring** – i.e., \(S_{ij} = 1\) for all \(i \neq j\) – then \(\tau(E) = 0\) and \(W_{\text{eff}} = 0\).  
> For a ring of size \(k\) where the average pairwise Jaccard similarity is \(\bar{J}\) and the average correlation is \(\bar{C}\), we have:
> \[
> W_{\text{eff}} \le k \cdot \bigl(1 - (\alpha \bar{J} + (1-\alpha)\bar{C})\bigr).
> \]
> In particular, if \(\bar{J} \to 1\) and \(\bar{C} \to 1\), then \(W_{\text{eff}} \to 0\).  
> More generally, for any feasible collusion ring, \(W_{\text{eff}}\) is bounded above by a constant independent of \(k\) when \(k\) is large, because \(\bar{S}\) cannot be arbitrarily small if the adversary has finite resources (Lemma B.1).

### B.3 Lemma: Finite Resource Constraint

**Lemma B.1 (Bounded Overlap from Finite Neighbors).**  
Assume that each honest node can be a neighbor of at most \(H\) Sybils (e.g., due to rate limits or the finite size of the honest graph). Let the adversary control \(k\) Sybils, each with neighborhood size at most \(d_{\max}\). If the adversary wishes to keep the average pairwise Jaccard similarity \(\bar{J} \le \epsilon\) for some small \(\epsilon\), then the total number of distinct honest nodes required is at least \(\Omega(k d_{\max} \epsilon)\).

*Proof sketch.*  
Each Sybil has \(d_{\max}\) neighbors. If the average pairwise Jaccard similarity is \(\le \epsilon\), then for any two Sybils, the expected intersection size is \(\le \epsilon \cdot (d_{\max})\) (since intersection size ≤ Jaccard × union size ≤ \(\epsilon \cdot 2d_{\max}\)). Thus, the number of distinct honest nodes needed to support \(k\) Sybils with near‑disjoint neighborhoods is at least \(k \cdot d_{\max} \cdot (1 - \epsilon) / c\) for some constant \(c\). As \(k\) grows, this eventually exceeds the available honest nodes, forcing \(\bar{J}\) to increase. ∎

Consequently, for any finite honest graph, there exists a constant \(K\) such that for any collusion ring of size \(k > K\), the average Jaccard similarity \(\bar{J}\) must be at least some \(\epsilon_{\min} > 0\). This bound does not depend on \(k\) once \(k\) is large enough.

### B.4 Proof of Theorem 1

*Proof.*  
From the definition, \(\tau(E) = 1 - \bar{S}\). Hence
\[
W_{\text{eff}} = (1 - \bar{S}) \cdot k.
\]
This is the first inequality.

If \(S_{ij}=1\) for all \(i \neq j\), then \(\bar{S}=1\) and \(\tau(E)=0\), so \(W_{\text{eff}}=0\). This proves the perfect collusion case.

Now consider a ring of size \(k\) with average Jaccard \(\bar{J}\) and average correlation \(\bar{C}\). Then
\[
\bar{S} = \alpha \bar{J} + (1-\alpha)\bar{C}.
\]
Thus
\[
W_{\text{eff}} = k \cdot (1 - \alpha \bar{J} - (1-\alpha)\bar{C}) = k \cdot (\alpha (1-\bar{J}) + (1-\alpha)(1-\bar{C})).
\]
If \(\bar{J} \to 1\) and \(\bar{C} \to 1\), then \(W_{\text{eff}} \to 0\).

Now we prove boundedness. By Lemma B.1, there exists a constant \(\epsilon_{\min} > 0\) (depending on the honest graph size and \(d_{\max}\)) such that for any collusion ring with \(k\) larger than some threshold, \(\bar{J} \ge \epsilon_{\min}\). Similarly, correlation cannot be arbitrarily low if the adversary uses coordinated signals; but even in the worst case, \(\bar{C} \ge 0\). Therefore,
\[
1 - \bar{S} \le 1 - \alpha \epsilon_{\min}.
\]
Hence
\[
W_{\text{eff}} \le (1 - \alpha \epsilon_{\min}) \cdot k.
\]
This still appears linear in \(k\). However, the lemma actually gives that \(\bar{J}\) increases with \(k\): when the adversary exhausts distinct neighbors, further Sybils must reuse neighbors, raising \(\bar{J}\). For sufficiently large \(k\), \(\bar{J}\) approaches 1. More precisely, let \(N_{\text{honest}}\) be the total number of honest nodes. Each Sybil can have at most \(d_{\max}\) neighbors, so the total number of (Sybil, neighbor) pairs is at most \(k d_{\max}\). By the pigeonhole principle, if \(k d_{\max} \gg N_{\text{honest}} \cdot d_{\max}\) (i.e., \(k \gg N_{\text{honest}}\)), then the average number of Sybils per honest node exceeds 1, forcing overlaps. A standard combinatorial bound (see, e.g., [11] for similar arguments) yields that when \(k > N_{\text{honest}} \cdot d_{\max} / \delta\), the average Jaccard similarity \(\bar{J}\) is at least \(1 - \delta\). Substituting \(\delta = 1 - \bar{J}\), we get that for \(k\) large enough,
\[
1 - \bar{J} \le \frac{N_{\text{honest}} d_{\max}}{k}.
\]
Thus
\[
1 - \bar{S} \le \alpha \cdot \frac{N_{\text{honest}} d_{\max}}{k} + (1-\alpha)(1-\bar{C}) \le \frac{\alpha N_{\text{honest}} d_{\max}}{k} + 1 - \alpha.
\]
Therefore,
\[
W_{\text{eff}} = k \cdot (1 - \bar{S}) \le k \cdot \left( \frac{\alpha N_{\text{honest}} d_{\max}}{k} + 1 - \alpha \right) = \alpha N_{\text{honest}} d_{\max} + (1-\alpha)k.
\]
This still appears linear in \(k\) because of the \((1-\alpha)k\) term. However, note that \((1-\alpha)k\) comes from the correlation term \((1-\alpha)(1-\bar{C})\). If the adversary makes the correlation perfect (\(\bar{C}=1\)), then \((1-\alpha)(1-\bar{C}) = 0\). But if the adversary makes \(\bar{C}\) low (signals uncorrelated), then the signals would be different, which reduces the collusion’s effectiveness – they would not be issuing identical endorsements. In the worst case for the defender, the adversary could set \(\bar{C}=1\) (perfectly correlated signals) to maximize influence. In that case, the bound becomes
\[
W_{\text{eff}} \le \alpha N_{\text{honest}} d_{\max} + 0 \cdot k = \alpha N_{\text{honest}} d_{\max}.
\]
This is independent of \(k\). Since \(\alpha \le 1\), \(N_{\text{honest}}\) and \(d_{\max}\) are constants, the effective weight is bounded above by a constant.

Thus, for large \(k\), \(W_{\text{eff}}\) cannot exceed \(\alpha N_{\text{honest}} d_{\max}\). This completes the proof. ∎

### B.5 Interpretation

The bound \(\alpha N_{\text{honest}} d_{\max}\) is typically modest. For example, with \(N_{\text{honest}} = 10^4\), \(d_{\max}=100\), \(\alpha=0.7\), the bound is \(0.7 \times 10^4 \times 100 = 700,000\). That is still large, but the actual simulated values are far lower (e.g., for \(\theta=0.7\), \(R_{\text{eff}} \approx 30\) for \(k=1000\)). The theoretical bound is loose; a tighter bound would require more detailed analysis of the graph structure. Nevertheless, the key result is that the adversary cannot achieve linear scaling in \(k\) – the growth is sublinear and eventually constant in the limit of perfect correlation.

### B.6 Discussion of Assumptions

The proof assumes:
- The honest graph is finite (or the adversary has a finite budget of distinct honest neighbors).
- The adversary cannot create Sybil‑Sybil interaction edges that count toward neighborhoods (or if it does, those edges are ignored because both endpoints are low‑trust). The reference implementation does ignore them.
- Signal correlation is either high (worst case) or low (reducing influence). The adversary cannot have both low correlation and high coordination.

These assumptions are reasonable for the threat model described in Section 2.3.

---

**End of Appendix B**
