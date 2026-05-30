import { Link } from "wouter";
import type { Product } from "@workspace/api-client-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer flex flex-col gap-4">
        <div className="aspect-[3/4] bg-muted overflow-hidden relative">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground font-serif italic">
              No image
            </div>
          )}
          {product.isFeatured && (
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest font-medium">
              Featured
            </div>
          )}
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg text-foreground group-hover:text-primary/80 transition-colors">
              {product.name}
            </h3>
            {product.brand && (
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            )}
          </div>
          <p className="font-serif text-lg">${Number(product.price).toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
