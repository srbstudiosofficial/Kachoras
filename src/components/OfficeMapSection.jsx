import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Building2, 
  ExternalLink, 
  Phone, 
  Clock, 
  MessageSquare 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function OfficeMapSection() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1, Dubai")}`;

  return (
    <section id="location" className="py-14 sm:py-20 bg-[#F8FAFC] relative border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 space-y-2 ">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
            Headquarters & Fabrication Workshop
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Office & Fabrication Facility
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Strategically located in Al Qusais Industrial Area 1 inside Bin Sougat Warehouse Complex, with direct access to Damascus Street, Doha Road, and key Dubai arterial highways.
          </p>
        </div>

        {/* Map & Logistics Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Google Map Embed (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#B3261E] transition-all duration-500 flex flex-col justify-between ">
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#14171F] font-display">
                  Al Qusais Industrial Area 1
                </h3>
                <p className="text-xs text-slate-500">Warehouse B-25, Bin Sougat Complex</p>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B3261E] hover:text-[#5C200E] bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0] transition"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Clean Map Iframe Embed */}
            <div className="relative h-80 sm:h-[420px] w-full bg-[#E2E8F0] min-h-[300px]">
              <iframe
                title="Kachoras Office Location Map"
                src="https://maps.google.com/maps?q=25.2818,55.3789&hl=en&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-[0.9] contrast-[1.05]"
              />
            </div>

            <div className="p-4 bg-[#F8FAFC] text-xs text-slate-500 border-t border-[#E2E8F0] flex flex-wrap justify-between items-center gap-2">
              <span className="font-mono text-[11px]">Geo: 25.2818° N, 55.3789° E</span>
              <span>Direct access from Damascus Street & Doha Road</span>
            </div>
          </div>

          {/* Logistics & Access Coordinates (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-2xl hover:border-[#B3261E] transition-all duration-500 flex flex-col justify-between ">
            
            <div className="space-y-6">
              <div className="border-b border-[#E2E8F0] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E]">
                  Facility Coordinates
                </span>
                <h3 className="text-xl font-bold text-[#14171F] font-display mt-0.5">
                  Al Qusais Operational Hub
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#B3261E] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-sm">Physical Address:</strong>
                    <span className="leading-relaxed block mt-0.5">{COMPANY_INFO.address}</span>
                    <span className="text-slate-400 block mt-0.5 text-[11px]">P.O. Box: {COMPANY_INFO.poBox}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#B3261E] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-sm">Operating Hours:</strong>
                    <span className="block mt-0.5">Monday – Saturday: 7:00 AM – 4:00 PM</span>
                    <span className="text-slate-400 block mt-0.5 text-[11px]">Friday: Closed (Site emergency teams on call)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#B3261E] shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-sm">Fabrication Capacity:</strong>
                    <span className="block mt-0.5">Dedicated aluminium, glass curtain wall & joinery fabrication plant in Warehouse B-25.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Logistics Actions */}
            <div className="pt-4 border-t border-[#E2E8F0] space-y-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-3 bg-[#14171F] hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Open Turn-by-Turn Navigation</span>
              </a>

              <a
                href="https://wa.me/971565066904?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20visit%20your%20office%20in%20Al%20Qusais."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-3 bg-white hover:bg-[#F8FAFC] text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl border border-[#E2E8F0] transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Schedule an Office Visit</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
