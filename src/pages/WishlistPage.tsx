import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCart, allProducts } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  const wishlistProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-xs text-gray-400 mb-6">
          <button onClick={() => navigate("/")} className="hover:text-black transition-colors">Home</button>
          <span>&gt;</span>
          <span className="text-black">Wishlist</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Your Wishlist</h1>
        <p className="font-body text-sm text-gray-500 mb-10">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
        </p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20 border border-gray-200">
            <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="font-body text-gray-400 text-sm mb-6">Save items you love to your wishlist</p>
            <button
              onClick={() => navigate("/shop")}
              className="font-body text-xs uppercase tracking-widest bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="group border border-gray-100 hover:border-black transition-all duration-300 bg-white">
                <div
                  className="relative overflow-hidden aspect-square cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
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
                  {/* Remove from wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3
                      className="font-display text-sm text-black font-bold leading-tight cursor-pointer hover:text-[hsl(var(--gold))] transition-colors"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <p className="font-body text-sm text-black font-bold flex-shrink-0">{product.priceDisplay}</p>
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
      </div>

      <FooterSection />
    </div>
  );
};

export default WishlistPage;
