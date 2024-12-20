import {
	BookmarkIcon,
	PlusIcon,
	StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import { PlayIcon, StarIcon as StarOutline } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const Movie = ({ title, rating, poster_path, id, media_type, theme }) => {
	const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
	return (
		<div
			className={`w-36 lg:w-48 rounded-r-md text-sm md:text-base rounded-bl-md ${
				theme === "black" ? "bg-[#181818]" : "bg-[#d7d7d7]"
			} relative shadow-md shadow-[#1b1b1b]`}
		>
			<button
				className={`absolute top-0 left-0  ${
					theme === "black" ? "text-white" : "text-[#181818]"
				} group `}
			>
				<BookmarkIcon className="w-9 h-9 group-hover:scale-y-150 transition duration-200 origin-top" />
				<PlusIcon
					className={`w-5 h-5 absolute top-2 left-2  ${
						theme === "black" ? "text-black" : "text-white"
					}`}
				/>
			</button>
			<div
				className={`w-full  ${
					theme === "black" ? "bg-gray-950" : "bg-[#d7d7d7]"
				} rounded-tr-md`}
			>
				<Image
					src={poster_path && `${baseImageUrl}/w185/${poster_path}`}
					width={100}
					height={100}
					alt={`${title} Poster`}
					className="w-full h-auto overflow-y-hidden rounded-tr-md"
				/>
			</div>
			<div className="px-3 py-2">
				<div className="flex gap-2 items-center">
					<div className="flex gap-1 items-center">
						<StarSolid className="w-4 h-4 text-yellow-400" />
						<span>{rating.toFixed(1)}</span>
					</div>

					<button
						className={`px-3 py-1 hover:bg-white/40 rounded-md text-blue-500  ${
							theme === "black" ? "hover:text-white" : "hover:text-black"
						} transition duration-200`}
					>
						<StarOutline className=" w-5 h-5 " />
					</button>
				</div>

				<Link
					href={`/detail/${media_type === "movie" ? "movie" : "tv"}/${id}`}
					className="text-lg font-medium hover:underline mt-3 truncate max-w-[176px] block"
				>
					{title}
				</Link>

				<button className="w-full py-1 bg-[#595959] hover:bg-[#777777] rounded-full text-center mt-3 flex items-center justify-center gap-1 text-blue-400">
					<span>
						<PlusIcon className="w-5 h-5" />
					</span>{" "}
					watch list
				</button>
				<button className="w-full py-1 text-center mt-1 flex items-center justify-center gap-1">
					<span>
						<PlayIcon className="w-5 h-5" />
					</span>{" "}
					trailer
				</button>
			</div>
		</div>
	);
};

export default Movie;
