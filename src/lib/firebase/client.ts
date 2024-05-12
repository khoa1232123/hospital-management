// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxAGlrm0HplvZQFE7Uk7n_l8BaJBWS-_E",
  authDomain: "quanly-benhvien.firebaseapp.com",
  projectId: "quanly-benhvien",
  storageBucket: "quanly-benhvien.appspot.com",
  messagingSenderId: "559263174595",
  appId: "1:559263174595:web:2da32dce13393a232f7776",
  measurementId: "G-LHWM6YMG8L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, auth, analytics, db };
