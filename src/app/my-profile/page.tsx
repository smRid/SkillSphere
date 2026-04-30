"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiUser, FiMail, FiEdit, FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to view your profile");
      router.push("/login?redirect=/my-profile");
    }
  }, [session, isPending, router]);

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

  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-orange-50/30">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 h-48 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 pb-12">
        <div className="card bg-base-100 shadow-2xl border border-base-200 max-w-2xl mx-auto">
          <div className="card-body p-8">
            {/* Avatar */}
            <div className="flex flex-col items-center -mt-20 mb-6">
              <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-gradient-to-br from-orange-400 to-rose-500">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white text-5xl font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-extrabold mt-4">{user.name || "User"}</h1>
              <p className="text-gray-500 text-sm">SunCart Member</p>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <FiUser className="text-orange-500 text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Name</p>
                  <p className="font-semibold">{user.name || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiMail className="text-blue-500 text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Email</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCalendar className="text-green-500 text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Member Since</p>
                  <p className="font-semibold">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Update Button */}
            <div className="mt-6">
              <Link
                href="/my-profile/update"
                className="btn w-full rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 hover:from-orange-600 hover:to-rose-600 text-base font-bold gap-2"
              >
                <FiEdit /> Update Information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
