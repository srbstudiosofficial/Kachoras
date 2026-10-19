import React, { useState, useRef, useCallback } from 'react';
import { 
  MoveHorizontal, 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Layers 
} from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../data/mockData';

export default function BeforeAfterSlider() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeCase = BEFORE_AFTER_CASES[activeCaseIndex];

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
    <section className="py-20 bg-[#070A0F] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Site Transformation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              BEFORE & AFTER: ENGINEERING REDEFINED
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Slide back and forth to examine how our team converts derelict industrial footprints and raw rugged terrain into architectural landmarks.
            </p>
          </div>

          {/* Case Switcher Tabs */}
          <div className="flex bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            {BEFORE_AFTER_CASES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  activeCaseIndex === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Case 0{idx + 1}: {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* The Interactive Slider Frame */}
        <div className="bg-[#121A27] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-6">
          
          {/* Metadata banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <h3 className="text-xl font-bold text-white font-display">{activeCase.title}</h3>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" /> {activeCase.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> {activeCase.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-200 font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {activeCase.value}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md hidden lg:block">
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
            className="relative h-[360px] sm:h-[480px] lg:h-[540px] w-full select-none overflow-hidden rounded-xl cursor-ew-resize group"
          >
            {/* After Image (Full background) */}
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
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-400 shadow-lg">
                {activeCase.beforeLabel}
              </div>
            </div>

            {/* Divider Line & Draggable Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing">
                <MoveHorizontal className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom helper tip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/70 backdrop-blur-sm px-4 py-1 rounded-full text-[11px] text-slate-400 border border-slate-800 pointer-events-none">
              Drag slider left or right to compare
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
