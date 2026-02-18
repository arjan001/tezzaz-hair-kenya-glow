import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The best salon experience I've ever had in Nairobi! Amara did my braids and I was blown away. The location at The Bazaar is super convenient too. I'll be back every month!",
    name: "Wanjiku Mwangi",
    role: "Hair Styling Client",
  },
  {
    quote:
      "Faith is an absolute nail genius! My gel nails have never looked this good. The whole team made me feel so welcome and pampered. Tezzaz Hair is my go-to salon in Nairobi.",
    name: "Achieng' Odhiambo",
    role: "Nail Art Client",
  },
  {
    quote:
      "Grace did my bridal makeup and I've never felt more beautiful! The skin care treatments here are also incredible. This salon is a true gem. Highly recommend to all Nairobi ladies!",
    name: "Fatuma Hassan",
    role: "Makeup & Skin Care Client",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-cream section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-display italic text-gold text-xl mb-2">Testimonial</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mb-3">
            What Clients <span className="text-gold">Say!</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card p-8 shadow-md border-b-4 border-transparent hover:border-gold transition-all duration-300 relative"
            >
              {/* Big quote mark */}
              <div className="text-gold/20 font-display text-[80px] leading-none absolute top-4 left-6 select-none">❝</div>

              <div className="flex gap-1 mb-5 relative z-10">
                {Array(5).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="font-body text-charcoal/70 text-sm leading-relaxed mb-6 italic relative z-10">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-5 border-t border-border relative z-10">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-cream font-bold text-lg">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-display text-charcoal font-semibold text-sm">{t.name}</p>
                  <p className="font-body text-gold text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-10">
          <button className="w-10 h-10 bg-gold flex items-center justify-center hover:bg-gold-dark transition-colors">
            <span className="text-cream text-lg">‹</span>
          </button>
          <button className="w-10 h-10 bg-charcoal flex items-center justify-center hover:bg-charcoal-light transition-colors">
            <span className="text-cream text-lg">›</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
