import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      {/* Logo / brand link */}
      <Link
        to="/"
        className="mb-8 text-xl font-bold tracking-tight text-foreground"
      >
        SmartShop
      </Link>

      {/* Card container */}
      <div className="w-full max-w-sm">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Form card */}
        <div className="rounded-xl border bg-card p-6 shadow-sm ring-1 ring-foreground/5">
          {children}
        </div>
      </div>
    </div>
  )
}
