import { TruckIcon, XIcon } from "lucide-react";
import React, { useState } from "react";

const Banner = () => {
  const [bannerVisible, setBannerVisible] = useState(() => {
    return sessionStorage.getItem("banner_dismissed") !== "true";
  });

  const dismissBanner = () => {
    setBannerVisible(false);
    sessionStorage.setItem("banner_dismissed", "true");
  };
  return (
    <div>
      {bannerVisible && (
        <div className="relative bg-linear-to-r from-[#ABFF7E] via-emerald-500 to-[#ABFF7E] text-white text-xs sm:text-sm overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex-center gap-6">
            <div className="flex-center gap-2">
              <TruckIcon className="size-4 shrink-0" />
              <span className="font-medium">
                Free Delivery on orders above ₹249
              </span>
            </div>
          </div>
          <button
            onClick={dismissBanner}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-90"
          >
            <XIcon className="size-3.5 text-black" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Banner;
