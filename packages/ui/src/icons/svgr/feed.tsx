import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgFeed = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 48 48"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path
			d="M6.7 42.1V24.3c9.8 0 17.8 8 17.8 17.8H6.7z"
			style={{
				opacity: 0.3,
				fill: "#ffcf55",
			}}
		/>
		<path
			fill="currentColor"
			d="M10.7 42.1c-1.1 0-2-.4-2.8-1.2s-1.2-1.7-1.2-2.8c0-1.1.4-2 1.2-2.8s1.7-1.1 2.8-1.1 2 .4 2.8 1.1c.8.8 1.2 1.7 1.2 2.8 0 1.1-.4 2-1.2 2.8-.8.9-1.8 1.2-2.8 1.2zm25.2 0c0-4-.8-7.8-2.3-11.3-1.5-3.5-3.6-6.6-6.2-9.2s-5.7-4.7-9.2-6.3S10.8 13 6.8 13V9.7c4.5 0 8.7.9 12.6 2.6s7.4 4 10.3 7c2.9 2.9 5.3 6.4 7 10.3s2.6 8.1 2.6 12.6h-3.4zm-11.9 0c0-5-1.6-9.2-4.8-12.5-3.2-3.3-7.3-5-12.4-5v-3.4c3 0 5.7.5 8.2 1.6s4.7 2.5 6.5 4.4c1.8 1.9 3.2 4.1 4.3 6.6s1.5 5.3 1.5 8.2H24z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgFeed);
export default ForwardRef;
