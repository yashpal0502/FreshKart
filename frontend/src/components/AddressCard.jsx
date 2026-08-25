import {
  CheckCircle2,
  MapPin,
  Pencil,
  Trash2,
  Home,
  Briefcase,
} from "lucide-react";
import React from "react";
import api from "../config/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AddressCard = ({ adds, onEditHandler, setAddresses }) => {
  const { updateUser } = useAuth();

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this address?",
      );
      if (!confirm) {
        return;
      }
      const { data } = await api.delete(`/addresses/${id}`);
      setAddresses(data.addresses);
      updateUser({ addresses: data.addresses });
      toast.success("Address removed!");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed");
    }
  };

  const getIcon = () => {
    switch (adds.label?.toLowerCase()) {
      case "home":
        return <Home className="w-5 h-5 text-white" />;
      case "work":
        return <Briefcase className="w-5 h-5 text-white" />;
      default:
        return <MapPin className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-app-green/30 hover:shadow-2xl">
      {/* Accent Line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 opacity-70 group-hover:w-2 transition-all duration-300" />

      <div className="p-6 flex justify-between gap-6">
        {/* LEFT */}
        <div className="flex gap-5 flex-1">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-200 group-hover:scale-105 transition-transform">
            {getIcon()}
          </div>

          {/* Details */}
          <div className="flex-1">
            {/* Top */}
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-lg font-semibold capitalize text-gray-900">
                {adds.label}
              </h3>

              {adds.isDefault && (
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  <CheckCircle2 size={14} />
                  Default
                </span>
              )}
            </div>

            {/* Address Box */}
            <div className="mt-3 rounded-2xl bg-app-cream p-4 border border-gray-100">
              <p className="text-sm leading-6 text-gray-600">{adds.address}</p>

              <p className="mt-2 text-sm font-medium text-gray-700">
                {adds.city}, {adds.state}
              </p>

              <p className="text-sm text-gray-500">PIN : {adds.pincode}</p>
            </div>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex flex-col gap-3 justify-center">
          <button
            onClick={() => onEditHandler(adds)}
            className="group/edit flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all hover:border-app-green hover:bg-app-green hover:text-white hover:shadow-lg"
          >
            <Pencil className="w-4 h-4 transition-transform group-hover/edit:rotate-12" />
          </button>

          <button
            onClick={() => handleDelete(adds._id)}
            className="group/delete flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg"
          >
            <Trash2 className="w-4 h-4 transition-transform group-hover/delete:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
