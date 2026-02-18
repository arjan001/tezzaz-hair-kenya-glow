import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll contact you soon to confirm your appointment.");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="bg-charcoal section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-display italic text-gold text-xl mb-3">Get In Touch</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-bold mb-4">
            Book Your <span className="text-gold">Appointment</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h3 className="font-display text-2xl text-cream mb-8">Visit Us in Nairobi</h3>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Our Location",
                  text: "Westlands Commercial Center\nNairobi, Kenya",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  text: "+254 700 123 456\n+254 711 987 654",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  text: "hello@tezzazhair.co.ke\nbookings@tezzazhair.co.ke",
                },
                {
                  icon: Clock,
                  title: "Working Hours",
                  text: "Mon – Sat: 8:00 AM – 8:00 PM\nSunday: 9:00 AM – 5:00 PM",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-5">
                  <div className="bg-gold p-3 h-fit">
                    <Icon className="w-5 h-5 text-cream" />
                  </div>
                  <div>
                    <p className="font-body text-gold text-xs uppercase tracking-widest font-bold mb-1">{title}</p>
                    {text.split("\n").map((line) => (
                      <p key={line} className="font-body text-cream/70">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="bg-charcoal-light border border-gold/30 text-cream placeholder-cream/40 font-body px-4 py-3 focus:outline-none focus:border-gold transition-colors w-full"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="bg-charcoal-light border border-gold/30 text-cream placeholder-cream/40 font-body px-4 py-3 focus:outline-none focus:border-gold transition-colors w-full"
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number (+254...)"
              className="bg-charcoal-light border border-gold/30 text-cream placeholder-cream/40 font-body px-4 py-3 focus:outline-none focus:border-gold transition-colors w-full"
            />
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="bg-charcoal-light border border-gold/30 text-cream font-body px-4 py-3 focus:outline-none focus:border-gold transition-colors w-full"
            >
              <option value="" disabled className="text-cream/40">Select a Service</option>
              <option value="natural">Natural Hair Styling</option>
              <option value="braids">Braids & Cornrows</option>
              <option value="treatment">Hair Treatment</option>
              <option value="locs">Locs Styling</option>
              <option value="colour">Colour & Highlights</option>
              <option value="other">Other</option>
            </select>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your hair goals..."
              rows={4}
              className="bg-charcoal-light border border-gold/30 text-cream placeholder-cream/40 font-body px-4 py-3 focus:outline-none focus:border-gold transition-colors w-full resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gold text-cream font-body text-sm tracking-widest uppercase px-8 py-4 hover:bg-gold-dark transition-colors duration-300"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
