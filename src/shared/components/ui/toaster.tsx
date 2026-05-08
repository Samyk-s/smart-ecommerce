import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { dismissToast, useToast, type ToastMessage } from '@/shared/hooks/use-toast'

const variantClasses: Record<NonNullable<ToastMessage['variant']>, string> = {
  default: 'border-zinc-200 bg-white text-zinc-950',
  success: 'border-[#2d8dcc]/25 bg-blue-50 text-[#075da4]',
  destructive: 'border-red-200 bg-red-50 text-red-950',
}

export function Toaster() {
  const toasts = useToast()

  return (
    <div className="fixed right-4 top-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
      {toasts.map((toastItem) => (
        <div
          key={toastItem.id}
          role="status"
          className={cn(
            'grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-xl border p-4 shadow-lg',
            variantClasses[toastItem.variant ?? 'default']
          )}
        >
          <ToastIcon variant={toastItem.variant} />
          <div className="min-w-0">
            <p className="text-sm font-semibold">{toastItem.title}</p>
            {toastItem.description && (
              <p className="mt-1 text-sm opacity-80">{toastItem.description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Close notification"
            className="mt-[-2px] text-current hover:bg-black/5"
            onClick={() => dismissToast(toastItem.id)}
          >
            <X />
          </Button>
        </div>
      ))}
    </div>
  )
}

function ToastIcon({ variant = 'default' }: Pick<ToastMessage, 'variant'>) {
  if (variant === 'success') {
    return <CheckCircle2 className="mt-0.5 size-5 text-[#075da4]" />
  }

  if (variant === 'destructive') {
    return <XCircle className="mt-0.5 size-5 text-red-600" />
  }

  return <Info className="mt-0.5 size-5 text-zinc-500" />
}
