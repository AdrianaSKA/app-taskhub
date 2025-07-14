// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUxlD9HzWmZHDnz8KzYNb89Vdo6WmoBQE",
  authDomain: "app-crud-6ca95.firebaseapp.com",
  projectId: "app-crud-6ca95",
  storageBucket: "app-crud-6ca95.firebasestorage.app",
  messagingSenderId: "539297414363",
  appId: "1:539297414363:web:9ed333fade47d6ce5260fe",
  measurementId: "G-CS5DD9HR9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);