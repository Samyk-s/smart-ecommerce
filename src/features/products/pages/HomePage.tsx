import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/features/products/components/ProductCard'
import { MOCK_PRODUCTS } from '@/features/products/data/mockProducts'
import { Button } from '@/shared/components/ui/button'

const PRODUCTS_PER_PAGE = 6
type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating-high'

export function HomePage() {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const sortedProducts = useMemo(() => {
    const products = [...MOCK_PRODUCTS]

    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price)
      case 'price-high':
        return products.sort((a, b) => b.price - a.price)
      case 'rating-high':
        return products.sort((a, b) => b.rating.average - a.rating.average)
      default:
        return products
    }
  }, [sortBy])

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)

  const visibleProducts = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE)
  }, [page, sortedProducts])

  const goToPage = (nextPage: number) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortOption)
    setPage(1)
  }

  return (
    <main className="container mx-auto px-6 py-10 sm:px-8 lg:px-12 xl:px-16">
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-emerald-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            All Products
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-muted-foreground">
            Showing {visibleProducts.length} of {MOCK_PRODUCTS.length} products
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="h-8 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating-high">Rating: high to low</option>
            </select>
          </label>

          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
            compact
          />
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={goToPage}
        className="mt-8 justify-center"
      />
    </main>
  )
}

interface PaginationControlsProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  compact?: boolean
  className?: string
}

function PaginationControls({
  page,
  totalPages,
  onPageChange,
  compact = false,
  className,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav
      className={`flex flex-wrap items-center gap-2 ${className ?? ''}`}
      aria-label={compact ? 'Top product pagination' : 'Product pagination'}
    >
      <Button
        variant="outline"
        size={compact ? 'icon' : 'default'}
        disabled={page === 1}
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft />
        {!compact && 'Previous'}
      </Button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1

        return compact ? null : (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? 'default' : 'outline'}
            size="icon"
            aria-label={`Go to page ${pageNumber}`}
            aria-current={pageNumber === page ? 'page' : undefined}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size={compact ? 'icon' : 'default'}
        disabled={page === totalPages}
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
      >
        {!compact && 'Next'}
        <ChevronRight />
      </Button>
    </nav>
  )
}
