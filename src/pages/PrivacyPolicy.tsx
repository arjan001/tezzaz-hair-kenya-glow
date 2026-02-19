import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="bg-black section-padding text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-10 h-10 bg-[hsl(var(--gold))] flex items-center justify-center mx-auto mb-4">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[hsl(var(--gold))] mb-3">
              Your Privacy Matters
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
              Privacy Policy
            </h1>
            <div className="w-16 h-[2px] bg-[hsl(var(--gold))] mx-auto mb-4" />
            <p className="font-body text-white/50 text-sm">
              Last updated: February 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>

            <div className="space-y-10">
              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  1. Introduction
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  Tezzaz Hair & Beauty Studio ("we", "our", "us") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  2. Information We Collect
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  We may collect the following types of personal information:
                </p>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    <strong>Personal Details:</strong> Name, email address, phone number when you book appointments or make purchases.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    <strong>Service Preferences:</strong> Your preferred services, stylist preferences, and beauty needs.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    <strong>Transaction Data:</strong> Purchase history, payment details (we do not store full card numbers).
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    <strong>Technical Data:</strong> Browser type, IP address, and cookies when you visit our website.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    <strong>Newsletter:</strong> Email address if you subscribe to our newsletter for promotions and offers.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  3. How We Use Your Information
                </h2>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    To provide and manage our beauty services and product orders.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    To process appointments, payments, and deliveries.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    To send appointment reminders and order updates via SMS, email, or WhatsApp.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    To send promotional offers and newsletters (only with your consent).
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    To improve our website, services, and customer experience.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  4. Data Sharing
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  We do not sell, trade, or rent your personal information to third parties. We may share your data with:
                </p>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Payment processors to complete transactions securely.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Delivery partners to fulfill product orders within Nairobi.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Legal authorities if required by Kenyan law.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  5. Data Security
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  6. Cookies
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  Our website uses cookies to enhance your browsing experience. Cookies help us understand how you interact with our site and allow us to remember your preferences. You can control cookie settings through your browser preferences.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  7. Your Rights
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  Under the Kenya Data Protection Act, 2019, you have the right to:
                </p>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Access the personal data we hold about you.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Request correction of inaccurate or incomplete data.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Request deletion of your personal data.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Opt out of marketing communications at any time.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  8. Contact Us
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  For privacy-related inquiries, please contact us:
                </p>
                <div className="mt-3 bg-gray-50 border-2 border-black p-6">
                  <p className="font-body text-sm text-black font-bold mb-1">Tezzaz Hair & Beauty Studio</p>
                  <p className="font-body text-gray-500 text-xs">The Bazaar, 10th Floor, Wing B, Suite 1025, Nairobi</p>
                  <p className="font-body text-gray-500 text-xs">Phone: +254 711 135090</p>
                  <p className="font-body text-gray-500 text-xs">Email: booking@tezzaz-hair.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;
