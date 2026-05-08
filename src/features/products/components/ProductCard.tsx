import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import type { Product } from '@/shared/types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  className?: string
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const { id, name, price, originalPrice, images, category, rating, stock } = product

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null

  const isOutOfStock = stock === 0

  return (
    <article
      className={cn(
        'group flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      {/* Product image */}
      <Link to={`/product/${id}`} className="relative block overflow-hidden rounded-t-xl">
        <div className="aspect-square bg-muted">
          {images[0] ? (
            <img
              src={images[0]}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ShoppingCart className="size-12 opacity-20" />
            </div>
          )}
        </div>

        {/* Discount badge */}
        {discount !== null && discount > 0 && (
          <Badge className="absolute left-2 top-2" variant="destructive">
            -{discount}%
          </Badge>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Badge variant="secondary" className="text-xs">Out of stock</Badge>
          </div>
        )}
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-3">
        {/* Category */}
        <Badge variant="outline" className="w-fit capitalize text-xs">
          {category}
        </Badge>

        {/* Name */}
        <Link
          to={`/product/${id}`}
          className="line-clamp-2 text-sm font-medium leading-snug text-foreground hover:underline hover:underline-offset-2"
        >
          {name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating value={rating.average} />
          <span className="text-xs text-muted-foreground">
            ({rating.count.toLocaleString()})
          </span>
        </div>

        {/* Price row */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-foreground">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            size="icon"
            variant="outline"
            aria-label={`Add ${name} to cart`}
            disabled={isOutOfStock}
            onClick={() => onAddToCart?.(product)}
            className="shrink-0"
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </article>
  )
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

interface StarRatingProps {
  value: number // 0–5
  max?: number
}

function StarRating({ value, max = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(value)
        const half = !filled && i < value
        return (
          <Star
            key={i}
            className={cn(
              'size-3',
              filled
                ? 'fill-amber-400 text-amber-400'
                : half
                  ? 'fill-amber-200 text-amber-400'
                  : 'fill-none text-muted-foreground/40'
            )}
          />
        )
      })}
    </div>
  )
}
