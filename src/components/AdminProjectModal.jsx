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
  EyeOff,
  Check,
  Inbox,
  Mail,
  Phone,
  MessageSquare,
  Download,
  MapPin,
  Building,
  User,
  FileText
} from 'lucide-react';
import { 
  getAllProjects, 
  addProject, 
  updateProject, 
  deleteProject, 
  verifyAdminPasskey, 
  updateAdminPasskey, 
  resetAdminPasskeyToDefault, 
  compressImageFile,
  getStoredFirebaseConfig,
  saveStoredFirebaseConfig,
  fetchServerProjects,
  addProjectToServer,
  updateProjectOnServer,
  deleteProjectOnServer,
  checkServerHealth,
  exportProjectsJSON,
  importProjectsJSON,
  getApiBaseUrl,
  setApiBaseUrl
} from '../services/projectService';
import {
  isFirebaseActive,
  subscribeCloudProjects,
  subscribeCloudInquiries,
  syncLocalProjectsToCloud,
  syncLocalInquiriesToCloud
} from '../services/firebaseSync';
import {
  getStoredInquiries,
  updateInquiryStatus,
  deleteInquiry,
  exportInquiriesToCSV,
  getEmailConfig,
  saveEmailConfig,
  fetchServerInquiries,
  updateInquiryStatusOnServer,
  deleteInquiryOnServer
} from '../services/inquiryService';

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
  const [showPasskey, setShowPasskey] = useState(false);
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
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);

  const [newPasskey, setNewPasskey] = useState('');
  const [settingsNotice, setSettingsNotice] = useState('');
  const [firebaseConfigStr, setFirebaseConfigStr] = useState('');
  const [cloudApiUrl, setCloudApiUrl] = useState(getApiBaseUrl());
  const jsonImportInputRef = useRef(null);

  // Inquiries & Leads state
  const [inquiries, setInquiries] = useState([]);
  const [inquiryFilter, setInquiryFilter] = useState('all'); // 'all' | 'new' | 'contacted' | 'archived'

  // Load inquiries
  const refreshInquiriesList = async () => {
    setInquiries(getStoredInquiries());
    try {
      const live = await fetchServerInquiries();
      if (live && Array.isArray(live)) {
        setInquiries(live);
      }
    } catch (err) {
      // Keep local
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const updated = await updateInquiryStatusOnServer(id, newStatus);
    setInquiries(updated);
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead record?')) {
      const updated = await deleteInquiryOnServer(id);
      setInquiries(updated);
    }
  };

  // Load projects on open or tab change
  const refreshProjectsList = async () => {
    const local = getAllProjects();
    setProjects(local);
    try {
      const live = await fetchServerProjects();
      if (live && Array.isArray(live) && live.length > 0) {
        setProjects(live);
        if (onProjectsChanged) {
          onProjectsChanged(live);
        }
        return;
      }
    } catch (err) {
      // Keep local
    }
    if (onProjectsChanged) {
      onProjectsChanged(local);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkServerHealth().then(res => setServerOnline(res.online));
      // Check if session remember token is active
      const sessionAuth = sessionStorage.getItem('kachoras_admin_session');
      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
      }
      refreshProjectsList();
      refreshInquiriesList();
      const fbConfig = getStoredFirebaseConfig();
      if (fbConfig) {
        setFirebaseConfigStr(JSON.stringify(fbConfig, null, 2));
      }
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const entered = (passkeyInput || '').trim();
    if (!entered) {
      setAuthError('Please enter the master passkey.');
      return;
    }

    if (verifyAdminPasskey(entered)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('kachoras_admin_session', 'true');
      setAuthError('');
      setPasskeyInput('');
      
      // Also sync token with backend server if online
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passkey: entered })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            sessionStorage.setItem('kachoras_server_token', data.token);
          }
        }
      } catch (err) {
        // Local mode fallback
      }

      refreshProjectsList();
      refreshInquiriesList();
      checkServerHealth().then(res => setServerOnline(res.online));
    } else {
      setAuthError('Invalid master passkey. Default passkey: kachoras2006');
    }
  };

  const handleResetPasskeyClick = () => {
    resetAdminPasskeyToDefault();
    setPasskeyInput('kachoras2006');
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kachoras_admin_session');
    setActiveTab('list');
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setSelectedPhotoFile(file);

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
    setSelectedPhotoFile(null);
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
    setSelectedPhotoFile(null);
    setActiveTab('add');
    setFormSuccessMessage('');
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProjectOnServer(id);
      await refreshProjectsList();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    try {
      if (editingProjectId) {
        const res = await updateProjectOnServer(editingProjectId, formData, selectedPhotoFile);
        if (res && res.isOffline) {
          setFormSuccessMessage('Project updated in offline local cache (pending cloud connection).');
        } else {
          setFormSuccessMessage('Project successfully updated and synchronized to live cloud database worldwide!');
        }
      } else {
        const res = await addProjectToServer(formData, selectedPhotoFile);
        if (res && res.isOffline) {
          setFormSuccessMessage('Project saved to offline local cache (pending cloud connection).');
        } else {
          setFormSuccessMessage('New project successfully saved and synchronized to live cloud database worldwide!');
        }
      }
    } catch (err) {
      console.warn('Project save notice:', err);
    }

    await refreshProjectsList();
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

  const handleExportProjects = () => {
    try {
      const jsonStr = exportProjectsJSON();
      // Download as file
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kachoras-projects-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Also copy to clipboard for quick WhatsApp / chat sharing
      navigator.clipboard?.writeText(jsonStr).then(() => {
        alert('Projects exported successfully! The file has been downloaded, and the JSON data was also copied to your clipboard so you can paste it into WhatsApp or email.');
      }).catch(() => {
        alert('Projects exported successfully! The backup JSON file has been downloaded.');
      });
    } catch (err) {
      alert('Error exporting projects: ' + err.message);
    }
  };

  const handleImportFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target.result;
        const res = importProjectsJSON(content);
        if (res.success) {
          alert(`Successfully imported ${res.count} project(s)! Total active projects: ${res.total}`);
          await refreshProjectsList();
        } else {
          alert('Import failed: ' + res.error);
        }
      } catch (err) {
        alert('Failed to read JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePasteImportPrompt = async () => {
    const pasted = window.prompt('Paste the project JSON code exported from the other device/browser:');
    if (!pasted || !pasted.trim()) return;

    const res = importProjectsJSON(pasted.trim());
    if (res.success) {
      alert(`Successfully imported ${res.count} project(s)! Total active projects: ${res.total}`);
      await refreshProjectsList();
    } else {
      alert('Import failed: ' + res.error);
    }
  };

  const handleSaveCloudApiUrl = async (e) => {
    e.preventDefault();
    setApiBaseUrl(cloudApiUrl);
    setSettingsNotice('Cloud API Base URL updated! Checking connection...');
    const health = await checkServerHealth();
    setServerOnline(health.online);
    if (health.online) {
      setSettingsNotice('Connected to live cloud database server successfully!');
      await refreshProjectsList();
    } else {
      setSettingsNotice('Cloud API URL saved (Server unreachable or offline).');
    }
    setTimeout(() => setSettingsNotice(''), 4000);
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
                {isFirebaseActive() ? (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Firebase Cloud Sync
                  </span>
                ) : serverOnline ? (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live DB Connected
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/60">
                    Local Device Mode
                  </span>
                )}
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
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Master Passkey
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setPasskeyInput('kachoras2006');
                        setAuthError('');
                      }}
                      className="text-[11px] font-semibold text-[#7A2E16] hover:text-[#5C200E] underline cursor-pointer"
                    >
                      Fill Default (kachoras2006)
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPasskey ? "text" : "password"}
                      value={passkeyInput}
                      onChange={(e) => {
                        setPasskeyInput(e.target.value);
                        if (authError) setAuthError('');
                      }}
                      placeholder="Enter passkey (e.g. kachoras2006)"
                      className="w-full px-4 py-3 pr-11 bg-white rounded-xl border border-[#E5DED3] text-base sm:text-sm focus:border-[#7A2E16] focus:ring-1 focus:ring-[#7A2E16] outline-none font-mono"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasskey(!showPasskey)}
                      className="absolute right-3 top-3 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPasskey ? "Hide passkey" : "Show passkey"}
                    >
                      {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {authError && (
                    <div className="mt-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start justify-between gap-2">
                      <div className="flex items-start gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                        <span>{authError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetPasskeyClick}
                        className="underline font-bold text-rose-800 hover:text-rose-900 shrink-0 text-[11px] cursor-pointer"
                      >
                        Reset Passkey
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#7A2E16] hover:bg-[#5C200E] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Authenticate & Open Dashboard</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Passkey: <strong className="text-slate-800 font-mono">kachoras2006</strong></span>
                  <button
                    type="button"
                    onClick={handleResetPasskeyClick}
                    className="text-slate-500 hover:text-slate-700 underline cursor-pointer"
                  >
                    Restore Factory Default
                  </button>
                </div>
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
                    onClick={() => { setActiveTab('inquiries'); refreshInquiriesList(); }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeTab === 'inquiries'
                        ? 'bg-[#7A2E16] text-white shadow'
                        : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <Inbox className="w-3.5 h-3.5 text-amber-200" />
                    <span>Inquiries ({inquiries.length})</span>
                    {inquiries.filter(i => i.status === 'new').length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
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
                    <span>Settings & Cloud</span>
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

                  {/* Multi-Device Data Sync & Export/Import Bar */}
                  <div className="bg-[#FAF8F5] border border-[#E5DED3] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#7A2E16]" />
                        <h4 className="text-sm font-bold text-[#14171F]">Multi-Device Project Sync & Backup</h4>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                          Device-to-Device Sharing
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                        If projects were added on the client's phone or another browser, click <strong>"Export Projects"</strong> on that device to download or copy the data, then click <strong>"Import Projects"</strong> here to sync them immediately.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <input 
                        type="file" 
                        ref={jsonImportInputRef} 
                        onChange={handleImportFileSelect} 
                        accept=".json,application/json" 
                        className="hidden" 
                      />

                      <button
                        type="button"
                        onClick={handleExportProjects}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 text-[#7A2E16] border border-[#7A2E16]/30 text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                        title="Download backup file and copy JSON to clipboard"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Projects</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => jsonImportInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-[#7A2E16] hover:bg-[#5C200E] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                        title="Select and import a JSON file"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Import JSON File</span>
                      </button>

                      <button
                        type="button"
                        onClick={handlePasteImportPrompt}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition cursor-pointer"
                        title="Paste exported code directly"
                      >
                        Paste Code
                      </button>
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
                                  proj.syncStatus === 'local_only' ? (
                                    <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded font-bold">
                                      Offline Cache
                                    </span>
                                  ) : (
                                    <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">
                                      Cloud Synced
                                    </span>
                                  )
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

              {/* TAB: Client Inquiries & Tenders */}
              {activeTab === 'inquiries' && (
                <div className="space-y-5">
                  {/* Inquiries Header */}
                  <div className="bg-white rounded-2xl border border-[#E5DED3] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Inbox className="w-5 h-5 text-[#7A2E16]" />
                        <h4 className="text-xl font-bold font-display text-[#14171F]">
                          Client Tenders & Lead Inquiries
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Forwarded automatically to <strong>kachorasdubai@gmail.com</strong> and archived in your executive portal.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={exportInquiriesToCSV}
                        className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-[#E5DED3] text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                        title="Download Leads to CSV Spreadsheet"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>Export CSV / Excel</span>
                      </button>

                      <button
                        onClick={refreshInquiriesList}
                        className="p-2 bg-white hover:bg-slate-50 border border-[#E5DED3] text-slate-600 rounded-xl transition cursor-pointer"
                        title="Refresh List"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setInquiryFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        inquiryFilter === 'all'
                          ? 'bg-[#14171F] text-white'
                          : 'bg-white text-slate-600 border border-[#E5DED3] hover:bg-slate-50'
                      }`}
                    >
                      All Inquiries ({inquiries.length})
                    </button>
                    <button
                      onClick={() => setInquiryFilter('new')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        inquiryFilter === 'new'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
                      }`}
                    >
                      <span>New Leads</span>
                      <span className="font-mono text-[10px] bg-white/20 px-1 rounded">
                        {inquiries.filter(i => i.status === 'new').length}
                      </span>
                    </button>
                    <button
                      onClick={() => setInquiryFilter('contacted')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        inquiryFilter === 'contacted'
                          ? 'bg-blue-700 text-white'
                          : 'bg-white text-slate-600 border border-[#E5DED3] hover:bg-slate-50'
                      }`}
                    >
                      Contacted ({inquiries.filter(i => i.status === 'contacted').length})
                    </button>
                    <button
                      onClick={() => setInquiryFilter('archived')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        inquiryFilter === 'archived'
                          ? 'bg-slate-700 text-white'
                          : 'bg-white text-slate-600 border border-[#E5DED3] hover:bg-slate-50'
                      }`}
                    >
                      Archived ({inquiries.filter(i => i.status === 'archived').length})
                    </button>
                  </div>

                  {/* Inquiries Cards List */}
                  <div className="space-y-3.5">
                    {inquiries
                      .filter(i => inquiryFilter === 'all' ? true : i.status === inquiryFilter)
                      .map((lead) => {
                        const statusConfig = 
                          lead.status === 'new'
                            ? { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', label: 'New Lead' }
                            : lead.status === 'contacted'
                            ? { bg: 'bg-blue-50 text-blue-800 border-blue-200', label: 'Contacted' }
                            : { bg: 'bg-slate-100 text-slate-600 border-slate-200', label: 'Archived' };

                        return (
                          <div
                            key={lead.id}
                            className="bg-white rounded-2xl border border-[#E5DED3] p-5 sm:p-6 shadow-sm space-y-4 hover:border-[#7A2E16] transition"
                          >
                            {/* Card Header */}
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EBE1] pb-3.5">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E5DED3] text-[#7A2E16]">
                                  {lead.referenceId}
                                </span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusConfig.bg}`}>
                                  {statusConfig.label}
                                </span>
                                {lead.syncStatus === 'local_only' ? (
                                  <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded font-bold">
                                    Offline Cache
                                  </span>
                                ) : (
                                  <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded font-bold">
                                    Cloud Synced
                                  </span>
                                )}
                                <span className="text-[11px] text-slate-400">
                                  {new Date(lead.timestamp).toLocaleString()}
                                </span>
                              </div>

                              {/* Status Toggle Dropdown */}
                              <div className="flex items-center gap-2">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                  className="text-xs bg-[#FAF8F5] border border-[#E5DED3] rounded-lg px-2.5 py-1 text-slate-700 outline-none font-semibold cursor-pointer"
                                >
                                  <option value="new">Mark: New</option>
                                  <option value="contacted">Mark: Contacted</option>
                                  <option value="archived">Mark: Archived</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteInquiry(lead.id)}
                                  className="p-1.5 rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Client & Scope Matrix */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Client / Company</span>
                                <strong className="text-slate-900 block text-sm mt-0.5">{lead.name}</strong>
                                {lead.company && <span className="text-slate-500 block text-[11px]">{lead.company}</span>}
                              </div>

                              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Discipline Requested</span>
                                <strong className="text-[#7A2E16] block text-sm mt-0.5">{lead.serviceType}</strong>
                                {lead.budgetRange && <span className="text-slate-600 block text-[11px]">Budget: {lead.budgetRange}</span>}
                              </div>

                              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location / Plot</span>
                                <strong className="text-slate-900 block text-sm mt-0.5">{lead.location}</strong>
                                {lead.plotNo && <span className="text-emerald-800 font-mono block text-[11px]">Plot #{lead.plotNo}</span>}
                              </div>
                            </div>

                            {/* Notes / Message */}
                            {lead.message && (
                              <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#EFE9DF] text-xs text-slate-700 leading-relaxed font-normal">
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Client Scope Notes:</span>
                                {lead.message}
                              </div>
                            )}

                            {lead.attachedFile && (
                              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] flex items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-2 text-slate-700">
                                  <FileText className="w-4 h-4 text-[#7A2E16] shrink-0" />
                                  <div>
                                    <span className="font-bold block text-slate-900">
                                      Attached Drawing / BOQ: {typeof lead.attachedFile === 'string' ? lead.attachedFile : lead.attachedFile.name}
                                    </span>
                                    {lead.attachedFile.size && (
                                      <span className="text-[10px] text-slate-500 font-mono">
                                        {(lead.attachedFile.size / 1024 / 1024).toFixed(2)} MB
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {lead.attachedFile.url && (
                                  <a
                                    href={lead.attachedFile.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={lead.attachedFile.name || 'drawing'}
                                    className="px-3 py-1.5 bg-[#7A2E16] hover:bg-[#5C200E] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm shrink-0"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download</span>
                                  </a>
                                )}
                              </div>
                            )}

                            {/* Direct Communication Buttons */}
                            <div className="pt-2 flex flex-wrap items-center gap-2">
                              {lead.phone && (
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                    `Hello ${lead.name}, this is Jose K. George from Kachoras Electromechanical Contracting LLC Dubai regarding your project inquiry [Ref: ${lead.referenceId}].`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>WhatsApp Client</span>
                                </a>
                              )}

                              {lead.phone && (
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="px-3.5 py-2 bg-[#14171F] hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                                >
                                  <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                                  <span>Call ({lead.phone})</span>
                                </a>
                              )}

                              {lead.email && (
                                <a
                                  href={`mailto:${lead.email}?subject=${encodeURIComponent(`Kachoras Contracting Inquiry [Ref: ${lead.referenceId}]`)}`}
                                  className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-[#E5DED3] text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                                >
                                  <Mail className="w-3.5 h-3.5 text-[#7A2E16]" />
                                  <span>Email Client</span>
                                </a>
                              )}
                            </div>

                          </div>
                        );
                      })}

                    {inquiries.filter(i => inquiryFilter === 'all' ? true : i.status === inquiryFilter).length === 0 && (
                      <div className="bg-white rounded-2xl border border-[#E5DED3] p-10 text-center space-y-2 text-slate-500">
                        <Inbox className="w-8 h-8 text-slate-400 mx-auto" />
                        <h5 className="font-bold text-slate-700 text-sm">No Inquiries In This Tab</h5>
                        <p className="text-xs">Incoming tenders submitted by clients on the website will be listed here.</p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 4: Cloud Sync & Settings */}
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

                  {/* Live Cloud Backend API Endpoint (Render / Node.js) */}
                  <div className="bg-white rounded-2xl border border-[#E5DED3] p-6 shadow-sm space-y-4">
                    <div className="border-b border-[#F0EBE1] pb-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#7A2E16]" />
                        <h4 className="text-base font-bold font-display text-[#14171F]">
                          Live Cloud Server Backend API
                        </h4>
                      </div>
                      {serverOnline ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Connected Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                          Local Browser Storage Mode
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      To connect your live Express/Render backend server so projects sync automatically across all clients and visitors, enter your backend server URL below:
                    </p>

                    <form onSubmit={handleSaveCloudApiUrl} className="flex flex-wrap gap-2.5">
                      <input
                        type="url"
                        value={cloudApiUrl}
                        onChange={(e) => setCloudApiUrl(e.target.value)}
                        placeholder="e.g. https://kachoras-backend.onrender.com"
                        className="px-4 py-2.5 rounded-xl border border-[#E5DED3] text-sm focus:border-[#7A2E16] outline-none flex-1 min-w-[260px] font-mono"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#7A2E16] hover:bg-[#5C200E] text-white rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Connect Server
                      </button>
                    </form>
                  </div>

                  {/* Firebase Real-Time Cloud Sync */}
                  <div className="bg-white rounded-2xl border border-[#E5DED3] p-6 shadow-sm space-y-4">
                    <div className="border-b border-[#F0EBE1] pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-[#C59B27]" />
                          <h4 className="text-base font-bold font-display text-[#14171F]">
                            Global Cloud Database Sync (Google Firebase)
                          </h4>
                        </div>
                        {isFirebaseActive() && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Sync Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Connected to Cloud Firestore project <strong>kachoras-73183</strong>. Every project added, edited, or deleted on any device immediately synchronizes across all visitors and smartphones globally.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Active Web App Firebase configuration:
                      </p>

                      <textarea
                        rows={5}
                        value={firebaseConfigStr}
                        onChange={(e) => setFirebaseConfigStr(e.target.value)}
                        placeholder='{ "apiKey": "AIzaSy...", "projectId": "kachoras-73183", "storageBucket": "..." }'
                        className="w-full px-3.5 py-2.5 font-mono text-xs rounded-xl border border-[#E5DED3] bg-[#FAF8F5] focus:border-[#7A2E16] outline-none"
                      />

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          type="button"
                          onClick={async () => {
                            setSettingsNotice('Synchronizing local projects & inquiries with Cloud Firestore...');
                            await syncLocalProjectsToCloud();
                            await syncLocalInquiriesToCloud();
                            await refreshProjectsList();
                            await refreshInquiriesList();
                            setSettingsNotice('Cloud synchronization complete! All records unified.');
                            setTimeout(() => setSettingsNotice(''), 4000);
                          }}
                          className="px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#F0EBE1] border border-[#E5DED3] text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#7A2E16]" />
                          <span>Force Cloud Re-sync</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleSaveFirebaseConfig}
                          className="px-4 py-2 bg-[#7A2E16] hover:bg-[#5C200E] text-white rounded-xl text-xs font-bold transition cursor-pointer"
                        >
                          Update Config
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Email Forwarding Configuration Info */}
                  <div className="bg-white rounded-2xl border border-[#E5DED3] p-6 shadow-sm space-y-4">
                    <div className="border-b border-[#F0EBE1] pb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#7A2E16]" />
                        <h4 className="text-base font-bold font-display text-[#14171F]">
                          Direct Email Lead Dispatch
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Client submissions from the website contact transmittal form and 3-step cost estimator are dispatched in real-time.
                      </p>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] flex flex-wrap items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Primary Notification Email</span>
                        <div className="font-mono text-sm font-bold text-[#7A2E16]">kachorasdubai@gmail.com</div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Active Dispatch</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      Every tender RFP submitted by a client is simultaneously dispatched to <strong>kachorasdubai@gmail.com</strong> and archived in your <strong>Inquiries ({inquiries.length})</strong> tab for complete backup and record keeping.
                    </p>
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
