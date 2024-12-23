"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, BookmarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSearchComponent from "./MobileSearchComponent";
import SearchComponent from "./SearchComponent";

const Navbar = () => {
	const [sidebarActive, setSidebarActive] = useState(false);
	const [searchActive, setSearchActive] = useState(false);

	return (
		<nav className="w-full px-8 py-4 bg-my-secondary text-white flex gap-2 justify-between relative">
			<div className="flex gap-2">
				{/* Sidebar Button */}
				<button
					className="lg:hidden pr-4"
					onClick={() => setSidebarActive(true)}
				>
					<Bars3Icon className="w-5 h-5" />
				</button>

				{/* Brand Logo */}
				<button className="bg-my-accent rounded-md px-2 py-1 text-black font-bold text-lg">
					RMDb
				</button>

				{/* Menu Button */}
				<button className="hidden lg:flex gap-1 items-center font-semibold hover:bg-my-tercary px-4 py-1 rounded-full text-sm">
					<Bars3Icon className="w-5 h-5" />
					<span>Menu</span>
				</button>

				{/* Search Component */}
				<SearchComponent />
			</div>

			<div className="flex gap-3">
				{/* Mobile Search Button */}
				<button className="lg:hidden" onClick={() => setSearchActive(true)}>
					<MagnifyingGlassIcon className="w-6 h-6 text-[#b8b8b8]" />
				</button>

				{/* Bookmark Button */}
				<button className="hidden lg:flex gap-1 items-center px-4 py-1 hover:bg-my-tercary rounded-full">
					<BookmarkIcon className="w-4 h-4" />
					Bookmark
				</button>

				{/* Sign-In Button */}
				<button className="px-4 py-1 hover:bg-my-tercary rounded-full">
					Sign In
				</button>
			</div>

			{/* Sidebar */}
			<Sidebar
				setSidebarActive={setSidebarActive}
				sidebarActive={sidebarActive}
			/>

			{/* Mobile Search */}
			<MobileSearchComponent
				searchActive={searchActive}
				setSearchActive={setSearchActive}
			/>
		</nav>
	);
};

export default Navbar;
