# -*- coding: utf-8 -*-
import re

# 1. Update HomePage.jsx
home_path = r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\src\pages\HomePage.jsx"
with open(home_path, "r", encoding="utf-8") as f:
    home_text = f.read()

start_marker = "{/* 3. Landmark Delivered Works Showcase"
idx = home_text.find(start_marker)
if idx != -1:
    end_idx = home_text.find("</section>", idx) + len("</section>")
    home_text = home_text[:idx] + home_text[end_idx:]
    print("Removed Landmark Delivered Works from HomePage.jsx")
    with open(home_path, "w", encoding="utf-8") as f:
        f.write(home_text)
else:
    print("Start marker not found in HomePage.jsx")

# 2. Update generate_hero_options.py
gen_path = r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\generate_hero_options.py"
with open(gen_path, "r", encoding="utf-8") as f:
    gen_text = f.read()

marker = "<!-- 4. DELIVERED LANDMARK WORKS"
idx2 = gen_text.find(marker)
if idx2 != -1:
    end_idx2 = gen_text.find("</section>", idx2) + len("</section>")
    gen_text = gen_text[:idx2] + gen_text[end_idx2:]
    print("Removed DELIVERED LANDMARK WORKS from generate_hero_options.py")

# Also remove #projects from nav and footer in generate_hero_options.py
gen_text = gen_text.replace('<a href="#projects" class="hover:text-[#B3261E] transition">Projects</a>\n', '')
gen_text = gen_text.replace('<a href="#projects" class="hover:text-[#B3261E] transition">Projects</a>', '')
gen_text = gen_text.replace('<a href="#projects" class="hover:text-white transition">Projects</a>\n', '')
gen_text = gen_text.replace('<a href="#projects" class="hover:text-white transition">Projects</a>', '')

with open(gen_path, "w", encoding="utf-8") as f:
    f.write(gen_text)

print("Updated generate_hero_options.py successfully")
