import React from 'react';
import PageHeader from '../components/PageHeader';
import VisionMissionSection from '../components/VisionMissionSection';
import SafetyStats from '../components/SafetyStats';
import Testimonials from '../components/Testimonials';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  ArrowRight, 
  Sparkles,
  MapPin,
  FileCheck2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { useLanguage } from '../core/LanguageContext';

export default function AboutPage({ onNavigate, onOpenQuoteModal }) {
  const { language, isRTL } = useLanguage();
  return (
    <div className="space-y-0">
      
            {/* 1. Page Header */}
      <PageHeader 
        title="About Kachoras"
        breadcrumb="About Us"
        onNavigate={onNavigate}
      />

      {/* 2. Executive Leadership & Company Heritage */}
      <section className="py-10 sm:py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
                {language === 'ar' ? 'القيادة التنفيذية وعراقة الشركة' : 'Executive Leadership & Company Heritage'}
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] font-display tracking-tight leading-tight">
                {language === 'ar' ? 'أكثر من 20 عاماً من الخبرة في المقاولات والهندسة الإنشائية' : 'Over 20 Years of Experience in Construction and Engineering'}
              </h2>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {language === 'ar' ? (
                  <>
                    <p>
                      تأسست شركة <strong>كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م</strong> في إمارة دبي عام <strong>2006</strong>، وبنت سجلاً حافلاً بالثقة في تنفيذ مشاريع البناء، الأعمال الكهروميكانيكية، وأعمال الصيانة للمشاريع السكنية والتجارية والحكومية في كافة أنحاء دبي.
                    </p>
                    <p>
                      بفضل فريق العمل الهندسي المتخصص والإدارة المتفانية، طورت الشركة خدماتها لتشمل حلول المقاولات الشاملة بموجب <strong>رخصة بلدية دبي لمقاولات المباني فئة أرضي + أول (G+1) رقم {COMPANY_INFO.licenseNumber}</strong>.
                    </p>
                    <p>
                      خلافاً للشركات التي تعتمد كلياً على مقاولي الباطن، تتميز كاشوراس بتنفيذ كافة الأعمال الحيوية ذاتياً من خلال كوادرها وورشها المتخصصة في البناء، التمديدات الكهروميكانيكية، وتصنيع الألمنيوم والزجاج.
                    </p>
                    <p>
                      يضمن هذا النهج المتكامل الحفاظ على أعلى معايير الجودة، وسرعة التنسيق، والالتزام الصارم بمتطلبات بلدية دبي، وهيئة كهرباء ومياه دبي (DEWA)، والدفاع المدني.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Established in Dubai in <strong>2006</strong>, <strong>Kachoras Electromechanical Contracting LLC</strong> has built its experience in delivering construction, MEP, and maintenance works for residential, commercial, and government projects across Dubai.
                    </p>
                    <p>
                      With a dedicated team of experienced engineers and technical staff, the company has expanded its services from civil and MEP works to a wide range of construction and specialist services under <strong>Dubai Municipality G+1 Building License #{COMPANY_INFO.licenseNumber}</strong>.
                    </p>
                    <p>
                      Unlike companies that depend entirely on outside subcontractors, Kachoras handles several key works in-house, including structural construction, MEP installations, aluminium and glass fabrication, and civil maintenance.
                    </p>
                    <p>
                      Our integrated approach helps us maintain quality, coordinate work efficiently, and complete projects in line with DEWA, Dubai Civil Defence, and Dubai Municipality requirements.
                    </p>
                  </>
                )}
              </div>

              {/* Pillars */}
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-center space-y-1">
                  <span className="text-2xl font-black text-[#B3261E] font-display">2006</span>
                  <p className="text-xs text-slate-600 font-medium">Dubai Incorporation</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-center space-y-1">
                  <span className="text-2xl font-black text-[#B3261E] font-display">G+1</span>
                  <p className="text-xs text-slate-600 font-medium">Municipality Approval</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-center space-y-1">
                  <span className="text-2xl font-black text-[#B3261E] font-display">500+</span>
                  <p className="text-xs text-slate-600 font-medium">Completed Projects and Works</p>
                </div>
              </div>

            </div>

            {/* Right Card: Al Qusais HQ & Executive Profile */}
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-3xl space-y-6 shadow-sm">
              <div className="border-b border-[#E2E8F0] pb-4 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E]">Corporate Governance</span>
                <h3 className="text-xl font-black text-[#1E293B] font-display">Kachoras Electromechanical Contracting LLC</h3>
                <p className="text-xs text-slate-600">Registered with Dubai Economy & Tourism and Dubai Municipality</p>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E2E8F0]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Trade License #578964</strong>
                    <span className="text-slate-600">Active status with Dubai DED and Dubai Chamber of Commerce</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E2E8F0]">
                  <Building2 className="w-4 h-4 text-[#B3261E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Dubai Municipality G+1 License</strong>
                    <span className="text-slate-600">Permitted for building contracting of Ground + 1 storey developments</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E2E8F0]">
                  <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Operational Headquarters</strong>
                    <span className="text-slate-600">B25, Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1, Dubai, U.A.E.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('license')}
                  className="w-full py-3 bg-[#B3261E] hover:bg-[#961F18] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4 text-[#C59B27]" />
                  <span>Inspect Official License Documents</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <VisionMissionSection />

      {/* 4. Safety & Operational Standards */}
      <SafetyStats />

      {/* 5. Approved Consultant Engineering Partners */}
      <Testimonials />

      {/* 6. Bottom Call to Action */}
      

    </div>
  );
}
