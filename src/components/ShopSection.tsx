import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Sparkles, ArrowRight, Search, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/integrations/supabase/hooks/useProducts";
import type { Product } from "@/context/CartContext";

const ShopSection = () => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [searchInput, setSearchInput] = useState("");

  const { data: dbProducts = [], isLoading } = useProducts(true);

  // Convert DB products to cart-compatible format (max 6 featured)
  const featured: (Product & { dbId: string })[] = dbProducts.slice(0, 6).map((p) => ({
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

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate("/shop");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section id="shop" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[hsl(var(--gold))]" />
              <p className="font-body text-xs uppercase tracking-[0.2em] text-[hsl(var(--gold))]">New Shop</p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-black font-bold mb-2">
              Shop Beauty<br />
              <span className="inline-block border-b-4 border-[hsl(var(--gold))]">Products</span>
            </h2>
            <p className="font-body text-gray-500 text-sm max-w-sm">
              Premium hair, nail & beauty products — curated for Kenyan beauty. Shop & book all in one place.
            </p>
            {/* Search Bar */}
            <div className="flex w-full max-w-sm mt-4 border-2 border-black">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                className="flex-1 font-body text-sm px-4 py-2.5 focus:outline-none bg-white text-black"
              />
              <button onClick={handleSearch} className="bg-black px-4 flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 bg-black text-white font-body text-xs uppercase tracking-widest px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            Shop All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
          </div>
        )}

        {/* Empty State - No products in database yet */}
        {!isLoading && featured.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-200">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-black mb-2">Launching Our Tezzaz Beauty Store Soon!</h3>
            <p className="font-body text-gray-500 text-sm max-w-md mx-auto mb-6">
              We're curating the finest Kenyan hair, nail & beauty products. Stay tuned — something amazing is coming to The Bazaar.
            </p>
            <p className="font-body text-xs text-gray-400 uppercase tracking-widest">The Bazaar, 10th Floor, Wing B, Suite 1025</p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && featured.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {featured.map((product) => (
              <div
                key={product.id}
                className="group border-2 border-gray-100 hover:border-black transition-all duration-300 bg-white cursor-pointer"
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden aspect-square"
                  onClick={() => navigate(`/product/${product.dbId}`)}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className={`absolute top-3 left-3 font-body text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold ${
                      product.badge === "On Offer" ? "bg-[hsl(var(--gold))] text-white" :
                      product.badge === "New In" ? "bg-black text-white" :
                      product.badge === "Limited" ? "bg-red-600 text-white" :
                      "bg-gray-800 text-white"
                    }`}>
                      {product.badge}
                    </div>
                  )}
                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                      className={`w-10 h-10 flex items-center justify-center border-2 border-white transition-colors ${
                        isInWishlist(product.id) ? "bg-[hsl(var(--gold))] border-[hsl(var(--gold))]" : "bg-white/20 hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "text-white fill-white" : "text-white"}`} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black hover:bg-gray-800 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-sm text-black font-bold leading-tight">{product.name}</h3>
                    <p className="font-body text-sm text-black font-bold flex-shrink-0">{product.price}</p>
                  </div>
                  <p className="font-body text-gray-500 text-xs mb-3">{product.desc}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-black text-white font-body text-[10px] uppercase tracking-widest py-2.5 hover:bg-[hsl(var(--gold))] transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shop CTA */}
        <div className="mt-12 border-2 border-black p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display text-xl text-black font-bold">Introducing Tezzaz Beauty Store</p>
              <p className="font-body text-gray-500 text-sm">Premium beauty products — available online & in-store at The Bazaar</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 bg-black text-white font-body text-xs uppercase tracking-widest px-8 py-4 hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
