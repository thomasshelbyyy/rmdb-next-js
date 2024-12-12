"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Movie from "./Movie";

const MovieList = ({ movies }) => {
	return (
		<div className="w-full">
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
						slidesPerView: 4, // 3 slide untuk layar >= 768px
						spaceBetween: 15,
					},
					850: {
						slidesPerView: 5, // 3 slide untuk layar >= 768px
						spaceBetween: 15,
					},
					1024: {
						slidesPerView: 6, // 4 slide untuk layar >= 1024px
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
							/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default MovieList;
