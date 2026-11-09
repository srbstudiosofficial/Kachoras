# -*- coding: utf-8 -*-
with open(r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\tailwind.config.js", "r", encoding="utf-8") as f:
    text = f.read()

target = '"./src/**/*.{js,ts,jsx,tsx}",'
replacement = '"./src/**/*.{js,ts,jsx,tsx}",\n    "./hero-options/**/*.html",\n    "./generate_hero_options.py",'

if target in text:
    text = text.replace(target, replacement)
    with open(r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\tailwind.config.js", "w", encoding="utf-8") as f:
        f.write(text)
    print("Updated tailwind.config.js successfully")
else:
    print("Target not found in tailwind.config.js")
