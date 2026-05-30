import { Link, useLocation } from "wouter";
import { useGetCart, useUpdateCartItem, useRemoveCartItem, getGetCartQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useGetCart();
  const updateItemMutation = useUpdateCartItem();
  const removeItemMutation = useRemoveCartItem();

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemMutation.mutate(
      { id: itemId, data: { quantity: newQuantity } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        }
      }
    );
  };

  const handleRemove = (itemId: number) => {
    removeItemMutation.mutate(
      { id: itemId },
      {
        onSuccess: () => {
          toast({ title: "Item removed" });
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <p className="font-serif italic text-muted-foreground">Loading cart...</p>
      </div>
    );
  }

  const items = cart?.items || [];
  const isEmpty = items.length === 0;

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
      <h1 className="text-4xl font-serif mb-8 text-center md:text-left">Shopping Cart</h1>

      {isEmpty ? (
        <div className="text-center py-24 bg-muted/30 border border-border/50">
          <p className="font-serif italic text-muted-foreground text-xl mb-6">Your cart is empty.</p>
          <Link href="/products">
            <Button size="lg" className="rounded-none tracking-widest uppercase">
              Discover Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium tracking-widest uppercase text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b last:border-0">
                <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                  <div className="w-24 h-32 bg-muted shrink-0">
                    {item.product?.imageUrl && (
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="space-y-1">
                    {item.product?.brand && <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.product.brand}</p>}
                    <Link href={`/products/${item.product?.id}`} className="font-medium hover:underline inline-block">
                      {item.product?.name}
                    </Link>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-destructive flex items-center mt-2 hover:opacity-80 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Remove
                    </button>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 text-left md:text-center font-serif">
                  <span className="md:hidden text-sm text-muted-foreground mr-2">Price:</span>
                  ${Number(item.unitPrice).toFixed(2)}
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                  <div className="flex items-center border border-input rounded-none w-min">
                    <Button 
                      variant="ghost" size="icon" className="h-8 w-8 rounded-none"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={updateItemMutation.isPending}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <div className="w-8 text-center text-sm">{item.quantity}</div>
                    <Button 
                      variant="ghost" size="icon" className="h-8 w-8 rounded-none"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={updateItemMutation.isPending}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 text-left md:text-right font-serif text-lg">
                  <span className="md:hidden text-sm text-muted-foreground mr-2 font-sans">Total:</span>
                  ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-muted/30 p-8 border border-border/50 sticky top-24">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-serif">${Number(cart?.total || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="italic">Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between">
                  <span className="font-medium tracking-widest uppercase text-sm">Total</span>
                  <span className="font-serif text-xl">${Number(cart?.total || 0).toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full h-12 rounded-none tracking-widest uppercase text-xs">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
