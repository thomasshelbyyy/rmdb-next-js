"use client";

import Image from "next/image";

const Photos = ({ photos }) => {
	const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;

	return (
		<div>
			<h2 className="text-2xl font-semibold pl-2  text-my-accent py-1 mt-4 mb-2 border-l-4 border-black">
				Photos
			</h2>
			<div className="w-full flex gap-8">
				{photos.backdrops.slice(0, 2).map((photo) => (
					<Image
						src={`${baseImageUrl}/w500/${photo.file_path}`}
						alt={`photo`}
						width={100}
						height={100}
						key={photo.file_path}
						className="flex-1 rounded-lg h-auto"
					/>
				))}
			</div>
		</div>
	);
};

export default Photos;
