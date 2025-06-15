#!/bin/bash

# Output file name
output_file="../financial-systems.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "01-introduction.md"
  "02-core-principles"
  "03-structural-components.md"
  "04-implementation-approaches.md"
  "05-metrics-evaluation.md"
  "06-supporting-sections.md"
  "07-appendices.md"
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

echo "✅ Financial framework concatenated into: $output_file"

