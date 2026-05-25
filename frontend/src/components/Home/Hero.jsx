import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const slides = [
    {
      id: 1,
      image: assets.heroslide,
    },
    {
      id: 2,
      title: "Big Savings On Daily Essentials",
      description:
        "Enjoy exciting offers and discounts on groceries, snacks, and beverages.",
      image: assets.heroslide1,
      button: "Explore Deals",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden mb-10 rounded-3xl h-[420px] md:h-[450px]">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {index === 1 && currentSlide === index ? (
              <div className="absolute inset-0 flex items-center px-8 md:px-16">
                <div className="max-w-2xl text-white">
                  <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm mb-5">
                    FreshKart Exclusive
                  </span>

                  <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
                    {slide.title}
                  </h1>

                  <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-8 max-w-xl">
                    {slide.description}
                  </p>

                  <button
                    onClick={() => navigate("/deals")}
                    className="bg-white text-black hover:bg-gray-100 transition-all duration-300 px-7 py-3 rounded-2xl font-semibold shadow-2xl"
                  >
                    {slide.button}
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
