import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBv--rU9vyXOF3V25hifumonuqdwNRH2H8",
    authDomain: "notion-clone-ai-da764.firebaseapp.com",
    projectId: "notion-clone-ai-da764",
    storageBucket: "notion-clone-ai-da764.firebasestorage.app",
    messagingSenderId: "765288599873",
    appId: "1:765288599873:web:763fe2ee676fabc2e451c0",
    measurementId: "G-LEQQ7TM6GN"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};