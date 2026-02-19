import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Scissors, ChevronDown, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  {
    label: "Services",
    href: "/#services",
    sub: ["Hair Styling", "Braids & Locs", "Nail Art", "Pedicure", "Makeup", "Skin Care"],
  },
  { label: "Shop", href: "/shop", isShop: true },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "On Offer", href: "/shop?filter=offer" },
  { label: "Track My Order", href: "/track-order" },
];

interface NavbarProps {
  onOpenSubscribe?: () => void;
}

const Navbar = ({ onOpenSubscribe }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getCartCount, cartOpen, setCartOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      if (window.location.pathname === "/") {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/" + hash);
      }
    } else {
      navigate(href);
    }
  };

  const cartCount = getCartCount();

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-200 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        {/* Top row: Logo + Icons */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[64px]">
          {/* Logo */}
          <div
            className="flex items-center gap-0 cursor-pointer"
            onClick={() => handleNav("/")}
          >
            <div className="bg-black px-3 py-3 flex items-center gap-2 h-[64px]">
              <Scissors className="w-4 h-4 text-white rotate-[-30deg]" />
              <span className="font-display text-lg text-white font-semibold tracking-wide">Tezzaz</span>
            </div>
            <div className="px-3 h-[64px] flex items-center border border-black/10 border-l-0">
              <span className="font-display text-lg text-black tracking-wide font-light">Hair</span>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              className="relative p-2 hover:bg-gray-100 transition-colors group"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-black" />
            </button>
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 transition-colors group"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[hsl(var(--gold))] text-white font-body text-[9px] flex items-center justify-center font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Book CTA */}
            <button
              onClick={() => handleNav("/#booking")}
              className="hidden md:block ml-2 bg-black text-white font-body text-xs tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-gray-800 transition-colors duration-300"
            >
              Book Now
            </button>
            {/* Mobile Toggle */}
            <button className="md:hidden p-2 text-black" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Bottom Nav Row - Centered */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <nav className="hidden md:flex items-center justify-center h-11 gap-8">
              {navLinks.map((link) =>
                link.isShop ? (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className="relative flex items-center gap-1.5 font-body text-xs tracking-[0.15em] uppercase font-medium shop-glow-link"
                  >
                    <Sparkles className="w-3 h-3" />
                    {link.label}
                  </button>
                ) : link.sub ? (
                  <div key={link.label} className="relative group h-full flex items-center">
                    <button
                      onClick={() => handleNav(link.href)}
                      className="flex items-center gap-1 font-body text-xs tracking-[0.15em] uppercase text-gray-700 hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-xl min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {link.sub.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleNav(link.href)}
                          className="block w-full text-left font-body text-xs tracking-wide uppercase text-gray-600 hover:text-black hover:bg-gray-50 px-5 py-3 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className="font-body text-xs tracking-[0.15em] uppercase text-gray-700 hover:text-black transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className={`font-body text-xs tracking-[0.15em] uppercase text-left ${
                  link.isShop ? "shop-glow-link font-medium" : "text-gray-700 hover:text-black"
                } transition-colors`}
              >
                {link.isShop && <Sparkles className="w-3 h-3 inline mr-1.5" />}
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("/#booking")}
              className="mt-2 bg-black text-white font-body text-xs tracking-widest uppercase px-6 py-3"
            >
              Book Now
            </button>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-[108px]" />

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
