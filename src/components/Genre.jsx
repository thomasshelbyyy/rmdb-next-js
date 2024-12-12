import Link from "next/link";
import Image from "next/image";

const Genre = ({ image, name }) => {
	return (
		<Link href="/">
			<Image
				className="w-48 h-24 rounded-lg"
				width="100"
				height="100"
				alt="name"
				src={image}
			/>
			<p>{name}</p>
		</Link>
	);
};

export default Genre;
