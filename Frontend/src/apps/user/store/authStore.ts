import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthUser, AuthTokens } from '../types';
import { tokenService } from '../utils';

interface AuthState {
  // State
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: AuthUser | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;

  // Helper actions
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setTokens: (tokens) => {
        if (tokens) {
          tokenService.saveTokens(tokens);
        } else {
          tokenService.clearTokens();
        }
        set({ tokens, isAuthenticated: !!tokens });
      },

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      logout: () => {
        tokenService.clearTokens();

        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      initializeAuth: () => {
        const { tokens, isAuthenticated } = useAuthStore.getState();
        // const tokens = tokenService.getTokens();
        if (tokens && isAuthenticated) {
          tokenService.saveTokens(tokens); // Ensure tokens are in sync with localStorage
          // set({ tokens, isAuthenticated: true });
        } else {
          const savedTokens = tokenService.getTokens();
          if (savedTokens) {
            set({
              tokens: savedTokens,
              isAuthenticated: true,
            });
          }
          // set({
          //   user: null,
          //   tokens: null,
          //   isAuthenticated: false,
          // });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
