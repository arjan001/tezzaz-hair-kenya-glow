import { useState, useEffect } from "react";
import { Menu, X, Scissors, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  {
    label: "Services",
    href: "#services",
    sub: ["Hair Styling", "Braids & Locs", "Manicure", "Pedicure", "Makeup", "Skin Care"],
  },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
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
          <div className="px-3 h-[72px] flex items-center">
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
          {["f", "in", "li"].map((icon, i) => (
            <a
              key={i}
              href="#"
              className="border border-gold/60 w-8 h-8 flex items-center justify-center text-gold text-xs font-bold hover:bg-gold hover:text-cream transition-all duration-200"
            >
              {icon}
            </a>
          ))}
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
