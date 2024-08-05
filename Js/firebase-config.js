// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD0gr8-JmwzBYz_smW47Xfm0VwjKdgrOy4",
    authDomain: "conversiondedevise-b1c72.firebaseapp.com",
    projectId: "conversiondedevise-b1c72",
    storageBucket: "conversiondedevise-b1c72.appspot.com",
    messagingSenderId: "424327158775",
    appId: "1:424327158775:web:2702fe73ca0767f41fecf2"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services Firebase
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };

