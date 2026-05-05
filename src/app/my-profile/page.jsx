"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  HiCheckBadge,
  HiEnvelope,
  HiCalendar,
  HiAcademicCap,
  HiTrophy,
  HiClock,
  HiSparkles,
  HiLockClosed,
  HiKey,
  HiShieldCheck,
  HiArrowRight,
  HiPencilSquare,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import toast from "react-hot-toast";

import { useSession, signOut } from "@/lib/auth-client";
import Loader from "@/components/Loader";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?redirect=/my-profile");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return <Loader label="Loading your profile…" />;
  }

  const user = session.user;
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();
  const joined = user.createdAt ? new Date(user.createdAt) : null;
  const memberSince = joined ? joined.toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  }) : "Today";

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      {/* Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl shadow-xl shadow-primary/10"
      >
        {/* Animated gradient base */}
        <div
          className="h-44 animate-gradient-x bg-size-200 md:h-52"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #6d28d9, #c026d3, #db2777, #0891b2, #6d28d9)",
          }}
        />
        {/* Dot grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-44 opacity-[0.12] mix-blend-overlay md:h-52"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative bg-base-100/80 px-6 pb-6 pt-0 backdrop-blur-md md:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            {/* Avatar + identity */}
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end">
              <div className="relative -mt-14 md:-mt-16">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 via-fuchsia-500 to-cyan-400 opacity-50 blur-lg" />
                <div className="relative grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 via-fuchsia-500 to-cyan-400 ring-4 ring-base-100 md:h-32 md:w-32">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile"}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-4xl font-black text-white">
                      {initial}
                    </span>
                  )}
                </div>
                {user.emailVerified && (
                  <span
                    title="Email verified"
                    className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full bg-base-100 ring-2 ring-base-100"
                  >
                    <HiCheckBadge className="h-7 w-7 text-primary" />
                  </span>
                )}
              </div>

              <div className="pt-1">
                <h1 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
                  {user.name || "Welcome, learner"}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-base-content/70">
                  <span className="inline-flex items-center gap-1.5">
                    <HiEnvelope className="h-4 w-4 text-primary" />
                    {user.email}
                  </span>
                  {joined && (
                    <span className="inline-flex items-center gap-1.5">
                      <HiCalendar className="h-4 w-4 text-primary" />
                      Joined {memberSince}
                    </span>
                  )}
                  {user.emailVerified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20">
                      <HiShieldCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600 ring-1 ring-amber-500/20">
                      Unverified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/my-profile/update"
                className="btn btn-sm rounded-full btn-gradient"
              >
                <HiPencilSquare className="h-4 w-4" />
                Edit profile
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn btn-sm rounded-full border border-base-300/60 bg-base-100 text-error hover:border-error/40 hover:bg-error/10"
              >
                <HiArrowRightOnRectangle className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stat tiles */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          icon={HiAcademicCap}
          value="0"
          label="Courses enrolled"
          gradient="from-violet-500 to-fuchsia-500"
          delay={0.05}
        />
        <StatTile
          icon={HiTrophy}
          value="0"
          label="Certificates earned"
          gradient="from-amber-500 to-orange-500"
          delay={0.1}
        />
        <StatTile
          icon={HiClock}
          value="0h"
          label="Hours learned"
          gradient="from-cyan-500 to-blue-500"
          delay={0.15}
        />
        <StatTile
          icon={HiSparkles}
          value={memberSince}
          label="Member since"
          gradient="from-emerald-500 to-teal-500"
          delay={0.2}
        />
      </section>

      {/* Lower grid */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Account details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-base-300/60 bg-base-100/80 p-6 shadow-sm backdrop-blur-sm md:p-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-extrabold">
              Account details
            </h2>
            <Link
              href="/my-profile/update"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Edit
              <HiPencilSquare className="h-4 w-4" />
            </Link>
          </div>

          <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <DetailRow label="Full name" value={user.name || "—"} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow
              label="User ID"
              value={
                <span className="font-mono text-xs">{user.id}</span>
              }
            />
            <DetailRow
              label="Status"
              value={
                user.emailVerified ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600">
                    <HiShieldCheck className="h-4 w-4" />
                    Verified account
                  </span>
                ) : (
                  <span className="text-amber-600">Pending verification</span>
                )
              }
            />
            {joined && (
              <DetailRow
                label="Joined"
                value={joined.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
            )}
            <DetailRow
              label="Plan"
              value={
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary ring-1 ring-primary/20">
                  Free
                </span>
              }
            />
          </dl>
        </motion.div>

        {/* Secure account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 via-fuchsia-500 to-cyan-400 text-white shadow-md">
              <HiLockClosed className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-extrabold">
                Secure your account
              </h2>
              <p className="text-xs text-base-content/60">
                A few small steps go a long way.
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            <SecurityRow
              icon={HiKey}
              title="Update your password"
              description="Use a unique passphrase you can remember."
              href="/my-profile/security"
            />
            <SecurityRow
              icon={HiShieldCheck}
              title={user.emailVerified ? "Email verified" : "Verify your email"}
              description={
                user.emailVerified
                  ? "Your email is confirmed and ready."
                  : "Check your inbox for the verification link."
              }
              href="/my-profile/security"
              done={user.emailVerified}
            />
            <SecurityRow
              icon={HiSparkles}
              title="Connect Google"
              description="One-click sign-in for faster access."
              href="/my-profile/security"
            />
          </ul>
        </motion.div>
      </section>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function StatTile({ icon: Icon, value, label, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-base-300/60 bg-base-100/80 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-primary/10"
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-display text-2xl font-extrabold">{value}</p>
      <p className="mt-0.5 text-xs uppercase tracking-wider text-base-content/55">
        {label}
      </p>
    </motion.div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-base-content/55">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-medium text-base-content">
        {value}
      </dd>
    </div>
  );
}

function SecurityRow({ icon: Icon, title, description, href, done = false }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-start gap-3 rounded-2xl border border-base-300/60 bg-base-100/60 p-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
      >
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
            done
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-base-content/65">{description}</p>
        </div>
        <HiArrowRight className="mt-2 h-4 w-4 text-base-content/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
      </Link>
    </li>
  );
}
