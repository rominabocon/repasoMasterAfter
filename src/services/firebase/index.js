import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBSsfvUloOJVFhQKV6Rme0MvMC_y0cJESw",
  authDomain: "proyectomasterafter.firebaseapp.com",
  projectId: "proyectomasterafter",
  storageBucket: "proyectomasterafter.appspot.com",
  messagingSenderId: "79506812542",
  appId: "1:79506812542:web:be1f52d9ee11cda294f22f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)