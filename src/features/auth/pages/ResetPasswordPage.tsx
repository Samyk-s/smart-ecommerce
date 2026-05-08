import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useAuthStore } from '@/shared/stores/authStore'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('oobCode')
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const { resetPassword, verifyResetCode, status, error, clearError } = useAuthStore()

  const isLoading = status === 'loading'
  const missingCodeError = !code
    ? 'Missing reset code. Please request a new password reset link.'
    : null
  const displayedError = localError ?? error ?? missingCodeError

  useEffect(() => {
    if (!code) {
      return
    }

    void verifyResetCode(code)
      .then(setEmail)
      .catch(() => undefined)
  }, [code, verifyResetCode])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalError(null)

    if (!code) {
      setLocalError('Missing reset code. Please request a new password reset link.')
      return
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.')
      return
    }

    await resetPassword(code, password)
    if (!useAuthStore.getState().error) {
      setIsSuccess(true)
    }
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle={
        email
          ? `Enter a new password for ${email}`
          : 'Enter a new password for your account'
      }
    >
      {isSuccess ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <span className="text-xl">✓</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your password has been updated. You can sign in with the new password.
          </p>
          <Button asChild variant="ghost" size="sm" className="mt-2">
            <Link to="/auth/login">Back to sign in</Link>
          </Button>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {displayedError && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {displayedError}
            </div>
          )}

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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setLocalError(null)
                  if (error) clearError()
                }}
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
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setLocalError(null)
              }}
            />
          </div>

          <Button type="submit" className="mt-1 w-full" disabled={isLoading} size="sm">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Resetting...
              </>
            ) : (
              'Reset password'
            )}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
