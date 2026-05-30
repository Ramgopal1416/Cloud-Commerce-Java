import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, User, Menu } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tighter uppercase">SHOPAI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
              New Arrivals
            </Link>
            <Link href="/products?featured=true" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Featured
            </Link>
            <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Collections
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              {user.role === 'admin' && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="font-serif italic tracking-wide">
                    Admin
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden md:block">
              <Button variant="ghost" className="font-serif italic tracking-wide">Sign In</Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
