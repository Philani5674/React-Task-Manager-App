// Custom hook for authentication state
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { transformFirebaseUser } from '../lib/auth';

export const useAuth = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(transformFirebaseUser(firebaseUser));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return useAuthStore();
};