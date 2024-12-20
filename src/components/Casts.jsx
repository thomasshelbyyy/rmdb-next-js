"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import CastWithRole from "./CastWithRole";
import { Fragment } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Casts = ({ casts, content_id }) => {
	return (
		<div>
			<Link
				href={`/all-casts/${content_id}`}
				className="text-2xl font-semibold pl-2  text-my-accent py-1 mt-4 mb-2 border-l-4 border-black flex gap-2 group items-center"
			>
				<span>Casts</span>
				<ChevronRightIcon className="w-6 h-6 text-black group-hover:text-my-accent transition duration-200" />
			</Link>

			<div className="lg:hidden">
				<Swiper
					modules={[FreeMode]}
					freeMode={{ enabled: true }}
					slidesPerView={2}
				>
					{casts.slice(0, 16).map((cast) => (
						<SwiperSlide key={cast.id}>
							<CastWithRole
								character={cast.character}
								name={cast.name}
								profile_path={cast.profile_path}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="hidden md:grid grid-cols-2 lg:grid-cols-3">
				{casts.slice(0, 16).map((cast) => (
					<Fragment key={cast.id}>
						<CastWithRole
							character={cast.character}
							name={cast.name}
							profile_path={cast.profile_path}
							id={cast.id}
						/>
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default Casts;
