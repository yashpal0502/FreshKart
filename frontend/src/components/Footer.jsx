import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { CopyrightIcon, MailIcon, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-emerald-50 border-t border-emerald-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="md:flex justify-between gap-16 py-16 border-b border-emerald-100">
          {/* Title */}
          <div className="max-w-sm flex flex-col gap-5">
            <div className="flex items-center gap-1">
              <img src={assets.logo} alt="FreshKart" />
              <span className="text-xl font-semibold text-gray-900">
                FreshKart
              </span>
            </div>

            <p className="text-gray-500 leading-relaxed">
              Fresh groceries delivered to your doorstep in minutes. Shop from a
              wide range of products with fast delivery and unbeatable
              convenience.
            </p>

            <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              🚚 Delivery in 10 Minutes
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                className="
                group size-11 rounded-full border border-gray-200
                flex items-center justify-center bg-white
                transition-all duration-300
                hover:bg-emerald-600 hover:border-emerald-600
                hover:text-white hover:-translate-y-1 hover:shadow-lg
              "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>

              <Link
                className="
                group size-11 rounded-full border border-gray-200
                flex items-center justify-center bg-white
                transition-all duration-300
                hover:bg-emerald-600 hover:border-emerald-600
                hover:text-white hover:-translate-y-1 hover:shadow-lg
              "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>

              <Link
                className="
                group size-11 rounded-full border border-gray-200
                flex items-center justify-center bg-white
                transition-all duration-300
                hover:bg-emerald-600 hover:border-emerald-600
                hover:text-white hover:-translate-y-1 hover:shadow-lg
              "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16 mt-10 md:mt-0">
            {/* Links */}
            <div>
              <h3 className="text-sm font-bold tracking-wider text-gray-900 mb-5">
                QUICK LINKS
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link
                    to="/products"
                    className="text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/deals"
                    className="text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Flash Deals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link
                    to="/delivery"
                    className="text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Delivery Partner
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service */}
            <div>
              <h3 className="text-sm font-bold tracking-wider text-gray-900 mb-5">
                CUSTOMER SERVICE
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Addresses
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold tracking-wider text-gray-900 mb-5">
                CONTACT US
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-gray-500">
                  <MapPin className="size-5 text-emerald-600 mt-0.5" />
                  <span>987 Hauz Khas, Delhi</span>
                </div>

                <div className="flex items-start gap-3 text-gray-500">
                  <Phone className="size-5 text-emerald-600 mt-0.5" />
                  <span>+91 11111-98765</span>
                </div>

                <div className="flex items-start gap-3 text-gray-500">
                  <MailIcon className="size-5 text-emerald-600 mt-0.5" />
                  <span>freshkart@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CopyrightIcon size={16} />
            <span>2026 FreshKart. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              to="#"
              className="cursor-pointer text-gray-500 hover:text-emerald-600 transition-colors duration-300"
            >
              Privacy Policy
            </Link>

            <Link
              to="#"
              className="cursor-pointer text-gray-500 hover:text-emerald-600 transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
