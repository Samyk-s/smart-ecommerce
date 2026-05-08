import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { useCartStore } from '@/shared/stores/cartStore'
import type { CartItem } from '@/shared/types'

interface CartItemRowProps {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { removeItem, updateQuantity } = useCartStore()
  const { product, quantity } = item
  const lineTotal = (product.price * quantity).toFixed(2)

  return (
    <div className="flex gap-3 px-4 py-4 sm:gap-4">

      {/* Product image */}
      <Link to={`/product/${product.id}`} className="shrink-0" tabIndex={-1} aria-hidden>
        <div className="h-20 w-20 overflow-hidden rounded-lg bg-muted">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingCart className="size-7 text-muted-foreground opacity-30" />
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">

        {/* Row 1: name + remove */}
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${product.id}`}
            className="line-clamp-2 text-sm font-medium leading-snug text-foreground hover:underline hover:underline-offset-2"
          >
            {product.name}
          </Link>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Remove ${product.name} from cart`}
            onClick={() => removeItem(product.id)}
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </div>

        {/* Row 2: category + unit price */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="w-fit text-xs capitalize">
            {product.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            ${product.price.toFixed(2)} each
          </span>
        </div>

        {/* Row 3: quantity stepper + line total */}
        <div className="mt-auto flex items-center justify-between">

          {/* Quantity stepper */}
          <div
            className="flex items-center rounded-lg border"
            role="group"
            aria-label={`Quantity for ${product.name}`}
          >
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="rounded-r-none border-r"
            >
              <Minus />
            </Button>
            <span
              className="w-8 text-center text-sm font-medium tabular-nums"
              aria-live="polite"
              aria-atomic
            >
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="rounded-l-none border-l"
            >
              <Plus />
            </Button>
          </div>

          {/* Line total */}
          <span className="text-sm font-semibold tabular-nums text-foreground">
            ${lineTotal}
          </span>
        </div>
      </div>
    </div>
  )
}
