import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

async function loadGoogleFont(font: string, text: string) {
	const t = `${text} nuexq`;
	const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(t)}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status === 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error("failed to load font data");
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const title = searchParams.get("title") || "nuexq";

	try {
		return new ImageResponse(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					backgroundColor: "hsl(50, 72%, 92%)",
				}}
			>
				<div
					style={{
						padding: "2.22rem 3.33rem",
						width: "100%",
						display: "flex",
						justifyContent: "flex-start",
						fontSize: "4.5rem",
						lineHeight: 1,
						background: "hsl(0, 0%, 12%)",
						color: "hsl(50, 72%, 92%)",
					}}
				>
					<span>nuexq</span>
				</div>
				<div
					style={{
						margin: "2.22rem 3.33rem",
						display: "flex",
						fontSize: "4rem",
						lineHeight: 1.625,
						color: "hsl(0, 0%, 12%)",
					}}
				>
					<span>{title}</span>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Crimson Pro",
						data: await loadGoogleFont("Crimson Pro", title),
						style: "normal",
						weight: 400,
					},
				],
			},
		);
	} catch {
		return new Response("Failed to generate OG image", { status: 500 });
	}
}
