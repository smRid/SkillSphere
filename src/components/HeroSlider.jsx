"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { HiArrowRight, HiPlay, HiStar, HiUsers, HiAcademicCap } from "react-icons/hi2";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    eyebrow: "Welcome to SkillSphere",
    title: "Upgrade your skills today",
    accent: "🚀",
    subtitle:
      "Join 100,000+ learners building real skills with expert-led courses, hands-on projects, and a supportive community.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop",
    gradient: "from-violet-900/85 via-fuchsia-900/60 to-transparent",
    cta: { label: "Explore Courses", href: "/courses" },
    secondary: { label: "Watch Intro", href: "#about" },
  },
  {
    eyebrow: "Learn from the best",
    title: "Mentored by industry experts",
    accent: "✨",
    subtitle:
      "Engineers, designers, and founders who ship at scale — teaching the craft they actually use every day.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop",
    gradient: "from-cyan-900/85 via-blue-900/55 to-transparent",
    cta: { label: "Meet Instructors", href: "/instructors" },
    secondary: { label: "Browse Courses", href: "/courses" },
  },
  {
    eyebrow: "Build, don't just watch",
    title: "Turn knowledge into projects",
    accent: "💡",
    subtitle:
      "Every course ends with a portfolio-worthy capstone. Ship real work, not another certificate that sits in a drawer.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop",
    gradient: "from-rose-900/85 via-amber-900/45 to-transparent",
    cta: { label: "Get Started Free", href: "/register" },
    secondary: { label: "See Curriculum", href: "/courses" },
  },
];

const stats = [
  { icon: HiUsers, value: "100K+", label: "Active Learners" },
  { icon: HiAcademicCap, value: "500+", label: "Expert Courses" },
  { icon: HiStar, value: "4.9", label: "Average Rating" },
];

export default function HeroSlider() {
  return (
    <section className="relative">
      {/* Floating product cards (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
      >
        {/* 🏆 Certificate earned */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-8 top-24 flex items-center gap-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white shadow-2xl backdrop-blur-xl xl:right-16"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-pink-500 text-lg shadow-md">
            🏆
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
              Certificate earned
            </p>
            <p className="font-display text-sm font-bold leading-tight">
              React Mastery
            </p>
          </div>
        </motion.div>

        {/* 📈 Today's progress */}
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="absolute bottom-44 right-32 flex items-center gap-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white shadow-2xl backdrop-blur-xl xl:right-48"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-lg shadow-md">
            📈
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
              Today&apos;s progress
            </p>
            <p className="font-display text-sm font-bold leading-tight">
              +2.5 hours learned
            </p>
          </div>
        </motion.div>

        {/* 🟢 Live learners */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className="absolute right-4 top-1/2 flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-white shadow-2xl backdrop-blur-xl xl:right-12"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm font-semibold">
            12,840 learners online
          </span>
        </motion.div>
      </div>

      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-[560px] md:h-[620px] lg:h-[680px]"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.title}>
            <div className="relative h-full w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Colored overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`}
              />
              {/* Bottom vignette for stat strip legibility */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Content */}
              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 md:px-6">
                <motion.div
                  key={`slide-${i}`}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="max-w-2xl text-white"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
                    <span>{s.accent}</span>
                    {s.eyebrow}
                  </span>

                  <h1 className="mt-5 font-display text-4xl font-black leading-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
                    {s.title}
                  </h1>

                  <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
                    {s.subtitle}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={s.cta.href}
                      className="btn btn-gradient rounded-full px-7 py-3 text-base"
                    >
                      {s.cta.label}
                      <HiArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={s.secondary.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                    >
                      <HiPlay className="h-4 w-4" />
                      {s.secondary.label}
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stat strip — overlaps the slider bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 -mb-10 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pointer-events-auto glass grid w-full max-w-4xl grid-cols-3 gap-2 rounded-2xl px-4 py-5 md:gap-6 md:px-8"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-3 text-center"
            >
              <span className="hidden h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary md:grid">
                <Icon className="h-5 w-5" />
              </span>
              <div className="text-left">
                <p className="font-display text-xl font-extrabold gradient-text md:text-2xl">
                  {value}
                </p>
                <p className="text-[11px] font-medium text-base-content/60 md:text-xs">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
