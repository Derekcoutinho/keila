import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDn_qJhBESFkgdcS934zB_HzSV1eZjSDFI",
  authDomain: "site-keila.firebaseapp.com",
  projectId: "site-keila",
  storageBucket: "site-keila.firebasestorage.app",
  messagingSenderId: "1020592417369",
  appId: "1:1020592417369:web:2273f24cb47c54894e9f48"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);