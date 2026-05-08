import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-lg text-gray-500">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        Back to Home
      </Link>
    </div>
  )
}
