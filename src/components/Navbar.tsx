import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Scissors, ChevronDown, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.2 8.2 0 004.79 1.53V6.83a4.85 4.85 0 01-1.02-.14z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  {
    label: "Services",
    href: "/#services",
    sub: ["Hair Styling", "Braids & Locs", "Nail Art", "Pedicure", "Makeup", "Skin Care"],
  },
  { label: "Shop", href: "/shop", isShop: true },
  { label: "Contact", href: "/#contact" },
];

const offers = [
  "FREE BROW SHAPING with any Hair Service this Month",
  "Buy 2 Nail Services, Get 1 FREE — Limited Time Offer",
  "Refer a Friend & Both Get 15% OFF Your Next Visit",
];

interface NavbarProps {
  onOpenSubscribe?: () => void;
}

const Navbar = ({ onOpenSubscribe }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [offerIdx, setOfferIdx] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, wishlist, setCartSidebarOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOfferIdx((i) => (i + 1) % offers.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      if (location.pathname === "/") {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/" + hash);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      {/* Announcement / Marquee Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-black h-8 flex items-center overflow-hidden">
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-body text-[10px] uppercase tracking-widest text-[hsl(var(--gold))] font-bold">Offers</span>
            <span className="hidden sm:inline w-px h-3 bg-white/20" />
            <p
              key={offerIdx}
              className="font-body text-[11px] text-white/80 tracking-wide whitespace-nowrap animate-marquee"
            >
              {offers[offerIdx]}
            </p>
          </div>
          <div className="absolute right-4 flex gap-3">
            <a href="https://www.instagram.com/tezzaz_hair.ke/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              <InstagramIcon />
            </a>
            <a href="https://www.tiktok.com/@tezzaz1" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-200 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-10 flex items-center justify-between h-[56px]">
          {/* Logo */}
          <div
            className="flex items-center gap-0 cursor-pointer flex-shrink-0"
            onClick={() => handleNav("/")}
          >
            <div className="bg-black px-2.5 py-2.5 flex items-center gap-1.5 h-[56px]">
              <Scissors className="w-3.5 h-3.5 text-white rotate-[-30deg]" />
              <span className="font-display text-base text-white font-semibold tracking-wide">Tezzaz</span>
            </div>
            <div className="px-2.5 h-[56px] flex items-center border border-black/10 border-l-0">
              <span className="font-display text-base text-black tracking-wide font-light">Hair</span>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center justify-center flex-1 gap-7">
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

          {/* Right Icons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              className="relative p-2 hover:bg-gray-100 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-black" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[hsl(var(--gold))] text-white font-body text-[9px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>
            {/* Cart */}
            <button
              onClick={() => setCartSidebarOpen(true)}
              className="relative p-2 hover:bg-gray-100 transition-colors"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white font-body text-[9px] flex items-center justify-center font-bold">
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
      <div className="h-[88px]" />
    </>
  );
};

export default Navbar;
