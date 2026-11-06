# -*- coding: utf-8 -*-
"""
Generator for Kachoras Hero Design Options:
Creates 4 standalone, FULL LANDING PAGE HTML files for client review:
1. current_design.html (Current Live Design - Full Landing Page with Dark Overlay Hero)
2. option1_split_hero.html (Full Landing Page with Clean 50/50 Split Hero - Villa Shehab Card)
3. option2_showcase_card.html (Full Landing Page with Architectural Showcase Card - Villa Al Bannay)
4. option3_quadrant_grid.html (Full Landing Page with 4-Photo Capability Mosaic Hero)
"""

import os
import base64
import zipfile

ASSETS_DIR = r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\public\assets"
REAL_DIR = os.path.join(ASSETS_DIR, "real-projects")
OUTPUT_DIR = r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\hero-options"
ARTIFACT_DIR = r"C:\Users\SRB TrollersYT\.gemini\antigravity\brain\f35202af-5cf6-4efe-a4fd-fc09b699d4ad"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

def to_b64(path):
    with open(path, "rb") as f:
        data = f.read()
    ext = os.path.splitext(path)[1].lower()
    mime = "image/png" if ext == ".png" else "image/jpeg"
    return f"data:{mime};base64,{base64.b64encode(data).decode('ascii')}"

LOGO_B64 = to_b64(os.path.join(ASSETS_DIR, "kachoras-official-logo.png"))
SHEHAB_B64 = to_b64(os.path.join(REAL_DIR, "completed-construction-shehab-423-1407-wide.jpg"))
ALBANNAY_B64 = to_b64(os.path.join(REAL_DIR, "completed-construction-albannay-424-7036.jpg"))
GLASS_B64 = to_b64(os.path.join(REAL_DIR, "completed-aluminum-contemporary-geometric.jpg"))
MEP_B64 = to_b64(os.path.join(ASSETS_DIR, "mep.jpg"))
CIVIC_B64 = to_b64(os.path.join(ASSETS_DIR, "civic.jpg"))
GLAZING_B64 = to_b64(os.path.join(REAL_DIR, "completed-aluminum-travertine-glazing.jpg"))

def get_top_banner(active_idx):
    tabs = [
        ("current_design.html", "1. Current Design (Dark Hero)", 1),
        ("option1_split_hero.html", "2. Option 1: 50/50 Split (Preferred)", 2),
        ("option2_showcase_card.html", "3. Option 2: Architectural Card", 3),
        ("option3_quadrant_grid.html", "4. Option 3: 4-Photo Mosaic", 4)
    ]
    buttons_html = ""
    for href, title, idx in tabs:
        is_active = (idx == active_idx)
        if is_active:
            buttons_html += f'<a href="{href}" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#B3261E] text-white shadow-sm flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-white animate-pulse"></span> {title}</a>\n'
        else:
            buttons_html += f'<a href="{href}" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/80 hover:bg-white text-slate-700 border border-slate-300 hover:border-slate-400 transition">{title}</a>\n'

    return f"""
    <!-- Top Review Switcher Bar (Sticky) -->
    <div class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-700 py-2.5 px-4 shadow-md">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2 text-xs">
          <span class="px-2.5 py-0.5 rounded-full bg-[#B3261E] text-white font-bold uppercase tracking-wider text-[10px]">Client Review</span>
          <span class="font-bold text-slate-200">Kachoras Full Landing Page Review</span>
          <span class="text-slate-400 hidden sm:inline">• Compare Hero Options in Full Context</span>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2">
          {buttons_html}
        </div>
      </div>
    </div>
    """

def get_nav_html():
    return f"""
    <!-- Global Header / Navbar (Pure White Theme) -->
    <header class="sticky top-12 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <a href="#hero" class="flex items-center gap-3">
          <img src="{LOGO_B64}" alt="Kachoras Electromechanical Contracting LLC" class="h-12 w-auto object-contain" />
        </a>

        <!-- Navigation Links -->
        <nav class="hidden lg:flex items-center gap-7 text-xs font-bold tracking-wider uppercase text-slate-700">
          <a href="#hero" class="text-[#B3261E] pb-1 border-b-2 border-[#B3261E]">Home</a>
          <a href="#disciplines" class="hover:text-[#B3261E] transition">Disciplines</a>
          <a href="#advantage" class="hover:text-[#B3261E] transition">Advantage</a>
          <a href="#process" class="hover:text-[#B3261E] transition">Construction Process</a>
          <a href="#projects" class="hover:text-[#B3261E] transition">Projects</a>
          <a href="#consultants" class="hover:text-[#B3261E] transition">Consultants</a>
          <a href="#contact" class="hover:text-[#B3261E] transition">Contact & Tender</a>
        </nav>

        <!-- CTA Button -->
        <div class="flex items-center gap-3">
          <a href="#contact" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-md hover:shadow-lg">
            <span>Enquiry / RFQ</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>
    </header>
    """

def get_common_sections_html():
    return f"""
    <!-- 1. CORE DISCIPLINES SECTION (Complete Turnkey Construction Services) -->
    <section id="disciplines" class="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="max-w-3xl space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-[#B3261E]"></span>
            <span>Complete Turnkey Construction Services</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Four Specialized In-House Divisions Working in Complete Synergy
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            By operating G+1 Construction, MEP Engineering, Aluminium & Glass Fabrication, and Civil Maintenance directly under one trade license, Kachoras eliminates subcontractor markups, delays, and coordination gaps.
          </p>
        </div>

        <!-- 4 Division Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- Card 1: G+1 Construction -->
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition group flex flex-col">
            <div class="relative h-64 overflow-hidden bg-slate-100">
              <img src="{ALBANNAY_B64}" alt="G+1 Licensed Construction" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div class="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                01 / Discipline
              </div>
              <div class="absolute bottom-3 left-3 bg-[#B3261E] text-white text-xs font-bold px-3 py-1 rounded-lg">
                Complete Turnkey Construction Services
              </div>
            </div>
            <div class="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-slate-900">G+1 Licensed Construction</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Complete construction services from foundations to final handover of keys in compliance with Dubai Municipality regulations and engineering standards.
                </p>
              </div>
              <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-700">
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">DM G+1 Certified</span>
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">Full Structural RCC</span>
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">Turnkey Handover</span>
              </div>
            </div>
          </div>

          <!-- Card 2: MEP Works -->
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition group flex flex-col">
            <div class="relative h-64 overflow-hidden bg-slate-100">
              <img src="{MEP_B64}" alt="MEP Works & Engineering" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div class="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                02 / Discipline
              </div>
              <div class="absolute bottom-3 left-3 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-lg">
                HVAC, Electrical & Plumbing
              </div>
            </div>
            <div class="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-slate-900">MEP Works & Engineering</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Complete mechanical, electrical, and plumbing (MEP) services, covering all stages from installation to testing and commissioning. Approved subcontractor for leading AC brands including Carrier, O General, Trane, Daikin, and Super General.
                </p>
              </div>
              <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-700">
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">Carrier & Daikin</span>
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">DEWA Energization</span>
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">Fire Fighting & HVAC</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Aluminium & Glass -->
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition group flex flex-col">
            <div class="relative h-64 overflow-hidden bg-slate-100">
              <img src="{GLASS_B64}" alt="Aluminium & Glass Works" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div class="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                03 / Discipline
              </div>
              <div class="absolute bottom-3 left-3 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-lg">
                Manufacturing & Installation
              </div>
            </div>
            <div class="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-slate-900">Aluminium & Glass Works</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Manufacturing and installation of aluminium doors, windows, skylights, pergolas, glass and mirrors fabricated at our dedicated Al Qusais facility.
                </p>
              </div>
              <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-700">
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">Al Qusais Facility</span>
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">Structural Glazing</span>
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">Curtain Walls & Pergolas</span>
              </div>
            </div>
          </div>

          <!-- Card 4: Civil Maintenance -->
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition group flex flex-col">
            <div class="relative h-64 overflow-hidden bg-slate-100">
              <img src="{CIVIC_B64}" alt="Civil Maintenance & Fit-out" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div class="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                04 / Discipline
              </div>
              <div class="absolute bottom-3 left-3 bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-lg">
                Approved Municipality, MBRHE & EIB Contractor
              </div>
            </div>
            <div class="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-slate-900">Civil Maintenance & Fit-out Works</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Approved contractor for Dubai Municipality General Maintenance Department, MBRHE, and EIB, providing building maintenance, renovation, and interior finishing services including decorative gypsum ceilings, custom kitchen cabinets, wardrobes, and general building maintenance.
                </p>
              </div>
              <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-700">
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">DM Maintenance Dept</span>
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">Kitchen Cabinets</span>
                <span class="bg-slate-100 px-2.5 py-1 rounded-lg">Custom Wardrobes</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. THE KACHORAS ADVANTAGE -->
    <section id="advantage" class="py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#B3261E] text-xs font-bold uppercase tracking-wider shadow-xs">
            <span>The Kachoras Advantage</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            One Company, Complete Project Solutions
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            By handling Civil, MEP, Aluminium, and Joinery directly in-house, we eliminate the delays, disputes, and finger-pointing common with multi-subcontractor models.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-[#B3261E]/10 text-[#B3261E] flex items-center justify-center font-black text-sm">01</div>
            <h3 class="text-base font-bold text-slate-900">One Point of Contact</h3>
            <p class="text-xs text-slate-600 leading-relaxed">A single dedicated project manager oversees civil structure, MEP routing, and aluminium installations from start to finish.</p>
          </div>

          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-[#B3261E]/10 text-[#B3261E] flex items-center justify-center font-black text-sm">02</div>
            <h3 class="text-base font-bold text-slate-900">Better Coordination</h3>
            <p class="text-xs text-slate-600 leading-relaxed">MEP conduits and pipework are embedded directly during RCC pouring, eliminating costly slab chopping and rework.</p>
          </div>

          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-[#B3261E]/10 text-[#B3261E] flex items-center justify-center font-black text-sm">03</div>
            <h3 class="text-base font-bold text-slate-900">Aluminium & Glass Works</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Custom aluminium windows, pergolas, and facade glazing are fabricated in our own Al Qusais facility for quality control.</p>
          </div>

          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-[#B3261E]/10 text-[#B3261E] flex items-center justify-center font-black text-sm">04</div>
            <h3 class="text-base font-bold text-slate-900">Cost & Time Management</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Direct in-house execution and fleet control ensure projects are delivered on schedule and within budget without middleman markups.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. OUR CONSTRUCTION PROCESS -->
    <section id="process" class="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="max-w-3xl space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <span>Rigorous Engineering Standards</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Our Construction Process: 4 Turnkey Phases
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every step is supervised by our qualified civil engineers and documented with Dubai Municipality inspection stages.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <span class="text-xs font-bold text-[#B3261E] tracking-wider uppercase">Phase 01</span>
            <h3 class="text-lg font-bold text-slate-900">Foundation & Substructure</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Site survey, soil testing, excavation, anti-termite treatment, plain concrete, reinforced foundation footings, waterproofing, and plinth tie-beams.
            </p>
          </div>

          <div class="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <span class="text-xs font-bold text-[#B3261E] tracking-wider uppercase">Phase 02</span>
            <h3 class="text-lg font-bold text-slate-900">Structure & Blockwork</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Reinforced concrete columns, suspended beams, roof slabs, staircase core, autoclaved thermal block masonry, and lintel casting with structural inspections.
            </p>
          </div>

          <div class="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <span class="text-xs font-bold text-[#B3261E] tracking-wider uppercase">Phase 03</span>
            <h3 class="text-lg font-bold text-slate-900">MEP, Aluminium & Fit-Out</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Electrical conduits, plumbing stacks, HVAC ductwork, Al Qusais aluminium doors, structural glazing, internal plaster, tiles, and joinery.
            </p>
          </div>

          <div class="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <span class="text-xs font-bold text-[#B3261E] tracking-wider uppercase">Phase 04</span>
            <h3 class="text-lg font-bold text-slate-900">Testing & Final Handover</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Pressure testing, DEWA energization, DM civil defense inspection, building completion certificate (BCC), snag resolution, and key handover.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. DELIVERED LANDMARK WORKS -->
    <section id="projects" class="py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#B3261E] text-xs font-bold uppercase tracking-wider shadow-xs">
              <span>Delivered Landmark Works</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              A Proven Track Record of Dubai Municipality Certified Handovers
            </h2>
            <p class="text-sm text-slate-600">
              Photographic documentation of our completed turnkey G+1 residential villas and specialized facade installations across Dubai.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Project 1 -->
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition group">
            <div class="relative h-64 overflow-hidden bg-slate-100">
              <img src="{SHEHAB_B64}" alt="Villa Shehab" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                G+1 Residential Villa
              </div>
              <div class="absolute bottom-3 left-3 bg-[#B3261E] text-white text-xs font-bold px-3 py-1 rounded-lg">
                Plot 423-1407 • Al Warqaa Third
              </div>
            </div>
            <div class="p-6 space-y-2">
              <h3 class="text-lg font-bold text-slate-900">Residential G+1 Luxury Villa</h3>
              <p class="text-xs text-slate-600">
                Turnkey civil structure, MEP execution, high-performance double glazing, and luxury interior finishes certified by Dubai Municipality.
              </p>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition group">
            <div class="relative h-64 overflow-hidden bg-slate-100">
              <img src="{ALBANNAY_B64}" alt="Villa Al Bannay" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                G+1 Residential Villa
              </div>
              <div class="absolute bottom-3 left-3 bg-[#B3261E] text-white text-xs font-bold px-3 py-1 rounded-lg">
                Plot 424-7036 • Al Warqaa Fourth
              </div>
            </div>
            <div class="p-6 space-y-2">
              <h3 class="text-lg font-bold text-slate-900">Villa Al Bannay Turnkey Handover</h3>
              <p class="text-xs text-slate-600">
                RCC structural skeleton, HVAC ducting, in-house aluminium doors, thermal insulated glass, and full municipality sign-off.
              </p>
            </div>
          </div>

          <!-- Project 3 -->
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition group">
            <div class="relative h-64 overflow-hidden bg-slate-100">
              <img src="{GLAZING_B64}" alt="Travertine Glazing" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Aluminium & Glass
              </div>
              <div class="absolute bottom-3 left-3 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-lg">
                Al Qusais Facility Fabrication
              </div>
            </div>
            <div class="p-6 space-y-2">
              <h3 class="text-lg font-bold text-slate-900">Architectural Facade & Structural Glazing</h3>
              <p class="text-xs text-slate-600">
                Precision aluminium profile cutting, tempered acoustic glass fabrication, and on-site crane installation for premium villas.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 5. APPROVED CONSULTANT ENGINEERING PARTNERS -->
    <section id="consultants" class="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <span>Engineering Alliances</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Approved Consultant Engineering Partners
          </h2>
          <p class="text-xs sm:text-sm text-slate-600">
            Kachoras has collaborated with leading architectural and engineering consultancies across Dubai on landmark G+1 villas, building maintenance, and electromechanical works.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 class="text-sm font-bold text-slate-900">Al Bait International Architectural Design Consultancy</h4>
            <p class="text-xs text-[#B3261E] font-semibold">G+1 Villas, Building Maintenance and MEP works</p>
            <p class="text-[11px] text-slate-500">Dubai Municipality Certified Coordination</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 class="text-sm font-bold text-slate-900">Al Asri Engineering Consultant</h4>
            <p class="text-xs text-[#B3261E] font-semibold">G+1 Villas, Building Maintenance and MEP works</p>
            <p class="text-[11px] text-slate-500">Structural & MEP Project Approvals</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 class="text-sm font-bold text-slate-900">Dimensions Engineering Consultants</h4>
            <p class="text-xs text-[#B3261E] font-semibold">G+1 Villas, Building Maintenance and MEP works</p>
            <p class="text-[11px] text-slate-500">Residential Villa & MEP Design Execution</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 class="text-sm font-bold text-slate-900">Golden Square Engineering Consultants</h4>
            <p class="text-xs text-[#B3261E] font-semibold">G+1 Villas, Building Maintenance and MEP works</p>
            <p class="text-[11px] text-slate-500">RCC Framing & Authority Submissions</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 class="text-sm font-bold text-slate-900">National Engineering Bureau (NEB)</h4>
            <p class="text-xs text-[#B3261E] font-semibold">G+1 Villas, Building Maintenance and MEP works</p>
            <p class="text-[11px] text-slate-500">Masterplan & High-End Construction Inspection</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 class="text-sm font-bold text-slate-900">Arenco Real Estate & Engineering</h4>
            <p class="text-xs text-[#B3261E] font-semibold">G+1 Villas, Building Maintenance and MEP works</p>
            <p class="text-[11px] text-slate-500">Engineering Supervision & Handover Protocols</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. PRE-FOOTER DIRECT TENDER / RFQ ACTION BANNER -->
    <section id="contact" class="py-14 sm:py-20 bg-slate-950 text-white border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div class="space-y-3 max-w-2xl text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for New Tenders & Construction Contracts</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Ready to Discuss Your G+1 Villa or Commercial Project in Dubai?
            </h2>
            <p class="text-sm text-slate-300 leading-relaxed">
              Contact our engineering desk for project estimates, tender submissions, or a visit to our dedicated aluminium and joinery facility in Al Qusais.
            </p>
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-2">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-[#B3261E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                +971 4 258 0667
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-[#B3261E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                info@kachoras.com
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-[#B3261E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                B25, Bin Sougat Complex, Al Qusais Ind 1
              </span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button class="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center gap-2">
              <span>Request Project Proposal</span>
              <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. CORPORATE FOOTER -->
    <footer class="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div class="flex items-center gap-4">
            <img src="{LOGO_B64}" alt="Kachoras Logo" class="h-10 w-auto object-contain bg-white p-1 rounded-lg" />
            <div>
              <div class="font-arabic text-base font-bold text-[#E0A96D]" dir="rtl">كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م</div>
              <div class="text-xs font-bold text-white">Kachoras Electromechanical Contracting LLC</div>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#hero" class="hover:text-white transition">Home</a>
            <a href="#disciplines" class="hover:text-white transition">Disciplines</a>
            <a href="#advantage" class="hover:text-white transition">Advantage</a>
            <a href="#process" class="hover:text-white transition">Process</a>
            <a href="#projects" class="hover:text-white transition">Projects</a>
            <a href="#consultants" class="hover:text-white transition">Consultants</a>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2006 – 2026 Kachoras Electromechanical Contracting LLC. Dubai Municipality Approved G+1 Contractor • License #578964.
          </div>
          <div class="text-slate-400">
            Evaluation Build • Full Landing Page Preview
          </div>
        </div>
      </div>
    </footer>
    """

def get_page_wrapper(title, hero_html, active_idx):
    return f"""<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} - Kachoras Electromechanical Contracting LLC</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Tajawal:wght@500;700;900&display=swap" rel="stylesheet">
  <style>
    body {{
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #FFFFFF;
      color: #0F172A;
      margin: 0;
      padding: 0;
    }}
    .font-arabic {{
      font-family: 'Tajawal', sans-serif;
    }}
  </style>
</head>
<body class="antialiased bg-white min-h-screen flex flex-col">
  {get_top_banner(active_idx)}
  {get_nav_html()}
  <main class="flex-grow">
    <div id="hero">
      {hero_html}
    </div>
    {get_common_sections_html()}
  </main>
</body>
</html>
"""

# =====================================================================
# 1. CURRENT HERO HTML (Full-Bleed Dark Cinematic Overlay)
# =====================================================================
def get_current_hero():
    return f"""
    <section class="relative text-white pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden min-h-[640px] flex flex-col justify-between">
      
      <!-- Background Photo -->
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style="background-image: url('{SHEHAB_B64}');"
      ></div>

      <!-- Deep Cinematic Dark Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/95 via-[#0B0F17]/88 to-[#0B0F17]/70"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-black/40"></div>

      <!-- Main Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- Left 7 Cols -->
          <div class="lg:col-span-7 space-y-6">
            <div class="space-y-3">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Dubai Municipality Approved G+1 Contractor • License #578964</span>
              </div>

              <!-- Arabic Name -->
              <div class="font-arabic text-xl sm:text-2xl font-bold text-[#E0A96D]" dir="rtl">
                كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
              </div>

              <!-- English Title -->
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Kachoras Electromechanical <span class="text-[#E0A96D]">Contracting LLC</span>
              </h1>

              <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                With 20 years of experience in Dubai, we specialize in Construction and electromechanical works. We are accredited to deliver complete turnkey solutions for <strong>G+1 residential and commercial Villas/Building</strong>, <strong>MEP</strong>, <strong>Aluminium and Glass</strong>, <strong>Kitchen cabinets</strong>, and <strong>Wardrobes</strong>.
              </p>
            </div>

            <!-- Metric Strip -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl">
                <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">DM Registration</div>
                <div class="text-xs font-bold text-white">G+1 Approved</div>
              </div>
              <div class="p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl">
                <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Established</div>
                <div class="text-xs font-bold text-[#E0A96D]">Dubai 2006 (20 Yrs)</div>
              </div>
              <div class="p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl">
                <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</div>
                <div class="text-xs font-bold text-white">B25, Al Qusais Ind 1</div>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a href="#contact" class="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center gap-2">
                <span>Request Project Proposal</span>
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#disciplines" class="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition">
                Our Disciplines
              </a>
              <a href="#projects" class="px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E0A96D] hover:text-white transition flex items-center gap-1.5">
                <span>View Portfolio</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <!-- Right 5 Cols: Complete Turnkey Construction Services Card -->
          <div class="lg:col-span-5">
            <div class="bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-4">
              <div class="border-b border-white/10 pb-3">
                <span class="text-[10px] font-bold text-amber-400 tracking-wider uppercase">Official Scope</span>
                <h3 class="text-lg font-black text-white mt-0.5">Complete Turnkey Construction Services</h3>
              </div>
              <div class="space-y-3">
                <div class="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-7 h-7 rounded-lg bg-[#B3261E]/30 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">01</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">G+1 Licensed Construction</h4>
                    <p class="text-[11px] text-slate-300">Foundations, RCC structure, blockwork, plaster, and turnkey handover.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-7 h-7 rounded-lg bg-[#B3261E]/30 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">02</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">MEP Works</h4>
                    <p class="text-[11px] text-slate-300">Mechanical, electrical, plumbing, HVAC, fire fighting, and DEWA connections.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-7 h-7 rounded-lg bg-[#B3261E]/30 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">03</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">Aluminium & Glass Works</h4>
                    <p class="text-[11px] text-slate-300">Dedicated Al Qusais fabrication: curtain walls, structural glazing, doors & windows.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-7 h-7 rounded-lg bg-[#B3261E]/30 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">04</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">Dubai Municipality Works</h4>
                    <p class="text-[11px] text-slate-300">Civil maintenance, renovations, interior finishes, kitchen cabinets, and wardrobes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Credibility Bar -->
      <div class="relative z-10 border-t border-white/15 bg-black/50 backdrop-blur-md py-4 mt-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div class="text-2xl font-black text-white">20+</div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Years in UAE</div>
          </div>
          <div>
            <div class="text-2xl font-black text-amber-400">500+</div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Projects Completed</div>
          </div>
          <div>
            <div class="text-2xl font-black text-emerald-400">100%</div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Regulatory Compliance</div>
          </div>
          <div>
            <div class="text-2xl font-black text-white">G+1</div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">DM Approved License</div>
          </div>
        </div>
      </div>
    </section>
    """

# =====================================================================
# 2. OPTION 1 HERO (50/50 Clean Split - Villa Shehab Card)
# =====================================================================
def get_option1_hero():
    return f"""
    <section class="bg-white text-slate-900 pt-10 sm:pt-14 lg:pt-18 pb-12 lg:pb-16 border-b border-slate-200 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- Left Column (6 Cols) -->
          <div class="lg:col-span-6 space-y-6">
            
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold tracking-wide">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Dubai Municipality Approved G+1 Contractor • Lic #578964</span>
            </div>

            <div class="font-arabic text-xl sm:text-2xl font-black text-[#B3261E] tracking-normal" dir="rtl">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Kachoras Electromechanical <span class="text-[#B3261E]">Contracting LLC</span>
            </h1>

            <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              With 20 years of experience in Dubai, we specialize in Construction and electromechanical works. Accredited turnkey contractor for <strong>G+1 residential and commercial villas</strong>, <strong>MEP engineering</strong>, <strong>Aluminium & Glass</strong>, and <strong>Civil fit-out</strong>.
            </p>

            <!-- Registration Metrics Grid -->
            <div class="grid grid-cols-3 gap-3">
              <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">DM License</div>
                <div class="text-xs sm:text-sm font-black text-slate-900 mt-0.5">G+1 Approved</div>
              </div>
              <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Established</div>
                <div class="text-xs sm:text-sm font-black text-[#B3261E] mt-0.5">Dubai 2006 (20 Yrs)</div>
              </div>
              <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Fabrication</div>
                <div class="text-xs sm:text-sm font-black text-slate-900 mt-0.5">Al Qusais Ind 1</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a href="#contact" class="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg hover:shadow-xl flex items-center gap-2">
                <span>Request Project Proposal</span>
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#disciplines" class="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm">
                Our Disciplines
              </a>
              <a href="#projects" class="px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B3261E] hover:underline transition flex items-center gap-1.5">
                <span>View Portfolio</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <!-- Right Column (6 Cols): Prominent Project Card -->
          <div class="lg:col-span-6">
            <div class="relative bg-white rounded-3xl border border-slate-200 p-2.5 shadow-2xl overflow-hidden group">
              <div class="relative h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-slate-100">
                <img 
                  src="{SHEHAB_B64}" 
                  alt="Completed G+1 Residential Villa by Kachoras" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div class="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Turnkey RCC + MEP • 100% Compliant</span>
                </div>

                <div class="absolute inset-x-3 bottom-3 bg-slate-950/85 backdrop-blur-md border border-white/15 rounded-xl p-3.5 text-white">
                  <div class="flex items-center justify-between text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                    <span>Featured Handover</span>
                    <span>Dubai Municipality Certified</span>
                  </div>
                  <div class="text-sm font-bold text-white mt-0.5">Residential G+1 Luxury Villa</div>
                  <div class="text-xs text-slate-300 mt-0.5">Plot 423-1407, Al Warqaa Third, Dubai • Civil, MEP, Aluminium & Fit-Out</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Credibility Counters Strip -->
      <div class="mt-12 pt-8 border-t border-slate-200 bg-slate-50/80">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-3">
            <div class="text-3xl font-black text-slate-900">20+</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Years in Dubai</div>
          </div>
          <div class="p-3">
            <div class="text-3xl font-black text-[#B3261E]">500+</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Completed Projects</div>
          </div>
          <div class="p-3">
            <div class="text-3xl font-black text-emerald-600">100%</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Regulatory Compliance</div>
          </div>
          <div class="p-3">
            <div class="text-3xl font-black text-slate-900">G+1</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">DM Approved License</div>
          </div>
        </div>
      </div>
    </section>
    """

# =====================================================================
# 3. OPTION 2 HERO (Architectural Showcase Card - Villa Al Bannay)
# =====================================================================
def get_option2_hero():
    return f"""
    <section class="bg-gradient-to-b from-slate-50 via-white to-white text-slate-900 pt-10 sm:pt-14 lg:pt-18 pb-12 lg:pb-16 border-b border-slate-200 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- Left Column (6 Cols) -->
          <div class="lg:col-span-6 space-y-6">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B3261E]/10 border border-[#B3261E]/20 text-[#B3261E] text-xs font-bold">
              <span>Complete Turnkey Solutions • Dubai Municipality Certified</span>
            </div>

            <div class="font-arabic text-xl sm:text-2xl font-black text-[#B3261E]" dir="rtl">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.മ.മ
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Precision Construction & <span class="text-[#B3261E]">Engineering Excellence</span>
            </h1>

            <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              We execute complete turnkey construction from foundation excavation to final key handover. In-house MEP engineering, dedicated Aluminium & Glass fabrication, and direct municipal approvals.
            </p>

            <!-- 4 Scope Pillars Checklist -->
            <div class="space-y-2.5 pt-1">
              <div class="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>G+1 Approved RCC Structure, Foundations & Blockwork</span>
              </div>
              <div class="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>In-House MEP Engineering (Carrier, O General, Daikin, Trane)</span>
              </div>
              <div class="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>Al Qusais Facility Aluminium & Glass Architectural Fabrication</span>
              </div>
              <div class="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                <span>Direct Dubai Municipality, DEWA & Civil Defense Approvals</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 pt-3">
              <a href="#contact" class="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center gap-2">
                <span>Request Project Proposal</span>
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#disciplines" class="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm">
                View Turnkey Scope
              </a>
            </div>
          </div>

          <!-- Right Column (6 Cols): Architectural Showcase Card -->
          <div class="lg:col-span-6">
            <div class="bg-white rounded-3xl border border-slate-200 p-4 shadow-xl space-y-4">
              <div class="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#B3261E]"></span>
                  <span class="font-bold text-slate-800">Plot 424-7036 • G+1 Villa Handover</span>
                </div>
                <span class="font-mono text-slate-500 font-semibold text-[11px]">Al Warqaa, Dubai</span>
              </div>

              <div class="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100">
                <img 
                  src="{ALBANNAY_B64}" 
                  alt="Villa Al Bannay Handover" 
                  class="w-full h-full object-cover"
                />
                <div class="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-bold">
                  Completed Turnkey Construction
                </div>
              </div>

              <div class="grid grid-cols-3 gap-2 text-center pt-1">
                <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-[10px] uppercase font-bold text-slate-500">Structure</div>
                  <div class="text-xs font-bold text-slate-900 mt-0.5">RCC Framing</div>
                </div>
                <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-[10px] uppercase font-bold text-slate-500">MEP Scope</div>
                  <div class="text-xs font-bold text-[#B3261E] mt-0.5">Full Turnkey</div>
                </div>
                <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-[10px] uppercase font-bold text-slate-500">Compliance</div>
                  <div class="text-xs font-bold text-emerald-600 mt-0.5">DM Approved</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Credibility Counters Strip -->
      <div class="mt-12 pt-8 border-t border-slate-200 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-3xl font-black text-slate-900">20+</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Years in UAE</div>
          </div>
          <div>
            <div class="text-3xl font-black text-[#B3261E]">500+</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Projects Delivered</div>
          </div>
          <div>
            <div class="text-3xl font-black text-emerald-600">100%</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Compliance Rate</div>
          </div>
          <div>
            <div class="text-3xl font-black text-slate-900">G+1</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">DM Approved License</div>
          </div>
        </div>
      </div>
    </section>
    """

# =====================================================================
# 4. OPTION 3 HERO (4-Photo Capability Mosaic)
# =====================================================================
def get_option3_hero():
    return f"""
    <section class="bg-white text-slate-900 pt-10 sm:pt-14 lg:pt-18 pb-12 lg:pb-16 border-b border-slate-200 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- Left Column (6 Cols) -->
          <div class="lg:col-span-6 space-y-6">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold">
              <span class="w-2 h-2 rounded-full bg-[#B3261E]"></span>
              <span>One Company • Complete Project Solutions</span>
            </div>

            <div class="font-arabic text-xl sm:text-2xl font-black text-[#B3261E]" dir="rtl">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Complete Turnkey <span class="text-[#B3261E]">Construction Services</span>
            </h1>

            <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Kachoras integrates all core construction disciplines under one roof. No subcontracting delays, seamless coordination, and single-point responsibility for your G+1 villa or commercial project.
            </p>

            <!-- 4 Discipline Pills -->
            <div class="grid grid-cols-2 gap-2.5">
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
                <span class="w-2 h-2 rounded-full bg-[#B3261E]"></span>
                <span class="text-xs font-bold text-slate-800">G+1 Construction</span>
              </div>
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span class="text-xs font-bold text-slate-800">In-House MEP</span>
              </div>
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
                <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span class="text-xs font-bold text-slate-800">Aluminium & Glass</span>
              </div>
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
                <span class="w-2 h-2 rounded-full bg-amber-600"></span>
                <span class="text-xs font-bold text-slate-800">Civil Maintenance</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a href="#contact" class="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center gap-2">
                <span>Request Project Proposal</span>
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#projects" class="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm">
                Explore Portfolio
              </a>
            </div>
          </div>

          <!-- Right Column (6 Cols): 2x2 Photo Grid -->
          <div class="lg:col-span-6">
            <div class="grid grid-cols-2 gap-3 bg-slate-100 p-3 rounded-3xl border border-slate-200 shadow-xl">
              
              <!-- Quadrant 1: Villa Construction -->
              <div class="relative h-44 sm:h-48 rounded-2xl overflow-hidden group bg-slate-200 shadow-sm">
                <img src="{SHEHAB_B64}" alt="G+1 Villa Construction" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <div class="text-white">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-amber-300 block">Civil & RCC</span>
                    <span class="text-xs font-bold">G+1 Villa Construction</span>
                  </div>
                </div>
              </div>

              <!-- Quadrant 2: MEP Works -->
              <div class="relative h-44 sm:h-48 rounded-2xl overflow-hidden group bg-slate-200 shadow-sm">
                <img src="{MEP_B64}" alt="MEP Works" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <div class="text-white">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-blue-300 block">Mechanical & Electrical</span>
                    <span class="text-xs font-bold">In-House MEP Works</span>
                  </div>
                </div>
              </div>

              <!-- Quadrant 3: Aluminium & Glass -->
              <div class="relative h-44 sm:h-48 rounded-2xl overflow-hidden group bg-slate-200 shadow-sm">
                <img src="{GLASS_B64}" alt="Aluminium & Glass" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <div class="text-white">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-emerald-300 block">Al Qusais Facility</span>
                    <span class="text-xs font-bold">Aluminium & Glass</span>
                  </div>
                </div>
              </div>

              <!-- Quadrant 4: Civil Maintenance -->
              <div class="relative h-44 sm:h-48 rounded-2xl overflow-hidden group bg-slate-200 shadow-sm">
                <img src="{CIVIC_B64}" alt="Civil Maintenance" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <div class="text-white">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-amber-300 block">Fit-out & Renovation</span>
                    <span class="text-xs font-bold">Civil Maintenance</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- Credibility Counters Strip -->
      <div class="mt-12 pt-8 border-t border-slate-200 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-3xl font-black text-slate-900">20+</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Years in UAE</div>
          </div>
          <div>
            <div class="text-3xl font-black text-[#B3261E]">500+</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Projects Delivered</div>
          </div>
          <div>
            <div class="text-3xl font-black text-emerald-600">100%</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Compliance Rate</div>
          </div>
          <div>
            <div class="text-3xl font-black text-slate-900">G+1</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">DM Approved License</div>
          </div>
        </div>
      </div>
    </section>
    """

# =====================================================================
# Main execution & generation of 4 FULL LANDING PAGES
# =====================================================================
files_to_generate = [
    ("current_design.html", get_page_wrapper("Full Landing Page - Current Design (Dark Hero)", get_current_hero(), 1)),
    ("option1_split_hero.html", get_page_wrapper("Full Landing Page - Option 1: 50/50 Split (Preferred)", get_option1_hero(), 2)),
    ("option2_showcase_card.html", get_page_wrapper("Full Landing Page - Option 2: Architectural Card", get_option2_hero(), 3)),
    ("option3_quadrant_grid.html", get_page_wrapper("Full Landing Page - Option 3: 4-Photo Mosaic", get_option3_hero(), 4)),
]

print("Writing FULL LANDING PAGE HTML files to prototype hero-options/ and artifact directory...")
for filename, html_content in files_to_generate:
    proto_path = os.path.join(OUTPUT_DIR, filename)
    with open(proto_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"  [Prototype] {proto_path} ({os.path.getsize(proto_path):,} bytes)")

    artifact_path = os.path.join(ARTIFACT_DIR, filename)
    with open(artifact_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"  [Artifact]  {artifact_path} ({os.path.getsize(artifact_path):,} bytes)")

# Write index.html defaulting to option 1
index_content = get_page_wrapper("Full Landing Page - Option 1: 50/50 Split (Preferred)", get_option1_hero(), 2)
for folder in [OUTPUT_DIR, ARTIFACT_DIR]:
    with open(os.path.join(folder, "index.html"), "w", encoding="utf-8") as f:
        f.write(index_content)

# Update ZIP package
zip_proto = os.path.join(OUTPUT_DIR, "kachoras_hero_design_options.zip")
zip_artifact = os.path.join(ARTIFACT_DIR, "kachoras_hero_design_options.zip")

for zip_dest in [zip_proto, zip_artifact]:
    with zipfile.ZipFile(zip_dest, "w", zipfile.ZIP_DEFLATED) as zf:
        for filename, _ in files_to_generate:
            file_path = os.path.join(OUTPUT_DIR, filename)
            zf.write(file_path, arcname=filename)
        zf.write(os.path.join(OUTPUT_DIR, "index.html"), arcname="index.html")
    print(f"Updated ZIP: {zip_dest} ({os.path.getsize(zip_dest):,} bytes)")

print("\nAll 4 FULL LANDING PAGE HTML files generated and packaged successfully!")
