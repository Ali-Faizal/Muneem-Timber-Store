import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCk5499kQpdO0fk83twS1DYzdf1CtZuFNU",
  authDomain: "muneem-timber-store.firebaseapp.com",
  projectId: "muneem-timber-store",
  storageBucket: "muneem-timber-store.firebasestorage.app",
  messagingSenderId: "398919029906",
  appId: "1:398919029906:web:690911da717fcd7ece824b",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export default app;