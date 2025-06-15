#!/bin/bash

# Output file name
output_file="../justice.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "01-introduction.md"
  "02-governance-structure.md"
  "03-legal-framework.md"
  "04-implementation-mechanisms.md"
  "05-digital-justice-innovation.md"
  "06-monitoring-accountability.md"
  "07-stakeholder-engagement.md"
  "08-challenges-mitigation.md"
  "09-timeline-milestones.md"
  "10-conclusion.md"
  "11-appendices.md"
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

echo "✅ Justice framework concatenated into: $output_file"

