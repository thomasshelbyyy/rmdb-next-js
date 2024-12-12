"use client";

import { useEffect, useRef, useState } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { FilmIcon, TvIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ sidebarActive, setSidebarActive }) => {
	const [openMenu, setOpenMenu] = useState(null); // State untuk melacak menu yang aktif
	const sidebarRef = useRef(null);

	const toggleMenu = (menuName) => {
		setOpenMenu(openMenu === menuName ? null : menuName); // Jika menu aktif, tutup; jika tidak, buka
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				setSidebarActive(false);
			}
		};

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				setSidebarActive(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("keydown", handleEscape);
		};
	}, [setSidebarActive]);

	return (
		<div
			ref={sidebarRef}
			className={`fixed top-0 left-0 h-screen lg:hidden w-64 bg-[#1e1e1e] text-gray-300 text-lg font-medium transition duration-200 z-50 ${
				sidebarActive ? "translate-x-0" : "-translate-x-96"
			}`}
		>
			<button
				className="right-0 m-4 float-right"
				onClick={() => setSidebarActive(false)}
			>
				<XMarkIcon className="w-8 h-8 text-gray-300" />
			</button>
			<ul className="w-full space-y-4">
				{/* Movies Menu */}
				<li>
					<button
						onClick={() => toggleMenu("movies")}
						className={`flex items-center justify-between w-full text-left px-4 ${
							openMenu === "movies" ? "text-my-accent" : "hover:text-white"
						} `}
					>
						<div className="flex gap-2">
							<FilmIcon className="w-6 h-6" />
							<span>Movies</span>
						</div>
						<ChevronDownIcon
							className={`w-5 h-5 transform transition-transform ${
								openMenu === "movies" ? "rotate-180" : "rotate-0"
							}`}
						/>
					</button>
					{/* Submenu */}
					{openMenu === "movies" && (
						<ul className="mt-2 space-y-2 w-full">
							<li className="w-full">
								<a
									href="#"
									className="block hover:bg-my-tercary w-full py-2 pl-9"
								>
									Action
								</a>
							</li>
							<li className="w-full">
								<a
									href="#"
									className="block hover:bg-my-tercary w-full py-2 pl-9"
								>
									Drama
								</a>
							</li>
							<li className="w-full">
								<a
									href="#"
									className="block hover:bg-my-tercary w-full py-2 pl-9"
								>
									Comedy
								</a>
							</li>
						</ul>
					)}
				</li>

				<li>
					<button
						onClick={() => toggleMenu("tv")}
						className={`flex items-center justify-between w-full text-left px-4 ${
							openMenu === "tv" ? "text-my-accent" : "hover:text-white"
						} `}
					>
						<div className="flex gap-2">
							<TvIcon className="w-6 h-6" />
							<span>TV Series</span>
						</div>
						<ChevronDownIcon
							className={`w-5 h-5 transform transition-transform ${
								openMenu === "tv" ? "rotate-180" : "rotate-0"
							}`}
						/>
					</button>
					{/* Submenu */}
					{openMenu === "tv" && (
						<ul className="mt-2 space-y-2 w-full">
							<li className="w-full">
								<a
									href="#"
									className="block hover:bg-my-tercary w-full py-2 pl-9"
								>
									Action
								</a>
							</li>
							<li className="w-full">
								<a
									href="#"
									className="block hover:bg-my-tercary w-full py-2 pl-9"
								>
									Drama
								</a>
							</li>
							<li className="w-full">
								<a
									href="#"
									className="block hover:bg-my-tercary w-full py-2 pl-9"
								>
									Comedy
								</a>
							</li>
						</ul>
					)}
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
