import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PageShell } from '@/shared/components/layout/PageShell'
import { HomePage } from '@/features/products/pages/HomePage'
import { ProductDetailPage } from '@/features/products/pages/ProductDetailPage'
import { CartPage } from '@/features/cart/pages/CartPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { SignupPage } from '@/features/auth/pages/SignupPage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage'
import { NotFoundPage } from '@/app/pages/NotFoundPage'

const router = createBrowserRouter([
  {
    // Public shell: Navbar + Footer wrap all main pages
    path: '/',
    element: <PageShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
  {
    // Auth pages: full-screen layout (no Navbar/Footer)
    path: '/auth',
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
