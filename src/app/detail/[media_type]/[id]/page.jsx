import Casts from "@/components/Casts";
import Crews from "@/components/Crews";
import Details from "@/components/Details";
import DetailWithBackdrop from "@/components/DetailWithBackdrop";
import EpisodeSpotlight from "@/components/EpisodeSpotlight";
import FeaturedReview from "@/components/FeaturedReview";
import Photos from "@/components/Photos";
import SimilarLikeThis from "@/components/SimilarLikeThis";
import Videos from "@/components/Videos";

const baseUrl = process.env.TMDB_BASE_URL;
const apiKey = process.env.TMDB_API_KEY;

export async function generateMetadata({ params }) {
	const id = (await params).id;
	const mediaType = (await params).media_type;

	const detail = await fetchData(
		`${baseUrl}/${mediaType}/${id}?api_key=${apiKey}`
	);

	return {
		title: `${
			mediaType === "movie" ? detail.title : detail.name
		} Detail | RMDB`,
	};
}

const DetailPage = async ({ params }) => {
	const id = (await params).id;
	const mediaType = (await params).media_type;
	const detail = await fetchData(
		`${baseUrl}/${mediaType}/${id}?api_key=${apiKey}`
	);

	const videos = await fetchData(
		`${baseUrl}/${mediaType}/${id}/videos?api_key=${apiKey}`
	);
	const trailer = videos.results.find(
		(video) => video.type === "Trailer" && video.site === "YouTube"
	);

	const photos = await fetchData(
		`${baseUrl}/${mediaType}/${id}/images?api_key=${apiKey}`
	);

	const movieReleaseDates = await fetchData(
		`${baseUrl}/${mediaType}/${id}/release_dates?api_key=${apiKey}`
	);
	let USreleaseDate;

	if (mediaType === "movie") {
		USreleaseDate = movieReleaseDates.results.find(
			(m) => m.iso_3166_1 === "US"
		);
	}

	const content_ratings = await fetchData(
		`${baseUrl}/tv/${id}/content_ratings?api_key=${apiKey}`
	);
	const credits = await fetchData(
		`${baseUrl}/${mediaType}/${id}/credits?api_key=${apiKey}`
	);

	const directors = credits.crew.filter((cr) => cr.job === "Director");
	const creators = credits.crew.filter((cr) => cr.job === "Executive Producer");
	const casts = credits.cast;
	const writers = credits.crew.filter((cr) => cr.department === "Writing");

	const recommendations = await fetchData(
		`${baseUrl}/${mediaType}/${id}/recommendations?api_key=${apiKey}`
	);

	const reviews = await fetchData(
		`${baseUrl}/${mediaType}/${id}/reviews?api_key=${apiKey}`
	);

	const featuredReview =
		reviews.results.length > 0 &&
		reviews.results.reduce((longest, current) => {
			const currentWordCount = current.content.split(" ").length;
			const longestWordCount = longest.content.split(" ").length;

			return currentWordCount > longestWordCount ? current : longest;
		});

	const seasonDetail = await fetchData(
		`${baseUrl}/tv/${id}/season/1?api_key=${apiKey}`
	);

	const episodeDetail = await fetchData(
		`${baseUrl}/tv/${id}/season/1/episode/1?api_key=${apiKey}`
	);

	return (
		<div>
			<DetailWithBackdrop
				backdrop_path={detail.backdrop_path}
				media_type={mediaType}
				poster_path={detail.poster_path}
				trailer={trailer}
				title={mediaType === "movie" ? detail.title : detail.name}
				runtime={
					mediaType === "movie" ? detail.runtime : detail.episode_run_time
				}
				release_date={
					mediaType === "movie" ? detail.release_date : detail.first_air_date
				}
				lastAiredDate={mediaType === "tv" && detail.last_air_date}
				rate={
					mediaType === "movie"
						? USreleaseDate.release_dates[0].certification
						: content_ratings.results.find(
								(rating) => rating.iso_3166_1 === "US"
						  )
				}
				directors={directors}
				creators={creators}
				casts={casts}
				writers={writers}
				genres={detail.genres}
				photos={photos.backdrops.length}
				videos={videos.results.length}
				vote_average={detail.vote_average}
				vote_count={detail.vote_count}
				tagline={detail.tagline}
				totalEpisodes={mediaType === "tv" && detail.number_of_episodes}
			/>
			<div className="w-full lg:w-[900px] h-[1000px] mx-auto py-6 px-4 lg:px-0">
				<Videos
					videos={videos.results.filter((vid) => vid.site === "YouTube")}
				/>
				<Photos photos={photos} />
				<Casts casts={casts} content_id={id} />
				<Crews
					directors={mediaType === "movie" ? directors : creators}
					writers={writers}
					media_type={mediaType}
				/>
				{mediaType === "tv" && (
					<EpisodeSpotlight
						episodeDetail={episodeDetail}
						seasonDetail={seasonDetail}
						number_of_season={detail.number_of_seasons}
						id={id}
					/>
				)}
				<SimilarLikeThis movies={recommendations.results} />
				{reviews.results.length > 0 && (
					<FeaturedReview review={featuredReview} />
				)}

				<Details
					language={detail.spoken_languages}
					official_site={detail.homepage}
					origin_country={detail.origin_country}
					production_companies={detail.production_companies}
					release_date={
						mediaType === "movie" ? detail.release_date : detail.first_air_date
					}
				/>
			</div>
		</div>
	);
};

export default DetailPage;

const fetchData = async (url) => {
	const res = await fetch(url);
	const result = await res.json();
	return result;
};
