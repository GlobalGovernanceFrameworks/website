#!/bin/bash

# Output file name
output_file="../mental-health.md"

# Files in the correct order according to index.md
files=(
    "index.md",
    "01-vision-principles.md",
    "02-governance-structures.md",
    "03-legal-policy.md",
    "04-financing-resources.md",
    "05-service-delivery.md",
    "06-monitoring-accountability.md",
    "07-crisis-response.md",
    "08-innovation-research.md",
    "09-cross-cutting-themes.md",
    "10-implementation-strategy.md",
    "11-political-strategy.md",
    "12-risk-management.md",
    "13-technology-implementation.md",
    "14-change-management.md",
    "15-conclusion.md"
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

