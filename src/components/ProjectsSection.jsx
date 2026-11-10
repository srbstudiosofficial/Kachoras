import React, { useState, useEffect } from 'react';
import ProjectDetailModal from './ProjectDetailModal';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Search,
  X,
  SlidersHorizontal,
  Clock,
  CheckCheck
} from 'lucide-react';
import { getAllProjects } from '../services/projectService';
import { useLanguage } from '../core/LanguageContext';

export default function ProjectsSection({ onNavigate, onOpenQuoteModal, hideHeader = false }) {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState([]);
  
  // 1. Primary Status Tabs: 'all' | 'upcoming' | 'completed' (Requested by user)
  const [statusFilter, setStatusFilter] = useState('all');
  
  // 2. Sort/Discipline Filter: 'all' | 'villas' | 'majlis' | 'aluminium' | 'civic' (Requested by user)
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjects = () => {
      const list = getAllProjects();
      setProjects(list);
    };
    loadProjects();
    window.addEventListener('kachoras_projects_updated', loadProjects);
    return () => window.removeEventListener('kachoras_projects_updated', loadProjects);
  }, []);

  const isProjectUpcoming = (p) => {
    const s = (p.status || '').toLowerCase();
    const tl = (p.timeline || '').toLowerCase();
    return s === 'upcoming' || s === 'ongoing' || s.includes('execution') || s.includes('upcoming') || tl.includes('upcoming');
  };

  const filteredProjects = projects.filter(p => {
    // A. Status Filter: all | upcoming | completed
    if (statusFilter === 'upcoming') {
      if (!isProjectUpcoming(p)) return false;
    } else if (statusFilter === 'completed') {
      if (isProjectUpcoming(p)) return false;
    }

    // B. Sort / Discipline Filter: Villas | Aluminium | General Maintenance
    if (disciplineFilter !== 'all') {
      if (disciplineFilter === 'villas' && p.categoryFilter !== 'villas') return false;
      if (disciplineFilter === 'aluminium' && p.categoryFilter !== 'aluminium') return false;
      if (disciplineFilter === 'civic' && (p.categoryFilter !== 'civic' && p.categoryFilter !== 'civic_mep' && p.categoryFilter !== 'majlis')) return false;
    }

    // C. Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.location && p.location.toLowerCase().includes(q)) ||
      (p.plotNo && p.plotNo.toLowerCase().includes(q)) ||
      (p.scope && p.scope.toLowerCase().includes(q)) ||
      (p.client && p.client.toLowerCase().includes(q)) ||
      (p.consultant && p.consultant.toLowerCase().includes(q)) ||
      (p.type && p.type.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.year && p.year.toLowerCase().includes(q))
    );
  });

  const upcomingCount = projects.filter(isProjectUpcoming).length;
  const completedCount = projects.filter(p => !isProjectUpcoming(p)).length;

  // The 3 Status Tabs requested: All Project, Upcoming Project, Completed Project
  const statusTabs = [
    { 
      id: 'all', 
      label: language === 'ar' ? 'جميع المشاريع' : 'All Projects', 
      count: projects.length 
    },
    { 
      id: 'upcoming', 
      label: language === 'ar' ? 'مشاريع قادمة' : 'Upcoming Projects', 
      count: upcomingCount 
    },
    { 
      id: 'completed', 
      label: language === 'ar' ? 'مشاريع منجزة' : 'Completed Projects', 
      count: completedCount 
    }
  ];

  // Filter Discipline Categories: Villas, Aluminium, General Maintenance
  const sortCategories = [
    { id: 'all', label: language === 'ar' ? 'جميع التصنيفات' : 'All Disciplines' },
    { id: 'villas', label: language === 'ar' ? 'الفلل' : 'Villas' },
    { id: 'aluminium', label: language === 'ar' ? 'ألمنيوم' : 'Aluminium' },
    { id: 'civic', label: language === 'ar' ? 'الصيانة العامة' : 'General Maintenance' }
  ];

  return (
    <section id="projects" className="py-10 sm:py-14 bg-white relative border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        {!hideHeader && (
          <div className="max-w-3xl mb-6 sm:mb-8 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
              {language === 'ar' ? 'سجل الإنجاز والاعتماد • بلدية دبي' : 'Executed Works • Handover Portfolio'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#14171F] font-display">
              {language === 'ar' ? 'سجل المشاريع الهندسية المعتمدة' : 'Projects Directory & Pipeline'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              {language === 'ar' 
                ? 'استعرض مشاريعنا في دبي المعتمدة من بلدية دبي: فلل سكنية فئة G+1، مجالس تقليدية، واجهات الألمنيوم والزجاج، والأعمال المدنية والكهروميكانيكية.' 
                : 'Explore our portfolio of Dubai Municipality-approved G+1 luxury villas, traditional Arabian majlis pavilions, in-house architectural aluminium, and civic works.'}
            </p>
          </div>
        )}

        {/* Controls Bar: 1. Main Status Tabs + 2. Discipline Sort Options + 3. Live Search */}
        <div className="space-y-4 mb-8 pb-5 border-b border-[#E2E8F0]">
          
          {/* Row 1: The 3 Primary Status Tabs (All Project | Upcoming Project | Completed Project) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="w-full sm:w-auto grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2">
              {statusTabs.map((tab) => {
                const isActive = statusFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-2.5 py-2.5 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 cursor-pointer active:scale-95 touch-manipulation min-h-[44px] ${
                      isActive
                        ? 'bg-[#B3261E] text-white shadow-md ring-1 ring-[#B3261E]'
                        : 'bg-white text-slate-700 border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:text-[#B3261E]'
                    }`}
                  >
                    <span className="truncate">{tab.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Bar */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'بحث بالاسم، الموقع، رقم الأرض...' : 'Search villa, location, plot #...'}
                className="w-full pl-10 pr-9 py-2.5 bg-[#F8FAFC] focus:bg-white text-xs font-medium text-slate-900 placeholder:text-slate-400 rounded-xl border border-[#E2E8F0] focus:border-[#B3261E] focus:ring-1 focus:ring-[#B3261E] outline-none transition shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Sort Option with the 4 Categories (Luxury Villa, Majlis, Aluminium, Civic) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B3261E]" />
              <span>{language === 'ar' ? 'فرز حسب التصنيف:' : 'Filter Discipline:'}</span>
            </span>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar flex-nowrap sm:flex-wrap">
              {sortCategories.map((sortCat) => {
                const isSortActive = disciplineFilter === sortCat.id;
                return (
                  <button
                    key={sortCat.id}
                    onClick={() => setDisciplineFilter(sortCat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer active:scale-95 touch-manipulation min-h-[36px] ${
                      isSortActive
                        ? 'bg-[#14171F] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {sortCat.label}
                  </button>
                );
              })}
            </div>

            {(disciplineFilter !== 'all' || searchQuery.trim() || statusFilter !== 'all') && (
              <button
                onClick={() => { setDisciplineFilter('all'); setStatusFilter('all'); setSearchQuery(''); }}
                className="text-[11px] font-bold text-[#B3261E] hover:underline ml-auto cursor-pointer"
              >
                {language === 'ar' ? 'إعادة ضبط' : 'Reset Filters'}
              </button>
            )}
          </div>

        </div>

        {/* Results Counter if filtered */}
        {(disciplineFilter !== 'all' || searchQuery || statusFilter !== 'all') && (
          <div className="text-xs text-slate-500 mb-4 flex items-center justify-between">
            <span>
              {language === 'ar' 
                ? `عرض ${filteredProjects.length} من إجمالي ${projects.length} مشروع` 
                : `Showing ${filteredProjects.length} of ${projects.length} projects`}
            </span>
          </div>
        )}

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 px-4 rounded-2xl bg-[#F8FAFC] border border-dashed border-[#E2E8F0] space-y-3">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {language === 'ar' ? 'لم يتم العثور على مشاريع تطابق المعايير' : 'No projects found matching criteria'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === 'ar' ? 'جرب تغيير خيارات الفرز أو كتابة كلمات بحث أخرى.' : 'Try adjusting your status filter, discipline sort option, or search term.'}
            </p>
            <button
              onClick={() => { setStatusFilter('all'); setDisciplineFilter('all'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 bg-[#B3261E] text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-[#961F18] transition"
            >
              {language === 'ar' ? 'عرض جميع المشاريع' : 'Show All Projects'}
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const isUpcoming = isProjectUpcoming(project);
            return (
              <div 
                key={project.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#B3261E] hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image & Badges */}
                <div className="h-56 sm:h-60 relative overflow-hidden bg-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${
                      isUpcoming
                        ? 'bg-amber-500/90 text-white border-amber-300'
                        : 'bg-emerald-600/90 text-white border-emerald-400'
                    }`}>
                      {isUpcoming 
                        ? (language === 'ar' ? 'قيد التنفيذ / قادم' : 'Upcoming 2026') 
                        : (language === 'ar' ? 'تم التسليم' : 'Completed')}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {project.year || 'Dubai'}
                    </span>
                  </div>

                  {/* Location & Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-[#E0A96D] font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-[#E0A96D]" />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {project.client && (
                      <div className="flex items-start justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 gap-2">
                        <span className="shrink-0">{language === 'ar' ? 'العميل:' : 'Client:'}</span>
                        <span className="text-slate-800 font-medium text-right line-clamp-1 max-w-[70%]">{project.client}</span>
                      </div>
                    )}

                    {project.consultant && (
                      <div className="flex items-start justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 gap-2">
                        <span className="shrink-0">{language === 'ar' ? 'الاستشاري:' : 'Consultant:'}</span>
                        <span className="text-slate-800 font-medium text-right line-clamp-1 max-w-[70%]">{project.consultant}</span>
                      </div>
                    )}

                    {project.categoryFilter !== 'villas' && project.plotNo && (
                      <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                        <span>{language === 'ar' ? 'رقم الأرض:' : 'Plot Number:'}</span>
                        <strong className="text-slate-800 font-mono">{project.plotNo}</strong>
                      </div>
                    )}

                    {project.categoryFilter !== 'villas' && project.scope && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                        {project.scope}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="text-xs font-bold text-[#B3261E] hover:underline flex items-center gap-1 cursor-pointer py-1"
                    >
                      <span>{language === 'ar' ? 'عرض المواصفات الهندسية' : 'View Full Project Sheet'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          isOpen={true}
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onOpenQuoteModal={onOpenQuoteModal}
          onNavigate={onNavigate}
        />
      )}
    </section>
  );
}
