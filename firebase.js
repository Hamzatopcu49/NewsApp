// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw52wkD6uQtXYCQFlWJGFEC7RuPDZ6QJg",
  authDomain: "newsapp-89a0f.firebaseapp.com",
  projectId: "newsapp-89a0f",
  storageBucket: "newsapp-89a0f.appspot.com",
  messagingSenderId: "727910651733",
  appId: "1:727910651733:web:61ad3df5a645eeef0341dc"
};

// Initialize Firebase
if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
export { auth };