"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiUser, FiImage, FiSave, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const initialized = useRef(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login first");
      router.push("/login?redirect=/my-profile/update");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user && !initialized.current) {
      initialized.current = true;
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.updateUser({
        name,
        image: image || undefined,
      });
      toast.success("Profile updated successfully! 🎉");
      router.push("/my-profile");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl border border-base-200">
          <div className="card-body p-8">
            {/* Back Button */}
            <Link href="/my-profile" className="btn btn-ghost btn-sm rounded-full w-fit gap-2 mb-2">
              <FiArrowLeft /> Back to Profile
            </Link>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold">Update Profile</h1>
              <p className="text-gray-500 mt-1">Change your name and profile photo</p>
            </div>

            {/* Update Form */}
            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full pl-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Profile Image URL</span>
                </label>
                <div className="relative">
                  <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="input input-bordered w-full pl-11 rounded-xl"
                  />
                </div>
              </div>

              {/* Preview */}
              {image && (
                <div className="flex justify-center">
                  <div className="avatar">
                    <div className="w-20 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
                      <Image src={image} alt="Preview" width={80} height={80} className="object-cover" />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn w-full rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 hover:from-orange-600 hover:to-rose-600 text-base font-bold gap-2"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <FiSave /> Update Information
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
