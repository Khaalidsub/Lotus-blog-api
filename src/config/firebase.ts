import {initializeApp} from "firebase-admin";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGrKFMhWJFQ8Qga6zixX8aSp62grsKNLU",
  authDomain: "lotus-blogs.firebaseapp.com",
  databaseURL: "https://lotus-blogs.firebaseio.com",
  projectId: "lotus-blogs",
  storageBucket: "lotus-blogs.appspot.com",
  messagingSenderId: "963878405650",
  appId: "1:963878405650:web:f71aa8cccec79afa537acb",
  measurementId: "G-JNFJ37XFH9",
};

export const admin = initializeApp(firebaseConfig);
export const bucket = admin.storage().bucket();
