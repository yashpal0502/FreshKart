import React from "react";
import { KeyRoundIcon, ShieldCheckIcon, CopyIcon } from "lucide-react";

const OrderOTP = ({ order }) => {
  const showOtp =
    order?.deliveryOtp &&
    ["Assigned", "Packed", "Out for Delivery"].includes(order.status);

  if (!showOtp) return null;

  const copyOTP = () => {
    navigator.clipboard.writeText(order.deliveryOtp);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-app-green/10 bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-app-green/[0.03] via-transparent to-app-orange/[0.05]" />

      {/* Decorative Blur */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-app-green/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      <div className="relative p-7">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-app-green to-app-green-light text-white shadow-lg">
              <KeyRoundIcon className="h-6 w-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-app-green">
                  Delivery Verification
                </h3>

                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  Secure
                </span>
              </div>

              <p className="mt-1 text-sm text-app-text-light">
                Share this OTP only after receiving your order.
              </p>
            </div>
          </div>

          <ShieldCheckIcon className="h-8 w-8 text-emerald-500" />
        </div>

        {/* OTP */}
        <div className="mt-8 flex flex-wrap gap-3">
          {order.deliveryOtp.split("").map((digit, index) => (
            <div
              key={index}
              className="group/digit flex h-10 w-10 items-center justify-center rounded-2xl border border-app-green/10 bg-gradient-to-b from-white to-app-cream text-3xl font-black tracking-widest text-app-green shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-app-green hover:shadow-lg"
            >
              {digit}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-col gap-3 border-t border-app-border pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-relaxed text-app-text-light">
            Never share this code over a phone call or message. The delivery
            partner will ask for it only after handing over your order.
          </p>

          <button
            onClick={copyOTP}
            className="inline-flex w-50 max-md:w-full items-center justify-center gap-2 rounded-xl border border-app-green/10 bg-app-green px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-app-green-light"
          >
            <CopyIcon className="h-4 w-4" />
            Copy OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderOTP;
