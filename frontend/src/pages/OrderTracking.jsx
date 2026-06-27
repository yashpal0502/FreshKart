import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDashboardOrdersData } from "../assets/assets";
import Loading from "../components/Loading";
import {
  ArrowLeftIcon,
  MapPinIcon,
  PhoneIcon,
  PhoneOffIcon,
} from "lucide-react";
import OrderOTP from "../components/OrderTracking/OrderOTP";
import LiveMap from "../components/OrderTracking/LiveMap";
import OrderTimeLine from "../components/OrderTracking/OrderTimeLine";

const OrderTracking = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveLocation, setLiveLocation] = useState(null);

  useEffect(() => {
    setOrder(dummyDashboardOrdersData.find((o) => o._id === id));
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!order) return null;

  return (
    <div className="min-h-screen mb-20 bg-app-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-sm text-app-text-light hover:text-app-green mb-6 transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back to Orders
        </button>

        {/* order id, date, status */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-app-green">
              Order #{order?._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-sm text-app-text-light mt-1">
              Placed on{" "}
              {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 text-sm font-semibold rounded-full ${order?.status === "Delivered" ? "bg-green-100 text-green-700" : order?.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-app-orange/10 text-app-orange"}`}
          >
            {order?.status}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timeline + Map Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* OTP Card */}
            <OrderOTP order={order} />

            {/* Live Tracking Map*/}
            <LiveMap order={order} liveLocation={liveLocation} />

            {/* Progress Timeline */}
            <OrderTimeLine order={order} />

            {/* Delivery Person */}
            {order?.deliveryPartner &&
              order.status !== "Delivered" &&
              order.status !== "Cancelled" && (
                <div className="bg-white rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-app-green flex-center">
                      <span className="text-white font-semibold text-sm">
                        {order.deliveryPartner.name.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-app-green">
                        {order.deliveryPartner.name}
                      </p>
                      <p className="text-xs text-app-text-light capitalize">
                        {order.deliveryPartner.vehicleType} ● Delivery Partner
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${order.deliveryPartner.phone}`}
                    className="p-2.5 bg-app-cream rounded-xl hover:bg-app-cream-dark transition-colors"
                  >
                    <PhoneIcon className="size-4 text-app-green" />
                  </a>
                </div>
              )}
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-5">
            {/* Delivery Address */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-app-border">
              {/* Decorative Gradient */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-app-green/10 blur-2xl" />

              <div className="relative p-6">
                {/* Header */}

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-app-green/10">
                      <MapPinIcon className="h-6 w-6 text-app-green" />
                    </div>

                    <div>
                      <h3 className="font-bold text-app-green text-lg">
                        Delivery Address
                      </h3>

                      <p className="text-sm text-app-text-light">
                        Your order will be delivered here
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {order.shippingAddress.label}
                  </span>
                </div>

                {/* Address */}

                <div className="rounded-2xl bg-app-cream/40 border border-app-border p-5">
                  <p className="font-semibold text-app-green">
                    {order.shippingAddress.address}
                  </p>

                  <p className="mt-2 text-sm text-app-text-light">
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>

                  <p className="text-sm text-app-text-light">
                    PIN - {order.shippingAddress.zip}
                  </p>
                </div>

                {/* Footer */}

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-app-green/5 px-4 py-3">
                  <div>
                    <p className="text-xs text-app-text-light">Delivery Type</p>

                    <p className="font-semibold text-app-green">
                      Home Delivery
                    </p>
                  </div>

                  <button className="rounded-xl border border-app-green px-4 py-2 text-sm font-semibold text-app-green transition hover:bg-app-green hover:text-white">
                    View on Map
                  </button>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl px-5 py-3 mt-10">
              <div className="flex items-center justify-between border-b border-app-border px-6 py-3">
                <div>
                  <h3 className="text-lg font-bold text-app-green">
                    Order Items
                  </h3>

                  <p className="mt-1 text-sm text-app-text-light">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}{" "}
                    in this order
                  </p>
                </div>

                <div className="flex h-11 min-w-11 items-center justify-center rounded-2xl bg-app-green text-white font-bold">
                  {order.items.length}
                </div>
              </div>

              <div className="space-y-3 py-2">
                {order?.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-10 rounded-lg object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-app-green truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-app-text-light">
                        x{item.quantity}
                      </p>
                    </div>

                    <span className="text-sm font-semibold">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-app-border space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-app-text-light">Subtotal</span>
                  <span>
                    {currency}
                    {order?.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-app-text-light">Delivery</span>
                  <span>
                    {order?.deliveryFee === 0
                      ? "Free"
                      : `${currency}${order?.deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-app-text-light">Tax</span>
                  <span>
                    {currency}
                    {order?.tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-app-border font-semibold text-app-green">
                  <span>Total</span>
                  <span>
                    {currency}
                    {order?.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
