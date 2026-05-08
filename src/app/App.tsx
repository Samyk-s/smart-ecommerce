import { Analytics } from '@vercel/analytics/react'
import { AppProviders } from '@/app/providers/AppProviders'
import { AppRouter } from '@/app/Router'

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
      <Analytics />
    </AppProviders>
  )
}
