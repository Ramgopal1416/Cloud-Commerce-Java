import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Products from "@/pages/products/index";
import ProductDetail from "@/pages/products/[id]";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Orders from "@/pages/orders/index";
import OrderDetail from "@/pages/orders/[id]";
import Account from "@/pages/account";
import Notifications from "@/pages/notifications";
import Chat from "@/pages/chat";
import Collections from "@/pages/collections";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/products" component={Products} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/orders/:id" component={OrderDetail} />
          <Route path="/account" component={Account} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/chat" component={Chat} />
          <Route path="/collections" component={Collections} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <footer className="border-t py-12 md:py-16 mt-auto bg-background">
        <div className="container px-4 md:px-8 text-center text-sm text-muted-foreground space-y-4">
          <p className="font-serif text-2xl text-foreground uppercase tracking-tighter">ShopAI</p>
          <p className="font-light">Luxury commerce, curated by intelligence.</p>
          <p className="text-xs">&copy; {new Date().getFullYear()} ShopAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
