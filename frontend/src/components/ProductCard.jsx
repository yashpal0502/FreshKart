import { Heart, Plus, Star } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();

  const { addToCart } = { addToCart: () => {} };

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image Section */}
      <div className="relative bg-zinc-50 p-4">
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-semibold text-white">
            {product.discount}% OFF
          </span>
        )}

        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Heart size={16} className="text-zinc-500" />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="mx-auto h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {product.rating > 0 && (
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1">
            <Star
              size={12}
              className="fill-green-600 text-green-600"
            />
            <span className="text-xs font-medium text-green-700">
              {product.rating}
            </span>
            <span className="text-xs text-zinc-500">
              ({product.reviewCount})
            </span>
          </div>
        )}

        <h3 className="line-clamp-2 min-h-[48px] text-sm font-semibold text-zinc-800">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          {product.unit}
        </p>

        {/* Price + Button */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-zinc-900">
                {currency}
                {product.price.toFixed(2)}
              </span>

              {product.originalPrice > product.price && (
                <span className="text-sm text-zinc-400 line-through">
                  {currency}
                  {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center gap-1 rounded-xl bg-orange-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;