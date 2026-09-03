import {
  CheckCircle2,
  Lock,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";

export default function CheckoutReview({
  address,
  items,
  handlePlaceOrder,
  loading,
  cartTotal,
  total,
}) {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const deliveryFee = cartTotal > 249 ? 0 : 49;
  // const tax = total * 0.08;
  // var total = total + deliveryFee + tax;

  return (
    <div className="bg-white rounded-3xl border border-app-border shadow-sm overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-app-green/5 to-app-orange/5 border-b border-app-border px-7 py-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-app-green/10 flex items-center justify-center">
            <ShoppingBag className="w-7 h-7 text-app-green" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-app-green">
              Review Your Order
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Confirm everything before placing your order.
            </p>
          </div>
        </div>
      </div>

      <div className="p-7 space-y-6">
        {/* Delivery Address */}
        <div className="rounded-2xl border border-app-border bg-app-cream p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="text-app-green" size={20} />
              <h3 className="font-semibold text-app-green">Delivery Address</h3>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
              Deliverable
            </span>
          </div>

          <p className="font-semibold text-zinc-900">{address.label}</p>

          <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
            {address.address}
          </p>

          <p className="text-sm text-zinc-500">
            {address.city}, {address.state} - {address.pin}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 border border-app-border">
            <Truck size={16} className="text-app-green" />
            <span className="text-xs font-medium text-zinc-700">
              Estimated delivery: 20–30 mins
            </span>
          </div>
        </div>

        {/* Items */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Package className="text-app-green" size={20} />
            <h3 className="font-semibold text-app-green">
              Order Items ({items.length})
            </h3>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 rounded-2xl border border-app-border p-4 hover:shadow-md transition"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-app-cream"
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-zinc-900">
                    {item.product.name}
                  </h4>

                  <p className="text-sm text-zinc-500 mt-1">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-sm text-app-green font-medium mt-2">
                    {currency}
                    {item.product.price.toFixed(2)} each
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg text-zinc-900">
                    {currency}
                    {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-2xl bg-zinc-50 border border-app-border p-5">
          <h3 className="font-semibold text-app-green mb-4">Order Summary</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-medium">
                {currency}
                {cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Delivery Fee</span>

              <span className="text-green-600 font-semibold">
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-semibold">FREE</span>
                ) : (
                  `${currency}${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Taxes</span>
              <span>Included</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>

              <span className="text-app-green">
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="rounded-2xl bg-green-50 border border-green-100 p-4 flex items-center gap-3">
          <Lock className="text-green-600" size={20} />

          <div>
            <p className="font-semibold text-green-700 text-sm">
              Secure Checkout
            </p>

            <p className="text-xs text-green-600">
              Your order and payment information are protected.
            </p>
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full rounded-2xl bg-app-orange hover:bg-app-orange-dark transition-all text-white py-4 font-semibold text-lg shadow-lg shadow-orange-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          <CheckCircle2 size={22} />

          {loading
            ? "Placing Your Order..."
            : `Place Order • ${currency}${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
