"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => console.error(error), [error]);
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-display text-[7rem] font-black gradient-text">Oops</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold">
        Something went wrong
      </h1>
      <p className="mt-3 text-base-content/70">
        Don&apos;t worry — your progress is safe. Retry or go home.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <button onClick={reset} className="btn btn-gradient rounded-full">
          Try again
        </button>
        <Link href="/" className="btn btn-outline rounded-full">
          Back to home
        </Link>
      </div>
    </div>
  );
}
