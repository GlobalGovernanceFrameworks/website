### Where I think it could eventually become even stronger

I would resist adding too much now. This works partly because it is relatively small.

But I see one important missing dimension: **the schema records what the corpus believes now better than it records how the corpus changed its mind.**

Suppose a hypothesis goes:

`open → supported → narrowed → disconfirmed`

That trajectory is epistemically valuable. Why did confidence increase? Which evidence changed the verdict? What change was subsequently made to the framework?

At present, the register largely preserves the current `verdict`, current evidence, and expectations. 

For genuine metacognitive memory, I would eventually want something like a lightweight **revision history**, perhaps conceptually:

```ts
interface BeliefRevision {
  date: string;
  from: Verdict;
  to: Verdict;
  refs: string[];
  reason: string;
}
```

I would *not* necessarily add it immediately. Git already provides part of this history. But machine-readable belief revision would allow questions such as:

> Which kinds of evidence actually cause GGF to update?

> How often do hypotheses move toward greater confidence versus narrowing?

> How long does contradictory evidence take to alter a verdict?

> Do some frameworks systematically resist updating?

That would move from **remembering evidence** to **observing the corpus's own learning behavior**.

The second thing I would eventually add is a bridge from **learning to action**.

You already have the assumption:

> `asm_recorded_learning_used`: “Recorded learning and response records change later decisions rather than accumulating unused.” 

And the corresponding Implementation & Adaptation hypothesis explicitly claims that bounded learning should change later tool selection and reduce repeated failure. 

That is excellent because it recognizes the problem.

But eventually the data model itself could represent:

**evidence → changed belief → changed framework/action.**

Otherwise the corpus could become spectacularly good at discovering that it is wrong while continuing to behave exactly as before—the institutional equivalent of “I know I procrastinate.”

A tiny optional field such as `responses` or `consequences` attached to a resolved hypothesis might eventually be enough.

### One other subtle improvement

`producedBy: 'author' | 'independent'` is a very good first approximation. 

Eventually, however, “independence” may prove multidimensional.

Someone could be independent of GGF but:

* use GGF's own dataset,
* use the same causal assumptions,
* share the same methodological school,
* reproduce an analysis using the same code,
* or genuinely approach the problem from a different intellectual tradition.

That matters because what we really care about for **common-mode failure** is not merely *who* produced the evidence but how independent the **error-generating processes** are.

I wouldn't complicate the schema yet. But it might someday justify something like methodological/data provenance if the evidence register becomes substantial.
