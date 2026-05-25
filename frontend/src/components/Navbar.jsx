import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  HeartIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingBasketIcon,
  UserIcon,
  XIcon,
} from "lucide-react";

const Navbar = () => {
  const user = {
    name: "yashpal",
    email: "yash@example.com",
    isAdmin: true,
  };
  const { cartCount, setIsCartOpen } = {
    cartCount: 5,
    setIsCartOpen: () => {},
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-app-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <img src={assets.logo} alt="logo" />
          <span className="text-xl font-semibold">FreshKart</span>
        </Link>

        <div className="flex items-center justify-end gap-4 w-full lg:gap-10">
          {/* Nav Links - Desktop */}

          <div className="hidden sm:flex items-center gap-6 text-sm text-zinc-600">
            <Link to="/" className="transition hover:text-green-600">
              Home
            </Link>
            <Link to="/products" className="transition hover:text-green-600">
              Products
            </Link>
            <Link
              to="/deals"
              className="text-app-orange transition hover:text-green-600"
            >
              Deals
            </Link>
          </div>

          {/* Search */}

          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm"
          >
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                className="w-full pl-8 p-2 bg-orange-50 rounded-full ring ring-app-orange/20 transition focus-within:ring-3 focus-within:ring-app-orange/50"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Right Actions */}

          <div className="flex items-center gap-3">
            {/* WishList */}
            <button className="group relative rounded-2xl bg-zinc-100 p-3 transition-all duration-300 hover:bg-red-50">
              <HeartIcon className="size-5 text-zinc-600 transition-all duration-300 group-hover:scale-110 group-hover:fill-red-500 group-hover:text-red-500" />
            </button>
            {/* Cart */}
            <button
              className="group relative rounded-2xl bg-zinc-100 p-3 transition-all duration-300 hover:bg-orange-50"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBasketIcon className="size-5 text-zinc-700 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-bold text-white shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
            {/* User */}

            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 border rounded-full px-3 py-2 border-app-orange/50 bg-zinc-100 hover:bg-emerald-50 transition-all duration-300"
                >
                  <div className="size-6 rounded-full bg-green-600 text-white flex-center font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDownIcon
                    className={`size-3 text-zinc-500 ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <div className="flex-center gap-2">
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-950-light transition-colors"
                  >
                    <UserIcon size={16} /> Sign In
                  </Link>

                  {userMenuOpen ? (
                    <XIcon
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="md:hidden"
                    />
                  ) : (
                    <MenuIcon
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="md:hidden"
                    />
                  )}
                </div>
              )}

              {/* Dropdown */}
              {userMenuOpen && (
                <>
                  <div
                    onClick={() => setUserMenuOpen(false)}
                    className="fixed inset-0 z-40"
                  />

                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                    {user && (
                      <div className="px-4 py-2 border-b border-app-border">
                        <p className="text-sm font-medium text-zinc-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-zinc-500">{user?.email}</p>
                      </div>
                    )}

                    <div onClick={() => setUserMenuOpen(false)}>
                      {!user && (
                        <Link to="/login" className="dropdown-link">
                          <UserIcon size={16} /> Sign In
                        </Link>
                      )}
                      {user && (
                        <Link to="/orders" className="dropdown-link">
                          <PackageIcon size={16} /> My Orders
                        </Link>
                      )}
                      {user && (
                        <Link to="/addresses" className="dropdown-link">
                          <MapPinIcon size={16} /> Addresses
                        </Link>
                      )}
                      <Link to="/products" className="dropdown-link md:hidden">
                        <ArrowUpRightIcon size={16} /> Products
                      </Link>
                      <Link to="/deals" className="dropdown-link md:hidden">
                        <ArrowUpRightIcon size={16} /> Deals
                      </Link>

                      {user?.isAdmin && (
                        <Link to="/admin/products" className="dropdown-link">
                          <ShieldIcon
                            size={16}
                            className="text-app-orange-dark"
                          />{" "}
                          <span className="text-app-orange-dark">
                            Admin Panel
                          </span>
                        </Link>
                      )}

                      {user && (
                        <div className="border-t border-app-border pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-color"
                          >
                            <LogOutIcon size={16} /> Log Out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
