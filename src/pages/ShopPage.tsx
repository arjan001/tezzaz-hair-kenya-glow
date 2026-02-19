import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Heart, ShoppingBag, Search, ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { allProducts, productCategories, Product } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const bannerSlides = [
  {
    title: "Beauty Products",
    subtitle: "SHOP",
    desc: "Curated beauty essentials for every woman",
  },
  {
    title: "Hair Care Collection",
    subtitle: "SHOP",
    desc: "Premium products for healthy, beautiful hair",
  },
  {
    title: "Nail Art Supplies",
    subtitle: "SHOP",
    desc: "Professional nail kits and colors",
  },
];

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [bannerIdx, setBannerIdx] = useState(0);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter === "new") {
      setActiveCategory("all");
    } else if (filter === "offer") {
      setActiveCategory("all");
    }
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIdx((i) => (i + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filterParam = searchParams.get("filter");

  let filtered = allProducts.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filterParam === "new") {
    filtered = filtered.filter((p) => p.badge === "New In");
  } else if (filterParam === "offer") {
    filtered = filtered.filter((p) => p.badge === "On Offer");
  }

  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return allProducts.length;
    return allProducts.filter((p) => p.category === catId).length;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner Carousel */}
      <div className="relative bg-gray-100 overflow-hidden" style={{ height: "200px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${allProducts[bannerIdx]?.img})`,
            filter: "brightness(0.5)",
          }}
        />
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 lg:px-10">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[hsl(var(--gold))] mb-2">
            {bannerSlides[bannerIdx].subtitle}
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-white font-bold mb-1">
            {bannerSlides[bannerIdx].title}
          </h1>
          <p className="font-body text-white/70 text-sm">
            {bannerSlides[bannerIdx].desc}
          </p>
          <div className="absolute bottom-4 right-6 flex items-center gap-2">
            <button
              onClick={() => setBannerIdx((i) => (i - 1 + bannerSlides.length) % bannerSlides.length)}
              className="w-8 h-8 bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setBannerIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === bannerIdx ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
            <button
              onClick={() => setBannerIdx((i) => (i + 1) % bannerSlides.length)}
              className="w-8 h-8 bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-xs text-gray-400 mb-6">
          <button onClick={() => navigate("/")} className="hover:text-black transition-colors">Home</button>
          <span>&gt;</span>
          <span className="text-black">Shop</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">Shop</h1>
        <p className="font-body text-sm text-gray-500 mb-8">{filtered.length} products</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Filter & Search */}
            <div className="flex w-full border border-gray-200 mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter products..."
                className="flex-1 font-body text-sm px-3 py-2.5 focus:outline-none bg-white text-black placeholder-gray-400"
              />
              <button className="px-3 flex items-center justify-center">
                <Search className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <h3 className="font-body text-xs uppercase tracking-widest font-bold mb-4">Categories</h3>
            <ul className="space-y-2 mb-8">
              {productCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className={`font-body text-sm flex items-center justify-between w-full py-1 transition-colors ${
                      activeCategory === cat.id
                        ? "text-black font-bold"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-gray-400 text-xs">({getCategoryCount(cat.id)})</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Price Range */}
            <h3 className="font-body text-xs uppercase tracking-widest font-bold mb-4">Price Range</h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-body text-xs text-gray-500">KSh 0</span>
              <input type="range" min="0" max="3000" className="flex-1 accent-black" />
              <span className="font-body text-xs text-gray-500">KSh 3,000</span>
            </div>

            {/* Filter By */}
            <h3 className="font-body text-xs uppercase tracking-widest font-bold mb-4">Filter By</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-body text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-black" />
                New Arrivals
              </label>
              <label className="flex items-center gap-2 font-body text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-black" />
                On Offer
              </label>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 border ${viewMode === "grid" ? "border-black bg-black text-white" : "border-gray-200 text-gray-400"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 border ${viewMode === "list" ? "border-black bg-black text-white" : "border-gray-200 text-gray-400"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-body text-sm border border-gray-200 px-4 py-2 focus:outline-none bg-white"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Product Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                  : "space-y-4"
              }
            >
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onAddToCart={() => addToCart(product)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                  isWishlisted={isInWishlist(product.id)}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-body text-gray-400 text-sm">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
  onClick: () => void;
}

const ProductCard = ({ product, viewMode, onAddToCart, onToggleWishlist, isWishlisted, onClick }: ProductCardProps) => {
  if (viewMode === "list") {
    return (
      <div className="flex border border-gray-200 hover:border-black transition-all duration-300">
        <div className="w-40 h-40 flex-shrink-0 cursor-pointer overflow-hidden" onClick={onClick}>
          <img src={product.img} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {product.badge && (
              <span className={`inline-block font-body text-[9px] uppercase tracking-widest px-2 py-0.5 mb-2 font-bold ${
                product.badge === "On Offer" ? "bg-[hsl(var(--gold))] text-white" :
                product.badge === "New In" ? "bg-black text-white" :
                product.badge === "Limited" ? "bg-red-600 text-white" :
                "bg-gray-800 text-white"
              }`}>
                {product.badge}
              </span>
            )}
            <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">{product.category}</p>
            <h3 className="font-display text-base font-bold text-black cursor-pointer hover:text-[hsl(var(--gold))] transition-colors" onClick={onClick}>
              {product.name}
            </h3>
            <p className="font-body text-xs text-gray-500 mt-1">{product.desc}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="font-body text-base font-bold">{product.priceDisplay}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleWishlist(); }}
                className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                  isWishlisted ? "bg-[hsl(var(--gold))] border-[hsl(var(--gold))] text-white" : "border-gray-300 hover:border-black"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
                className="font-body text-[10px] uppercase tracking-widest bg-black text-white px-4 py-2.5 hover:bg-[hsl(var(--gold))] transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-3 h-3" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group border border-gray-100 hover:border-black transition-all duration-300 bg-white">
      <div className="relative overflow-hidden aspect-square cursor-pointer" onClick={onClick}>
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
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(); }}
            className={`w-10 h-10 flex items-center justify-center border-2 border-white transition-colors ${
              isWishlisted ? "bg-[hsl(var(--gold))] border-[hsl(var(--gold))]" : "bg-white/20 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "text-white fill-white" : "text-white"}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black hover:bg-gray-800 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">{product.category}</p>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-sm text-black font-bold leading-tight cursor-pointer hover:text-[hsl(var(--gold))] transition-colors" onClick={onClick}>
            {product.name}
          </h3>
          <p className="font-body text-sm text-black font-bold flex-shrink-0">{product.priceDisplay}</p>
        </div>
        <p className="font-body text-gray-500 text-xs mb-3">{product.desc}</p>
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
          className="w-full bg-black text-white font-body text-[10px] uppercase tracking-widest py-2.5 hover:bg-[hsl(var(--gold))] transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-3 h-3" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
