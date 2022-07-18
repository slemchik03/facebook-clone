// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCymE1mAfBJSfR0t1d6Vv4dz8M3fbcUbLY",
  authDomain: "facebook-clone-fc1b4.firebaseapp.com",
  projectId: "facebook-clone-fc1b4",
  storageBucket: "facebook-clone-fc1b4.appspot.com",
  messagingSenderId: "428425275102",
  appId: "1:428425275102:web:acfb282b167f51bcb4844f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);