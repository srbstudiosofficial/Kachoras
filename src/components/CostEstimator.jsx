import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Building2, 
  Check, 
  Sparkles, 
  DollarSign, 
  PieChart,
  ShieldCheck,
  FileSpreadsheet
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

    // Breakdown
    const civilStructure = Math.round(totalAED * 0.44);
    const mepHvac = Math.round(totalAED * 0.28);
    const aluminiumGypsumFinishes = Math.round(totalAED * 0.20);
    const dmApprovals = Math.round(totalAED * 0.08);

    return {
      ratePerSqFt,
      totalAED,
      low,
      high,
      civilStructure,
      mepHvac,
      aluminiumGypsumFinishes,
      dmApprovals
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
    <section id="estimator" className="py-24 bg-[#F4EFE6] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A2E16]/10 border border-[#7A2E16]/25 text-[#7A2E16] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Dubai Municipality Approved Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight font-display">
            DUBAI VILLA & MEP <span className="text-[#7A2E16]">COST ESTIMATOR</span>
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg leading-relaxed">
            Instant preliminary budgeting in <strong>UAE Dirhams (AED)</strong> for G+1 villas, Majlis blocks, residential extensions, and turn-key electromechanical packages.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* Step 1: Sector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#7A2E16] text-white flex items-center justify-center text-xs font-bold">1</span>
                Project Sector in Dubai
              </label>
              <div className="space-y-2.5">
                {UAE_ESTIMATOR_CONFIG.sectors.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSector(s.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      sector === s.id
                        ? 'bg-[#7A2E16]/5 border-[#7A2E16] shadow-sm ring-1 ring-[#7A2E16]/20'
                        : 'bg-[#FBF9F5] border-[#E5DED3] text-[#475569] hover:border-[#CBD5E1] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className={`font-bold text-sm ${sector === s.id ? 'text-[#7A2E16]' : 'text-[#1E293B]'}`}>{s.label}</div>
                      <div className="text-xs text-[#64748B] mt-0.5">{s.desc}</div>
                    </div>
                    <span className={`text-xs font-bold shrink-0 ml-3 px-3 py-1.5 rounded-lg border ${
                      sector === s.id 
                        ? 'bg-[#7A2E16] text-white border-[#7A2E16]' 
                        : 'bg-white text-[#64748B] border-[#E5DED3]'
                    }`}>
                      ~AED {s.ratePerSqFt}/sq.ft
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Square Footage Slider */}
            <div className="space-y-4 pt-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#7A2E16] text-white flex items-center justify-center text-xs font-bold">2</span>
                  Plot / Built-Up Area (BUA)
                </label>
                <div className="flex items-center gap-1.5 bg-[#FBF9F5] border border-[#E5DED3] px-3.5 py-1.5 rounded-lg">
                  <span className="text-lg font-black text-[#7A2E16]">{sqft.toLocaleString()}</span>
                  <span className="text-xs text-[#64748B] font-semibold">sq.ft</span>
                </div>
              </div>

              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2.5 bg-[#E5DED3] rounded-lg appearance-none cursor-pointer accent-[#7A2E16]"
              />

              <div className="flex justify-between text-xs text-[#64748B] font-medium px-1">
                <span>1,000 sq.ft (Majlis / Extension)</span>
                <span>8,000 sq.ft (Standard Villa)</span>
                <span>25,000+ sq.ft (Grand Estate)</span>
              </div>
            </div>

            {/* Step 3: Finish Level */}
            <div className="space-y-3 pt-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#7A2E16] text-white flex items-center justify-center text-xs font-bold">3</span>
                Specification & Finishes Level
              </label>
              <div className="space-y-2.5">
                {UAE_ESTIMATOR_CONFIG.finishes.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3.5 ${
                      finish === f.id
                        ? 'bg-[#7A2E16]/5 border-[#7A2E16] ring-1 ring-[#7A2E16]/20'
                        : 'bg-[#FBF9F5] border-[#E5DED3] text-[#475569] hover:border-[#CBD5E1] hover:bg-white'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                      finish === f.id ? 'border-[#7A2E16] bg-[#7A2E16] text-white' : 'border-[#CBD5E1] bg-white'
                    }`}>
                      {finish === f.id && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span className={finish === f.id ? 'text-[#7A2E16]' : 'text-[#1E293B]'}>{f.label}</span>
                        {f.multiplier > 1 && (
                          <span className="text-[10px] font-bold text-[#7A2E16] bg-[#7A2E16]/10 px-2.5 py-0.5 rounded-full">
                            +{Math.round((f.multiplier - 1) * 100)}% spec rate
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Addons */}
            <div className="space-y-3 pt-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#7A2E16] text-white flex items-center justify-center text-xs font-bold">4</span>
                Specialized Add-ons (Gypsum, GRC, Permitting, Joinery)
              </label>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {UAE_ESTIMATOR_CONFIG.addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                        isChecked
                          ? 'bg-[#7A2E16]/5 border-[#7A2E16] text-[#7A2E16] font-bold ring-1 ring-[#7A2E16]/20'
                          : 'bg-[#FBF9F5] border-[#E5DED3] text-[#475569] hover:bg-white hover:border-[#CBD5E1]'
                      }`}
                    >
                      <span className="pr-2">{addon.label}</span>
                      <span className={`shrink-0 font-bold ${isChecked ? 'text-[#7A2E16]' : 'text-[#64748B]'}`}>
                        +AED {(addon.cost / 1000).toFixed(0)}k
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results Summary (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#4A1709] via-[#381106] to-[#240A03] border border-[#C59B27]/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-white space-y-6 relative overflow-hidden">
            
            {/* Ambient luxury badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">Budget Projection</span>
              <span className="text-xs font-semibold text-white/70 flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                Dubai 2024-2025 Rates
              </span>
            </div>

            {/* Estimated Total */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-white/70">Estimated Project Range (AED)</span>
              <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                AED {calculation.low.toLocaleString()} – {calculation.high.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-sm font-bold text-[#C59B27]">
                  ~AED {calculation.ratePerSqFt} / sq.ft rate
                </span>
                <span className="text-xs text-white/60 font-medium">({sqft.toLocaleString()} sq.ft BUA)</span>
              </div>
            </div>

            {/* Cost Breakdown Visual */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-white/90 flex items-center justify-between">
                <span>Cost Component Breakdown</span>
                <PieChart className="w-3.5 h-3.5 text-[#C59B27]" />
              </div>

              {/* Progress Stacked Bar */}
              <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden flex border border-white/10">
                <div style={{ width: '44%' }} className="bg-[#C59B27]" title="Civil & Substructure (44%)" />
                <div style={{ width: '28%' }} className="bg-[#E5A93C]" title="MEP & HVAC (28%)" />
                <div style={{ width: '20%' }} className="bg-[#94A3B8]" title="Aluminium, Glass & Gypsum (20%)" />
                <div style={{ width: '8%' }} className="bg-[#10B981]" title="Municipality Permits & Testing (8%)" />
              </div>

              {/* Legend & Figures */}
              <div className="space-y-2.5 text-xs pt-1">
                <div className="flex justify-between items-center text-white/80">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C59B27]" />
                    Civil Structure, Concrete & Blockwork:
                  </span>
                  <span className="font-bold text-white">AED {calculation.civilStructure.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-white/80">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C]" />
                    MEP, Electrical Fitting & HVAC Works:
                  </span>
                  <span className="font-bold text-white">AED {calculation.mepHvac.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-white/80">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
                    Aluminium, Glass, Gypsum & Joinery:
                  </span>
                  <span className="font-bold text-white">AED {calculation.aluminiumGypsumFinishes.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-white/80">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    Dubai Municipality Permits & Engineering:
                  </span>
                  <span className="font-bold text-white">AED {calculation.dmApprovals.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#C59B27] hover:brightness-110 text-[#2E0E05] font-black text-sm rounded-xl shadow-lg shadow-black/30 transition transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Apply Estimate to Formal RFQ</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/60 text-center leading-relaxed">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <span>Preliminary model. Official GMP bids issued upon review of DM approved drawings.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
