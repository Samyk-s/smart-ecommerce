import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)

  // Will be wired to authStore (reads token from URL search params) in Phase 3
  const isLoading = false

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter a new password for your account"
    >
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              disabled={isLoading}
              required
              className="pr-9"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            disabled={isLoading}
            required
          />
        </div>

        <Button type="submit" className="mt-1 w-full" disabled={isLoading} size="sm">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Resetting…
            </>
          ) : (
            'Reset password'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
