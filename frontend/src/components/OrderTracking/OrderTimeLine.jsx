import React from "react";
import {
  ShoppingBag,
  CircleCheckBig,
  PackageCheck,
  Truck,
  Clock3,
} from "lucide-react";

const timeline = [
  {
    status: "Placed",
    title: "Order Placed",
    desc: "We've received your order.",
    icon: ShoppingBag,
  },
  {
    status: "Confirmed",
    title: "Confirmed",
    desc: "Your order has been confirmed.",
    icon: CircleCheckBig,
  },
  {
    status: "Assigned",
    title: "Partner Assigned",
    desc: "Delivery partner assigned.",
    icon: Truck,
  },
  {
    status: "Packed",
    title: "Packed",
    desc: "Packed and ready to dispatch.",
    icon: PackageCheck,
  },
  {
    status: "Out for Delivery",
    title: "Out for Delivery",
    desc: "Your order is on the way.",
    icon: Truck,
  },
  {
    status: "Delivered",
    title: "Delivered",
    desc: "Order delivered successfully.",
    icon: CircleCheckBig,
  },
];

const OrderTimeLine = ({ order }) => {
  const currentIndex = timeline.findIndex(
    (step) => step.status === order.status,
  );

  const getHistory = (status) =>
    order.statusHistory.find((item) => item.status === status);

  return (
    <div className="rounded-3xl bg-white shadow-xl border border-app-border overflow-hidden">
      {/* Header */}

      <div className="px-6 py-5 border-b border-app-border bg-gradient-to-r from-app-green/5 to-app-orange/5">
        <h2 className="text-xl font-bold text-app-green">Delivery Journey</h2>

        <p className="text-sm text-app-text-light mt-1">
          Track every stage of your order.
        </p>
      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden lg:block p-10">
        <div className="relative">
          {/* Background Line */}

          <div className="absolute top-5 left-0 right-0 h-[4px] bg-app-border rounded-full" />

          {/* Progress Line */}

          <div
            className="absolute top-5 left-0 h-[4px] rounded-full bg-gradient-to-r from-app-green to-app-green-light transition-all duration-700"
            style={{
              width: `${(currentIndex / (timeline.length - 1)) * 100}%`,
            }}
          />

          <div className="grid grid-cols-6 gap-3">
            {timeline.map((step, index) => {
              const Icon = step.icon;

              const completed = index < currentIndex;
              const current = index === currentIndex;

              const history = getHistory(step.status);

              return (
                <div
                  key={step.status}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Circle */}

                  <div
                    className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300

                    ${
                      completed
                        ? "bg-app-green text-white"
                        : current
                          ? "bg-app-orange text-white ring-4 ring-app-orange/20 animate-pulse"
                          : "bg-app-cream text-app-text-light"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Card */}

                  <div className="mt-6 w-full rounded-2xl border border-app-border bg-app-cream/20 p-4 hover:shadow-md transition">
                    <h3
                      className={`font-semibold text-sm ${
                        completed || current
                          ? "text-app-green"
                          : "text-app-text-light"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="text-xs text-app-text-light mt-2">
                      {step.desc}
                    </p>

                    {history && (
                      <div className="mt-3 flex items-center justify-center gap-1 text-[11px] text-app-text-light">
                        <Clock3 size={12} />

                        {new Date(history.timestamp).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}

                    {current && (
                      <div className="mt-3 inline-flex rounded-full bg-app-orange/10 px-3 py-1 text-[11px] font-semibold text-app-orange">
                        Current
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* ================= MOBILE ================= */}

      <div className="lg:hidden p-6">
        <div className="space-y-0">
          {timeline.map((step, index) => {
            const Icon = step.icon;

            const completed = index < currentIndex;
            const current = index === currentIndex;

            const history = getHistory(step.status);

            return (
              <div
                key={step.status}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {/* Line */}

                {index !== timeline.length - 1 && (
                  <div
                    className={`absolute left-[21px] top-11 w-[3px] h-full rounded-full transition-all duration-500 ${
                      completed
                        ? "bg-gradient-to-b from-app-green to-app-green-light"
                        : "bg-app-border"
                    }`}
                  />
                )}

                {/* Icon */}

                <div
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300

                  ${
                    completed
                      ? "bg-app-green text-white"
                      : current
                        ? "bg-app-orange text-white ring-4 ring-app-orange/20 animate-pulse"
                        : "bg-app-cream text-app-text-light"
                  }`}
                >
                  <Icon size={18} />
                </div>

                {/* Content */}

                <div className="flex-1 rounded-2xl border border-app-border bg-app-cream/20 p-4 transition-all duration-300 hover:border-app-green/20 hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3
                        className={`font-semibold ${
                          completed || current
                            ? "text-app-green"
                            : "text-app-text-light"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-1 text-sm text-app-text-light">
                        {step.desc}
                      </p>
                    </div>

                    {current && (
                      <span className="rounded-full bg-app-orange/10 px-3 py-1 text-[11px] font-semibold whitespace-nowrap text-app-orange">
                        Current
                      </span>
                    )}

                    {completed && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold whitespace-nowrap text-green-700">
                        Done
                      </span>
                    )}
                  </div>

                  {history && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-app-text-light">
                      <Clock3 size={14} />

                      {new Date(history.timestamp).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTimeLine;
