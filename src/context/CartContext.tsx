import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  priceDisplay: string;
  badge: string | null;
  img: string;
  desc: string;
  description?: string;
  shippingInfo?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: number[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  getWishlistProducts: () => Product[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("tezzaz_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("tezzaz_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tezzaz_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("tezzaz_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const getWishlistProducts = () => {
    // Import products from the shared data
    return allProducts.filter((p) => wishlist.includes(p.id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        toggleWishlist,
        isInWishlist,
        getWishlistProducts,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Shared product data used across the app
import serviceNails from "@/assets/service-nails.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import serviceTreatment from "@/assets/service-treatment.jpg";
import servicePedicure from "@/assets/service-pedicure.jpg";
import serviceNatural from "@/assets/service-natural.jpg";
import serviceBraids from "@/assets/service-braids.jpg";

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Castor Oil Hair Serum",
    category: "hair",
    price: 1200,
    priceDisplay: "KSh 1,200",
    badge: "Best Seller",
    img: serviceNatural,
    desc: "Strengthens & promotes hair growth",
    description:
      "Premium cold-pressed castor oil hair serum enriched with Vitamin E and biotin. Designed specifically for African hair, this serum strengthens hair follicles, reduces breakage, and promotes healthy growth. Apply to scalp and hair ends daily for best results.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 2,
    name: "Gel Nail Polish Set",
    category: "nails",
    price: 850,
    priceDisplay: "KSh 850",
    badge: "New In",
    img: serviceNails,
    desc: "Long-lasting gel nail colors",
    description:
      "Professional-grade gel nail polish set with 6 stunning colors. UV/LED curable, chip-resistant formula that lasts up to 3 weeks. Includes base coat and top coat for a salon-perfect finish at home.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 3,
    name: "Glow Skin Toner",
    category: "skin",
    price: 950,
    priceDisplay: "KSh 950",
    badge: "Limited",
    img: serviceTreatment,
    desc: "Natural brightening for melanin skin",
    description:
      "Formulated with natural ingredients like turmeric, lemon extract and niacinamide to brighten and even out melanin-rich skin tones. Alcohol-free, gentle formula suitable for daily use. Helps minimize pores and refine skin texture.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 4,
    name: "Matte Lip Collection",
    category: "makeup",
    price: 600,
    priceDisplay: "KSh 600",
    badge: null,
    img: serviceMakeup,
    desc: "Rich pigment, 12-hour wear",
    description:
      "Luxurious matte lip collection featuring 4 richly pigmented shades curated for melanin beauties. Long-wearing, non-drying formula that stays vibrant for up to 12 hours. Enriched with shea butter for comfort.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 5,
    name: "Edge Control Gel",
    category: "hair",
    price: 450,
    priceDisplay: "KSh 450",
    badge: "On Offer",
    img: serviceBraids,
    desc: "Extra hold for braids & locs",
    description:
      "Extra-strong hold edge control gel for sleek braids, locs, and updos. Non-flaking, humidity-resistant formula that keeps your edges laid all day. Infused with argan oil and castor oil to nourish while styling.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 6,
    name: "Pedicure Spa Kit",
    category: "tools",
    price: 1800,
    priceDisplay: "KSh 1,800",
    badge: "New In",
    img: servicePedicure,
    desc: "Complete at-home pedicure set",
    description:
      "Complete professional-grade pedicure spa kit including foot soak salts, cuticle oil, pumice stone, nail file set, toe separators, and hydrating foot cream. Everything you need for a luxurious at-home pedicure experience.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 7,
    name: "Braiding Hair Extensions",
    category: "hair",
    price: 350,
    priceDisplay: "KSh 350",
    badge: "New In",
    img: serviceBraids,
    desc: "Premium synthetic braiding hair",
    description:
      "High-quality synthetic braiding hair available in multiple colors. Soft, tangle-free, and lightweight for comfortable all-day wear. Perfect for box braids, twists, and crochet styles.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 8,
    name: "Vitamin C Face Serum",
    category: "skin",
    price: 1100,
    priceDisplay: "KSh 1,100",
    badge: null,
    img: serviceTreatment,
    desc: "Brighten & protect your skin",
    description:
      "Advanced Vitamin C serum with hyaluronic acid for deep hydration and brightening. Protects against environmental damage while reducing dark spots and hyperpigmentation. Lightweight, fast-absorbing formula.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 9,
    name: "Acrylic Nail Kit",
    category: "nails",
    price: 2200,
    priceDisplay: "KSh 2,200",
    badge: "Best Seller",
    img: serviceNails,
    desc: "Professional acrylic nail set",
    description:
      "Complete acrylic nail kit with acrylic powder, liquid monomer, nail tips, brush, and all accessories. Professional grade materials for salon-quality acrylic nails at home. Includes instructional guide.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 10,
    name: "Setting Spray Matte Finish",
    category: "makeup",
    price: 750,
    priceDisplay: "KSh 750",
    badge: null,
    img: serviceMakeup,
    desc: "All-day makeup lock spray",
    description:
      "Professional setting spray with a matte finish that keeps your makeup flawless for up to 16 hours. Controls oil and shine without drying. Perfect for Nairobi's warm climate.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 11,
    name: "Hair Bonding Glue",
    category: "hair",
    price: 500,
    priceDisplay: "KSh 500",
    badge: null,
    img: serviceNatural,
    desc: "Strong hold wig bonding adhesive",
    description:
      "Professional-grade hair bonding glue for secure wig and weave installation. Waterproof formula with strong hold that lasts up to 6 weeks. Easy removal with bonding remover.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
  {
    id: 12,
    name: "Foot Cream Intensive",
    category: "tools",
    price: 650,
    priceDisplay: "KSh 650",
    badge: "On Offer",
    img: servicePedicure,
    desc: "Deep moisturizing foot therapy",
    description:
      "Intensive moisturizing foot cream with shea butter, tea tree oil, and urea for deep hydration and healing. Softens rough heels and cracked skin overnight. Apply before bed with cotton socks for best results.",
    shippingInfo: "Ships within 1-2 business days across Nairobi. Countrywide delivery in 3-5 days.",
  },
];

export const productCategories = [
  { name: "All Categories", id: "all" },
  { name: "Hair Care", id: "hair" },
  { name: "Skin Care", id: "skin" },
  { name: "Nail Products", id: "nails" },
  { name: "Makeup", id: "makeup" },
  { name: "Tools & Kits", id: "tools" },
];
