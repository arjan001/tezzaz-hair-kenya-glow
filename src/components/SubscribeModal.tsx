import { useState, useEffect } from "react";
import { X } from "lucide-react";
import serviceNails from "@/assets/service-nails.jpg";
import serviceBraids from "@/assets/service-braids.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";

const offerSlides = [
  {
    img: serviceBraids,
    tag: "Protective Styling",
    title: "Get 20% Off Braids & Locs",
    desc: "Book any braids session this month and enjoy exclusive savings. Use code TEZZAZ20 at checkout.",
    cta: "Book Now",
  },
  {
    img: serviceNails,
    tag: "Nail Art Special",
    title: "Buy 2 Nail Services, Get 1 FREE",
    desc: "Mix and match manicures, pedicures and nail art — third service on us!",
    cta: "Claim Offer",
  },
  {
    img: serviceMakeup,
    tag: "New Products In Store",
    title: "Shop Our Beauty Range",
    desc: "Explore premium skincare, makeup & hair products now available in our Tezzaz Beauty Store.",
    cta: "Shop Now",
  },
];

interface SubscribeModalProps {
  open: boolean;
  onClose: () => void;
}

const SubscribeModal = ({ open, onClose }: SubscribeModalProps) => {
  const [email, setEmail] = useState("");
  const [dontShow, setDontShow] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setSlideIdx((i) => (i + 1) % offerSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  const slide = offerSlides[slideIdx];

  const handleClose = () => {
    if (dontShow) {
      localStorage.setItem("tezzaz_no_modal", "1");
    }
    onClose();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image panel */}
        <div className="relative md:w-2/5 h-52 md:h-auto overflow-hidden flex-shrink-0">
          <img
            key={slideIdx}
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover object-top transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-black/30" />
          {/* Slide dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {offerSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === slideIdx ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative">
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--gold))] mb-1">{slide.tag}</p>
            <h2 className="font-display text-2xl md:text-3xl text-black font-bold mb-3 leading-tight">{slide.title}</h2>
            <p className="font-body text-gray-500 text-sm leading-relaxed mb-6">{slide.desc}</p>
          </div>

          {subscribed ? (
            <div className="bg-black text-white font-body text-sm text-center px-6 py-4">
              ✅ Subscribed! Welcome to Tezzaz Hair.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="font-body text-xs text-gray-700 uppercase tracking-widest block mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full border-2 border-gray-200 focus:border-black font-body text-sm px-4 py-3 focus:outline-none transition-colors bg-white text-black placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[hsl(var(--gold))] text-white font-body text-sm uppercase tracking-widest py-3.5 hover:bg-[hsl(var(--gold-dark))] transition-colors font-bold"
              >
                Subscribe
              </button>
              <button
                type="button"
                onClick={() => handleNav("#booking")}
                className="w-full bg-black text-white font-body text-xs uppercase tracking-widest py-3 hover:bg-gray-800 transition-colors"
              >
                {slide.cta} — Visit Salon →
              </button>

              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={dontShow}
                  onChange={(e) => setDontShow(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <span className="font-body text-gray-500 text-xs">Don't show this popup again</span>
              </label>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
