"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiSparkles,
  HiUsers,
  HiAcademicCap,
  HiStar,
} from "react-icons/hi2";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center px-4 py-14 md:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-lg"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #7c3aed, #ec4899, #06b6d4)",
              }}
            >
              <HiSparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Skill<span className="gradient-text">Sphere</span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h1 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-base-content/70">{subtitle}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8"
          >
            {children}
          </motion.div>

          {footer && (
            <div className="mt-6 text-center text-sm text-base-content/70">
              {footer}
            </div>
          )}
        </div>
      </div>

      {/* Right: gradient hero — desktop only */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* Photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 animate-gradient-x bg-size-200 opacity-90 mix-blend-multiply"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #4c1d95, #831843, #0e7490, #4c1d95)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Floating decorative blobs */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-12 -left-12 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 14, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="pointer-events-none absolute -bottom-10 -right-12 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white xl:p-14">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <HiSparkles className="h-3.5 w-3.5" />
            Where curiosity compounds
          </span>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl font-black leading-tight drop-shadow-lg xl:text-5xl"
            >
              Learn skills that{" "}
              <span className="bg-gradient-to-r from-amber-300 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
                shape your future
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 max-w-md text-white/85"
            >
              Join 100,000+ learners building real, portfolio-worthy skills with
              expert-led courses and a community that pushes you forward.
            </motion.p>

            {/* Stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 grid grid-cols-3 gap-3"
            >
              <StatChip
                icon={HiUsers}
                value="100K+"
                label="Learners"
              />
              <StatChip
                icon={HiAcademicCap}
                value="500+"
                label="Courses"
              />
              <StatChip icon={HiStar} value="4.9" label="Avg rating" />
            </motion.div>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/30"
              />
              <div>
                <p className="text-sm font-semibold">Aisha Rahman</p>
                <p className="text-xs text-white/70">
                  Frontend Engineer · Berlin
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              &ldquo;The capstone projects got me my first job. I still come
              back when I need to level up.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatChip({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-3 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/15">
          <Icon className="h-4 w-4" />
        </span>
        <p className="font-display text-lg font-extrabold">{value}</p>
      </div>
      <p className="mt-1 text-[11px] uppercase tracking-wider text-white/70">
        {label}
      </p>
    </div>
  );
}
