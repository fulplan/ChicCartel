import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import NewArrivalsPage from "@/pages/NewArrivalsPage";
import WomenPage from "@/pages/WomenPage";
import MenPage from "@/pages/MenPage";
import AccessoriesPage from "@/pages/AccessoriesPage";
import SalePage from "@/pages/SalePage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/new-arrivals" component={NewArrivalsPage} />
      <Route path="/women" component={WomenPage} />
      <Route path="/men" component={MenPage} />
      <Route path="/accessories" component={AccessoriesPage} />
      <Route path="/sale" component={SalePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
