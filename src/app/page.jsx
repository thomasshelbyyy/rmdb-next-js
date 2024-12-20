import Banner from "@/components/Banner";
import CelebrityList from "@/components/CelebrityList";
import GenreSwiper from "@/components/GenreSwiper";
import MovieList from "@/components/MovieList";

export default async function Home() {
	const baseUrl = process.env.TMDB_BASE_URL;
	const apiKey = process.env.TMDB_API_KEY;
	const result = await fetchData(
		`${baseUrl}/trending/all/day?api_key=${apiKey}`
	);
	const popularMovies = await fetchData(
		`${baseUrl}/trending/all/week?api_key=${apiKey}`
	);
	const popularCelebrities = await fetchData(
		`${baseUrl}/person/popular?api_key=${apiKey}`
	);
	const popularAnime =
		await fetchData(`${baseUrl}/discover/tv?api_key=${apiKey}&with_genres=16
`);
	// console.log({ popularMovies });
	return (
		<main className="w-full min-h-screen bg-black pt-4 text-white">
			<Banner result={result} />

			<div className="px-6 md:px-14 bg-my-secondary lg:bg-black shadow-md py-4">
				<h2 className="text-2xl font-semibold pl-2  text-my-accent py-1 mt-4 mb-2 border-l-4 border-white">
					Top 10 pick this week
				</h2>
				<MovieList movies={popularMovies} theme={"black"} />
			</div>
			<div className="px-6 md:px-14 mt-8">
				<h2 className="text-2xl font-semibold pl-2 text- py-1 mt-4 mb-2 border-l-4 border-my-accent">
					Popular Celebrities this week
				</h2>
				<CelebrityList celebrities={popularCelebrities} />
			</div>
			<div className="px-6 md:px-14 mt-8 bg-my-secondary lg:bg-black shadow-md py-4">
				<h2 className="text-2xl font-semibold pl-2 text-my-accent py-1 mt-4 mb-2 border-l-4 border-white">
					Animations for kids
				</h2>
				<MovieList movies={popularAnime} theme={"black"} />
			</div>
			<div className="px-6 md:px-14 mt-8">
				<h2 className="text-2xl font-semibold pl-2 text-my-accent py-1 mt-4 mb-2 border-l-4 border-white">
					Discover your favorite genre
				</h2>
				<GenreSwiper />
			</div>
		</main>
	);
}

const fetchData = async (url) => {
	const res = await fetch(url);
	const result = await res.json();
	return result.results;
};
