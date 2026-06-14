import React, { useEffect, useState } from "react";
import { dummyProducts } from "../assets/assets";
import { ZapIcon } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

const FlashDeals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(dummyProducts.filter((p) => p.stock > 0));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-app-orange via-app-orange to-app-orange-dark">
        {/* Background Blur Effects */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-5 py-2 border border-white/20">
              <ZapIcon className="size-5 fill-yellow-300 text-yellow-300" />
              <span className="font-medium">Limited Time Offers</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Flash Deals
            </h1>

            <p className="mt-4 max-w-2xl text-white/85 text-lg">
              Save big on fresh groceries and organic essentials. Grab your
              favorite products before the deals disappear.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section Header */}
        {!loading && products.length > 0 && (
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Hot Deals For You
              </h2>
              <p className="text-gray-500">
                {products.filter((p) => p.stock > 0).length} products on sale
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-full bg-orange-100 text-app-orange px-4 py-2 font-medium">
              <ZapIcon className="size-4 fill-current" />
              Up to 50% OFF
            </div>
          </div>
        )}

        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-orange-100">
              <ZapIcon className="size-10 text-app-orange" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No Deals Available
            </h2>

            <p className="mt-2 text-gray-500 max-w-md text-center">
              We're preparing fresh discounts for you. Check back later and
              don't miss upcoming flash sales.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(
              (product) =>
                product.stock > 0 && (
                  <div
                    key={product._id}
                    className="group transition-all duration-300 hover:-translate-y-1"
                  >
                    <ProductCard product={product} />
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
