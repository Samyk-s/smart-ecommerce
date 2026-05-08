import type { Product } from '@/shared/types'

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Noise-Cancelling Headphones',
    description:
      'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 79.99,
    originalPrice: 129.99,
    images: [],
    category: 'Electronics',
    rating: { average: 4.5, count: 2341 },
    stock: 18,
    tags: ['wireless', 'audio', 'noise-cancelling'],
  },
  {
    id: 'p2',
    name: 'Lightweight Running Shoes',
    description:
      'Breathable mesh upper with responsive foam cushioning for everyday runs.',
    price: 89.99,
    images: [],
    category: 'Footwear',
    rating: { average: 4.3, count: 876 },
    stock: 42,
    tags: ['running', 'sport', 'shoes'],
  },
  {
    id: 'p3',
    name: 'Insulated Stainless Steel Water Bottle',
    description:
      'Double-wall vacuum insulation keeps drinks cold 24 hrs or hot 12 hrs.',
    price: 24.99,
    originalPrice: 34.99,
    images: [],
    category: 'Sports',
    rating: { average: 4.7, count: 5120 },
    stock: 95,
    tags: ['hydration', 'eco', 'sport'],
  },
  {
    id: 'p4',
    name: 'Mechanical Gaming Keyboard',
    description:
      'Compact TKL layout with tactile switches, RGB backlighting, and USB-C connectivity.',
    price: 149.99,
    images: [],
    category: 'Electronics',
    rating: { average: 4.6, count: 1432 },
    stock: 7,
    tags: ['gaming', 'keyboard', 'mechanical'],
  },
  {
    id: 'p5',
    name: 'Canvas Roll-Top Backpack',
    description:
      '30 L waxed canvas backpack with padded laptop sleeve and waterproof roll-top closure.',
    price: 59.99,
    images: [],
    category: 'Accessories',
    rating: { average: 4.4, count: 632 },
    stock: 23,
    tags: ['travel', 'backpack', 'canvas'],
  },
  {
    id: 'p6',
    name: 'Smart Fitness Watch',
    description:
      'Tracks heart rate, sleep, steps, and GPS routes. 7-day battery. Water-resistant 5 ATM.',
    price: 199.99,
    originalPrice: 249.99,
    images: [],
    category: 'Electronics',
    rating: { average: 4.2, count: 3087 },
    stock: 12,
    tags: ['fitness', 'smartwatch', 'gps'],
  },
  {
    id: 'p7',
    name: 'Bamboo Cutting Board Set',
    description:
      'Set of 3 organic bamboo boards with juice groove, hanging hole, and non-slip feet.',
    price: 34.99,
    images: [],
    category: 'Kitchen',
    rating: { average: 4.8, count: 4210 },
    stock: 60,
    tags: ['kitchen', 'eco', 'bamboo'],
  },
  {
    id: 'p8',
    name: 'Merino Wool Crew Neck Sweater',
    description:
      'Extra-fine 100% Merino wool. Naturally temperature-regulating and itch-free.',
    price: 74.99,
    originalPrice: 99.99,
    images: [],
    category: 'Clothing',
    rating: { average: 4.5, count: 958 },
    stock: 0,
    tags: ['wool', 'sweater', 'winter'],
  },
]
