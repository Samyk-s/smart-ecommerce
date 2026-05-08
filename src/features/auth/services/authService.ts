import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  verifyPasswordResetCode,
  type User as FirebaseUser,
} from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'
import type { User } from '@/shared/types'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

const toUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  email: firebaseUser.email ?? '',
  displayName: firebaseUser.displayName,
  photoURL: firebaseUser.photoURL,
  createdAt: firebaseUser.metadata.creationTime ?? new Date().toISOString(),
})

const getAuthErrorMessage = (error: unknown) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'An account already exists for this email.'
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.'
      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait a moment and try again.'
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was closed before it finished.'
      case 'auth/popup-blocked':
        return 'Your browser blocked the Google sign-in popup.'
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with this email using another sign-in method.'
      case 'auth/expired-action-code':
        return 'This reset link has expired. Please request a new one.'
      case 'auth/invalid-action-code':
        return 'This reset link is invalid or has already been used.'
      default:
        return 'Authentication failed. Please try again.'
    }
  }

  return error instanceof Error
    ? error.message
    : 'Authentication failed. Please try again.'
}

const withAuthErrorMessage = async <T>(action: () => Promise<T>) => {
  try {
    return await action()
  } catch (error) {
    throw new Error(getAuthErrorMessage(error), { cause: error })
  }
}

export const authService = {
  signup: async (email: string, password: string) => {
    return withAuthErrorMessage(async () => {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      return toUser(res.user)
    })
  },

  updateDisplayName: async (displayName: string) => {
    return withAuthErrorMessage(async () => {
      if (!auth.currentUser) {
        throw new Error('No authenticated user found.')
      }

      await updateProfile(auth.currentUser, { displayName })
      return toUser(auth.currentUser)
    })
  },

  login: async (email: string, password: string) => {
    return withAuthErrorMessage(async () => {
      const res = await signInWithEmailAndPassword(auth, email, password)
      return toUser(res.user)
    })
  },

  loginWithGoogle: async () => {
    return withAuthErrorMessage(async () => {
      const res = await signInWithPopup(auth, googleProvider)
      return toUser(res.user)
    })
  },

  logout: async () => {
    await withAuthErrorMessage(() => signOut(auth))
  },

  forgotPassword: async (email: string) => {
    await withAuthErrorMessage(() => sendPasswordResetEmail(auth, email))
  },

  verifyResetCode: async (code: string) => {
    return withAuthErrorMessage(() => verifyPasswordResetCode(auth, code))
  },

  resetPassword: async (code: string, password: string) => {
    await withAuthErrorMessage(() => confirmPasswordReset(auth, code, password))
  },

  onAuthChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      callback(firebaseUser ? toUser(firebaseUser) : null)
    })
  },
}
