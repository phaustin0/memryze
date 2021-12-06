import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-9kNaFizD5SUBjIh9yBhaqMgmfTmr8V4",
  authDomain: "memryze-6d67b.firebaseapp.com",
  databaseURL: "https://memryze-6d67b-default-rtdb.firebaseio.com",
  projectId: "memryze-6d67b",
  storageBucket: "memryze-6d67b.appspot.com",
  messagingSenderId: "117569706241",
  appId: "1:117569706241:web:568a3c1ad7e9150d796300",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
