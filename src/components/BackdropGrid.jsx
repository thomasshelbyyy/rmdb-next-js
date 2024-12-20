"use client";

import { FilmIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ReactPlayer from "react-player";

const BackdropGrid = ({ poster_path, trailer, videos, photos }) => {
	const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
	return (
		<div className="grid grid-cols-12 w-full gap-3 pt-3">
			{/* Komponen 1: Poster dengan aspect ratio 2/3 */}
			<div className="hidden md:block md:col-span-3 aspect-w-2 aspect-h-3">
				<Image
					src={`${baseImageUrl}/w500/${poster_path}`}
					objectFit="cover"
					priority
					layout="fill"
					alt="poster"
					className="rounded-lg"
				/>
			</div>

			{/* Komponen 2: Video Trailer dengan aspect ratio 16/9 */}
			<div className="col-span-12 md:col-span-7 bg-black aspect-w-16 aspect-h-9 flex items-center rounded-lg relative">
				{/* <div className="w-full h-full bg-green-500"></div> */}
				<ReactPlayer
					url={`https://youtube.com/watch?v=${trailer.key}`}
					width="100%"
					height="auto"
					className="absolute top-0 left-0 w-full h-full object-contain"
				/>
			</div>

			{/* Komponen 3 dan 4: Button dengan aspect ratio 1/1 */}
			<div className="hidden md:block md:col-span-2 ">
				<div className="w-full h-full flex flex-col gap-2 justify-center">
					<div className="w-full h-auto aspect-w-1 aspect-h-1 bg-gray-400/30 backdrop-blur-sm rounded-lg">
						<div className="w-full h-full flex flex-col justify-center items-center gap-1 text-gray-300">
							<FilmIcon className=" w-12 h-12" />
							<span className="tracking-widest font-medium text-sm">
								{videos} VIDEOS
							</span>
						</div>
					</div>
					<div className="w-full h-auto aspect-w-1 aspect-h-1 bg-gray-400/30 backdrop-blur-sm rounded-lg">
						<div className="w-full h-full flex flex-col justify-center items-center gap-1 text-gray-300">
							<PhotoIcon className=" w-12 h-12" />
							<span className="tracking-widest font-medium text-sm">
								{photos} PHOTOS
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BackdropGrid;
