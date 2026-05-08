import { useParams } from 'react-router-dom'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Product</h1>
      <p className="text-sm text-gray-500">
        Product detail for id: <span className="font-mono">{id}</span> — Phase 4 implementation
      </p>
    </main>
  )
}
