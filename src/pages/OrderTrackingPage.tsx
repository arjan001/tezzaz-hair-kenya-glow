import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock, Search, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

interface OrderData {
  orderId: string;
  items: Array<{ product: { name: string; priceDisplay: string; img: string }; quantity: number }>;
  total: number;
  customer: {
    fullName: string;
    phone: string;
    deliveryLocation: string;
    deliveryAddress: string;
  };
  status: string;
  date: string;
  paymentMethod: string;
}

const statusSteps = [
  { key: "pending", label: "Order Placed", icon: Clock, desc: "Your order has been received" },
  { key: "processing", label: "Processing", icon: Package, desc: "We're preparing your order" },
  { key: "shipped", label: "Shipped", icon: Truck, desc: "Your order is on the way" },
  { key: "delivered", label: "Delivered", icon: CheckCircle, desc: "Order delivered successfully" },
];

const OrderTrackingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState(searchParams.get("orderId") || "");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const paramId = searchParams.get("orderId");
    if (paramId) {
      setTrackingId(paramId);
      lookupOrder(paramId);
    }
  }, [searchParams]);

  const lookupOrder = (id: string) => {
    setSearched(true);
    try {
      const saved = localStorage.getItem("tezzaz_last_order");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.orderId === id) {
          setOrder(data);
          return;
        }
      }
    } catch { }
    setOrder(null);
  };

  const handleSearch = () => {
    if (trackingId.trim()) {
      lookupOrder(trackingId.trim());
    }
  };

  const getStatusIndex = (status: string) => {
    const idx = statusSteps.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStepIdx = order ? getStatusIndex(order.status) : -1;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-xs text-gray-400 mb-6">
          <button onClick={() => navigate("/")} className="hover:text-black transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">Track My Order</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Track Your Order</h1>
        <p className="font-body text-sm text-gray-500 mb-8">Enter your order ID to check the status of your order.</p>

        {/* Search */}
        <div className="flex mb-10">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter your order ID e.g. TZ12345678"
            className="flex-1 border-2 border-black px-4 py-3.5 font-body text-sm focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white px-6 flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Order Not Found */}
        {searched && !order && (
          <div className="text-center py-16 border border-gray-200">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">Order Not Found</h2>
            <p className="font-body text-gray-400 text-sm mb-4">
              We couldn't find an order with that ID. Please check and try again.
            </p>
            <p className="font-body text-xs text-gray-400">
              Contact us via WhatsApp at +254 711 135090 for assistance.
            </p>
          </div>
        )}

        {/* Order Found */}
        {order && (
          <div>
            {/* Order Header */}
            <div className="border border-gray-200 p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-1">Order ID</p>
                  <p className="font-display text-xl font-bold">{order.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-1">Order Date</p>
                  <p className="font-body text-sm">{new Date(order.date).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-1">Payment Method</p>
                  <p className="font-body text-sm">{order.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-1">Total</p>
                  <p className="font-display text-xl font-bold">KSh {order.total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="mb-8">
              <h2 className="font-display text-lg font-bold mb-6">Order Status</h2>
              <div className="relative">
                {statusSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = index <= currentStepIdx;
                  const isCurrent = index === currentStepIdx;

                  return (
                    <div key={step.key} className="flex gap-4 mb-8 last:mb-0">
                      {/* Line & Circle */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isCompleted
                              ? isCurrent
                                ? "bg-[hsl(var(--gold))] text-white"
                                : "bg-black text-white"
                              : "bg-gray-100 text-gray-300"
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div className={`w-0.5 flex-1 min-h-[40px] ${isCompleted ? "bg-black" : "bg-gray-200"}`} />
                        )}
                      </div>
                      {/* Text */}
                      <div className="pt-2">
                        <p className={`font-body text-sm font-bold ${isCompleted ? "text-black" : "text-gray-300"}`}>
                          {step.label}
                          {isCurrent && (
                            <span className="ml-2 inline-block bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] font-body text-[10px] uppercase tracking-widest px-2 py-0.5">
                              Current
                            </span>
                          )}
                        </p>
                        <p className={`font-body text-xs ${isCompleted ? "text-gray-500" : "text-gray-300"}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="border border-gray-200 p-6 mb-8">
              <h2 className="font-display text-lg font-bold mb-4">Delivery Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-1">Name</p>
                  <p className="font-body text-sm">{order.customer.fullName}</p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                  <p className="font-body text-sm">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-1">Location</p>
                  <p className="font-body text-sm">{order.customer.deliveryLocation}</p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-1">Address</p>
                  <p className="font-body text-sm">{order.customer.deliveryAddress}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border border-gray-200 p-6">
              <h2 className="font-display text-lg font-bold mb-4">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <img src={item.product.img} alt={item.product.name} className="w-12 h-12 object-cover border border-gray-200" />
                    <div className="flex-1">
                      <p className="font-body text-sm font-bold">{item.product.name}</p>
                      <p className="font-body text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-body text-sm font-bold">{item.product.priceDisplay}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="text-center mt-8">
              <p className="font-body text-xs text-gray-400 mb-3">Need help with your order?</p>
              <a
                href="https://wa.me/254711135090"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-body text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#20bd5a] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact Support on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* No Search Yet */}
        {!searched && !order && (
          <div className="text-center py-16">
            <Truck className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">Track Your Package</h2>
            <p className="font-body text-gray-400 text-sm">
              Enter your order ID above to see the current status of your delivery.
            </p>
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default OrderTrackingPage;
