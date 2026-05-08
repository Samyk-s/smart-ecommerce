import { Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

interface GoogleAuthButtonProps {
  isLoading: boolean
  onClick: () => void
}

export function GoogleAuthButton({ isLoading, onClick }: GoogleAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="h-11 w-full gap-3 text-base font-semibold"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <GoogleIcon />
      )}
      Continue with Google
    </Button>
  )
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
    >
      <path
        fill="#4285F4"
        d="M21.805 10.023h-9.62v3.955h5.532c-.239 1.278-.968 2.361-2.064 3.091v2.568h3.346c1.958-1.804 3.086-4.461 3.086-7.61 0-.682-.062-1.34-.176-2.004z"
      />
      <path
        fill="#34A853"
        d="M12.185 22c2.797 0 5.145-.927 6.86-2.512l-3.346-2.568c-.929.623-2.117.99-3.514.99-2.702 0-4.992-1.824-5.811-4.278H2.918v2.65C4.624 19.665 8.123 22 12.185 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.374 13.632a5.991 5.991 0 0 1 0-3.824v-2.65H2.918a10.006 10.006 0 0 0 0 9.124l3.456-2.65z"
      />
      <path
        fill="#EA4335"
        d="M12.185 5.53c1.521 0 2.889.523 3.966 1.551l2.972-2.972C17.33 2.44 14.982 1.41 12.185 1.41c-4.062 0-7.561 2.335-9.267 5.748l3.456 2.65c.819-2.454 3.109-4.278 5.811-4.278z"
      />
    </svg>
  )
}
