import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgArrowBack = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 32 32"
		ref={ref}
		{...props}
	>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="m20 9-7 7 7 7"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgArrowBack);
export default ForwardRef;
