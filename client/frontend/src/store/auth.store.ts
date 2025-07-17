import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BACKEND_URL } from "../components/config/config";
import axios from "axios";

type User = {
  id: number;
  name: string;
  emailId: string;
};
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signin: (data: { emailId: string; password: string }) => Promise<void>;
  signup: (data: {
    name: string;
    emailId: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  setUser: (user: User) => void;
  removeUser: () => void;
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      signup: async ({ emailId, name, password }) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(
            `${BACKEND_URL}/api/v1/signup`,
            {
              emailId,
              name,
              password,
            },
            { withCredentials: true }
          );
          set({
            user: res.data?.user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (err: any) {
          set({
            error: err?.response?.data?.message || "Signup failed",
            loading: false,
          });
        }
      },
      signin: async ({ emailId, password }) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(
            `${BACKEND_URL}/api/v1/signin`,
            { emailId, password },
            { withCredentials: true }
          );

          set({
            user: res.data.user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (err: any) {
          set({
            error: err?.response?.data?.message || "Signin failed",
            loading: false,
          });
        }
      },
      logout: async () => {
        try {
          await axios.post(
            `${BACKEND_URL}/api/v1/logout`,
            {},
            { withCredentials: true }
          );
        } catch (err) {
          console.error("Logout failed", err);
        }

        set({ user: null, isAuthenticated: false });
      },
      fetchUser: async () => {
        set({ loading: true });
        try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/profile`, {
            withCredentials: true,
          });

          set({
            user: res.data.user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (err) {
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },
      setUser: (user) => set({ user, isAuthenticated: true }),
      removeUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
