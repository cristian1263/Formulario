// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHpBxaarVKIHRuDZtC2SP1C2LQ2b3ZPS4",
  authDomain: "proyectod-4f96b.firebaseapp.com",
  projectId: "proyectod-4f96b",
  storageBucket: "proyectod-4f96b.appspot.com",
  messagingSenderId: "234295056269",
  appId: "1:234295056269:web:98041b6464c16f11e90fc4",
  measurementId: "G-9JFVM3F456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export{db};