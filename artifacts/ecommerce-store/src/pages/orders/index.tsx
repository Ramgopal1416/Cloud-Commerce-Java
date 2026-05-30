import { Link } from "wouter";
import { useListOrders } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function Orders() {
  const { data: orders, isLoading } = useListOrders();

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center py-24"><p className="font-serif italic text-muted-foreground">Loading orders...</p></div>;
  }

  const orderList = orders || [];

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-5xl">
      <h1 className="text-4xl font-serif mb-8">Order History</h1>

      {orderList.length === 0 ? (
        <div className="text-center py-24 bg-muted/30 border border-border/50">
          <p className="font-serif italic text-muted-foreground text-xl mb-6">You have no previous orders.</p>
          <Link href="/products">
            <Button size="lg" className="rounded-none tracking-widest uppercase">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orderList.map((order) => (
            <div key={order.id} className="border border-border/50 p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-border transition-colors">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h3 className="font-medium uppercase tracking-widest text-sm">Order #{order.id}</h3>
                  <span className={`text-xs px-2 py-1 uppercase tracking-wider ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Placed on {format(new Date(order.createdAt), "MMM d, yyyy")}
                </p>
                <p className="font-serif text-lg">${Number(order.totalAmount).toFixed(2)}</p>
              </div>
              
              <Link href={`/orders/${order.id}`}>
                <Button variant="outline" className="rounded-none tracking-wide">
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
