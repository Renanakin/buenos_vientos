import os
import glob

replacements = {
    'brand-darker': 'bg-main',
    'brand-dark': 'bg-alt',
    'brand-gray': 'surface-main',
    'brand-gold-hover': 'brand-accent-soft',
    'brand-gold': 'brand-accent',
    'brand-text': 'text-primary-dark',
    'brand-muted': 'text-muted-dark'
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src/components'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.jsx'):
            process_file(os.path.join(root, file))

print("Done replacing tokens.")
