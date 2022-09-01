import { Space, Title } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function BaseSection({
	title,
	titleRightAddon,
	children,
}: PropsWithChildren<{
	title: string;
	titleRightAddon?: React.ReactNode;
}>) {
	return (
		<div>
			{/* title */}
			<div className="flex justify-between items-center">
				<Title order={3}>{title}</Title>

				{titleRightAddon}
			</div>

			<Space h={10} />

			{/* children */}
			{children}
		</div>
	);
}
