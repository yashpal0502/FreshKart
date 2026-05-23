import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
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
    name: "Yashpal",
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
  return (
    <nav>
      <div>
        {/* Logo */}
        <Link to="/" className="flex">
          <img src={assets.logo} alt="" />
          <span>FreshKart</span>
        </Link>

        <div>
          {/* Nav Links - Desktop */}

          <div>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/deals">Deals</Link>
          </div>

          {/* Search */}

          <form>
            <div>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search for groceries"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Right Actions */}

          <div>
            {/* cart */}
            <button onClick={() => setIsCartOpen(true)}>
              <ShoppingBasketIcon />
              {cartCount > 0 && <span>{cartCount}</span>}
            </button>
            {/* User */}

            <div>
              {user ? (
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <div>{user.name.charAt(0).toUpperCase()}</div>
                  <ChevronDownIcon />
                </button>
              ) : (
                <div>
                  <Link to="/login">
                    <UserIcon /> Sign In
                  </Link>

                  {userMenuOpen ? (
                    <XIcon onClick={() => setUserMenuOpen(!userMenuOpen)} />
                  ) : (
                    <MenuIcon onClick={() => setUserMenuOpen(!userMenuOpen)} />
                  )}
                </div>
              )}

              {userMenuOpen && (
                <>
                  <div onClick={() => setUserMenuOpen(false)} />

                  <div>
                    {user && (
                      <div>
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                      </div>
                    )}

                    <div onClick={() => setUserMenuOpen(false)}>
                      {!user && (
                        <Link to="/login">
                          <UserIcon /> Sign In
                        </Link>
                      )}
                      {user && (
                        <Link to="/orders">
                          <PackageIcon /> My Orders
                        </Link>
                      )}
                      {user && (
                        <Link to="/addresses">
                          <MapPinIcon /> Addresses
                        </Link>
                      )}
                      <Link to="/products">
                        <ArrowUpRightIcon /> Products
                      </Link>
                      <Link to="/deals">
                        <ArrowUpRightIcon /> Deals
                      </Link>

                      {user?.isAdmin && (
                        <Link to="/admin/products">
                          <ShieldIcon /> <span>Admin Panel</span>
                        </Link>
                      )}

                      {user && (
                        <div>
                          <button>
                            <LogOutIcon /> Log Out
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
