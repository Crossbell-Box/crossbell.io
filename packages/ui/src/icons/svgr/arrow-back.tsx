import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgArrowBack = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		ref={ref}
		{...props}
	>
		<path
			d="m20 9-7 7 7 7"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgArrowBack);
export default ForwardRef;
