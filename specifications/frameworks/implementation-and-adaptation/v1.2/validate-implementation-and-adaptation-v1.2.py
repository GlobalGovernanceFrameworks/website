from pathlib import Path
import json
from jsonschema import Draft202012Validator, FormatChecker
b=Path(__file__).resolve().parent
spec=json.loads((b/'implementation-and-adaptation-v1.2.json').read_text())
ss=json.loads((b/'implementation-and-adaptation-v1.2-specification.schema.json').read_text())
rs=json.loads((b/'implementation-and-adaptation-v1.2.schema.json').read_text())
Draft202012Validator(ss,format_checker=FormatChecker()).validate(spec)
for f in ['implementation-and-adaptation-v1.2-example-causally-adequate-pilot.json','implementation-and-adaptation-v1.2-example-capacity-limited-handoff.json','implementation-and-adaptation-v1.2-example-ordinary-ownership-transition.json']:
    Draft202012Validator(rs,format_checker=FormatChecker()).validate(json.loads((b/f).read_text()))
assert len(spec['records'])==50
assert len(spec['gmeaia_crosswalk'])==60
assert len(spec['common_header_fields'])==48
assert len(spec['readiness_gates'])==45
assert len(spec['compound_tests'])==48
print('PASS: IAF v1.2 catalogue and examples validate.')
