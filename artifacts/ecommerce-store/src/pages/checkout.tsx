import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCart, useCreateOrder, getGetCartQueryKey } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const checkoutSchema = z.object({
  shippingAddress: z.string().min(10, "Please enter your full shipping address"),
  paymentMethod: z.string(),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cart, isLoading: isCartLoading } = useGetCart();
  const createOrderMutation = useCreateOrder();

  useEffect(() => {
    if (!isCartLoading && (!cart?.items || cart.items.length === 0)) {
      setLocation("/cart");
    }
  }, [cart, isCartLoading, setLocation]);

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: "",
      paymentMethod: "credit_card",
      notes: "",
    },
  });

  const onSubmit = (data: CheckoutForm) => {
    if (!cart?.items || cart.items.length === 0) {
      toast({ title: "Cart is empty", variant: "destructive" });
      return;
    }

    createOrderMutation.mutate(
      { data },
      {
        onSuccess: (order) => {
          queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
          toast({
            title: "Order Placed",
            description: "Your order has been successfully placed.",
          });
          setLocation(`/orders/${order.id}`);
        },
        onError: () => {
          toast({
            title: "Checkout failed",
            description: "There was an issue processing your order.",
            variant: "destructive",
          });
        }
      }
    );
  };

  if (isCartLoading) {
    return <div className="flex-1 flex items-center justify-center"><p className="font-serif italic text-muted-foreground">Loading checkout...</p></div>;
  }

  if (!isCartLoading && (!cart?.items || cart.items.length === 0)) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
      <h1 className="text-4xl font-serif mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              <div className="space-y-6">
                <h2 className="text-xl font-serif border-b pb-2">Shipping Information</h2>
                <FormField
                  control={form.control}
                  name="shippingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs">Full Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Street address, City, State, ZIP" 
                          className="min-h-[100px] resize-none bg-muted/50 rounded-none border-transparent focus-visible:border-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-serif border-b pb-2">Payment Method</h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 p-4 border bg-card">
                            <FormControl>
                              <RadioGroupItem value="credit_card" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Credit Card
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 p-4 border bg-card">
                            <FormControl>
                              <RadioGroupItem value="paypal" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              PayPal
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Mock credit card inputs just for visual completeness */}
                {form.watch("paymentMethod") === "credit_card" && (
                  <div className="grid grid-cols-2 gap-4 p-4 border bg-muted/30">
                    <div className="col-span-2">
                      <label className="text-xs uppercase tracking-widest mb-2 block text-foreground font-medium">Card Number</label>
                      <Input placeholder="0000 0000 0000 0000" className="rounded-none bg-background" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest mb-2 block text-foreground font-medium">Expiry</label>
                      <Input placeholder="MM/YY" className="rounded-none bg-background" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest mb-2 block text-foreground font-medium">CVC</label>
                      <Input placeholder="123" className="rounded-none bg-background" />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-serif border-b pb-2">Additional Notes</h2>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special instructions for delivery? (Optional)" 
                          className="resize-none bg-muted/50 rounded-none border-transparent focus-visible:border-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-base tracking-widest uppercase rounded-none"
                disabled={createOrderMutation.isPending}
              >
                {createOrderMutation.isPending ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-muted/30 p-8 border border-border/50 sticky top-24 space-y-6">
            <h2 className="font-serif text-2xl">Order Summary</h2>
            
            <div className="space-y-4 max-h-[40vh] overflow-auto pr-2">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-muted shrink-0">
                    {item.product?.imageUrl && <img src={item.product.imageUrl} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium line-clamp-1">{item.product?.name}</p>
                    <p className="text-muted-foreground mt-1">Qty: {item.quantity}</p>
                    <p className="font-serif mt-1">${(Number(item.unitPrice) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-serif text-foreground">${Number(cart.total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-serif text-foreground">Free</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="font-medium uppercase tracking-widest text-sm">Total</span>
              <span className="font-serif text-2xl">${Number(cart.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
