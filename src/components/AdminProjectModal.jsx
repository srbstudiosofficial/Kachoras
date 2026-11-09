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
  FileText,
  Copy,
  Link,
  Sparkles,
  Search,
  BarChart3,
  TrendingUp,
  Building2,
  Layers,
  ArrowRight,
  Activity
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
  "MEP",
  "Aluminium & Glass Fabrication",
  "Dubai Civic & Maintenance"
];

const PRESET_IMAGES = [
  { label: "Albannay Classical Villa", path: "./assets/real-projects/completed-construction-albannay-424-7036.jpg" },
  { label: "AlSaffar Modern Villa", path: "./assets/real-projects/completed-construction-alsaffar-423-19966.jpg" },
  { label: "Shehab Panoramic Villa", path: "./assets/real-projects/completed-construction-shehab-423-1407.jpg" },
  { label: "Alabdulla Majlis Block", path: "./assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg" },
  { label: "Alseraj Villa Maintenance", path: "./assets/real-projects/completed-maintenance-alseraj-422-0200.jpg" },
  { label: "Curtain Wall Facade", path: "./assets/real-projects/completed-aluminum-flag-villa.jpg" },
  { label: "Louvers & Carport", path: "./assets/real-projects/completed-aluminum-modern-carport.jpg" },
  { label: "Travertine Corner Glazing", path: "./assets/real-projects/completed-aluminum-travertine-glazing.jpg" },
  { label: "Al Sayegh Villa 3D", path: "./assets/real-projects/p373-alsayegh-villa-2014.jpg" }
];

export default function AdminProjectModal({ isOpen, onClose, onProjectsChanged }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard'); // 'list' | 'add' | 'settings'

  // Projects state
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Building Contracting',
    status: 'upcoming',
    timeline: '',
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
  const [notificationEmail, setNotificationEmail] = useState(() => {
    try {
      const cfg = getEmailConfig();
      return cfg?.notificationEmail || cfg?.email || 'kachorasdubai@gmail.com';
    } catch (e) {
      return 'kachorasdubai@gmail.com';
    }
  });
  const [emailSavedNotice, setEmailSavedNotice] = useState(false);

  const handleSaveNotificationEmail = (e) => {
    e.preventDefault();
    const clean = (notificationEmail || '').trim();
    if (!clean || !clean.includes('@') || !clean.includes('.')) {
      setSettingsNotice('Please enter a valid email address.');
      setTimeout(() => setSettingsNotice(''), 3000);
      return;
    }
    const currentCfg = getEmailConfig() || {};
    saveEmailConfig({ ...currentCfg, notificationEmail: clean });
    setEmailSavedNotice(true);
    setSettingsNotice(`Lead notification email updated to: ${clean}`);
    setTimeout(() => {
      setEmailSavedNotice(false);
      setSettingsNotice('');
    }, 4000);
  };

  const handleResetNotificationEmail = () => {
    const currentCfg = getEmailConfig() || {};
    saveEmailConfig({ ...currentCfg, notificationEmail: 'kachorasdubai@gmail.com' });
    setNotificationEmail('kachorasdubai@gmail.com');
    setSettingsNotice('Notification email restored to factory default: kachorasdubai@gmail.com');
    setTimeout(() => setSettingsNotice(''), 4000);
  };
  const [settingsNotice, setSettingsNotice] = useState('');
  const [firebaseConfigStr, setFirebaseConfigStr] = useState('');
  const [cloudApiUrl, setCloudApiUrl] = useState(getApiBaseUrl());
  const jsonImportInputRef = useRef(null);

  // Inquiries & Leads state
  const [inquiries, setInquiries] = useState([]);
  const [inquiryFilter, setInquiryFilter] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectListFilter, setProjectListFilter] = useState('all');

  const getDirectAdminUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/#admin`;
    }
    return 'https://kachoras.netlify.app/#admin';
  };

  const handleCopyAdminLink = async () => {
    try {
      const url = getDirectAdminUrl();
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

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
    if (newStatus === 'approved') {
      const targetLead = inquiries.find(i => i.id === id);
      if (targetLead) {
        const projectCategory = 
          targetLead.serviceType?.toLowerCase().includes('villa') ? 'villas' :
          targetLead.serviceType?.toLowerCase().includes('majlis') ? 'majlis' :
          targetLead.serviceType?.toLowerCase().includes('aluminium') || targetLead.serviceType?.toLowerCase().includes('glass') ? 'aluminium' : 'civic_mep';

        const upcomingProjectData = {
          title: targetLead.projectType || targetLead.serviceType || `${targetLead.name} Residence`,
          category: targetLead.serviceType || 'Civil & Electromechanical Construction',
          categoryFilter: projectCategory,
          status: 'upcoming',
          location: targetLead.location || 'Dubai, UAE',
          plotNo: targetLead.plotNo || `Tender Ref: ${targetLead.referenceId}`,
          contractor: 'Kachoras Electromechanical Contracting LLC',
          scope: targetLead.message || `Client contract awarded to Kachoras LLC for ${targetLead.serviceType || 'turnkey construction'}.`,
          specs: [
            `Client: ${targetLead.name}`,
            `Contact: ${targetLead.phone || targetLead.email || 'Verified Inbound'}`,
            `Budget Range: ${targetLead.budgetRange || 'AED Contract Scope'}`,
            'Statutory: Dubai Municipality G+1 Approved'
          ],
          image: '/assets/images/image1.jpeg'
        };

        // 1. Add to local projects
        addProject(upcomingProjectData);

        // 2. Sync to server if running
        try {
          if (typeof addProjectToServer === 'function') {
            await addProjectToServer(upcomingProjectData, null);
          }
        } catch (e) {
          console.warn('Server project creation fallback to local:', e);
        }

        // 3. Immediately refresh projects state in modal and parent
        const updatedProjects = getAllProjects();
        setProjects(updatedProjects);
        if (onProjectsChanged) {
          onProjectsChanged(updatedProjects);
        }
        window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
      }

      // 4. Remove inquiry from active list as requested
      const updatedInquiries = await deleteInquiryOnServer(id);
      setInquiries(updatedInquiries);
      return;
    }

    if (newStatus === 'rejected') {
      // Remove inquiry from active list as requested
      const updatedInquiries = await deleteInquiryOnServer(id);
      setInquiries(updatedInquiries);
      return;
    }

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
      setAuthError('Invalid master passkey. Please check your credentials and try again.');
    }
  };

  const handleResetPasskeyClick = () => {
    resetAdminPasskeyToDefault();
    setSettingsNotice('Master passkey has been restored to factory default.');
    setTimeout(() => setSettingsNotice(''), 4000);
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

  const handleQuickStatusChange = async (projectId, newStatus) => {
    try {
      const proj = projects.find(p => p.id === projectId);
      await updateProjectOnServer(projectId, { ...(proj || {}), status: newStatus });
      await refreshProjectsList();
      window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
    } catch (err) {
      console.warn('Quick project status change failed:', err);
    }
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
        className="relative w-[96vw] max-w-[1440px] bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-auto min-h-[88vh] max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-[#14171F] text-white px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B3261E] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27]">
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
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-white">
          
          {!isAuthenticated ? (
            /* Authentication Screen */
            <div className="max-w-md mx-auto py-10 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#B3261E]/10 border border-[#B3261E]/30 flex items-center justify-center text-[#B3261E] mx-auto">
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

              {/* Direct Link Banner */}
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-left text-xs text-amber-900 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-[#B3261E]">
                    <Link className="w-3.5 h-3.5" />
                    <span>Private Link-Only Access</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAdminLink}
                    className="text-[11px] font-bold text-[#B3261E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  This control panel is private and accessible only via direct URL: <strong className="font-mono text-slate-800">#admin</strong>. You can bookmark it in your browser for 1-click access anytime.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Master Passkey
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPasskey ? "text" : "password"}
                      value={passkeyInput}
                      onChange={(e) => {
                        setPasskeyInput(e.target.value);
                        if (authError) setAuthError('');
                      }}
                      placeholder="Enter master passkey"
                      className="w-full px-4 py-3 pr-11 bg-white rounded-xl border border-[#E2E8F0] text-base sm:text-sm focus:border-[#B3261E] focus:ring-1 focus:ring-[#B3261E] outline-none font-mono"
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
                    <div className="mt-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{authError}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#B3261E] hover:bg-[#5C200E] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Authenticate & Open Dashboard</span>
                </button>

                <div className="text-center text-[11px] text-slate-400 pt-1">
                  Authorized personnel only • Protected under commercial NDA standards
                </div>
              </form>
            </div>
          ) : (
            /* Authenticated Portal Interface */
            <div className="space-y-6">
              
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setActiveTab('dashboard'); }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeTab === 'dashboard'
                        ? 'bg-[#14171F] text-white shadow'
                        : 'bg-white text-slate-700 border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Executive Dashboard</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('list'); handleResetForm(); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeTab === 'list'
                        ? 'bg-[#14171F] text-white shadow'
                        : 'bg-white text-slate-700 border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Project Editor ({projects.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('add'); handleResetForm(); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      activeTab === 'add'
                        ? 'bg-[#B3261E] text-white shadow'
                        : 'bg-white text-slate-700 border border-[#E2E8F0] hover:bg-[#F8FAFC]'
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
                        : 'bg-white text-slate-700 border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Settings & Security</span>
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Status: <span className="text-emerald-700 font-bold">● Active Session</span>
                </div>
              </div>

              {/* TAB 0: Executive Analytics & Operations Dashboard */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6 text-left">
                  
                  {/* Executive Welcome & Live Ops Status */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#141824] via-[#1A2030] to-[#141824] text-white border border-[#232938] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C59B27]">
                          Kachoras Operations & Control Portal • Executive Suite
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                        Executive Overview & Lead Intelligence
                      </h3>
                      <p className="text-xs text-white/70 max-w-xl">
                        Real-time telemetry on customer RFQs, active G+1 villa tenders, portfolio handovers, and statutory Dubai Municipality compliance.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <button
                        onClick={() => { setActiveTab('list'); }}
                        className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition flex items-center gap-2 cursor-pointer"
                        title="Manage, edit, or update existing projects"
                      >
                        <Edit3 className="w-4 h-4 text-[#C59B27]" />
                        <span>Project Editor</span>
                      </button>

                      <button
                        onClick={() => { setActiveTab('add'); handleResetForm(); }}
                        className="px-4 py-2.5 bg-[#B3261E] hover:bg-[#961F18] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-amber-200" />
                        <span>New Project</span>
                      </button>

                      
                    </div>
                  </div>

                  {/* Two-Column Analytics: Discipline Distribution & Lead Status Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left: Discipline Progress & Portfolio Breakdown (7 Cols) */}
                    <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-5">
                      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#B3261E]" />
                          <h4 className="text-sm font-bold text-slate-900">Discipline Portfolio Distribution</h4>
                        </div>
                        <button
                          onClick={() => setActiveTab('list')}
                          className="text-xs font-bold text-[#B3261E] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Manage Projects</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {[
                          { 
                            name: "Architectural Aluminum and Glass", 
                            count: projects.filter(p => p.categoryFilter === 'aluminium').length,
                            total: projects.length,
                            color: "bg-[#8B6D1B]",
                            percent: Math.round((projects.filter(p => p.categoryFilter === 'aluminium').length / (projects.length || 1)) * 100)
                          },
                          { 
                            name: "General Maintenance & Fit-out", 
                            count: projects.filter(p => p.categoryFilter === 'civic_mep' || p.categoryFilter === 'civic').length,
                            total: projects.length,
                            color: "bg-[#B3261E]",
                            percent: Math.round((projects.filter(p => p.categoryFilter === 'civic_mep' || p.categoryFilter === 'civic').length / (projects.length || 1)) * 100)
                          },
                          { 
                            name: "Luxury G+1 Residential Villas", 
                            count: projects.filter(p => p.categoryFilter === 'villas').length,
                            total: projects.length,
                            color: "bg-indigo-600",
                            percent: Math.round((projects.filter(p => p.categoryFilter === 'villas').length / (projects.length || 1)) * 100)
                          },
                          { 
                            name: "Royal Majlis & Traditional Pavilions", 
                            count: projects.filter(p => p.categoryFilter === 'majlis').length,
                            total: projects.length,
                            color: "bg-emerald-600",
                            percent: Math.round((projects.filter(p => p.categoryFilter === 'majlis').length / (projects.length || 1)) * 100)
                          }
                        ].map((disc, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-800">{disc.name}</span>
                              <span className="font-mono text-slate-500 font-bold">{disc.count} projects ({disc.percent}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div className={`h-full rounded-full ${disc.color}`} style={{ width: `${disc.percent}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                        <span>Total Audited Delivery: <strong>{projects.length} Handover Projects</strong></span>
                        <span className="text-emerald-700 font-bold">100% In-House Supervision</span>
                      </div>
                    </div>

                    {/* Right: Project Status Matrix & Direct Controls (5 Cols) */}
                    <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-600" />
                            <h4 className="text-sm font-bold text-slate-900">Project Status Distribution</h4>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500 font-bold">{projects.length} Total</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2.5 text-center">
                          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                            <div className="text-xl font-bold font-display text-emerald-800">
                              {projects.filter(p => p.status === 'completed' || !p.status || p.status.includes('completed')).length}
                            </div>
                            <div className="text-[10px] uppercase font-bold text-emerald-700 mt-0.5">Completed</div>
                          </div>

                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                            <div className="text-xl font-bold font-display text-amber-800">
                              {projects.filter(p => p.status === 'upcoming' || p.status === 'ongoing' || p.status.includes('execution')).length}
                            </div>
                            <div className="text-[10px] uppercase font-bold text-amber-700 mt-0.5">Upcoming</div>
                          </div>

                          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="text-xl font-bold font-display text-indigo-800">
                              {projects.filter(p => p.isCustom).length}
                            </div>
                            <div className="text-[10px] uppercase font-bold text-indigo-700 mt-0.5">Custom</div>
                          </div>
                        </div>

                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                          <div className="font-bold text-slate-800">Fast Status Management</div>
                          <p className="text-[11px] leading-relaxed">
                            Click 'Project Editor' above to change any project between <strong>Upcoming 2026</strong>, <strong>Under Construction</strong>, or <strong>Completed Handover</strong> in 1 click.
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-2">
                        <button
                          onClick={() => { setActiveTab('list'); }}
                          className="w-full py-2.5 bg-[#B3261E] hover:bg-[#961F18] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-white" />
                          <span>Open Project Editor ({projects.length})</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Project Editor & Status Manager Stream (Executive Direct Access) */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                      <div className="flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-[#B3261E]" />
                        <h4 className="text-sm font-bold text-slate-900">Project Editor & Status Control</h4>
                      </div>
                      <button
                        onClick={() => setActiveTab('list')}
                        className="text-xs font-bold text-[#B3261E] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Full Project Editor ({projects.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {projects.slice(0, 4).map((proj) => (
                        <div
                          key={proj.id}
                          className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#B3261E]/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              <img src={proj.image || './assets/villa.jpg'} alt={proj.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                  {proj.category}
                                </span>
                                {proj.plotNo && (
                                  <span className="text-[10px] font-mono text-slate-400">Plot #{proj.plotNo}</span>
                                )}
                              </div>
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{proj.title}</h5>
                              <p className="text-[11px] text-slate-500">{proj.location || 'Dubai, UAE'}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            {/* Fast Status Switch Dropdown */}
                            <select
                              value={proj.status || 'completed'}
                              onChange={(e) => handleQuickStatusChange(proj.id, e.target.value)}
                              className="px-2 py-1 text-xs font-bold rounded-lg border border-[#E2E8F0] bg-white text-slate-800 outline-none cursor-pointer hover:border-[#B3261E]"
                              title="Update Status"
                            >
                              <option value="upcoming">Upcoming 2026</option>
                              <option value="ongoing">Under Construction</option>
                              <option value="completed">Completed Handover</option>
                            </select>

                            <button
                              onClick={() => handleEditClick(proj)}
                              className="px-3 py-1 bg-white hover:bg-[#B3261E] hover:text-white border border-[#E2E8F0] hover:border-[#B3261E] rounded-lg text-xs font-bold text-slate-700 transition flex items-center gap-1 cursor-pointer"
                              title="Edit all details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 1: Projects List Overview */}
              {activeTab === 'list' && (
                <div className="space-y-4">
                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
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

                  {/* Search and Category Filter Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#E2E8F0] shadow-xs">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={projectSearchQuery}
                        onChange={(e) => setProjectSearchQuery(e.target.value)}
                        placeholder="Search projects by title, plot number, client, consultant..."
                        className="w-full pl-9 pr-7 py-2 text-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#B3261E] outline-none"
                      />
                      {projectSearchQuery && (
                        <button 
                          onClick={() => setProjectSearchQuery('')}
                          className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                        >
                          ×
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 shrink-0">
                      {[
                        { id: 'all', label: 'All', count: projects.length },
                        { id: 'upcoming', label: 'Upcoming', count: projects.filter(p => p.status === 'upcoming').length },
                        { id: 'ongoing', label: 'Active', count: projects.filter(p => p.status === 'ongoing').length },
                        { id: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setProjectListFilter(tab.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                            projectListFilter === tab.id
                              ? 'bg-[#14171F] text-white shadow-sm'
                              : 'bg-[#F8FAFC] hover:bg-[#E2E8F0] text-slate-600 border border-[#E2E8F0]'
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${projectListFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                            {tab.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Cards Table */}
                  <div className="space-y-3">
                    {projects
                      .filter(proj => {
                        if (projectListFilter !== 'all' && proj.status !== projectListFilter) return false;
                        if (!projectSearchQuery.trim()) return true;
                        const q = projectSearchQuery.toLowerCase();
                        return (
                          (proj.title && proj.title.toLowerCase().includes(q)) ||
                          (proj.plotNo && proj.plotNo.toLowerCase().includes(q)) ||
                          (proj.client && proj.client.toLowerCase().includes(q)) ||
                          (proj.consultant && proj.consultant.toLowerCase().includes(q)) ||
                          (proj.location && proj.location.toLowerCase().includes(q)) ||
                          (proj.category && proj.category.toLowerCase().includes(q))
                        );
                      })
                      .map((proj) => {
                      const statusBadge = 
                        proj.status === 'upcoming'
                          ? { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', label: 'Upcoming 2026' }
                          : proj.status === 'ongoing'
                          ? { bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Under Construction' }
                          : { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Completed Handover' };

                      return (
                        <div 
                          key={proj.id}
                          className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-[#B3261E] transition"
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

                          <div className="flex flex-wrap items-center gap-2 self-end sm:self-center shrink-0">
                            {/* Inline Quick Status Selector */}
                            <select
                              value={proj.status || 'completed'}
                              onChange={(e) => handleQuickStatusChange(proj.id, e.target.value)}
                              className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 outline-none cursor-pointer hover:border-[#B3261E] transition"
                              title="Change project status immediately"
                            >
                              <option value="upcoming">Upcoming 2026</option>
                              <option value="ongoing">Under Construction</option>
                              <option value="completed">Completed Handover</option>
                            </select>

                            <button
                              onClick={() => handleEditClick(proj)}
                              className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#B3261E] bg-white text-slate-700 hover:text-[#B3261E] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                              title="Edit all project details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit Details</span>
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
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-8 shadow-sm space-y-6">
                  <div className="border-b border-[#E2E8F0] pb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold font-display text-[#14171F]">
                        {editingProjectId ? 'Edit Project Details' : 'Upload New Project'}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Add upcoming planned tenders or newly finished contract handovers to projects.
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
                    
                    {/* Interactive Project Status Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Project Status & Section Placement *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'ongoing', label: 'Active Construction', desc: 'Active site under construction in Dubai' },
                          { id: 'upcoming', label: 'Upcoming Tender (2026)', desc: 'Future tender pipeline or planned project' },
                          { id: 'completed', label: 'Completed Handover', desc: 'Finished project certified & handed over' }
                        ].map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, status: st.id }))}
                            className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                              formData.status === st.id 
                                ? 'border-[#B3261E] bg-[#F8FAFC] ring-2 ring-[#B3261E]/20' 
                                : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#14171F]">{st.label}</span>
                              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                formData.status === st.id ? 'border-[#B3261E] bg-[#B3261E]' : 'border-slate-300'
                              }`}>
                                {formData.status === st.id && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 mt-1 leading-tight">{st.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-base sm:text-sm focus:border-[#B3261E] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Contracting Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-base sm:text-sm bg-white focus:border-[#B3261E] outline-none"
                        >
                          {CATEGORY_OPTIONS.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Timeline & Year */}
                    <div className="grid sm:grid-cols-2 gap-4">

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Timeline / Schedule
                        </label>
                        <input
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                          placeholder="e.g. Commencing Q4 2026"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-base sm:text-sm focus:border-[#B3261E] outline-none"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-base sm:text-sm focus:border-[#B3261E] outline-none"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-base sm:text-sm focus:border-[#B3261E] outline-none"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-base sm:text-sm focus:border-[#B3261E] outline-none"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-base sm:text-sm focus:border-[#B3261E] outline-none"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-base sm:text-sm focus:border-[#B3261E] outline-none"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-base sm:text-sm focus:border-[#B3261E] outline-none resize-none"
                      />
                    </div>

                    {/* Photo Upload & Preview Section */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Project Photography / Render
                      </label>

                      <div className="grid sm:grid-cols-12 gap-4 items-center">
                        {/* Live Photo Preview */}
                        <div className="sm:col-span-4 h-40 rounded-xl overflow-hidden bg-slate-100 border border-[#E2E8F0] relative group">
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
                              className="px-3 py-2.5 bg-white border border-[#E2E8F0] text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition"
                            >
                              Paste Image URL
                            </button>
                          </div>

                          {/* Quick Preset Selector */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] text-slate-500 font-medium">Or choose from project library:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {PRESET_IMAGES.map((img, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setImagePreview(img.path);
                                    setFormData(prev => ({ ...prev, image: img.path }));
                                  }}
                                  className="text-[10px] px-2.5 py-1 rounded bg-[#F8FAFC] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-slate-700 font-medium transition"
                                >
                                  {img.label}
                                </button>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Real-time Website Card Preview */}
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-[#B3261E]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#14171F]">
                            Live Card Preview (How it appears on website)
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                          Live Render Preview
                        </span>
                      </div>

                      <div className="max-w-md mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs ${
                              formData.status === 'upcoming' ? 'bg-indigo-600 text-white' : formData.status === 'ongoing' ? 'bg-[#A35216] text-white' : 'bg-emerald-600 text-white'
                            }`}>
                              {formData.status === 'upcoming' ? 'Upcoming 2026' : formData.status === 'ongoing' ? 'Under Construction' : 'Handed Over'}
                            </span>
                            {formData.timeline && (
                              <span className="text-[10px] font-medium bg-black/60 text-white backdrop-blur-xs px-2.5 py-1 rounded-full">
                                {formData.timeline}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{formData.category}</div>
                          <h4 className="text-base font-bold text-[#14171F] font-display">{formData.title || 'Untitled Project'}</h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span>{formData.location || 'Dubai, UAE'}</span>
                            {formData.plotNo && <span className="ml-1 px-1.5 py-0.2 bg-slate-100 rounded text-[10px] font-mono text-slate-700">Plot #{formData.plotNo}</span>}
                          </p>
                          {formData.scope && (
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1 border-t border-slate-100">
                              {formData.scope}
                            </p>
                          )}
                          {(formData.client || formData.consultant) && (
                            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 space-y-0.5">
                              {formData.client && <div>Client: <strong className="text-slate-700">{formData.client}</strong></div>}
                              {formData.consultant && <div>Consultant: <strong className="text-slate-700">{formData.consultant}</strong></div>}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => { handleResetForm(); setActiveTab('list'); }}
                        className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#B3261E] hover:bg-[#5C200E] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>{editingProjectId ? 'Save Changes' : 'Publish Project'}</span>
                      </button>
                    </div>

                  </form>
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
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
                    <div className="border-b border-[#E2E8F0] pb-3 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold font-display text-[#14171F]">
                          Update Master Passkey
                        </h4>
                        <p className="text-xs text-slate-500">
                          Change the secret code required to unlock this Owner Portal.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to restore the master passkey to factory default?')) {
                            handleResetPasskeyClick();
                          }
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                      >
                        Reset to Factory Default
                      </button>
                    </div>

                    <form onSubmit={handleSavePasskey} className="flex flex-wrap items-center gap-3">
                      <input
                        type="password"
                        value={newPasskey}
                        onChange={(e) => setNewPasskey(e.target.value)}
                        placeholder="Enter new passkey (min 4 characters)"
                        className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:border-[#B3261E] outline-none flex-1 min-w-[220px]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#14171F] hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Save New Passkey
                      </button>
                    </form>
                  </div>

                  {/* Email Forwarding Configuration Info */}
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
                    <div className="border-b border-[#E2E8F0] pb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#B3261E]" />
                        <h4 className="text-base font-bold font-display text-[#14171F]">
                          Direct Email Lead Dispatch
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Client submissions from the website contact transmittal form and 3-step cost estimator are dispatched in real-time.
                      </p>
                    </div>

                    <form onSubmit={handleSaveNotificationEmail} className="space-y-3">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type="email"
                            value={notificationEmail}
                            onChange={(e) => setNotificationEmail(e.target.value)}
                            placeholder="Enter notification email (e.g. yourname@company.com)"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-mono text-slate-800 bg-[#F8FAFC] focus:bg-white focus:border-[#B3261E] outline-none shadow-2xs"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-[#B3261E] hover:bg-[#961F18] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                        >
                          <Check className="w-4 h-4" />
                          <span>Save Email</span>
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Active Destination: {notificationEmail}</span>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Reset notification email back to default (kachorasdubai@gmail.com)?')) {
                              handleResetNotificationEmail();
                            }
                          }}
                          className="text-xs text-slate-400 hover:text-slate-700 underline cursor-pointer"
                        >
                          Reset to kachorasdubai@gmail.com
                        </button>
                      </div>
                    </form>

                    <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
                      Every tender RFP submitted by a client is dispatched directly to <strong>{notificationEmail}</strong> and simultaneously saved in your <strong>Inquiries ({inquiries.length})</strong> tab for complete archival and record keeping.
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
