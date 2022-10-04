import * as React from "react";
import classNames from "classnames";

export type ArrowProps = React.SVGAttributes<SVGSVGElement> & {
	direction: "left" | "right";
};

export const Arrow = ({ direction, className, ...props }: ArrowProps) => (
	<svg
		fill="none"
		height={30}
		width={18}
		viewBox="0 0 18 30"
		xmlns="http://www.w3.org/2000/svg"
		className={classNames(
			"transform",
			direction === "left" && "rotate-180",
			className
		)}
		{...props}
	>
		<path
			d="M2.129 29.666 17.333 15 2.13.333 0 2.423 13.038 15 0 27.576z"
			fill="currentColor"
		/>
	</svg>
);
