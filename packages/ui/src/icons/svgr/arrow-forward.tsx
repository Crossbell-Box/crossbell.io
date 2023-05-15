import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgArrowForward = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 16 16"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="m11.771 11.771-1.002-.012V5.939l-6.187 6.187-.707-.707 6.187-6.187H4.241l-.012-1.002h7.542z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgArrowForward);
export default ForwardRef;
