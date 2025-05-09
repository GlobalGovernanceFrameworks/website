#!/bin/bash

# Output file name
output_file="../economic.md"

# Files in the correct order according to index.md
files=(
  "introduction.md"
  "core-principles.md"
  "local-implementation.md"
  "regional-implementation.md"
  "global-implementation.md"
  "nested-support.md"
  "tech-commons.md"
  "transitional-pathways.md"
  "decision-protocols.md"
  "cross-domain.md"
  "adaptive-governance.md"
  "monitoring.md"
  "outreach.md"
  "timeline.md"
  "challenges.md"
  "visualizations.md"
  "conclusion.md"
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

