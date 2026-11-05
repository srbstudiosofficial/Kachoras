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
const STORAGE_KEY_PROJECTS = 'kachoras_custom_projects_v2';
const STORAGE_KEY_FIREBASE = 'kachoras_firebase_config_v1';
const STORAGE_KEY_AUTH = 'kachoras_admin_auth_v1';

// Default initial upcoming & featured projects
export const INITIAL_FEATURED_PROJECTS = [
  {
    "id": "REAL-CP-ALBANNAY",
    "title": "Construction of G+1 Villa + Service Block + Compound Wall",
    "client": "Mariam Hussain Redha Hassan Albannay",
    "consultant": "Al Manhal Engineering Consultants",
    "category": "Building Contracting",
    "type": "G+1 Classical Villa",
    "status": "completed",
    "location": "Al Warqaa Fourth, Dubai",
    "plotNo": "424-7036",
    "year": "2024",
    "timeline": "Handed Over & DM Certified",
    "scope": "Classical luxury G+1 villa with fluted columns, ornate perimeter wall, decorative wrought aluminium gate, and integrated service quarters.",
    "image": "./assets/real-projects/completed-construction-albannay-424-7036.jpg",
    "isCustom": false,
    "createdAt": "2024-11-01T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALSAFFAR",
    "title": "Residential Villa (Ground + 1) Floor & Compound Wall",
    "client": "Hussain Abdullateef Baqer AlSaffar",
    "consultant": "Al Majal Engineering Consultants",
    "category": "Building Contracting",
    "type": "G+1 Contemporary Villa",
    "status": "completed",
    "location": "Al Warqaa Second, Dubai",
    "plotNo": "423-19966",
    "year": "2024",
    "timeline": "Handed Over & DM Certified",
    "scope": "Contemporary minimalist residence with stepped cubic massing, high-performance acoustic glass, stone cladding, and motorized privacy gate.",
    "image": "./assets/real-projects/completed-construction-alsaffar-423-19966.jpg",
    "isCustom": false,
    "createdAt": "2024-11-15T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-SHEHAB",
    "title": "Construction of G+1 Villa + Service Block & Compound Wall",
    "client": "Abdul Raouf Siraj Shehab Ahmad Mohammad",
    "consultant": "Al Majal Engineering Consultants",
    "category": "Building Contracting",
    "type": "G+1 Luxury Villa",
    "status": "completed",
    "location": "Al Warqaa Third, Dubai",
    "plotNo": "423-1407",
    "year": "2024",
    "timeline": "Handed Over & DM Certified",
    "scope": "Grand G+1 villa featuring two-story curved central bay window, classical balustrade balconies, service block, and boundary wall.",
    "image": "./assets/real-projects/completed-construction-shehab-423-1407.jpg",
    "isCustom": false,
    "createdAt": "2024-12-01T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALSERAJ",
    "title": "Maintenance of Ground Villa + Service Block & Compound Wall",
    "client": "Ibrahim Tariq Abdulla Asad Alseraj",
    "consultant": "Dubai Municipality Approved",
    "category": "Dubai Civic & Maintenance",
    "type": "Villa Maintenance & Refurbishment",
    "status": "completed",
    "location": "Al Warqaa Second, Dubai",
    "plotNo": "422-0200",
    "year": "2024",
    "timeline": "Handed Over & Inspected",
    "scope": "Full exterior stone rehabilitation, portico steps, service block structural maintenance, and compound wall restoration.",
    "image": "./assets/real-projects/completed-maintenance-alseraj-422-0200.jpg",
    "isCustom": false,
    "createdAt": "2024-12-10T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ABDULRAHMAN",
    "title": "General Maintenance & Facade Restoration",
    "client": "Mohammad Amin Mohammad AbdulRahman",
    "consultant": "Dubai Municipality Approved",
    "category": "Dubai Civic & Maintenance",
    "type": "Villa Maintenance",
    "status": "completed",
    "location": "Al Warqaa Second, Dubai",
    "plotNo": "422-0322",
    "year": "2024",
    "timeline": "Handed Over & Inspected",
    "scope": "Comprehensive exterior plaster remediation, parapet waterproofing, perimeter wall painting, and structural maintenance.",
    "image": "./assets/real-projects/completed-maintenance-abdulrahman-422-0322.jpg",
    "isCustom": false,
    "createdAt": "2024-12-15T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-BASAEED",
    "title": "Ground Villa Maintenance & Compound Wall Works",
    "client": "Shaikha Salem Saeed Basaeed",
    "consultant": "Dubai Municipality Approved",
    "category": "Dubai Civic & Maintenance",
    "type": "Villa Maintenance",
    "status": "completed",
    "location": "Al Warqaa Second, Dubai",
    "plotNo": "422-1513",
    "year": "2024",
    "timeline": "Handed Over & Inspected",
    "scope": "Structural compound wall crack injection, boundary wall plaster restoration, weatherproof coating, and drainage channel servicing.",
    "image": "./assets/real-projects/completed-maintenance-basaeed-422-1513.jpg",
    "isCustom": false,
    "createdAt": "2024-12-18T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALMARZOOQUI",
    "title": "Villa Maintenance, Boundary Wall & External Flooring",
    "client": "Abdulla Mohammad Abdulla Al Marzooqui",
    "consultant": "Dubai Municipality Approved",
    "category": "Dubai Civic & Maintenance",
    "type": "Villa Maintenance & External Works",
    "status": "completed",
    "location": "Al Barsha Second, Dubai",
    "plotNo": "376-1918",
    "year": "2024",
    "timeline": "Handed Over & Inspected",
    "scope": "Boundary wall renovation, interlock paving, entrance gate realignment, and facade waterproofing.",
    "image": "./assets/real-projects/completed-maintenance-almarzooqui-376-1918.jpg",
    "isCustom": false,
    "createdAt": "2024-12-20T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALABDULLA",
    "title": "Majlis Hall & External Boundary Wall Works",
    "client": "Abdulla Ahmad Abdulla Alabdulla",
    "consultant": "Dubai Municipality Approved",
    "category": "Dubai Civic & Maintenance",
    "type": "Bespoke Royal Majlis Maintenance",
    "status": "completed",
    "location": "Al Barsha Second, Dubai",
    "plotNo": "376-1176",
    "year": "2024",
    "timeline": "Handed Over & Inspected",
    "scope": "Traditional private majlis structure maintenance, ornate external plastering, thermal window resealing, and decorative entrance enhancement.",
    "image": "./assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg",
    "isCustom": false,
    "createdAt": "2024-12-22T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-FLAG",
    "title": "Architectural Aluminium & Glazing for Private Villa",
    "client": "Private Villa Residence",
    "consultant": "Architectural Aluminium Division",
    "category": "Aluminium & Glass Works",
    "type": "Architectural Aluminium & Glazing",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Dubai Residential",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Custom extruded aluminium window systems, tinted acoustic double glazing, and precision boundary balustrade profiles fabricated at Al Qusais.",
    "image": "./assets/real-projects/completed-aluminum-flag-villa.jpg",
    "isCustom": false,
    "createdAt": "2024-12-23T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-CARPORT",
    "title": "Structural Aluminium Cantilever Carport & Canopy",
    "client": "Private Residence",
    "consultant": "Architectural Aluminium Division",
    "category": "Aluminium & Glass Works",
    "type": "Cantilever Shade Structure",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Dubai Residential",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Heavy-duty extruded aluminium cantilever carport canopy with integrated rainwater guttering, solar-resistant polycarbonate infill, and powder-coated finish.",
    "image": "./assets/real-projects/completed-aluminum-modern-carport.jpg",
    "isCustom": false,
    "createdAt": "2024-12-24T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-TRAVERTINE",
    "title": "Architectural Double-Glazed Curtain Wall & Entryway",
    "client": "Private Luxury Villa",
    "consultant": "Architectural Aluminium Division",
    "category": "Aluminium & Glass Works",
    "type": "Curtain Wall & Architectural Glazing",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Dubai Residential",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Precision-engineered corner curtain wall with concealed thermal-break profiles, laminated structural glass balustrades, and honed travertine stone integration.",
    "image": "./assets/real-projects/completed-aluminum-travertine-glazing.jpg",
    "isCustom": false,
    "createdAt": "2024-12-25T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-GEOMETRIC",
    "title": "Geometric Aluminium Facade & Panoramic Glazing",
    "client": "Private Luxury Villa",
    "consultant": "Architectural Aluminium Division",
    "category": "Aluminium & Glass Works",
    "type": "Architectural Aluminium & Glazing",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Dubai Residential",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Floor-to-ceiling panoramic glass facade with thermally-broken slimline aluminium framing and architectural geometric canopies.",
    "image": "./assets/real-projects/completed-aluminum-contemporary-geometric.jpg",
    "isCustom": false,
    "createdAt": "2024-12-26T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-CUBIC",
    "title": "Cubic Architectural Tinted Glazing System",
    "client": "Contemporary Residence",
    "consultant": "Architectural Aluminium Division",
    "category": "Aluminium & Glass Works",
    "type": "Architectural Aluminium & Glazing",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Dubai Residential",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "High-spec tinted solar-control double glazing and matte grey architectural aluminium mullions for multi-volume contemporary villa.",
    "image": "./assets/real-projects/completed-aluminum-cubic-tinted.jpg",
    "isCustom": false,
    "createdAt": "2024-12-27T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-LOUVERS",
    "title": "White Powder-Coated Aluminium Louver Screen & Canopy",
    "client": "Modern Luxury Villa",
    "consultant": "Architectural Aluminium Division",
    "category": "Aluminium & Glass Works",
    "type": "Aluminium Louvers & Screens",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Dubai Residential",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Aerodynamic powder-coated white aluminium louvers for privacy and solar shading, plus integrated structural balcony glass.",
    "image": "./assets/real-projects/completed-aluminum-white-louvers.jpg",
    "isCustom": false,
    "createdAt": "2024-12-28T00:00:00.000Z"
  },
  {
    "id": "REAL-CP-ALUM-GATE",
    "title": "Motorized Aluminium Sliding Privacy Gate & Pergola",
    "client": "Private Villa Residence",
    "consultant": "Architectural Aluminium Division",
    "category": "Aluminium & Glass Works",
    "type": "Aluminium Gates & Metalwork",
    "status": "completed",
    "location": "Dubai Residential Sector",
    "plotNo": "Dubai Residential",
    "year": "2024",
    "timeline": "Fabricated & Installed",
    "scope": "Custom CNC-cut horizontal louvered sliding aluminium gate with integrated automation system, plus matching overhead sunshade pergola.",
    "image": "./assets/real-projects/completed-aluminum-grand-sliding-gate.jpg",
    "isCustom": false,
    "createdAt": "2024-12-29T00:00:00.000Z"
  },
  {
    "id": "DM-2026-01",
    "title": "Municipal Veterinary Clinical Facilities & Civic Chambers",
    "client": "Dubai Municipality",
    "consultant": "DM General Maintenance Department",
    "category": "Dubai Civic & Maintenance",
    "type": "Civic Health Infrastructure",
    "status": "completed",
    "location": "Hatta Civic Sector, Dubai",
    "plotNo": "8912682",
    "year": "2025",
    "timeline": "Handed Over & DM Certified",
    "scope": "Turnkey clinical fitout, medical plumbing, anti-bacterial sanitary wall finishes, and underground hydraulic valve control conduits.",
    "image": "./assets/real-projects/p373-alsayegh-elevation.jpg",
    "isCustom": false,
    "createdAt": "2025-11-20T00:00:00.000Z"
  },
  {
    "id": "CP-2025-02",
    "title": "Commercial MEP & Hydraulic Pump Substation",
    "client": "Dubai Municipality / Civic Maintenance",
    "consultant": "Dubai Municipality General Maintenance Dept",
    "category": "MEP Works & Engineering",
    "type": "Hydraulic MEP",
    "status": "completed",
    "location": "Shooroq, Mirdif, Dubai",
    "plotNo": "Shooroq Irrigation Hub",
    "year": "2025",
    "timeline": "Testing, Commissioning & Inspection Passed",
    "scope": "Underground valve chambers, pressure balancing, automated irrigation pump sets, and industrial switchboards.",
    "image": "./assets/real-projects/p373-alsayegh-villa-2014.jpg",
    "isCustom": false,
    "createdAt": "2025-06-10T00:00:00.000Z"
  },
  {
    "id": "UP-2026-01",
    "title": "Turnkey G+1 Villa & Outbuilding",
    "client": "Private Client",
    "consultant": "Pending Tender Award",
    "category": "Building Contracting",
    "type": "Turnkey G+1 Villa",
    "status": "upcoming",
    "location": "Al Khawaneej First, Dubai",
    "plotNo": "Pending Allocation",
    "year": "2026",
    "timeline": "Tender Submission Closed \u2014 Under DM Technical Evaluation",
    "scope": "Full turnkey building contracting, reinforced concrete substructure & superstructure, MEP infrastructure, and luxury architectural envelope.",
    "image": "./assets/real-projects/p405-al-kabie-luxury-villa.jpg",
    "isCustom": false,
    "createdAt": "2026-04-01T00:00:00.000Z"
  },
  {
    "id": "UP-2026-02",
    "title": "Commercial MEP & Substation Upgrade",
    "client": "Commercial Property Developer",
    "consultant": "DEWA Approved Consultant",
    "category": "MEP Works & Engineering",
    "type": "Commercial MEP Upgrade",
    "status": "upcoming",
    "location": "Al Quoz Industrial Area 3, Dubai",
    "plotNo": "Plot 368-0412",
    "year": "2026",
    "timeline": "Contract Award Stage \u2014 Mobilization Q3 2026",
    "scope": "Complete electromechanical revamping, 11kV substation coordination, busbar trunking, and central firefighting booster system.",
    "image": "./assets/real-projects/p384-sharaf-townhouse-plot-3342119.jpg",
    "isCustom": false,
    "createdAt": "2026-04-05T00:00:00.000Z"
  },
  {
    "id": "OG-2026-01",
    "title": "Turnkey G+1 Classical Villa",
    "client": "Baqer Redha Hassan Albannay",
    "consultant": "Al Manhal Engineering Consultants",
    "category": "Building Contracting",
    "type": "G+1 Classical Villa",
    "status": "ongoing",
    "location": "Al Khawaneej First, Dubai",
    "plotNo": "416-2810",
    "year": "2026",
    "timeline": "Substructure & Ground Floor Slab",
    "scope": "Turnkey G+1 private residence featuring reinforced concrete framing, integrated MEP infrastructure, and classical facade moldings.",
    "image": "./assets/real-projects/construction-site-progress-01.jpg",
    "isCustom": false,
    "createdAt": "2026-03-01T00:00:00.000Z"
  },
  {
    "id": "OG-2026-02",
    "title": "Luxury G+1 Modern Villa & Service Block",
    "client": "Private Client",
    "consultant": "Al Majal Engineering Consultants",
    "category": "Building Contracting",
    "type": "G+1 Modern Villa",
    "status": "ongoing",
    "location": "Nad Al Sheba Third, Dubai",
    "plotNo": "618-1204",
    "year": "2026",
    "timeline": "First Floor Columns & Beams",
    "scope": "Modern architectural villa with double-height glazing, cantilevered balconies, separate service block, and boundary wall.",
    "image": "./assets/real-projects/construction-site-progress-02.jpg",
    "isCustom": false,
    "createdAt": "2026-03-05T00:00:00.000Z"
  },
  {
    "id": "OG-2026-03",
    "title": "Bespoke Royal Majlis Pavilion",
    "client": "Private Royal Client",
    "consultant": "Croquis Engineering Consultancy",
    "category": "Building Contracting",
    "type": "Bespoke Majlis Pavilion",
    "status": "ongoing",
    "location": "Umm Al Sheif, Dubai",
    "plotNo": "367-0958",
    "year": "2026",
    "timeline": "Frame Erection & Roof Slab",
    "scope": "Ground-up heritage majlis hall, decorative archways, ducted AC, and insulated glazing installation.",
    "image": "./assets/real-projects/construction-site-progress-03.jpg",
    "isCustom": false,
    "createdAt": "2026-03-10T00:00:00.000Z"
  },
  {
    "id": "OG-2026-04",
    "title": "G+1 Villa Structural Modifications",
    "client": "Talal Malalla Mohammad Jassem",
    "consultant": "Gulf Engineering Consultants",
    "category": "Building Contracting",
    "type": "G+1 Villa Remodel",
    "status": "ongoing",
    "location": "Al Barsha Second, Dubai",
    "plotNo": "376-0283",
    "year": "2026",
    "timeline": "Structural Strengthening & MEP Fitout",
    "scope": "Load-bearing beam modifications, steel reinforcement, MEP rerouting, and custom facade panels.",
    "image": "./assets/real-projects/construction-site-progress-04.jpg",
    "isCustom": false,
    "createdAt": "2026-03-12T00:00:00.000Z"
  },
  {
    "id": "OG-2026-05",
    "title": "G+1 Villa Maintenance & Upgrades",
    "client": "Moosa Ebrahim Mohammad Hassan Alblooshi",
    "consultant": "Croquis Engineering Consultancy",
    "category": "Dubai Civic & Maintenance",
    "type": "Villa Maintenance",
    "status": "ongoing",
    "location": "Al Barsha Second, Dubai",
    "plotNo": "376-0541",
    "year": "2026",
    "timeline": "Interior Fitout & Facade Painting",
    "scope": "Weatherproofing, facade repainting, AC duct sanitation, and boundary wall structural restoration.",
    "image": "./assets/real-projects/p426-al-zarooni-g1-villa.jpg",
    "isCustom": false,
    "createdAt": "2026-03-15T00:00:00.000Z"
  },
  {
    "id": "OG-2026-06",
    "title": "Villa Maintenance & Interior Retrofit",
    "client": "Jassim Abdul Rahman Mohammad Sharif Saleh Alawadhi",
    "consultant": "Teamwork Engineering Consultants",
    "category": "Dubai Civic & Maintenance",
    "type": "Interior Retrofit",
    "status": "ongoing",
    "location": "Nadd Al Hamar, Dubai",
    "plotNo": "416-4036",
    "year": "2026",
    "timeline": "Cabinetry & Gypsum Ceiling Works",
    "scope": "Complete kitchen cabinetry overhaul, decorative gypsum false ceiling installation, and LED lighting troughs.",
    "image": "./assets/real-projects/p367-moosawi-g1-villa.jpg",
    "isCustom": false,
    "createdAt": "2026-03-18T00:00:00.000Z"
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
  const customProjects = getLocalProjects().filter(p => !p.id || !p.id.startsWith('REAL-P'));
  
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
