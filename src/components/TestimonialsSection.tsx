import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "The best salon experience I've ever had in Nairobi! Amara did my braids and I was blown away. The location at The Bazaar is super convenient too. I'll be back every month!",
    name: "Wanjiku Mwangi",
    role: "Hair Styling Client",
    initial: "W",
  },
  {
    quote:
      "Faith is an absolute nail genius! My gel nails have never looked this good. The whole team made me feel so welcome and pampered. Tezzaz Hair is my go-to salon in Nairobi.",
    name: "Achieng' Odhiambo",
    role: "Nail Art Client",
    initial: "A",
  },
  {
    quote:
      "Grace did my bridal makeup and I've never felt more beautiful! The skin care treatments here are also incredible. This salon is a true gem. Highly recommend to all Nairobi ladies!",
    name: "Fatuma Hassan",
    role: "Makeup & Skin Care Client",
    initial: "F",
  },
  {
    quote:
      "I came for braids and left with my whole look transformed. The team knows Kenyan hair like no one else. Very professional and the salon space is gorgeous.",
    name: "Njeri Kamau",
    role: "Braids & Locs Client",
    initial: "N",
  },
  {
    quote:
      "I drive from Westlands to The Bazaar every time I need a touch-up because no one else does it like Tezzaz Hair. Worth every shilling!",
    name: "Amina Yusuf",
    role: "Regular Client",
    initial: "A",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const prev = () => {
    setCurrent((i) => (i === 0 ? testimonials.length - 1 : i - 1));
    setIsAutoPlaying(false);
  };

  const next = () => {
    setCurrent((i) => (i + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Show 1 on mobile, 3 on desktop
  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section id="testimonials" className="bg-white section-padding border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-[hsl(var(--gold))] mb-2">Client Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl text-black font-bold">
              What Our Clients<br />
              <span className="border-b-4 border-black inline-block">Are Saying</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 group"
            >
              <ChevronLeft className="w-5 h-5 text-black group-hover:text-white" />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 bg-black flex items-center justify-center hover:bg-gray-800 transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="grid md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <div
              key={`${current}-${i}`}
              className={`border-2 p-8 transition-all duration-300 ${
                i === 0
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white hover:border-black"
              }`}
            >
              {/* Big quote mark */}
              <div className={`font-display text-[70px] leading-none select-none mb-2 ${
                i === 0 ? "text-white/20" : "text-gray-100"
              }`}>
                ❝
              </div>

              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3.5 h-3.5 fill-current ${
                      i === 0 ? "text-[hsl(var(--gold))]" : "text-[hsl(var(--gold))]"
                    }`}
                  />
                ))}
              </div>

              <p className={`font-body text-sm leading-relaxed mb-6 italic ${
                i === 0 ? "text-white/80" : "text-gray-600"
              }`}>
                "{t.quote}"
              </p>

              <div className={`flex items-center gap-4 pt-5 border-t ${
                i === 0 ? "border-white/20" : "border-gray-200"
              }`}>
                <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 font-display font-bold text-lg ${
                  i === 0 ? "bg-white text-black" : "bg-black text-white"
                }`}>
                  {t.initial}
                </div>
                <div>
                  <p className={`font-display font-semibold text-sm ${i === 0 ? "text-white" : "text-black"}`}>{t.name}</p>
                  <p className={`font-body text-xs uppercase tracking-widest ${
                    i === 0 ? "text-[hsl(var(--gold-light))]" : "text-[hsl(var(--gold))]"
                  }`}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setIsAutoPlaying(false); }}
              className={`h-1.5 transition-all duration-300 ${
                i === current % testimonials.length ? "w-8 bg-black" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
