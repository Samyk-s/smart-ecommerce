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
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">

        {/* Brand */}
        <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
          SmartShop
        </Link>

        {/* Nav */}
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

          {/* Cart icon — badge shows real count from cartStore */}
          <Link to={user ? '/cart' : '/auth/login'} className="relative ml-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Auth — shows user name + logout when authenticated */}
          {user ? (
            <div className="ml-1 flex items-center gap-2">
              <span className="hidden max-w-30 truncate text-sm text-muted-foreground sm:block">
                {user.displayName ?? user.email}
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Sign out"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
              </Button>
            </div>
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
