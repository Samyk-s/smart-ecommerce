import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_32%),linear-gradient(135deg,#f8fafc_0%,#ecfeff_45%,#fff7ed_100%)] px-4 py-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.section
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="hidden lg:block"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-zinc-950"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/15">
              <ShoppingBag className="size-5" />
            </span>
            SmartShop
          </Link>

          <div className="mt-14 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5, ease: 'easeOut' }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur"
            >
              <Sparkles className="size-4" />
              Curated shopping, faster checkout
            </motion.div>

            <h1 className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-emerald-600 bg-clip-text text-6xl font-extrabold leading-tight tracking-tight text-transparent">
              Sign in and keep your cart close.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600">
              Access your saved cart, continue shopping, and move through checkout with a cleaner SmartShop experience.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.55, ease: 'easeOut' }}
            className="mt-12 grid max-w-lg grid-cols-2 gap-4"
          >
            <div className="rounded-2xl border border-white/70 bg-white/75 p-5 shadow-lg shadow-zinc-950/5 backdrop-blur">
              <ShieldCheck className="mb-4 size-7 text-emerald-600" />
              <p className="text-sm font-semibold text-zinc-950">Secure access</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Firebase auth keeps account flows simple and reliable.
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-zinc-950 p-5 text-white shadow-lg shadow-zinc-950/15">
              <ShoppingBag className="mb-4 size-7 text-emerald-300" />
              <p className="text-sm font-semibold">Cart ready</p>
              <p className="mt-1 text-sm leading-6 text-white/70">
                Sign in to add items and keep shopping without losing context.
              </p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 26, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto w-full max-w-md"
        >
          <Link
            to="/"
            className="mx-auto mb-8 flex w-fit items-center gap-2 text-lg font-extrabold tracking-tight text-zinc-950 lg:hidden"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/15">
              <ShoppingBag className="size-5" />
            </span>
            SmartShop
          </Link>

          <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-2xl shadow-zinc-950/10 backdrop-blur-xl sm:p-8">
            <div className="mb-7 text-center">
              <motion.div
                initial={{ rotate: -8, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
                className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-950 to-emerald-600 text-white shadow-lg shadow-emerald-900/20"
              >
                <ShoppingBag className="size-7" />
              </motion.div>
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm leading-6 text-zinc-500">{subtitle}</p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.4, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
