"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

const Details = ({
	release_date,
	origin_country,
	official_site,
	language,
	production_companies,
}) => {
	countries.registerLocale(enLocale);

	return (
		<div className="py-4 bg-white">
			<h2 className="text-2xl font-semibold pl-2  text-my-accent py-1 mt-4 mb-2 border-l-4 border-black">
				Detail
			</h2>

			<div className="py-2 border-t border-gray-300 flex justify-between px-2  items-center">
				<div className="flex flex-col md:flex-row">
					<span className="font-semibold w-48">Release Date</span>
					<div className="text-my-text font-medium">
						{new Date(release_date).toLocaleDateString("en-US", {
							day: "2-digit",
							month: "long",
							year: "numeric",
						})}
					</div>
				</div>

				<ChevronRightIcon className="w-5 h-5" />
			</div>

			<div className="py-2 border-t border-gray-300 flex justify-between px-2">
				<div className="flex flex-wrap flex-col md:flex-row">
					<span className="font-semibold w-48">Countries of origin</span>
					<div className="flex gap-2">
						{origin_country.map((coun, index) => (
							<Fragment key={index}>
								<span className="text-my-text">
									{countries.getName(coun, "en")}
								</span>
								{index < origin_country.length - 1 && (
									<span className="">&bull;</span>
								)}
							</Fragment>
						))}
					</div>
				</div>
			</div>

			<div className="py-2 border-t border-gray-300 flex justify-between px-2">
				<div className="flex gap-1 flex-wrap flex-col md:flex-row">
					<span className="font-semibold w-48">Official Site</span>
					<span className="text-my-text font-medium flex gap-1 items-center">
						{official_site}
						<ArrowTopRightOnSquareIcon className="w-4 h-4" />
					</span>
				</div>
			</div>

			<div className="py-2 border-t border-gray-300 flex justify-between px-2">
				<div className="flex flex-wrap flex-col md:flex-row">
					<span className="font-semibold w-48">Language</span>
					<div className="flex gap-2 flex-wrap">
						{language.map((lang, index) => (
							<Fragment key={index}>
								<span className="text-my-text">{lang.english_name}</span>
								{index < language.length - 1 && (
									<span className="">&bull;</span>
								)}
							</Fragment>
						))}
					</div>
				</div>
			</div>
			<div className="py-2 border-t border-gray-300 flex justify-between px-2 items-center">
				<div className="flex flex-col md:flex-row">
					<span className="font-semibold w-48">Production Company</span>
					<div className="flex gap-2 flex-wrap">
						{production_companies.map((comp, index) => (
							<Fragment key={index}>
								<span className="text-my-text">{comp.name}</span>
								{index < production_companies.length - 1 && (
									<span className="">&bull;</span>
								)}
							</Fragment>
						))}
					</div>
				</div>

				<div>
					<ChevronRightIcon className="w-5 h-5" />
				</div>
			</div>
		</div>
	);
};

export default Details;
