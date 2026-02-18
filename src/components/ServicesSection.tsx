import heroSalon from "@/assets/hero-salon.jpg";
import serviceNatural from "@/assets/service-natural.jpg";
import serviceBraids from "@/assets/service-braids.jpg";
import serviceTreatment from "@/assets/service-treatment.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import servicePedicure from "@/assets/service-pedicure.jpg";
import serviceNails from "@/assets/service-nails.jpg";

// SVG Icons for services
const icons = {
  hair: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M24 4C14 4 8 12 8 20c0 8 4 14 16 18M24 4c10 0 16 8 16 16 0 8-4 14-16 18"/>
      <path d="M20 22c0-4 4-6 4-6s4 2 4 6M18 32c2 4 6 6 6 6s4-2 6-6"/>
    </svg>
  ),
  braids: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 8c0 0 2 8-2 16s-2 16-2 16M24 6c0 0 2 8 0 18s0 18 0 18M32 8c0 0-2 8 2 16s2 16 2 16"/>
      <path d="M14 16c5 2 15 2 20 0M12 28c6 2 18 2 24 0"/>
    </svg>
  ),
  nails: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="10" y="6" width="8" height="14" rx="4"/>
      <rect x="20" y="4" width="8" height="16" rx="4"/>
      <rect x="30" y="6" width="8" height="14" rx="4"/>
      <path d="M8 24h32l-4 18H12L8 24z"/>
    </svg>
  ),
  pedicure: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="24" cy="32" rx="16" ry="8"/>
      <path d="M12 16c0-6 6-10 12-10s12 4 12 10"/>
      <circle cx="18" cy="14" r="3"/><circle cx="30" cy="14" r="3"/>
    </svg>
  ),
  makeup: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 38L32 10l6 6-22 28-6-6z"/>
      <path d="M28 14l6 6M10 38c-2 2-4 2-4 0 0-2 2-4 4-4l6 6c0 2-2 4-4 2z"/>
    </svg>
  ),
  skincare: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="24" cy="22" r="14"/>
      <path d="M24 8C16 8 10 14 10 22c0 3 1 6 3 8"/>
      <path d="M24 36c4 0 8-2 10-6"/>
      <circle cx="24" cy="22" r="6"/>
    </svg>
  ),
};

const services = [
  {
    icon: icons.hair,
    title: "Hair Styling",
    desc: "From blowouts and silk presses to creative cuts — our expert stylists craft stunning looks for every texture and occasion.",
    img: heroSalon,
  },
  {
    icon: icons.braids,
    title: "Braids & Locs",
    desc: "Box braids, knotless braids, cornrows, twists and dreadlock grooming. Protective styling done with precision and love.",
    img: serviceBraids,
  },
  {
    icon: icons.nails,
    title: "Manicure & Nail Art",
    desc: "Classic manicures, gel nails, nail art designs and extensions. Your nails, perfectly polished.",
    img: serviceNails,
  },
  {
    icon: icons.pedicure,
    title: "Pedicure",
    desc: "Relaxing foot soaks, exfoliation, nail shaping and polish — leave with soft, beautiful feet.",
    img: servicePedicure,
  },
  {
    icon: icons.makeup,
    title: "Makeup",
    desc: "Glam, natural and bridal makeup artistry that celebrates and enhances your natural beauty.",
    img: serviceMakeup,
  },
  {
    icon: icons.skincare,
    title: "Skin Care",
    desc: "Facial treatments, deep cleansing and rejuvenating skin therapies tailored for melanin-rich skin.",
    img: serviceTreatment,
  },
];

const ServicesSection = () => {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="bg-cream section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-display italic text-gold text-xl mb-2">Our Services</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mb-3">
            Explore Our <span className="text-gold">Services</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card border border-transparent hover:border-gold/30 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              {/* Image */}
              <div className="overflow-hidden h-52 relative">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/40 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 pt-5">
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-gold flex-shrink-0">{service.icon}</div>
                  <h3 className="font-display text-xl text-charcoal font-bold group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.desc}
                </p>
                <button
                  onClick={() => handleNav("#booking")}
                  className="font-body text-xs tracking-[0.2em] uppercase text-gold border-b-2 border-gold hover:text-charcoal hover:border-charcoal transition-colors duration-200 pb-0.5"
                >
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
