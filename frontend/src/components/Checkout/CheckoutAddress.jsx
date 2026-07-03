import {
  CheckCircle2,
  ChevronRight,
  Home,
  MapPin,
  Plus,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutAddress = ({ user, address, setAddress, setStep }) => {
  return (
    <div className="rounded-3xl bg-white shadow-sm border border-app-border overflow-hidden">
      {/* Header */}
      <div className="px-7 py-6 border-b border-app-border bg-gradient-to-r from-app-green/5 to-app-orange/5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-app-green/10 flex items-center justify-center">
            <MapPin className="w-7 h-7 text-app-green" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-app-green">
              Delivery Address
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Select where you want your groceries delivered.
            </p>
          </div>
        </div>
      </div>

      <div className="p-7">
        {/* Saved Addresses */}
        {user?.addresses?.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-zinc-800">Saved Addresses</h3>

                <p className="text-sm text-zinc-500">
                  Choose one for this order
                </p>
              </div>

              <div className="text-xs bg-green-50 text-app-green font-semibold px-3 py-1 rounded-full">
                {user.addresses.length} Saved
              </div>
            </div>

            <div className="space-y-4">
              {user.addresses.map((adds) => {
                const selected =
                  address.label === adds.label &&
                  address.address === adds.address;

                return (
                  <div
                    key={adds._id}
                    onClick={() =>
                      setAddress({
                        label: adds.label,
                        address: adds.address,
                        city: adds.city,
                        state: adds.state,
                        pin: adds.pin,
                        lat: adds.lat,
                        lng: adds.lng,
                      })
                    }
                    className={`relative cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden group
                    ${
                      selected
                        ? "border-app-green bg-green-50 shadow-lg shadow-green-100 scale-[1.01]"
                        : "border-app-border hover:border-app-green/50 hover:shadow-md"
                    }`}
                  >
                    {selected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-app-green"></div>
                    )}

                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center
                            ${
                              selected
                                ? "bg-app-green text-white"
                                : "bg-app-cream text-app-green"
                            }`}
                          >
                            <Home size={22} />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-zinc-900">
                                {adds.label}
                              </h4>

                              {adds.isDefault && (
                                <span className="px-2 py-1 rounded-full text-[11px] font-semibold bg-orange-100 text-app-orange">
                                  DEFAULT
                                </span>
                              )}

                              <span className="px-2 py-1 rounded-full text-[11px] font-medium bg-green-100 text-green-700 flex items-center gap-1">
                                <Truck size={11} />
                                Deliverable
                              </span>
                            </div>

                            <p className="text-zinc-600 text-sm mt-2 leading-relaxed">
                              {adds.address}
                            </p>

                            <p className="text-sm text-zinc-500 mt-1">
                              {adds.city}, {adds.state} - {adds.pin}
                            </p>
                          </div>
                        </div>

                        <div>
                          {selected ? (
                            <CheckCircle2
                              className="text-app-green"
                              size={26}
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-zinc-300 group-hover:border-app-green"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-app-border p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-app-cream flex items-center justify-center">
              <MapPin className="w-10 h-10 text-app-green" />
            </div>

            <h3 className="font-semibold text-lg mt-5 text-zinc-800">
              No Address Found
            </h3>

            <p className="text-zinc-500 mt-2">
              Add your first delivery address to continue.
            </p>
          </div>
        )}

        {/* Add Address */}
        <Link
          to="/addresses"
          className="mt-7 flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-app-green text-app-green font-semibold py-4 hover:bg-app-green hover:text-white transition-all"
        >
          <Plus size={20} />
          Add New Address
        </Link>

        {/* Continue */}
        <div className="sticky bottom-4 mt-7 bg-white">
          <button
            onClick={() => {
              setStep("payment");
              scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            disabled={!address.address || !address.city}
            className="w-full rounded-2xl bg-app-green text-white py-4 font-semibold flex items-center justify-center gap-3 hover:bg-app-green-light transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-200"
          >
            Continue to Payment
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;
