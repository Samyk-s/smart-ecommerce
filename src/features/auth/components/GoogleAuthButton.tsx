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
      size="sm"
      className="w-full gap-2"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <span className="flex size-4 items-center justify-center rounded-full bg-white text-xs font-bold text-[#4285f4]">
          G
        </span>
      )}
      Continue with Google
    </Button>
  )
}
