import { InfoIcon, ShieldCheckIcon } from "lucide-react";
import React from "react";

const OtpModal = ({ setOtpModal, otp, setOtp, handleComplete, submitting }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setOtpModal(null)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-fade-in">
          {/* Header */}
          <div className="border-b border-zinc-100 px-6 py-5">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
              <ShieldCheckIcon className="size-7 text-green-600" />
            </div>

            <h2 className="text-center text-2xl font-bold text-zinc-900">
              Verify Delivery
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-zinc-500">
              Ask the customer for the 6-digit delivery OTP before completing
              the order.
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <label className="mb-3 block text-sm font-medium text-zinc-700">
              Delivery OTP
            </label>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 text-center text-2xl font-bold tracking-[0.45em] outline-none transition focus:border-app-green focus:bg-white focus:ring-4 focus:ring-green-100"
            />

            <div className="mt-3 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3">
              <InfoIcon className="size-4 text-blue-600 shrink-0" />

              <p className="text-xs leading-5 text-blue-700">
                Delivery will only be completed if the OTP matches the
                customer's OTP.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-zinc-100 bg-zinc-50 px-6 py-5">
            <button
              onClick={() => {
                setOtpModal(null);
                setOtp("");
              }}
              className="flex-1 rounded-2xl border border-zinc-200 bg-white py-3 font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              Cancel
            </button>

            <button
              onClick={handleComplete}
              disabled={otp.length !== 6 || submitting}
              className="flex-1 rounded-2xl bg-app-green py-3 font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Verifying..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpModal;
