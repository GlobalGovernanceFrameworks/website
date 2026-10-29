## Appendix A: Pseudocode

This appendix provides high‑level pseudocode for the core algorithms of the Immanent Trust Protocol (ITP). The pseudocode is written in a Python‑like style for readability; the reference implementation in Rust follows the same logic.

---

### A.1 Local Trust State (LTS) Computation

**Input**: 
- `target`: public key of the node being evaluated  
- `context`: trust domain (e.g., `"file‑sharing"`)  
- `local_db`: local store of Trust Signals (SQLite)  
- `trusted_peers`: dictionary of direct trust weights (cached from previous LTS evaluations)  

**Output**: LTS value in \([-1, 1]\)

```python
def compute_lts(target, context, local_db, trusted_peers):
    # Step 1: Retrieve all relevant signals from local store
    signals = local_db.query(
        subject_pubkey = target,
        context = context,
        expiry > now()
    )
    
    # Step 2: Separate direct signals (issuer == evaluator) from endorsements
    direct_contrib = 0.0
    direct_weight = 0.0
    endorsers = []       # list of (issuer, signal) for endorsements
    
    for sig in signals:
        if sig.issuer == my_pubkey:
            # direct interaction: distance = 1, lambda = 1.0, no TIM discount
            contrib = sig.value * sig.confidence
            direct_contrib += contrib
            direct_weight += sig.confidence
        else:
            endorsers.append((sig.issuer, sig))
    
    # Step 3: Compute distance attenuation for each endorser
    # For simplicity, we assume we have a function distance_to(issuer)
    # that returns the shortest hop count using interaction edges.
    weighted_contrib = []
    weight_sum = 0.0
    for issuer, sig in endorsers:
        d = distance_to(issuer)   # 1, 2, or 3 (≥4 ignored)
        if d > 3:
            continue
        lambda_d = {1:1.0, 2:0.5, 3:0.1}[d]
        raw_contrib = sig.value * sig.confidence * lambda_d
        weighted_contrib.append((issuer, raw_contrib, sig.confidence * lambda_d))
        weight_sum += sig.confidence * lambda_d
    
    # Step 4: Apply TIM discount to endorsers (if any)
    if endorsers:
        endorser_pubkeys = [issuer for (issuer, _) in weighted_contrib]
        tau = compute_tim(endorser_pubkeys, local_db)   # see A.2
        # Discount all endorser contributions and weights
        discounted_contrib = sum(rc for (_, rc, _) in weighted_contrib) * tau
        discounted_weight = sum(w for (_, _, w) in weighted_contrib) * tau
    else:
        discounted_contrib = 0.0
        discounted_weight = 0.0
    
    # Step 5: Aggregate
    total_contrib = direct_contrib + discounted_contrib
    total_weight = direct_weight + discounted_weight
    
    if total_weight == 0:
        return 0.0
    return total_contrib / total_weight
```

---

### A.2 Trust Independence Metric (TIM)

**Input**:
- `endorsers`: list of public keys of endorsers  
- `local_db`: local store (to retrieve neighborhoods and signal values)  
- `alpha` = 0.7 (weight for topology vs. correlation)  
- `d_max` = 100 (maximum neighborhood size)  
- `sample_size` = 50 (for large sets; if `len(endorsers) > sample_size`, randomly sample)  

**Output**: TIM discount factor \(\tau \in [0,1]\)

```python
def compute_tim(endorsers, local_db, alpha=0.7, d_max=100, sample_size=50):
    k = len(endorsers)
    if k <= 1:
        return 1.0
    
    # Optional sampling
    if k > sample_size:
        endorsers = random.sample(endorsers, sample_size)
        k = len(endorsers)
    
    # Retrieve neighborhoods (sets of public keys trusted directly via interaction)
    neighborhoods = {}
    for e in endorsers:
        nbrs = local_db.get_interaction_neighbors(e, limit=d_max)
        neighborhoods[e] = set(nbrs)
    
    # Retrieve signal values and confidences (if available)
    sig_values = {}
    sig_confs = {}
    for e in endorsers:
        sig = local_db.get_latest_signal(e, subject=target)  # target known from context
        if sig:
            sig_values[e] = sig.value
            sig_confs[e] = sig.confidence
    
    total_similarity = 0.0
    pair_count = 0
    
    for i in range(k):
        for j in range(i+1, k):
            e_i = endorsers[i]
            e_j = endorsers[j]
            
            # Jaccard similarity
            ni = neighborhoods[e_i]
            nj = neighborhoods[e_j]
            if len(ni) == 0 and len(nj) == 0:
                j_sim = 1.0
            elif len(ni) == 0 or len(nj) == 0:
                j_sim = 0.0
            else:
                inter = len(ni & nj)
                union = len(ni | nj)
                j_sim = inter / union if union > 0 else 0.0
            
            # Signal correlation (if both have signals)
            c_sim = 0.0
            if e_i in sig_values and e_j in sig_values:
                vi, vj = sig_values[e_i], sig_values[e_j]
                ci, cj = sig_confs[e_i], sig_confs[e_j]
                var_v = ((vi - vj)**2) / 2   # variance of two samples
                var_c = ((ci - cj)**2) / 2
                c_sim = 1.0 / (1.0 + var_v + var_c)
            
            # Combined similarity
            s_ij = alpha * j_sim + (1.0 - alpha) * c_sim
            total_similarity += s_ij
            pair_count += 1
    
    avg_sim = total_similarity / pair_count if pair_count > 0 else 0.0
    tau = max(0.0, min(1.0, 1.0 - avg_sim))
    return tau
```

---

### A.3 Trust Shock Propagation (Backward Penalty)

**Input**:
- `defector`: public key of the node that defected  
- `severity`: magnitude of defection (e.g., absolute value of constraint signal)  
- `liability_window_days`: lookback for endorsements (default 90 days)  
- `max_depth`: propagation depth (default 1)  
- `decay_factor`: penalty reduction per hop (default 0.5)  
- `local_db`: local store  

**Output**: Updates trust weight multipliers in local_db

```python
def propagate_shock(defector, severity, local_db,
                    liability_window=90, max_depth=1, decay=0.5):
    # Queue of (node, depth)
    queue = [(defector, 0)]
    visited = set()
    
    while queue:
        node, depth = queue.pop(0)
        if node in visited or depth > max_depth:
            continue
        visited.add(node)
        
        # Find all endorsers of this node within liability window
        endorsers = local_db.get_endorsers(
            subject = node,
            type = "endorsement",
            after = now() - liability_window*days
        )
        
        for endorser, confidence in endorsers:
            # Penalty amount
            penalty = confidence * severity * (decay ** depth)
            # Apply penalty to endorser's trust weight multiplier
            current = local_db.get_trust_weight(endorser)
            new_weight = current * (1.0 - penalty)
            local_db.set_trust_weight(endorser, new_weight)
            
            # Add endorser to queue for next depth (if within depth limit)
            if depth + 1 < max_depth:
                queue.append((endorser, depth + 1))
```

---

### A.4 Scale‑Adaptive Field: Rotating Coordinator Lottery

**Input**:
- `field_members`: list of public keys in the SAF  
- `seed`: random seed (e.g., hash of previous epoch’s final action)  
- `trust_weights`: dictionary mapping member → current trust weight (LTS of the member as seen by the field)  
- `tim_discount`: TIM discount factor for the membership set (pre‑computed)  

**Output**: Selected coordinator public key

```python
def select_coordinator(field_members, seed, trust_weights, tim_discount):
    # Adjust weights by TIM discount (already applied to membership)
    # Each member's lottery weight = trust_weights[member] * tim_discount
    # However, trust_weights already incorporate local trust; we simply use them.
    
    # Build cumulative distribution
    members = list(field_members)
    weights = [trust_weights[m] for m in members]
    total_weight = sum(weights)
    if total_weight == 0:
        # Fallback: uniform random
        return random.choice(members)
    
    # Deterministic random number from seed (e.g., using VRF or hash)
    rng = random.Random(seed)
    point = rng.uniform(0, total_weight)
    
    cum = 0.0
    for i, w in enumerate(weights):
        cum += w
        if point <= cum:
            return members[i]
    return members[-1]  # fallback
```

---

### A.5 Field Manifest and TTL Expiry

```python
def is_field_active(manifest, current_time):
    # manifest contains creation_time and ttl_seconds
    return current_time < manifest.creation_time + manifest.ttl_seconds

def renew_field(manifest, new_ttl, renewal_signatures):
    # renewal_signatures: list of (member, signature) for members approving renewal
    if len(renewal_signatures) >= threshold and all_signatures_valid():
        new_manifest = manifest.copy()
        new_manifest.creation_time = now()
        new_manifest.ttl_seconds = new_ttl
        new_manifest.prev_manifest_hash = hash(manifest)
        return new_manifest
    else:
        return None
```

---

These pseudocode fragments illustrate the core algorithms. The complete reference implementation in Rust is available at the repository link in Appendix C.

---

**End of Appendix A**
