## Appendix E: Context Schema Resolution Examples

This appendix provides concrete examples of how a node resolves context URIs to canonical forms, handles aliases, and performs fuzzy matching. The examples assume the node has enabled the **default resolution policy** (registry lookup → fuzzy matching → fallback).

### E.1 Exact Match via Decentralized Registry

Suppose a node receives a Trust Signal with `context = "urn:itp:context:file-storage"`. The node’s local registry contains a definition:

```json
{
  "context_uri": "urn:itp:context:file-storage",
  "canonical": true,
  "aliases": [
    "urn:itp:context:file-sharing",
    "https://schemas.itp.org/file-storage/v1"
  ],
  "schema": "https://schemas.itp.org/file-storage/v1/schema.json",
  "issuer_pubkey": "ed25519:abc123...",
  "signature": "..."
}
```

The node matches the exact URI, accepts the signal, and uses the canonical form for all subsequent operations (LTS computation, TIM grouping). No fuzzy matching is needed.

### E.2 Alias Resolution

A signal arrives with `context = "https://schemas.itp.org/file-storage/v1"`. The node looks up this URI in its local registry and finds it listed as an alias of `"urn:itp:context:file-storage"`. The node internally maps the signal to the canonical context. The mapping is recorded with confidence 1.0 (since it comes from a signed registry entry).

### E.3 Fuzzy Matching (No Registry Entry)

A signal arrives with `context = "urn:itp:context:bike_rental"` (underscore). The node has no registry entry for this exact string, but it has entries for:

- `"urn:itp:context:bike-sharing"`
- `"urn:itp:context:bicycle-rental"`

The node normalizes both strings: lowercases, removes punctuation, replaces underscores/hyphens with spaces. Then computes similarity:

- `"bike rental"` vs `"bike sharing"` → similarity ≈ 0.5 (low)
- `"bike rental"` vs `"bicycle rental"` → similarity ≈ 0.85 (high, because “bike” and “bicycle” are synonyms in the fuzzy thesaurus)

The node maps the incoming context to `"urn:itp:context:bicycle-rental"` with confidence 0.85 (below a threshold, it would discard; above threshold, it accepts with reduced weight). The mapping is cached locally with a TTL of 7 days.

### E.4 Unknown Context with No Match

A signal arrives with `context = "urn:example:weird-service"`. The node has no registry entry and fuzzy matching yields similarity `<` 0.6 with any known context. The node treats the context as **unknown** and may:

- Reject the signal entirely (if configured in strict mode).
- Accept the signal but assign it to a special `"unknown"` context, which is isolated from all other contexts (no cross‑context trust propagation). This prevents unknown contexts from polluting known trust graphs.

### E.5 Context Definition Signal (Self‑Registering)

A node may issue a Trust Signal that **defines a new context**:

```json
{
  "type": "context_definition",
  "context": "urn:itp:context:my-local-sharing",
  "value": 1.0,
  "confidence": 1.0,
  "timestamp": "...",
  "expiry": "2099-01-01T00:00:00Z",
  "content": {
    "canonical": true,
    "aliases": [],
    "schema": "https://my.node/schema.json"
  },
  "signature": "..."
}
```

Other nodes that trust the issuer may accept this definition and add it to their local registry. Nodes that do not trust the issuer ignore it. This is a fully decentralized way to bootstrap new contexts.

### E.6 Cross‑Context Queries

When an application asks for LTS across multiple contexts (e.g., “trust for file sharing OR backup storage”), the node resolves each context separately, then combines the results using the application’s policy:

- **Union**: max(LTS₁, LTS₂, …)
- **Intersection**: min(LTS₁, LTS₂, …)
- **Weighted average**: based on application‑defined weights.

The protocol does not mandate a default; it provides the resolved LTS values for each context, leaving combination to the application.

---

These examples illustrate the flexibility of ITP’s context resolution. Nodes can be configured to be strict (exact match only), liberal (fuzzy + registry), or any intermediate policy.

---

**End of Appendix E**
