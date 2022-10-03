// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSTFZEsq8QTqsrzGXoVX9BZBoGpKFx9XA",
  authDomain: "fir-tutorial-aec37.firebaseapp.com",
  projectId: "fir-tutorial-aec37",
  storageBucket: "fir-tutorial-aec37.appspot.com",
  messagingSenderId: "929895276184",
  appId: "1:929895276184:web:4a69a2c47745717090faed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication object
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//firebase db Object
const db = getFirestore();

export { auth,provider,db }