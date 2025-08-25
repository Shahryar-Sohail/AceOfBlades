import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { createContext, useContext } from "react";
import { getFirestore } from "firebase/firestore";

export interface FirebaseContextType {
  app: FirebaseApp;
}
const FirebaseContext = createContext<FirebaseContextType | any>(null);
export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: "AIzaSyDJmBXN06mGvMz6Mu_1OCtw3rqa7NhG5GE",
  authDomain: "theaceofblades-97a30.firebaseapp.com",
  projectId: "theaceofblades-97a30",
  storageBucket: "theaceofblades-97a30.firebasestorage.app",
  messagingSenderId: "116011594266",
  appId: "1:116011594266:web:412e5dbb13d7218a5257a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


