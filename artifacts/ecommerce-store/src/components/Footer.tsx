import { ArrowUpRight, Instagram, Mail, Pin, Sparkles } from "lucide-react";
import { Link } from "wouter";

const footerLinks = [
  { href: "/products", label: "Shop the edit" },
  { href: "/collections", label: "Collections" },
  { href: "/chat", label: "Ask ShopAI" },
  { href: "/about", label: "Our point of view" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-accent text-accent-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-8 md:py-20">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2" data-testid="link-footer-logo">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-foreground/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-serif text-2xl tracking-[-0.04em]">ShopAI</span>
          </Link>
          <p className="mt-7 font-serif text-3xl leading-[1.08] md:text-4xl">
            Less searching.
            <br />
            More finding.
          </p>
          <p className="mt-5 text-sm leading-6 text-accent-foreground/65">
            A considered edit of useful, beautiful things — with an intelligent
            companion for every decision.
          </p>
        </div>
        <div>
          <p className="editorial-kicker text-accent-foreground/50">Explore</p>
          <div className="mt-5 grid gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-footer-${link.label.toLowerCase().replaceAll(" ", "-")}`}
                className="group inline-flex w-fit items-center gap-1 text-sm text-accent-foreground/80 transition-colors hover:text-accent-foreground"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="editorial-kicker text-accent-foreground/50">Keep in touch</p>
          <div className="mt-5 space-y-4 text-sm text-accent-foreground/80">
            <a href="mailto:hello@shopai.com" className="flex items-center gap-3 hover:text-accent-foreground" data-testid="link-footer-email">
              <Mail className="h-4 w-4" />
              hello@shopai.com
            </a>
            <p className="flex items-center gap-3">
              <Pin className="h-4 w-4" />
              New York · London · Everywhere
            </p>
            <a href="https://instagram.com" className="flex items-center gap-3 hover:text-accent-foreground" data-testid="link-footer-instagram">
              <Instagram className="h-4 w-4" />
              @shopai
            </a>
          </div>
          <Link href="/contact" className="mt-8 inline-flex border-b border-accent-foreground/40 pb-1 text-xs uppercase tracking-[0.2em] hover:border-accent-foreground" data-testid="link-footer-talk">
            Talk to our team
          </Link>
        </div>
      </div>
      <div className="border-t border-accent-foreground/15 px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-accent-foreground/45 sm:flex-row">
          <span>© {new Date().getFullYear()} ShopAI</span>
          <span>Intelligent commerce, human taste.</span>
        </div>
      </div>
    </footer>
  );
}