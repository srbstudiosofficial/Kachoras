import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default Seed Data
const DEFAULT_PROJECTS = [
  {
    id: "P-101",
    title: "Luxury G+1 Contemporary Villa & Majlis Annex",
    category: "Building Contracting",
    status: "upcoming",
    timeline: "Commencing Q4 2026",
    year: "2026",
    location: "Nad Al Sheba 1, Dubai",
    plotNo: "6142891",
    client: "Private UAE National Client",
    consultant: "Croquis Engineering Consultancy",
    scope: "Turnkey luxury residential compound featuring G+1 main residence, standalone heritage majlis block, subterranean mechanical pump room, and structural boundary enclosure.",
    image: "./assets/villa.jpg",
    createdAt: new Date().toISOString()
  },
  {
    id: "P-102",
    title: "Thermal-Break Architectural Curtain Wall Fitout",
    category: "Aluminium & Glass Fabrication",
    status: "upcoming",
    timeline: "Tender Phase — Q4 2026",
    year: "2026",
    location: "Al Qusais Industrial Area 2, Dubai",
    plotNo: "2418902",
    client: "Commercial Development Partner",
    consultant: "Gulf Engineering Consultants",
    scope: "Fabrication and structural fixing of 1,200 sq.m of double-glazed thermal-break aluminium curtain walling engineered at Al Qusais B-25 facility.",
    image: "./assets/aluminium.jpg",
    createdAt: new Date().toISOString()
  },
  {
    id: "P-103",
    title: "Proposed Majlis Block & Structural Remodel",
    category: "Building Contracting",
    status: "ongoing",
    timeline: "Superstructure Pours & MEP Rough-ins",
    year: "2026",
    location: "Al Barsha South First, Dubai",
    plotNo: "6716536",
    client: "Maha Ebrahim Mohammad Hassan Alblooshi",
    consultant: "Al Manhal Engineering Consultants",
    scope: "Reinforced concrete ground structure, custom gypsum ceiling rough-ins, and high-efficiency ducted HVAC network.",
    image: "./assets/majlis.jpg",
    createdAt: new Date().toISOString()
  },
  {
    id: "P-104",
    title: "Municipal Veterinary Clinical Facilities & Civic Chambers",
    category: "Dubai Civic & Maintenance",
    status: "completed",
    timeline: "Handed Over & DM Certified",
    year: "2025",
    location: "Hatta Civic Sector, Dubai",
    plotNo: "8912682",
    client: "Dubai Municipality",
    consultant: "DM General Maintenance Department",
    scope: "Turnkey clinical fitout, medical plumbing, anti-bacterial sanitary wall finishes, and underground hydraulic valve control conduits.",
    image: "./assets/civic.jpg",
    createdAt: new Date().toISOString()
  },
  {
    id: "P-105",
    title: "G+1 Luxury Villa & Integrated Service Block",
    category: "Building Contracting",
    status: "completed",
    timeline: "Final Municipality Handover Complete",
    year: "2025",
    location: "Wadi Al Shabak, Dubai",
    plotNo: "4317233",
    client: "Mr. Khalifa Sebil Almas Khamis Salmin",
    consultant: "Croquis Engineering Consultancy",
    scope: "Complete civil structure, substructure soil compaction, DEWA electrical substation connection, and thermal aluminium fenestration.",
    image: "./assets/villa_arabic.jpg",
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_INQUIRIES = [
  {
    id: "LEAD-101",
    referenceId: "KCH-7842-RFQ",
    name: "Sultan Al Suwaidi",
    company: "Private Villa Owner",
    email: "sultan.suwaidi@example.ae",
    phone: "+971 50 442 8192",
    location: "Nad Al Sheba 2, Dubai",
    plotNo: "6149821",
    serviceType: "Building Contracting (G+1 Villa / Majlis)",
    budgetRange: "AED 2,500,000 – AED 4,000,000",
    message: "We have consultant approved architectural drawings for a 6,500 sq.ft G+1 contemporary villa and detached majlis block. Seeking contractor tender pricing and municipal mobilization schedule.",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: "new"
  }
];

// Initialize DB file if missing
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    projects: DEFAULT_PROJECTS,
    inquiries: DEFAULT_INQUIRIES
  }, null, 2));
}

// Helpers
function readDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file:', err);
    return { projects: DEFAULT_PROJECTS, inquiries: DEFAULT_INQUIRIES };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// Projects CRUD
export const db = {
  getProjects() {
    return readDB().projects || [];
  },

  addProject(data) {
    const database = readDB();
    const newProject = {
      ...data,
      id: `P-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    database.projects.unshift(newProject);
    writeDB(database);
    return newProject;
  },

  updateProject(id, data) {
    const database = readDB();
    const index = database.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      database.projects[index] = {
        ...database.projects[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      writeDB(database);
      return database.projects[index];
    }
    return null;
  },

  deleteProject(id) {
    const database = readDB();
    database.projects = database.projects.filter(p => p.id !== id);
    writeDB(database);
    return true;
  },

  // Inquiries CRUD
  getInquiries() {
    return readDB().inquiries || [];
  },

  addInquiry(data) {
    const database = readDB();
    const ref = `KCH-${Math.floor(1000 + Math.random() * 9000)}-RFQ`;
    const newLead = {
      id: `LEAD-${Date.now()}`,
      referenceId: ref,
      ...data,
      status: "new",
      timestamp: new Date().toISOString()
    };
    database.inquiries.unshift(newLead);
    writeDB(database);
    return newLead;
  },

  updateInquiryStatus(id, newStatus) {
    const database = readDB();
    const item = database.inquiries.find(i => i.id === id);
    if (item) {
      item.status = newStatus;
      writeDB(database);
      return item;
    }
    return null;
  },

  deleteInquiry(id) {
    const database = readDB();
    database.inquiries = database.inquiries.filter(i => i.id !== id);
    writeDB(database);
    return true;
  }
};
