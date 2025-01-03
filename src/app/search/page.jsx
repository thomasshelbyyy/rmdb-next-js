import MoviesResultsComponents from "@/components/MoviesResultsComponents";
import PeopleResultComponent from "@/components/PeopleResultComponent";
import { fetchData } from "@/lib/function";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;

  return {
    title: `'${q}' search results | RMDB`,
  };
}

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;

  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;

  const data = await fetchData(
    `${baseUrl}/search/multi?query=${q}&api_key=${apiKey}`
  );

  const filteredData = data.results.filter(
    (d) => d.media_type === "tv" || d.media_type === "movie"
  );

  const filterForPeople = data.results.filter((d) => d.media_type === "person");

  return (
    <main className="flex px-10 py-8 bg-black text-white">
      <section className="lg:w-8/12">
        <h1 className="text-4xl">Search &quot;{q}&quot;</h1>

        <div className="w-full pt-4">
          {/* title result */}
          <div className="flex justify-between w-full font-semibold">
            <div className="relative px-3 text-3xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-my-accent rounded-full"></div>
              Title
            </div>
            <button className="flex items-center gap-1 text-xl ">
              Exact Matches
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <MoviesResultsComponents results={filteredData} />

          <div className="flex justify-between w-full mt-8 font-semibold">
            <div className="relative px-3 text-3xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-my-accent rounded-full"></div>
              People
            </div>
            <button className="flex items-center gap-1 text-xl ">
              Exact Matches
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <PeopleResultComponent results={filterForPeople} />
        </div>
      </section>
    </main>
  );
}
