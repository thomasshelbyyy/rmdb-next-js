"use client";

import Image from "next/image";
import noProfile from "@/assets/no-profile.png";
import Link from "next/link";

const CastWithRole = ({ name, character, profile_path, id }) => {
	const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
	return (
		<Link
			href={`/person/${id}`}
			className="w-full flex flex-col md:flex-row gap-2 md:gap-6 items-center mb-2 hover:bg-gray-100"
		>
			<Image
				src={profile_path ? `${baseImageUrl}/w500/${profile_path}` : noProfile}
				alt={`${name} picture`}
				width={100}
				height={100}
				className="w-32 h-32 md:w-20 md:h-20 bg-gray-300 rounded-full object-cover"
			/>
			<div>
				<div className="font-bold">{name}</div>
				<div className="text-gray-700 text-sm text-center md:text-left">
					{character}
				</div>
			</div>
		</Link>
	);
};

export default CastWithRole;
