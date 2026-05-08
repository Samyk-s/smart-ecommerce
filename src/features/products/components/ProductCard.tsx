import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Star, TrendingUp } from 'lucide-react'
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
        'group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white text-card-foreground shadow-sm shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/10',
        className
      )}
    >
      {/* Product image */}
      <Link to={`/product/${id}`} className="relative block overflow-hidden">
        <div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-emerald-50">
          {images[0] ? (
            <img
              src={images[0]}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          <Badge className="absolute left-3 top-3 border-red-200 bg-red-50 text-red-700 shadow-sm" variant="destructive">
            -{discount}%
          </Badge>
        )}

        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          {rating.average.toFixed(1)}
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Badge variant="secondary" className="text-xs">Out of stock</Badge>
          </div>
        )}
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="w-fit border-emerald-200 bg-emerald-50/80 capitalize text-xs text-emerald-700">
            {category}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <TrendingUp className="size-3" />
            {stock > 0 ? `${stock} left` : 'Sold out'}
          </span>
        </div>

        <Link
          to={`/product/${id}`}
          className="line-clamp-2 min-h-10 text-base font-bold leading-snug text-foreground transition-colors hover:text-emerald-700"
        >
          {name}
        </Link>

        <div className="flex items-center gap-1.5 rounded-full bg-zinc-50 px-2.5 py-1.5">
          <StarRating value={rating.average} />
          <span className="text-xs text-muted-foreground">
            {rating.count.toLocaleString()} reviews
          </span>
        </div>

        {/* Price + Add to Cart */}
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold tracking-tight text-foreground">
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
            className="h-10 w-full rounded-xl bg-black text-sm font-semibold text-white shadow-sm shadow-zinc-950/15 hover:bg-black/85"
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
