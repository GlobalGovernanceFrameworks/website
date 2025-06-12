#!/bin/bash

# Output file name
output_file="../indigenous.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "00-preamble.md"
  "01-core-principles.md"
  "02-structural-components.md"
  "03-implementation-timeline.md"
  "04-key-mechanisms.md"
  "05-expected-outcomes.md"
  "06-interface-existing-systems.md"
  "07-pathways-broader-engagement.md"
  "08-documentation-risk-assessment.md"
  "09-system-map-visual.md"
  "10-glossary-references.md"
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

echo "✅ Aging framework concatenated into: $output_file"

