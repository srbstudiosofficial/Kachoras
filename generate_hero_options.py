# -*- coding: utf-8 -*-
"""
Generator for Kachoras Hero Design Options:
Creates 4 standalone, 100% OFFLINE, MOBILE-OPTIMIZED FULL LANDING PAGE HTML files for client review:
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
SHEHAB_B64 = to_b64(os.path.join(ASSETS_DIR, "villa.jpg"))
ALBANNAY_B64 = to_b64(os.path.join(REAL_DIR, "completed-construction-albannay-424-7036.jpg"))
GLASS_B64 = to_b64(os.path.join(ASSETS_DIR, "aluminium.jpg"))
MEP_B64 = to_b64(os.path.join(ASSETS_DIR, "mep.jpg"))
CIVIC_B64 = to_b64(os.path.join(ASSETS_DIR, "civic.jpg"))

# Read compiled standalone CSS
CSS_PATH = os.path.join(OUTPUT_DIR, "standalone.css")
if os.path.exists(CSS_PATH):
    with open(CSS_PATH, "r", encoding="utf-8") as f:
        STANDALONE_CSS = f.read()
else:
    STANDALONE_CSS = ""

def get_top_banner(default_active_idx):
    tabs = [
        (1, "1. Current Design"),
        (2, "2. Option 1: 50/50 Split"),
        (3, "3. Option 2: Architectural Card"),
        (4, "4. Option 3: 4-Photo Mosaic")
    ]
    buttons_html = ""
    for idx, title in tabs:
        is_active = (idx == default_active_idx)
        if is_active:
            buttons_html += f'<button type="button" onclick="switchHero({idx})" id="tab-btn-{idx}" data-label="{title}" class="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-[#B3261E] text-white shadow-sm flex items-center gap-1 transition cursor-pointer"><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> {title}</button>\n'
        else:
            buttons_html += f'<button type="button" onclick="switchHero({idx})" id="tab-btn-{idx}" data-label="{title}" class="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold bg-white/80 hover:bg-white text-slate-800 border border-slate-300 transition cursor-pointer">{title}</button>\n'

    is_all_active = (default_active_idx == 'all')
    if is_all_active:
        all_btn = '<button type="button" onclick="switchHero(\'all\')" id="tab-btn-all" data-label="📜 Compare All" class="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-[#B3261E] text-white shadow-sm flex items-center gap-1 transition cursor-pointer"><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> 📜 Compare All</button>'
    else:
        all_btn = '<button type="button" onclick="switchHero(\'all\')" id="tab-btn-all" data-label="📜 Compare All" class="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold bg-white/80 hover:bg-white text-slate-800 border border-slate-300 transition cursor-pointer">📜 Compare All</button>'

    return f"""
    <!-- Top Review Switcher Bar (100% Instant Live Mobile Switcher - Zero Page Reload) -->
    <div class="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-700 py-1.5 sm:py-2.5 px-2 sm:px-4 shadow-lg" id="review-bar">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2.5">
        <div class="flex items-center gap-2 text-xs">
          <span class="px-2 py-0.5 rounded-full bg-[#B3261E] text-white font-black uppercase tracking-wider text-[9px] sm:text-[10px]">Client Review</span>
          <span class="font-bold text-slate-100 text-[11px] sm:text-xs">Kachoras Hero Design Switcher</span>
          <span class="text-slate-400 hidden sm:inline text-xs">• Tap any option to switch live</span>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5" id="hero-nav-tabs">
          {buttons_html}
          {all_btn}
        </div>
      </div>
    </div>
    """

def get_nav_html():
    return f"""
    <!-- Global Header / Navbar (Mobile-Optimized) -->
    <header class="sticky top-11 sm:top-12 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <!-- Logo -->
        <a href="#hero" class="flex items-center gap-2 sm:gap-3">
          <img src="{LOGO_B64}" alt="Kachoras Electromechanical Contracting LLC" class="h-9 sm:h-12 w-auto object-contain" />
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center gap-7 text-xs font-bold tracking-wider uppercase text-slate-700">
          <a href="#hero" class="text-[#B3261E] pb-1 border-b-2 border-[#B3261E]">Home</a>
          <a href="#disciplines" class="hover:text-[#B3261E] transition">Disciplines</a>
          <a href="#advantage" class="hover:text-[#B3261E] transition">Advantage</a>
          <a href="#process" class="hover:text-[#B3261E] transition">Construction Process</a>
          <a href="#consultants" class="hover:text-[#B3261E] transition">Consultants</a>
          <a href="#contact" class="hover:text-[#B3261E] transition">Contact & Tender</a>
        </nav>

        <!-- CTA Button -->
        <div class="flex items-center gap-2 sm:gap-3">
          <a href="#contact" class="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-md">
            <span>Enquiry / RFQ</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>
    </header>
    """

def get_common_sections_html():
    return f"""
    <!-- 1. CORE DISCIPLINES SECTION (Complete Turnkey Construction Services - Exact Sheet Copy) -->
    <section id="disciplines" class="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        <div class="max-w-3xl space-y-2 sm:space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-[#B3261E]"></span>
            <span>Complete Turnkey Construction Services</span>
          </div>
          <h2 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Four Specialized In-House Divisions Working in Complete Synergy
          </h2>
          <p class="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
            By operating G+1 Construction, MEP Engineering, Aluminium & Glass Fabrication, and Civil Maintenance directly under one trade license, Kachoras eliminates subcontractor markups, delays, and coordination gaps.
          </p>
        </div>

        <!-- 4 Division Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          <!-- Card 1: G+1 Construction -->
          <div class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-md sm:shadow-lg transition flex flex-col">
            <div class="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
              <img src="{ALBANNAY_B64}" alt="G+1 Licensed Construction" class="w-full h-full object-cover" />
              <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                01 / Discipline
              </div>
              <div class="absolute bottom-2.5 left-2.5 bg-[#B3261E] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg">
                Complete Turnkey Construction Services
              </div>
            </div>
            <div class="p-5 sm:p-7 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-1.5 sm:space-y-2">
                <h3 class="text-lg sm:text-xl font-bold text-slate-900">G+1 Licensed Construction</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Complete construction services from foundations to final handover of keys in compliance with Dubai Municipality regulations and engineering standards.
                </p>
              </div>
              <div class="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-slate-100 text-[10px] sm:text-[11px] font-semibold text-slate-700">
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">DM G+1 Certified</span>
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">Full Structural RCC</span>
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">Turnkey Handover</span>
              </div>
            </div>
          </div>

          <!-- Card 2: MEP Works (Authentic AC Photo) -->
          <div class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-md sm:shadow-lg transition flex flex-col">
            <div class="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
              <img src="{MEP_B64}" alt="MEP Works & Engineering" class="w-full h-full object-cover" />
              <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                02 / Discipline
              </div>
              <div class="absolute bottom-2.5 left-2.5 bg-blue-700 text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg">
                HVAC, Electrical & Plumbing
              </div>
            </div>
            <div class="p-5 sm:p-7 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-1.5 sm:space-y-2">
                <h3 class="text-lg sm:text-xl font-bold text-slate-900">MEP Works & Engineering</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Complete mechanical, electrical, and plumbing (MEP) services, covering all stages from installation to testing and commissioning. Approved subcontractor for leading AC brands including Carrier, O General, Trane, Daikin, and Super General.
                </p>
              </div>
              <div class="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-slate-100 text-[10px] sm:text-[11px] font-semibold text-slate-700">
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">Carrier & Daikin</span>
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">DEWA Energization</span>
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">Fire Fighting & HVAC</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Aluminium & Glass -->
          <div class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-md sm:shadow-lg transition flex flex-col">
            <div class="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
              <img src="{GLASS_B64}" alt="Aluminium & Glass Works" class="w-full h-full object-cover" />
              <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                03 / Discipline
              </div>
              <div class="absolute bottom-2.5 left-2.5 bg-emerald-700 text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg">
                Manufacturing & Installation
              </div>
            </div>
            <div class="p-5 sm:p-7 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-1.5 sm:space-y-2">
                <h3 class="text-lg sm:text-xl font-bold text-slate-900">Aluminium & Glass Works</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Manufacturing and installation of aluminium doors, windows, skylights, pergolas, glass and mirrors fabricated at our dedicated Al Qusais facility.
                </p>
              </div>
              <div class="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-slate-100 text-[10px] sm:text-[11px] font-semibold text-slate-700">
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">Al Qusais Facility</span>
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">Structural Glazing</span>
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">Curtain Walls & Pergolas</span>
              </div>
            </div>
          </div>

          <!-- Card 4: Civil Maintenance -->
          <div class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-md sm:shadow-lg transition flex flex-col">
            <div class="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
              <img src="{CIVIC_B64}" alt="Civil Maintenance & Fit-out" class="w-full h-full object-cover" />
              <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                04 / Discipline
              </div>
              <div class="absolute bottom-2.5 left-2.5 bg-amber-700 text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg">
                Approved Municipality, MBRHE & EIB Contractor
              </div>
            </div>
            <div class="p-5 sm:p-7 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-1.5 sm:space-y-2">
                <h3 class="text-lg sm:text-xl font-bold text-slate-900">Civil Maintenance & Fit-out Works</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Approved contractor for Dubai Municipality General Maintenance Department, MBRHE, and EIB, providing building maintenance, renovation, and interior finishing services including decorative gypsum ceilings, custom kitchen cabinets, wardrobes, and general building maintenance.
                </p>
              </div>
              <div class="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-slate-100 text-[10px] sm:text-[11px] font-semibold text-slate-700">
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">DM Maintenance Dept</span>
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">Kitchen Cabinets</span>
                <span class="bg-slate-100 px-2 py-0.5 rounded-lg">Custom Wardrobes</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. PRE-FOOTER DIRECT TENDER / RFQ ACTION BANNER -->
    <section id="contact" class="py-12 sm:py-16 bg-slate-900 text-white border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div class="space-y-2 max-w-2xl">
            <span class="text-xs font-bold uppercase tracking-wider text-[#B3261E]">
              Tenders & Technical Inquiries
            </span>
            <h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Planning a Project in Dubai?
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Submit your architectural drawings or schedule a technical consultation with our engineering managers at our Al Qusais facility.
            </p>
            <div class="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[#B3261E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                04-2390946
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.18-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.762-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
                +971 56 506 6904 (WhatsApp)
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[#B3261E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                kachorasdubai@gmail.com
              </span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a href="tel:042390946" class="w-full sm:w-auto text-center px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center justify-center gap-2">
              <span>Request Project Proposal</span>
              <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. CORPORATE FOOTER -->
    <footer class="bg-slate-900 text-white py-8 sm:py-12 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 border-b border-slate-800 pb-6 sm:pb-8 text-center md:text-left">
          <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <img src="{LOGO_B64}" alt="Kachoras Logo" class="h-9 sm:h-10 w-auto object-contain bg-white p-1 rounded-lg" />
            <div>
              <div class="font-arabic text-sm sm:text-base font-bold text-[#E0A96D]" dir="rtl">كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م</div>
              <div class="text-xs font-bold text-white">Kachoras Electromechanical Contracting LLC</div>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <a href="#hero" class="hover:text-white transition">Home</a>
            <a href="#disciplines" class="hover:text-white transition">Disciplines</a>
            <a href="#contact" class="hover:text-white transition">Contact & Tender</a>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center md:text-left">
          <div>
            © 2006 – 2026 Kachoras Electromechanical Contracting LLC. Dubai Municipality Approved G+1 Contractor • License #578964.
          </div>
          <div class="text-slate-400">
            B25, Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1, Dubai
          </div>
        </div>
      </div>
    </footer>
    """
def get_page_wrapper(title, default_active_idx, hero1, hero2, hero3, hero4):
    show1 = "block" if (default_active_idx == 1 or default_active_idx == 'all') else "none"
    show2 = "block" if (default_active_idx == 2 or default_active_idx == 'all') else "none"
    show3 = "block" if (default_active_idx == 3 or default_active_idx == 'all') else "none"
    show4 = "block" if (default_active_idx == 4 or default_active_idx == 'all') else "none"
    badge_hide = "" if default_active_idx == 'all' else "hidden"

    return f"""<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <title>{title} - Kachoras Electromechanical Contracting LLC</title>
  
  <!-- 100% Offline Standalone Mobile-Optimized CSS (Zero JS dependency, works in iOS Safari, QuickLook, WhatsApp, Android Chrome) -->
  <style>
{STANDALONE_CSS}
  </style>
  
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
      overflow-x: hidden;
      width: 100%;
    }}
    .font-arabic {{
      font-family: 'Tajawal', sans-serif;
    }}
    img {{
      max-width: 100%;
      height: auto;
    }}
  </style>

  <script>
    function switchHero(target) {{
      var panes = [1, 2, 3, 4];
      var isAll = (target === 'all');
      
      for (var i = 0; i < panes.length; i++) {{
        var num = panes[i];
        var paneEl = document.getElementById('hero-view-' + num);
        var badgeEl = document.getElementById('badge-' + num);
        var btnEl = document.getElementById('tab-btn-' + num);
        
        if (isAll) {{
          if (paneEl) paneEl.style.display = 'block';
          if (badgeEl) badgeEl.classList.remove('hidden');
          if (btnEl) {{
            btnEl.className = 'px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold bg-white/70 text-slate-800 border border-slate-300 hover:bg-white transition cursor-pointer';
            btnEl.innerHTML = btnEl.getAttribute('data-label');
          }}
        }} else {{
          if (badgeEl) badgeEl.classList.add('hidden');
          if (num === target) {{
            if (paneEl) paneEl.style.display = 'block';
            if (btnEl) {{
              btnEl.className = 'px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-[#B3261E] text-white shadow-sm flex items-center gap-1 transition cursor-pointer';
              btnEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> ' + btnEl.getAttribute('data-label');
            }}
          }} else {{
            if (paneEl) paneEl.style.display = 'none';
            if (btnEl) {{
              btnEl.className = 'px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold bg-white/80 hover:bg-white text-slate-700 border border-slate-300 transition cursor-pointer';
              btnEl.innerHTML = btnEl.getAttribute('data-label');
            }}
          }}
        }}
      }}
      
      var btnAll = document.getElementById('tab-btn-all');
      if (btnAll) {{
        if (isAll) {{
          btnAll.className = 'px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-[#B3261E] text-white shadow-sm flex items-center gap-1 transition cursor-pointer';
          btnAll.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Compare All';
        }} else {{
          btnAll.className = 'px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold bg-white/80 hover:bg-white text-slate-700 border border-slate-300 transition cursor-pointer';
          btnAll.innerHTML = '📜 Compare All';
        }}
      }}
      
      var reviewBar = document.getElementById('review-bar');
      if (reviewBar && window.scrollY > 120) {{
        reviewBar.scrollIntoView({{ behavior: 'smooth' }});
      }}
    }}

    window.addEventListener('DOMContentLoaded', function() {{
      var h = (window.location.hash || '').toLowerCase();
      if (h === '#option1' || h === '#split') switchHero(2);
      else if (h === '#option2' || h === '#card') switchHero(3);
      else if (h === '#option3' || h === '#grid' || h === '#mosaic') switchHero(4);
      else if (h === '#current') switchHero(1);
      else if (h === '#all') switchHero('all');
    }});
  </script>
  <noscript>
    <style>
      .hero-view-pane {{ display: block !important; margin-bottom: 2rem; border-bottom: 4px solid #B3261E; }}
      .hero-divider-banner {{ display: block !important; }}
      #hero-nav-tabs {{ display: none !important; }}
    </style>
  </noscript>
</head>
<body class="antialiased bg-white min-h-screen flex flex-col w-full overflow-x-hidden">
  {get_top_banner(default_active_idx)}
  {get_nav_html()}
  <main class="flex-grow w-full overflow-x-hidden">
    
    <!-- HERO 1: Current Live Design (Dark Hero) -->
    <div id="hero-view-1" class="hero-view-pane" style="display: {show1};">
      <div id="badge-1" class="hero-divider-banner bg-slate-900 text-white py-2 px-4 border-b border-slate-700 text-center text-xs font-bold {badge_hide}">
        <span class="inline-block px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-200 text-[10px] uppercase tracking-wider mr-2">Option 1</span>
        Current Live Design (Full-Bleed Dark Cinematic Overlay)
      </div>
      {hero1}
    </div>

    <!-- HERO 2: Option 1 (50/50 Split - Preferred) -->
    <div id="hero-view-2" class="hero-view-pane" style="display: {show2};">
      <div id="badge-2" class="hero-divider-banner bg-slate-900 text-white py-2 px-4 border-b border-slate-700 text-center text-xs font-bold {badge_hide}">
        <span class="inline-block px-2.5 py-0.5 rounded-full bg-[#B3261E] text-white text-[10px] uppercase tracking-wider mr-2">Option 2 (Preferred)</span>
        Option 1: Clean 50/50 Split Hero (Villa Shehab Card)
      </div>
      {hero2}
    </div>

    <!-- HERO 3: Option 2 (Architectural Showcase Card) -->
    <div id="hero-view-3" class="hero-view-pane" style="display: {show3};">
      <div id="badge-3" class="hero-divider-banner bg-slate-900 text-white py-2 px-4 border-b border-slate-700 text-center text-xs font-bold {badge_hide}">
        <span class="inline-block px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] uppercase tracking-wider mr-2">Option 3</span>
        Option 2: Architectural Showcase Card (Villa Al Bannay)
      </div>
      {hero3}
    </div>

    <!-- HERO 4: Option 3 (4-Photo Capability Mosaic Grid) -->
    <div id="hero-view-4" class="hero-view-pane" style="display: {show4};">
      <div id="badge-4" class="hero-divider-banner bg-slate-900 text-white py-2 px-4 border-b border-slate-700 text-center text-xs font-bold {badge_hide}">
        <span class="inline-block px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] uppercase tracking-wider mr-2">Option 4</span>
        Option 3: 4-Photo Discipline Quadrant Grid
      </div>
      {hero4}
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
    <section class="relative text-white pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden min-h-[580px] sm:min-h-[640px] flex flex-col justify-between">
      
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
        <div class="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          <!-- Left 7 Cols -->
          <div class="lg:col-span-7 space-y-4 sm:space-y-6">
            <div class="space-y-2 sm:space-y-3">
              <div class="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] sm:text-xs font-semibold backdrop-blur-md shadow-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Dubai Municipality Approved G+1 Contractor • License #578964</span>
              </div>

              <!-- Arabic Name -->
              <div class="font-arabic text-lg sm:text-2xl font-bold text-[#E0A96D]" dir="rtl">
                كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
              </div>

              <!-- English Title -->
              <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Kachoras Electromechanical <span class="text-[#E0A96D]">Contracting LLC</span>
              </h1>

              <p class="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                With 20 years of experience in Dubai, we specialize in Construction and electromechanical works. We are accredited to deliver complete turnkey solutions for <strong>G+1 residential and commercial Villas/Building</strong>, <strong>MEP</strong>, <strong>Aluminium and Glass</strong>, <strong>Kitchen cabinets</strong>, and <strong>Wardrobes</strong>.
              </p>
            </div>

            <!-- Metric Strip -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div class="p-2.5 sm:p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl">
                <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">DM Registration</div>
                <div class="text-xs font-bold text-white">G+1 Approved</div>
              </div>
              <div class="p-2.5 sm:p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl">
                <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">Established</div>
                <div class="text-xs font-bold text-[#E0A96D]">Dubai 2006 (20 Yrs)</div>
              </div>
              <div class="p-2.5 sm:p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl">
                <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</div>
                <div class="text-xs font-bold text-white">B25, Al Qusais Ind 1</div>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <a href="#contact" class="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center justify-center gap-2">
                <span>Request Project Proposal</span>
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#disciplines" class="w-full sm:w-auto text-center px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition">
                Our Disciplines
              </a>
            </div>
          </div>

          <!-- Right 5 Cols: Complete Turnkey Construction Services Card -->
          <div class="lg:col-span-5">
            <div class="bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-7 shadow-2xl space-y-3 sm:space-y-4">
              <div class="border-b border-white/10 pb-2.5 sm:pb-3">
                <span class="text-[9px] sm:text-[10px] font-bold text-amber-400 tracking-wider uppercase">Official Scope</span>
                <h3 class="text-base sm:text-lg font-black text-white mt-0.5">Complete Turnkey Construction Services</h3>
              </div>
              <div class="space-y-2 sm:space-y-3">
                <div class="flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#B3261E]/30 text-amber-300 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">01</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">G+1 Licensed Construction</h4>
                    <p class="text-[10px] sm:text-[11px] text-slate-300">Foundations, RCC structure, blockwork, plaster, and turnkey handover.</p>
                  </div>
                </div>
                <div class="flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#B3261E]/30 text-amber-300 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">02</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">MEP Works</h4>
                    <p class="text-[10px] sm:text-[11px] text-slate-300">Mechanical, electrical, plumbing, HVAC, fire fighting, and DEWA connections.</p>
                  </div>
                </div>
                <div class="flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#B3261E]/30 text-amber-300 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">03</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">Aluminium & Glass Works</h4>
                    <p class="text-[10px] sm:text-[11px] text-slate-300">Dedicated Al Qusais fabrication: curtain walls, structural glazing, doors & windows.</p>
                  </div>
                </div>
                <div class="flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#B3261E]/30 text-amber-300 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">04</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">Dubai Municipality Works</h4>
                    <p class="text-[10px] sm:text-[11px] text-slate-300">Civil maintenance, renovations, interior finishes, kitchen cabinets, and wardrobes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Credibility Bar -->
      <div class="relative z-10 border-t border-white/15 bg-black/50 backdrop-blur-md py-3 sm:py-4 mt-6 sm:mt-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
          <div>
            <div class="text-xl sm:text-2xl font-black text-white">20+</div>
            <div class="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Years in UAE</div>
          </div>
          <div>
            <div class="text-xl sm:text-2xl font-black text-amber-400">500+</div>
            <div class="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Projects Completed</div>
          </div>
          <div>
            <div class="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
            <div class="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Regulatory Compliance</div>
          </div>
          <div>
            <div class="text-xl sm:text-2xl font-black text-white">G+1</div>
            <div class="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">DM Approved License</div>
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
    <section class="bg-white text-slate-900 pt-8 sm:pt-14 lg:pt-18 pb-10 sm:pb-16 border-b border-slate-200 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          <!-- Left Column (6 Cols) -->
          <div class="lg:col-span-6 space-y-4 sm:space-y-6">
            
            <div class="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[10px] sm:text-xs font-bold tracking-wide">
              <span class="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Dubai Municipality Approved G+1 Contractor • Lic #578964</span>
            </div>

            <div class="font-arabic text-lg sm:text-2xl font-black text-[#B3261E] tracking-normal" dir="rtl">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>

            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Kachoras Electromechanical <span class="text-[#B3261E]">Contracting LLC</span>
            </h1>

            <p class="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
              With 20 years of experience in Dubai, we specialize in Construction and electromechanical works. Accredited turnkey contractor for <strong>G+1 residential and commercial villas</strong>, <strong>MEP engineering</strong>, <strong>Aluminium & Glass</strong>, and <strong>Civil fit-out</strong>.
            </p>

            <!-- Registration Metrics Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div class="p-2.5 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl">
                <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider">DM License</div>
                <div class="text-xs sm:text-sm font-black text-slate-900 mt-0.5">G+1 Approved</div>
              </div>
              <div class="p-2.5 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl">
                <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider">Established</div>
                <div class="text-xs sm:text-sm font-black text-[#B3261E] mt-0.5">Dubai 2006 (20 Yrs)</div>
              </div>
              <div class="p-2.5 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl">
                <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider">Fabrication</div>
                <div class="text-xs sm:text-sm font-black text-slate-900 mt-0.5">Al Qusais Ind 1</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <a href="#contact" class="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <span>Request Project Proposal</span>
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#disciplines" class="w-full sm:w-auto text-center px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm">
                Our Disciplines
              </a>
            </div>
          </div>

          <!-- Right Column (6 Cols): Prominent Project Card -->
          <div class="lg:col-span-6">
            <div class="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-2 sm:p-2.5 shadow-xl sm:shadow-2xl overflow-hidden group">
              <div class="relative h-64 sm:h-96 md:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                <img 
                  src="{SHEHAB_B64}" 
                  alt="Completed G+1 Residential Villa by Kachoras" 
                  class="w-full h-full object-cover"
                />

                <div class="absolute top-3 right-3 sm:top-4 sm:right-4 bg-slate-900/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-1.5 sm:gap-2">
                  <span class="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400"></span>
                  <span>Turnkey RCC + MEP • 100% Compliant</span>
                </div>

                <div class="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 bg-slate-950/85 backdrop-blur-md border border-white/15 rounded-lg sm:rounded-xl p-2.5 sm:p-3.5 text-white">
                  <div class="flex items-center justify-between text-[10px] sm:text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                    <span>Featured Handover</span>
                    <span>DM Certified</span>
                  </div>
                  <div class="text-xs sm:text-sm font-bold text-white mt-0.5">Residential G+1 Luxury Villa</div>
                  <div class="text-[11px] sm:text-xs text-slate-300 mt-0.5">Plot 423-1407, Al Warqaa Third, Dubai</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Credibility Counters Strip -->
      <div class="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 bg-slate-50/80">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div class="p-2 sm:p-3">
            <div class="text-2xl sm:text-3xl font-black text-slate-900">20+</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Years in Dubai</div>
          </div>
          <div class="p-2 sm:p-3">
            <div class="text-2xl sm:text-3xl font-black text-[#B3261E]">500+</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Completed Projects</div>
          </div>
          <div class="p-2 sm:p-3">
            <div class="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Regulatory Compliance</div>
          </div>
          <div class="p-2 sm:p-3">
            <div class="text-2xl sm:text-3xl font-black text-slate-900">G+1</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">DM Approved License</div>
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
    <section class="bg-gradient-to-b from-slate-50 via-white to-white text-slate-900 pt-8 sm:pt-14 lg:pt-18 pb-10 sm:pb-16 border-b border-slate-200 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          <!-- Left Column (6 Cols) -->
          <div class="lg:col-span-6 space-y-4 sm:space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#B3261E]/10 border border-[#B3261E]/20 text-[#B3261E] text-[10px] sm:text-xs font-bold">
              <span>Complete Turnkey Solutions • Dubai Municipality Certified</span>
            </div>

            <div class="font-arabic text-lg sm:text-2xl font-black text-[#B3261E]" dir="rtl">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>

            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Kachoras Electromechanical <span class="text-[#B3261E]">Contracting LLC</span>
            </h1>

            <div class="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B3261E]">
              Precision Turnkey Construction & Engineering Excellence
            </div>

            <p class="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
              We execute complete turnkey construction from foundation excavation to final key handover. In-house MEP engineering, dedicated Aluminium & Glass fabrication, and direct municipal approvals.
            </p>

            <!-- 4 Scope Pillars Checklist -->
            <div class="space-y-2 sm:space-y-2.5 pt-1">
              <div class="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">✓</span>
                <span>G+1 Approved RCC Structure, Foundations & Blockwork</span>
              </div>
              <div class="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">✓</span>
                <span>In-House MEP Engineering (Carrier, O General, Daikin, Trane)</span>
              </div>
              <div class="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">✓</span>
                <span>Al Qusais Facility Aluminium & Glass Fabrication</span>
              </div>
              <div class="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">✓</span>
                <span>Direct Dubai Municipality, DEWA & Civil Defense Approvals</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <a href="#contact" class="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center justify-center gap-2">
                <span>Request Project Proposal</span>
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#disciplines" class="w-full sm:w-auto text-center px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm">
                View Turnkey Scope
              </a>
            </div>
          </div>

          <!-- Right Column (6 Cols): Architectural Showcase Card -->
          <div class="lg:col-span-6">
            <div class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-3 sm:p-4 shadow-xl space-y-3 sm:space-y-4">
              <div class="flex items-center justify-between text-xs border-b border-slate-100 pb-2.5 sm:pb-3">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#B3261E]"></span>
                  <span class="font-bold text-slate-800 text-xs">Plot 424-7036 • G+1 Villa Handover</span>
                </div>
                <span class="font-mono text-slate-500 font-semibold text-[10px] sm:text-[11px]">Al Warqaa, Dubai</span>
              </div>

              <div class="relative h-64 sm:h-80 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                <img 
                  src="{ALBANNAY_B64}" 
                  alt="Villa Al Bannay Handover" 
                  class="w-full h-full object-cover"
                />
                <div class="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-white text-[11px] sm:text-xs font-bold">
                  Completed Turnkey Construction
                </div>
              </div>

              <div class="grid grid-cols-3 gap-1.5 sm:gap-2 text-center pt-1">
                <div class="p-2 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">Structure</div>
                  <div class="text-[11px] sm:text-xs font-bold text-slate-900 mt-0.5">RCC Framing</div>
                </div>
                <div class="p-2 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">MEP Scope</div>
                  <div class="text-[11px] sm:text-xs font-bold text-[#B3261E] mt-0.5">Full Turnkey</div>
                </div>
                <div class="p-2 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500">Compliance</div>
                  <div class="text-[11px] sm:text-xs font-bold text-emerald-600 mt-0.5">DM Approved</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Credibility Counters Strip -->
      <div class="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-3xl font-black text-slate-900">20+</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Years in UAE</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-black text-[#B3261E]">500+</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Projects Delivered</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Compliance Rate</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-black text-slate-900">G+1</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">DM Approved License</div>
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
    <section class="bg-white text-slate-900 pt-8 sm:pt-14 lg:pt-18 pb-10 sm:pb-16 border-b border-slate-200 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          <!-- Left Column (6 Cols) -->
          <div class="lg:col-span-6 space-y-4 sm:space-y-6">
            
            <!-- Registration Pills from Correction Sheet -->
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[10px] sm:text-xs font-bold">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>DM Registration: G+1 Approved</span>
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] sm:text-xs font-semibold">
                <span>Established: Dubai 2006 (20 Yrs)</span>
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] sm:text-xs font-semibold hidden sm:inline-flex">
                <span>Location: Al Qusais Ind 1</span>
              </span>
            </div>

            <!-- Arabic Legal Name -->
            <div class="font-arabic text-lg sm:text-2xl font-black text-[#B3261E]" dir="rtl">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>

            <!-- English Corporate Name -->
            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Kachoras Electromechanical <span class="text-[#B3261E]">Contracting LLC</span>
            </h1>

            <div class="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B3261E]">
              Complete Turnkey Construction Services
            </div>

            <!-- Subtitle from Client Correction Sheet -->
            <p class="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
              With 20 years of experience in Dubai, we specialize in Construction and electromechanical works. We are accredited to deliver complete turnkey solutions for G+1 residential and commercial Villas/Building, MEP, Aluminium and Glass, Kitchen cabinets, and Wardrobes.
            </p>

            <!-- 4 Discipline Pills -->
            <div class="grid grid-cols-2 gap-2 sm:gap-2.5">
              <div class="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#B3261E] shrink-0"></span>
                <span class="text-[11px] sm:text-xs font-bold text-slate-800 truncate">G+1 Construction</span>
              </div>
              <div class="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                <span class="text-[11px] sm:text-xs font-bold text-slate-800 truncate">MEP Works (HVAC)</span>
              </div>
              <div class="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                <span class="text-[11px] sm:text-xs font-bold text-slate-800 truncate">Aluminium & Glass</span>
              </div>
              <div class="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                <span class="text-[11px] sm:text-xs font-bold text-slate-800 truncate">Civil Maintenance</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <a href="#contact" class="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center justify-center gap-2">
                <span>Request Project Proposal</span>
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#disciplines" class="w-full sm:w-auto text-center px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm">
                Our Disciplines
              </a>
            </div>
          </div>

          <!-- Right Column (6 Cols): 2x2 Photo Grid (Selected by Client) -->
          <div class="lg:col-span-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 bg-slate-100 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl">
              
              <!-- Quadrant 1: Villa Construction -->
              <div class="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
                <img src="{SHEHAB_B64}" alt="G+1 Villa Construction" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div class="text-white">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-amber-300 block">Civil & RCC</span>
                    <span class="text-xs font-bold">G+1 Villa Construction</span>
                  </div>
                </div>
              </div>

              <!-- Quadrant 2: MEP Works (Authentic AC / Chiller Photo from Client) -->
              <div class="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
                <img src="{MEP_B64}" alt="MEP Works & Engineering" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div class="text-white">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-blue-300 block">HVAC, Electrical & Plumbing</span>
                    <span class="text-xs font-bold">In-House MEP Works</span>
                  </div>
                </div>
              </div>

              <!-- Quadrant 3: Aluminium & Glass -->
              <div class="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
                <img src="{GLASS_B64}" alt="Aluminium & Glass" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div class="text-white">
                    <span class="text-[9px] font-bold uppercase tracking-wider text-emerald-300 block">Al Qusais Facility</span>
                    <span class="text-xs font-bold">Aluminium & Glass</span>
                  </div>
                </div>
              </div>

              <!-- Quadrant 4: Civil Maintenance -->
              <div class="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
                <img src="{CIVIC_B64}" alt="Civil Maintenance" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
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

      <!-- Credibility Counters Strip from Correction Sheet -->
      <div class="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div class="text-2xl sm:text-3xl font-black text-slate-900">20+</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Years in Dubai (Since 2006)</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-black text-[#B3261E]">500+</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Completed Works Across Dubai</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Statutory Compliance (DM & DEWA)</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-black text-slate-900">G+1</div>
            <div class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Building Contracting License (#578964)</div>
          </div>
        </div>
      </div>
    </section>
    """
# =====================================================================
# Main execution & generation of Standalone & All-in-One Landing Pages
# =====================================================================
print("Rendering hero sections with authentic MEP photo...")
HERO_1 = get_current_hero()
HERO_2 = get_option1_hero()
HERO_3 = get_option2_hero()
HERO_4 = get_option3_hero()

files_to_generate = [
    ("current_design.html", get_page_wrapper("Full Landing Page - Current Design (Dark Hero)", 1, HERO_1, HERO_2, HERO_3, HERO_4)),
    ("option1_split_hero.html", get_page_wrapper("Full Landing Page - Option 1: 50/50 Split", 2, HERO_1, HERO_2, HERO_3, HERO_4)),
    ("option2_showcase_card.html", get_page_wrapper("Full Landing Page - Option 2: Architectural Card", 3, HERO_1, HERO_2, HERO_3, HERO_4)),
    ("option3_quadrant_grid.html", get_page_wrapper("Full Landing Page - Option 3: 4-Photo Mosaic (Selected by Client)", 4, HERO_1, HERO_2, HERO_3, HERO_4)),
    ("compare_all_options.html", get_page_wrapper("Full Landing Page - Compare All Options Side-by-Side", "all", HERO_1, HERO_2, HERO_3, HERO_4)),
]

print("Writing ALL-IN-ONE INTERACTIVE HTML files to prototype hero-options/ and artifact directory...")
for filename, html_content in files_to_generate:
    proto_path = os.path.join(OUTPUT_DIR, filename)
    with open(proto_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"  [Prototype] {proto_path} ({os.path.getsize(proto_path):,} bytes)")

    artifact_path = os.path.join(ARTIFACT_DIR, filename)
    with open(artifact_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"  [Artifact]  {artifact_path} ({os.path.getsize(artifact_path):,} bytes)")

# Write index.html defaulting to OPTION 4 (4-Photo Mosaic - Selected by Client!)
index_content = get_page_wrapper("Full Landing Page - Selected Design (4-Photo Mosaic)", 4, HERO_1, HERO_2, HERO_3, HERO_4)
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

print("\nAll files successfully generated with Option 4 (4-Photo Mosaic), authentic MEP photo, and cleaned cover page!")
