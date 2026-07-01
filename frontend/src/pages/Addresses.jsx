import React, { useEffect, useState } from "react";
import { dummyAddressData } from "../assets/assets";
import { MapPinIcon, PlusIcon } from "lucide-react";
import Loading from "../components/Loading";
import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    isDefault: false,
  });

  const resetForm = () => {
    setForm({
      label: "",
      address: "",
      city: "",
      state: "",
      pin: "",
      isDefault: false,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const onEditHandler = (add) => {
    setForm({
      label: add.label,
      address: add.address,
      city: add.city,
      state: add.state,
      pin: add.pin,
      isDefault: add.isDefault,
    });

    setEditingId(add._id);
    setShowForm(true);
  };

  useEffect(() => {
    setAddresses(dummyAddressData);
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-app-cream via-white to-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-app-border shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-2xl bg-app-green/10 flex items-center justify-center">
                  <MapPinIcon className="h-6 w-6 text-app-green" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-app-green">
                    My Addresses
                  </h1>

                  <p className="text-sm text-app-text-light mt-1">
                    Manage your saved delivery locations for faster checkout.
                  </p>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-app-green/10 px-4 py-2 text-sm text-app-green font-medium">
                {addresses.length} Saved Address
                {addresses.length !== 1 && "es"}
              </div>
            </div>

            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex justify-center h-12 px-6 rounded-2xl bg-app-green text-white font-medium flex items-center gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <PlusIcon className="h-5 w-5" />
              Add New Address
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <AddressForm
            resetForm={resetForm}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            editingId={editingId}
          />
        )}

        {/* Content */}
        {loading ? (
          <Loading />
        ) : addresses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-app-border p-20 text-center shadow-sm">
            <div className="mx-auto h-20 w-20 rounded-full bg-app-green/10 flex items-center justify-center mb-6">
              <MapPinIcon className="h-10 w-10 text-app-green" />
            </div>

            <h2 className="text-2xl font-semibold text-app-green">
              No addresses yet
            </h2>

            <p className="mt-2 text-app-text-light max-w-md mx-auto">
              Save your home, office or other delivery locations to make
              checkout quicker next time.
            </p>

            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="mt-8 bg-app-green text-white px-6 py-3 rounded-xl hover:scale-105 transition-all"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {addresses.map((add) => (
              <AddressCard
                key={add._id}
                adds={add}
                onEditHandler={onEditHandler}
                setAddresses={setAddresses}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;
