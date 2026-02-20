import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, ArrowLeft, Truck, Shield, RefreshCw, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/integrations/supabase/hooks/useProducts";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import type { Product } from "@/context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

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

  // Find product by UUID (dbId) or by numeric id
  const product = products.find((p) => p.dbId === id || String(p.id) === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
        </div>
        <FooterSection />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="font-body text-gray-500">Product not found.</p>
          <button onClick={() => navigate("/shop")} className="mt-4 bg-black text-white font-body text-xs uppercase tracking-widest px-6 py-3">
            Back to Shop
          </button>
        </div>
        <FooterSection />
      </div>
    );
  }

  const similar = products.filter((p) => p.category === product.category && p.dbId !== product.dbId).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="relative overflow-hidden border-2 border-gray-100">
            <img
              src={product.img}
              alt={product.name}
              className="w-full aspect-square object-cover object-top"
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

          {/* Info */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-[hsl(var(--gold))] mb-2">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl text-black font-bold mb-3">{product.name}</h1>
            <p className="font-display text-2xl text-black font-bold mb-4">{product.price}</p>
            <p className="font-body text-gray-600 text-sm leading-relaxed mb-6">{product.desc}</p>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-black text-white font-body text-xs uppercase tracking-widest py-4 hover:bg-[hsl(var(--gold))] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 border-2 flex items-center justify-center transition-colors ${
                  isInWishlist(product.id)
                    ? "bg-[hsl(var(--gold))] border-[hsl(var(--gold))] text-white"
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="font-display text-lg text-black font-bold mb-3">Description</h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                {product.details || product.desc}
              </p>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="font-display text-lg text-black font-bold mb-3">Shipping Information</h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">
                {product.shippingInfo || "Free delivery within Nairobi for orders above KSh 2,000. Standard delivery 1-3 business days."}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="border border-gray-200 p-3 text-center">
                  <Truck className="w-5 h-5 mx-auto mb-1 text-[hsl(var(--gold))]" />
                  <p className="font-body text-[10px] uppercase tracking-wide text-gray-600">Fast Delivery</p>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-[hsl(var(--gold))]" />
                  <p className="font-body text-[10px] uppercase tracking-wide text-gray-600">Secure Payment</p>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <RefreshCw className="w-5 h-5 mx-auto mb-1 text-[hsl(var(--gold))]" />
                  <p className="font-body text-[10px] uppercase tracking-wide text-gray-600">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="font-display text-2xl text-black font-bold mb-8">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {similar.map((p) => (
                <div
                  key={p.id}
                  className="group border-2 border-gray-100 hover:border-black transition-all duration-300 bg-white cursor-pointer"
                  onClick={() => navigate(`/product/${p.dbId}`)}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm text-black font-bold">{p.name}</h3>
                    <p className="font-body text-sm text-black font-bold mt-1">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default ProductPage;
