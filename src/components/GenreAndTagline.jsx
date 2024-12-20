"use client";

import Image from "next/image";

const GenreAndTagline = ({ poster_path, genres, tagline }) => {
	const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE_URL;
	return (
		<div className="flex py-3 px-6 gap-4">
			<Image
				src={`${baseImageUrl}/w500/${poster_path}`}
				width={100}
				height={100}
				alt="poster"
				className="rounded-lg w-32 h-auto md:hidden"
			/>
			<div>
				<div className="flex flex-wrap gap-2">
					{genres.map((gnr) => (
						<button
							className="px-3 py-1 rounded-full border border-[#e1e1e1]"
							key={gnr.id}
						>
							{gnr.name}
						</button>
					))}
				</div>

				<p className="py-3 ">{tagline}</p>
			</div>
		</div>
	);
};

export default GenreAndTagline;
