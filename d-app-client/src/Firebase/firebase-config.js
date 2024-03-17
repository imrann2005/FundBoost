// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8XpeicYynG1qezvNUQX7uM-ttVzrQyt0",
  authDomain: "myfirstfirebaseproject-a7235.firebaseapp.com",
  projectId: "myfirstfirebaseproject-a7235",
  storageBucket: "myfirstfirebaseproject-a7235.appspot.com",
  messagingSenderId: "512687309471",
  appId: "1:512687309471:web:a257d47a91afb60b33d8aa",
  measurementId: "G-0YXD9TFDE4"
};

// Initialize Firebase
const firebaseAuth = initializeApp(firebaseConfig);
const auth = getAuth(firebaseAuth);

export default auth;