"use client";

import { useState } from "react";
import { PlayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import FilterOptions from "./FilterOptions";

const MobileSearchComponent = ({ searchActive, setSearchActive }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeFilter, setActiveFilter] = useState("All");

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
