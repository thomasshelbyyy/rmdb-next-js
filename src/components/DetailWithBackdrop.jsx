"use client";

import {
	ChevronRightIcon,
	ShareIcon,
	StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import {
	FilmIcon,
	PhotoIcon,
	StarIcon as StarOutline,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import BackdropGrid from "./BackdropGrid";
import BackdropCrewComponent from "./BackdropCrewComponent";
import GenreAndTagline from "./GenreAndTagline";

const DetailWithBackdrop = ({
	backdrop_path,
	media_type,
	poster_path,
	trailer,
	title,
	runtime,
	release_date,
	rate,
	directors,
	writers,
	casts,
	photos,
	videos,
	tagline,
	genres,
	totalEpisodes,
	vote_average,
	vote_count,
	lastAiredDate,
	content_rating,
	creators,
}) => {
	const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

	let hours;
	let minutes;
	if (runtime) {
		hours = Math.floor(runtime / 60);
		minutes = runtime % 60;
	}
	return (
		<div className="relative w-full">
			<div className="absolute inset-0">
				<Image
					src={`${baseImageUrl}/w500/${backdrop_path}`}
					objectFit="cover"
					priority
					layout="fill"
					alt="lakeng"
				/>
			</div>
			{/* Backdrop Blur Overlay */}
			<div className="absolute inset-0 bg-black/30 backdrop-blur-xl"></div>

			{/* Content Overlay */}
			<div className="relative z-10 h-full text-white w-full md:px-10 py-8">
				<div className="flex justify-between px-8 md:px-0">
					<div>
						{media_type === "tv" && (
							<div className="flex gap-3">
								<span>Episodes Guide</span>
								<span>{totalEpisodes}</span>
								<ChevronRightIcon className="w-5 h-5" />
							</div>
						)}
					</div>
					<div className="font-semibold flex gap-3 ">
						<div className="hidden md:flex gap-3">
							<button>Cast & Crew</button>
							<span>&bull;</span>
							<button>User Reviews</button>
							<span>&bull;</span>
						</div>
						<button>
							<ShareIcon className="w-6 h-6" />
						</button>
					</div>
				</div>

				<div className="flex justify-between px-8 md:px-0">
					<div className="">
						<h1 className="font-medium text-2xl">{title}</h1>
						<div className="flex gap-3 text-gray-300 font-medium items-center">
							{media_type === "tv" && <span>TV Series</span>}
							<span>
								{release_date.split("-")[0]}{" "}
								{lastAiredDate && `- ${lastAiredDate.split("-")[0]}`}
							</span>
							<span>&bull;</span>
							<span>{media_type === "movie" ? rate : rate.rating}</span>
							<span>&bull;</span>
							<span>
								{media_type === "movie" ? `${hours}h ${minutes}m` : runtime}
							</span>
						</div>
					</div>

					<div className="hidden md:flex gap-3 text-gray-300 py-4">
						<div>
							<div className="tracking-widest font-medium text-sm">
								TMDB RATING
							</div>
							<div className="flex items-center justify-center">
								<StarSolid className="w-7 h-7 text-yellow-500 " />
								<span className="flex flex-col justify-center gap-1 ">
									<div className="text-xl text-white">
										{vote_average}
										<span className="text-lg text-gray-300">/10</span>
									</div>
									<div className="text-sm -mt-2">{vote_count}</div>
								</span>
							</div>
						</div>
						<div>
							<div className="tracking-widest font-medium text-sm">
								YOUR RATING
							</div>
							<div className="flex items-center justify-center text-blue-500 gap-3">
								<StarOutline className="w-7 h-7  " />
								<span className="font-semibold text-xl">Rate</span>
							</div>
						</div>
					</div>
				</div>

				<BackdropGrid
					poster_path={poster_path}
					trailer={trailer}
					videos={videos}
					photos={photos}
				/>
				<div className="flex md:hidden justify-between gap-6">
					<button className="flex-1 py-2 bg-gray-400/30 backdrop-blur-sm rounded-full flex gap-1 items-center justify-center">
						<FilmIcon className=" w-5 h-5" />
						<span className="tracking-widest font-medium text-sm">
							{videos} VIDEOS
						</span>
					</button>
					<button className="flex-1 py-1 bg-gray-400/30 backdrop-blur-sm rounded-full flex gap-1 items-center justify-center">
						<PhotoIcon className=" w-5 h-5" />
						<span className="tracking-widest font-medium text-sm">
							{photos} PHOTOS
						</span>
					</button>
				</div>

				<GenreAndTagline
					poster_path={poster_path}
					genres={genres}
					tagline={tagline}
				/>

				<div className="flex gap-4 md:hidden py-3 px-7">
					<div className="flex items-center gap-1">
						<StarSolid className="w-4 h-4 text-yellow-500" />
						<span>
							{vote_average}/<span className="text-sm text-gray-300">10</span>
						</span>
						<span className="text-sm text-gray-300 pl-1">{vote_count}</span>
					</div>

					<div className="flex items-center gap-1 text-blue-600">
						<StarOutline className="w-4 h-4 " />
						<span className="text-sm font-semibold">Rate</span>
					</div>
				</div>

				<div className="border-t border-gray-300">
					<BackdropCrewComponent
						title={media_type === "movie" ? "Director" : "Creator"}
						crews={media_type === "movie" ? directors : creators}
					/>
					{media_type === "movie" && (
						<BackdropCrewComponent title={"Writer"} crews={writers} />
					)}
					<BackdropCrewComponent title={"Stars"} crews={casts} />
				</div>
			</div>
		</div>
	);
};

export default DetailWithBackdrop;
