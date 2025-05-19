#!/bin/bash

# Output file name
output_file="../spiritual.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "01-introduction.md"
  "02-core-principles.md"
  "03-objectives.md"
  "04-governance-structure.md"
  "05-implementation-mechanisms.md"
  "06-key-activities.md"
  "07-funding-and-resources.md"
  "08-challenges-and-mitigation-strategies.md"
  "09-timeline.md"
  "10-conclusion.md"
  "appendix-a.md"
  "appendix-b.md"
  "appendix-c.md"
  "appendix-d.md"
  "appendix-e.md"
  "appendix-f.md"
  "appendix-g.md"
  "appendix-h.md"
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

