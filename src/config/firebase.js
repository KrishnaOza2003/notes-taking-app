import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyqPh58CmaA7QEHq2THfCgtA17rlgV4ik",
  authDomain: "keep-clone-f7d98.firebaseapp.com",
  projectId: "keep-clone-f7d98",
  storageBucket: "keep-clone-f7d98.appspot.com",
  messagingSenderId: "282689313238",
  appId: "1:282689313238:web:7c7761e5e22933277e2c77",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
