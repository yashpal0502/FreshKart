import React from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  TruckIcon,
  XCircleIcon,
} from "lucide-react";
import { statusColors } from "../../assets/assets";

const DeliveryOrderCard = ({
  order,
  tab,
  handleUpdateStatus,
  setOtpModal,
  setCancelModal,
}) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const user =
    typeof order.userId === "object"
      ? order.userId
      : { name: "Customer", email: "", phone: "" };
  return (
    <div
      key={order._id}
      className="group overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm hover:shadow-lg transition-all"
    >
      {/* Header */}
      <div className="relative border-b border-zinc-100 px-5 py-4">
        <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-green-100 to-orange-100 blur-xl opacity-60" />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-zinc-400">
              Order ID
            </p>

            <h3 className="mt-1 font-semibold text-base text-zinc-900">
              #{order._id.slice(-6).toUpperCase()}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-zinc-400">Amount</p>

            <h2 className="text-xl font-bold text-app-green">
              {currency}
              {order.total.toFixed(2)}
            </h2>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
              statusColors[order.status] || "bg-zinc-100 text-zinc-700"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {order.status}
          </span>

          <span className="text-[11px] uppercase text-zinc-500">
            {order.paymentMethod}
          </span>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-app-green to-green-900 text-sm font-bold text-white">
            {user.name?.charAt(0)}
          </div>

          <div>
            <p className="font-medium text-zinc-900">{user.name}</p>

            {user.phone && (
              <p className="flex items-center gap-1 text-xs text-zinc-500">
                <PhoneIcon className="size-3.5" />
                {user.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 rounded-xl bg-zinc-50 p-3">
          <MapPinIcon className="mt-0.5 size-4 text-app-green shrink-0" />

          <p className="text-xs leading-5 text-zinc-600">
            {order.shippingAddress.address}, {order.shippingAddress.city},
            {order.shippingAddress.state}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-100 px-4 py-3">
          <div>
            <p className="text-[10px] uppercase text-zinc-400">Items</p>

            <p className="font-semibold">{order.items.length}</p>
          </div>

          <div className="h-8 w-px bg-zinc-100" />

          <div>
            <p className="text-[10px] uppercase text-zinc-400">Payment</p>

            <p className="font-semibold uppercase">{order.paymentMethod}</p>
          </div>
        </div>
      </div>

      {/* Footer */}

      {tab === "active" ? (
        <div className="flex flex-wrap gap-2 border-t border-zinc-100 bg-zinc-50 px-5 py-4">
          {(order.status === "Assigned" || order.status === "Packed") && (
            <button
              onClick={() =>
                handleUpdateStatus(
                  order._id,
                  order.status === "Assigned" ? "Packed" : "Out for Delivery",
                )
              }
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              {order.status === "Assigned" ? "Mark Packed" : "Out for Delivery"}
            </button>
          )}

          {order.status === "Out for Delivery" && (
            <button
              onClick={() => setOtpModal(order._id)}
              className="rounded-xl bg-app-green px-4 py-2.5 text-sm font-medium text-white hover:bg-green-900 transition"
            >
              Mark Delivered
            </button>
          )}

          {order.status !== "Delivered" && order.status !== "Cancelled" && (
            <button
              onClick={() => setCancelModal(order._id)}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition"
            >
              Cancel
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-4 text-sm">
          <span className="text-zinc-500">Delivered</span>

          <span className="font-medium text-zinc-900">
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default DeliveryOrderCard;
