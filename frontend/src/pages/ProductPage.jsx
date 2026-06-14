import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { dummyProducts } from "../assets/assets";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Home,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import DummyReviewsSection from "../assets/DummyReviewsSection";

const ProductPage = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCartContext();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0);
    const product = dummyProducts.find((p) => p._id === id);
    setProduct(product);
    setRelatedProducts(dummyProducts.filter((p) => p._id !== id));
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!product) return null;

  const cartItem = items.find((item) => item.product._id === product._id);
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem.quantity : localQuantity;

  const categoryLabel = product.category.replace(/-/g, " ");

  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1)
        updateQuantity(product._id, cartItem.quantity - 1);
      else removeFromCart(product._id);
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1));
    }
  };

  const handlePlus = () => {
    if (inCart) {
      updateQuantity(product._id, cartItem.quantity + 1);
    } else {
      setLocalQuantity(localQuantity + 1);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-app-cream/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-8 bg-white border border-app-border rounded-2xl px-4 py-3 shadow-xs">
          <Link to="/" className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>

          <span>/</span>

          <Link
            to="/products"
            className="hover:text-app-green transition-colors"
          >
            Products
          </Link>

          <span>/</span>

          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-app-green transition-colors capitalize"
          >
            {categoryLabel}
          </Link>

          <span>/</span>

          <span className="text-app-green font-semibold truncate max-w-[220px]">
            {product.name}
          </span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-app-border bg-white text-sm font-medium text-app-text-light hover:text-app-green hover:border-app-green hover:shadow-sm transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-[32px] border border-app-border/50 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative flex-center p-8 md:p-12 lg:p-16 min-h-[420px] bg-gradient-to-br from-app-cream/50 via-white to-app-cream/20">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[420px] md:max-h-[500px] w-auto object-contain transition duration-500 hover:scale-105"
              />

              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                {product.isOrganic && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-app-success text-white rounded-full shadow-md">
                    <LeafIcon className="w-3 h-3" />
                    Organic
                  </span>
                )}

                {product.discount > 0 && (
                  <span className="px-3 py-1.5 text-xs font-semibold bg-app-orange text-white rounded-full shadow-md">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="w-fit px-3 py-1 rounded-full bg-app-green/10 text-app-green text-xs font-semibold tracking-wide mb-4 capitalize">
                {categoryLabel}
              </span>

              <h1 className="text-3xl md:text-5xl font-bold text-app-green leading-tight mb-4">
                {product.name}
              </h1>

              {product.rating > 0 && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 bg-app-warning/10 px-3 py-2 rounded-xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(product.rating)
                            ? "text-app-warning fill-app-warning"
                            : "text-app-border"
                        }`}
                      />
                    ))}

                    <span className="ml-1 font-semibold text-sm">
                      {product.rating}
                    </span>
                  </div>

                  <span className="text-sm text-app-text-light">
                    {product.reviewCount}+ customer reviews
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl md:text-5xl font-bold text-app-green">
                  {currency}
                  {product.price.toFixed(2)}
                </span>

                {product.originalPrice > product.price && (
                  <span className="text-xl text-app-text-light line-through">
                    {currency}
                    {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Product Highlights Chips */}

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 bg-app-green/10 text-app-green text-xs font-semibold rounded-full">
                  Fresh & Quality Assured
                </span>

                {product.isOrganic && (
                  <span className="px-3 py-1.5 bg-app-success/10 text-app-success text-xs font-semibold rounded-full">
                    100% Organic
                  </span>
                )}

                <span className="px-3 py-1.5 bg-app-orange/10 text-app-orange text-xs font-semibold rounded-full">
                  Same Day Delivery
                </span>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-app-text-light leading-8 mb-8">
                {product.description}
              </p>

              {/* Delivery Information Card */}
              <div className="mb-8 bg-app-cream/40 border border-app-border rounded-2xl p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-app-text-light">
                      Estimated Delivery
                    </span>

                    <span className="text-sm font-semibold text-app-green">
                      20 - 30 mins
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-app-text-light">
                      Delivery Charge
                    </span>

                    <span
                      className={`text-sm font-semibold ${product.price > 249 ? "text-app-success" : "text-app-text"}`}
                    >
                      {product.price > 249 ? "Free Delivery" : `${currency}29`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-app-text-light">
                      Return Policy
                    </span>

                    <span className="text-sm font-semibold">
                      Easy Replacement
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div className="mb-8">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-app-success/10 text-app-success text-sm font-semibold">
                    ✓ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-app-error/10 text-app-error text-sm font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity + Cart */}
              <div className="sticky bottom-4 md:static bg-white/95 backdrop-blur-md md:bg-transparent p-3 md:p-0 rounded-2xl border md:border-0 border-app-border shadow-md md:shadow-none flex items-center gap-3 mb-8">
                <div className="flex items-center border border-app-border rounded-2xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={handleMinus}
                    className="p-4 hover:bg-app-cream transition-colors"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>

                  <span className="px-6 text-base font-bold min-w-[60px] text-center">
                    {displayQuantity}
                  </span>

                  <button
                    onClick={handlePlus}
                    className="p-4 hover:bg-app-cream transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (!inCart) addToCart(product, localQuantity);
                  }}
                  disabled={product.stock === 0}
                  className={`flex-1 py-4 rounded-2xl font-semibold text-base transition-all duration-300 flex-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]
              ${
                inCart
                  ? "bg-app-green/10 text-app-green border border-app-green"
                  : "bg-app-orange text-white hover:bg-app-orange-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              }`}
                >
                  <ShoppingCartIcon className="w-4 h-4" />

                  {inCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-white border border-app-border rounded-xl p-3 text-center">
                  <p className="text-lg">🚚</p>
                  <p className="text-xs mt-1">Fast Delivery</p>
                </div>

                <div className="bg-white border border-app-border rounded-xl p-3 text-center">
                  <p className="text-lg">🌱</p>
                  <p className="text-xs mt-1">Fresh Products</p>
                </div>

                <div className="bg-white border border-app-border rounded-xl p-3 text-center">
                  <p className="text-lg">🔒</p>
                  <p className="text-xs mt-1">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviewCount > 0 && <DummyReviewsSection product={product} />}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 mb-44">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-app-green">
                  Related Products
                </h2>

                <p className="text-base text-app-text-light mt-2">
                  More from {categoryLabel}
                </p>
              </div>

              <Link
                className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors"
                to={`/products?category=${product.category}`}
              >
                View All
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {relatedProducts.slice(0, 5).map((rp) => (
                <ProductCard key={rp._id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
