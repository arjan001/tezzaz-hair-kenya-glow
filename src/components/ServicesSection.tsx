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
    <section id="services" className="bg-white section-padding border-t-2 border-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-[hsl(var(--gold))] mb-2">What We Offer</p>
            <h2 className="font-display text-4xl md:text-5xl text-black font-bold">
              Our Services
            </h2>
          </div>
          <p className="font-body text-gray-500 text-sm max-w-sm">
            Hair, Beauty & Nails all under one roof at The Bazaar — Nairobi's finest.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-200 border-2 border-black">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative overflow-hidden bg-white hover:bg-black transition-all duration-300"
              >
                {/* Image */}
                <div className="overflow-hidden h-44 relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 group-hover:opacity-40"
                  />
                  {/* Icon badge */}
                  <div className="absolute top-3 right-3 bg-black group-hover:bg-white p-2 shadow-lg transition-colors">
                    <Icon className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg text-black group-hover:text-white font-bold mb-2 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-body text-gray-500 group-hover:text-white/60 text-xs leading-relaxed mb-4 transition-colors">
                    {service.desc}
                  </p>
                  <button
                    onClick={() => handleNav("#booking")}
                    className="font-body text-[10px] tracking-[0.2em] uppercase text-black group-hover:text-[hsl(var(--gold))] border-b border-black group-hover:border-[hsl(var(--gold))] hover:opacity-80 transition-colors duration-200 pb-0.5"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            );
          })}

          {/* CTA tile */}
          <div className="group bg-black flex flex-col items-center justify-center p-8 text-center min-h-[280px]">
            <div className="w-12 h-[2px] bg-[hsl(var(--gold))] mb-6" />
            <p className="font-display text-white text-xl font-bold mb-3 leading-tight">
              Ready for a <span className="text-[hsl(var(--gold))]">Glow Up?</span>
            </p>
            <p className="font-body text-white/50 text-xs leading-relaxed mb-6">
              The Bazaar, 10th Floor, Wing B — Suite 1025
            </p>
            <button
              onClick={() => handleNav("#booking")}
              className="bg-white text-black font-body text-xs tracking-[0.2em] uppercase px-7 py-3 hover:bg-[hsl(var(--gold))] hover:text-white transition-colors duration-300"
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
