"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import { FireIcon } from "@heroicons/react/24/solid";

const Banner = ({ result }) => {
	return (
		<div className="w-full h-72 lg:h-96 lg:px-14">
			<Swiper
				modules={[Pagination, A11y, Autoplay]}
				spaceBetween={50}
				slidesPerView={1}
				autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
				pagination={{ clickable: true }}
				onSlideChange={() => console.log("slide change")}
				onSwiper={(swiper) => console.log(swiper)}
				className="w-full h-full"
			>
				{result &&
					result.slice(0, 3).map((res, index) => (
						<SwiperSlide
							className="w-full h-full bg-gray-500 lg:rounded-lg relative"
							style={{
								backgroundImage: `url(http://image.tmdb.org/t/p/w780${res.backdrop_path})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
							key={res.id}
						>
							<div className="absolute w-full h-full bg-gray-900/40 p-8">
								<div className="absolute bottom-9">
									<p className="text-2xl text-white font-semibold">
										{res.media_type === "movie" ? res.title : res.name}
									</p>
									<div className="px-3 py-1 bg-white text-black w-fit rounded-full mt-2 ml-2">
										watch now
									</div>
								</div>
								<div className="w-fit absolute right-8">
									<FireIcon className="w-10 h-10 text-xl text-red-500 p-1 bg-white rounded-full " />
								</div>
							</div>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default Banner;
