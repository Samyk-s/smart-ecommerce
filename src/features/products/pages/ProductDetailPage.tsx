import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  ShoppingCart,
  Star,
  Tag,
} from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { toast } from '@/shared/hooks/use-toast'
import { useAuthStore } from '@/shared/stores/authStore'
import { useCartStore } from '@/shared/stores/cartStore'
import { MOCK_PRODUCTS } from '@/features/products/data/mockProducts'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const user = useAuthStore((state) => state.user)
  const addItem = useCartStore((state) => state.addItem)
  const location = useLocation()
  const navigate = useNavigate()
  const product = MOCK_PRODUCTS.find((item) => item.id === id)

  if (!product) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_34%,#fff7ed_100%)] px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Product not found
          </h1>
          <p className="text-base text-muted-foreground">
            The product you are looking for is not available.
          </p>
          <Button asChild className="bg-black text-white hover:bg-black/85">
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
      description: `${product.name} is now in your cart.`,
      variant: 'success',
    })
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_34%,#fff7ed_100%)] px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-5xl">
        <Button asChild variant="ghost" className="mb-8 text-base font-semibold">
          <Link to="/">
            <ArrowLeft />
            Back to products
          </Link>
        </Button>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,460px)]">
          <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-3 shadow-xl shadow-zinc-950/8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-orange-50">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center text-muted-foreground">
                  <ShoppingCart className="size-16 opacity-20" />
                </div>
              )}

              {discount !== null && discount > 0 && (
                <Badge
                  className="absolute left-4 top-4 border-red-200 bg-red-50 text-red-700 shadow-sm"
                  variant="destructive"
                >
                  -{discount}% off
                </Badge>
              )}

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {product.rating.average.toFixed(1)} rating
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-6 shadow-xl shadow-zinc-950/8 backdrop-blur sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-[#2d8dcc]/25 bg-blue-50 text-[#075da4]">
                {product.category}
              </Badge>
              {isOutOfStock ? (
                <Badge variant="secondary">Out of stock</Badge>
              ) : (
                <Badge variant="secondary" className="bg-zinc-100 text-zinc-700">
                  <PackageCheck />
                  {product.stock} in stock
                </Badge>
              )}
            </div>

            <div className="mt-5">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                {product.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-2">
                  <StarRating value={product.rating.average} />
                  <span className="text-sm font-medium text-muted-foreground">
                    {product.rating.average.toFixed(1)} ({product.rating.count.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-base leading-7 text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm font-medium text-[#075da4]">
                <CheckCircle2 className="size-4" />
                Free shipping on this product
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-blue-50 text-[#075da4]">
                  <Tag />
                  {tag}
                </Badge>
              ))}
            </div>

            <Button
              size="lg"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="mt-8 h-12 w-full rounded-xl bg-black text-base font-semibold text-white shadow-lg shadow-zinc-950/15 hover:bg-black/85"
            >
              <ShoppingCart />
              Add to cart
            </Button>

            {!user && (
              <p className="mt-3 text-center text-sm text-muted-foreground">
                You will be asked to sign in before adding this item.
              </p>
            )}
          </div>
        </section>
      </div>
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
