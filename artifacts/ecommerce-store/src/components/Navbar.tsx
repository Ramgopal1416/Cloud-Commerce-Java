import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, User, Menu, X, Sparkles, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      data-testid={`link-nav-${label.toLowerCase().replaceAll(" ", "-")}`}
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
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-[4.5rem] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2" data-testid="link-nav-logo">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="font-serif text-2xl tracking-[-0.05em]">ShopAI</span>
          </Link>
          <nav className="hidden items-center gap-5 xl:flex">
            {navLink("/products?sort=newest", "New Arrivals")}
            {navLink("/products?featured=true", "Featured")}
            {navLink("/collections", "Collections")}
            {navLink("/about", "About")}
            {navLink("/services", "Services")}
            {navLink("/features", "Features")}
            {navLink("/testimonials", "Stories")}
            {navLink("/contact", "Contact")}
          </nav>
        </div>

        <div className="flex items-center gap-4">
           <Link href="/products" data-testid="link-nav-search">
             <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>

           <Link href="/cart" data-testid="link-nav-cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-4">
               <Link href="/account" data-testid="link-nav-account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" data-testid="link-nav-admin">
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
                data-testid="button-nav-sign-out"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block" data-testid="link-nav-sign-in">
              <Button variant="ghost" className="font-serif italic tracking-wide">Sign In</Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            data-testid="button-nav-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-border/70 bg-background px-5 py-5 md:hidden">
          <nav className="grid gap-4">
            {[
              ["/products?sort=newest", "New arrivals"],
              ["/products?featured=true", "Featured"],
              ["/collections", "Collections"],
              ["/about", "About ShopAI"],
              ["/services", "Services"],
              ["/features", "Why ShopAI"],
              ["/testimonials", "Stories"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                data-testid={`link-mobile-${label.toLowerCase().replaceAll(" ", "-")}`}
                className="flex items-center justify-between border-b border-border/60 pb-3 text-sm"
              >
                {label}
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
