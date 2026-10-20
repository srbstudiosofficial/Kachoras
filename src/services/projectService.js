import { 
  COMPLETED_PROJECTS_VILLAS, 
  DUBAI_MUNICIPALITY_PROJECTS, 
  ONGOING_PROJECTS 
} from '../data/mockData';
import {
  isFirebaseActive,
  saveCloudProject,
  deleteCloudProject,
  subscribeCloudProjects
} from './firebaseSync';

// LocalStorage Keys
const STORAGE_KEY_PROJECTS = 'kachoras_custom_projects_v1';
const STORAGE_KEY_FIREBASE = 'kachoras_firebase_config_v1';
const STORAGE_KEY_AUTH = 'kachoras_admin_auth_v1';

// Default initial upcoming & featured projects
export const INITIAL_FEATURED_PROJECTS = [
  {
    id: "UP-2026-01",
    title: "Luxury G+1 Contemporary Villa & Majlis Annex",
    client: "Private UAE National Client",
    consultant: "Croquis Engineering Consultancy",
    category: "Building Contracting",
    type: "G+1 Villa + Majlis",
    status: "upcoming", // 'upcoming' | 'ongoing' | 'completed'
    location: "Nad Al Sheba 1, Dubai",
    plotNo: "6142891",
    year: "2026",
    timeline: "Commencing Q4 2026",
    scope: "Turnkey luxury residential compound featuring G+1 main residence, standalone heritage majlis block, subterranean mechanical pump room, and structural boundary enclosure.",
    image: "./assets/villa.jpg",
    isCustom: false,
    createdAt: "2026-01-15T00:00:00.000Z"
  },
  {
    id: "UP-2026-02",
    title: "Thermal-Break Architectural Curtain Wall Fitout",
    client: "Commercial Development Partner",
    consultant: "Gulf Engineering Consultants",
    category: "Aluminium & Glass Fabrication",
    type: "Curtain Wall & Double Glazing",
    status: "upcoming",
    location: "Al Qusais Industrial Area 2, Dubai",
    plotNo: "2418902",
    year: "2026",
    timeline: "Tender Phase — Q4 2026",
    scope: "Fabrication and structural fixing of 1,200 sq.m of double-glazed thermal-break aluminium curtain walling engineered at Al Qusais B-25 facility.",
    image: "./assets/aluminium.jpg",
    isCustom: false,
    createdAt: "2026-02-10T00:00:00.000Z"
  },
  {
    id: "OG-2026-01",
    title: "Proposed Majlis Block & Structural Remodel",
    client: "Maha Ebrahim Mohammad Hassan Alblooshi",
    consultant: "Al Manhal Engineering Consultants",
    category: "Building Contracting",
    type: "Majlis Block",
    status: "ongoing",
    location: "Al Barsha South First, Dubai",
    plotNo: "6716536",
    year: "2026",
    timeline: "Superstructure Pours & MEP Rough-ins",
    scope: "Reinforced concrete ground structure, custom gypsum ceiling rough-ins, and high-efficiency ducted HVAC network.",
    image: "./assets/majlis.jpg",
    isCustom: false,
    createdAt: "2026-03-01T00:00:00.000Z"
  },
  {
    id: "DM-2026-01",
    title: "Municipal Veterinary Clinical Facilities & Civic Chambers",
    client: "Dubai Municipality",
    consultant: "DM General Maintenance Department",
    category: "Dubai Civic & Maintenance",
    type: "Civic Health Infrastructure",
    status: "completed",
    location: "Hatta Civic Sector, Dubai",
    plotNo: "8912682",
    year: "2025",
    timeline: "Handed Over & DM Certified",
    scope: "Turnkey clinical fitout, medical plumbing, anti-bacterial sanitary wall finishes, and underground hydraulic valve control conduits.",
    image: "./assets/civic.jpg",
    isCustom: false,
    createdAt: "2025-11-20T00:00:00.000Z"
  },
  {
    id: "CP-2025-01",
    title: "G+1 Luxury Villa & Integrated Service Block",
    client: "Mr. Khalifa Sebil Almas Khamis Salmin",
    consultant: "Croquis Engineering Consultancy",
    category: "Building Contracting",
    type: "G+1 Turnkey Villa",
    status: "completed",
    location: "Wadi Al Shabak, Dubai",
    plotNo: "4317233",
    year: "2025",
    timeline: "Final Municipality Handover Complete",
    scope: "Complete civil structure, substructure soil compaction, DEWA electrical substation connection, and thermal aluminium fenestration.",
    image: "./assets/villa_arabic.jpg",
    isCustom: false,
    createdAt: "2025-08-15T00:00:00.000Z"
  },
  {
    id: "CP-2025-02",
    title: "Commercial MEP & Hydraulic Pump Substation",
    client: "Dubai Municipality / Civic Maintenance",
    consultant: "Dubai Municipality General Maintenance Dept",
    category: "MEP Works & Engineering",
    type: "Hydraulic MEP",
    status: "completed",
    location: "Shooroq, Mirdif, Dubai",
    plotNo: "Shooroq Irrigation Hub",
    year: "2025",
    timeline: "Testing, Commissioning & Inspection Passed",
    scope: "Underground valve chambers, pressure balancing, automated irrigation pump sets, and industrial switchboards.",
    image: "./assets/mep.jpg",
    isCustom: false,
    createdAt: "2025-06-10T00:00:00.000Z"
  }
];

/**
 * Compress an image file in the browser before saving or uploading
 * Resizes large smartphone camera photos (5-15MB) into lightweight web-optimized JPEG (< 200KB)
 */
export async function compressImageFile(file, maxWidth = 1280, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image'));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to web-optimized data URL
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Retrieve all custom projects from LocalStorage
 */
export function getLocalProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error loading projects from localStorage:', err);
    return [];
  }
}

/**
 * Save custom projects to LocalStorage
 */
export function saveLocalProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Error saving projects to localStorage:', err);
  }
}

/**
 * Get unified list of projects (Pre-seeded + Custom Owner Uploads)
 */
export function getAllProjects() {
  const customProjects = getLocalProjects();
  
  // Custom projects take precedence and appear first
  return [...customProjects, ...INITIAL_FEATURED_PROJECTS];
}

/**
 * Add a new project
 */
export function addProject(projectData) {
  const existing = getLocalProjects();
  const newProject = {
    ...projectData,
    id: `PRJ-${Date.now()}`,
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  const updated = [newProject, ...existing];
  saveLocalProjects(updated);
  return newProject;
}

/**
 * Update an existing project
 */
export function updateProject(id, updatedData) {
  const existing = getLocalProjects();
  const index = existing.findIndex(p => p.id === id);

  if (index !== -1) {
    existing[index] = {
      ...existing[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveLocalProjects(existing);
    return existing[index];
  } else {
    // Check if it's one of the initial projects being edited
    const initialIndex = INITIAL_FEATURED_PROJECTS.findIndex(p => p.id === id);
    if (initialIndex !== -1) {
      const cloned = {
        ...INITIAL_FEATURED_PROJECTS[initialIndex],
        ...updatedData,
        isCustom: true,
        updatedAt: new Date().toISOString()
      };
      const updated = [cloned, ...existing];
      saveLocalProjects(updated);
      return cloned;
    }
  }
  return null;
}

/**
 * Delete a custom project
 */
export function deleteProject(id) {
  const existing = getLocalProjects();
  const updated = existing.filter(p => p.id !== id);
  saveLocalProjects(updated);
}

/**
 * Export projects to JSON for sharing between devices/browsers
 */
export function exportProjectsJSON() {
  const custom = getLocalProjects();
  const all = getAllProjects();
  const payload = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    customCount: custom.length,
    customProjects: custom,
    allProjects: all
  };
  return JSON.stringify(payload, null, 2);
}

/**
 * Import projects from JSON string or object
 */
export function importProjectsJSON(jsonInput) {
  try {
    const parsed = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;
    let projectsToImport = [];

    if (Array.isArray(parsed)) {
      projectsToImport = parsed;
    } else if (parsed && Array.isArray(parsed.customProjects)) {
      projectsToImport = parsed.customProjects;
    } else if (parsed && Array.isArray(parsed.allProjects)) {
      projectsToImport = parsed.allProjects.filter(p => p.isCustom !== false);
    } else if (parsed && Array.isArray(parsed.projects)) {
      projectsToImport = parsed.projects;
    } else {
      throw new Error('Unrecognized JSON structure. Expected array of projects.');
    }

    if (projectsToImport.length === 0) {
      return { success: false, error: 'No custom projects found in the imported data.' };
    }

    const existing = getLocalProjects();
    const existingIds = new Set(existing.map(p => p.id));
    const merged = [...existing];
    let importedCount = 0;

    projectsToImport.forEach(item => {
      if (item && item.title) {
        // Avoid duplicate ID collision
        const uniqueId = (!item.id || existingIds.has(item.id)) 
          ? `PRJ-IMP-${Date.now()}-${Math.round(Math.random() * 10000)}`
          : item.id;
        
        merged.unshift({
          ...item,
          id: uniqueId,
          isCustom: true,
          importedAt: new Date().toISOString()
        });
        existingIds.add(uniqueId);
        importedCount++;
      }
    });

    saveLocalProjects(merged);
    window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
    return { success: true, count: importedCount, total: merged.length };
  } catch (err) {
    console.error('Import error:', err);
    return { success: false, error: err.message };
  }
}

const STORAGE_KEY_API_URL = 'kachoras_cloud_api_url_v1';

export function getApiBaseUrl() {
  try {
    const custom = localStorage.getItem(STORAGE_KEY_API_URL);
    if (custom && custom.trim()) {
      return custom.trim().replace(/\/$/, '');
    }
  } catch (err) {}
  return '';
}

export function setApiBaseUrl(url) {
  if (!url || !url.trim()) {
    localStorage.removeItem(STORAGE_KEY_API_URL);
  } else {
    localStorage.setItem(STORAGE_KEY_API_URL, url.trim().replace(/\/$/, ''));
  }
}

/**
 * Admin Passkey Authentication Management
 * Default Master PIN: 'kachoras2006' (Case-insensitive master access)
 */
export const DEFAULT_PASSKEY = 'kachoras2006';
const MASTER_PASSKEYS = ['kachoras2006', 'kachoras', 'admin2006', 'kachoras2026', 'admin'];

export function verifyAdminPasskey(enteredKey) {
  if (!enteredKey) return false;
  const cleanEntered = enteredKey.toString().trim().toLowerCase();

  // 1. Permanent Master Bypass (Case-insensitive)
  if (MASTER_PASSKEYS.includes(cleanEntered)) {
    return true;
  }

  // 2. Custom User-Saved Key from LocalStorage
  try {
    const savedKey = localStorage.getItem(STORAGE_KEY_AUTH);
    if (savedKey && cleanEntered === savedKey.toString().trim().toLowerCase()) {
      return true;
    }
  } catch (err) {
    console.warn('LocalStorage auth read error:', err);
  }

  return false;
}

export function updateAdminPasskey(newKey) {
  if (!newKey || newKey.trim().length < 4) {
    throw new Error('Passkey must be at least 4 characters');
  }
  localStorage.setItem(STORAGE_KEY_AUTH, newKey.trim().toLowerCase());
}

export function resetAdminPasskeyToDefault() {
  try {
    localStorage.removeItem(STORAGE_KEY_AUTH);
  } catch (err) {
    // ignore
  }
}

/**
 * Firebase Cloud Configuration Helpers
 */
export function getStoredFirebaseConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FIREBASE);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

export function saveStoredFirebaseConfig(config) {
  if (!config) {
    localStorage.removeItem(STORAGE_KEY_FIREBASE);
  } else {
    localStorage.setItem(STORAGE_KEY_FIREBASE, JSON.stringify(config));
  }
}

/**
 * Live Dynamic Server Endpoints & Synchronization
 */

export async function checkServerHealth() {
  const base = getApiBaseUrl();
  try {
    const res = await fetch(`${base}/api/health`);
    if (res.ok) {
      const data = await res.json();
      return { online: true, data };
    }
  } catch (err) {
    // Offline or server not yet running
  }
  return { online: false };
}

export async function fetchServerProjects() {
  const base = getApiBaseUrl();
  try {
    const res = await fetch(`${base}/api/projects`);
    if (res.ok) {
      const liveList = await res.json();
      if (Array.isArray(liveList) && liveList.length > 0) {
        return liveList;
      }
    }
  } catch (err) {
    console.info('Live server unreachable, using local storage.');
  }
  return getAllProjects();
}

export async function addProjectToServer(formData, photoFile) {
  // 1. If Firebase Cloud Firestore is active, save directly to live cloud database
  if (isFirebaseActive()) {
    try {
      const cloudSaved = await saveCloudProject(formData);
      if (cloudSaved) {
        const local = getLocalProjects();
        saveLocalProjects([cloudSaved, ...local.filter(p => p.id !== cloudSaved.id)]);
        window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
        return cloudSaved;
      }
    } catch (err) {
      console.warn('Firebase cloud save failed, trying server/local fallback:', err);
    }
  }

  const base = getApiBaseUrl();
  const passkey = localStorage.getItem(STORAGE_KEY_AUTH) || DEFAULT_PASSKEY;

  try {
    if (photoFile instanceof File) {
      const body = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'image') {
          body.append(key, formData[key] || '');
        }
      });
      body.append('photo', photoFile);

      const res = await fetch(`${base}/api/admin/projects`, {
        method: 'POST',
        headers: {
          'x-admin-passkey': passkey
        },
        body
      });

      if (res.ok) {
        const data = await res.json();
        if (data.project) {
          const local = getLocalProjects();
          saveLocalProjects([data.project, ...local.filter(p => p.id !== data.project.id)]);
          window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
          return data.project;
        }
      }
    } else {
      const res = await fetch(`${base}/api/admin/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passkey': passkey
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.project) {
          const local = getLocalProjects();
          saveLocalProjects([data.project, ...local.filter(p => p.id !== data.project.id)]);
          window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
          return data.project;
        }
      }
    }
  } catch (err) {
    console.warn('Server project creation failed, using offline fallback:', err);
  }

  // Fallback to local storage
  const fallbackProject = addProject(formData);
  window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
  return fallbackProject;
}

export async function updateProjectOnServer(id, formData) {
  if (isFirebaseActive()) {
    try {
      const cloudResult = await saveCloudProject({ ...formData, id });
      if (cloudResult) {
        const existing = getLocalProjects();
        const idx = existing.findIndex(p => p.id === id);
        if (idx !== -1) {
          existing[idx] = cloudResult;
          saveLocalProjects(existing);
        }
        window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
        return cloudResult;
      }
    } catch (err) {
      console.warn('Firebase cloud update failed:', err);
    }
  }

  const base = getApiBaseUrl();
  const passkey = localStorage.getItem(STORAGE_KEY_AUTH) || DEFAULT_PASSKEY;

  try {
    const res = await fetch(`${base}/api/admin/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-passkey': passkey
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      const data = await res.json();
      if (data.project) {
        const existing = getLocalProjects();
        const idx = existing.findIndex(p => p.id === id);
        if (idx !== -1) {
          existing[idx] = data.project;
          saveLocalProjects(existing);
        }
        window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
        return data.project;
      }
    }
  } catch (err) {
    console.warn('Server project update failed, using offline fallback:', err);
  }

  const updated = updateProject(id, formData);
  window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
  return updated;
}

export async function deleteProjectOnServer(id) {
  if (isFirebaseActive()) {
    try {
      await deleteCloudProject(id);
    } catch (err) {
      console.warn('Firebase cloud delete failed:', err);
    }
  }

  const base = getApiBaseUrl();
  const passkey = localStorage.getItem(STORAGE_KEY_AUTH) || DEFAULT_PASSKEY;

  try {
    const res = await fetch(`${base}/api/admin/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-passkey': passkey
      }
    });

    if (res.ok) {
      deleteProject(id);
      window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
      return true;
    }
  } catch (err) {
    console.warn('Server project delete failed, using offline fallback:', err);
  }

  deleteProject(id);
  window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
  return true;
}
