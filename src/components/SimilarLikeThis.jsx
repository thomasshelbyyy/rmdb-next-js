"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Movie from "./Movie";

const SimilarLikeThis = ({ movies }) => {
	return (
		<div className="py-4">
			<h2 className="text-2xl font-semibold pl-2  text-my-accent py-1 mt-4 mb-2 border-l-4 border-black">
				More like this
			</h2>

			<Swiper
				modules={[FreeMode]}
				slidesPerView="auto"
				spaceBetween={10}
				freeMode={{ enabled: true }}
				breakpoints={{
					0: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					640: {
						slidesPerView: 3, // 2 slide untuk layar >= 640px
						spaceBetween: 10, // Jarak antar slide
					},
					768: {
						slidesPerView: 3, // 3 slide untuk layar >= 768px
						spaceBetween: 15,
					},
					850: {
						slidesPerView: 4, // 3 slide untuk layar >= 768px
						spaceBetween: 15,
					},
					1024: {
						slidesPerView: 4, // 4 slide untuk layar >= 1024px
						spaceBetween: 20,
					},
				}}
			>
				{movies.length > 0 &&
					movies.map((movie, index) => (
						<SwiperSlide key={index} className="w-52">
							<Movie
								poster_path={movie.poster_path}
								rating={movie.vote_average}
								title={movie.media_type === "movie" ? movie.title : movie.name}
								id={movie.id}
								media_type={movie.media_type}
								theme={"white"}
							/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default SimilarLikeThis;
