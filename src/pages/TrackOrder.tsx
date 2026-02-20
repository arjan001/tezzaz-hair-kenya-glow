import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle, MapPin, ArrowLeft, Search, Loader2, Clock, XCircle } from "lucide-react";
import { useOrderByCode } from "@/integrations/supabase/hooks/useOrders";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const steps = [
  { label: "Order Placed", icon: Package, desc: "Your order has been confirmed", status: "pending" },
  { label: "Confirmed", icon: CheckCircle, desc: "Payment verified, preparing items", status: "confirmed" },
  { label: "Dispatched", icon: Truck, desc: "Your order is on its way", status: "dispatched" },
  { label: "Delivered", icon: CheckCircle, desc: "Order delivered successfully", status: "delivered" },
];

const statusStepMap: Record<string, number> = { pending: 0, confirmed: 1, dispatched: 2, delivered: 3, cancelled: -1 };

const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const codeFromUrl = searchParams.get("code") || "";
  const [trackingCode, setTrackingCode] = useState(codeFromUrl);
  const [searched, setSearched] = useState(!!codeFromUrl);
  const [activeCode, setActiveCode] = useState(codeFromUrl);

  const { data: order, isLoading } = useOrderByCode(activeCode);

  const currentStep = order ? (statusStepMap[order.status] ?? 0) : 0;

  const handleSearch = () => {
    if (trackingCode.trim()) {
      setActiveCode(trackingCode.trim());
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-gray-500 hover:text-black mb-8">
          <ArrowLeft className="w-4 h-4" /> Home
        </button>

        <h1 className="font-display text-3xl md:text-4xl text-black font-bold mb-2">Track Your Order</h1>
        <p className="font-body text-gray-500 text-sm mb-10">Enter your order code to track your order status</p>

        <div className="flex border-2 border-black mb-10">
          <input type="text" value={trackingCode} onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            placeholder="Enter order code e.g. TZ8A3BX2C"
            className="flex-1 px-4 py-3 font-body text-sm focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          <button onClick={handleSearch} className="bg-black px-6 flex items-center justify-center hover:bg-gray-800">
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>

        {isLoading && searched && (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
          </div>
        )}

        {searched && !isLoading && !order && activeCode && (
          <div className="text-center py-10 border-2 border-dashed border-gray-200">
            <XCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-body text-gray-500 text-sm">Order "{activeCode}" not found. Please check your order code.</p>
            <a href="https://wa.me/254711135090" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-4 bg-green-500 text-white font-body text-xs uppercase tracking-widest px-6 py-3 hover:bg-green-600">
              Contact via WhatsApp
            </a>
          </div>
        )}

        {order && !isLoading && (
          <>
            <div className="border-2 border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">Order Code</p><p className="font-body text-sm font-bold text-black">{order.order_code}</p></div>
                <div><p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">Customer</p><p className="font-body text-sm font-bold text-black">{order.customer_name}</p></div>
                <div><p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">Status</p>
                  <p className={`font-body text-sm font-bold ${order.status === "delivered" ? "text-green-600" : order.status === "cancelled" ? "text-red-500" : "text-black"}`}>
                    {order.status.toUpperCase()}
                  </p>
                </div>
                <div><p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">Total</p><p className="font-body text-sm font-bold text-black">KSh {Number(order.total).toLocaleString()}</p></div>
              </div>
            </div>

            {order.status === "cancelled" ? (
              <div className="border-2 border-red-200 bg-red-50 p-6 text-center mb-8">
                <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                <p className="font-body text-sm text-red-600 font-bold">This order has been cancelled.</p>
                <p className="font-body text-xs text-red-400 mt-1">Please contact us if you have questions.</p>
              </div>
            ) : (
              <div className="mb-10">
                {steps.map((step, i) => {
                  const isActive = i <= currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex gap-4 mb-8 last:mb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 flex items-center justify-center border-2 transition-colors ${isActive ? "bg-black border-black text-white" : "bg-white border-gray-200 text-gray-300"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {i < steps.length - 1 && <div className={`w-0.5 h-12 ${i < currentStep ? "bg-black" : "bg-gray-200"}`} />}
                      </div>
                      <div className="pt-2">
                        <p className={`font-body text-sm font-bold ${isActive ? "text-black" : "text-gray-300"}`}>{step.label}</p>
                        <p className={`font-body text-xs ${isActive ? "text-gray-500" : "text-gray-300"}`}>{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="border-2 border-gray-200 p-6 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm font-bold text-black mb-1">Delivery Address</p>
                  <p className="font-body text-xs text-gray-500">{order.delivery_address}, {order.city}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-2 border-gray-200 p-6 mb-8">
              <p className="font-body text-sm font-bold text-black mb-4">Order Items</p>
              {(Array.isArray(order.items) ? order.items : []).map((item: {name: string; qty: number; price: number}, i: number) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="font-body text-sm text-gray-600">{item.name} x{item.qty}</span>
                  <span className="font-body text-sm font-bold">KSh {Number(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between mt-3 pt-3 border-t border-gray-200">
                <span className="font-display text-sm font-bold">Total</span>
                <span className="font-display text-sm font-bold">KSh {Number(order.total).toLocaleString()}</span>
              </div>
            </div>

            <div className="text-center">
              <p className="font-body text-xs text-gray-400 mb-3">Need help with your order?</p>
              <a href="https://wa.me/254711135090" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-body text-xs uppercase tracking-widest px-6 py-3 hover:bg-green-600">
                Contact via WhatsApp
              </a>
            </div>
          </>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default TrackOrderPage;
