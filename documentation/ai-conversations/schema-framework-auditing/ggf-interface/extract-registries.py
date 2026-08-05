#!/usr/bin/env python3
"""
extract-registries.py — build canonical record-class registries for the GGF
interface specifications from the framework outlines that conform to them.

The interface specs (CERGTA/0.1, GMEAIA/0.1, SCPA/0.1, ECRC/0.1, ...) are
referenced as controlling interfaces across the outlines but do not exist as
documents. Each conforming framework, however, publishes a crosswalk table
enumerating the canonical record classes it maps to. This script reads every
such table and reconciles them into one registry per spec.

Output is descriptive, not prescriptive: it reports what the outlines already
commit to, flags where they disagree, and never invents a class.

Usage:
    python3 extract-registries.py --src ./outlines --out ./registries
    python3 extract-registries.py --src ./outlines --conflicts-only
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path

# Interface specs to look for. Prefixes are matched literally.
# ECRC-RIC must precede ECRC so the longer token wins.
SPECS = [
    "ECRC-RIC", "GMEAIA", "CERGTA", "SCPA", "ECRC", "CFPAE", "ESDIB",
    "CDEE", "EIPHR", "CEACA", "SCCA", "PRUP", "CCAA", "BICA", "SATN",
    "IAEGCA", "RIC",
]

SPEC_ALT = "|".join(SPECS)

# `CERGTA-12`, CERGTA-12, `ECRC-01` Hazard Alert Record, CERGTA-02–10
CLASS_RE = re.compile(
    rf"`?(?P<spec>{SPEC_ALT})-(?P<lo>\d{{1,3}})"
    rf"(?:\s*[–—-]\s*(?:(?:{SPEC_ALT})-)?(?P<hi>\d{{1,3}}))?`?"
)

# Header cells that mean "this column holds the canonical name of the class"
CANON_HINTS = ("canonical", "title", "function")
# Header cells that mean "this column holds the framework's own record"
DOMAIN_HINTS = ("record", "profile", "implementation", "mapping")
# Header cells holding conformance qualifiers
NOTE_HINTS = ("note", "boundary", "relation", "band", "class", "gap", "route")


# Table-format defects found while parsing, reported rather than silently fixed.
WARNINGS: list[str] = []


def norm(s: str) -> str:
    """Normalise a name for comparison: casefold, strip backticks and padding."""
    s = s.replace("`", " ").replace("*", " ")
    s = re.sub(r"[^0-9a-zA-Z]+", " ", s)
    return " ".join(s.lower().split())


def split_row(line: str) -> list[str]:
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]
    return [c.strip() for c in line.split("|")]


def is_separator(line: str) -> bool:
    return bool(re.fullmatch(r"\s*\|?[\s:|-]+\|?\s*", line)) and "-" in line


@dataclass
class Observation:
    """One framework's statement about one canonical class."""
    spec: str
    num: int
    name: str | None
    domain: str | None
    note: str | None
    source: str
    ranged: bool = False


@dataclass
class SpecRegistry:
    spec: str
    observations: list[Observation] = field(default_factory=list)
    sources: set[str] = field(default_factory=set)

    def classes(self) -> dict[int, list[Observation]]:
        by_num: dict[int, list[Observation]] = defaultdict(list)
        for o in self.observations:
            by_num[o.num].append(o)
        return dict(sorted(by_num.items()))


def find_tables(lines: list[str]) -> list[tuple[int, list[str], list[list[str]]]]:
    """Return (start_line, header_cells, data_rows) for each markdown table."""
    tables = []
    i = 0
    n = len(lines)
    while i < n:
        if lines[i].strip().startswith("|") and i + 1 < n and is_separator(lines[i + 1]):
            header = split_row(lines[i])
            rows = []
            j = i + 2
            while j < n and lines[j].strip().startswith("|"):
                rows.append(split_row(lines[j]))
                j += 1
            tables.append((i + 1, header, rows))
            i = j
        else:
            i += 1
    return tables


# Cells that are plainly not a canonical name: enum tokens, ID lists, empty.
ENUM_RE = re.compile(r"^`?[a-z][a-z0-9_]*`?$")
IDLIST_RE = re.compile(r"^[`\s]*[A-Z]{2,8}-\d")


def looks_like_name(cell: str) -> bool:
    """A canonical-name cell: a short title phrase, not an enum token or ID list."""
    c = cell.strip(" `*")
    if not c or c in {"—", "-", "n/a"}:
        return False
    if ENUM_RE.match(c) or IDLIST_RE.match(c):
        return False
    words = c.split()
    if not (1 <= len(words) <= 14):
        return False
    # Titles are mostly alphabetic; mapping cells are mostly punctuation and IDs.
    alpha = sum(ch.isalpha() or ch.isspace() for ch in c)
    return alpha / len(c) > 0.75


def name_column_by_content(rows: list[list[str]], exclude: set[int], width: int) -> int | None:
    """Find the column whose cells read like canonical titles."""
    best, best_score = None, 0.0
    for c in range(width):
        if c in exclude:
            continue
        cells = [r[c] for r in rows if c < len(r)]
        if not cells:
            continue
        score = sum(looks_like_name(x) for x in cells) / len(cells)
        if score > best_score:
            best, best_score = c, score
    return best if best_score >= 0.6 else None


def classify_columns(header: list[str], rows: list[list[str]]) -> dict[str, int]:
    """Decide which column holds the class ID, canonical name, domain record, note."""
    cols: dict[str, int] = {}

    # ID column: the one where most rows start with a SPEC-NN token.
    best, best_hits = None, 0
    for c in range(len(header)):
        hits = sum(
            1 for r in rows
            if c < len(r) and CLASS_RE.match(r[c].strip())
        )
        if hits > best_hits:
            best, best_hits = c, hits
    if best is None or best_hits == 0:
        return cols
    if best != 0:
        # A genuine conformance crosswalk is keyed on the canonical class, so the
        # ID sits in column 1. Tables keyed the other way (activity -> route) are
        # useful reading but are not class definitions.
        cols["_reverse"] = best
        return cols
    cols["id"] = best

    lower = [norm(h) for h in header]

    # Domain-record column first: a header naming the framework's own records.
    # Resolving this before the name column keeps a mapping column from ever
    # being read as a canonical title.
    for c, h in enumerate(lower):
        if c == cols["id"]:
            continue
        if any(k in h for k in DOMAIN_HINTS) and not any(k in h for k in CANON_HINTS):
            cols["domain"] = c
            break

    # Canonical-name column, if the table has one. Header hints first, then
    # verify against content — several outlines have headers offset from their
    # columns, and a mislabelled header must not silently drop a name.
    hinted = None
    for c, h in enumerate(lower):
        if c in (cols["id"], cols.get("domain")):
            continue
        if any(k in h for k in CANON_HINTS):
            hinted = c
            break

    exclude = {cols["id"]}
    if "domain" in cols:
        exclude.add(cols["domain"])
    by_content = name_column_by_content(rows, exclude, len(header))

    if hinted is not None:
        cells = [r[hinted] for r in rows if hinted < len(r)]
        ok = bool(cells) and sum(looks_like_name(x) for x in cells) / len(cells) >= 0.6
        if ok:
            cols["name"] = hinted
        elif by_content is not None:
            cols["name"] = by_content
            cols["_header_offset"] = hinted
    elif by_content is not None:
        cols["name"] = by_content
        cols["_header_unlabelled"] = by_content

    # Note / boundary column.
    for c in range(len(lower) - 1, -1, -1):
        if c in (cols.get("id"), cols.get("name"), cols.get("domain")):
            continue
        if any(k in lower[c] for k in NOTE_HINTS):
            cols["note"] = c
            break

    return cols


def parse_id_cell(cell: str) -> tuple[str, list[int], str | None]:
    """Return (spec, [class numbers], inline name if present)."""
    m = CLASS_RE.match(cell.strip())
    if not m:
        return "", [], None
    spec = m.group("spec")
    lo = int(m.group("lo"))
    hi = int(m.group("hi")) if m.group("hi") else lo
    if hi < lo or hi - lo > 60:
        hi = lo
    trailing = cell[m.end():].strip(" `*")
    return spec, list(range(lo, hi + 1)), (trailing or None)


def harvest(path: Path, registries: dict[str, SpecRegistry]) -> None:
    lines = path.read_text(encoding="utf-8").split("\n")
    for _, header, rows in find_tables(lines):
        cols = classify_columns(header, rows)
        if "id" not in cols:
            continue
        if "_header_offset" in cols:
            WARNINGS.append(
                f"{path.name}: header column {cols['_header_offset'] + 1} "
                f"(\"{header[cols['_header_offset']]}\") does not label the data "
                f"beneath it; the canonical name is actually in column "
                f"{cols['name'] + 1}. Header appears offset."
            )
        elif "_header_unlabelled" in cols:
            WARNINGS.append(
                f"{path.name}: canonical-name column {cols['name'] + 1} "
                f"(\"{header[cols['name']]}\") has no recognisable header label; "
                f"detected from content."
            )
        for r in rows:
            if cols["id"] >= len(r):
                continue
            spec, nums, inline_name = parse_id_cell(r[cols["id"]])
            if not spec or not nums:
                continue

            name = inline_name
            if name is None and "name" in cols and cols["name"] < len(r):
                name = r[cols["name"]].strip(" `*") or None
            domain = (
                r[cols["domain"]].strip(" `*")
                if "domain" in cols and cols["domain"] < len(r)
                else None
            )
            note = (
                r[cols["note"]].strip(" `*")
                if "note" in cols and cols["note"] < len(r)
                else None
            )

            reg = registries.setdefault(spec, SpecRegistry(spec))
            reg.sources.add(path.name)
            for num in nums:
                reg.observations.append(
                    Observation(
                        spec=spec, num=num, name=name or None,
                        domain=domain or None, note=note or None,
                        source=path.name, ranged=len(nums) > 1,
                    )
                )


def scan_mentions(paths: list[Path]) -> dict[str, set[str]]:
    """Which outlines name each spec as a controlling interface (SPEC/0.x)."""
    pat = re.compile(rf"\b({SPEC_ALT})/\d+\.\d+")
    out: dict[str, set[str]] = defaultdict(set)
    for p in paths:
        for m in pat.finditer(p.read_text(encoding="utf-8")):
            out[m.group(1)].add(p.name)
    return out


STOPWORDS = {"and", "or", "of", "the", "a", "an", "for", "to", "record", "records"}


def tokens(name: str) -> frozenset[str]:
    return frozenset(w for w in norm(name).split() if w not in STOPWORDS)


def variant_kind(a: str, b: str) -> str:
    """Is the second name a shortening of the first, or a different claim?"""
    ta, tb = tokens(a), tokens(b)
    if not ta or not tb:
        return "divergent"
    if ta <= tb or tb <= ta:
        return "abbreviation"
    overlap = len(ta & tb) / min(len(ta), len(tb))
    return "abbreviation" if overlap >= 0.7 else "divergent"


def pick_canonical(obs: list[Observation]) -> tuple[str | None, list[tuple[str, list[str]]]]:
    """Choose the canonical name and return all variants with their sources."""
    named = [o for o in obs if o.name]
    if not named:
        return None, []

    # A name taken from a collapsed range row (e.g. "CERGTA-22-30 | Claims,
    # title, tenure...") labels the span, not the individual class. Never let it
    # compete with a name asserted for the class directly.
    direct_named = [o for o in named if not o.ranged]
    if direct_named:
        named = direct_named

    groups: dict[str, list[Observation]] = defaultdict(list)
    for o in named:
        groups[norm(o.name)].append(o)

    def score(item):
        key, group = item
        # Prefer names asserted by more frameworks, then longer (less abbreviated),
        # then names not derived from a collapsed range row.
        direct = sum(1 for o in group if not o.ranged)
        return (len(group), direct, len(group[0].name or ""))

    ordered = sorted(groups.items(), key=score, reverse=True)
    canonical = ordered[0][1][0].name
    variants = [
        (g[0].name, sorted({o.source for o in g}))
        for _, g in ordered
    ]
    return canonical, variants


def write_registry(reg: SpecRegistry, mentions: set[str], out_dir: Path,
                   pins: dict[str, dict[str, dict]] | None = None) -> dict:
    classes = reg.classes()
    lines: list[str] = []
    divergent: list[tuple[int, list[tuple[str, list[str]]]]] = []
    abbreviated: list[tuple[int, list[tuple[str, list[str]]]]] = []
    unnamed: list[int] = []

    lines.append(f"# {reg.spec}/0.1 — canonical record class registry")
    lines.append("")
    lines.append(
        "Extracted from the conformance crosswalks published in the framework "
        "outlines. A specification artifact for this interface exists outside "
        "this corpus and is pinned by SHA-256 below; this registry records what "
        "the outlines currently assert, so it can be reconciled against that "
        "artifact rather than replacing it."
    )
    lines.append("")
    if pins is not None:
        lines.extend(pin_lines(reg.spec, pins))
    lines.append(f"- Classes observed: **{len(classes)}** "
                 f"({min(classes)}–{max(classes)})" if classes else "- Classes observed: 0")
    lines.append(f"- Frameworks publishing a crosswalk: **{len(reg.sources)}**")
    lines.append(f"- Frameworks naming `{reg.spec}/0.1` as controlling interface: **{len(mentions)}**")
    gap = sorted(mentions - reg.sources)
    if gap:
        lines.append(f"- Naming it but publishing no crosswalk: {', '.join(gap)}")
    missing = [n for n in range(min(classes), max(classes) + 1) if n not in classes] if classes else []
    if missing:
        lines.append(f"- Gaps in numbering: {', '.join(str(m) for m in missing)}")
    lines.append("")

    lines.append("## Classes")
    lines.append("")
    lines.append("| Class | Canonical name | Asserted by | Status |")
    lines.append("|---|---|---|---|")
    for num, obs in classes.items():
        canonical, variants = pick_canonical(obs)
        srcs = sorted({o.source for o in obs})
        if canonical is None:
            unnamed.append(num)
            status = "**unnamed** — mapped but never titled"
            canonical = "—"
        elif len(variants) > 1:
            kinds = {variant_kind(canonical, nm) for nm, _ in variants[1:]}
            if "divergent" in kinds:
                divergent.append((num, variants))
                status = f"**divergent** ({len(variants)} names)"
            else:
                abbreviated.append((num, variants))
                status = f"abbreviated ({len(variants)} forms)"
        else:
            status = "agreed"
        lines.append(
            f"| `{reg.spec}-{num:02d}` | {canonical} | {len(srcs)} | {status} |"
        )
    lines.append("")

    def emit(title: str, blurb: str, items):
        if not items:
            return
        lines.append(f"## {title}")
        lines.append("")
        lines.append(blurb)
        lines.append("")
        for num, variants in items:
            lines.append(f"**`{reg.spec}-{num:02d}`**")
            lines.append("")
            for i, (nm, srcs) in enumerate(variants):
                marker = "proposed" if i == 0 else "variant"
                lines.append(f"- _{marker}_ — {nm}  \n  {', '.join(srcs)}")
            lines.append("")

    emit(
        "Divergent names — decision required",
        "The outlines describe this class differently enough that they may not "
        "mean the same thing. Each needs an editorial decision before the "
        "specification can be written.",
        divergent,
    )
    emit(
        "Abbreviated forms — normalise",
        "Same class, shorter wording. The long form is proposed as canonical; the "
        "short forms can stay as display labels or be replaced.",
        abbreviated,
    )

    if unnamed:
        lines.append("## Unnamed classes")
        lines.append("")
        lines.append(
            "Referenced in a crosswalk but never given a canonical title by any "
            "outline. These need a name before the specification can be written."
        )
        lines.append("")
        lines.append(", ".join(f"`{reg.spec}-{n:02d}`" for n in unnamed))
        lines.append("")

    lines.append("## Framework crosswalk")
    lines.append("")
    lines.append("| Class | Framework | Domain record | Conformance note |")
    lines.append("|---|---|---|---|")
    for num, obs in classes.items():
        for o in sorted(obs, key=lambda x: x.source):
            dom = o.domain or "—"
            note = (o.note or "—").replace("|", "\\|")
            if len(note) > 220:
                note = note[:217] + "..."
            lines.append(
                f"| `{reg.spec}-{num:02d}` | {o.source} | {dom} | {note} |"
            )
    lines.append("")

    out_path = out_dir / f"{reg.spec.lower()}-0.1-registry.md"
    out_path.write_text("\n".join(lines), encoding="utf-8")

    return {
        "spec": reg.spec,
        "classes": len(classes),
        "sources": len(reg.sources),
        "conflicts": len(divergent),
        "abbrev": len(abbreviated),
        "unnamed": len(unnamed),
        "gaps": len(missing),
        "pin": pin_status(reg.spec, pins) if pins is not None else "?",
        "declared_no_crosswalk": len(gap),
        "path": out_path,
    }


EXPANSION_RE_TMPL = (
    r"([A-Z][A-Za-z0-9 ,'\u2019-]{15,110}?)\s+v\d+\.\d+\s*\(`?{spec}/\d+\.\d+`?\)"
)


HASH_RE = re.compile(r"^[0-9a-f]{64}$")


def collect_pins(paths: list[Path]) -> dict[str, dict[str, dict]]:
    """Read source-freeze tables: which file each interface is pinned to, by whom.

    The interface specifications are real artifacts held outside this corpus.
    The outlines pin them by SHA-256, so the pins are the only in-corpus evidence
    of which revision each framework actually conformed to.
    """
    row_re = re.compile(r"^\s*\|(.+)\|\s*$")
    pins: dict[str, dict[str, dict]] = defaultdict(lambda: defaultdict(
        lambda: {"sources": set(), "filename": None}))
    for p in paths:
        for line in p.read_text(encoding="utf-8").split("\n"):
            m = row_re.match(line)
            if not m:
                continue
            cells = [c.strip(" `*") for c in m.group(1).split("|")]
            digest = next((c for c in cells if HASH_RE.match(c)), None)
            if not digest:
                continue
            instrument = cells[0]
            fname = next(
                (c for c in cells if c.endswith(".md") or c.endswith(".json")), None
            )
            entry = pins[instrument][digest]
            entry["sources"].add(p.name)
            if fname:
                entry["filename"] = fname
    # Not every pin sits in a table. Several outlines pin inline, e.g.
    # "Shield adopts `SATN/0.1`, SHA-256 `79648d...`".
    prose_re = re.compile(
        r"`(?P<spec>[A-Z][A-Za-z-]{1,12}/\d+\.\d+)`[^\n`]{0,40}?`?(?P<hash>[0-9a-f]{64})`?"
    )
    for p in paths:
        for m in prose_re.finditer(p.read_text(encoding="utf-8")):
            entry = pins[m.group("spec")][m.group("hash")]
            entry["sources"].add(p.name)

    return {k: dict(v) for k, v in pins.items()}


def pin_status(spec: str, pins: dict[str, dict[str, dict]]) -> str:
    key = next((k for k in pins if k == f"{spec}/0.1"), None)
    if key is None:
        return "none"
    n = len(pins[key])
    return "agreed" if n == 1 else f"**{n} digests**"


def pin_lines(spec: str, pins: dict[str, dict[str, dict]]) -> list[str]:
    """Render the pin block for one interface, flagging hash disagreement."""
    key = next((k for k in pins if k.rstrip("/0.1 ").upper() == spec or k == f"{spec}/0.1"), None)
    if key is None:
        return ["- Source artifact: **no pin found in the outlines**"]
    digests = pins[key]
    out = []
    if len(digests) == 1:
        digest, e = next(iter(digests.items()))
        out.append(f"- Pinned artifact: `{e['filename'] or 'filename not stated'}`")
        out.append(f"- SHA-256: `{digest}`, agreed by {len(e['sources'])} outlines")
    else:
        out.append(
            f"- **Pin disagreement: {len(digests)} different digests are pinned "
            f"under the same version number.** The specification was revised "
            f"without a version bump, or an outline pins the wrong file."
        )
        for digest, e in sorted(digests.items(), key=lambda x: -len(x[1]["sources"])):
            out.append(
                f"  - `{digest}` — {e['filename'] or 'filename not stated'} — "
                f"{', '.join(sorted(e['sources']))}"
            )
    return out


def find_expansions(paths: list[Path], specs: list[str]) -> dict[str, str]:
    """Recover the written-out name of each interface, where an outline gives one."""
    texts = {p.name: p.read_text(encoding="utf-8") for p in paths}
    out: dict[str, str] = {}
    for spec in specs:
        pat = re.compile(EXPANSION_RE_TMPL.replace("{spec}", re.escape(spec)))
        for text in texts.values():
            m = pat.search(text)
            if m:
                out[spec] = " ".join(m.group(1).split())
                break
    return out


def write_index(summaries: list[dict], mentions: dict[str, set[str]],
                expansions: dict[str, str], defined: set[str],
                out_dir: Path, pins: dict[str, dict[str, dict]]) -> Path:
    lines = [
        "# GGF interface specifications — registry index",
        "",
        "The frameworks declare conformance to a set of controlling interfaces. "
        "Specification artifacts for several of these exist outside the outline "
        "corpus and are pinned by SHA-256 in the outlines' source-freeze tables. "
        "They are not present in this publication corpus and are not represented "
        "consistently in the schema.",
        "",
        "This index therefore supports reconciliation, not drafting: it records "
        "what the revised frameworks now assert, so each existing specification "
        "can be checked against it and marked current, needing a patch refresh, "
        "or needing substantive reconciliation.",
        "",
        "## Interfaces with enumerated record classes",
        "",
        "| Interface | Written-out name | Classes | Crosswalks | Declared without crosswalk | Divergent | Abbreviated | Pin | Registry |",
        "|---|---|---|---|---|---|---|---|---|",
    ]
    for s in summaries:
        spec = s["spec"]
        lines.append(
            f"| `{spec}/0.1` | {expansions.get(spec, '_never expanded_')} | "
            f"{s['classes']} | {s['sources']} | {s['declared_no_crosswalk']} | "
            f"{s['conflicts']} | {s.get('abbrev', 0)} | {s.get('pin', '?')} | "
            f"[{Path(s['path']).name}]({Path(s['path']).name}) |"
        )

    undefined = sorted(set(mentions) - defined)
    if undefined:
        lines += [
            "",
            "## Interfaces declared but never enumerated",
            "",
            "Named as controlling or normatively adopted, with no record classes "
            "defined in any outline. A framework cannot be checked against these.",
            "",
            "| Interface | Written-out name | Outlines declaring it | Pinned artifact |",
            "|---|---|---|---|",
        ]
        for spec in sorted(undefined, key=lambda x: -len(mentions[x])):
            key = next((k for k in pins if k == f"{spec}/0.1"), None)
            if key:
                fn = next((e["filename"] for e in pins[key].values() if e["filename"]), None)
                pin = f"`{fn}`" if fn else f"{len(pins[key])} digest(s), filename not stated"
            else:
                pin = "**no pin — no artifact evidence**"
            lines.append(
                f"| `{spec}/0.1` | {expansions.get(spec, '_never expanded_')} | "
                f"{len(mentions[spec])} | {pin} |"
            )

    lines.append("")
    path = out_dir / "index.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    return path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=".", help="directory of framework outline .md files")
    ap.add_argument("--out", default="./registries", help="output directory")
    ap.add_argument("--conflicts-only", action="store_true",
                    help="print the summary without writing files")
    args = ap.parse_args()

    src = Path(args.src)
    paths = sorted(src.glob("*.md"))
    if not paths:
        print(f"No .md files under {src}", file=sys.stderr)
        return 1

    registries: dict[str, SpecRegistry] = {}
    for p in paths:
        harvest(p, registries)

    mentions = scan_mentions(paths)
    pins = collect_pins(paths)

    out_dir = Path(args.out)
    if not args.conflicts_only:
        out_dir.mkdir(parents=True, exist_ok=True)

    print(f"Scanned {len(paths)} outlines\n")
    header = f"{'spec':10} {'classes':>8} {'sources':>8} {'conflicts':>10} {'unnamed':>8} {'num gaps':>9} {'declared, no xwalk':>19}"
    print(header)
    print("-" * len(header))

    summaries = []
    for spec in sorted(registries, key=lambda s: -len(registries[s].classes())):
        reg = registries[spec]
        if args.conflicts_only:
            classes = reg.classes()
            conflicts = 0
            abbrev = 0
            for _, obs in classes.items():
                canonical, variants = pick_canonical(obs)
                if canonical is None or len(variants) <= 1:
                    continue
                kinds = {variant_kind(canonical, nm) for nm, _ in variants[1:]}
                if "divergent" in kinds:
                    conflicts += 1
                else:
                    abbrev += 1
            unnamed = sum(1 for _, obs in classes.items() if pick_canonical(obs)[0] is None)
            gaps = len([n for n in range(min(classes), max(classes) + 1) if n not in classes]) if classes else 0
            s = {"spec": spec, "classes": len(classes), "sources": len(reg.sources),
                 "conflicts": conflicts, "abbrev": abbrev, "unnamed": unnamed, "gaps": gaps,
                 "declared_no_crosswalk": len(mentions.get(spec, set()) - reg.sources)}
        else:
            s = write_registry(reg, mentions.get(spec, set()), out_dir, pins)
        summaries.append(s)
        print(f"{s['spec']:10} {s['classes']:>8} {s['sources']:>8} {s['conflicts']:>10} "
              f"{s['unnamed']:>8} {s['gaps']:>9} {s['declared_no_crosswalk']:>19}")

    undefined = sorted(set(mentions) - set(registries))
    if undefined:
        print("\nDeclared as controlling interfaces but with no class definitions anywhere:")
        for spec in undefined:
            print(f"  {spec}/0.1 — named in {len(mentions[spec])} outlines, 0 classes defined")

    if not args.conflicts_only:
        expansions = find_expansions(paths, SPECS)
        idx = write_index(summaries, mentions, expansions, set(registries), out_dir, pins)
        missing_expansion = [s for s in SPECS if s in mentions and s not in expansions]
        if missing_expansion:
            print(f"\nInterfaces never written out in full anywhere in the corpus "
                  f"({len(missing_expansion)}): {', '.join(missing_expansion)}")

    if WARNINGS:
        print(f"\nTable-format defects in the outlines ({len(WARNINGS)}):")
        for w in sorted(set(WARNINGS)):
            print(f"  {w}")

    if not args.conflicts_only:
        print(f"\nRegistries written to {out_dir}/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
