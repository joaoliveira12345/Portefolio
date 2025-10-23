import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
};

let app = null;
try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
  } else {
    console.warn(
      "Firebase not initialized — missing env vars (REACT_APP_FIREBASE_*)"
    );
  }
} catch (err) {
  console.error("Firebase init error:", err);
}

export const auth = app ? getAuth(app) : null;
const provider = new GoogleAuthProvider();
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

export const signInWithGoogle = async () => {
  if (!auth) {
    throw new Error("Firebase auth not initialized");
  }
  return signInWithPopup(auth, provider);
};