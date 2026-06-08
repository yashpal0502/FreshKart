import React from "react";
import { Check, Filter, RotateCcw, Tags } from "lucide-react";

const FilterPanel = ({
  categories,
  category,
  minPrice,
  maxPrice,
  updateFilter,
  organic,
  clearFilters,
  hasFilters,
}) => {
  const categoriesWithAll = [
    { slug: "", name: "All Categories" },
    ...categories,
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div className="p-2 rounded-xl bg-emerald-100">
          <Filter className="size-4 text-emerald-600" />
        </div>
        <div>
          <h2 className="font-semibold text-slate-800">Filters</h2>
          <p className="text-xs text-slate-400">Refine your results</p>
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Tags className="size-3.5 text-emerald-600" />
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Category
          </h3>
        </div>

        <div className="space-y-1">
          {categoriesWithAll.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
            ${
              category === cat.slug
                ? "bg-emerald-600 text-white"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
            >
              <span>{cat.name}</span>
              {category === cat.slug && (
                <Check className="size-3.5 text-white/80" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Organic Toggle */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Dietary
          </h3>
        </div>

        <button
          onClick={() => updateFilter("organic", !organic)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200
        ${
          organic
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-white border-slate-200 text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
        }`}
        >
          <span>Organic only</span>
          <div
            className={`w-8 h-4.5 rounded-full transition-colors duration-200 relative flex-shrink-0
        ${organic ? "bg-emerald-500" : "bg-slate-200"}`}
          >
            <span
              className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-all duration-200
          ${organic ? "left-4" : "left-0.5"}`}
            />
          </div>
        </button>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Price Range
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Min</label>
            <input
              type="number"
              placeholder="₹0"
              value={minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Max</label>
            <input
              type="number"
              placeholder="₹5000"
              value={maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasFilters && (
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100">
          <p className="text-xs font-medium text-emerald-700">Filters active</p>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      )}

      {/* Clear Filters */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50 active:scale-95 transition-all duration-200"
        >
          <RotateCcw className="size-3.5" />
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
