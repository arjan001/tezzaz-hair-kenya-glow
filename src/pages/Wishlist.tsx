import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/integrations/supabase/hooks/useProducts";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import type { Product } from "@/context/CartContext";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const { data: dbProducts = [], isLoading } = useProducts(true);

  // Convert DB products to cart-compatible format
  const products: (Product & { dbId: string })[] = dbProducts.map((p) => ({
    id: parseInt(p.id.replace(/-/g, "").slice(0, 8), 16) || Math.random(),
    dbId: p.id,
    name: p.name,
    category: p.category_name || "general",
    price: `KSh ${Number(p.price_num).toLocaleString()}`,
    priceNum: Number(p.price_num),
    badge: p.badge,
    img: p.img_url || "/placeholder.svg",
    desc: p.description,
    details: p.details || undefined,
    shippingInfo: p.shipping_info || undefined,
  }));

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        <h1 className="font-display text-3xl md:text-4xl text-black font-bold mb-2">My Wishlist</h1>
        <p className="font-body text-gray-500 text-sm mb-10">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-200">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="font-body text-gray-400 text-sm mb-4">Your wishlist is empty</p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-black text-white font-body text-xs uppercase tracking-widest px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="group border-2 border-gray-100 hover:border-black transition-all duration-300 bg-white"
              >
                <div
                  className="relative overflow-hidden aspect-square cursor-pointer"
                  onClick={() => navigate(`/product/${product.dbId}`)}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm text-black font-bold leading-tight mb-1">{product.name}</h3>
                  <p className="font-body text-sm text-black font-bold mb-3">{product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-black text-white font-body text-[10px] uppercase tracking-widest py-2.5 hover:bg-[hsl(var(--gold))] transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3 h-3" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default WishlistPage;
