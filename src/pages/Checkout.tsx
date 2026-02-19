import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Phone, Shield, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const MpesaModal = ({ total, onClose, onSuccess }: { total: number; onClose: () => void; onSuccess: (code: string) => void }) => {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"enter" | "processing" | "done">("enter");
  const [code, setCode] = useState("");

  const handlePay = () => {
    if (!phone || phone.length < 10) return;
    setStep("processing");
    // Simulate M-Pesa STK push
    setTimeout(() => {
      const txCode = "TZ" + Math.random().toString(36).substring(2, 10).toUpperCase();
      setCode(txCode);
      setStep("done");
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#4CAF50] px-6 py-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest opacity-80">M-Pesa Payment</p>
              <p className="font-display text-xl font-bold">Lipa na M-Pesa</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {step === "enter" && (
            <>
              <div className="bg-gray-50 border border-gray-200 p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-body text-xs uppercase tracking-widest text-gray-500">Total Amount</span>
                  <span className="font-display text-2xl font-bold text-black">KSh {total.toLocaleString()}</span>
                </div>
              </div>

              <label className="block mb-2">
                <span className="font-body text-xs uppercase tracking-widest text-gray-600">Phone Number</span>
              </label>
              <div className="flex border-2 border-black mb-4">
                <div className="bg-gray-100 px-3 flex items-center border-r border-black">
                  <span className="font-body text-sm text-gray-600">+254</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                  placeholder="7XX XXX XXX"
                  className="flex-1 px-4 py-3 font-body text-sm focus:outline-none"
                />
              </div>

              <p className="font-body text-xs text-gray-400 mb-6">
                An STK push will be sent to your phone. Enter your M-Pesa PIN to complete payment.
              </p>

              <button
                onClick={handlePay}
                disabled={phone.length < 9}
                className="w-full bg-[#4CAF50] text-white font-body text-xs uppercase tracking-widest py-4 hover:bg-[#43A047] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Pay KSh {total.toLocaleString()}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4">
                <Shield className="w-3 h-3 text-gray-400" />
                <p className="font-body text-[10px] text-gray-400 uppercase tracking-widest">Secured by Safaricom M-Pesa</p>
              </div>
            </>
          )}

          {step === "processing" && (
            <div className="text-center py-10">
              <div className="w-16 h-16 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <p className="font-display text-lg font-bold text-black mb-2">Processing Payment</p>
              <p className="font-body text-sm text-gray-500">Check your phone for the M-Pesa prompt...</p>
              <p className="font-body text-xs text-gray-400 mt-2">+254 {phone}</p>
            </div>
          )}

          {step === "done" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display text-lg font-bold text-black mb-1">Payment Successful!</p>
              <p className="font-body text-sm text-gray-500 mb-4">Your order has been confirmed</p>
              <div className="bg-gray-50 border border-gray-200 p-3 mb-6 inline-block">
                <p className="font-body text-xs text-gray-500">Transaction Code</p>
                <p className="font-body text-lg font-bold text-black tracking-wider">{code}</p>
              </div>
              <br />
              <button
                onClick={() => onSuccess(code)}
                className="bg-black text-white font-body text-xs uppercase tracking-widest px-8 py-3 hover:bg-gray-800 transition-colors"
              >
                Track My Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, cartTotal, clearCart } = useCart();
  const [showMpesa, setShowMpesa] = useState(false);
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

  const handlePaymentSuccess = (code: string) => {
    clearCart();
    navigate(`/track-order?code=${code}`);
  };

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
                className="w-full bg-[#4CAF50] text-white font-body text-xs uppercase tracking-widest py-4 hover:bg-[#43A047] transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Pay with M-Pesa
              </button>

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
        <MpesaModal
          total={total}
          onClose={() => setShowMpesa(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
