// Authentication state management
import { create } from 'zustand';
import { User } from '../types/user';
import { signInWithGoogle as signInWithGoogleAuth, signOutUser } from '../lib/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  signInWithGoogle: async () => {
    set({ isLoading: true });
    try {
      const user = await signInWithGoogleAuth();
      set({ user });
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    set({ isLoading: true });
    try {
      await signOutUser();
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));