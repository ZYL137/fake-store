import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCOU2N7RCht4xIE6Vldq0jk4SLWy5h2qt8",
  authDomain: "clone-76cf8.firebaseapp.com",
  projectId: "clone-76cf8",
  storageBucket: "clone-76cf8.appspot.com",
  messagingSenderId: "553289623785",
  appId: "1:553289623785:web:2ae5393de20fa1de1c2878",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
