import { useState } from "react";
import heroImage from "@/assets/hero-salon.jpg";
import { Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      tag: "Welcome to",
      title: "Hair, Beauty",
      subtitle: "& Nails",
      desc: "Experience world-class artistry celebrating African beauty.",
    },
    {
      tag: "Nairobi's Best",
      title: "Your Crown",
      subtitle: "Our Expertise",
      desc: "Premium hair and beauty services at The Bazaar, Nairobi.",
    },
  ];

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const current = slides[slide];

  return (
    <section id="home" className="min-h-screen grid md:grid-cols-2 pt-[72px]">
      {/* Left — Cream */}
      <div className="bg-cream flex flex-col justify-center px-10 md:px-16 lg:px-24 py-20 relative overflow-hidden min-h-[60vh]">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display text-[22vw] md:text-[14vw] font-bold text-gold/5 leading-none">✂</span>
        </div>

        <div className="relative z-10">
          <p className="font-display italic text-gold text-2xl mb-4 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            {current.tag}
          </p>
          <h1 className="font-display text-[3.5rem] md:text-[4.2rem] font-bold text-charcoal leading-[1.05] mb-2 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            {current.title}
            <br />
            <span className="text-gold">{current.subtitle}</span>
          </h1>
          <p className="font-body text-charcoal/60 text-base mb-10 max-w-sm animate-fade-up" style={{ animationDelay: "0.35s", opacity: 0 }}>
            {current.desc}
          </p>

          <div className="flex flex-wrap gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.45s", opacity: 0 }}>
            <button
              onClick={() => handleNav("#booking")}
              className="bg-gold text-cream font-body text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold-dark transition-colors duration-300"
            >
              Book Appointment
            </button>
            <button
              onClick={() => handleNav("#services")}
              className="border-2 border-charcoal text-charcoal font-body text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              Our Services
            </button>
          </div>

          <div className="flex flex-wrap gap-5 animate-fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <div className="flex items-center gap-3 border-2 border-gold px-4 py-3 group hover:bg-gold transition-colors duration-300">
              <div className="bg-gold group-hover:bg-cream p-2 transition-colors">
                <Phone className="w-4 h-4 text-cream group-hover:text-gold transition-colors" />
              </div>
              <div>
                <p className="font-body text-[10px] text-gold group-hover:text-cream uppercase tracking-widest font-bold transition-colors">Call Us</p>
                <p className="font-body text-charcoal group-hover:text-cream font-bold text-sm transition-colors">+254 711 135090</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-2 border-gold px-4 py-3 group hover:bg-gold transition-colors duration-300">
              <div className="bg-gold group-hover:bg-cream p-2 transition-colors">
                <Mail className="w-4 h-4 text-cream group-hover:text-gold transition-colors" />
              </div>
              <div>
                <p className="font-body text-[10px] text-gold group-hover:text-cream uppercase tracking-widest font-bold transition-colors">Mail Us</p>
                <p className="font-body text-charcoal group-hover:text-cream font-bold text-sm transition-colors">booking@tezzaz-hair.com</p>
              </div>
            </div>
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-3 mt-10">
            <button onClick={() => setSlide(0)} className={`w-3 h-3 rounded-full border-2 border-gold transition-all ${slide === 0 ? "bg-gold" : "bg-transparent"}`} />
            <button onClick={() => setSlide(1)} className={`w-3 h-3 rounded-full border-2 border-gold transition-all ${slide === 1 ? "bg-gold" : "bg-transparent"}`} />
          </div>
        </div>
      </div>

      {/* Right — Image with nav arrows */}
      <div className="relative h-[50vh] md:h-auto overflow-hidden">
        <img src={heroImage} alt="Tezzaz Hair Salon Nairobi" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/30 to-transparent" />

        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 flex">
          {[
            { num: "500+", label: "Happy Clients" },
            { num: "8+", label: "Years Exp." },
            { num: "30+", label: "Hair Styles" },
          ].map((s) => (
            <div key={s.label} className="flex-1 bg-charcoal/80 backdrop-blur-sm p-4 text-center border-r border-gold/20 last:border-r-0">
              <p className="font-display text-gold text-xl font-bold">{s.num}</p>
              <p className="font-body text-cream/80 text-xs uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Arrow nav */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          <button onClick={() => setSlide((s) => (s === 0 ? 1 : 0))} className="bg-gold/80 hover:bg-gold p-3 transition-colors">
            <ChevronLeft className="w-4 h-4 text-cream" />
          </button>
          <button onClick={() => setSlide((s) => (s === 1 ? 0 : 1))} className="bg-charcoal/80 hover:bg-charcoal p-3 transition-colors">
            <ChevronRight className="w-4 h-4 text-cream" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
