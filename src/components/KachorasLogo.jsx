import React from 'react';

export default function KachorasLogo({ 
  className = "", 
  variant = "dark" 
}) {
  const isLightText = variant === "light";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Signboard Framed Brand Mark */}
      <div className="border-2 border-[#B3261E] bg-white px-3.5 py-1 rounded shadow-xs inline-flex flex-col items-center justify-center transition-transform hover:scale-105 duration-200">
        <span className="text-[#14171F] font-serif text-[13px] sm:text-[14px] font-semibold tracking-[0.22em] leading-none mb-1">
          كـا شـو را س
        </span>
        <div className="w-full border-t border-[#B3261E] pt-0.5 text-center">
          <span className="text-[#B3261E] font-serif text-[14px] sm:text-[15px] font-black tracking-[0.18em] leading-none">
            KACHORAS
          </span>
        </div>
      </div>
    </div>
  );
}
