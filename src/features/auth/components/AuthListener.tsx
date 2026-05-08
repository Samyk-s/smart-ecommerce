import { useEffect, type ReactNode } from 'react'
import { authService } from '@/features/auth/services/authService'
import { useAuthStore } from '@/shared/stores/authStore'

interface AuthListenerProps {
  children: ReactNode
}

export function AuthListener({ children }: AuthListenerProps) {
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    return authService.onAuthChange(setUser)
  }, [setUser])

  return <>{children}</>
}
