import { ArrowRight, MailIcon, Newspaper, ShieldCheck } from "lucide-react";
import React from "react";

const Newsletter = () => {
  return (
    <section>
      <div class="flex md:flex-row flex-col border border-green-500/30 rounded-lg items-start md:items-center justify-between gap-5 text-sm max-w-7xl bg-white p-8">
        {/* left */}
        <div class="max-w-md w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 font-medium mb-6">
            <MailIcon size={16} />
            Newsletter
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Stay ahead with our latest insights
          </h2>
          <p class="text-gray-500 mt-2">
            Get curated articles, development tips, product updates, and
            exclusive resources delivered directly to your inbox.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-14 w-full px-5 rounded-xl border border-green-200 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500"
            />

            <button className="group h-14 px-8 rounded-xl bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
              Subscribe
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Right */}
        <div class="space-y-4 md:max-w-48 max-md:py-5">
          <div class="flex items-center gap-3">
            <div class="bg-gray-500/10 w-max p-2.5 rounded">
              <Newspaper className="text-indigo-600" />
            </div>
            <h3 class="text-base font-medium text-gray-800">Weekly articles</h3>
          </div>
          <p class="text-gray-500">
            Practical tutorials, trends, and industry insights every week.
          </p>
        </div>
        <div class="space-y-4 md:max-w-48 max-md:py-5">
          <div class="flex items-center gap-3">
            <div class="bg-gray-500/10 w-max p-2.5 rounded">
              <ShieldCheck className="text-purple-600" />
            </div>
            <h3 class="text-base font-medium text-gray-800">No spam</h3>
          </div>
          <p class="text-gray-500">
            Only valuable content. No clutter, no unwanted promotions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
