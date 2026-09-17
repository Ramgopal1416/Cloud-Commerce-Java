import { ArrowRight, Quote, Star } from "lucide-react";
import { Link } from "wouter";

const stories = [
  { quote: "I came in looking for a lamp and left with a whole new way to think about my reading corner. The recommendation was specific without being pushy.", name: "Mara Chen", detail: "Home refresh · Brooklyn" },
  { quote: "It understood that I wanted a jacket I could wear to a gallery opening and on the train home. That level of practical taste is rare.", name: "Theo Williams", detail: "Wardrobe edit · London" },
  { quote: "The best part is being able to ask one more question. I do not feel rushed into buying; I feel looked after.", name: "Sofia Alvarez", detail: "Gift finding · Austin" },
];

export default function Testimonials() {
  return (
    <div className="w-full">
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className="editorial-kicker text-primary">From the people who use it</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
            Proof is in the
            <br />
            <span className="italic text-primary">feeling after.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-md text-base leading-7 text-muted-foreground">A few notes from shoppers who wanted fewer options and found more confidence.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="flex min-h-[25rem] flex-col justify-between bg-foreground p-7 text-background md:p-12" data-testid="card-testimonial-featured">
            <Quote className="h-8 w-8 text-primary" />
            <div>
              <p className="max-w-2xl font-serif text-3xl leading-tight md:text-5xl">“ShopAI gave me the rare luxury of feeling done. I found exactly what I needed, and I actually enjoyed getting there.”</p>
              <div className="mt-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm">Nina Patel</p>
                  <p className="mt-1 text-xs text-background/50">New home · San Francisco</p>
                </div>
                <div className="flex gap-1 text-primary" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-current" />)}
                </div>
              </div>
            </div>
          </article>
          <div className="grid gap-5">
            {stories.slice(0, 2).map(({ quote, name, detail }, index) => (
              <article key={name} className="flex flex-col justify-between border border-border bg-card p-7 md:p-9" data-testid={`card-testimonial-${index + 1}`}>
                <p className="font-serif text-2xl leading-tight">“{quote}”</p>
                <div className="mt-8">
                  <p className="text-sm font-medium">{name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {stories.slice(2).map(({ quote, name, detail }) => (
            <article key={name} className="border border-border p-7" data-testid="card-testimonial-3">
              <p className="text-sm leading-7 text-muted-foreground">“{quote}”</p>
              <div className="mt-8 border-t border-border pt-4">
                <p className="text-sm">{name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
              </div>
            </article>
          ))}
          <div className="flex flex-col justify-between bg-primary p-7 text-primary-foreground md:col-span-2 md:flex-row md:items-end md:p-9">
            <div>
              <p className="editorial-kicker text-primary-foreground/65">Your turn</p>
              <p className="mt-4 max-w-md font-serif text-3xl leading-tight">Bring us the thing you have been searching for.</p>
            </div>
            <Link href="/chat" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] md:mt-0" data-testid="link-testimonials-ask">
              Ask ShopAI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}