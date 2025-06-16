import os
import re

output = []

# Regex to match hex color codes (#abc, #aabbcc, #aabbccdd)
hex_color_pattern = re.compile(r'#(?:[0-9a-fA-F]{3}){1,2}(?:[0-9a-fA-F]{2})?\b')

# Look one level down from current directory
for folder in os.listdir('.'):
    folder_path = os.path.join('.', folder)
    if os.path.isdir(folder_path):
        file_path = os.path.join(folder_path, '+page.svelte')
        if os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()

            color_lines = [line.strip() for line in lines if hex_color_pattern.search(line)]

            if color_lines:
                output.append(f"[{folder}]:")
                output.extend(color_lines)
                output.append("")  # Add an empty line for separation

# Write to output file
with open('color_report.txt', 'w', encoding='utf-8') as out_file:
    out_file.write("\n".join(output))

print("✅ Color report generated: color_report.txt")

