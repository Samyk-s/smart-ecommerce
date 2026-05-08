import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export function ForgotPasswordPage() {
  // Will be wired to authStore in Phase 3
  const isLoading = false
  const isSuccess = false

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we'll send you a reset link"
    >
      {isSuccess ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <span className="text-xl">✓</span>
          </div>
          <p className="text-sm text-muted-foreground">
            If an account exists for that email, a reset link has been sent.
          </p>
          <Button asChild variant="ghost" size="sm" className="mt-2">
            <Link to="/auth/login">Back to sign in</Link>
          </Button>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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

          <Button type="submit" className="mt-1 w-full" disabled={isLoading} size="sm">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Sending…
              </>
            ) : (
              'Send reset link'
            )}
          </Button>

          <Button asChild variant="ghost" size="sm" className="w-full">
            <Link to="/auth/login">Back to sign in</Link>
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
