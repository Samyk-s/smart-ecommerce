import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useCartStore } from '@/shared/stores/cartStore'
import { MOCK_PRODUCTS } from '@/features/products/data/mockProducts'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const addItem = useCartStore((state) => state.addItem)
  const product = MOCK_PRODUCTS.find((item) => item.id === id)

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold text-foreground">Product not found</h1>
          <p className="text-sm text-muted-foreground">
            The product you are looking for is not available.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft />
              Back to products
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null
  const isOutOfStock = product.stock === 0

  return (
    <main className="container mx-auto px-4 py-10">
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/">
          <ArrowLeft />
          Back to products
        </Link>
      </Button>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,460px)]">
        <div className="overflow-hidden rounded-xl border bg-muted">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="aspect-square h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center text-muted-foreground">
              <ShoppingCart className="size-16 opacity-20" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{product.category}</Badge>
            {discount !== null && discount > 0 && (
              <Badge variant="destructive">-{discount}%</Badge>
            )}
            {isOutOfStock && <Badge variant="secondary">Out of stock</Badge>}
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <StarRating value={product.rating.average} />
              <span className="text-sm text-muted-foreground">
                {product.rating.average.toFixed(1)} ({product.rating.count.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          <p className="text-base leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} in stock` : 'Currently unavailable'}
          </div>

          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            size="lg"
            disabled={isOutOfStock}
            onClick={() => addItem(product)}
            className="mt-2 w-full sm:w-fit"
          >
            <ShoppingCart />
            Add to cart
          </Button>
        </div>
      </section>
    </main>
  )
}

interface StarRatingProps {
  value: number
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
              'size-4',
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
