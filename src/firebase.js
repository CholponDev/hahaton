import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAvSEvQIyCMSbY2T0zySP9Gu2pEDkSbvF8",
  authDomain: "book-store-832c7.firebaseapp.com",
  projectId: "book-store-832c7",
  storageBucket: "book-store-832c7.appspot.com",
  messagingSenderId: "204779043435",
  appId: "1:204779043435:web:192ea124d99a6a08d14f2e",
  measurementId: "G-223X2FXLJ6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics только в браузере
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}