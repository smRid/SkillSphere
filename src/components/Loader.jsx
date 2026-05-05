"use client";
import { motion } from "framer-motion";

export default function Loader({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="relative h-20 w-20">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-4 border-secondary/20 border-b-secondary"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-5 rounded-full bg-gradient-to-br from-brand-500 via-fuchsia-500 to-cyan-400"
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        />
      </div>
      <p className="text-sm text-base-content/70">{label}</p>
    </div>
  );
}
