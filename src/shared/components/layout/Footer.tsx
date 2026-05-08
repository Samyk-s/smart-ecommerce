import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm font-semibold text-foreground">SmartShop</span>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
            <Link to="/cart" className="transition-colors hover:text-foreground">Cart</Link>
            <Link to="/auth/login" className="transition-colors hover:text-foreground">Sign in</Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SmartShop
          </p>
        </div>
      </div>
    </footer>
  )
}
