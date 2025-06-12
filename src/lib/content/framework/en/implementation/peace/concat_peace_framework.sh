#!/bin/bash

# Output file name
output_file="../peace.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "preamble.md"
  "core-principles.md"
  "local-implementation.md"
  "indigenous-integration.md"
  "regional-implementation.md"
  "global-implementation.md"
  "digital-infrastructure.md"
  "ai-ethics.md"
  "emerging-technologies.md"
  "non-state-actors.md"
  "military-transformation.md"
  "whistleblower-protection.md"
  "structural-prevention.md"
  "climate-resource.md"
  "transitional-justice.md"
  "mental-health.md"
  "developmental-value-systems.md"
  "educational-cultural-infrastructure.md"
  "peace-financing.md"
  "peace-business-integration.md"
  "media-information.md"
  "context-specific-roadmaps.md"
  "implementation-timeline.md"
  "implementation-challenges.md"
  "visualizations.md"
  "measuring-success.md"
  "cross-domain-integration.md"
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

