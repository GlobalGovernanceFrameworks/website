from pathlib import Path
import json
from jsonschema import Draft202012Validator, FormatChecker
b=Path(__file__).resolve().parent
spec=json.loads((b/'institutional-regeneration-v1.0.json').read_text())
ss=json.loads((b/'institutional-regeneration-v1.0-specification.schema.json').read_text())
rs=json.loads((b/'institutional-regeneration-v1.0.schema.json').read_text())
Draft202012Validator(ss,format_checker=FormatChecker()).validate(spec)
for f in ['institutional-regeneration-v1.0-example-objective-reproduction-audit.json','institutional-regeneration-v1.0-example-capacity-limited-response.json','institutional-regeneration-v1.0-example-successor-transition.json']:
    Draft202012Validator(rs,format_checker=FormatChecker()).validate(json.loads((b/f).read_text()))
assert len(spec['records'])==50
assert len(spec['gmeaia_crosswalk'])==60
assert len(spec['common_header_fields'])==48
assert len(spec['readiness_gates'])==45
assert len(spec['compound_tests'])==48
print('PASS: IRF v1.0 catalogue and examples validate.')
