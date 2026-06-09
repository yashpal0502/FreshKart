import React from "react";
import { Loader2Icon } from "lucide-react";

const Loading = ({ fullScreen = true, size = "lg", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 60,
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50"
    : "relative";

  return (
    <div
      className={`${containerClasses} flex flex-col items-center justify-center`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <Loader2Icon
          size={iconSizes[size]}
          className="text-emerald-600 animate-spin"
        />

        {/* Loading Text */}
        {text && (
          <div className="text-center">
            <p className="text-gray-700 font-medium text-lg">{text}</p>
            <p className="text-gray-500 text-sm mt-1">Please wait...</p>
          </div>
        )}

        {/* Animated Dots */}
        <div className="flex gap-1 mt-2">
          <div
            className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
