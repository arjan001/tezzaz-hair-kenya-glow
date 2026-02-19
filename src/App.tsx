import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/context/CartContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductPage from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import Services from "./pages/Services";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Policies from "./pages/Policies";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsersRoles from "./pages/admin/AdminUsersRoles";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminDelivery from "./pages/admin/AdminDelivery";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminPolicies from "./pages/admin/AdminPolicies";
import AdminTheme from "./pages/admin/AdminTheme";

const queryClient = new QueryClient();

const CartSidebarWrapper = () => {
  const { cartSidebarOpen, setCartSidebarOpen } = useCart();
  return (
    <CartSidebar open={cartSidebarOpen} onClose={() => setCartSidebarOpen(false)} />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CartSidebarWrapper />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/services" element={<Services />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsersRoles />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
              <Route path="delivery" element={<AdminDelivery />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="policies" element={<AdminPolicies />} />
              <Route path="theme" element={<AdminTheme />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
