import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgArrowRight = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 25"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="m12 4.225 8.275 8.275L12 20.775l-1.675-1.65 5.425-5.45H3.725v-2.35H15.75L10.325 5.9z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgArrowRight);
export default ForwardRef;
