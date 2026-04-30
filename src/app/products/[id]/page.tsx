"use client";

import { use, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";
import { FiStar, FiShoppingCart, FiArrowLeft, FiPackage, FiTruck, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to view product details");
      router.push(`/login?redirect=/products/${id}`);
    }
  }, [session, isPending, router, id]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-6xl">😕</p>
        <h2 className="text-3xl font-bold">Product Not Found</h2>
        <Link href="/products" className="btn btn-primary rounded-full">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-orange-50/30">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="btn btn-ghost btn-sm rounded-full gap-2">
            <FiArrowLeft /> Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute top-6 left-6">
              <span className="badge badge-lg bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 font-semibold">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-orange-500 font-semibold uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <FiStar className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-yellow-700">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">✓ In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-500 font-medium">✗ Out of Stock</span>
                  )}
                </span>
              </div>
            </div>

            <div className="divider"></div>

            <div>
              <span className="text-5xl font-extrabold text-orange-500">
                ${product.price}
              </span>
              <span className="text-lg text-gray-400 line-through ml-3">
                ${(product.price * 2).toFixed(2)}
              </span>
              <span className="badge badge-lg bg-green-100 text-green-700 border-green-200 ml-3 font-bold">
                50% OFF
              </span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toast.success(`${product.name} added to cart!`)}
                className="btn btn-lg rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 hover:from-orange-600 hover:to-rose-600 gap-2 flex-1 min-w-[200px] shadow-lg"
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button
                onClick={() => toast.success("Added to wishlist!")}
                className="btn btn-lg rounded-full btn-outline border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500"
              >
                ♥
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 bg-base-200/50 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <FiTruck className="text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders $25+</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-base-200/50 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FiShield className="text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Quality Guaranteed</p>
                  <p className="text-xs text-gray-500">30-day returns</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-base-200/50 rounded-2xl p-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiPackage className="text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Secure Package</p>
                  <p className="text-xs text-gray-500">Safe delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
