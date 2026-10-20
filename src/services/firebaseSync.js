import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot 
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

const STORAGE_KEY_FIREBASE = 'kachoras_firebase_config_v1';

/**
 * Official Default Firebase Configuration for Kachoras Electromechanical Contracting LLC
 * Project ID: kachoras-73183
 */
export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDOY_l4U454mruR9oOUaP9Aw5CjBac6SXw",
  authDomain: "kachoras-73183.firebaseapp.com",
  projectId: "kachoras-73183",
  storageBucket: "kachoras-73183.firebasestorage.app",
  messagingSenderId: "868033179924",
  appId: "1:868033179924:web:653c0aea01cb66fa319201"
};

let firestoreInstance = null;
let storageInstance = null;
let unsubscribeProjects = null;
let unsubscribeInquiries = null;

/**
 * Get active Firebase config (stored override or production default)
 */
export function getFirebaseConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FIREBASE);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading Firebase config from storage:', err);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

/**
 * Initialize or retrieve Firebase Firestore instance
 */
export function getFirebaseDb() {
  if (firestoreInstance) return firestoreInstance;

  const config = getFirebaseConfig();
  if (!config || !config.apiKey || !config.projectId) {
    return null;
  }

  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(config);
    firestoreInstance = getFirestore(app);
    return firestoreInstance;
  } catch (err) {
    console.error('Firebase initialization error:', err);
    return null;
  }
}

/**
 * Initialize or retrieve Firebase Storage instance
 */
export function getFirebaseStorage() {
  if (storageInstance) return storageInstance;

  const config = getFirebaseConfig();
  if (!config || !config.storageBucket) {
    return null;
  }

  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(config);
    storageInstance = getStorage(app);
    return storageInstance;
  } catch (err) {
    console.error('Firebase storage initialization error:', err);
    return null;
  }
}

/**
 * Check if Firebase cloud sync is currently configured and active
 */
export function isFirebaseActive() {
  return !!getFirebaseDb();
}

/**
 * Upload a project photo to Firebase Storage
 * Returns public download URL on success, or null on fallback
 */
export async function uploadProjectPhotoToStorage(file) {
  if (!file) return null;
  const storage = getFirebaseStorage();
  if (!storage) return null;

  try {
    const safeName = (file.name || 'photo.jpg').replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `projects/${Date.now()}_${safeName}`;
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type || 'image/jpeg'
    });
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (err) {
    console.warn('Firebase Storage upload failed (falling back to compressed data URL):', err);
    return null;
  }
}

/**
 * Auto-migrate any custom projects previously saved in browser localStorage to Cloud Firestore
 * Ensures projects created by the client on their phone/laptop are immediately pushed to the cloud.
 */
export async function syncLocalProjectsToCloud() {
  const db = getFirebaseDb();
  if (!db) return;

  try {
    const raw = localStorage.getItem('kachoras_custom_projects_v1');
    if (!raw) return;
    const localProjects = JSON.parse(raw);
    if (!Array.isArray(localProjects) || localProjects.length === 0) return;

    // Check existing documents in Firestore
    const projectsCol = collection(db, 'projects');
    const snapshot = await getDocs(projectsCol);
    const cloudIds = new Set();
    snapshot.forEach(docSnap => cloudIds.add(docSnap.id));

    // Upload any custom local project that is not yet in Firestore
    for (const proj of localProjects) {
      if (proj && proj.id && !cloudIds.has(proj.id) && proj.isCustom !== false) {
        console.log('Syncing local project to Firestore cloud:', proj.title);
        await saveCloudProject(proj);
      }
    }
  } catch (err) {
    console.warn('Auto-sync local to cloud notice:', err);
  }
}

/**
 * Real-time listener for Projects collection in Cloud Firestore
 * Fires whenever ANY device in the world adds, edits, or deletes a project.
 */
export function subscribeCloudProjects(onUpdate) {
  const db = getFirebaseDb();
  if (!db) return null;

  if (unsubscribeProjects) {
    unsubscribeProjects();
  }

  try {
    const projectsCol = collection(db, 'projects');
    unsubscribeProjects = onSnapshot(projectsCol, (snapshot) => {
      const liveProjects = [];
      snapshot.forEach(docSnap => {
        liveProjects.push({ id: docSnap.id, ...docSnap.data() });
      });

      // Sort newest first
      liveProjects.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

      // Merge with any un-synced local projects so no local data is ever lost
      try {
        const raw = localStorage.getItem('kachoras_custom_projects_v1');
        if (raw) {
          const local = JSON.parse(raw);
          if (Array.isArray(local)) {
            const cloudIds = new Set(liveProjects.map(p => p.id));
            const unsynced = local.filter(p => !cloudIds.has(p.id) && p.isCustom !== false);
            if (unsynced.length > 0) {
              unsynced.forEach(p => {
                saveCloudProject(p).catch(console.warn);
              });
              liveProjects.push(...unsynced);
              liveProjects.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            }
          }
        }
      } catch (e) {}

      if (onUpdate) {
        onUpdate(liveProjects);
      }
    }, (error) => {
      console.warn('Firestore projects real-time sync warning:', error);
    });

    return unsubscribeProjects;
  } catch (err) {
    console.error('Error attaching Firestore projects listener:', err);
    return null;
  }
}

/**
 * Save or update project directly in Cloud Firestore
 */
export async function saveCloudProject(projectData) {
  const db = getFirebaseDb();
  if (!db) return null;

  const projectId = projectData.id || `PRJ-${Date.now()}`;
  const payload = {
    ...projectData,
    id: projectId,
    isCustom: true,
    updatedAt: new Date().toISOString()
  };

  try {
    const docRef = doc(db, 'projects', projectId);
    await setDoc(docRef, payload, { merge: true });
    return payload;
  } catch (err) {
    console.error('Failed to save project to Firestore cloud:', err);
    throw err;
  }
}

/**
 * Delete project from Cloud Firestore
 */
export async function deleteCloudProject(projectId) {
  const db = getFirebaseDb();
  if (!db) return false;

  try {
    const docRef = doc(db, 'projects', projectId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error('Failed to delete project from Firestore cloud:', err);
    throw err;
  }
}

/**
 * Real-time listener for Client Inquiries & RFP Leads
 */
export function subscribeCloudInquiries(onUpdate) {
  const db = getFirebaseDb();
  if (!db) return null;

  if (unsubscribeInquiries) {
    unsubscribeInquiries();
  }

  try {
    const inquiriesCol = collection(db, 'inquiries');
    unsubscribeInquiries = onSnapshot(inquiriesCol, (snapshot) => {
      const liveInquiries = [];
      snapshot.forEach(docSnap => {
        liveInquiries.push({ id: docSnap.id, ...docSnap.data() });
      });

      liveInquiries.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

      if (onUpdate) {
        onUpdate(liveInquiries);
      }
    }, (err) => {
      console.warn('Firestore inquiries listener warning:', err);
    });

    return unsubscribeInquiries;
  } catch (err) {
    console.error('Error attaching Firestore inquiries listener:', err);
    return null;
  }
}

/**
 * Save new client RFP inquiry to Cloud Firestore
 */
export async function saveCloudInquiry(inquiryData) {
  const db = getFirebaseDb();
  if (!db) return null;

  const inquiryId = inquiryData.id || `LEAD-${Date.now()}`;
  const payload = {
    ...inquiryData,
    id: inquiryId,
    timestamp: inquiryData.timestamp || new Date().toISOString()
  };

  try {
    const docRef = doc(db, 'inquiries', inquiryId);
    await setDoc(docRef, payload, { merge: true });
    return payload;
  } catch (err) {
    console.error('Failed to log inquiry to Firestore cloud:', err);
    throw err;
  }
}
