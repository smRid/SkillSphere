"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import { signIn } from "@/lib/auth-client";

export default function GoogleButton({
  callbackURL = "/",
  label = "Continue with Google",
}) {
  const [busy, setBusy] = useState(false);

  const handleGoogle = async () => {
    if (busy) return;
    setBusy(true);
    const { error } = await signIn.social({
      provider: "google",
      callbackURL,
    });
    if (error) {
      toast.error(error.message || "Google sign-in failed. Please try again.");
      setBusy(false);
    }
    // on success the page redirects — no need to reset busy
  };

  return (
    <button
      type="button"
      disabled={busy}
      onClick={handleGoogle}
      className="btn btn-outline w-full gap-3 rounded-full hover:bg-base-200 hover:text-base-content disabled:opacity-60"
    >
      {busy ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <FcGoogle className="text-xl" />
      )}
      {label}
    </button>
  );
}
