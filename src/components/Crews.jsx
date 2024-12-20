import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

const Crews = ({ directors, writers, media_type, creators }) => {
	return (
		<div className="">
			<div className="flex justify-between py-3 border-y border-gray-300 w-full">
				<div className="flex flex-col md:flex-row gap-1 md:gap-3 text-blue-500">
					<span className="text-black font-semibold pr-1 w-20 text-left">
						{media_type === "movie" ? "Director" : "Creators"}
					</span>
					<div className="flex gap-2">
						{directors.slice(0, 3).map((crew, index) => (
							<Fragment key={crew.id}>
								<span>{crew.name}</span>
								{index < 2 && <span className="text-black">&bull;</span>}
							</Fragment>
						))}
					</div>
				</div>
			</div>

			{media_type === "movie" && (
				<button className="flex justify-between py-3 border-b border-gray-300 w-full">
					<div className="flex flex-col md:flex-row gap-1 md:gap-3 text-blue-500">
						<span className="text-black font-semibold pr-1 w-20 text-left">
							Writer
						</span>
						<div className="flex gap-2">
							{writers.slice(0, 3).map((crew, index) => (
								<Fragment key={crew.id}>
									<span>{crew.name}</span>
									{index < 2 && <span className="text-black">&bull;</span>}
								</Fragment>
							))}
						</div>
					</div>

					<ChevronRightIcon className="w-5 h-5 text-black" />
				</button>
			)}

			<button className="flex justify-between py-3 border-b border-gray-300 w-full text-black">
				<span className="font-semibold">All cast & crew</span>

				<ChevronRightIcon className="w-5 h-5 text-black" />
			</button>
		</div>
	);
};

export default Crews;
