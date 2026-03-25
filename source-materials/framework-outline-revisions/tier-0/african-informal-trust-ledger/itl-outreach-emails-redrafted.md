# ITL Outreach Emails — Redrafted

## Notes on approach

These drafts prioritize honesty over impression management. The core changes from the originals:

- Personal voice, not pitch-deck voice
- Honest about being a European architect seeking African partners to shape the work
- ZK proofs positioned as the architecture's horizon, not its current state
- No "I work strictly asynchronously" — leave the door open for however they want to engage
- Shorter. Respects their time.
- The spec and architecture map do the heavy lifting; the email just needs to get them opened

If you can find a warmer introduction path (a mutual contact, a conference connection, someone in the CcHUB or Smart Africa network), even a one-line "Björn, you should talk to X" changes everything. These drafts work cold, but warm is always better.

---

## Email 1: Ralph Oyini Mbouna (Smart Africa)

**Subject:** ITL — a reputation protocol for informal trade, built for African DPI

> Dear Ralph,
> 
> Your remarks at the DPI summit on Africa owning and scaling its own digital infrastructure stayed with me — particularly the tension between interoperability ambitions and the reality that ~80% of continental employment operates outside the systems DPI is currently designed for.
> 
> I've been working on a protocol specification that tries to address exactly that gap. The Informal Trust Ledger (ITL) is a mobile-native coordination layer that lets informal economic actors — cross-border traders, agricultural co-ops, VSLAs — build verifiable reputations without requiring formal registration, bank accounts, or smartphones. It sits alongside existing mobile money infrastructure as a reputation layer, not a financial product. No value processing, no currency holding.
> 
> The core idea: formalize trust without prematurely formalizing the actor.
> 
> I should be transparent about two things. First, I'm a Swedish systems architect — this isn't an African-originated project, and I'm conscious of that. The specification is anchored in AU/AfCFTA frameworks and designed for African realities, but it needs African institutional partners to evaluate whether the architecture actually fits, and to shape what a pilot would look like. I'm not looking for rubber-stamping; I'm looking for critical assessment from people who understand the operational landscape.
> 
> Second, the spec describes a zero-knowledge proof architecture as the privacy layer. In practice, full ZK proofs on feature phones aren't realistic today. The realistic Phase 1 is hash-chain reputation scoring verified by trusted community nodes (market associations, VSLAs), with ZK proofs as an aspiration for Phase 2 as lightweight proof systems and smartphone penetration mature. The specification describes the full architecture; the pilot would be pragmatic.
> 
> I've attached the ITL v0.3 technical specification and a deployment architecture map. If this intersects with Smart Africa's roadmap for inclusive DPI — or if you see fundamental problems with the approach — I'd genuinely value your perspective.
> 
> Best regards,
> 
> Björn Kenneth Holmström
> bjornkennethholmstrom@gmail.com
> globalgovernanceframeworks.org

---

## Email 2: Ojoma Ochai (CcHUB / iHub)

**Subject:** Looking for a build partner — reputation protocol for informal economies

> Dear Ojoma,
> 
> I'm reaching out because CcHUB's network — Lagos, Nairobi, the Kigali Design Lab — is one of the few ecosystems with both the engineering depth and the Pan-African footprint to evaluate whether an idea like this is worth building.
> 
> I've developed a protocol specification called the Informal Trust Ledger (ITL). It's a mobile-native, USSD-compatible coordination layer designed for the informal economy. The core function: it lets traders, co-ops, and savings groups build portable, verifiable reputations — which they can use to access credit, trade facilitation, or customs fast-tracking — without exposing their raw transaction data or requiring formal banking.
> 
> It's designed as a Layer 2 reputation system that sits alongside M-Pesa and similar mobile money infrastructure. It doesn't process payments or hold funds. It just makes trust portable and provable.
> 
> I want to be upfront: I'm a Swedish systems architect, not an African developer. I've built the specification around AU frameworks and African economic realities as best I can, but the architecture needs to be stress-tested and shaped by people who actually build for these markets. That's the ask — not funding, but a technical partner willing to evaluate the spec and, if it holds up, co-develop a USSD prototype for a pilot corridor like Busia (Kenya/Uganda).
> 
> One honest caveat on the spec: the full architecture describes zero-knowledge cryptographic proofs for reputation verification. On feature phones today, that's aspirational. A realistic Phase 1 uses hash-chain reputation scoring with trusted community validators (market associations, chamas). The ZK layer comes later as the tooling matures. I've designed the architecture so it can start simple and grow into the privacy guarantees — not the other way around.
> 
> I've attached the ITL v0.3 specification and a deployment architecture map. If this is interesting to you or to someone on your engineering team, I'd welcome the conversation in whatever format works for you.
> 
> Best regards,
> 
> Björn Kenneth Holmström
> bjornkennethholmstrom@gmail.com
> globalgovernanceframeworks.org

---

## What's different and why

| Original | Redraft | Rationale |
|----------|---------|-----------|
| "I am a systems architect" (no context) | Swedish systems architect + honest about outsider position | Preempts the obvious question; builds trust through transparency |
| "Zero-knowledge cryptographic reputations" as headline | ZK as Phase 2 aspiration; hash-chains as Phase 1 reality | Any CcHUB engineer will flag ZK-on-USSD as implausible; getting ahead of it signals competence |
| "I work strictly asynchronously" | "in whatever format works for you" | Respects how African tech ecosystem actually operates (relational, conversational) |
| "No European import" in spec | "I'm conscious of that" in email | Honesty > denial. They'll see your name. Own it. |
| "This email is lethal" framing | — | Removed all meta-commentary about email strategy |
| 400+ words of positioning | ~250 words of substance | Respects executive time; lets the spec do the talking |
| "Backend technical author of this architecture" | Dropped | Sounds like a job title invented to sound impressive |
| Explicit "Legitimacy Anchor" / "Infrastructure Builder" labels | Dropped from emails | These are internal strategy terms. Recipients don't need to know they're part of a "triangular activation model" |
