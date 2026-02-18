import heroImage from "@/assets/hero-salon.jpg";
import { Phone, Mail } from "lucide-react";

const Hero = () => {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen grid md:grid-cols-2">
      {/* Left Content */}
      <div className="bg-cream flex flex-col justify-center px-10 md:px-16 lg:px-24 py-32 relative overflow-hidden">
        {/* Decorative scissors watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[200px] font-display text-gold/5 select-none pointer-events-none leading-none">
          ✂
        </div>

        <p className="font-display italic text-gold text-2xl mb-4 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          Welcome to
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.25s", opacity: 0 }}>
          Nairobi's Premier<br />
          <span className="text-gold">Hair Salon</span><br />
          for Women
        </h1>
        <p className="font-body text-charcoal-light text-lg mb-10 max-w-md animate-fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          Experience world-class hair artistry celebrating African beauty in the heart of Nairobi, Kenya.
        </p>

        <div className="flex flex-wrap gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.55s", opacity: 0 }}>
          <button
            onClick={() => handleScroll("#contact")}
            className="bg-gold text-cream font-body text-sm tracking-widest uppercase px-8 py-4 hover:bg-gold-dark transition-colors duration-300"
          >
            Book Appointment
          </button>
          <button
            onClick={() => handleScroll("#services")}
            className="border-2 border-charcoal text-charcoal font-body text-sm tracking-widest uppercase px-8 py-4 hover:bg-charcoal hover:text-cream transition-all duration-300"
          >
            Our Services
          </button>
        </div>

        <div className="flex flex-wrap gap-6 animate-fade-up" style={{ animationDelay: "0.7s", opacity: 0 }}>
          <div className="flex items-center gap-4 border-2 border-gold px-4 py-3">
            <div className="bg-gold p-2">
              <Phone className="w-5 h-5 text-cream" />
            </div>
            <div>
              <p className="font-body text-xs text-gold uppercase tracking-widest font-bold">Call Us</p>
              <p className="font-body text-charcoal font-bold">+254 700 123 456</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-2 border-gold px-4 py-3">
            <div className="bg-gold p-2">
              <Mail className="w-5 h-5 text-cream" />
            </div>
            <div>
              <p className="font-body text-xs text-gold uppercase tracking-widest font-bold">Mail Us</p>
              <p className="font-body text-charcoal font-bold">hello@tezzazhair.co.ke</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative h-[50vh] md:h-auto overflow-hidden">
        <img
          src={heroImage}
          alt="Tezzaz Hair Salon - Professional hair styling in Nairobi"
          className="w-full h-full object-cover object-center animate-fade-in"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-charcoal/20" />

        {/* Stats overlay */}
        <div className="absolute bottom-8 left-8 right-8 flex gap-4">
          {[
            { num: "500+", label: "Happy Clients" },
            { num: "8+", label: "Years Experience" },
            { num: "30+", label: "Hair Styles" },
          ].map((stat) => (
            <div key={stat.label} className="bg-charcoal/80 backdrop-blur-sm px-4 py-3 flex-1 text-center">
              <p className="font-display text-gold text-xl font-bold">{stat.num}</p>
              <p className="font-body text-cream text-xs uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
