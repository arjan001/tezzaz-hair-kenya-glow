import { useState, useEffect } from "react";
import { Menu, X, Scissors, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-charcoal shadow-lg" : "bg-charcoal/95"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav("#home")}>
          <div className="bg-gold p-2 rounded">
            <Scissors className="w-5 h-5 text-cream" />
          </div>
          <div>
            <span className="font-display text-xl text-cream tracking-wide">Tezzaz</span>
            <span className="font-display text-xl text-gold"> Hair</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="font-body text-sm tracking-widest uppercase text-cream/80 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="border border-gold/50 p-2 hover:bg-gold hover:border-gold transition-all duration-200">
            <Facebook className="w-4 h-4 text-gold hover:text-cream" />
          </a>
          <a href="#" className="border border-gold/50 p-2 hover:bg-gold hover:border-gold transition-all duration-200">
            <Instagram className="w-4 h-4 text-gold hover:text-cream" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
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
              className="font-body text-sm tracking-widest uppercase text-cream/80 hover:text-gold transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
