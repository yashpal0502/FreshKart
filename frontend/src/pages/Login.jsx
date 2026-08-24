import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Loader2Icon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-[#f5fff7] overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-orange-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <img
          src={assets.loginphoto}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/70 to-black/60"></div>

        <div className="relative z-10 text-center px-14 mb-10">
          {/* <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"> */}
          <h2 className="text-5xl font-bold text-white leading-tight mb-6">
            Fresh groceries <br /> delivered fast
          </h2>

          <p className="text-white/80 text-lg leading-relaxed max-w-md mx-auto">
            Organic vegetables, fresh fruits, and daily essentials delivered
            straight to your doorstep with FreshKart.
          </p>
          {/* </div> */}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-5 py-4 overflow-hidden relative z-10">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-[32px] p-5 sm:p-7 transition-all duration-300 hover:shadow-green-100 ">
            {/* Header */}
            <div className="text-center mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-3 mb-6 group"
              >
                <img
                  src={assets.logo}
                  alt="logo"
                  className="w-12 transition-transform duration-300 group-hover:scale-110"
                />

                <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  FreshKart
                </span>
              </Link>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>

              <p className="text-gray-500 text-sm">
                {isLogin
                  ? "Sign in to continue shopping fresh"
                  : "Join FreshKart and order groceries easily"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <div className="relative mt-2 group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <div className="relative mt-2 group">
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative mt-2 group">
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                  />
                </div>
              </div>

              {/* Forgot Password */}
              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Bottom Switch */}
            <div className="mt-4 text-center text-sm text-gray-500">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
