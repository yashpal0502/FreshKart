import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, EditIcon, XIcon, PackageIcon } from "lucide-react";
import Loading from "../../components/Loading";
import { dummyProducts } from "../../assets/assets";

export default function AdminProducts() {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setProducts(dummyProducts);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleMarkOutOfStock = async (id, name) => {
    if (
      !window.confirm(
        `Are you sure you want to mark "${name}" as out of stock?`,
      )
    )
      return;
    console.log(id);
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="bg-white rounded-[28px] shadow-sm border border-zinc-100 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-8 py-6 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Products</h2>

            <p className="text-sm text-zinc-500 mt-1">
              Manage your inventory and product catalogue.
            </p>
          </div>

          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-app-green px-5 py-3 text-white font-semibold shadow-lg shadow-green-900/10 hover:scale-[1.03] hover:bg-green-950 transition-all"
          >
            <PlusIcon className="size-5" />
            Add Product
          </Link>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50">
              <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-8 py-4">Product</th>

                <th className="px-8 py-4">Price</th>

                <th className="px-8 py-4">Stock</th>

                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-20 w-20 rounded-full bg-zinc-100 flex items-center justify-center mb-5">
                        <PackageIcon className="size-9 text-zinc-400" />
                      </div>

                      <h3 className="font-semibold text-zinc-900">
                        No Products Found
                      </h3>

                      <p className="text-sm text-zinc-500 mt-2">
                        Start building your inventory by adding your first
                        product.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t border-zinc-100 hover:bg-zinc-50 transition-all duration-200"
                  >
                    {/* Product */}

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-16 rounded-2xl object-cover border border-zinc-100"
                        />

                        <div>
                          <h3 className="font-semibold text-zinc-900">
                            {product.name}
                          </h3>

                          <p className="text-sm text-zinc-500 capitalize mt-1">
                            {product.category || "Uncategorized"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}

                    <td className="px-8 py-5">
                      <div>
                        <p className="font-bold text-lg text-app-green">
                          {currency}
                          {product.price.toFixed(2)}
                        </p>
                      </div>
                    </td>

                    {/* Stock */}

                    <td className="px-8 py-5">
                      {product.stock > 0 ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          {product.stock} Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                          <span className="h-2 w-2 rounded-full bg-red-500" />
                          Out of Stock
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-3">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="group h-11 w-11 rounded-xl border border-zinc-200 flex items-center justify-center hover:border-orange-200 hover:bg-orange-50 transition"
                        >
                          <EditIcon className="size-4 text-zinc-500 group-hover:text-orange-600" />
                        </Link>

                        <button
                          onClick={() =>
                            handleMarkOutOfStock(product._id, product.name)
                          }
                          className="group h-11 w-11 rounded-xl border border-zinc-200 flex items-center justify-center hover:border-red-200 hover:bg-red-50 transition"
                        >
                          <XIcon className="size-4 text-zinc-500 group-hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
