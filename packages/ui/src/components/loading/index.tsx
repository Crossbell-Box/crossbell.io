import React from "react";

export const Loading = React.forwardRef<
	SVGSVGElement,
	React.SVGAttributes<SVGSVGElement>
>((props, ref) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid"
		ref={ref}
		{...props}
	>
		<circle
			cx="50"
			cy="50"
			fill="none"
			stroke="currentColor"
			strokeWidth="10"
			r="35"
			strokeDasharray="164.93361431346415 56.97787143782138"
		>
			<animateTransform
				attributeName="transform"
				type="rotate"
				repeatCount="indefinite"
				dur="0.8s"
				values="0 50 50;360 50 50"
				keyTimes="0;1"
			/>
		</circle>
	</svg>
));
