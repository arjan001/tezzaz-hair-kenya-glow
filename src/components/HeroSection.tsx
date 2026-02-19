import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-salon.jpg";
import aboutSalon from "@/assets/about-salon.jpg";
import galleryImg from "@/assets/gallery-1.jpg";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    tag: "Hair · Beauty · Nails",
    title: "Nairobi's Premier",
    subtitle: "Beauty Studio",
    desc: "Experience world-class artistry celebrating African beauty. Located at The Bazaar, 10th Floor.",
    img: heroImage,
    cta: "Book Appointment",
    href: "#booking",
  },
  {
    tag: "Braids · Locs · Natural Hair",
    title: "Your Crown,",
    subtitle: "Our Expertise",
    desc: "Premium protective styles, natural hair treatments and luxury services — all under one roof.",
    img: aboutSalon,
    cta: "See Our Services",
    href: "#services",
  },
  {
    tag: "New — Tezzaz Beauty Shop",
    title: "Shop Our",
    subtitle: "Beauty Range",
    desc: "Premium hair, nail & skin products now available in-store and online. Shop the Kenyan beauty edit.",
    img: galleryImg,
    cta: "Shop Now",
    href: "/shop",
  },
];

const HeroSection = () => {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const current = slides[slide];

  return (
    <section id="home" className="min-h-[90vh] relative overflow-hidden bg-black">
      {/* Full bleed image */}
      {slides.map((s, i) => (
        <img
          key={i}
          src={s.img}
          alt={s.title}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${
            i === slide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 h-full min-h-[90vh] flex flex-col justify-center py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] rounded-full animate-pulse" />
            <p className="font-body text-xs uppercase tracking-[0.2em] text-white/80">{current.tag}</p>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.0] mb-4">
            {current.title}
            <br />
            <span className="text-[hsl(var(--gold))]">{current.subtitle}</span>
          </h1>

          <p className="font-body text-white/70 text-lg mb-10 max-w-xl leading-relaxed">
            {current.desc}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleNav(current.href)}
              className="flex items-center gap-2 bg-white text-black font-body text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[hsl(var(--gold))] hover:text-white transition-all duration-300 font-bold"
            >
              {current.cta} <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNav("#services")}
              className="flex items-center gap-2 border-2 border-white/60 text-white font-body text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Our Services
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex">
          {[
            { num: "500+", label: "Happy Clients" },
            { num: "8+", label: "Years Experience" },
            { num: "30+", label: "Hair Styles" },
            { num: "6+", label: "Services" },
          ].map((s, i) => (
            <div key={s.label} className={`flex-1 py-5 text-center ${i !== 3 ? "border-r border-white/10" : ""}`}>
              <p className="font-display text-[hsl(var(--gold))] text-2xl font-bold">{s.num}</p>
              <p className="font-body text-white/60 text-xs uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`transition-all duration-300 ${
              i === slide ? "w-1 h-10 bg-[hsl(var(--gold))]" : "w-1 h-4 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
