"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiStar,
  HiUsers,
  HiAcademicCap,
  HiArrowRight,
  HiUserGroup,
} from "react-icons/hi2";

import { instructors } from "@/data/courses";

export default function TopInstructors() {
  return (
    <section id="instructors" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-primary/20">
            <HiUserGroup className="h-3.5 w-3.5" />
            Meet the Team
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Learn from people who{" "}
            <span className="gradient-text">actually ship</span>
          </h2>
          <p className="mt-3 text-base text-base-content/70 md:text-lg">
            Senior operators, staff engineers, and design leads — teaching the
            playbook they use every day.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((inst, i) => (
            <motion.article
              key={inst.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-base-300/60 bg-base-100/80 p-6 text-center shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Glowing avatar */}
              <div className="relative mx-auto h-24 w-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 via-fuchsia-500 to-cyan-400 opacity-40 blur-lg transition-opacity duration-500 group-hover:opacity-70" />
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-base-100">
                  <Image
                    src={inst.avatar}
                    alt={inst.name}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Name + title */}
              <h3 className="mt-4 font-display text-lg font-bold">
                {inst.name}
              </h3>
              <p className="text-sm text-base-content/60">{inst.title}</p>

              {/* Expertise chip */}
              <span className="mt-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
                {inst.expertise}
              </span>

              {/* Bio */}
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-base-content/70">
                {inst.bio}
              </p>

              {/* Stats */}
              <div className="mt-5 grid w-full grid-cols-3 gap-1 rounded-2xl border border-base-300/60 bg-base-200/40 p-2">
                <Stat
                  icon={HiStar}
                  value={inst.rating.toFixed(1)}
                  label="Rating"
                  tone="text-amber-500"
                />
                <Stat
                  icon={HiUsers}
                  value={formatCount(inst.students)}
                  label="Students"
                  tone="text-primary"
                />
                <Stat
                  icon={HiAcademicCap}
                  value={inst.courses}
                  label="Courses"
                  tone="text-secondary"
                />
              </div>

              {/* CTA */}
              <Link
                href={`/instructors/${inst.id}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
              >
                View profile
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, value, label, tone }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl px-2 py-2">
      <div className={`flex items-center gap-1 ${tone}`}>
        <Icon className="h-3.5 w-3.5" />
        <span className="font-display text-sm font-extrabold text-base-content">
          {value}
        </span>
      </div>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-base-content/55">
        {label}
      </p>
    </div>
  );
}

function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
