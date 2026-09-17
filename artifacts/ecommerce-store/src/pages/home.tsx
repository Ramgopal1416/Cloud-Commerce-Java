import { ArrowDown, ArrowRight, Check, MessageCircle, Sparkles, Star } from "lucide-react";
import { Link } from "wouter";
import { useListProducts } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

const studioImage = "/store/attached_assets/generated_images/shopai-curation-studio.png";
const stillLifeImage = "/store/attached_assets/generated_images/shopai-editorial-still-life.png";

export default function Home() {
  const { data: productsData, isLoading, isError } = useListProducts({ limit: 4, featured: true });
  const featured = productsData?.items ?? [];

  return (
    <div className="w-full overflow-hidden">
      <section className="relative border-b border-border/70 bg-secondary">
        <div className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-20">
          <div className="relative z-10 max-w-xl">
            <div className="reveal inline-flex items-center gap-2 text-primary">
              <span className="h-px w-9 bg-primary" />
              <span className="editorial-kicker">A better way to browse</span>
            </div>
            <h1 className="reveal reveal-delay-1 mt-7 max-w-lg font-serif text-6xl leading-[0.9] tracking-[-0.06em] text-foreground sm:text-7xl md:text-[6.7rem]">
              Good taste,
              <br />
              <span className="italic text-primary">with a point.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-md text-base leading-7 text-muted-foreground md:text-lg">
              ShopAI edits the endless into the essential. Tell us what you need,
              and we will make the next choice feel easy.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-none px-7 uppercase tracking-[0.14em]">
                <Link href="/products" data-testid="link-home-shop-edit">
                  Shop the edit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-none border-foreground/30 px-7 uppercase tracking-[0.14em]">
                <Link href="/chat" data-testid="link-home-ask-assistant">
                  <MessageCircle className="h-4 w-4" /> Ask ShopAI
                </Link>
              </Button>
            </div>
            <div className="reveal reveal-delay-3 mt-12 flex flex-wrap gap-x-7 gap-y-3 text-xs text-muted-foreground">
              {["Personalized picks", "Human-approved", "Easy returns"].map((item) => (
                <span key={item} className="flex items-center gap-2" data-testid={`text-home-promise-${item.toLowerCase().replaceAll(" ", "-")}`}>
                  <Check className="h-3.5 w-3.5 text-primary" /> {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl md:justify-self-end">
            <div className="absolute -left-8 top-10 h-40 w-40 rounded-full border border-primary/30 md:-left-14 md:h-56 md:w-56" />
            <div className="relative aspect-[0.87] overflow-hidden bg-muted">
              <img src={stillLifeImage} alt="A considered edit of objects in warm light" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.03]" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/30 pt-4 text-white">
                <span className="editorial-kicker text-white/75">The ShopAI edit · 01</span>
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="absolute -bottom-5 -right-3 hidden w-40 bg-primary p-5 text-primary-foreground sm:block md:-right-8">
              <p className="font-serif text-3xl leading-none">01</p>
              <p className="mt-3 text-[0.65rem] uppercase leading-4 tracking-[0.16em]">Thoughtful objects, fewer tabs.</p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 pb-6 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground md:px-8">
          <ArrowDown className="h-3.5 w-3.5" /> Scroll to explore
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <div>
            <p className="editorial-kicker text-primary">The point of view</p>
            <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight tracking-[-0.04em] md:text-5xl">
              Not more choice.
              <br />
              <span className="italic text-primary">Better choice.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground md:justify-self-end">
            Great shopping is not a scavenger hunt. ShopAI combines the context
            of a personal stylist with the range of a modern store, so every
            recommendation has a reason behind it.
          </p>
        </div>
        <div className="mt-14 grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
          {[
            ["01", "Ask naturally", "Describe the mood, moment, or missing piece. No perfect keywords required."],
            ["02", "See the signal", "We surface the few options that fit your taste, budget, and actual life."],
            ["03", "Move confidently", "Compare, save, and check out with support still close at hand."],
          ].map(([number, title, copy]) => (
            <div key={number} className="border-b border-border pb-7 sm:border-b-0 sm:border-r sm:pr-7 last:border-0" data-testid={`card-home-principle-${number}`}>
              <p className="font-mono text-xs text-primary">{number}</p>
              <h3 className="mt-7 font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.15fr] md:items-center md:px-8 md:py-24">
          <div className="overflow-hidden">
            <img src={studioImage} alt="ShopAI curation studio with product swatches and books" className="aspect-[1.05] w-full object-cover opacity-90 transition-transform duration-1000 hover:scale-[1.03]" />
          </div>
          <div className="md:pl-8">
            <p className="editorial-kicker text-background/50">The intelligent layer</p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.05em] md:text-6xl">
              Your shortcut to
              <br />
              <span className="italic text-primary">something right.</span>
            </h2>
            <p className="mt-7 max-w-lg text-base leading-7 text-background/65">
              Our assistant listens for the details that make a recommendation
              personal: how you spend Sundays, what you already own, and what
              you want to feel when you walk in.
            </p>
            <Link href="/chat" className="mt-9 inline-flex items-center gap-3 border-b border-background/40 pb-2 text-xs uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary" data-testid="link-home-intelligent-layer">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="editorial-kicker text-primary">Freshly considered</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] md:text-5xl">The current edit</h2>
          </div>
          <Link href="/products?featured=true" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-primary" data-testid="link-home-view-all-products">
            View all pieces <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {isLoading ? (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((item) => <div key={item} className="aspect-[3/4] animate-pulse bg-muted" data-testid={`skeleton-home-product-${item}`} />)}
          </div>
        ) : isError ? (
          <div className="mt-8 border border-destructive/30 bg-destructive/5 p-8 text-sm text-destructive" data-testid="status-home-products-error">
            We could not load the edit right now. The full collection is still ready when you are.
          </div>
        ) : featured.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {featured.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group" data-testid={`card-home-product-${product.id}`}>
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-end bg-secondary p-4 font-serif text-2xl text-primary">{product.name.slice(0, 1)}</div>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{product.brand ?? "ShopAI selection"}</p>
                  </div>
                  <span className="font-serif text-sm">${Number(product.price).toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-border p-12 text-center" data-testid="empty-home-products">
            <p className="font-serif text-2xl">The next edit is almost here.</p>
            <Link href="/products" className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-primary" data-testid="link-home-browse-catalog">Browse the full catalog</Link>
          </div>
        )}
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-start gap-4">
            <Star className="mt-1 h-5 w-5 shrink-0 fill-primary text-primary" />
            <div>
              <p className="font-serif text-2xl">“It feels like having a very good friend who shops beautifully.”</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Mara · ShopAI member since 2023</p>
            </div>
          </div>
          <Button asChild variant="outline" className="w-fit rounded-none border-foreground/25 uppercase tracking-[0.14em]">
            <Link href="/testimonials" data-testid="link-home-read-stories">Read their stories</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}