import {
  BadgeCheck,
  Banknote,
  ChevronRight,
  CreditCard,
  Lock,
  ShieldCheck,
} from "lucide-react";

export default function CheckoutPayment({
  setStep,
  paymentMethod,
  setPaymentMethod,
}) {
  const methods = [
    {
      value: "card",
      title: "Credit / Debit Card",
      subtitle: "Visa, Mastercard, RuPay & more",
      icon: CreditCard,
      badge: "Recommended",
      color: "bg-blue-50 text-blue-600",
    },
    {
      value: "cash",
      title: "Cash on Delivery",
      subtitle: "Pay after receiving your order",
      icon: Banknote,
      badge: "Available",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-app-border shadow-sm overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-app-green/5 to-app-orange/5 border-b border-app-border px-7 py-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-app-green/10 flex items-center justify-center">
            <CreditCard className="w-7 h-7 text-app-green" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-app-green">Payment Method</h2>

            <p className="text-sm text-zinc-500 mt-1">
              Choose how you'd like to pay.
            </p>
          </div>
        </div>
      </div>

      <div className="p-7">
        {/* Security Banner */}
        <div className="flex items-center gap-3 rounded-2xl bg-green-50 border border-green-100 p-4 mb-6">
          <ShieldCheck className="text-green-600" size={22} />

          <div>
            <p className="font-semibold text-green-700 text-sm">
              Secure Checkout
            </p>

            <p className="text-xs text-green-600">
              All transactions are encrypted and protected.
            </p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          {methods.map((method) => {
            const Icon = method.icon;
            const selected = paymentMethod === method.value;

            return (
              <div
                key={method.value}
                onClick={() => setPaymentMethod(method.value)}
                className={`relative cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden
                ${
                  selected
                    ? "border-app-green bg-green-50 shadow-lg shadow-green-100 scale-[1.01]"
                    : "border-app-border hover:border-app-green/50 hover:shadow-md"
                }`}
              >
                {selected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-app-green"></div>
                )}

                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center
                      ${
                        selected
                          ? "bg-app-green text-white"
                          : "bg-app-cream text-app-green"
                      }`}
                    >
                      <Icon size={26} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-zinc-900">
                          {method.title}
                        </h3>

                        <span
                          className={`text-[11px] px-2 py-1 rounded-full font-semibold ${method.color}`}
                        >
                          {method.badge}
                        </span>
                      </div>

                      <p className="text-sm text-zinc-500 mt-1">
                        {method.subtitle}
                      </p>
                    </div>
                  </div>

                  <div>
                    {selected ? (
                      <BadgeCheck className="text-app-green" size={26} />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-zinc-300"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Info */}
        {paymentMethod === "card" && (
          <div className="mt-5 rounded-2xl bg-blue-50 border border-blue-100 p-4 flex items-center gap-3">
            <Lock className="text-blue-600" size={20} />

            <div>
              <p className="font-medium text-blue-700 text-sm">
                Your card details are safe
              </p>

              <p className="text-xs text-blue-600">
                We use industry-standard SSL encryption for every payment.
              </p>
            </div>
          </div>
        )}

        {paymentMethod === "cash" && (
          <div className="mt-5 rounded-2xl bg-orange-50 border border-orange-100 p-4">
            <p className="text-sm font-medium text-orange-700">
              Cash on Delivery selected
            </p>

            <p className="text-xs text-orange-600 mt-1">
              Please keep the exact amount ready for faster delivery.
            </p>
          </div>
        )}

        {/* Continue */}
        <div className="sticky bottom-4 bg-white pt-7">
          <button
            onClick={() => {
              setStep("review");
              scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="w-full bg-app-green hover:bg-app-green-light transition-all rounded-2xl py-4 text-white font-semibold flex items-center justify-center gap-3 shadow-lg shadow-green-200"
          >
            Review Order
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
