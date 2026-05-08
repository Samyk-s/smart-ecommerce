import { ProductCard } from '@/features/products/components/ProductCard'
import { MOCK_PRODUCTS } from '@/features/products/data/mockProducts'

export function HomePage() {
  return (
    <main className="container mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All Products
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {MOCK_PRODUCTS.length} products available
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
