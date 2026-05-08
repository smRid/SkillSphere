"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiYoutube,
  FiMail,
  FiMapPin,
  FiPhone,
  FiArrowRight,
} from "react-icons/fi";

const socials = [
  { href: "https://twitter.com", icon: FiTwitter, label: "Twitter" },
  { href: "https://github.com", icon: FiGithub, label: "GitHub" },
  { href: "https://linkedin.com", icon: FiLinkedin, label: "LinkedIn" },
  { href: "https://youtube.com", icon: FiYoutube, label: "YouTube" },
];

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/instructors", label: "Instructors" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/refund", label: "Refund Policy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    // Simulated subscribe — wire to a real endpoint when ready.
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thanks! You're on the list.");
    setEmail("");
    setBusy(false);
  };

  return (
    <footer className="relative mt-24 border-t border-base-300/60 bg-base-200/40 backdrop-blur-sm">
      {/* Top gradient hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + socials */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-10 w-11 place-items-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="SkillSphere logo"
                  width={54}
                  height={42}
                  className="h-10 w-11 object-contain transition-transform duration-300 hover:scale-105"
                />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                Skill<span className="gradient-text">Sphere</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-base-content/70 max-w-sm">
              Learn skills that shape your future. Courses, mentors, and a
              community that keeps you moving forward.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-base-300/70 bg-base-100/60 text-base-content/70 transition-all hover:-translate-y-0.5 hover:text-primary hover:border-primary/40 hover:shadow-md"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-base-content/80">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 text-sm text-base-content/70 transition-colors hover:text-primary"
                  >
                    <span className="h-px w-2 bg-current opacity-0 transition-opacity hover:opacity-100" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-base-content/80">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-base-content/70 transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-base-content/80">
              Stay in the loop
            </h3>
            <p className="text-sm text-base-content/70">
              New courses, mentor spotlights, and learning tips — straight to
              your inbox.
            </p>
            <form onSubmit={onSubscribe} className="flex items-center gap-2">
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input input-sm input-bordered w-full rounded-full bg-base-100/80"
              />
              <button
                type="submit"
                disabled={busy}
                aria-label="Subscribe"
                className="btn btn-sm rounded-full btn-gradient"
              >
                {busy ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <FiArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>

            <ul className="space-y-2 pt-2 text-sm text-base-content/70">
              <li className="flex items-center gap-2">
                <FiMail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:hello@skillsphere.app"
                  className="hover:text-primary"
                >
                  hello@skillsphere.app
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="h-4 w-4 text-primary" />
                <span>+1 (555) 010-1234</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="h-4 w-4 text-primary" />
                <span>Remote · Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-3 border-t border-base-300/60 pt-6 text-sm text-base-content/60 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold gradient-text">SkillSphere</span>.
            Crafted for lifelong learners.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
