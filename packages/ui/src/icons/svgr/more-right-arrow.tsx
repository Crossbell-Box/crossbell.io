import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgMoreRightArrow = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 14 24"
		ref={ref}
		{...props}
	>
		<path
			fill="#687792"
			d="M13.1 12 1.75 23.3l-1.6-1.6 9.7-9.7-9.7-9.7L1.8.7 13.1 12Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMoreRightArrow);
export default ForwardRef;
