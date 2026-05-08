import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useAuthStore } from '@/shared/stores/authStore'

export function SignupPage() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  // Client-side validation errors (password mismatch, etc.)
  const [localError, setLocalError] = useState<string | null>(null)

  const { signup, status, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  const isLoading = status === 'loading'
  const displayedError = localError ?? error

  // Redirect to home on successful authentication
  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/', { replace: true })
    }
  }, [status, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalError(null)

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.')
      return
    }

    await signup({ email, password, displayName })
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start shopping with SmartShop today"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        {/* Error banner — shows both client-side and store errors */}
        {displayedError && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {displayedError}
          </div>
        )}

        {/* Full name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="displayName">Full name</Label>
          <Input
            id="displayName"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            disabled={isLoading}
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoading}
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) clearError()
            }}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
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

        {/* Confirm password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat your password"
              autoComplete="new-password"
              disabled={isLoading}
              required
              className="pr-9"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setLocalError(null)
              }}
            />
            <button
              type="button"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" className="mt-1 w-full" disabled={isLoading} size="sm">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Creating account…
            </>
          ) : (
            'Create account'
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By creating an account you agree to our{' '}
          <span className="underline underline-offset-4 cursor-pointer hover:text-foreground">
            Terms of Service
          </span>
          .
        </p>
      </form>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">
            Already have an account?
          </span>
        </div>
      </div>

      <Button asChild variant="outline" size="sm" className="w-full">
        <Link to="/auth/login">Sign in</Link>
      </Button>
    </AuthLayout>
  )
}
