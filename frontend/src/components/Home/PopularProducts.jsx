import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../ProductCard";
import api from "../../config/api";
import toast from "react-hot-toast";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products?sort=rating")
      .then(({ data }) => {
        setProducts(data.products);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error?.message);
      });
  }, []);
  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-orange-500" />
              <span className="text-sm font-medium text-orange-600">
                Best Sellers
              </span>
            </div>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-zinc-900">
              Popular Products
            </h2>

            <p className="mt-2 text-zinc-500 max-w-lg">
              Discover customer favorites and top-rated essentials.
            </p>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-1 bg-emerald-100 text-emerald-600 text-md px-3 py-1 rounded-full font-medium"
          >
            <span>View all</span> <ArrowRight size={18} />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
