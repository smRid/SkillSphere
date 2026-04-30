"use client";

import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-orange-50/30">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            All Products
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Browse our complete collection of summer essentials
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-11 rounded-full focus:outline-none focus:border-orange-400"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <FiFilter className="text-gray-400" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm rounded-full ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0"
                    : "btn-ghost border border-base-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
