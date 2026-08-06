from pathlib import Path
import json
from jsonschema import Draft202012Validator, FormatChecker
b=Path(__file__).resolve().parent
spec=json.loads((b/'implementation-methods-tools-framework-v0.9.json').read_text())
ss=json.loads((b/'implementation-methods-tools-framework-v0.9-specification.schema.json').read_text())
rs=json.loads((b/'implementation-methods-tools-framework-v0.9.schema.json').read_text())
files=['implementation-methods-tools-framework-v0.9-example-resource-card.json','implementation-methods-tools-framework-v0.9-example-capacity-limited-pilot.json','implementation-methods-tools-framework-v0.9-example-local-fork.json']
Draft202012Validator(ss,format_checker=FormatChecker()).validate(spec)
for f in files: Draft202012Validator(rs,format_checker=FormatChecker()).validate(json.loads((b/f).read_text()))
print('PASS: IMT v0.9 catalogue and examples validate.')
