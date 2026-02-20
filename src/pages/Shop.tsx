import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Heart, ShoppingBag, Search, Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/integrations/supabase/hooks/useProducts";
import { useCategories } from "@/integrations/supabase/hooks/useCategories";
import heroImage from "@/assets/hero-salon.jpg";
import aboutSalon from "@/assets/about-salon.jpg";
import galleryImg from "@/assets/gallery-1.jpg";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import type { Product } from "@/context/CartContext";

const bannerSlides = [
  { img: heroImage, text: "New Arrivals — Premium Hair Care Products", sub: "Shop the latest in Kenyan beauty" },
  { img: aboutSalon, text: "Exclusive Nail Collections Now Available", sub: "Professional quality, salon results" },
  { img: galleryImg, text: "Free Delivery on Orders Above KSh 2,000", sub: "Nairobi-wide delivery" },
];

const PRODUCTS_PER_PAGE = 6;

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  const { data: dbProducts = [], isLoading } = useProducts(true);
  const { data: dbCategories = [] } = useCategories();

  // Convert DB products to cart-compatible format
  const products: Product[] = dbProducts.map((p) => ({
    id: Number(p.id.replace(/-/g, "").slice(0, 8), 16) || Math.random(),
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

  const categories = [{ name: "All", id: "all" }, ...dbCategories.filter(c => c.slug !== "all").map(c => ({ name: c.name, id: c.slug }))];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category.toLowerCase() === activeCategory.toLowerCase() || p.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery, products.length]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filtered.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  const nextBanner = () => setBannerIdx((i) => (i + 1) % bannerSlides.length);
  const prevBanner = () => setBannerIdx((i) => (i - 1 + bannerSlides.length) % bannerSlides.length);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Banner */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          {bannerSlides.map((slide, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === bannerIdx ? "opacity-100" : "opacity-0"}`}>
              <img src={slide.img} alt={slide.text} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-6">
                <div>
                  <p className="font-display text-xl md:text-3xl text-white font-bold mb-2">{slide.text}</p>
                  <p className="font-body text-sm text-white/70">{slide.sub}</p>
                </div>
              </div>
            </div>
          ))}
          <button onClick={prevBanner} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/20 hover:bg-white/40 flex items-center justify-center"><ChevronLeft className="w-4 h-4 text-white" /></button>
          <button onClick={nextBanner} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/20 hover:bg-white/40 flex items-center justify-center"><ChevronRight className="w-4 h-4 text-white" /></button>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[hsl(var(--gold))]" />
                <p className="font-body text-xs uppercase tracking-[0.2em] text-[hsl(var(--gold))]">Tezzaz Beauty Store</p>
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-black font-bold mb-2">Shop Beauty<br /><span className="inline-block border-b-4 border-black">Products</span></h1>
              <p className="font-body text-gray-500 text-sm max-w-sm">Premium hair, nail & beauty products — curated for Kenyan beauty.</p>
            </div>
            <div className="flex w-full md:w-80 border-2 border-black">
              <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search products..." className="flex-1 font-body text-sm px-4 py-2.5 focus:outline-none bg-white text-black" />
              <button className="bg-black px-4 flex items-center justify-center"><Search className="w-4 h-4 text-white" /></button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setCurrentPage(1); }}
                className={`font-body text-xs uppercase tracking-widest px-5 py-2 border-2 transition-all duration-200 ${activeCategory === cat.id ? "bg-black text-white border-black" : "bg-white text-black border-gray-200 hover:border-black"}`}>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-xs text-gray-400">
              Showing {isLoading ? "..." : paginatedProducts.length} of {isLoading ? "..." : filtered.length} products
              {searchQuery && <span> for "<span className="text-black font-medium">{searchQuery}</span>"</span>}
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
            </div>
          ) : (
            <>
              {/* Empty state when no products from DB */}
              {products.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-gray-200">
                  <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold text-black mb-2">Launching Our Tezzaz Beauty Store Soon!</h2>
                  <p className="font-body text-gray-500 text-sm max-w-md mx-auto mb-6">
                    We're curating the finest Kenyan hair, nail & beauty products. Stay tuned — something amazing is coming to The Bazaar.
                  </p>
                  <p className="font-body text-xs text-gray-400 uppercase tracking-widest">📍 The Bazaar, 10th Floor, Wing B, Suite 1025</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="group border-2 border-gray-100 hover:border-black transition-all duration-300 bg-white cursor-pointer">
                    <div className="relative overflow-hidden aspect-square" onClick={() => navigate(`/product/${product.id}`)}>
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      {product.badge && (
                        <div className={`absolute top-3 left-3 font-body text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold ${product.badge === "On Offer" ? "bg-[hsl(var(--gold))] text-white" : product.badge === "New In" ? "bg-black text-white" : product.badge === "Limited" ? "bg-red-600 text-white" : "bg-gray-800 text-white"}`}>
                          {product.badge}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                          className={`w-10 h-10 flex items-center justify-center border-2 border-white transition-colors ${isInWishlist(product.id) ? "bg-[hsl(var(--gold))] border-[hsl(var(--gold))]" : "bg-white/20 hover:bg-white"}`}>
                          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "text-white fill-white" : "text-white"}`} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                          className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black hover:bg-gray-800">
                          <ShoppingBag className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-display text-sm text-black font-bold leading-tight cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
                        <p className="font-body text-sm text-black font-bold flex-shrink-0">{product.price}</p>
                      </div>
                      <p className="font-body text-gray-500 text-xs mb-3">{product.desc}</p>
                      <button onClick={() => addToCart(product)}
                        className="w-full bg-black text-white font-body text-[10px] uppercase tracking-widest py-2.5 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <ShoppingBag className="w-3 h-3" /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && products.length > 0 && (
                <div className="text-center py-20">
                  <p className="font-body text-gray-400 text-sm">No products found matching your search.</p>
                  <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                    className="mt-3 font-body text-xs text-black underline">Clear search</button>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                    className="w-10 h-10 border-2 border-gray-200 flex items-center justify-center hover:border-black disabled:opacity-30">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 border-2 font-body text-sm font-bold transition-all ${page === currentPage ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:border-black"}`}>
                      {page}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                    className="w-10 h-10 border-2 border-gray-200 flex items-center justify-center hover:border-black disabled:opacity-30">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default ShopPage;
