"use client";

import React, { useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";

const Videos = ({ videos }) => {
	// console.log({ filteredVideos: videos });
	return (
		<div>
			<h2 className="text-2xl font-semibold pl-2  text-my-accent py-1 mt-4 mb-2 border-l-4 border-black">
				Videos
			</h2>

			<div className="w-full flex gap-8">
				{videos.length > 0 &&
					videos.slice(0, 2).map((vid) => (
						<div
							className="flex-1 bg-black aspect-w-16 aspect-h-9 flex items-center rounded-lg relative"
							key={vid.id}
						>
							{/* <div className="w-full h-full bg-green-500"></div> */}
							<ReactPlayer
								url={`https://youtube.com/watch?v=${vid.key}`}
								width="100%"
								height="auto"
								className="absolute top-0 left-0 w-full h-full object-contain"
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Videos;
