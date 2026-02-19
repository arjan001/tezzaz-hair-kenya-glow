import { useState, useEffect } from "react";
import { Menu, X, Scissors, ChevronDown } from "lucide-react";

// TikTok SVG icon
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
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  {
    label: "Services",
    href: "#services",
    sub: ["Hair Styling", "Braids & Locs", "Nail Art", "Pedicure", "Makeup", "Skin Care"],
  },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled ? "bg-charcoal shadow-2xl" : "bg-charcoal"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        {/* Logo Block */}
        <div
          className="flex items-center gap-0 cursor-pointer"
          onClick={() => handleNav("#home")}
        >
          <div className="bg-gold px-3 py-4 flex items-center gap-2 h-[72px]">
            <Scissors className="w-5 h-5 text-cream rotate-[-30deg]" />
            <span className="font-display text-xl text-cream font-semibold tracking-wide">Tezzaz</span>
          </div>
          <div className="px-3 h-[72px] flex items-center border-l-0 border border-gold/30">
            <span className="font-display text-xl text-cream tracking-wide font-light">Hair</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) =>
            link.sub ? (
              <div key={link.label} className="relative group">
                <button
                  onClick={() => handleNav(link.href)}
                  className="flex items-center gap-1 font-body text-xs tracking-[0.15em] uppercase text-cream/80 hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute top-full left-0 mt-2 bg-charcoal border border-gold/20 shadow-xl min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {link.sub.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleNav(link.href)}
                      className="block w-full text-left font-body text-xs tracking-wide uppercase text-cream/70 hover:text-gold hover:bg-gold/10 px-5 py-3 transition-colors"
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
                className="font-body text-xs tracking-[0.15em] uppercase text-cream/80 hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        {/* Social + CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://www.instagram.com/tezzaz_hair.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gold/60 w-8 h-8 flex items-center justify-center text-gold hover:bg-gold hover:text-cream transition-all duration-200"
            title="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.tiktok.com/@tezzaz1"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gold/60 w-8 h-8 flex items-center justify-center text-gold hover:bg-gold hover:text-cream transition-all duration-200"
            title="TikTok"
          >
            <TikTokIcon />
          </a>
          <button
            onClick={() => handleNav("#booking")}
            className="ml-3 bg-gold text-cream font-body text-xs tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-gold-dark transition-colors duration-300"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-cream" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-charcoal border-t border-gold/20 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="font-body text-xs tracking-[0.15em] uppercase text-cream/80 hover:text-gold transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.instagram.com/tezzaz_hair.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold/60 w-9 h-9 flex items-center justify-center text-gold hover:bg-gold hover:text-cream transition-all"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.tiktok.com/@tezzaz1"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold/60 w-9 h-9 flex items-center justify-center text-gold hover:bg-gold hover:text-cream transition-all"
            >
              <TikTokIcon />
            </a>
          </div>
          <button
            onClick={() => handleNav("#booking")}
            className="mt-2 bg-gold text-cream font-body text-xs tracking-widest uppercase px-6 py-3"
          >
            Book Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
