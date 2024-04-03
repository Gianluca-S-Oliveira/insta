import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyByuVaT234UbdKKZ4kmGWt6-ZbSuEp0O70",
    authDomain: "helpets-3025f.firebaseapp.com",
    projectId: "helpets-3025f",
    storageBucket: "helpets-3025f.appspot.com",
    messagingSenderId: "65457799195",
    appId: "1:65457799195:web:c958e53a7143c7640f38be",
    measurementId: "G-NJ395GB610"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const storage = firebase.storage()
const db = firebaseApp.firestore()
export { auth, db, storage }