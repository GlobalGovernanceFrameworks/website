#!/bin/bash

# Output file name
output_file="../energy.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "01-introduction.md"
  "02-guiding-principles.md"
  "03-governance-structure.md"
  "04-core-pillars.md"
  "05-policy-mechanisms.md"
  "06-stakeholder-engagement.md"
  "07-financing-the-framework.md"
  "08-implementation-roadmap.md"
  "09-metrics-for-success.md"
  "10-challenges-and-solutions.md"
  "11-implementation-tools.md"
  "12-conclusion.md"
  "appendix-a.md"
  "appendix-b.md"
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

echo "✅ Energy framework concatenated into: $output_file"

