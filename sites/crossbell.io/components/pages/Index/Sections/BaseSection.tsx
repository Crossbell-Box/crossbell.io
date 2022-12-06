import { PropsWithChildren } from "react";
import classNames from "classnames";

export default function BaseSection({
	children,
	className,
}: PropsWithChildren<{
	className?: string;
}>) {
	return (
		<section
			className={classNames("h-screen w-screen overflow-hidden", className)}
		>
			{children}
		</section>
	);
}
