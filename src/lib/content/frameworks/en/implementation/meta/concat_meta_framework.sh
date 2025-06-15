#!/bin/bash

# Output file name
output_file="../meta.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "01-principles.md"
  "02-value-proposition.md"
  "03-structural.md"
  "04-implementation.md"
  "05-evaluation.md"
  "06-case-models.md"
  "07-future.md"
  "08-manifesto.md"
  "09-appendix.md"
  "10-related.md"
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

echo "✅ Meta Governance framework concatenated into: $output_file"

