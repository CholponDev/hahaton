// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvSEvQIyCMSbY2T0zySP9Gu2pEDkSbvF8",
  authDomain: "book-store-832c7.firebaseapp.com",
  projectId: "book-store-832c7",
  storageBucket: "book-store-832c7.firebasestorage.app",
  messagingSenderId: "204779043435",
  appId: "1:204779043435:web:192ea124d99a6a08d14f2e",
  measurementId: "G-223X2FXLJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);