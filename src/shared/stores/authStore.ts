import { create } from 'zustand'
import type { User, LoginCredentials, SignupData } from '@/shared/types'

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

interface AuthState {
  user: User | null
  status: AuthStatus
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  clearError: () => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  status: 'idle',
  error: null,

  login: async ({ email, password }) => {
    set({ status: 'loading', error: null })
    try {
      await delay(800)

      // Mock validation — swap this block for a Firebase call in a later phase
      if (!email || password.length < 6) {
        throw new Error('Invalid email or password.')
      }

      const user: User = {
        id: 'mock-user-id',
        email,
        displayName: email.split('@')[0],
        photoURL: null,
        createdAt: new Date().toISOString(),
      }

      set({ user, status: 'authenticated', error: null })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Login failed. Please try again.'
      set({ status: 'unauthenticated', error: message })
    }
  },

  signup: async ({ email, password, displayName }) => {
    set({ status: 'loading', error: null })
    try {
      await delay(800)

      // Mock validation — swap this block for a Firebase call in a later phase
      if (!email || !displayName.trim()) {
        throw new Error('All fields are required.')
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters.')
      }

      const user: User = {
        id: `mock-${Date.now()}`,
        email,
        displayName: displayName.trim(),
        photoURL: null,
        createdAt: new Date().toISOString(),
      }

      set({ user, status: 'authenticated', error: null })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Signup failed. Please try again.'
      set({ status: 'unauthenticated', error: message })
    }
  },

  logout: () => {
    set({ user: null, status: 'unauthenticated', error: null })
  },

  clearError: () => set({ error: null }),
}))
