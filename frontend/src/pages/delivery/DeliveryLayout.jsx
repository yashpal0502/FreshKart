import { Outlet, useNavigate } from "react-router-dom";
import { LogOutIcon, TruckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { assets, dummyDeliveryPartnerData } from "../../assets/assets";

export default function DeliveryLayout() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    setPartner(dummyDeliveryPartnerData[0]);
  }, [navigate]);

  const handleLogout = () => {
    navigate("/delivery/login");
  };

  if (!partner) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAF6] via-white to-[#EEF6ED]">
      {/* Background Blobs */}

      <div className="fixed -top-44 -left-44 h-96 w-96 rounded-full bg-green-300/20 blur-[120px]" />

      <div className="fixed -bottom-44 -right-44 h-96 w-96 rounded-full bg-orange-300/20 blur-[120px]" />

      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
              <img src={assets.logo} alt="" className="h-11" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-app-green">FreshKart</h1>

              <p className="text-sm text-zinc-500">Delivery Partner</p>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-5">
            {/* Online */}

            <div className="hidden rounded-full bg-green-50 px-4 py-2 md:flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />

              <span className="text-sm font-medium text-green-700">Online</span>
            </div>

            {/* Profile */}

            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-app-green to-green-900 text-lg font-bold text-white shadow">
                {partner.name?.charAt(0)}
              </div>

              <div className="hidden sm:block">
                <p className="font-semibold text-zinc-900">{partner.name}</p>

                <p className="text-xs text-zinc-500">Delivery Rider</p>
              </div>
            </div>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              <LogOutIcon className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}

      <main className="mx-auto max-w-7xl">
        <div className="rounded-[32px] border border-white bg-white/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)] backdrop-blur-xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
