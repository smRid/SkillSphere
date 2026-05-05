"use client";

import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import { signIn } from "@/lib/auth-client";

export default function GoogleButton({
  callbackURL = "/",
  label = "Continue with Google",
}) {
  const handleGoogle = async () => {
    try {
      await signIn.social({ provider: "google", callbackURL });
    } catch (e) {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="btn btn-outline w-full gap-3 rounded-full hover:bg-base-200"
    >
      <FcGoogle className="text-xl" />
      {label}
    </button>
  );
}
