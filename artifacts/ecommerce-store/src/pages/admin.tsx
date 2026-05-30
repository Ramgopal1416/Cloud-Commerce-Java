import { useGetAdminStats, useListAllOrders, useListAllUsers, useListLowStock } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingCart, Package, DollarSign, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

export default function Admin() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (user && user.role !== "admin") {
    setLocation("/");
    return null;
  }

  const { data: stats } = useGetAdminStats();
  const { data: recentOrders } = useListAllOrders({ page: 1 });
  const { data: users } = useListAllUsers();
  const { data: lowStock } = useListLowStock();

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-serif mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground font-light text-lg">Store overview and management.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="rounded-none border-border/50 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-serif">${Number(stats.totalRevenue).toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card className="rounded-none border-border/50 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-serif">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.pendingOrders} pending</p>
            </CardContent>
          </Card>
          <Card className="rounded-none border-border/50 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-serif">{stats.totalProducts}</div>
              {stats.lowStockCount > 0 && (
                <p className="text-xs text-destructive mt-1 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" /> {stats.lowStockCount} low stock
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="rounded-none border-border/50 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-serif">{stats.totalUsers}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif border-b pb-2">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders?.items?.slice(0, 5).map((order) => (
              <div key={order.id} className="p-4 border border-border/50 flex justify-between items-center bg-muted/10">
                <div>
                  <div className="font-medium">Order #{order.id}</div>
                  <div className="text-sm text-muted-foreground">{format(new Date(order.createdAt), "MMM d, yyyy")}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif">${Number(order.totalAmount).toFixed(2)}</div>
                  <div className="text-xs uppercase tracking-wider mt-1 text-muted-foreground">{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif border-b pb-2">Low Inventory Alerts</h2>
          <div className="space-y-4">
            {lowStock?.length === 0 ? (
              <p className="text-muted-foreground italic text-sm">Inventory levels are healthy.</p>
            ) : (
              lowStock?.slice(0, 5).map((item) => (
                <div key={item.id} className="p-4 border border-destructive/20 bg-destructive/5 flex justify-between items-center">
                  <div className="font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    Product #{item.productId}
                  </div>
                  <div className="text-right text-sm">
                    <span className="text-destructive font-bold">{item.quantity}</span> left
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
