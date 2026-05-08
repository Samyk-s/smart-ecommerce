import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Search, ShoppingBag } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

export function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-10 text-foreground">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blue-50 to-transparent" />

      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center justify-center gap-10 text-center">
        <div className="relative h-56 w-72 sm:h-64 sm:w-96" aria-hidden="true">
          <div className="absolute left-1/2 top-8 h-36 w-44 -translate-x-1/2 rotate-[-6deg] rounded-2xl border border-zinc-200 bg-white shadow-lg" />
          <div className="absolute left-1/2 top-3 h-36 w-44 -translate-x-[38%] rotate-[7deg] rounded-2xl border border-zinc-200 bg-zinc-950 shadow-xl" />
          <div className="absolute left-1/2 top-10 flex h-28 w-28 -translate-x-1/2 items-center justify-center rounded-full border border-[#2d8dcc]/20 bg-blue-50 shadow-sm">
            <ShoppingBag className="size-12 text-[#075da4]" />
          </div>
          <div className="absolute bottom-8 left-6 flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow-md">
            <Search className="size-6 text-zinc-500" />
          </div>
          <div className="absolute bottom-5 right-8 rounded-full border bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-md">
            Lost aisle
          </div>
          <div className="absolute bottom-0 left-1/2 h-3 w-56 -translate-x-1/2 rounded-full bg-zinc-200/70 blur-sm" />
        </div>

        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#075da4]">
            Error 404
          </p>
          <h1 className="bg-gradient-to-r from-[#075da4] via-[#2d8dcc] to-[#f7941d] bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl">
            Page not found
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            This shelf is empty. The page may have moved, expired, or never made it into the store.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-black text-white hover:bg-black/85">
            <Link to="/">
              <Home />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/cart">
              <ArrowLeft />
              View cart
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
