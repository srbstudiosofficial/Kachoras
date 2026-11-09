# -*- coding: utf-8 -*-
"""
Kachoras Full Website Standalone Generator
Generates:
1. kachoras_full_website_option4.html (Self-contained offline multi-page website)
2. kachoras_full_website_package.zip
"""

import os
import base64
import zipfile
import sys

sys.stdout.reconfigure(encoding='utf-8')

ASSETS_DIR = r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\public\assets"
REAL_DIR = os.path.join(ASSETS_DIR, "real-projects")
OUTPUT_DIR = r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\hero-options"
ARTIFACT_DIR = r"C:\Users\SRB TrollersYT\.gemini\antigravity\brain\f35202af-5cf6-4efe-a4fd-fc09b699d4ad"
DOCS_DIR = r"d:\gemini_data\antigravity\scratch\clients\kachoras-prototype\docs"

def to_b64(path):
    if not os.path.exists(path):
        return ""
    with open(path, "rb") as f:
        data = f.read()
    ext = os.path.splitext(path)[1].lower()
    mime = "image/png" if ext == ".png" else "image/jpeg"
    return f"data:{mime};base64,{base64.b64encode(data).decode('ascii')}"

LOGO_B64 = to_b64(os.path.join(ASSETS_DIR, "kachoras-official-logo.png"))
SHEHAB_B64 = to_b64(os.path.join(REAL_DIR, "completed-construction-shehab-423-1407-wide.jpg"))
ALBANNAY_B64 = to_b64(os.path.join(REAL_DIR, "completed-construction-albannay-424-7036.jpg"))
MEP_B64 = to_b64(os.path.join(ASSETS_DIR, "mep.jpg")) # Authentic AC units photo
ALUM_B64 = to_b64(os.path.join(ASSETS_DIR, "aluminium.jpg"))
GLASS_B64 = to_b64(os.path.join(ASSETS_DIR, "aluminium.jpg"))
CIVIC_B64 = to_b64(os.path.join(ASSETS_DIR, "civic.jpg"))
MUNICIPAL_B64 = to_b64(os.path.join(ASSETS_DIR, "dubai-municipality.jpg"))

CSS_PATH = os.path.join(OUTPUT_DIR, "standalone.css")
with open(CSS_PATH, "r", encoding="utf-8") as f:
    STANDALONE_CSS = f.read()

# -------------------------------------------------------------
# 1. NAVIGATION BAR (Clean Corporate Sticky Header)
# -------------------------------------------------------------
def get_navbar():
    return f"""
    <!-- Top Announcement & Verification Bar -->
    <div class="bg-slate-950 text-white text-[11px] py-1.5 px-4 border-b border-slate-800">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-bold text-slate-200">Dubai Municipality G+1 Approved Contractor</span>
          <span class="text-slate-500">•</span>
          <span class="text-slate-300 font-mono">License #578964</span>
        </div>
        <div class="flex items-center gap-4 text-slate-400 text-[10px] sm:text-[11px]">
          <span class="hidden md:inline">Al Qusais Industrial Area 1, Dubai</span>
          <a href="tel:042390946" class="hover:text-white transition flex items-center gap-1 font-mono">
            <svg class="w-3 h-3 text-[#B3261E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            04-2390946
          </a>
          <a href="https://wa.me/971565066904" target="_blank" class="hover:text-emerald-400 transition flex items-center gap-1 font-mono">
            <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.18-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.762-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
            WhatsApp Desk
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm" id="site-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        <!-- Logo -->
        <a href="#home" onclick="navTo('home'); return false;" class="flex items-center gap-2 sm:gap-3 cursor-pointer">
          <img src="{LOGO_B64}" alt="Kachoras Electromechanical Contracting LLC" class="h-9 sm:h-12 w-auto object-contain" />
        </a>

        <!-- Desktop Navigation Items -->
        <nav class="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-wider text-slate-700" id="desktop-nav">
          <a href="#home" onclick="navTo('home'); return false;" id="nav-btn-home" class="nav-link py-2 text-[#B3261E] border-b-2 border-[#B3261E] transition">Home</a>
          <a href="#about" onclick="navTo('about'); return false;" id="nav-btn-about" class="nav-link py-2 hover:text-[#B3261E] transition">About Us</a>
          <a href="#services" onclick="navTo('services'); return false;" id="nav-btn-services" class="nav-link py-2 hover:text-[#B3261E] transition">Disciplines</a>
          <a href="#projects" onclick="navTo('projects'); return false;" id="nav-btn-projects" class="nav-link py-2 hover:text-[#B3261E] transition">Projects</a>
          <a href="#license" onclick="navTo('license'); return false;" id="nav-btn-license" class="nav-link py-2 hover:text-[#B3261E] transition">License & Approvals</a>
          <a href="#contact" onclick="navTo('contact'); return false;" id="nav-btn-contact" class="nav-link py-2 hover:text-[#B3261E] transition">Contact & Facility</a>
        </nav>

        <!-- CTA & Mobile Menu Button -->
        <div class="flex items-center gap-2 sm:gap-3">
          <button type="button" onclick="openRfqModal()" class="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-md cursor-pointer active:scale-98">
            <span>Enquiry / RFQ</span>
            <svg class="w-3.5 h-3.5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>

          <!-- Mobile Hamburger -->
          <button type="button" onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu" class="hidden lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 text-xs font-bold uppercase tracking-wider">
        <a href="#home" onclick="navTo('home'); return false;" class="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800">Home</a>
        <a href="#about" onclick="navTo('about'); return false;" class="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800">About Us</a>
        <a href="#services" onclick="navTo('services'); return false;" class="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800">Disciplines & Capabilities</a>
        <a href="#projects" onclick="navTo('projects'); return false;" class="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800">Projects Directory</a>
        <a href="#license" onclick="navTo('license'); return false;" class="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800">License & Approvals</a>
        <a href="#contact" onclick="navTo('contact'); return false;" class="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800">Contact & Facility</a>
      </div>
    </header>
    """

# -------------------------------------------------------------
# 2. PAGE 1: HOME PAGE (WITH OPTION 4 QUADRANT GRID HERO)
# -------------------------------------------------------------
def get_home_page():
    return f"""
    <div id="page-home" class="page-view">
      
      <!-- HERO SECTION: OPTION 4 (4-PHOTO QUADRANT GRID) -->
      <section class="bg-white text-slate-900 pt-8 sm:pt-14 lg:pt-18 pb-10 sm:pb-16 border-b border-slate-200 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            <!-- Left Column (6 Cols) -->
            <div class="lg:col-span-6 space-y-4 sm:space-y-6">
              
              <!-- 3 Registration Pills from Client Correction Sheet -->
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
                <button type="button" onclick="openRfqModal()" class="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98">
                  <span>Request Project Proposal</span>
                  <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
                <button type="button" onclick="navTo('services')" class="w-full sm:w-auto text-center px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm cursor-pointer">
                  Our Disciplines
                </button>
              </div>
            </div>

            <!-- Right Column (6 Cols): 2x2 Photo Grid (Selected by Client) -->
            <div class="lg:col-span-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 bg-slate-100 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl">
                
                <!-- Quadrant 1: Villa Construction -->
                <div class="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group">
                  <img src="{ALBANNAY_B64}" alt="G+1 Villa Construction" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <div class="text-white">
                      <span class="text-[9px] font-bold uppercase tracking-wider text-amber-300 block">Civil & RCC</span>
                      <span class="text-xs font-bold">G+1 Villa Construction</span>
                    </div>
                  </div>
                </div>

                <!-- Quadrant 2: MEP Works (Authentic AC Photo from Client) -->
                <div class="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group">
                  <img src="{MEP_B64}" alt="MEP Works & Engineering" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <div class="text-white">
                      <span class="text-[9px] font-bold uppercase tracking-wider text-blue-300 block">HVAC, Electrical & Plumbing</span>
                      <span class="text-xs font-bold">In-House MEP Works</span>
                    </div>
                  </div>
                </div>

                <!-- Quadrant 3: Aluminium & Glass -->
                <div class="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group">
                  <img src="{ALUM_B64}" alt="Aluminium & Glass" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <div class="text-white">
                      <span class="text-[9px] font-bold uppercase tracking-wider text-emerald-300 block">Al Qusais Facility</span>
                      <span class="text-xs font-bold">Aluminium & Glass</span>
                    </div>
                  </div>
                </div>

                <!-- Quadrant 4: Civil Maintenance -->
                <div class="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group">
                  <img src="{CIVIC_B64}" alt="Civil Maintenance" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

        <!-- Credibility Counters Strip from Client Correction Sheet -->
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

      <!-- 2. CORE DISCIPLINES SECTION (4 DIVISIONS ONLY - EXACT SHEET COPY) -->
      <section class="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div class="max-w-2xl space-y-2">
              <span class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B3261E]">
                Complete Turnkey Construction Services
              </span>
              <h2 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                Four Specialized In-House Divisions Working in Complete Synergy
              </h2>
              <p class="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
                By operating G+1 Construction, MEP Engineering, Aluminium & Glass Fabrication, and Civil Maintenance directly under one trade license, Kachoras eliminates subcontractor markups, delays, and coordination gaps.
              </p>
            </div>
            <button type="button" onclick="navTo('services')" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B3261E] hover:text-[#8F351A] transition py-3 px-6 rounded-xl border border-[#B3261E]/30 hover:border-[#B3261E] bg-white shadow-sm cursor-pointer shrink-0">
              <span>View Full Technical Specifications</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
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
                <img src="{ALUM_B64}" alt="Aluminium & Glass Works" class="w-full h-full object-cover" />
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

      <!-- 3. PRE-FOOTER DIRECT TENDER / RFQ ACTION BANNER -->
      <section class="py-12 sm:py-16 bg-slate-900 text-white border-t border-slate-800">
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
              <button type="button" onclick="openRfqModal()" class="w-full sm:w-auto text-center px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                <span>Request Project Proposal</span>
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
    """

# -------------------------------------------------------------
# 3. PAGE 2: ABOUT US PAGE
# -------------------------------------------------------------
def get_about_page():
    return f"""
    <div id="page-about" class="page-view hidden">
      
      <!-- Page Hero Header -->
      <section class="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B3261E] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Established Dubai 2006 • 20 Years of Operations
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            About Kachoras Electromechanical Contracting LLC
          </h1>
          <p class="text-xs sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Registered with Dubai Municipality under G+1 Building Contracting License #578964, delivering turnkey residential villas, commercial structures, integrated MEP engineering, and in-house aluminium and glass fabrication across Dubai.
          </p>
        </div>
      </section>

      <!-- Vision, Mission & Values from Client Correction Sheet -->
      <section class="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Vision -->
            <div class="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span class="text-xs font-bold uppercase tracking-wider text-[#B3261E] block">01 / Corporate Vision</span>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900">Our Vision</h2>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To be recognized as a leading construction and contracting partner in Dubai, known for quality work, modern solutions, and sustainable construction that benefits our clients and communities.
              </p>
              <div class="pt-2 flex flex-wrap gap-2 text-[11px] font-bold text-slate-700">
                <span class="bg-white px-2.5 py-1 rounded-lg border border-slate-200">Quality</span>
                <span class="bg-white px-2.5 py-1 rounded-lg border border-slate-200">Innovation</span>
                <span class="bg-white px-2.5 py-1 rounded-lg border border-slate-200">Sustainability</span>
              </div>
            </div>

            <!-- Mission -->
            <div class="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-700 block">02 / Corporate Mission</span>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900">Our Mission</h2>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To provide reliable construction and engineering services that meet client expectations through quality workmanship, safe working practices, experienced staff, and professional service.
              </p>
              <div class="pt-2 flex flex-wrap gap-2 text-[11px] font-bold text-slate-700">
                <span class="bg-white px-2.5 py-1 rounded-lg border border-slate-200">Reliable Engineering</span>
                <span class="bg-white px-2.5 py-1 rounded-lg border border-slate-200">Safe Practices</span>
                <span class="bg-white px-2.5 py-1 rounded-lg border border-slate-200">Client Satisfaction</span>
              </div>
            </div>
          </div>

          <!-- The Kachoras Advantage (In-House Operational Synergy) -->
          <div class="space-y-6 pt-4">
            <div class="max-w-2xl space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-[#B3261E]">The Kachoras Advantage</span>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-950">Why Choose Our Turnkey Services?</h2>
              <p class="text-xs sm:text-sm text-slate-600">
                Managing different contractors for construction, electrical, plumbing, and aluminium works can lead to delays, extra costs, and coordination problems. At Kachoras, our teams work together from start to finish.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div class="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div class="text-lg font-bold text-[#B3261E]">01</div>
                <h3 class="font-bold text-sm text-slate-900">One Point of Contact</h3>
                <p class="text-xs text-slate-600 leading-relaxed">A dedicated project management team coordinates all site activities, making communication seamless.</p>
              </div>
              <div class="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div class="text-lg font-bold text-blue-700">02</div>
                <h3 class="font-bold text-sm text-slate-900">Better Coordination</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Our civil and MEP teams work together from foundation stage to coordinate electrical and plumbing lines.</p>
              </div>
              <div class="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div class="text-lg font-bold text-emerald-700">03</div>
                <h3 class="font-bold text-sm text-slate-900">Al Qusais Workshop</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Our dedicated aluminium and glass workshop handles custom fabrication directly to site measurements.</p>
              </div>
              <div class="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div class="text-lg font-bold text-amber-700">04</div>
                <h3 class="font-bold text-sm text-slate-900">Cost & Time Control</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Eliminating third-party subcontractor markups ensures competitive pricing and on-schedule handovers.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
    """

# -------------------------------------------------------------
# 4. PAGE 3: DISCIPLINES & CAPABILITIES PAGE
# -------------------------------------------------------------
def get_services_page():
    return f"""
    <div id="page-services" class="page-view hidden">
      
      <!-- Header -->
      <section class="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B3261E] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Technical Capabilities & Scope
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Four Specialized Contracting Disciplines
          </h1>
          <p class="text-xs sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            All engineering and fabrication works are executed in accordance with Dubai Municipality regulations, Dubai Building Code, DEWA electrical specifications, and Civil Defence safety codes.
          </p>
        </div>
      </section>

      <!-- Detailed 4 Divisions (From Word Doc Section 3) -->
      <section class="py-12 sm:py-16 bg-white border-b border-slate-200 space-y-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <!-- Division 1: G+1 Building Contracting -->
          <div class="grid lg:grid-cols-12 gap-8 items-center border-b border-slate-200 pb-12">
            <div class="lg:col-span-6 space-y-4">
              <span class="text-xs font-bold uppercase tracking-wider text-[#B3261E]">01 / Building Contracting</span>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-950">G+1 Villas & Buildings</h2>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Complete construction services from foundations to final handover of keys in compliance with Dubai Municipality regulations and engineering standards.
              </p>
              <div class="space-y-2 text-xs text-slate-700">
                <div class="font-bold text-slate-900">Main Scope of Works:</div>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-slate-600">
                  <li>Soil excavation & site preparation</li>
                  <li>Foundation & substructure RCC works</li>
                  <li>Concrete structure & superstructure</li>
                  <li>Blockwork, plastering & masonry</li>
                  <li>AAC blockwork & thermal insulation</li>
                  <li>Residential villas & Majlis extensions</li>
                  <li>Boundary walls & perimeter gates</li>
                  <li>DM inspections & BCC procedures</li>
                </ul>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                <span>Completed Reference: <strong>Classical Villa – Al Warqaa 4th, Plot 424-7036</strong></span>
                <span class="font-bold text-[#B3261E]">License #578964</span>
              </div>
            </div>
            <div class="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 sm:h-80 bg-slate-100">
              <img src="{ALBANNAY_B64}" alt="G+1 Building Contracting" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Division 2: MEP Works & Engineering (HVAC) -->
          <div class="grid lg:grid-cols-12 gap-8 items-center border-b border-slate-200 pb-12">
            <div class="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 sm:h-80 bg-slate-100 order-2 lg:order-1">
              <img src="{MEP_B64}" alt="MEP & HVAC Works" class="w-full h-full object-cover" />
            </div>
            <div class="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-700">02 / MEP Engineering</span>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-950">MEP Works & Engineering (HVAC)</h2>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Complete mechanical, electrical, and plumbing (MEP) services, covering all stages from installation to testing and commissioning.
              </p>
              <div class="space-y-2 text-xs text-slate-700">
                <div class="font-bold text-slate-900">Main Scope of Works:</div>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-slate-600">
                  <li>Electrical wiring, MDB & SMDB panels</li>
                  <li>Power distribution & copper cables</li>
                  <li>Split, ducted split, VRF/VRV & chiller AC</li>
                  <li>Approved subcontractor: Carrier, Daikin, O General, Trane</li>
                  <li>Water supply, drainage & sanitary fixtures</li>
                  <li>Pumps, grease traps & solar water heaters</li>
                  <li>Fire alarm, smoke detection & fire sprinklers</li>
                  <li>DEWA approvals, testing & commissioning</li>
                </ul>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                <span>Completed Reference: <strong>DEWA Integrated Substation & Infrastructure</strong></span>
                <span class="font-bold text-blue-700">DEWA Certified</span>
              </div>
            </div>
          </div>

          <!-- Division 3: Aluminium & Glass Works -->
          <div class="grid lg:grid-cols-12 gap-8 items-center border-b border-slate-200 pb-12">
            <div class="lg:col-span-6 space-y-4">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-700">03 / In-House Workshop</span>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-950">Architectural Aluminium & Glass Works</h2>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Manufacturing and installation of aluminium doors, windows, skylights, pergolas, glass and mirrors fabricated at our dedicated Al Qusais facility.
              </p>
              <div class="space-y-2 text-xs text-slate-700">
                <div class="font-bold text-slate-900">Main Scope of Works:</div>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-slate-600">
                  <li>Thermal-break aluminium doors & windows</li>
                  <li>Double-glazed curtain walls & facades</li>
                  <li>Heavy-duty sliding & panoramic doors</li>
                  <li>Frameless glass railings & balustrades</li>
                  <li>Aluminium louvers & composite cladding</li>
                  <li>Aluminium pergolas & entrance canopies</li>
                  <li>Glass skylights & insulated glass units (IGU)</li>
                  <li>In-house fabrication at Al Qusais Warehouse B25</li>
                </ul>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                <span>Facility Reference: <strong>Al Qusais Industrial Area 1 Facility</strong></span>
                <span class="font-bold text-emerald-700">Al Qusais B25</span>
              </div>
            </div>
            <div class="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 sm:h-80 bg-slate-100">
              <img src="{GLASS_B64}" alt="Aluminium and Glass Fabrication" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Division 4: Civil Maintenance & Fit-out Works -->
          <div class="grid lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 sm:h-80 bg-slate-100 order-2 lg:order-1">
              <img src="{CIVIC_B64}" alt="Civil Maintenance and Fitout" class="w-full h-full object-cover" />
            </div>
            <div class="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-700">04 / Maintenance & Fit-out</span>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-950">Civil Maintenance & Fit-out Works</h2>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Approved contractor for Dubai Municipality General Maintenance Department, MBRHE, and EIB, providing building maintenance, renovation, and interior finishing services.
              </p>
              <div class="space-y-2 text-xs text-slate-700">
                <div class="font-bold text-slate-900">Main Scope of Works:</div>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-slate-600">
                  <li>Decorative gypsum ceilings & false ceilings</li>
                  <li>Cove lighting & decorative ceiling designs</li>
                  <li>Gypsum cornices & classical Arabian majlis work</li>
                  <li>Tile, marble & porcelain floorings</li>
                  <li>Waterproofing & building envelope repairs</li>
                  <li>Custom-made kitchen cabinets & wardrobes</li>
                  <li>Annual Maintenance Contracts (AMC)</li>
                  <li>Dubai Municipality, MBRHE & EIB Approved</li>
                </ul>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                <span>Completed Reference: <strong>Royal Majlis – Al Barsha, Plot 376-1176</strong></span>
                <span class="font-bold text-amber-700">DM & MBRHE Approved</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
    """

# -------------------------------------------------------------
# 5. PAGE 4: PROJECTS DIRECTORY PAGE
# -------------------------------------------------------------
def get_projects_page():
    return f"""
    <div id="page-projects" class="page-view hidden">
      
      <!-- Header -->
      <section class="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B3261E] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Verified Handover Records • Dubai Municipality
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Projects Portfolio & Handover Directory
          </h1>
          <p class="text-xs sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Over 500 projects successfully delivered across Dubai since 2006. Below is a curated selection of our verified G+1 villas, majlis halls, MEP engineering works, and aluminium fabrication projects.
          </p>
        </div>
      </section>

      <!-- Projects Grid -->
      <section class="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            <!-- Project 1 -->
            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
              <div class="h-48 bg-slate-100 overflow-hidden relative">
                <img src="{ALBANNAY_B64}" alt="Villa Albannay" class="w-full h-full object-cover" />
                <span class="absolute top-3 left-3 bg-[#B3261E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Luxury G+1 Villa</span>
              </div>
              <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div class="text-[11px] font-mono text-slate-500">Plot #424-7036 • Al Warqaa Fourth</div>
                  <h3 class="font-bold text-base text-slate-900">Classical Luxury G+1 Villa</h3>
                  <p class="text-xs text-slate-600 mt-1">Client: Mariam Hussain Redha Hassan Albannay • Consultant: Al Manhal Engineering</p>
                </div>
                <div class="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-700 flex justify-between">
                  <span>Scope: Full Turnkey RCC</span>
                  <span class="text-emerald-600 font-bold">Handed Over</span>
                </div>
              </div>
            </div>

            <!-- Project 2 -->
            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
              <div class="h-48 bg-slate-100 overflow-hidden relative">
                <img src="{SHEHAB_B64}" alt="Villa Shehab" class="w-full h-full object-cover" />
                <span class="absolute top-3 left-3 bg-[#B3261E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Luxury G+1 Villa</span>
              </div>
              <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div class="text-[11px] font-mono text-slate-500">Plot #423-1407 • Al Warqaa Third</div>
                  <h3 class="font-bold text-base text-slate-900">Grand Architectural G+1 Villa</h3>
                  <p class="text-xs text-slate-600 mt-1">Client: Salem Mohammed Salem Saeed Shehab • Consultant: Al Majal Engineering</p>
                </div>
                <div class="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-700 flex justify-between">
                  <span>Scope: Structure & Turnkey MEP</span>
                  <span class="text-emerald-600 font-bold">Handed Over</span>
                </div>
              </div>
            </div>

            <!-- Project 3 -->
            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
              <div class="h-48 bg-slate-100 overflow-hidden relative">
                <img src="{MEP_B64}" alt="DEWA Substation" class="w-full h-full object-cover" />
                <span class="absolute top-3 left-3 bg-blue-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">MEP Works</span>
              </div>
              <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div class="text-[11px] font-mono text-slate-500">Al Qusais Industrial Area 1</div>
                  <h3 class="font-bold text-base text-slate-900">DEWA Integrated MEP Substation</h3>
                  <p class="text-xs text-slate-600 mt-1">Ducted HVAC, high-capacity electrical panels, water supply, and statutory DEWA energization.</p>
                </div>
                <div class="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-700 flex justify-between">
                  <span>Scope: Electrical & HVAC</span>
                  <span class="text-emerald-600 font-bold">Commissioned</span>
                </div>
              </div>
            </div>

            <!-- Project 4 -->
            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
              <div class="h-48 bg-slate-100 overflow-hidden relative">
                <img src="{GLASS_B64}" alt="Curtain Wall" class="w-full h-full object-cover" />
                <span class="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Aluminium & Glass</span>
              </div>
              <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div class="text-[11px] font-mono text-slate-500">Dubai Residential Sector</div>
                  <h3 class="font-bold text-base text-slate-900">Contemporary Geometric Curtain Wall</h3>
                  <p class="text-xs text-slate-600 mt-1">Double-glazed insulated units, thermal-break aluminium frames, and panoramic sliding systems.</p>
                </div>
                <div class="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-700 flex justify-between">
                  <span>Scope: In-House Fabrication</span>
                  <span class="text-emerald-600 font-bold">Installed</span>
                </div>
              </div>
            </div>

            <!-- Project 5 -->
            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
              <div class="h-48 bg-slate-100 overflow-hidden relative">
                <img src="{CIVIC_B64}" alt="Royal Majlis" class="w-full h-full object-cover" />
                <span class="absolute top-3 left-3 bg-amber-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Civil Maintenance</span>
              </div>
              <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div class="text-[11px] font-mono text-slate-500">Plot #376-1176 • Al Barsha Second</div>
                  <h3 class="font-bold text-base text-slate-900">Royal Arabian Majlis Hall & Ceilings</h3>
                  <p class="text-xs text-slate-600 mt-1">Client: Al Abdulla Family • Decorative gypsum ceilings, cornices, cove lighting, and boundary wall restoration.</p>
                </div>
                <div class="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-700 flex justify-between">
                  <span>Scope: Gypsum & Renovation</span>
                  <span class="text-emerald-600 font-bold">Completed</span>
                </div>
              </div>
            </div>

            <!-- Project 6 -->
            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
              <div class="h-48 bg-slate-900 overflow-hidden relative flex items-center justify-center p-6 text-center">
                <div class="text-white space-y-2">
                  <div class="text-2xl font-black text-amber-300">500+</div>
                  <div class="text-xs font-bold uppercase tracking-wider">Completed Dubai Projects</div>
                  <p class="text-[11px] text-slate-300">Villas, majlis halls, municipal maintenance, and commercial fitouts.</p>
                </div>
              </div>
              <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <p class="text-xs text-slate-600 leading-relaxed">
                  Looking for a specific project reference or drawing approvals? Contact our Al Qusais headquarters for complete handover documentation.
                </p>
                <button type="button" onclick="openRfqModal()" class="w-full text-center py-2.5 rounded-xl text-xs font-bold uppercase text-white bg-[#B3261E] hover:bg-[#8F351A] transition">
                  Request References
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
    """

# -------------------------------------------------------------
# 6. PAGE 5: LICENSE & COMPLIANCE PAGE
# -------------------------------------------------------------
def get_license_page():
    return f"""
    <div id="page-license" class="page-view hidden">
      
      <!-- Header -->
      <section class="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Verified Statutory Compliance
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Trade License & Municipal Accreditation
          </h1>
          <p class="text-xs sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Kachoras Electromechanical Contracting LLC operates under Dubai Trade License No. 578964 with full Ground Plus One (G+1) building contracting authority granted by Dubai Municipality.
          </p>
        </div>
      </section>

      <!-- License Details Strip -->
      <section class="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Commercial Registration</span>
              <div class="text-lg font-bold text-slate-900">Commercial License #578964</div>
              <p class="text-xs text-slate-600">Issued by Department of Economy and Tourism (DET), Government of Dubai. Continuously renewed since 2006.</p>
            </div>

            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-600">Dubai Municipality</span>
              <div class="text-lg font-bold text-slate-900">G+1 Approved Contractor</div>
              <p class="text-xs text-slate-600">Full statutory authority for foundation, structural RCC, architectural finishing, and handover inspections.</p>
            </div>

            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600">Dun & Bradstreet</span>
              <div class="text-lg font-bold text-slate-900">D-U-N-S #561419908</div>
              <p class="text-xs text-slate-600">Verified international business credit identifier. Dubai Chamber of Commerce (DCCI) Membership #169651.</p>
            </div>

          </div>

          <!-- Dubai Municipality Projects Section (From Word Document) -->
      <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm grid lg:grid-cols-12 items-center">
        <div class="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[300px]">
          <img src="{MUNICIPAL_B64}" alt="Dubai Municipality Government & Public Infrastructure Works" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span class="bg-emerald-700/90 text-white text-xs font-bold px-3 py-1 rounded-full">Dubai Municipality General Maintenance Department</span>
          </div>
        </div>
        <div class="lg:col-span-6 p-6 sm:p-8 space-y-4">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-800">Government & Public Infrastructure</span>
          <h3 class="text-xl sm:text-2xl font-black text-slate-900">Dubai Municipality Executed Works</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Kachoras has undertaken civil construction, maintenance, and modification works for Dubai Municipality across Dubai and Hatta, including veterinary clinics, public health facilities, parks, boundary walls, and underground chambers.
          </p>
          <div class="grid grid-cols-2 gap-3 pt-1 text-xs">
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span class="font-bold text-[#B3261E] block">100% Statutory</span>
              <span class="text-slate-500">DM Inspection Pass</span>
            </div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span class="font-bold text-emerald-700 block">7+ Municipal Contracts</span>
              <span class="text-slate-500">Dubai & Hatta Facilities</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Permitted Activities Box -->
          <div class="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4">
            <h3 class="text-xl font-bold text-white">Licensed Commercial Activities (DET Code Scope):</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#B3261E]"></span>
                <span>Building Contracting (G+1 Villa & Commercial Developments)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Electromechanical Equipment Installation & Maintenance</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Metal Doors and Windows Manufacturing & Installation</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Electrical Fitting Contracting & Power Distribution</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>Plumbing & Sanitary Installation Works</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>Air-Conditioning, Ventilations & Air Filtration Systems</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
    """

# -------------------------------------------------------------
# 7. PAGE 6: CONTACT & FACILITY PAGE
# -------------------------------------------------------------
def get_contact_page():
    return f"""
    <div id="page-contact" class="page-view hidden">
      
      <!-- Header -->
      <section class="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B3261E] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Al Qusais Facility & Estimating Desk
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Contact & Headquarters Coordinates
          </h1>
          <p class="text-xs sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Submit your architectural drawings, tender packages, or schedule a technical consultation with our engineering managers at our Al Qusais complex.
          </p>
        </div>
      </section>

      <!-- Contact Details & Form -->
      <section class="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            <!-- Left Info Column (5 Cols) -->
            <div class="lg:col-span-5 space-y-6">
              
              <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 class="font-bold text-lg text-slate-900">Head Office Coordinates</h3>
                
                <div class="space-y-3 text-xs text-slate-700">
                  <div class="flex items-start gap-2.5">
                    <svg class="w-4 h-4 text-[#B3261E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                    <div>
                      <div class="font-bold text-slate-900">Physical Address:</div>
                      <div>B25, Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1, Dubai, U.A.E.</div>
                      <div class="text-slate-500 text-[11px] mt-0.5">P.O. Box: 123397, Dubai, U.A.E.</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2.5">
                    <svg class="w-4 h-4 text-[#B3261E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <div>
                      <span class="font-bold text-slate-900">Telephone:</span> 
                      <a href="tel:042390946" class="font-mono text-[#B3261E] hover:underline">04-2390946</a>
                    </div>
                  </div>

                  <div class="flex items-center gap-2.5">
                    <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.18-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.762-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
                    <div>
                      <span class="font-bold text-slate-900">WhatsApp:</span> 
                      <a href="https://wa.me/971565066904" target="_blank" class="font-mono text-emerald-700 hover:underline">+971 56 506 6904</a>
                    </div>
                  </div>

                  <div class="flex items-center gap-2.5">
                    <svg class="w-4 h-4 text-[#B3261E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <div>
                      <span class="font-bold text-slate-900">Email:</span> 
                      <a href="mailto:kachorasdubai@gmail.com" class="text-[#B3261E] hover:underline">kachorasdubai@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div class="pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <span class="font-bold text-slate-900">Working Hours:</span><br/>
                  Monday – Saturday: 7:00 AM – 4:00 PM<br/>
                  Sunday: Closed (Emergency site teams on call)
                </div>
              </div>

            </div>

            <!-- Right RFQ Form Column (7 Cols) -->
            <div class="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 class="text-xl font-bold text-slate-900">Submit Project Tender / Request for Quotation</h3>
              <p class="text-xs text-slate-600">Fill in the project details below to receive a direct call from our estimating engineers.</p>

              <form onsubmit="handleFormSubmit(event)" class="space-y-4 pt-2">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input type="text" required placeholder="e.g. Salem Al Suwaidi" class="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Contact Phone / WhatsApp *</label>
                    <input type="tel" required placeholder="+971 50 000 0000" class="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input type="email" required placeholder="client@domain.com" class="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Primary Discipline *</label>
                    <select class="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none">
                      <option>Turnkey G+1 Residential Villa</option>
                      <option>MEP & HVAC Engineering Works</option>
                      <option>Aluminium & Glass Fabrication</option>
                      <option>Civil Maintenance & Gypsum Fit-out</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Plot Number & Dubai Location (if available)</label>
                  <input type="text" placeholder="e.g. Plot 424-7036, Al Warqaa Fourth" class="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none" />
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Project Requirements / Scope Summary</label>
                  <textarea rows="3" placeholder="Briefly describe your project requirements..." class="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none"></textarea>
                </div>

                <button type="submit" class="w-full py-3.5 bg-[#B3261E] hover:bg-[#8F351A] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer">
                  Submit RFP for Engineering Review
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

    </div>
    """

# -------------------------------------------------------------
# 8. GLOBAL FOOTER
# -------------------------------------------------------------
def get_footer():
    return f"""
    <!-- Global Corporate Footer -->
    <footer class="bg-slate-900 text-white py-12 sm:py-16 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          <!-- Column 1 & 2: Corporate Identity -->
          <div class="lg:col-span-2 space-y-4">
            <img src="{LOGO_B64}" alt="Kachoras Logo" class="h-10 w-auto object-contain bg-white p-1 rounded-lg" />
            <div class="font-arabic text-base font-bold text-[#E0A96D]" dir="rtl">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>
            <p class="text-slate-400 leading-relaxed max-w-sm">
              Established in 2006, <strong>Kachoras Electromechanical Contracting LLC</strong> is a Dubai Municipality G+1 approved contractor specializing in residential villas, MEP engineering, aluminium fabrication, and civil maintenance.
            </p>
            <div class="space-y-1 text-slate-400">
              <div>Commercial License No: <strong class="text-white font-mono">578964</strong></div>
              <div>Dubai Municipality: <strong class="text-emerald-400">G+1 Approved Contractor</strong></div>
              <div>D&B D-U-N-S: <strong class="text-white font-mono">561419908</strong> • DCCI: <strong class="text-white font-mono">169651</strong></div>
            </div>
          </div>

          <!-- Column 3: Disciplines -->
          <div class="space-y-3">
            <h4 class="font-bold uppercase tracking-wider text-[#B3261E]">Disciplines</h4>
            <ul class="space-y-2 text-slate-400">
              <li><a href="#services" onclick="navTo('services'); return false;" class="hover:text-white transition">G+1 Construction</a></li>
              <li><a href="#services" onclick="navTo('services'); return false;" class="hover:text-white transition">MEP Works (HVAC)</a></li>
              <li><a href="#services" onclick="navTo('services'); return false;" class="hover:text-white transition">Aluminium & Glass</a></li>
              <li><a href="#services" onclick="navTo('services'); return false;" class="hover:text-white transition">Civil Maintenance</a></li>
            </ul>
          </div>

          <!-- Column 4: Quick Navigation -->
          <div class="space-y-3">
            <h4 class="font-bold uppercase tracking-wider text-[#B3261E]">Navigation</h4>
            <ul class="space-y-2 text-slate-400">
              <li><a href="#home" onclick="navTo('home'); return false;" class="hover:text-white transition">Home Page</a></li>
              <li><a href="#about" onclick="navTo('about'); return false;" class="hover:text-white transition">About Us (20 Years)</a></li>
              <li><a href="#projects" onclick="navTo('projects'); return false;" class="hover:text-white transition">Projects Directory</a></li>
              <li><a href="#license" onclick="navTo('license'); return false;" class="hover:text-white transition">Trade License #578964</a></li>
              <li><a href="#contact" onclick="navTo('contact'); return false;" class="hover:text-white transition">Al Qusais Facility</a></li>
            </ul>
          </div>

          <!-- Column 5: Coordinates -->
          <div class="space-y-3">
            <h4 class="font-bold uppercase tracking-wider text-[#B3261E]">Headquarters</h4>
            <div class="space-y-2 text-slate-400 leading-relaxed">
              <p class="text-slate-200">B25, Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1, Dubai, U.A.E.</p>
              <p>P.O. Box: <strong class="text-white font-mono">123397</strong></p>
              <p>Tel: <a href="tel:042390946" class="text-white font-mono hover:underline">04-2390946</a></p>
              <p>WhatsApp: <a href="https://wa.me/971565066904" target="_blank" class="text-emerald-400 font-mono hover:underline">+971 56 506 6904</a></p>
              <p>Email: <a href="mailto:kachorasdubai@gmail.com" class="text-amber-300 hover:underline">kachorasdubai@gmail.com</a></p>
            </div>
          </div>

        </div>

        <!-- Bottom Legal Copyright -->
        <div class="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3 text-center sm:text-left">
          <p>© 2006–2026 Kachoras Electromechanical Contracting LLC. All rights reserved.</p>
          <p>Dubai, United Arab Emirates • Government of Dubai Commercial License #578964</p>
        </div>

      </div>
    </footer>
    """

# -------------------------------------------------------------
# 9. INTERACTIVE QUOTE MODAL
# -------------------------------------------------------------
def get_rfq_modal():
    return """
    <!-- RFQ / Tender Quote Modal -->
    <div id="rfq-modal" class="hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 relative overflow-hidden animate-fade-in">
        
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 class="text-lg font-bold text-slate-900">Request Project Quotation</h3>
            <p class="text-[11px] text-slate-500">Estimating Desk • Al Qusais Headquarters</p>
          </div>
          <button type="button" onclick="closeRfqModal()" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form onsubmit="handleFormSubmit(event)" class="space-y-3.5 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Your Full Name *</label>
            <input type="text" required placeholder="e.g. Mohammed Al Hashimi" class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
              <input type="tel" required placeholder="+971 50 000 0000" class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Email Address</label>
              <input type="email" placeholder="client@email.com" class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none" />
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Required Service</label>
            <select class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none">
              <option>Turnkey G+1 Villa Construction</option>
              <option>MEP Works & Engineering (HVAC)</option>
              <option>Aluminium & Glass Fabrication</option>
              <option>Civil Maintenance & Interior Fit-out</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Plot Location / Notes</label>
            <textarea rows="2" placeholder="e.g. Al Warqaa, Nad Al Sheba, Al Barsha..." class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#B3261E] focus:outline-none"></textarea>
          </div>
          <button type="submit" class="w-full py-3 bg-[#B3261E] hover:bg-[#8F351A] text-white font-bold uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer">
            Send Inquiry to Estimating Desk
          </button>
        </form>

      </div>
    </div>
    """

# -------------------------------------------------------------
# 10. COMPLETE PAGE WRAPPER WITH INLINE ROUTING SCRIPT
# -------------------------------------------------------------
def build_full_website_html():
    return f"""<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <title>Kachoras Electromechanical Contracting LLC | Dubai Municipality Approved G+1 Contractor</title>
  
  <!-- 100% Offline Standalone Mobile-Optimized CSS -->
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
    function navTo(pageId) {{
      var pages = ['home', 'about', 'services', 'projects', 'license', 'contact'];
      for (var i = 0; i < pages.length; i++) {{
        var p = pages[i];
        var el = document.getElementById('page-' + p);
        var btn = document.getElementById('nav-btn-' + p);
        if (p === pageId) {{
          if (el) el.classList.remove('hidden');
          if (btn) {{
            btn.className = 'nav-link py-2 text-[#B3261E] border-b-2 border-[#B3261E] transition';
          }}
        }} else {{
          if (el) el.classList.add('hidden');
          if (btn) {{
            btn.className = 'nav-link py-2 hover:text-[#B3261E] transition text-slate-700';
          }}
        }}
      }}
      // Close mobile menu if open
      var mobMenu = document.getElementById('mobile-menu');
      if (mobMenu) mobMenu.classList.add('hidden');
      
      // Scroll to top
      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}

    function toggleMobileMenu() {{
      var mobMenu = document.getElementById('mobile-menu');
      if (mobMenu) mobMenu.classList.toggle('hidden');
    }}

    function openRfqModal() {{
      var modal = document.getElementById('rfq-modal');
      if (modal) modal.classList.remove('hidden');
    }}

    function closeRfqModal() {{
      var modal = document.getElementById('rfq-modal');
      if (modal) modal.classList.add('hidden');
    }}

    function handleFormSubmit(e) {{
      e.preventDefault();
      alert('Thank you for your inquiry. A senior estimating engineer from our Al Qusais headquarters will contact you shortly.');
      closeRfqModal();
    }}

    window.addEventListener('DOMContentLoaded', function() {{
      var hash = (window.location.hash || '').toLowerCase().replace('#', '');
      var validPages = ['home', 'about', 'services', 'projects', 'license', 'contact'];
      if (validPages.indexOf(hash) !== -1) {{
        navTo(hash);
      }} else {{
        navTo('home');
      }}
    }});
  </script>
</head>
<body class="antialiased bg-white min-h-screen flex flex-col w-full overflow-x-hidden">
  {get_navbar()}
  <main class="flex-grow w-full overflow-x-hidden">
    {get_home_page()}
    {get_about_page()}
    {get_services_page()}
    {get_projects_page()}
    {get_license_page()}
    {get_contact_page()}
  </main>
  {get_footer()}
  {get_rfq_modal()}
</body>
</html>
"""

# Generate file
print("Building full multi-page website HTML...")
full_site_html = build_full_website_html()

dest_prototype = os.path.join(OUTPUT_DIR, "kachoras_full_website_option4.html")
dest_artifact = os.path.join(ARTIFACT_DIR, "kachoras_full_website_option4.html")
dest_docs = os.path.join(DOCS_DIR, "kachoras_full_website_option4.html")

for path in [dest_prototype, dest_artifact, dest_docs]:
    with open(path, "w", encoding="utf-8") as f:
        f.write(full_site_html)
    print(f"Generated: {path} ({os.path.getsize(path):,} bytes)")

# Package into ZIP
zip_proto = os.path.join(OUTPUT_DIR, "kachoras_full_website_option4.zip")
zip_artifact = os.path.join(ARTIFACT_DIR, "kachoras_full_website_option4.zip")

for zpath in [zip_proto, zip_artifact]:
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.write(dest_prototype, arcname="kachoras_full_website_option4.html")
    print(f"Generated ZIP: {zpath} ({os.path.getsize(zpath):,} bytes)")

print("\nFull website with Option 4 home page generated successfully!")
