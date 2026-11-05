import React, { useState, useRef, useCallback } from 'react';
import { 
  MoveHorizontal, 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Layers 
} from 'lucide-react';

const DUBAI_BEFORE_AFTER_CASES = [
  {
    category: 'G+1 Luxury Villa',
    title: 'Private Villa & Majlis Handover',
    location: 'Nad Al Sheba 2, Dubai',
    duration: '11 Months',
    value: 'AED 3.8M',
    description: 'Transformation from bare sand plot to luxury G+1 residence with structural concrete, bespoke curtain walling, and ducted inverter AC.',
    beforeImage: './assets/real-projects/construction-site-progress-01.jpg',
    beforeLabel: 'Raft Foundation & Substructure',
    afterImage: './assets/real-projects/completed-construction-albannay-424-7036.jpg',
    afterLabel: 'Completed Handover (BCC Approved)'
  },
  {
    category: 'MEP & Substation',
    title: 'Commercial DEWA Substation & HVAC',
    location: 'Al Barsha South, Dubai',
    duration: '6 Months',
    value: 'AED 2.2M',
    description: 'Complete mechanical and electrical room fitout, low-smoke zero-halogen cabling, and multi-zone VRF climate control.',
    beforeImage: './assets/real-projects/construction-site-progress-03.jpg',
    beforeLabel: 'Rough-in Conduit & Cable Trays',
    afterImage: './assets/real-projects/completed-aluminum-contemporary-geometric.jpg',
    afterLabel: 'Commissioned Switchgear (DEWA Energized)'
  }
];

export default function BeforeAfterSlider() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeCase = DUBAI_BEFORE_AFTER_CASES[activeCaseIndex] || DUBAI_BEFORE_AFTER_CASES[0];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-16 bg-[#121620] text-white rounded-3xl border border-[#232A38] relative overflow-hidden shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B27]/15 border border-[#C59B27]/30 text-[#C59B27] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Site Transformation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              BEFORE & AFTER: ON-SITE EXECUTION
            </h2>
            <p className="text-white/70 text-xs sm:text-sm">
              Slide back and forth to inspect how Kachoras transforms raw sand foundations into fully certified handovers.
            </p>
          </div>

          {/* Case Switcher Tabs */}
          <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10">
            {DUBAI_BEFORE_AFTER_CASES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeCaseIndex === idx
                    ? 'bg-[#7A2E16] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Case 0{idx + 1}: {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* The Interactive Slider Frame */}
        <div className="bg-[#1A202C] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-6">
          
          {/* Metadata banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white font-display">{activeCase.title}</h3>
              <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
                <span className="flex items-center gap-1 text-[#C59B27] font-semibold">
                  <MapPin className="w-3.5 h-3.5" /> {activeCase.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-white/40" /> {activeCase.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-white font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {activeCase.value}
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 max-w-md hidden lg:block">
              {activeCase.description}
            </p>
          </div>

          {/* Interactive Image Compare Container */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative h-[320px] sm:h-[420px] lg:h-[480px] w-full select-none overflow-hidden rounded-xl cursor-ew-resize group"
          >
            {/* After Image */}
            <img
              src={activeCase.afterImage}
              alt="After transformation"
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />
            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-400 shadow-lg">
              {activeCase.afterLabel}
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeCase.beforeImage}
                alt="Before transformation"
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
                }}
                draggable="false"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#C59B27] shadow-lg">
                {activeCase.beforeLabel}
              </div>
            </div>

            {/* Divider Line & Draggable Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#C59B27] pointer-events-none shadow-[0_0_15px_rgba(197,155,39,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#7A2E16] text-[#C59B27] flex items-center justify-center shadow-2xl border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing">
                <MoveHorizontal className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom helper tip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/70 backdrop-blur-sm px-4 py-1 rounded-full text-[11px] text-white/60 border border-white/10 pointer-events-none">
              Drag slider left or right to compare
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
