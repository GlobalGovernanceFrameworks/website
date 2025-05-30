#!/bin/bash

# Output file name
output_file="../planetary-health.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "00-manifesto.md"
  "01-governance-structure.md"
  "02-technology-data-infrastructure.md"
  "03-financing-mechanisms.md"
  "04-medical-innovation-access.md"
  "05-pandemic-climate-preparedness.md"
  "06-community-centered-healthcare.md"
  "07-transparency-anti-corruption.md"
  "08-health-literacy.md"
  "09-borderless-health-rights.md"
  "10-ethical-technology-governance.md"
  "11-implementation-roadmap.md"
  "12-health-conflict-zones.md"
  "13-global-knowledge-commons.md"
  "14-visual-architecture-map.md"
  "15-cross-cutting-mechanisms.md"
  "16-spiritual-framing.md"
  "17-conclusion.md"
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

