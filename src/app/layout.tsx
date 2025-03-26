import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";

export const metadata: Metadata = {
	title: "og-img",
	description: "og image for my site",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const title = "nuexq";
	const encodedTitle = encodeURIComponent(title);

	return (
		<html lang="en">
			<Head>
				<meta name="og:title" content={title} />
				<meta name="og:description" content={title} />
				<meta
					name="og:image"
					content={`${
						process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""
					}/api/og?title=${encodedTitle}`}
				/>
			</Head>
			<body className="antialiased">{children}</body>
		</html>
	);
}
