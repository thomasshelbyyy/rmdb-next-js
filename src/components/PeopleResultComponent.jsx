"use client";

import PersonResultCard from "./PersonResultCard";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

export default function PeopleResultComponent({ results }) {
  const [visibleItem, setVisibleItem] = useState(5);

  const handleSeeMore = () => {
    setVisibleItem((prev) => prev + 5);
  };

  return (
    <div className="w-full p-6 border border-gray-700 rounded-lg mt-4">
      {results.length > 0 &&
        results.slice(0, visibleItem).map((res) => (
          <Fragment key={res.id}>
            <PersonResultCard
              id={res.id}
              known_for={res.known_for}
              name={res.name}
              profile_path={res.profile_path}
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
