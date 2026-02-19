import { Scissors, Phone, Mail, MapPin, Clock } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.2 8.2 0 004.79 1.53V6.83a4.85 4.85 0 01-1.02-.14z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FooterSection = () => {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black">
      {/* Top footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-0 mb-5">
            <div className="bg-white px-3 py-3 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-black rotate-[-30deg]" />
              <span className="font-display text-lg text-black font-semibold">Tezzaz</span>
            </div>
            <div className="px-3 flex items-center border-t border-b border-r border-white/20 h-full py-3">
              <span className="font-display text-lg text-white">Hair</span>
            </div>
          </div>
          <p className="font-body text-white/50 text-sm leading-relaxed mb-5">
            Nairobi's premier hair, beauty & nail salon. Located at The Bazaar, 10th Floor, Wing B — Suite 1025.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[hsl(var(--gold))] mt-0.5 flex-shrink-0" />
              <p className="font-body text-white/50 text-xs leading-relaxed">The Bazaar, 10th Floor, Wing B, Suite 1025, Nairobi</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[hsl(var(--gold))] flex-shrink-0" />
              <a href="tel:+254711135090" className="font-body text-white/50 text-xs hover:text-white transition-colors">+254 711 135090</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[hsl(var(--gold))] flex-shrink-0" />
              <a href="mailto:booking@tezzaz-hair.com" className="font-body text-white/50 text-xs hover:text-white transition-colors">booking@tezzaz-hair.com</a>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" />
              <p className="font-body text-white/50 text-xs leading-relaxed">Mon–Sat: 8am–8pm<br />Sun: 9am–5pm</p>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href="https://www.instagram.com/tezzaz_hair.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 p-2.5 text-white/50 hover:bg-white hover:text-black transition-all duration-200"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.tiktok.com/@tezzaz1"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 p-2.5 text-white/50 hover:bg-white hover:text-black transition-all duration-200"
              title="TikTok"
            >
              <TikTokIcon />
            </a>
            <a
              href="https://wa.me/254711135090"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 p-2.5 text-white/50 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-body text-white text-xs uppercase tracking-[0.2em] mb-6 pb-3 border-b border-white/10">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              { label: "Home", href: "#home" },
              { label: "About Us", href: "#about" },
              { label: "Our Services", href: "#services" },
              { label: "Shop", href: "#shop" },
              { label: "Book Appointment", href: "#booking" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="font-body text-white/50 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[hsl(var(--gold))]/50 group-hover:bg-[hsl(var(--gold))] transition-colors" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-body text-white text-xs uppercase tracking-[0.2em] mb-6 pb-3 border-b border-white/10">
            Our Services
          </h4>
          <ul className="space-y-3">
            {[
              "Hair Styling",
              "Braids & Locs",
              "Nail Art & Polish",
              "Pedicure",
              "Makeup",
              "Skin Care",
              "Natural Hair",
            ].map((s) => (
              <li key={s}>
                <button
                  onClick={() => handleNav("#services")}
                  className="font-body text-white/50 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[hsl(var(--gold))]/50 group-hover:bg-[hsl(var(--gold))] transition-colors" />
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Map + Newsletter */}
        <div>
          <h4 className="font-body text-white text-xs uppercase tracking-[0.2em] mb-6 pb-3 border-b border-white/10">
            Find Us
          </h4>
          <div className="mb-5 overflow-hidden border border-white/10">
            <iframe
              title="Tezzaz Hair Location – The Bazaar Nairobi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8186538264573!2d36.81985!3d-1.28209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22ef09a33%3A0x1a2b3c4d5e6f7890!2sThe%20Bazaar%20Shopping%20Centre%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
              width="100%"
              height="160"
              style={{ border: 0, filter: "grayscale(100%) contrast(1.2)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="font-body text-white/40 text-xs mb-3 leading-relaxed">
            Subscribe for style tips & exclusive Nairobi offers.
          </p>
          <div className="flex mb-5">
            <input
              type="email"
              placeholder="Your email..."
              className="flex-1 bg-transparent border border-white/20 text-white placeholder-white/30 font-body text-xs px-4 py-3 focus:outline-none focus:border-white/60 transition-colors"
            />
            <button className="bg-white text-black px-4 py-3 hover:bg-gray-200 transition-colors font-body text-xs uppercase tracking-wide">
              Go
            </button>
          </div>

          <a
            href="https://wa.me/254711135090"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 px-4 py-3 hover:bg-[#25D366]/20 transition-colors group"
          >
            <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="font-body text-white text-xs font-bold">Book via WhatsApp</p>
              <p className="font-body text-white/40 text-xs">+254 711 135090</p>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/30 text-xs">
            © 2025 Tezzaz Hair. All Rights Reserved. | The Bazaar, 10th Floor, Suite 1025, Nairobi, Kenya.
          </p>
          <p className="font-body text-white/30 text-xs">
            Built by{" "}
            <a
              href="http://oneplusafrica.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--gold))] hover:text-white transition-colors"
            >
              OnePlus Africa Tech Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
