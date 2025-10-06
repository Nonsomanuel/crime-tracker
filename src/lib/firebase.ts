// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVlLFCvF0vPmiHfiNUKVDw9JFQmoaQ-3A",
  authDomain: "crime-tracker-5299b.firebaseapp.com",
  projectId: "crime-tracker-5299b",
  storageBucket: "crime-tracker-5299b.firebasestorage.app",
  messagingSenderId: "887253249053",
  appId: "1:887253249053:web:b6936eb0ad78b45908eaf4",
  measurementId: "G-WKJ4SHEJLX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
