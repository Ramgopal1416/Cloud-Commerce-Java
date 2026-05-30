import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { useGetProduct, useListProductReviews, useAddToCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingBag, Star, StarHalf, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id || "0", 10);
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useGetProduct(productId, {
    query: {
      enabled: !!productId,
    }
  });

  const { data: reviewsResponse } = useListProductReviews(productId, {
    query: {
      enabled: !!productId,
    }
  });

  const addToCartMutation = useAddToCart();

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart.",
      });
      setLocation("/login");
      return;
    }

    addToCartMutation.mutate(
      { data: { productId, quantity } },
      {
        onSuccess: () => {
          toast({
            title: "Added to cart",
            description: `${quantity}x ${product?.name} added to your cart.`,
          });
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to add item to cart.",
            variant: "destructive",
          });
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="font-serif italic text-muted-foreground">Loading details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col gap-4">
        <p className="font-serif italic text-muted-foreground">Product not found.</p>
        <Link href="/products">
          <Button variant="outline">Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  const reviews = reviewsResponse?.reviews || [];
  const averageRating = reviewsResponse?.averageRating || 0;

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
      <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-muted w-full overflow-hidden">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-serif text-muted-foreground">No image available</div>
            )}
          </div>
          {/* Gallery thumbnails could go here */}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {product.brand && (
            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-2">{product.brand}</p>
          )}
          <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <p className="text-2xl font-serif">${Number(product.price).toFixed(2)}</p>
            {reviews.length > 0 && (
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="flex mr-2 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(averageRating) ? "fill-current" : ""}`} />
                  ))}
                </div>
                ({reviews.length} reviews)
              </div>
            )}
          </div>

          <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert mb-10 font-light text-muted-foreground">
            <p>{product.description || "No description available."}</p>
          </div>

          <div className="space-y-6 mt-auto border-t border-border/50 pt-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium uppercase tracking-wider">Quantity</span>
              <div className="flex items-center border border-input rounded-none">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-none h-12 w-12"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="w-12 text-center text-base">{quantity}</div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-none h-12 w-12"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full h-14 text-base tracking-wide uppercase rounded-none"
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-24 border-t border-border/50 pt-12">
        <h2 className="text-2xl font-serif mb-8">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border/50 pb-8 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : ""}`} />
                    ))}
                  </div>
                  <span className="font-medium ml-2">{review.user?.name || "Anonymous"}</span>
                </div>
                {review.comment && (
                  <p className="text-muted-foreground font-light">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground font-light italic">No reviews yet. Be the first to share your thoughts.</p>
        )}
      </div>
    </div>
  );
}
