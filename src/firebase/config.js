import { initializeApp } from "firebase/app";

let app;

const initializeFirebase = async () => {
  if (app) return app; // Return already initialized app

  try {
    const response = await fetch('/.netlify/functions/firebase-config');
    const firebaseConfig = await response.json();

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

export { initializeFirebase, app };
