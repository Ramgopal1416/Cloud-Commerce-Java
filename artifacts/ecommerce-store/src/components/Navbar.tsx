import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, User, Menu } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`transition-colors hover:text-foreground text-sm font-medium ${
        location === href || location.startsWith(href + "?")
          ? "text-foreground"
          : "text-foreground/60"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tighter uppercase">SHOPAI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLink("/products?sort=newest", "New Arrivals")}
            {navLink("/products?featured=true", "Featured")}
            {navLink("/products?view=collections", "Collections")}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/products">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>

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
              {user.role === "ADMIN" && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="font-serif italic tracking-wide">
                    Admin
                  </Button>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground text-xs tracking-widest uppercase"
                onClick={logout}
              >
                Sign Out
              </Button>
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
