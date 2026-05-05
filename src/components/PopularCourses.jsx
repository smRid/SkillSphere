"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight, HiFire } from "react-icons/hi2";

import CourseCard from "./CourseCard";

export default function PopularCourses({ courses = [] }) {
  if (!courses.length) return null;

  return (
    <section id="popular" className="relative py-20">
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-primary/20">
              <HiFire className="h-3.5 w-3.5" />
              Popular Right Now
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              Courses learners{" "}
              <span className="gradient-text">can&apos;t stop</span> talking
              about
            </h2>
            <p className="mt-3 text-base text-base-content/70 md:text-lg">
              The top-rated picks from our catalog — battle-tested by thousands
              of learners and refreshed every week.
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
              className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/10"
            >
              View all courses
              <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
