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
    <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-950/5">
      <h2 className="mb-5 text-xl font-extrabold tracking-tight text-foreground">Order Summary</h2>

      {/* Line items */}
      <dl className="flex flex-col gap-3 text-base">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">
            Subtotal
            <span className="ml-1 text-sm">
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          </dt>
          <dd className="font-semibold tabular-nums text-foreground">
            ${subtotal.toFixed(2)}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-semibold text-[#075da4]">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </dd>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t pt-3">
          <dt className="font-semibold text-foreground">Total</dt>
          <dd className="text-xl font-extrabold tabular-nums text-foreground">
            ${total.toFixed(2)}
          </dd>
        </div>
      </dl>

      {/* Checkout CTA */}
      <Button className="mt-6 h-11 w-full gap-2 bg-black text-base font-semibold text-white hover:bg-black/85" size="lg">
        <ShoppingBag />
        Proceed to Checkout
      </Button>

      {/* Secondary actions */}
      <Button
        variant="ghost"
        size="lg"
        className="mt-2 h-11 w-full text-base text-muted-foreground hover:text-destructive"
        onClick={clearCart}
      >
        Clear cart
      </Button>

      <div className="mt-4 border-t pt-4 text-center">
        <Link
          to="/"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Continue shopping
        </Link>
      </div>
    </div>
  )
}
