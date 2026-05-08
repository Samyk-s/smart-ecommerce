import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import { toast } from '@/shared/hooks/use-toast'
import { useAuthStore } from '@/shared/stores/authStore'
import { useCartStore } from '@/shared/stores/cartStore'
import type { Product } from '@/shared/types'

interface ProductCardProps {
  product: Product
  className?: string
  priority?: boolean
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const { id, name, price, originalPrice, images, category, rating, stock } = product
  const user = useAuthStore((state) => state.user)
  const addItem = useCartStore((state) => state.addItem)
  const location = useLocation()
  const navigate = useNavigate()

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null

  const isOutOfStock = stock === 0
  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in before adding products to your cart.',
      })
      navigate('/auth/login', {
        state: { from: `${location.pathname}${location.search}` },
      })
      return
    }

    addItem(product)
    toast({
      title: 'Added to cart',
      description: `${name} is now in your cart.`,
      variant: 'success',
    })
  }

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      {/* Product image */}
      <Link to={`/product/${id}`} className="relative block overflow-hidden">
        <div className="aspect-square bg-muted">
          {images[0] ? (
            <img
              src={images[0]}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={priority ? 'high' : 'auto'}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        <Badge variant="outline" className="w-fit capitalize text-xs">
          {category}
        </Badge>

        <Link
          to={`/product/${id}`}
          className="line-clamp-2 text-sm font-medium leading-snug text-foreground hover:underline hover:underline-offset-2"
        >
          {name}
        </Link>

        <div className="flex items-center gap-1.5">
          <StarRating value={rating.average} />
          <span className="text-xs text-muted-foreground">
            ({rating.count.toLocaleString()})
          </span>
        </div>

        {/* Price + Add to Cart */}
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-foreground">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            size="default"
            aria-label={`Add ${name} to cart`}
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="w-full bg-black text-white hover:bg-black/85"
          >
            <ShoppingCart />
            Add to cart
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
