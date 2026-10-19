import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Database, 
  Key, 
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Eye,
  Check
} from 'lucide-react';
import { 
  getAllProjects, 
  addProject, 
  updateProject, 
  deleteProject, 
  verifyAdminPasskey, 
  updateAdminPasskey, 
  compressImageFile,
  getStoredFirebaseConfig,
  saveStoredFirebaseConfig
} from '../services/projectService';

const CATEGORY_OPTIONS = [
  "Building Contracting",
  "MEP Works & Engineering",
  "Aluminium & Glass Fabrication",
  "Dubai Civic & Maintenance"
];

const PRESET_IMAGES = [
  { label: "G+1 Luxury Villa", path: "./assets/villa.jpg" },
  { label: "Traditional Majlis", path: "./assets/majlis.jpg" },
  { label: "Aluminium & Glass", path: "./assets/aluminium.jpg" },
  { label: "Civic Infrastructure", path: "./assets/civic.jpg" },
  { label: "MEP & Electrical", path: "./assets/mep.jpg" },
  { label: "Modern Villa Stone", path: "./assets/villa_stone.jpg" }
];

export default function AdminProjectModal({ isOpen, onClose, onProjectsChanged }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add' | 'settings'

  // Projects state
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Building Contracting',
    status: 'upcoming',
    timeline: 'Commencing Q4 2026',
    year: '2026',
    location: '',
    plotNo: '',
    client: '',
    consultant: '',
    scope: '',
    image: './assets/villa.jpg'
  });

  const [imagePreview, setImagePreview] = useState('./assets/villa.jpg');
  const [isCompressing, setIsCompressing] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  // Settings state
  const [newPasskey, setNewPasskey] = useState('');
  const [settingsNotice, setSettingsNotice] = useState('');
  const [firebaseConfigStr, setFirebaseConfigStr] = useState('');

  // Load projects on open or tab change
  const refreshProjectsList = () => {
    const list = getAllProjects();
    setProjects(list);
    if (onProjectsChanged) {
      onProjectsChanged(list);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Check if session remember token is active
      const sessionAuth = sessionStorage.getItem('kachoras_admin_session');
      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
      }
      refreshProjectsList();
      const fbConfig = getStoredFirebaseConfig();
      if (fbConfig) {
        setFirebaseConfigStr(JSON.stringify(fbConfig, null, 2));
      }
    }
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyAdminPasskey(passkeyInput)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('kachoras_admin_session', 'true');
      setAuthError('');
      setPasskeyInput('');
      refreshProjectsList();
    } else {
      setAuthError('Invalid master passkey. (Default: kachoras2006)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kachoras_admin_session');
    setActiveTab('list');
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressedDataUrl = await compressImageFile(file, 1200, 0.85);
      setImagePreview(compressedDataUrl);
      setFormData(prev => ({ ...prev, image: compressedDataUrl }));
    } catch (err) {
      alert('Error processing photo: ' + err.message);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      title: '',
      category: 'Building Contracting',
      status: 'upcoming',
      timeline: 'Commencing Q4 2026',
      year: '2026',
      location: '',
      plotNo: '',
      client: '',
      consultant: '',
      scope: '',
      image: './assets/villa.jpg'
    });
    setImagePreview('./assets/villa.jpg');
    setEditingProjectId(null);
    setFormSuccessMessage('');
  };

  const handleEditClick = (project) => {
    setEditingProjectId(project.id);
    setFormData({
      title: project.title || '',
      category: project.category || 'Building Contracting',
      status: project.status || 'upcoming',
      timeline: project.timeline || '',
      year: project.year || '2026',
      location: project.location || '',
      plotNo: project.plotNo || '',
      client: project.client || '',
      consultant: project.consultant || '',
      scope: project.scope || '',
      image: project.image || './assets/villa.jpg'
    });
    setImagePreview(project.image || './assets/villa.jpg');
    setActiveTab('add');
    setFormSuccessMessage('');
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      refreshProjectsList();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    if (editingProjectId) {
      updateProject(editingProjectId, formData);
      setFormSuccessMessage('Project successfully updated!');
    } else {
      addProject(formData);
      setFormSuccessMessage('New project successfully added & published!');
    }

    refreshProjectsList();
    setTimeout(() => {
      handleResetForm();
      setActiveTab('list');
    }, 1200);
  };

  const handleSavePasskey = (e) => {
    e.preventDefault();
    try {
      updateAdminPasskey(newPasskey);
      setSettingsNotice('Master passkey updated successfully!');
      setNewPasskey('');
      setTimeout(() => setSettingsNotice(''), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveFirebaseConfig = (e) => {
    e.preventDefault();
    try {
      if (!firebaseConfigStr.trim()) {
        saveStoredFirebaseConfig(null);
        setSettingsNotice('Firebase configuration cleared. Running in local storage mode.');
      } else {
        const parsed = JSON.parse(firebaseConfigStr);
        saveStoredFirebaseConfig(parsed);
        setSettingsNotice('Firebase configuration saved successfully!');
      }
      setTimeout(() => setSettingsNotice(''), 3000);
    } catch (err) {
      alert('Invalid JSON format: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E5DED3] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-[#14171F] text-white px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7A2E16] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">Owner Portal</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-[#C59B27] border border-[#C59B27]/30 uppercase">
                  Project Manager
                </span>
              </div>
              <p className="text-xs text-white/60">Upload upcoming tenders and finished projects directly</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-white/60 hover:text-white px-2.5 py-1 rounded border border-white/20 transition hidden sm:inline-block"
              >
                Lock Session
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#FAF9F6]">
          
          {!isAuthenticated ? (
            /* Authentication Screen */
            <div className="max-w-md mx-auto py-10 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#7A2E16]/10 border border-[#7A2E16]/30 flex items-center justify-center text-[#7A2E16] mx-auto">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-bold font-display text-[#14171F]">
                  Admin Authentication
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Enter your master access passkey to create, edit, or upload upcoming and completed contracting projects.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Master Passkey
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={passkeyInput}
                      onChange={(e) => setPasskeyInput(e.target.value)}
                      placeholder="Enter passkey (Default: kachoras2006)"
                      className="w-full px-4 py-3 bg-white rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] focus:ring-1 focus:ring-[#7A2E16] outline-none"
                      autoFocus
                    />
                    <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                  {authError && (
                    <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {authError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#7A2E16] hover:bg-[#5C200E] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Authenticate & Open Dashboard</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Default developer passkey is <strong className="text-slate-600 font-mono">kachoras2006</strong>. You can change this in settings.
                </p>
              </form>
            </div>
          ) : (
            /* Authenticated Portal Interface */
            <div className="space-y-6">
              
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DED3] pb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setActiveTab('list'); handleResetForm(); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      activeTab === 'list'
                        ? 'bg-[#14171F] text-white'
                        : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>All Projects ({projects.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('add'); handleResetForm(); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      activeTab === 'add'
                        ? 'bg-[#7A2E16] text-white shadow'
                        : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-200" />
                    <span>+ Upload Project</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      activeTab === 'settings'
                        ? 'bg-[#14171F] text-white'
                        : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Cloud Sync</span>
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Status: <span className="text-emerald-700 font-bold">● Active Session</span>
                </div>
              </div>

              {/* TAB 1: Projects List Overview */}
              {activeTab === 'list' && (
                <div className="space-y-4">
                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white p-4 rounded-xl border border-[#E5DED3] shadow-sm">
                      <div className="text-2xl font-bold font-display text-[#14171F]">{projects.length}</div>
                      <div className="text-[11px] text-slate-500 uppercase font-semibold">Total Projects</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                      <div className="text-2xl font-bold font-display text-indigo-700">
                        {projects.filter(p => p.status === 'upcoming').length}
                      </div>
                      <div className="text-[11px] text-indigo-600 uppercase font-semibold">Upcoming 2026</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                      <div className="text-2xl font-bold font-display text-amber-700">
                        {projects.filter(p => p.status === 'ongoing').length}
                      </div>
                      <div className="text-[11px] text-amber-600 uppercase font-semibold">Ongoing Sites</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                      <div className="text-2xl font-bold font-display text-emerald-700">
                        {projects.filter(p => p.status === 'completed').length}
                      </div>
                      <div className="text-[11px] text-emerald-600 uppercase font-semibold">Completed</div>
                    </div>
                  </div>

                  {/* Project Cards Table */}
                  <div className="space-y-3">
                    {projects.map((proj) => {
                      const statusBadge = 
                        proj.status === 'upcoming'
                          ? { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', label: 'Upcoming 2026' }
                          : proj.status === 'ongoing'
                          ? { bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Under Construction' }
                          : { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Completed Handover' };

                      return (
                        <div 
                          key={proj.id}
                          className="bg-white rounded-2xl border border-[#E5DED3] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-[#7A2E16] transition"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              <img 
                                src={proj.image || './assets/villa.jpg'} 
                                alt={proj.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusBadge.bg}`}>
                                  {statusBadge.label}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">
                                  {proj.category}
                                </span>
                                {proj.isCustom && (
                                  <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">
                                    Owner Upload
                                  </span>
                                )}
                              </div>

                              <h4 className="text-base font-bold text-[#14171F] font-display">
                                {proj.title}
                              </h4>

                              <p className="text-xs text-slate-500">
                                {proj.location || 'Dubai, UAE'} {proj.plotNo && `• Plot #${proj.plotNo}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => handleEditClick(proj)}
                              className="px-3 py-1.5 rounded-lg border border-[#E5DED3] hover:border-[#7A2E16] text-slate-700 hover:text-[#7A2E16] text-xs font-bold transition flex items-center gap-1.5"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            {proj.isCustom && (
                              <button
                                onClick={() => handleDeleteClick(proj.id)}
                                className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 transition"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: Upload / Edit Project Form */}
              {activeTab === 'add' && (
                <div className="bg-white rounded-2xl border border-[#E5DED3] p-5 sm:p-8 shadow-sm space-y-6">
                  <div className="border-b border-[#F0EBE1] pb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold font-display text-[#14171F]">
                        {editingProjectId ? 'Edit Project Details' : 'Upload New Project'}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Add upcoming planned tenders or newly finished contract handovers to the portfolio.
                      </p>
                    </div>
                    {formSuccessMessage && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
                        <CheckCircle2 className="w-4 h-4" />
                        {formSuccessMessage}
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {/* Project Title & Category */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. G+1 Luxury Contemporary Villa & Majlis"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Contracting Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm bg-white focus:border-[#7A2E16] outline-none"
                        >
                          {CATEGORY_OPTIONS.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Status & Timeline */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Project Status *
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm bg-white focus:border-[#7A2E16] outline-none font-semibold text-[#7A2E16]"
                        >
                          <option value="upcoming">Upcoming / Tender (2026)</option>
                          <option value="ongoing">Under Active Construction</option>
                          <option value="completed">Completed & Handed Over</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Timeline / Schedule
                        </label>
                        <input
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                          placeholder="e.g. Commencing Q4 2026"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Year
                        </label>
                        <input
                          type="text"
                          value={formData.year}
                          onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                          placeholder="2026"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] outline-none"
                        />
                      </div>
                    </div>

                    {/* Location & Plot # */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="e.g. Nad Al Sheba 1, Dubai"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Plot Number (DM)
                        </label>
                        <input
                          type="text"
                          value={formData.plotNo}
                          onChange={(e) => setFormData(prev => ({ ...prev, plotNo: e.target.value }))}
                          placeholder="e.g. 6142891"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] outline-none"
                        />
                      </div>
                    </div>

                    {/* Client & Consultant (Optional) */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Client / Owner (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.client}
                          onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                          placeholder="e.g. Private Client or Dubai Municipality"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Consultant Engineering Firm (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.consultant}
                          onChange={(e) => setFormData(prev => ({ ...prev, consultant: e.target.value }))}
                          placeholder="e.g. Croquis Engineering Consultancy"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] outline-none"
                        />
                      </div>
                    </div>

                    {/* Scope & Description */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Technical Scope & Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.scope}
                        onChange={(e) => setFormData(prev => ({ ...prev, scope: e.target.value }))}
                        placeholder="Describe the structural work, MEP packages, architectural glazing, or municipal approvals involved in this project."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] outline-none resize-none"
                      />
                    </div>

                    {/* Photo Upload & Preview Section */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Project Photography / Render
                      </label>

                      <div className="grid sm:grid-cols-12 gap-4 items-center">
                        {/* Live Photo Preview */}
                        <div className="sm:col-span-4 h-40 rounded-xl overflow-hidden bg-slate-100 border border-[#E5DED3] relative group">
                          <img 
                            src={imagePreview} 
                            alt="Project Preview" 
                            className="w-full h-full object-cover"
                          />
                          {isCompressing && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                              Compressing...
                            </div>
                          )}
                        </div>

                        {/* Upload Controls */}
                        <div className="sm:col-span-8 space-y-3">
                          <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                            className="hidden"
                          />

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current && fileInputRef.current.click()}
                              className="px-4 py-2.5 bg-[#14171F] hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
                            >
                              <Upload className="w-4 h-4 text-[#C59B27]" />
                              <span>Upload Photo from Device / Camera</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const url = window.prompt("Enter direct image URL:", formData.image);
                                if (url) {
                                  setImagePreview(url);
                                  setFormData(prev => ({ ...prev, image: url }));
                                }
                              }}
                              className="px-3 py-2.5 bg-white border border-[#E5DED3] text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition"
                            >
                              Paste Image URL
                            </button>
                          </div>

                          {/* Quick Preset Selector */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] text-slate-500 font-medium">Or choose from portfolio library:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {PRESET_IMAGES.map((img, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setImagePreview(img.path);
                                    setFormData(prev => ({ ...prev, image: img.path }));
                                  }}
                                  className="text-[10px] px-2.5 py-1 rounded bg-[#FAF8F5] hover:bg-[#EFE9DF] border border-[#E5DED3] text-slate-700 font-medium transition"
                                >
                                  {img.label}
                                </button>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => { handleResetForm(); setActiveTab('list'); }}
                        className="px-4 py-2.5 rounded-xl border border-[#E5DED3] text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#7A2E16] hover:bg-[#5C200E] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>{editingProjectId ? 'Save Changes' : 'Publish Project to Portfolio'}</span>
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* TAB 3: Cloud Sync & Settings */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {settingsNotice && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4" />
                      {settingsNotice}
                    </div>
                  )}

                  {/* Passkey Security Setting */}
                  <div className="bg-white rounded-2xl border border-[#E5DED3] p-6 shadow-sm space-y-4">
                    <div className="border-b border-[#F0EBE1] pb-3">
                      <h4 className="text-base font-bold font-display text-[#14171F]">
                        Update Master Passkey
                      </h4>
                      <p className="text-xs text-slate-500">
                        Change the secret code required to unlock this Owner Portal.
                      </p>
                    </div>

                    <form onSubmit={handleSavePasskey} className="flex flex-wrap items-center gap-3">
                      <input
                        type="text"
                        value={newPasskey}
                        onChange={(e) => setNewPasskey(e.target.value)}
                        placeholder="Enter new passkey (min 4 characters)"
                        className="px-4 py-2.5 rounded-xl border border-[#E5DED3] text-sm focus:border-[#7A2E16] outline-none flex-1 min-w-[220px]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#14171F] hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Save New Passkey
                      </button>
                    </form>
                  </div>

                  {/* Firebase Real-Time Cloud Sync */}
                  <div className="bg-white rounded-2xl border border-[#E5DED3] p-6 shadow-sm space-y-4">
                    <div className="border-b border-[#F0EBE1] pb-3">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#C59B27]" />
                        <h4 className="text-base font-bold font-display text-[#14171F]">
                          Cloud Database Sync (Firebase / Supabase)
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Currently running in <strong>Instant Local Storage mode</strong> (projects saved instantly in browser). You can link a free Firebase project to synchronize across all visitors and devices globally.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        To connect global live cloud sync, paste your web app Firebase configuration JSON here:
                      </p>

                      <textarea
                        rows={4}
                        value={firebaseConfigStr}
                        onChange={(e) => setFirebaseConfigStr(e.target.value)}
                        placeholder='{ "apiKey": "AIzaSy...", "projectId": "kachoras-dubai", "storageBucket": "..." }'
                        className="w-full px-3.5 py-2.5 font-mono text-xs rounded-xl border border-[#E5DED3] bg-[#FAF8F5] focus:border-[#7A2E16] outline-none"
                      />

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">
                          Leave empty to keep using Instant Browser Storage.
                        </span>
                        <button
                          type="button"
                          onClick={handleSaveFirebaseConfig}
                          className="px-4 py-2 bg-[#7A2E16] hover:bg-[#5C200E] text-white rounded-xl text-xs font-bold transition cursor-pointer"
                        >
                          Save Cloud Config
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
