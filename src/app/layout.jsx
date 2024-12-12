import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Import Roboto font
const roboto = Roboto({
	subsets: ["latin"], // Subset Latin untuk font
	weight: ["100", "300", "400", "500", "700", "900"], // Pilihan bobot yang diperlukan
	variable: "--font-roboto", // Variabel CSS untuk font
});

export const metadata = {
	title: "Rizky Movie Database | Home",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} antialiased`}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}