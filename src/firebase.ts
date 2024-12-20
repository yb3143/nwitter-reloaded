import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZM9QFnJsEONuRG-L4UBMd_xgu3MIxir8",
  authDomain: "nibuy-3627b.firebaseapp.com",
  projectId: "nibuy-3627b",
  storageBucket: "nibuy-3627b.firebasestorage.app",
  messagingSenderId: "271949567273",
  appId: "1:271949567273:web:d67b2ba10789726e865338",
  measurementId: "G-2YL2XZMDLX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
