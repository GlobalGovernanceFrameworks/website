#!/bin/bash

# Output file name
output_file="../biodiversity.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "00-philosophical-preamble.md"
  "01-introduction-vision.md"
  "02-guiding-principles.md"
  "03-core-pillars.md"
  "04-governance-structure.md"
  "05-policy-mechanisms.md"
  "06-stakeholder-engagement.md"
  "07-financing-mechanisms.md"
  "08-implementation-roadmap.md"
  "09-metrics-success.md"
  "10-visualizations.md"
  "11-challenges-solutions.md"
  "12-implementation-tools.md"
  "13-reparations-protocol.md"
  "14-conclusion-call-to-action.md"
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

echo "✅ Peace framework concatenated into: $output_file"

