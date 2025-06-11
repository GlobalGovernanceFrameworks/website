#!/bin/bash

# Output file name
output_file="../digital.md"

# Files in the correct order according to index.md
files=(
  "01-preamble.md"
  "02-core-principles.md"
  "03-governance-structure.md"
  "04-key-components.md"
  "05-implementation-roadmap.md"
  "06-monitoring-evaluation.md"
  "07-case-studies.md"
  "08-future-potential.md"
  "09-tools-resources.md"
  "10-call-to-action.md"
  "appendix-a-pilot-onboarding.md"
  "appendix-b-visual-companion-toolkit.md"
  "appendix-c-corporate-participation-playbook.md"
  "appendix-d-digital-ethics-charter.md"
  "appendix-e-commons-glossary.md"
  "appendix-f-minimal-viable-node-quickstart.md"
  "appendix-g-field-test-logbook-template.md"
  "appendix-h-faq-for-tech-skeptical-leaders.md"
  "appendix-i-diplomatic-mini-deck.md"
  "appendix-j-historical-commons-context.md"
  "appendix-k-impact-assessment-framework.md"
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

echo "✅ Digital framework concatenated into: $output_file"

