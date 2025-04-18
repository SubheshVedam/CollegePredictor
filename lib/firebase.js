import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB0_tmr1SbDCtHH9MTcOCC5SObxKLL-cXc",
    authDomain: "college-predictor-38be1.firebaseapp.com",
    projectId: "college-predictor-38be1",
    storageBucket: "college-predictor-38be1.firebasestorage.app",
    messagingSenderId: "499002189703",
    appId: "1:499002189703:web:8ddbd7b971ea35e4579522",
    measurementId: "G-9CCFPCYZVY"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);