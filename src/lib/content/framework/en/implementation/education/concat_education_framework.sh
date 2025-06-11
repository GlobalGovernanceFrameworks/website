#!/bin/bash

# Output file name
output_file="../education.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "01-preamble.md"
  "02-vision-principles"
  "03-structural-components.md"
  "04-implementation-strategies.md"
  "05-monitoring-evaluation.md"
  "06-sdg-alignment.md"
  "07-visual-multimedia.md"
  "08-case-models.md"
  "09-future-potential.md"
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

echo "✅ Education framework concatenated into: $output_file"

