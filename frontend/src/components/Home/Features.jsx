import React from "react";
import { heroSectionData } from "../../assets/assets";

const Features = () => {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {heroSectionData.hero_features.map((feature, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-3xl border border-app-border/70 bg-gradient-to-br from-white to-app-cream/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* Glow effect */}
            <div className="absolute -top-10 -right-10 size-28 rounded-full bg-app-green/10 blur-3xl group-hover:bg-app-green/20 transition-all duration-300" />

            {/* Top row */}

            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center size-10 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-app-green/20">
                <feature.icon className="size-4" />
              </div>

              {/* Content */}
              <div className="relative py-3">
                <h3 className="text-lg font-bold text-app-green leading-snug">
                  {feature.title}
                </h3>

                <p className="text-xs leading-relaxed text-app-text-light">
                  {feature.desc}
                </p>
              </div>
            </div>

            {/* Bottom line */}
            <div className="relative mt-5 h-[3px] w-12 rounded-full bg-app-green/70 transition-all duration-300 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
