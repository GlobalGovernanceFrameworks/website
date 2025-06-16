#!/bin/bash

# Output file name
output_file="../global-citizenship.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "01-foundational-values.md"
  "02-meaning-practice.md"
  "03-development-path.md"
  "04-tangible-benefits.md"
  "05-overcoming-barriers.md"
  "06-intergenerational-perspectives.md"
  "07-technology-ethics.md"
  "08-measuring-impact.md"
  "09-inclusive-pathways.md"
  "10-professional-integration.md"
  "11-crisis-response.md"
  "12-ai-digital-technologies.md"
  "13-self-assessment-tools.md"
  "14-economic-foundations.md"
  "15-future-proofing.md"
  "16-advanced-implementation.md"
  "17-expanding-boundaries.md"
  "18-beyond-human-centered.md"
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

echo "✅ Global Citizenship framework concatenated into: $output_file"

