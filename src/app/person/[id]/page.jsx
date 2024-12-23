import { fetchData } from "@/lib/function";

export default async function Person({ params }) {
	const id = (await params).id;

	const apiKey = process.env.TMDB_API_KEY;
	const baseUrl = process.env.TMDB_BASE_URL;
	const detail = await fetchData(`${baseUrl}/person/${id}?api_key=${apiKey}`);
	console.log({ detail });

	return (
		<div>
			<div>Hello world</div>
		</div>
	);
}
