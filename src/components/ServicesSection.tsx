import serviceNatural from "@/assets/service-natural.jpg";
import serviceBraids from "@/assets/service-braids.jpg";
import serviceTreatment from "@/assets/service-treatment.jpg";

const services = [
  {
    image: serviceNatural,
    title: "Natural Hair Styling",
    description: "Expert styling for afros, coils, and natural textures. We celebrate your crown in all its glory.",
    price: "From KSh 1,500",
    alt: "Natural hair styling Nairobi",
  },
  {
    image: serviceBraids,
    title: "Braids & Cornrows",
    description: "Intricate braiding styles from box braids to knotless braids, done with precision and care.",
    price: "From KSh 2,500",
    alt: "Braids and protective styles Nairobi",
  },
  {
    image: serviceTreatment,
    title: "Hair Treatments",
    description: "Deep conditioning, protein treatments, and scalp care for healthy, thriving hair.",
    price: "From KSh 1,200",
    alt: "Hair treatment salon Nairobi",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-cream section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-display italic text-gold text-xl mb-3">What We Offer</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mb-4">
            Our <span className="text-gold">Signature Services</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card group overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-charcoal font-bold mb-3">{service.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-gold font-bold">{service.price}</span>
                  <button className="font-body text-xs tracking-widest uppercase text-charcoal border-b-2 border-gold hover:text-gold transition-colors duration-200 pb-0.5">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-0 border border-gold/30">
          {[
            { icon: "💆‍♀️", title: "Scalp Massage", price: "KSh 800" },
            { icon: "✂️", title: "Hair Trimming", price: "KSh 500" },
            { icon: "💈", title: "Locs Styling", price: "KSh 3,000" },
            { icon: "🌿", title: "Colour & Highlights", price: "KSh 4,000" },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`p-6 text-center border-gold/20 hover:bg-gold/5 transition-colors ${
                i < 3 ? "border-r border-gold/30" : ""
              } ${i >= 2 ? "" : "border-b border-gold/30 md:border-b-0"}`}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-display text-charcoal font-semibold mb-1">{item.title}</h4>
              <p className="font-body text-gold text-sm font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
