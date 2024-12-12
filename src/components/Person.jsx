"use client";

import Image from "next/image";
import noProfile from "@/assets/no-profile.png";

const Person = ({ profilePath, name }) => {
	const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
	return (
		<div className="group flex flex-col items-center space-y-2">
			<div className="relative w-40 h-40 rounded-full overflow-hidden bg-white">
				<Image
					alt={`${name} Picture`}
					width={160}
					height={160}
					src={profilePath ? `${baseImageUrl}/w185/${profilePath}` : noProfile}
					className="object-cover w-full h-full group-hover:opacity-70"
				/>
			</div>
			<span className="text-lg text-white font-medium text-center">{name}</span>
		</div>
	);
};

export default Person;
