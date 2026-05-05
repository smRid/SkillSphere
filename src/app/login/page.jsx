"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiArrowRight,
} from "react-icons/hi2";

import { signIn } from "@/lib/auth-client";
import AuthShell from "@/components/AuthShell";
import GoogleButton from "@/components/GoogleButton";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [busy, setBusy] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const tid = toast.loading("Signing you in…");
    try {
      const { error } = await signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: redirect,
      });
      toast.dismiss(tid);
      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }
      toast.success("Welcome back! 👋");
      router.push(redirect);
      router.refresh();
    } catch (err) {
      toast.dismiss(tid);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-semibold text-base-content/80"
        >
          Email
        </label>
        <div className="relative">
          <HiEnvelope className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            className="input input-bordered w-full rounded-xl bg-base-100 pl-11"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-base-content/80"
          >
            Password
          </label>
          <Link
            href="/forgot"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <HiLockClosed className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
          <input
            id="password"
            name="password"
            type={showPwd ? "text" : "password"}
            required
            minLength={6}
            autoComplete="current-password"
            value={form.password}
            onChange={onChange}
            placeholder="••••••••"
            className="input input-bordered w-full rounded-xl bg-base-100 pl-11 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            aria-label={showPwd ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-base-content/60 hover:bg-base-200 hover:text-base-content"
          >
            {showPwd ? (
              <HiEyeSlash className="h-5 w-5" />
            ) : (
              <HiEye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={busy}
        className="btn btn-gradient mt-2 w-full rounded-full"
      >
        {busy ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <>
            Sign in
            <HiArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-base-300" />
        <span className="text-xs uppercase tracking-wider text-base-content/50">
          or
        </span>
        <span className="h-px flex-1 bg-base-300" />
      </div>

      {/* Google */}
      <GoogleButton callbackURL={redirect} />
    </form>
  );
}

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue learning."
      footer={
        <>
          New to SkillSphere?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <Suspense fallback={<div className="h-80" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
