import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVlLFCvF0vPmiHfiNUKVDw9JFQmoaQ-3A",
  authDomain: "crime-tracker-5299b.firebaseapp.com",
  projectId: "crime-tracker-5299b",
  storageBucket: "crime-tracker-5299b.appspot.com", // ✅ FIXED
  messagingSenderId: "887253249053",
  appId: "1:887253249053:web:b6936eb0ad78b45908eaf4",
  measurementId: "G-WKJ4SHEJLX",
};

// ✅ Prevent re-initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
