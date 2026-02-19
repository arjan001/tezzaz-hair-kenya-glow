import { useNavigate, Link } from "react-router-dom";
import { BookOpen, ArrowLeft, FileText, Shield, RotateCcw, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";

const policyLinks = [
  {
    icon: FileText,
    title: "Terms & Conditions",
    desc: "Our general terms of service covering appointments, payments, responsibilities, and intellectual property.",
    href: "/terms-and-conditions",
  },
  {
    icon: Shield,
    title: "Privacy Policy",
    desc: "How we collect, use, and protect your personal information in compliance with Kenyan data protection law.",
    href: "/privacy-policy",
  },
  {
    icon: RotateCcw,
    title: "Refund Policy",
    desc: "Our return and refund guidelines for both beauty services and product purchases.",
    href: "/refund-policy",
  },
];

const Policies = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Policies - Terms, Privacy & Refunds"
        description="Read the legal policies for Tezzaz Hair & Beauty Studio Nairobi. Find our terms and conditions, privacy policy, refund policy, health & safety guidelines, and delivery information."
        canonicalPath="/policies"
        keywords="Tezzaz Hair policies, terms and conditions Nairobi salon, privacy policy beauty studio Kenya, refund policy hair salon, Tezzaz legal information, salon health safety Nairobi"
      />
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="bg-black section-padding text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-10 h-10 bg-[hsl(var(--gold))] flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[hsl(var(--gold))] mb-3">
              Legal Information
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
              Our Policies
            </h1>
            <div className="w-16 h-[2px] bg-[hsl(var(--gold))] mx-auto mb-4" />
            <p className="font-body text-white/50 text-sm max-w-lg mx-auto">
              Transparency is important to us. Below you'll find all our legal policies and guidelines.
            </p>
          </div>
        </section>

        {/* Policy Links Grid */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>

            <div className="grid md:grid-cols-3 gap-px bg-gray-200 border-2 border-black">
              {policyLinks.map((policy) => {
                const Icon = policy.icon;
                return (
                  <Link
                    key={policy.title}
                    to={policy.href}
                    className="group bg-white hover:bg-black transition-all duration-300 p-8 flex flex-col"
                  >
                    <div className="w-10 h-10 bg-black group-hover:bg-[hsl(var(--gold))] flex items-center justify-center mb-5 transition-colors">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display text-lg text-black group-hover:text-white font-bold mb-3 transition-colors">
                      {policy.title}
                    </h3>
                    <p className="font-body text-gray-500 group-hover:text-white/60 text-xs leading-relaxed mb-6 flex-1 transition-colors">
                      {policy.desc}
                    </p>
                    <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-black group-hover:text-[hsl(var(--gold))] transition-colors">
                      Read Policy
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-16 border-2 border-black p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl text-black font-bold mb-4">
                    Health & Safety
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">
                    Your safety is paramount. We maintain the highest hygiene standards in our studio. All tools are sterilized between clients, and we use only professional-grade, tested products.
                  </p>
                  <ul className="space-y-2">
                    <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                      All equipment is sanitized between each use.
                    </li>
                    <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                      We use hypoallergenic products where available.
                    </li>
                    <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                      Patch tests available for sensitive skin.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl text-black font-bold mb-4">
                    Delivery & Shipping
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">
                    We deliver beauty products across Nairobi. Free delivery is available on orders above KSh 2,000.
                  </p>
                  <ul className="space-y-2">
                    <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                      Same-day delivery available within Nairobi CBD.
                    </li>
                    <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                      Standard delivery: 1–3 business days within Nairobi.
                    </li>
                    <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                      Track your order anytime through our website.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-12 bg-black p-8 md:p-12 text-center">
              <h3 className="font-display text-2xl text-white font-bold mb-3">
                Have Questions?
              </h3>
              <p className="font-body text-white/50 text-sm mb-6 max-w-md mx-auto">
                If you have any questions about our policies, feel free to reach out to us anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+254711135090"
                  className="bg-white text-black font-body text-xs tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-[hsl(var(--gold))] hover:text-white transition-colors duration-300"
                >
                  Call Us
                </a>
                <a
                  href="https://wa.me/254711135090"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white font-body text-xs tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-[#1da851] transition-colors duration-300"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default Policies;
