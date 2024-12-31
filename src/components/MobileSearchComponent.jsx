"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import FilterOptions from "./FilterOptions";
import useDebounce from "@/lib/hooks/useDebounce";
import { fetchData } from "@/lib/function";
import { FadeLoader } from "react-spinners";
import SearchResultCard from "./SearchResultCard";
import Link from "next/link";

const MobileSearchComponent = ({ searchActive, setSearchActive }) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerms, setSearchTerms] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resultActive, setResultActive] = useState(false);

  const filterRef = useRef(null);

  const debounceSearchTerms = useDebounce(searchTerms, 300);

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const res = await fetchData(
          `${baseUrl}/search/multi?api_key=${apiKey}&query=${debounceSearchTerms}`
        );
        setResults(res.results);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [debounceSearchTerms]);

  console.log({ results });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (filter) => {
    setActiveFilter(filter);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Search Bar */}
      <div
        className={`fixed top-0 left-0 w-full py-6 text-lg px-3 flex gap-6 bg-[#1e1e1e] text-white items-center lg:hidden z-50 ${
          searchActive ? "translate-y-0" : "-translate-y-40"
        } transition duration-200`}
      >
        {resultActive && searchTerms.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-[#1e1e1e]">
            {isLoading ? (
              <div className="w-full h-52 flex justify-center items-center">
                <FadeLoader color="#fff" height={7} radius={50} width={7} />
              </div>
            ) : results.length > 0 ? (
              <>
                {results.slice(0, 3).map((result, index) => (
                  <SearchResultCard
                    key={index}
                    image_path={
                      result.media_type === "person"
                        ? result.profile_path
                        : result.poster_path
                    }
                    media_type={result.media_type}
                    release_year={
                      result.media_type !== "person" &&
                      result.media_type === "movie"
                        ? result.release_date
                        : result.first_air_date
                    }
                    title={
                      result.media_type === "person"
                        ? result.name
                        : result.media_type === "movie"
                        ? result.title
                        : result.name
                    }
                    vote_average={
                      result.media_type !== "person" && result.vote_average
                    }
                    known_for={
                      result.media_type === "person" && result.known_for[0]
                    }
                    id={result.id}
                  />
                ))}
                <Link href="/" className="p-3">
                  more result
                </Link>
              </>
            ) : (
              <div className="text-white text-center">No results found.</div>
            )}
          </div>
        )}
        <button
          onClick={toggleMenu}
          className="flex px-2 hover:bg-[#424242] gap-2 items-center border-r-2 border-black"
        >
          <span>{activeFilter}</span>
          <PlayIcon className="w-4 h-4 rotate-90" />
        </button>
        <input
          type="text"
          className="focus:outline-none bg-transparent flex-grow flex-1"
          placeholder="Search RMDb"
          onChange={(e) => setSearchTerms(e.target.value)}
          onFocus={() => setResultActive(true)} // Aktifkan hasil jika input fokus
          onBlur={() => setTimeout(() => setResultActive(false), 200)} // Hilangkan hasil setelah kehilangan fokus
        />
        <button onClick={() => setSearchActive(false)}>
          <XMarkIcon className="w-7 h-7" />
        </button>
      </div>

      {/* Slide-Up Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed bottom-0 left-0 w-full bg-[#1e1e1e] text-white py-6 px-4 transition-transform duration-300 ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <FilterOptions
            activeFilter={activeFilter}
            handleClick={handleClick}
          />
        </div>
        <button className="absolute top-0 right-0 p-"></button>
      </div>
    </>
  );
};

export default MobileSearchComponent;
