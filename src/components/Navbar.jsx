"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiAcademicCap,
  HiUserGroup,
  HiInformationCircle,
  HiBars3,
  HiXMark,
  HiSun,
  HiMoon,
  HiChevronDown,
  HiUser,
  HiUserPlus,
  HiArrowRightOnRectangle,
  HiArrowLeftOnRectangle,
  HiSparkles,
} from "react-icons/hi2";
import toast from "react-hot-toast";

import { useSession, signOut } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home", icon: HiHome },
  { href: "/courses", label: "Courses", icon: HiAcademicCap },
  { href: "/instructors", label: "Instructors", icon: HiUserGroup },
  { href: "/about", label: "About", icon: HiInformationCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("skillsphere");

  // Blur-on-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Read current theme set by ThemeScript on first paint
  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") || "skillsphere";
    setTheme(current);
  }, []);

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === "skillsphere" ? "skillsphereDark" : "skillsphere";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ss-theme", next);
    } catch (_) {}
    setTheme(next);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    router.push("/");
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-base-100/70 backdrop-blur-xl border-b border-base-300/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.span
            className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-lg"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #7c3aed, #ec4899, #06b6d4)",
              backgroundSize: "200% 200%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ rotate: 12, scale: 1.05 }}
          >
            <HiSparkles className="h-5 w-5" />
          </motion.span>
          <span className="font-display text-xl font-extrabold tracking-tight">
            Skill<span className="gradient-text">Sphere</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-primary"
                    : "text-base-content/70 hover:text-base-content"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10 ring-1 ring-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <div className="hidden md:flex items-center gap-2">
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-full bg-base-300/60" />
            ) : session?.user ? (
              <UserDropdown user={session.user} onLogout={handleSignOut} />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-base-200 transition-colors"
          >
            {mobileOpen ? (
              <HiXMark className="h-6 w-6" />
            ) : (
              <HiBars3 className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-base-300/60 bg-base-100/90 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                      active
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-base-content/80 hover:bg-base-200"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                );
              })}

              <div className="mt-2 border-t border-base-300/60 pt-3">
                {isPending ? (
                  <div className="h-10 animate-pulse rounded-xl bg-base-300/60" />
                ) : session?.user ? (
                  <div className="space-y-1">
                    <Link
                      href="/my-profile"
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium hover:bg-base-200"
                    >
                      <HiUser className="h-5 w-5" />
                      My profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-error hover:bg-error/10"
                    >
                      <HiArrowRightOnRectangle className="h-5 w-5" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <AuthButtons mobile />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function AuthButtons({ mobile = false }) {
  return (
    <div className={mobile ? "grid gap-2" : "flex items-center gap-2"}>
      <Link
        href="/login"
        className={`btn btn-outline rounded-full font-semibold ${
          mobile ? "btn-md w-full" : "btn-sm"
        }`}
      >
        <HiArrowLeftOnRectangle className="h-4 w-4" />
        Login
      </Link>
      <Link
        href="/register"
        className={`btn btn-gradient rounded-full font-semibold shadow-lg shadow-primary/20 ${
          mobile ? "btn-md w-full" : "btn-sm"
        }`}
      >
        <HiUserPlus className="h-4 w-4" />
        Register
      </Link>
    </div>
  );
}

/* ---------- Theme toggle ---------- */
function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "skillsphereDark";
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={onToggle}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full hover:bg-base-200 transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 grid place-items-center"
        >
          {isDark ? (
            <HiMoon className="h-5 w-5 text-primary" />
          ) : (
            <HiSun className="h-5 w-5 text-primary" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* ---------- User dropdown ---------- */
function UserDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-base-200 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 via-fuchsia-500 to-cyan-400 text-white font-bold text-sm">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            initial
          )}
        </span>
        <span className="hidden lg:inline text-sm font-medium max-w-[8rem] truncate">
          {user.name || user.email}
        </span>
        <HiChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-base-300/60 bg-base-100/95 backdrop-blur-xl shadow-xl"
          >
            <div className="px-4 py-3 border-b border-base-300/60">
              <p className="text-sm font-semibold truncate">
                {user.name || "Learner"}
              </p>
              <p className="text-xs text-base-content/60 truncate">
                {user.email}
              </p>
            </div>
            <Link
              href="/my-profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-200"
              role="menuitem"
            >
              <HiUser className="h-4 w-4" />
              My profile
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10"
              role="menuitem"
            >
              <HiArrowRightOnRectangle className="h-4 w-4" />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
