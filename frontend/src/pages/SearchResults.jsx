import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Home, SearchIcon } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import api from "../config/api";
import toast from "react-hot-toast";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    }
    setLoading(true);

    api
      .get(`/products?search=${encodeURIComponent(query)}`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [query]);
  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}

        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-8 bg-white border border-app-border rounded-2xl px-4 py-3 shadow-xs">
          <Link to="/" className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>

          <span>/</span>

          <span className="text-gray-500 font-medium">Search Results</span>
        </nav>

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-app-green mb-1">
            Results for "{query}"
          </h1>
          <p className="text-sm text-app-text-light">
            {loading ? "Searching..." : `${products.length} items found`}
          </p>
        </div>

        {/* Results */}
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center py-20 px-4">
            <div className="max-w-lg w-full bg-white rounded-3xl border border-app-border shadow-sm p-10 text-center">
              {/* Icon */}
              <div className="mx-auto w-24 h-24 rounded-full bg-app-green/10 flex items-center justify-center">
                <SearchIcon className="w-12 h-12 text-app-green" />
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-3xl font-bold text-app-green">
                No Products Found
              </h2>

              <p className="mt-3 text-zinc-500 leading-7">
                We couldn't find anything matching
              </p>

              <div className="inline-flex mt-3 px-4 py-2 rounded-full bg-app-cream border border-app-border font-semibold text-app-green">
                "{query}"
              </div>

              <p className="mt-5 text-sm text-zinc-500">
                Try checking the spelling, using a shorter keyword, or browse
                all categories to discover fresh products.
              </p>

              {/* Suggestions */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-2 rounded-full bg-green-50 text-green-700 text-sm">
                  🥬 Vegetables
                </span>

                <span className="px-3 py-2 rounded-full bg-orange-50 text-orange-700 text-sm">
                  🍎 Fruits
                </span>

                <span className="px-3 py-2 rounded-full bg-blue-50 text-blue-700 text-sm">
                  🥛 Dairy
                </span>

                <span className="px-3 py-2 rounded-full bg-purple-50 text-purple-700 text-sm">
                  🍞 Bakery
                </span>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 rounded-2xl border border-app-border hover:bg-app-cream transition"
                >
                  Go Back
                </button>

                <Link
                  to="/products"
                  className="px-6 py-3 rounded-2xl bg-app-green hover:bg-app-green-light transition text-white font-semibold shadow-lg shadow-green-200"
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
