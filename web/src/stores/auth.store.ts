import { PublicUser } from "@/types/models.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define types for state and actions
interface AuthState {
  user: PublicUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: PublicUser | null) => void;
  setToken: (token: string | null) => void;
}

// Create a store with `persist` middleware to save state to localStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) =>
        set((state) => ({ ...state, user, isAuthenticated: !!user })),
      setToken: (token) => set((state) => ({ ...state, token })),
    }),
    {
      name: "auth-storage", // Name of item in storage
      storage: createJSONStorage(() => localStorage), // Specify the use of localStorage
    }
  )
);
