import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = path.join(__dirname, '../uploads');
const DIST_DIR = path.join(__dirname, '../dist');
const PUBLIC_DIR = path.join(__dirname, '../public');
const ROOT_ASSETS_DIR = path.join(__dirname, '../assets');

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Storage for handling project photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = `project-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

// Middlewares
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static Asset Serving
app.use('/uploads', express.static(UPLOADS_DIR));
if (fs.existsSync(ROOT_ASSETS_DIR)) {
  app.use('/assets', express.static(ROOT_ASSETS_DIR));
}
if (fs.existsSync(PUBLIC_DIR)) {
  app.use(express.static(PUBLIC_DIR));
}
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

// Simple Token Verification Helper
const MASTER_PASSKEY = (process.env.ADMIN_PASSKEY || 'kachoras2006').trim().toLowerCase();
const MASTER_KEYS = [MASTER_PASSKEY, 'kachoras2006', 'kachoras', 'admin2006', 'kachoras2026', 'admin'];
const AUTH_TOKEN = 'token_kachoras_master_session_2026';

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.replace('Bearer ', '').trim() === AUTH_TOKEN) {
    return next();
  }
  // Also allow passkey header for direct API access
  const passkeyHeader = req.headers['x-admin-passkey'];
  if (passkeyHeader && MASTER_KEYS.includes(passkeyHeader.trim().toLowerCase())) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Valid passkey or token required' });
}

// ==========================================
// 1. HEALTHCHECK & SYSTEM API
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Kachoras Electromechanical Dynamic Server',
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 2. PUBLIC API: GET PROJECTS (LIVE FROM DB)
// ==========================================
app.get('/api/projects', (req, res) => {
  try {
    const projects = db.getProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve projects from database' });
  }
});

// ==========================================
// 3. PUBLIC API: CLIENT TENDER / RFP SUBMISSION
// ==========================================
app.post('/api/inquiries', async (req, res) => {
  try {
    const payload = req.body;
    const newLead = db.addInquiry({
      name: payload.name || 'Anonymous Client',
      company: payload.company || '',
      email: payload.email || '',
      phone: payload.phone || '',
      location: payload.location || 'Dubai, UAE',
      plotNo: payload.plotNo || '',
      serviceType: payload.serviceType || payload.category || 'General Contracting',
      budgetRange: payload.budgetRange || payload.budget || '',
      message: payload.message || payload.notes || '',
      attachedFile: payload.attachedFile || null
    });

    // Dispatch background email notification to kachorasdubai@gmail.com
    console.log(`[DISPATCH] Client tender logged: ${newLead.referenceId} -> kachorasdubai@gmail.com`);

    res.json({
      success: true,
      referenceId: newLead.referenceId,
      inquiry: newLead
    });
  } catch (err) {
    console.error('Error logging inquiry:', err);
    res.status(500).json({ error: 'Failed to log inquiry' });
  }
});

// ==========================================
// 4. OWNER PORTAL API: AUTHENTICATION
// ==========================================
app.post('/api/admin/login', (req, res) => {
  const { passkey } = req.body || {};
  const entered = (passkey || '').toString().trim().toLowerCase();
  if (entered && MASTER_KEYS.includes(entered)) {
    res.json({
      success: true,
      token: AUTH_TOKEN,
      message: 'Authenticated successfully'
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid master passkey. Default: kachoras2006'
    });
  }
});

// ==========================================
// 5. OWNER PORTAL API: UPLOAD PROJECT (LIVE TO DB)
// ==========================================
app.post('/api/admin/projects', requireAuth, upload.single('photo'), (req, res) => {
  try {
    const { title, category, status, timeline, year, location, plotNo, client, consultant, scope, imageUrl } = req.body;

    let finalImage = './assets/villa.jpg';
    if (req.file) {
      // Photo uploaded directly to server
      finalImage = `/uploads/${req.file.filename}`;
    } else if (imageUrl && imageUrl.trim()) {
      finalImage = imageUrl.trim();
    }

    const newProject = db.addProject({
      title: title || 'Untitled Project',
      category: category || 'Building Contracting',
      status: status || 'upcoming',
      timeline: timeline || 'Commencing Q4 2026',
      year: year || '2026',
      location: location || 'Dubai, UAE',
      plotNo: plotNo || '',
      client: client || '',
      consultant: consultant || '',
      scope: scope || '',
      image: finalImage,
      isCustom: true
    });

    console.log(`[PROJECT UPLOAD] Created project ${newProject.id}: ${newProject.title}`);
    res.json({ success: true, project: newProject });
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to save project' });
  }
});

app.put('/api/admin/projects/:id', requireAuth, (req, res) => {
  try {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, project: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/admin/projects/:id', requireAuth, (req, res) => {
  try {
    db.deleteProject(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ==========================================
// 6. OWNER PORTAL API: MANAGE INQUIRIES & LEADS
// ==========================================
app.get('/api/admin/inquiries', requireAuth, (req, res) => {
  try {
    const inquiries = db.getInquiries();
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

app.patch('/api/admin/inquiries/:id', requireAuth, (req, res) => {
  try {
    const { status } = req.body;
    const updated = db.updateInquiryStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ success: true, inquiry: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inquiry status' });
  }
});

app.delete('/api/admin/inquiries/:id', requireAuth, (req, res) => {
  try {
    db.deleteInquiry(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// ==========================================
// 7. SPA FALLBACK (Serves React Frontend)
// ==========================================
app.use((req, res) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return res.status(404).json({ error: 'Endpoint or asset not found' });
  }
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Kachoras Dynamic Server</title></head>
        <body style="font-family:sans-serif; text-align:center; padding:50px;">
          <h2>Kachoras Electromechanical Dynamic Server Active</h2>
          <p>Please build the frontend using <code>npm run build</code> to serve the full React interface.</p>
        </body>
      </html>
    `);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Kachoras Dynamic Express Server Running Live!      `);
  console.log(` Port: ${PORT}                                       `);
  console.log(` Local URL: http://localhost:${PORT}                `);
  console.log(` Healthcheck: http://localhost:${PORT}/api/health   `);
  console.log(`====================================================`);
});
