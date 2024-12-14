// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCsPeWzMm5Z2JH96NWBmQ1FpMyCxclLZDg",
  authDomain: "sideprojectsauth.firebaseapp.com",
  projectId: "sideprojectsauth",
  storageBucket: "sideprojectsauth.firebasestorage.app",
  messagingSenderId: "157275569482",
  appId: "1:157275569482:web:e49110650c1a3a034895b3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);