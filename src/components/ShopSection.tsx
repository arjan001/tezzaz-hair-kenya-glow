import { useState } from "react";
import { Heart, ShoppingBag, Search, Tag, Sparkles, ArrowRight } from "lucide-react";
import serviceNails from "@/assets/service-nails.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import serviceTreatment from "@/assets/service-treatment.jpg";
import servicePedicure from "@/assets/service-pedicure.jpg";
import serviceNatural from "@/assets/service-natural.jpg";
import serviceBraids from "@/assets/service-braids.jpg";

const categories = [
  { name: "All", id: "all" },
  { name: "Hair Care", id: "hair" },
  { name: "Skin Care", id: "skin" },
  { name: "Nail Products", id: "nails" },
  { name: "Makeup", id: "makeup" },
  { name: "Tools", id: "tools" },
];

const products = [
  {
    id: 1,
    name: "Castor Oil Hair Serum",
    category: "hair",
    price: "KSh 1,200",
    badge: "Best Seller",
    img: serviceNatural,
    desc: "Strengthens & promotes hair growth",
  },
  {
    id: 2,
    name: "Gel Nail Polish Set",
    category: "nails",
    price: "KSh 850",
    badge: "New In",
    img: serviceNails,
    desc: "Long-lasting gel nail colors",
  },
  {
    id: 3,
    name: "Glow Skin Toner",
    category: "skin",
    price: "KSh 950",
    badge: "Limited",
    img: serviceTreatment,
    desc: "Natural brightening for melanin skin",
  },
  {
    id: 4,
    name: "Matte Lip Collection",
    category: "makeup",
    price: "KSh 600",
    badge: null,
    img: serviceMakeup,
    desc: "Rich pigment, 12-hour wear",
  },
  {
    id: 5,
    name: "Edge Control Gel",
    category: "hair",
    price: "KSh 450",
    badge: "On Offer",
    img: serviceBraids,
    desc: "Extra hold for braids & locs",
  },
  {
    id: 6,
    name: "Pedicure Spa Kit",
    category: "tools",
    price: "KSh 1,800",
    badge: "New In",
    img: servicePedicure,
    desc: "Complete at-home pedicure set",
  },
];

const ShopSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
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
          </div>

          {/* Search */}
          <div className="flex w-full md:w-72 border-2 border-black">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 font-body text-sm px-4 py-2.5 focus:outline-none bg-white text-black"
            />
            <button className="bg-black px-4 flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-body text-xs uppercase tracking-widest px-5 py-2 border-2 transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group border-2 border-gray-100 hover:border-black transition-all duration-300 bg-white"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square">
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
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-10 h-10 flex items-center justify-center border-2 border-white transition-colors ${
                      wishlist.includes(product.id) ? "bg-[hsl(var(--gold))] border-[hsl(var(--gold))]" : "bg-white/20 hover:bg-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "text-white fill-white" : "text-white"}`} />
                  </button>
                  <button className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black hover:bg-gray-800 transition-colors">
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
                <button className="w-full bg-black text-white font-body text-[10px] uppercase tracking-widest py-2.5 hover:bg-[hsl(var(--gold))] transition-colors duration-300 flex items-center justify-center gap-2">
                  <ShoppingBag className="w-3 h-3" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shop CTA */}
        <div className="mt-12 border-2 border-black p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display text-xl text-black font-bold">Introducing Tezzaz Beauty Store</p>
              <p className="font-body text-gray-500 text-sm">Premium beauty products — available online & in-store at The Bazaar</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-black text-white font-body text-xs uppercase tracking-widest px-8 py-4 hover:bg-gray-800 transition-colors flex-shrink-0">
            View All Products <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
