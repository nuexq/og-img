import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
 
const crimsonPro = localFont({ src: './fonts/CrimsonPro-VariableFont.ttf' })

export const metadata: Metadata = {
	title: "og-img",
	description: "og image for my site",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${crimsonPro.className} antialiased`}>{children}</body>
		</html>
	);
}
