import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDw52wkD6uQtXYCQFlWJGFEC7RuPDZ6QJg",
  authDomain: "newsapp-89a0f.firebaseapp.com",
  projectId: "newsapp-89a0f",
  storageBucket: "newsapp-89a0f.appspot.com",
  messagingSenderId: "727910651733",
  appId: "1:727910651733:web:61ad3df5a645eeef0341dc"
};

if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();
const auth = firebase.auth();
export { firestore, auth };