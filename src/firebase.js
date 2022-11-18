// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiHFqRVJBOoLC6kjUSpySvV02Xm6NLL1w",
  authDomain: "infinity-f0f24.firebaseapp.com",
  projectId: "infinity-f0f24",
  storageBucket: "infinity-f0f24.appspot.com",
  messagingSenderId: "114369220665",
  appId: "1:114369220665:web:8146763c77d19069bf7de8",
  measurementId: "G-S4GEM0QSGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }