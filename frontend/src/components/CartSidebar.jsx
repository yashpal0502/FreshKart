import React from "react";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

const CartSidebar = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const {
    items,
    updateQuantity,
    removeFromCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCartContext();

  const navigate = useNavigate();

  const deliveryFee = cartTotal > 249 ? 0 : 49;
  const grandTotal = cartTotal + deliveryFee;

  // if (!isCartOpen) return null;

  return (
    isCartOpen && (
      <>
        {/* Overlay */}
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        />

        {/* Sidebar */}
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col rounded-l-3xl overflow-hidden animate-slide-in-right">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Shopping Cart
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {items.length} item{items.length !== 1 && "s"}
                </p>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="h-10 w-10 rounded-full bg-gray-100 hover:rotate-90 hover:bg-gray-200 transition flex items-center justify-center"
              >
                <XIcon size={18} />
              </button>
            </div>
          </div>

          {/* Free Delivery Progress */}
          {items.length > 0 && (
            <div className="px-6 py-4 bg-emerald-50 border-b border-emerald-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-emerald-700">
                  {cartTotal >= 249
                    ? "🎉 Free Delivery Unlocked"
                    : `Add ${currency}${(249 - cartTotal).toFixed(
                        0,
                      )} more for free delivery`}
                </span>

                <span className="font-medium">{currency}249</span>
              </div>

              <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${Math.min((cartTotal / 249) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                  <ShoppingBagIcon size={42} className="text-gray-500" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Your cart is empty
                </h3>

                <p className="text-gray-500 max-w-xs">
                  Looks like you haven't added anything yet. Start exploring our
                  fresh products.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-xl bg-gray-50"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 line-clamp-2">
                          {item.product.name}
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                          {currency}
                          {item.product.price.toFixed(2)} / {item.product.unit}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity - 1,
                              )
                            }
                            className="h-9 w-9 flex items-center justify-center hover:bg-gray-200 transition"
                          >
                            <MinusIcon size={15} />
                          </button>

                          <span className="w-10 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity + 1,
                              )
                            }
                            className="h-9 w-9 flex items-center justify-center hover:bg-gray-200 transition"
                          >
                            <PlusIcon size={15} />
                          </button>
                        </div>

                        {/* Price + Delete */}
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg text-gray-900">
                            {currency}
                            {(item.product.price * item.quantity).toFixed(2)}
                          </span>

                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="h-9 w-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center justify-center"
                          >
                            <Trash2Icon size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
              {/* Bill Summary */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>

                  <span className="font-medium">
                    {currency}
                    {cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>

                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    <span>
                      {currency}
                      {deliveryFee.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>

                  <span>
                    {currency}
                    {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout");
                  window.scrollTo(0, 0);
                }}
                className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >
                Proceed to Checkout
                <ArrowRightIcon size={18} />
              </button>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default CartSidebar;
