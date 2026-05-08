import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogOut, ShoppingCart } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useAuthStore } from '@/shared/stores/authStore'
import { useCartStore, selectTotalItems } from '@/shared/stores/cartStore'

export function Navbar() {
  const { user, logout } = useAuthStore()
  const rawCartCount = useCartStore(selectTotalItems)
  const clearCart = useCartStore((state) => state.clearCart)
  const cartCount = user ? rawCartCount : 0
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    clearCart()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 shadow-sm shadow-zinc-950/5 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-5">

        {/* Brand */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-foreground">
          SmartShop
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'rounded-lg px-4 py-2 text-base font-semibold transition-colors',
                isActive
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            Home
          </NavLink>

          {/* Cart icon — badge shows real count from cartStore */}
          <Link to={user ? '/cart' : '/auth/login'} className="relative ml-1">
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Auth — shows user name + logout when authenticated */}
          {user ? (
            <div className="ml-1 flex items-center gap-2">
              <span className="hidden max-w-36 truncate text-base font-medium text-muted-foreground sm:block">
                {user.displayName ?? user.email}
              </span>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Sign out"
                onClick={handleLogout}
              >
                <LogOut className="size-5" />
              </Button>
            </div>
          ) : (
            <Button asChild size="lg" className="ml-1 h-10 px-4 text-base font-semibold">
              <Link to="/auth/login">Sign in</Link>
            </Button>
          )}
        </nav>

      </div>
    </header>
  )
}
