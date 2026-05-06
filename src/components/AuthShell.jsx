"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiAcademicCap,
  HiArrowLeft,
  HiCheckCircle,
  HiSparkles,
  HiUsers,
} from "react-icons/hi2";

const highlights = [
  "Project-based courses",
  "Mentor-led learning paths",
  "Progress that follows you",
];

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <section className="relative overflow-hidden bg-base-100">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 px-4 py-10 md:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto w-full max-w-md"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-base-content/70 transition-colors hover:text-primary"
          >
            <HiArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="rounded-lg border border-base-300 bg-base-100 p-6 shadow-xl shadow-primary/10 md:p-8">
            <div className="mb-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                <HiSparkles className="h-4 w-4" />
                SkillSphere
              </span>
              <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-base-content md:text-4xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 leading-7 text-base-content/65">
                  {subtitle}
                </p>
              )}
            </div>

            {children}

            {footer && (
              <div className="mt-6 text-center text-sm text-base-content/70">
                {footer}
              </div>
            )}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="relative hidden min-h-[640px] overflow-hidden rounded-lg lg:block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop"
            alt="Learners collaborating in a classroom"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/10" />
          <div className="relative z-10 flex h-full min-h-[640px] flex-col justify-between p-10 text-white xl:p-12">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              <HiAcademicCap className="h-5 w-5 text-cyan-200" />
              Learn today, build tomorrow
            </div>

            <div>
              <h2 className="max-w-lg font-display text-5xl font-black leading-none">
                Skills that turn into real outcomes.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/80">
                Join a focused learning space for courses, mentors, and
                consistent progress across your career goals.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <Metric icon={HiUsers} value="100K+" label="Learners" />
                <Metric icon={HiAcademicCap} value="500+" label="Courses" />
                <Metric icon={HiSparkles} value="4.9" label="Rating" />
              </div>
            </div>

            <div className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <HiCheckCircle className="h-5 w-5 shrink-0 text-cyan-200" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, value, label }) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-md">
      <Icon className="h-5 w-5 text-cyan-200" />
      <p className="mt-3 font-display text-2xl font-extrabold">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase text-white/65">
        {label}
      </p>
    </div>
  );
}
