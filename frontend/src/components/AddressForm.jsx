import React from "react";
import { Home, MapPin, Building2, Map, X, Check } from "lucide-react";

const AddressForm = ({
  resetForm,
  handleSubmit,
  form,
  setForm,
  editingId,
  submitting,
}) => {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Modal */}
      <div
        onClick={resetForm}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
          className="w-full max-w-xl max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_rgba(0,0,0,0.18)] animate-in zoom-in-95 duration-300"
        >
          {/* Header */}
          <div className="border-b border-app-border bg-white px-7 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-app-green/10">
                <Home className="text-app-green" size={26} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-app-text">
                  {editingId ? "Edit Address" : "Add New Address"}
                </h2>

                <p className="text-sm text-app-text-light mt-1">
                  Add your delivery address for faster checkout.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="absolute right-16 top-14 rounded-xl p-2 text-app-text-light hover:bg-app-cream transition hover:rotate-90"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[58vh] overflow-y-auto px-7 py-6 space-y-6">
            {/* Label */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-app-text">
                Address Label
              </label>

              <div className="relative">
                <Home
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-app-green"
                />

                <input
                  type="text"
                  placeholder="Home, Office, Hostel..."
                  value={form.label}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      label: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition-all duration-200 focus:border-app-green focus:ring-4 focus:ring-green-100"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-app-text">
                Street Address
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-4 text-app-green"
                />

                <textarea
                  rows={3}
                  value={form.address}
                  placeholder="House No, Street, Landmark..."
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-2xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition-all duration-200 focus:border-app-green focus:ring-4 focus:ring-green-100"
                  required
                />
              </div>
            </div>

            {/* City & State */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-app-text">
                  City
                </label>

                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-app-green"
                  />

                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        city: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition-all focus:border-app-green focus:ring-4 focus:ring-green-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-app-text">
                  State
                </label>

                <div className="relative">
                  <Map
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-app-green"
                  />

                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        state: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition-all focus:border-app-green focus:ring-4 focus:ring-green-100"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pin */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-app-text">
                PIN Code
              </label>

              <input
                type="number"
                value={form.pincode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pincode: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-app-green focus:ring-4 focus:ring-green-100"
                required
              />
            </div>

            {/* Default Toggle */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-app-text">
                    Default Address
                  </h4>

                  <p className="text-sm text-gray-500">
                    Use this as your primary delivery address.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      isDefault: !form.isDefault,
                    })
                  }
                  className={`relative h-8 w-16 rounded-full transition-all duration-300 ${
                    form.isDefault ? "bg-app-green" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-all duration-300 ${
                      form.isDefault ? "left-9" : "left-1"
                    }`}
                  >
                    {form.isDefault && (
                      <Check size={14} className="text-app-green" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t bg-white px-7 py-5">
            <button
              type="button"
              disabled={submitting}
              onClick={resetForm}
              className="h-12 px-8 rounded-2xl border border-app-border bg-white text-app-text font-medium hover:bg-app-cream transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="h-12 px-8 rounded-2xl bg-emerald-600 text-white font-semibold shadow-sm hover:bg-[#18884A] hover:shadow-md active:scale-[0.98] transition-all"
            >
              {submitting
                ? "Saving..."
                : editingId
                  ? "Update Address"
                  : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddressForm;
