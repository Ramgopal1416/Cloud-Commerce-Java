import { useParams, Link } from "wouter";
import { useGetOrder, useCancelOrder, getGetOrderQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

export default function OrderDetail() {
  const { id } = useParams();
  const orderId = parseInt(id || "0", 10);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: order, isLoading } = useGetOrder(orderId, {
    query: { enabled: !!orderId, queryKey: getGetOrderQueryKey(orderId) }
  });

  const cancelMutation = useCancelOrder();

  const handleCancel = () => {
    cancelMutation.mutate(
      { id: orderId },
      {
        onSuccess: () => {
          toast({ title: "Order cancelled" });
          queryClient.invalidateQueries({ queryKey: getGetOrderQueryKey(orderId) });
        },
        onError: (err: any) => {
          toast({ 
            title: "Cannot cancel order", 
            description: err.message || "Order may have already shipped.",
            variant: "destructive" 
          });
        }
      }
    );
  };

  if (isLoading) return <div className="flex-1 flex items-center justify-center py-24"><p className="font-serif italic text-muted-foreground">Loading order details...</p></div>;
  if (!order) return <div className="flex-1 flex items-center justify-center">Order not found</div>;

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl">
      <Link href="/orders" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Orders
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-2">Order #{order.id}</h1>
          <p className="text-muted-foreground font-light">Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`text-xs px-3 py-1.5 uppercase tracking-widest font-medium ${
            order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
            'bg-secondary text-secondary-foreground'
          }`}>
            Status: {order.status}
          </span>
          {order.status === 'pending' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs uppercase tracking-widest text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground rounded-none"
              onClick={handleCancel}
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? "Cancelling..." : "Cancel Order"}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div className="border border-border/50 p-6 space-y-6">
            <h2 className="font-serif text-xl border-b pb-4">Items</h2>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-28 bg-muted shrink-0">
                    {item.product?.imageUrl && <img src={item.product.imageUrl} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <Link href={`/products/${item.productId}`} className="font-medium hover:underline inline-block">
                      {item.product?.name || `Product #${item.productId}`}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
                    <p className="font-serif mt-2">${Number(item.subtotal).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-muted/30 border border-border/50 p-6 space-y-6">
            <h2 className="font-serif text-xl border-b pb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${Number(order.totalAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="pt-4 border-t flex justify-between font-medium">
                <span className="uppercase tracking-widest">Total</span>
                <span className="font-serif text-lg">${Number(order.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border border-border/50 p-6 space-y-4">
            <h2 className="font-serif text-xl border-b pb-4">Shipping Info</h2>
            <div className="text-sm text-muted-foreground whitespace-pre-wrap font-light leading-relaxed">
              {order.shippingAddress}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
