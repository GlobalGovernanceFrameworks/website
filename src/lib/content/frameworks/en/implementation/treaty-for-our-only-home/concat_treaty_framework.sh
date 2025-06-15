#!/bin/bash

# Output file name
output_file="../treaty-for-our-only-home.md"

# Files in the correct order according to index.md
files=(
    "index.md"
    "01-introduction.md"
    "02-core-principles.md"
    "03-five-pillars.md"
    "04-implementation-strategies.md"
    "05-monitoring-evaluation.md"
    "06-conclusion.md"
    "07-faq-and-challenges.md"
    "08-glossary.md"
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

echo "✅ Treaty for Our Only Home concatenated into: $output_file"

