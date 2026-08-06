from pathlib import Path
import json
from jsonschema import Draft202012Validator, FormatChecker
b=Path(__file__).resolve().parent
spec=json.loads((b/'wise-decision-making-integration-protocol-v1.7.json').read_text())
ss=json.loads((b/'wise-decision-making-integration-protocol-v1.7-specification.schema.json').read_text())
rs=json.loads((b/'wise-decision-making-integration-protocol-v1.7.schema.json').read_text())
Draft202012Validator(ss,format_checker=FormatChecker()).validate(spec)
for f in ['wise-decision-making-integration-protocol-v1.7-example-assumption-audit.json','wise-decision-making-integration-protocol-v1.7-example-capacity-limited-response.json','wise-decision-making-integration-protocol-v1.7-example-protected-knowledge-contribution.json']:
    Draft202012Validator(rs,format_checker=FormatChecker()).validate(json.loads((b/f).read_text()))
print('PASS: WDIP v1.7 catalogue and examples validate.')
