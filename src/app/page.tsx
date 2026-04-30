"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import { FiSun, FiDroplet, FiWind, FiShield, FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    eyebrow: "Mega Summer Collection",
    title: "Summer Essentials",
    highlight: "Up to 50% OFF",
    subtitle: "Upgrade your sunny days with beach-ready fashion, UV protection, skincare, and travel-friendly accessories.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&h=1000&fit=crop",
    accent: "from-orange-500 to-rose-500",
    stat: "8+ curated products",
  },
  {
    eyebrow: "Beach Ready Deals",
    title: "Hot Deals",
    highlight: "Fresh Arrivals",
    subtitle: "Shop breezy outfits, beach gear, and cooling care essentials made for vacations, pool days, and weekend escapes.",
    image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=1800&h=1000&fit=crop",
    accent: "from-cyan-500 to-blue-600",
    stat: "Free shipping over $25",
  },
  {
    eyebrow: "Glow Through Summer",
    title: "Skincare & Style",
    highlight: "Premium Picks",
    subtitle: "Stay protected, hydrated, and stylish with handpicked products from our trusted summer brands.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1800&h=1000&fit=crop",
    accent: "from-emerald-500 to-teal-600",
    stat: "Top rated brands",
  },
];

const brands = [
  { name: "SunShade", desc: "Premium eyewear & hats", color: "from-orange-400 to-amber-500", icon: "🕶️" },
  { name: "BeachVibe", desc: "Swimwear & beach gear", color: "from-cyan-400 to-blue-500", icon: "🏄" },
  { name: "GlowGuard", desc: "Skincare & sun protection", color: "from-pink-400 to-rose-500", icon: "✨" },
  { name: "TropicStyle", desc: "Summer fashion", color: "from-emerald-400 to-teal-500", icon: "🌺" },
];

const tips = [
  { icon: <FiSun className="text-2xl" />, title: "Apply Sunscreen", desc: "Use SPF 50+ sunscreen and reapply every 2 hours when outdoors." },
  { icon: <FiDroplet className="text-2xl" />, title: "Stay Hydrated", desc: "Drink at least 8 glasses of water daily. Add fruits for flavor." },
  { icon: <FiWind className="text-2xl" />, title: "Wear Light Clothes", desc: "Choose breathable fabrics like cotton and linen to stay cool." },
  { icon: <FiShield className="text-2xl" />, title: "Protect Your Eyes", desc: "Wear UV-protection sunglasses to shield your eyes from harmful rays." },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const popularProducts = products.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[86vh] flex items-center overflow-hidden bg-gray-950">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-gray-950/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 left-20 w-80 h-80 bg-rose-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div className="text-white space-y-7 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm font-semibold border border-white/20 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-orange-300 animate-pulse"></span>
                {heroSlides[currentSlide].eyebrow}
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
                {heroSlides[currentSlide].title}
                <span className={`block bg-gradient-to-r ${heroSlides[currentSlide].accent} bg-clip-text text-transparent drop-shadow-lg`}>
                  {heroSlides[currentSlide].highlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className={`btn btn-lg rounded-full bg-gradient-to-r ${heroSlides[currentSlide].accent} text-white border-0 shadow-xl font-bold gap-2 hover:scale-105 transition-transform`}
                >
                  Shop Now <FiArrowRight />
                </Link>
                <Link
                  href="#popular"
                  className="btn btn-lg rounded-full bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-gray-900 font-bold"
                >
                  Explore Deals
                </Link>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2 pt-4">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section id="popular" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge badge-lg bg-orange-100 text-orange-600 border-orange-200 mb-4 font-medium">
              🔥 Trending Now
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Popular{" "}
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Discover our most loved summer essentials handpicked for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="btn btn-lg rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 hover:from-orange-600 hover:to-rose-600 gap-2 shadow-lg"
            >
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge badge-lg bg-green-100 text-green-600 border-green-200 mb-4 font-medium">
              💡 Expert Advice
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Summer Care{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Tips
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Stay safe and healthy this summer with these essential tips
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 card-hover"
              >
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white mb-3">
                    {tip.icon}
                  </div>
                  <h3 className="card-title text-lg">{tip.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge badge-lg bg-purple-100 text-purple-600 border-purple-200 mb-4 font-medium">
              ⭐ Featured
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Top{" "}
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Brands
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Shop from the most trusted summer brands
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 card-hover overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${brand.color}`}></div>
                <div className="card-body items-center text-center">
                  <span className="text-4xl mb-2">{brand.icon}</span>
                  <h3 className="card-title text-lg">{brand.name}</h3>
                  <p className="text-sm text-gray-500">{brand.desc}</p>
                  <Link
                    href="/products"
                    className="btn btn-sm btn-ghost rounded-full mt-2 text-orange-500 hover:text-orange-600"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Ready for Summer?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of happy customers who trust SunCart for their summer essentials. Sign up today and get exclusive deals!
          </p>
          <Link
            href="/register"
            className="btn btn-lg rounded-full bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-xl font-bold gap-2"
          >
            Get Started <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
