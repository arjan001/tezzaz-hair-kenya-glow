import { useState } from "react";
import { MessageCircle, Calendar, Clock, User, Mail, Phone, FileText } from "lucide-react";

const BookingSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Compose mailto link for email booking
    const subject = encodeURIComponent(`Booking Request – ${form.service}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nDate: ${form.date}\nTime: ${form.time}\nNotes: ${form.message}`
    );
    window.location.href = `mailto:booking@tezzaz-hair.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", email: "", phone: "", service: "", date: "", time: "", message: "" });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello Tezzaz Hair! I'd like to book an appointment.\n\nName: ${form.name || "..."}\nService: ${form.service || "..."}\nDate: ${form.date || "..."}\nTime: ${form.time || "..."}`
    );
    window.open(`https://wa.me/254711135090?text=${message}`, "_blank");
  };

  return (
    <section id="booking" className="relative overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        <div className="bg-gold" />
        <div className="bg-charcoal" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 min-h-[560px]">
        {/* Left — CTA */}
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <p className="font-display italic text-cream/80 text-xl mb-4">Reserve Your Spot</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-cream leading-tight mb-4">
            Book Your<br />
            Appointment
          </h2>
          <div className="w-16 h-[2px] bg-cream/50 mb-8" />
          <p className="font-body text-cream/80 text-base leading-relaxed mb-10 max-w-sm">
            Visit us at <strong>The Bazaar, 10th Floor, Wing B — Suite 1025</strong>, Nairobi.<br /><br />
            Our team of specialists are ready to give you a luxury experience you won't forget.
          </p>

          {/* Highlights */}
          <div className="space-y-3 mb-8">
            {[
              "✓ Hair, Beauty & Nails under one roof",
              "✓ Expert stylists for all hair types",
              "✓ Premium organic products",
              "✓ Mon–Sat 8am–8pm | Sun 9am–5pm",
            ].map((item) => (
              <p key={item} className="font-body text-cream/90 text-sm">{item}</p>
            ))}
          </div>

          {/* WhatsApp Quick Book */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-3 bg-[#25D366] text-white font-body text-sm tracking-wide px-6 py-4 hover:bg-[#1fb855] transition-colors max-w-xs group"
          >
            <MessageCircle className="w-5 h-5" />
            <div className="text-left">
              <p className="font-bold text-xs uppercase tracking-widest">Quick Book via WhatsApp</p>
              <p className="text-white/80 text-xs">+254 711 135090</p>
            </div>
          </button>
        </div>

        {/* Right — Form */}
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <h3 className="font-display text-2xl text-cream mb-2">Fill in Your Details</h3>
          <p className="font-body text-cream/60 text-xs mb-8 uppercase tracking-widest">
            We'll confirm via email & phone
          </p>

          {submitted && (
            <div className="bg-gold/20 border border-gold/40 text-cream font-body text-sm px-4 py-3 mb-6">
              ✅ Booking email sent! We'll confirm your appointment shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cream/40" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full bg-transparent border border-cream/30 text-cream placeholder-cream/40 font-body text-sm pl-9 pr-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cream/40" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-transparent border border-cream/30 text-cream placeholder-cream/40 font-body text-sm pl-9 pr-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cream/40" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone (+254...)"
                className="w-full bg-transparent border border-cream/30 text-cream placeholder-cream/40 font-body text-sm pl-9 pr-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="w-full bg-charcoal border border-cream/30 text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            >
              <option value="" disabled>Select a Service</option>
              <option value="Hair Styling">Hair Styling</option>
              <option value="Braids & Locs">Braids & Locs</option>
              <option value="Nail Art & Polish">Nail Art & Polish</option>
              <option value="Pedicure">Pedicure</option>
              <option value="Makeup">Makeup</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Natural Hair">Natural Hair</option>
              <option value="Multiple Services">Multiple Services</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cream/40" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-transparent border border-cream/30 text-cream/80 font-body text-sm pl-9 pr-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cream/40" />
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-charcoal border border-cream/30 text-cream font-body text-sm pl-9 pr-4 py-3 focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="" disabled>Preferred Time</option>
                  {["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-3.5 h-3.5 text-cream/40" />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Any special requests or notes..."
                rows={3}
                className="w-full bg-transparent border border-cream/30 text-cream placeholder-cream/40 font-body text-sm pl-9 pr-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type="submit"
                className="bg-gold text-cream font-body text-xs tracking-[0.2em] uppercase py-4 hover:bg-gold-dark transition-colors duration-300"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="bg-[#25D366] text-white font-body text-xs tracking-[0.2em] uppercase py-4 hover:bg-[#1fb855] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
