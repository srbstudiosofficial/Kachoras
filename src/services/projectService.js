import { 
  COMPLETED_PROJECTS_VILLAS, 
  DUBAI_MUNICIPALITY_PROJECTS, 
  ONGOING_PROJECTS 
} from '../data/mockData';

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
 * Admin Passkey Authentication Management
 * Default Master PIN: 'kachoras2006'
 */
const DEFAULT_PASSKEY = 'kachoras2006';

export function verifyAdminPasskey(enteredKey) {
  const savedKey = localStorage.getItem(STORAGE_KEY_AUTH) || DEFAULT_PASSKEY;
  return enteredKey.trim() === savedKey.trim();
}

export function updateAdminPasskey(newKey) {
  if (!newKey || newKey.length < 4) {
    throw new Error('Passkey must be at least 4 characters');
  }
  localStorage.setItem(STORAGE_KEY_AUTH, newKey.trim());
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
