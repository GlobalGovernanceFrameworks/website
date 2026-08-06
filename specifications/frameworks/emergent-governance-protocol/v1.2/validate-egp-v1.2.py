from __future__ import annotations
import json, hashlib, sys
from pathlib import Path
from jsonschema import Draft202012Validator, FormatChecker
ROOT=Path(__file__).resolve().parent
SCHEMA=json.load(open(ROOT/'egp-v1.2-governance-action.schema.json'))
examples=sorted(ROOT.glob('egp-v1.2-example-*.json'))
v=Draft202012Validator(SCHEMA, format_checker=FormatChecker())
fail=[]
for p in examples:
    obj=json.load(open(p))
    errs=sorted(v.iter_errors(obj), key=lambda e:list(e.path))
    if errs:
        fail.append((p.name,errs))
if fail:
    for name,errs in fail:
        print(name)
        for e in errs: print(' -','/'.join(map(str,e.path)),e.message)
    sys.exit(1)
print(f'{len(examples)} examples validate against EGP/1.2 schema.')
