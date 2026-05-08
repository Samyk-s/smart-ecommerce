import { create } from 'zustand'
import { authService } from '@/features/auth/services/authService'
import type { User, LoginCredentials, SignupData } from '@/shared/types'

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

interface AuthState {
  user: User | null
  status: AuthStatus
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (code: string, password: string) => Promise<void>
  verifyResetCode: (code: string) => Promise<string>
  setUser: (user: User | null) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  status: 'idle',
  error: null,

  login: async ({ email, password }) => {
    set({ status: 'loading', error: null })
    try {
      const user = await authService.login(email.trim(), password)
      set({ user, status: 'authenticated', error: null })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Login failed. Please try again.'
      set({ user: null, status: 'unauthenticated', error: message })
    }
  },

  loginWithGoogle: async () => {
    set({ status: 'loading', error: null })
    try {
      const user = await authService.loginWithGoogle()
      set({ user, status: 'authenticated', error: null })
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Google sign-in failed. Please try again.'
      set({ user: null, status: 'unauthenticated', error: message })
    }
  },

  signup: async ({ email, password, displayName }) => {
    set({ status: 'loading', error: null })
    try {
      const trimmedName = displayName.trim()
      if (!email.trim() || !trimmedName) {
        throw new Error('All fields are required.')
      }

      await authService.signup(email.trim(), password)
      const user = await authService.updateDisplayName(trimmedName)
      set({ user, status: 'authenticated', error: null })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Signup failed. Please try again.'
      set({ user: null, status: 'unauthenticated', error: message })
    }
  },

  logout: async () => {
    set({ status: 'loading', error: null })
    try {
      await authService.logout()
      set({ user: null, status: 'unauthenticated', error: null })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Logout failed. Please try again.'
      set((state) => ({
        status: state.user ? 'authenticated' : 'unauthenticated',
        error: message,
      }))
    }
  },

  forgotPassword: async (email) => {
    set({ status: 'loading', error: null })
    try {
      await authService.forgotPassword(email.trim())
      set((state) => ({
        status: state.user ? 'authenticated' : 'unauthenticated',
        error: null,
      }))
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Could not send reset email. Please try again.'
      set((state) => ({
        status: state.user ? 'authenticated' : 'unauthenticated',
        error: message,
      }))
    }
  },

  resetPassword: async (code, password) => {
    set({ status: 'loading', error: null })
    try {
      await authService.resetPassword(code, password)
      set({ user: null, status: 'unauthenticated', error: null })
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Could not reset password. Please try again.'
      set({ user: null, status: 'unauthenticated', error: message })
    }
  },

  verifyResetCode: async (code) => {
    set({ error: null })
    try {
      return await authService.verifyResetCode(code)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'This reset link is invalid.'
      set({ error: message })
      throw err
    }
  },

  setUser: (user) => {
    set({
      user,
      status: user ? 'authenticated' : 'unauthenticated',
      error: null,
    })
  },

  clearError: () => set({ error: null }),
}))
