import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Phone, X, Copy, Check, Package, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCreateOrder } from "@/integrations/supabase/hooks/useOrders";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

// Generate a paybill number for TEZZAZ_HAIR
const PAYBILL_NUMBER = "899890";
const generateAccountNumber = () => {
  return "TZ" + Math.floor(100000 + Math.random() * 900000);
};

const MpesaPaybillModal = ({
  total,
  onClose,
  onSuccess,
}: {
  total: number;
  onClose: () => void;
  onSuccess: (data: { code: string; mpesaMessage: string; mpesaPhone: string }) => void;
}) => {
  const [accountNumber] = useState(generateAccountNumber());
  const [mpesaMessage, setMpesaMessage] = useState("");
  const [phoneUsed, setPhoneUsed] = useState("");
  const [copiedPaybill, setCopiedPaybill] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const copyToClipboard = (text: string, type: "paybill" | "account") => {
    navigator.clipboard.writeText(text);
    if (type === "paybill") {
      setCopiedPaybill(true);
      setTimeout(() => setCopiedPaybill(false), 2000);
    } else {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

  const handleSubmit = () => {
    if (!mpesaMessage.trim()) return;
    const txCode = "TZ" + Math.random().toString(36).substring(2, 10).toUpperCase();
    onSuccess({ code: txCode, mpesaMessage, mpesaPhone: phoneUsed });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 text-gray-400 hover:text-black bg-white rounded-full p-1">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#4CAF50] px-6 py-5 text-white text-center">
          <p className="font-display text-2xl font-bold tracking-wide">LIPA NA M-PESA</p>
          <div className="w-16 h-0.5 bg-red-500 mx-auto mt-1" />
        </div>

        <div className="p-6">
          {/* Paybill Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5">
            <p className="text-center font-body text-xs uppercase tracking-widest text-[#4CAF50] font-bold mb-3">
              PAYBILL NUMBER
            </p>
            <div className="flex justify-center gap-1.5 mb-4">
              {PAYBILL_NUMBER.split("").map((digit, i) => (
                <div
                  key={i}
                  className="w-10 h-12 border-2 border-[#4CAF50] flex items-center justify-center font-display text-xl font-bold text-black"
                >
                  {digit}
                </div>
              ))}
            </div>

            <p className="text-center font-body text-xs text-gray-400 mb-2">Account Number</p>
            <div className="flex justify-center gap-1.5 mb-4">
              {accountNumber.split("").map((char, i) => (
                <div
                  key={i}
                  className="w-9 h-11 border-2 border-[#4CAF50] flex items-center justify-center font-display text-lg font-bold text-black"
                >
                  {char}
                </div>
              ))}
            </div>

            <p className="text-center font-display text-sm font-bold uppercase tracking-wide mb-4">
              TEZZAZ_HAIR
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => copyToClipboard(PAYBILL_NUMBER, "paybill")}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors font-body text-xs"
              >
                {copiedPaybill ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Paybill
              </button>
              <button
                onClick={() => copyToClipboard(accountNumber, "account")}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors font-body text-xs"
              >
                {copiedAccount ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Account
              </button>
            </div>

            <div className="flex items-center justify-center gap-1 mt-3">
              <span className="font-body text-xs font-bold text-[#4CAF50]">Safaricom</span>
              <span className="font-body text-[10px] text-gray-500">M-PESA</span>
            </div>
          </div>

          {/* Amount to Pay */}
          <div className="border border-gray-200 rounded-lg p-4 mb-5 flex items-center justify-between bg-green-50/50">
            <span className="font-body text-sm text-gray-600">Amount to Pay:</span>
            <span className="font-display text-xl font-bold text-[#4CAF50]">
              KSh {total.toLocaleString()}
            </span>
          </div>

          {/* Paste M-Pesa SMS */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 border-2 border-[#4CAF50] rounded flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-[#4CAF50]" />
            </div>
            <p className="font-body text-sm font-medium text-black">
              After paying, paste the M-PESA SMS below
            </p>
          </div>

          <label className="block mb-2">
            <span className="font-body text-sm font-bold text-black">
              M-PESA Confirmation Message <span className="text-red-500">*</span>
            </span>
          </label>
          <textarea
            value={mpesaMessage}
            onChange={(e) => setMpesaMessage(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-[#4CAF50] resize-none mb-2"
            placeholder="Paste the full M-PESA SMS here e.g. SHK3A7B2C1 Confirmed. Ksh1,500.00 sent to TEZZAZ_HAIR..."
          />
          <p className="font-body text-[11px] text-[#4CAF50] mb-4">
            Paste the entire confirmation SMS from Safaricom M-PESA
          </p>

          <label className="block mb-2">
            <span className="font-body text-sm font-bold text-black">Phone Number Used (optional)</span>
          </label>
          <input
            type="tel"
            value={phoneUsed}
            onChange={(e) => setPhoneUsed(e.target.value)}
            placeholder="e.g. 0712 345 678"
            className="w-full border border-gray-200 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-[#4CAF50] mb-5"
          />

          <button
            onClick={handleSubmit}
            disabled={!mpesaMessage.trim()}
            className="w-full bg-[#4CAF50] text-white font-body text-sm font-bold uppercase tracking-widest py-4 rounded hover:bg-[#43A047] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit Payment
          </button>

          <p className="font-body text-[11px] text-gray-400 text-center mt-3">
            Our team will verify your payment. You will receive a confirmation shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

// Order Success View
const OrderSuccessView = ({ orderCode, onContinue, onTrack }: { orderCode: string; onContinue: () => void; onTrack: () => void }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display text-3xl font-bold text-black mb-2">Order Placed!</h1>
        <p className="font-body text-gray-500 text-sm mb-6">
          Thank you for your order. Your payment is being verified.
        </p>

        <div className="bg-gray-50 border-2 border-gray-200 p-5 mb-8 inline-block">
          <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 mb-1">Order ID</p>
          <p className="font-display text-2xl font-bold text-black tracking-wider">{orderCode}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onTrack}
            className="w-full bg-black text-white font-body text-xs uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors"
          >
            Track Order
          </button>
          <button
            onClick={onContinue}
            className="w-full border-2 border-black text-black font-body text-xs uppercase tracking-widest py-4 hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>

        <p className="font-body text-[11px] text-gray-400 mt-6">
          You'll receive an SMS confirmation once payment is verified.
        </p>
      </main>
      <FooterSection />
    </div>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, cartTotal, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const [showMpesa, setShowMpesa] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Nairobi",
    notes: "",
  });

  const deliveryFee = cartTotal >= 2000 ? 0 : 200;
  const total = cartTotal + deliveryFee;

  const handlePaymentSuccess = async ({ code, mpesaMessage, mpesaPhone }: { code: string; mpesaMessage: string; mpesaPhone: string }) => {
    setShowMpesa(false);
    setSubmitting(true);

    const orderItems = cart.map((item) => ({
      name: item.product.name,
      qty: item.qty,
      price: item.product.priceNum,
      img: item.product.img || "",
    }));

    try {
      await createOrder.mutateAsync({
        order_code: code,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        delivery_address: formData.address,
        city: formData.city,
        notes: formData.notes || null,
        items: orderItems,
        subtotal: cartTotal,
        delivery_fee: deliveryFee,
        total,
        payment_method: "mpesa",
        mpesa_message: mpesaMessage || null,
        mpesa_phone: mpesaPhone || null,
        status: "pending",
        user_id: null,
      });
      setOrderCode(code);
      clearCart();
    } catch {
      // Error toast is handled by useCreateOrder hook
    } finally {
      setSubmitting(false);
    }
  };

  const canProceedToPayment = formData.name && formData.email && formData.phone && formData.address;

  // Show order success view
  if (orderCode) {
    return (
      <OrderSuccessView
        orderCode={orderCode}
        onContinue={() => navigate("/shop")}
        onTrack={() => navigate(`/track-order?code=${orderCode}`)}
      />
    );
  }

  if (cart.length === 0 && !showMpesa) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="font-display text-2xl font-bold text-black mb-2">Your cart is empty</p>
          <p className="font-body text-gray-500 text-sm mb-6">Add some products to get started</p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-black text-white font-body text-xs uppercase tracking-widest px-8 py-3 hover:bg-gray-800 transition-colors"
          >
            Browse Products
          </button>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </button>

        <h1 className="font-display text-3xl md:text-4xl text-black font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items & Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cart Items */}
            <div>
              <h2 className="font-display text-lg font-bold text-black mb-4 pb-3 border-b border-gray-200">
                Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <img
                      src={item.product.img}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover border border-gray-100 cursor-pointer"
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-display text-sm font-bold text-black">{item.product.name}</h3>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-body text-xs text-gray-500 mb-2">{item.product.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200">
                          <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="px-2 py-1 hover:bg-gray-100">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 font-body text-sm border-x border-gray-200">{item.qty}</span>
                          <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="px-2 py-1 hover:bg-gray-100">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-body text-sm font-bold text-black">
                          KSh {(item.product.priceNum * item.qty).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Details */}
            <div>
              <h2 className="font-display text-lg font-bold text-black mb-4 pb-3 border-b border-gray-200">Delivery Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-gray-600 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-2 border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-black"
                    placeholder="Jane Wanjiru"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-gray-600 mb-1 block">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-2 border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-black"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-gray-600 mb-1 block">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-2 border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-black"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-gray-600 mb-1 block">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border-2 border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-body text-xs uppercase tracking-widest text-gray-600 mb-1 block">Delivery Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border-2 border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-black"
                    placeholder="Apartment, building, street..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-body text-xs uppercase tracking-widest text-gray-600 mb-1 block">Order Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full border-2 border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-black resize-none"
                    placeholder="Any special instructions..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border-2 border-black p-6 sticky top-28">
              <h2 className="font-display text-lg font-bold text-black mb-6 pb-3 border-b border-gray-200">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="font-body text-xs text-gray-600">
                      {item.product.name} x{item.qty}
                    </span>
                    <span className="font-body text-xs font-bold">
                      KSh {(item.product.priceNum * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="font-body text-xs text-gray-500 uppercase tracking-widest">Subtotal</span>
                  <span className="font-body text-sm font-bold">KSh {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-xs text-gray-500 uppercase tracking-widest">Delivery</span>
                  <span className="font-body text-sm font-bold">
                    {deliveryFee === 0 ? <span className="text-[hsl(var(--gold))]">FREE</span> : `KSh ${deliveryFee}`}
                  </span>
                </div>
              </div>

              <div className="border-t-2 border-black pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-display text-lg font-bold">Total</span>
                  <span className="font-display text-lg font-bold">KSh {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setShowMpesa(true)}
                disabled={!canProceedToPayment || submitting}
                className="w-full bg-[#4CAF50] text-white font-body text-xs uppercase tracking-widest py-4 hover:bg-[#43A047] transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
                {submitting ? "Placing Order..." : "Pay with M-Pesa"}
              </button>

              {!canProceedToPayment && (
                <p className="font-body text-[10px] text-red-400 text-center mt-2">
                  Please fill in all delivery details above
                </p>
              )}

              {cartTotal < 2000 && (
                <p className="font-body text-[10px] text-gray-400 text-center mt-3">
                  Add KSh {(2000 - cartTotal).toLocaleString()} more for free delivery
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <FooterSection />

      {showMpesa && (
        <MpesaPaybillModal
          total={total}
          onClose={() => setShowMpesa(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
