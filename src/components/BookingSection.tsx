import { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Booking request received! We'll confirm via phone/email shortly.");
    setForm({ name: "", email: "", phone: "", service: "", date: "", time: "", message: "" });
  };

  return (
    <section id="booking" className="relative overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="bg-gold" />
        <div className="bg-charcoal" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 min-h-[500px]">
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
          <div className="space-y-4">
            {[
              "✓ Hair, Beauty & Nails under one roof",
              "✓ Expert stylists for all hair types",
              "✓ Premium organic products",
              "✓ Mon–Sat 8am–8pm | Sun 9am–5pm",
            ].map((item) => (
              <p key={item} className="font-body text-cream/90 text-sm">{item}</p>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <h3 className="font-display text-2xl text-cream mb-8">Fill in Your Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="bg-transparent border border-cream/30 text-cream placeholder-cream/40 font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="bg-transparent border border-cream/30 text-cream placeholder-cream/40 font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (+254...)"
              className="w-full bg-transparent border border-cream/30 text-cream placeholder-cream/40 font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="w-full bg-charcoal border border-cream/30 text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            >
              <option value="" disabled>Select a Service</option>
              <option value="hair">Hair Styling</option>
              <option value="braids">Braids & Locs</option>
              <option value="manicure">Manicure & Nail Art</option>
              <option value="pedicure">Pedicure</option>
              <option value="makeup">Makeup</option>
              <option value="skincare">Skin Care</option>
              <option value="other">Other / Multiple Services</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="bg-transparent border border-cream/30 text-cream/80 font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="bg-charcoal border border-cream/30 text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              >
                <option value="" disabled>Preferred Time</option>
                <option>8:00 AM</option>
                <option>9:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>1:00 PM</option>
                <option>2:00 PM</option>
                <option>3:00 PM</option>
                <option>4:00 PM</option>
                <option>5:00 PM</option>
                <option>6:00 PM</option>
              </select>
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any special requests or notes..."
              rows={3}
              className="w-full bg-transparent border border-cream/30 text-cream placeholder-cream/40 font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gold text-cream font-body text-xs tracking-[0.2em] uppercase py-4 hover:bg-gold-light transition-colors duration-300 mt-2"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
