import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar = ({ open, onClose }: CartSidebarProps) => {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[70] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="font-display text-xl font-bold text-black">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
              <p className="font-display text-lg font-bold text-black mb-1">Cart is empty</p>
              <p className="font-body text-xs text-gray-400">Add items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 pb-4 border-b border-gray-100">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display text-sm font-bold text-black truncate">
                          {item.product.name}
                        </h3>
                        <p className="font-body text-xs font-bold text-black mt-0.5">
                          KSh {item.product.priceNum.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-300 hover:text-black transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center border border-gray-200 w-fit mt-2">
                      <button
                        onClick={() => updateQty(item.product.id, item.qty - 1)}
                        className="px-2 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 font-body text-xs border-x border-gray-200 min-w-[28px] text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.qty + 1)}
                        className="px-2 py-1 hover:bg-gray-100 transition-colors"
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
          <div className="border-t border-gray-200 px-6 py-5">
            <div className="flex justify-between items-center mb-1">
              <span className="font-display text-base font-bold text-black">Subtotal</span>
              <span className="font-display text-base font-bold text-black">
                KSh {cartTotal.toLocaleString()}
              </span>
            </div>
            <p className="font-body text-[10px] text-gray-400 mb-5">
              Shipping calculated at checkout
            </p>

            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="w-full bg-black text-white font-body text-xs uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors mb-3"
            >
              Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gray-200 text-black font-body text-xs uppercase tracking-widest py-4 hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
