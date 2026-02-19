import { X, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-[70]" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="font-display text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-body text-gray-400 text-sm mb-4">Your cart is empty</p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/shop");
                }}
                className="font-body text-xs uppercase tracking-widest bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 border-b border-gray-100 pb-4">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-body text-sm font-bold text-black truncate">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-black flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-body text-sm text-black">{item.product.priceDisplay}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm">Subtotal</span>
              <span className="font-body text-lg font-bold">KSh {getCartTotal().toLocaleString()}</span>
            </div>
            <p className="font-body text-xs text-gray-400">Shipping calculated at checkout</p>
            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="w-full bg-black text-white font-body text-sm uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors"
            >
              Checkout
            </button>
            <button
              onClick={() => {
                onClose();
                navigate("/shop");
              }}
              className="w-full border-2 border-black text-black font-body text-sm uppercase tracking-widest py-3 hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
