// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import the authentication module
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA33-V5vSsj8kBykwI59KzUsE3tUqK6tw",
  authDomain: "garbage-managment-30feb.firebaseapp.com",
  projectId: "garbage-managment-30feb",
  storageBucket: "garbage-managment-30feb.appspot.com",
  messagingSenderId: "20685338053",
  appId: "1:20685338053:web:dd050e32d1bf87b67387ac",
  measurementId: "G-J8BW43LQB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app); // Create an auth instance

//initialize the firestore
export const db = getFirestore(app);

export { auth }; // Export the auth instance for use in other files