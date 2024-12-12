"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, BookmarkIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import FilterOptions from "./FilterOptions";
import Sidebar from "./Sidebar";
import MobileSearchComponent from "./MobileSearchComponent";

const Navbar = () => {
	const [activeFilter, setActiveFilter] = useState("All");
	const [filterOptionsActive, setFilterOptionsActive] = useState(false);
	const [sidebarActive, setSidebarActive] = useState(false);
	const [searchActive, setSearchActive] = useState(false);
	const filterRef = useRef(null);

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
	};
	return (
		<nav className="w-full px-8 py-4 bg-my-secondary text-white flex gap-2 justify-between relative">
			<div className="flex gap-2">
				<button
					className="lg:hidden pr-4"
					onClick={() => setSidebarActive(true)}
				>
					<Bars3Icon className="w-5 h-5" />
				</button>
				<button className="bg-my-accent rounded-md px-2 py-1 text-black font-bold text-lg">
					RMDb
				</button>
				<button className="hidden lg:flex gap-1 items-center font-semibold hover:bg-my-tercary px-4 py-1 rounded-full text-sm">
					<Bars3Icon className="w-5 h-5" />
					<span>Menu</span>
				</button>
				<div
					className="hidden lg:flex text-[#101010] bg-white items-center rounded-md relative z-50"
					ref={filterRef}
				>
					<button
						className="flex gap-1 items-center px-3 py-1 rounded-l-md border-r border-black hover:bg-[#e9e9e9] "
						onClick={() => setFilterOptionsActive((prev) => !prev)}
					>
						{activeFilter} <PlayIcon className="w-3 h-3 rotate-90" />
					</button>
					<div className="flex items-center pr-3">
						<input
							type="text "
							className="focus:outline-none text-sm w-96 px-3 py-1"
							placeholder="search RMDb"
						/>
						<MagnifyingGlassIcon className="w-6 h-6" />
					</div>
					{filterOptionsActive && (
						<div className="absolute w-60 bg-[#1e1e1e] shadow-md left-0 -bottom-56 text-white py-2 rounded-md">
							<FilterOptions
								activeFilter={activeFilter}
								handleClick={handleClick}
							/>
						</div>
					)}
				</div>
			</div>

			<div className="flex gap-3">
				<button className="lg:hidden" onClick={() => setSearchActive(true)}>
					<MagnifyingGlassIcon className="w-6 h-6 text-[#b8b8b8]" />
				</button>
				<button className="hidden lg:flex gap-1 items-center px-4 py-1 hover:bg-my-tercary rounded-full">
					<BookmarkIcon className="w-4 h-4" />
					Bookmark
				</button>
				<button className="px-4 py-1 hover:bg-my-tercary rounded-full">
					Sign In
				</button>
			</div>

			<Sidebar
				setSidebarActive={setSidebarActive}
				sidebarActive={sidebarActive}
			/>
			<MobileSearchComponent
				searchActive={searchActive}
				setSearchActive={setSearchActive}
			/>
		</nav>
	);
};

export default Navbar;
