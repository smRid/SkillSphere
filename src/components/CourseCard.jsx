"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiStar,
  HiClock,
  HiUsers,
  HiArrowRight,
  HiBolt,
  HiSparkles,
} from "react-icons/hi2";

const levelStyles = {
  Beginner: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 ring-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-600 ring-rose-500/20",
};

export default function CourseCard({ course, index = 0 }) {
  const {
    id,
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
    image,
    category,
    tags = [],
  } = course;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="group card-shine relative flex h-full flex-col overflow-hidden rounded-3xl border border-base-300/60 bg-base-100/80 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Cover image */}
      <div className="relative h-48 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Soft gradient overlay for badge legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        {/* Top-left: category */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-base-100/80 px-2.5 py-1 text-xs font-semibold text-base-content backdrop-blur-md ring-1 ring-base-300/60">
            {category}
          </span>
        </div>

        {/* Top-right: NEW + Trending */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
              <HiSparkles className="h-3 w-3" />
              New
            </span>
          )}
          {trending && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
              <HiBolt className="h-3 w-3" />
              Trending
            </span>
          )}
        </div>

        {/* Bottom-right: rating pill */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-base-100/90 px-2.5 py-1 text-xs font-semibold text-base-content backdrop-blur-md ring-1 ring-base-300/60">
            <HiStar className="h-3.5 w-3.5 text-amber-400" />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta row */}
        <div className="mb-3 flex items-center gap-2 text-xs text-base-content/60">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold ring-1 ${
              levelStyles[level] ||
              "bg-base-200 text-base-content/70 ring-base-300"
            }`}
          >
            {level}
          </span>
          <span className="inline-flex items-center gap-1">
            <HiClock className="h-3.5 w-3.5" />
            {duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <HiUsers className="h-3.5 w-3.5" />
            {students.toLocaleString()}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold leading-snug line-clamp-2 transition-colors group-hover:text-primary">
          {title}
        </h3>

        {/* Instructor */}
        <div className="mt-3 flex items-center gap-2">
          <Image
            src={instructorAvatar}
            alt={instructor}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover ring-2 ring-base-100"
          />
          <span className="text-sm text-base-content/70">{instructor}</span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-base-200 px-2 py-0.5 text-[11px] font-medium text-base-content/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: price + CTA */}
        <div className="mt-5 flex items-center justify-between border-t border-base-300/60 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-base-content/50">
              From
            </p>
            <p className="font-display text-2xl font-extrabold gradient-text">
              ${price}
            </p>
          </div>
          <Link
            href={`/courses/${id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/10 hover:gap-2.5"
          >
            View Details
            <HiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
