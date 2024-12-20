"use client";

import {
	ChevronRightIcon,
	StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import Image from "next/image";

const EpisodeDetail = ({
	title,
	vote_average,
	season_number,
	episode_number,
	release_date,
	overview,
	image_path,
}) => {
	const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
	return (
		<div className="w-full rounded-lg border border-gray-300 bg-gray-100 shadow-md">
			<Image
				src={`${baseImageUrl}/original/${image_path}`}
				width={100}
				height={100}
				alt={`${title} image`}
				className="w-full h-auto rounded-lg"
				priority
			/>

			<div className="p-3">
				<div className="flex gap-2 items-center">
					<h2 className="text-xl font-semibold">{title}</h2>
					<ChevronRightIcon className="w-6 h-6" />
				</div>

				<div className="flex gap-2 text- items-center pt-2 pb-3">
					<div className="flex gap-1 items-center">
						<StarSolid className="w-5 h-5 text-yellow-500" />
						<span className="text-gray-500">{vote_average}</span>
					</div>

					<span>&bull;</span>

					<div className="font-semibold">
						S{season_number}.E{episode_number}
					</div>

					<span>&bull;</span>

					<div className="font-semibold ">{release_date}</div>
				</div>

				<p className="pb-8">{overview}</p>

				<div className="pt-2 pb-4 border-t border-gray-300 flex flex-col items-center gap-2">
					<div className="font-semibold">Your Rating ?/10</div>
					<div className="flex gap-1">
						{Array.from(new Array(10), (_, i) => i).map((item, index) => (
							<button className="" key={index}>
								<StarOutline className="w-7 h-7 text-my-text" />
							</button>
						))}
					</div>
					<div className="text-my-text">Sign in to give rate</div>
				</div>
			</div>
		</div>
	);
};

export default EpisodeDetail;
