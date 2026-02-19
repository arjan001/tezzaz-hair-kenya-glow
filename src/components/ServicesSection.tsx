import serviceNatural from "@/assets/service-natural.jpg";
import serviceBraids from "@/assets/service-braids.jpg";
import serviceTreatment from "@/assets/service-treatment.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import servicePedicure from "@/assets/service-pedicure.jpg";
import serviceNails from "@/assets/service-nails.jpg";
import heroSalon from "@/assets/hero-salon.jpg";
import { Scissors, Sparkles, Hand, Footprints, Brush, Leaf, Star } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Hair Styling",
    desc: "From blowouts and silk presses to creative cuts — our expert stylists craft stunning looks for every texture and occasion.",
    img: heroSalon,
  },
  {
    icon: Star,
    title: "Braids & Locs",
    desc: "Box braids, knotless braids, cornrows, twists and dreadlock grooming. Protective styling done with precision and love.",
    img: serviceBraids,
  },
  {
    icon: Sparkles,
    title: "Nail Art & Polish",
    desc: "Creative nail art, gel nails, nail extensions and classic manicures. Bold designs or elegant nudes — your choice.",
    img: serviceNails,
  },
  {
    icon: Footprints,
    title: "Pedicure",
    desc: "Relaxing foot soaks with flower petals, exfoliation, nail shaping and polish — leave with soft, beautiful feet.",
    img: servicePedicure,
  },
  {
    icon: Brush,
    title: "Makeup",
    desc: "Glam, natural and bridal makeup artistry that celebrates and enhances your natural beauty.",
    img: serviceMakeup,
  },
  {
    icon: Leaf,
    title: "Skin Care",
    desc: "Facial treatments, deep cleansing and rejuvenating skin therapies tailored for melanin-rich skin.",
    img: serviceTreatment,
  },
  {
    icon: Hand,
    title: "Natural Hair",
    desc: "TWA shaping, afro detangling, steam treatments and natural hair regimens that make your curls thrive.",
    img: serviceNatural,
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
          <div className="w-16 h-[2px] bg-gold mx-auto mb-4" />
          <p className="font-body text-charcoal/60 max-w-xl mx-auto text-sm leading-relaxed">
            Hair, Beauty & Nails all under one roof at The Bazaar — Nairobi's finest.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-0 border border-gold/20">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative overflow-hidden border border-gold/10 hover:border-gold/40 transition-all duration-300"
                style={{ background: i % 2 === 0 ? "hsl(var(--cream))" : "hsl(var(--cream-dark))" }}
              >
                {/* Image */}
                <div className="overflow-hidden h-44 relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gold overlay strip on hover */}
                  <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-gold/20 transition-colors duration-300" />
                  {/* Icon badge */}
                  <div className="absolute top-3 right-3 bg-gold p-2 shadow-lg">
                    <Icon className="w-4 h-4 text-cream" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg text-charcoal font-bold mb-2 group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-body text-charcoal/60 text-xs leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <button
                    onClick={() => handleNav("#booking")}
                    className="font-body text-[10px] tracking-[0.2em] uppercase text-gold border-b border-gold hover:text-charcoal hover:border-charcoal transition-colors duration-200 pb-0.5"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            );
          })}

          {/* CTA tile */}
          <div className="group bg-charcoal flex flex-col items-center justify-center p-8 text-center border border-gold/20 min-h-[280px]">
            <div className="w-16 h-[2px] bg-gold mb-6" />
            <p className="font-display text-cream text-xl font-bold mb-3 leading-tight">
              Ready for a <span className="text-gold">Glow Up?</span>
            </p>
            <p className="font-body text-cream/60 text-xs leading-relaxed mb-6">
              Book your session at The Bazaar, 10th Floor, Wing B — Suite 1025
            </p>
            <button
              onClick={() => handleNav("#booking")}
              className="bg-gold text-cream font-body text-xs tracking-[0.2em] uppercase px-7 py-3 hover:bg-gold-dark transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
