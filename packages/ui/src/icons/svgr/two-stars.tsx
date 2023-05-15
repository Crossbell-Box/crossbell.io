import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgTwoStars = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 18 18"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="M7.2 13.65 5.419 9.731 1.5 7.95l3.919-1.781L7.2 2.25l1.781 3.919L12.9 7.95 8.981 9.731zm6.45 2.1-.881-1.969L10.8 12.9l1.969-.9.881-1.95.9 1.95 1.95.9-1.95.881z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgTwoStars);
export default ForwardRef;
