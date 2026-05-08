import type { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Root provider wrapper.
 * Add ThemeProvider, AuthListener, QueryClientProvider, etc. here as features are built.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <>{children}</>
}
