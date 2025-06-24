import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import AboutSDGs from "@/pages/about-sdgs";

// GitHub Pages base path detection
const getBasePath = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('github.io')) {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    return segments.length > 0 ? `/${segments[0]}` : '/';
  }
  return '/';
};

function Router() {
  return (
    <WouterRouter base={getBasePath()}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/about-sdgs" component={AboutSDGs} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            <Toaster />
            <Router />
          </div>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
