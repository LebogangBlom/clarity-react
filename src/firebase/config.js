import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

let app;

const initializeFirebase = () => {
  if (app) return app;

  try {
    if (!firebaseConfig.apiKey) {
      throw new Error('Firebase API key is missing. Please check your environment variables.');
    }
    app = initializeApp(firebaseConfig);
    return app;
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    throw error;
  }
};

export { initializeFirebase };
