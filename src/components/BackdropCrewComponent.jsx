"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

const BackdropCrewComponent = ({ title, crews }) => {
	return (
		<button className="flex justify-between py-3 px-6 border-b border-gray-300 w-full items-center">
			<div className="flex flex-col md:flex-row gap-1 text-blue-500">
				<span className="text-white font-semibold pr-1 w-20 text-left">
					{title}
				</span>
				<div className="flex gap-x-3 flex-wrap">
					{crews.slice(0, 3).map((crew, index) => (
						<Fragment key={crew.id}>
							<span>{crew.name}</span>
							{index < crews.slice(0, 3).length - 1 && (
								<span className="text-white">&bull;</span>
							)}
						</Fragment>
					))}
				</div>
			</div>

			<ChevronRightIcon className="w-5 h-5 text-white" />
		</button>
	);
};

export default BackdropCrewComponent;
