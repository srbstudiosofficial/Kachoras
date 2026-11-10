import { 
  COMPLETED_PROJECTS_VILLAS, 
  DUBAI_MUNICIPALITY_PROJECTS, 
  ONGOING_PROJECTS 
} from '../data/mockData';
import {
  isFirebaseActive,
  saveCloudProject,
  deleteCloudProject,
  subscribeCloudProjects,
  DEFAULT_FIREBASE_CONFIG,
  uploadProjectPhotoToStorage
} from './firebaseSync';

// LocalStorage Keys
const STORAGE_KEY_PROJECTS = 'kachoras_custom_projects_v6';
const STORAGE_KEY_FIREBASE = 'kachoras_firebase_config_v1';
const STORAGE_KEY_AUTH = 'kachoras_admin_auth_v1';

// Default initial upcoming & featured projects
export const INITIAL_FEATURED_PROJECTS = [
  {
    "id": "REAL-CP-ALBANNAY",
    "title": "G+1 Villa and Service Block",
    "client": "Mariam Hussain Redha Hassan Albannay",
    "consultant": "Al Manhal Engineering Consultants",
    "category": "Luxury G+1 Villa",
    "categoryFilter": "villas",
    "type": "Luxury G+1 Villa",
    "status": "completed",
    "location": "Al Warqaa Fourth, Dubai",
    "plotNo": "424-7036",
    "year": "2024",
    "timeline": "",
    "scope": "Turnkey luxury private residence featuring fluted classical columns, perimeter compound wall, ornate decorative gates, and integrated MEP infrastructure.",
    "image": "./assets/real-projects/completed-construction-albannay-424-7036.jpg",
    "isCustom": false,
    "createdAt": "2024-11-01T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALSAFFAR",
    "title": "G+1 Villa and Service Block",
    "client": "Hussain Abdullateef Baqer AlSaffar",
    "consultant": "Al Majal Engineering Consultants",
    "category": "Luxury G+1 Villa",
    "categoryFilter": "villas",
    "type": "Luxury G+1 Villa",
    "status": "completed",
    "location": "Al Warqaa Second, Dubai",
    "plotNo": "423-19966",
    "year": "2024",
    "timeline": "",
    "scope": "Stepped cubic contemporary villa featuring acoustic thermal glazing, stone-cladded boundary walls, and automated motorized privacy gates.",
    "image": "./assets/real-projects/completed-construction-alsaffar-423-19966.jpg",
    "isCustom": false,
    "createdAt": "2024-11-15T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-SHEHAB",
    "title": "Residential G+1 Villa",
    "client": "Abdul Raouf Siraj Shehab Ahmad Mohammad",
    "consultant": "Al Majal Engineering Consultants",
    "category": "Luxury G+1 Villa",
    "categoryFilter": "villas",
    "type": "Residential G+1 Villa",
    "status": "completed",
    "location": "Al Warqaa Third, Dubai",
    "plotNo": "423-1407",
    "year": "2024",
    "timeline": "",
    "scope": "Two-story curved central bay window villa featuring balustrade balconies, dedicated service block, and integrated electromechanical networks.",
    "image": "./assets/real-projects/completed-construction-shehab-423-1407.jpg",
    "isCustom": false,
    "createdAt": "2024-11-20T00:00:00.000Z"
  },
  {
    "id": "P-VILLA-KABIE",
    "title": "Royal G+1 Villa",
    "client": "Suad Salman Jabour Mahmood Al Kabie",
    "consultant": "Gulf Engineering Consultants",
    "category": "Luxury G+1 Villa",
    "categoryFilter": "villas",
    "type": "Royal G+1 Villa",
    "status": "completed",
    "location": "Al Khawaneej First, Dubai",
    "plotNo": "Registered Plot",
    "year": "2025",
    "timeline": "",
    "scope": "Architectural turnkey residence featuring high-specification thermal envelope, grand columns, landscaped perimeter, and central ducted climate control.",
    "image": "./assets/real-projects/p405-al-kabie-luxury-villa.jpg",
    "isCustom": false,
    "createdAt": "2025-01-10T00:00:00.000Z"
  },
  {
    "id": "P-VILLA-ZAROONI",
    "title": "Modern G+1 Villa",
    "client": "Fareed Ali Hassan AlZarooni",
    "consultant": "Gulf Engineering Consultants",
    "category": "Luxury G+1 Villa",
    "categoryFilter": "villas",
    "type": "Luxury G+1 Villa",
    "status": "completed",
    "location": "Nad Al Sheba Third, Dubai",
    "plotNo": "Registered Plot",
    "year": "2025",
    "timeline": "",
    "scope": "Double-height panoramic glazing, cantilevered balconies, integrated staff quarters, and high-capacity electrical switchgear.",
    "image": "./assets/real-projects/p426-al-zarooni-g1-villa.jpg",
    "isCustom": false,
    "createdAt": "2025-02-15T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALABDULLA",
    "title": "Arabian Majlis",
    "client": "Abdulla Mohammad Alabdulla",
    "consultant": "",
    "category": "Majlis & Traditional",
    "categoryFilter": "majlis",
    "type": "Arabian Majlis",
    "status": "completed",
    "location": "Al Barsha Second, Dubai",
    "plotNo": "376-1176",
    "year": "2026",
    "timeline": "",
    "scope": "Classical heritage royal majlis hall featuring decorative gypsum ceilings, perimeter boundary wall, and integrated plumbing & HVAC infrastructure.",
    "image": "./assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg",
    "isCustom": false,
    "createdAt": "2024-11-22T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALSERAJ",
    "title": "Ground Villa & Service Block Maintenance",
    "client": "Ibrahim Tariq Abdulla Asad Seraj",
    "consultant": "",
    "category": "Maintenance of Villa",
    "categoryFilter": "civic_mep",
    "type": "Maintenance of Villa",
    "status": "completed",
    "location": "Al Warqaa Second, Dubai",
    "plotNo": "422-0200",
    "year": "2026",
    "timeline": "",
    "scope": "Turnkey villa maintenance, service pavilion enhancement, facade waterproofing, and MEP distribution upgrade.",
    "image": "./assets/real-projects/completed-maintenance-alseraj-422-0200.jpg",
    "isCustom": false,
    "createdAt": "2024-11-25T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ABDULRAHMAN",
    "title": "Ground Villa and Swimming Pool",
    "client": "Mohammad Amin AbdulRahman",
    "consultant": "",
    "category": "Ground Villa and Swimming Pool",
    "categoryFilter": "majlis",
    "type": "Ground Villa and Swimming Pool",
    "status": "completed",
    "location": "Al Warqaa Second, Dubai",
    "plotNo": "422-0322",
    "year": "2026",
    "timeline": "",
    "scope": "Restoration of structural compound wall, heritage exterior plastering, custom decorative cornice moldings, swimming pool and drainage overhaul.",
    "image": "./assets/real-projects/completed-maintenance-abdulrahman-422-0322.jpg",
    "isCustom": false,
    "createdAt": "2024-11-28T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-FLAG",
    "title": "Curtain Wall & Glass Facade Installation",
    "client": "",
    "consultant": "",
    "category": "Aluminium & Glazing",
    "categoryFilter": "aluminium",
    "type": "Curtain Wall & Glass Facade",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Residential Sector",
    "year": "2026",
    "timeline": "Fabricated & Installed",
    "scope": "Fabrication and installation of thermal-break structural aluminium curtain walling, argon-filled double-glazed insulated units, and entrance canopy.",
    "image": "./assets/real-projects/completed-aluminum-flag-villa.jpg",
    "isCustom": false,
    "createdAt": "2024-12-15T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-CARPORT",
    "title": "Cantilever Aluminium Carport Canopy",
    "client": "",
    "consultant": "",
    "category": "Aluminium & Glazing",
    "categoryFilter": "aluminium",
    "type": "Curtain Wall & Glass Facade",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Residential Sector",
    "year": "2025",
    "timeline": "Fabricated & Installed",
    "scope": "Engineered high-tensile cantilevered aluminium shading structure with integrated drainage troughs and high-durability powder coating.",
    "image": "./assets/real-projects/completed-aluminum-modern-carport.jpg",
    "isCustom": false,
    "createdAt": "2024-12-18T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-TRAVERTINE",
    "title": "Double-Glazed Curtain Wall & Travertine Glazing",
    "client": "",
    "consultant": "",
    "category": "Aluminium & Glazing",
    "categoryFilter": "aluminium",
    "type": "Curtain Wall & Glass Facade",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Residential Sector",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Full-height architectural curtain wall with flush travertine stone interfaces and low-E acoustic insulation.",
    "image": "./assets/real-projects/completed-aluminum-travertine-glazing.jpg",
    "isCustom": false,
    "createdAt": "2024-12-20T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-GEOMETRIC",
    "title": "Curtain Wall, Glass Facade and Pergola Installation",
    "client": "",
    "consultant": "",
    "category": "Aluminium & Glazing",
    "categoryFilter": "aluminium",
    "type": "Curtain Wall & Pergola",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Residential Sector",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Custom geometric aluminium profiles with frameless panoramic corner glass joints, pergolas, and concealed motorized hardware.",
    "image": "./assets/real-projects/completed-aluminum-contemporary-geometric.jpg",
    "isCustom": false,
    "createdAt": "2024-12-22T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-CUBIC",
    "title": "Modern Tinted Glass Facade & Skylight Installation",
    "client": "",
    "consultant": "",
    "category": "Aluminium & Glazing",
    "categoryFilter": "aluminium",
    "type": "Tinted Facade & Skylight",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Residential Sector",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Contemporary cubic residence architectural tinted solar glazing with high UV rejection, glass skylights, and custom framed entrance doors.",
    "image": "./assets/real-projects/completed-aluminum-cubic-tinted.jpg",
    "isCustom": false,
    "createdAt": "2024-12-24T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-LOUVER",
    "title": "Curtain Wall & Powder-Coated Aluminium Louver Façade Installation",
    "client": "",
    "consultant": "",
    "category": "Aluminium & Glazing",
    "categoryFilter": "aluminium",
    "type": "Curtain Wall & Louver Facade",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Residential Sector",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Precision louvered screening wall engineered for solar shading and visual privacy with integrated perimeter drainage channels.",
    "image": "./assets/real-projects/completed-aluminum-white-louvers.jpg",
    "isCustom": false,
    "createdAt": "2024-12-26T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-GATE",
    "title": "Motorized Aluminium Sliding Vehicle Gates and Pedestrian Gates",
    "client": "",
    "consultant": "",
    "category": "Aluminium & Glazing",
    "categoryFilter": "aluminium",
    "type": "Motorized Gates",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Residential Sector",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Motorized sliding privacy gate and pedestrian access gate fabricated with architectural bronze finish and heavy-duty Italian automation.",
    "image": "./assets/real-projects/completed-aluminum-grand-sliding-gate.jpg",
    "isCustom": false,
    "createdAt": "2024-12-28T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-BASAEED",
    "title": "Ground Villa Maintenance & Compound Wall",
    "client": "Shaikha Salem Saeed Basaeed",
    "consultant": "In-House Engineering",
    "category": "Maintenance and MEP Works",
    "categoryFilter": "civic_mep",
    "type": "Maintenance and MEP Works",
    "status": "completed",
    "location": "Al Warqaa Second, Dubai",
    "plotNo": "422-1513",
    "year": "2024",
    "timeline": "",
    "scope": "Full civil maintenance, reinforced compound wall construction, boundary finishing, and integrated electromechanical overhaul.",
    "image": "./assets/real-projects/completed-maintenance-basaeed-422-1513.jpg",
    "isCustom": false,
    "createdAt": "2024-11-30T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-MARZOOQUI",
    "title": "Villa Maintenance & External Flooring",
    "client": "Hassan Abdulla Almarzooqui",
    "consultant": "In-House Engineering",
    "category": "Maintenance and MEP Works",
    "categoryFilter": "civic_mep",
    "type": "Maintenance and MEP Works",
    "status": "completed",
    "location": "Al Barsha Second, Dubai",
    "plotNo": "376-1918",
    "year": "2024",
    "timeline": "",
    "scope": "Villa exterior refurbishment, heavy-duty interlock and porcelain paving, external lighting circuitry, and stormwater grading.",
    "image": "./assets/real-projects/completed-maintenance-almarzooqui-376-1918.jpg",
    "isCustom": false,
    "createdAt": "2024-12-05T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-DM-HATTA-VET",
    "title": "Hatta Veterinary Clinic",
    "client": "Dubai Municipality",
    "consultant": "DM General Maintenance Dept",
    "category": "Civil & MEP Works",
    "categoryFilter": "civic_mep",
    "type": "Civil & MEP Works",
    "status": "completed",
    "location": "Hatta Civic Sector, Dubai",
    "plotNo": "8912682",
    "year": "2025",
    "timeline": "DM Handover & BCC Issued",
    "scope": "Maintenance, modification, and clinical facility construction for Dubai Municipality Veterinary Services in Hatta.",
    "image": "./assets/real-projects/p373-alsayegh-elevation.jpg",
    "isCustom": false,
    "createdAt": "2024-10-15T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-DM-SHOOROQ",
    "title": "Construction of Irrigation chambers and Related MEP Works",
    "client": "Dubai Municipality / Civic Maintenance",
    "consultant": "DM General Maintenance Dept",
    "category": "Civil & MEP Works",
    "categoryFilter": "civic_mep",
    "type": "Civil & MEP Works",
    "status": "completed",
    "location": "Shooroq Irrigation Hub, Mirdif, Dubai",
    "plotNo": "Shooroq Irrigation Hub",
    "year": "2024",
    "timeline": "DM Handover & Commissioned",
    "scope": "Civil construction of heavy reinforced underground valve chambers, hydraulic pump connections, and automated irrigation conduits.",
    "image": "./assets/real-projects/construction-site-progress-03.jpg",
    "isCustom": false,
    "createdAt": "2024-10-25T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-QUOZ-TOWNHOUSE",
    "title": "Commercial Townhouse & Substation Upgrade Plot 368-0412, Al Quoz 3",
    "client": "Commercial Property Developer",
    "consultant": "DEWA Approved Consultant",
    "category": "Maintenance and MEP Works",
    "categoryFilter": "civic_mep",
    "type": "Maintenance and MEP Works",
    "status": "completed",
    "location": "Al Quoz 3, Dubai",
    "plotNo": "368-0412",
    "year": "2024",
    "timeline": "Handed Over & Commissioned",
    "scope": "Commercial property maintenance, structural modifications, and electrical substation upgrade in compliance with DEWA regulations.",
    "image": "./assets/real-projects/p382-abuali-4-townhouse.jpg",
    "isCustom": false,
    "createdAt": "2024-10-30T00:00:00.000Z"
  }
];

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
  const custom = getLocalProjects();
  if (!custom || !Array.isArray(custom) || custom.length === 0) {
    return INITIAL_FEATURED_PROJECTS;
  }
  // Projects in custom (new or edited) take precedence over pre-seeded initial list
  const customIdMap = new Map(custom.map(p => [p.id, p]));
  const remainingInitial = INITIAL_FEATURED_PROJECTS.filter(p => !customIdMap.has(p.id));
  return [...custom, ...remainingInitial];
}

/**
 * Get project by ID, plot number, or slug
 */
export function getProjectById(id) {
  if (!id) return null;
  const targetId = String(id).toLowerCase().trim();
  const list = getAllProjects();
  return list.find(p => 
    p.id.toLowerCase() === targetId || 
    (p.plotNo && p.plotNo.toLowerCase() === targetId) ||
    p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(targetId)
  ) || null;
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
 * Master Passkey: 'kachoras2006' or custom owner-configured passkey
 * (Eliminated weak fallback presets like 'admin' or 'kachoras')
 */
export const DEFAULT_PASSKEY = 'kachoras2006';

export function verifyAdminPasskey(enteredKey) {
  if (!enteredKey) return false;
  const cleanEntered = enteredKey.toString().trim().toLowerCase();

  // 1. Custom User-Saved Key from LocalStorage (if configured by owner)
  try {
    const savedKey = localStorage.getItem(STORAGE_KEY_AUTH);
    if (savedKey && cleanEntered === savedKey.toString().trim().toLowerCase()) {
      return true;
    }
  } catch (err) {
    console.warn('LocalStorage auth read error:', err);
  }

  // 2. Default Master Passkey (Strict match, case-insensitive)
  if (cleanEntered === DEFAULT_PASSKEY.toLowerCase()) {
    return true;
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
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.apiKey) return parsed;
    }
  } catch (err) {}
  return DEFAULT_FIREBASE_CONFIG;
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
      let finalData = { ...formData };
      if (photoFile instanceof File) {
        const storageUrl = await uploadProjectPhotoToStorage(photoFile);
        if (storageUrl) {
          finalData.image = storageUrl;
        }
      }
      const cloudSaved = await saveCloudProject(finalData);
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

  // Fallback to local storage (Explicitly marked as local_only)
  const fallbackProject = addProject({ ...formData, syncStatus: 'local_only' });
  window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
  return { ...fallbackProject, syncStatus: 'local_only', isOffline: true };
}

export async function updateProjectOnServer(id, formData, photoFile) {
  if (isFirebaseActive()) {
    try {
      let finalData = { ...formData, id };
      if (photoFile instanceof File) {
        const storageUrl = await uploadProjectPhotoToStorage(photoFile);
        if (storageUrl) {
          finalData.image = storageUrl;
        }
      }
      const cloudResult = await saveCloudProject(finalData);
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

  const updated = updateProject(id, { ...formData, syncStatus: 'local_only' });
  window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
  return { ...updated, syncStatus: 'local_only', isOffline: true };
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
