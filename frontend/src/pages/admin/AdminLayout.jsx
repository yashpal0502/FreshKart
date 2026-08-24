import { Navigate, NavLink, Outlet } from "react-router-dom";
import {
  PlusIcon,
  PackageSearchIcon,
  ShoppingBagIcon,
  LogOutIcon,
  BarChart3Icon,
  ShieldIcon,
  Truck,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { user } = useAuth();

  const AdminLinkData = [
    { to: "/admin", label: "Dashboard", icon: BarChart3Icon },
    { to: "/admin/products/new", label: "Add Product", icon: PlusIcon },
    { to: "/admin/products", label: "Products", icon: PackageSearchIcon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
    { to: "/admin/delivery-partners", label: "Delivery Partners", icon: Truck },
    { to: "/", label: "Exit", icon: LogOutIcon },
  ];

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7F2] via-[#FCFBF8] to-[#F2F6EF]">
      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-8 overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white">
              {/* Top Section */}
              <div className="relative p-7">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-orange-50 opacity-70" />

                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-app-green flex items-center justify-center shadow-lg">
                      <ShieldIcon className="size-7 text-white" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-app-text-light">
                        Welcome Back
                      </p>

                      <h2 className="text-xl font-bold text-app-green">
                        Admin Panel
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-zinc-100" />

              {/* Navigation */}

              <nav className="p-4 space-y-2">
                {AdminLinkData.map((link) => (
                  <NavLink
                    key={link.to}
                    end
                    to={link.to}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                        isActive
                          ? "bg-app-green text-white shadow-lg shadow-green-900/15"
                          : "text-zinc-600 hover:bg-green-50 hover:text-app-green"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active Indicator */}
                        {isActive && (
                          <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-white" />
                        )}

                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                            isActive
                              ? "bg-white/20"
                              : "bg-zinc-100 group-hover:bg-white"
                          }`}
                        >
                          <link.icon className="size-5" />
                        </div>

                        <span className="font-medium tracking-wide">
                          {link.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}

          <main className="flex-1 min-w-0">
            <div className="h-full rounded-[30px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-white overflow-hidden">
              <div className="h-full overflow-y-auto no-scrollbar p-7">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
