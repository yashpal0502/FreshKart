import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { dummyDashboardOrdersData, statusColors } from "../assets/assets";
import Loading from "../components/Loading";
import { CalendarIcon, ChevronRightIcon, PackageCheck } from "lucide-react";

const MyOrders = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = ["all", "Placed", "Out for Delivery", "Delivered"];

  const { clearCart } = useCartContext();

  const fetchOrders = async () => {
    setOrders(dummyDashboardOrdersData);
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("clearCart")) {
      clearCart();
      setSearchParams({});
      setTimeout(() => {
        fetchOrders();
      }, 2000);
    } else {
      fetchOrders();
    }
  }, [activeTab]);
  return (
    <div className="min-h-screen bg-app-cream mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-app-text">My Orders</h1>
          <p className="text-app-text-light mt-1">
            Track and manage all your purchases
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
          ${
            activeTab === tab
              ? "bg-app-green text-white shadow-lg shadow-green-200"
              : "bg-white border border-gray-200 text-app-text-light hover:border-app-green hover:text-app-green"
          }`}
            >
              {tab === "all" ? "All Orders" : tab}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-app-green/10 flex items-center justify-center mb-5">
              <PackageCheck className="w-10 h-10 text-app-green" />
            </div>

            <h2 className="text-xl font-semibold text-app-text">
              No orders yet
            </h2>

            <p className="text-app-text-light mt-2 mb-6">
              Looks like you haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center bg-app-green text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="group block bg-white mx-4 sm:mx-6 lg:mx-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Top Section */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-500"
                              : order.status === "Cancelled"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                        />

                        <span className="font-semibold text-app-text">
                          {order.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-app-text-light">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                          Placed on
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>

                    <ChevronRightIcon className="w-5 h-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Product Preview */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex space-x-3">
                      {order.items.slice(0, 4).map((item, i) => (
                        <img
                          key={i}
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
                        />
                      ))}

                      {order.items.length > 4 && (
                        <div className="w-14 h-14 rounded-xl bg-gray-100 border-2 border-white flex items-center justify-center text-sm font-semibold text-gray-600">
                          +{order.items.length - 4}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-app-text">
                        {currency}
                        {order.total.toFixed(0)}
                      </p>

                      <p className="text-sm text-app-text-light">
                        {order.items.length} item
                        {order.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-app-text-light">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </span>

                    <span className="text-sm font-medium text-app-green">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
