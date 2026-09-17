import { ArrowRight, Compass, Heart, Layers3 } from "lucide-react";
import { Link } from "wouter";

const studioImage = "/store/attached_assets/generated_images/shopai-curation-studio.png";

export default function About() {
  return (
    <div className="w-full">
      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.15fr_0.85fr] md:items-end md:px-8 md:py-32">
          <div>
            <p className="editorial-kicker text-background/50">About ShopAI</p>
            <h1 className="mt-6 max-w-3xl font-serif text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
              We believe
              <br />
              <span className="italic text-primary">less can be more.</span>
            </h1>
          </div>
          <p className="max-w-sm text-base leading-7 text-background/65 md:pb-2">
            ShopAI was built for the moment after the tenth open tab — when you
            want a clear point of view, not another list of links.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[0.85fr_1.15fr] md:items-center md:px-8 md:py-28">
        <img src={studioImage} alt="The ShopAI curation studio" className="aspect-[0.95] w-full object-cover" data-testid="img-about-studio" />
        <div className="md:pl-12">
          <p className="editorial-kicker text-primary">Our point of view</p>
          <h2 className="mt-5 max-w-lg font-serif text-4xl leading-tight tracking-[-0.04em] md:text-5xl">
            Technology should make taste feel more human.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-7 text-muted-foreground">
            <p>There is a strange kind of fatigue that comes from too much possibility. We started ShopAI to make discovery feel like a conversation again.</p>
            <p>Our intelligence learns what matters to you, while our curators keep the edit grounded in quality, usefulness, and a little bit of surprise.</p>
          </div>
          <Link href="/features" className="mt-9 inline-flex items-center gap-2 border-b border-foreground pb-2 text-xs uppercase tracking-[0.2em]" data-testid="link-about-see-how-it-works">
            See how it works <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <p className="editorial-kicker text-primary">What guides us</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              [Compass, "Useful over viral", "We would rather help you find the right everyday object than chase the loudest trend."],
              [Heart, "Context is everything", "The best recommendation knows the difference between a gift, a reset, and a forever piece."],
              [Layers3, "An edit, not a wall", "Every collection has a shape, a rhythm, and enough breathing room to make a decision."],
            ].map(([Icon, title, copy], index) => {
              const IconComponent = Icon as typeof Compass;
              return (
                <div key={title as string} className="border-t border-border pt-5" data-testid={`card-about-value-${index}`}>
                  <IconComponent className="h-5 w-5 text-primary" />
                  <h3 className="mt-8 font-serif text-2xl">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-28">
        <p className="editorial-kicker text-primary">Come see for yourself</p>
        <h2 className="mx-auto mt-5 max-w-2xl font-serif text-5xl leading-none tracking-[-0.05em]">Start with a question.</h2>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">The best way to understand ShopAI is to tell it what you are looking for.</p>
        <Link href="/chat" className="mt-8 inline-flex items-center gap-2 bg-primary px-7 py-4 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="link-about-start-chat">
          Meet your shopping companion <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}