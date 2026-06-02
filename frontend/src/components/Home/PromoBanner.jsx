import React from "react";
import { appPromoBannerData, assets } from "../../assets/assets";
import { Apple, Play, Star, Download, Clock3 } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="py-20">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900">
        {/* Background Effects */}
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-lime-300/10 blur-3xl" />

        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 md:px-10 lg:px-16 py-14">
          {/* Left Content */}
          <div className="max-w-xl">
            <h2 className="mt-5 text-4xl md:text-5xl font-bold leading-tight text-white">
              Grocery Shopping
              <span className="block text-lime-300">Made Super Fast</span>
            </h2>

            <p className="mt-5 text-white/80 text-lg leading-relaxed">
              {appPromoBannerData.description}
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md px-4 py-3">
                <div className="flex items-center gap-2 text-white">
                  <Download size={16} />
                  <span className="font-semibold">50K+</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Downloads</p>
              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur-md px-4 py-3">
                <div className="flex items-center gap-2 text-white">
                  <Star
                    size={16}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                  <span className="font-semibold">4.9/5</span>
                </div>
                <p className="text-xs text-white/70 mt-1">User Rating</p>
              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur-md px-4 py-3">
                <div className="flex items-center gap-2 text-white">
                  <Clock3 size={16} />
                  <span className="font-semibold">10 Min</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Delivery</p>
              </div>
            </div>

            {/* Store Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 transition-all hover:scale-105 hover:shadow-lg">
                <Apple size={24} />
                <div className="text-left">
                  <p className="text-[10px] text-zinc-500">Download on the</p>
                  <p className="font-semibold text-zinc-900">App Store</p>
                </div>
              </button>

              <button className="flex items-center gap-3 rounded-2xl bg-zinc-900 px-5 py-3 text-white transition-all hover:scale-105 hover:shadow-lg">
                <Play size={20} fill="currentColor" />
                <div className="text-left">
                  <p className="text-[10px] text-zinc-400">Get it on</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Floating Cards */}
            <div className="absolute -left-10 -bottom-22 rounded-2xl bg-white p-4 shadow-xl hidden md:block">
              <p className="text-xs text-zinc-500">Order Delivered</p>
              <p className="font-semibold text-emerald-600">In 10 Minutes 🚀</p>
            </div>

            <div className="absolute -right-8 -top-15 rounded-2xl bg-white p-4 shadow-xl hidden md:block">
              <p className="text-xs text-zinc-500">Customer Rating</p>
              <p className="font-semibold">⭐ 4.9/5</p>
            </div>

            <img
              src={assets.delivery_truck}
              alt="delivery_truck"
              className="w-[280px] md:w-[340px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)] hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
