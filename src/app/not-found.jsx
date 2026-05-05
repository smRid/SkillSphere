import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-display text-[10rem] leading-none font-black gradient-text">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold">
        This page wandered off the curriculum
      </h1>
      <p className="mt-3 text-base-content/70">
        The page you&apos;re looking for doesn&apos;t exist, or it may have been moved.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
        <Link href="/" className="btn btn-gradient rounded-full">
          Back to home
        </Link>
        <Link href="/courses" className="btn btn-outline rounded-full">
          Explore courses
        </Link>
      </div>
    </div>
  );
}
