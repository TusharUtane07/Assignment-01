import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkPq9d3w8s1gNgQOgZgHqQfGCswNJf-9c",
  authDomain: "recipe-c543f.firebaseapp.com",
  projectId: "recipe-c543f",
  storageBucket: "recipe-c543f.appspot.com",
  messagingSenderId: "744471486283",
  appId: "1:744471486283:web:b8f2bcf9bb655a4b2252ce",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const databse = getFirestore(app);
