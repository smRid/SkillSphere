"use client";

import { use, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  HiStar,
  HiClock,
  HiUsers,
  HiAcademicCap,
  HiBolt,
  HiSparkles,
  HiCheckCircle,
  HiArrowRight,
  HiArrowLeft,
  HiHeart,
  HiShare,
} from "react-icons/hi2";

import { useSession } from "@/lib/auth-client";
import Loader from "@/components/Loader";
import { getCourseById } from "@/data/courses";

const levelStyles = {
  Beginner: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 ring-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-600 ring-rose-500/20",
};

export default function CourseDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const hasRedirected = useRef(false);

  // Auth guard
  useEffect(() => {
    if (!isPending && !session && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error("Please log in to view course details");
      const redirect = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirect}`);
    }
  }, [isPending, session, pathname, router]);

  if (isPending || !session) {
    return <Loader label="Checking your session…" />;
  }

  const course = getCourseById(id);
  if (!course) return <CourseNotFound />;

  const {
    title,
    instructor,
    instructorAvatar,
    duration,
    rating,
    students,
    level,
    price,
    isNew,
    trending,
    description,
    image,
    category,
    tags = [],
    curriculum = [],
  } = course;

  const onEnroll = () => {
    toast.success(`Enrolled in "${title}"! 🎉`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 via-fuchsia-950/70 to-cyan-950/80" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 text-white md:px-6 md:py-20">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <HiArrowLeft className="h-4 w-4" />
            All courses
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-5 max-w-3xl"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md ring-1 ring-white/20">
                {category}
              </span>
              {isNew && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
                  <HiSparkles className="h-3 w-3" />
                  New
                </span>
              )}
              {trending && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
                  <HiBolt className="h-3 w-3" />
                  Trending
                </span>
              )}
            </div>

            <h1 className="mt-4 font-display text-3xl font-black leading-tight drop-shadow sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
              {description}
            </p>

            {/* Instructor + meta */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/85">
              <div className="flex items-center gap-2">
                <Image
                  src={instructorAvatar}
                  alt={instructor}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white/40"
                />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/60">
                    Instructor
                  </p>
                  <p className="font-semibold">{instructor}</p>
                </div>
              </div>
              <Meta icon={HiStar} text={`${rating.toFixed(1)} rating`} tone="text-amber-300" />
              <Meta
                icon={HiUsers}
                text={`${students.toLocaleString()} students`}
              />
              <Meta icon={HiClock} text={duration} />
              <Meta icon={HiAcademicCap} text={level} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Main */}
          <div>
            {/* What you'll learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl font-extrabold md:text-3xl">
                What you&apos;ll learn
              </h2>
              <p className="mt-2 text-base-content/70">
                A {curriculum.length}-part curriculum, designed to build skills
                that compound.
              </p>

              <ul className="mt-6 space-y-2">
                {curriculum.map((item, i) => (
                  <motion.li
                    key={`${item}-${i}`}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="flex items-start gap-3 rounded-xl border border-base-300/60 bg-base-100/70 p-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm leading-relaxed text-base-content/85">
                      {item}
                    </span>
                    <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary/70" />
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tags / skills */}
            {tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="mt-12"
              >
                <h2 className="font-display text-2xl font-extrabold md:text-3xl">
                  Skills you&apos;ll pick up
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-base-300/70 bg-base-100 px-3 py-1.5 text-sm font-medium text-base-content/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar: enroll card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden rounded-3xl border border-base-300/60 bg-base-100/80 p-6 shadow-xl shadow-primary/5 backdrop-blur-md"
            >
              <p className="text-xs uppercase tracking-wider text-base-content/60">
                One-time price
              </p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-black gradient-text">
                  ${price}
                </span>
                <span className="text-sm text-base-content/60 line-through">
                  ${Math.round(price * 1.6)}
                </span>
              </p>

              <button
                type="button"
                onClick={onEnroll}
                className="btn btn-gradient mt-5 w-full rounded-full"
              >
                Enroll now
                <HiArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => toast("Saved to wishlist")}
                  className="btn btn-sm rounded-full border border-base-300/60 bg-base-100"
                >
                  <HiHeart className="h-4 w-4" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    toast.success("Link copied");
                  }}
                  className="btn btn-sm rounded-full border border-base-300/60 bg-base-100"
                >
                  <HiShare className="h-4 w-4" />
                  Share
                </button>
              </div>

              <ul className="mt-6 space-y-3 border-t border-base-300/60 pt-5 text-sm">
                <Fact icon={HiClock} label="Total length" value={duration} />
                <Fact
                  icon={HiAcademicCap}
                  label="Level"
                  value={
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                        levelStyles[level] ||
                        "bg-base-200 text-base-content/70 ring-base-300"
                      }`}
                    >
                      {level}
                    </span>
                  }
                />
                <Fact
                  icon={HiUsers}
                  label="Enrolled"
                  value={students.toLocaleString()}
                />
                <Fact
                  icon={HiStar}
                  label="Rating"
                  value={`${rating.toFixed(1)} / 5.0`}
                  tone="text-amber-500"
                />
              </ul>

              <p className="mt-5 text-center text-xs text-base-content/60">
                30-day money-back guarantee
              </p>
            </motion.div>
          </aside>
        </div>
      </section>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function Meta({ icon: Icon, text, tone = "" }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className={`h-4 w-4 ${tone || "text-white/80"}`} />
      <span>{text}</span>
    </span>
  );
}

function Fact({ icon: Icon, label, value, tone = "text-primary" }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2 text-base-content/65">
        <Icon className={`h-4 w-4 ${tone}`} />
        {label}
      </span>
      <span className="font-semibold text-base-content">{value}</span>
    </li>
  );
}

function CourseNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="font-display text-7xl font-black gradient-text">404</p>
      <h1 className="mt-2 font-display text-2xl font-extrabold">
        We couldn&apos;t find that course
      </h1>
      <p className="mt-2 text-base-content/70">
        It may have moved, or the link is no longer valid.
      </p>
      <Link href="/courses" className="btn btn-gradient mt-6 rounded-full">
        Back to all courses
      </Link>
    </div>
  );
}
