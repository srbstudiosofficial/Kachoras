import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Building2, 
  ExternalLink, 
  Phone, 
  Clock,
  Compass,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function OfficeMapSection() {
  return (
    <section id="location" className="py-24 bg-[#FBF9F5] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A2E16]/10 border border-[#7A2E16]/30 text-[#7A2E16] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Dubai Head Office & Fabrication Plant • Al Qusais Industrial 1</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight font-display">
            OFFICE & WAREHOUSE LOCATION
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Strategically located in Al Qusais Industrial Area 1 inside Bin Sougat Warehouse Complex with direct access to Damascus Street, Doha Road, and Dubai International Airport.
          </p>
        </div>

        {/* Location Showcase Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visual Schematic Diagram (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5DED3] rounded-3xl p-6 sm:p-8 shadow-luxury flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-black text-[#111827] font-display">
                    Official Site Access Map (Al Qusais Industrial 1)
                  </h3>
                  <p className="text-xs text-slate-500">Bin Sougat Warehouse Complex B-25</p>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#7A2E16] bg-[#7A2E16]/10 border border-[#7A2E16]/30 px-3 py-1 rounded-full">
                  Plot: B-25
                </span>
              </div>

              {/* Styled Vector Layout of Head Office & Fabrication Facility */}
              <div className="relative bg-[#1A222E] border-2 border-[#7A2E16]/40 rounded-2xl p-4 sm:p-6 overflow-hidden select-none shadow-inner">
                
                {/* Top: Pond Park & Doha Road */}
                <div className="flex justify-between items-center mb-3">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Dubai Metro Green Line Sector
                  </div>
                  <div className="bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 text-xs px-4 py-1 rounded-full font-bold">
                    Al Qusais Pond Park
                  </div>
                  <div className="text-[10px] text-slate-300 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                    Park 2 Bus Stop
                  </div>
                </div>

                {/* Doha Road Highway Banner */}
                <div className="w-full bg-[#7A2E16] text-[#F7EFCF] text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest my-3 border border-[#C59B27]/40 shadow-md">
                  ← DOHA ROAD (طريق الدوحة) →
                </div>

                {/* Central Community Blocks & Target Warehouse B25 */}
                <div className="grid grid-cols-12 gap-3 my-4 items-center">
                  
                  {/* Left Block: Hostels & Ministry of Labour */}
                  <div className="col-span-4 space-y-2">
                    <div className="bg-slate-800/90 border border-slate-700 p-2.5 rounded-xl text-center shadow-sm">
                      <div className="text-[11px] font-bold text-slate-200">Dubai Women's Hostel</div>
                      <div className="text-[9px] text-amber-300">Community 242</div>
                    </div>
                    <div className="bg-slate-800/90 border border-slate-700 p-2.5 rounded-xl text-center shadow-sm">
                      <div className="text-[11px] font-bold text-slate-200">Ministry of Labour</div>
                      <div className="text-[9px] text-slate-400">Federal Service Center</div>
                    </div>
                  </div>

                  {/* Middle: Streets 5 & 11 and Mosque */}
                  <div className="col-span-3 flex flex-col justify-center space-y-2">
                    <div className="bg-slate-800/80 border border-slate-700 p-2 rounded-xl text-center">
                      <div className="text-[11px] font-bold text-emerald-400">Mosque (مسجد)</div>
                    </div>
                    <div className="text-[9px] text-center text-slate-400 font-mono">
                      St. 5 • St. 11
                    </div>
                  </div>

                  {/* Right: The Target Warehouse B25 */}
                  <div className="col-span-5 bg-gradient-to-br from-[#7A2E16] via-[#652310] to-[#4D1A0B] border-2 border-[#C59B27] p-4 rounded-2xl shadow-xl relative">
                    <div className="absolute -top-2.5 right-3 bg-[#C59B27] text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded shadow">
                      Headquarters
                    </div>
                    <div className="text-xs font-black text-white uppercase font-display tracking-wider">
                      KACHORAS
                    </div>
                    <div className="text-[11px] text-amber-200 font-serif italic mt-0.5">
                      Aluminium & Glass Est
                    </div>
                    <div className="text-xs font-bold text-white mt-2 bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg inline-block">
                      WAREHOUSE B-25
                    </div>
                    <div className="text-[10px] text-amber-200/80 mt-1">
                      Bin Sougat Warehouse Complex
                    </div>
                  </div>

                </div>

                {/* Damascus Street Highway Banner */}
                <div className="w-full bg-[#7A2E16] text-[#F7EFCF] text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest my-3 border border-[#C59B27]/40 shadow-md">
                  ← DAMASCUS STREET (شارع دمشق) →
                </div>

                {/* Bottom Connecting Roads */}
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 font-medium">
                  <span>← Halab Street Junction</span>
                  <span className="text-[#C59B27] font-bold">Al Qusais Industrial Area 1</span>
                  <span>Amman Street Junction →</span>
                </div>

              </div>
            </div>

            {/* Address Banner */}
            <div className="pt-5 mt-5 border-t border-[#F0EBE1] text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span>GPS Coordinates: <strong className="text-slate-900 font-mono">25.2764° N, 55.3781° E</strong></span>
              <span className="text-[#7A2E16] font-bold">Parcel ID: 242-397 (Dubai Municipality)</span>
            </div>
          </div>

          {/* Right Column: Office Coordinates & Navigation CTAs (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E5DED3] rounded-3xl p-6 sm:p-8 shadow-luxury flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <h3 className="text-xl font-black text-[#111827] font-display border-b border-[#F0EBE1] pb-4">
                Facility & Workshop Coordinates
              </h3>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DED3]">
                  <Building2 className="w-4 h-4 text-[#7A2E16] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-sm">Bin Sougat Warehouse Complex</strong>
                    <span>Warehouse Unit B-25, Al Qusais Industrial Area 1, Dubai, U.A.E.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DED3]">
                  <Compass className="w-4 h-4 text-[#7A2E16] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-sm">In-House Aluminium & Glass Plant</strong>
                    <span>Thermal break extrusion processing, double-glazing assembly, and custom metal door fabrication.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DED3]">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-sm">Working Hours</strong>
                    <span>Saturday – Thursday: 7:30 AM – 6:00 PM</span>
                    <span className="block text-slate-500 text-[11px] mt-0.5">Friday: Closed • Emergency site teams deployed 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent('Bin Sougat warehouse complex Al Qusais Industrial Area 1 Dubai')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#7A2E16] hover:bg-[#652310] text-white font-bold text-xs rounded-xl shadow-md transition border border-[#C59B27]/40"
              >
                <Navigation className="w-4 h-4 stroke-[2.5] text-[#C59B27]" />
                <span>Open in Google Maps Navigation</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <a
                href="https://wa.me/971555585079"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message General Manager on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
