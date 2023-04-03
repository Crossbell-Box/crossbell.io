import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgDropdown = (
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
		<path
			fill="currentColor"
			d="M24 30.1 12.7 18.8l1.6-1.6 9.7 9.7 9.7-9.7 1.6 1.6L24 30.1z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgDropdown);
export default ForwardRef;
