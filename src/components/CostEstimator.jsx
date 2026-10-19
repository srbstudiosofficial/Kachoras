import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Building2, 
  Check, 
  DollarSign, 
  ShieldCheck, 
  Info 
} from 'lucide-react';
import { UAE_ESTIMATOR_CONFIG } from '../data/mockData';

export default function CostEstimator({ onApplyEstimateToQuote }) {
  const [sector, setSector] = useState("g1_villa");
  const [sqft, setSqft] = useState(6500);
  const [finish, setFinish] = useState("premium");
  const [selectedAddons, setSelectedAddons] = useState(["dm_permits", "gypsum_art"]);

  const calculation = useMemo(() => {
    const selectedSector = UAE_ESTIMATOR_CONFIG.sectors.find(s => s.id === sector);
    const selectedFinish = UAE_ESTIMATOR_CONFIG.finishes.find(f => f.id === finish);

    const baseRate = selectedSector ? selectedSector.ratePerSqFt : 350;
    const finishMult = selectedFinish ? selectedFinish.multiplier : 1.0;

    const ratePerSqFt = Math.round(baseRate * finishMult);
    const baseCost = sqft * ratePerSqFt;

    const addonsCost = selectedAddons.reduce((sum, addId) => {
      const item = UAE_ESTIMATOR_CONFIG.addons.find(a => a.id === addId);
      return sum + (item ? item.cost : 0);
    }, 0);

    const totalAED = baseCost + addonsCost;
    const low = Math.round(totalAED * 0.95);
    const high = Math.round(totalAED * 1.08);

    // Realistic UAE construction breakdown percentages
    const civilStructure = Math.round(totalAED * 0.45);
    const mepHvac = Math.round(totalAED * 0.28);
    const finishes = Math.round(totalAED * 0.20);
    const statutoryApprovals = Math.round(totalAED * 0.07);

    return {
      ratePerSqFt,
      totalAED,
      low,
      high,
      civilStructure,
      mepHvac,
      finishes,
      statutoryApprovals
    };
  }, [sector, sqft, finish, selectedAddons]);

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleApply = () => {
    const selectedSector = UAE_ESTIMATOR_CONFIG.sectors.find(s => s.id === sector);
    const selectedFinish = UAE_ESTIMATOR_CONFIG.finishes.find(f => f.id === finish);

    onApplyEstimateToQuote({
      category: selectedSector?.label || sector,
      sqft,
      tier: selectedFinish?.label || finish,
      estimatedRange: `AED ${calculation.low.toLocaleString()} - AED ${calculation.high.toLocaleString()}`,
      estimatedTotal: `AED ${calculation.totalAED.toLocaleString()}`
    });
  };

  return (
    <section id="estimator" className="py-24 bg-[#FAF9F6] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
            Budgeting & Scope Planning
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Preliminary Feasibility & Budget Planner
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Indicative UAE Dirham (AED) estimates formulated on verified 2025–2026 Dubai Municipality G+1 construction benchmarks.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 space-y-7 shadow-sm">
            
            {/* Step 1: Project Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                1. Project Category
              </label>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {UAE_ESTIMATOR_CONFIG.sectors.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSector(s.id)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      sector === s.id
                        ? 'bg-[#14171F] text-white border-[#14171F]'
                        : 'bg-[#FAF8F5] text-slate-700 border-[#E5DED3] hover:border-slate-400'
                    }`}
                  >
                    <span className="font-bold text-xs block">{s.label}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Built-Up Area Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  2. Built-Up Area (BUA)
                </label>
                <div className="text-right">
                  <span className="text-base font-bold text-[#7A2E16] font-mono">
                    {sqft.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">sq.ft</span>
                </div>
              </div>
              <input 
                type="range"
                min="1500"
                max="18000"
                step="250"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2 bg-[#E5DED3] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>1,500 sq.ft (Majlis / Annex)</span>
                <span>8,000 sq.ft (Standard Villa)</span>
                <span>18,000 sq.ft (Luxury Compound)</span>
              </div>
            </div>

            {/* Step 3: Finish Specifications */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                3. Specification & Finish Standard
              </label>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {UAE_ESTIMATOR_CONFIG.finishes.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      finish === f.id
                        ? 'bg-[#14171F] text-white border-[#14171F]'
                        : 'bg-[#FAF8F5] text-slate-700 border-[#E5DED3] hover:border-slate-400'
                    }`}
                  >
                    <span className="font-bold text-xs block">{f.label}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Engineering Add-ons */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                4. Specialized Engineering Provisions
              </label>
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                {UAE_ESTIMATOR_CONFIG.addons.map((add) => {
                  const isChecked = selectedAddons.includes(add.id);
                  return (
                    <div
                      key={add.id}
                      onClick={() => toggleAddon(add.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        isChecked
                          ? 'bg-[#FAF5EF] border-[#7A2E16] text-[#7A2E16]'
                          : 'bg-[#FAF8F5] border-[#E5DED3] text-slate-700'
                      }`}
                    >
                      <div>
                        <span className="font-semibold block text-[11px]">{add.label}</span>
                        <span className="text-[10px] text-slate-400">+AED {add.cost.toLocaleString()}</span>
                      </div>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isChecked ? 'bg-[#7A2E16] border-[#7A2E16] text-white' : 'border-slate-300'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            
            <div className="border-b border-[#F0EBE1] pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B6D1B]">
                Budget Feasibility Summary
              </span>
              <h3 className="text-xl font-bold text-[#14171F] font-display mt-0.5">
                Estimated Project Investment
              </h3>
            </div>

            {/* Total AED Display */}
            <div className="p-5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Preliminary Target Range (AED)
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-[#7A2E16] font-mono tracking-tight">
                AED {calculation.low.toLocaleString()} – {calculation.high.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 pt-1">
                Benchmark Rate: <strong className="text-slate-800 font-mono">AED {calculation.ratePerSqFt}</strong> / sq.ft BUA
              </div>
            </div>

            {/* Discipline Allocation Matrix */}
            <div className="space-y-2.5 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-800 text-[11px] block">
                Discipline Budget Breakdown
              </span>

              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between items-center">
                  <span>Civil & Reinforced Concrete (45%)</span>
                  <span className="font-mono font-medium text-slate-900">AED {calculation.civilStructure.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>MEP, HVAC & DEWA Systems (28%)</span>
                  <span className="font-mono font-medium text-slate-900">AED {calculation.mepHvac.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Aluminium Facades & Finishes (20%)</span>
                  <span className="font-mono font-medium text-slate-900">AED {calculation.finishes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Statutory Permits & Inspections (7%)</span>
                  <span className="font-mono font-medium text-slate-900">AED {calculation.statutoryApprovals.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Professional Disclaimer */}
            <div className="p-3 bg-[#F5F2EB] rounded-xl border border-[#E5DED3] text-[11px] text-slate-500 flex items-start gap-2 leading-relaxed">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Preliminary estimates are strictly indicative. Definite fixed-price tender proposals require stamped consultant architectural drawings and Dubai Municipality Croquis.
              </span>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className="w-full py-3.5 bg-[#7A2E16] hover:bg-[#652310] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transfer Estimate to Official Tender Form</span>
              <ArrowRight className="w-4 h-4 text-[#C59B27]" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
