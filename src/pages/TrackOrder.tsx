import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle, MapPin, ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const steps = [
  { label: "Order Placed", icon: Package, desc: "Your order has been confirmed" },
  { label: "Processing", icon: Package, desc: "We're preparing your items" },
  { label: "Shipped", icon: Truck, desc: "Your order is on its way" },
  { label: "Delivered", icon: CheckCircle, desc: "Order delivered successfully" },
];

const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const codeFromUrl = searchParams.get("code") || "";
  const [trackingCode, setTrackingCode] = useState(codeFromUrl);
  const [searched, setSearched] = useState(!!codeFromUrl);

  // Simulated order status — step 1 means "Processing"
  const currentStep = codeFromUrl ? 1 : 0;

  const handleSearch = () => {
    if (trackingCode.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </button>

        <h1 className="font-display text-3xl md:text-4xl text-black font-bold mb-2">Track Your Order</h1>
        <p className="font-body text-gray-500 text-sm mb-10">Enter your transaction code to track your order status</p>

        {/* Search */}
        <div className="flex border-2 border-black mb-10">
          <input
            type="text"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            placeholder="Enter transaction code e.g. TZ8A3BX2C"
            className="flex-1 px-4 py-3 font-body text-sm focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-black px-6 flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>

        {searched && trackingCode && (
          <>
            {/* Order Info */}
            <div className="border-2 border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">Order Code</p>
                  <p className="font-body text-sm font-bold text-black">{trackingCode}</p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">Date</p>
                  <p className="font-body text-sm font-bold text-black">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">Status</p>
                  <p className="font-body text-sm font-bold text-[#4CAF50]">Processing</p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">Est. Delivery</p>
                  <p className="font-body text-sm font-bold text-black">
                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="mb-10">
              <div className="relative">
                {steps.map((step, i) => {
                  const isActive = i <= currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex gap-4 mb-8 last:mb-0">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 flex items-center justify-center border-2 transition-colors ${
                            isActive
                              ? "bg-black border-black text-white"
                              : "bg-white border-gray-200 text-gray-300"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`w-0.5 h-12 ${i < currentStep ? "bg-black" : "bg-gray-200"}`} />
                        )}
                      </div>
                      <div className="pt-2">
                        <p className={`font-body text-sm font-bold ${isActive ? "text-black" : "text-gray-300"}`}>
                          {step.label}
                        </p>
                        <p className={`font-body text-xs ${isActive ? "text-gray-500" : "text-gray-300"}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="border-2 border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[hsl(var(--gold))] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm font-bold text-black mb-1">Delivery Address</p>
                  <p className="font-body text-xs text-gray-500">
                    Your delivery details are being processed. You will receive an SMS confirmation with tracking updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="font-body text-xs text-gray-400 mb-3">Need help with your order?</p>
              <a
                href="https://wa.me/254711135090"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] text-white font-body text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#20BD5A] transition-colors"
              >
                Contact via WhatsApp
              </a>
            </div>
          </>
        )}

        {searched && !trackingCode && (
          <div className="text-center py-10">
            <p className="font-body text-gray-400 text-sm">Please enter a valid tracking code.</p>
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default TrackOrderPage;
