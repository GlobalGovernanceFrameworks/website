#!/bin/bash

# Output file name
output_file="../aging.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "preamble.md"
  "01-economic-security.md"
  "02-meaningful-occupation.md"
  "03-healthcare-climate.md"
  "04-social-inclusion.md"
  "05-nested-governance.md"
  "06-legal-ethical.md"
  "07-implementation-roadmap.md"
  "08-monitoring-adaptive.md"
  "09-call-to-action.md"
  "10-appendices.md"
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

