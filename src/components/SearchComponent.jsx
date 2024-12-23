"use client";

import { MagnifyingGlassIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";
import FilterOptions from "./FilterOptions";
import { FadeLoader } from "react-spinners";
import useDebounce from "@/lib/hooks/useDebounce";
import { fetchData } from "@/lib/function";
import SearchResultCard from "./SearchResultCard";

export default function SearchComponent() {
	const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
	const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

	const [activeFilter, setActiveFilter] = useState("All");
	const [filterOptionsActive, setFilterOptionsActive] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerms, setSearchTerms] = useState("");
	const [results, setResults] = useState([]);
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

	// Close filter dropdown when clicking outside or pressing Escape
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (filterRef.current && !filterRef.current.contains(event.target)) {
				setFilterOptionsActive(false);
			}
		};

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				setFilterOptionsActive(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, []);

	const handleClick = (filter) => {
		setActiveFilter(filter);
		setFilterOptionsActive(false);
	};

	return (
		<div
			className="hidden lg:flex text-[#101010] bg-white items-center rounded-md relative z-50"
			ref={filterRef}
		>
			{/* Filter Dropdown */}
			<button
				className="flex gap-1 items-center px-3 py-1 rounded-l-md border-r border-black hover:bg-[#e9e9e9]"
				onClick={() => setFilterOptionsActive((prev) => !prev)}
			>
				{activeFilter} <PlayIcon className="w-3 h-3 rotate-90" />
			</button>

			{/* Search Input */}
			<div className="flex items-center pr-3">
				<input
					type="text"
					className="focus:outline-none text-sm w-96 px-3 py-1"
					placeholder="Search RMDb"
					value={searchTerms}
					onChange={(e) => setSearchTerms(e.target.value)}
					onFocus={() => setResultActive(true)} // Aktifkan hasil jika input fokus
					onBlur={() => setTimeout(() => setResultActive(false), 200)} // Hilangkan hasil setelah kehilangan fokus
				/>

				<MagnifyingGlassIcon className="w-6 h-6" />
			</div>

			{/* Filter Options */}
			{filterOptionsActive && (
				<div className="absolute w-60 bg-[#1e1e1e] shadow-md left-0 top-full text-white py-2 rounded-md">
					<FilterOptions
						activeFilter={activeFilter}
						handleClick={handleClick}
					/>
				</div>
			)}

			{resultActive && searchTerms.length > 0 && (
				<div className="absolute w-full p-3 bg-[#1e1e1e] left-0 top-10 rounded-lg">
					{isLoading ? (
						<div className="w-full h-52 flex justify-center items-center">
							<FadeLoader color="#fff" height={7} radius={50} width={7} />
						</div>
					) : results.length > 0 ? (
						// Tampilkan hasil pencarian
						results
							.slice(0, 8)
							.map((result, index) => (
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
								/>
							))
					) : (
						// Pesan jika tidak ada hasil
						<div className="text-white text-center">No results found.</div>
					)}
				</div>
			)}

			{}
		</div>
	);
}
