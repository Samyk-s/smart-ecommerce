import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
} from '@/shared/stores/cartStore'

export function CartSummary() {
  const totalItems = useCartStore(selectTotalItems)
  const subtotal = useCartStore(selectTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)

  // Shipping is free — swap this with real shipping logic when backend is added
  const shipping: number = 0
  const total = subtotal + shipping

  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="mb-4 text-base font-semibold text-foreground">Order Summary</h2>

      {/* Line items */}
      <dl className="flex flex-col gap-2.5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">
            Subtotal
            <span className="ml-1 text-xs">
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          </dt>
          <dd className="font-medium tabular-nums text-foreground">
            ${subtotal.toFixed(2)}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-medium text-green-600 dark:text-green-400">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </dd>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t pt-3">
          <dt className="font-semibold text-foreground">Total</dt>
          <dd className="text-base font-bold tabular-nums text-foreground">
            ${total.toFixed(2)}
          </dd>
        </div>
      </dl>

      {/* Checkout CTA */}
      <Button className="mt-5 w-full gap-2" size="sm">
        <ShoppingBag />
        Proceed to Checkout
      </Button>

      {/* Secondary actions */}
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 w-full text-muted-foreground hover:text-destructive"
        onClick={clearCart}
      >
        Clear cart
      </Button>

      <div className="mt-4 border-t pt-4 text-center">
        <Link
          to="/"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Continue shopping
        </Link>
      </div>
    </div>
  )
}
