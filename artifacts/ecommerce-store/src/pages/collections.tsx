import { useListCategories, useListProducts } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const CATEGORY_IMAGES: Record<string, string> = {
  "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
  "Clothing": "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
  "Home & Garden": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop",
  "Sports & Fitness": "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=2031&auto=format&fit=crop",
  "Books": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2028&auto=format&fit=crop",
  "Bags & Accessories": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
  "Personal Care": "https://images.unsplash.com/photo-1607008829749-c0f284a49fc4?q=80&w=1887&auto=format&fit=crop",
  "Footwear": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
  "Groceries & Kitchen": "https://images.unsplash.com/photo-1506484381205-f7945653044d?q=80&w=2070&auto=format&fit=crop",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Electronics": "Cutting-edge gadgets and tech essentials",
  "Clothing": "Curated fashion for every occasion",
  "Home & Garden": "Elevate your living space",
  "Sports & Fitness": "Performance gear for every athlete",
  "Books": "Stories and wisdom worth reading",
  "Bags & Accessories": "The finishing touches that define your style",
  "Personal Care": "Daily rituals made luxurious",
  "Footwear": "Step out in style and comfort",
  "Groceries & Kitchen": "Quality ingredients and kitchen essentials",
};

export default function Collections() {
  const { data: categories, isLoading } = useListCategories();
  const { data: allProducts } = useListProducts({ limit: 500 });

  const productCountByCategory = (categoryId: number) => {
    return allProducts?.items?.filter((p) => p.categoryId === categoryId).length ?? 0;
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-foreground text-background py-20 px-4 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-background/60 mb-4">Browse</p>
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Collections</h1>
        <p className="text-background/60 font-light text-lg max-w-xl mx-auto">
          Every category is a world unto itself. Discover the pieces that speak to you.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Featured top row — 2 large cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {categories?.slice(0, 2).map((cat) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  count={productCountByCategory(cat.id)}
                  aspect="aspect-[16/9]"
                  large
                />
              ))}
            </div>

            {/* Middle row — 3 medium cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {categories?.slice(2, 5).map((cat) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  count={productCountByCategory(cat.id)}
                  aspect="aspect-[3/4]"
                />
              ))}
            </div>

            {/* Bottom rows — remaining cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories?.slice(5).map((cat) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  count={productCountByCategory(cat.id)}
                  aspect="aspect-[3/4]"
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      <div className="border-t border-border/50 bg-muted/30 py-16 px-4 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Can't decide?</p>
        <h2 className="text-3xl font-serif mb-4">Let AI choose for you</h2>
        <p className="text-muted-foreground font-light mb-8 max-w-sm mx-auto">
          Talk to our AI assistant and get personalised product recommendations in seconds.
        </p>
        <Link href="/chat">
          <button className="h-12 px-10 bg-foreground text-background text-sm uppercase tracking-widest hover:bg-foreground/80 transition-colors">
            Chat with AI Assistant
          </button>
        </Link>
      </div>
    </div>
  );
}

function CategoryCard({
  cat,
  count,
  aspect,
  large = false,
}: {
  cat: { id: number; name: string };
  count: number;
  aspect: string;
  large?: boolean;
}) {
  const image = CATEGORY_IMAGES[cat.name] ?? "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop";
  const desc = CATEGORY_DESCRIPTIONS[cat.name] ?? "Explore the collection";

  return (
    <Link href={`/products?categoryId=${cat.id}`}>
      <div className={`group relative overflow-hidden cursor-pointer ${aspect} bg-muted`}>
        <img
          src={image}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">{count} products</p>
              <h3 className={`text-white font-serif ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                {cat.name}
              </h3>
              {large && (
                <p className="text-white/70 text-sm font-light mt-2">{desc}</p>
              )}
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/40 transition-colors shrink-0 ml-4">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
