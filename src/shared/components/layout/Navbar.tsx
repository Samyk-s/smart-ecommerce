import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

// Cart count + auth state will be wired to Zustand stores in Phase 3 & 5
const CART_COUNT = 0
const IS_AUTHED = false

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          SmartShop
        </Link>

        {/* Nav links + actions */}
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            Home
          </NavLink>

          {/* Cart icon button with count badge */}
          <Link to="/cart" className="relative ml-1">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart />
              {CART_COUNT > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {CART_COUNT > 9 ? '9+' : CART_COUNT}
                </span>
              )}
            </Button>
          </Link>

          {/* Auth button — swapped for user menu in Phase 3 */}
          {IS_AUTHED ? (
            <Button variant="ghost" size="sm" className="ml-1">
              Sign out
            </Button>
          ) : (
            <Button asChild size="sm" className="ml-1">
              <Link to="/auth/login">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
