import React from "react";
import { categoriesData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const HomeCategories = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-orange-500" />
              <span className="text-sm font-medium text-orange-600">
                Explore
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-zinc-900">
              Shop by Category
            </h2>

            <p className="text-zinc-500 mt-2 max-w-lg">
              Discover fresh groceries, daily essentials and household items
              from our curated collection.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
          {categoriesData.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group min-w-[180px]"
            >
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 opacity-70" />

                {/* Image */}
                <div className="relative z-10 flex justify-center">
                  <div className="size-24 rounded-2xl bg-white shadow-sm p-3 flex items-center justify-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 mt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-zinc-900">{cat.name}</h3>

                    <ArrowUpRight
                      size={18}
                      className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
