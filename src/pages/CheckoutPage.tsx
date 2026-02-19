import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, ChevronRight, ChevronDown, Copy, Check, Smartphone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const deliveryLocations = [
  "Nairobi CBD",
  "Westlands",
  "Kilimani",
  "Karen",
  "Langata",
  "Eastleigh",
  "South B/C",
  "Kasarani",
  "Thika Road",
  "Mombasa Road",
  "Other - Nairobi",
  "Outside Nairobi",
];

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    deliveryLocation: "",
    deliveryAddress: "",
    orderNotes: "",
  });

  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "whatsapp" | "cod" | null>(null);
  const [mpesaConfirmation, setMpesaConfirmation] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const subtotal = getCartTotal();
  const deliveryFee = formData.deliveryLocation === "Outside Nairobi" ? 500 : formData.deliveryLocation ? 250 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePayMpesa = () => {
    if (!formData.fullName || !formData.phone || !formData.deliveryLocation || !formData.deliveryAddress) {
      alert("Please fill in all required fields before proceeding to payment.");
      return;
    }
    setPaymentMethod("mpesa");
    setShowMpesaModal(true);
  };

  const handleWhatsApp = () => {
    if (!formData.fullName || !formData.phone) {
      alert("Please provide your name and phone number.");
      return;
    }
    const items = cart.map((item) => `${item.product.name} x${item.quantity} (${item.product.priceDisplay})`).join("\n");
    const text = `Hi Tezzaz Hair! I'd like to place an order:\n\n${items}\n\nTotal: KSh ${total.toLocaleString()}\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nDelivery: ${formData.deliveryLocation}\nAddress: ${formData.deliveryAddress}\n${formData.orderNotes ? `Notes: ${formData.orderNotes}` : ""}`;
    window.open(`https://wa.me/254711135090?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handlePayOnDelivery = () => {
    if (!formData.fullName || !formData.phone || !formData.deliveryLocation || !formData.deliveryAddress) {
      alert("Please fill in all required fields.");
      return;
    }
    const orderId = "TZ" + Date.now().toString().slice(-8);
    localStorage.setItem(
      "tezzaz_last_order",
      JSON.stringify({
        orderId,
        items: cart,
        total,
        customer: formData,
        status: "pending",
        date: new Date().toISOString(),
        paymentMethod: "Pay on Delivery",
      })
    );
    clearCart();
    navigate(`/track-order?orderId=${orderId}`);
  };

  const handleMpesaSubmit = () => {
    if (!mpesaConfirmation.trim()) {
      alert("Please paste your M-PESA confirmation message.");
      return;
    }
    const orderId = "TZ" + Date.now().toString().slice(-8);
    localStorage.setItem(
      "tezzaz_last_order",
      JSON.stringify({
        orderId,
        items: cart,
        total,
        customer: formData,
        status: "processing",
        date: new Date().toISOString(),
        paymentMethod: "M-PESA",
        mpesaConfirmation,
      })
    );
    clearCart();
    setShowMpesaModal(false);
    navigate(`/track-order?orderId=${orderId}`);
  };

  if (cart.length === 0 && !showMpesaModal) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="font-body text-gray-400 text-sm mb-6">Add some products before checking out.</p>
          <button
            onClick={() => navigate("/shop")}
            className="font-body text-xs uppercase tracking-widest bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors"
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-xs text-gray-400 mb-6">
          <button onClick={() => navigate("/")} className="hover:text-black transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate("/shop")} className="hover:text-black transition-colors">Shop</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">Checkout</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            {/* Customer Information */}
            <div className="mb-10">
              <h2 className="font-display text-xl font-bold mb-6">Customer Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="font-body text-sm font-bold mb-2 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-sm font-bold mb-2 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0712 345 678"
                      className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-bold mb-2 block">
                      Email <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-10">
              <h2 className="font-display text-xl font-bold mb-6">Delivery</h2>
              <div className="space-y-5">
                <div>
                  <label className="font-body text-sm font-bold mb-2 block">
                    Delivery Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="deliveryLocation"
                      value={formData.deliveryLocation}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors appearance-none bg-white"
                    >
                      <option value="">Select delivery location</option>
                      {deliveryLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm font-bold mb-2 block">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="Building name, street, area..."
                    rows={3}
                    className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors resize-y"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-bold mb-2 block">
                    Order Notes <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions..."
                    rows={3}
                    className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors resize-y"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="border border-gray-200 p-6 sticky top-32">
              <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 pb-4 border-b border-gray-100">
                    <img src={item.product.img} alt={item.product.name} className="w-16 h-16 object-cover border border-gray-200" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-body text-xs font-bold truncate">{item.product.name}</h3>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-black flex-shrink-0">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-body text-xs text-gray-500">{item.product.priceDisplay}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-body text-xs w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="font-body text-xs font-bold flex-shrink-0">KSh {(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span>Subtotal</span>
                  <span>KSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span>Delivery</span>
                  <span>{deliveryFee > 0 ? `KSh ${deliveryFee.toLocaleString()}` : "—"}</span>
                </div>
                <div className="flex justify-between font-body text-base font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>KSh {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handlePayMpesa}
                  className="w-full bg-[#4CAF50] text-white font-body text-sm uppercase tracking-widest py-4 hover:bg-[#43A047] transition-colors flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Pay with M-PESA
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="font-body text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full border border-gray-300 text-black font-body text-sm py-3 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Complete via WhatsApp
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="font-body text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <button
                  onClick={handlePayOnDelivery}
                  className="w-full border border-gray-300 text-black font-body text-sm py-3 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                  Pay on Delivery
                </button>

                <p className="font-body text-[10px] text-gray-400 text-center mt-2">
                  We will confirm your order and arrange delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* M-PESA Modal */}
      {showMpesaModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[100]" onClick={() => setShowMpesaModal(false)} />
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto relative">
              {/* Green Header */}
              <div className="bg-[#4CAF50] px-6 py-6 text-center relative">
                <button
                  onClick={() => setShowMpesaModal(false)}
                  className="absolute top-3 right-3 text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-14 h-14 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Smartphone className="w-7 h-7 text-[#4CAF50]" />
                </div>
                <h2 className="font-display text-xl text-white font-bold tracking-wide">LIPA NA M-PESA</h2>
                <div className="w-8 h-0.5 bg-red-500 mx-auto mt-2" />
              </div>

              {/* Paybill Details */}
              <div className="px-6 py-6">
                <div className="border border-[#4CAF50]/20 rounded-lg p-5 mb-5">
                  {/* Paybill Number */}
                  <p className="font-body text-xs uppercase tracking-widest text-center text-[#4CAF50] font-bold mb-3">
                    Paybill Number
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-5">
                    {["8", "9", "9", "8", "9", "0"].map((digit, i) => (
                      <div key={`pb-${i}`} className="w-10 h-10 border-2 border-[#4CAF50]/30 flex items-center justify-center font-body text-lg font-bold text-[#4CAF50]">
                        {digit}
                      </div>
                    ))}
                  </div>

                  {/* Account Number */}
                  <p className="font-body text-xs uppercase tracking-widest text-center text-gray-500 mb-3">
                    Account Number
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-5">
                    {["T", "E", "Z", "Z", "A", "Z"].map((digit, i) => (
                      <div key={`ac-${i}`} className="w-10 h-10 border-2 border-[#4CAF50]/30 flex items-center justify-center font-body text-lg font-bold text-[#4CAF50]">
                        {digit}
                      </div>
                    ))}
                  </div>

                  <p className="font-body text-sm font-bold text-center mb-4">TEZZAZ HAIR</p>

                  {/* Copy Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCopy("899890", "paybill")}
                      className="flex-1 border border-gray-300 py-2.5 font-body text-xs flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                      {copiedField === "paybill" ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      Copy Paybill
                    </button>
                    <button
                      onClick={() => handleCopy("TEZZAZ", "account")}
                      className="flex-1 border border-gray-300 py-2.5 font-body text-xs flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                      {copiedField === "account" ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      Copy Account
                    </button>
                  </div>

                  <div className="flex items-center justify-end mt-3 gap-1">
                    <span className="font-body text-xs text-[#4CAF50] font-bold">Safaricom</span>
                    <span className="font-body text-[10px] text-gray-400">M-PESA</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="bg-[#4CAF50]/5 border border-[#4CAF50]/20 rounded-lg px-5 py-4 mb-5 flex items-center justify-between">
                  <span className="font-body text-sm text-gray-600">Amount to Pay:</span>
                  <span className="font-display text-xl font-bold text-[#4CAF50]">KSh {total.toLocaleString()}</span>
                </div>

                {/* Confirmation */}
                <div className="mb-5">
                  <label className="flex items-start gap-2 mb-3">
                    <input type="checkbox" className="accent-black mt-0.5" />
                    <span className="font-body text-sm text-gray-600">
                      After paying, paste the M-PESA SMS below
                    </span>
                  </label>
                  <label className="font-body text-sm font-bold mb-2 block">
                    M-PESA Confirmation Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={mpesaConfirmation}
                    onChange={(e) => setMpesaConfirmation(e.target.value)}
                    placeholder="Paste the full M-PESA SMS here e.g. RK12ABC..."
                    rows={4}
                    className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleMpesaSubmit}
                  className="w-full bg-[#4CAF50] text-white font-body text-sm uppercase tracking-widest py-4 hover:bg-[#43A047] transition-colors"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <FooterSection />
    </div>
  );
};

export default CheckoutPage;
