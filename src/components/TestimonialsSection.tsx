import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amara Wanjiku",
    role: "Regular Client",
    review:
      "Tezzaz Hair is absolutely amazing! They understand African hair so well. My natural hair has never looked this healthy and gorgeous. I won't go anywhere else in Nairobi!",
    stars: 5,
  },
  {
    name: "Fatuma Akinyi",
    role: "Loyal Customer",
    review:
      "The team here are true artists. I came in for box braids and I was blown away by the quality and care. The salon is so welcoming and the atmosphere is luxury!",
    stars: 5,
  },
  {
    name: "Njeri Kamau",
    role: "New Client",
    review:
      "I had my locs done here for the first time and I absolutely love them. Very professional staff, clean environment, and the results were beyond my expectations!",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-cream section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-display italic text-gold text-xl mb-3">Happy Clients</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mb-4">
            What Our Clients <span className="text-gold">Say</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card p-8 shadow-md relative group hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-gold/20 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="font-body text-muted-foreground leading-relaxed mb-6 italic">
                "{t.review}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="font-display text-gold font-bold text-lg">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-display text-charcoal font-semibold">{t.name}</p>
                  <p className="font-body text-gold text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
