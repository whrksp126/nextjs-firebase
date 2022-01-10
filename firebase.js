// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCo_juNQ0KZQ9jYXEgZ9TBDizgrwtWTMQ",
  authDomain: "nextjs-firebase-53c0e.firebaseapp.com",
  projectId: "nextjs-firebase-53c0e",
  storageBucket: "nextjs-firebase-53c0e.appspot.com",
  messagingSenderId: "175173966932",
  appId: "1:175173966932:web:041d70238480ae57b8a1c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider}