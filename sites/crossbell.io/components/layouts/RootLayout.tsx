import Head from "next/head";

export default function RootLayout({ children }: any) {
	return (
		<html>
			<body>
				<Head>
					<title>Crossbell.io</title>
					<meta
						name="description"
						content="Crossbell.io - Own Your Social Activities"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				{children}
			</body>
		</html>
	);
}
