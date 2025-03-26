import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
	title: "og-img",
	description: "og image for my site",
};

export default function Page() {
	const title = "nuexq";
	const encodedTitle = encodeURIComponent(title);

	return (
		<div>
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
		</div>
	);
}
