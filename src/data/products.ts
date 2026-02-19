import serviceNails from "@/assets/service-nails.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import serviceTreatment from "@/assets/service-treatment.jpg";
import servicePedicure from "@/assets/service-pedicure.jpg";
import serviceNatural from "@/assets/service-natural.jpg";
import serviceBraids from "@/assets/service-braids.jpg";
import type { Product } from "@/context/CartContext";

export const categories = [
  { name: "All", id: "all" },
  { name: "Hair Care", id: "hair" },
  { name: "Skin Care", id: "skin" },
  { name: "Nail Products", id: "nails" },
  { name: "Makeup", id: "makeup" },
  { name: "Tools", id: "tools" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Castor Oil Hair Serum",
    category: "hair",
    price: "KSh 1,200",
    priceNum: 1200,
    badge: "Best Seller",
    img: serviceNatural,
    desc: "Strengthens & promotes hair growth",
    details:
      "Cold-pressed Jamaican Black Castor Oil enriched with Vitamin E and Argan oil. This lightweight serum penetrates deep into hair follicles, strengthening roots and promoting healthy growth. Perfect for natural hair, braids, and locs maintenance. Apply 3-5 drops to scalp and massage gently.",
    shippingInfo:
      "Free delivery within Nairobi for orders above KSh 2,000. Standard delivery 1-3 business days. Same-day delivery available for Nairobi CBD orders placed before 12pm.",
  },
  {
    id: 2,
    name: "Gel Nail Polish Set",
    category: "nails",
    price: "KSh 850",
    priceNum: 850,
    badge: "New In",
    img: serviceNails,
    desc: "Long-lasting gel nail colors",
    details:
      "Professional-grade gel nail polish set with 6 stunning shades perfect for Kenyan skin tones. Each bottle provides up to 14 days of chip-free wear. Includes base coat and top coat. UV/LED curable for a salon-quality finish at home.",
    shippingInfo:
      "Free delivery within Nairobi for orders above KSh 2,000. Standard delivery 1-3 business days. Same-day delivery available for Nairobi CBD orders placed before 12pm.",
  },
  {
    id: 3,
    name: "Glow Skin Toner",
    category: "skin",
    price: "KSh 950",
    priceNum: 950,
    badge: "Limited",
    img: serviceTreatment,
    desc: "Natural brightening for melanin skin",
    details:
      "Formulated specifically for melanin-rich skin, this alcohol-free toner combines Vitamin C, Niacinamide, and Aloe Vera to even skin tone and restore natural radiance. Gentle enough for daily use, morning and evening after cleansing.",
    shippingInfo:
      "Free delivery within Nairobi for orders above KSh 2,000. Standard delivery 1-3 business days. Same-day delivery available for Nairobi CBD orders placed before 12pm.",
  },
  {
    id: 4,
    name: "Matte Lip Collection",
    category: "makeup",
    price: "KSh 600",
    priceNum: 600,
    badge: null,
    img: serviceMakeup,
    desc: "Rich pigment, 12-hour wear",
    details:
      "A curated collection of 4 matte liquid lipsticks in universally flattering shades. Transfer-proof formula provides all-day comfort with intense color payoff. Enriched with Shea Butter to keep lips moisturized. Perfect for all occasions from everyday glam to special events.",
    shippingInfo:
      "Free delivery within Nairobi for orders above KSh 2,000. Standard delivery 1-3 business days. Same-day delivery available for Nairobi CBD orders placed before 12pm.",
  },
  {
    id: 5,
    name: "Edge Control Gel",
    category: "hair",
    price: "KSh 450",
    priceNum: 450,
    badge: "On Offer",
    img: serviceBraids,
    desc: "Extra hold for braids & locs",
    details:
      "Maximum hold edge control with a non-greasy finish. Infused with Flaxseed and Castor Oil to nourish edges while keeping them laid. Water-resistant formula won't flake or build up. Perfect for sleek ponytails, braids, and protective styles.",
    shippingInfo:
      "Free delivery within Nairobi for orders above KSh 2,000. Standard delivery 1-3 business days. Same-day delivery available for Nairobi CBD orders placed before 12pm.",
  },
  {
    id: 6,
    name: "Pedicure Spa Kit",
    category: "tools",
    price: "KSh 1,800",
    priceNum: 1800,
    badge: "New In",
    img: servicePedicure,
    desc: "Complete at-home pedicure set",
    details:
      "Everything you need for a professional pedicure at home. Includes foot soak crystals, exfoliating scrub, cuticle oil, nail file set, toe separators, and a luxurious foot cream. Made with natural ingredients including Kenyan tea tree oil and shea butter.",
    shippingInfo:
      "Free delivery within Nairobi for orders above KSh 2,000. Standard delivery 1-3 business days. Same-day delivery available for Nairobi CBD orders placed before 12pm.",
  },
];
