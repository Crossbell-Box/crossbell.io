import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgTreasures = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 48 48"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<linearGradient
			id="treasures_svg__a"
			x1={7.809}
			x2={25.027}
			y1={23.95}
			y2={23.95}
			gradientUnits="userSpaceOnUse"
		>
			<stop
				offset={0}
				style={{
					stopColor: "currentColor",
				}}
			/>
			<stop
				offset={0.334}
				style={{
					stopColor: "currentColor",
				}}
			/>
			<stop
				offset={0.67}
				style={{
					stopColor: "currentColor",
				}}
			/>
			<stop
				offset={1}
				style={{
					stopColor: "currentColor",
				}}
			/>
		</linearGradient>
		<path
			fill="currentColor"
			d="M16.3 15.3 13.5 21l-5.7 2.9 5.3 2.9 3.2 5.8 3.1-5.9 5.6-2.8-5.7-2.9z"
			style={{
				opacity: 0.6,
				fill: "url(#treasures_svg__a)",
			}}
		/>
		<path d="m38.6 16.2-2.2-5-5.2-2.3 5.2-2.2 2.2-4.8 2.2 4.8L46 8.9l-5.2 2.3-2.2 5zm0 29.8-2.2-4.8-5.2-2.2 5.2-2.2 2.2-5 2.2 5L46 39l-5.2 2.2-2.2 4.8zm-22-7.7L12 28.4 2 24l10.1-4.5 4.6-9.8 4.6 9.8 10 4.5-10 4.5-4.7 9.8zm0-7.4 2.4-4.8 4.9-2.1-4.9-2.2-2.4-4.8-2.4 4.8-4.9 2.1 4.9 2.1 2.4 4.9z" />
	</svg>
);
const ForwardRef = forwardRef(SvgTreasures);
export default ForwardRef;
