import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDnsIEvTrgnm6ljv0HYz7bBWyhgxNUEKBs",
  authDomain: "whatsapp-clone-905ef.firebaseapp.com",
  projectId: "whatsapp-clone-905ef",
  storageBucket: "whatsapp-clone-905ef.appspot.com",
  messagingSenderId: "971850387194",
  appId: "1:971850387194:web:81e26498015e7d64460343",
  measurementId: "G-S5XZPHZ40Z"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(auth);