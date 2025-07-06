import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Log environment variables for debugging
console.log('Environment variables:', {
  hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
  hasProjectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
  hasAppId: !!import.meta.env.VITE_FIREBASE_APP_ID,
  nodeEnv: import.meta.env.MODE
});

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let firebaseApp;
let db;
let auth;

// Only initialize on client-side
if (typeof window !== 'undefined') {
  try {
    // Initialize Firebase
    firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    
    // Initialize Firestore
    db = getFirestore(firebaseApp);
    
    // Initialize Auth
    auth = getAuth(firebaseApp);
    
    // Log successful initialization
    console.log('Firebase initialized successfully');
    console.log('Firebase app:', firebaseApp);
    console.log('Firestore instance:', db);
    
    // For local development with emulators
    if (import.meta.env.DEV) {
      console.log('Running in development mode');
      // Uncomment these lines if you're using Firebase emulators
      // connectFirestoreEmulator(db, 'localhost', 8080);
      // connectAuthEmulator(auth, 'http://localhost:9099');
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.log('Server-side: Firebase not initialized');
}

export { db, auth };
// Add at the end of firebase.ts
console.log('Firebase initialized with config:', {
  projectId: firebaseConfig.projectId,
  appId: firebaseConfig.appId,
  authDomain: firebaseConfig.authDomain
});