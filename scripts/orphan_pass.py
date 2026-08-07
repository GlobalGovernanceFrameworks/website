#!/usr/bin/env python3
"""
Assumed-orphan pass for the GGF corpus.

Finds objects that many frameworks DEFER to but none OWNS.

Two signals:
  A. Deferral harvest -- terms named in scope-boundary and protected-continuity
     language ("does not determine X", "protected continuity of X", bullets under
     'shall not destroy', 'essential services', 'matters outside scope').
  B. Breadth/concentration -- for each harvested term, how many documents mention
     it (breadth) versus what share of all mentions sits in its single densest
     document (concentration).

An OWNED topic is dense somewhere: one framework is about it, so concentration
is high. An ASSUMED ORPHAN is thin everywhere and present in many places:
high breadth, low concentration, and no schema entity named after it.

Usage:
    python3 orphan_pass.py /path/to/outlines /path/to/schema
"""

import re
import sys
import glob
import os
from collections import Counter, defaultdict

# Clauses that mark a framework pointing at something it does not own.
DEFERRAL = re.compile(
    r"(does not (?:govern|determine|define|create|own|establish|decide)"
    r"|shall not (?:destroy|impair|reduce|interrupt|remove|condition)"
    r"|matters? outside|outside (?:its |the )?(?:direct )?scope"
    r"|belongs? to (?:the|their)|remains? with the"
    r"|protected continuity|essential services?"
    r"|requires? (?:a )?separate|separate(?:ly)? (?:valid |lawful )?authority"
    r"|competent (?:authority|jurisdiction)"
    r"|their (?:own )?(?:competent|domain) framework)",
    re.I,
)

# Stopwords that survive the noun filter but carry no domain meaning.
STOP = set("""
the this that these those a an and or but not with without within into onto
for from of to in on at by as is are was were be been being it its their they
them our your his her which who whom whose what when where why how any all
some each every other another such same own more most less least many few
shall may must should would could can will not no nor only also both either
neither if then than because while during before after above below under over
where under here there under upon per via
framework protocol section article clause version draft record authority
governance rule rules right rights duty duties process processes decision
decisions system systems institution institutions body bodies council
mechanism mechanisms structure structures purpose purposes principle
principles requirement requirements standard standards provision provisions
matter matters thing things case cases example examples form forms type types
part parts level levels scope basis means way ways use uses need needs
person persons people community communities public private local global
regional national state states party parties member members
""".split())

# Multi-word objects worth tracking as units. Single-word counting fragments them.
PHRASES = [
    "housing", "legal identity", "civil registration", "birth registration",
    "electoral", "elections", "voting rights", "suffrage", "representation",
    "pension", "pensions", "insurance", "credit", "banking", "monetary policy",
    "competition", "antitrust", "market concentration",
    "primary care", "health system", "hospital", "clinical",
    "employment", "wages", "livelihood", "tenure", "eviction", "homelessness",
    "education", "schooling", "childcare", "elder care", "disability support",
    "food security", "water access", "sanitation", "energy access",
    "transport", "mobility", "internet access", "telecommunications",
    "legal aid", "counsel", "interpretation", "accessibility",
    "procurement", "audit", "insolvency", "bankruptcy", "succession",
    "land tenure", "title", "property", "inheritance",
    "identity documents", "statelessness", "citizenship",
    "sanitation", "waste", "burial", "registration",
    "disability", "disabled", "sick pay", "unemployment", "labour market",
    "rent", "landlord", "mortgage", "bank", "lender", "merger", "monopoly",
    "birth registration", "death registration", "voter", "ballot",
]


def read_docs(outline_dir):
    """
    Outlines are nested: <lang>/tier-N/<slug>/current.md, with versioned files
    alongside under versions/. Take current.md where it exists, otherwise the
    newest version per framework directory.

    Never take every version: archived revisions sitting beside the live one
    would multiply that framework's term counts and destroy the concentration
    statistic the whole pass depends on.
    """
    outline_dir = os.path.abspath(outline_dir)
    docs = {}
    seen = set()

    def label_for(path):
        # Full relative path minus filename. Labelling by one path component
        # collapses every framework in a tier onto the same key, and dict
        # assignment then discards all but the last -- silently.
        rel = os.path.relpath(os.path.dirname(path), outline_dir)
        return rel.replace(os.sep, "/") if rel != "." else os.path.basename(path)

    def add(path):
        real = os.path.realpath(path)
        if real in seen:
            return
        label = label_for(path)
        if label in docs:
            raise SystemExit(
                f"label collision on {label!r} -- labelling is wrong and "
                f"documents would be silently discarded"
            )
        seen.add(real)
        try:
            docs[label] = open(real, encoding="utf-8", errors="replace").read()
        except OSError:
            pass

    for path in sorted(
        glob.glob(os.path.join(outline_dir, "**", "current.md"), recursive=True)
    ):
        add(path)

    if docs:
        return docs

    # No current.md convention in this tree: newest version file per directory.
    by_dir = defaultdict(list)
    for path in glob.glob(os.path.join(outline_dir, "**", "*.md"), recursive=True):
        by_dir[os.path.dirname(path)].append(path)
    for paths in by_dir.values():
        add(max(paths, key=lambda p: (os.path.getmtime(p), p)))

    return docs


def schema_names(schema_dir):
    """Every name/shortName in the schema, normalised. Ownership evidence."""
    names = set()
    for path in glob.glob(os.path.join(schema_dir, "*.ts")):
        src = open(path, encoding="utf-8", errors="replace").read()
        for m in re.finditer(r"(?:name|shortName): '([^']+)'", src):
            names.add(m.group(1).lower())
    return names


def harvest_deferrals(docs, window=12):
    """
    Documents where a framework points at something outside itself.

    The house style is a marker line followed by a bullet list:

        Collection shall include a continuity assessment covering:
        - wages;
        - pensions;
        - housing;

    so the marker and the deferred object are almost never on the same line.
    Scan a window of following lines, stopping at the next blank-line-then-prose
    boundary so the window does not bleed into unrelated sections.
    """
    hits = defaultdict(set)
    raw = Counter()
    for name, text in docs.items():
        lines = text.splitlines()
        for i, line in enumerate(lines):
            if not DEFERRAL.search(line):
                continue
            block = [line]
            for nxt in lines[i + 1 : i + 1 + window]:
                s = nxt.strip()
                # Continue through bullets, numbered items and blanks between
                # them; stop at a heading or a new prose paragraph.
                if s.startswith("#"):
                    break
                if s and not re.match(r"^([-*+]|\d+\.|\|)", s):
                    break
                block.append(nxt)
            low = "\n".join(block).lower()
            for phrase in PHRASES:
                if re.search(r"\b" + re.escape(phrase) + r"\b", low):
                    hits[phrase].add(name)
                    raw[phrase] += 1
    return hits, raw


# Language a framework uses to REFUSE a topic. A document dense in a term only
# because it disclaims it is not that term's owner -- and without this check the
# score systematically hides every gap you have already documented carefully.
DISCLAIM = re.compile(
    r"(does not (?:govern|determine|define|create|own|establish|decide)"
    r"|shall not be treated as|is not (?:a|the) .{0,40}(?:authority|jurisdiction)"
    r"|belongs to the competent|does not create .{0,40}jurisdiction"
    r"|creates? no .{0,30}(?:authority|jurisdiction|competence))",
    re.I,
)


def breadth_concentration(docs, terms, disclaim_ratio=0.4, window=400):
    """For each term: doc breadth, total mentions, share in densest doc."""
    stats = {}
    for term in terms:
        pat = re.compile(r"\b" + re.escape(term) + r"\b", re.I)
        per_doc = {n: len(pat.findall(t)) for n, t in docs.items()}
        per_doc = {n: c for n, c in per_doc.items() if c}
        total = sum(per_doc.values())
        if not total:
            continue
        densest, top = max(per_doc.items(), key=lambda kv: kv[1])

        # Is the densest document dense because it owns the term, or because it
        # spends its space saying it does not?
        text = docs[densest]
        near = sum(
            1
            for m in pat.finditer(text)
            if DISCLAIM.search(text[max(0, m.start() - window) : m.start() + window])
        )
        disclaimed = near > top * disclaim_ratio

        stats[term] = {
            "docs": len(per_doc),
            "total": total,
            "densest": densest,
            "top_share": top / total,
            "disclaimed": disclaimed,
        }
    return stats


def owned(term, names):
    """Does any schema entity name contain this term?"""
    t = term.lower()
    return any(t in n for n in names)


def main():
    outline_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    schema_dir = sys.argv[2] if len(sys.argv) > 2 else outline_dir

    docs = read_docs(outline_dir)
    if len(docs) < 20:
        sys.exit(
            f"only {len(docs)} document(s) found under {outline_dir} -- expected "
            f"the full corpus; check nesting and labelling before trusting output"
        )
    names = schema_names(schema_dir)
    deferrals, raw = harvest_deferrals(docs)
    stats = breadth_concentration(docs, PHRASES)

    print(f"corpus: {len(docs)} documents, {len(names)} schema names\n")

    rows = []
    for term, s in stats.items():
        d_docs = len(deferrals.get(term, ()))
        if s["docs"] < 4:
            continue
        # Orphan score: broad deferral, low concentration, no owning entity.
        # Concentration only counts as ownership if it is not a disclaimer.
        share = 0.0 if s["disclaimed"] else s["top_share"]
        score = d_docs * (1 - share)
        if owned(term, names):
            score *= 0.25
        rows.append((score, term, s, d_docs, owned(term, names)))

    rows.sort(reverse=True)
    hdr = (f"{'term':<22}{'defer':>6}{'docs':>6}{'ment':>6}{'top%':>7}"
           f"  {'owned':<6}{'dens':<6} densest doc")
    print(hdr)
    print("-" * len(hdr))
    for score, term, s, d_docs, own in rows[:28]:
        print(
            f"{term:<22}{d_docs:>6}{s['docs']:>6}{s['total']:>6}"
            f"{s['top_share']*100:>6.0f}%  {'yes' if own else 'NO':<6}"
            f"{'REFUS' if s['disclaimed'] else 'owns':<6} {s['densest'][:40]}"
        )


if __name__ == "__main__":
    main()
