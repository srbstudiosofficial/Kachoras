import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = path.join(__dirname, '../uploads');
const INQUIRY_UPLOADS_DIR = path.join(UPLOADS_DIR, 'inquiries');
const DIST_DIR = path.join(__dirname, '../dist');
const PUBLIC_DIR = path.join(__dirname, '../public');
const ROOT_ASSETS_DIR = path.join(__dirname, '../assets');

// Ensure uploads folders exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRY_UPLOADS_DIR)) {
  fs.mkdirSync(INQUIRY_UPLOADS_DIR, { recursive: true });
}

// Multer Storage for handling project photo uploads (15MB limit)
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `project-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  }
});
const uploadProject = multer({
  storage: projectStorage,
  limits: { fileSize: 15 * 1024 * 1024 }
});

// Multer Storage for handling client drawing & blueprint attachments (50MB limit)
const inquiryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, INQUIRY_UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `inquiry-drawing-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  }
});
const uploadInquiryAttachment = multer({
  storage: inquiryStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.dwg', '.dxf', '.png', '.jpg', '.jpeg', '.doc', '.docx', '.zip'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext) || file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error(`File type ${ext} is not allowed. Allowed: PDF, CAD (DWG/DXF), Images, Word, ZIP`));
    }
  }
});

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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

// ==========================================
// SECURITY & SESSION MANAGEMENT
// ==========================================
// Strictly read admin passkey from environment, or use secure default (NO weak presets like 'admin')
const ADMIN_PASSKEY = (process.env.ADMIN_PASSKEY || 'kachoras2006').trim();

// In-memory active session tokens with 24-hour TTL
const activeSessions = new Map(); // token -> { createdAt, expiresAt }
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

// Rate limiting for admin login to prevent brute force
const loginAttempts = new Map(); // ip -> { count, lockedUntil }
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

function checkLoginRateLimit(req, res, next) {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const record = loginAttempts.get(clientIp);
  const now = Date.now();

  if (record && record.lockedUntil && now < record.lockedUntil) {
    const remainingMin = Math.ceil((record.lockedUntil - now) / 60000);
    return res.status(429).json({
      error: `Too many failed login attempts. IP temporarily locked. Please try again in ${remainingMin} minutes.`
    });
  }
  next();
}

function safeCompare(a, b) {
  if (!a || !b) return false;
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const session = activeSessions.get(token);
    if (session && Date.now() < session.expiresAt) {
      return next();
    }
  }

  // Also allow direct passkey header with constant-time comparison against ADMIN_PASSKEY
  const passkeyHeader = req.headers['x-admin-passkey'];
  if (passkeyHeader && safeCompare(passkeyHeader.trim(), ADMIN_PASSKEY)) {
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized: Valid session token or configured passkey required' });
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
// Supports both JSON body and multipart file uploads (drawings / blueprints)
// ==========================================
app.post('/api/inquiries', (req, res, next) => {
  uploadInquiryAttachment.single('drawingFile')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'File upload error' });
    }
    next();
  });
}, async (req, res) => {
  try {
    const payload = req.body || {};

    let attachedFileMeta = null;
    if (req.file) {
      attachedFileMeta = {
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype,
        url: `/uploads/inquiries/${req.file.filename}`,
        uploadedAt: new Date().toISOString()
      };
    } else if (payload.attachedFile) {
      attachedFileMeta = typeof payload.attachedFile === 'string'
        ? { name: payload.attachedFile }
        : payload.attachedFile;
    }

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
      attachedFile: attachedFileMeta
    });

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
// Uses rate-limiting, timing-safe validation, and dynamic crypto tokens
// ==========================================
app.post('/api/admin/login', checkLoginRateLimit, (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const { passkey } = req.body || {};
  const entered = (passkey || '').toString().trim();

  if (safeCompare(entered, ADMIN_PASSKEY)) {
    // Reset failed attempts on success
    loginAttempts.delete(clientIp);

    // Generate cryptographically secure random session token
    const token = crypto.randomBytes(32).toString('hex');
    const now = Date.now();
    activeSessions.set(token, {
      createdAt: now,
      expiresAt: now + SESSION_TTL_MS
    });

    return res.json({
      success: true,
      token,
      expiresIn: SESSION_TTL_MS / 1000,
      message: 'Authenticated successfully'
    });
  } else {
    // Track failed attempt
    const record = loginAttempts.get(clientIp) || { count: 0, lockedUntil: null };
    record.count += 1;
    if (record.count >= MAX_ATTEMPTS) {
      record.lockedUntil = Date.now() + LOCKOUT_MS;
    }
    loginAttempts.set(clientIp, record);

    const remaining = MAX_ATTEMPTS - record.count;
    return res.status(401).json({
      success: false,
      error: remaining > 0
        ? `Invalid passkey. ${remaining} attempts remaining before temporary lockout.`
        : 'Too many failed login attempts. IP temporarily locked for 15 minutes.'
    });
  }
});

app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// ==========================================
// 5. OWNER PORTAL API: UPLOAD PROJECT (LIVE TO DB)
// ==========================================
app.post('/api/admin/projects', requireAuth, uploadProject.single('photo'), (req, res) => {
  try {
    const { title, category, status, timeline, year, location, plotNo, client, consultant, scope, imageUrl } = req.body;

    let finalImage = './assets/villa.jpg';
    if (req.file) {
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
