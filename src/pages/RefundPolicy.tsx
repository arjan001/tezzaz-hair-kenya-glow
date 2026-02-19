import { useNavigate } from "react-router-dom";
import { RotateCcw, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";

const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Refund Policy"
        description="Refund and return policy for Tezzaz Hair & Beauty Studio Nairobi. Learn about service refunds, product returns, refund processing timelines via M-Pesa and card, and non-refundable items."
        canonicalPath="/refund-policy"
        keywords="Tezzaz Hair refund policy, return policy beauty salon Nairobi, service refund hair salon Kenya, product return policy Nairobi, M-Pesa refund beauty studio, hair salon refund Nairobi CBD"
      />
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="bg-black section-padding text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-10 h-10 bg-[hsl(var(--gold))] flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[hsl(var(--gold))] mb-3">
              Returns & Refunds
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
              Refund Policy
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
                  1. Service Refunds
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  At Tezzaz Hair & Beauty Studio, your satisfaction is our priority. If you are unhappy with a service you received, please let us know within 48 hours of your appointment.
                </p>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    We will assess the issue and offer a complimentary redo or adjustment where possible.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Full refunds for services are granted at the sole discretion of management on a case-by-case basis.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Refund requests made after 48 hours may not be honored.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  2. Product Returns
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  Products purchased from our online shop or in-store may be returned under the following conditions:
                </p>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    The product must be unused, unopened, and in its original packaging.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Return requests must be made within 7 days of purchase or delivery.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Products damaged during delivery will be replaced at no additional cost.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Sale items and clearance products are non-refundable.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  3. How to Request a Refund
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  To initiate a refund or return, please contact us via:
                </p>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    WhatsApp: +254 711 135090 — send photos and your order reference if applicable.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Email: booking@tezzaz-hair.com with subject line "Refund Request".
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    In-person at our studio: The Bazaar, 10th Floor, Wing B, Suite 1025, Nairobi.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  4. Refund Processing
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-3">
                  Once your refund request is approved:
                </p>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    M-Pesa refunds will be processed within 3–5 business days.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Card refunds may take 7–14 business days depending on your bank.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    In-store credits are processed immediately and can be used on your next visit.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  5. Non-Refundable Items
                </h2>
                <ul className="space-y-2">
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Gift cards and vouchers.
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Opened or used beauty and hair products (for hygiene reasons).
                  </li>
                  <li className="font-body text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[hsl(var(--gold))] mt-1.5 flex-shrink-0" />
                    Custom or personalized services that were completed as agreed.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl text-black font-bold mb-3 pb-3 border-b-2 border-black">
                  6. Contact Us
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  For any questions about our refund policy, please reach out:
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

export default RefundPolicy;
