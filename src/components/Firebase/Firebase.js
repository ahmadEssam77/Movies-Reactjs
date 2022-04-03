// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5lgRzWjvGMM2oIRxlxFTp9KV5OjpYdCI",
  authDomain: "movies-3f432.firebaseapp.com",
  projectId: "movies-3f432",
  storageBucket: "movies-3f432.appspot.com",
  messagingSenderId: "801546350823",
  appId: "1:801546350823:web:cdd1d52ebc4a22d876b242"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);

