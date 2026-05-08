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
      <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_34%,#fff7ed_100%)] px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto flex min-h-[50vh] max-w-5xl items-center justify-center">
        <Spinner />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_34%,#fff7ed_100%)] px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-[#075da4] via-[#2d8dcc] to-[#f7941d] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Your Cart
          </h1>
          <p className="mt-2 text-base font-medium text-muted-foreground">
            Review your selected products before checkout.
          </p>
        </div>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        /*
         * Two-column grid on desktop:
         *   - Left column (flexible): scrollable items list
         *   - Right column (fixed 320 px): sticky order summary
         */
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">

          {/* ── Items list ──────────────────────────────────────────────────── */}
          <div className="divide-y overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-950/5">
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
      </div>
    </main>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <EmptyState
      icon={<ShoppingCart className="size-10 text-[#075da4]" />}
      title="Your cart is empty"
      description="Looks like you haven't added anything yet. Browse our products and find something you'll love."
      action={
        <Button asChild size="lg" className="mt-2 bg-black text-base font-semibold text-white hover:bg-black/85">
          <Link to="/">Start shopping</Link>
        </Button>
      }
    />
  )
}
