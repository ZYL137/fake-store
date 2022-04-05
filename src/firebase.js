import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDFnA1rSb_9JLXvnLKqin5AXe7HhOJ3W_w",
  authDomain: "fake-store-4dd9e.firebaseapp.com",
  projectId: "fake-store-4dd9e",
  storageBucket: "fake-store-4dd9e.appspot.com",
  messagingSenderId: "171288801056",
  appId: "1:171288801056:web:350e786337cfdb154cb145",
  measurementId: "G-BGYGWX9J5B",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
