import { Scissors, Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";

const FooterSection = () => {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[hsl(25,15%,8%)]">
      {/* Top footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-0 mb-5">
            <div className="bg-gold px-3 py-3 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-cream rotate-[-30deg]" />
              <span className="font-display text-lg text-cream font-semibold">Tezzaz</span>
            </div>
            <div className="px-3 flex items-center border-t border-b border-r border-gold/30 h-full py-3">
              <span className="font-display text-lg text-cream">Hair</span>
            </div>
          </div>
          <p className="font-body text-cream/50 text-sm leading-relaxed mb-5">
            Nairobi's premier hair, beauty & nail salon. Located at The Bazaar, 10th Floor, Wing B — Suite 1025.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <p className="font-body text-cream/50 text-xs leading-relaxed">The Bazaar, 10th Floor, Wing B, Suite 1025, Nairobi</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              <p className="font-body text-cream/50 text-xs">+254 711 135090
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              <p className="font-body text-cream/50 text-xs">hello@tezzazhair.co.ke</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <p className="font-body text-cream/50 text-xs leading-relaxed">Mon–Sat: 8am–8pm<br />Sun: 9am–5pm</p>
            </div>
          </div>

          <div className="flex gap-2">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => <a key={i} href="#" className="border border-gold/30 p-2 hover:bg-gold hover:border-gold transition-all duration-200 group">
                <Icon className="w-3.5 h-3.5 text-gold group-hover:text-cream transition-colors" />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-cream font-semibold text-lg mb-5 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-[2px] after:bg-gold">
            Quick Links
          </h4>
          <ul className="space-y-3 mt-4">
            {[
            { label: "Home", href: "#home" },
            { label: "About Us", href: "#about" },
            { label: "Our Services", href: "#services" },
            { label: "Gallery", href: "#gallery" },
            { label: "Team", href: "#team" },
            { label: "Contact", href: "#contact" }].
            map((link) =>
            <li key={link.label}>
                <button
                onClick={() => handleNav(link.href)}
                className="font-body text-cream/50 text-sm hover:text-gold transition-colors flex items-center gap-2 group">

                  <span className="w-1.5 h-1.5 bg-gold/50 group-hover:bg-gold transition-colors" />
                  {link.label}
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-cream font-semibold text-lg mb-5 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-[2px] after:bg-gold">
            Our Services
          </h4>
          <ul className="space-y-3 mt-4">
            {[
            "Hair Styling",
            "Braids & Locs",
            "Manicure & Nail Art",
            "Pedicure",
            "Makeup",
            "Skin Care"].
            map((s) =>
            <li key={s}>
                <button
                onClick={() => handleNav("#services")}
                className="font-body text-cream/50 text-sm hover:text-gold transition-colors flex items-center gap-2 group">

                  <span className="w-1.5 h-1.5 bg-gold/50 group-hover:bg-gold transition-colors" />
                  {s}
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-display text-cream font-semibold text-lg mb-5 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-[2px] after:bg-gold">
            Newsletter
          </h4>
          <p className="font-body text-cream/50 text-sm mb-5 mt-4 leading-relaxed">
            Subscribe for hair tips, style inspiration & exclusive Nairobi offers.
          </p>
          <div className="flex mb-5">
            <input
              type="email"
              placeholder="Your email address..."
              className="flex-1 bg-transparent border border-gold/30 text-cream placeholder-cream/30 font-body text-xs px-4 py-3 focus:outline-none focus:border-gold" />

            <button className="bg-gold px-5 py-3 hover:bg-gold-dark transition-colors">
              <span className="text-cream text-xs font-body uppercase tracking-wide">Go</span>
            </button>
          </div>
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/254700123456"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 px-4 py-3 hover:bg-[#25D366]/20 transition-colors group">

            <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white text-sm font-bold">W</div>
            <div>
              <p className="font-body text-cream text-xs font-bold">Book via WhatsApp</p>
              <p className="font-body text-cream/50 text-xs">​+254 711 135090</p>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-cream/30 text-xs">
            © 2025 Tezzaz Hair. All Rights Reserved. | The Bazaar, 10th Floor, Suite 1025, Nairobi, Kenya.
          </p>
          <p className="font-body text-cream/30 text-xs">
            Designed with ❤️ for African Beauty
          </p>
        </div>
      </div>
    </footer>);

};

export default FooterSection;