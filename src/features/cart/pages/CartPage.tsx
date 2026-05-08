import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { EmptyState } from '@/shared/components/feedback/EmptyState'
import { Spinner } from '@/shared/components/feedback/Spinner'
import { useAuthStore } from '@/shared/stores/authStore'
import { useCartStore } from '@/shared/stores/cartStore'
import { CartItemRow } from '@/features/cart/components/CartItemRow'
import { CartSummary } from '@/features/cart/components/CartSummary'

export function CartPage() {
  const status = useAuthStore((state) => state.status)
  const items = useCartStore((state) => state.items)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'unauthenticated') {
      navigate('/auth/login', {
        replace: true,
        state: { from: `${location.pathname}${location.search}` },
      })
    }
  }, [location.pathname, location.search, navigate, status])

  if (status !== 'authenticated') {
    return (
      <main className="container mx-auto flex min-h-[50vh] items-center justify-center px-4 py-10">
        <Spinner />
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        /*
         * Two-column grid on desktop:
         *   - Left column (flexible): scrollable items list
         *   - Right column (fixed 320 px): sticky order summary
         */
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_320px]">

          {/* ── Items list ──────────────────────────────────────────────────── */}
          <div className="rounded-xl border bg-card divide-y">
            {items.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}
          </div>

          {/* ── Order summary (sticky on desktop) ────────────────────────────── */}
          <div className="lg:sticky lg:top-20">
            <CartSummary />
          </div>

        </div>
      )}
    </main>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <EmptyState
      icon={<ShoppingCart className="size-8 text-muted-foreground" />}
      title="Your cart is empty"
      description="Looks like you haven't added anything yet. Browse our products and find something you'll love."
      action={
        <Button asChild size="sm" className="mt-2">
          <Link to="/">Start shopping</Link>
        </Button>
      }
    />
  )
}
