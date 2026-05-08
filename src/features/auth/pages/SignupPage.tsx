import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Will be replaced by react-hook-form + Zustand in Phase 3
  const isLoading = false
  const error: string | null = null

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start shopping with SmartShop today"
    >
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>

        {/* Global error banner */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        {/* Display name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="displayName">Full name</Label>
          <Input
            id="displayName"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            disabled={isLoading}
            required
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

        {/* Terms note */}
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

      {/* Sign in link */}
      <Button asChild variant="outline" size="sm" className="w-full">
        <Link to="/auth/login">Sign in</Link>
      </Button>
    </AuthLayout>
  )
}
