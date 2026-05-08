import type { ReactNode } from 'react'
import { AuthListener } from '@/features/auth/components/AuthListener'
import { Toaster } from '@/shared/components/ui/toaster'

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Root provider wrapper.
 * Add ThemeProvider, AuthListener, QueryClientProvider, etc. here as features are built.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthListener>
      {children}
      <Toaster />
    </AuthListener>
  )
}
