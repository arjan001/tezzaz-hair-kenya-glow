import { Scissors, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gold p-2">
                <Scissors className="w-5 h-5 text-cream" />
              </div>
              <div>
                <span className="font-display text-xl text-cream">Tezzaz</span>
                <span className="font-display text-xl text-gold"> Hair</span>
              </div>
            </div>
            <p className="font-body text-cream/50 text-sm leading-relaxed">
              Nairobi's premier hair salon celebrating African beauty with world-class artistry.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="border border-gold/30 p-2 hover:bg-gold hover:border-gold transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-gold group-hover:text-cream transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-cream font-semibold mb-5 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Gallery", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-cream/50 text-sm hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-cream font-semibold mb-5 text-lg">Our Services</h4>
            <ul className="space-y-3">
              {[
                "Natural Hair Styling",
                "Braids & Cornrows",
                "Hair Treatments",
                "Locs Styling",
                "Colour & Highlights",
                "Scalp Massage",
              ].map((service) => (
                <li key={service}>
                  <a href="#" className="font-body text-cream/50 text-sm hover:text-gold transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-cream font-semibold mb-5 text-lg">Newsletter</h4>
            <p className="font-body text-cream/50 text-sm mb-4">
              Subscribe for hair tips, style inspiration and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 bg-charcoal-light border border-gold/30 text-cream placeholder-cream/30 font-body px-4 py-3 text-sm focus:outline-none focus:border-gold"
              />
              <button className="bg-gold px-4 py-3 hover:bg-gold-dark transition-colors">
                <span className="text-cream text-xs font-body uppercase tracking-wide">Go</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-cream/40 text-sm">
            © 2024 Tezzaz Hair. All rights reserved. Nairobi, Kenya.
          </p>
          <p className="font-body text-cream/30 text-xs">
            Designed with ❤️ for African Beauty
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
