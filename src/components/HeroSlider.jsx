"use client";

import { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { HiArrowRight, HiPlay, HiStar, HiUsers, HiAcademicCap } from "react-icons/hi2";

import "swiper/css";
import "swiper/css/effect-fade";

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
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&auto=format&fit=crop",
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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
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

      {/* Custom slide fraction pagination */}
      <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const swiper = document.querySelector(".swiper")?.swiper;
                swiper?.slideToLoop(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-xs font-bold tracking-wider text-white/90">
          {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Right-side stat panel */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden lg:flex items-center pr-24 xl:pr-40">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="pointer-events-auto glass flex flex-col gap-6 rounded-2xl px-6 py-8"
        >
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
              className="flex items-center gap-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold gradient-text">
                  {value}
                </p>
                <p className="text-[11px] font-medium text-base-content/60">
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
