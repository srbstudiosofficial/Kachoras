import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Share2, 
  Sparkles,
  Layers,
  ChevronRight,
  HardHat,
  Award,
  ExternalLink
} from 'lucide-react';
import { getAllProjects, getProjectById } from '../services/projectService';
import SafeImage from '../components/SafeImage';

export default function ProjectDetailPage({ projectId, onNavigate, onOpenQuoteModal }) {
  const allProjects = getAllProjects();
  const [copied, setCopied] = useState(false);

  // Find target project or default to the first
  const project = getProjectById(projectId) || allProjects.find(p => p.id === projectId) || allProjects[0];

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
        <p className="text-slate-600 mt-2">The requested engineering project could not be loaded.</p>
        <button
          onClick={() => onNavigate('projects')}
          className="mt-6 px-6 py-2.5 bg-[#B3261E] text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
        >
          Return to Projects Portfolio
        </button>
      </div>
    );
  }

  // Calculate currentIndex, prev and next projects
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  // Related projects in the same discipline
  const relatedProjects = allProjects
    .filter(p => p.id !== project.id && (p.categoryFilter === project.categoryFilter || p.category === project.category))
    .slice(0, 3);

  // Check if Aluminium & Glass (Client instruction: omit client/consultant name)
  const isAluminium = project.categoryFilter === 'aluminium' || 
    (project.category && project.category.toLowerCase().includes('aluminium')) ||
    (!project.client && !project.consultant);

  // Division detailed services matrix as per client Word document
  const getDivisionServices = () => {
    if (project.categoryFilter === 'villas' || project.category?.toLowerCase().includes('villa')) {
      return {
        division: "Building Contracting – G+1 Villas & Buildings",
        subheading: "Dubai Municipality G+1 Approved Contractor (License #578964)",
        services: [
          "Soil excavation, dewatering, and complete site preparation",
          "Reinforced concrete raft foundations and substructure works",
          "Concrete superstructure, structural columns, beams, and post-tensioned slabs",
          "AAC blockwork and high-efficiency thermal insulation as per Dubai regulations",
          "Plastering, masonry, residential majlis wings, and perimeter boundary walls",
          "Dubai Municipality statutory inspections, permits, and Building Completion Certificate (BCC)"
        ]
      };
    } else if (project.categoryFilter === 'majlis' || project.title?.toLowerCase().includes('majlis')) {
      return {
        division: "Civil Maintenance, Majlis & Traditional Architecture",
        subheading: "Approved Contractor for Dubai Municipality General Maintenance, MBRHE & EIB",
        services: [
          "Heritage & royal Arabian majlis structural construction and restoration",
          "Handcrafted decorative gypsum ceilings, cove lighting, and ornate plaster cornices",
          "Tile, marble, and porcelain flooring installation with precision waterproofing",
          "Structural compound wall construction, facade restorations, and swimming pool works",
          "Complete integration of concealed MEP, ducted HVAC, and automated gate access",
          "Annual maintenance and facility care for government and residential landmarks"
        ]
      };
    } else if (isAluminium) {
      return {
        division: "Architectural Aluminum and Glass",
        subheading: "Direct Custom Fabrication at Our Al Qusais B-25 Industrial Facility",
        services: [
          "Structural aluminium curtain walls and argon-filled double-glazed insulated units (IGU)",
          "High-performance thermal-break aluminium sliding doors and panoramic windows",
          "Heavy-duty architectural cantilever carports and motorized shading pergolas",
          "Frameless structural glass railings, balustrades, custom mirrors, and entrance canopies",
          "Powder-coated aluminium architectural louvers engineered for privacy and solar shading",
          "Motorized sliding vehicle security gates and integrated pedestrian access gates"
        ]
      };
    } else {
      return {
        division: "MEP Works, Civil Maintenance & Municipal Infrastructure",
        subheading: "DEWA Approved & Dubai Municipality General Maintenance Contractor",
        services: [
          "HVAC and central air-conditioning: ducted split, VRF/VRV, and chillers (Carrier, O General, Trane, Daikin, Super General)",
          "Electrical installations: MDB/SMDB panels, busbar trunking, power distribution, and DEWA substation coordination",
          "Plumbing, stormwater drainage, booster pump stations, and underground irrigation valve chambers",
          "Commercial townhouse modifications, substation upgrades, and public health infrastructure",
          "Custom-made luxury kitchen cabinets, wardrobes, and high-specification interior finishing",
          "Civil maintenance, epoxy coatings, crack repairs, and 24/7 emergency response"
        ]
      };
    }
  };

  const divisionInfo = getDivisionServices();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Kachoras Electromechanical Contracting, I would like to inquire about project: ${project.title} (Plot: ${project.plotNo || 'N/A'}, Location: ${project.location}). Please provide details.`
    );
    window.open(`https://wa.me/971565066904?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white text-[#1E293B] min-h-screen pt-32 sm:pt-36 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* 1. Breadcrumbs & Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          
          {/* Breadcrumb links */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button 
              onClick={() => onNavigate('home')}
              className="hover:text-[#B3261E] transition cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button 
              onClick={() => onNavigate('projects')}
              className="hover:text-[#B3261E] transition cursor-pointer"
            >
              Projects Portfolio
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#B3261E] font-bold truncate max-w-[200px] sm:max-w-xs">
              {project.title}
            </span>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-slate-700 hover:bg-[#F1F5F9] hover:text-[#B3261E] transition cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Projects</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-slate-700 hover:bg-[#F1F5F9] transition cursor-pointer shadow-xs"
              title="Copy Project Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* 2. Project Hero Presentation */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm">
          
          {/* Large Hero Visual */}
          <div className="relative w-full h-80 sm:h-[460px] md:h-[520px] bg-slate-900 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            
            {/* Dark gradient overlay for typography readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#B3261E] text-white text-xs font-bold shadow-md uppercase tracking-wider backdrop-blur-md">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{project.category || 'Building Contracting'}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-mono font-bold backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{project.timeline || 'Handed Over & DM Certified'}</span>
                </span>
              </div>

              {project.plotNo && (
                <span className="font-mono text-xs font-bold text-amber-300 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-400/30">
                  Plot #{project.plotNo}
                </span>
              )}
            </div>

            {/* Bottom Title & Location Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300 font-semibold">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>{project.location || 'Dubai, UAE'}</span>
                {project.year && (
                  <>
                    <span className="text-white/40">•</span>
                    <span className="text-white/80 font-mono">Completed: {project.year}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white leading-tight">
                {project.title}
              </h1>
            </div>
          </div>

          {/* 3. Specifications Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#F8FAFC] border-t border-[#E2E8F0]">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Location</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span className="truncate">{project.location}</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Statutory Registration</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DM License #578964</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Building Scope</span>
              <p className="text-xs sm:text-sm font-bold text-[#B3261E] flex items-center gap-1.5 font-mono">
                <Award className="w-4 h-4 text-[#8B6D1B] shrink-0" />
                <span>{project.type || 'G+1 Turnkey Scope'}</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Handover Status</span>
              <p className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{project.timeline || 'Completed & Certified'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 4. Client & Supervising Consultant (Hidden for Aluminium & Glass as instructed) */}
        {!isAluminium && (project.client || project.consultant) && (
          <div className="grid sm:grid-cols-2 gap-4 p-6 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs">
            {project.client && (
              <div className="space-y-1 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Client / Property Owner</span>
                <p className="text-sm font-bold text-slate-900 font-sans">{project.client}</p>
                <span className="text-[11px] text-slate-500 block">Private & Government Works in Dubai</span>
              </div>
            )}

            {project.consultant && (
              <div className="space-y-1 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Supervising Engineering Consultant</span>
                <p className="text-sm font-bold text-slate-900 font-sans">{project.consultant}</p>
                <span className="text-[11px] text-slate-500 block">Dubai Municipality Approved Engineering Supervision</span>
              </div>
            )}
          </div>
        )}

        {/* 5. Main Technical Scope & Deliverables */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Completed Project Scope & Technical Execution */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Detailed Project Scope */}
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <HardHat className="w-5 h-5 text-[#B3261E]" />
                <h2 className="text-lg sm:text-xl font-bold font-display text-[#111622]">
                  Completed Project Scope & Technical Execution
                </h2>
              </div>
              
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0]">
                {project.scope}
              </p>

              <div className="pt-4 border-t border-[#E2E8F0] grid sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Executed under Dubai Municipality G+1 regulations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% In-house engineering and fabrication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>DEWA statutory electrical & plumbing compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dubai Civil Defence health and life-safety codes</span>
                </div>
              </div>
            </div>

            {/* Total Work Breakdown for this Division */}
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-bold text-[#8B6D1B]">Total Contracting Services</span>
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#111622]">
                  {divisionInfo.division}
                </h3>
                <p className="text-xs text-slate-500">{divisionInfo.subheading}</p>
              </div>

              <div className="space-y-2.5 pt-2">
                {divisionInfo.services.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#B3261E] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: Instant Action & Contact Card */}
          <div className="space-y-6">
            
            {/* Contact Action Card */}
            <div className="p-6 sm:p-8 bg-[#111622] text-white rounded-3xl shadow-lg border border-slate-800 space-y-6 sticky top-28">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B27] block">
                  Project Inquiries & Quotation
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  Have a Similar Project?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Submit your architectural drawings, BOQ, or project requirements for our engineering team's comprehensive evaluation.
                </p>
              </div>

              {/* Direct Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (onOpenQuoteModal) {
                      onOpenQuoteModal({
                        category: project.category,
                        notes: `Inquiry referencing project: ${project.title} (Plot #${project.plotNo || 'N/A'}, Location: ${project.location})`
                      });
                    }
                  }}
                  className="w-full py-3.5 px-4 bg-[#B3261E] hover:bg-[#961F18] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Project Quotation</span>
                  <ArrowRight className="w-4 h-4 text-[#C59B27]" />
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </button>

                <a
                  href="tel:042390946"
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Call Head Office: 04-2390946</span>
                </a>
              </div>

              {/* Verified Badges */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Trade License #578964 (Since 2006)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Warehouse B25, Al Qusais Ind. 1, Dubai</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 6. Previous & Next Project Navigation Banner */}
        <div className="p-6 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('project-detail', prevProject.id)}
            className="flex items-center gap-3 text-left hover:text-[#B3261E] transition group cursor-pointer max-w-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] group-hover:bg-[#B3261E] group-hover:text-white border border-[#E2E8F0] flex items-center justify-center transition shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Previous Project</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#B3261E] line-clamp-1">{prevProject.title}</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-slate-700 hover:bg-[#F1F5F9] transition cursor-pointer"
          >
            <span>View All 20 Works</span>
          </button>

          <button
            onClick={() => onNavigate('project-detail', nextProject.id)}
            className="flex items-center gap-3 text-right hover:text-[#B3261E] transition group cursor-pointer max-w-sm ml-auto"
          >
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Next Project</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#B3261E] line-clamp-1">{nextProject.title}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] group-hover:bg-[#B3261E] group-hover:text-white border border-[#E2E8F0] flex items-center justify-center transition shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* 7. Related Projects Grid */}
        {relatedProjects.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-bold text-[#8B6D1B]">Portfolio Exploration</span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#111622]">
                Related Engineering Works
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate('project-detail', item.id)}
                  className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs hover:shadow-md hover:border-[#B3261E] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 overflow-hidden relative bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/75 text-white backdrop-blur-md">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-[#C59B27]" />
                        <span>{item.location}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold font-display text-slate-900 line-clamp-1 group-hover:text-[#B3261E]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {item.scope}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <span className="text-xs font-bold text-[#B3261E] flex items-center gap-1 group-hover:underline">
                      <span>View Project Sheet</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
