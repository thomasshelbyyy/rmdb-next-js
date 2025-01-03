"use client";

import Image from "next/image";
import Link from "next/link";
import noProfile from "@/assets/no-profile.png";

export default function PersonResultCard({
  name,
  id,
  known_for = [],
  profile_path,
}) {
  const baseImageUrl =
    process.env.TMDB_BASE_IMAGE_URL || "https://image.tmdb.org/t/p";

  // Fallback for the first known work
  const firstKnownWork = known_for[0] || {};

  return (
    <Link
      href={`/person/${id}`}
      className="w-full flex gap-3 p-2 border-b border-gray-300 group"
    >
      <Image
        src={profile_path ? `${baseImageUrl}/w500/${profile_path}` : noProfile}
        width={100}
        height={100}
        alt={`${name}'s profile`}
        className="w-14 h-14 bg-gray-300 rounded-full object-cover"
      />
      <div className="text-sm">
        <div className="text-lg font-medium text-gray-500 group-hover:text-white">
          {name || "Unknown Name"}
        </div>
        {known_for.length > 0 && (
          <div className="text-gray-400">
            {firstKnownWork.title || firstKnownWork.name || "Unknown Work"} (
            {firstKnownWork.release_date?.split("-")[0] ||
              firstKnownWork.first_air_date?.split("-")[0] ||
              "Unknown Year"}
            )
          </div>
        )}
      </div>
    </Link>
  );
}
