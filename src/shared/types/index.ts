// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  displayName: string | null
  photoURL: string | null
  createdAt: string // ISO 8601 — maps directly to Firebase Timestamp.toDate().toISOString()
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  displayName: string
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface Rating {
  average: number // 0–5
  count: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number // present when product is on sale
  images: string[] // index 0 is the primary display image
  category: string
  rating: Rating
  stock: number
  tags: string[]
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

/**
 * CartItem stores a product snapshot, not just a productId.
 * This avoids a join at render time and keeps cart state self-contained.
 * The service layer handles syncing the snapshot when persisting to a backend.
 */
export interface CartItem {
  product: Product
  quantity: number
}
