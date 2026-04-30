"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiLogIn, FiSun } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed. Please check your credentials.");
        toast.error(result.error.message || "Login failed");
      } else {
        toast.success("Welcome back! 🎉");
        router.push(redirect);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: redirect,
      });
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl border border-base-200">
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center mb-4">
                <FiSun className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-extrabold">Welcome Back</h1>
              <p className="text-gray-500 mt-1">Sign in to your SunCart account</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="alert alert-error mb-4">
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full pl-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full pl-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-full rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 hover:from-orange-600 hover:to-rose-600 text-base font-bold gap-2"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <FiLogIn /> Login
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider text-sm text-gray-400">OR</div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="btn w-full rounded-xl btn-outline border-base-300 hover:bg-base-200 gap-2 font-medium"
            >
              <FaGoogle className="text-red-500" /> Continue with Google
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-orange-500 font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
