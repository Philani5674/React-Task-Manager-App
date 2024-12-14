// Authentication utilities
import { GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase';
import { User } from '../types/user';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return transformFirebaseUser(result.user);
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return null;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const transformFirebaseUser = (firebaseUser: FirebaseUser | null): User | null => {
  if (!firebaseUser) return null;
  
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || '',
    photoURL: firebaseUser.photoURL || '',
  };
};