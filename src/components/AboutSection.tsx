import aboutInterior from "@/assets/about-interior.jpg";
import { Phone } from "lucide-react";

const AboutSection = () => {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="bg-cream">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 items-stretch">
        {/* Left — Image + Phone CTA */}
        <div className="relative">
          <img
            src={aboutInterior}
            alt="Tezzaz Hair salon interior Nairobi"
            className="w-full h-full object-cover min-h-[400px] md:min-h-[520px]"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-charcoal/90 flex items-center gap-4 px-6 py-5">
            <div className="bg-gold p-3">
              <Phone className="w-5 h-5 text-cream" />
            </div>
            <div>
              <p className="font-body text-cream/60 text-xs uppercase tracking-widest">Call us anytime</p>
              <p className="font-display text-cream text-xl font-bold">+254 700 123 456</p>
            </div>
            <button
              onClick={() => handleNav("#booking")}
              className="ml-auto bg-gold text-cream font-body text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold-dark transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Right — Content */}
        <div className="flex flex-col justify-center px-10 md:px-14 lg:px-16 py-16">
          <p className="font-display italic text-gold text-xl mb-3">About Us</p>
          <h2 className="font-display text-4xl md:text-[2.8rem] text-charcoal font-bold leading-tight mb-5">
            Why People<br />
            <span className="text-gold">Choose Us!</span>
          </h2>
          <p className="font-body text-charcoal/60 leading-relaxed mb-8 text-sm">
            At Tezzaz Hair, we celebrate the beauty and diversity of African hair with world-class artistry. 
            Located at The Bazaar, Nairobi, our expert team of stylists, beauty therapists and nail technicians 
            are dedicated to giving you a luxury experience every time you visit.
          </p>
          <p className="font-body text-charcoal/60 leading-relaxed mb-10 text-sm">
            We specialise in natural hair, protective styles, locs, braids, nail art, professional makeup and 
            rejuvenating skin care treatments — all under one roof.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-10 border-t border-gold/20 pt-8">
            {[
              { num: "2", label: "Locations in Nairobi" },
              { num: "90+", label: "Happy Clients Monthly" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center py-4 border border-gold/30">
                <p className="font-display text-4xl text-charcoal font-bold">{num}</p>
                <p className="font-body text-gold text-xs uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleNav("#booking")}
            className="self-start bg-gold text-cream font-body text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold-dark transition-colors duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
