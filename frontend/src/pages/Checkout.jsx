import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { dummyAddressData } from "../assets/assets";
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  CreditCardIcon,
  MapPinIcon,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import CheckoutReview from "../components/Checkout/CheckoutReview";

import api from "../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const { items, cartTotal, clearCart } = useCartContext();
  const { user } = useAuth();

  const [step, setStep] = useState("address");
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    _id: "Home",
    label: "Home",
    address: "",
    city: "",
    state: "",
    pin: "",
    isDefault: false,
    lat: 0,
    lng: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const deliveryFee = cartTotal > 249 ? 0 : 49;
  const tax = cartTotal * 0.08;
  const total = cartTotal + deliveryFee + tax;

  const steps = [
    { key: "address", label: "Address", icon: MapPinIcon },
    { key: "payment", label: "Payment", icon: CreditCardIcon },
    { key: "review", label: "Review", icon: CheckIcon },
  ];

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: address,
        paymentMethod,
      };

      // console.log("ORDER DATA:", orderData);
      // console.log("CART ITEMS:", items);

      const { data } = await api.post("/orders", orderData);
      console.log(data);
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      clearCart();
      toast.success("Order placed successfully");

      navigate(`/orders/${data.order.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
      scrollTo(0, 0);
    }
  };

  useState(() => {
    if (user?.addresses?.length) {
      const defaultAdds =
        user.addresses.find((a) => a.isDefault) || user.addresses[0];

      setAddress({
        _id: defaultAdds?._id,
        label: defaultAdds?.label,
        address: defaultAdds?.address,
        city: defaultAdds?.city,
        state: defaultAdds?.state,
        pin: defaultAdds?.pin,
        isDefault: defaultAdds?.isDefault,
        lat: defaultAdds?.lat,
        lng: defaultAdds?.lng,
      });
    }
  });

  if (items.length === 0)
    return (
      <div className="min-h-screen bg-app-cream flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-app-border shadow-sm p-10 text-center">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-app-green/10 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-app-green" />
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-2xl font-bold text-app-green">
            Your Cart is Empty
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Looks like you haven't added any fresh groceries yet. Start shopping
            and we'll deliver them right to your doorstep.
          </p>

          {/* Features */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
              🚚 Fast Delivery
            </span>

            <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-medium">
              🥬 Fresh Products
            </span>

            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
              💳 Secure Checkout
            </span>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/products")}
            className="mt-8 w-full bg-app-green hover:bg-app-green-light transition-all text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-200"
          >
            Start Shopping
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-app-text-light hover:text-app-green transition-colors mb-4"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Continue Shopping
            </button>

            <h1 className="text-4xl font-bold text-app-green">
              Secure Checkout
            </h1>

            <p className="mt-2 text-zinc-500">
              Complete your order in just a few simple steps.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3 bg-white border border-app-border rounded-2xl px-5 py-3 shadow-sm">
            <ShieldCheck className="text-green-600 w-6 h-6" />

            <p className="font-semibold text-sm">100% Secure Checkout</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-3xl border border-app-border shadow-sm p-6 mb-8">
          <div className="flex justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-zinc-200 rounded-full"></div>

            <div
              className={`absolute top-5 left-0 h-1 bg-app-green rounded-full transition-all duration-500
          ${
            step === "address" ? "w-0" : step === "payment" ? "w-1/2" : "w-full"
          }`}
            ></div>

            {steps.map((s, index) => {
              const active =
                step === s.key ||
                (step === "payment" && index === 0) ||
                (step === "review" && index <= 1);

              return (
                <button
                  key={s.key}
                  onClick={() => setStep(s.key)}
                  className="relative z-10 flex flex-col items-center flex-1 group"
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all
                ${
                  active
                    ? "bg-app-green text-white shadow-lg shadow-green-200"
                    : "bg-white border-2 border-zinc-300 text-zinc-400"
                }`}
                  >
                    <s.icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`mt-3 text-sm font-medium ${
                      active ? "text-app-green" : "text-zinc-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2">
            {step === "address" && (
              <CheckoutAddress
                address={address}
                setAddress={setAddress}
                setStep={setStep}
                user={user}
              />
            )}

            {step === "payment" && (
              <CheckoutPayment
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setStep={setStep}
              />
            )}

            {step === "review" && (
              <CheckoutReview
                address={address}
                items={items}
                handlePlaceOrder={handlePlaceOrder}
                loading={loading}
                total={cartTotal}
              />
            )}
          </div>

          {/* Sidebar */}

          {step !== "review" && (
            <div className="space-y-5">
              <div className="sticky top-24">
                <div className="bg-white rounded-3xl border border-app-border shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-app-green/5 to-app-orange/5 px-6 py-5 border-b border-app-border">
                    <h3 className="text-lg font-bold text-app-green">
                      Order Summary
                    </h3>

                    <p className="text-sm text-zinc-500 mt-1">
                      {items.length} item{items.length > 1 && "s"} in your cart
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Subtotal</span>

                      <span className="font-medium">
                        {currency}
                        {cartTotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-500">Delivery</span>

                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-green-600 font-semibold">
                            FREE
                          </span>
                        ) : (
                          `${currency}${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-500">Tax</span>

                      <span>
                        {currency}
                        {tax.toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t pt-5 flex justify-between text-lg font-bold">
                      <span>Total</span>

                      <span className="text-app-green">
                        {currency}
                        {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Card */}

                <div className="mt-5 bg-white rounded-3xl border border-app-border shadow-sm p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="text-app-green" />
                    <span className="font-semibold">Fast Delivery</span>
                  </div>

                  <div className="space-y-3 text-sm text-zinc-600">
                    <div className="flex justify-between">
                      <span>Estimated Time</span>

                      <span className="font-medium">20-30 min</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Payment</span>

                      <span className="text-green-600">Secure</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery</span>

                      <span className="text-app-green">Doorstep</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}

                <div className="mt-5 rounded-3xl bg-gradient-to-br from-green-50 to-orange-50 border border-app-border p-5">
                  <h4 className="font-semibold mb-4">Why shop with us?</h4>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      ✅ Fresh quality products
                    </div>

                    <div className="flex items-center gap-3">
                      🚚 Fast doorstep delivery
                    </div>

                    <div className="flex items-center gap-3">
                      🔒 Secure online payments
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
