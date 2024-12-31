"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function SearchResultCard({
  image_path,
  title,
  release_year,
  vote_average,
  media_type,
  known_for,
  id,
}) {
  const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
  return (
    <div className="p-3 flex gap-3 text-gray-300">
      {image_path ? (
        <Image
          src={`${baseImageUrl}/w500/${image_path}`}
          alt={`${title} image`}
          width={100}
          height={100}
          className="w-20 h-auto rounded-lg"
        />
      ) : (
        <div className="w-20"></div>
      )}
      <div>
        <Link
          href={`/detail/${media_type}/${id}`}
          className="text-xl font-medium text-white"
        >
          {title}
        </Link>

        <div className="flex gap-1 py-2">
          {media_type === "person" ? (
            <>
              <span>Actor, </span>
              <span>
                {" "}
                {known_for.media_type === "movie"
                  ? `${known_for.title} (${
                      known_for.release_date.split("-")[0]
                    })`
                  : `${known_for.name} (${
                      known_for.first_air_date.split("-")[0]
                    })`}
              </span>
            </>
          ) : (
            release_year.split("-")[0]
          )}
        </div>

        {media_type !== "person" && (
          <div className="flex gap-2">
            <StarIcon className="w-5 h-5 text-yellow-500" />
            <span>{vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
