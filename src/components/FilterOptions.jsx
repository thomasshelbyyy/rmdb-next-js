"use client";

import {
	BuildingOffice2Icon,
	FilmIcon,
	MagnifyingGlassIcon,
	TvIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";

const FilterOptions = ({ activeFilter, handleClick }) => {
	return (
		<ul className="w-full z-50">
			<li className="w-full  ">
				<button
					className={`w-full flex py-2 px-3 gap-4 items-center tracking-wide group transition duration-200 ${
						activeFilter === "All" ? "text-my-accent" : "hover:bg-[#323232]"
					}`}
					onClick={() => handleClick("All")}
				>
					<MagnifyingGlassIcon
						className={`w-5 h-5 ${
							activeFilter === "All"
								? "text-my-accnt"
								: "text-gray-500 group-hover:text-white transition duration-200"
						}`}
					/>
					<span>All</span>
				</button>
			</li>
			<li className="w-full  ">
				<button
					className={`w-full flex py-2 px-3 gap-4 items-center tracking-wide group transition duration-200 ${
						activeFilter === "Titles" ? "text-my-accent" : "hover:bg-[#323232]"
					}`}
					onClick={() => handleClick("Titles")}
				>
					<FilmIcon
						className={`w-5 h-5 ${
							activeFilter === "Titles"
								? "text-my-accnt"
								: "text-gray-500 group-hover:text-white transition duration-200"
						}`}
					/>
					<span>Titles</span>
				</button>
			</li>
			<li className="w-full  ">
				<button
					className={`w-full flex py-2 px-3 gap-4 items-center tracking-wide group transition duration-200 ${
						activeFilter === "Episodes"
							? "text-my-accent"
							: "hover:bg-[#323232]"
					}`}
					onClick={() => handleClick("Episodes")}
				>
					<TvIcon
						className={`w-5 h-5 ${
							activeFilter === "Episodes"
								? "text-my-accnt"
								: "text-gray-500 group-hover:text-white transition duration-200"
						}`}
					/>
					<span>TV Episodes</span>
				</button>
			</li>
			<li className="w-full  ">
				<button
					className={`w-full flex py-2 px-3 gap-4 items-center tracking-wide group transition duration-200 ${
						activeFilter === "Celebs" ? "text-my-accent" : "hover:bg-[#323232]"
					}`}
					onClick={() => handleClick("Celebs")}
				>
					<UserGroupIcon
						className={`w-5 h-5 ${
							activeFilter === "Celebs"
								? "text-my-accnt"
								: "text-gray-500 group-hover:text-white transition duration-200"
						}`}
					/>
					<span>Celebs</span>
				</button>
			</li>
			<li className="w-full  ">
				<button
					className={`w-full flex py-2 px-3 gap-4 items-center tracking-wide group transition duration-200 ${
						activeFilter === "Companies"
							? "text-my-accent"
							: "hover:bg-[#323232]"
					}`}
					onClick={() => handleClick("Companies")}
				>
					<BuildingOffice2Icon
						className={`w-5 h-5 ${
							activeFilter === "Companies"
								? "text-my-accnt"
								: "text-gray-500 group-hover:text-white transition duration-200"
						}`}
					/>
					<span>Companies</span>
				</button>
			</li>
		</ul>
	);
};

export default FilterOptions;
