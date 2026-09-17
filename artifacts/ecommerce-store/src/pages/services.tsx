import { ArrowRight, Box, Headphones, ScanSearch, Sparkles, Truck } from "lucide-react";
import { Link } from "wouter";

const services = [
  { number: "01", icon: ScanSearch, title: "Discovery, without the digging", copy: "Tell us the occasion, the feeling, or the one detail you cannot compromise on. ShopAI turns an open brief into a focused edit." },
  { number: "02", icon: Sparkles, title: "Personalized perspective", copy: "Your preferences become useful context — not a profile you have to maintain. Recommendations get sharper as your point of view takes shape." },
  { number: "03", icon: Headphones, title: "A little help, right when needed", copy: "Ask follow-up questions, compare two options, or get a second opinion before you add to cart. Our assistant stays in the room." },
  { number: "04", icon: Truck, title: "A calm finish", copy: "Clear delivery updates, straightforward returns, and order support that respects your time from checkout to doorstep." },
];

export default function Services() {
  return (
    <div className="w-full">
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <p className="editorial-kicker text-primary">Services</p>
          <div className="mt-7 grid gap-8 md:grid-cols-[1fr_0.65fr] md:items-end">
            <h1 className="max-w-3xl font-serif text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
              The good kind
              <br />
              of <span className="italic text-primary">helpful.</span>
            </h1>
            <p className="max-w-sm text-base leading-7 text-muted-foreground">
              Every ShopAI service is designed to remove friction without taking
              away the pleasure of finding something new.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {services.map(({ number, icon: Icon, title, copy }) => (
            <article key={number} className="grid grid-cols-[3.5rem_1fr] gap-5 border-t border-border pt-5" data-testid={`card-service-${number}`}>
              <div>
                <span className="font-mono text-xs text-primary">{number}</span>
                <Icon className="mt-10 h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="max-w-md font-serif text-3xl leading-tight">{title}</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
          <div className="flex items-start gap-4">
            <Box className="mt-1 h-5 w-5 shrink-0" />
            <div>
              <p className="font-serif text-3xl leading-tight">Need a recommendation now?</p>
              <p className="mt-2 text-sm text-accent-foreground/65">Start with the messy version of your question. We can work from there.</p>
            </div>
          </div>
          <Link href="/chat" className="inline-flex w-fit items-center gap-2 border-b border-accent-foreground/50 pb-2 text-xs uppercase tracking-[0.18em] hover:border-accent-foreground" data-testid="link-services-chat">
            Ask ShopAI <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}