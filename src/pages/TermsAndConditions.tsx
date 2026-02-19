import { useNavigate } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="bg-black section-padding text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-10 h-10 bg-[hsl(var(--gold))] flex items-center justify-center mx-auto mb-4">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[hsl(var(--gold))] mb-3">
              Legal
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
              Terms & Conditions
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
                  1. Acceptance of Terms
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  By accessing and using the Tezzaz Hair & Beauty Studio website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services or website.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  2. Services
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  Tezzaz Hair & Beauty Studio provides professional hair styling, braiding, nail art, pedicure, makeup, skin care and natural hair services at our location: The Bazaar, 10th Floor, Wing B, Suite 1025, Nairobi, Kenya.
                </p>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  We reserve the right to modify, suspend or discontinue any service at any time without prior notice. Prices for services are subject to change and will be communicated at the time of booking.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  3. Appointments & Bookings
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  Appointments can be booked via our website, WhatsApp (+254 711 135090), or by visiting our studio. We recommend booking in advance to secure your preferred time slot.
                </p>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Please arrive on time. Late arrivals may result in reduced service time or rescheduling.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Cancellations should be made at least 24 hours in advance.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    No-shows may be charged a rebooking fee at the discretion of the studio.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  4. Online Shop & Products
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  Products purchased through our online shop are subject to availability. We strive to display accurate product descriptions and images, but cannot guarantee exact color representation on all screens.
                </p>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  Delivery within Nairobi is available on orders above KSh 2,000. Delivery timelines and fees will be communicated at checkout. All prices are quoted in Kenya Shillings (KSh).
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  5. Payment
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  We accept cash, M-Pesa, and card payments. Full payment is required upon completion of services or at the time of purchase for products. Deposits may be required for certain services or large bookings.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  6. Client Responsibilities
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  Clients are responsible for communicating any allergies, sensitivities, or health conditions that may affect the delivery of services. Tezzaz Hair is not liable for adverse reactions resulting from undisclosed conditions.
                </p>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  We expect all clients to treat our staff with respect. We reserve the right to refuse service to anyone engaging in disruptive or disrespectful behavior.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  7. Intellectual Property
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  All content on this website — including text, images, logos, and design elements — is the property of Tezzaz Hair & Beauty Studio or its licensors. Unauthorized reproduction, distribution, or use of any content is prohibited without written consent.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  8. Limitation of Liability
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  Tezzaz Hair & Beauty Studio shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services or website. Our total liability shall not exceed the amount paid for the specific service or product in question.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  9. Changes to Terms
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  We may update these Terms and Conditions from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  10. Contact Us
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  For questions about these Terms and Conditions, please contact us:
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

export default TermsAndConditions;
