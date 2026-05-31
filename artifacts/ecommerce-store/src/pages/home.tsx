import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useListProducts } from "@workspace/api-client-react";

export default function Home() {
  const { data: productsData } = useListProducts({ limit: 3 });
  const featured = productsData?.items ?? [];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-multiply" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-primary/80 font-medium">
              Introducing
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-primary leading-tight">
              Intelligence in <br /> Every Detail
            </h1>
            <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto font-light">
              Experience the world's most curated catalog, personalized for you by your own AI assistant. Welcome to the future of high-end commerce.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <Link href="/products">
              <Button size="lg" className="h-14 px-8 text-base tracking-wide uppercase rounded-none">
                Explore Collection
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" size="lg" className="h-14 px-8 text-base tracking-wide rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Ask AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif mb-2">Curated for You</h2>
            <p className="text-muted-foreground font-light">Discover pieces selected based on your unique style profile.</p>
          </div>
          <Link href="/products" className="hidden md:inline-flex text-sm tracking-widest uppercase border-b border-primary pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group cursor-pointer flex flex-col gap-4">
                <div className="aspect-[3/4] bg-muted overflow-hidden">
                  <img
                    src={product.imageUrl ?? `https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.brand ?? "ShopAI"}</p>
                  </div>
                  <p className="font-serif text-lg">${Number(product.price).toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
