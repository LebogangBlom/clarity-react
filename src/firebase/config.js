// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDdO94czcgfqqs-4hGhOBdHDHcAX1L8t8",
  authDomain: "sanctum-483ec.firebaseapp.com",
  projectId: "sanctum-483ec",
  storageBucket: "sanctum-483ec.firebasestorage.app",
  messagingSenderId: "44505943585",
  appId: "1:44505943585:web:26a50a64707680cf029d60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };