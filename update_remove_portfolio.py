# -*- coding: utf-8 -*-
import re
import os

hero_path = r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\src\components\Hero.jsx"
gen_path = r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\generate_hero_options.py"

# 1. Update Hero.jsx
with open(hero_path, "r", encoding="utf-8") as f:
    hero_text = f.read()

hero_text = re.sub(
    r'\n\s*<button\s+onClick=\{\(\) => onNavigate\(\'projects\'\)\}.*?<\/button>',
    '',
    hero_text,
    flags=re.DOTALL
)

with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero_text)

print("Updated Hero.jsx")

# 2. Update generate_hero_options.py
with open(gen_path, "r", encoding="utf-8") as f:
    gen_text = f.read()

# In get_current_hero (around line 635)
gen_text = re.sub(
    r'\s*<a href="#projects" class="px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-\[#E0A96D\].*?<\/a>',
    '',
    gen_text,
    flags=re.DOTALL
)

# In get_option1_hero (around line 763)
gen_text = re.sub(
    r'\s*<a href="#projects" class="px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-\[#B3261E\].*?<\/a>',
    '',
    gen_text,
    flags=re.DOTALL
)

# In get_option3_hero: change Explore Portfolio to Our Disciplines (href="#disciplines")
gen_text = gen_text.replace(
    '''              <a href="#projects" class="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm">
                Explore Portfolio
              </a>''',
    '''              <a href="#disciplines" class="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm">
                Our Disciplines
              </a>'''
)

with open(gen_path, "w", encoding="utf-8") as f:
    f.write(gen_text)

print("Updated generate_hero_options.py")
