import { ArrowRight, BrainCircuit, CircleCheck, Fingerprint, Layers, LockKeyhole, WandSparkles } from "lucide-react";
import { Link } from "wouter";

const features = [
  { icon: BrainCircuit, title: "Natural language shopping", copy: "Say “something quiet for a small kitchen” and let the context do the work." },
  { icon: Fingerprint, title: "A taste profile that evolves", copy: "Shop, save, skip, and ask. Your preferences become a helpful signal over time." },
  { icon: Layers, title: "One view, many possibilities", copy: "Compare the details that actually matter without bouncing between a dozen tabs." },
  { icon: WandSparkles, title: "Curated, not automated", copy: "Intelligence narrows the field; a considered editorial lens keeps it worth looking at." },
  { icon: LockKeyhole, title: "Private by design", copy: "Your shopping context is yours. We use it to help, never to make the experience noisy." },
  { icon: CircleCheck, title: "Confidence at checkout", copy: "Clear product detail, transparent pricing, and support when a final question appears." },
];

export default function Features() {
  return (
    <div className="w-full">
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="editorial-kicker text-background/50">Why ShopAI</p>
              <h1 className="mt-6 max-w-3xl font-serif text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
                The signal
                <br />
                <span className="italic text-primary">in the noise.</span>
              </h1>
            </div>
            <p className="max-w-sm text-base leading-7 text-background/65">
              A shopping experience that feels more like a great recommendation
              and less like a search result page.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-0 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, copy }, index) => (
            <article key={title} className="min-h-64 border-b border-r border-border p-7 transition-colors hover:bg-secondary md:p-9" data-testid={`card-feature-${index + 1}`}>
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="mt-12 font-serif text-2xl leading-tight">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <div className="grid gap-10 border-t border-border pt-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="editorial-kicker text-primary">One small promise</p>
            <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-none tracking-[-0.05em] md:text-6xl">
              You should leave with
              <br />
              <span className="italic text-primary">more certainty.</span>
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-muted-foreground">Not because every choice is perfect. Because the path to the right one was clear, considered, and yours.</p>
            <Link href="/products" className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] hover:text-primary" data-testid="link-features-shop">
              Explore the catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}