"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useState } from "react";
import { FiSun, FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut();
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/my-profile", label: "My Profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-base-200 bg-base-100/90 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto grid h-16 grid-cols-[1fr_auto] items-center px-4 md:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <div className="flex items-center justify-start">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-xl font-bold"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-rose-500 shadow-md">
              <FiSun className="text-white text-lg" />
            </div>
            <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              SunCart
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center justify-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                pathname === link.href
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden items-center justify-end gap-3 md:flex">
          {session?.user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 rounded-full border border-base-200 bg-base-100 px-2 py-1.5 shadow-sm transition-all hover:border-orange-200 hover:bg-orange-50"
              >
                <div className="avatar">
                  <div className="w-9 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-1">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={36}
                      height={36}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-orange-400 to-rose-500 w-full h-full rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                  </div>
                </div>
                <span className="max-w-28 truncate pr-2 text-sm font-semibold text-gray-700">
                  {session.user.name || "User"}
                </span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu z-50 mt-3 w-56 rounded-2xl border border-base-200 bg-base-100 p-2 shadow-xl">
                <li className="menu-title px-4 py-2">
                  <span className="text-sm font-semibold">{session.user.name}</span>
                </li>
                <li>
                  <Link href="/my-profile" className="flex items-center gap-2">
                    <FiUser /> My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-error">
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-orange-50 hover:text-orange-600">
                Login
              </Link>
              <Link href="/register" className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:from-orange-600 hover:to-rose-600 hover:shadow-lg">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-base-200 bg-base-100 shadow-sm transition-all hover:bg-orange-50 hover:text-orange-600"
          >
            {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-base-200 bg-base-100/95 p-4 shadow-xl backdrop-blur-xl md:hidden">
          <div className="container mx-auto flex flex-col gap-2 px-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {link.href === "/my-profile" && <FiUser className="mr-2" />}
                {link.label}
              </Link>
            ))}
            <div className="divider my-1"></div>
            {session?.user ? (
              <div className="flex flex-col gap-3 rounded-2xl bg-base-200/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          width={32}
                          height={32}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-gradient-to-br from-orange-400 to-rose-500 w-full h-full rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{session.user.name || "User"}</p>
                    <p className="truncate text-xs text-gray-500">{session.user.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-50">
                  <FiLogOut /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center rounded-2xl border border-base-300 px-4 py-3 text-sm font-bold transition-all hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-3 text-sm font-bold text-white shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
