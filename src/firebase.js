import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDi3pYKR8cf8fperrJLIJcpri5xuqDhA50",
  authDomain: "prime-52fcd.firebaseapp.com",
  projectId: "prime-52fcd",
  storageBucket: "prime-52fcd.firebasestorage.app",
  messagingSenderId: "197892123938",
  appId: "1:197892123938:web:cab337653f9a4fce1f497b",
  measurementId: "G-NL9EW9HSD9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;