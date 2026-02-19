import { useNavigate } from "react-router-dom";
import {
  Scissors,
  Sparkles,
  Hand,
  Footprints,
  Brush,
  Leaf,
  Star,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";

import serviceNatural from "@/assets/service-natural.jpg";
import serviceBraids from "@/assets/service-braids.jpg";
import serviceTreatment from "@/assets/service-treatment.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import servicePedicure from "@/assets/service-pedicure.jpg";
import serviceNails from "@/assets/service-nails.jpg";
import heroSalon from "@/assets/hero-salon.jpg";

const services = [
  {
    icon: Scissors,
    title: "Hair Styling",
    desc: "From blowouts and silk presses to creative cuts — our expert stylists craft stunning looks for every texture and occasion.",
    img: heroSalon,
    highlights: ["Blowouts & Silk Press", "Creative Cuts", "Color & Highlights", "Wedding & Event Styling"],
    duration: "45 min – 2 hrs",
  },
  {
    icon: Star,
    title: "Braids & Locs",
    desc: "Box braids, knotless braids, cornrows, twists and dreadlock grooming. Protective styling done with precision and love.",
    img: serviceBraids,
    highlights: ["Box Braids & Knotless", "Cornrows & Twists", "Dreadlock Installation", "Locs Retouch & Styling"],
    duration: "1 – 6 hrs",
  },
  {
    icon: Sparkles,
    title: "Nail Art & Polish",
    desc: "Creative nail art, gel nails, nail extensions and classic manicures. Bold designs or elegant nudes — your choice.",
    img: serviceNails,
    highlights: ["Gel & Acrylic Nails", "Nail Art & Designs", "Classic Manicure", "Nail Extensions"],
    duration: "30 min – 1.5 hrs",
  },
  {
    icon: Footprints,
    title: "Pedicure",
    desc: "Relaxing foot soaks with flower petals, exfoliation, nail shaping and polish — leave with soft, beautiful feet.",
    img: servicePedicure,
    highlights: ["Luxury Foot Soak", "Exfoliation & Scrub", "Nail Shaping & Polish", "Callus Removal"],
    duration: "45 min – 1 hr",
  },
  {
    icon: Brush,
    title: "Makeup",
    desc: "Glam, natural and bridal makeup artistry that celebrates and enhances your natural beauty.",
    img: serviceMakeup,
    highlights: ["Bridal Makeup", "Glam & Evening", "Natural / Everyday", "Special Events"],
    duration: "30 min – 1.5 hrs",
  },
  {
    icon: Leaf,
    title: "Skin Care",
    desc: "Facial treatments, deep cleansing and rejuvenating skin therapies tailored for melanin-rich skin.",
    img: serviceTreatment,
    highlights: ["Deep Cleansing Facial", "Hydrating Treatments", "Anti-Aging Therapy", "Skin Brightening"],
    duration: "45 min – 1.5 hrs",
  },
  {
    icon: Hand,
    title: "Natural Hair",
    desc: "TWA shaping, afro detangling, steam treatments and natural hair regimens that make your curls thrive.",
    img: serviceNatural,
    highlights: ["TWA Shaping", "Afro Detangling", "Steam Treatments", "Hair Growth Regimens"],
    duration: "1 – 2 hrs",
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/#booking");
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Our Services - Hair, Nails, Makeup & Skin Care"
        description="Explore Tezzaz Hair & Beauty Studio services in Nairobi: professional hair styling, braids & locs, nail art, pedicure, makeup, skin care and natural hair treatments. Book your appointment at The Bazaar Plaza today."
        canonicalPath="/services"
        keywords="Tezzaz services, hair styling Nairobi, braids Nairobi, nail art Nairobi CBD, pedicure Nairobi, makeup artist Kenya, skin care Nairobi, natural hair treatment, dreadlocks Nairobi, sisterlocks Kenya, beauty services Bazaar Plaza, locs retouch Nairobi, gel nails Nairobi, bridal makeup Nairobi"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Beauty Salon Services",
          "provider": {
            "@type": "BeautySalon",
            "name": "Tezzaz Hair & Beauty Studio",
            "url": "https://tezzaz-hair.com",
            "telephone": "+254711135090",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "The Bazaar Plaza, 10th Floor, Wing B, Suite 1025",
              "addressLocality": "Nairobi",
              "addressRegion": "Nairobi",
              "addressCountry": "KE",
            },
          },
          "areaServed": {
            "@type": "City",
            "name": "Nairobi",
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Beauty Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Styling" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Braids & Locs" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Nail Art & Polish" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pedicure" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Makeup" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Skin Care" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Natural Hair" } },
            ],
          },
        }}
      />
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={serviceBraids}
            alt="Tezzaz Hair Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center px-6">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-[hsl(var(--gold))] mb-3">
                What We Offer
              </p>
              <h1 className="font-display text-4xl md:text-6xl text-white font-bold mb-4">
                Our Services
              </h1>
              <div className="w-16 h-[2px] bg-[hsl(var(--gold))] mx-auto mb-4" />
              <p className="font-body text-white/60 text-sm max-w-lg mx-auto">
                Hair, Beauty & Nails all under one roof at The Bazaar — Nairobi's finest studio for every woman.
              </p>
            </div>
          </div>
        </section>

        {/* Services Intro */}
        <section className="section-padding border-b-2 border-black">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-[hsl(var(--gold))] mb-3">
              Tezzaz Hair & Beauty Studio
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-black font-bold mb-4">
              Premium Beauty Services in Nairobi
            </h2>
            <p className="font-body text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
              At Tezzaz Hair, we offer a wide range of professional beauty services — from expert hair styling
              and protective braids to luxurious nail art and rejuvenating skin care. Every service is crafted
              with love and precision by our talented team.
            </p>
          </div>
        </section>

        {/* Services Grid - Alternating Layout */}
        <section className="bg-white">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={service.title}
                className={`border-b-2 border-black ${isEven ? "bg-white" : "bg-gray-50"}`}
              >
                <div className="max-w-7xl mx-auto">
                  <div
                    className={`grid md:grid-cols-2 gap-0 ${
                      isEven ? "" : "md:direction-rtl"
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden h-72 md:h-[420px] ${
                        !isEven ? "md:order-2" : ""
                      }`}
                    >
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                      />
                      {/* Number badge */}
                      <div className="absolute top-0 left-0 bg-black text-white font-display text-xl font-bold w-12 h-12 flex items-center justify-center">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      {/* Icon badge */}
                      <div className="absolute bottom-4 right-4 bg-[hsl(var(--gold))] p-3">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
                        !isEven ? "md:order-1" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[2px] bg-[hsl(var(--gold))]" />
                        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--gold))] font-bold">
                          Service {String(idx + 1).padStart(2, "0")}
                        </p>
                      </div>

                      <h3 className="font-display text-3xl md:text-4xl text-black font-bold mb-4">
                        {service.title}
                      </h3>

                      <p className="font-body text-gray-500 text-sm leading-relaxed mb-6">
                        {service.desc}
                      </p>

                      {/* Duration */}
                      <div className="flex items-center gap-2 mb-6">
                        <Clock className="w-4 h-4 text-[hsl(var(--gold))]" />
                        <span className="font-body text-xs text-gray-400 uppercase tracking-wide">
                          Duration: {service.duration}
                        </span>
                      </div>

                      {/* Highlights */}
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {service.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--gold))] flex-shrink-0" />
                            <span className="font-body text-xs text-gray-600">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        onClick={scrollToBooking}
                        className="self-start flex items-center gap-2 bg-black text-white font-body text-xs tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-[hsl(var(--gold))] transition-colors duration-300 group"
                      >
                        Book Now
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section className="bg-black section-padding text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-[2px] bg-[hsl(var(--gold))] mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-4">
              Ready for a <span className="text-[hsl(var(--gold))]">Glow Up?</span>
            </h2>
            <p className="font-body text-white/50 text-sm mb-8 leading-relaxed">
              Visit us at The Bazaar, 10th Floor, Wing B — Suite 1025, Nairobi.
              Walk-ins welcome or book ahead for the VIP treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToBooking}
                className="bg-white text-black font-body text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[hsl(var(--gold))] hover:text-white transition-colors duration-300"
              >
                Book Appointment
              </button>
              <a
                href="https://wa.me/254711135090"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white font-body text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#1da851] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default ServicesPage;
