"use client";

import { fetchData } from "@/lib/function";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export default function TitleResultCard({
  id,
  title,
  release_year = "",
  media_type,
  poster_path,
}) {
  const [detail, setDetail] = useState(null);
  const [credits, setCredits] = useState(null);
  const baseImageUrl =
    process.env.TMDB_BASE_IMAGE_URL || "https://image.tmdb.org/t/p";
  const baseUrl = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
  const apiKey = process.env.TMDB_API_KEY;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [detailData, creditsData] = await Promise.all([
          fetchData(`${baseUrl}/${media_type}/${id}?api_key=${apiKey}`),
          fetchData(`${baseUrl}/${media_type}/${id}/credits?api_key=${apiKey}`),
        ]);
        setDetail(detailData);
        setCredits(creditsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, [id, media_type, baseUrl, apiKey]);

  return (
    <Link
      className="w-full flex gap-3 p-2 border-b border-gray-300 group"
      href={`/detail/${media_type}/${id}`}
    >
      <Image
        src={
          poster_path
            ? `${baseImageUrl}/w500/${poster_path}`
            : "/placeholder-image.png"
        }
        width={100}
        height={100}
        alt={`${title} poster`}
        className="w-14 h-auto rounded-lg bg-gray-200"
      />
      <div className="text-sm">
        <div className="text-lg font-medium text-gray-500 group-hover:text-white">
          {title}
        </div>
        <div className="flex gap-1">
          <span>
            {release_year.split("-")[0] || "Unknown"}
            {media_type === "tv" &&
              detail?.last_air_date &&
              `-${detail.last_air_date.split("-")[0]}`}
          </span>
          <span>&bull;</span>
          <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
        </div>
        <div className="flex gap-1">
          {credits?.cast?.slice(0, 3).map((cast, index, array) => (
            <Fragment key={cast.id || index}>
              <span>{cast.name || "Unknown"}</span>
              {index < array.length - 1 && <span>&bull;</span>}
            </Fragment>
          ))}
        </div>
      </div>
    </Link>
  );
}
