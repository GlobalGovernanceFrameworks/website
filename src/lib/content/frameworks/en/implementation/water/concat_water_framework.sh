#!/bin/bash

# Output file name
output_file="../water.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "theory-of-change.md"
  "01-guiding-principles.md"
  "02-institutional-policy-framework.md"
  "03-financing-investment.md"
  "04-service-delivery-infrastructure.md"
  "05-monitoring-accountability.md"
  "06-climate-environmental-integration.md"
  "07-innovation-knowledge-sharing.md"
  "08-crisis-response-adaptation.md"
  "09-social-behavioral-change.md"
  "10-global-partnerships.md"
  "11-ethical-systems-framing.md"
  "implementation-roadmap.md"
  "regional-implementation-blueprints.md"
  "glossary.md"
)

# Remove the output file if it exists
rm -f "$output_file"

# Concatenate each file
for file in "${files[@]}"; do
  if [[ -f "$file" ]]; then
    echo "## FILE: $file" >> "$output_file"
    cat "$file" >> "$output_file"
    echo -e "\n\n" >> "$output_file"
  else
    echo "WARNING: File not found: $file"
  fi
done

echo "✅ Water framework concatenated into: $output_file"

