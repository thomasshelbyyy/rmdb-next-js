"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import EpisodeDetail from "./EpisodeDetail";
import { fetchData } from "@/lib/function";

const EpisodeSpotlight = ({
	seasonDetail,
	episodeDetail,
	number_of_season,
	id,
}) => {
	const [activeSeason, setActiveSeason] = useState(1);
	const [activeEpisode, setActiveEpisode] = useState(1);
	const [currentSeasonDetail, setCurrentSeasonDetail] = useState(seasonDetail);
	const [currentEpisodeDetail, setCurrentEpisodeDetail] =
		useState(episodeDetail);

	const [isSeasonLoading, setIsSeasonLoading] = useState(false);
	const [isEpisodeLoading, setIsEpisodeLoading] = useState(false);

	const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
	const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

	const handleSeasonChange = async (season) => {
		setIsSeasonLoading(true);
		setActiveSeason(season);
		const result = await fetchData(
			`${baseUrl}/tv/${id}/season/${season}?api_key=${apiKey}`
		);
		const episodeResult = await fetchData(
			`${baseUrl}/tv/${id}/season/${season}/episode/1?api_key=${apiKey}`
		);
		setCurrentSeasonDetail(result);
		setCurrentEpisodeDetail(episodeResult);
		setIsSeasonLoading(false);
	};

	const handleEpisodeChange = async (episode) => {
		setIsEpisodeLoading(true);
		setActiveEpisode(episode);
		const episodeResult = await fetchData(
			`${baseUrl}/tv/${id}/season/${activeSeason}/episode/${episode}?api_key=${apiKey}`
		);
		setCurrentEpisodeDetail(episodeResult);
		setIsEpisodeLoading(false);
	};

	return (
		<div className="py-6 bg-white">
			<h2 className="text-2xl font-semibold pl-2  text-my-accent py-1 mt-4 mb-2 border-l-4 border-black">
				Episode Spotlight
			</h2>

			<div className="border-b border-gray-400 flex text-gray-800 gap-1 font-semibold">
				<div>Season</div>
				<div className="flex gap-1 overflow-x-auto">
					{Array.from(new Array(number_of_season), (_, i) => i).map(
						(season, index) => (
							<button
								className="relative px-3 py-1"
								onClick={() => handleSeasonChange(index + 1)}
								key={index}
							>
								S{index + 1}
								<div
									className={`absolute bottom-0 left-0 w-full h-[3px]  ${
										activeSeason === index + 1 && "bg-my-text"
									}`}
								></div>
							</button>
						)
					)}
				</div>
			</div>

			<div
				className={`transition duration-300 ${
					isSeasonLoading ? "opacity-0" : "opacity-100"
				}`}
			>
				<div className="text-gray-700 pt-2 pb-5 flex gap-3">
					<span className="">
						S{currentSeasonDetail.season_number} Episodes
					</span>
					<span className="flex gap-1 items-center">
						<StarIcon className="w-4 h-4 text-yellow-500" />
						<span>{currentSeasonDetail.vote_average} Average</span>
					</span>
				</div>

				<div className="flex max-w-full overflow-x-auto pb-1 text-black">
					{currentSeasonDetail.episodes.map((eps) => (
						<button
							className="relative px-3 py-1"
							onClick={() => handleEpisodeChange(eps.episode_number)}
							key={eps.episode_number}
						>
							E{eps.episode_number}
							<div
								className={`absolute bottom-0 left-0 w-full h-[3px]  ${
									activeEpisode === eps.episode_number && "bg-my-accent"
								}`}
							></div>
						</button>
					))}
				</div>

				<div
					className={`transition duration-300 ${
						isEpisodeLoading ? "opacity-0" : "opacity-100"
					}`}
				>
					<EpisodeDetail
						episode_number={activeEpisode}
						image_path={currentEpisodeDetail.still_path}
						overview={currentEpisodeDetail.overview}
						release_date={currentEpisodeDetail.air_date}
						season_number={activeSeason}
						title={currentEpisodeDetail.name}
						vote_average={currentEpisodeDetail.vote_average}
					/>
				</div>
			</div>
		</div>
	);
};

export default EpisodeSpotlight;
