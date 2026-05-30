import { useState } from "react";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function Products() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const featured = searchParams.get("featured") === "true";

  const { data: productsData, isLoading: isLoadingProducts } = useListProducts({
    search: search || undefined,
    categoryId,
    featured: featured ? true : undefined,
  });

  const { data: categories } = useListCategories();

  return (
    <div className="container px-4 md:px-8 py-12 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-4 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-serif">
            {featured ? "Featured Collection" : "The Catalog"}
          </h1>
          <p className="text-muted-foreground font-light text-lg">
            {featured 
              ? "Our most sought-after pieces, selected for their exceptional quality and design."
              : "Explore our full range of premium products. Every item is carefully vetted for quality."}
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-9 h-10 bg-muted/50 border-transparent focus-visible:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-48 shrink-0 space-y-8">
          <div>
            <h3 className="font-medium text-sm tracking-widest uppercase mb-4">Categories</h3>
            <div className="space-y-2 flex flex-col">
              <button
                onClick={() => setCategoryId(undefined)}
                className={`text-left text-sm py-1 transition-colors ${!categoryId ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                All Products
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryId(cat.id)}
                  className={`text-left text-sm py-1 transition-colors ${categoryId === cat.id ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoadingProducts ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
            </div>
          ) : productsData?.items && productsData.items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsData.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-muted/30 border border-border/50">
              <h3 className="text-xl font-serif mb-2">No products found</h3>
              <p className="text-muted-foreground font-light">
                We couldn't find any products matching your current filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  setSearch("");
                  setCategoryId(undefined);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
