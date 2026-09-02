import { useEffect, useState } from "react";
import { MailIcon, LockIcon, ArrowRightIcon } from "lucide-react";
import { assets, heroSectionData } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/api";
import toast from "react-hot-toast";

export default function DeliveryLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await api.post("/delivery/login", { email, password });
      localStorage.setItem("delivery_token", data.token);
      localStorage.setItem("delivery_partner", JSON.stringify(data.partner));
      toast.success("Login successful");
      navigate("/delivery");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("delivery_token")) {
      navigate("/delivery");
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f7f9f4] via-white to-[#eef7ec] flex">
      {/* Background */}

      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-green-300/30 blur-[120px]" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-300/30 blur-[120px]" />

      {/* Left */}

      <div className="relative hidden lg:flex w-1/2 overflow-hidden">
        <img
          src={assets.loginphoto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 via-green-900/75 to-black/70" />

        <div className="relative z-10 flex flex-col justify-center px-20">
          <Link to="/" className="mb-16 flex items-center gap-4">
            <img src={assets.logo} className="h-14" />

            <span className="text-3xl font-bold text-white">FreshKart</span>
          </Link>

          <span className="mb-5 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
            🚚 Delivery Partner
          </span>

          <h1 className="max-w-lg text-6xl font-bold leading-tight text-white">
            Deliver Happiness.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-white/80">
            Track deliveries, manage assigned orders, and deliver groceries
            faster with FreshKart.
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-10 shadow-[0_30px_80px_rgba(0,0,0,.08)] backdrop-blur-xl">
            <div className="mb-10 text-center">
              <img src={assets.logo} className="mx-auto h-16" />

              <h2 className="mt-6 text-3xl font-bold text-zinc-900">
                Welcome Back
              </h2>

              <p className="mt-2 text-zinc-500">
                Login to continue your delivery journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>

                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@example.com"
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-4 outline-none transition focus:border-app-green focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-4 outline-none transition focus:border-app-green focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-app-green text-lg font-semibold text-white transition hover:bg-green-950"
              >
                {loading ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In
                    <ArrowRightIcon className="size-5 transition group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
