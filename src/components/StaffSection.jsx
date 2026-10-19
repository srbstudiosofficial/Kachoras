import React from 'react';
import { 
  Users, 
  Phone, 
  Briefcase, 
  ShieldCheck, 
  HardHat, 
  UserCheck,
  MessageSquare,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { STAFF_MEMBERS } from '../data/mockData';

export default function StaffSection() {
  const leadership = STAFF_MEMBERS.slice(0, 4);

  return (
    <section id="team" className="py-24 bg-[#FBF9F5] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A2E16]/10 border border-[#7A2E16]/30 text-[#7A2E16] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Technical Leadership & Resident Field Staff</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight font-display">
            EXPERIENCED ENGINEERS & SUPERVISORS
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            All technical personnel possess verified field credentials and extensive hands-on experience across building contracting, electromechanical networks, and civic supervision in Dubai.
          </p>
        </div>

        {/* Executive Leadership Spotlight (Top 4 Officers) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {leadership.map((leader) => (
            <div 
              key={leader.sNo}
              className="bg-white border border-[#E5DED3] rounded-3xl p-6 shadow-luxury hover:border-[#7A2E16] transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#7A2E16]/10 border border-[#7A2E16]/20 flex items-center justify-center text-[#7A2E16] font-display font-black text-lg">
                    {leader.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#C59B27] bg-[#F7EFCF] px-2.5 py-0.5 rounded-full border border-[#C59B27]/40">
                    Lead #{leader.sNo}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#111827] group-hover:text-[#7A2E16] transition-colors font-display">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-bold text-[#7A2E16] mt-0.5">
                    {leader.designation}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Dept: {leader.department}
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-3 border-t border-[#F0EBE1] flex items-center gap-2">
                <a
                  href={`tel:${leader.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2 px-3 bg-[#FAF7F2] hover:bg-[#F4EFE6] border border-[#E5DED3] rounded-xl text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition"
                  title="Direct Phone Call"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7A2E16]" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://wa.me/${leader.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                  title="Direct WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Staff Table */}
        <div className="bg-white border border-[#E5DED3] rounded-3xl overflow-hidden shadow-luxury">
          
          <div className="p-6 sm:p-8 border-b border-[#E5DED3] flex flex-wrap items-center justify-between gap-4 bg-[#F4EFE6]/60">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A2E16]">
                Core Technical Directory
              </span>
              <h3 className="text-xl font-bold text-[#111827] font-display mt-0.5">
                Complete 11 Key Personnel Roster
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Official directory with direct phone and WhatsApp contact channels for project execution, engineering, and supervisory staff.
              </p>
            </div>

            <span className="text-xs font-bold text-[#7A2E16] bg-[#7A2E16]/10 border border-[#7A2E16]/30 px-3.5 py-1.5 rounded-full font-mono">
              11 Official Project Leads
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] text-slate-700 uppercase text-[11px] font-black tracking-wider border-b border-[#E5DED3]">
                <tr>
                  <th className="py-4 px-4 sm:px-6">S.No</th>
                  <th className="py-4 px-4 sm:px-6">Name</th>
                  <th className="py-4 px-4 sm:px-6">Designation</th>
                  <th className="py-4 px-4 sm:px-6">Department</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Direct Contact & WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE1] text-slate-700">
                {STAFF_MEMBERS.map((member) => (
                  <tr key={member.sNo} className="hover:bg-[#FAF7F2] transition">
                    <td className="py-4 px-4 sm:px-6 font-mono text-slate-400 font-bold">
                      #{member.sNo.toString().padStart(2, '0')}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                      {member.name}
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        member.designation.includes('Manager') 
                          ? 'bg-[#7A2E16]/10 text-[#7A2E16] border border-[#7A2E16]/30' 
                          : member.designation.includes('Engineer')
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : member.designation.includes('Supervisor')
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}>
                        {member.designation}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600 text-xs font-medium">
                      {member.department}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono text-xs">
                      <div className="flex items-center justify-end gap-3">
                        <a 
                          href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                          className="inline-flex items-center gap-1.5 text-[#7A2E16] hover:text-[#5C200E] font-bold hover:underline"
                          title="Call"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>{member.phone}</span>
                        </a>

                        <a 
                          href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition shadow-sm"
                          title="WhatsApp Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 bg-[#FAF7F2] border-t border-[#E5DED3] text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Verified Engineering Organization • Kachoras Electromechanical Contracting LLC</span>
            <span className="text-slate-900 font-bold">150+ skilled multi-trade technicians & tradesmen deployed across Dubai jobsites.</span>
          </div>

        </div>

      </div>
    </section>
  );
}
