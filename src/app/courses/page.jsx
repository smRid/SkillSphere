"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMagnifyingGlass, HiXMark, HiAdjustmentsHorizontal } from "react-icons/hi2";

import CourseCard from "@/components/CourseCard";
import { courses, getCategories } from "@/data/courses";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const categories = useMemo(() => ["All", ...getCategories()], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesQuery = q === "" || c.title.toLowerCase().includes(q);
      const matchesCategory = category === "All" || c.category === category;
      const matchesLevel = level === "All" || c.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [query, category, level]);

  const activeFilters =
    (query ? 1 : 0) + (category !== "All" ? 1 : 0) + (level !== "All" ? 1 : 0);

  const resetAll = () => {
    setQuery("");
    setCategory("All");
    setLevel("All");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-primary/20">
          <HiAdjustmentsHorizontal className="h-3.5 w-3.5" />
          Browse the Catalog
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          Every course, <span className="gradient-text">one shelf</span>
        </h1>
        <p className="mt-3 text-base text-base-content/70 md:text-lg">
          Search by title, narrow by category or level, and find the next skill
          you&apos;ll obsess over.
        </p>
      </motion.div>

      {/* Filter bar */}
      <div className="mt-10 space-y-5 rounded-3xl border border-base-300/60 bg-base-100/70 p-5 shadow-sm backdrop-blur-sm md:p-6">
        {/* Search */}
        <div className="relative">
          <HiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses by title…"
            aria-label="Search courses by title"
            className="input input-bordered w-full rounded-full bg-base-100/80 pl-11 pr-11 text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-base-content/60 hover:bg-base-200 hover:text-base-content"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Categories */}
        <FilterRow label="Category">
          {categories.map((c) => (
            <Chip
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
              variant="primary"
            >
              {c}
            </Chip>
          ))}
        </FilterRow>

        {/* Levels */}
        <FilterRow label="Level">
          {LEVELS.map((l) => (
            <Chip
              key={l}
              active={level === l}
              onClick={() => setLevel(l)}
              variant="secondary"
            >
              {l}
            </Chip>
          ))}
        </FilterRow>
      </div>

      {/* Result meta */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-base-content/70">
          Showing{" "}
          <span className="font-semibold text-base-content">
            {filtered.length}
          </span>{" "}
          of {courses.length} course{courses.length === 1 ? "" : "s"}
          {activeFilters > 0 && (
            <>
              {" "}
              · <span className="text-primary">{activeFilters}</span> filter
              {activeFilters === 1 ? "" : "s"} active
            </>
          )}
        </p>
        {activeFilters > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-base-300/60 bg-base-100 px-3 py-1.5 text-xs font-semibold text-base-content/70 hover:border-primary/40 hover:text-primary"
          >
            <HiXMark className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div
          layout
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <CourseCard course={c} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState onReset={resetAll} />
      )}
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function FilterRow({ label, children }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60 md:w-20">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, variant = "primary", children }) {
  const activeStyles =
    variant === "secondary"
      ? "bg-secondary text-secondary-content shadow-md shadow-secondary/30"
      : "bg-primary text-primary-content shadow-md shadow-primary/30";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
        active
          ? activeStyles
          : "border border-base-300/60 bg-base-100 text-base-content/70 hover:border-primary/40 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 rounded-3xl border border-dashed border-base-300 bg-base-100/50 px-6 py-16 text-center"
    >
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <HiMagnifyingGlass className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-xl font-bold">
        No courses match those filters
      </h3>
      <p className="mt-1 text-sm text-base-content/70">
        Try a different keyword, loosen a filter, or browse everything.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="btn btn-gradient mt-6 rounded-full"
      >
        Clear filters
      </button>
    </motion.div>
  );
}
