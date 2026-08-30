import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PackageIcon,
  UsersIcon,
  ShoppingBagIcon,
  AlertTriangleIcon,
} from "lucide-react";
import Loading from "../../components/Loading";
import { statusColors } from "../../assets/assets";
import api from "../../config/api";

export default function AdminDashboard() {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch((error) => {
        console.log("Admin stats error:", error.response?.status);
        console.log("Admin stats response:", error.response?.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        {
          label: "Total Orders",
          value: stats.totalOrders,
          icon: ShoppingBagIcon,
        },
        { label: "Total Users", value: stats.totalUsers, icon: UsersIcon },
        {
          label: "Total Products",
          value: stats.totalProducts,
          icon: PackageIcon,
        },
        {
          label: "Out of Stock",
          value: stats.outOfStock,
          icon: AlertTriangleIcon,
        },
      ]
    : [];

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>

          <p className="text-app-text-light mt-1">
            Here's what's happening with your store today.
          </p>
        </div>
      </div>

      {/* ===================== Stats ===================== */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-zinc-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            {/* Background Gradient */}
            <div className="absolute right-0 top-0 h-36 w-36 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br from-green-100 via-orange-50 to-transparent opacity-70" />

            <div className="relative flex justify-between">
              <div>
                <p className="text-sm text-zinc-500 font-medium">
                  {card.label}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-zinc-900">
                  {card.value}
                </h2>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Live
                </div>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-app-green to-green-900 text-white shadow-lg group-hover:scale-110 transition-transform">
                <card.icon className="size-7" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Recent Orders ================= */}

      <div className="rounded-3xl bg-white border border-zinc-100 shadow-sm overflow-hidden">
        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Recent Orders
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Latest customer purchases.
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="rounded-xl bg-app-green px-4 py-2 text-sm font-medium text-white hover:bg-green-900 transition"
          >
            View All
          </Link>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-8 py-4">Order</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Items</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {stats?.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-zinc-500">
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                stats?.recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-zinc-100 hover:bg-zinc-50 transition"
                  >
                    <td className="px-8 py-5">
                      <div className="font-semibold text-zinc-900">
                        #{order._id.slice(-6).toUpperCase()}
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-app-green">
                          {(order.user?.name || "U")[0]}
                        </div>

                        <div>
                          <p className="font-semibold text-zinc-900">
                            {order.user?.name || "Unknown"}
                          </p>

                          <p className="text-xs text-zinc-500">
                            {order.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5 font-medium text-zinc-700">
                      {order.items?.length} Items
                    </td>

                    <td className="px-8 py-5 font-semibold text-app-green">
                      {currency}
                      {order.total?.toFixed(2)}
                    </td>

                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                          statusColors[order.status] ||
                          "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                        {order.status}
                      </span>
                    </td>

                    <td className="px-8 py-5 text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
