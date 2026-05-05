"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  HiUser,
  HiPhoto,
  HiArrowLeft,
  HiCheck,
  HiArrowPath,
  HiSparkles,
} from "react-icons/hi2";

import { useSession, updateUser } from "@/lib/auth-client";
import Loader from "@/components/Loader";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();

  const [form, setForm] = useState({ name: "", image: "" });
  const [busy, setBusy] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?redirect=/my-profile/update");
    }
  }, [isPending, session, router]);

  // Pre-fill form once we have the session
  useEffect(() => {
    if (session?.user && !hydrated) {
      setForm({
        name: session.user.name || "",
        image: session.user.image || "",
      });
      setHydrated(true);
    }
  }, [session, hydrated]);

  if (isPending || !session) {
    return <Loader label="Loading your profile…" />;
  }

  const user = session.user;
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const dirty =
    form.name.trim() !== (user.name || "") ||
    form.image.trim() !== (user.image || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy || !dirty) return;
    if (!form.name.trim()) {
      toast.error("Name can't be empty");
      return;
    }
    setBusy(true);
    const tid = toast.loading("Updating your profile…");
    try {
      const { error } = await updateUser({
        name: form.name.trim(),
        image: form.image.trim() || undefined,
      });
      toast.dismiss(tid);
      if (error) {
        toast.error(error.message || "Could not update profile");
        return;
      }
      toast.success("Profile updated 🎉");
      if (refetch) await refetch();
      router.push("/my-profile");
    } catch (err) {
      toast.dismiss(tid);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const reset = () =>
    setForm({ name: user.name || "", image: user.image || "" });

  const previewInitial = (form.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Link
        href="/my-profile"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-base-content/70 transition-colors hover:text-primary"
      >
        <HiArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-4"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-primary/20">
          <HiSparkles className="h-3.5 w-3.5" />
          Edit Profile
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl">
          Update your <span className="gradient-text">details</span>
        </h1>
        <p className="mt-2 text-base-content/70">
          Change how you appear across SkillSphere. Updates apply instantly.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 rounded-3xl border border-base-300/60 bg-base-100/80 p-6 shadow-sm backdrop-blur-sm md:p-8"
      >
        {/* Live preview */}
        <div className="flex items-center gap-5 rounded-2xl border border-base-300/60 bg-base-200/40 p-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 via-fuchsia-500 to-cyan-400 opacity-50 blur-md" />
            <div className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 via-fuchsia-500 to-cyan-400 ring-4 ring-base-100">
              {form.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.image}
                  alt="Avatar preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="font-display text-3xl font-black text-white">
                  {previewInitial}
                </span>
              )}
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-base-content/55">
              Live preview
            </p>
            <p className="mt-1 truncate font-display text-lg font-bold">
              {form.name || "Your name"}
            </p>
            <p className="truncate text-sm text-base-content/65">
              {user.email}
            </p>
          </div>
        </div>

        {/* Name */}
        <div className="mt-6">
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-base-content/80"
          >
            Full name
          </label>
          <div className="relative">
            <HiUser className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={onChange}
              placeholder="Ada Lovelace"
              className="input input-bordered w-full rounded-xl bg-base-100 pl-11"
            />
          </div>
        </div>

        {/* Photo URL */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-base-content/80"
            >
              Photo URL
            </label>
            <span className="text-xs text-base-content/50">Optional</span>
          </div>
          <div className="relative">
            <HiPhoto className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
            <input
              id="image"
              name="image"
              type="url"
              value={form.image}
              onChange={onChange}
              placeholder="https://…"
              className="input input-bordered w-full rounded-xl bg-base-100 pl-11"
            />
          </div>
          <p className="mt-1.5 text-xs text-base-content/55">
            Paste any public image URL — the preview above updates as you type.
          </p>
        </div>

        {/* Email (read-only) */}
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-semibold text-base-content/80">
            Email
          </label>
          <input
            value={user.email}
            disabled
            readOnly
            className="input input-bordered w-full rounded-xl bg-base-200/60 text-base-content/60"
          />
          <p className="mt-1.5 text-xs text-base-content/55">
            Email changes aren&apos;t supported here yet.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-wrap items-center justify-end gap-3 border-t border-base-300/60 pt-5">
          {dirty && (
            <button
              type="button"
              onClick={reset}
              className="btn btn-sm rounded-full border border-base-300/60 bg-base-100 text-base-content/70 hover:border-primary/40 hover:text-primary"
            >
              <HiArrowPath className="h-4 w-4" />
              Reset
            </button>
          )}
          <Link
            href="/my-profile"
            className="btn btn-sm rounded-full btn-ghost"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={busy || !dirty}
            className="btn btn-sm rounded-full btn-gradient"
          >
            {busy ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <>
                <HiCheck className="h-4 w-4" />
                Save changes
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
