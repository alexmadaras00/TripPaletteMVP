import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA6TetbRfdmR5pPtrvsyDB_u8Z2u8LqJsI",
    authDomain: "trip-palette.firebaseapp.com",
    projectId: "trip-palette",
    storageBucket: "trip-palette.firebasestorage.app",
    messagingSenderId: "215531588813",
    appId: "1:215531588813:web:57e28cbda378a8c89f6d84",
    measurementId: "G-F4J8MWSBS3"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// Get Firebase Auth instance
export const auth = getAuth(app);