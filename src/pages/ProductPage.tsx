import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Minus, Plus, Truck, RotateCcw, Shield, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { allProducts } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "shipping">("description");

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/shop")}
            className="font-body text-xs uppercase tracking-widest bg-black text-white px-6 py-3"
          >
            Back to Shop
          </button>
        </div>
        <FooterSection />
      </div>
    );
  }

  const similarProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-xs text-gray-400 mb-8">
          <button onClick={() => navigate("/")} className="hover:text-black transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate("/shop")} className="hover:text-black transition-colors">Shop</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">{product.name}</span>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Product Image */}
          <div className="relative overflow-hidden border border-gray-200 aspect-square">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className={`absolute top-4 left-4 font-body text-[10px] uppercase tracking-widest px-3 py-1.5 font-bold ${
                product.badge === "On Offer" ? "bg-[hsl(var(--gold))] text-white" :
                product.badge === "New In" ? "bg-black text-white" :
                product.badge === "Limited" ? "bg-red-600 text-white" :
                "bg-gray-800 text-white"
              }`}>
                {product.badge}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-2">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-2xl font-bold">{product.priceDisplay}</span>
            </div>

            <p className="font-body text-gray-600 text-sm leading-relaxed mb-6">
              {product.description || product.desc}
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-body text-xs uppercase tracking-widest font-bold mb-3">Quantity</p>
              <div className="flex items-center gap-0 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center font-body text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-black text-white font-body text-xs uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  const whatsappText = `Hi! I'd like to order: ${product.name} (${product.priceDisplay}) x ${quantity}`;
                  window.open(`https://wa.me/254711135090?text=${encodeURIComponent(whatsappText)}`, "_blank");
                }}
                className="flex-1 bg-[#25D366] text-white font-body text-xs uppercase tracking-widest py-4 hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order via WhatsApp
              </button>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center gap-2 font-body text-xs uppercase tracking-widest mb-8 transition-colors ${
                wishlisted ? "text-[hsl(var(--gold))]" : "text-gray-500 hover:text-black"
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
              {wishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-5 h-5 text-gray-400 mb-2" />
                <p className="font-body text-[10px] uppercase tracking-wider text-gray-500">Fast Delivery</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-5 h-5 text-gray-400 mb-2" />
                <p className="font-body text-[10px] uppercase tracking-wider text-gray-500">Easy Returns</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-5 h-5 text-gray-400 mb-2" />
                <p className="font-body text-[10px] uppercase tracking-wider text-gray-500">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description & Shipping */}
        <div className="border-t border-gray-200 mb-16">
          <div className="flex gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("description")}
              className={`font-body text-sm py-4 border-b-2 transition-colors ${
                activeTab === "description"
                  ? "border-black text-black font-bold"
                  : "border-transparent text-gray-400 hover:text-black"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`font-body text-sm py-4 border-b-2 transition-colors ${
                activeTab === "shipping"
                  ? "border-black text-black font-bold"
                  : "border-transparent text-gray-400 hover:text-black"
              }`}
            >
              Shipping
            </button>
          </div>
          <div className="py-6">
            {activeTab === "description" ? (
              <p className="font-body text-sm text-gray-600 leading-relaxed max-w-3xl">
                {product.description || product.desc}
              </p>
            ) : (
              <div className="max-w-3xl space-y-4">
                <p className="font-body text-sm text-gray-600 leading-relaxed">
                  {product.shippingInfo || "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days."}
                </p>
                <div className="space-y-2">
                  <p className="font-body text-sm text-gray-600"><strong>Nairobi CBD:</strong> KSh 200 (same-day available)</p>
                  <p className="font-body text-sm text-gray-600"><strong>Greater Nairobi:</strong> KSh 300 (1-2 days)</p>
                  <p className="font-body text-sm text-gray-600"><strong>Countrywide:</strong> KSh 400-600 (3-5 days)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map((p) => (
                <div
                  key={p.id}
                  className="group border border-gray-100 hover:border-black transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.badge && (
                      <div className={`absolute top-2 left-2 font-body text-[8px] uppercase tracking-widest px-2 py-0.5 font-bold ${
                        p.badge === "On Offer" ? "bg-[hsl(var(--gold))] text-white" :
                        p.badge === "New In" ? "bg-black text-white" :
                        p.badge === "Limited" ? "bg-red-600 text-white" :
                        "bg-gray-800 text-white"
                      }`}>
                        {p.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-display text-xs font-bold mb-1 truncate">{p.name}</h3>
                    <p className="font-body text-xs font-bold">{p.priceDisplay}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default ProductPage;
