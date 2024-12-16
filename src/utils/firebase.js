import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    createUserWithEmailAndPassword 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBrq6W90fbSduQ8YC_MPs3FNDATaEEGKCM",
  authDomain: "reactcource-7254f.firebaseapp.com",
  projectId: "reactcource-7254f",
  storageBucket: "reactcource-7254f.firebasestorage.app",
  messagingSenderId: "865295850442",
  appId: "1:865295850442:web:c2fee3c282e49e66b54d33"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export const googleProvider = new GoogleAuthProvider();


export const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};


export const registerWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};


export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};
