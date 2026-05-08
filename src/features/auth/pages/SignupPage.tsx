import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { GoogleAuthButton } from '@/features/auth/components/GoogleAuthButton'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useAuthStore } from '@/shared/stores/authStore'

type PasswordStrength = 'weak' | 'normal' | 'strong'

const getPasswordChecks = (value: string) => ({
  length: value.length >= 8,
  uppercase: /[A-Z]/.test(value),
  lowercase: /[a-z]/.test(value),
  number: /\d/.test(value),
  special: /[^A-Za-z0-9]/.test(value),
})

const getPasswordStrength = (value: string): PasswordStrength => {
  const checks = Object.values(getPasswordChecks(value))
  const passed = checks.filter(Boolean).length

  if (passed >= 5) return 'strong'
  if (passed >= 3) return 'normal'
  return 'weak'
}

export function SignupPage() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  // Client-side validation errors (password mismatch, etc.)
  const [localError, setLocalError] = useState<string | null>(null)

  const { signup, loginWithGoogle, status, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  const isLoading = status === 'loading'
  const displayedError = localError ?? error
  const passwordChecks = getPasswordChecks(password)
  const passwordStrength = getPasswordStrength(password)
  const isPasswordValid = Object.values(passwordChecks).every(Boolean)

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

    if (!isPasswordValid) {
      setLocalError(
        'Password must include at least 8 characters, uppercase, lowercase, number, and special character.'
      )
      return
    }

    await signup({ email, password, displayName })
  }

  const handleGoogleSignup = async () => {
    await loginWithGoogle()
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start shopping with SmartShop today"
    >
      <GoogleAuthButton isLoading={isLoading} onClick={handleGoogleSignup} />

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 font-medium text-muted-foreground">
            Or create account with email
          </span>
        </div>
      </div>

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
              placeholder="Example@123"
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
          {password && (
            <PasswordStrengthMeter
              strength={passwordStrength}
              checks={passwordChecks}
            />
          )}
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
        <Button type="submit" className="mt-1 h-11 w-full text-base font-semibold" disabled={isLoading} size="lg">
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
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 font-medium text-muted-foreground">
            Already have an account?
          </span>
        </div>
      </div>

      <Button asChild variant="outline" size="lg" className="h-11 w-full text-base font-semibold">
        <Link to="/auth/login">Sign in</Link>
      </Button>
    </AuthLayout>
  )
}

interface PasswordStrengthMeterProps {
  strength: PasswordStrength
  checks: ReturnType<typeof getPasswordChecks>
}

function PasswordStrengthMeter({ strength, checks }: PasswordStrengthMeterProps) {
  const strengthMeta = {
    weak: {
      label: 'Weak',
      bar: 'bg-red-500',
      text: 'text-red-600',
      width: 'w-1/3',
    },
    normal: {
      label: 'Normal',
      bar: 'bg-[#f7941d]',
      text: 'text-[#b85f00]',
      width: 'w-2/3',
    },
    strong: {
      label: 'Strong',
      bar: 'bg-[#075da4]',
      text: 'text-[#075da4]',
      width: 'w-full',
    },
  }[strength]

  const rules = [
    { label: '8+ characters', passed: checks.length },
    { label: 'uppercase', passed: checks.uppercase },
    { label: 'lowercase', passed: checks.lowercase },
    { label: 'number', passed: checks.number },
    { label: 'special character', passed: checks.special },
  ]

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-3">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold">
        <span className="text-muted-foreground">Password strength</span>
        <span className={strengthMeta.text}>{strengthMeta.label}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200">
        <div className={`h-full rounded-full ${strengthMeta.width} ${strengthMeta.bar}`} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {rules.map((rule) => (
          <span
            key={rule.label}
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              rule.passed
                ? 'bg-blue-50 text-[#075da4]'
                : 'bg-white text-muted-foreground'
            }`}
          >
            {rule.label}
          </span>
        ))}
      </div>
    </div>
  )
}
