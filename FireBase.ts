import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQ5j7QexNg_hyXNYfG05kQOx3qrVvDdR8",
  authDomain: "aula-4b7fc.firebaseapp.com",
  projectId: "aula-4b7fc",
  storageBucket: "aula-4b7fc.firebasestorage.app",
  messagingSenderId: "690460486832",
  appId: "1:690460486832:web:1a4f82355a881a09651f75",
  measurementId: "G-LEL1G4NEES"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
