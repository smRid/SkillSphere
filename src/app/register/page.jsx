"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  HiUser,
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiArrowRight,
  HiPhoto,
} from "react-icons/hi2";

import { signUp, updateUser, useSession } from "@/lib/auth-client";
import AuthShell from "@/components/AuthShell";
import GoogleButton from "@/components/GoogleButton";
import Loader from "@/components/Loader";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [isPending, session, router]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [busy, setBusy] = useState(false);

  if (isPending) return <Loader label="Checking session…" />;
  if (session) return null;

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setBusy(true);
    const tid = toast.loading("Creating your account...");
    try {
      const { error } = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
      });
      if (error) {
        toast.dismiss(tid);
        toast.error(error.message || "Could not create account");
        return;
      }
      if (form.photo.trim()) {
        const { error: updateErr } = await updateUser({ image: form.photo.trim() });
        if (updateErr) {
          toast.dismiss(tid);
          toast.error(updateErr.message || "Could not save photo");
          return;
        }
      }
      toast.dismiss(tid);
      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (err) {
      toast.dismiss(tid);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Create your learner profile and start building practical skills today."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <Field
          id="name"
          name="name"
          label="Full name"
          icon={HiUser}
          autoComplete="name"
          placeholder="Your Full Name"
          value={form.name}
          onChange={onChange}
          required
        />

        {/* Email */}
        <Field
          id="email"
          name="email"
          type="email"
          label="Email"
          icon={HiEnvelope}
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          required
        />

        {/* Photo URL */}
        <Field
          id="photo"
          name="photo"
          type="url"
          label="Profile photo URL"
          icon={HiPhoto}
          autoComplete="off"
          placeholder="https://example.com/photo.jpg"
          value={form.photo}
          onChange={onChange}
        />

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-semibold text-base-content/80"
          >
            Password
            <span className="ml-1 text-xs font-normal text-base-content/50">
              (min 6 characters)
            </span>
          </label>
          <div className="relative">
            <HiLockClosed className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
            <input
              id="password"
              name="password"
              type={showPwd ? "text" : "password"}
              required
              minLength={6}
              autoComplete="new-password"
              value={form.password}
              onChange={onChange}
              placeholder="Create a password"
              className="input input-bordered w-full rounded-lg bg-base-100 pl-11 pr-11"
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
          className="btn btn-gradient mt-2 min-h-12 w-full rounded-full"
        >
          {busy ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              Create account
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
        <GoogleButton callbackURL="/" label="Sign up with Google" />

        {/* Tiny legal */}
        <p className="pt-1 text-center text-xs text-base-content/55">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-primary">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  );
}

/* ---------- Reusable field ---------- */

function Field({
  id,
  name,
  type = "text",
  label,
  hint,
  icon: Icon,
  ...rest
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-base-content/80"
        >
          {label}
        </label>
        {hint && (
          <span className="text-xs text-base-content/50">{hint}</span>
        )}
      </div>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
        )}
        <input
          id={id}
          name={name}
          type={type}
          className={`input input-bordered w-full rounded-lg bg-base-100 ${
            Icon ? "pl-11" : "pl-4"
          }`}
          {...rest}
        />
      </div>
    </div>
  );
}
