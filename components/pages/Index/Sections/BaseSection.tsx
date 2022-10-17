import { PropsWithChildren } from "react";
import classNames from "classnames";
import { Carousel } from "@mantine/carousel";

export default function BaseSection({
	children,
	className,
}: PropsWithChildren<{
	className?: string;
}>) {
	return (
		<Carousel.Slide>
			<section className={classNames("h-screen overflow-hidden", className)}>
				{children}
			</section>
		</Carousel.Slide>
	);
}
