"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { HiArrowRight, HiBolt } from "react-icons/hi2";

import "swiper/css";
import "swiper/css/pagination";

import CourseCard from "./CourseCard";

export default function TrendingCourses({ courses = [] }) {
  if (!courses.length) return null;

  return (
    <section
      id="trending"
      className="relative overflow-hidden py-20"
    >
      {/* Subtle band background to differentiate from Popular section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary ring-1 ring-secondary/20">
              <HiBolt className="h-3.5 w-3.5" />
              Trending This Week
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              What&apos;s catching{" "}
              <span className="gradient-text">fire right now</span>
            </h2>
            <p className="mt-3 text-base text-base-content/70 md:text-lg">
              Fresh picks your peers are enrolling in this week. Swipe through
              to see the full lineup.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/courses"
              className="group inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/5 px-5 py-2.5 text-sm font-semibold text-secondary transition-all hover:border-secondary/60 hover:bg-secondary/10"
            >
              Browse all
              <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={courses.length > 3}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-14"
          >
            {courses.map((c, i) => (
              <SwiperSlide key={c.id} className="h-auto">
                {/* Wrap to make slide fill height for uniform card heights */}
                <div className="h-full pt-1 pb-2">
                  <CourseCard course={c} index={i} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
