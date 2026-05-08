import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fbff_0%,#eef8ff_48%,#fff7ed_100%)] px-4 py-8">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-[#075da4]/10 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="relative hidden min-h-full overflow-hidden lg:block">
          <img
            src="/images/loginbg.jpg"
            alt="Customer shopping online"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-12 text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles className="size-4 text-[#f7941d]" />
              Smart shopping experience
            </div>
            <h2 className="max-w-lg text-5xl font-extrabold leading-tight tracking-tight">
              Start your journey now
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-white/80">
              Sign in to save your cart, continue shopping, and move faster through checkout.
            </p>
          </div>
        </div>

        <div className="flex flex-col px-6 py-6 sm:px-10 lg:px-12">
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              aria-label="Back to home"
              className="flex size-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-[#2d8dcc]/40 hover:text-[#075da4]"
            >
              <ArrowLeft className="size-4" />
            </Link>

            <Link
              to="/"
              className="text-lg font-extrabold tracking-tight text-[#075da4]"
            >
              Smart Ecommerce
            </Link>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.42, ease: 'easeOut' }}
              className="mb-7"
            >
              <div className="mb-4 flex size-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075da4] to-[#f7941d] text-white shadow-lg shadow-[#075da4]/20">
                <ShoppingBag className="size-6" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-3 text-base leading-7 text-zinc-500">
                  {subtitle}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.42, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
