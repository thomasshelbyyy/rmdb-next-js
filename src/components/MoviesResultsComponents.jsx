"use client";

import { Fragment, useState } from "react";
import TitleResultCard from "./TitleResultCard";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function MoviesResultsComponents({ results }) {
  const [visibleItem, setVisibleItem] = useState(5);

  const handleSeeMore = () => {
    setVisibleItem((prev) => prev + 5);
  };

  return (
    <div className="w-full p-6 border border-gray-700 rounded-lg mt-4">
      {results.length > 0 &&
        results.slice(0, visibleItem).map((res) => (
          <Fragment key={res.id}>
            <TitleResultCard
              title={res.media_type === "tv" ? res.name : res.title}
              poster_path={res.poster_path}
              media_type={res.media_type}
              id={res.id}
              release_year={
                res.media_type === "tv" ? res.first_air_date : res.release_date
              }
            />
          </Fragment>
        ))}

      {visibleItem <= results.length && (
        <button
          href={"/"}
          className=" text-blue-500 px-3 py-1 hover:bg-blue-400/30 rounded-full w-fit mt-5 flex items-center gap-1"
          onClick={handleSeeMore}
        >
          More Popular Matches
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
