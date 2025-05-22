#!/bin/bash

# Output file name
output_file="../environmental-stewardship.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "01-introduction.md"
  "02-guiding-principles"
  "03-governance-structure.md"
  "04-core-pillars.md"
  "05-policy-mechanisms.md"
  "06-stakeholder-engagement.md"
  "07-financing-mechanisms.md"
  "08-implementation-roadmap.md"
  "09-metrics-for-success.md"
  "10-visualizations.md"
  "11-challenges-and-solutions.md"
  "12-implementation-tools.md"
  "13-reparations-protocol.md"
  "14-conclusion.md"
  "15-appendices.md"
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

