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

const STORAGE_KEY_FIREBASE = 'kachoras_firebase_config_v1';

let firestoreInstance = null;
let unsubscribeProjects = null;
let unsubscribeInquiries = null;

/**
 * Get active stored Firebase config
 */
export function getFirebaseConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FIREBASE);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Error reading Firebase config from storage:', err);
    return null;
  }
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
 * Check if Firebase cloud sync is currently configured and active
 */
export function isFirebaseActive() {
  return !!getFirebaseDb();
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
