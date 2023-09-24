// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfIuaaL4M3xmd7LUMJtfzi26fKSFDa_dc",
  authDomain: "instagram-clone-4ec82.firebaseapp.com",
  projectId: "instagram-clone-4ec82",
  storageBucket: "instagram-clone-4ec82.appspot.com",
  messagingSenderId: "94890513927",
  appId: "1:94890513927:web:957899253c5eb79d7cfca2",
  measurementId: "G-TXTNEPLR66"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig) 

   if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
 }

const analytics = getAnalytics(app);
const database = getFirestore(app)
const storage = getStorage(app)
export {app, database, storage, f}