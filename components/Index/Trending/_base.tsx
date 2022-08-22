import { PropsWithChildren } from "react";
import { Title, Button } from "@mantine/core";
import { NextLink } from "@mantine/next";

const TrendingBase = ({
	title,
	intro,
	viewMoreLink,
	children,
}: PropsWithChildren<{
	title: string;
	intro: string;
	viewMoreLink: string;
}>) => (
	<div className="flex flex-col items-center text-center my-24">
		<div className="flex flex-col">
			<Title order={2} className="text-size-[3rem] font-semibold">
				{title}
			</Title>
			<span className="mt-6">{intro}</span>
		</div>
		<div className="mt-18 mb-12 w-full">{children}</div>
		<div>
			<Button component={NextLink} href={viewMoreLink} color="dark">
				View More
			</Button>
		</div>
	</div>
);

export default TrendingBase;
