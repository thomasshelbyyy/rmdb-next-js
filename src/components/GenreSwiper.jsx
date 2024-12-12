"use client";

import {
	animation,
	comedy,
	korean,
	scifi,
	superheros,
	western,
} from "@/assets/images";
import Genre from "./Genre";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const genres = [
	{
		imageUrl: animation,
		name: "Animation",
	},
	{
		imageUrl: comedy,
		name: "Comedy",
	},
	{
		imageUrl: korean,
		name: "Korean",
	},
	{
		imageUrl: scifi,
		name: "Science Fiction",
	},
	{
		imageUrl: superheros,
		name: "Superheroes",
	},
	{
		imageUrl: western,
		name: "Western",
	},
];

const GenreSwiper = () => {
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
						slidesPerView: 2, // 2 slide untuk layar >= 640px
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
						slidesPerView: 5, // 4 slide untuk layar >= 1024px
						spaceBetween: 20,
					},
				}}
			>
				{genres.map((genre, index) => (
					<SwiperSlide key={index} className="w-52">
						<Genre id={index} image={genre.imageUrl} name={genre.name} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default GenreSwiper;
