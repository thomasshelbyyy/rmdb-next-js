"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import noProfile from "@/assets/no-profile.png";

const FeaturedReview = ({ review }) => {
	const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const options = { month: "short", day: "numeric", year: "numeric" }; // Bulan 3 huruf
		return new Intl.DateTimeFormat("en-US", options).format(date);
	};
	return (
		<div className="py-4">
			<h2 className="text-2xl font-semibold pl-2  text-my-accent py-1 mt-4 mb-2 border-l-4 border-black">
				User Reviews
			</h2>
			<div className="p-4 w-full rounded-lg shadow-md shadow-[#b4b4b4] bg-[#f8f8f8]">
				<div className="flex justify-between">
					<div className="relative px-2 text-center w-fit font-semibold text-sm">
						<div className="z-20 relative">Featured Review</div>
						<div className="absolute z-10 w-full h-full top-0 left-0 bg-my-accent rounded-lg -skew-x-12"></div>
					</div>

					<div className="flex items-center gap-1">
						<StarIcon className="w-5 h-5 text-my-accent" />
						<span className="text-gray-700">
							{review.author_details.rating} / 10
						</span>
					</div>
				</div>

				<p className="py-3">{review.content}</p>

				<div className="pt-3 border-t border-gray-300 flex gap-3 items-center">
					<div className="flex gap-2 items-center">
						<Image
							src={
								review.author_details.avatar_path
									? `${baseImageUrl}/w500/${review.author_details.avatar_path}`
									: noProfile
							}
							alt={`${review.author} Profile picture`}
							width={100}
							height={100}
							className="w-10 h-10 rounded-full"
						/>
						<span className="text-my-text font-semibold">{review.author}</span>
					</div>
					<span>&bull;</span>
					<span>{formatDate(review.created_at)}</span>
				</div>
			</div>
		</div>
	);
};

export default FeaturedReview;
